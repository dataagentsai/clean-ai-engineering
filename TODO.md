# TODO

The work that turns the family into a set of specifications a generator can be
handed — and a measurement that says whether they were enough.

Reasoning in the strategy repository (`43` — the regeneration programme, `44` —
the spec family). This file is the queue. Each item says **what**, **why** and
**done when**, because an item that says only "add X" gets re-argued every time
it is read.

---

## The three goals

| | Goal | Passes when |
|---|---|---|
| **G0** | **The customer support agent is solid — and the specs with it** | the reference passes the three build-time checks, every finding is closed or accepted, and every test traces to a spec statement |
| **G1** | **Regenerate the support agent into a separate folder, from the specs alone** | the reference stays where it is and is never read during generation; the generated agent passes the four gates below. If it does not, a spec is incomplete — and the divergence says which |
| **G2** | **The same universal specs generate a hotel customer support agent** | a blind generation from the universal specs plus a hotel AOAS and world passes the same four gates, with no hotel noun added to a universal spec |

**G0 comes first because it produces what G1 and G2 consume.** A god object
regenerated faithfully is not a success, and a spec extracted from code nobody
trusts is not a spec.

### One rule that joins G0 to G1: spec first, per change

Every change to the reference during G0 starts in a spec — the statement goes
into AOAS, AHC, AAC, AWD, the binding or the Baseline, placed by the charter's
routing rule — then the code, then a test **tagged with the statement's id**.
A change that cannot name its statement is either a gap (write the statement)
or not worth making. This is how "make the agent solid" and "make the specs
solid" become the same work instead of two.

### "Similar" is four gates, fixed before the first generation

Code is never diffed as a gate. A generation is similar when it passes:

| Gate | Measured by |
|---|---|
| **Behaviour** | the AgentTwin scenario suite, through the black-box agent contract |
| **Features** | the feature inventory — every tagged feature of the reference is exercised and passes |
| **Structure** | the blueprint: one module per harness layer, ports as interfaces, and the three build-time checks (strict types, import contract, size and complexity) |
| **Harness** | the harness profile: every capability the shape owes is realised or an accepted gap |

Line-level similarity is reported, descriptively, and never decides anything.

---

## Done

- **1.1 · The support agent's AOAS** — extracted from the reference, with the
  record of what did not route ([drafts/examples/](drafts/examples/)). E1–E9,
  four new nonconformances.
- **1.2 · AOAS schema and validator** — `npm test`: 22 rules, 60 table-driven
  tests. Format: the shared condition vocabulary plus `equals_session`.
- **1.3 · The AWD format** — a world cites the AOAS and cannot declare the
  domain (`agenttwin/SPEC.md`); electronics is a 70-line RFC 7386 variant;
  reference suite 657 → 657.
- **Review findings recorded** — F-018–F-021 and R-018/R-019 in `reference-agent`.

---

## G0 · The support agent solid, and the specs with it

In order. Each item is a series of commits that keep the suite green.

### G0.1 · Tag every test with the statements it discharges

- **What.** Extend the reference's `discharges` marker — today 92 tests, AAC ids
  only — to AHC ids and the agent's own AOAS ids (`P-CANCEL`, `R-STYLE`,
  `Q-COST`, operation names). Generate the **Assurance Map** from the markers.
- **Why.** It is doc 25's method, reused: write the cases, tag each with what it
  discharges, and **the unmapped remainder is the gap.** A test tagged with no
  spec statement is a feature no spec requires — exactly what G1 would lose. A
  statement no test tags is a spec nothing verifies.
- **Done when.** The map is generated, never hand-written, and lists both
  remainders. They become the work list for G0.6.
- **Status.** ✅ Done 2026-09-11. `discharges` takes AAC, AHC, Baseline and
  AOAS ids; an unknown id fails collection; `pytest --assurance-map` writes the
  map. Tagged **91 → 195 of 400** test functions; untagged 305 → 126; 66 tooling;
  13 **unwired** (tests of retry, throttle and breaker code the agent never
  calls — F-022). Exercised: AOAS 24/33, AHC 29/60, Baseline 4/12, AAC 41/49 —
  AAC fell because 23 wrong ids were removed. The untagged remainder, with a
  proposed statement for each, is in `reference-agent/evals/tagging/` and is
  G0.6's work list. Headlines: authentication and deterministic routing have no
  spec; escalation and approval rules have no citable ids; two spec conflicts
  (cancel authority vs AHC-0057; wait estimates vs the AOAS). F-022–F-026.

