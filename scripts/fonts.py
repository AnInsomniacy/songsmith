"""Build shared font subsets from every current song and artwork label."""
from pathlib import Path
from urllib.request import urlretrieve
from fontTools import subset

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / '.work/fonts'
OUTPUT = ROOT / 'public/fonts'
SOURCES = {
    'NotoSansCJKsc-Medium.otf': 'https://raw.githubusercontent.com/notofonts/noto-cjk/Sans2.004/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Medium.otf',
    'NotoSerifCJKsc-Bold.otf': 'https://raw.githubusercontent.com/notofonts/noto-cjk/Serif2.003/Serif/OTF/SimplifiedChinese/NotoSerifCJKsc-Bold.otf',
    'LXGWWenKai-Medium.ttf': 'https://github.com/lxgw/LxgwWenKai/releases/download/v1.522/LXGWWenKai-Medium.ttf',
}

WORK.mkdir(parents=True, exist_ok=True)
OUTPUT.mkdir(parents=True, exist_ok=True)
text = ''.join(chr(i) for i in range(32, 127))
for directory in [ROOT / 'src', ROOT / 'public/songs']:
    for file in directory.rglob('*'):
        if file.suffix in {'.ts', '.tsx', '.json'} and 'raw' not in file.parts:
            text += file.read_text(encoding='utf-8')
for filename, url in SOURCES.items():
    source = WORK / filename
    if not source.exists():
        urlretrieve(url, source)
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']
    options.name_IDs = ['*']
    font = subset.load_font(str(source), options)
    sub = subset.Subsetter(options=options)
    sub.populate(text=text)
    sub.subset(font)
    destination = OUTPUT / (Path(filename).stem + '.woff2')
    subset.save_font(font, str(destination), options)
    print(f'Built {destination.relative_to(ROOT)} ({destination.stat().st_size} bytes)')
