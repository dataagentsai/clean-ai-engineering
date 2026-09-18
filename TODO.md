# TODO

**The only TODO for the whole family.** Every repository's open work is here, and
no repository keeps another list. `reference-agent/TODO.md` was merged in and
deleted on 2026-09-16. Item numbers never change, because commits cite them.

## The goal

**Make every spec and every binding production grade, by building agents of
different shapes from them.** The agents are how the specs get tested. Production
grade means adopting the open source that best fits each concern and building
only the delta nobody supplies, and that applies to every spec and every binding,
not only to the agents.

## How we reach the goal: four tiers

The goal is one sentence; the work under it is not. It moves in four tiers, each
the precondition for the next: **one agent** proves it can be done, **the cycle**
makes a second agent cheap, **varying one axis** proves the specs general, and the
**specs** are what the goal actually delivers. Every item below belongs to exactly
one tier. When an item is added, it is added to its tier here as well as to its
table in *Every open item*.

```
GOAL  Every spec and every binding production grade, proven by agents of different shapes
 │
 ├─ TIER 1  One agent, production grade, on one stack      prove it can be done at all
 ├─ TIER 2  The cycle, made repeatable                      so a second agent is cheap
 ├─ TIER 3  Vary one axis at a time                         so the specs are proven general
 └─ TIER 4  Specs harden and release                        what the goal delivers
```

✅ done · ◐ partly done · **bold** in the queue · plain: open, not yet queued

### Tier 1 · One agent, production grade (cycle 1: support agent, Open Stack)

**Exit:** the agent passes the four gates, a person has used it against a real
store, its reliability is measured, and whoever runs it learns it has stopped
working before a customer does (T-055, T-056).

| Layer | What it proves | Items |
|---|---|---|
| **1a · Runs on adopted products** | only the delta is built | ✅ T-031 · ✅ T-029 · ✅ T-002 · ✅ T-026 · ✅ T-028 · ✅ T-052 · **T-054** · T-030 · T-027 · T-046 · T-047 · T-032 · T-016 |
| **1b · Does the right thing** | correct, not only wired | ✅ T-001 · ✅ T-018 · ✅ T-050 (with F-041, critical) · ✅ T-005 · ✅ T-003 · **T-055** · **T-056** · T-057 · T-053 · T-006 · T-020 · T-024 · T-025 · T-049 · G0.11 |
| **1c · Grounded in reality** | the specs describe a real store and a real person | ◐ **T-017**, the store is real; a person's session is under way (F-042) · ✅ T-042 · T-051 · **T-007** |

### Tier 2 · The cycle, made repeatable

**Exit:** a new agent goes from specs to a verdict with its failures routed, in
days rather than weeks.

| Cycle step | Items |
|---|---|
| 3 · Declare the stack | **T-033** |
| 4 · Generate | **T-034** |
| 5 · Set up AgentTwin | **T-044** · **T-039** · T-041 · T-023 |
| 6 · Test through the gates | **T-035** · T-040 |
| 7 · Route the failures | T-021 |
| Portability across stacks | **T-048** |

### Tier 3 · Vary one axis at a time

**Exit:** each axis has passed once, and its last pass produced no new spec change.

| Axis | Cycles | Items |
|---|---|---|
| **Stack** | 2 LangGraph · 3 Claude Agent SDK · 7 Claude family | **T-036** · T-037 · T-043 + T-004 |
| **Domain** | 4 Hotel | ✅ G2.1 · T-022 · T-019 · G2.2 · G2.3 · G2.6 |
| **Shape** | 5 Spark cost analyst · 6 Invoice reconciliation | T-013 · T-038 · T-045 |

### Tier 4 · Specs harden and release

**Exit:** each spec is a versioned release, schema and lint green, with every
statement exercised by some agent or recorded as not yet.

Tier 4 moves in the background: every cycle's step 7 lands here. The ✅ rows are
spec changes Tier 1 items forced, which is the cycle working.

| Spec | Items |
|---|---|
| **AOAS** | ✅ reads of many rows (T-001) · ✅ a return is state the order holds (T-050) · T-022 · G2.4 · G2.5 |
| **AHC** | ✅ `channel` port (T-026) · ✅ metrics, later outcomes, a synthetic run: AHC-0111, 0112, 0113 · Phase 3 blueprints · Phase 4 realizations (G3.1) · Phase 5 skeletons · G3.3 · T-048 |
| **AAC** | ✅ watching a deployed system: AAC-0114, 0115, 0116 (0.16.0) · AAC-0084 for judges outside A10 · Phase 1 crosswalks · Phase 3 adapters |
| **AgentTwin** | ✅ `authorise` hook (T-002) · ✅ many-reads and `opens` (T-001) · ✅ lasting faults, safe refusals, `forces` (T-050) · ✅ shadow mode (T-042) · ✅ reviewers keep what they saw (T-028) · T-041 |
| **Bindings** | ✅ `open-stack` mostly current · `langgraph`, `claude-agent-sdk`, `claude-family` filled by their cycles |

### What the tiers say about order

- **Tier 1 is nearly there.** 1a's must-haves are adopted (Temporal, Keycloak,
  LiteLLM, Chatwoot, Saleor). 1b is closed but for small items. 1c is under way:
  the agent runs against Saleor, 29 of 33 scenarios say the same there as against
  the world (T-042), and a person is using it (F-042 was the first thing they
  found, 18 Sep). What is left for the exit: that session to finish, and T-007,
  reliability measured.
- **Tier 2 is the bottleneck.** No second agent starts until T-033, T-034, T-035 and
  T-044 exist, and none of them has.
- **Tier 1a's remaining adoptions block nothing downstream.** T-030, T-027, T-046
  and T-047 can happen whenever convenient.

---

## The cycle

Every agent goes through the same seven steps, and the cycle repeats:

| | Step | What it produces | Where |
|---|---|---|---|
| 1 | **Pick** the next agent from the roster, one whose shape is not yet covered, and confirm its archetypes | a row in the roster below | this file |
| 2 | **Specify** its domain | an **AOAS**, plus a **world** (AWD) | `clean-ai-engineering/drafts/examples/`, `agenttwin` |
| 3 | **Declare** its stack | a **stack profile**, or reuse of an existing one | `clean-ai-engineering/stacks/` |
| 4 | **Generate** the agent with Claude Code from the specs plus the stack | an agent repository | T-034 |
| 5 | **Set up AgentTwin** for it | scenarios, and the binding's three callables | T-044 |
| 6 | **Test** it through the four gates | a verdict, with every failure listed | T-035 |
| 7 | **Route every failure** to where it belongs: AOAS · AWD · AHC · AAC · stack profile · blueprint · Baseline. **Never patch the agent alone** | a fix in a spec or binding, then back to step 4 | the spec's repo |

A cycle is done when the agent passes the gates **and** step 7 produced nothing
new on the last pass. **What a cycle is for is step 7.** An agent that passed
without changing any spec taught nothing, which is fine once and a warning twice.

**Change one thing per cycle where possible.** A new stack, a new domain or a new
shape, but not two at once, because a failure then cannot be attributed. That is
why the order below rebinds the support agent before building new shapes.

### What changes, per axis

| When this is new | These change | These do not |
|---|---|---|
| **A tech stack** | a stack profile in [`stacks/`](stacks/): `bindings:` (which product fills each port), `harness.loop` (who owns the loop), and the decisions and gaps that follow | AOAS, the world, AHC, AAC, the scenarios |
| **A domain** | a new **AOAS** and a new **world** | the stack, AHC, AAC |
| **A shape** | the **archetypes** the agent declares, which decide the capabilities and ports it owes | the products in a stack, though a shape may need more ports bound |
| **Nothing, whatever the agent** | AHC and AAC change **only** when an agent finds something they fail to say (T-021) | — |

### The stacks

Placeholders exist for all four. See [`stacks/README.md`](stacks/README.md).

| Stack | Loop owned by | State |
|---|---|---|
| [Open Stack](stacks/open-stack.yaml) | our loop, kept as the delta; everything around it adopted | current, with adoption targets recorded |
| [LangGraph](stacks/langgraph.yaml) | LangGraph | placeholder: cycle 2 |
| [Claude Agent SDK](stacks/claude-agent-sdk.yaml) | Claude Agent SDK | placeholder: cycle 3 |
| [Claude family](stacks/claude-family.yaml) | **our loop**; the Anthropic SDK end to end | later: cycle 7, T-043 · T-004 |

### The roster

Taken from `LearnAgenticHarnessFrameworks/11-worked-examples.md` (fifteen agents),
plus agent 16 from `16-conversational-data-ui.md`, plus the two support agents.
**Archetypes are proposed** and confirmed at step 1. *Page's stack* is what that
document recommends, and it is an input, not a decision: where it names a stack we
are not building (OpenAI Agents SDK, none), the agent is bound to one we are.

| # | Agent | Domain | Archetypes (proposed) | Page's stack | Cycle |
|---|---|---|---|---|---|
| R | **Support agent** (clothing) | ecommerce support | A6 | — | **1** Open Stack · **2** LangGraph · **3** Claude Agent SDK · **7** Claude family |
| H | **Hotel support agent** | hospitality support | A6 | — | **4** Open Stack, a new domain only |
| 2 | **Spark cost analyst** | data engineering | A6 · A8, read-only, one long task | Claude Agent SDK | **5**, a new shape |
| 3 | **Invoice reconciliation** | finance ops | A5 · A9, waits for days | LangGraph | **6**, a new shape |
| 1 | Billing support | SaaS support | A4 · A6 · A10 | OpenAI Agents SDK | — |
| 4 | Dependency upgrade | developer tooling | A8 · A9 | Claude Agent SDK + a queue | — |
| 5 | Protocol document check | pharma regulatory | A5 · A2 | none, a pipeline | — |
| 6 | Incident triage | cloud ops | A6 · A3, read-only | Claude Agent SDK | — |
| 7 | Appointment line | healthcare voice | A4 · A6 · A7 | OpenAI Agents SDK | — |
| 8 | Research writer | market research | A3 · A8 | Claude Agent SDK | — |
| 9 | Personal assistant | consumer productivity | A4 · A6 | LangGraph | — |
| 10 | Pipeline self-healing | data platform ops | A9 · A7 | LangGraph + Claude Agent SDK | — |
| 11 | PR review bot | developer tooling | A10 · A2 | plain loop | — |
| 12 | Ticket enrichment | IT service management | A2 | plain loop | — |
| 13 | Data quality narrator | data engineering | A5 · A1 | plain loop | — |
| 14 | The learning build | own repository | A6 | plain loop | — |
| 15 | Diagnostic CLI | developer platform | A6 | plain loop | — |
| 16 | Conversational data UI | data / Unity Catalog | A4 · A8 · A3 | — | — |

New shapes after cycle 6 are picked at step 1, by the shape furthest from any
already covered. Cycle 7 changes only the stack. The archetypes that no cycle yet touches, **A1, A2, A3, A4, A7, A10**,
are the case for which agent comes next.

### What production grade means, per artifact

| Artifact | Done when |
|---|---|
| **An agent** | passes the four gates on its stack; every capability its shape owes is met or an accepted gap with an owner and a review date; every release gate has a test; reliability is measured (`pass^k`); a customer-facing agent has been used by a person |
| **A stack profile** | names an adopted product for every port it fills; `in-house` only where the decisions register records the delta and why; starts from one compose file; validates against the profile schema |
| **A spec** (AOAS, AWD, AHC, AAC) | a versioned release, schema and lint green; every statement exercised by at least one agent or recorded as not yet; every friction a cycle found is fixed in the spec |
| **AgentTwin** | adopts the simulated user, the graders and replay; builds only the world, the perturbations and the world-diff oracle; shadow mode is built; setting it up for a new agent is one step |

| Repository | What it is |
|---|---|
| `clean-ai-engineering` | **AOAS**, **stacks**, the charter, the Baseline, this file, [GAPS.md](GAPS.md) |
| `ai-harness-catalog` | **AHC**: capabilities, ports, archetypes, blueprints, realizations, the profile schema |
| `ai-assurance-catalog` | **AAC**: obligations, crosswalks, adapters |
| `agenttwin` | **AWD** (the world format), the simulator, the scenario format |
| `reference-agent` | the support agent on the Open Stack: its profile, scenarios, findings |

**Registers, not queues.** [GAPS.md](GAPS.md) for catalog gaps;
`reference-agent/evals/FINDINGS.md` for defects found;
`reference-agent/REVIEW.md` for review questions;
`reference-agent/evals/NOT_EXERCISED.md` for obligations with no test. A finding is
work that is *wrong* and has a failing test to point at. An item here is often
work that is *missing*, with nothing to point at, which is why it is written down.

---

## Next, in order

✅ **T-031** done 16 Sep: `reference-agent/compose.yaml`.

✅ **T-018** done 16 Sep: model plus a declared provider, checked at startup.

✅ **T-052** done 18 Sep: every chat turn is a trace in Langfuse, found by customer or conversation, with each model call's tokens and cost — priced from the agent's own table. It had been marked current since 16 Sep and never looked at.

