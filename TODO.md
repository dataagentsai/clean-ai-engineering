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