### G0.2 · One tag scheme across all six specs

- **What.** Two axes shared by every spec. Anything more has to earn its place
  the way a principle does, by driving a generated view or a check.

  | Axis | Values, cited not invented | Authored or derived | Drives |
  |---|---|---|---|
  | **`phase`** | ISO/IEC/IEEE 12207 technical processes: requirements · architecture · design · implementation · verification · operation | **Derived** from where a statement sits: AOAS → requirements; AHC requirement and position → architecture; AHC design decisions and the blueprint → design; the binding → implementation; AAC obligations and AWD scenarios → verification, with AAC's stage placing S5–S6 in operation. Never tagged per item | the generation brief, assembled phase by phase: requirements, then architecture, design and verification, the order a builder works in |
  | **`concern`** | ISO/IEC 25010:2023's nine quality characteristics, plus **`cost`** as the one agentic addition | **Authored** on every statement: AAC obligation, AHC capability, AOAS item, AWD scenario | the **Concern View**: everything about privacy, cost or reliability across all six specs on one generated page. An NFR is a statement whose concern is not functional suitability, so this *is* the NFR view |

- **Why derived for phase.** The family's artifact split already is the phase
  split, because each artifact answers a different kind of question with a
  different verification method. Tagging phase per item would restate the file
  a statement lives in, and a restatement drifts.
- **Revising what exists.**
  - AAC's eighteen home-grown `dimension` values become **facets under a
    concern**, through a crosswalk (e.g. `privacy` → security · confidentiality;
    `latency` → performance efficiency; `grounding`, `trajectory`, `tool-use` →
    functional suitability; `observability` → maintainability · analysability;
    `cost` → cost).
  - AAC's `stages` gain their derived 12207 process.
  - AHC gains `concern`.
  - Layers, positions and archetypes stay as they are. They are structural
    axes, not phase or concern.
- **Where.** The rule goes into the Spec Charter as a new section on tags; the
  crosswalk goes into AAC's taxonomy; the linters enforce presence and vocabulary.
- **Done when.** Every statement in all six specs has a concern, every phase is
  derivable, and the Concern View and Assurance Map are generated from the tags.

### G0.3 · The three build-time checks, strict types first

- **What.** A type checker in strict mode, in the lint run and the suite. The
  seven existing protocols as parameter types instead of `object` +
  `type: ignore` (nineteen today); `assert_never` on every match over a typed
  union; a `DeliveryLog` protocol. Then size and complexity ceilings.
- **Why.** Catch at build time what today is caught only if a test happens to
  run it. After this, every later step is checked the moment it lands.
- **The rule it follows.** A design principle enters the spec only as a
  deterministic check; everything else is a citation — ISO/IEC 25010:2023
  *maintainability*, with SOLID and clean-code practice as its reading. Three
  checks, not a list:

  | Check | Catches, before anything runs |
  |---|---|
  | **Strict static typing** | a component that does not satisfy its interface; the wrong implementation wired; a new result or route kind nobody handles |
  | **The import contract** — layered, exhaustive; only the composition root imports realisations | coupling, a dependency pointing the wrong way, a change whose blast radius crosses a layer |
  | **Size and complexity ceilings** | the god object, before it is 481 lines |

  Readability and naming stay review, and say so.
- **Status.** ✅ Done 2026-09-12. In `reference-agent`: mypy strict (plus
  exhaustive matches and ignore-with-code) passes on the whole package; the
  checks run inside `pytest` (`tests/test_build_checks.py`), verified by
  planting a type error. Collaborators typed `object` now carry their protocols;
  a `DeliveryLog` protocol is new; `type: ignore` 19 → 2, both at the vendor SDK
  boundary. Both matches over a typed union end in `assert_never`. Ceilings as a
  ratchet at today's worst — complexity 14, statements 50, branches 12, module
  744 lines — for G0.4 to lower. **Not yet enforceable:** "only the composition
  root constructs a realisation", because `serve.build` and
  `scripts/run_server.py` still wire; it becomes an import contract at G0.4
  step 8.

### G0.4 · Decompose the entrypoint

The `Agent` class is 481 lines doing eleven things; `handle` itself is 23.

