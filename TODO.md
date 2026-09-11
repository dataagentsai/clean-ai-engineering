# TODO

The work that turns the family from **two catalogs and a draft** into a set of
specifications a generator can be handed — and a measurement that says whether
they were enough.

The programme and its reasoning are in the strategy repository (`43` — the
regeneration programme, `44` — the spec family). This file is the queue, in the
order the dependencies force. Each item says **what**, **why**, **where**, and
**done when**, because an item that says only "add X" gets re-argued every time
it is read.

**Standing constraint.** None of this is revenue work. It runs capped, in the
authority block, and before December only Tier 1 and Tier 2 are in scope.

---

## Tier 1 — The per-agent specs, extracted from the reference

The reference agent already *contains* all three per-agent specifications —
tangled into one world file, a strategy document and a stack page. Tier 1 is
separating them by the charter's routing rule. **Nothing here is authored from
an armchair**; every statement is lifted from something that runs, and a
statement that will not route cleanly is a finding, not an inconvenience.

The reference is **frozen at `v0.1.0`** while this happens. Where extraction
exposes a defect, it is recorded against the reference, not fixed in passing.

### 1.1 · The support agent's AOAS — worked example 1

- **What.** The support agent's behaviour and required properties, in the seven
  sections of [drafts/AOAS.md](drafts/AOAS.md), from doc 24, `worlds/clothing.yaml`
  and the policy, approval, escalation and identity code.
- **Why.** AOAS is upstream of the other two: the world is built to exercise what
  the AOAS declares, and the binding realises what it requires. Writing a real one
  is also the only honest way to settle the draft's open format question.
- **Where.** [drafts/examples/support-agent.aoas.yaml](drafts/examples/support-agent.aoas.yaml),
  with the extraction record beside it.
- **Done when.** Every operation, policy and threshold the reference enforces is
  stated; every one it does not enforce is stated too and marked as a
  nonconformance of `v0.1.0`; the statements that did not route are listed.
- **Status.** ✅ Done 2026-09-11. Eight routing findings (E1–E8) and four new
  nonconformances, in [the extraction record](drafts/examples/support-agent.extraction.md).
  E1 decides 1.2's first question: the shared condition vocabulary cannot state
  the ownership rule behind F-016. E8 needs a pre-1.0 pinning clause in the
  charter.

### 1.2 · AOAS schema and validator

- **What.** A JSON Schema for the machine-readable form, and a validator that
  checks an AOAS file against it plus the cross-references a schema cannot see
  (an operation's precondition names a field the entity declares; an escalation
  names a rule that exists).
- **Why.** Two of the three promotion conditions in the draft. And a validator is
  what makes an AOAS a contract rather than a document.
- **Where.** `drafts/aoas.schema.json`, `tools/` in this repo.
- **Done when.** The worked example validates, and a deliberately broken copy
  fails for each rule.
- **Status.** ✅ Done 2026-09-11. `npm test`: 22 rules, 41 table-driven cases,
  each asserting *which* rule fired; a meta-test fails if a rule is documented,
  emitted and exercised unequally. Catalog identifiers are checked against
  sibling checkouts when present. Format decided: the shared vocabulary plus
  `equals_session`, reopened only when a second rule outgrows it. The
  validator's first run caught an undeclared field in the example (E9).

### 1.3 · The AWD format, written down

- **What.** The world-description format as a specification: what `loader.py`
  already accepts, as prose plus a JSON Schema. Move both worlds into `agenttwin`
  as worked examples, and make them **cite the AOAS** for entities, operations and
  policies instead of restating them — so a world keeps only what is its own:
  fidelity, seed, records, actors, perturbations, resolution.
- **Why.** Today the policy lives *in the world file*. Under the charter it is an
  AOAS statement that the world projects. Until they are separated, a world and an
  agent spec that disagree have no way to be told apart from one that agrees.
- **Where.** `agenttwin` — `SPEC.md`, `schema/`, `examples/`. Resolves the
  README's open decision (fixtures versus worked examples): they are worked
  examples.
- **Done when.** `clothing.yaml` loads from AOAS + world, the reference suite
  passes unchanged, and no domain rule appears in both files.
- **Status.** ✅ Done 2026-09-11. `agenttwin` has `SPEC.md`, a JSON Schema and
  36 table-driven loader tests on a lending-library fixture. A world now *cites*
  its AOAS and the loader rejects one that declares entities, actions or
  policies. Reference suite 657 → 657. Six test fixtures changed shape (they
  built worlds in the old inline form); no assertion changed. **Revised on
  contact:** the worlds stay with the reference agent — they cite its spec and
  change with it — and `SPEC.md` links to them as the worked example.
  Electronics is now a 70-line RFC 7386 `extends` of the clothing AOAS instead
  of a 131-line fork. The world enforces one new rule the AOAS states (no
  refund of a refunded order), and reports six statements no world can enforce
  (ownership ×5, the address write) as `unenforced` instead of skipping them.
  One correction to my own reading: electronics' missing `required_when` was
  not drift — a test pins it — and the variant now deletes it explicitly.

