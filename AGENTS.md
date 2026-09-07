# Working on songsmith

## Purpose and authority

songsmith is a single Remotion workspace for illustrated, word-timed lyric films. React and TypeScript control SVG artwork, typography, native lyric timing, and final video output. Each song has its own visual direction. Use the latest approved implementation; replace obsolete code, instructions, and paths instead of maintaining compatibility layers or parallel policies.

Current user instructions take precedence. Work on the current branch. Do not create branches, commit, publish, or start subagents without explicit authorization. Preserve unrelated work and existing films. Planning requests permit inspection only. Use apply_patch for source edits; mechanical moves and formatting may use the appropriate tools.

## Before making changes

Read this file completely. Before visual or timing work, also read [the production guide](docs/production.md) and the selected implementation's README. Fully read and apply the frontend-design skill for visual design. Use relevant Remotion skills and ui-ux-pro-max for layout, readability, and motion; report unavailable skills. Apply design guidance to a music video, not a website or player interface.

Inspect the selected composition, source lyrics, audio, fonts, and script dependencies before changing them. Source acquisition is an explicit preparation step, never a side effect of rendering. When the user authorizes reuse of existing audio and lyrics, reuse them without repeating network searches.

## Environment and commands

Use one root npm installation and one root Python environment. Install JavaScript dependencies with `npm ci`. Open Studio with `npm run studio`; list compositions with `npm run compositions`. Use the exact `render:<official-title>:<model>` script in package.json for an export. Preserve Remotion's default rendering behavior unless a verified problem requires a minimal change.

Run `npm run check` for source, data, and workspace checks. Use `npm run inspect` for representative rendered frames when typography or visuals change. Python scripts use `.venv/bin/python` with requirements.txt. FFmpeg and FFprobe must be on PATH for media checks. Declare directly imported packages as direct dependencies and keep all Remotion packages at the same version.

## Ownership and naming

Implementations live in `src/renders/<official-title>/<model>/`. Public song assets live in `public/songs/<official-title>/`; genuinely shared fonts live in `public/fonts/`. Preparation scripts live in `scripts/<official-title>/`, with model-specific checks in a model subdirectory. Exports live in `out/`; disposable reports and previews belong in `.work/`.

Keep official song titles, artist names, lyrics, translations, and on-screen song content in their original languages. Write engineering documentation, comments, diagnostics, and identifiers in English. Use English component filenames such as Video.tsx and Lyrics.tsx. Technical Composition and Folder identifiers use Remotion-compatible ASCII. Output filenames retain the official title and full model name.

Keep Video.tsx as the directly imported implementation entry. Root.tsx explicitly registers lazy-loaded compositions. Share small, proven utilities; keep scene artwork and musical interpretation local to each work. Do not build a plugin framework, duplicate dependency environments, or add empty scaffolding.

## Art direction

Start with the lyrics, vocal character, and emotional development. Define a distinctive theme, color logic, type hierarchy, spatial composition, and visual signature. Use the approved One Last Kiss SVG edition as a quality reference for complete settings, material detail, lighting, and reading hierarchy, without copying its subjects.

Build finished SVG illustrations, not placeholder geometry or isolated keyword icons. Compose foreground, subject, and background intentionally. Detail should follow scale and focus. Each scene needs meaningful objects, credible relationships, and an action that expresses the song. Maintain this quality through the cover, verses, choruses, instrumental sections, and ending.

Use SVG paths, shapes, gradients, masks, and grouped transforms. Other media require explicit user approval. Keep perspective, proportions, supports, joints, contact surfaces, and lighting coherent throughout motion. Do not draw people or isolated human body parts without authorization. Avoid objects that appear operated by invisible hands.

Develop each scene independently. Shared primitives are welcome; recoloring or resizing an entire previous scene is not a new composition. A later line should advance the current setting smoothly. Revisiting an image must develop its framing, relationships, or action.

## Lyrics and typography

Use source-traceable native words or indivisible sung units matched to the recording. For new recordings, search authoritative track and platform lyric sources online; verify the edition, complete text, duration, and opening, middle, and closing vocal anchors. Preserve original millisecond boundaries, source references, and raw responses. Never present ASR, uniform splitting, invented spacing timestamps, or guessed offsets as native vocal timing. Keep editorial text corrections distinguishable from source text. Report missing provenance honestly.

Foreign-language vocals use native timed text with nearby, phrase-aligned Chinese translation. Preserve complete meaning and natural Chinese phrasing. English vocals are included; vocalise syllables remain unchanged.

Measure the final line before revealing units. Reserve fixed positions and reveal from left to right without recentering or growing leftward. Match measured and rendered font settings, and allow for descenders, baselines, and safe margins. Wait for local fonts before exporting; verify glyph coverage and licenses.

Choose fonts for the song. Noto Sans CJK SC Medium, Klee One, LXGW WenKai, and Manrope are useful references, not a mandatory palette. Keep glyphs upright and undistorted. Emphasis may use meaningful color, weight, natural size, and brief entry motion. Settled text must stay stable, without ghosting, audio-reactive movement, or a final enlargement.

Design fixed lyric surfaces from the scene palette and meaning. Fade each surface in with its first sung unit, normally over 260 ms. Render all surfaces below all text. Aim for at least 4.5:1 text contrast against the actual surface through entry and transitions. Avoid live color inversion or flashing contrast compensation.

## Timing and delivery

Drive animation from Remotion's frame clock. Keep randomness reproducible, loops continuous in position and velocity, and the outgoing scene moving during transitions. Preserve the full recording timeline. Group changes follow the incoming vocal cue; transitions must not shorten the song.

Show the official title and artist in the first frame, then continue naturally. Combine opening credits when the prelude is short. Avoid one-frame resets, rapid credit pages, and overlap with the first lyric. Default output is 1920 × 1080 at 60 fps.

Validate representative stills and exported short clips before a full film. Check unit coverage, translations, fonts, bounds, layer order, stable text, and transitions. Do not run exhaustive video decoding or isolated-frame anomaly scans by default.

After export, verify dimensions, frame count, duration, and audio presence. Compare sampled output audio with the recording; distinguish this check from lyric audition. Fix only demonstrated causes and keep song-specific remedies scoped. Show render progress. Deliver a playable full film when requested, state actual verification limits, and stop when the requested work is complete.

## Film releases

Use a plain-text release title; format notes with GitHub Markdown. Start with compact bold credit labels and, when useful, one short concept blockquote. Organize substantial prose under descriptive H2 headings, using H3 only for meaningful narrative stages. Leave blank lines around headings and paragraphs. Avoid repeating the title as an H1, unbroken walls of text, decorative badges, excessive emphasis, and generic software changelog sections.

Publish or update releases only with explicit authorization. Use only the official song title, performing artist, and full model name in release titles and attachment display names; append the file extension for downloads. Preserve original-language names. If the host sanitizes filenames, use a readable ASCII filename and the complete original-language asset label, then verify the published result.

Write release notes in Chinese unless requested otherwise. Open with the song, verified performer and songwriter credits, and model attribution. Check embedded audio metadata first, then existing source credits; never invent missing credits. Explain the film's interpretation, narrative progression, scene choices, recurring motifs, and palette in readable, proportionate paragraphs grounded in the actual work. Emphasize creative reasoning over scene inventories or implementation mechanics. Omit technology promotion, rendering workflow, timing rules, export specifications, download instructions, and boilerplate disclaimers unless requested. Preview copy before publication when asked, and update the existing release rather than creating a duplicate.
