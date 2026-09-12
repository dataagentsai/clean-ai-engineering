# The Spec Charter

**What a specification in this family is, and where any given statement belongs.**

Status: working draft 0.1.0.

---

## What this governs, and what it does not

This charter governs **form**: which artifacts exist, what each is for, where a
statement goes, and which way dependencies point.

**It governs form, not position.** Conforming to this charter implies no agreement
with anything in [PROJECT_BIBLE.md](PROJECT_BIBLE.md). The neutrality clause holds
unchanged — the catalogs must stay adoptable by someone who rejects the entire
practice, and a charter that smuggled the practice in through the back door would
defeat its own purpose.

Per principle 1, this document does not restate what is already written elsewhere:

| Already settled | Where |
|---|---|
| Identifiers, re-use, renumbering | Project Bible, *Naming conventions*; `docs/ID-POLICY.md` in each catalog |
| Writing standards | Project Bible, *Writing standards* |
| Neutrality | Project Bible, *The neutrality clause* |
| The AAC ⟷ AHC line | `docs/THE-AAC-BOUNDARY.md` in the harness catalog |
| Terminology | Project Bible, *Terminology* |

What follows is only what none of those cover.

---

## 1 · The register

Six authored artifacts. Three derived. Nothing else.

### Authored

| Artifact | States | Scope | Where |
|---|---|---|---|
| **Spec Charter** | what a spec in this family **is** | family | this document |
| **AI Assurance Catalog** (AAC) | what must be **TRUE** | universal | `ai-assurance-catalog` |
| **AI Harness Catalog** (AHC) | what must **EXIST** | universal | `ai-harness-catalog` |
| **Agent World Description** (AWD) | what must be **FACED** | per agent | `agenttwin` |
| **Application Operation Agent Spec** (AOAS) | what this agent must **DO**, and what must be **true of it** | per agent | draft — `drafts/` |
| **Agent Binding Spec** (ABS) | **which realisation** satisfies each capability | per build | with the build |

### Derived — generated, never hand-authored

| Artifact | Is |
|---|---|
| **Assurance Map** | the join across obligations, capabilities, behaviours, worlds and evidence |
| **Concern View** | everything tagged with one concern, gathered from all five sources |
| **Pattern View** | which patterns this agent needs, and the statement that made each one necessary |
| **Generation Brief** | everything handed to a builder, assembled from the five sources in phase order |
| **Build Manifest** | the exact artifact versions handed to one generation or evaluation run |

The moment a derived artifact is hand-edited it begins to disagree with its
sources, and it disagrees silently. Generate them or do not have them.

### The brief, and where "how to build it" lives

A builder — a person or a coding agent — needs more than the statements. It
needs to know how this family expects work to be done: that a seam with two
realisations gets an interface and a null object rather than a branch, that an
optional check is a list at a declared position rather than an `if`, that only
the composition root constructs a realisation. **That guidance is real and it
has to live somewhere, or it lives in a prompt somebody edits and nobody
versions.**

It lives in four places, and none of them is new:

| Guidance | Home |
|---|---|
| Universal engineering practice | the **Baseline** — cited from software engineering, never restated |
| The structure this shape uses | the **blueprint**, per archetype |
| When to reach for a pattern, and what it cannot run safely without | the **pattern library**, on each entry |
| Everything above, assembled for one generation | the **Generation Brief** |

> **The brief is assembled, never authored.** Every sentence in it resolves to a
> statement, a Baseline item, a blueprint entry or a pattern entry. A sentence
> that resolves to none of those is implementation detail moving upward, which
> §9 names as the failure mode of a regeneration programme — and it is most
> tempting exactly when a generation has just diverged.

The brief is pinned in the Build Manifest like any other input, because *which
guidance a generation was given* is part of what produced it.

### Why six and not more

An artifact earns separate existence only if it has **a different author, a
different rate of change, or a different audience.** Anything failing all three is a
section of an existing artifact, or a derived view.

That test is the whole reason this register is short, and it is the test a seventh
proposal must pass — naming which of the three it satisfies.

### Proposed artifacts, and where they went

