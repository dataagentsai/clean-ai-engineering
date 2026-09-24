/*
 * Table-driven. Each row breaks the worked example in exactly one way and
 * names the rule that must catch it. A row asserts WHICH rule fired, not merely
 * that something did — otherwise one rule going quiet is hidden by another
 * that happens to fire on the same mutation.
 *
 * Mutations are chosen to be realistic where possible: the drift that happens
 * when a world is forked, a guard that goes missing, a transport that leaks in.
 */
"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const os = require("os");
const { aoasIssues, loadAoas, mergePatch } = require("./validate-aoas");

const EXAMPLE = yaml.load(
  fs.readFileSync(path.join(__dirname, "../drafts/examples/support-agent.aoas.yaml"), "utf8")
);
const REAL_AAC = new Set(EXAMPLE.conformance.aac.excluded.map((x) => x.id));

const ops = (d) => d.operations;
const sm = (d) => d.state_machines.order_status;
const tr = (d, by) => sm(d).transitions.find((t) => t.by === by);

// [name, rule it must trip (null = must pass), mutate, opts]
const CASES = [
  ["the worked example", null, () => {}],
  ["provenance may name a technology", null, (d) => d.sources.push("src/state/postgres.py")],

  // ---- shape
  ["a required section is missing", "schema", (d) => delete d.purpose],
  ["a side effect outside the three classes", "schema", (d) => (ops(d).get_order.side_effect = "maybe")],
  ["an exclusion with no revisit_when", "schema", (d) => delete d.conformance.aac.excluded[0].revisit_when],
  ["a required property with no evidence", "schema", (d) => delete d.required.properties[0].evidence],
  ["a condition with no operator", "schema", (d) => (ops(d).cancel_order.preconditions[1] = { field: "status" })],

  // ---- names
  ["an operation on an undeclared entity", "unknown-entity", (d) => (ops(d).get_order.entity = "parcel")],
  ["an operation returning an undeclared entity", "unknown-entity", (d) => (ops(d).list_orders.output = "parcel[]")],
  ["a listing nobody scoped to the caller", "unscoped-collection", (d) => (ops(d).list_orders.preconditions = [])],
  ["a write that returns many rows", "unscoped-collection", (d) => (ops(d).list_orders.side_effect = "reversible")],
  ["a system owning an undeclared entity", "unknown-entity", (d) => d.external.order_system.owns.push("shipment")],
  ["a precondition over a misspelt field", "unknown-field", (d) => (ops(d).cancel_order.preconditions[1].field = "state")],
  ["an entity keyed on a field it lacks", "unknown-field", (d) => (d.entities.order.key = "order_id")],
  ["a named condition with a bare field", "unqualified-field", (d) => (d.conditions.owned.field = "customer_id")],
  ["a state that is not in the machine", "enum-value", (d) => (ops(d).cancel_order.preconditions[1].equals = ["pending", "shipping"])],
  ["an effect setting a value the enum cannot hold", "enum-value", (d) => (ops(d).cancel_order.effect.status = "canceled")],
  ["a bool compared with a string", "wrong-type", (d) => (ops(d).open_return_request.preconditions[3].equals = ["false"])],
  ["a refund amount taken from a non-money field", "wrong-type", (d) => (ops(d).issue_refund.amount_from = "order.days_since_delivery")],
  ["the session compared with a field of another entity", "wrong-type", (d) => (d.session.customer_id.ref = "order.id")],
  ["a numeric bound on a bool", "bound-type", (d) => (ops(d).open_return_request.preconditions[3] = { field: "final_sale", at_most: 1 })],
  ["ownership against a session field that does not exist", "unknown-session-field", (d) => (d.conditions.owned.equals_session = "user_id")],
  ["a fact that is typed and never defined", "undefined-fact", (d) => delete d.facts.repeated_intent.derived],
  ["a nested policy statement reusing a policy id", "duplicate-id",
   (d) => (d.policies.approval.statements[0].id = "P-REFUND")],
  ["a request routed to an operation that does not exist", "unknown-operation", (d) => (ops(d).request_refund.routes_to = "refund_now")],
  ["an intent served by an operation that does not exist", "unknown-operation", (d) => (d.intents.cancel.via = ["cancel"])],
  ["a deferred intent the intent set forgot", "unknown-intent", (d) => delete d.intents.damaged_item],
  ["a facet from the wrong concern", "facet-mismatch", (d) => (d.policies["P-OWNERSHIP"].facet = "analysability")],
  ["an escalation rule over a fact nobody keeps", "unknown-fact", (d) => (d.policies.escalation.on_condition[0].when.field = "termination_reason")],
  ["an enum of a machine that does not exist", "unknown-state-machine", (d) => (d.entities.order.fields.status.of = "order_state")],
  ["a transition to a misspelt state", "unknown-state", (d) => (sm(d).transitions[0].to = "confirmd")],
  ["a terminal state that is not a state", "unknown-state", (d) => sm(d).terminal.push("archived")],
  ["a transition credited to a missing operation", "unknown-operation", (d) => (tr(d, "cancel_order").by = "cancel")],
  ["a policy enforced by a missing operation", "unknown-operation", (d) => (d.policies["P-CANCEL"].via = ["cancel"])],
  ["a system exposing a deferred operation", "unknown-operation", (d) => d.external.order_system.operations.push("track_shipment")],
  ["an identity over an input that does not exist", "unknown-input", (d) => (ops(d).cancel_order.identity = "order_number")],
  ["an effect reading an input that does not exist", "unknown-input", (d) => (ops(d).change_address.effect.address = "$new_address")],

  // ---- the state machine against the operations
  ["a way out of a terminal state", "terminal-exit", (d) => sm(d).transitions.push({ from: "refunded", to: "pending", by: "external" })],
  ["an operation making a change only the world may make", "effect-without-transition", (d) => (ops(d).open_return_request.effect = { status: "returned" })],
  ["a transition whose operation no longer makes it", "transition-without-effect", (d) => (ops(d).cancel_order.effect = "the order is cancelled")],
  // The electronics fork: cancellation allowed one state later in the guard,
  // and the machine left behind. Exactly the drift of two files edited apart.
  ["a guard widened and the machine left behind", "precondition-mismatch", (d) => ops(d).cancel_order.preconditions[1].equals.push("picked")],
  // The double-refund guard removed: the guard now admits `refunded`, the
  // machine does not let anything leave it.
  ["the guard against a second refund removed", "precondition-mismatch", (d) => ops(d).issue_refund.preconditions.pop()],

  // ---- discipline
  ["an irreversible operation with no identity", "irreversible-without-identity", (d) => delete ops(d).issue_refund.identity],
  ["an operation both deferred and defined", "deferred-and-defined", (d) => d.purpose.deferred.push({ operation: "cancel_order" })],
  ["two refusals with one id", "duplicate-id", (d) => d.purpose.refuses.push({ id: "R-DISCOUNT", what: "again", concern: "safety" })],
  ["a text trigger and a condition rule sharing an id", "duplicate-id", (d) => (d.policies.escalation.on_request[0].id = "loop-exhausted")],
  ["a transport named in an external contract", "names-technology", (d) => (d.external.order_system.consistency = "reached over MCP; reads can be stale")],
  ["a technology in a field name", "names-technology", (d) => (d.entities.order.fields.postgres_row = { type: "id" })],
  ["an exclusion citing an id the catalog lacks", "unknown-catalog-id",
    (d) => d.conformance.aac.excluded.push({ id: "AAC-9999", reason: "r", revisit_when: "w" }), { aacIds: REAL_AAC }],
];

