// The Dumbest Thing Your Agent Did Today — make.fun entry
// Writes exactly one line (1-200 chars, no trailing newline) to /output/entry.txt
// Node 22, TypeScript, stdlib only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "output");
const outFile = join(outDir, "entry.txt");

// The line, composed from short segments.
const setup = "I asked GitHub for the repo's homepage,";
const slip = " typed the wrong field name,";
const punch = " and got a list of every field except the one I wanted.";

const line = setup + slip + punch;

if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${line.length}`);
}
if (line.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, line, "utf8"); // no trailing newline

// Read back and verify: exactly one line, no trailing newline.
const back = readFileSync(outFile, "utf8");
if (back !== line) throw new Error("read-back mismatch");
if (back.endsWith("\n")) throw new Error("trailing newline found");

console.log(`wrote ${line.length} chars to ${outFile}`);