Recorded so the question is answered once. An eight-part set was proposed on
11 September 2026. Five parts are artifacts already in the register; three are
cross-cutting concerns, which §4a of the spec-family decomposition settles: a
concern decomposes across the artifacts by modality and is kept visible as a
**generated view**, not a ninth document.

| Proposed | Here | Why |
|---|---|---|
| Agent Application Spec — business behaviour | **AOAS** | Same artifact |
| Agent Harness Spec — architecture, orchestration, memory, tools | **AHC** | L4 control loop, L5 state and memory, L3 tools |
| Agent Assurance Spec — quality, safety, evaluation, compliance | **AAC** | Compliance through its crosswalks |
| Agent Simulation Platform Spec | **AWD** | A description format and a reference runner — deliberately not a platform |
| Agent Binding Spec | **ABS** | Same artifact |
| Agent Deployment Spec — environments, scaling, secrets | **ABS** for the concrete choices, **AHC L15** for what agents change (model, prompt and tool schema in the rollback set; canary on behaviour), and the **Baseline** for the rest | Same author and change rate as the binding — fails the §1 test as a separate artifact |
| Agent Observability Spec — tracing, logs, metrics, cost, replay | **AHC L11, L9, L13** with their **AAC** obligations; the tools in **ABS** | A concern: generated as the observability Concern View |
| Agent Governance Spec — versioning, approvals, audit, policy | **AHC L15, L14, L16, L7**; **AOAS** policies and approval rules; this charter for spec versioning; organisational governance cited through AAC's ISO/IEC 42001 crosswalk | A concern: generated as the governance Concern View |

A reader who wants eight documents gets eight pages: five authored, three
generated. The three generated ones cannot disagree with their sources.

---

## 2 · The routing rule

Three questions place any statement. The harness catalog's boundary document
answers this for two artifacts; this extends it to all six.

> **1 · Does it hold for every AI system, or only this one?**
> Every system → a **universal catalog**. This one → a **per-agent spec**.
> *Test: does it name a domain noun?* Order, room, refund, patient are domain nouns.
>
> **2 · What kind of statement is it?**
> A property → **AAC**. A component → **AHC**. An environment → **AWD**.
> A behaviour, or a threshold true of this agent → **AOAS**.
>
> **3 · Does it name a realisation?**
> Yes → **ABS**. It is a binding, not a specification, however much it feels like
> design.

### Patterns are not statements

The three questions place a *statement*. They do not place a **pattern** — a
router ahead of the loop, planner then executor, reflection, a reviewer, a saga
with compensation, supervisor and workers; or, on the software side, a registry,
a strategy, a null object, a decorator. A pattern is not a property, a
component, an environment, a behaviour or a realisation, and for a while this
document had no answer for it.

> **A pattern is informative, exactly as a realisation is. It cites the
> capabilities it discharges and it never adds an obligation.**

If adopting a pattern makes something newly *required* — a supervisor must own
shared state, a compensation must be idempotent — that requirement is a
capability or an obligation and belongs in a catalog, discharged by the pattern
rather than declared by it. Without this rule the pattern library becomes the
back door through which normative content re-enters, and the catalogs stop being
neutral about how you build.

**Where the choice is recorded, then, is three places and the first is the
largest:**

| Which pattern | Where | Why there |
|---|---|---|
| The one the agent's own statements **force** | **Derived** — the Pattern View | `P-DIRECT` forces a deterministic route ahead of the loop; `authority: human_approval` forces a gate that returns rather than blocks; an irreversible operation with a declared compensation forces a saga; `owed_when` forces an omission check. None of these is a free choice, and writing them down again as decisions would be a second statement of a rule that already exists |
| The one this **shape** normally uses | The **blueprint**, per archetype | Informative, and the place a generator reads for structure |
| The one that is a **genuine trade-off** — reflection against a reviewer, one loop against supervisor and workers | The **profile's `decisions` block**, with its `source` | The harness catalog already holds the trade-off unresolved in `design_decisions`; the profile is where a system resolves it. *A default is permitted, a silent default is not* |

**When.** At generation time, from the specifications, and recorded before the
code exists — pinned in the Build Manifest with the blueprint and library
versions it read. A pattern that can only be discovered by reading the
implementation is one a regeneration cannot reproduce, which makes it a finding
rather than a decision.

