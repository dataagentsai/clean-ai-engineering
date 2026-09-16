# Application Operation Agent Spec (AOAS) — draft

**What *this* agent must do, and what must be true of it.**

Status: **draft, `apiVersion: aoas/v0`.** Not citable. In `drafts/` until it has a
schema, two worked examples and a validator — at which point it earns its own
repository by the same test everything else is held to. Premature promotion is how
a family of six becomes a folder of thirty.

| Promotion condition | State |
|---|---|
| Schema | ✅ [aoas.schema.json](aoas.schema.json) |
| Validator | ✅ [tools/validate-aoas.js](../tools/validate-aoas.js) — 23 rules, one table-driven case each at least (`npm test`) |
| Two worked examples | ✅ 2 of 2 |

**Worked example 1:** the reference support agent —
[examples/support-agent.aoas.yaml](examples/support-agent.aoas.yaml), with
[the record of extracting it](examples/support-agent.extraction.md). Read the
record first; the findings are the output.

**Worked example 2:** a hotel's guest support agent —
[examples/support-agent-hotel.aoas.yaml](examples/support-agent-hotel.aoas.yaml),
with [its extraction record](examples/support-agent-hotel.extraction.md). A
different domain, the same shape, and written **from the format rather than from
an implementation** — the first example lists two of the reference agent's own
paths under `sources`, and this one lists none. Nine of thirteen sections carried
unchanged; four things resisted, and each loses something machine-readable to a
workaround.

Promotion is now a decision rather than a condition. The third example worth
having is a *different shape* — an agent with no writes, no turns and no
approvals — because both existing examples are A6 plus A5 and the format has
never been asked to degrade gracefully.

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
- **authority** — may the agent do this alone, or is approval required. A
  condition list — `preconditions`, `agent_when`, `owed_when` — holds when every
  condition in it holds; one that fails is enough to refuse, to need approval,
  or not to owe

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
retention. Each with a means of demonstration, per charter §7.

*These are properties, and the assurance catalog also holds properties — the
difference is universality, not kind. A threshold with a number in it is almost
always situational.*

### 7 · Conformance claims

Which catalog identifiers this agent claims, and which it excludes — **with a
reason for each exclusion, and the change that would revoke it.** A declared,
reasoned exclusion is a contribution; a silent one is a gap.

*Excluded, not "not applicable".* The reference implementation refuses the
second label on purpose: it is the one every inconvenient obligation eventually
acquires. An exclusion that names its `revisit_when` cannot quietly become
permanent.

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

- **Format — resolved for v0, with a stated trigger for reopening it.** YAML, with
  conditions in the vocabulary the world, the omission oracle and the escalation
  rules already share (`field`, `equals`, `not_equals`, `at_least`, `at_most`),
  plus **one** extension: `equals_session`, for the ownership rule the vocabulary
  could not state (extraction finding E1). Bounds are numbers, so money compares
  (E7). *Reopen when a second rule needs something the vocabulary cannot say* —
  arithmetic across fields, an OR, a quantifier. Then adopt an expression
  language for all four users at once, as `escalation/rules.py` already
  prescribes; never bolt a second syntax onto one of them.
- **The vocabulary now has two dialects.** The world file and the escalation
  rules still type bounds as integers and have no `equals_session`. That is
  finding E4 in another form, and TODO 1.3 closes it: the world cites the AOAS,
  and its loader adopts this condition schema rather than keeping its own.
- **Whether §6 eventually splits out** as a Service Level Spec. Today behaviour and
  thresholds share an author, change together and have one audience, so they are one
  artifact. When SRE and product become different people, the charter's test will
  say so.
- **How much of §3 a generator actually needs.** The honest answer will come from a
  regeneration cycle, not from argument — which is the point of running one.
- **The name.** "Application Operation Agent Spec" was chosen by the author and is
  retained. If a shorter form is wanted later, the charter's naming rule applies:
  name the artifact, not the ambition, and check the acronym before minting it.
