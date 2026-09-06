# Remotion lyric studio

仓库使用一个 Remotion 运行环境管理全部歌曲。公共素材位于 `public/songs/<song-slug>`，处理脚本位于 `scripts/<song-slug>`，模型专属视觉实现位于 `src/renders/<song-slug>-<model-slug>`，成片统一输出到 `out`。

运行 `npm run studio` 可在同一 Studio 中查看全部 Composition。使用 `npm run render:<song-slug>:<model-slug>` 渲染指定实现。