### The tension, named

Question 1 is the one under pressure. When a per-agent spec is missing something,
the cheapest fix is always to add it to a catalog, and each individual addition
looks reasonable. A dozen of them and the catalogs are no longer universal —
they are a specification of one company's domain wearing a general name.

**The domain-noun test is what makes that pressure resistible**, because it
converts a matter of judgement into a matter of vocabulary.

---

## 3 · The two tags

> **Every statement in the family carries one authored tag — its `concern` — and
> one derived tag — its `phase`. Anything more has to earn its place the way a
> principle does: by driving a generated view or a check.**

The two exist for opposite reasons. `concern` answers *what kind of quality is
this about*, and it cuts **across** the six artifacts — the statements about
privacy live in all of them, and nobody can read them together without a tag.
`phase` answers *when in the build is this needed*, and it cuts **with** the
artifacts, which is why it is derived rather than written down.

### `concern` — authored, on every statement

The vocabulary is the nine quality characteristics of **ISO/IEC 25010:2023**,
plus **`cost`** as the one agentic addition:

| Slug | 25010:2023 characteristic |
|---|---|
| `functional-suitability` | Functional suitability |
| `performance-efficiency` | Performance efficiency |
| `compatibility` | Compatibility |
| `interaction-capability` | Interaction capability |
| `reliability` | Reliability |
| `security` | Security |
| `maintainability` | Maintainability |
| `flexibility` | Flexibility |
| `safety` | Safety |
| `cost` | — **added here** |

Cited, not invented, for the reason principle 2 gives: a home-grown quality
taxonomy is a thing this project would have to defend, and 25010 is a thing an
auditor already accepts. A statement **MAY** also name a narrower **facet** — a
25010 sub-characteristic such as `confidentiality` or `analysability` — where the
characteristic alone is too coarse to be useful. The facet is optional; the
concern is not.

**Why `cost` is the exception.** 25010 has no characteristic for what a system
spends to produce its answer. For conventional software that is a deployment
question; for an agent it is a per-request property that changes with the
model, the prompt and the number of loop iterations, and it is the property
most likely to fail silently. A taxonomy that could not express it would push
every cost statement into `performance-efficiency · resource utilization`,
where it would be read as a tuning note.

**An NFR is a statement whose concern is not `functional-suitability`.** That is
the whole definition, and it is why this family has no separate NFR document:
the Concern View, filtered to the other nine, *is* the non-functional view.

### `phase` — derived, never tagged

The values are the technical processes of **ISO/IEC/IEEE 12207**. A statement's
phase follows from where it sits, because the family's artifact split already
**is** the phase split — each artifact answers a different kind of question with
a different means of verification:

| Phase | Derived from |
|---|---|
| **requirements** | an AOAS item |
| **architecture** | an AHC capability's `requirement`, and its layer and position |
| **design** | an AHC capability's `design_decisions`, and a blueprint |
| **implementation** | a binding item |
| **verification** | an AAC obligation whose stages are S1–S4; an AWD scenario |
| **operation** | an AAC obligation whose stages are S5–S6 |

Tagging phase per item would restate the file the statement lives in, and **a
restatement drifts**. The last two rows are the only ones needing a rule beyond
"which file is this in", and the rule is AAC's own `stages` axis: a check that
runs pre-release is verification, and one that runs against live traffic is
operation.

### What the tags drive, and what happens if they drive nothing

| Tag | Drives |
|---|---|
| `concern` | the **Concern View** — every statement about one quality, from all six artifacts on one generated page |
| `phase` | the **Generation Brief**, assembled phase by phase: requirements, then architecture, design and verification — the order a builder works in |

Each artifact's linter enforces the presence of `concern` and the spelling of
its value. A tag with no check is a tag that is absent from a third of the
corpus within a month, and the derived views would not say so — they would
simply be shorter.

**Structural axes stay as they are.** AHC's layers and positions, AAC's
mechanisms and stages, both catalogs' archetypes — none of them is a phase or a
concern, and folding them in would lose the thing each one is for.

---