1. Move the pure helpers to their layers (`_bind` → `contracts`, `_facts` →
   `escalation.rules`, `_note`/`_record` → `state`, `_refusal_text` → `router`),
   re-exported so tests importing them still pass.
2. `TurnPersister` — bound, checkpoint, record.
3. `HandoffDesk` behind a `Handoff` protocol; a null desk replaces three
   `is None` branches.
4. `ApprovalResumer` behind a `PendingWork` protocol.
5. A `DirectHandler` registry keyed by the router's handler name.
6. A `RouteDispatcher` — route kind → handler.
7. `_turn` to ~30 lines: gates → route → dispatch → Tier 2 → **enforce** →
   record → persist.
8. `build` owns all wiring, including the meter and policy rules it cannot
   accept today; `scripts/run_server.py` and `serve.build` stop wiring.

Each extracted collaborator either maps to an AHC capability or is a gap for
G0.6 — the entrypoint's version of "a layer with no module is a finding".

**Status — the entrypoint: ✅ done 2026-09-12**, eight commits, suite green and
strict types clean after each (683 → 689 tests). `Agent` went from 481 lines
doing eleven things to an orchestrator whose `_turn` reads as its sequence;
the module from 744 to 305 lines, with four collaborators beside it — each one
job, each behind a protocol, each with a null object where the old code
branched on `None`:

| Collaborator | One job | AHC it realises |
|---|---|---|
| `TurnPersister` | bound, checkpoint, hand back what was stored | AHC-0044, AHC-0067 |
| `HandoffDesk` / `NoDesk` (`Handoff`) | hold, lapse, Tier 1 and Tier 2 raises, reply wording | AHC-0070 — and the escalation gaps in GAPS.md §1 |
| `ApprovalFlow` / `NoApprovals` (`PendingWork`) | offer the request tool, resume a decision | AHC-0057 |
| `direct.HANDLERS` | deterministic answers by the router's handler name | **none** — deterministic-first is a catalog gap |

Also: pure helpers moved to the layers that own their data; serve now takes
the agent's own stores and refuses a different one at startup (it could have
worked a different escalation queue from the agent's); F-018 is visible in the
registry instead of hidden; the module-size ratchet fell 744 → 449. Deviation
from the plan, kept deliberately: the four-way dispatch stayed a method, not a
`RouteDispatcher` class — a class around one exhaustive `match` adds a hop and
removes nothing. **Next here: the other oversized units** — `loop.run` first.

**Then the other oversized units**, measured in code lines excluding docstrings,
in this order:

| Unit | Size | What it mixes |
|---|---|---|
| `loop.run` | 151-line function | step execution, tool dispatch, budget checks, termination, and refund-specific approval handling — the loop imports `RefundRequested`, so a second approvable action edits the loop |
| `MCPToolClient` | 126-line class | listing, binding, the idempotency ledger, transport, error mapping; F-017 lives in the seam between guard and transport |
| `serve.build`, `reviewer.build` | 85 + 57, 92 | routes plus their own wiring, which belongs to the composition root |
| `approvals`, `escalation` | 330, 357 lines | pure rule, store, workflow and reply wording in one module each |
| `telemetry` | 449 lines | attribute names, span-shape validator, redaction, provider setup |
| `cassette` | 344 lines | fingerprint, file I/O, recorder, player — test infrastructure, last |

`policy` is cohesive and stays. The size ceilings of G0.3 start as a
**ratchet** — today's worst value, lowered after each step — so they block
growth from day one without blocking the refactor.

**Status — the other units: ✅ done 2026-09-12.** Every step green (690 tests,
strict types, import contract, span contract).

| Unit | Became |
|---|---|
| `loop.run` | a driver over `_Run`, one phase per method; the loop now catches a generic `contracts.ApprovalRequested` and no longer knows refunds exist |
| `MCPToolClient` | `MCPTransport` (the only MCP speaker) + `GatedTools` (the four P5 checks over any transport) |
| `serve.build`, `reviewer.build` | wiring only — handlers are module functions, desk state on `app.state` |
| `approvals`, `escalation` | packages: policy / store / workflow / refund, and wording / capacity / store / workflow |
| `telemetry` | names, redaction and the span contract split out; the runtime stays, because moving its globals would silently disable the span check |
| `cassette` | **kept whole** — its classes change together for one reason, the replay format |

