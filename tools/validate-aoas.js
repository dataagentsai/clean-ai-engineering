#!/usr/bin/env node
/*
 * AOAS validator. The schema checks shape; this checks what a schema cannot.
 *
 * Every rule below exists because an agent spec can be well-formed and still
 * say something that cannot be true — a precondition over a field nobody
 * declared, a state no operation reaches, a policy a generator will read as
 * enforced when nothing enforces it. A spec handed to a generator is only as
 * good as the contradictions it has been checked for, and a contradiction
 * found here is one that never has to be found in a regeneration cycle.
 *
 * Rules, each with a table-driven case in validate-aoas.test.js:
 *
 *   schema                         the document fails aoas.schema.json
 *   unknown-entity                 names an entity that is not declared
 *   unknown-field                  names a field its entity does not declare
 *   unqualified-field              a condition with no entity of its own says `x`, not `entity.x`
 *   enum-value                     compares or sets an enum to a value it cannot hold
 *   wrong-type                     compares a field in a way its type does not allow
 *   bound-type                     a numeric bound on a field that is not a number
 *   unknown-session-field          `equals_session` names nothing the session declares
 *   unknown-fact                   an escalation rule reads a fact nobody maintains
 *   undefined-fact                 a fact is typed and never says what computes it
 *   unknown-state-machine          an enum is `of` a machine that does not exist
 *   unknown-state                  a transition or terminal names a state not in the machine
 *   unknown-operation              a transition, policy, system, intent or route names a missing operation
 *   unknown-intent                 a deferred intent is missing from a declared intent set
 *   unknown-input                  an identity or effect names an input the operation lacks
 *   unscoped-collection            a read of many rows (`output: entity[]`) is not scoped to the caller
 *   terminal-exit                  a transition leaves a terminal state
 *   effect-without-transition      an operation sets a state no transition allows it to
 *   transition-without-effect      a transition credits an operation that does not make it
 *   precondition-mismatch          an operation's guard and its transitions disagree on where it may start
 *   irreversible-without-identity  an irreversible operation never says what "the same request" is
 *   deferred-and-defined           an operation is both deferred and defined
 *   duplicate-id                   two statements share an identifier
 *   names-technology               the spec names a realisation — charter §2, question 3
 *   unknown-catalog-id             an exclusion cites a catalog identifier that does not exist
 *   facet-mismatch                 a facet that is not a sub-characteristic of the concern beside it
 *
 * No dependency beyond a YAML parser and a schema validator, deliberately: the
 * format has to be checkable by tooling nobody here wrote.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const Ajv = require("ajv/dist/2020");

const ROOT = path.join(__dirname, "..");
const SCHEMA = JSON.parse(fs.readFileSync(path.join(ROOT, "drafts/aoas.schema.json"), "utf8"));
const validateSchema = new Ajv({ allErrors: true, strict: false }).compile(SCHEMA);

const NUMERIC = new Set(["int", "number", "money"]);
const ANY_EXCEPT_TERMINAL = "any_except_terminal";

/*
 * Realisations. If a statement names one of these it is a binding, however much
 * it feels like domain work — charter §2, question 3. Word-boundary matched and
 * deliberately short of ordinary English: `temporal` and `lambda` are words
 * before they are products, and a check that fires on prose gets switched off.
 */
const TECHNOLOGY = [
  "mcp", "model context protocol", "grpc", "graphql", "rest api", "http", "https",
  "webhook", "kafka", "rabbitmq", "otlp", "opentelemetry", "jwt", "oauth", "sql",
  "postgres", "postgresql", "mysql", "redis", "mongodb", "dynamodb", "s3",
  "kubernetes", "docker", "langfuse", "langsmith", "langchain", "langgraph",
  "llamaindex", "openai", "anthropic", "claude", "gpt", "gemini", "llama",
  "mistral", "groq", "bedrock", "azure", "aws", "gcp", "pydantic", "fastapi",
  "pytest", "promptfoo", "deepeval", "ragas", "litellm", "crewai", "autogen",
];
const TECH_RE = new RegExp(`\\b(${TECHNOLOGY.map((t) => t.replace(/ /g, "\\s+")).join("|")})\\b`, "i");