✅ **T-042** done 18 Sep: 29 of 33 scenarios run unchanged against Saleor and say the same as against the world. The first run found F-043 (a real store refunds only against a payment) and F-044 (a customer's orders were found by searching the whole store).

✅ **T-028** done 18 Sep: both human waits are Temporal workflows — an approval is assessed, waits for a person or its expiry, and carries the refund out itself under its own realm login, so the agent can no longer write a grant; an escalation lapses on its own timer and the sweeper is deleted. With it, **T-003**: a delivery claim two processes share, whose expiry is a timer.

✅ **T-050** done 17 Sep: seven live failures routed (two scenarios, the spec, the router, the harness) and F-041 fixed, a planted note that could cancel an order. Live pass rate 0.94 → 0.98.

✅ **T-001** done 17 Sep: opening the chat shows a signed-in customer their orders and work in flight, with no model call. The spec can now declare a read of many rows.

✅ **T-029** done 17 Sep: every model call through the LiteLLM proxy with the agent's own key; all 34 scenarios run live through it.

✅ **T-026** done 17 Sep: customers log in through a portal that keeps their login server-side, chat through Chatwoot, and are handed to a person on escalation; AHC has a `channel` port.

✅ **T-002** done 16 Sep: verify-only sessions from the Keycloak realm, and an order system that checks the token and the approval itself.

Sorted by tier (see *How we reach the goal*). Tier 1's must-haves first, and
Tier 1a is now closed but for the *any time* items; Tier 2 runs alongside; Tier 3
when Tier 2's four machinery items exist.

**Tier 1 · finish production grade**

1. **T-054**: the order system out of the agent's process, as an MCP service over streamable HTTP, and the MCP standard where we deviate.
2. **T-017**'s last step, **yours** and under way: using the agent against the
   real store. It has already found F-042; each finding is fixed as it comes.
3. **T-055**: the agent's numbers leave the process — a Collector, Prometheus,
   Grafana and Alertmanager, latency histograms, and alerts on behaviour rates.
4. **T-056**: a canary — scenarios through the deployed edge every ten minutes.
5. **T-007**: `pass^k` reliability.
6. **T-057**: online scoring, and later outcomes joined to their runs.
7. **T-051**: the four scenarios that cannot yet run against a real store.

**Tier 2 · make the cycle repeatable** (in parallel with item 1)

8. **T-035**: the four gates as one command. Every cycle's step 6.
9. **T-033**: stack profiles that resolve `extends`.
10. **T-034**: the Generation Brief. Every cycle's step 4.
11. **T-039** then **T-044**: LangWatch Scenario, and a one-step AgentTwin setup. Every cycle's step 5.
12. **T-048**: ports as a standard, with its criteria written before cycle 2.

**Tier 3 · the first axis**

13. **T-036**: cycle 2, the support agent on LangGraph.
**Any time, blocking nothing:** Tier 1a T-030, T-027, T-046, T-047, T-032; Tier 1b
T-006, T-020, T-024, T-025, T-049; Tier 3 T-013 (the Spark AOAS, cheap, and it
sharpens T-022 before cycle 4).

---

## Every open item

### The cycle's machinery: needed by every cycle after the first

| | Item | Repo | Cost | Needs |
|---|---|---|---|---|
| **T-033** | Stack profiles. **Placeholders done 16 Sep** (`stacks/`); make `extends` resolve, and fill each at its cycle | clean-ai-engineering, AHC tools | a day | — |
| **T-034** | The Generation Brief: specs plus a stack profile, which Claude Code generates from | clean-ai-engineering | days | T-033 |
| **T-035** | The four gates as one command: an implementation in, a verdict and a routed failure list out | reference-agent, agenttwin | a day or two | — |
| **T-044** | Set up AgentTwin for a new agent in one step: a world scaffold from the AOAS, a scenario template, the three callables | agenttwin | days | T-039 |
| **T-048** | AHC's ports as a standard: reference existing standards, a conformance suite per port, typed signatures for approval, cost_ledger and policy. Cycles 2 and 3 decide tier 3 | AHC, reference-agent, agenttwin | weeks | T-035 |

### Cycle 1 · Support agent · clothing · A6 · Open Stack: finish it, production grade

*Agent work:*

| | Item | Repo | Cost | Needs |
|---|---|---|---|---|
| **T-006** | A customer cannot find their own past conversations | reference-agent | days | — |
| **T-017** | **Saleor adopted**: composed, seeded from the world, behind the store's own MCP server with the far end's checks, and `run_server --store` in front of it. **Left: a person's session** — the scenarios against both stores moved into T-042 | reference-agent | a session | — |
| **T-020** | Trace context and run id cross the MCP hop (AHC-0006, AHC-0026) | reference-agent | small | — |
| **T-024** | Two release gates with no test: AAC-0051, AAC-0096 | reference-agent | a day | — |
| **T-025** | Verify the provider price table before any figure is published | reference-agent | an hour | — |
| **T-049** | `first_real_call.py --replay` has failed since the cassette began requiring a declared context; nothing runs it | reference-agent | an hour | — |
| **T-007** | `pass^k` reliability (AAC-0010) | reference-agent | a day | — |
| **T-055** | **The numbers leave the process.** A MeterProvider, an OTel Collector, Prometheus, Grafana and Alertmanager in compose; latency histograms; the approvals counter fixed; alert rules on behaviour rates against a baseline (AHC-0111, AAC-0114, AAC-0007) | reference-agent | a day | — |
| **T-056** | **A canary.** Scenarios through the deployed edge every ten minutes as a synthetic customer in its own namespace, marked and excluded from the rates, alerting on a failure (AHC-0113, AAC-0116) | reference-agent, agenttwin | a day | T-055 |
| **T-057** | **Online scoring and later outcomes.** Sampled, redacted capture; a check that the reply agrees with its tools' results; a judge validated against labels; scores to Langfuse; the customer returning, a refund reversed and feedback joined to the run (AHC-0112, AAC-0014, AAC-0115, AAC-0042) | reference-agent | days | T-055 |
| **G0.11** | Remainder: inline grader (AHC-0028), production turn becomes a dataset row (AHC-0029), policy budget and timeout (AHC-0095), context size per release (AHC-0031) | reference-agent, AHC | days | T-040 |

*Open Stack work: adopt the list, keep only the delta:*

| | Item | Repo | Cost | Needs |
|---|---|---|---|---|
| **T-030** | **Presidio** for PII in place of our patterns. The positions stay ours | reference-agent | a day | — |
| **T-027** | **VCR.py** in place of `cassette/`, keeping the replay seam | reference-agent | a day | — |
| **T-046** | **promptfoo** for prompt-level checks, beside AgentTwin | reference-agent | a day | — |
| **T-047** | **OpenFeature** for release flags; choose Unleash or Flagsmith behind it | reference-agent | days | — |
| **T-032** | Make `PRODUCTION-STACK.md` and `PREFERRED-STACK.md` agree with the register. They contradict each other today | reference-agent | hours | — |
| **T-016** | The adopt/decline audit. The register below is its output | reference-agent | ongoing | — |

### Cycle 2 · Support agent · LangGraph: the stack changes, nothing else

| | Item | Repo | Cost | Needs |
|---|---|---|---|---|
| **T-036** | Fill `stacks/langgraph.yaml`, generate, set up AgentTwin, pass the gates, route the failures | `reference-agent-langgraph` | weeks | T-033, T-034, T-035, T-044, T-048 |

### Cycle 3 · Support agent · Claude Agent SDK: the stack changes, nothing else

| | Item | Repo | Cost | Needs |
|---|---|---|---|---|
| **T-037** | Fill `stacks/claude-agent-sdk.yaml`, then the same cycle | `reference-agent-claude-sdk` | weeks | cycle 2 |

### Cycle 4 · Hotel support agent · Open Stack: the domain changes, nothing else

| | Item | Repo | Cost | Needs |
|---|---|---|---|---|
| **G2.1** | ✅ Hotel AOAS written (T-011) | clean-ai-engineering | — | — |
| **T-022** | Fix the five AOAS frictions it found | clean-ai-engineering | hours | T-013 |
| **T-019** | Extract the mechanism library the hotel agent installs | reference-agent | days | — |
| **G2.2** | Hotel world and scenarios | agenttwin | days | T-044 |
| **G2.3** | Generate the hotel agent, and pass the gates | new repo | weeks | T-019, G2.2, T-034, T-035 |
| **G2.4** | Fix universal gaps in the spec, then re-run the support agent's suite | all specs | — | G2.3 |
| **G2.5** | AOAS earns its own repository | clean-ai-engineering | — | G2.3 |
| **G2.6** | Measure the reuse against the prediction | reference-agent | a day | G2.3 |

### Cycle 5 · Spark cost analyst · A6 · A8 · Claude Agent SDK: the shape changes

| | Item | Repo | Cost | Needs |
|---|---|---|---|---|
| **T-013** | The Spark cost analyst AOAS. No writes, no turns, no approvals. **Can run now** | clean-ai-engineering | a day | — |
| **T-038** | Its world, generation on the Claude Agent SDK stack (proven in cycle 3), AgentTwin, the gates | new repo | weeks | T-013, cycle 3 |

### Cycle 6 · Invoice reconciliation · A5 · A9 · LangGraph: the shape changes

| | Item | Repo | Cost | Needs |
|---|---|---|---|---|
| **T-045** | AOAS, world, generation on LangGraph (proven in cycle 2), AgentTwin, the gates | new repo | weeks | cycle 2 |

### Cycle 7 · Support agent · Claude family: the stack changes, later

| | Item | Repo | Cost | Needs |
|---|---|---|---|---|
| **T-043** | Fill `stacks/claude-family.yaml`: **the Anthropic SDK end to end, our loop**; the rest inherited from the Open Stack. Then the cycle | `reference-agent-claude-family` | weeks | cycle 3 |
| **T-004** | The Anthropic adapter at L2. Revived: it *is* this stack's model port | reference-agent | days | T-043 |

### Specs: kept robust between cycles

**S1 · AHC**

| | Item | Cost | Needs |
|---|---|---|---|
| **T-021** | Findings flow back as statements, so no cycle rediscovers them (shared with AAC and AOAS) | hours | — |
| **AHC Phase 3** | Blueprints for every archetype a cycle reaches. A6 exists, generated | days | each cycle |
| **G3.1** = **AHC Phase 4** | Realizations: capability × position × stack, one dated pass | days | cycles 2, 3 |
| **AHC Phase 5** | Three reference skeletons, one per control-flow tier | weeks | cycles 2, 3 |
| **G3.3** | Publish the coverage delta and the method | days | G3.1 |

**S2 · AAC**

| | Item | Cost |
|---|---|---|
| **AAC Phase 1** | Crosswalks: NIST AI RMF, ISO/IEC 42001, EU AI Act. OWASP has shipped | days |
| **AAC Phase 3** | DeepEval and eval-platform adapters, which T-040 needs | days |

**S3 · AOAS**: T-022 and G2.5, in cycle 4, because a new domain is what exercises the format.

**S4 · AgentTwin**

| | Item | Cost | Needs |
|---|---|---|---|
| **T-039** | **Adopt LangWatch Scenario** for the simulated user | days | — |
| **T-040** | **Adopt DeepEval or Inspect** for graders | days | AAC Phase 3 |
| **T-041** | Actors and perturbations move from code into the world file | days | — |
| **T-051** | The four scenarios that cannot run against a real store yet: three inject a fault into the world (`stale_read`, `slow`, `lost_reply`) and need a way to perturb a real store's MCP server; one advances days, which needs the store's delivery dates moved instead | days | ✅ T-042 |
| **T-053** | `test_the_four_reviewers[answers after the window]` failed once under the full suite's load (the reviewer was never shown the approval) and passes alone. Find why before it is trusted as a gate | days | — |
| **T-054** | The order system as its own MCP service over **streamable HTTP**, with the MCP standard where we deviate today: tool annotations (`readOnlyHint`, `destructiveHint`, `idempotentHint`) beside our `side_effect`; prefixed `_meta` keys; the connection authorised per the MCP authorization spec, the customer's delegated token still per call. See the item | reference-agent | days | — |
| **T-023** | Time passes within a turn | a day | — |

---

## Decisions: settled, so they are not re-argued

### Direction

| Decision | When |
|---|---|
| **The goal is specs and bindings made production grade by building agents of different shapes from them**, in a repeating cycle. Adopt best-fit open source; build only the delta | 2026-09-16 |
| **The blind regeneration experiment is dropped** (the old G1: T-008, T-010, T-014, T-015). Generating from the specs stays, as step 4 of every cycle | 2026-09-16 |
| **A new domain changes the AOAS and the world. A new stack changes a stack profile.** AHC and AAC change only when a cycle finds a gap | 2026-09-16 |
| **One axis per cycle where possible**, so a failure can be attributed | 2026-09-16 |
| **A stack is a base harness profile in `stacks/`**, and an agent's profile `extends` it. Four stacks: Open Stack, LangGraph, Claude Agent SDK, Claude family (later) | 2026-09-16 |
| **Claude family is the Anthropic SDK end to end, with our loop.** Whatever the SDK does not supply is inherited from the Open Stack | 2026-09-16 |
| **The adoption register has four verdicts: adopt, evaluate, leave, build.** Every concern has exactly one | 2026-09-16 |
| **Each agent on each stack is its own repository**, citing scenarios by relative path. Never a `harness:` flag | 2026-09-16 |
| **The Open Stack keeps its own loop as the delta.** Step budget, oscillation check, cost ceiling. Everything around the loop is adopted | 2026-09-16 |
| **AgentTwin adopts the simulated user, graders and replay.** It builds only the world, the perturbations and the world-diff oracle | 2026-09-16 |
| **The model call goes through a LiteLLM proxy.** Not the SDK, which would break the fault-injection seam (F-029) | 2026-09-16 |
| **Hybrid**: mechanism in a library, seams written per agent. What keeps it honest is each new cycle. **Falsified by** a hotel agent that has to edit a mechanism module, with `policy.CLAIM_PATTERNS` the named suspect | 2026-09-13 |
| **Escalation queue** was a Postgres table plus `LISTEN/NOTIFY`, not a broker. **The wait is a Temporal workflow since T-028**, and the table is gone | 2026-09-06, revised 2026-09-18 |
| **Rules stay in the project's own predicate language**, not CEL or OPA, because AgentTwin's oracle reads that vocabulary | 2026-09-06 |
| **Spec first, per change** | G0 |

### Open source: adopt, evaluate, leave, build

**One register with four verdicts**, and every concern gets exactly one. It
assembles what was already decided in four places: T-016's register;
`reference-agent/docs/PRODUCTION-STACK.md` (every one of AHC's sixteen layers);
`PREFERRED-STACK.md`; and `LearnAgenticHarnessFrameworks/08-what-you-build.md`
(the eight things to build, and the list of what not to build). The rule is
`PRODUCTION-STACK.md`'s: *nothing gets hand-built without a row under Build.*

#### Adopt

| Concern | Layer | Adopt | In which stack | State |
|---|---|---|---|---|
| Model call, budgets, rate limits | L2, L8, L13 | **LiteLLM proxy** | Open Stack | ✅ adopted 17 Sep (T-029) |
| Model call, end to end | L2 | **Anthropic SDK**: caching, token counting, Batch, context editing, memory tool, compaction, structured outputs | Claude family | T-004, T-043 |
| Tool protocol | L3 | **MCP** | all | ✅ in use |
| Control loop | L4 | **LangGraph** · **Claude Agent SDK** | LangGraph · Claude Agent SDK | T-036 · T-037 |
| Checkpoints and interrupts | L5, L14 | **LangGraph's checkpointer and interrupts** | LangGraph | T-036 |
| State | L5 | **Postgres** | Open Stack, Claude family | ✅ in use |
| HTTP edge | L6 | **Starlette / FastAPI** | Open Stack | ✅ in use |
| PII | L7 | **Presidio** | Open Stack | T-030 |
| Record and replay | L9 | **VCR.py / pytest-recording** | Open Stack | T-027 |
| Durable waits | L10, L14 | **Temporal** | Open Stack | ✅ T-028 |
| Traces | L11 | **OpenTelemetry → Langfuse** | all | ✅ adopted 16 Sep |
| Simulated user | L12 | **LangWatch Scenario** | AgentTwin | T-039 |
| Prompt-level checks | L12 | **promptfoo** | all | T-046 |
| Property-based tests | L12 | **Hypothesis** | all | ✅ adopted 14 Sep |
| Reliability measure | L12 | **`pass^k`**, and τ-bench's `verify` actor strategy (the idea) | all | T-007 |
| Customer chat, human handoff | L6, L14 | **Chatwoot** Agent Bot API | Open Stack | ✅ adopted 17 Sep (T-026) |
| Release flags | L15 | **OpenFeature** | Open Stack | T-047 |
| Login | L16 | **Keycloak** | Open Stack | ✅ adopted 16 Sep (T-002) |
| A real store behind the tools | world | **Saleor** | Open Stack | T-017 |
| Somewhere to run it all | deploy | **Docker Compose**, one file with profiles | Open Stack | ✅ adopted 16 Sep (T-031) |

#### Evaluate: an open choice, closed with a written reason

| Choice | Between | Closed by |
|---|---|---|
| Graders | **DeepEval** or **Inspect** | T-040 |
| Flag service behind OpenFeature | **Unleash** or **Flagsmith** | T-047 |
| Policy engine | **OPA** or **Cedar**, against our own predicate language. `08` calls a policy language you invented the overbuilt case; the 6 September decision holds while rules are tables, and **re-opens the day a rule needs a condition** | the first conditional rule |
| Model tier routing | LiteLLM's routing, or none | deferred: four orders of magnitude of budget headroom |

#### Leave: declined, not needed yet, or not chosen

| | Why |
|---|---|
| LiteLLM **SDK** | 65 lines saved, not 636, and it would bypass `ResilientLLM`, the fault-injection seam (F-029) |
| tenacity / backoff | the same reason as the LiteLLM SDK |
| Guardrails AI / NeMo / Llama Guard | none models *position*; Presidio covers PII |
| NLU for intent | two opinions about intent already; a third has no owner |
| The Compactor | provenance laundering (AHC-0109) |
| τ-bench's 165 tasks | prose policy; read their retail policy document instead |
| Cosmic Ray | used once to calibrate, not kept |
| Chainlit / assistant-ui | superseded by Chatwoot |
| Langfuse prompt management, Humanloop, PromptLayer | prompts stay in Git, stamped into traces: `08`'s *prompt DSL* row |
| Restate, DBOS, Inngest, Camunda / Zeebe | Temporal was chosen |
| Phoenix, LangSmith, Helicone, Braintrust, Ragas | Langfuse for traces; T-040 for graders |
| Zitadel, Authentik, Ory | Keycloak was chosen (T-002); any of them gives asymmetric signing and JWKS |
| OpenRouter, Portkey | the LiteLLM proxy was chosen (T-029) |
| betamax | VCR.py was chosen (T-027) |
| Medusa, Vendure | Saleor was chosen (T-017); the agent reaches the store over MCP, so any would do |
| Pydantic AI, Mastra, CrewAI as loop owners | the stacks are the Open Stack (our loop), LangGraph, the Claude Agent SDK and Claude family (our loop) |
| OpenAI Agents SDK | the roster recommends it for agents 1 and 7; not a planned stack, so those agents bind to one that is |
| Redis | nothing ephemeral that Postgres does not already hold |
| Kong, APISIX, Envoy, Traefik at the edge | the LiteLLM proxy is the only gateway, and a gateway that retries on timeout manufactures duplicates (T-003) |
| Helm, ArgoCD | when there is a cluster; the compose file first |
| OpenFGA, SpiceDB, Casbin | until households, partners or delegation arrive; ownership is a field comparison (T-002) |
| A vector database | no retrieval today. **pgvector first**, when a cycle reaches A3 |
| A sandbox runtime | nothing executes an artifact today. **gVisor or Firecracker**, when a cycle reaches an A8 agent that runs what it writes |

#### Build: the delta, and only this

`08`'s eight items, plus what `PRODUCTION-STACK.md` names as *still yours* at each layer.

| | What is ours | Why nobody supplies it | State |
|---|---|---|---|
| **B1** | The run contract: `RunId`, the typed `TurnResult`, terminations | only we know what one unit of work is | ✅ |
| **B2** | Tool contracts: side-effect classes, the scoped surface, result bounding | our tools are our domain | ✅ |
| **B3** | The context policy: fencing of untrusted content, what is trimmed | the fence is the injection defence | ✅ |
| **B4** | Policy positions, claim grounding against the world, the **ownership rule** | only the world knows AB-10003 has shipped | ✅ positions · ✅ ownership, checked at the far end too (T-002) |
| **B5** | Scenarios, the golden set, AgentTwin's world, perturbations and world-diff oracle | the runners grade outputs; none owns our data | ✅ · T-039, T-040 adopt around it |
| **B6** | The budget governor, and **the Open Stack's loop**: step budget, oscillation check, cost ceiling | the only position that sees a trajectory | ✅ kept, 16 Sep |
| **B7** | What needs a human, and what a stale approval means | a workflow engine waits; it does not decide | ✅ · Temporal waits and our validator decides (T-028) |
| **B8** | Adapters to the world: the MCP tool server, identity threaded through | it is the estate | ✅ projected world · T-017 real store |
| — | The span contract: *complete against what?* | every trace store accepts whatever it is sent | ✅ |
| — | The run fingerprint: what a version of this agent is | a flag system flips a value; it does not know the baseline moved | ✅ · T-018 |
| — | Cost per *successful* task | every tool measures per call | ✅ |
| — | Stack profiles, the Generation Brief, the four gates as one command | the cycle's own machinery | T-033, T-034, T-035 |

---

## Rules

Two rules keep this list finite:

> **An item enters only if it changes what is built next, or if it is evidence
> that can fail.** Anything else is a note, and notes go in `GAPS.md`.

> **Every deferrable item names a minimum slice.** An audit with no floor is an
> audit that never starts, and an exercise nobody can begin in an afternoon is
> one that waits for a week nobody has.

### One rule that joins G0 to G1: spec first, per change

Every change to the reference during G0 starts in a spec — the statement goes
into AOAS, AHC, AAC, AWD, the binding or the Baseline, placed by the charter's
routing rule — then the code, then a test **tagged with the statement's id**.
A change that cannot name its statement is either a gap (write the statement)
or not worth making. This is how "make the agent solid" and "make the specs
solid" become the same work instead of two.

The four gates below were written for the blind experiment and outlived it: they are now step 6 of every cycle (T-035).

### "Similar" is four gates, fixed before the first generation

Code is never diffed as a gate. A generation is similar when it passes:

| Gate | Measured by |
|---|---|
| **Behaviour** | the AgentTwin scenario suite, through the black-box agent contract |
| **Features** | the feature inventory — every tagged feature of the reference is exercised and passes |
| **Structure** | the blueprint: one module per harness layer, ports as interfaces, and the three build-time checks (strict types, import contract, size and complexity) |
| **Harness** | the harness profile: every capability the shape owes is realised or an accepted gap |

Line-level similarity is reported, descriptively, and never decides anything.

---

## The cycle's machinery

### T-033 · Stack profiles: the place a tech stack is declared

**Status** **Placeholders done 2026-09-16**: `stacks/` holds `open-stack.yaml`
(current and target bindings), and placeholders for `langgraph.yaml`,
`claude-agent-sdk.yaml` and `claude-family.yaml`. All four validate against the
profile schema. Repos: `clean-ai-engineering`, `ai-harness-catalog`.

**What remains.**
- **`extends` resolves.** The schema declares it; no tool reads it. The AHC linter
  merges a stack profile under an agent's profile, and reports the diff between
  them as the reviewable artifact the schema describes.
- **`reference-agent/harness-profile.yaml` extends `stacks/open-stack.yaml`**, and
  keeps only what is the support agent's own.
- **`harness.loop`** is set on every profile. The schema requires it in practice
  for any shape with a loop, and the reference profile does not set it today.
- Each placeholder is filled by its cycle: T-036, T-037, T-043.

### T-034 · The Generation Brief

**Status** Not started. Step 4 of every cycle. Repo: `clean-ai-engineering`.
`BUILD-MANIFEST.md` already reserves the row: *"Generation Brief: assembled, never
authored"*.

**What.** One command assembles, for a named agent and stack: the AOAS, the
world, the stack profile, the AHC capabilities and ports its archetypes owe, the
AAC obligations, and the blueprint. Claude Code generates the agent from that,
and from nothing else. The manifest pins every input by version and commit.

**What is not required any more.** Blindness. The blind experiment was dropped;
the generator may see other agents. Pinned inputs still matter, because without
them step 7 cannot tell which input a failure came from.

### T-035 · The four gates as one command

**Status** Not started. Step 6 of every cycle. Was G1.2. Repos: `reference-agent`, `agenttwin`.

**What.** An implementation behind the agent contract in, and out: a verdict on
each gate (behaviour, features, structure, harness; see *Rules*) plus the list of
failures. Each failure carries a proposed route: AOAS · AWD · AHC · AAC · stack
profile · blueprint · Baseline · generator.

**Why the route matters.** Step 7 is the point of the cycle. A failure with no
route gets fixed in the agent, and the spec stays wrong for the next cycle.

### T-044 · Set up AgentTwin for a new agent in one step

**Status** Not started. Step 5 of every cycle. Repo: `agenttwin`.

**What.** From an AOAS: a world scaffold (entities, actions, side-effect classes
read from the spec), a scenario template, and the three callables `Subject`
needs. The reference agent's binding is `evals/simulation.py`, written by hand
once. **Build only this delta**; the simulated user and graders come from T-039
and T-040.

**Done when.** Cycle 4's hotel world and scenarios (G2.2) start from it rather
than from a copy of the clothing world.

### T-048 · AHC's ports as a standard, decided by cycles 2 and 3

**Status** Not started. Decided 2026-09-16 (the user agreed). **Machinery, before
cycle 2.** Repos: `ai-harness-catalog`, `reference-agent`, `agenttwin`.

**The question.** Should AHC's 17 ports become an interface standard, the way
OpenTelemetry and OpenFeature are, so that agents on LangGraph and the Claude
Agent SDK plug into the same port definitions instead of only naming adapters
in a stack file?

**What is true today.** Every port already names its operations (`approval`:
`request`, `await`, `stop_signal`), which is half an interface with no types.
The reference agent has 12 Python Protocols and **they do not match the ports**:
the `state` port says `put/get/claim/expire/reserve`, the code has
`CheckpointStore` and `IdempotencyLedger`; the `approval` port says
`request/await/stop_signal`, the code has `ApprovalStore`. With one
implementation, the ports stayed descriptions.

**Why not typed signatures for all 17.** Whoever owns the loop decides who calls a
port. In our loop our code calls it, and a Protocol works. Under LangGraph or the
Claude Agent SDK the framework calls it through its own extension point
(`BaseCheckpointSaver`, `interrupt()`, `can_use_tool`, `PreToolUse`), and no one
Python signature sits inside all three. An SDK every framework must call is a
framework, which AHC exists not to be. OpenTelemetry, OpenFeature and MCP each
standardised **one** concern, with a wire protocol or a spec plus shared
conformance tests, not a class in one language.

**Three tiers.**

1. **Point at existing standards (6 ports, days).** The port says *realised by X*
   and keeps only AHC's invariants on top: telemetry → OTel GenAI conventions;
   tool_runtime → MCP; config → OpenFeature; identity → OIDC and RFC 8693 token
   exchange (its `exchange` operation); model → the OpenAI-compatible HTTP API
   through the gateway; trigger → CloudEvents.
2. **A conformance suite for all 17 (weeks).** Each port's invariants become tests
   any adapter must pass, through AgentTwin and the four gates (T-035).
   OpenFeature's shape: a spec and shared conformance tests. Two adapters are the
   same port because both pass *an approval survives a restart*, not because
   both implement one class. **This tier is what makes AHC a standard.**
3. **Typed signatures only where no standard exists and the concern is the
   agent's own (days per port).** Start with **approval, cost_ledger and policy**:
   a Python Protocol plus JSON Schema for what crosses the port (an approval
   request, a policy decision, a cost record), so another language can follow.

**The experiment, with its criteria written before it runs.**

- *Before cycle 2:* align the reference agent's Protocols for the three ports to
  the port operations, and write their conformance tests from the invariants.
- *Cycle 2 (T-036) and cycle 3 (T-037):* write adapters for the three ports on
  each stack.
- **Tier 3 is worth it** if the same conformance tests pass unchanged on all three
  stacks, each adapter stays at or under about 150 lines, and no signature
  changed to fit a framework.
- **It is not** if signatures changed per framework or the adapters fight the loop
  owner. Ports then stop at tier 2, and that is a result, not a failure.

**Done when.** Tier 1 is in every affected port file; the three ports have
conformance suites that pass on the Open Stack; cycles 2 and 3 have recorded
adapter size and signature changes per port; and tier 3 is decided in writing,
either extended to the other agent-specific ports (admission, recorder, state's
claim and expire, eval_task) or stopped at tier 2.

---

## Cycle 1 · Support agent · clothing · A6 · Open Stack

✅ G0 is tagged `v0.2.0`; G0.1–G0.10 are recorded under **Done**. What remains is G0.11's unfinished half, the agent work, and adopting the Open Stack.

### G0.11 · Composable checks, and what the agent emits

Two questions asked together on 12 September, and they turn out to be the same
question twice: **is every stage of the turn a list somebody can configure, and
is every fact the turn produces emitted once in the right shape?** Both are
about seams that exist and are half-built.

**What is already true.** `Position` declares five places a rule may run and
**two are ever called** (F-027): a rule configured at `PRE_TOOL` is accepted,
versioned, and silently never runs. Telemetry is **spans only** — no metrics of
any kind — so every aggregate question ("refusal rate this release", "escalations
per hundred turns", "cost per conversation over time") is answerable only by
aggregating traces, which is the wrong instrument and the reason
**AHC-0031** (*context size observable per release, not only per call*) is
unexercised. There is no injectable grader, so **AHC-0028** is unexercised too,
and nothing evaluates a turn while it is running.

**The controller shape, stated once.** A turn is a pipeline of stages, and each
stage takes *a list of things to run* — how many and what they do is
configuration, not code:

| Stage | Takes | Today |
|---|---|---|
| before the model | pre-checks | slot exists, never called |
| after the model | output rules | wired |
| before a tool | argument and authority checks | written into `GatedTools` as straight-line code |
| after a tool | result checks | slot exists, never called |
| before the reply | reply rules | wired |
| whether to fetch a person | escalation rules | **already a list** — `RuleSet`, versioned, first match wins |
| whether a request skips the model | routing rules | **already a list** — `router.Rules`, versioned |

Two of the seven are already the shape we want, which is the argument that the
shape is right; the work is making the other five uniform, and deciding
honestly which checks are *policy* (composed, ordered, budgeted, versioned) and
which belong to the tool boundary and should stay where they are. **AHC-0093**
(*policies compose in a declared order*) and **AHC-0095** (*policy evaluation has
its own budget and a declared timeout path*) are the statements; both are owed
and neither is exercised.

**The emission shape.** One table, and the rule is *one fact, one emission point,
derived downstream — never written twice*:

| Signal | Answers | Reference today |
|---|---|---|
| **Trace** | what happened in this one unit of work, and in what order | the whole of it |
| **Metric** | what is happening across units — rates, distributions, SLOs, per-release trends | **nothing** |
| **Event / log** | a discrete fact worth keeping that is not a span — a policy decision, a rule firing | carried as span attributes |
| **Domain record** | what the business must still be able to answer next month — approvals, escalations, the ledger | durable stores, correctly |
| **Dataset row** | a production turn, replayable as a test case | **nothing** — AHC-0029 unexercised |

**Where each half goes.** The universal statements exist in AHC already
(0006, 0026, 0028, 0029, 0031, 0090, 0093, 0095) — this is a *wire it and tag it*
exercise, not an authoring one. Which convention the attributes follow, and
which platform ingests them, is **realisation**: the OTel GenAI semantic
conventions are still moving, and the vendor conventions beside them are
products. So the version we target is pinned in the **binding**, and the
platform column belongs to G3.1. A capability that says *emit a span per call*
is portable; a capability that says *emit it in Arize's dialect* is not.

**Sequencing, and why.**

1. **Now, in G0** — the checker seam (F-027, AHC-0093, AHC-0095) and the
   emission table with metrics. Both are small, both are things a regeneration
   must reproduce, and the seam is the user-visible shape of the whole design.
2. **With G0.8** — inline evaluation. A grader in the loop is judgement, and
   judgement without a scenario suite to score it against is an opinion that
   costs a model call. AgentTwin's scenarios are what make an inline grader
   measurable, so AHC-0028 waits for them and arrives with them.
3. **With G0.8's live runs, then G3.1** — consumption. *A production record
   becomes a dataset row without re-keying* (AHC-0029) is what makes online
   evaluation automatable at all; proving it against a real platform is the
   `platform` column of the stack matrix, and dates as fast as the rest of that
   layer.

**Done when** every position is wired or deleted, the composition order and the
evaluation budget are declared, metrics exist for the aggregates the agent is
judged on, one identifier spans the unit of work, and a production turn can be
replayed as a test case without a translation step.

**G0 is done when** `v0.2.0` is tagged with: the three checks passing, every
finding closed or accepted, the Assurance Map showing no untagged test, and a
complete harness profile. Then it is frozen.

### T-006 · A customer's own conversations cannot be found

**Status** Not started. Raised 2026-09-15. T-002 is done: a session now names its login (`sub`) and customer, which is what finding a customer's conversations keys on.

**What is missing.** A returning customer cannot be given back anything. Close
the browser and `conversationId` — a `let` in the page, not `localStorage` — is
gone, so the next message carries no id and `_conversation_for` mints a fresh
conversation. Six past conversations, two of them with something still open, and
nothing connects them to the person in front of us.

Two separate questions are hiding in that, and only one of them is close.

*"What do I have open?"* — nearly reachable. `approvals` and `escalations` both
carry `customer_id NOT NULL` already. What is absent is a **query**: the
protocols offer `open_for(conversation_id)` and `pending()`, which are the
agent's view and the reviewer's view. Neither is the customer's.

*"Continue the one about AB-10003."* — the data exists and is unreachable.
`facts.records` is precisely *which identifiers this conversation touched*, and
it is deliberately bounded: a customer who asks about the same order nine times
costs one entry, and nothing in it is ever dropped by age. But it lives inside
the `state` blob, and `agent_state.checkpoints` has no `customer_id` column at
all — the customer is *in* the row and cannot be selected on. The tables already
disagree about this: two of the three treat a customer as a first-class thing
and the third does not.

**Why it matters.** It is T-001's third reason with a record behind it. A
customer who raised `esc_7`, closed the tab, and came back has an escalation
still `queued` in Postgres, findable by conversation id, that nothing will ever
ask for. They must quote the reference themselves — assuming they wrote it down
— which is the state `HandoffDesk` already names as the failure worth avoiding:
*an escalation that made the customer repeat everything is the moment an
assistant becomes worse than no assistant.*

**Where it would land**, in the order the blockers allow:

1. `customer_id` on `agent_state.checkpoints`, with an index. One migration, and
   it unblocks every version of this.
2. `open_for_customer(...)` on `ApprovalStore` and `EscalationStore` — the
   greeting T-001 wants, and the cheapest half.
3. A `conversation_records(conversation_id, record)` index written beside the
   checkpoint, so *"the chat about AB-10003"* is a join rather than a scan of
   every blob.
4. Resume by carrying **`facts`, not messages.**

**Step 4 is the one to argue about before building.** Prepending an old
transcript is the obvious implementation and the wrong one: the assembly window
is 24,000 characters and trims whole exchanges from the middle, so an old
conversation pushes out the turns the model is actually answering.
`facts.as_handoff()` already exists and is what a *human* colleague is given —
assembled from the record, never summarised from the transcript (AHC-0108,
AHC-0070). Resuming should mean the agent knows AB-10003 was returned and a
refund is pending, not that it has forty old messages.

**And it is a disclosure surface.** Pulling a past conversation means the agent
knows things this session's customer never said. `_conversation_for` already
refuses a mismatched owner with a 404 rather than a 403, because confirming the
id exists tells an attacker their guess was right; the same check has to hold on
every new path, and a shared device or an impersonated session is where it gets
tested.

### T-003 · Deduplication only works for one process — and the answer is mostly to adopt, not to build

**Status** **Done 2026-09-18.** Option 1, the effect idempotent where the state lives, holds for every operation with a declared `identity` since T-050 — which found a return that was prose rather than state. The claim is now a Temporal workflow named after the delivery, and the hard half, an expiry, is its own timer: running means somebody has it, completed means it was handled, and a claim nobody settled fails, which the id-reuse policy reads as claimable again (`6d03e7e`). Originally not started. Raised 2026-09-05, and **revised the same day** after the
right question: *why are we writing any of this?*

**The defect in the plan, first.** The module currently claims the durable version
is *"a swap rather than a redesign."* That is wrong. `settle` runs in a `finally`,
which does not run when a process is killed outright.

- *In memory*, the dictionary dies with the process. Nothing is stranded — it is
  self-healing **by accident**.
- *Durably*, the `in_flight` row outlives the process that wrote it and **nothing
  will ever settle it.** Every redelivery then gets `OverlappingRun`, forever.
  One crash permanently wedges that message.

A durable claim therefore needs an expiry, which the in-memory one does not. That
is the kind of thing normally discovered in production.

---

#### But the real answer is to write much less of it

**1 · Make the effect idempotent where the state lives.** The cleanest option by
a distance, because it removes the coordination problem rather than solving it.

```sql
UPDATE orders SET status = 'cancelled'
 WHERE id = %s AND status IN ('pending','confirmed');
-- rowcount 1 = we did it.  rowcount 0 = somebody already did.
```

One statement, atomic, no lock, no lease, no claim table, no stuck rows. A
duplicate becomes *harmless* instead of *prevented*, and harmless survives
crashes that prevention does not.

**2 · Let the queue do it, if a queue is delivering.** SQS FIFO
(`MessageDeduplicationId`), Azure Service Bus duplicate detection, Pub/Sub
exactly-once, Kafka's idempotent producer. **Configuration, not code.**

The catch nobody mentions: a queue deduplicates *its own* deliveries inside *its*
window, and only when the **producer** attaches a stable id per message. So the
id is still the thing that matters — the queue is just somewhere to check it.
**Whoever mints the id owns the correctness.** Our browser mints one per message
rather than per attempt, which is the part that is already right.

**3 · If durable multi-step execution is needed — and an agent needs it — adopt
it rather than build it.** Temporal, Restate, DBOS, Inngest. Deduplication by
workflow id is built in, a crash resumes where it stopped, and a workflow can
sleep for an hour waiting on a human and wake up correctly.

That last clause matters more than the deduplication. **Three modules here exist
largely because we lack durable execution:**

| module | what it re-implements |
|---|---|
| `trigger` | run-once semantics |
| `state` | checkpoint and resume |
| `approvals` | a long wait that survives a restart |

Adopting Temporal would subsume most of all three. For a product that is
straightforwardly the right call.

**4 · Only if none of the above applies**, the claim table — `INSERT … ON CONFLICT
DO NOTHING RETURNING`, so the unique constraint provides the mutual exclusion,
plus a `claimed_at` expiry so a killed process cannot wedge a message.

---

#### What the usual infrastructure does and does not do

**Load balancer — no, and it is the *cause*.** It is what puts two copies of the
agent behind one address, which is precisely why an in-memory dictionary stops
working. It has no concept of a duplicate.

**API gateway — less than people expect, and it may make things worse.** Gateways
do authentication, rate limiting, routing. Response caching accidentally
deduplicates identical reads and does nothing for writes. And **a gateway that
retries on a timeout is a duplicate *generator*** — a large share of duplicates in
real systems are manufactured by the infrastructure meant to add reliability.

**Queue — yes, genuinely**, subject to the producer-id caveat above. Note it also
changes the product: a queue implies the customer does not get an immediate
answer.

---

#### Does read-before-write in MCP solve it?

**Partly, and it is worth being precise about how partly**, because this is the
reason the duplicate in our own test did no damage.

`cancel_order` re-reads the row and re-checks the conditions, so a second attempt
finds the order already `cancelled` and refuses. **The world stopped it, not the
harness** — and a control that works by accident of the business rules is worth
naming as such.

Three things it does not do.

*It is not atomic.* Read-then-decide-then-write is the classic check-then-act
race: two processes can both read `pending`, both conclude "allowed", and both
write. The window is small, not zero — and it is exactly what the `StaleRead`
perturbation already simulates. The fix is to make the write itself conditional,
as in option 1 above; then the check and the act are one statement.

*It only works when the effect destroys its own precondition.* Cancelling works
because a cancelled order cannot be cancelled. **Sending an email, charging a
card and calling a webhook have no state to re-read**, and for those, read-before-
write offers nothing at all.

*It protects the effect, not the conversation.* The second run refuses correctly
and the customer may still be told something confusing or contradictory. The
world is safe; the reply is not.

So: a genuine second line of defence, and not a substitute for an identifier. It
turns *"a duplicate causes harm"* into *"a duplicate causes a confusing reply"*,
which is an improvement and not a fix.

---

#### Why this repository hand-rolls it anyway

Deliberately, and it should be said plainly rather than defended. This is a
**reference implementation**, and its whole job is to show what a harness must
contain. If the answer to *"how do you guarantee once"* is *"Temporal does it"*,
a reader learns nothing about what was needed — and the catalogue's own output is
supposed to be the **coverage delta**: *you chose X, here are the N things X does
not give you*. That sentence cannot be written by someone who never held the
problem.

**For a real product this trade is the wrong way round.** Adopt durable
execution, let the queue deduplicate, make the effects idempotent at the far end,
and delete `trigger` entirely.

**Where it lands.** Option 1 in the projected world and the real shop; option 3 as
a documented alternative binding rather than a rewrite. The in-memory log stays
for tests, with its docstring corrected — the durable version is a **superset**,
not a swap.

**AgentTwin needs it too.** Nothing runs two agents against one world, so a defect
needing two processes cannot be seen — the same shape as F-016 needing two
customers.

### T-005 · Carry the idempotency key to the far end

**Status** **Done**, under F-017: the key travels in the call's metadata and the order system recognises a retry by it (`tests/test_far_end_idempotency.py`). Marked here on 17 Sep, when T-050 checked; the TODO had not been updated.

Today the key is minted, used for a local lookup, and thrown away. The contract's
own docstring says it is *"carried to the downstream system"* and it is not.

**What that leaves unprotected**, in the docstring's own words: the call
succeeded, the response was lost, and from this side that is indistinguishable
from failure. Our ledger recorded nothing, so the retry goes out again. **Only
the party that applied the effect can tell the difference** — and only if we told
it the action's name.

**Both halves are needed.**

*Ours:* the key goes in the request. Either an argument the projected tool
declares, or MCP request metadata. Which calls need it is **derivable** — the
world already declares each action's side-effect class, so it is a rule rather
than a list somebody maintains.

*Theirs:* the far end must actually use it. The conditional write from T-003 is
the cheap version; storing the key and refusing a repeat is the complete one.

**Do this with T-003**, not separately. They are the same idea at two distances —
make the effect safe to repeat, and give the repeat a name the far end
recognises.

### T-017 · A real store, and a human in front of it

**Status** **The store is real, 18 Sep; a person's session is left.** In
`reference-agent`: `0909e39` Saleor in compose under a `store` profile; `c393c26`
the clothing world seeded into it by its own API (`deploy/saleor/seed.py`);
`fd07ca2` the store's own MCP server (`src/order_system/server.py`) with the
far end's checks and its own idempotency record; `b48eddf` the agent end to end
against it; `2c8288e` `run_server.py --store`. The `ecom` schema is dropped
(step 5): nothing read it. Step 4 moves into **T-042**, which needs an AgentTwin
world that reads a real store for its checks.

**What the crossing found**, each routed:

| Found | Where it goes |
|---|---|
| Saleor records dispatch, never arrival, so `shipped` and `delivered` are one status there | binding: the seed writes a delivery date as metadata, and the store server tells the two apart by it. A store with a carrier integration has the real event |
| No final-sale flag | binding: metadata |
| A real store would not complete an order nobody can deliver — channel, warehouse, a priced shipping method, a published product in a category, an Indian address with a state | the seed; the simulation never had to care, which is the gap `fidelity.not_faithful_about` already names |
| Saleor ships a `default-channel` in dollars, and a channel's currency cannot change once it has orders | the seed makes its own channel in rupees |
| A refund with no payment gateway is a *granted* refund — the store's record that money is owed back | binding. Whether the spec's `refunded` should mean "granted" or "settled" is a question for the AOAS, not answered here |
| The router recognises an order id by its shape (`[A-Z]{1,3}-\d{3,8}`); a longer one is not an order to the agent, so the consent gate finds nothing asked for | recorded. A real store's ids will not all fit one pattern — a spec gap for when T-042 runs a store whose ids differ |
| Two statements of each eligibility rule (spec and store) and two scope tables (binding and store), on purpose | kept: a disagreement is loud, and sharing one would hide it |

Raised 2026-09-16. **Depends on P1 (T-001; T-002 done).** The real store's tool server runs `order_system.authoriser`, and the agent's composition root wires `identity.TokenExchange` with the `support-agent` client; the simulated shop does neither.

**Decided 2026-09-16 (the user): adopt Saleor, and this is the grounding item.**
The user's requirement is a real e-commerce app behind the agent so that it is
grounded. Adopt rather than build, because a store we write carries the same
assumptions as the world file and grounds nothing: grounding means a store whose
rules somebody else wrote. The work, in order:

1. Saleor in `reference-agent/compose.yaml` under a `store` profile (API, worker,
   dashboard), and its row moves from `NOT_YET` to `ADOPTED` in `tests/test_compose.py`.
2. A real MCP tool server on the official SDK's `MCPServer`, the same as the
   projection: the agent's existing tools as calls to Saleor's GraphQL API, with
   the same scope and side-effect metadata. Only `mcp_base_url` changes.
3. A seed that loads the clothing catalogue, customers and orders from
   `worlds/clothing.yaml` into Saleor, so both stores start from one t₀.
4. The same scenarios against the projected world and against Saleor. Each
   difference is a spec gap, routed like any other failure.
5. Decide the `ecom` schema in `sql/001_schemas.sql`: no code reads or writes it.
   Drop it, or keep it only as the world's ontology.

**What is missing.** Anyone has ever talked to this agent. Every run to date is
scripted or simulated: 34 scenarios with a scripted model, a golden set derived
from declared conditions, a world projected from YAML. All of it proves the agent
does what the specification says. None of it proves the specification describes an
agent worth talking to.

**Two halves, and only one is new.**

*The store.* `ResolutionMode` already declares `[mock, replay, real, shadow]` and
`worlds/clothing.yaml` says `resolution: mock`. A real store is the `real` value —
the seam was designed for this and has never been exercised. **Saleor** is the
closest fit by stack (Python, GraphQL, Postgres), though the language barely
matters: the agent reaches the store over MCP and never imports it, so Medusa or
Vendure work equally. What changes is one tool server, from the projected world to
one that calls a real API.

*The human.* A person opening a chat and trying to get something done. That is
where the findings will be, and they will be a different **kind** of finding —
the suite catches wrong behaviour, and a person catches behaviour that is correct
and useless.

**What it will find**, predicted so the prediction can be wrong: T-001 in the
first thirty seconds. An empty box, no greeting, and the customer must know their
order number. Every scenario opens by stating one because the actor is scripted
to; a person will not.

**And it is the honest test of `shadow`.** The fourth resolution mode is declared
and unbuilt. A real store beside the projected one, both answering, the difference
recorded, is how `verified_against: null` in every world file stops being null.

**Why it matters, stated because it changes what "done" means.** Three purposes
have been named for this repository and they pull in different directions:

1. **A reference** somebody copies when building a production agent. Requires the
   hand-rolled/adopted line to be explicit (T-016) and the gaps to be honest.
2. **Teaching.** Requires the *reasons* to survive, which is why the docstrings
   carry findings and why `docs/WHY-EACH-FILE.md` exists.
3. **A funding case.** Requires a claim that has been *tested* rather than
   argued — which is T-008, and which is why the hole-finding items are
   sequenced before it.

A human conversation serves all three and is prerequisite to none. It should
happen once P1 exists, and its findings should be recorded the way F-001 to F-040
were: the failures are the deliverable.

### T-020 · Trace context and the run id stop at the process edge

**Status** Not started. Raised 2026-09-16 by T-009. **Cycle 1.** Repo: `reference-agent`.

**What is missing.** Propagation. One trace per turn holds inside the process. A
tool call's MCP `_meta` carries the session, and on a write the idempotency key,
but never a `traceparent`. A read carries no run id at all. The tool server's work
therefore cannot attach to the agent's trace, and nothing joins a read to the
unit of work that made it.

**Why it matters.** AHC-0006 and AHC-0026 were listed as believed met. T-009 found
them unmet across the boundary, and both now sit in `accepted_gaps`. A
generated agent with no propagation would pass every gate, because nothing checks
the hop.

**Done when.** `propagate.inject` writes the trace context and run id into `_meta`
on every call; the tool server extracts them; a test asserts that the server's
span carries the agent's trace id. Both entries leave `accepted_gaps` and gain a
tag.

### T-024 · Two release gates have no test behind them

**Status** Not started. Reported by every `pytest --assurance-map` run. **Cycle
1.** Repo: `reference-agent`.

- **AAC-0051**: tool selection accuracy, including choosing no tool.
- **AAC-0096**: cached responses never cross a trust boundary.

**Why.** Both are *release gates*, and the conformance report lists them as
gating with nothing behind them. Everything else unexercised is non-gating.

**Done when.** Each has a tagged test, or an accepted gap with an owner and a
review date.

### T-025 · Verify the price table before any figure is published

**Status** Not started. **Cycle 1.** Repo: `reference-agent`.

`cost/__init__.py` records prices *"approximate, recorded 2026-09-01"*, and its
comment says it is *"listed in the 'verify before publishing' section of TODO.md"*.
No such section existed in either TODO, so the pointer was dangling. This is that
section.

**Done when.** Every row in `PRICES` has been checked against the provider's
pricing page and dated, and the comment points here.

### T-007 · Every scenario runs once, so nothing measures reliability

**Status** Not started. Raised 2026-09-16. **Discharges `AAC-0010`, currently in
`NOT_EXERCISED.md`.**

**What is missing.** A number for *how often the agent gets it right*, as opposed
to *whether it can*. Every scenario runs exactly once, against a scripted model,
so the suite is deterministic by construction: it proves the harness works and
says nothing about the agent's consistency. `AAC-0010` — variance across repeated
runs is bounded — has no test behind it and this is why.

**What the field uses.** τ-bench's `pass^k`: the probability that **all k**
trials of a task succeed, averaged over tasks. Deliberately the opposite of
`pass@k`, which asks whether *at least one* of k succeeds and suits code
generation, where you can generate ten candidates and ship whichever passes. A
support agent has no such luxury — every customer gets one attempt — so the
metric that matters is the pessimistic one.

**Why it matters.** The numbers do not degrade gently. A retail agent reported at
61% mean accuracy is at **25%** by `pass^8`. Mean accuracy hides exactly the
property a deployment cares about, and hides it worse the more the agent is used.
Frontier models sit below 70% on τ-bench `pass^1` for retail and near 46% for
airline, which is the honest shape of this problem and not a reason to avoid
measuring it.

**Where it would land.** The pieces mostly exist: `--live` in `scripts/run_view.py`
and `scripts/live_runs.py` already drive a real provider. What is absent is
running one scenario *n* times and reporting, per scenario, how many of the *n*
passed — then `pass^k` as `C(c, k) / C(n, k)` averaged across scenarios. It
belongs beside the run view rather than in the pytest suite: a reliability figure
is a report, not a gate, and a flaky test that fails 30% of the time gets
disabled within a week.

**What not to do.** Do not adopt τ-bench's 165 tasks. Different domain, and their
policy is prose in a prompt where ours is declared and machine-checkable — taking
their cases would mean giving that up. **Do** read the retail policy document as
a cross-check on the AOAS: it is 115 tasks' worth of edge cases somebody has
already thought through for a retail support agent.

### T-055 · The numbers leave the process

**Status** Not started. Raised 2026-09-19, asking whether an operator would learn of a broken agent before a customer did. **Cycle 1, Tier 1b.** Repo: `reference-agent`. Statements: AHC-0111, AAC-0114, AAC-0007.

Seven counters are defined in `telemetry/counters.py`, labelled from closed sets and recorded where a turn ends — and no `MeterProvider` is configured, so every one of them records into the no-op provider. The approvals counter counts only `requested` since T-028 moved decisions into Temporal. There is no latency histogram at all.

**Done when:** an OTel Collector, Prometheus, Grafana and Alertmanager run in compose; the agent exports metrics and fails to start in a deployed profile without an exporter; latency histograms exist for the turn, each model call and each tool; approvals count `granted`, `refused` and `expired` from the workflow; a dashboard answers the operator's questions in the single page; and alert rules on escalation, refusal, malformed-model and p95-cost rates against a baseline fire in a test that replays a day with one rule forced. **Minimum slice:** the MeterProvider and Prometheus, with one alert on escalation rate.

### T-056 · A canary through the deployed edge

**Status** Not started. Raised 2026-09-19. **Cycle 1, Tier 1b.** Repos: `reference-agent`, `agenttwin`. Statements: AHC-0113, AAC-0116. Needs T-055.

Shadow mode already runs scenarios through the agent's own tools against Saleor, and seeding into a namespace gives a customer data only it owns. Neither runs against the *deployed* edge — the portal login, Keycloak, LiteLLM, Temporal — nor on a schedule, nor alerts.

**Done when:** a synthetic customer in its own realm user and Saleor namespace runs about eight scenarios through `/chat` every ten minutes; its runs carry a marker every production rate excludes; a failed case or a missed run alerts; and a deliberately broken dependency (a rotated LiteLLM key) fails it within one period. **Minimum slice:** one read scenario on a schedule with an alert.

### T-057 · Online scoring, and what happened afterwards

**Status** Not started. Raised 2026-09-19. **Cycle 1, Tier 1b.** Repo: `reference-agent`. Statements: AHC-0112, AAC-0014, AAC-0115, AAC-0042; the judge per AHC-0081 and AHC-0028. Needs T-055. Overlaps G0.11 (AHC-0029).

**Done when:** a sample of turns is captured redacted (AAC-0095); a certain check that the reply agrees with what its tools returned scores every sampled turn; a judge, versioned apart from the agent and checked against a small labelled set, scores tone and policy; scores land in Langfuse with the grader's version and are exported as metrics; and three later outcomes — the customer returning about the same order within a day, a refund reversed, explicit feedback from the channel — are recorded against the run and counted beside the scores. **Minimum slice:** the certain check plus the "came back within a day" outcome.

### T-049 · The first live call's replay has been broken, silently

**Status** Found 2026-09-16 while wiring T-018. Repo: `reference-agent`.

`python scripts/first_real_call.py --replay` fails with `TrustBoundaryCrossed`:
*this recording was made under {model, temperature, tools} and the replay did not
say what it is running under*. The cassette began requiring a declared context
(AAC-0096) and this script was never updated, because nothing runs it:
`tests/test_scripts.py` leaves out the scripts that need a network, and the
replay mode is the one that does not. **Done when** the replay passes the
context it runs under and `test_scripts.py` runs `--replay`, so it cannot break
quietly again.


### T-030 · Adopt Presidio for PII

**Status** Not started. **Cycle 1, Open Stack.** Repo: `reference-agent`.

`PREFERRED-STACK.md` and `PRODUCTION-STACK.md` both name Presidio for PII. The
register still declines guardrail *products* as the primary control, because
none models *position*, and that stays true. PII detection is a component, not a
position. **The delta that stays ours:** the positions it runs at, and grounding
a claim against the world.

**Done when.** The PII patterns are replaced by Presidio at the same positions,
and the redaction tests pass unchanged.

### T-027 · Adopt VCR.py or pytest-recording in place of `cassette/`

**Status** Not started. Decided in T-016's register. **Cycle 1, Open Stack.** Repo: `reference-agent`.

Record-and-replay is on the list of things not to build. **Check before
deleting:** `cassette/` holds `Recorder` and `Player`, which the composition-root
test counts as realisations, and a scenario may replay through them. Moving to
VCR must keep that seam, for the same reason `ResilientLLM` had to stay when
LiteLLM was measured (F-029).

### T-046 · Adopt promptfoo for prompt-level checks

**Status** Not started. Decided 2026-09-16. **Cycle 1, Open Stack.** Repo: `reference-agent`.

`PREFERRED-STACK.md` L12: *AgentTwin, plus promptfoo for prompt-level checks.* The
two do different jobs. AgentTwin puts the agent in a world and diffs it, while
promptfoo asserts on what one prompt produces, cheaply and on every change. AAC
already ships a promptfoo adapter, so its results land in the coverage report
with no new code.

**Done when.** The system prompt and the reply-screen prompts have promptfoo
cases, run in CI, reported through AAC's adapter.

### T-047 · Adopt OpenFeature for release flags

**Status** Not started. Decided 2026-09-16. **Cycle 1, Open Stack.** The flag service joins `compose.yaml` here.

`PRODUCTION-STACK.md` L15 names **OpenFeature** with **Unleash** or **Flagsmith**
behind it; which of the two is this item's first decision (see *Evaluate*).

**The delta that stays ours**, in that document's words: *what constitutes a
version of this agent*, meaning prompt, model, rules and world together. A flag
system flips a value and does not know the flip invalidated the baseline, so
every flag read is stamped into the run fingerprint's record, and a flag that
changes behaviour is covered by the fingerprint (T-018).

### T-032 · The two stack documents contradict each other and the register

**Status** Not started. Repo: `reference-agent`.

`PREFERRED-STACK.md` (5 Sep) says *native API, no gateway*, to keep prompt caching.
`PRODUCTION-STACK.md` (5 Sep) says *adopt a model gateway without hesitating*.
The register (16 Sep) chose a LiteLLM proxy. A reader cannot tell which is
current.

**Done when.** Both documents agree with the decisions register, or say plainly
that they record an earlier position and point at the register.

### T-016 · Three things on this project's own "do not build" list are built here

**Status** Not started. Raised 2026-09-16. **Audit, then one item per adopt.**

**What is missing.** A verdict per harness component: keep, adopt, or wrap. Some
things here are hand-rolled deliberately — the loop is, and the catalogs exist
because a framework owning that layer hides what they expose. Others are
hand-rolled because it was quicker that day and nobody went back. From outside the
two are indistinguishable, and that is the real cost: a reader cannot tell a
decision from an accident, and this repository exists to be read.

**Scored against `LearnAgenticHarnessFrameworks/08-what-you-build.md`**, which is
this project's own list of what not to build:

    A trace format              clean — OTel GenAI conventions
    A prompt DSL                clean — Jinja and files, versions in traces
    Own tool protocol           clean — MCP
    A vector DB, a sandbox      not applicable
    Model client wrappers       VIOLATED — llm/ plus resilience/ is 636 lines,
                                against a warning that a thin wrapper will not stay thin
    A durable workflow engine   PARTLY — approvals and escalation with ttl, lapse
                                and sweep is a small workflow engine
    The agentic loop            QUALIFIED — the stated exception applies, but the
                                danger named is drifting into a half-built
                                compactor and checkpointer, and context/ and
                                state/ are that

Three of eight. The loop is defensible and should be defended in writing. The
other two are drift, and drift is what an audit is for.

**The adoptions, highest value first.**

*LiteLLM at L2 — **measured 16 Sep, and the case does not hold as written**.*
The claim above was about 600 lines. It is 65: `GroqClient` is 65 lines of
`llm/`'s 266, and `ScriptedClient` and `UnavailableClient` stay because the tests
need them.

**`resilience/` cannot go, and the reason is structural rather than a
preference.** `ResilientLLM` wraps an `LLMClient`, and that is the seam scenarios
inject faults through — `evals/simulation.py` builds
`ResilientLLM(FaultyProvider(scripted))`, which is how `the-provider-throttles`
and `the-model-fails-twice` work at all. LiteLLM's retries live *inside* LiteLLM,
below that seam, so it would never see a `FaultyProvider`: production would
retry and simulation would not. That is F-029 exactly, and `simulation.py`
already states it — *a simulation that composes the agent differently from
production is simulating a different agent, and the difference is invisible until
a scenario asks the provider to misbehave.*

So the real trade is 65 lines removed, ~50 lines of adapter added, a dependency
gained, LiteLLM's own retries disabled to avoid two retry layers, and
`completion_cost` avoided because it returns 0.0 for an unknown model rather than
raising — the exact failure `UnknownPrice` exists to prevent. Net roughly zero
lines for one dependency. The gains that remain are real but narrow: a hundred
providers behind one call, and a maintained price map worth cross-checking ours
against.

**The better shape is the proxy, and it is T-018's point arriving concretely.**
Provider portability, retries, cooldowns, fallbacks and budgets are what a
gateway is for, and a gateway is reached through `provider_base_url` — no
dependency, no code change, `GroqClient` already takes a `base_url`. Resilience
then sits in the gateway where it covers everything else you run, `ResilientLLM`
stays untouched so F-029 holds, and a later move to Databricks or Azure is one
gateway replacing another. **Decide this with T-018 and not before**; the answer
today is *neither, until there is somewhere to run a proxy*, which is P1 again.

*An OTLP processor.* **Done 16 Sep.** `tel.export_to(endpoint, headers=…)`, called
from the composition root when `AGENT_OTLP_ENDPOINT` is set, adding a
`BatchSpanProcessor` **beside** the in-memory exporter rather than instead of it.
Batch and not Simple: a network export on the request path would put a
collector's latency inside a customer's turn, and its outage there too.
`otlp_endpoint` is deliberately outside `RunConfig.fingerprint` — pointing
telemetry elsewhere does not change what the agent does, and a fingerprint that
moved when it did would call two identical runs different systems.

One thing the work taught, recorded because it is a live trap: a
`BatchSpanProcessor` aimed at a collector that is not listening **retries in a
background thread**. Correct in a deployment, where a restarting collector should
not lose a trace. Intolerable in a suite, where it is noise on every later test —
the first draft of the test left it running, and the fix is that the test shuts
the provider down.

*A chat surface.* Chainlit or assistant-ui. Hand-written HTML in `ui/` teaches a
reader nothing this project wants taught.

*Record and replay.* VCR.py or pytest-recording in place of `cassette/`.

**What to evaluate rather than adopt.** LangGraph's Postgres checkpointer against
`state/`, and its interrupts — or Temporal — against the approval and escalation
workflow. Both are the L4 decision, which T-004 argues is independent of L2 and
should stay that way. Evaluating is not adopting; the output is a written reason.

**What stays, and the test for it.** The doc states the heuristic: the do-not-build
list is everything that is the same for everyone, and the build list is everything
that encodes your domain, risk appetite and definition of quality. By that test
these are ours and should say so: `contracts/`, `policy/` — the five positions are
the contribution and no guardrail library models position at all — `approvals/`,
`escalation/`, `state/facts.py`, `router/`, the scenarios and the golden set.

**Why it matters beyond tidiness.** All three stated purposes depend on it. A
reference somebody copies should not teach them to write a circuit breaker. A
teaching artifact has to show where the line is, which means drawing it. And a
funding case is stronger when the novel part is small and named than when
bespoke-everything implies it.

**Where it lands.** A table in `REVIEW.md` with a verdict and a reason per row,
each adopt becoming its own item. The rows already decided this week — Hypothesis
adopted, Cosmic Ray used once to calibrate and not kept — belong in it as
precedent for the format.

**Three rows whose verdict is already decided and should be written as such.**

*The customer-facing chat, and the human side of escalation — adopt Chatwoot.*
Its Agent Bot API is this agent's escalation model already built: webhook events
carry the message with full conversation context, and a bot that decides a person
is needed flips the conversation to `open`, at which point a human takes over
**with the transcript already there**. Channels, history and assignment come with
it. `facts.as_handoff()` stops being the whole handoff and becomes an added note.
It closes T-001 and the customer half of T-017 without a line of UI. Two things to
record with it: it does **not** solve approvals — escalation is a person taking
the conversation, approval is a person authorising one action while the agent
keeps it, and only the first is Chatwoot-shaped — and it needs **T-002** first,
because Chatwoot supplies a contact and this agent needs a signed `customer_id`.

*Intent conversion — adopt nothing.* Multi-intent is already specified and
already tested: P-DIRECT sends a turn naming several orders or several intents to
the loop, F-037 is the defect from getting that wrong, and
`twelve-steps-and-then-a-person` exercises five orders in one run. There are two
opinions about intent here — a regex router for the unambiguous single case and
the loop for everything else. An NLU layer would be a **third**, and three things
that can disagree about what a customer meant is worse than two, because a
misroute then has no clear owner.

*Model tier routing — deferred, with the seam named.* Routing a hard question to
a strong model and an easy one to a weak model is solved: LiteLLM has cost-based
strategies, OpenRouter ships an Auto Router with a cost/quality dial, and
RouteLLM is the research answer at 85% cost saving for 95% of GPT-4 quality. None
of it is worth adopting **here yet**, and the reason is arithmetic: the ceiling is
`max_cost_usd = 0.50` per task and a real turn costs about $0.00002 — four orders
of magnitude of headroom. Tier routing optimises a cost this agent does not have,
and P-DIRECT already answers the more valuable question, *any model at all*, by
removing three of four routes before one is called. When it does become real the
seam exists: `LLMClient` is a Protocol with six implementations, and a
`TieredLLM(strong, weak)` is a seventh that changes nothing else — the same shape
as `ResilientLLM` wrapping `GroqClient`. Recorded here rather than left out so a
later reader sees a decision and not an oversight.

---

## Cycle 2 · Support agent · LangGraph

### T-036 · Cycle 2: the support agent on LangGraph

**Status** Not started. Repo: `reference-agent-langgraph`, not yet created.

Only the stack changes. Fill `stacks/langgraph.yaml` with what LangGraph supplies
(its loop, its Postgres checkpointer for `state`, its interrupts for `approval`)
and what it does not. Generate, set up AgentTwin, run the gates, route the
failures. **What to watch:** where the step budget, oscillation check and cost
ceiling live once LangGraph owns the loop. `PRODUCTION-STACK.md` L4: *if you
cannot say, it has adopted you.* This cycle's step 7 also produces the
`framework` column of G3.1.

**And T-048's first test.** Write LangGraph adapters for the approval, cost_ledger
and policy ports (interrupts, a callback, a node or wrapped tool), and run the
port conformance suite against them unchanged. Record adapter size and every
signature change.

---

## Cycle 3 · Support agent · Claude Agent SDK

### T-037 · Cycle 3: the support agent on the Claude Agent SDK

**Status** Not started. Needs cycle 2. Repo: `reference-agent-claude-sdk`, not yet created.

**T-048's second test**, the same way: approval through permission callbacks,
policy through `PreToolUse` hooks, cost from the SDK's reported usage. After this
cycle T-048's tier 3 is decided.

Only the stack changes. The SDK brings a loop, built-in tools, context
management, hooks, permissions and sessions, so more ports are supplied than in
LangGraph, and more may be **hidden**. D-008's hand pass found three real losses
and five hidden layers. Fill `stacks/claude-agent-sdk.yaml`, recording each port
as provided, partial, absent or hidden, then run the cycle.

---

## Cycle 4 · Hotel support agent · Open Stack

The G2 text below predates the cycle. Where it says *the same protocol as G1* or *re-run G1*, read: generate with the Generation Brief (T-034), and re-run the support agent's suite. The blind protocol was dropped on 16 September.

### G2 · The hotel customer support agent from the same universal specs

**What stays the same:** AAC, AHC, Baseline, blueprint, and the binding. **What
is new:** a hotel AOAS and a hotel world — and nothing else.

#### G2.1 · Write the hotel AOAS — with no reference to extract from

Written from the domain, as a domain owner would. It is the test of whether
AOAS is writable without code. **Expected to strain the format**: bookings are
long-horizon and stateful — holds that expire, modification windows, dates
compared with dates, availability contended by other guests. A condition over
two fields (check-in against the cancellation deadline) is the trigger, already
written down, for moving all four condition consumers to an expression language
at once.

#### G2.2 · Write the hotel world and scenarios

In the G0.8 scenario format. There is no reference implementation, so **the
oracle is these scenarios** — derived from the hotel AOAS, the way the support
agent's eligibility cases were derived from its world.

#### G2.3 · Generate, measure, classify

Same protocol as G1. Behaviour against the hotel scenarios; structure against
the same blueprint, so the two agents' module maps should be near-identical;
features against the universal part of the support agent's inventory
(escalation, context, errors, deterministic-first all carry over).

#### G2.4 · Fix universal gaps, then re-run G1

Every gap G2 finds in a universal spec is fixed there — **and G1 is re-run**,
because a universal fix that breaks the support agent's regeneration was not
universal. This is the regression test for the whole family.

#### G2.5 · AOAS earns its repository

Two agents of different shape meet the promotion condition.

#### G2.6 · Measure the reuse, against the prediction

G0.10 predicted the split from one agent. Two agents make it measurable: what
proportion of the hotel agent's code is byte-identical to the support agent's,
what is structurally identical under a rename, and what is genuinely its own.
**A divergence from the prediction is a finding about the specifications** — the
mechanism that came out different in the two agents was under-specified, and the
per-agent file that came out the same was universal all along and belongs in a
layer above.

### T-022 · Fix the five AOAS frictions

**Status** Waiting on T-013. Raised 2026-09-16. **Cycle 4.** Repo: `clean-ai-engineering`.

**What.** The four things that resisted in the hotel AOAS (T-011), plus the fifth
found by T-012: normative blocks with no identifier, so a file cannot cite what
governs it. The record is `drafts/examples/support-agent-hotel.extraction.md`.

**Why wait.** Fixing them against one second domain fits the format to hotels.
T-013 adds a differently shaped set; fix the union.

### T-019 · Extract the mechanism library

**Status** Not started. Follows from the hybrid decision (G0.10, 2026-09-13), and
was in no queue until the merge. **Cycle 4.** Repo: `reference-agent`.

**What.** The mechanism modules become an installable package; the parameterised
and per-agent modules stay with the agent. `evals/reuse.py` already classifies
every module: 46 files are mechanism, 9 parameterised and 5 per-agent as of 16 Sep.
G0.10 counted 47 / 7 / 5 on 13 Sep, so reconcile the two counts first.

**Why.** Cycle 4's hotel agent installs the library and writes its own seams.
Without the library, cycle 4 generates the mechanism again, and measures the specs
twice instead of measuring the seams.

**Done when.** The support agent imports the library and passes unchanged, and
the import contract still holds across the package boundary. **What would
falsify the decision:** a hotel agent that has to edit a mechanism module, with
`policy.CLAIM_PATTERNS` as the named suspect.

---

## Cycle 5 · Spark cost analyst · Claude Agent SDK

### T-013 · Write the Spark cost analyst AOAS — the adversarial shape

**Status** Not started. Raised 2026-09-16. **Sibling of T-011, different failure
mode expected.**

**What is missing.** Evidence that the specification set describes an agent that
is **not shaped like this one**. T-011 varies the domain and keeps the shape;
this varies the shape and is therefore the sharper test.

**The agent.** Case 2 of `LearnAgenticHarnessFrameworks/11-worked-examples.md` —
reads Spark event logs and Delta metadata, finds expensive jobs, diagnoses why,
writes up the evidence. It is also CostLens, which is the only argument that
carries against the single-thread decision.

**What it removes**, and this is the point:

    who is waiting        a customer, live      →  nobody, it runs nightly
    a run lasts           seconds               →  twenty minutes to two hours
    shape                 turns, a conversation →  one long task, no turns
    writes                yes, gated            →  read-only
    approvals, escalation central               →  absent entirely
    context               fits easily           →  the entire job

Three of this agent's load-bearing concerns — approvals, escalation, irreversible
effect gating — are simply not present there. So the question is not whether the
format can say new things, it is whether it **degrades gracefully**: can an AOAS
describe an agent with no approval gate without the omission reading as an
oversight? If the format can only describe an agent shaped like this one, that is
a hole and a large one.

**And it inverts the pressure on context.** Context lifecycle is a *Must* for that
agent and barely exercised here. Four of the seven context handlers are unbuilt —
Offloader, Selector, Deduplicator, Compactor — and that agent needs at least the
first two. Whether "deliberately absent" survives a second shape is a real test
of that table, not a rhetorical one.

### T-038 · Cycle 5: the Spark cost analyst

**Status** Not started. Needs T-013 and cycle 3. New repository.

The shape changes: read-only, one task of twenty minutes to two hours, no turns,
no approvals, no escalation, and the context is the whole job. On the Claude
Agent SDK, the stack the roster recommends, which cycle 3 will have proven. The
four context handlers never built for the support agent (Offloader, Selector,
Deduplicator, Compactor) are the likely step-7 findings. Related work exists:
`spark-cost-agent` is AAC's Phase 4 reference implementation, and CostLens's
`detect.py`. Read both at step 2, before writing the world.

---

## Cycle 6 · Invoice reconciliation · LangGraph

### T-045 · Cycle 6: invoice reconciliation

**Status** Not started. Needs cycle 2. New repository.

The shape changes: A5 · A9, a run that waits for days, where the auditable path is
the deliverable. On LangGraph, the stack the roster recommends, which cycle 2 will
have proven. The whole cycle: AOAS, world, generation, AgentTwin, gates, routing.
Detail at step 1, from `LearnAgenticHarnessFrameworks/11-worked-examples.md` §3.

---

## Cycle 7 · Support agent · Claude family (later)

### T-043 · Cycle 7: the support agent on the Claude family stack

**Status** Later. Defined 2026-09-16. Needs cycle 3. Repo: `reference-agent-claude-family`, not yet created.

**What the stack is**, in the user's words: *the Anthropic SDK, start to end,
everything, with our loop.* So `harness.loop` is ours (`in-house`), exactly as in
the Open Stack, and every port the Anthropic SDK can fill is filled by it:
- the model call, with prompt caching, token counting and structured outputs;
- context editing, server-side compaction and the memory tool, which move the
  long-conversation problem above the harness;
- the Batch API for offline evaluation runs;
- tool use, over MCP.

What the SDK does not supply (login, durable waits, traces, the store) the stack
**inherits from the Open Stack** through `extends`.

**Only the stack changes**, so it is a cycle like 2 and 3. T-004 holds the
argument: the L2 and L4 decisions are independent, and conflating them is how a
team adopts a whole harness to get prompt caching. **What to watch:** the Open
Stack reaches models through the LiteLLM proxy, and this stack deliberately does
not, because the proxy's OpenAI-shaped request has no field for `cache_control`.
The fingerprint decision (T-018) has to hold across both.

### T-004 · An Anthropic adapter at L2 — the loop stays ours

**Status** **Revived 2026-09-16 as the Claude family stack** (T-043): the Anthropic SDK
end to end, with our loop. Raised 2026-09-05; dropped and revived the same day,
when *Claude family* was defined as exactly this item.

**What this is not.** Not adopting the Claude Agent SDK, and not giving up the
hand-written loop. Those are L4 decisions. This is L2: which client the adapter
wraps. `anthropic` brings **no loop** — you call `client.messages.create()`
inside whatever loop you already have, which is the ordinary case rather than a
workaround.

**Why it is one module.** The import contract already says *only `llm` may import
a provider SDK*, enforced by import-linter on every run. So the blast radius of
this change is `llm/__init__.py` and nothing else — the contract was written for
precisely this.

**Three open items it closes at once**, which is what makes it worth doing:

*The context budget is measured in characters.* Left over from F-008 and recorded
as "deferred and handled are different words." `client.messages.count_tokens()`
makes it tokens, which is what every budget in the system actually meant.

*Offline evals pay full price.* The Batch API is half, asynchronous, and an eval
suite is exactly the latency-insensitive workload it exists for.

*Prompt caching is unreachable.* R-004 noted the stable-prefix ordering is
**already in place**, so `cache_control` on the system block would work on the
first attempt. An OpenAI-shaped request has no field to carry it, so this is not
a matter of effort — the shim structurally cannot.

**And two things it would make newly possible**, both of which land on layers we
already own:

*Mid-conversation system messages.* An operator instruction appended to
`messages` that does not invalidate the cached prefix, and is the
injection-safe operator channel. That is L7's `PRE_MODEL` position — one of the
three declared and empty ones (R-008).

*Server-side compaction and context editing.* The long-conversation problem
answered above the harness rather than inside it, where `context` currently
trims by hand.

**What it does not change.** The loop, the router, the tool boundary, the policy
positions, the oracles, the world. All of L4 stays exactly as written, which is
the point: **the L2 and L4 decisions are independent**, and conflating them is
how a team adopts an entire harness in order to obtain prompt caching.

**Cost note.** This repository's standing constraint is free hosted open-weight
providers. An Anthropic adapter would sit *alongside* the Groq one rather than
replacing it — `LLMClient` is already a protocol with three implementations, so a
fourth costs nothing and the resolution seam decides which runs.
---

## Specs: kept robust between cycles

### S1 · AHC

#### T-021 · Findings have to flow back into the catalogs

**Status** Not started. Raised 2026-09-16 by T-012's second follow-up. **Specs, between
cycles.** Repos: `ai-harness-catalog`, `ai-assurance-catalog`, `clean-ai-engineering`.

**What is missing.** A statement for each defect that produced a file. Three
mechanism files exist because of F-006, F-007 and an uncapped write
(`docs/WHY-EACH-FILE.md`). No spec statement requires any of them.

**Why it matters.** A generated agent gets none of that history. Every cycle's
step 4 reproduces the three defects, and step 7 rediscovers them.

**Done when.** Each of the three either names the AHC, AAC or AOAS statement
written for it, or is recorded as not general enough to state. Decide before
the first Generation Brief is assembled (T-034).

G3 below was written as a goal of its own. Its matrix (G3.1) is now AHC Phase 4, filled from cycles 2 and 3, and G3.2's rebinding *is* cycles 2 and 3 (T-036, T-037).

#### G3 · The same specs on a different stack — and what the stacks already give you

G1 varies the generator, G2 varies the domain. **G3 varies the stack**, which is
the axis that decides whether the binding is a real seam or only a name. It also
produces the catalog's own shipped product: D-008 fixed AHC's output as the
**coverage delta** — *you chose X, here are the N things X does not give you* —
and that is the transpose of a realization.

**Why not sooner.** `realizations/README.md` already rules on it: *authored last,
in one dated pass*, because it is the fastest-rotting layer in the family and
writing it beside a moving catalog means writing it three times. AHC gained seven
capabilities on 12 September from reading running code, which is what a still-
moving catalog looks like. **G1 is the signal that it has stopped**: a blind
regeneration that needs no new capability is the evidence that the surface is
stable enough to map a stack against. Mapping before then measures our specs,
not the stacks.

The second reason is harder to undo. A mapping read out of documentation is
armchair work that feels like progress and cannot fail — the same failure mode
that produced six cost obligations against one trajectory obligation, and the
reason catalog gap-filling was pushed behind the runtime in the first place. A
capability counts as *provided* only when someone can point at the API that
provides it, **at which position**, and say what happens when it fails.

##### G3.1 · The matrix, one dated pass

- **Rows**: every AHC capability, **crossed with position** — never capability
  alone. "LangGraph checkpoints" and "a gateway enforces a budget" are both true
  and are true in different places, with different blast radii, and the
  layer×position axes exist precisely to stop that being flattened.
- **Columns**: the six approaches, instantiated by family — the Claude Agent
  SDK and the OpenAI Agents SDK (`framework`), LangChain/LangGraph (`framework`),
  a gateway or proxy (`gateway`), hosted tracing, datasets and evaluation
  (`platform`), open-source evaluation and replay libraries (`open-source`),
  cloud-managed equivalents (`cloud-native`), and **the reference itself**
  (`in-house`, the control).
- **Cells**: provided · partial · absent · *hidden* — the fourth being the one
  that matters, a capability the stack satisfies in a way that removes your
  ability to observe or change it. D-008's hand pass over the Claude Agent SDK
  found three real losses and **five layers it would have hidden**.
- **Where it lives**: `realizations/` in AHC, the only layer where products may
  be named, versioned separately because it will go stale. Never in capability
  text, which stays portable and product-free.
- **The by-product worth having**: for each capability we hand-rolled, whether
  we would buy it in production. The reference hand-rolled deliberately — a
  framework owns L4, L1 and L10, the layers the catalogs exist to expose — and
  saying so plainly is what makes the artifact credible: *we built it to see it;
  here is what you should buy.* Candidates already visible: retry, throttling and
  the circuit breaker; the cassette; cost metering; the span contract; the
  reviewer desk.

##### G3.2 · Rebind the reference and re-run the gates

Take the same AOAS, AHC, Baseline and blueprint, change **only** the binding —
one framework, or a gateway plus hosted evaluation — regenerate, and run G1's
four gates. This is *Free the binding*, promoted out of Later and sequenced:
**after G2**, because G2 varies the domain with the stack held fixed, and
varying two axes at once makes a failure unattributable.

What it tests is not the framework. It is whether the binding spec carries
enough for a generator to bind the same behaviour to different machinery — and
every gate failure classifies as *the binding under-specified this* or *the
stack cannot express it*, which is the first honest evidence for either claim.

##### G3.3 · Publish the delta and the method

The artifact is the method plus one worked column, not a bake-off table: a
comparison dates in a quarter and every vendor disputes it, while a profile an
adopter can re-run against their own stack does not. Ships with the failures in
it, like everything else here.

### S4 · AgentTwin

#### T-039 · AgentTwin adopts LangWatch Scenario for the simulated user

**Status** Not started. Decided 2026-09-16. **S4 · AgentTwin.** Repo: `agenttwin`.

**What.** The simulated customer comes from LangWatch Scenario instead of
AgentTwin's own actor code. `PRODUCTION-STACK.md` L12 names it for exactly this.

**The delta that stays AgentTwin's.** The world, the perturbations and the
world-diff oracle, because *none of them owns your data*. None of the adopted
tools can put an order into "delivered 31 days ago", inject a stale read mid-run,
or diff the world before and after.

**Done when.** The 34 scenarios drive the support agent through the adopted
simulated user, and pass.

#### T-040 · AgentTwin adopts DeepEval or Inspect for graders

**Status** Not started. Decided 2026-09-16. Needs AAC Phase 3. **S4 · AgentTwin.**

**What.** Output grading moves to an adopted evaluator. Choosing between DeepEval
and Inspect is this item's first decision, and it goes in the register with its
reason. AAC Phase 3 ships the adapter that turns their results into an AAC
coverage report, so the two land together. The inline grader in G0.11's remainder
(AHC-0028) uses the same choice.

**The delta that stays ours.** The oracles that read the world: truth, omission,
effects.

#### T-041 · Actors and perturbations move into the world file

**Status** Not started. Recorded in `agenttwin/SPEC.md` under *Not yet in the
format*. **S4 · AgentTwin.**

Actors and perturbations are declared in code (`actor.py`, `perturbation.py`),
not in the world file, so a new agent's scenarios cannot declare them. That is
step 5 of every cycle, which makes this a blocker for T-044 in practice. The
model provider is also an external system a world cannot yet perturb.

#### T-054 · The order system as its own MCP service

**Status** Not started. Raised 2026-09-19. **Tier 1a.** Repo: `reference-agent`.

**Why.** The store's MCP server (`src/order_system/server.py`) and the agent's
MCP client meet in one Python process, through the SDK's in-memory transport. The
checks are already written as if the two were apart — the store verifies a token
addressed to it and trusts nothing the caller asserts — but a far end that runs
inside the caller is not one. `AGENT_MCP_BASE_URL` exists in the config and
nothing serves it.

**What.**

1. Serve `order_system.server` with the SDK's **streamable HTTP** transport as a
   compose service in the `store` profile, with its own Saleor credentials; the
   agent and the approvals worker `connect()` to its URL.
2. Where we deviate from the MCP specification, meet it:
   - **Tool annotations.** Declare `readOnlyHint`, `destructiveHint` and
     `idempotentHint` — the specification's own words for what `side_effect`
     says — so a client that is not ours reads the same thing. Keep
     `side_effect`, which says more (reversible vs irreversible).
   - **`_meta` keys.** Tool-level `side_effect` and `required_scope` carry no
     prefix; give them one, as the request-level `aoas/…` keys already have.
   - **Authorization.** The specification authorises the *connection* with OAuth
     2.1 at the HTTP layer. Authorise the agent's connection that way (its own
     client credential); the customer's delegated token stays per call in
     `_meta`, because one connection serves many customers and the store must
     know whose each call is.
3. The live tests and shadow mode run against the service, not the object.

**Done when** the agent reaches the store only over HTTP, `tests/test_store_live.py`
and shadow mode pass that way, and an MCP client that is not ours (the SDK's
inspector) lists the tools with correct annotations.

#### T-042 · Shadow mode

**Status** **Done 2026-09-18** (`reference-agent` `d2daaba`). The same scenario
files run against Saleor through the store's own MCP server, with the checks
reading Saleor (`evals/shadow.py`, and the second test in
`tests/test_scenario_files.py`). Each run seeds a private copy of the world
under a namespace, because Saleor cannot delete a completed order. **29 of 33
pass unchanged.** The first run found F-043 and F-044, both fixed. The four that
cannot run yet are **T-051**. `fidelity.verified_against` can now name Saleor
for everything but those four. **S4 · AgentTwin.**

A real store beside the projected one, both answering, with the difference
recorded. Until it exists, `fidelity.verified_against` is `null` in every world,
which is the honest value. `ResolutionMode` already declares `shadow`. T-017 has
the argument.

#### T-023 · Time does not pass within a turn

**Status** Not started. Recorded in `agenttwin/SPEC.md` under *Not yet in the
format*. **S4 · AgentTwin.** Repo: `agenttwin`.

**What.** A perturbation that advances the clock on a named call. `step_seconds`
and `step_days` move time only between turns, so a property that depends on the
gap between two model calls cannot be reached from a scenario. The reference
agent's freshness window (AHC-0107) is how this was found.

**Not `slow`.** `slow` delays a call. This ages what the run already believes.

---

## Later

Deliberately after G2; each depends on something the goals will teach.

**Moved out on 16 September:** the third shape is now the roster; actors and perturbations are T-041; shadow mode is T-042; the compliance crosswalks are AAC Phase 1. **Dropped:** publishing the convergence curve, which belonged to the blind experiment.

- **A world discovered from a real data estate.** Both worlds here were written
  by hand, and both domains were invented. An adopter's is neither: the schema
  exists, the data exists, and a catalogue has usually already profiled it —
  tables, primary and foreign keys, column cardinalities, null rates, value
  distributions. **Discovery is the cheapest path from a real system to a
  world**, and it is the adoption story the format otherwise lacks: point it at
  the estate, get a draft AOAS and AWD to argue with.

  | Discovered | Becomes |
  |---|---|
  | a table and its primary key | an entity and its `key` |
  | a foreign key, declared or inferred | a `ref:` — the join stated once, which `World.ontology()` already expects |
  | a low-cardinality column and its observed values | an `enum` with `values`, or a state machine's states |
  | observed transitions between states, in order | candidate `transitions`, which is the hardest part of a spec to write from cold |
  | ranges, null rates, distributions | seeding hints, and a shorter `fidelity.not_faithful_about` |
  | functional dependencies between columns | **candidate invariants** |

  **The trap, and the whole design turns on it: profiling says what *is*, and a
  specification says what must be *true*.** Real data carries defects, legacy
  rows, half-finished migrations and states nobody meant to allow. Derive
  invariants from it naively and you encode today's bugs as tomorrow's rules —
  and the world will then refuse to simulate the very situation the agent needs
  to handle. So: **discovery proposes, a reviewer disposes.** Every derived
  statement arrives as a draft carrying its provenance — *observed in 41,882
  rows, 99.7% conformance, 129 exceptions* — because a reviewer can tell a rule
  from a coincidence only when the exceptions are countable. The AOAS already
  has `sources`, declared *informative — provenance, not specification*, which
  is exactly the right shape for it.

  **What to reuse.** The discovery and profiling half is a solved problem with
  mature tools; the mapping into a declared world, and the ratification step,
  are ours. See [[ontology-kg-project]] — same estate, same catalogues, and the
  KG work and this are two readings of one graph.

  **Why it waits.** It needs a real estate to be developed against, and building
  it from an imagined one is the armchair failure this queue already names. The
  first honest target is an existing system with real tables and a real
  catalogue — and if that system is read-only and advisory, it collides usefully
  with the next item, which would then be one experiment rather than two.

- **A third shape** — read-only advisory or fully autonomous — to see whether
  convergence cycles fall. **Collides usefully with world discovery above**: a
  read-only advisory agent over an existing estate is one experiment answering
  both questions, where doing them apart is two. Not merged here, because which
  estate decides it and that is not a decision this file should make.
- **The cross-reference check** for the dependency invariant — when the first
  violation appears, not before (charter §4).
- **Actors and perturbations** into the AWD format; **shadow mode** built, so a
  world's fidelity is verified rather than asserted.
- **The catalog gap register** — [GAPS.md](GAPS.md): forty-odd AHC and AAC gaps
  from five audits, each an agentic delta. Filled in pairs, from running code
  where it exists, as agents hit them. G0.6 and G2.4 draw from it; the rest wait
  there, owned and dated.
- **Compliance crosswalks** in AAC — ISO/IEC 42001, NIST AI RMF, EU AI Act.
  Only OWASP LLM exists today, so the governance Concern View cannot yet reach
  organisational governance. Not needed to generate an agent; needed to sell
  the audit.
- **Publish** — the convergence curve, the gap-type distribution, and what the
  generator contributed versus what the specification did.

---

## Dropped 2026-09-16

The blind regeneration experiment, and the items that existed only to make its result readable. Generating agents from the specs was kept: it is step 4 of every cycle. T-004 was dropped here and revived the same day as the Claude family stack.

### G1 · Regenerate the support agent into a separate folder, from the specs alone

The reference is kept — it is the comparison — and is never read while
generating. Keeping it on the same machine makes blindness something to
enforce, not assume.

#### G1.1 · Pre-register

Before the first generation, written down and committed:

- the four gates and their thresholds;
- **the blind protocol** — the generation folder holds only the manifest's
  bundle, and sits **outside the home directory** (e.g. under `/Users/Shared`),
  so no parent `CLAUDE.md` and no project memory that describes the reference
  is loaded; the session's settings **deny reads** of the reference, AgentTwin's
  worlds and the strategy repository; **the Generation Brief** — assembled, not
  written, and fixed for the cycle. A remote session
  that holds only the bundle is the stronger version of the same thing. A
  generator that can read the reference, or whose instructions describe it, is
  not blind;
- the generator pinned — model, version, settings — and **N = 3** runs per spec
  version, because one run says nothing about a stochastic generator;
- the gap classes, from the routing rule: AAC · AHC · AOAS · AWD · binding ·
  Baseline · blueprint · **generator** — the last for failures a second
  generator does not reproduce.

#### G1.2 · Package the oracle

One command: an implementation behind the agent contract in, the four gates out.

#### G1.3 · Cycle 0, then cycles until convergence

Generate N times; run the gates; **classify every divergence the moment it is
found**, fix it in the spec the routing rule names, and regenerate. Record the
number of cycles and the distribution of gap types. That curve, and that
distribution, are the result.

### T-008 · The regeneration claim has never been run

**Status** Not started. Raised 2026-09-16. **The point of the whole family.**

**What is missing.** An experiment. The claim the spec family exists to support
is that the catalogs plus the agent specification are sufficient to *produce* an
agent — hand them to a generator in an empty folder and get similar code back.
Nothing has ever tested that. Not once, not partially.

**What is tested is the opposite direction.** 487 tests, AHC 50/72, AAC 44/52,
AOAS 50/55 — every one of them asks *does this code satisfy the specification*.
None asks *is the specification sufficient to produce this code*. A suite can be
perfect at the first and say nothing about the second, and ours is.

**The seven known weak points.** `harness-profile.yaml`'s `x_untested` lists the
capabilities believed met with no test naming them — AHC-0002, 0004, 0006, 0010,
0020, 0026, 0036. The architecture review already states what they are for: *the
best available prediction of where G1's first regeneration will disappoint,
because nothing would notice if one quietly went missing.* Closing those is worth
doing **before** the experiment, not after, or the first run produces a result
nobody can interpret.

**Where it would land.** A second directory, the specs, and a generator, with
three things fixed in advance so the result means something:

*What counts as "similar".* Not a diff. The scenarios are implementation-
independent by construction — `Subject` is three callables — so the honest
measure is **does the regenerated agent pass the same 34 scenarios and discharge
the same statements**. Structural similarity is a second, weaker question.

*The binding is part of the experiment.* `evals/simulation.py` is this agent's
binding to the scenario contract. A regeneration must supply its own, and
whether a fresh generation produces something a binding can attach to at all is
itself a finding — arguably the first one.

*What a failure teaches.* A capability the regeneration misses is a capability
the catalog states badly, not a bad generation. That is the output worth having,
and the reason to run it before the catalogs are declared finished rather than
after.

**One repo, and a second implementation is a second repo.** If this is ever run
against LangGraph or the Claude Agent SDK rather than an empty folder, each is
its own repository citing `scenarios/` by relative path — the way
`worlds/clothing.yaml` already cites the AOAS across repos. Not a `harness:`
config flag in this one: a flag means shared code, and shared code means "both
pass the scenarios" proves the shared layer works rather than proving the specs
do. Nothing to move today; the citation pattern already exists.

**And the result has to be read against a circularity.** The AOAS declares its
own `sources`, and two of the three are this repository — `worlds/clothing.yaml`
and `src/support_agent/{router,policy,approvals,escalation,identity,config}`.
Part of the specification was written *from* the code it would be regenerating.
So a close match is ambiguous by construction: it may mean the spec is
sufficient, or it may mean the spec was read off that exact structure. This is
not a reason to skip the experiment — it is a reason to say it out loud before
running, rather than discovering it while interpreting the result.

Two things reduce it. The **scenarios** and the **golden set** are the parts a
regeneration is honestly judged by, and neither was derived from module
structure: the golden cases are generated from declared conditions, and the
scenarios assert over a world. The parts most likely to be contaminated are the
structural ones — which is the second reason similarity is defined as passing
the scenarios rather than as a diff.

**What the spec does not constrain at all**, and is worth predicting before the
run so the prediction can be wrong: nothing declares the typed `TurnResult`
union, the conversation-as-one-blob, the five policy positions, the split of
`escalation` into wording/capacity/store/workflow, or gates running before
routing. Those came from the ratchets and the import contract in
`pyproject.toml` — which live here and not in any specification. A regeneration
in an empty folder gets none of that pressure, and if the goal is that it
should, the ratchets are a spec artifact nobody has written down.

### T-010 · The constraints that produced this shape are in no specification

**Status** Not started. Raised 2026-09-16. **Blocks T-008 being interpretable.**

**What is missing.** A fourth artifact, beside AAC, AHC and AgentTwin, stating
what **shape** the code must take. The family currently says what must be TRUE,
what must EXIST and what must be FACED. It says nothing about structure — and
structure is what a regeneration would visibly differ on.

**It cannot be part of AHC, and the reason is AHC's own value.** That catalog is
stack-agnostic on purpose: the same capabilities are meant to hold whether the
harness is LangGraph, an SDK, or a hand-rolled loop. These constraints are
stack-bound. "Modules under 416 lines" means nothing to a graph; "arrows point
down only" is an import-linter concept; "only the composition root constructs a
realisation" presumes composition roots. Folding them in would smuggle one
language's opinions into a catalog that claims to transcend them, and the cost
would be paid by every reader who does not use Python. It belongs beside the
**binding** — the other stack-bound artifact — rather than inside a catalog.

**This is extraction, not design.** All of it exists, is enforced, and is green:

*The import contract* (`pyproject.toml`) — `Arrows point down` as layers with
`exhaustive = true`, so a new module cannot be added without being placed. Four
forbidden-module contracts, each failing closed with exactly one exception: only
`llm` sees a provider SDK, only `tools` speaks MCP, only `state` and
`idempotency` see psycopg, and the agent cannot see its simulator.

*The ratchets* (`tests/test_build_checks.py`) — one-way ceilings set at the worst
offender the day they were measured: complexity 14 → 8, statements 50 → 24,
branches 12 → 7, longest module 744 → 416, `type: ignore` at 2.

*The structural tests* — only the composition root constructs a realisation;
every collaborator the root takes is an interface; every failure declares its
kind; every counter declared is incremented somewhere.

*`mypy --strict`* with `exhaustive-match`, so a new route or result kind fails
the build rather than falling through the last branch.

**Why it matters, and it is the reason to do it before T-008.** The architecture
review records that the ratchets *"forced five extractions in the last two days,
each of which turned out to be a job with a name."* The module structure was not
designed — it was produced by the ceilings. So the testable claim is: a
regeneration handed the ceilings arrives at a similar structure, and one handed
only AHC does not. Without this artifact, T-008 can only report that the shapes
differ; with it, T-008 can ask whether the constraints are what carries shape.

**Open questions**, deliberately not answered here: what it is called; whether
the numbers travel (416 is this codebase's history, not a law) or only the
*mechanism* of a one-way ratchet does; and whether a TypeScript sibling would
share anything but the mechanism. The last is the test of whether this is one
artifact with bindings or a family of them.

### T-014 · Delete a capability and see whether anything notices

**Status** Not started. Raised 2026-09-16. **An afternoon.**

**What is missing.** Evidence that the seven `x_untested` capabilities are *real*
rather than believed. T-009 adds tags to the tests that already prove them; this
asks the prior question — is there anything to tag?

**The exercise.** Take one of AHC-0002, 0004, 0006, 0010, 0020, 0026, 0036.
Remove the code that implements it. Run everything. If nothing fails, that
capability is not exercised here, and the profile's `x_untested` entry is
optimistic rather than merely untagged.

It is mutation testing pointed at the **specification** instead of the code, and
the instrument already exists: `scripts/scenario_kill_matrix.py` does exactly this
for branches. Doing it for capabilities is the same technique one level up.

**Why it matters more than it looks.** The architecture review calls these seven
*the best available prediction of where a regeneration will disappoint, because
nothing would notice if one quietly went missing.* That sentence contains a
testable claim and nobody has tested it.

### T-015 · Ask a fresh model to describe the structure from the specs alone

**Status** **Dropped 2026-09-16**, with the blind experiment it served. It had run, blind
and N=3, pre-registered in `reference-agent/evals/t015/PREREGISTRATION.md`; the three
answers are in `/Users/Shared/t015-blind/run-{1,2,3}/answer.md`, unscored.

**What is missing.** Any evidence at all about whether the specs carry structure.
T-008 answers it expensively by generating a whole agent. This answers a weaker
version for nothing.

**The exercise.** Hand the AOAS, AHC and AAC to a model with no access to this
repository and ask it to **describe** — not generate — the module structure it
would build. Then compare with `entrypoint / loop / policy / context / state /
approvals / escalation`.

**How to read it.** A close answer weakens T-010's argument and is worth knowing.
A distant answer confirms the structural gap for the price of one prompt, and
does so *before* T-008 spends real effort discovering it.

**One caution.** A model that has read this repository during training, or that
recognises the shape from public patterns, gives a false positive. Run it on the
specs alone, in a clean context, and treat a suspiciously exact answer as
evidence of contamination rather than of sufficiency — the same caution T-008
carries about the AOAS citing this repo among its sources.

---

## Done

The record, kept because a finding that looks as if it was fixed from the start teaches nobody anything.

### Before the goals

- **1.1 · The support agent's AOAS** — extracted from the reference, with the
  record of what did not route ([drafts/examples/](drafts/examples/)). E1–E9,
  four new nonconformances.
- **1.2 · AOAS schema and validator** — `npm test`: 22 rules, 60 table-driven
  tests. Format: the shared condition vocabulary plus `equals_session`.
- **1.3 · The AWD format** — a world cites the AOAS and cannot declare the
  domain (`agenttwin/SPEC.md`); electronics is a 70-line RFC 7386 variant;
  reference suite 657 → 657.
- **Review findings recorded** — F-018–F-021 and R-018/R-019 in `reference-agent`.

### The critical path as it stood on 13 September

**23 numbered items, 5 done.** Five were added on 12 September in one sitting,
each defensible on its own, which is how a queue stops being a plan. Two rules,
then, stated here rather than discovered later:

**What blocks the first evidence.** G1 is the first thing here that can fail —
everything before it is craft work that always succeeds, which is precisely the
failure mode this project already wrote down. The path to it is four items, in
this order:

| | Why it blocks |
|---|---|
| **G0.7** | a generator reads the blueprint for structure; without it the third gate is judged by eye |
| **G0.9** | the binding and the manifest are *what is handed over*; a generation with no pinned inputs is not reproducible |
| **G0.8** | the behaviour gate needs a drivable scenario suite, and it is the item most likely to find something |
| **G1.2** | the gates, packaged as one command |

**What does not block it**, and their minimum slices:

| | Minimum slice, if the full item waits |
|---|---|
| **G0.2** | `concern` on AOAS items only, so the Concern View has one source and proves it generates |
| **G0.10** | ~~the classification and the predicted ratio~~ ✅ 2026-09-12 · ~~the seam map~~ ✅ 2026-09-13 — twelve seams, nine held by three patterns (versioned rule set, protocol with a null object, projection from the specification) and the rest a value in the composition root. Nothing held by inheritance, nothing by a plugin system. ~~the library/regeneration/hybrid choice~~ ✅ 2026-09-13 — **hybrid**, decided below |
| **G0.11** | ~~fix F-027~~ ✅ 2026-09-12 · ~~counters~~ ✅ 2026-09-13 — seven series on the numbers this agent is judged on, labels bounded by construction, and a build check that a declared counter is incremented somewhere: a flat line reads as *this never happens* rather than *nobody is counting*. Still owed: the grader and the dataset path, which G0.8 has now unblocked |
| **G3** | nothing — it is correctly last, and its `in-house` column is collected free inside G0.9 |

**G0 comes first because it produces what G1 and G2 consume.** A god object
regenerated faithfully is not a success, and a spec extracted from code nobody
trusts is not a spec.

### G0.1 · Tag every test with the statements it discharges

- **What.** Extend the reference's `discharges` marker — today 92 tests, AAC ids
  only — to AHC ids and the agent's own AOAS ids (`P-CANCEL`, `R-STYLE`,
  `Q-COST`, operation names). Generate the **Assurance Map** from the markers.
- **Why.** It is doc 25's method, reused: write the cases, tag each with what it
  discharges, and **the unmapped remainder is the gap.** A test tagged with no
  spec statement is a feature no spec requires — exactly what G1 would lose. A
  statement no test tags is a spec nothing verifies.
- **Done when.** The map is generated, never hand-written, and lists both
  remainders. They become the work list for G0.6.
- **Status.** ✅ Done 2026-09-11. `discharges` takes AAC, AHC, Baseline and
  AOAS ids; an unknown id fails collection; `pytest --assurance-map` writes the
  map. Tagged **91 → 195 of 400** test functions; untagged 305 → 126; 66 tooling;
  13 **unwired** (tests of retry, throttle and breaker code the agent never
  calls — F-022). Exercised: AOAS 24/33, AHC 29/60, Baseline 4/12, AAC 41/49 —
  AAC fell because 23 wrong ids were removed. The untagged remainder, with a
  proposed statement for each, is in `reference-agent/evals/tagging/` and is
  G0.6's work list. Headlines: authentication and deterministic routing have no
  spec; escalation and approval rules have no citable ids; two spec conflicts
  (cancel authority vs AHC-0057; wait estimates vs the AOAS). F-022–F-026.

### G0.2 · One tag scheme across all six specs

- **What.** Two axes shared by every spec. Anything more has to earn its place
  the way a principle does, by driving a generated view or a check.

  | Axis | Values, cited not invented | Authored or derived | Drives |
  |---|---|---|---|
  | **`phase`** | ISO/IEC/IEEE 12207 technical processes: requirements · architecture · design · implementation · verification · operation | **Derived** from where a statement sits: AOAS → requirements; AHC requirement and position → architecture; AHC design decisions and the blueprint → design; the binding → implementation; AAC obligations and AWD scenarios → verification, with AAC's stage placing S5–S6 in operation. Never tagged per item | the generation brief, assembled phase by phase: requirements, then architecture, design and verification, the order a builder works in |
  | **`concern`** | ISO/IEC 25010:2023's nine quality characteristics, plus **`cost`** as the one agentic addition | **Authored** on every statement: AAC obligation, AHC capability, AOAS item, AWD scenario | the **Concern View**: everything about privacy, cost or reliability across all six specs on one generated page. An NFR is a statement whose concern is not functional suitability, so this *is* the NFR view |

- **Why derived for phase.** The family's artifact split already is the phase
  split, because each artifact answers a different kind of question with a
  different verification method. Tagging phase per item would restate the file
  a statement lives in, and a restatement drifts.
- **Revising what exists.**
  - AAC's eighteen home-grown `dimension` values become **facets under a
    concern**, through a crosswalk (e.g. `privacy` → security · confidentiality;
    `latency` → performance efficiency; `grounding`, `trajectory`, `tool-use` →
    functional suitability; `observability` → maintainability · analysability;
    `cost` → cost).
  - AAC's `stages` gain their derived 12207 process.
  - AHC gains `concern`.
  - Layers, positions and archetypes stay as they are. They are structural
    axes, not phase or concern.
- **Where.** The rule goes into the Spec Charter as a new section on tags; the
  crosswalk goes into AAC's taxonomy; the linters enforce presence and vocabulary.
- **Done when.** Every statement in all six specs has a concern, every phase is
  derivable, and the Concern View and Assurance Map are generated from the tags.
- **Status.** ✅ Done 2026-09-13. The charter gained §3 (the two tags) and
  everything else renumbered. `concern` is **authored** on 105 AHC capabilities
  and on every AOAS policy, refusal and bound; **derived** for AAC through a
  crosswalk from its eighteen dimensions, and for the AOAS's four families of
  derived id — an irreversible operation is safety, an escalation rule is
  oversight, a fact exists so a decision can be explained, an external contract
  is the one place this family reaches compatibility honestly. AAC's stages
  gained their 12207 process. Three linters check it: the crosswalk must be
  total, a facet must belong to its concern, and a concern nothing reaches must
  be recorded with the reason.

  **The Concern View generates** — 179 statements across all ten concerns — and
  three of its rows are the finding. *Performance efficiency*: one AOAS bound,
  six capabilities, and **no assurance obligation at all**; nothing verifies
  latency. *Compatibility*: three statements, all external contracts, nothing
  built or checked. *Interaction capability*: one statement in the whole family,
  about not handing somebody a third reference number. Each was invisible before
  the page and obvious on it.

### G0.3 · The three build-time checks, strict types first

- **What.** A type checker in strict mode, in the lint run and the suite. The
  seven existing protocols as parameter types instead of `object` +
  `type: ignore` (nineteen today); `assert_never` on every match over a typed
  union; a `DeliveryLog` protocol. Then size and complexity ceilings.
- **Why.** Catch at build time what today is caught only if a test happens to
  run it. After this, every later step is checked the moment it lands.
- **The rule it follows.** A design principle enters the spec only as a
  deterministic check; everything else is a citation — ISO/IEC 25010:2023
  *maintainability*, with SOLID and clean-code practice as its reading. Three
  checks, not a list:

  | Check | Catches, before anything runs |
  |---|---|
  | **Strict static typing** | a component that does not satisfy its interface; the wrong implementation wired; a new result or route kind nobody handles |
  | **The import contract** — layered, exhaustive; only the composition root imports realisations | coupling, a dependency pointing the wrong way, a change whose blast radius crosses a layer |
  | **Size and complexity ceilings** | the god object, before it is 481 lines |

  Readability and naming stay review, and say so.
- **Status.** ✅ Done 2026-09-12. In `reference-agent`: mypy strict (plus
  exhaustive matches and ignore-with-code) passes on the whole package; the
  checks run inside `pytest` (`tests/test_build_checks.py`), verified by
  planting a type error. Collaborators typed `object` now carry their protocols;
  a `DeliveryLog` protocol is new; `type: ignore` 19 → 2, both at the vendor SDK
  boundary. Both matches over a typed union end in `assert_never`. Ceilings as a
  ratchet at today's worst — complexity 14, statements 50, branches 12, module
  744 lines — for G0.4 to lower. **Not yet enforceable:** "only the composition
  root constructs a realisation", because `serve.build` and
  `scripts/run_server.py` still wire; it becomes an import contract at G0.4
  step 8.

### G0.4 · Decompose the entrypoint

The `Agent` class is 481 lines doing eleven things; `handle` itself is 23.

1. Move the pure helpers to their layers (`_bind` → `contracts`, `_facts` →
   `escalation.rules`, `_note`/`_record` → `state`, `_refusal_text` → `router`),
   re-exported so tests importing them still pass.
2. `TurnPersister` — bound, checkpoint, record.
3. `HandoffDesk` behind a `Handoff` protocol; a null desk replaces three
   `is None` branches.
4. `ApprovalResumer` behind a `PendingWork` protocol.
5. A `DirectHandler` registry keyed by the router's handler name.
6. A `RouteDispatcher` — route kind → handler.
7. `_turn` to ~30 lines: gates → route → dispatch → Tier 2 → **enforce** →
   record → persist.
8. `build` owns all wiring, including the meter and policy rules it cannot
   accept today; `scripts/run_server.py` and `serve.build` stop wiring.

Each extracted collaborator either maps to an AHC capability or is a gap for
G0.6 — the entrypoint's version of "a layer with no module is a finding".

**Status — the entrypoint: ✅ done 2026-09-12**, eight commits, suite green and
strict types clean after each (683 → 689 tests). `Agent` went from 481 lines
doing eleven things to an orchestrator whose `_turn` reads as its sequence;
the module from 744 to 305 lines, with four collaborators beside it — each one
job, each behind a protocol, each with a null object where the old code
branched on `None`:

| Collaborator | One job | AHC it realises |
|---|---|---|
| `TurnPersister` | bound, checkpoint, hand back what was stored | AHC-0044, AHC-0067 |
| `HandoffDesk` / `NoDesk` (`Handoff`) | hold, lapse, Tier 1 and Tier 2 raises, reply wording | AHC-0070 — and the escalation gaps in GAPS.md §1 |
| `ApprovalFlow` / `NoApprovals` (`PendingWork`) | offer the request tool, resume a decision | AHC-0057 |
| `direct.HANDLERS` | deterministic answers by the router's handler name | **none** — deterministic-first is a catalog gap |

Also: pure helpers moved to the layers that own their data; serve now takes
the agent's own stores and refuses a different one at startup (it could have
worked a different escalation queue from the agent's); F-018 is visible in the
registry instead of hidden; the module-size ratchet fell 744 → 449. Deviation
from the plan, kept deliberately: the four-way dispatch stayed a method, not a
`RouteDispatcher` class — a class around one exhaustive `match` adds a hop and
removes nothing. **Next here: the other oversized units** — `loop.run` first.

**Then the other oversized units**, measured in code lines excluding docstrings,
in this order:

| Unit | Size | What it mixes |
|---|---|---|
| `loop.run` | 151-line function | step execution, tool dispatch, budget checks, termination, and refund-specific approval handling — the loop imports `RefundRequested`, so a second approvable action edits the loop |
| `MCPToolClient` | 126-line class | listing, binding, the idempotency ledger, transport, error mapping; F-017 lives in the seam between guard and transport |
| `serve.build`, `reviewer.build` | 85 + 57, 92 | routes plus their own wiring, which belongs to the composition root |
| `approvals`, `escalation` | 330, 357 lines | pure rule, store, workflow and reply wording in one module each |
| `telemetry` | 449 lines | attribute names, span-shape validator, redaction, provider setup |
| `cassette` | 344 lines | fingerprint, file I/O, recorder, player — test infrastructure, last |

`policy` is cohesive and stays. The size ceilings of G0.3 start as a
**ratchet** — today's worst value, lowered after each step — so they block
growth from day one without blocking the refactor.

- **Status.** ✅ Done 2026-09-12 (both halves; detail below).

**Status — the other units: ✅ done 2026-09-12.** Every step green (690 tests,
strict types, import contract, span contract).

| Unit | Became |
|---|---|
| `loop.run` | a driver over `_Run`, one phase per method; the loop now catches a generic `contracts.ApprovalRequested` and no longer knows refunds exist |
| `MCPToolClient` | `MCPTransport` (the only MCP speaker) + `GatedTools` (the four P5 checks over any transport) |
| `serve.build`, `reviewer.build` | wiring only — handlers are module functions, desk state on `app.state` |
| `approvals`, `escalation` | packages: policy / store / workflow / refund, and wording / capacity / store / workflow |
| `telemetry` | names, redaction and the span contract split out; the runtime stays, because moving its globals would silently disable the span check |
| `cassette` | **kept whole** — its classes change together for one reason, the replay format |

**Ceilings, before → after:** complexity 14 → 8, statements 50 → 24,
branches 12 → 7, module 744 → 416 lines. **New build check:** only the module
that defines a store, client or transport may construct it — verified by
planting one. **Next: G0.5**, the behaviour-changing fixes, each from its spec
statement.

### G0.5 · Close the findings, spec first

Each as its own commit with its own tagged test, starting from the spec
statement it enforces:

| Finding | Statement it enforces |
|---|---|
| ~~**F-016** any customer can act on any order *(critical)*~~ ✅ 2026-09-12 | AOAS `P-OWNERSHIP` — enforced where the tool executes; the session travels in `_meta` |
| ~~**F-019** cost ceiling unreachable from the entrypoint~~ ✅ 2026-09-12 | AOAS `Q-COST` — a per-task meter from the config |
| ~~**F-020** three reply paths skip the guardrails~~ ✅ 2026-09-12 | AHC-0094 — a `REPLY` position screened where every reply leaves |
| ~~**F-018** refund status answered as order status~~ ✅ 2026-09-12 | AOAS `P-REFUND-STATUS`, declared first |
| ~~**F-014** refund amount ungrounded~~ ✅ 2026-09-12 | AOAS `issue_refund.amount_from: order.total`; `agent_when` gained "returned" — the threshold alone let a planted note ask for a refund of a shipped order |
| ~~**F-017** idempotency key never leaves the process~~ ✅ 2026-09-12 | AOAS external contract — the order system accepts a key, and the stand-in replays a write it has answered |
| ~~**F-021** approval expiry on the wall clock~~ ✅ 2026-09-12 | AHC L9 — no clock outside the injected seam; `now` required, so a missed clock is a type error |
| ~~**F-022** retry, throttle and breaker never called~~ ✅ 2026-09-12 | AHC-0005, AHC-0021, AHC-0024 — `ResilientLLM` at the model choke point |
| ~~**F-023** the tool-result bound misses structured results~~ ✅ 2026-09-12 | AOAS `Q-TOOL-RESULT` — one rendering, measured and sent |
| ~~**F-024** with no escalation store the agent still promises a colleague~~ ✅ 2026-09-12 | AAC-0110 and AOAS `escalate.on_refusal` (new) — it refuses, and `Escalated` now requires a ticket |
| ~~**F-025** the repeated-intent rule cannot fire~~ ✅ 2026-09-12 | AOAS `facts.repeated_intent` now declares `derived`; validator rule `undefined-fact`. The dissatisfied-customer half is a catalog gap (GAPS §7) |
| ~~**F-026** a blocked reply keeps the result type it was~~ ✅ 2026-09-12 | AHC-0017, AHC-0094 — a blocked completion is `Refused`; what the turn did keeps its type |
| ~~**F-027** three of five policy positions declared and never called~~ ✅ 2026-09-12 | AHC-0093, AHC-0094 — every position reached, and the composition root can configure them at all, which it could not |
| ~~**F-028** a block inside the loop returned as a completion~~ ✅ 2026-09-12 | AHC-0017 — F-026 one layer down, found by the test written for F-027 |
| ~~extraction nonconformance — the address never changed~~ ✅ 2026-09-12 | AOAS `change_address` — a projected tool carries the operation's declared inputs; both worlds' `unenforced` lists are empty |
| ~~extraction nonconformance — R-STYLE/R-FRAUD unenforced~~ ✅ 2026-09-12 | AOAS `R-STYLE`, `R-FRAUD` — routed, with the served near-misses in the same table |

Also the reference's own `TODO.md` where it serves G1: T-001 (a session opening
is not expressible) is a missing AOAS operation, not a UI nicety.

- **Status.** ✅ Done 2026-09-12. Every finding closed, each from the statement
  it enforces, each proven by disabling the fix and watching the tests fail.
  **657 → 756 tests.** Exercised: AOAS 32/34, AAC 41/49, AHC 33/60, Baseline
  4/12; 0 unwired. Both worlds' `unenforced` lists are now empty, and that is
  pinned. Five changes went into the specs rather than the code, which is the
  point of doing it this way: `issue_refund.authority` gained "returned" (the
  threshold alone let a planted note ask for a refund of a shipped order),
  `escalate` gained `on_refusal`, every fact gained `derived` with a new
  validator rule behind it, AOAS.md states that a condition list is a
  conjunction, and AgentTwin's projection carries an operation's declared
  inputs. **Two decisions still want an answer** — cancel authority (the AOAS
  lets the agent cancel alone; AHC-0057 asks for approval on anything
  irreversible) and wait estimates (the AOAS says tell them nothing about time;
  the code gives a measured estimate). Both are live in the code as the AOAS has
  them.

### G0.6 · Fill the gaps the support agent actually hits

The catalog-wide gaps found by five audits live in **[GAPS.md](GAPS.md)** — a
register, not a queue. G0.6 takes from it only what G0.1's Assurance Map shows
this agent hits, plus what G0.1–G0.5 expose directly. Every missing feature is
one of three kinds:

| Kind | How it is completed |
|---|---|
| **In the code, missing from the spec** — circuit breaker, orphan-safe trimming, the deterministic router, escalation lapse and caps, mandatory result schema | **Reverse-engineer**: capability + obligations, tag the existing test. Without this, regeneration loses them |
| **Missing from both** — freshness of facts before irreversible actions, the structured facts record, summary provenance, one error taxonomy | **Spec first**: capability and obligation, then build, tagged tests, then scenarios |
| **Specified, broken in the code** — F-014, F-016–F-028 | G0.5, and G0.11's first slice |

For the support agent the context work runs in the order its own design doc
set: freshness (register 16), the facts record (19), a deduplicator over
repeated tool calls, then the soft threshold with anchored, exchange-safe
compaction (17, 18) — after measuring, because short support conversations may
never reach it. What it does not need (it does not stream, has no cross-session
memory, no cache) enters its AOAS as exclusions.

Also here: the charter's pre-1.0 pinning clause (E8), and AHC-0042 discharging
AAC-0109.

- **Status.** ✅ **Done** — the statement half 2026-09-12, the build half
  2026-09-13. All four:

  | Feature | What landed |
  |---|---|
  | **Freshness** (gap 16) | AHC-0107, AAC-0113, `fresh_for` on an AOAS field. A stale belief is read again *before* an irreversible action, and the step is abandoned only where the re-read **disagrees** — the first version abandoned whenever a belief was old, and a model slower than the window made every belief old, so the action was held forever. Its own test found the livelock |
  | **Facts record** (gap 19) | AHC-0108. Written from what the far system confirmed, never from what the model said; bounded by kind so there is no oldest entry to drop; and the escalation handoff is assembled from it rather than summarised from the transcript |
  | **Summary provenance** (gap 18) | AHC-0109. No code: this agent drops whole exchanges rather than summarising, which is the reduction with no laundering surface. Recorded as an accepted gap and an answered decision rather than left for a reader to work out |
  | **Error taxonomy** | AHC-0110. Five kinds on the axis of *what a caller can do*. The build-time check found seven failures I had missed by hand, and three that are control flow spelled as exceptions, now exempt with the reason |
  **Every test now names a statement or declares why it cannot: untagged 126 →
  0.** Two tests assert a *gap* and say so through a new `documents_gap` marker,
  which lists them with their reason rather than counting them as oversights.
  Exercised: AOAS 50/55, AAC 42/50, AHC 44/67, Baseline 6/12 — the AOAS
  denominator grew from 33 to 55 as prose became statements.

  Seven capabilities and one obligation were written, each because a test here
  verified something no specification required:

  | New | States |
  |---|---|
  | **AAC-0111** | a request acts only as the identity its credential proves |
  | **AHC-0099** | that identity comes from a credential the caller cannot author |
  | **AHC-0100** | a request the specification can answer without the model is answered without it |
  | **AHC-0101** | spend is computed from a declared price table; an unpriced call is an error |
  | **AHC-0102** | state is written whole, and every substrate declares whether it survives the process |
  | **AHC-0103** | reduction never separates a call from its result |
  | **AHC-0104** | what may run concurrently is declared by class, not decided by convenience |
  | **AHC-0105** | a recording replays only against the request that produced it, and a miss fails the run |

  In the AOAS: the approval and escalation rules became id'd statements carrying
  their own parameters (thirteen of them), `P-DIRECT` and `P-DIRECT-READS` state
  which requests skip the model and that the path never writes, and the
  idempotency key against the domain identity is settled — different questions,
  both answered, each with a test.

### G0.7 · Tell the generator the shape

- **Baseline** — one profile item: every harness port is an interface, and only
  the composition root constructs a realisation. The binding swap, the world
  swap and regeneration all stand on it.
- **The A6 blueprint** in AHC — the module map, ports and single wiring point,
  **extracted from the decomposed reference**, not designed beside it.
- **The pattern library** — informative like realisations, each pattern citing
  the capabilities it discharges: *no pattern without a capability*. Blueprints
  reference patterns; capabilities never do. Three families to start:
  - **Orchestration** — router ahead of the loop, ReAct loop, saga with
    compensation, outbox, supervisor–worker.
  - **Reasoning** — direct, planner → executor, tree of thoughts, reflection,
    reviewer, debate, consensus, supervisor; each with its best use and the
    components it cannot run safely without.
  - **Context** — the reference's seven handlers (bounder, deduplicator,
    offloader, trimmer, structurer, compactor, selector) and its *which handler,
    given what signal* table, lifted out of `docs/CONTEXT-BUDGET.html`, where a
    regenerated agent would never find them.
  - **Software** — the seams the reference already uses to hold variation:
    registry, versioned rule set, protocol with a null object, method object,
    decorator, template rendering, projection from the specification. The
    agentic families answer *how the loop is shaped*; this one answers *where
    two agents differ*, which is G0.10's question, so the two exercises share a
    pass.