### 1.4 · The support agent's ABS

- **What.** The binding for the reference build — each AHC layer, the capability
  identifiers it satisfies, the realisation, its version. Lifted from
  `docs/PRODUCTION-STACK.md`. Also takes `binding: mcp` out of the world file,
  where the charter says it cannot live.
- **Why.** Cycle 0 pins the binding (`43` §4). A pin that is not written down is
  not a pin.
- **First question.** The harness catalog already has a **harness profile**
  format (`schema/profile.schema.json`) whose `bindings` say which
  implementation fills each seam. If ABS is an instance of that format, it is
  not a new one — the charter's §1 test applies before anything is minted.
- **Where.** With the build: `reference-agent/spec/binding.yaml`.
- **Revised 2026-09-11.** Proposed as the reference's AHC **harness profile**:
  every capability its shape owes, either bound or an accepted gap. That is also
  how "the reference implements all of AHC" becomes a check instead of a claim.
  Best done after 1b, when the capabilities it answers for exist.
- **Done when.** Every layer has a row or a declared absence, and nothing in it
  would change what a customer experiences.

### 1.5 · The Build Manifest format

- **What.** A few lines of YAML naming the exact version of every input to one
  generation or evaluation run: AAC, AHC, Baseline profile, AOAS, AWD, ABS,
  generator model and settings.
- **Why.** Without it no cycle is reproducible, and "we regenerated and it
  improved" is unfalsifiable.
- **Where.** Format in [SPEC-CHARTER.md](SPEC-CHARTER.md) §1; one instance per run.
- **Done when.** A manifest exists for the reference itself, and the Baseline
  profile is a named input in it ([BASELINE.md](BASELINE.md) requires this).

## Tier 1b — Bring the reference and the catalogs level

Added 2026-09-11 from two review questions (`reference-agent` R-018, R-019).
**The key goal decides the order:** a spec set that, with a binding, regenerates
*similar* features and code when the reference is deleted — or for another
agent, shape or domain. So anything the reference does that no spec states is a
gap, and anything the specs require that the reference does not do is a defect.

### 1b.1 · Decompose the entrypoint — nine steps, each green

The `Agent` class is 481 lines doing eleven things; `handle` itself is 23. Steps,
each a commit that keeps the suite at 657+:

1. Type the seams: a `DeliveryLog` protocol; the existing seven protocols as
   parameter types instead of `object` + `type: ignore`.
2. Move the pure helpers to the layers they belong to (`_bind` → `contracts`,
   `_facts` → `escalation.rules`, `_note`/`_record` → `state`, `_refusal_text` →
   `router`), re-exported so tests importing them still pass.
3. `TurnPersister` — bound, checkpoint, record.
4. `HandoffDesk` behind a `Handoff` protocol, with a null desk replacing three
   `is None` branches.
5. `ApprovalResumer` behind a `PendingWork` protocol.
6. A `DirectHandler` registry keyed by the router's handler name.
7. A `RouteDispatcher` — route kind → handler.
8. `_turn` to ~30 lines: gates → route → dispatch → Tier 2 → **enforce** →
   record → persist.
9. `build` owns all wiring, including the meter and policy rules it cannot
   accept today.

Behaviour-changing fixes ride as their own commits with their own tests:
**F-018** (refund status), **F-019** (cost ceiling), **F-020** (guardrails on
every path), **F-021** (injected clock). Retag `v0.2.0`; freeze again before
cycle 0.

### 1b.2 · Reverse-engineer the AHC gaps

About eighteen capabilities the reference has and no catalog requires, across
escalation (ownership lock, queue and lapse, what the customer is told, caps,
over-escalation rate, `escalated` as an outcome), context (tool-call pair
integrity, compaction trigger, transcript bound), errors (circuit breaker,
unrecoverable termination, one taxonomy, terminal state → what the user sees),
structured output (mandatory result schema, a repair path), and
deterministic-first (a rule-based router ahead of the model; a deterministic
answer never reaches the model; the cost of each path recorded). Each lifted
from the module that does it, written to AHC's linter, with the reference test
that exercises it named in the commit — never in the capability, which may not
cite an agent.

### 1b.3 · Tell the generator the shape

AHC's scope excludes design principles, correctly. They route to two places:
a **Baseline profile item** — every AHC port is an interface, and only the
composition root constructs a realisation (the binding swap, the world swap and
regeneration all stand on it) — and the **A6 blueprint**: one module per layer,
ports as interfaces, one wiring point, extracted from the decomposed reference.
Without this, regeneration reproduces the god object.

