# /// script
# requires-python = ">=3.12"
# dependencies = ["pyyaml>=6.0"]
# ///
"""The four gates as one command — step 6 of the cycle.

    uv run tools/gates.py ../reference-agent
    uv run tools/gates.py ../generation-run-3 --skip-tests   # reuse the last junit

An implementation in; a verdict on each gate and every failure with a proposed
route out. The implementation says how to reach it in its own `gates.yaml`; the
yardstick it is measured against — the scenarios and the feature inventory — is
declared here, per agent, in `gates/<agent>.yaml`, so no implementation can
bring its own.

| Gate | Asks | Measured by |
|---|---|---|
| **Behaviour** | does it do the right thing in the world | the yardstick scenarios, through `agenttwin run` and the implementation's binding |
| **Features** | does its own suite exercise everything the reference's does | JUnit `discharges` properties on passing tests, against the inventory |
| **Structure** | is it built to the blueprint | the three build checks it declares, and a module for every layer it owes |
| **Harness** | is every capability its shape owes met or knowingly not | the resolved profile's accepted gaps, and passing tests tagged with the capability |

**Why every failure carries a route.** Step 7 is the point of the cycle: a
failure with no route gets fixed in the agent, and the spec stays wrong for the
next cycle. A route here is a *proposal* — the family a failing statement
belongs to, or the artifact a structural failure points at — for the person
routing it to confirm or overturn. It is never "the agent".

Code is never diffed. Line-level similarity decides nothing.
"""

from __future__ import annotations

import argparse
import json
import re
import shlex
import subprocess
import sys
import xml.etree.ElementTree as ET
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any

import yaml

HERE = Path(__file__).resolve().parent.parent  # clean-ai-engineering
AHC = HERE.parent / "ai-harness-catalog"
GATES = ("behaviour", "features", "structure", "harness")


# ------------------------------------------------------------------ results


@dataclass
class Failure:
    what: str
    route: str
    detail: str = ""


@dataclass
class Gate:
    name: str
    passed: bool = True
    ran: bool = True
    summary: str = ""
    failures: list[Failure] = field(default_factory=list)
    notes: list[str] = field(default_factory=list)

    def fail(self, what: str, route: str, detail: str = "") -> None:
        self.passed = False
        self.failures.append(Failure(what, route, detail))


# ------------------------------------------------------------------- routing


def family(statement: str) -> str:
    """Which spec a statement id belongs to — the default route for a failure on it."""
    if statement.startswith("AAC-"):
        return "AAC"
    if statement.startswith("AHC-"):
        return "AHC"
    if re.fullmatch(r"B\d+", statement):
        return "Baseline"
    if statement.startswith("ext:"):
        return "AOAS (external system) / AWD"
    return "AOAS"


def route_for(discharges: list[str]) -> str:
    """The families a failing scenario's statements belong to, domain first:
    a scenario that fails on an AOAS statement is most often the AOAS
    under-saying what the agent must do, before it is a harness capability."""
    order = ["AOAS", "AOAS (external system) / AWD", "AHC", "AAC", "Baseline"]
    seen = sorted({family(s) for s in discharges}, key=order.index)
    return " → ".join(seen) if seen else "scenario (it discharges nothing)"


# -------------------------------------------------------------------- inputs


def load_yaml(path: Path) -> Any:
    return yaml.safe_load(path.read_text())


def run(command: str, cwd: Path, *, timeout: int = 3600) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        shlex.split(command), cwd=cwd, capture_output=True, text=True, timeout=timeout, check=False
    )


def resolve_profile(path: Path) -> dict[str, Any]:
    """Through the catalog's own resolver, never a copy of its rules."""
    done = subprocess.run(
        ["node", str(AHC / "tools" / "resolve.js"), str(path)],
        capture_output=True,
        text=True,
        check=False,
    )
    if done.returncode != 0:
        raise SystemExit(f"the profile does not resolve:\n{done.stderr or done.stdout}")
    return yaml.safe_load(done.stdout)


def owed_capabilities(shapes: list[str]) -> list[dict[str, Any]]:
    """What the brief owes, by the brief's own rule: active, and core or one of the shapes."""
    caps = [load_yaml(p) for p in sorted((AHC / "capabilities").glob("*.yaml"))]
    return [
        c
        for c in caps
        if c
        and c.get("status") != "withdrawn"
        and (c.get("core") or set(c.get("archetypes") or []) & set(shapes))
    ]


