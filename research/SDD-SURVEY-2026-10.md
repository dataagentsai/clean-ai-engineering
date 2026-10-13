# Spec-driven development in 2025–2026: survey

*Research for `STANDARDS-ADOPTION-PLAN.html` §A, 13 Oct 2026. A web survey made by a research agent; check claims against the sources before citing them externally. "UNVERIFIED" marks claims with no confirmed primary page.*

## 1. AI-era SDD tools and methods

| Tool/method | Files | Roles | Traceability | Living or disposable | Licence |
|---|---|---|---|---|---|
| GitHub Spec Kit [1–3] | constitution; per feature: spec, plan, research, data-model, contracts/, quickstart, tasks | PM, architect, maintainers (light) | plan → requirement links; analyze and converge checks | Intended living; in practice per branch [4] | MIT, ~141k stars |
| AWS Kiro [5–7] | requirements (EARS), design, tasks; steering files product/tech/structure | none | EARS → property-based tests (IDE only) | Mostly spec-first | Proprietary |
| Tessl [4,10] | a spec per code file, @generate/@test | none | spec ↔ file 1:1 | Aims for spec-as-source; framework in closed beta | UNVERIFIED |
| BMAD Method [11,12] | brief, PRD, architecture, epics/stories | Analyst, PM, Architect, Scrum Master, Dev, QA/Test Architect: the most role-explicit | PRD and architecture "sharded" into stories | Partly (learn-and-adjust loop) | MIT, ~54k stars |
| OpenSpec [13] | `openspec/specs/` (source of truth) + `openspec/changes/<name>/` (proposal, delta specs, design, tasks); SHALL requirements with WHEN/THEN scenarios | none | requirement → scenario; deltas merged into truth on archive | **Living** (spec-anchored) | MIT, ~72k stars |
| Agent OS [14,15] | standards, mission, roadmap, tech-stack, specs | none | standards injected per spec | Standards living; specs unclear | MIT |
| SPDD (Thoughtworks, on martinfowler.com) [21] | story, analysis, REASONS canvas, tests | PO/BA writes stories; dev reviews the canvas | two-way prompt ↔ code sync; "when reality diverges, fix the prompt first" | **Living** (spec-anchored) | Method |
| Plan modes (Claude Code, Cursor) [16,17] | one plan file | none | none | Disposable | Product |
| AGENTS.md / CLAUDE.md [18,19] | instruction files | team-curated | none | Living context, **not enforced** | Open format |

**Where most of them converge:**
1. A persistent project layer: constitution, steering files, standards, AGENTS.md.
2. A per-change set of three files: requirements (EARS or SHALL plus scenarios), then design, then tasks.
3. Human gates between phases, plus clarification markers.
4. Acceptance criteria as the bridge to tests.

## 2. Analyses and critiques

**Böckeler (martinfowler.com), Oct 2025 [4]**
- Three levels:
  - **spec-first**: the spec serves this one task;
  - **spec-anchored**: the spec is kept and evolves with the feature;
  - **spec-as-source**: people edit only the spec, and code is generated.
- "Most SDD approaches are spec-first."
- Critiques:
  - overkill: one small bug became 4 user stories and 16 acceptance criteria;
  - review burden;
  - false sense of control;
  - a blurry line between functional and technical specs;
  - spec-as-source inherits the downsides of both model-driven development and LLMs.

**Böckeler, "Harness engineering", Apr 2026 [23]**
- Specs are feedforward guides; tests and reviews are sensors.
- Functional behaviour is "the elephant in the room".
- "Correctness is outside any sensor's remit if the human didn't clearly specify what they wanted."

**Thoughtworks Radar [9,20,24]**
- Nov 2025: spec-driven development is in Assess, with the caution "we may be relearning a bitter lesson".
- Vol. 34, Apr 2026: Spec Kit and OpenSpec are in Assess.
- Related entries:
  - agent instruction bloat: Caution;
  - curated shared instructions: Adopt;
  - Agent Skills: Trial.

**Other critiques**
- Kent Beck, endorsed by Fowler [25]: writing the whole spec first assumes you learn nothing while coding.
- Marmelab, "Waterfall strikes back" [26].
- Thoughtworks, Liu [27]: spec drift is inevitable, so deterministic CI/CD is still needed. Short feedback loops are the answer to waterfall.

**Evidence:** practitioner opinion only. The survey found no controlled studies.

## 3. Older practices that still apply

- **BDD/Gherkin** [28]: discovery, formulation and automation. Examples are the tests, and that makes them living documentation.
- **Contract-first APIs: OpenAPI 3.2 [29] and Pact [30]**
  - The consumer's tests generate the contract, and the provider verifies it in CI.
  - `can-i-deploy` gates the release.
  - The best existing pattern for a spec that is executable and stays alive.
- **SysML v2** [31]: adopted July 2025, with a textual notation and an API.
- **Regulated traceability: DO-178C [32], ISO 26262 [33], IEC 62304 [34]**
  - requirement → design → code → verification → evidence;
  - every link runs both ways and is kept under configuration control;
  - **rigour is tiered by risk class**.
