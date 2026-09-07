/* global document, structuredClone */
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  renderStill,
  selectComposition,
} from "@remotion/renderer";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const file = path.join(
  root,
  "src/renders/bu-chao-bu-yong-hua-qian-gpt-6-astra/design.ts",
);
const compiled = ts.transpileModule(await readFile(file, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    esModuleInterop: true,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const design = {};
new Function("require", "exports", compiled)(createRequire(file), design);
const { shots, lines, frameAt } = design;
const output = path.join(root, ".work/bu-chao-gpt-6-astra");
await mkdir(output, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });
const browser = await openBrowser("chrome");
const newPage = browser.newPage.bind(browser);
let snapshot = null;
browser.newPage = async (options) => {
  const page = await newPage(options);
  const close = page.close.bind(page);
  page.close = async (...args) => {
    snapshot = await page.evaluate(() => {
      const rect = (el) => {
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
      };
      const glyphs = [
        ...document.querySelectorAll(
          "[data-street-unit], [data-street-translation]",
        ),
      ].map((el) => ({
        id:
          el.getAttribute("data-street-unit") ??
          el.getAttribute("data-street-translation"),
        line: el.closest("[data-street-line]").getAttribute("data-street-line"),
        text: el.textContent,
        fill: el.getAttribute("fill"),
        bounds: rect(el),
      }));
      const plates = [...document.querySelectorAll("[data-street-panel]")].map(
        (el) => ({
          id: el.getAttribute("data-street-panel"),
          fill: el.querySelectorAll("rect")[1].getAttribute("fill"),
          bounds: rect(el.querySelectorAll("rect")[1]),
        }),
      );
      const ids = [...document.querySelectorAll("svg [id]")].map((el) => el.id);
      return {
        glyphs,
        plates,
        duplicateIds: ids.filter((v, i) => ids.indexOf(v) !== i),
        fonts: [
          "Street Sans",
          "Street Barlow",
          "Street Information",
          "Street Round",
        ].filter((f) => !document.fonts.check(`40px "${f}"`)),
      };
    });
    return close(...args);
  };
  return page;
};
const luminance = (hex) => {
  const [r, g, b] = hex
    .slice(1)
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const report = [];
try {
  const composition = await selectComposition({
    serveUrl,
    id: "BuChaoBuYongHuaQian-GPT6Astra",
    puppeteerInstance: browser,
  });
  const capture = async (frame, name) => {
    snapshot = null;
    await renderStill({
      serveUrl,
      composition,
      puppeteerInstance: browser,
      frame,
      output: path.join(output, name),
      imageFormat: "png",
      overwrite: true,
    });
    assert(snapshot, "No rendered layout received");
    assert.deepEqual(snapshot.fonts, [], "Missing local fonts");
    assert.deepEqual(snapshot.duplicateIds, [], "SVG references collided");
    for (const glyph of snapshot.glyphs) {
      const { x, y, w, h } = glyph.bounds;
      assert(w > 0 && h > 0, `Empty glyph: ${glyph.text}`);
      assert(
        x >= 78 && x + w <= 1842 && y >= 64 && y + h <= 1016,
        `Unsafe glyph ${glyph.id}: ${JSON.stringify(glyph.bounds)}`,
      );
      const plate = snapshot.plates.find((p) => p.id === glyph.line);
      assert(plate, `Missing plate: ${glyph.line}`);
      assert(
        contrast(glyph.fill, plate.fill) >= 4.5,
        `Weak palette pair: ${glyph.id} ${contrast(glyph.fill, plate.fill).toFixed(2)}`,
      );
    }
    return structuredClone(snapshot);
  };
  for (const shot of shots) {
    const last = shot.lineIds.at(-1);
    const frame =
      last === undefined
        ? shot.start + Math.min(160, shot.end - shot.start - 1)
        : Math.min(
            shot.end - 2,
            Math.max(...lines[last].characters.map((c) => frameAt(c.startMs))) +
              20,
          );
    const state = await capture(frame, `${shot.id}.png`);
    report.push({ shot: shot.id, frame, glyphs: state.glyphs.length });
    console.log(`Layout ${report.length}/${shots.length}: ${shot.id}`);
  }
  for (const id of ["invention", "sofa-snacks", "toy-session"]) {
    const shot = shots.find((s) => s.id === id),
      line = lines[shot.lineIds[0]];
    const a = Math.max(...line.characters.map((c) => frameAt(c.startMs))) + 20;
    const before = await capture(a, `${id}-stable-a.png`);
    const after = await capture(a + 16, `${id}-stable-b.png`);
    assert.deepEqual(
      before.glyphs.filter((g) => g.line === line.id),
      after.glyphs.filter((g) => g.line === line.id),
      `Settled text moved: ${id}`,
    );
  }
  for (const frame of [
    0, 1, 408, 421, 531, 725, 945, 1000, 1500, 3422, 8710, 13294,
  ]) {
    await capture(frame, `boundary-${frame}.png`);
  }
  await writeFile(
    path.join(output, "layout-report.json"),
    JSON.stringify(
      {
        status: "passed",
        scope:
          "Rendered typography, static palette and SVG reference isolation only; original audio and lyric assets reused without revalidation.",
        shots: report,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    `Passed ${shots.length} original scene layouts, caption stability and representative transitions.`,
  );
} finally {
  await browser.close({ silent: true });
}