def junit_evidence(path: Path) -> tuple[dict[str, set[str]], dict[str, set[str]], int]:
    """`(passed, failed, tests)`: statement id → the tests that exercised it.

    Reads the `discharges` property, and `aac` and `ahc` — the catalogs' own
    names for it — as the same thing. Ids are separated by commas or
    whitespace, as the assurance catalog's junit adapter splits them (generation
    run 2 used spaces, and every test naming two ids counted for nothing). A
    test marked `unwired` exercises a component the agent never calls, and
    counts for nothing."""
    passed: dict[str, set[str]] = {}
    failed: dict[str, set[str]] = {}
    tests = 0
    for case in ET.parse(path).getroot().iter("testcase"):
        tests += 1
        props = {
            p.get("name"): p.get("value", "")
            for p in case.iter("property")
        }
        if props.get("unwired") == "true":
            continue
        ids = {
            i.strip()
            for key in ("discharges", "aac", "ahc")
            for i in re.split(r"[,\s]+", props.get(key) or "")
            if i.strip()
        }
        if not ids or case.find("skipped") is not None:
            continue
        broken = case.find("failure") is not None or case.find("error") is not None
        name = f"{case.get('classname')}::{case.get('name')}"
        for i in ids:
            (failed if broken else passed).setdefault(i, set()).add(name)
    return passed, failed, tests


# --------------------------------------------------------------------- gates


def behaviour(repo: Path, cfg: dict, yardstick: dict, out: Path) -> tuple[Gate, set[str]]:
    gate = Gate("behaviour")
    scenarios = (HERE / "gates" / yardstick["scenarios"]).resolve()
    report = out / "behaviour.json"
    command = (
        f"{cfg.get('run', 'uv run')} python -m agenttwin run -q "
        f"--binding {cfg['binding']} --out {report} {scenarios}"
    )
    done = run(command, repo)
    if not report.is_file():
        gate.fail(
            "the runner produced no report",
            "binding",
            (done.stderr or done.stdout).strip()[-1500:],
        )
        return gate, set()
    data = json.loads(report.read_text())
    counts = data["summary"]["counts"]
    gate.summary = ", ".join(f"{n} {s}" for s, n in counts.items() if n)
    demonstrated: set[str] = set()
    for s in data["scenarios"]:
        note = f" (model overran its script ×{s['overran']})" if s["overran"] else ""
        if s["status"] == "passed":
            demonstrated |= set(s["discharges"])
            if s["overran"]:
                gate.notes.append(f"{s['file']} passed{note} — check it passed for its stated reason")
        elif s["status"] == "failed":
            gate.fail(
                f"{s['file']}: {s['scenario']}{note}",
                ("generator or AOAS: it reached the model where the scenario expects "
                 "a deterministic route — " if s["overran"] else "") + route_for(s["discharges"]),
                "; ".join(s["failed_checks"][:4]),
            )
        elif s["status"] == "unrunnable":
            if "model-driven customer" in s["error"]:
                gate.notes.append(f"{s['file']}: needs a live run (a model plays the customer)")
            else:
                gate.fail(
                    f"{s['file']}: unrunnable",
                    "AHC / profile — a capability the scenario needs is missing",
                    s["error"] or "; ".join(c["error"] for c in s["cases"] if c["error"]),
                )
        else:
            gate.fail(
                f"{s['file']}: {s['status']}",
                "binding" if s["status"] == "crashed" else "scenario",
                (s["error"] or "; ".join(c["error"] for c in s["cases"] if c["error"]))[-600:],
            )
    return gate, demonstrated


