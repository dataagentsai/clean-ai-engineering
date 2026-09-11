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
