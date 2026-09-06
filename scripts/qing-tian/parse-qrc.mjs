import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const inputPath = path.join(
  root,
  "public/songs/qing-tian/data/qing-tian.qrc.response.json",
);
const outputPath = path.join(
  root,
  "public/songs/qing-tian/data/qing-tian.words.json",
);

const response = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const qrc = response?.data?.content;
if (typeof qrc !== "string" || qrc.length === 0) {
  throw new Error("QRC response does not contain data.content");
}

const timedLinePattern = /\[(\d+),(\d+)\]([^[]*)/gu;
const timedTokenPattern = /([^()]*?)\((\d+),(\d+)\)/gu;
const creditPrefixes = [
  "晴天 -",
  "词：",
  "曲：",
  "编曲：",
  "制作人：",
  "合声：",
  "合声编写：",
  "吉他：",
  "贝斯：",
  "鼓：",
  "录音助理：",
  "录音工程：",
  "混音工程：",
];

const splitTimedToken = (text, startMs, durationMs) => {
  const graphemes = Array.from(text);
  if (graphemes.length === 0) return [];
  return graphemes.map((character, index) => ({
    text: character,
    startMs: Math.round(startMs + (durationMs * index) / graphemes.length),
    endMs: Math.round(startMs + (durationMs * (index + 1)) / graphemes.length),
  }));
};

const lines = [];
for (const match of qrc.matchAll(timedLinePattern)) {
  const startMs = Number(match[1]);
  const durationMs = Number(match[2]);
  const rawBody = match[3].trimEnd();
  const text = rawBody.replace(/\(\d+,\d+\)/gu, "").trim();
  if (!text) continue;

  const characters = [];
  for (const token of rawBody.matchAll(timedTokenPattern)) {
    const tokenText = token[1];
    const tokenStart = Number(token[2]);
    const tokenDuration = Number(token[3]);
    characters.push(...splitTimedToken(tokenText, tokenStart, tokenDuration));
  }

  const cleanedCharacters = characters.filter((character) => character.text !== " ");
  const normalizedText = Array.from(text).filter((character) => character !== " ").join("");
  const normalizedCharacters = cleanedCharacters.map((character) => character.text).join("");
  const kind = creditPrefixes.some((prefix) => text.startsWith(prefix))
    ? "credit"
    : /^[A-Za-z\s]+$/u.test(text)
      ? "vocalise"
      : "lyric";

  if (kind !== "credit" && normalizedCharacters !== normalizedText) {
    throw new Error(`Character mismatch at ${startMs}ms: ${normalizedText} != ${normalizedCharacters}`);
  }

  lines.push({
    text: normalizedText,
    startMs,
    endMs: startMs + durationMs,
    durationMs,
    kind,
    characters: kind === "credit"
      ? []
      : cleanedCharacters.map((character, index) => ({...character, index})),
  });
}

const payload = {
  source: {
    provider: "QQ Music QRC via OIAPI",
    songId: 97773,
    songMid: "0039MnYb0qxYhV",
    title: "晴天",
    artist: "周杰伦",
    album: "叶惠美",
    retrievedAt: new Date().toISOString(),
  },
  durationMs: Math.max(...lines.map((line) => line.endMs)),
  lines,
};

fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${lines.length} timed lines to ${outputPath}`);
