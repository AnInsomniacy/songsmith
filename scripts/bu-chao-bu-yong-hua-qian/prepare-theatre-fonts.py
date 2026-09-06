"""Subset the additional round face without touching existing font assets."""
import json
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[2]
SONG = ROOT / "public/songs/bu-chao-bu-yong-hua-qian"
data = json.loads((SONG / "data/lyrics.json").read_text())
text = "".join(line["text"] for line in data["lines"])
text += "".join(line["text"] for line in data["intro"]["vocalises"])
text += "".join(item["label"] + item["value"] for item in data["intro"]["credits"])
text += "不潮不用花钱林俊杰纽扣剧场演唱词曲编制作吉他录音与混音"
text += "".join(chr(i) for i in range(32, 127))
source = SONG / "fonts/ChillRoundF.ttf"
font = TTFont(source)
missing = set(text) - set(chr(c) for c in font.getBestCmap())
if missing:
    raise RuntimeError("Missing source glyphs: " + "".join(sorted(missing)))
options = subset.Options()
options.flavor = "woff2"
options.layout_features = ["*"]
options.name_IDs = [0, 1, 2, 3, 4, 5, 6]
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=text)
subsetter.subset(font)
font.flavor = "woff2"
output = SONG / "fonts/ChillRoundF-theatre.woff2"
font.save(output)
print(str(output) + ": " + str(output.stat().st_size) + " bytes")
