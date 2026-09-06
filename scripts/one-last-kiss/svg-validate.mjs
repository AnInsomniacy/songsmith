import ts from "typescript";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "../..");
const config = ts.readConfigFile(
  resolve(root, "tsconfig.json"),
  ts.sys.readFile,
);
const options = ts.parseJsonConfigFileContent(
  config.config,
  ts.sys,
  root,
).options;
const program = ts.createProgram(
  [resolve(root, "src/renders/one-last-kiss-gpt-6-astra-svg/entry.tsx")],
  options,
);
const diagnostics = ts.getPreEmitDiagnostics(program);
if (diagnostics.length)
  throw Error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (f) => f,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    }),
  );
const file = resolve(
  root,
  "src/renders/one-last-kiss-gpt-6-astra-svg/design.ts",
);
const code = ts.transpileModule(readFileSync(file, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;
const module = { exports: {} };
new Function("require", "module", "exports", code)(
  createRequire(file),
  module,
  module.exports,
);
const { data, shots, FRAMES, smooth, wave } = module.exports;
assert.equal(FRAMES, 15122);
assert.equal(new Set(shots.map((s) => s.id)).size, 24);
assert.deepEqual(
  shots.flatMap((s) => s.lines),
  data.lines.map((_, i) => i),
);
const raw = readFileSync(
  resolve(root, "public/songs/one-last-kiss/data/raw/one-last-kiss.krc"),
  "utf8",
);
const rows = [...raw.matchAll(/^\[(\d+),(\d+)\](.*)$/gm)];
let units = 0;
for (const l of data.lines) {
  const row = rows.find((r) => +r[1] === l.startMs);
  assert(row);
  const u = [...row[3].matchAll(/<(\d+),(\d+),\d+>([^<]*)/g)].map((m) => ({
    text: m[3],
    startMs: +row[1] + +m[1],
    endMs: +row[1] + +m[1] + +m[2],
  }));
  assert.deepEqual(
    u,
    l.characters.map(({ text, startMs, endMs }) => ({ text, startMs, endMs })),
  );
  units += u.length;
  if (l.kind !== "vocalise") assert(l.translation);
}
const lum = (h) => {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
for (const s of shots) {
  const bg = lum(s.light ? "#E5ECE5" : "#172D46");
  for (const c of [s.light ? "#193649" : "#EDF3EF", s.accent]) {
    const fg = lum(c);
    assert(
      (Math.max(bg, fg) + 0.05) / (Math.min(bg, fg) + 0.05) >= 4.5,
      s.id + " contrast",
    );
  }
  assert.equal(s.start, Math.round(data.lines[s.lines[0]].startMs * 0.06));
}
assert.equal(smooth(-1), 0);
assert.equal(smooth(2), 1);
assert(Math.abs(wave(0) - wave(7)) < 1e-10);
console.log(
  `Scoped types passed; ${data.lines.length} bilingual rows, ${units} unchanged native units, 24 scenes, fixed contrast and continuous timing passed.`,
);