- **Docs-as-code**: arc42 and ADRs [35,36].

## 4. Agent-specific formats

**Assembly: they say how the agent is built**
- **Oracle Open Agent Specification** [37]: Apache-2.0/UPL, with WayFlow plus adapters for LangGraph, AutoGen and CrewAI.
- **Microsoft Agent Framework declarative agents** [38].
- **Microsoft 365 Copilot declarative agents** [39]: also has prose guidance on owner, permissions and "success measures".
- **Google ADK Agent Config** [40]: experimental.
- **CrewAI** [41]: `expected_output` and `guardrail` are the nearest thing to "must be true".
- **A2A Agent Card** [42,43]: identity and discovery only.
- **AGENTS.md** [19]: not enforced.

**Constraints: they say what must be true at run time**
- **NVIDIA NeMo Guardrails** [44]: input, dialog, retrieval, execution and output rails, written in Colang.
- **AWS Bedrock AgentCore Policy** [45]: Cedar policies at the gateway, default-deny. Its own example is "a refund agent may refund under $500". Policies can be written in natural language and are checked by automated reasoning.
- **OPA/Rego** [46]: MCP proxies; one IETF draft.
- **AgentSpec DSL** [47] (ICSE '26): trigger → predicate → enforcement.

## 5. Roles

- **No standard exists.**
  - BMAD encodes the roles as agents [12].
  - Spec Kit names a PM, an architect and maintainers [2].
  - In SPDD, the PO/BA writes the spec and reviewers "check intent rather than find bugs" [21].
  - Blog consensus [48]:
    - the PO/PM owns specify;
    - the architect owns plan and constraints;
    - QA moves earlier.
- **Ops/SRE: no published spec-driven guidance at all.**

## 6. What none of them covers for AI agents

- **Behavioural obligations** are first-class in no spec tool. NeMo, the AgentSpec DSL and CrewAI cover parts.
- **Authority limits** are enforced at run time (AgentCore Cedar, OPA), but are not linked back to requirements.
- **Judging by world state:** nothing found.
- **Operations, SLOs, cost budgets, runbooks:** absent. Microsoft's "success measures" are prose only.
- **Compliance crosswalks** from agent specs to regulation: absent.
- **Ops and compliance roles:** absent.
- **Assembly formats and constraint formats are never joined, and neither traces back to requirements.**

## Sources

1. https://github.com/github/spec-kit
2. https://raw.githubusercontent.com/github/spec-kit/main/spec-driven.md
3. https://github.github.com/spec-kit/
4. https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
5. https://kiro.dev/docs/specs/
6. https://kiro.dev/docs/specs/feature-specs/
7. https://kiro.dev/blog/general-availability/
8. https://www.theregister.com/2025/08/18/aws_updated_kiro_pricing/
9. https://www.thoughtworks.com/radar (Vol. 34; PDF unread, placements from the Radar site and a secondary article)
10. https://codemyspec.com/blog/tessl-review (a competitor's review)
11. https://github.com/bmad-code-org/BMAD-METHOD ; https://docs.bmad-method.org/
12. https://codemyspec.com/blog/bmad-method-explained
13. https://github.com/Fission-AI/OpenSpec
14. https://buildermethods.com/agent-os
15. https://github.com/buildermethods/agent-os
16. https://lucumr.pocoo.org/2025/12/17/what-is-plan-mode/
17. https://mer.vin/2025/12/planning-mode-in-ai-coding-assistants/
18. https://code.claude.com/docs/en/memory
19. https://agents.md/
20. https://www.thoughtworks.com/radar/techniques
21. https://martinfowler.com/articles/structured-prompt-driven/
22. https://agentskills.io/
23. https://martinfowler.com/articles/harness-engineering.html
24. https://www.thoughtworks.com/radar/techniques/spec-driven-development
25. https://martinfowler.com/fragments/2026-01-08.html
26. https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html
27. https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices
28. https://cucumber.io/docs/bdd/
29. https://en.wikipedia.org/wiki/OpenAPI_Specification
30. https://docs.pact.io/
31. https://www.omg.org/news/releases/pr2025/07-21-25.htm
32. https://en.wikipedia.org/wiki/DO-178C
33. https://www.sodiuswillert.com/en/blog/maintaining-iso-26262-traceability-across-automotive-suppliers
34. https://www.dqsglobal.com/en/explore/blog/iec62304-traceability-framework
35. https://arc42.org/overview
36. https://adr.github.io/
37. https://github.com/oracle/agent-spec
38. https://learn.microsoft.com/en-gb/agent-framework/agents/declarative
39. https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/overview-declarative-agent
40. https://adk.dev/agents/config/
41. https://docs.crewai.com/en/concepts/agents
42. https://a2a-protocol.org/latest/specification/
43. https://atlan.com/know/mcp/a2a-protocol-implementation-guide/
44. https://github.com/NVIDIA/NeMo-Guardrails
45. https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html
46. https://codilime.com/blog/why-use-open-policy-agent-for-your-ai-agents/
47. https://arxiv.org/abs/2503.18666
48. https://www.allstacks.com/blog/spec-driven-development