function aoasIssues(doc, opts = {}) {
  const issues = [];
  const add = (rule, at, message) => issues.push({ rule, at, message });

  if (!validateSchema(doc)) {
    for (const e of validateSchema.errors) add("schema", e.instancePath || "/", e.message);
    return issues; // semantic checks assume the shape holds
  }

  const entities = doc.entities;
  const machines = doc.state_machines || {};
  const operations = doc.operations;
  const session = doc.session || {};
  const facts = doc.facts || {};

  // ---------------------------------------------------------------- fields
  function resolve(ref, entityName, at) {
    const parts = ref.split(".");
    let ent = entityName;
    let name = ref;
    if (parts.length === 2) [ent, name] = parts;
    else if (!ent) { add("unqualified-field", at, `"${ref}" has no entity to belong to — write entity.${ref}`); return null; }
    if (!entities[ent]) { add("unknown-entity", at, `"${ent}" is not a declared entity`); return null; }
    const def = entities[ent].fields[name];
    if (!def) { add("unknown-field", at, `${ent} declares no field "${name}"`); return null; }
    return def;
  }

  function enumValues(def, at) {
    if (def.values) return def.values;
    if (def.of) {
      if (!machines[def.of]) { add("unknown-state-machine", at, `no state machine "${def.of}"`); return null; }
      return machines[def.of].states;
    }
    return null;
  }

  function checkValue(def, value, at, verb) {
    if (def.type === "enum") {
      const vals = enumValues(def, at);
      if (vals && !vals.includes(value)) add("enum-value", at, `${verb} ${JSON.stringify(value)}, which is not one of [${vals.join(", ")}]`);
    } else if (def.type === "bool" && typeof value !== "boolean") {
      add("wrong-type", at, `${verb} ${JSON.stringify(value)} on a bool`);
    }
  }

  // ------------------------------------------------------------ conditions
  function checkCondition(c, at, ctx) {
    let def;
    if (ctx.facts) {
      def = facts[c.field];
      if (!def) { add("unknown-fact", at, `no declared fact "${c.field}" — a rule over it would never fire`); return; }
    } else {
      def = resolve(c.field, ctx.entity, at);
      if (!def) return;
    }
    for (const op of ["equals", "not_equals"]) {
      for (const v of c[op] || []) checkValue(def, v, at, `compares ${c.field} with`);
    }
    for (const b of ["at_least", "at_most"]) {
      if (b in c && !NUMERIC.has(def.type)) add("bound-type", at, `${b} on ${c.field}, which is ${def.type}`);
    }
    if ("equals_session" in c) {
      const s = session[c.equals_session];
      if (!s) add("unknown-session-field", at, `the session declares no "${c.equals_session}"`);
      else if (s.ref && def.ref && s.ref !== def.ref) {
        add("wrong-type", at, `${c.field} refers to ${def.ref} but session.${c.equals_session} refers to ${s.ref}`);
      }
    }
  }
  const checkConditions = (list, at, ctx) => (list || []).forEach((c, i) => checkCondition(c, `${at}[${i}]`, ctx));

  // -------------------------------------------------------------- entities
  for (const [en, e] of Object.entries(entities)) {
    if (!e.fields[e.key]) add("unknown-field", `entities.${en}.key`, `key "${e.key}" is not a field of ${en}`);
    for (const [fn, f] of Object.entries(e.fields)) {
      const at = `entities.${en}.fields.${fn}`;
      if (f.ref) resolve(f.ref, null, `${at}.ref`);
      if (f.of) enumValues(f, at);
    }
    (e.invariants || []).forEach((inv, i) => {
      checkCondition(inv.when, `entities.${en}.invariants[${i}].when`, { entity: en });
      checkCondition(inv.then, `entities.${en}.invariants[${i}].then`, { entity: en });
    });
  }
  for (const [sn, s] of Object.entries(session)) if (s.ref) resolve(s.ref, null, `session.${sn}.ref`);
  for (const [cn, c] of Object.entries(doc.conditions || {})) checkCondition(c, `conditions.${cn}`, {});

  // ------------------------------------------------------------ operations
  for (const [on, op] of Object.entries(operations)) {
    const at = `operations.${on}`;
    if (!entities[op.entity]) { add("unknown-entity", `${at}.entity`, `"${op.entity}" is not a declared entity`); continue; }
    const ctx = { entity: op.entity };
    checkConditions(op.preconditions, `${at}.preconditions`, ctx);
    checkConditions(op.owed_when, `${at}.owed_when`, ctx);
    if (op.authority && op.authority.agent_when) checkConditions(op.authority.agent_when, `${at}.authority.agent_when`, ctx);

    if (op.output !== undefined) {
      const many = op.output.endsWith("[]");
      const ent = many ? op.output.slice(0, -2) : op.output;
      if (!entities[ent]) add("unknown-entity", `${at}.output`, `"${ent}" is not a declared entity`);
      // A read of many rows takes no key, so the only thing between it and every
      // customer's rows is a precondition over the session. Without one it is
      // F-016 again, as a listing (T-001).
      const scoped = (op.preconditions || []).some((c) => c && "equals_session" in c);
      if (many && op.side_effect !== "read") {
        add("unscoped-collection", at, "only a read may return many rows; a write acts on one named row");
      } else if (many && !scoped) {
        add("unscoped-collection", at, "reads many rows and no precondition compares them with the session");
      }
    }
    if (op.side_effect === "irreversible" && op.identity === undefined) {
      add("irreversible-without-identity", at, "irreversible, and never says what makes a repeat the same request");
    }
    for (const id of [].concat(op.identity || [])) {
      if (!op.input.includes(id)) add("unknown-input", `${at}.identity`, `"${id}" is not an input of ${on}`);
    }
    if (op.amount_from) {
      const def = resolve(op.amount_from, null, `${at}.amount_from`);
      if (def && def.type !== "money") add("wrong-type", `${at}.amount_from`, `${op.amount_from} is ${def.type}, not money`);
    }
    if (op.effect && typeof op.effect === "object") {
      for (const [fn, v] of Object.entries(op.effect)) {
        const def = resolve(fn, op.entity, `${at}.effect.${fn}`);
        if (typeof v === "string" && v.startsWith("$")) {
          if (!op.input.includes(v.slice(1))) add("unknown-input", `${at}.effect.${fn}`, `"${v}" is not an input of ${on}`);
        } else if (def) {
          checkValue(def, v, `${at}.effect.${fn}`, "sets");
        }
      }
    }
  }

  // -------------------------------------------------------- state machines
  for (const [mn, m] of Object.entries(machines)) {
    const at = `state_machines.${mn}`;
    const states = new Set(m.states);
    const terminal = new Set(m.terminal || []);
    for (const t of terminal) if (!states.has(t)) add("unknown-state", `${at}.terminal`, `"${t}" is not a state`);

    const fromSet = (t) =>
      t.from === ANY_EXCEPT_TERMINAL ? m.states.filter((s) => !terminal.has(s)) : [].concat(t.from);

    m.transitions.forEach((t, i) => {
      const tat = `${at}.transitions[${i}]`;
      for (const s of fromSet(t)) {
        if (!states.has(s)) add("unknown-state", tat, `from "${s}", which is not a state`);
        else if (terminal.has(s)) add("terminal-exit", tat, `leaves "${s}", which is terminal`);
      }
      if (!states.has(t.to)) add("unknown-state", tat, `to "${t.to}", which is not a state`);
      if (t.by !== "external" && !operations[t.by]) add("unknown-operation", tat, `by "${t.by}", which is not an operation`);
    });

    // The field(s) this machine governs, as entity.field pairs.
    const governed = [];
    for (const [en, e] of Object.entries(entities)) {
      for (const [fn, f] of Object.entries(e.fields)) if (f.of === mn) governed.push([en, fn]);
    }

    for (const [on, op] of Object.entries(operations)) {
      const field = governed.find(([en]) => en === op.entity);
      if (!field) continue;
      const [, fn] = field;
      const mine = m.transitions.filter((t) => t.by === on);
      const sets = op.effect && typeof op.effect === "object" ? op.effect[fn] : undefined;

      if (sets !== undefined && !mine.some((t) => t.to === sets)) {
        add("effect-without-transition", `operations.${on}.effect`, `sets ${fn} to "${sets}", and no transition in ${mn} lets ${on} do that`);
      }
      for (const t of mine) {
        if (sets !== t.to) {
          add("transition-without-effect", `${at}`, `credits ${on} with reaching "${t.to}", and ${on}'s effect does not set ${fn} to it`);
        }
      }

      // Where the guard lets it start, against where the machine says it may.
      if (!mine.length) continue;
      const allowedByMachine = new Set(mine.flatMap(fromSet));
      let allowedByGuard = new Set(m.states);
      for (const c of op.preconditions || []) {
        const unq = c.field === fn || c.field === `${op.entity}.${fn}`;
        if (!unq) continue;
        if (c.equals) allowedByGuard = new Set([...allowedByGuard].filter((s) => c.equals.includes(s)));
        if (c.not_equals) allowedByGuard = new Set([...allowedByGuard].filter((s) => !c.not_equals.includes(s)));
      }
      const same = allowedByGuard.size === allowedByMachine.size && [...allowedByGuard].every((s) => allowedByMachine.has(s));
      if (!same) {
        add("precondition-mismatch", `operations.${on}.preconditions`,
          `may be attempted from [${[...allowedByGuard].join(", ")}] but ${mn} only lets it leave [${[...allowedByMachine].join(", ")}]`);
      }
    }
  }

  // -------------------------------------------------- policies and systems
  for (const [pn, p] of Object.entries(doc.policies)) {
    if (!/^P-/.test(pn)) continue;
    for (const o of p.via) if (!operations[o]) add("unknown-operation", `policies.${pn}.via`, `"${o}" is not an operation`);
  }
  for (const [on, op] of Object.entries(operations)) {
    if (op.routes_to && !operations[op.routes_to]) {
      add("unknown-operation", `operations.${on}.routes_to`, `"${op.routes_to}" is not an operation`);
    }
  }
  // An intent set, once declared, is closed: a deferred intent it does not
  // name is one a generator will classify somewhere nobody decided.
  const intents = doc.intents || {};
  for (const [iname, it] of Object.entries(intents)) {
    for (const o of it.via || []) if (!operations[o]) add("unknown-operation", `intents.${iname}.via`, `"${o}" is not an operation`);
  }
  if (doc.intents) {
    for (const d of doc.purpose.deferred || []) {
      if (d.intent && !intents[d.intent]) add("unknown-intent", "purpose.deferred", `"${d.intent}" is deferred and not in intents`);
    }
  }
  // A fact is computed from the conversation, so its declaration is a type and
  // nothing else until it says how it is computed. `repeated_intent` was typed
  // `int` and never defined; the reference counted it in a way that could not
  // reach the rule's threshold, and nothing disagreed (F-025).
  for (const [fn, f] of Object.entries(facts)) {
    if (!f.derived) add("undefined-fact", `facts.${fn}`, `is typed and never defined — say what computes it in \`derived\``);
  }

  const esc = doc.policies.escalation || {};
  (esc.on_condition || []).forEach((r, i) => checkCondition(r.when, `policies.escalation.on_condition[${i}]`, { facts: true }));

  for (const [sn, s] of Object.entries(doc.external)) {
    for (const o of s.operations || []) if (!operations[o]) add("unknown-operation", `external.${sn}.operations`, `"${o}" is not an operation`);
    for (const e of s.owns || []) if (!entities[e]) add("unknown-entity", `external.${sn}.owns`, `"${e}" is not a declared entity`);
  }

  for (const d of doc.purpose.deferred || []) {
    if (d.operation && operations[d.operation]) {
      add("deferred-and-defined", "purpose.deferred", `"${d.operation}" is deferred and also defined`);
    }
  }

  // ---------------------------------------------------------------- concerns
  // The schema checks the concern is one of the ten. It cannot check that a
  // facet belongs to the concern beside it, and that is the mistake worth
  // catching: both words are plausible ISO vocabulary, and the *pair* is wrong.
  // "security / analysability" reads perfectly well and files a statement under
  // a characteristic it has nothing to do with — on a page generated in another
  // repository, where nobody who could notice will be looking.
  const FACETS = {
    "functional-suitability": ["functional completeness", "functional correctness", "functional appropriateness"],
    "performance-efficiency": ["time behaviour", "resource utilization", "capacity"],
    compatibility: ["co-existence", "interoperability"],
    "interaction-capability": ["appropriateness recognizability", "learnability", "operability", "user error protection", "user engagement", "inclusivity", "user assistance", "self-descriptiveness"],
    reliability: ["faultlessness", "availability", "fault tolerance", "recoverability"],
    security: ["confidentiality", "integrity", "non-repudiation", "accountability", "authenticity", "resistance"],
    maintainability: ["modularity", "reusability", "analysability", "modifiability", "testability"],
    flexibility: ["adaptability", "scalability", "installability", "replaceability"],
    safety: ["operational constraint", "risk identification", "fail safe", "hazard warning", "safe integration"],
    cost: [],
  };
  const tagged = [
    ...doc.purpose.refuses.map((r) => [r, `purpose.refuses.${r.id}`]),
    ...Object.entries(doc.policies).filter(([k]) => /^P-/.test(k)).map(([k, v]) => [v, `policies.${k}`]),
    ...["approval", "escalation"].flatMap((b) =>
      ((doc.policies[b] || {}).statements || []).map((st) => [st, `policies.${b}.${st.id}`])),
    ...doc.required.properties.map((q) => [q, `required.properties.${q.id}`]),
  ];
  for (const [item, at] of tagged) {
    if (!item.facet) continue;
    const allowed = FACETS[item.concern] || [];
    if (!allowed.includes(item.facet)) {
      add("facet-mismatch", at, `"${item.facet}" is not a sub-characteristic of ${item.concern}`);
    }
  }

  // ----------------------------------------------------------- identifiers
  const unique = (ids, at) => {
    const seen = new Set();
    for (const id of ids) {
      if (seen.has(id)) add("duplicate-id", at, `"${id}" appears twice`);
      seen.add(id);
    }
  };
  unique(doc.purpose.refuses.map((r) => r.id), "purpose.refuses");
  // Every policy id in one space: the keyed policies and the statements nested
  // under the approval and escalation blocks. A P- id that appears twice names
  // two different rules to whoever cites it.
  const nested = ["approval", "escalation"].flatMap((b) => (doc.policies[b] || {}).statements || []);
  unique([...Object.keys(doc.policies).filter((k) => /^P-/.test(k)), ...nested.map((s) => s.id)], "policies");
  unique([...(esc.on_request || []), ...(esc.on_condition || [])].map((r) => r.id), "policies.escalation");
  unique(doc.required.properties.map((q) => q.id), "required.properties");
  for (const cat of ["aac", "ahc"]) {
    const claim = doc.conformance[cat];
    if (!claim) continue;
    const ids = (claim.excluded || []).map((x) => x.id);
    unique(ids, `conformance.${cat}.excluded`);
    const known = opts[`${cat}Ids`];
    if (known) {
      for (const id of ids) if (!known.has(id)) add("unknown-catalog-id", `conformance.${cat}.excluded`, `${id} is not in the catalog`);
    }
  }

  // ----------------------------------------------------------- technology
  // Keys and values alike, everywhere but provenance.
  (function walk(node, at) {
    if (typeof node === "string") {
      // Underscores are word characters to a regex, so `postgres_row` would
      // hide `postgres`. Identifiers are split before matching.
      const m = node.replace(/_/g, " ").match(TECH_RE);
      if (m) add("names-technology", at, `names "${m[1]}" — a realisation belongs in the binding spec`);
    } else if (Array.isArray(node)) {
      node.forEach((v, i) => walk(v, `${at}[${i}]`));
    } else if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) {
        if (at === "" && k === "sources") continue;
        walk(k, at ? `${at}.${k}` : k);
        walk(v, at ? `${at}.${k}` : k);
      }
    }
  })(doc, "");

  return issues;
}

