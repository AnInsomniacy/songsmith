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
const TRANSITION_MS = 240;

export const BuChaoBuYongHuaQian: React.FC = () => {
  const [ready, setReady] = React.useState(false);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  React.useEffect(() => {
    fontsReady.then(() => setReady(true));
  }, []);

  if (!ready) return null;

  const globalMs = (frame / fps) * 1000;

  let currentIndex = -1;
  for (let i = 0; i < pages.length; i++) {
    if (globalMs >= pages[i].startMs) {
      currentIndex = i;
    }
  }

  const current = currentIndex >= 0 ? pages[currentIndex] : null;
  const transition = current
    ? interpolate(
        globalMs,
        [current.startMs, current.startMs + TRANSITION_MS],
        [0, 1],
        { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
      )
    : 0;

  return (
    <AbsoluteFill style={{ background: "#0B0C10", overflow: "hidden" }}>
      <Audio
        src={staticFile(
          "songs/bu-chao-bu-yong-hua-qian/audio/bu-chao-bu-yong-hua-qian.mp3",
        )}
      />

      {/* Prelude Scene (Before Page 0) */}
      {currentIndex < 0 ? <Prelude globalMs={globalMs} /> : null}

      {/* Transition: Prelude -> Page 0 */}
      {currentIndex === 0 && current ? (
        <Prelude globalMs={globalMs} opacity={1 - transition} />
      ) : null}

      {/* Transition: Page N-1 Background -> Page N Background */}
      {currentIndex > 0 && current ? (
        <SceneBackground
          page={pages[currentIndex - 1]}
          globalMs={globalMs}
          opacity={1 - transition}
        />
      ) : null}

      {/* Current Page Background */}
      {current ? (
        <SceneBackground
          page={current}
          globalMs={globalMs}
          opacity={transition}
        />
      ) : null}

      {/* Current Page Lyrics */}
      {current ? <LyricPageView page={current} globalMs={globalMs} /> : null}

      {/* Frame 0 Poster Cover Only */}
      {frame === 0 ? <CoverFrame /> : null}
    </AbsoluteFill>
  );
};
