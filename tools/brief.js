#!/usr/bin/env node
/*
 * The Generation Brief — T-034.
 *
 * What a builder is handed to produce an agent, assembled from the specs that
 * already exist rather than written for the occasion.
 *
 *   node tools/brief.js drafts/examples/support-agent.aoas.yaml \
 *                       ../reference-agent/harness-profile.yaml \
 *                       -o briefs/support-agent.brief.md
 *
 * ---------------------------------------------------------------------------
 * WHY THIS IS GENERATED AND NOT WRITTEN
 * ---------------------------------------------------------------------------
 * The brief is the input to the only test the spec family has of itself: give
 * it to a builder who has never seen the reference agent, and see whether what
 * comes back has the same structure. Every difference is a sentence the specs
 * failed to say.
 *
 * That test is worthless if the brief is written by hand. Somebody who knows
 * the reference agent cannot help describing it — a module name here, a
 * boundary there — and the generated code then matches for the wrong reason.
 * The specs would be credited with saying something only the brief said.
 *
 * So the brief is assembled, from four sources, and carries no prose about the
 * system being built that is not in one of them:
 *
 *   AOAS      what this agent is for: entities, operations, policies, refusals
 *   AHC       what its harness must be able to do, from its declared shapes
 *   AAC       what it will be tested against, from the same shapes
 *   profile   which product fills each port, and the numbers this system chose
 *
 * `leaks()` below enforces that: a brief naming a path or a module of the
 * reference implementation fails to build. It is a crude check and it is the
 * one that keeps the experiment honest.
 * ---------------------------------------------------------------------------
 */

"use strict";

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ROOT = path.resolve(__dirname, "..");
const AHC = path.resolve(ROOT, "../ai-harness-catalog");
const AAC = path.resolve(ROOT, "../ai-assurance-catalog");

/* ------------------------------------------------------------------ inputs */

function load(file) {
  return yaml.load(fs.readFileSync(file, "utf8"));
}

/** The profile, flattened against the stack it extends. */
function profileOf(file) {
  const tool = path.join(AHC, "tools/resolve.js");
  if (!fs.existsSync(tool)) {
    throw new Error(`the harness catalog is not a sibling checkout: ${AHC}`);
  }
  const { resolve } = require(tool);
  const out = resolve(file);
  if (out.errors.length) {
    throw new Error(`the profile does not resolve:\n  ${out.errors.join("\n  ")}`);
  }
  return out.doc;
}

/** Everything in a catalog directory that applies to these shapes. */
function owed(dir, shapes, idKey = "id") {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".yaml"))
    .map((f) => load(path.join(dir, f)))
    .filter((d) => d && d.status !== "withdrawn")
    .filter((d) => d.core || (d.archetypes || []).some((a) => shapes.includes(a)))
    .sort((a, b) => String(a[idKey]).localeCompare(String(b[idKey])));
}

/* ------------------------------------------------------------- the sections */

function oneLine(text) {
  return String(text || "").trim().replace(/\s+/g, " ");
}

/**
 * One list entry, in whatever shape the AOAS wrote it.
 *
 * `does` is bare strings, `refuses` carries an id and a reason, and `deferred`
 * names either an intent or an operation. Rendering the raw object for the
 * third read as `{"intent":"exchange_request"}` in the first brief — technically
 * the spec's content and useless to anybody reading it.
 */
function describe(item) {
  if (typeof item === "string") return oneLine(item);
  if (item.what) return `${item.id ? `**${item.id}** — ` : ""}${oneLine(item.what)}`;
  const named = item.intent || item.operation;
  const kind = item.intent ? "intent" : "operation";
  if (named) return `\`${named}\` (${kind})${item.source ? ` — ${oneLine(item.source)}` : ""}`;
  return oneLine(JSON.stringify(item));
}