// --------------------------------------------------------------- extends
/*
 * A variant is its base plus an RFC 7386 JSON Merge Patch: objects merge,
 * null deletes, anything else — lists included — replaces. Cited, not
 * invented. AgentTwin's loader implements the same section of the same RFC,
 * and the two are held to the same examples.
 */
function mergePatch(target, patch) {
  if (patch === null || typeof patch !== "object" || Array.isArray(patch)) return patch;
  const result = target && typeof target === "object" && !Array.isArray(target) ? { ...target } : {};
  for (const [k, v] of Object.entries(patch)) {
    if (v === null) delete result[k];
    else result[k] = mergePatch(result[k], v);
  }
  return result;
}

function loadAoas(file, depth = 0) {
  if (depth > 8) throw new Error(`${file}: extends nested more than 8 deep — a cycle?`);
  const doc = yaml.load(fs.readFileSync(file, "utf8"));
  if (!doc || !doc.extends) return doc;
  const { extends: parent, ...patch } = doc;
  const base = loadAoas(path.join(path.dirname(file), parent.path), depth + 1);
  const found = `${base.agent.id}@${base.agent.version}`;
  const wanted = `${parent.id}@${parent.version}`;
  if (found !== wanted) throw new Error(`${file} extends ${wanted}, and ${parent.path} is ${found}`);
  return mergePatch(base, patch);
}

