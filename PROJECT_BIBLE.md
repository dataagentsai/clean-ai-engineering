# Clean AI Engineering — Project Bible

**Version:** 0.2 · **Status:** Canonical

This document defines the vision, principles, terminology, naming conventions and
writing standards for Clean AI Engineering. It is the top of the structure —
every other artifact in this body of work is answerable to it.

It is short on purpose. A principles document that cannot be read in one sitting
does not get read.

---

## The thesis

**Most AI systems should be ninety percent ordinary engineering with a small,
bounded model call.**

The interesting failures are almost never in the model. They are in the
scaffolding around it — the context that was assembled wrongly, the tool that
returned an empty list, the retry that charged the customer twice, the loop that
never stopped. That scaffolding is specifiable, buildable and testable by ordinary
means, and almost nobody publishes what it should contain.

Clean AI Engineering is the practice of treating that scaffolding as engineering.

---

## Goals, and non-goals

Non-goals matter more than goals here. Goals are things nobody argues with;
non-goals are what stop the work drifting.

| | |
|---|---|
| **Legible** | Every layer of a system is visible and named. A design that hides a concern has not simplified it |
| **Reproducible** | A past run can be re-run and will answer the same way, or the difference is explained |
| **Honest** | The evidence of value is a report with its failures in it |
| **Reliable**, in the only sense we can test | Effects happen exactly once, and a correct refusal counts as a success |

**Explicit non-goals.** Not scalable — this body of work is demonstrated by a
solo reference implementation, and designing for scale adds machinery that hides
the layers it exists to show. Not complete — a catalog is never finished, and an
identified, owned, dated gap is a better artifact than an undiscovered one.
**Not a framework.**

**Production grade is a goal, not a non-goal** (changed 2026-09-16; this line
used to read *"Not production-ready"*). Every spec and every binding is made
production grade by building agents of different shapes from them, adopting the
open source that best fits each concern and building only the delta. The cycle
that does it is in [TODO.md](TODO.md).

---

## The principles

Ten. Each states what it **forbids** — a principle that cannot be violated is not
a principle, it is decoration. Each also names a decision it has already made, so
none of these is aspirational.

### 1 · Cite, don't restate

Where another body of work already says a thing, point at it. Never re-author it
in your own words.

**Forbids:** authoring controls, threat taxonomies, metric formulas, telemetry
schemas.
**Already decided:** the assurance catalog's linter fails the build if a product
name appears in a case's normative text.

### 2 · State the property; never ship the mechanism

Say what must be true, or what must exist, and what breaks without it. Do not
ship the thing that satisfies it.

**Forbids:** an importable dependency, a scorer, a runner, a hosted service.
**Already decided:** both catalogs carry this as an explicit tripwire — if
repository code ever *evaluates* something, or `references/` ever ships as a
dependency, the boundary has been crossed.

### 3 · Deterministic-first

The model is the fallback, not the default. Every path that can be decided by
ordinary code should be.

**Forbids:** routing an unambiguous request through a model.
**Already decided:** the reference agent classifies intent deterministically
ahead of its loop; only ambiguity enters the loop.

### 4 · A boundary nobody checks does not exist

Every rule that matters is enforced by something that fails a build.

**Forbids:** a constraint that lives only in a README or a reviewer's memory.
**Already decided:** the catalog linters; and the reference implementation's
module layering, enforced by an import contract with `exhaustive = true`, so a
new module cannot be added without being placed in the architecture.

### 5 · Every seam substitutable

Depend on a declared shape, never on a concrete implementation. Model providers,
tools, retrieval, graders and stores are all swapped by configuration.

**Forbids:** importing a concrete client where an interface will do.
**Already decided:** this is what makes simulation possible at all. Without it
there is nothing to intercept, and no way to run a system against a world that
is not the real one.

### 6 · Build before you catalog

Write the entry the failure taught you. Do not write the entry you can imagine
at a desk.

**Forbids:** authoring obligations before the runtime that could observe them
exists.
**Already decided:** the assurance catalog carries six obligations about cost and
one about trajectory — because cost can be reasoned about at a desk and
trajectory cannot. That imbalance is the evidence for this rule.

### 7 · Nothing is added without naming what it discharges

The same rule appears at three altitudes: **no pattern without a capability it
discharges · no module without a declared layer · no project without a score.**

**Forbids:** the addition that is obviously a good idea and answerable to
nothing.
**Already decided:** all three are live rules today. This is the disciplined form
of "keep it simple" — simplicity is not an intention, it is a refusal.

### 8 · Fidelity is per-property

A simulation is faithful *about* something. Declare what, and assert only inside
that declaration.

**Forbids:** chasing global realism, which is unattainable and converts a
tractable problem into an infinite one.
**Already decided:** a cancellation test needs order status to be exactly right
and needs nothing at all from plausible product copy.

