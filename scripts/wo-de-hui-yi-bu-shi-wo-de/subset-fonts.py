import json
import zipfile
from pathlib import Path
from urllib.request import urlretrieve

from fontTools import subset


ROOT = Path(__file__).resolve().parents[2]
SONG_PUBLIC = ROOT / "public" / "songs" / "wo-de-hui-yi-bu-shi-wo-de"
FONT_DIR = SONG_PUBLIC / "fonts"
LYRICS = json.loads((SONG_PUBLIC / "data" / "lyrics.json").read_text())
LXGW_SOURCE = Path("/tmp/LXGWWenKai-Medium.ttf")
SMILEY_SOURCE = Path("/tmp/SmileySans-Oblique.ttf.woff2")
if not LXGW_SOURCE.exists():
    urlretrieve(
        "https://github.com/lxgw/LxgwWenKai/releases/download/v1.522/LXGWWenKai-Medium.ttf",
        LXGW_SOURCE,
    )
if not SMILEY_SOURCE.exists():
    archive = Path("/tmp/smiley-sans-v2.0.1.zip")
    urlretrieve(
        "https://github.com/atelier-anchor/smiley-sans/releases/download/v2.0.1/smiley-sans-v2.0.1.zip",
        archive,
    )
    with zipfile.ZipFile(archive) as release:
        SMILEY_SOURCE.write_bytes(release.read("SmileySans-Oblique.ttf.woff2"))

ascii_text = "".join(chr(codepoint) for codepoint in range(32, 127))
project_text = "".join(line["text"] for line in LYRICS["credits"] + LYRICS["lines"])
project_text += "我的回忆不是我的海鸣威周耀辉朱其民失去所有权的底片暗房显影"
text = "".join(dict.fromkeys(project_text + ascii_text))

fonts = {
    LXGW_SOURCE: "LXGWWenKai-Medium-subset.woff2",
    SMILEY_SOURCE: "SmileySans-Oblique-subset.woff2",
}

FONT_DIR.mkdir(parents=True, exist_ok=True)
for source_path, output_name in fonts.items():
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6]
    options.name_legacy = True
    font = subset.load_font(str(source_path), options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(font)
    subset.save_font(font, str(FONT_DIR / output_name), options)
    size_kb = (FONT_DIR / output_name).stat().st_size / 1024
    print(f"{output_name}: {size_kb:.1f} KB")