**Ceilings, before → after:** complexity 14 → 8, statements 50 → 24,
branches 12 → 7, module 744 → 416 lines. **New build check:** only the module
that defines a store, client or transport may construct it — verified by
planting one. **Next: G0.5**, the behaviour-changing fixes, each from its spec
statement.

### G0.5 · Close the findings, spec first

Each as its own commit with its own tagged test, starting from the spec
statement it enforces:

| Finding | Statement it enforces |
|---|---|
| ~~**F-016** any customer can act on any order *(critical)*~~ ✅ 2026-09-12 | AOAS `P-OWNERSHIP` — enforced where the tool executes; the session travels in `_meta` |
| ~~**F-019** cost ceiling unreachable from the entrypoint~~ ✅ 2026-09-12 | AOAS `Q-COST` — a per-task meter from the config |
| ~~**F-020** three reply paths skip the guardrails~~ ✅ 2026-09-12 | AHC-0094 — a `REPLY` position screened where every reply leaves |
| ~~**F-018** refund status answered as order status~~ ✅ 2026-09-12 | AOAS `P-REFUND-STATUS`, declared first |
| ~~**F-014** refund amount ungrounded~~ ✅ 2026-09-12 | AOAS `issue_refund.amount_from: order.total`; `agent_when` gained "returned" — the threshold alone let a planted note ask for a refund of a shipped order |
| ~~**F-017** idempotency key never leaves the process~~ ✅ 2026-09-12 | AOAS external contract — the order system accepts a key, and the stand-in replays a write it has answered |
| ~~**F-021** approval expiry on the wall clock~~ ✅ 2026-09-12 | AHC L9 — no clock outside the injected seam; `now` required, so a missed clock is a type error |
| ~~**F-022** retry, throttle and breaker never called~~ ✅ 2026-09-12 | AHC-0005, AHC-0021, AHC-0024 — `ResilientLLM` at the model choke point |
| ~~**F-023** the tool-result bound misses structured results~~ ✅ 2026-09-12 | AOAS `Q-TOOL-RESULT` — one rendering, measured and sent |
| ~~**F-024** with no escalation store the agent still promises a colleague~~ ✅ 2026-09-12 | AAC-0110 and AOAS `escalate.on_refusal` (new) — it refuses, and `Escalated` now requires a ticket |
| ~~**F-025** the repeated-intent rule cannot fire~~ ✅ 2026-09-12 | AOAS `facts.repeated_intent` now declares `derived`; validator rule `undefined-fact`. The dissatisfied-customer half is a catalog gap (GAPS §7) |
| ~~**F-026** a blocked reply keeps the result type it was~~ ✅ 2026-09-12 | AHC-0017, AHC-0094 — a blocked completion is `Refused`; what the turn did keeps its type |
| ~~extraction nonconformance — the address never changed~~ ✅ 2026-09-12 | AOAS `change_address` — a projected tool carries the operation's declared inputs; both worlds' `unenforced` lists are empty |
| ~~extraction nonconformance — R-STYLE/R-FRAUD unenforced~~ ✅ 2026-09-12 | AOAS `R-STYLE`, `R-FRAUD` — routed, with the served near-misses in the same table |

Also the reference's own `TODO.md` where it serves G1: T-001 (a session opening
is not expressible) is a missing AOAS operation, not a UI nicety.

- **Status.** ✅ Done 2026-09-12. Every finding closed, each from the statement
  it enforces, each proven by disabling the fix and watching the tests fail.
  **657 → 756 tests.** Exercised: AOAS 32/34, AAC 41/49, AHC 33/60, Baseline
  4/12; 0 unwired. Both worlds' `unenforced` lists are now empty, and that is
  pinned. Five changes went into the specs rather than the code, which is the
  point of doing it this way: `issue_refund.authority` gained "returned" (the
  threshold alone let a planted note ask for a refund of a shipped order),
  `escalate` gained `on_refusal`, every fact gained `derived` with a new
  validator rule behind it, AOAS.md states that a condition list is a
  conjunction, and AgentTwin's projection carries an operation's declared
  inputs. **Two decisions still want an answer** — cancel authority (the AOAS
  lets the agent cancel alone; AHC-0057 asks for approval on anything
  irreversible) and wait estimates (the AOAS says tell them nothing about time;
  the code gives a measured estimate). Both are live in the code as the AOAS has
  them.

### G0.6 · Fill the gaps the support agent actually hits

