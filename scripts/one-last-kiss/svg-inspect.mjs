/* global document */
import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  selectComposition,
  renderStill,
} from "@remotion/renderer";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";
import data from "../../public/songs/one-last-kiss/data/lyrics.json" with { type: "json" };
const root = resolve(import.meta.dirname, "../..");
const dir = resolve(root, ".work/one-last-kiss-svg");
await mkdir(dir, { recursive: true });
const serveUrl = await bundle({ entryPoint: resolve(root, "src/index.ts") });
const browser = await openBrowser("chrome");
const original = browser.newPage.bind(browser);
let current = 0;
const results = [];
browser.newPage = async (options) => {
  const page = await original(options);
  const close = page.close.bind(page);
  page.close = async (...args) => {
    const snapshot = await page.evaluate(() => ({
      fonts: [...document.fonts]
        .filter((f) => f.family.includes("OLK SVG"))
        .map((f) => ({ family: f.family, status: f.status })),
      text: [
        ...document.querySelectorAll("[data-svg-unit],[data-svg-translation]"),
      ].map((el) => {
        const b = el.getBoundingClientRect();
        return {
          id: el.getAttribute("data-svg-unit"),
          translation: el.getAttribute("data-svg-translation"),
          text: el.textContent,
          x: b.x,
          y: b.y,
          width: b.width,
          height: b.height,
          style: el.outerHTML,
        };
      }),
    }));
    if (snapshot.text.length) {
      assert(snapshot.fonts.every((f) => f.status === "loaded"));
      for (const el of snapshot.text) {
        assert(
          el.x >= 100 && el.x + el.width < 1830,
          `Horizontal overflow ${el.text}`,
        );
        assert(
          el.y >= 100 && el.y + el.height < 1015,
          `Vertical overflow ${el.text}`,
        );
        if (el.id) {
          const m = el.id.match(/^line-(\d+)-(\d+)$/);
          const unit = data.lines[+m[1]].characters[+m[2]];
          assert(
            current >= Math.round(unit.startMs * 0.06),
            "Early native unit",
          );
        }
      }
      results.push({ frame: current, ...snapshot });
    }
    return close(...args);
  };
  return page;
};
try {
  const composition = await selectComposition({
    serveUrl,
    id: "OneLastKiss-GPT6Astra-SVG",
    puppeteerInstance: browser,
  });
  for (const frame of [0, 1460, 5100, 6400, 6450, 10600, 14000]) {
    current = frame;
    await renderStill({
      serveUrl,
      composition,
      puppeteerInstance: browser,
      frame,
      output: resolve(dir, `frame-${frame}.png`),
      imageFormat: "png",
    });
    console.log("Verified representative frame", frame);
  }
  const a = results.find((s) => s.frame === 6400);
  const b = results.find((s) => s.frame === 6450);
  const settled = a.text.filter((el) => {
    if (!el.id) return false;
    const m = el.id.match(/^line-(\d+)-(\d+)$/);
    return (
      Math.round(data.lines[+m[1]].characters[+m[2]].startMs * 0.06) + 10 <=
      6400
    );
  });
  for (const el of settled)
    assert.deepEqual(
      el,
      b.text.find((x) => x.id === el.id),
      "Settled text moved",
    );
  await writeFile(
    resolve(dir, "layout-validation.json"),
    JSON.stringify(
      {
        scope:
          "Representative frames, glyph bounds, font loading, native visibility and settled text. Not a full-video anomaly scan.",
        results,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close({ silent: true });
}
