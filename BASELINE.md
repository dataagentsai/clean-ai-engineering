# The Baseline

**An agent is a software system. This is how the family sits on top of software
engineering without restating it, and how a reader crosses the gap that creates.**

Status: working draft 0.1.0. Governed by [SPEC-CHARTER.md](SPEC-CHARTER.md) §7.

---

## The rule

> **An agent system MUST satisfy established software engineering practice. This
> family does not restate it. The catalogs specify only what is additional to, or
> different from, that baseline because the system is non-deterministic.**

### The tension, named

Both alternatives are worse, and the argument for each deserves stating.

**Restate it** — put lifecycle, testing, CI, release and dependency management into
the harness catalog. The catalog then describes everything needed to build a
production agent, which is what a reader wants. It also becomes a general software
engineering textbook with an agent chapter, loses the edge that makes it worth
reading, and duplicates four international standards badly.

**Omit it silently** — say nothing, and the family does not describe everything
needed to build a production agent. That is a fair criticism and it is the one a
reviewer will make.

**Resolved by citing.** This is principle 1 applied to the largest body of work the
family sits on. It is also the deterministic-first thesis made structural: if the
harness catalog restated unit testing, it would be arguing against the position it
exists to argue. **The thinness is the claim, not an omission.**

---

## The references

Named, not reproduced. Each is the normative source for its area.

| Area | Reference |
|---|---|
| Software life-cycle processes | ISO/IEC/IEEE 12207 |
| Software testing | ISO/IEC/IEEE 29119 |
| Product quality model | ISO/IEC 25010:2023 |
| Secure development | NIST SP 800-218 (SSDF) |
| Application security verification | OWASP ASVS |
| Agentic threat surface | OWASP Top 10 for LLM Applications |
| AI risk management | NIST AI RMF |

---

## The crosswalk

A citation is not a bridge. Nobody reads a life-cycle standard alongside a
capability catalog, so incorporation by reference solves the scoping problem and
moves the gap into the reader's head. This table is what closes it.

Each row carries one of three verdicts.

| Practice area | Verdict | What changes, and where |
|---|---|---|
| Code review | **As-is** | Nothing. Cite 12207 |
| Version control, branching | **As-is** | Nothing |
| Static analysis, linting | **As-is** | Nothing |
| Build reproducibility | **As-is** | Nothing |
| Unit testing | **Delta** | Non-determinism breaks assertion-equality. Property-based and statistical assertions, fixed seeds, stated tolerances |
| Regression testing | **Delta** | A test can pass for the wrong reason. Behavioural suites, drift detection over time |
| Integration testing | **Delta** | The environment is a declared world, not a stub → **AWD** |
| Dependency management | **Delta** | **The model is a dependency with no semantic version that changes without notice.** Pinning, recording, and detecting the change |
| Configuration management | **Delta** | **Prompts are configuration** — versioned, reviewed, diffable, rolled back |
| Secrets management | **As-is** | Nothing, beyond what security already requires |
| Observability | **Delta** | Spans must carry reasoning steps, tool calls and token cost, not only latency and errors |
| Performance testing | **Delta** | Latency is model-dependent and variable. **Cost becomes a first-class quality attribute**, not an operational footnote |
| Capacity planning | **Delta** | Rate limits and token budgets are the binding constraint, not CPU |
| Security | **Delta** | Injection through content, tool-call authorisation, exfiltration *through* the model. OWASP LLM Top 10 is the reference for the delta |
| Release management | **Delta** | Canary on **behaviour**, not only on error rate |
| Rollback | **Delta** | The rollback set includes model version, prompt version and tool schema |
| Incident response | **Delta** | A replayable trace is the primary artifact; logs alone cannot reconstruct a decision |
| Documentation | **As-is** | Nothing |
| Exhaustive input testing | **Does not apply** | Impossible over natural language. Replaced by declared scenario coverage → **AWD** |
| Deterministic reproduction of a run | **Does not apply unaided** | Requires recorded inputs and seeds → harness capability, not a practice |

