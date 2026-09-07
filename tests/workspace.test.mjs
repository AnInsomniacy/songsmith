import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { root } from "../scripts/lib/paths.mjs";

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(path.join(directory, entry.name))
      : [path.join(directory, entry.name)],
  );

test("literal public assets and shared font files exist", () => {
  for (const file of walk(path.join(root, "src")).filter((f) =>
    /\.tsx?$/.test(f),
  )) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(/staticFile\(\s*"([^"]+)"\s*\)/g)) {
      assert(
        existsSync(path.join(root, "public", match[1])),
        `${file}: ${match[1]}`,
      );
    }
    for (const match of text.matchAll(
      /font\([^,]+,\s*"([^"]+\.(?:woff2|ttf|otf))"/g,
    )) {
      assert(
        existsSync(path.join(root, "public/fonts", match[1])),
        `${file}: ${match[1]}`,
      );
    }
  }
});

test("every implementation has one entry and an exact render command", () => {
  const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
  const entry = readFileSync(path.join(root, "src/Root.tsx"), "utf8");
  assert.equal(pkg.name, "songsmith");
  const versions = Object.entries(pkg.dependencies)
    .filter(([key]) => key === "remotion" || key.startsWith("@remotion/"))
    .map(([, version]) => version);
  assert.equal(new Set(versions).size, 1);
  for (const title of readdirSync(path.join(root, "src/renders"))) {
    for (const model of readdirSync(path.join(root, "src/renders", title))) {
      assert(
        existsSync(path.join(root, "src/renders", title, model, "Video.tsx")),
      );
      assert(
        !existsSync(path.join(root, "src/renders", title, model, "entry.tsx")),
      );
      assert(entry.includes(`./renders/${title}/${model}/Video`));
      assert(pkg.scripts[`render:${title}:${model}`]);
      assert(
        existsSync(path.join(root, "public/songs", title, "data/lyrics.json")),
      );
    }
  }
});

test("README uses existing files and runnable commands", () => {
  const text = readFileSync(path.join(root, "README.md"), "utf8");
  assert(!/\p{Script=Han}/u.test(text), "README must remain English, including code examples");
  const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
  for (const match of text.matchAll(/npm run (?:"([^"]+)"|([a-zA-Z0-9:-]+))/g)) {
    assert(pkg.scripts[match[1] ?? match[2]], `Unknown README command: ${match[0]}`);
  }
  for (const target of [
    "docs/assets/one-last-kiss-preview.png",
    "docs/production.md",
    "AGENTS.md",
  ])
    assert(existsSync(path.join(root, target)));
});