def features(
    repo: Path, cfg: dict, yardstick: dict, out: Path, skip_tests: bool, write_inventory: bool
) -> tuple[Gate, dict[str, set[str]]]:
    gate = Gate("features")
    junit = out / "junit.xml"
    tests = cfg.get("tests") or {}
    if not skip_tests:
        if not tests.get("command"):
            gate.fail("no test command in gates.yaml", "generator — say how the suite runs")
            return gate, {}
        run(tests["command"].format(junit=junit), repo)
    if not junit.is_file():
        gate.fail("no JUnit report was written", "generator", str(junit))
        return gate, {}
    passed, failed, count = junit_evidence(junit)
    inventory_path = HERE / "gates" / yardstick["inventory"]
    if write_inventory:
        inventory_path.write_text(
            json.dumps(
                {
                    "agent": yardstick["agent"],
                    "generated_from": f"{repo.name}'s suite — tools/gates.py --write-inventory",
                    "statements": sorted(passed),
                },
                indent=2,
            )
            + "\n"
        )
        gate.notes.append(f"inventory written: {len(passed)} statements → {inventory_path.name}")
    inventory = set(json.loads(inventory_path.read_text())["statements"])
    missing = sorted(inventory - set(passed))
    broken = sorted(failed)
    gate.summary = (
        f"{count} tests, {len(passed)} statements exercised by passing tests, "
        f"{len(inventory)} in the inventory"
    )
    if count and not passed and not failed:
        gate.fail(
            "no test names a statement it discharges",
            "generator / brief — the suite carries no `discharges` properties",
        )
    for sid in missing:
        gate.fail(f"{sid} not exercised", family(sid))
    for sid in broken:
        gate.fail(
            f"{sid} has a failing test",
            family(sid),
            ", ".join(sorted(failed[sid])[:3]),
        )
    return gate, passed


def structure(repo: Path, cfg: dict, owed: list[dict], gaps: set[str]) -> Gate:
    gate = Gate("structure")
    spec = cfg.get("structure") or {}
    checks = spec.get("checks") or {}
    for kind in ("types", "imports", "complexity"):
        command = checks.get(kind)
        if not command:
            gate.fail(f"no {kind} check declared", "stack profile / generator")
            continue
        done = run(command, repo)
        if done.returncode != 0:
            gate.fail(
                f"the {kind} check fails: {command}",
                "generator",
                (done.stdout + done.stderr).strip()[-800:],
            )
    layers = spec.get("layers") or {}
    owed_layers = sorted({layer for c in owed for layer in c.get("layers", [])}, key=_layer_n)
    mapped = 0
    for layer in owed_layers:
        where = layers.get(layer)
        caps = [c["id"] for c in owed if layer in c.get("layers", [])]
        if isinstance(where, dict) and "none" in where:
            open_caps = [c for c in caps if c not in gaps]
            if open_caps:
                gate.fail(
                    f"{layer} has no module and owes {', '.join(open_caps)}",
                    "blueprint / generator",
                    str(where["none"]),
                )
            continue
        paths = [where] if isinstance(where, str) else (where or [])
        if not paths:
            gate.fail(f"{layer} is not mapped to a module", "blueprint / generator")
            continue
        absent = [p for p in paths if not (repo / p).exists()]
        if absent:
            gate.fail(f"{layer} names what does not exist: {', '.join(absent)}", "generator")
        else:
            mapped += 1
    gate.summary = f"{mapped} of {len(owed_layers)} owed layers mapped to a module"
    return gate


def harness(
    profile: dict, owed: list[dict], exercised: dict[str, set[str]], demonstrated: set[str]
) -> Gate:
    gate = Gate("harness")
    gaps = {g["capability"]: g for g in profile.get("accepted_gaps") or []}
    decisions = profile.get("decisions") or {}
    met = gapped = 0
    for cap in owed:
        cid = cap["id"]
        if cid in gaps:
            gap = gaps[cid]
            if not (gap.get("reason") and gap.get("owner") and gap.get("review")):
                gate.fail(f"{cid}: accepted gap without reason, owner and review", "profile")
            gapped += 1
        elif cid in exercised or cid in demonstrated:
            met += 1
        else:
            gate.fail(
                f"{cid} — {cap.get('title', '')}: no passing test, no accepted gap",
                "AHC (is it testable as written?) or the profile (accept it as a gap)",
            )
        for dd in cap.get("design_decisions") or []:
            key = dd.get("key")
            if key and f"{cid}/{key}" not in decisions:
                gate.fail(f"{cid}/{key} is not answered", "profile")
    gate.summary = (
        f"{len(owed)} owed: {met} evidenced by a passing test, {gapped} accepted gaps"
    )
    return gate


def _layer_n(layer: str) -> int:
    return int(layer[1:]) if layer[1:].isdigit() else 99