The catalog-wide gaps found by five audits live in **[GAPS.md](GAPS.md)** — a
register, not a queue. G0.6 takes from it only what G0.1's Assurance Map shows
this agent hits, plus what G0.1–G0.5 expose directly. Every missing feature is
one of three kinds:

| Kind | How it is completed |
|---|---|
| **In the code, missing from the spec** — circuit breaker, orphan-safe trimming, the deterministic router, escalation lapse and caps, mandatory result schema | **Reverse-engineer**: capability + obligations, tag the existing test. Without this, regeneration loses them |
| **Missing from both** — freshness of facts before irreversible actions, the structured facts record, summary provenance, one error taxonomy | **Spec first**: capability and obligation, then build, tagged tests, then scenarios |
| **Specified, broken in the code** — F-014, F-016–F-021 | G0.5 |

For the support agent the context work runs in the order its own design doc
set: freshness (register 16), the facts record (19), a deduplicator over
repeated tool calls, then the soft threshold with anchored, exchange-safe
compaction (17, 18) — after measuring, because short support conversations may
never reach it. What it does not need (it does not stream, has no cross-session
memory, no cache) enters its AOAS as exclusions.

Also here: the charter's pre-1.0 pinning clause (E8), and AHC-0042 discharging
AAC-0109.

- **Status.** ✅ **Done 2026-09-12** for the statement half; the build half
  (freshness before an irreversible action, the structured facts record, summary
  provenance, one error taxonomy) stays in the register for G0.8 and beyond.
  **Every test now names a statement or declares why it cannot: untagged 126 →
  0.** Two tests assert a *gap* and say so through a new `documents_gap` marker,
  which lists them with their reason rather than counting them as oversights.
  Exercised: AOAS 50/55, AAC 42/50, AHC 44/67, Baseline 6/12 — the AOAS
  denominator grew from 33 to 55 as prose became statements.

  Seven capabilities and one obligation were written, each because a test here
  verified something no specification required:

  | New | States |
  |---|---|
  | **AAC-0111** | a request acts only as the identity its credential proves |
  | **AHC-0099** | that identity comes from a credential the caller cannot author |
  | **AHC-0100** | a request the specification can answer without the model is answered without it |
  | **AHC-0101** | spend is computed from a declared price table; an unpriced call is an error |
  | **AHC-0102** | state is written whole, and every substrate declares whether it survives the process |
  | **AHC-0103** | reduction never separates a call from its result |
  | **AHC-0104** | what may run concurrently is declared by class, not decided by convenience |
  | **AHC-0105** | a recording replays only against the request that produced it, and a miss fails the run |

  In the AOAS: the approval and escalation rules became id'd statements carrying
  their own parameters (thirteen of them), `P-DIRECT` and `P-DIRECT-READS` state
  which requests skip the model and that the path never writes, and the
  idempotency key against the domain identity is settled — different questions,
  both answered, each with a test.

### G0.7 · Tell the generator the shape

- **Baseline** — one profile item: every harness port is an interface, and only
  the composition root constructs a realisation. The binding swap, the world
  swap and regeneration all stand on it.
- **The A6 blueprint** in AHC — the module map, ports and single wiring point,
  **extracted from the decomposed reference**, not designed beside it.
- **The pattern library** — informative like realisations, each pattern citing
  the capabilities it discharges: *no pattern without a capability*. Blueprints
  reference patterns; capabilities never do. Three families to start:
  - **Orchestration** — router ahead of the loop, ReAct loop, saga with
    compensation, outbox, supervisor–worker.
  - **Reasoning** — direct, planner → executor, tree of thoughts, reflection,
    reviewer, debate, consensus, supervisor; each with its best use and the
    components it cannot run safely without.
  - **Context** — the reference's seven handlers (bounder, deduplicator,
    offloader, trimmer, structurer, compactor, selector) and its *which handler,
    given what signal* table, lifted out of `docs/CONTEXT-BUDGET.html`, where a
    regenerated agent would never find them.

### G0.8 · Complete AgentTwin — prove the agent works in simulation

The 657 tests prove the parts. Almost all of them script the model. **What
they do not prove is that the agent, with a real model, handles real
conversations against a world that misbehaves.** AgentTwin is the instrument for
that, and it is not finished.

