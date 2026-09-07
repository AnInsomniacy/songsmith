# School-day memories

A lyric film organized around school-day recollections, rain, waiting, and clearing skies. The 26 scene drawings live in separate modules, with shared palette and atmosphere helpers local to this work. The opening information is organized independently from the vocal sections.

Typography uses local Noto Serif CJK SC, Noto Sans CJK SC, LXGW WenKai, and Barlow. Native QRC tokens remain intact: each solfege syllable appears as one unit, never as separately timed letters. The source response is retained under the song's data/raw directory.

Video.tsx is the entry, storyboard.ts groups lyric rows, visual-design.ts selects semantic treatments, and typography.ts loads fonts. Run `npm run "render:晴天:gpt-5-6"`. Output is `out/晴天（GPT-5.6）.mp4` at 1920 × 1080 and 60 fps. Localized font replacements and restored native solfege timing require visual review against the retained prior export; directory migration alone does not imply identical pixels.
