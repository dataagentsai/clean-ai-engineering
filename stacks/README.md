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
thresholds, its gaps. The schema already declares `extends`; nothing resolves it
yet, and making it resolve is part of **T-033**.

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
| [`claude-family.yaml`](claude-family.yaml) | to be decided | placeholder, **later** | T-043 |

A placeholder names the stack and who owns the loop, and nothing else. Its ports
say `undecided` until the item that owns the binding chooses them, the same rule
as `PRODUCTION-STACK.md`: *nothing gets hand-built without a row.*