- **A scenario format in AWD.** Scenarios live in pytest today, welded to this
  implementation. A declarative scenario — world, actor, perturbations, and
  assertions over the run — is what lets the same suite judge a regenerated
  agent in G1 and a hotel agent in G2 without new code.
- **Actors and perturbations into the format.** The customer (scripted,
  state-machine, or model-driven), the approver and the desk colleague; and slow
  systems, stale reads and channel errors — declared, not constructed in Python.
- **The black-box agent contract** — chat, the session opening, the tool seam
  the world projects into, the approval and escalation surfaces — so a scenario
  drives any implementation without importing it.
- **Coverage from the spec, not from taste.** Every AOAS operation on both sides
  of every policy boundary; every escalation rule; approvals granted, refused
  and expired; adversarial content in fields someone else wrote; each
  perturbation against each irreversible operation; multi-turn customers who do
  not know their order number. The Assurance Map (G0.1) says which statements no
  scenario reaches.
- **The simulators, against what exists** (checked 2026-09-11):

  | Simulator | Today | Missing |
  |---|---|---|
  | Human — personas | scripted and state-machine customers; approver; desk colleague | a declared persona catalogue (does not know the order number, impatient, second language); the model-driven customer is a declared seam, not built |
  | External systems | the world projected as a tool server (`mock`); recordings (`replay`) | `shadow` — call real, serve mock, diff |
  | Data | constrained combinatorial eligibility cases (in the reference, driven by the world) | generation driven by the AOAS and moved into AgentTwin; bulk synthetic records |
  | Time | a timeline that schedules faults by call number | **a world clock that advances** — days since delivery, approval and escalation expiry. G2 needs it first: a hotel is all dates |
  | Chaos and network | slow, channel error, stale read — on the tool channel | **the model provider as a perturbable system** — throttling, outage, malformed output. It is an external dependency, so it belongs in the world; today it is only scripted in unit tests |
  | Cost | not simulated — measured | stays measured: live runs report cost per scenario; budget exhaustion is a harness test. AgentTwin twins the world, never the agent's model |

- **The attack suites, against what exists:**

  | Suite | Today | Missing |
  |---|---|---|
  | Prompt injection | one planted instruction in a field someone else wrote, a handful of cases | a generated set, hundreds of cases, across every untrusted field and tool result |
  | Hallucination | the truth oracle (state claims against the world) and entity grounding | a generated knowledge-mismatch set |
  | PII leakage | card-number echo guard, telemetry redaction | a leakage set across replies, traces and stored transcripts |
  | Jailbreak | none as a suite | a generated set |
  | Latency and load | none — AAC-0007 declared not exercised | load against the live provider, through the fan-out limiter |
  | Memory poisoning | not applicable — no cross-session memory | an exclusion with `revisit_when`, until memory exists |
  | Tool abuse | scope tests | F-016 is exactly this and is open; a generated set of cross-customer and out-of-scope calls |

  **Attack suites are generated scenario sets, derived from obligations.** The
  AAC obligation says what must hold; the AWD format carries a generator, a seed
  and a count, so "two hundred injection cases" is one declaration, reproducible,
  and runs unchanged against a regenerated agent. Attack corpora and red-team
  tools are realisations and are named only in the binding.

- **Live runs.** The real model, N runs per scenario, **scored as pass rates,
  never as pass/fail**, with cost per scenario — on the free hosted provider the
  reference already uses.
- **Done when.** The reference passes its scenarios through the contract alone,
  and a **simulation report is published with its failures in it** — the
  artifact that proves the agent works, and says exactly where it does not.

### G0.9 · The binding and the manifest

- **Binding spec** — proposed as the reference's AHC **harness profile** (the
  format already exists): every capability its shape owes, realised or an
  accepted gap. It is also how "the agent implements all of AHC" becomes a check.
  Takes `x_binding` out of the worlds.
- **Build Manifest** — the exact version of every input to one generation:
  AAC, AHC, Baseline, blueprint, AOAS, AWD, binding, generator.

### G0.10 · The reuse audit — what is the same agent to agent, and what is not

**The question.** If the same specs are used to build a different agent, how
much of the code is the *same code*? G1 asks whether the specs regenerate this
agent; G2 asks whether they travel to another domain. Neither asks what
proportion of what comes out is shared, which seam each difference sits behind,
and which pattern holds it. Without an answer, "similar structure" in G1's
third gate is judged by eye.

