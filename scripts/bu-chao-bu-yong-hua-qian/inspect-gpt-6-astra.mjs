/* global window, document */
import {bundle} from "@remotion/bundler";
import {openBrowser, renderStill, selectComposition} from "@remotion/renderer";
import {mkdir, readFile, writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import assert from "node:assert/strict";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const output = path.join(root, ".work/astra-theatre");
await mkdir(output, {recursive: true});
const raw = JSON.parse(await readFile(path.join(root, "public/songs/bu-chao-bu-yong-hua-qian/data/lyrics.json"), "utf8"));
const serveUrl = await bundle({entryPoint: path.join(root, "src/index.ts")});
const browser = await openBrowser("chrome");
const originalNewPage = browser.newPage.bind(browser);
let currentFrame = 0;
let inspection = null;
const snapshots = new Map();
browser.newPage = async (options) => {
  const page = await originalNewPage(options);
  const originalClose = page.close.bind(page);
  page.close = async (...args) => {
    const snapshot = await page.evaluate(() => {
      if (!window.astraInspection) return null;
      return {
        prepared: window.astraInspection,
        cover: Boolean(document.querySelector("[data-astra-cover]")),
        lines: [...document.querySelectorAll("[data-astra-line]")].map((line) => ({
          id: line.getAttribute("data-astra-line"),
          units: [...line.querySelectorAll("[data-astra-unit]")].map((unit) => {
            const text = unit.querySelector("text");
            const bounds = text.getBoundingClientRect();
            return {id: unit.getAttribute("data-astra-unit"), text: text.textContent, transform: unit.getAttribute("transform"),
              fill: text.getAttribute("fill"), x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height};
          }),
        })),
        missingFonts: ["Astra Round", "Astra Smiley", "Astra WenKai", "Astra Barlow", "Astra Barlow Info"].filter((font) => !document.fonts.check('40px "' + font + '"')),
      };
    });
    if (snapshot) {
      inspection = snapshot.prepared;
      snapshots.set(currentFrame, snapshot);
    }
    return originalClose(...args);
  };
  return page;
};

try {
  const composition = await selectComposition({serveUrl, id: "BuChaoBuYongHuaQian-GPT6Astra", puppeteerInstance: browser});
  assert.equal(composition.width, 1920);
  assert.equal(composition.height, 1080);
  assert.equal(composition.fps, 60);
  assert.equal(composition.durationInFrames, Math.ceil(raw.audioDurationMs / 1000 * 60));
  const render = async (frame, name) => {
    currentFrame = frame;
    await renderStill({serveUrl, composition, puppeteerInstance: browser, frame, output: path.join(output, name), imageFormat: "png", overwrite: true});
    const snapshot = snapshots.get(frame);
    assert(snapshot, "Rendered DOM was not captured");
    assert.deepEqual(snapshot.missingFonts, []);
    for (const line of snapshot.lines) {
      for (const unit of line.units) {
        assert(unit.x >= 78 && unit.x + unit.width <= 1842, "Glyph escaped horizontal safe area: " + unit.id);
        assert(unit.y >= 65 && unit.y + unit.height <= 1017, "Glyph escaped vertical safe area: " + unit.id);
      }
    }
    return snapshot;
  };
  const cover = await render(0, "cover.png");
  assert.equal(cover.cover, true);
  const second = await render(1, "second-frame.png");
  assert.equal(second.cover, false);
  await render(670, "prelude.png");
  await render(839, "intro-vocalises.png");
  const prepared = inspection.pages;
  assert.equal(prepared.length, 27);
  const ids = new Set(prepared.map((p) => p.page.id));
  assert.equal(ids.size, prepared.length);
  const manifest = [];
  for (const [index, item] of prepared.entries()) {
    const {page, lines} = item;
    const last = lines.at(-1);
    const frame = Math.min(page.end - 2, Math.max(...last.slots.filter((s) => s.text.trim()).map((s) => s.settle)) + 14);
    const name = "shot-" + String(index).padStart(2, "0") + ".png";
    const full = await render(frame, name);
    assert.equal(full.lines.flatMap((line) => line.units).length, lines.flatMap((line) => line.slots).filter((s) => s.text.trim() && s.start <= frame).length);
    const first = lines[0];
    const a = Math.max(...first.slots.filter((s) => s.text.trim()).map((s) => s.settle)) + 1;
    const b = Math.min(a + 32, page.end - 1);
    const before = await render(a, "stable-" + index + "-a.png");
    const after = await render(b, "stable-" + index + "-b.png");
    assert.deepEqual(before.lines.find((line) => line.id === first.id), after.lines.find((line) => line.id === first.id), "Settled text changed on " + page.id);
    const notYet = first.start - 1;
    const future = await render(notYet, "boundary-" + index + ".png");
    assert(!future.lines.some((line) => line.id === first.id), "Lyric mounted early on " + page.id);
    manifest.push({id: page.id, frame, image: name, stabilityFrames: [a, b],
      crop: {x: Math.floor(first.x - 2), y: Math.floor(first.y - 2), width: Math.ceil(first.width + 4), height: Math.ceil(first.height + 4)}});
    console.log("Verified " + (index + 1) + "/27: " + page.id);
  }
  await render(14010, "last-frame.png");
  await writeFile(path.join(output, "inspection.json"), JSON.stringify({composition: {width: 1920, height: 1080, fps: 60, frames: composition.durationInFrames}, pages: prepared, manifest}, null, 2));
  console.log("27 scenes verified: font loading, glyph bounds, native time order, no early lyrics, fixed settled glyphs.");
} finally {
  await browser.close({silent: true});
}
