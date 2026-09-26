# Stacks

One file per tech stack. **A stack is the only thing that changes when the
technology changes.** The domain, the shape and the catalogs stay where they are.

## What changes, and what does not

| When this is new | These change | These do not |
|---|---|---|
| **A tech stack** | a file here: **`bindings:`** (which product fills each port), **`harness.loop`** (who owns the loop), and whatever decisions, thresholds and accepted gaps follow from those choices | AOAS, the world, AHC, AAC, the scenarios |
| **A domain** | a new **AOAS** in `drafts/examples/`, and a new **world** | the stack, AHC, AAC |
| **A shape** | the **archetypes** an agent declares, which decide the capabilities and ports it owes | the stack's products (a shape may need *more* ports bound) |

The catalogs change only when an agent finds something they fail to say. Then
the fix goes into the catalog, never into one agent (T-021).

## How a stack file is used

Each file is a **base harness profile**, in AHC's own format
(`ai-harness-catalog/schema/profile.schema.json`). An agent's profile names one
with `extends`, and adds only what belongs to that agent: its archetypes, its
thresholds, its gaps.

A stack may set the thresholds its own components need — a turn deadline, a
breaker, a claim expiry — as defaults an agent's profile overrides key by key.
What a stack never holds is one agent's deployment: the store behind its tools,
the file that runs it, the model it pins. Every agent extending the stack would
inherit the claim (generation run 2, NOTES §10).

**`extends` resolves as of T-033** (2026-09-25), and the first resolution paid
for the work: the reference agent's profile and `open-stack.yaml` disagreed on
seven bindings and omitted `workflow` entirely. Six of the seven were this file
being ahead — `approval` had moved to Temporal in T-028 and the agent's copy
still said a Postgres queue — and the seventh was this file breaking its own
convention, naming `recorder`'s *target* as the adapter and its *current* as an
`x_` field. Nothing could notice any of it, because nothing had ever compared
the two documents.

    node ../ai-harness-catalog/tools/resolve.js reference-agent/harness-profile.yaml

Two rules make the inheritance worth having, and both are about the diff rather
than the merge:

- **An override must carry `x_why`.** Leaving the baseline is allowed; leaving
  it silently is how a fleet ends up on six stacks that all claim to be one.
- **Restating a baseline value is a warning.** A line repeating what it would
  have inherited is a line that goes stale when this file moves.

    stack file (here)           agent's harness-profile.yaml (its own repo)
    ─────────────────           ───────────────────────────────────────────
    harness.loop        ──┐     extends: …/stacks/open-stack.yaml
    bindings            ──┼──►  subject, archetypes
    stack-wide decisions ─┘     agent decisions, thresholds, accepted_gaps

Claude Code generates an agent from **the AOAS, the world, one stack file, AHC,
AAC and the blueprint**, assembled as the Generation Brief (**T-034**). The four
gates decide when it is done (**T-035**). Each stack's agents live in their own
repository.

## The stacks

| File | Loop owned by | Status | Item |
|---|---|---|---|
| [`open-stack.yaml`](open-stack.yaml) | **our loop**: the kept delta | the support agent runs on it; the adopted products are recorded as targets | T-028 – T-031 |
| [`langgraph.yaml`](langgraph.yaml) | LangGraph (`framework`) | placeholder | T-036 |
| [`claude-agent-sdk.yaml`](claude-agent-sdk.yaml) | Claude Agent SDK (`framework`) | placeholder | T-037 |
| [`claude-family.yaml`](claude-family.yaml) | **our loop**; the Anthropic SDK end to end, the rest inherited from the Open Stack | **later**: cycle 7 | T-043, T-004 |

A placeholder names the stack and who owns the loop, and nothing else. Its ports
say `undecided` until the item that owns the binding chooses them, the same rule
as `PRODUCTION-STACK.md`: *nothing gets hand-built without a row.*
