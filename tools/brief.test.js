/*
 * The brief, and the one property it has to keep.
 *
 * Most of what `brief.js` does is assembly, and assembly either runs or it does
 * not. The row that earns its place is the leak check: the brief is the input
 * to a test of whether the specs are sufficient, and a brief that describes an
 * existing implementation makes the generated agent match for a reason the
 * specs cannot claim. That property is worth a test with cases, because it is
 * the one somebody will erode by accident while making the brief clearer.
 */
"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { brief, leaks, owed, scrub, allowedNames } = require("./brief");

const AHC = path.resolve(__dirname, "../../ai-harness-catalog");
const haveCatalog = fs.existsSync(path.join(AHC, "capabilities"));

const AOAS = {
  agent: { id: "worked-example", version: "0.1.0" },
  purpose: {
    serves: "A signed-in customer.",
    does: ["order status"],
    refuses: [{ id: "R-X", what: "negotiating price" }],
    deferred: [{ intent: "exchange_request", source: "doc 24" }, { operation: "hold_order" }],
  },
  entities: { order: { key: "id" } },
  operations: { get_order: { side_effect: "read" } },
};

const PROFILE = {
  subject: { name: "worked", archetypes: ["A6"] },
  catalog: { ahc: "0.3.0" },
  harness: { loop: { owner: "in-house", adapter: "some-loop" } },
  decisions: { "AHC-0001/parse_failure": { value: "fail-typed", source: "chosen" } },
  thresholds: { max_steps: 8 },
  bindings: { model: { approach: "gateway", adapter: "a-gateway" } },
  accepted_gaps: [],
};

function build(over = {}) {
  return brief({
    aoas: AOAS,
    profile: PROFILE,
    caps: [{ id: "AHC-0002", layers: ["L1"] }],
    obs: [{ id: "AAC-0001", dimension: "correctness" }],
    aoasPath: "drafts/examples/worked.aoas.yaml",
    profilePath: "../somewhere/harness-profile.yaml",
    ...over,
  });
}

// [what the text contains, must it be rejected]
const LEAK_CASES = [
  ["a bound product's name", "the eval_task port is bound to agenttwin", false],
  // Generation run 2 (NOTES §1) was pointed at this path and told not to open
  // it. The brief resolves the profile in full; the path is only a temptation.
  ["a path to the reference's profile", "../reference-agent/harness-profile.yaml", true],
  ["the word contracts on its own", "the contracts it must honour", false],
  ["a source directory", "put the loop in src/loop/", true],
  ["a package name from the reference", "support_agent.tools does the gating", true],
  ["a module path from the reference", "see contracts/protocols for the seams", true],
  ["the entrypoint module", "entrypoint holds the turn", true],
  ["an architectural style, named", "use ports and adapters throughout", true],
  ["the same style, spelled differently", "a Hexagonal layout is expected", true],
  // Each of these was in the brief generation run 2 read (NOTES §1).
  ["a class name from the reference", "`LLMClient` is this system's shape", true],
  ["an exception class from the reference", "ModelMalformed is its own type", true],
  ["the reference's import rule", "only `llm` may import a provider SDK", true],
  ["the reference's import checker", "lint-imports fails the build", true],
  ["a module attribute", "`context.assembled` orders for cache friendliness", true],
  ["a finding id from the reference's tracker", "asserted so it cannot drift (F-015)", true],
  ["a TODO id from the reference's tracker", "written down as the resolution asks (T-029)", true],
  ["a roadmap id", "sequenced with the scenarios (TODO G0.11)", true],
  ["a capability id is not a tracker id", "the grant is carried (AHC-0057)", false],
  ["a product a port may name", "the world format is AgentTwin's", false],
  ["an AOAS entity's field", "the amount is `order.total`", false],
  ["a profile key", "the keys are the stack's (`tool_runtime.x_meta`)", false],
];

for (const [name, text, rejected] of LEAK_CASES) {
  test(`leak check: ${name}`, () => {
    assert.equal(leaks(text, { allow: ["order"] }).length > 0, rejected, text);
  });
}

// [what the note says, what the brief may show of it]
const SCRUB_CASES = [
  ["a citation-only parenthesis is cut", "The split, written down as the resolution asks (T-029, 2026-09-16).", "The split, written down as the resolution asks."],
  ["an id inside a parenthesis with words keeps the words", "the breaker (they are the seam faults go through, F-029), and cost.", "the breaker (they are the seam faults go through), and cost."],
  ["a sentence naming a symbol is dropped, the rest kept", "ModelMalformed is its own type. A retry buys a second bill.", "A retry buys a second bill."],
  ["a note that is only implementation leaves nothing", "Only `llm` may import a provider SDK.", ""],
  ["a bare roadmap id is cut", "The wrong instrument. TODO G0.11.", "The wrong instrument."],
  ["a clean note is untouched", "One tenant, one list, checked at startup.", "One tenant, one list, checked at startup."],
];
for (const [name, note, shown] of SCRUB_CASES) {
  test(`scrub: ${name}`, () => {
    assert.equal(scrub(note), shown);
  });
}

test("the assembled brief itself does not leak", () => {
  assert.deepEqual(leaks(build(), { allow: allowedNames(AOAS) }), []);
});

test("it says what the agent is for, in the spec's own words", () => {
  const text = build();
  assert.match(text, /A signed-in customer\./);
  assert.match(text, /\*\*R-X\*\* — negotiating price/);
  // Deferred entries name an intent or an operation and used to render as raw
  // JSON, which is the spec's content and unreadable.
  assert.match(text, /`exchange_request` \(intent\) — doc 24/);
  assert.match(text, /`hold_order` \(operation\)/);
});