**A first measurement, 2026-09-12, on the reference alone.** Of 5,182 executable
lines (docstrings and comments excluded), **175 (3.4%) carry an entity or
operation word**, and a further 73 (1.4%) carry only the actor's name —
`customer`, which a hotel would call a guest. **32 of 50 modules carry none.**
The concentration is where it should be: `approvals/refund.py` 28%,
`entrypoint/direct.py` 22%, `approvals/policy.py` 44%, `router` 13%.

Treat that as a floor, not the answer. It counts words, and the per-agent
surface is larger than its vocabulary: reply templates, thresholds, TTLs, price
tables, desk capacity, refusal patterns and escalation rule sets are all this
agent's and name no entity. The measurement took three corrections before it was
honest — `border` contains "order", `return` is a keyword, docstrings are prose —
which is the argument for classifying by **declaration** rather than by grep.

**Three layers, and the exercise is to place every module in one.**

| Layer | What it is | Reference examples |
|---|---|---|
| **Mechanism** | Universal; no agent's domain reaches it. This is the AHC surface | loop, context, tools, ledger, telemetry, resilience, cost, state stores, approval and escalation *workflows*, the policy *engine*, the edge |
| **Parameterised mechanism** | Universal code, per-agent values. The dangerous middle: it *looks* shared and behaves differently per agent | `router.Rules`, `t2.RuleSet`, `approvals.Policy` (threshold, TTL, owed states), `CLAIM_PATTERNS`, the price map, `Capacity`, the wording templates, the scope names |
| **Per-agent** | Exists because this domain exists | `entrypoint/direct.py` handlers, `approvals/refund.py`, `contracts/domain.py`, the worlds |

**What the exercise must decide, per item in the lower two layers: which seam
holds it.** The reference already demonstrates five, and the audit's job is to
say which is right where, and why — not to invent a sixth:

- **Registry keyed by a declared intent** — `direct.HANDLERS`, with a test that
  every intent the router names is registered.
- **Versioned rule set as data** — `router.Rules`, `escalation.RuleSet`: one
  engine, the agent's values, a version on the values.
- **Protocol with a null object** — `Handoff`/`NoDesk`, `PendingWork`/
  `NoApprovals`: absence is a realisation, not a branch.
- **Template rendering** — `escalation.wording`, the direct route's reply
  templates: the words are the agent's, the rendering is not.
- **Projection from the specification** — AgentTwin derives a tool surface from
  the AOAS and no longer names a single domain noun. **This is the strongest
  seam and the least exploited**: the open question is how far it reaches into
  the agent itself. `CLAIM_PATTERNS` is already checked for completeness against
  the world's irreversible operations — half-derived. Could the refusal rules
  come from `purpose.refuses`, the direct routes from `P-DIRECT`, the approval
  policy from `issue_refund.authority`? Every one of those that becomes derived
  is a per-agent file that no longer has to be written, or regenerated, or kept
  in step.

**The constraint that decides the shape of the answer.** *No framework* is
locked, and for a reason the catalogs exist to serve: a framework owns L4, L1
and L10. So "hoist the mechanism into a library both agents import" is not
automatically the answer, and the audit must choose between three models with
evidence rather than taste:

| Model | Reuse mechanism | Cost |
|---|---|---|
| **Library** | The mechanism is a package; agents import it | The framework hazard, in the layers the catalogs exist to expose |
| **Regeneration** | The specs are the reuse; every agent emits all of it | Sameness is measured, never enforced; drift between agents is invisible |
| **Hybrid** | Ports and patterns fixed by the blueprint; code regenerated; only mechanical, domain-free adapters shared | Two mechanisms to keep honest, and a line to defend about which is which |

**Done when** every module carries a layer, every per-agent item names the AOAS
statement that produces it (or is recorded as having none — which is a spec
gap), each seam names its pattern, one model is chosen with its reasons, and a
**predicted reuse ratio is written down before the hotel agent exists**. The
prediction is the point: measured afterwards it is a rationalisation.

**Ordering.** After G0.7, whose blueprint this feeds and which feeds it back.
The measurement half is G2.6.

**G0 is done when** `v0.2.0` is tagged with: the three checks passing, every
finding closed or accepted, the Assurance Map showing no untagged test, and a
complete harness profile. Then it is frozen.

---

## G1 · Regenerate the support agent into a separate folder, from the specs alone