// ------------------------------------------------------------------- CLI
function catalogIds(dir, prefix) {
  if (!fs.existsSync(dir)) return null;
  return new Set(fs.readdirSync(dir).filter((f) => f.startsWith(prefix) && f.endsWith(".yaml")).map((f) => f.slice(0, -5)));
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const exDir = path.join(ROOT, "drafts/examples");
  const files = args.length ? args : fs.readdirSync(exDir).filter((f) => f.endsWith(".aoas.yaml")).map((f) => path.join(exDir, f));

  // Catalog identifiers are checked against sibling checkouts when present. The
  // check is skipped rather than failed without them, and says so.
  const opts = {
    aacIds: catalogIds(process.env.AAC_CATALOG || path.join(ROOT, "../ai-assurance-catalog/catalog"), "AAC-"),
    ahcIds: catalogIds(process.env.AHC_CATALOG || path.join(ROOT, "../ai-harness-catalog/capabilities"), "AHC-"),
  };
  for (const [k, v] of Object.entries(opts)) if (!v) console.log(`note: ${k.slice(0, 3).toUpperCase()} identifiers not checked — no catalog checkout found`);

  let failed = 0;
  for (const f of files) {
    const rel = path.relative(process.cwd(), f);
    let doc;
    try { doc = loadAoas(f); } catch (e) { failed += 1; console.log(`✗ ${rel} — cannot load: ${e.message}`); continue; }
    const issues = aoasIssues(doc, opts);
    if (!issues.length) { console.log(`✓ ${rel}`); continue; }
    failed += 1;
    console.log(`✗ ${rel} — ${issues.length} issue(s)`);
    for (const i of issues) console.log(`    [${i.rule}] ${i.at}: ${i.message}`);
  }
  process.exit(failed ? 1 : 0);
}

module.exports = { aoasIssues, loadAoas, mergePatch, TECHNOLOGY };