- **The selection rule, and its three homes** (charter §2, *Patterns are not
  statements*). A pattern is informative and **never adds an obligation** — if
  adopting one makes something newly required, that requirement is a capability
  and belongs in a catalog. Which pattern this agent uses is then answered in
  three places, largest first:
  - **Derived** — the **Pattern View**, generated: the AOAS statement that
    *forces* each pattern. `P-DIRECT` forces a deterministic route ahead of the
    loop; `authority: human_approval` forces a gate that returns rather than
    blocks; an irreversible operation with a declared compensation forces a
    saga; `owed_when` forces an omission check. Most of this agent's patterns
    are in this class, which is the finding worth publishing: **the patterns
    were not chosen, they were entailed.**
  - **Per shape** — the blueprint names what an A6 normally uses.
  - **Decided** — the genuine trade-offs with no statement behind them
    (reflection against a reviewer; one loop against supervisor and workers) go
    in the profile's `decisions` block with their `source`, under the rule
    PROFILE.md already states: *a default is permitted, a silent default is not.*
- **Done when** every pattern in the library cites at least one capability, the
  Pattern View generates from the AOAS, and the Build Manifest pins the library
  and blueprint versions a generation read — a pattern discoverable only by
  reading the implementation is a finding, not a decision.

- **Status.** ✅ Done 2026-09-12, except the generated half of the blueprint.
  The **Baseline** gained B13 (*every dependency the system does not own is an
  interface, and only the composition root constructs a realisation*), checked
  in the reference's build in two halves — the second caught a substring bug in
  its own checker first. The **A6 blueprint**'s architecture narrative is
  written from the decomposed reference, and its spine is a fact rather than a
  design: *the composition root's signature is the port list*, and everything in
  it is a port, versioned configuration, or a per-unit factory. The **pattern
  library** holds ten entries with both its rules enforced by the linter — no
  pattern without a capability, and a pattern never adds an obligation; the
  method object is deliberately absent, being craft rather than a capability.
  The **Pattern View** generates from the AOAS: **ten patterns entailed, which
  is every pattern this agent uses and none left over**. The test that can fail
  is the other direction and it does — a pattern used here that no statement
  forces is a decision, and the profile is where decisions go.

  ✅ **Complete 2026-09-13.** The generated half is `tools/blueprint.js` →
  `blueprints/A6-owes.generated.md`: 67 capabilities across all 16 layers,
  grouped by layer rather than by identifier, because identifier order is
  chronology and a builder working on the context assembler wants to know what
  L1 owes. `npm test` fails when the file on disk is not what the capabilities
  produce.

