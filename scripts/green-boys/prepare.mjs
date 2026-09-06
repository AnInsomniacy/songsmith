import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { inflateSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { fileURLToPath, URLSearchParams } from "node:url";

const root = new URL("../../", import.meta.url);
const base = new URL("public/songs/green-boys/", root);
const audio = new URL("audio/Green boys.mp3", base);
const bytes = await readFile(audio);
const probe = JSON.parse(
  execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration:format_tags=title,artist,album",
      "-of",
      "json",
      fileURLToPath(audio),
    ],
    { encoding: "utf8" },
  ),
);
const durationMs = Number(probe.format.duration) * 1000;
const query = new URLSearchParams({
  ver: "1",
  man: "yes",
  client: "pc",
  keyword: "GReeeeN Green boys",
  duration: String(Math.round(durationMs)),
  hash: createHash("md5").update(bytes).digest("hex").toUpperCase(),
});
const response = await (
  await fetch(`https://lyrics.kugou.com/search?${query}`)
).json();
const chosen = response.candidates?.find((c) => String(c.id) === "169273813");
if (!chosen || Math.abs(chosen.duration - durationMs) > 500)
  throw new Error(
    "The verified native candidate is unavailable or duration changed",
  );
const url = new URL("https://lyrics.kugou.com/download");
url.search = new URLSearchParams({
  ver: "1",
  client: "pc",
  id: String(chosen.id),
  accesskey: chosen.accesskey,
  fmt: "krc",
  charset: "utf8",
}).toString();
const payload = await (await fetch(url)).json();
const encrypted = Buffer.from(payload.content, "base64");
if (encrypted.subarray(0, 4).toString() !== "krc1")
  throw new Error("Invalid native KRC");
const key = [
  64, 71, 97, 119, 94, 50, 116, 71, 81, 54, 49, 45, 206, 210, 110, 105,
];
const raw = inflateSync(
  Buffer.from(encrypted.subarray(4).map((b, i) => b ^ key[i % key.length])),
).toString("utf8");
let previousFrame = -1;
const lines = [...raw.matchAll(/^\[(\d+),(\d+)\](.*)$/gm)].map(
  (match, index) => {
    const startMs = Number(match[1]);
    const endMs = startMs + Number(match[2]);
    const characters = [...match[3].matchAll(/<(\d+),(\d+),\d+>([^<]*)/g)].map(
      (unit, unitIndex) => {
        const start = startMs + Number(unit[1]);
        const end = start + Number(unit[2]);
        // Empty spaces and punctuation are retained as source units, not fabricated vocals.
        const vocal = /[\p{L}\p{N}]/u.test(unit[3]);
        const frame = vocal
          ? Math.max(Math.round((start * 60) / 1000), previousFrame + 1)
          : Math.round((start * 60) / 1000);
        if (vocal) previousFrame = frame;
        return {
          text: unit[3],
          index: unitIndex,
          startMs: start,
          endMs: end,
          frame,
          vocal,
        };
      },
    );
    return {
      index,
      kind: index < 4 ? "credit" : "lyric",
      text: characters.map((c) => c.text).join(""),
      startMs,
      endMs,
      characters,
    };
  },
);
if (lines.length !== 64 || !lines.at(-1).text.includes("挑み続けるんだ"))
  throw new Error("Native text changed or ending missing");
await mkdir(new URL("data/raw/", base), { recursive: true });
await writeFile(new URL("data/raw/Green boys.krc", base), raw);
await writeFile(
  new URL("data/lyrics.json", base),
  JSON.stringify(
    {
      title: "Green boys",
      artist: "GReeeeN",
      durationMs,
      fps: 60,
      source: {
        platform: "Kugou",
        lyricId: String(chosen.id),
        candidateDurationMs: chosen.duration,
        audioAlbum: probe.format.tags.album,
        lyricAlbum: "GReeeeN to All Sports Lovers",
        retrieval:
          "Current audio bytes used for native platform lookup; hash not retained",
        timing:
          "Native KRC timestamps, no global offset, no ASR or forced alignment",
        textReference: "https://www.uta-net.com/song/131274/",
        officialSong: "https://gre4n-boyz.com/discography/album/8",
        translation:
          "Chinese translation prepared from the complete Japanese text; not claimed as an official translation",
        validationBoundary:
          "Text completeness and platform identity checked. Native timings retained; no claim of human auditory verification.",
      },
      lines,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Prepared ${lines.length - 4} vocal lines from native KRC ${chosen.id}; ${Math.round(durationMs)} ms; offset 0`,
);
