import {inflateSync} from "node:zlib";
import {mkdir, writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const LYRIC_ID = "136723529";
const ACCESS_KEY = "C5B57B55D0618B7AC66789A0F93F192F";
const AUDIO_DURATION_MS = 227641;
const LYRIC_DURATION_MS = 227030;
const SONG_PAGE = "https://www.kugou.com/mixsong/nkyal3b.html";
const DOWNLOAD_URL = `https://lyrics.kugou.com/download?ver=1&client=pc&id=${LYRIC_ID}&accesskey=${ACCESS_KEY}&fmt=krc&charset=utf8`;
const KRC_KEY = Buffer.from([
  0x40, 0x47, 0x61, 0x77, 0x5e, 0x32, 0x74, 0x47, 0x51, 0x36, 0x31,
  0x2d, 0xce, 0xd2, 0x6e, 0x69,
]);

const response = await fetch(DOWNLOAD_URL, {
  headers: {"User-Agent": "Mozilla/5.0"},
});
if (!response.ok) throw new Error(`KRC request failed: ${response.status}`);
const payload = await response.json();
if (typeof payload.content !== "string") throw new Error("Missing KRC content");

const encrypted = Buffer.from(payload.content, "base64").subarray(4);
for (let i = 0; i < encrypted.length; i++) encrypted[i] ^= KRC_KEY[i % KRC_KEY.length];
const krc = inflateSync(encrypted).toString("utf8");
const offsetMs = Number(krc.match(/^\[offset:(-?\d+)\]$/m)?.[1] ?? 0);
const rowPattern = /^\[(\d+),(\d+)\](.*)$/gm;
const unitPattern = /<(\d+),(\d+),\d+>(.*?)(?=<\d+,\d+,\d+>|$)/g;
const rows = [];

for (const rowMatch of krc.matchAll(rowPattern)) {
  const startMs = Number(rowMatch[1]) + offsetMs;
  const rowDuration = Number(rowMatch[2]);
  const characters = [];
  for (const unitMatch of rowMatch[3].matchAll(unitPattern)) {
    const relativeStart = Number(unitMatch[1]);
    const duration = Math.max(1, Number(unitMatch[2]));
    characters.push({
      text: unitMatch[3],
      startMs: startMs + relativeStart,
      endMs: startMs + relativeStart + duration,
    });
  }
  if (characters.length === 0) continue;
  rows.push({
    text: characters.map((character) => character.text).join("").trim(),
    startMs,
    endMs: Math.max(startMs + rowDuration, characters.at(-1).endMs),
    characters,
  });
}

const credits = rows.slice(0, 3).map((row, index) => ({
  ...row,
  id: `credit-${index}`,
  kind: "credit",
  characters: row.characters.map((character, characterIndex) => ({
    ...character,
    index: characterIndex,
  })),
}));

const lines = rows.slice(3).map((row, index) => ({
  ...row,
  id: `line-${index}`,
  kind: "lyric",
  characters: row.characters.map((character, characterIndex) => ({
    ...character,
    index: characterIndex,
  })),
}));

const structured = {
  title: "加油",
  artists: ["林俊杰", "MC HotDog 热狗"],
  album: "100天",
  audioDurationMs: AUDIO_DURATION_MS,
  source: {
    platform: "酷狗音乐",
    format: "KRC",
    designation: "官方推荐歌词",
    songPage: SONG_PAGE,
    lyricId: LYRIC_ID,
    lyricDurationMs: LYRIC_DURATION_MS,
  },
  credits,
  lines,
};

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, "../../public/songs/jia-you/data");
const rawDir = path.join(dataDir, "raw");
await mkdir(rawDir, {recursive: true});
await writeFile(path.join(rawDir, "jia-you.krc"), krc);
await writeFile(path.join(dataDir, "lyrics.json"), `${JSON.stringify(structured, null, 2)}\n`);
console.log(`Wrote ${lines.length} official character-timed lines`);