function purpose(aoas) {
  const p = aoas.purpose || {};
  const lines = [`**Serves.** ${oneLine(p.serves)}`, ""];
  for (const [heading, key] of [
    ["It does", "does"],
    ["It refuses", "refuses"],
    ["Out of scope for now", "deferred"],
  ]) {
    const items = p[key] || [];
    if (!items.length) continue;
    lines.push(`**${heading}.**`, "");
    for (const item of items) {
      lines.push(`- ${describe(item)}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function capabilityTable(caps) {
  const byLayer = new Map();
  for (const c of caps) {
    for (const l of c.layers || ["—"]) {
      if (!byLayer.has(l)) byLayer.set(l, []);
      byLayer.get(l).push(c.id);
    }
  }
  const order = [...byLayer.keys()].sort(
    (a, b) => Number(String(a).replace(/\D/g, "") || 0) - Number(String(b).replace(/\D/g, "") || 0)
  );
  const rows = order.map((l) => `| **${l}** | ${byLayer.get(l).join(", ")} |`);
  return ["| Layer | Capabilities |", "|---|---|", ...rows].join("\n");
}

function obligationTable(obs) {
  const byDim = new Map();
  for (const o of obs) {
    if (!byDim.has(o.dimension)) byDim.set(o.dimension, []);
    byDim.get(o.dimension).push(o.id);
  }
  const rows = [...byDim.keys()]
    .sort()
    .map((d) => `| **${d}** | ${byDim.get(d).join(", ")} |`);
  return ["| Dimension | Obligations |", "|---|---|", ...rows].join("\n");
}

function bindingTable(bindings) {
  const rows = Object.entries(bindings)
    .filter(([port]) => !port.startsWith("x_"))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([port, spec]) => `| \`${port}\` | ${spec.approach} | \`${spec.adapter}\` |`);
  return ["| Port | Approach | Adapter |", "|---|---|---|", ...rows].join("\n");
}

function thresholdTable(thresholds) {
  const rows = Object.entries(thresholds || {})
    .filter(([k]) => !k.startsWith("x_"))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `| \`${k}\` | ${v} |`);
  return rows.length
    ? ["| Threshold | Value |", "|---|---|", ...rows].join("\n")
    : "_None declared. A capability whose threshold is missing is incomplete rather than defaulted._";
}

function decisionList(decisions) {
  const entries = Object.entries(decisions || {}).filter(([k]) => !k.startsWith("x_"));
  if (!entries.length) return "_None answered._";
  return entries
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, d]) => `- **\`${key}\`** → \`${d.value}\` *(${d.source})*${d.note ? ` — ${oneLine(d.note)}` : ""}`)
    .join("\n");
}

/* ----------------------------------------------------------------- the brief */

function brief({ aoas, profile, caps, obs, aoasPath, profilePath }) {
  const shapes = profile.subject.archetypes;
  const gaps = profile.accepted_gaps || [];

  return `# Generation Brief — ${aoas.agent.id}

*Generated by \`tools/brief.js\` from the four sources below. Never edit by
hand: a brief somebody edited is a brief that can describe an implementation
instead of a specification, and the whole point of this document is that it
cannot.*

Built ${new Date().toISOString().slice(0, 10)} · AOAS \`${aoas.agent.version}\` ·
AHC \`${profile.catalog.ahc}\`${profile.catalog.aac ? ` · AAC \`${profile.catalog.aac}\`` : ""}

---

## What you are building

${purpose(aoas)}

This system declares itself **${shapes.join(", ")}**. Everything in sections 2
and 3 follows from that declaration and from nothing else.

---

## How to read this brief

Four inputs, and they answer four different questions. None of them is
optional and none of them substitutes for another.

| # | Source | The question it answers | Where the normative text is |
|---|---|---|---|
| 1 | **AOAS** | What is this agent *for*? | \`${aoasPath}\` |
| 2 | **AHC** | What must its harness be *able to do*? | \`ai-harness-catalog/capabilities/\` |
| 3 | **AAC** | What will it be *tested against*? | \`ai-assurance-catalog/catalog/\` |
| 4 | **Profile** | Which *product* fills each seam? | \`${profilePath}\` |

**This brief lists identifiers and points at the text.** It does not restate
the capabilities, because a restatement is a second copy that can disagree with
the first. Read them where they live.

**Nothing here tells you how to structure the code.** That is deliberate, and
it is the experiment: if the capabilities imply a structure, you will arrive at
one; if they do not, that is a gap in the capabilities and finding it is what
this document exists for. Do not go looking for an existing implementation to
match — there may be one, and matching it would prove nothing about the specs.

---

## 1 · What this agent is for

The specification is \`${aoasPath}\`. Read it whole. Its parts, and what each
one binds you to:

| Part | What it fixes |
|---|---|
| \`entities\` | the nouns, their fields, their invariants, and their state machines |
| \`operations\` | every action, its preconditions, its effects and its side-effect class |
| \`policies\` | the rules that hold regardless of what any model proposes |
| \`purpose.refuses\` | what this agent must decline, and is a defect for doing |
| \`facts\` | what the system derives about a conversation, and from what |
| \`session\` | what is known about the caller before a turn begins |

${
    aoas.entities
      ? `**Entities declared:** ${Object.keys(aoas.entities).map((e) => `\`${e}\``).join(", ")}`
      : ""
  }
${
    aoas.operations
      ? `\n**Operations declared:** ${Object.keys(aoas.operations).map((o) => `\`${o}\``).join(", ")}`
      : ""
  }

---

## 2 · The capabilities this shape owes

**${caps.length} capabilities**, derived from \`archetypes: [${shapes.join(", ")}]\`.
Each says what the harness must be able to do and names the failure it prevents;
several carry design decisions the profile answers in section 4.

${capabilityTable(caps)}

The text of each is in \`ai-harness-catalog/capabilities/<id>.yaml\`. For the
collated version by layer, with requirement and failure mode inline:
\`ai-harness-catalog/blueprints/${shapes[0]}-owes.generated.md\`.

---

## 3 · The obligations it will be tested against

**${obs.length} obligations.** These are not capabilities: a capability is
something the system can do, an obligation is something a *test* must
demonstrate. A system that meets every capability and can demonstrate none of
them has not finished.

${obligationTable(obs)}

The text of each is in \`ai-assurance-catalog/catalog/<id>.yaml\`. Obligations
marked \`gate: true\` are release gates — a release with one unmet is a release
that has not been argued for.

---

## 4 · The stack, and the numbers this system chose

Ports and their implementations, resolved from the profile and the stack it
extends. **This is the only place a product may be named.**

${bindingTable(profile.bindings)}

${profile.harness && profile.harness.loop ? `**Control loop:** owned by \`${profile.harness.loop.owner}\`${profile.harness.loop.adapter ? `, as \`${profile.harness.loop.adapter}\`` : ""}.\n` : ""}
### Thresholds

The catalog refuses to publish these, because any number it published would be
wrong for almost everyone. They are this system's.

${thresholdTable(profile.thresholds)}

### Design decisions answered

Each capability that raises a decision expects one. \`golden-path\` means the
catalog's own resolution was taken as written and recorded rather than assumed.

${decisionList(profile.decisions)}

### Knowingly not met

${
    gaps.length
      ? gaps
          .map((g) => `- **${g.capability}** — ${oneLine(g.reason)} *(${g.owner}, review ${g.review})*`)
          .join("\n")
      : "_None. An empty list is a claim, not an absence: it says every applicable capability is accounted for elsewhere._"
  }

---

## What finishing means

1. Every capability in section 2 is met, or appears above as a knowing gap with
   an owner and a review date.
2. Every obligation in section 3 has a test behind it that actually runs, and
   the mapping from test to obligation is machine-readable rather than asserted
   in prose.
3. Every port in section 4 is reachable through a seam that can be substituted,
   because the simulator in section 5 works by substituting them.
4. The thresholds in section 4 are configuration, not constants in code.

## 5 · How it will be judged

The agent is driven against a declared world rather than a live store, so the
same scenarios run identically every time and an effect that should not have
happened is visible rather than inferred. The world is a YAML file; the tool
surface is projected from it, so the agent under test cannot tell the
difference between the simulator and the real far end. Whatever you build has
to be substitutable at every seam for that to be possible — which is not an
extra requirement, it is capability 2's requirement, restated in the only terms
that can check it.
`;
}

