import { Audio } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "./design";
import { fontsReady } from "./fonts";
import { LyricPageView } from "./LyricPage";
import { pages } from "./pages";
import { Prelude } from "./Prelude";
import { SceneBackground } from "./SceneBackground";
import { CoverFrame } from "./CoverFrame";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TRANSITION_MS = 300;
const COVER_BRIDGE_FRAMES = 30;

export const BuChaoBuYongHuaQian: React.FC = () => {
  const [handle] = React.useState(() => delayRender("Loading fonts"));
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  React.useEffect(() => {
    fontsReady.then(() => continueRender(handle));
  }, [handle]);

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

  const coverOpacity = interpolate(
    frame,
    [0, COVER_BRIDGE_FRAMES],
    [1, 0],
    { ...clamp, easing: Easing.bezier(0.45, 0, 0.55, 1) },
  );

  return (
    <AbsoluteFill style={{ background: COLORS.paper, overflow: "hidden" }}>
      <Audio
        src={staticFile(
          "songs/bu-chao-bu-yong-hua-qian/audio/bu-chao-bu-yong-hua-qian.mp3",
        )}
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

      {frame <= COVER_BRIDGE_FRAMES ? (
        <div style={{ position: "absolute", inset: 0, opacity: coverOpacity }}>
          <CoverFrame />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
