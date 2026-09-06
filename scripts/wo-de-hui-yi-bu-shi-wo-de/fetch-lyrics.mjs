import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";

const TITLE = "我的回忆不是我的";
const ARTIST = "海鸣威";
const ALBUM = "Dance Dance Dance";
const OFFICIAL_PRODUCT = "官方推荐歌词";
const SONG_PAGE = "https://www.kugou.com/mixsong/12fasj2e.html";
const KRC_XOR_KEY = Buffer.from([
  0x40, 0x47, 0x61, 0x77, 0x5e, 0x32, 0x74, 0x47, 0x51, 0x36, 0x31, 0x2d, 0xce,
  0xd2, 0x6e, 0x69,
]);

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(
  here,
  "../../public/songs/wo-de-hui-yi-bu-shi-wo-de",
);
const audioPath = path.join(publicDir, "audio/wo-de-hui-yi-bu-shi-wo-de.mp3");
const dataDir = path.join(publicDir, "data");
const rawDir = path.join(dataDir, "raw");

const audio = await readFile(audioPath);
const lookupHash = createHash("md5").update(audio).digest("hex").toUpperCase();
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
const searchUrl =
  "https://lyrics.kugou.com/search?ver=1&man=yes&client=pc" +
  `&hash=${lookupHash}&duration=${audioDurationMs}`;

const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!response.ok) throw new Error(`Request failed with ${response.status}`);
  return response.json();
};

const search = await fetchJson(searchUrl);
const candidates = Array.isArray(search.candidates) ? search.candidates : [];
const candidate = candidates
  .filter(
    (entry) =>
      entry.product_from === OFFICIAL_PRODUCT &&
      entry.krctype === 1 &&
      entry.song === TITLE &&
      entry.singer === ARTIST,
  )
  .sort(
    (left, right) =>
      Math.abs(left.duration - audioDurationMs) -
      Math.abs(right.duration - audioDurationMs),
  )[0];

if (!candidate) throw new Error("No official native KRC matched this audio");
if (Math.abs(candidate.duration - audioDurationMs) > 250) {
  throw new Error(
    `Official KRC duration mismatch: ${candidate.duration} vs ${audioDurationMs}`,
  );
}

const downloadUrl =
  "https://lyrics.kugou.com/download?ver=1&client=pc" +
  `&id=${candidate.id}&accesskey=${candidate.accesskey}` +
  "&fmt=krc&charset=utf8";
const download = await fetchJson(downloadUrl);
if (typeof download.content !== "string") {
  throw new Error("Official KRC response has no encrypted content");
}

const encrypted = Buffer.from(download.content, "base64").subarray(4);
for (let index = 0; index < encrypted.length; index += 1) {
  encrypted[index] ^= KRC_XOR_KEY[index % KRC_XOR_KEY.length];
}
const krc = inflateSync(encrypted).toString("utf8");
const offsetMs = Number(krc.match(/^\[offset:(-?\d+)\]$/m)?.[1] ?? 0);
const rowPattern = /^\[(\d+),(\d+)\](.*)$/gm;
const unitPattern = /<(\d+),(\d+),\d+>(.*?)(?=<\d+,\d+,\d+>|$)/g;
const rows = [];

for (const rowMatch of krc.matchAll(rowPattern)) {
  const startMs = Number(rowMatch[1]) + offsetMs;
  const rowDurationMs = Number(rowMatch[2]);
  const units = [];
  for (const unitMatch of rowMatch[3].matchAll(unitPattern)) {
    const relativeStartMs = Number(unitMatch[1]);
    const durationMs = Math.max(1, Number(unitMatch[2]));
    units.push({
      text: unitMatch[3].replaceAll("　", " "),
      startMs: startMs + relativeStartMs,
      endMs: startMs + relativeStartMs + durationMs,
    });
  }
  if (units.length === 0) continue;
  units[0].text = units[0].text.trimStart();
  units.at(-1).text = units.at(-1).text.trimEnd();
  const text = units.map((unit) => unit.text).join("");
  if (!text.trim()) continue;
  rows.push({
    text,
    startMs,
    endMs: Math.max(startMs + rowDurationMs, units.at(-1).endMs),
    characters: units.map((unit, index) => ({ ...unit, index })),
  });
}

const credits = [];
const lines = [];
for (const row of rows) {
  const isCredit =
    row.startMs < 16_000 &&
    (row.text.includes(" - ") || /^(?:词|曲)：/u.test(row.text));
  if (isCredit) {
    credits.push({ ...row, id: `credit-${credits.length}`, kind: "credit" });
    continue;
  }
  const kind =
    /[A-Za-z]/u.test(row.text) && !/[\u3400-\u9fff]/u.test(row.text)
      ? "vocalise"
      : "lyric";
  lines.push({ ...row, id: `line-${lines.length}`, kind });
}

const structured = {
  title: TITLE,
  artists: [ARTIST],
  album: ALBUM,
  language: "粤语",
  audioDurationMs,
  source: {
    platform: "酷狗音乐",
    format: "KRC",
    designation: candidate.product_from,
    songPage: SONG_PAGE,
    lyricId: String(candidate.id),
    lyricDurationMs: candidate.duration,
  },
  credits,
  lines,
};

await mkdir(rawDir, { recursive: true });
await writeFile(path.join(rawDir, "wo-de-hui-yi-bu-shi-wo-de.krc"), krc);
await writeFile(
  path.join(dataDir, "lyrics.json"),
  `${JSON.stringify(structured, null, 2)}\n`,
);

console.log(
  `Saved official KRC ${candidate.id}: ${credits.length} credits, ${lines.length} vocal lines`,
);