/* ------------------------------------------------------------------- guard */

/**
 * A brief that names an implementation has stopped being a specification.
 *
 * Crude on purpose. The failure it guards against is not malice, it is the
 * ordinary difficulty of describing something you already know: one module
 * name in this document and the generated agent matches for a reason the
 * specs cannot claim credit for.
 */
const FORBIDDEN = [
  // Source layout and module names. Naming the *profile* of an existing agent
  // is fine and necessary — it is one of the four inputs. Naming the modules
  // inside it is the leak, because module names are the answer to the question
  // this experiment asks.
  // A bound product is not a leak — naming which product fills each port is
  // section 4's entire job. What must not appear is the shape of the code
  // inside, because that is the answer to the question this experiment asks.
  /\bsrc\//,
  /support_agent/,
  /\bcontracts\/protocols\b/,
  /\bentrypoint\b/,
  /\bports and adapters\b/i,
  /\bhexagonal\b/i,
];

function leaks(text) {
  return FORBIDDEN.filter((re) => re.test(text)).map(String);
}

/* --------------------------------------------------------------------- cli */

function main(argv) {
  const out = argv.includes("-o") ? argv[argv.indexOf("-o") + 1] : null;
  const [aoasPath, profilePath] = argv.filter((a, i) => !a.startsWith("-") && argv[i - 1] !== "-o");
  if (!aoasPath || !profilePath) {
    console.error("usage: node tools/brief.js <agent.aoas.yaml> <harness-profile.yaml> [-o out.md]");
    return 2;
  }

  const aoas = load(aoasPath);
  const profile = profileOf(profilePath);
  const shapes = profile.subject.archetypes;
  const caps = owed(path.join(AHC, "capabilities"), shapes);
  const obs = owed(path.join(AAC, "catalog"), shapes);

  if (!caps.length) {
    console.error(`no capabilities found — is ${AHC} a sibling checkout?`);
    return 1;
  }
  const text = brief({
    aoas,
    profile,
    caps,
    obs,
    aoasPath: path.relative(ROOT, path.resolve(aoasPath)),
    profilePath: path.relative(ROOT, path.resolve(profilePath)),
  });

  const found = leaks(text);
  if (found.length) {
    console.error(`the brief names an implementation: ${found.join(", ")}`);
    return 1;
  }

  if (out) {
    fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
    fs.writeFileSync(out, text);
    console.error(
      `${out}  ${caps.length} capabilities, ${obs.length} obligations, ` +
        `${Object.keys(profile.bindings).length} ports`
    );
  } else {
    process.stdout.write(text);
  }
  return 0;
}

module.exports = { brief, owed, leaks, profileOf };

if (require.main === module) process.exit(main(process.argv.slice(2)));
