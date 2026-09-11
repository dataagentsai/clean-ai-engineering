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
| **Build Manifest** | the exact artifact versions handed to one generation or evaluation run |

The moment a derived artifact is hand-edited it begins to disagree with its
sources, and it disagrees silently. Generate them or do not have them.

### Why six and not more

An artifact earns separate existence only if it has **a different author, a
different rate of change, or a different audience.** Anything failing all three is a
section of an existing artifact, or a derived view.

That test is the whole reason this register is short, and it is the test a seventh
proposal must pass — naming which of the three it satisfies.

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

### The tension, named

Question 1 is the one under pressure. When a per-agent spec is missing something,
the cheapest fix is always to add it to a catalog, and each individual addition
looks reasonable. A dozen of them and the catalogs are no longer universal —
they are a specification of one company's domain wearing a general name.

**The domain-noun test is what makes that pressure resistible**, because it
converts a matter of judgement into a matter of vocabulary.

---

## 3 · The dependency invariant

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

## 4 · Conformance language

Normative statements use **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and
**MAY**, with their ordinary meanings in specification prose.

**A normative statement without one of these keywords is prose, not a
requirement**, and will be read as commentary. That is usually the right outcome —
most sentences in a specification are explanation — but it must be deliberate.

---

## 5 · Versioning and citation

- Each artifact carries its own **semantic version**.
- **Cross-references are pinned to the major version** of the artifact cited. A
  citation that silently follows a moving target is not a citation.
- **Deprecate, never delete.** A statement that turns out to be wrong is marked
  superseded, with the reason. The history is part of the credibility, and a
  catalog that quietly loses entries cannot be trusted by anyone who cited them.
- Identifier rules are in the Project Bible and each catalog's ID policy. Not
  restated here.

---

## 6 · Evidence

**Every MUST names how it is demonstrated** — assertion, inspection, scenario, or
acceptance test.

This is not bureaucracy. It is what makes the Assurance Map *generable* rather than
a document somebody maintains by hand and then stops maintaining. An obligation
with no stated means of demonstration cannot be discharged, only asserted.

---

## 7 · The baseline

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

## 8 · Scope boundaries

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

## 9 · What is not a specification

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
