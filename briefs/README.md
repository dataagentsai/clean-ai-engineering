# Briefs

Generated. One per agent, per cycle. **Never edited by hand.**

    npm run briefs      # regenerate every brief in this directory

## What a brief is

The input a builder is handed to produce an agent — and the input to the only
test this spec family has of itself.

The claim the family rests on is that AOAS, AHC, AAC and a stack profile
describe an agent completely enough that somebody could build it from them.
That is a falsifiable claim with exactly one test: hand the brief to a builder
who has not seen the reference implementation, and diff what comes back.

**Every difference is a sentence the specs failed to say.** That list is the
product. It is complete in a way a list assembled by reading code never is,
because it is produced by the only reader whose misunderstandings count.

## Why they are generated

A brief written by hand is worthless for that test. Somebody who knows the
reference agent cannot help describing it — a module name here, a boundary
there — and the generated code then matches for a reason the specs cannot
claim credit for.

So a brief is assembled from four sources and carries no prose about the system
being built that is not in one of them:

| Source | The question it answers |
|---|---|
| **AOAS** | what this agent is for: entities, operations, policies, refusals |
| **AHC** | what its harness must be able to do, from its declared shapes |
| **AAC** | what it will be tested against, from the same shapes |
| **profile** | which product fills each port, and the numbers this system chose |

`tools/brief.js` refuses to write a brief that names a source directory, a
module of the reference implementation, or an architectural style. The check is
crude and it is what keeps the experiment honest — it fired twice while the
tool was being written, once correctly and once on a false positive, which is
about the right ratio for a guard worth having.

## What a brief deliberately does not contain

**How to lay the code out.** If the capabilities imply a structure, a builder
will arrive at one. If they do not, that is a gap in the capabilities, and
finding it is the entire point. A brief that supplies the structure answers the
question it was written to ask.
