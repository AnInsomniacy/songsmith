import { Audio } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CoverFrame } from "./CoverFrame";
import { fontsReady } from "./fonts";
import { LyricLayer } from "./TimedLine";
import { SCENES } from "./scenes";
import { pageAt, pages } from "./storyboard";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TRANSITION_MS = 350;

const localFrameOf = (startMs: number, fps: number): number =>
  Math.round((startMs / 1000) * fps);

export const BuChaoBuYongHuaQian: React.FC = () => {
  const [handle] = React.useState(() => delayRender("Loading fonts"));
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  React.useEffect(() => {
    fontsReady.then(() => continueRender(handle));
  }, [handle]);

  const globalMs = (frame / fps) * 1000;
  const index = pageAt(globalMs);
  const page = pages[index];
  const prev = index > 0 ? pages[index - 1] : null;
  const transition = interpolate(
    globalMs,
    [page.startMs, page.startMs + TRANSITION_MS],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.45, 0, 0.55, 1) },
  );

  const Scene = SCENES[page.scene];
  const PrevScene = prev ? SCENES[prev.scene] : null;

  return (
    <AbsoluteFill style={{ background: page.field, overflow: "hidden" }}>
      <Audio
        src={staticFile(
          "songs/bu-chao-bu-yong-hua-qian/audio/bu-chao-bu-yong-hua-qian.mp3",
        )}
      />
      {frame < 1 ? (
        <CoverFrame />
      ) : (
        <>
          <Scene
            page={page}
            f={frame - localFrameOf(page.startMs, fps)}
            fps={fps}
          />
          {prev && PrevScene && transition < 1 ? (
            <AbsoluteFill style={{ opacity: 1 - transition }}>
              <PrevScene
                page={prev}
                f={frame - localFrameOf(prev.startMs, fps)}
                fps={fps}
              />
            </AbsoluteFill>
          ) : null}
          <LyricLayer page={page} globalFrame={frame} />
        </>
      )}
    </AbsoluteFill>
  );
};
