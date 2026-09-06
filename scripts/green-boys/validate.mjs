import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../../", import.meta.url));
const config = ts.readConfigFile(root + "tsconfig.json", ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(
  [root + "src/renders/green-boys-gpt-6-astra/entry.tsx"],
  parsed.options,
);
const diagnostics = ts.getPreEmitDiagnostics(program);
if (diagnostics.length) {
  throw new Error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    }),
  );
}

const file = new URL(
  "../../src/renders/green-boys-gpt-6-astra/design.ts",
  import.meta.url,
);
const compiled = ts.transpileModule(readFileSync(file, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  },
}).outputText;
const module = { exports: {} };
new Function("module", "exports", "require", compiled)(
  module,
  module.exports,
  createRequire(fileURLToPath(file)),
);
const { SHOTS, LINES, THEMES, DURATION } = module.exports;
const fail = (message) => {
  throw new Error(message);
};
const timingFile = new URL(
  "../../src/renders/green-boys-gpt-6-astra/timing.ts",
  import.meta.url,
);
const timingCode = ts.transpileModule(readFileSync(timingFile, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const timingModule = { exports: {} };
new Function("module", "exports", "require", timingCode)(
  timingModule,
  timingModule.exports,
  createRequire(fileURLToPath(timingFile)),
);
const { wordEntrance, WORD_MOTION_FRAMES } = timingModule.exports;
for (let elapsed = -10; elapsed <= 40; elapsed++) {
  const actual = wordEntrance(elapsed);
  const p = Math.max(0, Math.min(1, elapsed / 11));
  const originalMotion = p * p * (3 - 2 * p);
  if (Math.abs(actual.motion - originalMotion) > 1e-10)
    fail("Original spatial animation changed");
  if (elapsed < 0 && actual.opacity !== 0)
    fail("Lyric appears before its native timestamp");
  if (elapsed === 1 && actual.opacity < 0.7)
    fail("Glyph still mostly transparent after its onset");
  if (elapsed === 2 && actual.opacity < 0.95)
    fail("Glyph is not clearly visible within two frames");
  if (elapsed >= 3 && actual.opacity !== 1) fail("Opacity has not settled");
  if (elapsed >= WORD_MOTION_FRAMES && actual.motion !== 1)
    fail("Spatial animation has not locked");
}
const assigned = SHOTS.flatMap((s) => s.lines);
if (assigned.length !== LINES.length || new Set(assigned).size !== LINES.length)
  fail("Incomplete or duplicated page grouping");
if (assigned.some((v, i) => v !== i)) fail("Non-chronological page grouping");
if (new Set(SHOTS.map((s) => s.key)).size !== SHOTS.length)
  fail("Duplicate background signatures");
let previous = -1;
for (const line of LINES) {
  if (!line.translation) fail("Missing Chinese translation");
  if (line.text !== line.characters.map((c) => c.text).join(""))
    fail("Native source units changed");
  for (const c of line.characters) {
    if (c.endMs < c.startMs) fail("Negative native duration");
    if (c.vocal) {
      if (c.frame <= previous)
        fail("Unexpected simultaneous/reversed vocal units");
      previous = c.frame;
      if (Math.abs(c.frame - (c.startMs * 60) / 1000) > 2)
        fail("Unexpected timing shift");
    }
  }
}
const luminance = (hex) => {
  const s = hex
    .slice(1)
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return s[0] * 0.2126 + s[1] * 0.7152 + s[2] * 0.0722;
};
for (const [name, theme] of Object.entries(THEMES)) {
  const base = luminance(theme.surface);
  for (const role of ["ink", "primary", "secondary", "translation"]) {
    const ink = luminance(theme[role]);
    const contrast =
      (Math.max(base, ink) + 0.05) / (Math.min(base, ink) + 0.05);
    if (contrast < 4.5)
      fail(`${name}/${role}: insufficient contrast ${contrast.toFixed(2)}`);
  }
}
if (DURATION !== 13904) fail("Audio duration changed");
console.log(
  `${LINES.length} Japanese/Chinese pairs; ${SHOTS.length} unique scenes; native units, frame order, coverage and static contrast passed.`,
);
console.log(
  "Reveal regression passed: >95% visible at +2 frames; original 11-frame motion unchanged; no pre-roll or source offset.",
);
