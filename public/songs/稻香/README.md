# Source assets

Preparation only. No video implementation, composition, storyboard, or render has been created.

- Title: 稻香
- Artist: 周杰伦
- Album: 魔杰座; studio version, not the demo, live, or remix edition.
- Recording: `audio/稻香.mp3`, supplied by the user; 223.453333 seconds, approximately 320 kbps.
- Native lyric source: QQ Music QRC obtained through the third-party OIAPI service, song ID `449205`, MID `003aAYrm3GE0Ac`.
- Track page: https://y.qq.com/n/ryqq/songDetail/003aAYrm3GE0Ac
- Retrieval endpoint: https://oiapi.net/api/QQMusicLyric?id=449205&format=qrc
- API documentation: https://oiapi.net/doc/id/121.html

`data/raw/` retains the unmodified search and QRC responses. `data/稻香.qrc` is the decoded source text. `data/lyrics.json` preserves native unit boundaries and source references for reuse in the shared workspace. No ASR, uniform character splitting, timing offsets, or text corrections were applied.

The platform lists a 223-second studio recording, consistent with the supplied file's duration. Structural checks confirm 44 lyric rows, four credit rows, and timing bounds within the recording. These checks do not prove vocal synchronization: opening, middle, and closing audio-to-lyric audition remains pending before video production. Credit timing is metadata rather than singing; long source durations can include instrumental gaps. The source omits some backing-vocal interjections; do not manufacture their timestamps.

The desktop and server copies contain these same source assets and require no Node.js environment merely to inspect or transfer them.
