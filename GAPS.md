# Catalog gap register

Every gap found in the harness and assurance catalogs by review on
11 September 2026 — five audits: the five named concerns, ISO/IEC 25010 and
cross-cutting concerns, the twenty harness categories, context engineering, and
reasoning. **This is a register, not a work queue.** A gap becomes work when an
agent hits it: the support agent's hits are found by G0.1's Assurance Map and
done in G0.6; the hotel agent's in G2; the rest wait here, owned and dated.

**Rules for filling any of them.** Lifted from something that runs where one
exists, never from an armchair. AHC and AAC are filled **in pairs** — each
capability lands with the obligations that verify it. Every addition passes the
domain-noun test. Where an agent does not need a gap, its AOAS says so as an
**exclusion with a `revisit_when`**, not by silence.

---

## 1 · The five named concerns

Found by review question R-019 in the reference. **In every one of these areas
the reference agent is ahead of the catalog** — it has the component, and no
capability requires it — except where marked *(both)*, which neither has.

- **Human escalation** — the conversation's owner while escalated (the model
  locked out until a person releases it); a queue with a bounded wait and a
  declared lapse; what the customer is told on raising and while waiting;
  `escalated` as a terminal outcome; caps and cooldowns; a recorded
  over-escalation rate.
- **Context bloat** — tool-call and tool-result pairs never orphaned by
  trimming; a declared compaction trigger; a size bound on the stored
  transcript. Compaction by summary *(both)*.
- **Error handling** — a circuit breaker; unrecoverable errors terminate
  rather than feed back as an observation; *(both)* one error taxonomy shared
  by the layers, and a map from each terminal state to what the user sees.
- **Structured output** — every tool declares and is held to a result schema;
  *(both)* a declared policy for malformed output — repair, retry, or fail typed.
- **Deterministic-first** — a rule-based intent router ahead of the model; a
  request with a deterministic answer never reaches the model; the cost of the
  deterministic path recorded beside the model path's.

## 2 · Quality characteristics and cross-cutting concerns

ISO/IEC 25010:2023 and twenty-six cross-cutting concerns, including caching,
memory, cost and token usage; all 98 capabilities read, most rows covered.
Ranked by what a regenerated agent would lose:

1. **Action-claim binding** — a statement that an action happened is checked
   against that action's recorded outcome. No capability discharges AAC-0110.
2. **Egress allowlist** — destinations reachable by tools, and by links or images
   in output, enforced outside the model.
3. **Cache keys include the resolved configuration** — otherwise a rollback is
   incomplete while caches serve the old model's answers.
4. **Retention and erasure across derived artifacts** — memory, summaries,
   checkpoints, fixtures, dataset rows. Nothing behind AAC-0095's retention half.
5. **Behavioural canary** — the Baseline's own delta row, answered by nothing.
6. **Tool-definition provenance and version** — descriptions are prompt text that
   can change remotely.
7. **Streamed-output screening** — AAC-0092 has nothing real to verify.
8. **Per-caller token and spend quota** — today only a design decision.
9. **Recalled memory fenced as untrusted and recorded per recall.**
10. **Prefix caching and token classes** — cached, uncached and reasoning tokens
    priced apart.

Also partial: most caching rows (prompt caching and invalidation on a version
change are outright gaps), memory erasure that does not reach summaries or
checkpoints, and versioning that omits the tool-definition text.

## 3 · The twenty harness categories

Most map to existing layers. New:

11. **Clarification as a typed outcome** — the run suspends awaiting the user's
    answer, distinct from escalation and from refusal.
12. **A model-produced plan is a typed, recorded artifact, validated before any
    step executes.** AHC-0072 covers declared topologies, not plans the model
    writes at run time.
13. **In-flight runs survive shutdown and upgrade** — every run is completed,
    checkpointed or visibly failed, never half-executed; a resumed run continues
    under the configuration it started with, or records the switch. Services
    drain in seconds; agent runs hold irreversible steps for minutes.
