import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const base = new URL("../../public/songs/one-last-kiss/", import.meta.url);
const data = JSON.parse(
  await readFile(new URL("data/lyrics.json", base), "utf8"),
);
const krc = await readFile(new URL("data/raw/one-last-kiss.krc", base), "utf8");
const native = [...krc.matchAll(/^\[(\d+),(\d+)\](.*)$/gm)].slice(3);
assert.equal(data.lines.length, 45);
let units = 0;
for (const [i, line] of data.lines.entries()) {
  const row = native[i];
  const source = [
    ...row[3].matchAll(/<(\d+),(\d+),\d+>(.*?)(?=<\d+,\d+,\d+>|$)/g),
  ];
  assert.equal(line.startMs, +row[1]);
  assert.equal(line.endMs, +row[1] + +row[2]);
  assert.equal(line.characters.length, source.length);
  assert.equal(line.text, line.characters.map((c) => c.text).join(""));
  if (line.kind === "lyric")
    assert(line.translation.trim().length > 0, "Missing Chinese translation");
  else
    assert.equal(
      line.translation,
      "",
      "Vocalises should not acquire invented semantic translations",
    );
  for (const [j, unit] of line.characters.entries()) {
    assert.deepEqual(unit, {
      text: source[j][3],
      index: j,
      startMs: +row[1] + +source[j][1],
      endMs: +row[1] + +source[j][1] + +source[j][2],
    });
    assert(unit.endMs >= unit.startMs);
    if (j) assert(unit.startMs >= line.characters[j - 1].startMs);
    if (unit.endMs === unit.startMs)
      assert.equal(
        unit.text.trim(),
        "",
        "Only native layout whitespace may have zero duration",
      );
    units++;
  }
  if (i) assert(line.startMs >= data.lines[i - 1].startMs);
}
assert.equal(units, 382);
assert.equal(Math.ceil(data.audioDurationMs * 0.06), 15122);
assert(data.lines.at(-1).characters.at(-1).endMs < data.audioDurationMs);
console.log(
  "Verified native KRC preservation, 45 bilingual rows, 382 units, and full audio duration.",
);
