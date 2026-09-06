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
import { CoverFrame } from "./CoverFrame";
import { fontsReady } from "./fonts";
import { LyricPageView } from "./LyricPage";
import { pages } from "./pages";
import { Prelude } from "./Prelude";
import { SceneBackground } from "./SceneBackground";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TRANSITION_MS = 280;

export const BuChaoBuYongHuaQian: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  React.useEffect(() => {
    fontsReady.then(() => setFontsLoaded(true));
  }, []);

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
    <AbsoluteFill style={{ background: "#171226", overflow: "hidden" }}>
      <Audio
        src={staticFile(
          "songs/bu-chao-bu-yong-hua-qian/audio/bu-chao-bu-yong-hua-qian.mp3",
        )}
      />
      {currentIndex < 0 ? <Prelude globalMs={globalMs} /> : null}
      {currentIndex === 0 && current ? (
        <Prelude globalMs={globalMs} opacity={1 - transition} />
      ) : null}
      {currentIndex > 0 && current ? (
        <SceneBackground
          page={pages[currentIndex - 1]}
          globalMs={globalMs}
          opacity={1 - transition}
        />
      ) : null}
      {current ? (
        <SceneBackground page={current} globalMs={globalMs} opacity={transition} />
      ) : null}
      {current ? <LyricPageView page={current} globalFrame={frame} /> : null}
      {frame === 0 ? <CoverFrame /> : null}
    </AbsoluteFill>
  );
};