14. **Learned procedures are configuration** — anything the system writes that
    later instructs it (procedural memory, self-edited prompts) passes the same
    release gate as a prompt change. Episodic and semantic memory already map
    to sessions, compaction and the retrieval corpus.
15. **An agent manifest** — name, version, owner, lifecycle state and advertised
    capabilities. Partly in the harness profile's `subject`; owner and lifecycle
    are missing, and a multi-agent system needs it for discovery.
## 4 · Context engineering

AHC treats context as a *size* problem. **Context rot is a quality problem that
starts long before the limit** — stale facts, a goal buried under turns, failed
attempts re-read and repeated. The strong rows are assembly, fencing, secrets,
retrieval and observability.

16. **Freshness of facts in context.** A fact read from the world carries the
    time it was read; the AOAS declares how long each field stays fresh; a
    stale fact is re-read before an irreversible action relies on it. F-002 — a
    stale read became a false confirmation — is this, and today it is caught
    only after the fact by a guardrail.
17. **Act before the context is full.** A soft threshold with headroom, and the
    compaction rules as requirements: never move the stable prefix, whole
    exchanges only, anchor the goal and the last *n* turns. They exist only in
    the reference's own design doc (`docs/CONTEXT-BUDGET.html`).
18. **A summary inherits the least-trusted provenance of what it summarised.**
    Today a design question in AHC-0045 and a docstring in the reference.
19. **A structured facts record beside the transcript** — goal, entities in
    play, actions taken, what is pending. It resists rot, it is free, and it is
    the source the escalation handoff should be built from. Missing in both;
    the reference's `TurnNote` is its seed.
20. **Environmental facts are rendered by the harness and recorded** — time,
    locale, tenant, permissions — never inferred by the model, and captured so
    a run that saw "today" can be replayed.
21. **Segment priority is declared**, not left to a design question — what is
    pinned, what goes first.
22. **The budget's ruler is stated.** Provider tokens, or a declared
    approximation and its error: the reference counts characters because its
    provider has no token counter, which is a fair proxy for prose and a poor
    one for JSON.
23. **The tool surface is scoped to the request and stable in order** — what
    the model is offered follows identity and state, and does not reshuffle
    between calls (every reshuffle invalidates the cached prefix).
24. **Rot is measured.** Quality sliced by context-length bucket — a segment
    label (AHC-0090) and an obligation — or degradation with length is
    invisible.
## 5 · Reasoning

Reasoning techniques are the model's, and they rot fastest; AHC is right to
prescribe none. What each technique needs *around* it is a component, and most
exist — budgets outside the model (AHC-0041), no-progress detection (0042),
bounded depth and fan-out (0048, 0097), the judge as a versioned component
(0081–0084), typed uncertain verdicts (0082), abstention (0063). Planning (12),
clarification (11) and verification of claims (1) cover most of the rest.

25. **An aggregation rule is declared and recorded** wherever several model
    outputs are combined — votes, debate, consensus, tree-of-thought branch
    selection — with its tie-break, so the combined answer is reproducible from
    the parts.
26. **Reasoning tokens are budgeted and accounted apart** — a thinking budget
    is a cost and latency control, and folds into item 10's token classes.

**Deliberately not capabilities:** topologies (supervisor–worker, swarm,
planner–executor), reasoning techniques (reflection, self-critique, consensus)
and plugin mechanisms. They are patterns and realisations — the first two go to
the pattern library (TODO G0.7), the third to the binding.

## 6 · Bookkeeping

- AHC-0042 should discharge AAC-0109; AAC-0110 has no capability at all (gap 1).
- AAC-0096 asks for more cache-key dimensions than AHC-0068 requires.
- AAC-0092 rests on AHC-0015, which is about stream completion, not screening
  (gap 7). AAC-0082 (drift) rests only on AHC-0055, which alerts on silence.

## What the support agent does not need

It does not stream, keeps no cross-session memory and has no response cache, so
gaps 7 and 9 and most caching rows enter its AOAS as exclusions with a
`revisit_when` — not as work.
