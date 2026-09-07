# Production guide

This guide expands the project rules in [AGENTS.md](../AGENTS.md). Read it before visual or timing changes. It documents the current production method, not a history of previous implementations.

## Compose from the song

Understand the complete lyric and the emotional direction of each passage. Establish a subject, setting, color system, and typographic hierarchy before drawing. Review those decisions against the actual song: each decoration should contribute meaning, space, or rhythm. A scene should remain a convincing illustration with the lyrics hidden, and readable with them restored.

Use foreground, middle ground, and background deliberately. Detail focal objects through construction, material, reflected light, and traces of use. Glass coatings, metal joints, wood grain, fabric folds, ceramic glaze, and connected branches are examples, not a checklist. Negative space is intentional reading space, not a substitute for finished art.

Use one perspective or parallel projection within a coherent space. Build the top, thickness, sides, supports, and attached objects from common coordinates. Verify hinges, contact points, support, occlusion, and shadows throughout the action. Keep projected objects attached to their surfaces. Use connected mechanisms or natural forces for movement rather than floating tools or disembodied limbs.

## Develop the shot

Give each shot a causal action and a focal point. Motion density follows musical emotion and reading speed. When a second line begins, develop the existing state through a new light relationship, object interaction, reveal, or change of depth. Do not replay the entrance or move every object simultaneously.

Use continuous periodic motion for repeated actions. Position and velocity must agree at loop boundaries. A modulo counter alone is not a seamless animation. Single actions finish and hold their result. During a crossfade, both scenes continue using their own timeline rather than freezing or resetting.

Scope gradient, mask, and clip IDs to the shot, including overlapping outgoing and incoming scenes. For horizontal or vertical gradient strokes, use userSpaceOnUse with explicit coordinates or a solid stroke. A zero-width or zero-height objectBoundingBox can hide the entire line. Verify actual rendered rails, shafts, stems, and other structural details.

## Preserve vocal timing

For a new recording, inventory the supplied audio before searching official track metadata and authoritative platform lyrics. Distinguish an exact recording match from a search candidate. Confirm the edition, full lyric text, duration, and vocal anchors near the beginning, middle, and end. A platform label or matching duration alone does not prove alignment. Save platform identifiers and source evidence; disclose native-timing gaps before choosing a production approach.

Retain the raw platform response and the exact native unit boundaries. Structured units record their source row and unit index. Formatting spaces are layout units; they do not establish a new vocal cue. Where approved display text differs from the platform, preserve nativeText separately. Never split a source word or solfege syllable into artificial letter timings.

Preparation rebuilds source references against approved text and grouping. Existing local sources are used offline; missing native sources require an explicit preparation command. Rendering never searches for a replacement lyric or edits timing data. Record source deficiencies instead of manufacturing evidence.

Bind translation to stable line identity. Translate complete meaning rather than reproducing source word order mechanically. Preserve original names and vocalises. A translated line should remain near its source and stable while the original units appear.

## Make type dependable

Load the exact local fonts before measuring or exporting. Native font loading, the declared weight, and the measurement settings must agree. Include every required character from lyrics, translation, credits, and artwork labels when subsetting. Keep corresponding license and source information. Avoid system-font dependencies in distributable compositions.

Measure complete lines and allocate permanent slots before animation. Do not let flex reflow or incremental centering move existing text. Preserve upright glyph shapes and horizontal baselines. Make words readable at their native cue; the remaining entry motion should settle quickly. Large delays in opacity must not be disguised with an arbitrary lyric offset.

Keep a fixed-size lyric surface beneath each line. Choose its color from the lyric's meaning and the scene palette, then choose readable foreground and emphasis colors. Check entry, the second line, and transitions as well as the settled state. Draw all surfaces before all text so later plates cannot cover earlier glyphs. Avoid clipping masks on text and leave extra space for descenders and font overshoot.

## Verify proportionately

Run the root checks after source or data changes. Workspace checks cover registered entries, asset paths, dependency consistency, and naming. Lyric checks compare native source references and boundaries across every song. Render representative stills and short clips for changed typography or artwork; select meaningful transitions and crowded passages rather than arbitrary empty frames.

Keep reports in .work under the song and model. Automated audio correlation checks source/export agreement only; it does not certify that a lyric follows a sung syllable. Record which checks actually ran. Leave complete aesthetic review to the user and avoid exhaustive decoding or anomaly scanning unless requested.

Use the official Remotion render command with visible progress. Preserve the song's timeline and exported video packets when an isolated audio repair is sufficient. Diagnose a measured offset before changing decoding, encoding, or container behavior. Keep proven sample positions, tolerances, and remedies specific to the affected song. Never turn one repair into a global default.

## Documentation and ownership

Keep the root README focused on what the project does and how to use it. Implementation READMEs hold song-specific direction and limitations. Engineering prose is English; titles, artists, source lyrics, translations, and intended screen text preserve their language. Original responses and third-party license text remain untouched.

Use only the current directory structure and commands. Remove replaced code and unused assets once their consumers have migrated. Preserve valid works, source evidence, and fonts used by another composition. A project-wide refactor is not permission to discard approved artwork or unrelated user changes.
