import { inflateSync } from "node:zlib";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const AUDIO_DURATION_MS = 233_508;
const KUGOU_ID = "211083113";
const KUGOU_ACCESS_KEY = "547122AD81120288E3AB60C01CA35AD4";
const KUGOU_ENDPOINT = `https://lyrics.kugou.com/download?ver=1&client=pc&id=${KUGOU_ID}&accesskey=${KUGOU_ACCESS_KEY}&fmt=krc&charset=utf8`;
const QQ_REFERENCE =
  "https://y.qq.com/n/ryqq/songDetail/0026G2Lq3Cl7ig";
const NETEASE_REFERENCE = "https://music.163.com/song?id=108463";

const QRC_XOR_KEY = Buffer.from([
  0x40, 0x47, 0x61, 0x77, 0x5e, 0x32, 0x74, 0x47, 0x51, 0x36, 0x31,
  0x2d, 0xce, 0xd2, 0x6e, 0x69,
]);

const CANONICAL_LINES = [
  "Hey greedy, don't fret",
  "What you see is what you get",
  "You name it, I have it",
  "What you see is what you get",
  "左左左左偏左就用左手",
  "生活就不用想太多",
  "怦怦怦怦心动张开眼睛",
  "就记得当下的强烈",
  "有时灵光一闪而过",
  "牛顿也吃苹果",
  "我的念头不太啰嗦",
  "限时间能入座",
  "请你不要到处叩叩",
  "潮流需要抠抠不小心就没抠抠",
  "用力到处扣扣花掉所有抠抠",
  "钱买不到绝活",
  "你说听说听说你听谁说",
  "跟着乱走闹哄哄",
  "通通通通普通普通",
  "如果不懂不要随便拒绝",
  "有时灵光一闪而过",
  "牛顿也吃苹果",
  "我的念头不太啰嗦",
  "限时间能入座",
  "请你不要到处叩叩",
  "潮流需要抠抠不小心就没抠抠",
  "用力到处扣扣花掉所有抠抠",
  "钱买不到绝活",
  "Little chick having chips on my sofa",
  "Bearbricks take a **** on my sofa",
  "Smudge babies lying on my sofa",
  "Neighborhoods and kiks singing sofa",
  "Little chick having chips on my sofa",
  "Bearbricks take a shit on my sofa",
  "Smudge babies lying on my sofa",
  "Hey greedy, don't fret",
  "What you see is what you get",
  "You name it, I have it",
  "What you see is what you get",
  "请你不要到处叩叩",
  "潮流需要抠抠不小心就没抠抠",
  "用力到处扣扣花掉所有抠抠",
  "钱买不到绝活",
  "Hey greedy, don't fret",
  "What you see is what you get",
  "You name it, I have it",
  "What you see is what you get",
  "Hey greedy, don't fret",
  "What you see is what you get",
  "You name it, I have it",
  "What you see is what you get",
  "喔噢扣扣扣扣喔噢",
];

