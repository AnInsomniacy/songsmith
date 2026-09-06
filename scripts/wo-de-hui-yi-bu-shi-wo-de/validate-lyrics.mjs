import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(
  here,
  "../../public/songs/wo-de-hui-yi-bu-shi-wo-de",
);
const audioPath = path.join(publicDir, "audio/wo-de-hui-yi-bu-shi-wo-de.mp3");
const data = JSON.parse(
  await readFile(path.join(publicDir, "data/lyrics.json"), "utf8"),
);

if (
  data.source.platform !== "酷狗音乐" ||
  data.source.format !== "KRC" ||
  data.source.designation !== "官方推荐歌词"
) {
  throw new Error("Lyrics are not the selected official native KRC");
}
if (data.credits.length !== 3 || data.lines.length !== 50) {
  throw new Error("Unexpected credit or vocal line count");
}

const probe = spawnSync(
  "ffprobe",
  [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=nw=1:nk=1",
    audioPath,
  ],
  { encoding: "utf8" },
);
if (probe.status !== 0) throw new Error(probe.stderr || "ffprobe failed");
const audioDurationMs = Math.round(Number(probe.stdout.trim()) * 1000);
if (audioDurationMs !== data.audioDurationMs) {
  throw new Error("Structured data no longer matches the audio duration");
}
if (Math.abs(data.source.lyricDurationMs - audioDurationMs) > 250) {
  throw new Error("Native lyric duration does not match the current recording");
}

let previousLineStart = -1;
for (const line of [...data.credits, ...data.lines]) {
  if (line.startMs < previousLineStart || line.endMs <= line.startMs) {
    throw new Error(`Invalid line timing: ${line.id}`);
  }
  previousLineStart = line.startMs;
  const joined = line.characters.map((unit) => unit.text).join("");
  if (joined !== line.text) throw new Error(`Unit mismatch: ${line.id}`);
  let previousUnitStart = -1;
  for (const [index, unit] of line.characters.entries()) {
    if (
      unit.index !== index ||
      unit.startMs < line.startMs ||
      unit.endMs <= unit.startMs ||
      unit.startMs < previousUnitStart
    ) {
      throw new Error(`Invalid official unit timing: ${line.id}/${index}`);
    }
    previousUnitStart = unit.startMs;
  }
}

const anchors = [
  [data.lines[0].startMs, 15581],
  [data.lines[25].startMs, 115705],
  [data.lines.at(-1).endMs, 206018],
];
for (const [actual, expected] of anchors) {
  if (actual !== expected)
    throw new Error(`Anchor changed: ${actual} vs ${expected}`);
}

console.log(
  `Validated ${data.lines.length} native word-timed lines against ${audioDurationMs}ms audio`,
);
