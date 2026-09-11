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

### G0.5 · Close the findings, spec first

Each as its own commit with its own tagged test, starting from the spec
statement it enforces:

| Finding | Statement it enforces |
|---|---|
| **F-016** any customer can act on any order *(critical)* | AOAS `P-OWNERSHIP` |
| **F-019** cost ceiling unreachable from the entrypoint | AOAS `Q-COST` |
| **F-020** three reply paths skip the guardrails | AAC — output screened on every path |
| **F-018** refund status answered as order status | AOAS — the refund-status operation, not yet declared |
| **F-014** refund amount ungrounded | AOAS `issue_refund.amount_from: order.total` |
| **F-017** idempotency key never leaves the process | AOAS external contract — the order system accepts a key |
| **F-021** approval expiry on the wall clock | AHC L9 — no clock outside the injected seam |
| extraction nonconformances — address never changed, R-STYLE/R-FRAUD unenforced | AOAS `change_address`, `R-STYLE`, `R-FRAUD` |

Also the reference's own `TODO.md` where it serves G1: T-001 (a session opening
is not expressible) is a missing AOAS operation, not a UI nicety.

### G0.6 · Fill the specs from what G0.1–G0.5 exposed

Every missing feature is one of three kinds, and each is completed differently:

| Kind | Examples | How it is completed |
|---|---|---|
| **In the code, missing from the spec** — most of them | circuit breaker, orphan-safe trimming, stored-transcript bound, mandatory tool result schema, typed malformed-output boundary, deterministic router, escalation ownership, lapse, caps and cooldown, spend by route | **Reverse-engineer**: capability + obligations, tag the existing test. The code barely changes — and without this, regeneration loses all of them |
| **Missing from both** | compaction by **summary** (today context bloat is handled only by dropping whole exchanges, and the code says why: a summary inherits the provenance of what it summarised); one error taxonomy; a map from each terminal state to what the user is told; a declared policy for malformed output | **Spec first**: capability and obligation, then build it, tagged tests, then scenarios |
| **Specified, broken in the code** | F-014, F-016–F-021 | G0.5 |

**From the NFR and cross-cutting audit** (ISO/IEC 25010:2023 and 26 concerns,
all 98 capabilities read; most rows covered). The genuine gaps, ranked by what a
regenerated agent would lose, each an agentic delta rather than restated
practice:

1. **Action-claim binding** — a statement that an action happened is checked
   against that action's recorded outcome. No capability discharges AAC-0110.
2. **Egress allowlist** — destinations reachable by tools, and by links or images
   in output, enforced outside the model.
3. **Cache keys include the resolved configuration** — otherwise a rollback is
   incomplete while caches serve the old model's answers.
4. **Retention and erasure across derived artifacts** — memory, summaries,
   checkpoints, fixtures, dataset rows. Nothing behind AAC-0095's retention half.
5. **Behavioural canary** — the Baseline's own delta row, answered by nothing.
6. **Tool-definition provenance and version** — descriptions are prompt text that
   can change remotely.
7. **Streamed-output screening** — AAC-0092 has nothing real to verify.
8. **Per-caller token and spend quota** — today only a design decision.
9. **Recalled memory fenced as untrusted and recorded per recall.**
10. **Prefix caching and token classes** — cached, uncached and reasoning tokens
    priced apart.

Also: caching mostly partial (prompt caching and invalidation on version change
are gaps), memory erasure does not reach summaries or checkpoints, versioning
omits the tool-definition text. Bookkeeping: AHC-0042 should discharge
AAC-0109; AAC-0096 asks for more cache-key dimensions than AHC-0068 requires.

**From the twenty-category harness check** (2026-09-11). Most categories map to
existing layers; these are new, each an agentic delta:

11. **Clarification as a typed outcome** — the run suspends awaiting the user's
    answer, distinct from escalation and from refusal.
12. **A model-produced plan is a typed, recorded artifact, validated before any
    step executes.** AHC-0072 covers declared topologies, not plans the model
    writes at run time.
13. **In-flight runs survive shutdown and upgrade** — every run is completed,
    checkpointed or visibly failed, never half-executed; a resumed run continues
    under the configuration it started with, or records the switch. Services
    drain in seconds; agent runs hold irreversible steps for minutes.
14. **Learned procedures are configuration** — anything the system writes that
    later instructs it (procedural memory, self-edited prompts) passes the same
    release gate as a prompt change. Episodic and semantic memory already map
    to sessions, compaction and the retrieval corpus.
15. **An agent manifest** — name, version, owner, lifecycle state and advertised
    capabilities. Partly in the harness profile's `subject`; owner and lifecycle
    are missing, and a multi-agent system needs it for discovery.

**From the context-engineering check** (eighteen categories, 2026-09-11). AHC
treats context as a *size* problem; **context rot is a quality problem that
starts long before the limit** — stale facts, a goal buried under turns,
failed attempts re-read and repeated. The strong rows are assembly, fencing,
secrets, retrieval and observability. The gaps:

16. **Freshness of facts in context.** A fact read from the world carries the
    time it was read; the AOAS declares how long each field stays fresh; a
    stale fact is re-read before an irreversible action relies on it. F-002 — a
    stale read became a false confirmation — is this, and today it is caught
    only after the fact by a guardrail.
17. **Act before the context is full.** A soft threshold with headroom, and the
    compaction rules as requirements: never move the stable prefix, whole
    exchanges only, anchor the goal and the last *n* turns. They exist only in
    the reference's own design doc (`docs/CONTEXT-BUDGET.html`).
18. **A summary inherits the least-trusted provenance of what it summarised.**
    Today a design question in AHC-0045 and a docstring in the reference.
19. **A structured facts record beside the transcript** — goal, entities in
    play, actions taken, what is pending. It resists rot, it is free, and it is
    the source the escalation handoff should be built from. Missing in both;
    the reference's `TurnNote` is its seed.
20. **Environmental facts are rendered by the harness and recorded** — time,
    locale, tenant, permissions — never inferred by the model, and captured so
    a run that saw "today" can be replayed.
21. **Segment priority is declared**, not left to a design question — what is
    pinned, what goes first.
22. **The budget's ruler is stated.** Provider tokens, or a declared
    approximation and its error: the reference counts characters because its
    provider has no token counter, which is a fair proxy for prose and a poor
    one for JSON.
23. **The tool surface is scoped to the request and stable in order** — what
    the model is offered follows identity and state, and does not reshuffle
    between calls (every reshuffle invalidates the cached prefix).
24. **Rot is measured.** Quality sliced by context-length bucket — a segment
    label (AHC-0090) and an obligation — or degradation with length is
    invisible.

**From the reasoning check** (ten categories, eight patterns). Reasoning
techniques are the model's, and they rot fastest; AHC is right to prescribe
none. What each technique needs *around* it is a component, and most exist —
budgets outside the model (AHC-0041), no-progress detection (0042), bounded
depth and fan-out (0048, 0097), the judge as a versioned component (0081–0084),
typed uncertain verdicts (0082), abstention (0063). The deltas not yet
recorded:

25. **An aggregation rule is declared and recorded** wherever several model
    outputs are combined — votes, debate, consensus, tree-of-thought branch
    selection — with its tie-break, so the combined answer is reproducible from
    the parts.
26. **Reasoning tokens are budgeted and accounted apart** — a thinking budget
    is a cost and latency control, and folds into item 10's token classes.

Planning (item 12), clarification (item 11) and verification of claims (item 1)
already cover the rest.

Deliberately *not* capabilities: topologies (supervisor–worker, swarm,
planner–executor), reasoning techniques (reflection, self-critique, consensus)
and plugin mechanisms. They are patterns and realisations; the first two go to
the pattern library in G0.7, the third to the binding.

**For the support agent, in G0**, the context work in the order its own design
doc already set — cheapest and most certain first: freshness before irreversible
actions (16), the facts record (19), a deduplicator over repeated tool calls,
then the soft threshold with anchored, exchange-safe compaction (17, 18) —
built spec-first, after measuring, because short support conversations may
never reach it.

Which of these the support agent needs now is itself a statement: it does not
stream, has no cross-session memory and no cache, so 7, 9 and most caching rows
enter its AOAS as **exclusions with a `revisit_when`**, not as work.

- **AHC** — about eighteen capabilities the reference has and no catalog
  requires: escalation (ownership lock, queue and lapse, what the customer is
  told, caps, over-escalation rate, `escalated` as an outcome); context
  (tool-call pair integrity, compaction trigger, transcript bound); errors
  (circuit breaker, unrecoverable termination, one taxonomy, terminal state →
  what the user sees); structured output (mandatory result schema, a repair
  path); deterministic-first (a rule-based router ahead of the model; a
  deterministic answer never reaches the model; the cost of each path recorded).
  Lifted from the module that does it, written to AHC's linter.
- **AAC** — the loop obligations the A6 archetype is thin on (trajectory,
  robustness), wherever G0.1 finds a tested behaviour no obligation names.
- **AOAS** — whatever G0.1's untagged tests describe that is domain behaviour.
- **Charter** — the pre-1.0 pinning clause (E8).

Every addition passes the domain-noun test: a universal spec never gains
"order", "refund" or "customer".

**AHC and AAC are filled in pairs.** Every capability names the obligations
that verify it, one to many. The existing catalog already holds to this: all 98
capabilities cite one to five obligations (291 links), and 108 of 110
obligations are cited back. The two that are not — **AAC-0109** (repetition
detected and broken) and **AAC-0110** (a claimed action is supported by its
result) — came from this reference in 0.12.0 and have no capability yet: two of
the eighteen, seen from the other side. Each new capability lands with its
obligations, new ones where the audit found none.

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
- **Compliance crosswalks** in AAC — ISO/IEC 42001, NIST AI RMF, EU AI Act.
  Only OWASP LLM exists today, so the governance Concern View cannot yet reach
  organisational governance. Not needed to generate an agent; needed to sell
  the audit.
- **Publish** — the convergence curve, the gap-type distribution, and what the
  generator contributed versus what the specification did.
