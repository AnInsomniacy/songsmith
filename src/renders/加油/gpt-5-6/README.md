# Keep moving

An encouraging lyric film with distinct scene palettes, fixed lyric surfaces, and short word entrances. The current design remains independent from other songs. Chinese text uses local Noto Sans CJK SC and LXGW WenKai, with complete font loading before export.

Shared song data retains the native KRC source, opening credits, and 52 lyric rows. Preparation resolves source references without inventing vocal timing or replacing approved wording. Video.tsx controls the timeline; storyboard.ts groups lines; typography.ts loads fonts.

Run `npm run "render:加油:gpt-5-6"`. Output is `out/加油（GPT-5.6）.mp4`, at 1920 × 1080 and 60 fps. Root checks verify source-backed units. The upright local emphasis font replaces the previous oblique face, so the retained prior film is a reference rather than a promise of pixel-identical typography.
