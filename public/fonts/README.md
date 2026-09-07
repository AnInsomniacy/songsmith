# Shared typography

These local files are used by current compositions. Keep the associated license with each font. Original name and copyright records are preserved inside the subsets.

Noto Sans CJK SC Medium and Noto Serif CJK SC Bold come from [Noto CJK](https://github.com/notofonts/noto-cjk), under the included SIL Open Font License. LXGW WenKai Medium comes from [release 1.522](https://github.com/lxgw/LxgwWenKai/releases/tag/v1.522), under its included OFL. Barlow Semi Condensed Regular and SemiBold come from [Barlow](https://github.com/jpt/barlow), under the included OFL.

Run `npm run fonts:build` after adding characters to source text or artwork labels. The script builds Noto and WenKai subsets using all current song data and source labels. Downloaded originals are disposable files in .work/fonts. Barlow files include the full distributed character set and need no subsetting.

Song-specific Klee One, Zen Kaku Gothic New, Manrope, LXGW WenKai TC, and ChillRound files remain with their songs and retain their own licenses. A font license does not cover the music or lyrics.
