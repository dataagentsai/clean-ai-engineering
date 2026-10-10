# Clean AI Engineering

A method for building AI agents as ordinary, testable software. This repository
holds the method's principles, its specification formats, the four gates an
agent must pass, and the cycle that turns each failure into a fix in a spec.

**Status: version 0.1.0, 11 October 2026, a working draft.**

- **Done:** the principles ([PROJECT_BIBLE.md](PROJECT_BIBLE.md)), the rules
  for which spec a statement belongs in ([SPEC-CHARTER.md](SPEC-CHARTER.md)),
  and the software practice cited rather than restated ([BASELINE.md](BASELINE.md)).
  The four gates (behaviour, features, structure, harness) run as one command,
  [tools/gates.py](tools/gates.py), against a per-agent yardstick in
  [gates/](gates/). The reference agent passes all four. Five generation runs
  have built an agent from the specs alone and routed what went wrong back
  into the specs.
- **Draft, not yet citable on its own:** the per-agent spec, AOAS (Application
  Operation Agent Spec: [drafts/AOAS.md](drafts/AOAS.md)). It has a schema, a
  validator and worked examples (clothing, electronics, hotel, motor-insurance
  claims). The binding spec (ABS) is not written yet.
- **In progress:** a second agent of a different shape (motor-insurance claims
  on Azure), to show the specs hold beyond the first agent.

**Run it** (needs Node.js and [uv](https://docs.astral.sh/uv/)):

```bash
git clone https://github.com/dataagentsai/clean-ai-engineering && cd clean-ai-engineering
npm ci && npm test     # validate the AOAS examples and test the brief and gates tools
```

**Part of a family.** Six public repositories that together specify, build and
test AI agents:

| Repository | Its job |
|---|---|
| [AI Assurance Catalog](https://github.com/dataagentsai/ai-assurance-catalog) (AAC) | what must be **true** of an AI application: test obligations |
| [AI Harness Catalog](https://github.com/dataagentsai/ai-harness-catalog) (AHC) | what must **exist** around the model call: harness capabilities |
| [AgentTwin](https://github.com/dataagentsai/agenttwin) | what an agent must **face**: a simulated world to test it in |
| **Clean AI Engineering** (this repository) | the specs, the four gates and the build-test-fix cycle that join the rest |
| [Reference Agent](https://github.com/dataagentsai/reference-agent) | the reference implementation: one agent built and tested to all of the above |
| [AgentTwin Lab](https://github.com/dataagentsai/agenttwin-lab) | the lab: a world that keeps running for days, for testing long-running agents |

**How to cite:** cite the release you used. Metadata is in
[CITATION.cff](CITATION.cff); GitHub's "Cite this repository" button renders it
as APA or BibTeX.

---

## The thesis

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
| **The Spec Charter** | what a spec in this family **is** | [SPEC-CHARTER.md](SPEC-CHARTER.md) |
| **The Baseline** | what we **cite rather than restate** | [BASELINE.md](BASELINE.md) |
| **AI Assurance Catalog** — AAC | what must be **TRUE** | [ai-assurance-catalog](https://github.com/dataagentsai/ai-assurance-catalog) |
| **AI Harness Catalog** — AHC | what must **EXIST** | [ai-harness-catalog](https://github.com/dataagentsai/ai-harness-catalog) |
| **Agent World Description** — AWD | what must be **FACED** | [agenttwin](https://github.com/dataagentsai/agenttwin) |
| **Application Operation Agent Spec** — AOAS | what **this agent** must **DO** | [drafts/AOAS.md](drafts/AOAS.md) — *draft* |
| **Agent Binding Spec** — ABS | **which realisation** satisfies each capability | with the build |
| **Reference implementation** | proof they hold together | [reference-agent](https://github.com/dataagentsai/reference-agent) |

AAC and AHC are **AI-scoped**, not agent-scoped — their archetypes cover
single-turn transforms, structured extractors, grounded answerers, conversational
assistants and deterministic workflows as well as agents. AgentTwin and the
reference implementation are agent-shaped and named accordingly.

*AgentTwin twins the agent's **world**, not the agent. The agent under test is
real; its environment is the twin.*

**Where does a statement go?** Three questions settle it — is it universal or about
this agent, is it a property, a component, an environment or a behaviour, and does
it name a technology. The routing rule and the dependency invariant that keeps the
catalogs neutral are in the [Spec Charter](SPEC-CHARTER.md).

**And an agent is a software system.** The family does not restate software
engineering — it cites it, and carries only the delta that non-determinism creates.
[BASELINE.md](BASELINE.md) holds the references, the crosswalk that makes them
actionable, and the twelve baseline items an agent system must actually demonstrate.

## A note on what this is not

This practice is opinionated. **The catalogs it draws on are not.**

The catalogs state properties and components, prescribe no approach and endorse
no product. They must stay adoptable by someone who thinks everything in the
Project Bible is wrong. If a catalog entry can only be satisfied by agreeing with
a principle here, that entry is defective.

## Licence

Specification and prose under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Code and tooling under [Apache 2.0](LICENSE).