The reference is kept — it is the comparison — and is never read while
generating. Keeping it on the same machine makes blindness something to
enforce, not assume.

### G1.1 · Pre-register

Before the first generation, written down and committed:

- the four gates and their thresholds;
- **the blind protocol** — the generation folder holds only the manifest's
  bundle, and sits **outside the home directory** (e.g. under `/Users/Shared`),
  so no parent `CLAUDE.md` and no project memory that describes the reference
  is loaded; the session's settings **deny reads** of the reference, AgentTwin's
  worlds and the strategy repository; one fixed, short prompt. A remote session
  that holds only the bundle is the stronger version of the same thing. A
  generator that can read the reference, or whose instructions describe it, is
  not blind;
- the generator pinned — model, version, settings — and **N = 3** runs per spec
  version, because one run says nothing about a stochastic generator;
- the gap classes, from the routing rule: AAC · AHC · AOAS · AWD · binding ·
  Baseline · blueprint · **generator** — the last for failures a second
  generator does not reproduce.

### G1.2 · Package the oracle

One command: an implementation behind the agent contract in, the four gates out.

### G1.3 · Cycle 0, then cycles until convergence

Generate N times; run the gates; **classify every divergence the moment it is
found**, fix it in the spec the routing rule names, and regenerate. Record the
number of cycles and the distribution of gap types. That curve, and that
distribution, are the result.

---

## G2 · The hotel customer support agent from the same universal specs

**What stays the same:** AAC, AHC, Baseline, blueprint, and the binding. **What
is new:** a hotel AOAS and a hotel world — and nothing else.

### G2.1 · Write the hotel AOAS — with no reference to extract from

Written from the domain, as a domain owner would. It is the test of whether
AOAS is writable without code. **Expected to strain the format**: bookings are
long-horizon and stateful — holds that expire, modification windows, dates
compared with dates, availability contended by other guests. A condition over
two fields (check-in against the cancellation deadline) is the trigger, already
written down, for moving all four condition consumers to an expression language
at once.

### G2.2 · Write the hotel world and scenarios

In the G0.8 scenario format. There is no reference implementation, so **the
oracle is these scenarios** — derived from the hotel AOAS, the way the support
agent's eligibility cases were derived from its world.

### G2.3 · Generate, measure, classify

Same protocol as G1. Behaviour against the hotel scenarios; structure against
the same blueprint, so the two agents' module maps should be near-identical;
features against the universal part of the support agent's inventory
(escalation, context, errors, deterministic-first all carry over).

### G2.4 · Fix universal gaps, then re-run G1

Every gap G2 finds in a universal spec is fixed there — **and G1 is re-run**,
because a universal fix that breaks the support agent's regeneration was not
universal. This is the regression test for the whole family.

### G2.6 · Measure the reuse, against the prediction

G0.10 predicted the split from one agent. Two agents make it measurable: what
proportion of the hotel agent's code is byte-identical to the support agent's,
what is structurally identical under a rename, and what is genuinely its own.
**A divergence from the prediction is a finding about the specifications** — the
mechanism that came out different in the two agents was under-specified, and the
per-agent file that came out the same was universal all along and belongs in a
layer above.

### G2.5 · AOAS earns its repository

Two agents of different shape meet the promotion condition.

---

## Later

Deliberately after G2; each depends on something the goals will teach.

- **A third shape** — read-only advisory or fully autonomous — to see whether
  convergence cycles fall.
- **Free the binding** — the generator chooses its own stack. Does the spec
  still converge?
- **The cross-reference check** for the dependency invariant — when the first
  violation appears, not before (charter §3).
- **Actors and perturbations** into the AWD format; **shadow mode** built, so a
  world's fidelity is verified rather than asserted.
- **The catalog gap register** — [GAPS.md](GAPS.md): forty-odd AHC and AAC gaps
  from five audits, each an agentic delta. Filled in pairs, from running code
  where it exists, as agents hit them. G0.6 and G2.4 draw from it; the rest wait
  there, owned and dated.
- **Compliance crosswalks** in AAC — ISO/IEC 42001, NIST AI RMF, EU AI Act.
  Only OWASP LLM exists today, so the governance Concern View cannot yet reach
  organisational governance. Not needed to generate an agent; needed to sell
  the audit.
- **Publish** — the convergence curve, the gap-type distribution, and what the
  generator contributed versus what the specification did.
