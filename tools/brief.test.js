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
const { brief, leaks, owed } = require("./brief");

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
  ["a path to the profile, which is an input", "../reference-agent/harness-profile.yaml", false],
  ["the word contracts on its own", "the contracts it must honour", false],
  ["a source directory", "put the loop in src/loop/", true],
  ["a package name from the reference", "support_agent.tools does the gating", true],
  ["a module path from the reference", "see contracts/protocols for the seams", true],
  ["the entrypoint module", "entrypoint holds the turn", true],
  ["an architectural style, named", "use ports and adapters throughout", true],
  ["the same style, spelled differently", "a Hexagonal layout is expected", true],
];

for (const [name, text, rejected] of LEAK_CASES) {
  test(`leak check: ${name}`, () => {
    assert.equal(leaks(text).length > 0, rejected, text);
  });
}

test("the assembled brief itself does not leak", () => {
  assert.deepEqual(leaks(build()), []);
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

test("the profile row says section 4 is complete, so nobody needs to open the profile", () => {
  assert.match(build(), /section 4 below, resolved in full from/);
});

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
