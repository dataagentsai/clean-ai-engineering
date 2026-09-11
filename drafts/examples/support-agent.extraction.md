# Extracting the support agent's AOAS — the record

What happened when the reference implementation's behaviour was separated out
by the charter's routing rule, into
[support-agent.aoas.yaml](support-agent.aoas.yaml). Written 11 September 2026,
against `reference-agent@v0.1.0`. TODO item 1.1.

**The findings are the output, not the YAML.** The YAML is what a generator
reads; this page is what the extraction taught.

---

## Scope decision

**The AOAS describes the agent as built, plus the rules it is known to break.**
Doc 24 specifies ten operations and seven policies; the reference built six
operations. The oracle compares a regenerated agent against the reference's
scenario suite, so an AOAS listing operations nobody tests would reward a
generator for building things the oracle cannot see.

Doc 24's other operations are listed under `purpose.deferred`, not deleted.

---

## Where each part came from

| AOAS section | Source |
|---|---|
| 1 · Purpose and refusals | doc 24 §1; router refusal rules |
| 2 · Entities, invariants, state machine | `clothing.yaml` entities; `contracts/domain.py`; doc 24 §2 |
| 3 · Operations | `clothing.yaml` actions; `approvals`; `resilience` compensations |
| 4 · Policies | doc 24 §3; `approvals.Policy`; `router.Rules.escalate`; `escalation/rules.py` |
| 5 · External contracts | `agenttwin/projection.py` (the refusal-is-a-result shape); `approvals`, `escalation` |
| 6 · Required properties | `config.Budgets`, `config.Settings` |
| 7 · Conformance | `evals/a6_obligations.json`; `evals/NOT_EXERCISED.md` |

---

## What routed out — cited, not restated

Much of what the reference enforces contains no domain noun, so it is not this
file's to state. Taking it out is the routing rule working, not a loss.

| In the reference | Goes to |
|---|---|
| Never claim an effect that did not happen (`no_unclaimed_effect`) | AAC |
| Every identifier, date and amount in a reply was returned by a tool (`no_ungrounded_entity`) | AAC — AAC-0030 applied to tool output |
| A guardrail that raises blocks rather than passes (fails closed) | AAC-0091 |
| Every loop stop has a reason | AAC-0055 |
| Idempotency key from run + step + iteration | AHC-0074 — the AOAS keeps only the *domain* identity: "an order is refunded at most once" |
| Every model response crosses a typed boundary | AHC-0001 |
| A deterministic router ahead of the loop | Design. It lowers the cost; it is not a behaviour a customer can observe |
| Scope strings — `orders:write`, `refunds:write` | ABS. The AOAS states **authority** (agent, or a person); how that is minted is realisation |

---

## Statements that did not route cleanly

Each is a finding about the family's form, and each has an owner.

**E1 · The ownership rule cannot be written in the shared vocabulary.**
*"A customer may act only on orders they placed"* compares a field to the
*session*, and the vocabulary the world, the omission oracle and the escalation
rules share compares fields to constants. `escalation/rules.py` names this
exact trigger: *a rule needing a comparison across fields is the signal to adopt
a real expression language for all three at once.* **It is also the rule behind
the reference's one critical defect, F-016.** The defect is not incidental:
the rule that would have caught it could not be stated in the form everything
else is stated in. → **Resolved in TODO 1.2:** one extension, `equals_session`,
with a stated trigger for moving to an expression language (see the draft's
open questions).

**E2 · `binding: mcp` sits in the world file.** It names a transport, so it is
ABS. → Staged in 1.3: transport and scopes now sit in the world's `x_binding`,
explicitly outside the format; they leave for the binding spec in TODO 1.4.

**E3 · AgentTwin's format code names a domain action.** `agenttwin/projection.py`
special-cases `issue_refund` to add an `amount` parameter. A world-description
runtime that knows one store's refund tool has a domain noun inside the format.
The fix is for operations to declare their inputs — which the AOAS now does —
and the projection to read them. → **Partly closed in 1.3**: the format's
default refusal no longer says "order". The `issue_refund` special case stays
until TODO 3.3, because removing it removes the `amount` input the reference
depends on — it is the same fix as F-014, and belongs with it.

**E4 · The same rule lives in two places.** Every `allowed_when` in
`clothing.yaml` is an AOAS precondition. Until the world cites the AOAS, an
agent spec and a world that disagree are indistinguishable from ones that
agree. → **Closed in 1.3**: the world cites the AOAS and cannot declare the
rules; the loader composes them.

**E5 · Refusal wording is user-visible.** `clothing.yaml` carries refusal
sentences. Under the charter a prompt's wording is output, but these sentences
are what the customer reads. The AOAS keeps the *reason and the offer*
(`on_refusal`) and leaves the wording to generation. Open whether that holds
once a generated agent's phrasing is judged.

**E6 · "Not applicable" versus "not exercised".** The AOAS draft's §7 asks for
obligations *declared not applicable, with a reason*. The reference refuses that
label on purpose — *"it would be the label every inconvenient obligation
eventually acquired"*. The example uses `excluded` with a **`revisit_when`**,
which keeps the discomfort: an exclusion that names the change that would
revoke it cannot quietly become permanent. → Amend the draft's §7.

**E7 · Money bounds.** The vocabulary types its bounds as integers. The refund
gate compares money. Small, but it has to be decided before the schema is.
→ **Resolved in TODO 1.2:** bounds are numbers in the AOAS schema. The world's
loader still types them as integers until TODO 1.3.

**E8 · Pinning a pre-1.0 catalog.** Charter §5 pins citations to the major
version, and major `0` pins nothing. The example pins AAC to `0.12`. → The
charter needs a pre-1.0 clause.

---

## Where v0.1.0 does not conform

Stated as the AOAS's rule, then the reference's shortfall. None blocks cycle 0:
the oracle measures against the specification, not against the reference. All
are TODO 3.3.

| AOAS statement | v0.1.0 | Recorded as |
|---|---|---|
| P-OWNERSHIP on every order operation | ~~Any authenticated customer can act on any order~~ — **conforms since 2026-09-12**: the caller's session reaches the order system, which answers a stranger as not found | F-016 — fixed |
| `issue_refund.amount_from: order.total` | The world has no `total`; the gate compares a number the model supplied | F-014 |
| `issue_refund` within ₹10,000 proceeds without a person | A below-threshold request executes nothing at all | F-014 |
| `issue_refund` never on a `refunded` order | The world declares no guard; only an in-process key protects against a repeat | **new**, with F-017 |
| The order system accepts a caller-supplied key | The key never leaves the process | F-017 |
| `change_address` takes the new address | The world's action takes only the order id and changes nothing; addresses are absent from `fidelity.not_faithful_about` as well as from the entity | **new** |
| `customer.phone` is personal data | The world's customer has no phone field | **new**, minor |
| R-STYLE and R-FRAUD are refused | No router rule or guardrail covers either | **new** |
| Latency, availability, residency, retention declared | None is declared | Declared absent in `required.undeclared` |

Four new items, and every one of them surfaced because a statement had to be
written somewhere that already had a shape. That is the case for doing the
extraction before the regeneration rather than after.

---

## Added by the validator

**E9 · The example set a field it never declared.** The first run of
`tools/validate-aoas.js` (TODO 1.2) reported that `change_address` sets
`order.address` and `order` has no such field. It was carried over from the
world, which has no address either — the same gap recorded above as a
nonconformance, now also caught in the spec. Fixed by declaring the field.