**The principles the generator is held to** (stated by the owner, 2026-09-11),
cited rather than restated, each with the check that makes it more than a wish.
The citation anchor is ISO/IEC 25010:2023 *maintainability* — modularity,
analysability, modifiability, testability — already in the Baseline's reference
list; SOLID and clean-code practice are cited as the established reading of it.

| Principle | 25010 | How it is checked, deterministically |
|---|---|---|
| Single responsibility | modularity | function and class length limits; module size; one layer per module (import contract) |
| Open/closed | modifiability | variation by registry or strategy — a new route, handler or approvable action adds an entry, never edits a dispatcher (review + the F-018 test shape) |
| Liskov | modifiability | every port implementation passes the same contract test suite (in-memory and Postgres stores alike) |
| Interface segregation | modularity | protocols small and per-seam; no `object` + `type: ignore` in place of one (type checker) |
| Dependency inversion, loose coupling | modularity | business logic depends on protocols; only the composition root constructs (import contract + a construction check) |
| Limited blast radius | modularity | layered import contract with `exhaustive = true`; a change to one layer fails no other layer's tests |
| Low complexity, readable | analysability | cyclomatic complexity ceiling (`C901`), statements per function, nesting depth |
| Testable in isolation | testability | every collaborator constructible with fakes; no wall clock or network outside an injected seam (F-021 is the counter-example) |
| Meaningful names | analysability | review — the one row with no mechanical check, said so rather than pretended |

Thresholds are the adopter's, as everywhere in the family; the reference states
its own in its lint configuration. The decomposed reference (1b.1) is the first
thing held to them, so the rules are proven satisfiable before a generator is
asked to satisfy them.

---

## Tier 2 — The instrument, and cycle 0

Doc 43's WP1 and WP2. Nothing here can start before Tier 1, because the
generator's inputs are Tier 1's outputs.

### 2.1 · The black-box agent contract

- **What.** The interface the oracle drives *any* agent through — the chat
  surface, the tool seam the world projects into, the approval and escalation
  surfaces — stated so a regenerated agent can implement it without reading the
  reference.
- **Why.** Most of the reference's tests reach into its modules. An oracle that
  can only test the implementation it was written against cannot answer whether
  a *different* implementation is equivalent.
- **Done when.** The scenario suite runs against the reference through this
  contract alone.

### 2.2 · Package the oracle

- **What.** One command: an agent behind the 2.1 contract in, a report out —
  AgentTwin scenario pass rate, AAC obligations exercised, AHC layer coverage,
  Baseline profile items detected.
- **Done when.** The reference produces its report through it, with its
  not-exercised list intact.

### 2.3 · Pre-register

- **What.** Before the first generation: what counts as convergence, the
  generator pinned (model, version, settings, prompt), N runs per spec version,
  the gap classification (AAC · AHC · AOAS · AWD · Baseline · generator), and the
  **baseline decision** — does cycle 0 receive doc 24's prose or the formal AOAS?
  Only the first preserves WP3's measurement of what AOAS adds.
- **Why.** Otherwise the person writing the specs is the person judging the
  output, and the experiment cannot fail.

### 2.4 · Cycle 0

- **What.** Blind-regenerate the support agent from the manifest's inputs alone,
  N times. Classify every divergence at the moment it is found.
- **Done when.** A convergence count and a gap-type distribution exist, failures
  included.

---

## Tier 3 — After cycle 0

Deliberately later. Each depends on something cycle 0 will teach.

- **3.1 · WP3.** Re-run cycle 0 with the formal AOAS, if 2.3 chose prose for the
  baseline. The difference is the first real result.
- **3.2 · A second AOAS, chosen by shape.** A contrasting agent from `43` §5 —
  long-horizon stateful (hotel booking) is the strongest candidate. With 1.2 this
  meets the promotion condition, and AOAS earns its own repository.
- **3.3 · Close the reference's nonconformances** that 1.1 names — F-016
  (ownership), F-014 (ungrounded refund amount), F-017 (key stops at the process).
  They do not block cycle 0: the oracle measures against the specs, not against
  the reference. Retag when done.
- **3.4 · Concern tags and the derived views.** ISO/IEC 25010 vocabulary, plus
  *cost*, on every statement; an evidence method on every MUST; then generate the
  Assurance Map and the Concern View. Never hand-write either.
- **3.5 · The cross-reference check** for the dependency invariant — when the
  first violation appears, not before (charter §3).
- **3.6 · Free the binding** — cycle 0 again with the generator choosing its own
  stack. Its own experiment, publishable either way.
- **3.7 · World variants.** `electronics.yaml` is a fork of `clothing.yaml` where
  it should be a variant; it will not survive the tenth world.