### 9 · The deliverable is a report with its failures in it

Value is demonstrated by a running conformance report that includes what broke.

**Forbids:** a green report as evidence.
**Already decided:** under a management-system audit, an identified, owned, dated
gap is conformant while an undiscovered one is a finding — so the honest artifact
and the audit-optimal artifact are the same artifact.

### 10 · Nothing exists until something outside cites it

An open standard with no external adopter is not a standard. It is a document.

**Forbids:** a version bump as a substitute for adoption.
**Already decided:** the catalogs are frozen at their current versions until one
external citation exists. A 0.3.0 nobody has read does not improve by becoming a
0.4.0 nobody has read.

---

## The parts

| Part | States | Repository |
|---|---|---|
| **Clean AI Engineering** | *why* — this document | `clean-ai-engineering` |
| **AI Assurance Catalog** (AAC) | what must be **TRUE** | `ai-assurance-catalog` |
| **AI Harness Catalog** (AHC) | what must **EXIST** | `ai-harness-catalog` |
| **AgentTwin** | what must be **FACED** | `agenttwin` *(forthcoming)* |
| **Reference implementation** | proof the three hold together | `reference-agent` *(forthcoming)* |

AAC and AHC are **AI-scoped**, not agent-scoped: their archetypes span
single-turn transforms, structured extractors, grounded answerers, conversational
assistants and deterministic workflows as well as agents. AgentTwin and the
reference implementation are agent-shaped, and are named accordingly — *agent*
appears where the work genuinely is agent-specific, and never above it.

**AgentTwin twins the agent's *world*, not the agent.** The agent under test is
real; its environment is the twin.

### The neutrality clause

**This practice is opinionated. The catalogs it draws on are not.**

Everything above is a point of view, and reasonable engineers reject parts of it.
The catalogs must remain adoptable by someone who thinks this entire document is
wrong — they state properties and components, prescribe no approach, and endorse
no product. Nothing in this bible may be smuggled into a catalog entry as though
it were normative.

If a catalog entry can only be satisfied by agreeing with a principle here, that
entry is defective.

---

## Terminology

Defined once, used consistently. Jargon is defined on first use everywhere else.

| Term | Meaning |
|---|---|
| **Harness** | Everything that is neither the model nor your business logic — the deterministic scaffolding that turns a model into a system |
| **Archetype** | A *test-surface* category, drawn by two questions only: who owns control flow, and what the output touches. Not a domain, sector or size |
| **Obligation** | A statement of what must be **true** of a system. Assurance catalog |
| **Capability** | A statement of what must **exist** in a harness. Harness catalog |
| **Layer** | *Which part* of the scaffolding a capability belongs to |
| **Position** | *Where* a capability is enforced — edge, gateway, library, loop, tool boundary, store, offline, human surface. The same capability at a different position is a different system |
| **Mechanism** | *How* a verdict is computed — assertion, metric, model-graded, trace, human, adversarial |
| **Stage** | *When* a check runs — dev, CI, pre-release, runtime, production, scheduled regression |
| **World** | The declared environment a system is exercised in: entities, systems, state, actors, timeline |
| **Twin** | A world that a system cannot distinguish from the real one, and whose divergence from it is measured rather than assumed |

---

## Naming conventions

- **Flat, permanent identifiers** — `AAC-####`, `AHC-####`. Never re-used, never
  re-numbered, citable from the first tag.
- **Categories are tags, not hierarchy.** Archetype, layer and position are
  attributes of an entry, not its address. Scoped identifiers force either a lie
  or a renumber the first time something belongs to two categories.
- **Draft identifiers are not citable.** Retained as `legacy_id` only.
- **Name the artifact, not the ambition.** A name that describes what a thing is
  outlives a name that describes what it hopes to become.
- **Check the acronym before minting it.** Identifiers are permanent, and an
  acronym that already resolves to something else is a self-inflicted wound.

---

## Writing standards

- **State the failure mode concretely.** Not "this may cause issues" — say what
  breaks, for whom, and how it is first noticed.
- **Name the tension, then resolve it.** Every non-obvious decision carries the
  argument against it. A decision recorded without its counter-argument cannot be
  revisited, only reversed.
- **Leaving a tension unresolved is permitted; hiding it is not.** An open
  question recorded as open is a contribution.
- **No product names in normative text.** Name the class of machinery, never the
  vendor.
- **Numbers, not adjectives.** "Forty-three of one hundred and eight" beats
  "many".
- **Prose where an argument is being made**, tables where facts are being
  compared. A bulleted list of assertions is neither.

---

## Licence

Specification and prose: **CC BY 4.0**. Code and tooling: **Apache 2.0** — the
patent grant is what corporate legal departments look for.