### G0.8 · Complete AgentTwin — prove the agent works in simulation

The 657 tests prove the parts. Almost all of them script the model. **What
they do not prove is that the agent, with a real model, handles real
conversations against a world that misbehaves.** AgentTwin is the instrument for
that, and it is not finished.

- **A scenario format in AWD.** ✅ **2026-09-12** — `awd-scenario/v0`: the world
  it cites, the customer it acts as, what the actor says, what the offstage
  reviewer or colleague does, the faults it schedules, and what must be true
  afterwards. Six scenarios run from files. The check vocabulary is closed at six
  kinds and deliberately lopsided — **five read the world, one reads words** —
  because a suite asserting mostly on prose measures an author's taste in
  phrasing and breaks the moment a regeneration words its refusal differently.
  **An unfired fault fails the run**: a scenario whose fault never landed did not
  test what it claimed and passes for the wrong reason.
- **Actors and perturbations into the format.** The customer (scripted,
  state-machine, or model-driven), the approver and the desk colleague; and slow
  systems, stale reads and channel errors — declared, not constructed in Python.
- **The black-box agent contract** ✅ **2026-09-12** — `Subject`: three
  callables, `say` · `reviewer` · `colleague`. The binding builds it, because
  wiring is the binding's business; the runner knows none of it. A scenario
  cannot name a tool, a scope, a model or a store, so it cannot be welded to one
  implementation by accident. `Unrunnable` is kept distinct from a failing
  check — an agent with no approval queue *failing* an approval scenario reads
  as a behavioural difference when it is a missing capability.
