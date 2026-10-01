"""The gates' own rules, table-driven: routing, reading test evidence, and the
harness gate's verdict. The end-to-end run is the reference itself —
`uv run tools/gates.py ../reference-agent` — which must pass all four.

    uv run --with pytest --with pyyaml pytest -q tools/test_gates.py
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

import pytest

spec = importlib.util.spec_from_file_location("gates", Path(__file__).parent / "gates.py")
gates = importlib.util.module_from_spec(spec)
sys.modules["gates"] = gates
spec.loader.exec_module(gates)

# [statement ids, route]
ROUTES = [
    (["AAC-0110"], "AAC"),
    (["AHC-0010"], "AHC"),
    (["B4"], "Baseline"),
    (["P-CANCEL", "AHC-0107"], "AOAS → AHC"),
    (["ext:order_system", "op:cancel_order"], "AOAS → AOAS (external system) / AWD"),
    ([], "scenario (it discharges nothing)"),
]


@pytest.mark.parametrize("ids,route", ROUTES, ids=[r[1] for r in ROUTES])
def test_a_failure_is_routed_to_the_spec_its_statements_belong_to(ids, route):
    assert gates.route_for(ids) == route


def junit(tmp_path: Path, cases: str) -> Path:
    path = tmp_path / "junit.xml"
    path.write_text(f"<testsuites><testsuite>{cases}</testsuite></testsuites>")
    return path


def case(name: str, props: dict[str, str], outcome: str = "") -> str:
    inner = "".join(f'<property name="{k}" value="{v}"/>' for k, v in props.items())
    return f'<testcase classname="t" name="{name}"><properties>{inner}</properties>{outcome}</testcase>'


# [name, cases, passed ids, failed ids]
EVIDENCE = [
    ("a passing tagged test", [case("a", {"discharges": "AHC-1,AAC-2"})], {"AHC-1", "AAC-2"}, set()),
    ("the catalog's aac property counts", [case("a", {"aac": "AAC-9"})], {"AAC-9"}, set()),
    # The catalog's adapter splits on commas or whitespace; generation run 2 used spaces.
    ("ids separated by spaces", [case("a", {"aac": "AAC-1 AAC-2"})], {"AAC-1", "AAC-2"}, set()),
    ("an ahc property counts", [case("a", {"ahc": "AHC-3, AHC-4"})], {"AHC-3", "AHC-4"}, set()),
    ("a failing test", [case("a", {"discharges": "AHC-1"}, "<failure/>")], set(), {"AHC-1"}),
    ("an error is a failure", [case("a", {"discharges": "AHC-1"}, "<error/>")], set(), {"AHC-1"}),
    ("a skipped test is not coverage", [case("a", {"discharges": "AHC-1"}, "<skipped/>")], set(), set()),
    (
        "an unwired test counts for nothing",
        [case("a", {"discharges": "AHC-1", "unwired": "true"})],
        set(),
        set(),
    ),
    ("an untagged test names nothing", [case("a", {})], set(), set()),
]


@pytest.mark.parametrize("name,cases,passed,failed", EVIDENCE, ids=[e[0] for e in EVIDENCE])
def test_junit_evidence(tmp_path, name, cases, passed, failed):
    got_passed, got_failed, count = gates.junit_evidence(junit(tmp_path, "".join(cases)))
    assert set(got_passed) == passed
    assert set(got_failed) == failed
    assert count == len(cases)


CAP = {"id": "AHC-1", "title": "a capability", "design_decisions": [{"key": "choice"}]}
GAP = {"capability": "AHC-1", "reason": "r", "owner": "o", "review": "2026-12-01"}

# [name, profile, exercised, demonstrated, passes]
HARNESS = [
    ("tested and decided", {"decisions": {"AHC-1/choice": {}}}, {"AHC-1"}, set(), True),
    ("demonstrated by a scenario", {"decisions": {"AHC-1/choice": {}}}, set(), {"AHC-1"}, True),
    ("an accepted gap", {"decisions": {"AHC-1/choice": {}}, "accepted_gaps": [GAP]}, set(), set(), True),
    ("neither tested nor a gap", {"decisions": {"AHC-1/choice": {}}}, set(), set(), False),
    ("a decision left open", {}, {"AHC-1"}, set(), False),
    (
        "a gap with no owner",
        {"decisions": {"AHC-1/choice": {}}, "accepted_gaps": [{"capability": "AHC-1", "reason": "r"}]},
        set(),
        set(),
        False,
    ),
]


@pytest.mark.parametrize(
    "name,profile,exercised,demonstrated,passes", HARNESS, ids=[h[0] for h in HARNESS]
)
def test_the_harness_gate(name, profile, exercised, demonstrated, passes):
    gate = gates.harness(profile, [CAP], {i: {"t"} for i in exercised}, demonstrated)
    assert gate.passed is passes, [f.what for f in gate.failures]


CONDITIONAL = {**CAP, "applies_when": "output is streamed"}
NA = {"capability": "AHC-1", "reason": "nothing is streamed"}

# [name, capability, profile, passes] — nothing tested and nothing decided, in every row
NOT_APPLICABLE = [
    ("a conditional capability whose condition does not hold", CONDITIONAL, {"not_applicable": [NA]}, True),
    ("an unconditional capability marked not applicable", CAP, {"not_applicable": [NA]}, False),
    ("not applicable with no reason", CONDITIONAL, {"not_applicable": [{"capability": "AHC-1"}]}, False),
    ("a conditional capability not marked, and not met", CONDITIONAL, {}, False),
]


@pytest.mark.parametrize("name,cap,profile,passes", NOT_APPLICABLE, ids=[n[0] for n in NOT_APPLICABLE])
def test_not_applicable_needs_a_stated_condition(name, cap, profile, passes):
    gate = gates.harness(profile, [cap], {}, set())
    assert gate.passed is passes, [f.what for f in gate.failures]