## 4 · The dependency invariant

> **Dependencies point from situational to universal, and from binding to
> specification. Never the reverse.**

Concretely:

- A per-agent spec **may cite** catalog identifiers.
- A catalog **must never cite** a per-agent spec.
- A binding **may name** the capability it satisfies.
- A capability **must never name** a realisation.

This is the single invariant that keeps the family from collapsing into one
domain-specific framework, and it is the one users of the catalogs are relying on
without being told.

**It is mechanically checkable.** A cross-reference check over identifiers can
enforce it, and should, because the pressure to break it is constant and always
sounds reasonable in the moment. Build the check when the first violation appears —
not before, per principle 6.

---

## 5 · Conformance language

Normative statements use **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and
**MAY**, with their ordinary meanings in specification prose.

**A normative statement without one of these keywords is prose, not a
requirement**, and will be read as commentary. That is usually the right outcome —
most sentences in a specification are explanation — but it must be deliberate.

---

## 6 · Versioning and citation

- Each artifact carries its own **semantic version**.
- **Cross-references are pinned to the major version** of the artifact cited. A
  citation that silently follows a moving target is not a citation.
- **Deprecate, never delete.** A statement that turns out to be wrong is marked
  superseded, with the reason. The history is part of the credibility, and a
  catalog that quietly loses entries cannot be trusted by anyone who cited them.
- Identifier rules are in the Project Bible and each catalog's ID policy. Not
  restated here.

---

## 7 · Evidence

**Every MUST names how it is demonstrated** — assertion, inspection, scenario, or
acceptance test.

This is not bureaucracy. It is what makes the Assurance Map *generable* rather than
a document somebody maintains by hand and then stops maintaining. An obligation
with no stated means of demonstration cannot be discharged, only asserted.

---

## 8 · The baseline

An agent is a software system, and everything software engineering knows applies to
it. This family does not restate any of that.

> **An agent system MUST satisfy established software engineering practice. The
> catalogs specify only what is additional to, or different from, that baseline
> because the system is non-deterministic.**

This is principle 1 — *cite, don't restate* — applied to the largest body of work
the family sits on top of. It is also the deterministic-first thesis made
structural: **a catalog that restated unit testing would be arguing against its own
position.** The thinness is the claim.

The references, the crosswalk that makes them actionable, and the profile that
bounds how much of the baseline must be demonstrated are in
**[BASELINE.md](BASELINE.md)**.

---

## 9 · Scope boundaries

What each artifact deliberately does not cover. The refusals are what make a
specification trustworthy.

| Artifact | Does not cover |
|---|---|
| **AAC** | What to build; how to build it; any domain's rules |
| **AHC** | Whether a system is correct; any domain's rules; which product to use |
| **AWD** | Whether the agent is right — only what it is exercised against |
| **AOAS** | Anything true of agents in general; any technology choice |
| **ABS** | Anything a user can observe. **A binding swap must be behaviourally invisible** — that is what makes it a binding |
| **This charter** | What anyone should believe. Form, not position |

---

## 10 · What is not a specification

- **Prompts.** A prompt is a generated artifact. What is *required* of one — that
  it states the refusal policy, that it carries no personal data — is an AAC or AOAS
  statement. The wording is output.
- **Generated code.** Obvious, and worth writing down, because the pressure in a
  regeneration programme is always to move implementation detail upward into the
  specification in order to force convergence. That pressure is the failure mode,
  not the fix.

---

## Open questions

Recorded as open, per the writing standards.

- **AOAS is drafted, not published.** It is in `drafts/` until it has a schema,
  worked examples and a validator — at which point it earns its own repository by
  the same test everything else is held to. Premature promotion is how a family of
  six becomes a folder of thirty.
- **AWD's acronym is provisional.** "AWS" was minted first and withdrawn under the
  Bible's own rule — *check the acronym before minting it.* If the artifact is
  better named without an acronym at all, the terminology table already owns
  **World**, and *World Description* would do.
- **Whether a Service Level Spec eventually splits out of AOAS.** Today behaviour and
  thresholds share an author, change together and have one audience, so they are one
  artifact. When SRE and product become different people, the §1 test will say so.