**The rule the table encodes:** *transfer what transfers, cite it, and specify only
the break.* Where a row says **As-is**, the catalogs say nothing at all — and that
silence is deliberate rather than an oversight.

**The table is also a gap-finder.** Every **Delta** row should correspond to at
least one harness capability or assurance obligation. A delta with no entry behind
it is a hole in a catalog.

---

## The Agent Baseline Profile

The crosswalk still leaves a question: *how much of the baseline must actually be
demonstrated?* "All of software engineering" is not an answer anyone can act on.

> **The selection rule: the baseline items in this profile are exactly those the
> agentic delta stands on. Everything else remains a citation.**

That is a derivable boundary rather than a preference, and it can be argued with:
if an item is in the profile, there is a delta that depends on it, and the
dependency can be named.

| # | Baseline item | The delta that stands on it |
|---|---|---|
| B1 | Dependencies are pinned and recorded | The model is a dependency |
| B2 | Configuration is versioned and diffable | Prompts are configuration |
| B3 | Configuration is separated from code | Prompt and model are swappable without a rebuild |
| B4 | An automated test suite runs on every change | Behavioural suites and eval gates hang off it |
| B5 | Tests are runnable by one command, offline | Regeneration and replay require it |
| B6 | A release process exists, with rollback | Behavioural canary and model rollback |
| B7 | Build artifacts are identified by version | The Build Manifest references them |
| B8 | Structured logging and tracing are in place | Reasoning steps and cost ride on it |
| B9 | Secrets are outside source and rotatable | Tool credentials reach the model's blast radius |
| B10 | Input validation exists at every external boundary | Injection arrives as ordinary content |
| B11 | Errors are typed and propagated, not swallowed | Failure handling cannot classify what it cannot see |
| B12 | The system runs in a reproducible environment | Otherwise divergence cannot be attributed |
| B13 | Every dependency on something the system does not own is an interface, and only the composition root constructs a realisation | The world must be swappable for a simulated one, the provider for a recording, and the store for one that survives a restart — none of which is possible if a component reaches for its own collaborator |

Thirteen items. **Code coverage thresholds, branching strategy, documentation format
and estimation practice are deliberately absent** — nothing agentic stands on them,
so they stay citations.

---

## Making it executable

A document that says *"pin your dependencies"* is ignored. A command that reports
*"dependencies not pinned — the model-as-dependency capability depends on this"* is
not.

A conformance scan **SHOULD** report two sections:

1. the harness capabilities present, absent or stubbed, and
2. the **profile items** above, checked where they are mechanically detectable.

Most of B1–B12 are file and configuration checks. **No model call is required to
answer them**, which is the thesis demonstrating itself in the one place a reader
will actually run it.

**And the line holds at profile items.** The moment a scan reports code coverage,
the whole of software engineering has re-entered through the back door and the tool
becomes a worse version of things that already exist.

---

## Consequence for regeneration experiments

This is the operational reason the profile exists, and why it must be written
before a regeneration cycle rather than after.

If a specification-only generation produces a system with no CI, unpinned
dependencies and an unversioned prompt, **that is not a gap in the assurance or
harness catalogs.** It is a missing baseline input. Recorded as a catalog gap it
would corrupt the finding, and it would create pressure to move ordinary software
engineering into the catalogs in order to force convergence — which is precisely
what the rule at the top of this document exists to prevent.

> **The Agent Baseline Profile MUST be a named input in the Build Manifest**,
> alongside the catalogs and the per-agent specs.

Then a baseline failure is attributable: either the profile was incomplete, or the
generator ignored it. Neither is a catalog gap, and the distinction is the
difference between a measurement and an anecdote.

---

## Open questions

- **The crosswalk's verdicts are first-pass.** Several rows marked *As-is* may hide
  a delta nobody has looked for yet — *incident response* was one until it wasn't.
- **B12 is the weakest item.** "Reproducible environment" is doing a lot of work in
  one line and probably wants splitting once something depends on the distinction.
- **Whether the profile should be versioned separately** from this document. It
  will be cited by manifests, which argues yes; it is twelve lines, which argues no.
