# Keep the last moment in light

An independent SVG lyric film with 24 scenes about memory, perception, and parting. Gallery moldings, clockwork, camera optics, projection reels, darkroom trays, ceramic surfaces, coastlines, and observatories form complete settings. Light crossing between objects is the recurring signature; each shot develops its own action.

The palette combines midnight blue, mist violet, glass teal, warm apricot, coral, and pale paper. Japanese lyrics use Klee One, English uses Manrope, Chinese translation uses LXGW WenKai TC, and opening information uses Zen Kaku Gothic New. All fonts load locally. The film preserves 45 vocal rows and 382 native singing or layout units.

Video.tsx drives the full timeline; config.ts binds source data; storyboard.ts defines the scenes; typography.ts loads fonts; scenes contains independently drawn settings. Second-line cues advance each scene, and overlapping transitions keep both scenes moving. Lyrics retain fixed positions after entry.

Run `npm run "render:One Last Kiss:gpt-6-astra-svg"`. The output is `out/One Last Kiss（GPT-6 Astra · SVG）.mp4`, at 1920 × 1080, 60 fps, and 15122 frames. The post-render script checks sampled audio agreement and preserves the video packets if an isolated soundtrack repair is required. Its sample positions and tolerances are specific to this recording. Source verification and automated audio checks do not certify human lyric-to-vocal audition.
