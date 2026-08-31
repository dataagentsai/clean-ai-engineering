# Clean AI Engineering

**Most AI systems should be ninety percent ordinary engineering with a small,
bounded model call.**

The interesting failures are almost never in the model. They are in the
scaffolding around it — the context assembled wrongly, the tool that returned an
empty list, the retry that charged the customer twice, the loop that never
stopped. That scaffolding is specifiable, buildable and testable by ordinary
means, and almost nobody publishes what it should contain.

This repository is the top of that body of work. Start with
**[PROJECT_BIBLE.md](PROJECT_BIBLE.md)** — the thesis, the goals and non-goals,
and the ten principles everything else is answerable to.

## The parts

| Part | States | Where |
|---|---|---|
| **Clean AI Engineering** | *why* | this repository |
| **AI Assurance Catalog** — AAC | what must be **TRUE** | [ai-assurance-catalog](https://github.com/dataagentsai/ai-assurance-catalog) |
| **AI Harness Catalog** — AHC | what must **EXIST** | [ai-harness-catalog](https://github.com/dataagentsai/ai-harness-catalog) |
| **AgentTwin** | what must be **FACED** | *forthcoming* |
| **Reference implementation** | proof the three hold together | *forthcoming* |

AAC and AHC are **AI-scoped**, not agent-scoped — their archetypes cover
single-turn transforms, structured extractors, grounded answerers, conversational
assistants and deterministic workflows as well as agents. AgentTwin and the
reference implementation are agent-shaped and named accordingly.

*AgentTwin twins the agent's **world**, not the agent. The agent under test is
real; its environment is the twin.*

## A note on what this is not

This practice is opinionated. **The catalogs it draws on are not.**

The catalogs state properties and components, prescribe no approach and endorse
no product. They must stay adoptable by someone who thinks everything in the
Project Bible is wrong. If a catalog entry can only be satisfied by agreeing with
a principle here, that entry is defective.

## Licence

Specification and prose under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Code and tooling under [Apache 2.0](LICENSE).