test("it carries the stack, the numbers and the decisions", () => {
  const text = build();
  assert.match(text, /\| `model` \| gateway \| `a-gateway` \|/);
  assert.match(text, /\| `max_steps` \| 8 \|/);
  assert.match(text, /`AHC-0001\/parse_failure`.*fail-typed/);
  assert.match(text, /owned by `in-house`/);
});

// Generation run 1 (2026-09-25) built from a brief that owed A6 where the AOAS
// said A6 + A5, listed five obligations the AOAS excludes, and dropped the wire
// contract the profile's x_ fields held. Each row is one of those.
test("the shapes owed are the union of the AOAS's and the profile's, and a mismatch is said", () => {
  const text = build({ aoas: { ...AOAS, conformance: { archetypes: ["A6", "A5"] } } });
  assert.match(text, /declares itself \*\*A6, A5\*\*/);
  assert.match(text, /The AOAS declares A6, A5 and the profile A6; this brief owes the union/);
});

test("obligations the AOAS excludes are listed with their reasons, not owed", () => {
  const aoas = { ...AOAS, conformance: { aac: { version: "0.12", excluded: [
    { id: "AAC-0007", reason: "latency is undeclared", revisit_when: "a latency property is declared" }] } } };
  const text = build({ aoas, obs: [{ id: "AAC-0001", dimension: "correctness" }, { id: "AAC-0007", dimension: "latency" }] });
  assert.match(text, /\*\*1 obligations\.\*\*/);
  assert.doesNotMatch(text, /\| \*\*latency\*\* \|/);
  assert.match(text, /\*\*AAC-0007\*\* — latency is undeclared \*\(revisit when a latency property is declared\)\*/);
});

test("the wire contract is rendered, and commentary x_ fields are not", () => {
  const profile = { ...PROFILE, bindings: { tool_runtime: { approach: "open-source", adapter: "mcp-client",
    x_meta: { "aoas/session": { carries: "{token}" } }, x_scopes: { cancel_order: "orders:write" },
    x_note: "a history nobody building from scratch should read" } } };
  const text = build({ profile });
  assert.match(text, /`tool_runtime\.x_meta`/);
  assert.match(text, /aoas\/session:/);
  assert.match(text, /cancel_order: orders:write/);
  assert.doesNotMatch(text, /a history nobody/);
});

test("the profile row says section 4 is complete, and does not say where the profile is", () => {
  const text = build();
  assert.match(text, /section 4 below, resolved in full from/);
  assert.doesNotMatch(text, /somewhere\/harness-profile\.yaml/);
});

// Generation run 2 (NOTES §1, §5). Each row: what the profile holds, what the
// brief must then say.
const RUN2_CASES = [
  ["a decision a capability raises and the profile leaves open is shown as open",
    { caps: [{ id: "AHC-0107", layers: ["L3"], design_decisions: [{ key: "freshness_scope", question: "Which facts need a window?" }] }] },
    /`AHC-0107\/freshness_scope`\*\* — \*unanswered\.\* Which facts need a window\?/],
  ["an answered decision is not listed as open",
    { caps: [{ id: "AHC-0001", layers: ["L6"], design_decisions: [{ key: "parse_failure", question: "q" }] }] },
    /every keyed decision the owed capabilities raise is answered/],
  ["a reference gap is shown as that build's, to be argued again",
    { profile: { ...PROFILE, accepted_gaps: [{ capability: "AHC-0015", reason: "No streaming.", owner: "reference-agent", review: "2026-12-01" }] } },
    /They are that build's, not yours\.[\s\S]*\*\*AHC-0015\*\* — No streaming\. \*\(reference-agent, review 2026-12-01\)\*/],
  ["a model binding with no pin says so",
    {}, /\*\*The model pin\.\*\* _None is declared/],
  ["a pinned model is rendered with the wire contract",
    { profile: { ...PROFILE, bindings: { model: { approach: "gateway", adapter: "a-gateway", x_model: { id: "some-model", usd_per_mtok_in: 0.15 } } } } },
    /`model\.x_model`[\s\S]*id: some-model/],
  ["the builder is told to write the world", {}, /No world ships with this brief\.\*\* You write one/],
];
for (const [name, over, expected] of RUN2_CASES) {
  test(name, () => {
    assert.match(build(over), expected);
  });
}

test("model access is stated as a prerequisite", () => {
  assert.match(build(), /Have a key for the model route in section 4 before starting/);
});

test("an empty gap list is stated as a claim, not left blank", () => {
  assert.match(build(), /An empty list is a claim, not an absence/);
});

test("it refuses to tell the builder how to lay the code out", () => {
  const text = build();
  // The experiment is whether the capabilities imply a structure. A brief that
  // supplies one answers the question it was meant to ask.
  assert.match(text, /Nothing here tells you how to structure the code/);
  assert.doesNotMatch(text, /\bdirectory\b|\bmodule layout\b|\bpackage structure\b/i);
});

test("what it owes comes from the declared shapes and nothing else", { skip: !haveCatalog }, () => {
  const a6 = owed(path.join(AHC, "capabilities"), ["A6"]);
  const a1 = owed(path.join(AHC, "capabilities"), ["A1"]);
  assert.ok(a6.length > a1.length, "a tool-using agent owes more than a single-call one");
  // Core capabilities are owed by every shape, so the smaller set is a subset.
  const a6ids = new Set(a6.map((c) => c.id));
  const core = a1.filter((c) => c.core).map((c) => c.id);
  assert.ok(core.every((id) => a6ids.has(id)), "core capabilities are owed by both");
});
