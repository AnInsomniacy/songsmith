/* global document */
import { bundle } from "@remotion/bundler";
import { getCompositions, openBrowser, renderStill } from "@remotion/renderer";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { root } from "./lib/paths.mjs";

const output = path.join(root, ".work/inspection");
await mkdir(output, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });
const browser = await openBrowser("chrome");
const report = [];
const open = browser.newPage.bind(browser);
browser.newPage = async (options) => {
  const page = await open(options),
    close = page.close.bind(page);
  page.close = async (...args) => {
    const state = await page.evaluate(() => ({
      failedFonts: [...document.fonts]
        .filter((f) => f.status === "error")
        .map((f) => f.family),
      invalid: [...document.querySelectorAll("svg [transform]")].filter((el) =>
        /NaN|Infinity/.test(el.getAttribute("transform")),
      ).length,
    }));
    assert.deepEqual(state.failedFonts, []);
    assert.equal(state.invalid, 0);
    return close(...args);
  };
  return page;
};
try {
  const compositions = await getCompositions(serveUrl, {
    puppeteerInstance: browser,
  });
  for (const composition of compositions) {
    if (process.argv[2] && composition.id !== process.argv[2]) continue;
    const frames = [
      0,
      Math.round(composition.fps * 44.5),
      Math.round(composition.durationInFrames * 0.6),
    ];
    for (const frame of frames) {
      const file = path.join(output, `${composition.id}-${frame}.png`);
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: file,
        puppeteerInstance: browser,
      });
      report.push({ composition: composition.id, frame, file });
      console.log(`Inspected ${composition.id}: frame ${frame}`);
    }
  }
  await writeFile(
    path.join(output, "report.json"),
    JSON.stringify(
      {
        scope:
          "Representative rendering, failed fonts, and invalid SVG transforms; not a full visual or audio audit.",
        frames: report,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close({ silent: true });
}
