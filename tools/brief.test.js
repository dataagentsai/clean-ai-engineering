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