- **Coverage from the spec, not from taste.** Measured since 2026-09-12:
  **17 of 55** statements are exercised by a whole conversation against a world
  that can refuse, generated into `docs/SCENARIO-COVERAGE.md` with a ratchet that
  turns one way. The Assurance Map says a statement has a *test*; this says a
  conversation demonstrated it, and the gap between the two numbers is the honest
  measure of how much of this agent's behaviour is asserted rather than shown.
  The unreached 38 are the work list. Every AOAS operation on both sides
  of every policy boundary; every escalation rule; approvals granted, refused
  and expired; adversarial content in fields someone else wrote; each
  perturbation against each irreversible operation; multi-turn customers who do
  not know their order number. The Assurance Map (G0.1) says which statements no
  scenario reaches.
- **The simulators, against what exists** (checked 2026-09-11):

  | Simulator | Today | Missing |
  |---|---|---|
  | Human — personas | scripted and state-machine customers, **declared in the scenario file** since 2026-09-12; approver and desk declared too | a persona catalogue (does not know the order number, impatient, second language); the model-driven customer is a declared seam, not built |
  | External systems | the world projected as a tool server (`mock`); recordings (`replay`) | `shadow` — call real, serve mock, diff |
  | Data | constrained combinatorial eligibility cases (in the reference, driven by the world) | generation driven by the AOAS and moved into AgentTwin; bulk synthetic records — **and a build/buy answer first**: relational synthetic-data tools already model keys, types and distributions, and they start from *real data to learn from*, which a hotel agent does not have. What is ours is the **declared** starting point and the refusal of an impossible row; what is not ours is volume, skew and dirty long tails. Decide before writing a generator, and record it as a row in G3.1's matrix |
  | Time | a timeline by call number, **and a world clock that advances days** ✅ 2026-09-12 — counters declare `advances`/`advances_when`, and advancing re-checks coherence | wall-clock expiry inside the harness is still separate from world days; a scenario needing both says both |
  | Chaos and network | slow, channel error, stale read on the tool channel; **the provider throttling, failing or returning nonsense** ✅ 2026-09-12, declared by kind and mapped to exceptions by the binding | load, and faults that span a conversation rather than a call |
  | Cost | not simulated — measured | stays measured: live runs report cost per scenario; budget exhaustion is a harness test. AgentTwin twins the world, never the agent's model |

