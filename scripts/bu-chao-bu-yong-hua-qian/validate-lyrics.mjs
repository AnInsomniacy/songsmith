import { readFile } from "node:fs/promises";

const payload = JSON.parse(
  await readFile(
    new URL(
      "../../public/songs/bu-chao-bu-yong-hua-qian/data/lyrics.json",
      import.meta.url,
    ),
    "utf8",
  ),
);

let previousLineStart = -1;
let unitCount = 0;
for (const line of payload.lines) {
  if (line.startMs <= previousLineStart) {
    throw new Error(`Non-monotonic line start at ${line.id}`);
  }
  previousLineStart = line.startMs;
  let previousUnitStart = -1;
  let previousUnitFrame = -1;
  for (const unit of line.characters) {
    if (unit.startMs < previousUnitStart) {
      throw new Error(`Non-monotonic unit start at ${line.id}/${unit.index}`);
    }
    if (unit.endMs <= unit.startMs) {
      throw new Error(`Invalid unit duration at ${line.id}/${unit.index}`);
    }
    const unitFrame = Math.round((unit.startMs / 1000) * 60);
    if (unitFrame <= previousUnitFrame) {
      throw new Error(`Units share a frame at ${line.id}/${unit.index}`);
    }
    previousUnitStart = unit.startMs;
    previousUnitFrame = unitFrame;
    unitCount += 1;
  }
  const renderedText = line.characters.map((unit) => unit.text).join("").trim();
  if (renderedText !== line.text) {
    throw new Error(`Unit text mismatch at ${line.id}`);
  }
}

if (!payload.source?.primary?.includes("lyrics.kugou.com")) {
  throw new Error("Primary lyric source is not KRC");
}
if (payload.intro?.credits?.length < 6) {
  throw new Error("Opening credits are incomplete");
}
if (payload.intro?.vocalises?.length !== 2) {
  throw new Error("Opening vocalises are incomplete");
}

console.log(
  `Validated ${payload.lines.length} lines and ${unitCount} timed units; final audio ${payload.audioDurationMs}ms`,
);