for (const [name, rule, mutate, opts] of CASES) {
  test(`${rule || "passes"} — ${name}`, () => {
    const doc = structuredClone(EXAMPLE);
    mutate(doc);
    const issues = aoasIssues(doc, opts);
    if (rule === null) {
      assert.deepEqual(issues, []);
      return;
    }
    const rules = issues.map((i) => i.rule);
    assert.ok(rules.includes(rule), `expected [${rule}], got [${rules.join(", ") || "nothing"}]`);
    if (rule !== "schema") assert.ok(!rules.includes("schema"), "the mutation broke the shape, so the semantic rule was never reached");
  });
}

test("every rule is documented, emitted, and exercised", () => {
  const src = fs.readFileSync(path.join(__dirname, "validate-aoas.js"), "utf8");
  const header = src.slice(src.indexOf("Rules,"), src.indexOf("No dependency"));
  const documented = new Set([...header.matchAll(/^ \*   ([a-z-]+) {2,}/gm)].map((m) => m[1]));
  const emitted = new Set([...src.matchAll(/add\("([a-z-]+)"/g)].map((m) => m[1]));
  const exercised = new Set(CASES.map((c) => c[1]).filter(Boolean));

  assert.deepEqual([...documented].sort(), [...emitted].sort(), "the header and the code disagree about the rules");
  const untested = [...documented].filter((r) => !exercised.has(r));
  assert.deepEqual(untested, [], "a rule with no case can go quiet unnoticed");
});

// RFC 7386 Appendix A, row for row. AgentTwin's merge_patch is held to the same
// table, so the two implementations cannot drift apart unnoticed.
const MERGE_PATCH = [
  [{ a: "b" }, { a: "c" }, { a: "c" }],
  [{ a: "b" }, { b: "c" }, { a: "b", b: "c" }],
  [{ a: "b" }, { a: null }, {}],
  [{ a: "b", b: "c" }, { a: null }, { b: "c" }],
  [{ a: ["b"] }, { a: "c" }, { a: "c" }],
  [{ a: "c" }, { a: ["b"] }, { a: ["b"] }],
  [{ a: { b: "c" } }, { a: { b: "d", c: null } }, { a: { b: "d" } }],
  [{ a: [{ b: "c" }] }, { a: [1] }, { a: [1] }],
  [["a", "b"], ["c", "d"], ["c", "d"]],
  [{ a: "b" }, ["c"], ["c"]],
  [{ a: "foo" }, null, null],
  [{ a: "foo" }, "bar", "bar"],
  [{ e: null }, { a: 1 }, { e: null, a: 1 }],
  [[1, 2], { a: "b", c: null }, { a: "b" }],
  [{}, { a: { bb: { ccc: null } } }, { a: { bb: {} } }],
];
for (const [i, [target, patch, expected]] of MERGE_PATCH.entries()) {
  test(`RFC 7386 appendix A, example ${i + 1}`, () => {
    assert.deepEqual(mergePatch(structuredClone(target), patch), expected);
  });
}

// [name, base agent written into the tmp dir, what extends cites, error or null]
const EXTENDS = [
  ["a variant of the right base resolves", "support-agent-clothing@0.1.0", "support-agent-clothing@0.1.0", null],
  ["a variant citing another version fails", "support-agent-clothing@0.2.0", "support-agent-clothing@0.1.0", /is support-agent-clothing@0.2.0/],
  ["a variant citing another agent fails", "someone-else@0.1.0", "support-agent-clothing@0.1.0", /is someone-else@0.1.0/],
];
for (const [name, has, cites, error] of EXTENDS) {
  test(`extends — ${name}`, () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aoas-"));
    const [hid, hver] = has.split("@");
    const [cid, cver] = cites.split("@");
    fs.writeFileSync(path.join(dir, "base.yaml"), yaml.dump({ ...EXAMPLE, agent: { ...EXAMPLE.agent, id: hid, version: hver } }));
    fs.writeFileSync(path.join(dir, "variant.yaml"), yaml.dump({ apiVersion: "aoas/v0", extends: { id: cid, version: cver, path: "base.yaml" }, agent: { id: "variant" } }));
    const load = () => loadAoas(path.join(dir, "variant.yaml"));
    if (error) { assert.throws(load, error); return; }
    const doc = load();
    assert.equal(doc.agent.id, "variant");
    assert.equal(doc.agent.version, hver, "an unpatched field is inherited");
    assert.deepEqual(aoasIssues(doc, {}), []);
  });
}

test("the electronics variant resolves and validates", () => {
  const doc = loadAoas(path.join(__dirname, "../drafts/examples/support-agent-electronics.aoas.yaml"));
  assert.equal(doc.operations.open_return_request.preconditions[2].at_most, 14);
  assert.equal(doc.operations.issue_refund.owed_when, undefined, "null in a merge patch deletes the inherited obligation");
  assert.deepEqual(doc.operations.issue_refund.preconditions, EXAMPLE.operations.issue_refund.preconditions, "and leaves the rest of the operation inherited");
  assert.deepEqual(aoasIssues(doc, {}), []);
});
