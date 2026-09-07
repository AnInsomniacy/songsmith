# Street-side virtuosity

A detailed SVG film built around everyday objects becoming instruments. Record shops, listening rooms, craft benches, mechanical percussion, and rooftop settings connect playful lyrics with practical invention. Each of the 31 shots has its own construction and action; later lines advance the setting rather than restarting its entrance.

The palette combines ink blue, muted teal, warm wood, brass, coral, and paper. Upright Noto Sans CJK SC carries Chinese lyrics, Barlow carries English, and ChillRound supports Chinese translations. Source units appear left to right in reserved slots. After entry, type stays stable.

Video.tsx controls the timeline. config.ts contains source bindings and the palette; storyboard.ts holds the shot sequence and emphasis terms; typography.ts loads local fonts; scenes contains the drawings and local construction helpers. Native KRC evidence and approved bilingual text live in the shared song data. Editorial display changes retain nativeText, and inserted spaces are explicitly marked as layout units.

Run `npm run "render:不潮不用花钱:gpt-6-astra"`. Output is `out/不潮不用花钱（GPT-6 Astra）.mp4`, at 1920 × 1080 and 60 fps. Root checks verify native timing and source references. Representative inspection covers rendering and fonts; it is not a complete visual review or a human listening certificate.
