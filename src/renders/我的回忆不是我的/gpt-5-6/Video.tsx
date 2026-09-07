import { Audio } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useFonts } from "../../../lib/use-fonts";
import { CoverFrame } from "./CoverFrame";
import { LyricPageView } from "./LyricPage";
import { pages } from "./storyboard";
import { Prelude } from "./Prelude";
import { SceneBackground } from "./scenes";
import { fontsReady } from "./typography";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TRANSITION_MS = 260;

export const Video: React.FC = () => {
  const fontsLoaded = useFonts(fontsReady);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!fontsLoaded) return null;

  const globalMs = (frame / fps) * 1000;
  let currentIndex = -1;
  for (let index = 0; index < pages.length; index += 1) {
    if (globalMs >= pages[index].startMs) currentIndex = index;
  }
  const current = currentIndex >= 0 ? pages[currentIndex] : null;
  const transition = current
    ? interpolate(
        globalMs,
        [current.startMs, current.startMs + TRANSITION_MS],
        [0, 1],
        { ...clamp, easing: Easing.bezier(0.45, 0, 0.55, 1) },
      )
    : 0;

  return (
    <AbsoluteFill style={{ background: "#14263B", overflow: "hidden" }}>
      <Audio
        src={staticFile("songs/我的回忆不是我的/audio/我的回忆不是我的.mp3")}
      />
      {currentIndex < 0 ? (
        <Prelude globalFrame={frame} globalMs={globalMs} />
      ) : null}
      {currentIndex === 0 && current ? (
        <Prelude
          globalFrame={frame}
          globalMs={globalMs}
          opacity={1 - transition}
        />
      ) : null}
      {currentIndex > 0 && current ? (
        <SceneBackground
          page={pages[currentIndex - 1]}
          globalMs={globalMs}
          opacity={1 - transition}
        />
      ) : null}
      {current ? (
        <SceneBackground
          page={current}
          globalMs={globalMs}
          opacity={transition}
        />
      ) : null}
      {current ? <LyricPageView page={current} globalFrame={frame} /> : null}
      {frame === 0 ? <CoverFrame /> : null}
    </AbsoluteFill>
  );
};
export default Video;