const normalize = (value) =>
  value
    .replaceAll("sh*t", "shit")
    .replaceAll("罗嗦", "啰嗦")
    .replace(/[\s,，.。'’“”!?！？*()（）/：:-]/gu, "")
    .toLowerCase();

const response = await fetch(KUGOU_ENDPOINT, {
  headers: { "User-Agent": "Mozilla/5.0" },
});
if (!response.ok) {
  throw new Error(`KRC request failed: ${response.status}`);
}

const payload = await response.json();
if (typeof payload?.content !== "string") {
  throw new Error("KRC payload is missing");
}

const encrypted = Buffer.from(payload.content, "base64").subarray(4);
for (let index = 0; index < encrypted.length; index += 1) {
  encrypted[index] ^= QRC_XOR_KEY[index % QRC_XOR_KEY.length];
}
const krc = inflateSync(encrypted).toString("utf8");

const rowPattern = /^\[(\d+),(\d+)\](.*)$/gm;
const unitPattern = /<(\d+),(\d+),\d+>(.*?)(?=<\d+,\d+,\d+>|$)/g;
const sourceRows = [];

for (const match of krc.matchAll(rowPattern)) {
  const startMs = Number(match[1]);
  const durationMs = Number(match[2]);
  const units = [];
  for (const unitMatch of match[3].matchAll(unitPattern)) {
    const relativeStart = Number(unitMatch[1]);
    const duration = Math.max(1, Number(unitMatch[2]));
    const text = unitMatch[3]
      .replaceAll("sh*t", "shit")
      .replaceAll("罗嗦", "啰嗦");
    units.push({
      text,
      startMs: startMs + relativeStart,
      endMs: startMs + relativeStart + duration,
    });
  }
  if (units.length === 0) continue;
  sourceRows.push({
    startMs,
    endMs: Math.max(startMs + durationMs, units.at(-1).endMs),
    text: units.map((unit) => unit.text).join(""),
    units,
  });
}

const vocaliseOnly = /^(ah)+$|^(yeah)+$|^(oh)+$|^(wo)+$|^comeon$/iu;
let cursor = sourceRows.findIndex((row) => row.startMs >= 12_000);
const lines = [];

for (const target of CANONICAL_LINES) {
  const targetText = normalize(target);
  let match = null;

  for (let start = cursor; start < sourceRows.length; start += 1) {
    if (vocaliseOnly.test(normalize(sourceRows[start].text))) continue;
    const rows = [];
    let accumulated = "";
    for (let end = start; end < Math.min(sourceRows.length, start + 4); end += 1) {
      const row = sourceRows[end];
      if (rows.length > 0 && vocaliseOnly.test(normalize(row.text))) break;
      rows.push(row);
      accumulated += normalize(row.text);
      if (accumulated === targetText) {
        match = { rows, nextCursor: end + 1 };
        break;
      }
      if (!targetText.startsWith(accumulated)) break;
    }
    if (match) break;
  }

  if (!match) {
    throw new Error(
      `Unable to align canonical line: ${target}; source=${JSON.stringify(
        sourceRows.slice(cursor, cursor + 6).map((row) => row.text),
      )}`,
    );
  }

  cursor = match.nextCursor;
  const characters = [];
  for (const [rowIndex, row] of match.rows.entries()) {
    if (rowIndex > 0) {
      const previous = characters.at(-1);
      characters.push({
        text: " ",
        startMs: previous.endMs,
        endMs: Math.max(previous.endMs + 1, row.startMs),
      });
    }
    characters.push(...row.units);
  }

  const text = characters.map((unit) => unit.text).join("").trim();
  lines.push({
    id: `line-${lines.length}`,
    text,
    startMs: match.rows[0].startMs,
    endMs: match.rows.at(-1).endMs,
    kind: "lyric",
    alignment: "krc-primary",
    characters: characters.map((unit, index) => ({ ...unit, index })),
  });
}

const introVocalRows = sourceRows.filter(
  (row) => row.startMs >= 12_000 && row.startMs < lines[0].startMs,
);

const out = {
  source: {
    primary: KUGOU_ENDPOINT,
    references: [QQ_REFERENCE, NETEASE_REFERENCE],
  },
  songId: KUGOU_ID,
  title: "不潮不用花钱",
  artist: "林俊杰",
  audioDurationMs: AUDIO_DURATION_MS,
  intro: {
    credits: [
      { label: "词", value: "林怡凤" },
      { label: "曲", value: "林俊杰" },
      { label: "编曲", value: "林俊杰 / Kenn C" },
      { label: "制作", value: "林俊杰" },
      { label: "吉他", value: "林俊杰 / Kenn C" },
      { label: "录音与混音", value: "吴剑泓 / Joe Vannelli" },
    ],
    vocalises: introVocalRows.map((row, index) => ({
      id: `intro-vocal-${index}`,
      text: row.text,
      startMs: row.startMs,
      endMs: row.endMs,
      kind: "vocalise",
      characters: row.units.map((unit, unitIndex) => ({
        ...unit,
        index: unitIndex,
      })),
    })),
  },
  lines,
};

const here = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(
  here,
  "../../public/songs/bu-chao-bu-yong-hua-qian/data/lyrics.json",
);
await writeFile(outputPath, `${JSON.stringify(out, null, 2)}\n`);
console.log(`Wrote ${lines.length} KRC-aligned lyric lines to ${outputPath}`);
