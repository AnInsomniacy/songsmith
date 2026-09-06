/* global AbortSignal */
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { inflateSync } from "node:zlib";

const base = new URL("../../public/songs/one-last-kiss/", import.meta.url);
const input =
  process.argv[2] ??
  "/Users/sekiro/Downloads/One+Last+Kiss-宇多田ヒカル#2mJjIN.mp3";
const audio = await readFile(input);
const probe = JSON.parse(
  spawnSync("ffprobe", ["-v", "error", "-show_format", "-of", "json", input], {
    encoding: "utf8",
  }).stdout,
);
const audioDurationMs = Math.round(Number(probe.format.duration) * 1000);
const hash = createHash("md5").update(audio).digest("hex").toUpperCase();
const get = async (url) => {
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", Referer: "https://y.qq.com/" },
    signal: AbortSignal.timeout(30000),
  });
  if (!r.ok) throw new Error(`${r.status}: ${url}`);
  return r;
};
const search = await (
  await get(
    `https://lyrics.kugou.com/search?ver=1&man=yes&client=pc&hash=${hash}&duration=${audioDurationMs}&keyword=${encodeURIComponent("宇多田ヒカル - One Last Kiss")}`,
  )
).json();
const candidate = search.candidates?.find(
  (c) =>
    c.id === "286935227" &&
    c.singer === "宇多田ヒカル" &&
    c.song === "One Last Kiss",
);
if (!candidate || Math.abs(candidate.duration - audioDurationMs) > 100)
  throw new Error(
    "Current recording did not return the audited native lyric candidate.",
  );
const endpoint = `https://lyrics.kugou.com/download?ver=1&client=pc&id=${candidate.id}&accesskey=${candidate.accesskey}&fmt=krc&charset=utf8`;
const encrypted = await (await get(endpoint)).json();
const buffer = Buffer.from(encrypted.content, "base64");
if (buffer.subarray(0, 4).toString() !== "krc1")
  throw new Error("Source is not native KRC");
const bytes = buffer.subarray(4);
const key = [
  0x40, 0x47, 0x61, 0x77, 0x5e, 0x32, 0x74, 0x47, 0x51, 0x36, 0x31, 0x2d, 0xce,
  0xd2, 0x6e, 0x69,
];
for (let i = 0; i < bytes.length; i++) bytes[i] ^= key[i % key.length];
const raw = inflateSync(bytes).toString("utf8");
const offset = Number(raw.match(/^\[offset:(-?\d+)\]$/m)?.[1] ?? 0);
if (offset !== 0) throw new Error("Unexpected native offset");
const rows = [...raw.matchAll(/^\[(\d+),(\d+)\](.*)$/gm)].map((m, rowIndex) => {
  const characters = [
    ...m[3].matchAll(/<(\d+),(\d+),\d+>(.*?)(?=<\d+,\d+,\d+>|$)/g),
  ].map((u, index) => ({
    text: u[3],
    index,
    startMs: Number(m[1]) + Number(u[1]),
    endMs: Number(m[1]) + Number(u[1]) + Number(u[2]),
  }));
  return {
    id: `line-${rowIndex - 3}`,
    text: characters.map((c) => c.text).join(""),
    startMs: Number(m[1]),
    endMs: Number(m[1]) + Number(m[2]),
    kind:
      rowIndex < 3
        ? "credit"
        : /^Oh(?: oh)+$/.test(characters.map((c) => c.text).join(""))
          ? "vocalise"
          : "lyric",
    characters,
  };
});
if (rows.length !== 48 || rows.at(-1).text !== "追いかけた 眩しい午後")
  throw new Error("Unexpected or incomplete lyric edition");
const translation = JSON.parse(
  await readFile(new URL("translations.json", import.meta.url), "utf8"),
);
const lines = rows.slice(3).map((line, index) => {
  if (translation[index]?.original !== line.text)
    throw new Error(`Translation mismatch at ${index}`);
  return { ...line, translation: translation[index].zh };
});
const qqUrl =
  "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=003Rxsvb1Vwl5U&songid=299695338&format=json&nobase64=1&g_tk=5381";
const qq = await (await get(qqUrl)).json();
const normal = (text) =>
  text.replace(/[\s、，。,.!?？!「」()（）'’…]/gu, "").toLowerCase();
const qqLines = [...qq.lyric.matchAll(/^\[(\d+):(\d+(?:\.\d+)?)\](.*)$/gm)].map(
  (m) => ({
    startMs: Math.round((Number(m[1]) * 60 + Number(m[2])) * 1000),
    text: m[3],
  }),
);
for (const line of lines) {
  if (
    !qqLines.some(
      (q) =>
        normal(q.text) === normal(line.text) &&
        Math.abs(q.startMs - line.startMs) <= 10,
    )
  )
    throw new Error(`QQ cross-check failed: ${line.text}`);
}
for (const line of lines)
  for (const [i, unit] of line.characters.entries()) {
    if (
      unit.endMs < unit.startMs ||
      (i > 0 && unit.startMs < line.characters[i - 1].startMs)
    )
      throw new Error("Invalid native timing");
  }
const data = {
  title: "One Last Kiss",
  artist: "宇多田ヒカル",
  album: "One Last Kiss",
  audioDurationMs,
  language: "ja",
  translationLanguage: "zh-Hans",
  source: {
    platform: "酷狗音乐",
    format: "KRC",
    lyricId: candidate.id,
    designation: candidate.product_from,
    nativeDurationMs: candidate.duration,
    official: "https://www.utadahikaru.jp/music/ghmo4tohwu8i/",
    textReference: "https://www.uta-net.com/song/298948/",
    qqSong: "https://y.qq.com/n/ryqq/songDetail/003Rxsvb1Vwl5U",
    neteaseSong: "https://music.163.com/song?id=1824020871",
    identity:
      "Lookup uses the supplied file hash, duration, and exact artist/title. Hash alone had no result; artist/title fallback returned this edition.",
    verification:
      "Full text checked against Uta-Net. All 45 vocal row starts match QQ within 10 ms. Recording duration differs by 28 ms. Direct human listening is not certified by this automated check.",
    timingPolicy:
      "Native unit timestamps are preserved, including zero-duration layout spaces. No ASR, forced alignment, estimated splitting, or global offset.",
  },
  credits: rows.slice(0, 3),
  lines,
};
for (const dir of ["audio/", "data/raw/", "fonts/", "assets/"])
  await mkdir(new URL(dir, base), { recursive: true });
await copyFile(input, new URL("audio/one-last-kiss.mp3", base));
await writeFile(new URL("data/raw/one-last-kiss.krc", base), raw);
await writeFile(
  new URL("data/raw/kugou-response.json", base),
  JSON.stringify(encrypted),
);
await writeFile(
  new URL("data/raw/qq-reference.json", base),
  JSON.stringify(qq, null, 2),
);
await writeFile(
  new URL("data/lyrics.json", base),
  JSON.stringify(data, null, 2) + "\n",
);
console.log(
  JSON.stringify({
    lines: lines.length,
    units: lines.reduce((n, l) => n + l.characters.length, 0),
    audioDurationMs,
    durationInFrames: Math.ceil(audioDurationMs * 0.06),
  }),
);