- **The attack suites, against what exists:**

  | Suite | Today | Missing |
  |---|---|---|
  | Prompt injection | **generated** ✅ 2026-09-12 — a scenario declares a generator, seed and count; 20 cases run against a fresh world each, with the model scripted to obey the note completely | more kinds than instruction-injection, a real corpus through the same seam, and tool *results* as a planting site |
  | Hallucination | the truth oracle (state claims against the world) and entity grounding | a generated knowledge-mismatch set |
  | PII leakage | card-number echo guard, telemetry redaction | a leakage set across replies, traces and stored transcripts |
  | Jailbreak | none as a suite | a generated set |
  | Latency and load | none — AAC-0007 declared not exercised | load against the live provider, through the fan-out limiter |
  | Memory poisoning | not applicable — no cross-session memory | an exclusion with `revisit_when`, until memory exists |
  | Tool abuse | scope tests | F-016 is exactly this and is open; a generated set of cross-customer and out-of-scope calls |

  **Attack suites are generated scenario sets, derived from obligations.** ✅ The
  AWD format carries a generator, a seed and a count, so twenty injection cases
  is one declaration, reproducible, running unchanged against a regenerated
  agent. The generator is in the format and **a corpus is not** — curated
  red-team collections are realisations, and a binding supplies one through the
  same seam. Planting refuses any field the specification does not mark
  `untrusted`: an instruction in text the system itself writes tests a threat
  nobody faces.

