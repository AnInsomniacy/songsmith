import json
from pathlib import Path

from fontTools import subset


ROOT = Path(__file__).resolve().parents[2]
SONG_PUBLIC = ROOT / "public" / "songs" / "bu-chao-bu-yong-hua-qian"
FONT_DIR = SONG_PUBLIC / "fonts"
LYRICS = json.loads((SONG_PUBLIC / "data" / "lyrics.json").read_text())

ascii_text = "".join(chr(codepoint) for codepoint in range(32, 127))
project_text = "".join(line["text"] for line in LYRICS["lines"])
project_text += "不潮不用花钱林俊杰JJ陆STYLE WITHOUT A PRICE¥0·2008"
project_text += "词曲编制作吉他录音与混音林怡凤吴剑泓Kenn C Joe Vannelli"
text = "".join(dict.fromkeys(project_text + ascii_text))

fonts = {
    "NotoSansCJKsc-Medium.otf": "NotoSansCJKsc-Medium-subset.woff2",
    "NotoSansCJKsc-Black.otf": "NotoSansCJKsc-Black-subset.woff2",
    "NotoSerifCJKsc-Bold.otf": "NotoSerifCJKsc-Bold-subset.woff2",
    "DIN-Condensed-Bold.ttf": "DIN-Condensed-Bold-subset.woff2",
}

for source_name, output_name in fonts.items():
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6]
    options.name_legacy = True
    font = subset.load_font(str(FONT_DIR / source_name), options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(font)
    subset.save_font(font, str(FONT_DIR / output_name), options)
    size_kb = (FONT_DIR / output_name).stat().st_size / 1024
    print(f"{output_name}: {size_kb:.1f} KB")
