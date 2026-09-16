# Extracting the hotel agent — what the format resisted

**Worked example 2.** Written on 16 September 2026 to answer one question: does
AOAS describe a domain it was not extracted from?

The first example was extracted *from* a working agent, and lists two of that
repository's own paths under `sources`. The electronics example is a merge patch
over it — a different return window and one deleted obligation. Neither asks
whether the format travels. This one is a different domain, written from the
format and nothing else, with no implementation to read off.

It validates. That is the weaker half of the result. **Four things resisted, and
they are the output.**

---

## What went in without complaint

Most of it, and that is worth saying plainly before the complaints.

The shape carried over intact: a signed-in guest, a row they hold, a window that
closes, an irreversible money movement behind a gate, a desk behind that. Every
one of these needed no argument:

| | clothing | hotel |
|---|---|---|
| ownership condition | `order.customer_id equals_session` | `reservation.guest_id equals_session` |
| the excluded-rate flag | `final_sale` | `non_refundable` |
| the money gate | `total at_most 10000` | `total at_most 20000` |
| what is owed | `status equals returned` | `status equals cancelled` |
| the untrusted field | `order.note` | `reservation.note` |
| staleness | `status fresh_for 30s`, written by warehouse and carrier | same, written by front desk and channel manager |
| the six facts | unchanged | unchanged |
| the escalation statements | unchanged but for the noun | unchanged but for the noun |

The two-tier escalation split — `on_request` from the turn's text, `on_condition`
from what the conversation has become — needed no adjustment at all. So did the
whole `required.properties` block, and `refusals` mapped one for one onto a
different set of things a hotel must not do.

**This is the finding people will under-weight.** A format that carried the
ownership rule, the staleness declaration, the owed-versus-permitted distinction
and the authority split into a new domain with no edits is doing real work.

---

## FRICTION 1 · A window that counts down

`advances` is `{"enum": ["days"]}` and its description is *"a counter that runs
with world time"*. The clothing agent's `days_since_delivery` counts **up** from
an event that has happened. The hotel's window counts **down** to an event that
has not.

Both are "a counter that runs with world time" and the format cannot tell them
apart. `days_until_arrival` is declared with `advances: days` because there is no
other way to say it, and under the stated semantics the number would grow as the
stay approaches, which is backwards.

It is also more than a sign. `advances_when` on the clothing field is *"the
invariant that says when the field may be non-zero, pointed forwards"* — the
counter runs only once delivery has happened. The hotel counter runs until
arrival and then stops, which is the mirror image: a precondition for *stopping*
rather than for starting.

**The generator consequence.** An implementation reading this would produce a
field that increments. Every window rule in the agent would then be inverted, and
the scenario that catches it is the one where the world moves under a
conversation — which is the case this field exists for.

**What would fix it.** `advances: {unit: days, toward: arrival}`, or a second
enum value, or a `direction`. The narrower question is whether `days` should ever
have been an enum of one — the electronics example needed hours for nothing, and
this one needs hours for a late-cancellation rule stated in hours, which is how
most hotels state it.

---

## FRICTION 2 · A precondition the far system owns

`change_dates` is permitted only if a room of that type is free on the new dates
at a rate the system will honour. That is the *whole* rule, and none of it can be
written.

`preconditions` is a list of field comparisons against the row under discussion.
Availability is a question for the reservation system about rows this agent does
not hold and cannot name. So the spec states three local conditions — held by the
guest, status, the window — and the operation's actual governing condition sits
in prose under `on_refusal`.

**This is not a hotel quirk.** It is every operation whose permission depends on
a resource outside the row: seat availability, stock, a credit check, a slot in a
calendar. The clothing agent happens to have none, because a return window and a
final-sale flag are both properties of the order itself. The format's silence
here was invisible for exactly that reason.

**The generator consequence.** An implementation would produce a `change_dates`
that checks three things locally and calls the tool, which is correct behaviour —
the far system refuses what it must. What is lost is that nothing in the spec
*says* a refusal is expected on the common path, so nothing generates the
scenario where the dates are gone, and a truthfulness rule about not promising an
unconfirmed room has no operation to attach to.

**What would fix it.** A way to declare a precondition as *external* — named,
unevaluable locally, and therefore expected to refuse. `refusal_is_a_result`
already exists on the external contract; this is its other half.

---

## FRICTION 3 · An effect that is not known when the spec is written

`effect` takes a field map — `{status: cancelled}` — or prose. A date change
moves the dates *and* may move `total`, because the new nights may carry a
different rate. The new total is whatever the reservation system quotes.

Prose was used. The cost is that nothing machine-readable records that
`change_dates` can alter the value a later `issue_refund` is computed from.
`amount_from: reservation.total` is declared and correct, and the fact that an
earlier operation can change what it reads is now invisible to any tool that
walks this file.

**The generator consequence.** A golden-case generator derives its parameter
space from declared conditions. It will vary `total` because the refund gate
names it. It will not know that `change_dates` writes it, so the sequence *change
the dates, then refund* — which is the case where the two interact — is not
derivable.

**What would fix it.** `effect` entries that name a field without fixing its
value: `{total: from_external}`, or the `$input` form extended to `$quoted`.

---

## FRICTION 4 · An escalation trigger that reads the row

Every `on_condition` trigger is a fact about the **conversation** — turn count,
refusals, repeated intent, how the loop stopped. None can read a field on the
record under discussion.

The hotel's most obvious trigger is exactly that: *arrival is tomorrow and the
question is unresolved.* A guest arriving in March with an open question is
routine; the same guest arriving tomorrow is urgent, and the difference is a
field on the reservation. It is recorded under `deferred_triggers` because there
is nowhere to put it.

**The clothing agent has this gap and cannot feel it.** Nothing about an order
makes an unresolved question urgent — a delivery date would, and
`R-DELIVERY-DATE` means the agent does not have one.

**What would fix it.** Allowing an `on_condition` trigger whose `when` is a
condition over the entity, not only over `facts`. The vocabulary already exists;
the scope is what is missing.

---

## What this does **not** test

Stated so the result is not over-read.

**Nothing about structure.** This exercise says nothing about whether a
regeneration would produce `entrypoint / loop / policy / context / state`. That
is 77% of the reference implementation by line count and no specification
describes it. Four frictions in the domain layer are a finding about the 23%.

**Nothing about a different shape.** A hotel support agent is the same archetype
as a clothing support agent: A6 plus A5, a guest waiting, a row they own, an
approval gate. The format was never at risk of being unable to describe it. The
real test is an agent with no writes, no turns and no approvals — the Spark cost
analyst — where the question is not whether new things can be said but whether
the format degrades gracefully when its richest fields have nothing to hold.

**And one thing this example does better than the reference.** Its `sources` list
contains no implementation. The clothing example lists two paths from the agent
it describes, which makes "regenerate from the spec and compare" ambiguous by
construction. If a regeneration experiment wants a control, this is the file to
use.

---

## Scorecard

| | |
|---|---|
| Sections the format carried unchanged | 9 of 13 |
| Frictions found | 4 |
| Of those, blocking | 0 — all four have a workaround, all four lose something machine-readable |
| Schema errors during writing | 4, all mine, none a format gap |
| Time | one sitting |

The four workarounds share a shape: **the fact survives as prose and stops being
data.** A comment saying a counter runs backwards, an `on_refusal` carrying the
real rule, an effect in a sentence, a trigger in `deferred_triggers`. Each is
readable by a person and invisible to a generator, a validator, and the golden
set — which is precisely the class of loss this format exists to prevent.