# ------------------------------------------------------------------- output


def markdown(repo: Path, agent: str, gates: list[Gate]) -> str:
    lines = [
        f"# Gates — {repo.name}",
        "",
        f"*Generated by `clean-ai-engineering/tools/gates.py` against the `{agent}` "
        "yardstick. Never edit by hand.*",
        "",
        "| Gate | Verdict | |",
        "|---|---|---|",
    ]
    for g in gates:
        verdict = "not run" if not g.ran else ("**pass**" if g.passed else "**fail**")
        lines.append(f"| {g.name.title()} | {verdict} | {g.summary} |")
    for g in gates:
        if not (g.failures or g.notes):
            continue
        lines += ["", f"## {g.name.title()}", ""]
        if g.failures:
            lines += ["| Failure | Proposed route | Detail |", "|---|---|---|"]
            for f in g.failures:
                detail = f.detail.replace("|", "\\|").replace("\n", " ")[:300]
                lines.append(f"| {f.what} | {f.route} | {detail} |")
        for note in g.notes:
            lines.append(f"- {note}")
    return "\n".join(lines) + "\n"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="gates", description=__doc__.split("\n\n")[0])
    parser.add_argument("repo", help="the implementation's directory (holds gates.yaml)")
    parser.add_argument("--only", choices=GATES, action="append", help="run these gates only")
    parser.add_argument("--skip-tests", action="store_true", help="reuse the last junit.xml")
    parser.add_argument(
        "--write-inventory",
        action="store_true",
        help="record this suite's exercised statements as the yardstick (the reference only)",
    )
    args = parser.parse_args(argv)

    repo = Path(args.repo).resolve()
    cfg = load_yaml(repo / "gates.yaml")
    yardstick = load_yaml(HERE / "gates" / f"{cfg['agent']}.yaml")
    out = repo / "reports" / "gates"
    out.mkdir(parents=True, exist_ok=True)
    wanted = set(args.only or GATES)

    profile = resolve_profile(repo / cfg["profile"])
    aoas = load_yaml((repo / cfg["aoas"]).resolve())
    shapes = sorted(
        set((aoas.get("conformance") or {}).get("archetypes") or [])
        | set((profile.get("subject") or {}).get("archetypes") or [])
    )
    owed = owed_capabilities(shapes)
    gaps = {g["capability"] for g in profile.get("accepted_gaps") or []}

    gates: list[Gate] = []
    demonstrated: set[str] = set()
    exercised: dict[str, set[str]] = {}
    if "behaviour" in wanted:
        print("  behaviour …", flush=True)
        gate, demonstrated = behaviour(repo, cfg, yardstick, out)
        gates.append(gate)
    else:
        gates.append(Gate("behaviour", ran=False))
    if "features" in wanted:
        print("  features …", flush=True)
        gate, exercised = features(
            repo, cfg, yardstick, out, args.skip_tests, args.write_inventory
        )
        gates.append(gate)
    else:
        gates.append(Gate("features", ran=False))
    if "structure" in wanted:
        print("  structure …", flush=True)
        gates.append(structure(repo, cfg, owed, gaps))
    else:
        gates.append(Gate("structure", ran=False))
    if "harness" in wanted:
        gate = harness(profile, owed, exercised, demonstrated)
        if "features" not in wanted:
            gate.notes.append("run without the features gate: test evidence was not read")
        gates.append(gate)
    else:
        gates.append(Gate("harness", ran=False))

    verdict = {
        "repo": str(repo),
        "agent": cfg["agent"],
        "shapes": shapes,
        "passed": all(g.passed for g in gates if g.ran),
        "gates": [asdict(g) for g in gates],
    }
    (out / "verdict.json").write_text(json.dumps(verdict, indent=2) + "\n")
    (out / "verdict.md").write_text(markdown(repo, cfg["agent"], gates))
    for g in gates:
        mark = "·" if not g.ran else ("PASS" if g.passed else "FAIL")
        print(f"  {mark:<5} {g.name:<10} {g.summary}"
              + (f"  ({len(g.failures)} failure(s))" if g.failures else ""))
    print(f"  → {out / 'verdict.md'}")
    return 0 if verdict["passed"] else 1


if __name__ == "__main__":
    sys.exit(main())