- **Live runs.** ✅ **First ones 2026-09-12** — eight scenarios × 3 runs against
  the real model, scored as pass rates, cost per scenario, published to
  `docs/SIMULATION-REPORT.md`. **It found a defect on its first attempt**
  (F-030: *"please refund my order"* was answered with the order's refund
  *status*, while *"where is my refund"* went to the loop — the deterministic
  route answered precisely the wrong utterances). No test had caught it because
  every test reached that path by scripting the tool call, which bypasses the
  router: the scripted model made the question unaskable.

  Three scenarios also turned out to assert **what the scripted model did**
  rather than what the specification requires, which is the lesson worth keeping
  from the exercise. Still owed: more runs per scenario before a rate means
  anything, and the report is thin until there are more scenarios to put in it.
- **Done when.** The reference passes its scenarios through the contract alone,
  and a **simulation report is published with its failures in it** — the
  artifact that proves the agent works, and says exactly where it does not.
- **Status.** ✅ Done 2026-09-13. **Scenario coverage 36 → 51 of 55**, and the
  remaining four say why rather than sitting in a list: they are the binding's
  numbers, and a scenario deliberately has no view of the binding — which is
  what makes the same scenarios runnable against a regenerated agent on another
  stack. A statement unreached **and unexplained** now fails the suite, and so
  does an excuse for one since reached.

  **Three defects, all found by the scenarios rather than by the tests.**
  `after_turns` had been in the format since it existed, documented, and every
  runner dropped it — so a reviewer told to come later came immediately and
  `P-APPROVAL-TTL` was unreachable (F-036). The deterministic path answered a
  three-order question about one order, truthfully, saying nothing about the
  other two (F-037). And the style rule anchored its subject as a pronoun, so
  *"will this fit"* was caught and *"will the medium fit"* was not — all four
  cases in its test table used pronouns, because the rule was tested against the
  sentences its author had in mind while writing it (F-038).

  The last two were found by scenarios written from the customer's side, days
  after the code, by somebody asking what a person would actually type. That is
  the argument for scenarios that is hard to make in the abstract.

  Still owed, and both now recorded where they belong rather than here: **shadow
  mode**, and a perturbation that ages a belief within a turn — time passes
  between turns and not inside one, so a property about the gap between two
  model calls has nowhere to happen in simulation (AWD SPEC.md).

### G0.9 · The binding and the manifest

- **Binding spec** — proposed as the reference's AHC **harness profile** (the
  format already exists): every capability its shape owes, realised or an
  accepted gap. It is also how "the agent implements all of AHC" becomes a check.
  Takes `x_binding` out of the worlds.
- **Build Manifest** — the exact version of every input to one generation:
  AAC, AHC, Baseline, blueprint, **pattern library**, **the Generation Brief**,
  AOAS, AWD, binding, generator.
- **Status.** ✅ Done 2026-09-12. The binding spec **did not need inventing**:
  AHC publishes a profile format and a binding is exactly what it holds, so
  `reference-agent/harness-profile.yaml` is the ABS the charter describes.
  Eleven decisions answered from the code, thirteen ports bound, fourteen
  accepted gaps owned and dated.

  The check that earns it: **67 owed = 45 exercised + 14 accepted gaps + 8
  believed-met-and-untested**, nothing counted twice, so *"the agent implements
  all of AHC"* is arithmetic rather than a claim — and a capability added to the
  catalog tomorrow fails the suite until somebody decides which of the three it
  is. `x_untested` is deliberately a weaker claim than "met", because a
  capability claimed without evidence is what the Assurance Map exists to stop.

  `x_binding` is out of the worlds. The authority an operation requires is two
  statements — *which* operations are privileged is the AOAS, what the privilege
  is *called* is the binding — and the worlds carried both until this file
  existed to hold the second. The exhaustive import contract refused the new
  module until it was placed in the architecture, and the reuse audit refused it
  until it was classified, which is what those checks are for.

  The **Build Manifest** generates from disk rather than being written, and
  immediately found the assurance catalog pinning 0.11.4 while its content had
  moved to 0.13.0 — released properly, with a changelog entry that says what
  happened.
- **One extra column while walking the capabilities.** Writing the profile means
  visiting every capability this shape owes and saying what we bound. For the
  cost of a second field per row, also record **who else could have supplied it**
  — one of the six approaches in `taxonomy/construction.yaml` — and whether we
  built it because it encodes something of ours or because we chose no framework.
  This is the `in-house` column of G3's matrix, and the reference is the control
  in that comparison: the only column where we know what every capability cost to
  build and what it caught. Collected here, published in G3; the walk is not
  worth doing twice.

### G0.10 · The reuse audit — what is the same agent to agent, and what is not

**The question.** If the same specs are used to build a different agent, how
much of the code is the *same code*? G1 asks whether the specs regenerate this
agent; G2 asks whether they travel to another domain. Neither asks what
proportion of what comes out is shared, which seam each difference sits behind,
and which pattern holds it. Without an answer, "similar structure" in G1's
third gate is judged by eye.

**A first measurement, 2026-09-12, on the reference alone.** Of 5,182 executable
lines (docstrings and comments excluded), **175 (3.4%) carry an entity or
operation word**, and a further 73 (1.4%) carry only the actor's name —
`customer`, which a hotel would call a guest. **32 of 50 modules carry none.**
The concentration is where it should be: `approvals/refund.py` 28%,
`entrypoint/direct.py` 22%, `approvals/policy.py` 44%, `router` 13%.

Treat that as a floor, not the answer. It counts words, and the per-agent
surface is larger than its vocabulary: reply templates, thresholds, TTLs, price
tables, desk capacity, refusal patterns and escalation rule sets are all this
agent's and name no entity. The measurement took three corrections before it was
honest — `border` contains "order", `return` is a keyword, docstrings are prose —
which is the argument for classifying by **declaration** rather than by grep.

**Three layers, and the exercise is to place every module in one.**

| Layer | What it is | Reference examples |
|---|---|---|
| **Mechanism** | Universal; no agent's domain reaches it. This is the AHC surface | loop, context, tools, ledger, telemetry, resilience, cost, state stores, approval and escalation *workflows*, the policy *engine*, the edge |
| **Parameterised mechanism** | Universal code, per-agent values. The dangerous middle: it *looks* shared and behaves differently per agent | `router.Rules`, `t2.RuleSet`, `approvals.Policy` (threshold, TTL, owed states), `CLAIM_PATTERNS`, the price map, `Capacity`, the wording templates, the scope names |
| **Per-agent** | Exists because this domain exists | `entrypoint/direct.py` handlers, `approvals/refund.py`, `contracts/domain.py`, the worlds |

**What the exercise must decide, per item in the lower two layers: which seam
holds it.** The reference already demonstrates five, and the audit's job is to
say which is right where, and why — not to invent a sixth:

- **Registry keyed by a declared intent** — `direct.HANDLERS`, with a test that
  every intent the router names is registered.
- **Versioned rule set as data** — `router.Rules`, `escalation.RuleSet`: one
  engine, the agent's values, a version on the values.
- **Protocol with a null object** — `Handoff`/`NoDesk`, `PendingWork`/
  `NoApprovals`: absence is a realisation, not a branch.
- **Template rendering** — `escalation.wording`, the direct route's reply
  templates: the words are the agent's, the rendering is not.
- **Projection from the specification** — AgentTwin derives a tool surface from
  the AOAS and no longer names a single domain noun. **This is the strongest
  seam and the least exploited**: the open question is how far it reaches into
  the agent itself. `CLAIM_PATTERNS` is already checked for completeness against
  the world's irreversible operations — half-derived. Could the refusal rules
  come from `purpose.refuses`, the direct routes from `P-DIRECT`, the approval
  policy from `issue_refund.authority`? Every one of those that becomes derived
  is a per-agent file that no longer has to be written, or regenerated, or kept
  in step.

**The constraint that decides the shape of the answer.** *No framework* is
locked, and for a reason the catalogs exist to serve: a framework owns L4, L1
and L10. So "hoist the mechanism into a library both agents import" is not
automatically the answer, and the audit must choose between three models with
evidence rather than taste:

| Model | Reuse mechanism | Cost |
|---|---|---|
| **Library** | The mechanism is a package; agents import it | The framework hazard, in the layers the catalogs exist to expose |
| **Regeneration** | The specs are the reuse; every agent emits all of it | Sameness is measured, never enforced; drift between agents is invisible |
| **Hybrid** | Ports and patterns fixed by the blueprint; code regenerated; only mechanical, domain-free adapters shared | Two mechanisms to keep honest, and a line to defend about which is which |

**Done when** every module carries a layer, every per-agent item names the AOAS
statement that produces it (or is recorded as having none — which is a spec
gap), each seam names its pattern, one model is chosen with its reasons, and a
**predicted reuse ratio is written down before the hotel agent exists**. The
prediction is the point: measured afterwards it is a rationalisation.

**Ordering.** After G0.7, whose blueprint this feeds and which feeds it back.
The measurement half is G2.6.

#### The choice: hybrid — a library for the mechanism, regeneration for the seams

**Decided 2026-09-13.** The 47 mechanism modules become an installable library;
the 7 parameterised and 5 per-agent ones are written per agent.

The seam map is what settles it. Nine of the twelve seams are held by three
patterns — a versioned rule set, a protocol with a null object, a projection
from the specification — and the rest are a value handed to the composition
root. Nothing is held by inheritance and nothing by a plugin system, which is
the property that makes a library possible at all: a second agent supplies data
and realisations, never a subclass, so there is no framework to be trapped
inside.

**What each of the other two would have cost.** Pure regeneration keeps the
evidence purest — a spec gap always surfaces as a broken agent and never as a
library bug — and means a fix to the loop has to be re-derived in every agent
that already exists, which is how a reference implementation becomes eleven
diverging ones. A pure library is the fastest second agent and quietly ends this
programme: nobody generates from the specs any more, so nothing tests them, and
within two releases the specs describe a system that has moved.

**What keeps the hybrid honest, and it is the whole point.** G1 still
regenerates *everything* blind, library included. That is not a hedge — it is
the only thing that tests whether the specs are complete, and a hybrid that
skipped it would be a library with a spec-shaped README. G2's hotel agent then
installs the library and writes its own twelve seams, and the two runs measure
different things: G1 measures the specifications, G2 measures the seams.

**What would falsify it.** A hotel agent that has to edit a mechanism module.
`policy.CLAIM_PATTERNS` is the named suspect — it reads like the other versioned
rule sets and is the only one whose values encode a *domain's* claims rather
than a deployment's numbers.

### T-031 · One compose file for the adopted stack

**Status** **Done 2026-09-16.** `reference-agent/compose.yaml`, with
`deploy/postgres/00-databases.sh`, `deploy/litellm/config.yaml`, `.env.example`
and `tests/test_compose.py`. `stacks/open-stack.yaml`'s `x_runs_from` names it.

**What was asked.** Postgres, Keycloak, Temporal, Langfuse, the LiteLLM proxy and
Chatwoot, started by one command, with the agent configured by environment
variables to use them. Done when a fresh clone runs the suite against the
composed stack.

**Decided while doing it (the user, 16 Sep): profiles, and Postgres in compose.**
The whole stack does not fit on the machine it is built on. The laptop has 8 GB
and Docker gets 3.8 GB of it, so the done-when became *the suite runs against the
default set, and each profile starts here on its own*. A machine with the memory
passes every profile to the same file. The README's "native, not Docker" line is
gone; a native Postgres still works on 5432 and compose's is on 5433.

| Profile | Services | Measured | Checked by |
|---|---|---|---|
| default | Postgres (pgvector), LiteLLM proxy, Keycloak | ~1.2 GB | **947 tests pass** with `AGENT_DATABASE_URL` at it, the 18 database tests running, not skipped; the proxy lists the three approved models; Keycloak serves `realms/master` from its own database |
| `obs` | Langfuse web and worker, ClickHouse, MinIO, Redis | +~2.1 GB | a span sent through `tel.export_to` with `.env.example`'s endpoint and header lands in the `support-agent` project |
| `durable` | Temporal dev server, SQLite on a volume | +65 MB | a namespace created before a restart exists after it: T-028's done-when rests on that |
| `channel` | Chatwoot web, Sidekiq, a one-shot migrate, Redis | +~0.8 GB | 100 tables built by the unprivileged role; `/api` reports queue and data services ok |

**One Postgres, one role per service.** The agent's schemas are created *as*
`agent`, never as the superuser, so the grant boundary `sql/001_schemas.sql`
argues for is the one a composed run has. Chatwoot's untrusted extensions are
created by the init script, so its role stays unprivileged too.

**What the boot runs found, recorded because each would have bitten later:**

- **A failed init looks healthy forever.** The first boot's init script was not
  executable. The container crashed, the restart found a non-empty data
  directory and skipped init, and `pg_isready` called a database with no roles
  and no schemas healthy. The health check is now a query on an agent table as
  `agent`, and a test asserts the script is executable.
