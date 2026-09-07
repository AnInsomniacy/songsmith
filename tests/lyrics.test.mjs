import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { parseKrc } from "../scripts/lib/krc.mjs";
import { parseQrc } from "../scripts/lib/qrc.mjs";
import { root, songPath } from "../scripts/lib/paths.mjs";

test("KRC preserves zero-duration native layout units", () => {
  const [line] = parseKrc("[offset:0]\n[100,40]<0,0,0> <0,40,0>Hello");
  assert.equal(line.units[0].startMs, line.units[0].endMs);
  assert.equal(line.units[1].text, "Hello");
});

test("QRC preserves whole solfege syllables", () => {
  const [line] = parseQrc("[100,500]Re(100,200) So(300,300)");
  assert.deepEqual(
    line.units.map((u) => [u.text.trim(), u.startMs, u.endMs]),
    [
      ["Re", 100, 300],
      ["So", 300, 600],
    ],
  );
});

for (const title of readdirSync(`${root}/public/songs`)) {
  test(`${title}: source-backed timing and complete text`, () => {
    const data = JSON.parse(
      readFileSync(songPath(title, "data/lyrics.json"), "utf8"),
    );
    assert.equal(data.title, title);
    assert(data.artists.length > 0);
    assert(data.audioDurationMs > 0);
    const raw = readFileSync(
      songPath(title, "data", data.source.rawFile),
      "utf8",
    );
    const rows =
      data.source.format === "KRC"
        ? parseKrc(raw)
        : parseQrc(JSON.parse(raw).data.content);
    const lines = [
      ...data.credits,
      ...(data.intro?.vocalises ?? []),
      ...data.lines,
    ];
    for (const line of lines) {
      if (!line.units?.length) continue;
      assert.equal(
        line.units
          .map((u) => u.text)
          .join("")
          .replace(/\s/g, ""),
        line.text.replace(/\s/g, ""),
        line.id,
      );
      let previous = -Infinity;
      for (const [index, unit] of line.units.entries()) {
        assert.equal(unit.index, index);
        assert(
          unit.startMs >= previous && unit.endMs >= unit.startMs,
          `${line.id}/${index}`,
        );
        previous = unit.startMs;
        if (unit.sourceRow === undefined) {
          assert.equal(unit.kind, "layout");
          assert.equal(unit.text.trim(), "");
          continue;
        }
        const source = rows[unit.sourceRow]?.units[unit.sourceUnit];
        assert(source, `${line.id}: missing native unit`);
        assert.equal(unit.startMs, source.startMs);
        assert.equal(unit.endMs, source.endMs);
        assert.equal(unit.nativeText, source.text);
      }
      if (data.language === "ja" && line.kind === "lyric")
        assert(line.translation?.trim(), line.id);
    }
  });
}
