# Application Operation Agent Spec (AOAS) — draft

**What *this* agent must do, and what must be true of it.**

Status: **draft 0.0.1.** Not citable. In `drafts/` until it has a schema, two
worked examples and a validator — at which point it earns its own repository by the
same test everything else is held to. Premature promotion is how a family of six
becomes a folder of thirty.

---

## Why this exists

The assurance and harness catalogs are universal: they hold for every AI system of a
given shape, and they contain no domain nouns. AgentTwin's world description says
what a system is exercised *against*.

None of them says what *this particular agent* is for.

Without a fourth artifact, that knowledge has nowhere to live, and it goes to the
only place available — into the catalogs, one reasonable-looking addition at a time,
until they are a specification of one company's domain wearing a general name.

> **AOAS exists to be the place domain knowledge goes, so that it does not go
> somewhere worse.**

That is its primary job. Being a generator input is its second.

---

## The boundary

| | AOAS | Not AOAS |
|---|---|---|
| *"An order may be cancelled while PLACED or PACKED, never once SHIPPED"* | ✅ behaviour of this agent | |
| *"Refunds above a stated threshold require human approval"* | ✅ policy of this agent | |
| *"p95 end-to-end latency ≤ 3 seconds"* | ✅ a property true of this agent | |
| *"All data at rest remains in one named region"* | ✅ | |
| *"Non-idempotent operations must be protected against duplicate execution"* | | ❌ universal → AAC |
| *"A tool-call authorisation point must exist"* | | ❌ universal → AHC |
| *"The ERP is slow for eleven seconds, then returns stale data"* | | ❌ environment → AWD |
| *"Traces are exported over OTLP to a named collector"* | | ❌ realisation → ABS |

**The two tests**, from the charter:

- **Does it name a domain noun?** If yes, it is situational and belongs here.
- **Would changing it change what a user experiences?** If yes it is AOAS or AAC,
  never ABS.

---

## Shape

Seven sections. Each is a *contract a generator and a reviewer can both read*.

### 1 · Purpose

One paragraph. What this agent is for, whom it serves, and what it is explicitly
not for. The exclusions do more work than the inclusions.

### 2 · Entities and state

The domain's nouns, their fields, and — critically — their **state machines**.
Which transitions are legal, which are terminal, which are reversible.

Most agent failures that look like reasoning failures are a legal-transition
question the specification never answered.

### 3 · Operations

For each operation the agent may perform:

- inputs and outputs
- **preconditions** — what must be true before it may run
- **effects** — what changes, and whether the change is reversible
- **idempotency** — whether repetition is safe, and what the identity key is
- **authority** — may the agent do this alone, or is approval required

**Side-effecting, non-idempotent operations are the ones worth writing carefully.**
They are where loop failures land, and they are why the reference agent's domain is
cancellations and refunds rather than question answering.

### 4 · Policies

The rules that constrain operations: eligibility windows, thresholds, escalation
triggers, refusal conditions. Stated as conditions over entity state, not as prose
a model is asked to interpret.

A policy expressed only in a prompt is not a policy. It is a preference.

### 5 · External contracts

What the agent depends on outside itself: each system, its interface, its failure
modes and its consistency guarantees.

**The contract is domain knowledge and lives here. The transport is realisation and
lives in ABS.** *"The refund service accepts an idempotency key and returns a refund
identifier"* is this document. *Which protocol carries it* is not.

This section is also what the world description projects, which is why it has to be
written down somewhere the world description can cite.

### 6 · Required properties

Thresholds true of this agent: latency, cost ceiling, availability, residency,
retention. Each with a means of demonstration, per charter §6.

*These are properties, and the assurance catalog also holds properties — the
difference is universality, not kind. A threshold with a number in it is almost
always situational.*

### 7 · Conformance claims

Which catalog identifiers this agent claims, and which it declares not applicable —
**with a reason for each exclusion.** A declared, reasoned exclusion is a
contribution; a silent one is a gap.

---

## What AOAS is not

- **Not a requirements document.** No user stories, no prioritisation, no roadmap.
  It states what is true of the agent, not what someone wants next.
- **Not a design.** No modules, no sequence diagrams. What, not how.
- **Not a prompt.** A prompt is generated output; the policies above are its source.
- **Not universal.** The moment a statement here would hold for any agent, it has
  been written in the wrong document.

---

## Open questions

- **Format.** YAML for the machine-readable parts is the obvious answer given the
  rest of the family, but the state machines and policies may want a more expressive
  form than nested mappings. Unresolved, and recorded as unresolved.
- **Whether §6 eventually splits out** as a Service Level Spec. Today behaviour and
  thresholds share an author, change together and have one audience, so they are one
  artifact. When SRE and product become different people, the charter's test will
  say so.
- **How much of §3 a generator actually needs.** The honest answer will come from a
  regeneration cycle, not from argument — which is the point of running one.
- **The name.** "Application Operation Agent Spec" was chosen by the author and is
  retained. If a shorter form is wanted later, the charter's naming rule applies:
  name the artifact, not the ambition, and check the acronym before minting it.
