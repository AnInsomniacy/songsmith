import data from "../../public/songs/jia-you/data/lyrics.json" with {type: "json"};

if (data.source.designation !== "官方推荐歌词" || data.source.format !== "KRC") {
  throw new Error("Lyrics are not the selected official native KRC");
}
if (Math.abs(data.audioDurationMs - data.source.lyricDurationMs) > 1000) {
  throw new Error("Audio and official lyric durations do not match");
}
let previousStart = -1;
for (const line of data.lines) {
  if (line.characters.length === 0) throw new Error(`Empty line: ${line.id}`);
  if (line.startMs < previousStart) throw new Error(`Non-monotonic line: ${line.id}`);
  previousStart = line.startMs;
  let unitStart = -1;
  for (const unit of line.characters) {
    if (unit.startMs < unitStart || unit.endMs <= unit.startMs) {
      throw new Error(`Invalid unit timing: ${line.id}/${unit.index}`);
    }
    unitStart = unit.startMs;
  }
}
console.log(`Validated ${data.lines.length} official character-timed lines`);
