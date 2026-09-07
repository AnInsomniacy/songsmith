import { execFileSync } from "node:child_process";
import path from "node:path";
import { root } from "./lib/paths.mjs";

const run = (file, args) =>
  execFileSync(process.execPath, [path.join(root, file), ...args], {
    cwd: root,
    stdio: "inherit",
  });
run("node_modules/eslint/bin/eslint.js", ["src", "scripts", "tests"]);
run("node_modules/typescript/bin/tsc", ["--noEmit"]);
execFileSync(
  process.execPath,
  ["--test", "tests/lyrics.test.mjs", "tests/workspace.test.mjs"],
  { cwd: root, stdio: "inherit" },
);
