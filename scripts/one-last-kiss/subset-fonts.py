from pathlib import Path
import json
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parents[2]
base = root / 'public/songs/one-last-kiss'
data = json.loads((base / 'data/lyrics.json').read_text())
original = ''.join(line['text'] for line in data['lines']) + '宇多田ヒカルOne Last KissHIKARU UTADALYRICS MUSICPRODUCED BYA. G. Cook'
chinese = ''.join(line['translation'] for line in data['lines'])
common = ''.join(chr(i) for i in range(32,127)) + '「」『』・·ー—，。！？：、（）“”' + original + chinese
rows = [('ShipporiMincho-Medium.ttf','body.woff2'),('ZenKakuGothicNew-Bold.ttf','emphasis.woff2'),('ZenKakuGothicNew-Regular.ttf','info.woff2'),('KleeOne-SemiBold.ttf','memory.woff2'),('NotoSerifSC[wght].ttf','translation.woff2')]
for source, output in rows:
    font = TTFont(root / '.work/one-last-kiss/font-originals' / source)
    if 'fvar' in font:
        font = instantiateVariableFont(font, {'wght':500}, inplace=True)
    required = chinese if output == 'translation.woff2' else original
    cmap = font.getBestCmap()
    missing = sorted({c for c in required if ord(c) not in cmap and not c.isspace()})
    if missing:
        raise ValueError(f'{source} lacks glyphs: {missing}')
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']
    options.name_IDs = ['*']
    sub = subset.Subsetter(options=options)
    sub.populate(text=common)
    sub.subset(font)
    font.flavor = 'woff2'
    font.save(base / 'fonts' / output)
    print(output, (base / 'fonts' / output).stat().st_size)