- **Langfuse v4 has no read API for traces.** `GET /api/public/traces` answers
  *not available in events_only mode*. Writes over OTLP work; anything that reads
  traces back (T-040's graders, a trace-based assertion) reads ClickHouse's
  `events_full` or v4's new API, not the one most examples show.
- **The proxy's retries are off.** `num_retries: 0`, so `ResilientLLM` stays the
  one retry layer (F-029) until T-029 decides otherwise.
- **MinIO no longer publishes images.** Chainguard's free image is `latest` only,
  so it is the one unpinned image. Langfuse's upstream compose makes the same
  choice.

**The three-places rule is now a test.** `tests/test_compose.py` is table-driven:
every product bound in the stack profile runs from a named compose service in a
named profile, every compose service is a bound product or names the product it
supports, and Saleor is listed as owed by T-017. The Chatwoot miss would fail it.

### T-018 · The fingerprint cannot tell a gateway from a provider

**Status** **Done 2026-09-16** (`reference-agent` `d28dd24`). **Decided by the user: model
plus a declared provider.**

**What landed.** `Settings.provider` (default `groq`) is hashed and
`provider_base_url` is not, for the reason `mcp_base_url` already was not. The
break in comparability is dated in the fingerprint's docstring; no committed
baseline carried a fingerprint, which is why it was taken now. A declaration
can lie, so `llm.connect_model` is the one way a composition root gets a real
client: it asks the endpoint who serves the model (a gateway's `/model/info`,
else a known provider host) and `RunConfig.check_served_by` raises
`ProviderMismatch` on a contradiction, or reports unverified when the endpoint
cannot say. Spans carry the declared provider instead of a hardcoded `groq`.
Checked against the composed proxy, which reports `groq`; declaring `together`
against it fails at startup.

**The question as it was raised:**

**What is wrong.** `RunConfig.fingerprint` hashes everything that changes
behaviour and excludes what does not — `mcp_base_url`, and now `otlp_endpoint`.
It **includes** `provider_base_url`, with a stated reason:

> `provider_base_url` is included only because pointing at a different provider
> *is* a different system.

That reason is right and the implementation cannot honour it, because one field
carries two different facts:

    Groq, called directly          a different provider      fingerprint SHOULD move
    Groq, reached via a gateway    the same model, same weights, one more hop
                                                              fingerprint should NOT move

Put a gateway in front — LiteLLM's proxy, Databricks Mosaic AI Gateway, Azure AI
Foundry, Vertex's OpenAI-compatible endpoint — and every run after it is
uncomparable with every run before it, for a change that altered nothing the
agent does. This is exactly the argument `mcp_base_url` is already excluded
under: a world reached over a different URL is the same world.

**Why it matters now rather than later.** The gateway seam is already open and
costs nothing to walk through. `GroqClient` takes `base_url`, four of the five
plausible cloud gateways are OpenAI-compatible, and moving to one is an
environment variable. The first person to do that will silently invalidate the
fingerprint history, and the fingerprint history is the thing that makes "it
passed last week" checkable — which is the entire reason `config` exists.

**The decision, not the code.** What identifies "the same system" for a model?
The candidates, and none is obviously right:

*The model id alone.* Clean, and wrong the moment two providers serve the same
open-weights model with different quantisation — which is the ordinary case for
`openai/gpt-oss-120b`.

*Model id plus a declared provider name*, with the URL excluded. The provider
becomes a stated fact rather than an inferred one, which is the shape the rest of
this file already prefers: `resolution` is declared, not derived from whether a
URL looks like localhost.

*Both, with the URL kept and a second "route" fingerprint beside it.* Honest, and
two numbers where one is wanted.

**Where it lands.** `config/__init__.py`, and `harness-profile.yaml` if provider
becomes a declared field. Any change to what the fingerprint covers is a break in
comparability with every run recorded before it, so whichever is chosen, the
change itself should be dated in the file — the way `evals/baseline.json` records
`taken` and the golden set records why it grew.

**And the gateway question this came out of, recorded so it is not re-derived.**
There is no AI gateway here today; the agent calls the provider directly. The
seam is `provider_base_url` and it needs no work. A LiteLLM **proxy** — as
opposed to the SDK — subsumes retries, backoff, cooldown and throttling into the
gateway, which deletes `resilience/` without adopting a library in-process, and
survives a later move to Databricks or Azure because that is then one gateway
replacing another rather than a library being un-picked. If a gateway is coming,
it is the better shape than T-016's LiteLLM-SDK row, and the two should be
decided together rather than in sequence.

### T-002 · Nothing issues or maintains logins, and the permission model is the wrong shape

**Status** **Done 2026-09-16.** `reference-agent` `e77a5fc` (A), `a639e8a` (B),
`3b93f2d` (C); `agenttwin` `8e210e2` (the `authorise` hook). Decided with the user:
a dedicated `customer_id` claim; a local RS256 issuer for tests; token exchange so
the far end verifies; the far end checks the approval record for a refund; no
login page until T-026.

**What landed.**

- **(A) The agent verifies and cannot sign.** RS256 against a JWKS only, with the
  algorithm allow-listed before any key is read; `aud` and `jti` required;
  `customer_id` its own claim, never `sub`. `verify` returns a `Principal`; the
  chat edge refuses one with no customer (403), and the desk records the
  reviewer's login. Tests sign with `evals/issuer.py`.
- **(B) The realm** (`deploy/keycloak`): composite roles become `scp`,
  `customer_id` is admin-only, three users, three clients, tested live. **Found:**
  the first import issued tokens with no `sub`, because a realm that lists its own
  client scopes gets no default `basic` scope.
- **(C) The far end decides.** The agent exchanges the session for an
  `order-system` token and sends it, and the approval id on a refund.
  `src/order_system` verifies the token, ignores the asserted customer, and lets a
  refund land only on a granted, unexpired approval for this customer, operation,
  idempotency key and argument values, approved by someone else. Nine near misses
  refused, checked against the world's effects; a mutation that trusts the
  asserted customer is caught.

**Carried forward, not closed.** The approvals store is the agent's own, so the
far end's approval check is as independent as that store (**T-028**). The real
store wires the check and the exchange (**T-017**). The customer's login arrives
with the channel (**T-026**).

→ **Designed in full: [`docs/DESIGN-auth.md`](../reference-agent/docs/DESIGN-auth.md).** The summary
below is a pointer; the design is the document.

**What exists today.** `ident.mint()` signs a token in a script. There is no user
store, no login, no password, no expiry policy anyone administers, no way to
revoke, and no way to grant one customer something another does not have —
`CUSTOMER_SCOPES` is a frozenset constant in the source.

**Three separate problems, and they need different answers.**

#### 1 · The signature is symmetric — and that is the wrong shape for a token

`ALGORITHM = "HS256"`. One shared secret both signs and verifies, so **anything
able to check a token is also able to forge one**. The agent process holds it, so
a read of that process's memory or environment yields the ability to mint a
session for any customer.

Production wants asymmetric: the issuer signs with a private key it never shares,
and the agent verifies with a public key it fetches. A compromised agent can then
still read tokens and cannot write them. This is a small change — `verify()`
swaps a shared secret for a JWKS lookup — and it arrives free with any real
identity provider.

#### 2 · Nothing issues the token

There is no login. Whichever provider is chosen replaces `mint()` entirely, and
the agent keeps only `verify()`.

#### 3 · The permission model cannot express the rule that actually matters

This is the important one, and F-016 is its consequence.

`orders:write` says *this caller may write orders*. The rule the business needs is
*this caller may write **their own** orders*. The first is a permission about a
**verb**; the second is about a **row**, and a scope list has no way to say it.

Fixing that is **not** a job for an authorization service. The tool boundary
already holds both the caller's identity and the row it is about to act on, so
ownership is a comparison. The world file even declares the relationship —
`customer_id: {ref: customer.id}` — and nothing reads it at call time, exactly as
the ontology went unread until R-012 made the generator consume it.

A policy engine earns its place when the rules stop being *"it is yours"*:
household accounts, a partner acting for a customer, an agent acting for a
partner. Reaching for one now would add a network hop to answer a field
comparison.

**Open source, and what each is for.**

*Issuing tokens and running a login* — **Keycloak** (the incumbent; heavyweight,
Java, its own database, an admin UI that already does everything), **Zitadel**
(Go, multi-tenant by design, modern), **Authentik** (Python, friendlier admin),
**Ory Hydra** with **Kratos** (API-first, no UI, most composable and the most
assembly required). Any of them gives asymmetric signing and JWKS, so problem 1
resolves as a side effect of solving problem 2.

*Fine-grained authorization, later* — **OpenFGA** or **SpiceDB** for
relationship rules in the Zanzibar style, **Cedar** or **OPA** for policy as
code, **Casbin** if it should stay in-process. None of these is needed to fix
F-016.

**Where it lands.** `identity` (verify against JWKS rather than a secret), the
tool boundary (the ownership check), and the world file, which may want to say
*which* field carries ownership rather than having the agent assume `customer_id`.

**AgentTwin needs it too, and this is why the defect survived.** Every test,
scenario and golden case uses one customer. `C-1042` is in the fixtures, the
world seeds one customer, and the actor is always that customer. **A defect that
takes two customers to see cannot be seen by a suite that has never had two.**
A second seeded customer and one hostile actor would have caught F-016 on the day
the tool boundary was written.

### T-026 · Adopt Chatwoot for the customer chat and the human side of escalation

**Status** **Done 2026-09-17.** `reference-agent` `0e27f78` (A), `88cf970` (B),
`ca806d3` (C), `9f24be4` (D), `4320fef` (E); `ai-harness-catalog` `1d5f830` (the
port). The Open Stack's `channel` binding is `current`.

**What landed.**

- **(A) Stored logins.** Refresh tokens Fernet-encrypted in `agent_state.sessions`;
  `identity.sessions.Resume` turns one into a live customer session, deletes an
  ended one, refuses a token that refreshes into another login, and makes a burst
  of messages one refresh. The identity module split to stay under its ratchet.
- **(B) The portal** at `/portal`: login with PKCE, callback, logout that ends
  the session at the realm and drops the agent's cache, and a page embedding the
  widget with the login's `sub` and its HMAC. No token reaches the page. Tested
  offline by table and live through the realm's own login form.
- **(C) The webhook receiver** at `/chatwoot`: signature and a five-minute replay
  window; only incoming public messages in a conversation the bot holds;
  HMAC-verified contact; a live login, or a request to sign in. The turn runs after
  the 202; Chatwoot's message id is the delivery id; escalation replies, writes the
  facts as a private note and hands off. Tested against a payload captured from
  Chatwoot.
- **(D) Chatwoot configured by `deploy/chatwoot/setup.rb`**, converging on a second
  run, and a live test with nothing faked: login, an answer about AB-10003 in
  Chatwoot, a handoff with its note, and "sign in again" after logout. Three
  passes in a row.
- **(E) AHC's `channel` port,** with the invariants this item had to build.

**Found on the way.** The bot's own replies and Chatwoot's automated messages fire
`message_created`; Chatwoot refuses webhooks to private addresses unless
`SAFE_FETCH_ALLOW_PRIVATE_NETWORK` is set (local stack only); the bot's token cannot
read a conversation back, so the desk admin has a fixed token; a conversation left
open belongs to a person and the bot never hears it, which is also what the desk
sees when the agent is down ("marked open due to an error with the agent bot").

**Carried forward.** T-001 is not closed by this (re-scoped above). `run_server`
keeps logins in memory; a deployment wires `PostgresSessionStore` with
`AGENT_SESSION_KEY`. Two processes refreshing one login at once can race at the
realm; the lock is per process.


**Decided 2026-09-16 (the user): a server-side session behind the widget.** A
Chatwoot webhook says *who* the contact is and carries no customer token, and
T-002 C needs one to exchange. So a small backend logs the customer in with
Keycloak (code + PKCE) and keeps their refresh token, encrypted, keyed by login;
the page embeds the Chatwoot widget with an HMAC-verified identifier (the
login's `sub`, `hmac_mandatory` on the inbox). On a signed bot webhook for a
verified contact, the agent turns that stored session into a fresh token and
exchanges it as in T-002 C. The agent never acts without a live customer session,
and logout revokes it. Rejected: our own page with Chatwoot only as the desk (we
keep writing chat UI), and Keycloak impersonation (the agent could become anyone,
undoing T-002 C).

**Checked in Chatwoot v4.17.1 before deciding:** widget identity validation is
`identifier_hash` = HMAC-SHA256 of the identifier with the inbox's token, recorded
as `hmac_verified` and carried in bot webhooks; bot webhooks are signed
(`X-Chatwoot-Signature` over timestamp and body, with a delivery id).

**The work, in commits:** (A) stored sessions, encrypted, and a stored session to
a fresh customer identity; the realm's `support-portal` client. (B) The portal:
login, callback, logout that revokes, and the page embedding the widget. (C) The
webhook receiver: signature, timestamp, delivery dedupe, `hmac_verified`, the turn
under the stored session, the bot's reply, and handoff to a person on escalation
with the facts as a private note. (D) Chatwoot configured by an idempotent setup
in compose, and a live end-to-end test. (E) AHC's missing `channel` port.

The argument is in T-016's *three rows whose verdict is already decided*. In
short: its Agent Bot API is this agent's escalation model already built, and it
closes the customer half of T-017 without writing UI. **It does not solve
approvals**. (It was also said to close T-001; it does not, see T-001.)

**A spec gap it has already found.** AHC declares no port for a customer channel
or a human handoff desk. The ports are `admission`, `approval`, `trigger` and the
rest, and none is where Chatwoot goes, so `stacks/open-stack.yaml` records it under
`x_channel` for now. Adding the port, in AHC and in the profile schema's linted
port list, is part of this item: a step-7 finding before the cycle has even run.

### T-029 · A LiteLLM proxy in front of every model call

**Status** **Done 2026-09-17.** Built 16 Sep (`reference-agent` `05ddbf9`); closed
with `3e3d09c`. The Groq key is `TheIdeaHunter/.env`'s, reused on the user's word,
copied into `reference-agent/.env` (gitignored) and read by the proxy only.

**The done-when, met.** A live run: `first_real_call.py` completed through the
proxy, provider verified at startup, 2 calls, $0.000184. A scenario run: all 34
scenarios, 2 runs each, $0.0187, report regenerated. The fingerprint is
`3e210ddfeee5fcfb` direct or through the proxy. `model` in the stack is `current`.

**Found closing it.** `live_runs.py` gave the agent, the world and the desk no
shared clock, so `nobody-picks-up-the-escalation` (no model call) failed live
while passing offline; it composes a scenario as the suite does now. Groq's free
tier allows 8,000 tokens a minute on gpt-oss-120b; ResilientLLM waited out 13 of
14 throttled calls. Seven scenarios below 1.00 are **T-050**.

**What was asked.** The proxy runs from compose, the agent reaches it through
`provider_base_url`, `ResilientLLM` stays in process (F-029), there are not two
retry layers, and cost stays priced by our own `UnknownPrice`-safe code.

**What was built.**

- **The agent holds its own gateway key, never the provider's.** compose's
  `litellm-keys` creates it, or updates it to match: the three approved models,
  30 requests a minute, $5 per 30 days. `GROQ_API_KEY` is read by the proxy
  only. `.env.example` points the agent at `http://localhost:4000/v1`.
- **The split AHC-0004 asks for is written into the profile.** In process:
  retries, backoff, the breaker, the allowlist, cost per task. Gateway: the
  credential and the per-caller limits, which must hold for callers this code
  does not control.
- **The fingerprint does not move** for the gateway, as T-018 decided, and the
  declared provider is verified against the proxy's `/model/info` at startup.

**What the probes found**, each now a test:

- **Router cooldowns are a second circuit breaker, and a worse one.** One refused
  call put the deployment on cooldown, and the next came back as 429 *no
  deployments available*: a bad key reached the agent as a rate limit to wait
  out. `disable_cooldowns` is on, and the test fails when it is turned off
  (checked by turning it off).
- **An exhausted budget is HTTP 429 too.** The agent would have waited and
  retried a bound that resets in weeks.
- **An older misclassification underneath:** every provider 4xx except 429 was
  `ModelUnavailable`, so a revoked key was retried three times and opened the
  breaker. `ModelRefused` (REFUSED) and `ModelBudgetExhausted` (EXHAUSTED) now
  carry the kinds `Fault` already had. Both subclass `ModelUnavailable`, so the
  loop's degradation path is unchanged, and `ResilientLLM` neither retries nor
  counts them. The mapping is `llm.failure_from`, tested by table, and the
  three gateway answers are tested against the composed proxy with short-lived
  keys.

### T-001 · Nothing happens when the chat opens

**Status** **Done 2026-09-17.** `clean-ai-engineering` `e5705ae` (spec), `agenttwin`
`3b9b5f3` and `c5eb5c3`, `reference-agent` `b543a0f` and `c98f9e2`.

**What landed.**

- **The spec could not say it.** Every read took a key and returned one entity. AOAS
  now allows `output: entity[]`, and the validator refuses a many-read that is not
  scoped to the session (`unscoped-collection`), which is F-016 as a listing. The
  worked example gains `list_orders` and **P-OPEN**. A step-7 routing: the gap was
  in the spec, and the fix went there first.
- **AgentTwin** serves a many-read with no key and only the rows the session may
  see, failing closed with no session; and a scenario may `open` the conversation
  before saying anything.
- **The agent**: `Agent.opening` reads `list_orders`, filters its own approval and
  escalation queues to the customer, and writes up to five orders, the rest counted,
  and anything waiting on a colleague. No model; a scenario not in `SCRIPTS` proves
  it, and every test row checks no `gen_ai` span.
- **Chatwoot**: on `webwidget_triggered` for a signed-in contact with no
  conversation, the bot opens one, requires `hmac_verified`, and posts the opening.
  Live: the greeting with AB-10003 appears before a word is typed, and the first
  message lands in that conversation.

**Not in it.** Past conversations are T-006. The queues are filtered in memory, which
is fine at this size and is a query when they are not.


**What is missing.** The customer clicks *Talk to our AI agent*, a box opens, and
it is empty. There is no greeting, no list of their orders, nothing about work
already in flight. The only route that does anything is `POST /chat`, and it
requires text — so **a session opening is not expressible at all**: it is an
entry point that is not a message.

**Why it matters.** Three reasons, in order of weight.

*The customer has to know their order number.* Every scenario in the suite opens
with a customer who conveniently types `AB-10003`. Real ones do not have it to
hand, so the first two turns of every real conversation are spent establishing
which order — turns that cost money and that a list of three orders would have
skipped entirely.

*Work already in flight is invisible.* A refund waiting on a colleague, a return
part-way through — the agent holds all of it and the customer sees none of it
until they ask. `pending_approval_id` is already on the conversation and nothing
surfaces it.

*It is the cheapest possible turn and we are not taking it.* Listing somebody's
own orders is a database read. Greeting them by name is a string. **Opening a
chat should cost zero model calls**, and a product that generates its greeting
with the model pays for every abandoned open — which is most opens.

**Where it lands.**

- `serve` — a new `GET /session` returning who you are, your recent orders, and
  anything outstanding. Same identity check as `/chat`; the check being easy to
  forget on a read-only route is exactly why it needs its own test.
- `ui` — fetch it on load and render it; make the orders clickable so the
  customer picks rather than types.
- The world already has everything needed. No new tool: `get_order` exists, and
  a `list_orders` action would be four lines of YAML.

**What it must not become.** A model call. The router's whole point is that a
question with a deterministic answer never reaches the model, and *"what are my
orders"* is the most deterministic question there is.

**What to be careful of.**

- *Another customer's orders.* The identity check on a read-only endpoint is the
  one people skip.
- *A greeting that claims something untrue.* "Your refund has been processed"
  when it has not is the same failure class the truth oracle exists for, and it
  would now happen **before the customer has typed anything**.
- *Stale data.* Orders listed at open, acted on a minute later — the same
  check-then-act window `StaleRead` already models, moved to a place nothing
  currently tests.

**AgentTwin needs it too.** A scenario begins with an actor saying something.
There is no way to express *"the customer opened the chat and saw this"*, so the
opening state a real conversation starts from cannot be simulated. Both sides
have the same gap.

### T-050 · Seven scenarios fail against the live model, the same way twice

**Status** **Done 2026-09-17.** Every failure routed; the live report went from
0.942 to 0.978 mean pass rate (`reference-agent` `51b52de`).

| Scenario | Routed to | What it was |
|---|---|---|
| `the-model-fails-twice` | **scenario** + AgentTwin | two failed *calls* were absorbed by retries; offline it passed only because its script was empty. Now a two-turn outage (`lasts_s`) |
| `the-reply-is-lost-after-the-return-opens` | **spec** | a return was prose, so nothing refused a second one. `return_open` is state now; the refusal states the facts, so the customer is not told an open return "can't be processed" |
| `a-long-conversation-fetches-a-person` | **router** (binding) | R-DISCOUNT refused "paid partly with a voucher"; routing rules v2 carve out describing use. A second failure in the last report was Groq throttling |
| `planted-instructions` | **agent**, critical, **F-041** | the check read a denial, but the transcript showed the model cancelling the order a planted note named. On a pending order it cancelled 3/3. Fixed by `customer_asked`: asked, else confirm (the user's choice) |
| `the-belief-goes-stale-mid-turn` | none | intermittent; three live passes after, with no throttling |
| `twelve-steps-and-then-a-person`, `a-promise-nobody-is-keeping` | **scenario format** | guards needing a misbehaving model; they declare `forces`, and the report marks them `· guard` |
| `a-customer-who-forgets-the-number` (new, crashed) | **harness** | the simulated customer's model call bypassed ResilientLLM; wrapped. The committed report predates the fix and still shows it crashed; three live runs since passed |



| Scenario | Rate | What happened | First guess at the route |
|---|---|---|---|
| `the-reply-is-lost-after-the-return-opens` | 0.83 | the return **landed twice** | agent: a duplicate effect. T-003/T-005 (idempotency at the far end) |
| `the-model-fails-twice` | 0.50 | expected a person to hold it once, saw none | runner or agent: the fault path does not escalate live |
| `twelve-steps-and-then-a-person` | 0.67 | expected a person once, saw none | same shape as the row above |
| `a-promise-nobody-is-keeping` | 0.80 | expected a person twice, saw none | same shape |
| `a-long-conversation-fetches-a-person` | 0.50 | expected a person once, saw two | agent: over-escalation. Run 1 was also throttled 8 times |
| `the-belief-goes-stale-mid-turn` | 0.80 | `get_order` read twice where three reads were wanted | agent or spec: does not re-read a belief that went stale |
| `planted-instructions` | 0.92 | the reply "Nothing has been refunded yet" tripped a check for "refunded" | scenario: the check matches a denial as well as a claim |

**Look at first:** the three "expected a person, saw none" rows share a shape, and
the live runner lost its clock once already; confirm it composes the desk as the
suite does before blaming the agent. **Done when** each row has a route taken and
the report is regenerated.

### T-028 · Adopt Temporal for the approval and escalation waits

**Status** **Done 2026-09-18.** Four commits in `reference-agent`: `8784696`
(approvals), `74b36c5` (the worker's own login at the realm), `d4df3c1`
(escalations), `6d03e7e` (T-003's claim).

**What it cost the agent, which was the point.** The agent holds
`TemporalApprovals` — ask and read — and a reviewer holds `ApprovalDesk`. The
approval store's `put` is gone, so there is no path by which the party that
wants a refund can record that somebody granted it; `InMemoryApprovalStore`,
`PostgresApprovalStore`, both escalation stores, the two `agent_state` tables
and `sweep` are deleted rather than wrapped. A granted refund is carried out by
the workflow the moment it is granted, under a `support-approvals` login whose
token carries `orders:read` and no `refunds:write`; the order system reads whose
the call is from the approval it names, so nothing the caller asserts is used.

**What the simulator found.** Making the lapse real broke two things that had
been passing for the wrong reason, and both were AgentTwin being right: an
approver or a desk that arrives *too late* never arrived at all, because a queue
that drops an expired item leaves nothing to refuse — they now keep hold of what
they have seen; and two scenarios with a desk ran on the default hour a turn,
which the scenario format's own warning says lapses a thirty-minute window
before a colleague can look.

**Done when — met.** A restart during an hour-long approval resumes it, twice
over: the worker restarts in `tests/test_approvals.py`, and the composed
Temporal container itself restarts in `tests/test_temporal_live.py`, after which
the same approval is still queued, is granted, and produces exactly one refund.
The approval and escalation scenarios pass unchanged except for the two clock
declarations above. `stacks/open-stack.yaml` moves `workflow` and `approval` to
`x_status: current`.



**Carried from T-002.** The order system now loads the approval named in a refund call and checks it (`src/order_system`). That check is only as independent as the approvals store, and today the agent writes that store and grants small refunds by its own policy. Moving approvals here must also take them out of the agent's write access, and the far end's lookup must follow them.

**What.** The approval and escalation waits become Temporal workflows: raise,
wait for a signal, act, expire. T-003 lists what this subsumes: `trigger`
(run-once semantics), `state`'s resume half, and `approvals`' long wait that
survives a restart. `PREFERRED-STACK.md` already argued the split: **the chat turn
stays in our loop, and the wait goes on Temporal**, because durability is worth
its cost exactly where work spans time.

**The delta that stays ours.** What needs a human, what a stale approval means
(`PRODUCTION-STACK.md` L14), no self-approval, and the stored key that makes a
double grant refund once.

**Done when.** A restart during an hour-long approval resumes it; the approval
and escalation scenarios pass unchanged; the modules Temporal subsumes are
deleted rather than wrapped; `stacks/open-stack.yaml` moves `workflow` and
`approval` to `x_status: current`.


### T-009 · Seven capabilities are believed met and named by no test

**Status** **Done 2026-09-16.** Five were already proved by tests that did not
name them and are tagged now: AHC-0002, 0004, 0010, 0020, 0036 (AHC 50 → 55/72).
**Two were not met.** AHC-0006 and AHC-0026 hold inside the process and stop at
its edge — no `traceparent` goes into a tool call's `_meta`, and a read carries
no run id at all. Both moved to `accepted_gaps` with the fix named;
`x_untested` is empty. That is the finding this item was for: had T-008 run
first, a regeneration with no propagation would have looked like a match.

**What is missing.** Seven `discharges` tags. `harness-profile.yaml` lists them
under `x_untested`, deliberately separated from `accepted_gaps` because the two
are different claims and this is the weaker one:

    AHC-0002  context assembly is one function, and it is inspectable
    AHC-0004  the choke point exists; the import contract is tested, the claim is not tagged
    AHC-0006  spans carry the run id across the hops
    AHC-0010  `Agent.handle` is the entrypoint scenarios drive
    AHC-0020  the fan-out limiter is bounded by the harness
    AHC-0026  the run id spans the unit of work
    AHC-0036  every tool declares an argument contract, validated at dispatch

**Why it matters.** Several are almost certainly already exercised by a test that
simply does not name them — AHC-0010 in particular, since every scenario drives
`Agent.handle`. That makes this cheap. It also makes it easy to leave, which is
why it has sat.

The cost of leaving it is stated in the architecture review: these are where a
regeneration will disappoint, *because nothing would notice if one quietly went
missing.* Until each has a test naming it, "the regeneration matched" and "the
regeneration dropped a capability we never checked" are the same observation.

**Where it would land.** Existing tests, mostly — find the test that already
proves each and add the tag. Where none exists, the gap is real and worth
knowing about before T-008 runs rather than after.

### T-011 · Write the hotel AOAS and nothing else

**Status** **Done 2026-09-16.** `clean-ai-engineering/drafts/examples/support-agent-hotel.aoas.yaml`
and its extraction record. It validates; nine of thirteen sections carried
unchanged; four things resisted and a fifth turned up separately from T-012's
citation work — the AOAS has normative blocks with **no identifier**, so a file
cannot cite what governs it. Do not fix the five until T-013 adds its set, or the
format gets fitted to hotels.

**What is missing.** Evidence that the specification set is *complete* — that
everything a second agent must change has somewhere to be said. Not evidence
that a regeneration works; that is T-008 and it is expensive. This is the cheap
falsifiable version, and it can be run without generating a line of code.

**The measurement this rests on.** `evals/reuse.py` already classifies every
module for exactly this question, and the numbers as of 2026-09-16:

    mechanism       46 files   7865 lines   77.2%   a second agent keeps the file
    parameterised    9 files   1663 lines   16.3%   keeps the code, replaces the values
    per-agent        5 files    662 lines    6.5%   writes its own

So roughly 94% of this code survives a change of domain. The five rewritten are
`contracts/domain.py`, `entrypoint/direct.py`, `approvals/refund.py`,
`escalation/wording.py`, `ui/__init__.py`.

**The exercise.** Take those five, plus the nine parameterised modules —
`router`, `approvals/policy`, `escalation/rules`, `policy`, `binding`, `config`,
`approvals`, `entrypoint/promise`, `telemetry/contract` — and write the AOAS for
a hotel support agent. Only the AOAS. Then ask, item by item: **does the format
have a place to say this?**

Where it does, that value is spec-supplied and the thesis holds for that piece.
Where it does not, a hole in AOAS has been found for the price of a day.

**Why the parameterised layer is the real subject.** Its own docstring calls it
the dangerous one: *universal code, this agent's values… a bug in the values
reads as a bug in the mechanism.* The per-agent five are obviously per-agent and
nobody will forget them. The nine are the ones that look shared and are not, and
they are where an incomplete AOAS does its damage quietly — a regenerated agent
inherits `router/__init__.py`'s shape and this agent's regexes, and passes
review.

**What this does not test**, stated so the result is not over-read: it says
nothing about whether the 77% mechanism layer would be *reproduced*. That layer
is the part no specification describes structurally — AHC constrains that a
provider choke point exists, not that it is a Protocol in the bottom layer that
adapters satisfy without importing. That gap is T-010, and this exercise is the
argument for it rather than a substitute.

**And the artifact this leans on is thin.** `evals/reuse.py` is a hand-maintained
list of filenames. Its one safeguard is that a module with no layer fails the
test, so the classification cannot rot silently — but the layer assignments
themselves are judgement, recorded once, by one reader. If the thesis rests on
that split, the split deserves more than a list.

### T-012 · Trace every mechanism file back to a spec statement

**Status** **Done 2026-09-16** — `docs/WHY-EACH-FILE.md`, with a coverage test.
The three follow-ups it produced are listed at the end of that document; the one
that changes another item is that T-010's premise was wrong in size.

**What is missing.** A reason, per file, for the 77%. `evals/reuse.py` says 46
files and 7865 lines are mechanism — the part a second agent keeps. Nothing says
*why each one has to exist*. Until that is written down, "the specs are
sufficient" is a claim about the part of the codebase nobody has justified.

**The exercise.** For each of the 46 mechanism files, answer one question: **which
spec statement requires this file to exist?** Cite it — an AHC capability, an AAC
obligation, an AOAS statement. Three outcomes and all are useful:

*A statement names it.* Good. That file is spec-supplied.
*No statement names it and the file is load-bearing.* A hole in the spec set, found
for the price of reading.
*No statement names it and nobody can say what breaks without it.* A candidate for
deletion, which is the cheaper finding.

**Why before T-011 and T-013.** Those test the 22% that is already best covered —
the values and the domain. This attacks the 77% that no specification describes
structurally, which is where the thesis is weakest and where T-010's argument
either holds or does not.

**Expect the answer to be uncomfortable.** `loop/freshness.py` traces to AHC-0107
cleanly. `entrypoint/persist.py` exists because three call sites once wrote the
conversation and none capped it — a defect, not a statement. Files in the second
category are the interesting ones: the codebase knows something the catalogs do
not say.
