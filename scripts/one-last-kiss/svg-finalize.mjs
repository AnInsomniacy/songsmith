import { execFileSync } from "node:child_process";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";
const root = resolve(import.meta.dirname, "../..");
const dir = resolve(root, ".work/one-last-kiss-svg");
await mkdir(dir, { recursive: true });
const output = resolve(root, "out/One Last Kiss（GPT-6 Astra · SVG）.mp4");
const check = (file) =>
  JSON.parse(
    execFileSync(
      resolve(root, ".venv/bin/python"),
      [resolve(root, "scripts/one-last-kiss/svg-verify-audio.py"), file],
      { encoding: "utf8" },
    ),
  );
const before = check(output);
let after = before;
if (!before.passed) {
  assert(
    before.checks.every((c) => c.similarity > 0.98),
    "Audio differs beyond an encoding delay; investigate before replacing",
  );
  const temp = resolve(dir, "soundtrack.mp4");
  execFileSync("ffmpeg", [
    "-v",
    "error",
    "-y",
    "-i",
    output,
    "-i",
    resolve(root, "public/songs/one-last-kiss/audio/one-last-kiss.mp3"),
    "-map",
    "0:v:0",
    "-map",
    "1:a:0",
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    "-b:a",
    "320k",
    "-ar",
    "48000",
    "-t",
    String(15122 / 60),
    "-movflags",
    "+faststart",
    temp,
  ]);
  after = check(temp);
  assert(after.passed, "Corrected soundtrack failed alignment");
  await rename(temp, output);
  after.file = output;
}
await writeFile(
  resolve(dir, "audio-validation.json"),
  JSON.stringify(
    {
      before,
      after,
      video: "Original H.264 packets preserved if audio remux was needed.",
    },
    null,
    2,
  ),
);
console.log(JSON.stringify(after, null, 2));
