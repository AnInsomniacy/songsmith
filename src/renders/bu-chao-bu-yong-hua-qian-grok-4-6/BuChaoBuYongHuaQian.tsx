import { Audio } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import { CoverFrame } from "./CoverFrame";
import { COLORS } from "./design";
import { fontsReady } from "./fonts";
import { LyricPageView } from "./LyricPage";
import { OVERLAP_FRAMES } from "./lyrics";
import { pages } from "./pages";
import { Prelude } from "./Prelude";
import { SceneBackground } from "./SceneBackground";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const BuChaoBuYongHuaQian: React.FC = () => {
  const [ready, setReady] = React.useState(false);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = React.useState(() => delayRender("Waiting for Grok 4.6 fonts"));

  React.useEffect(() => {
    fontsReady
      .then(() => {
        setReady(true);
        continueRender(handle);
      })
      .catch((error) => {
        cancelRender(error instanceof Error ? error : new Error(String(error)));
      });
  }, [cancelRender, continueRender, handle]);

  const firstLyricFrame = pages[0].startFrame;
  const preludeDuration = firstLyricFrame - 1 + OVERLAP_FRAMES;

  return (
    <AbsoluteFill style={{ background: COLORS.navy, overflow: "hidden" }}>
      <Audio
        src={staticFile(
          "songs/bu-chao-bu-yong-hua-qian/audio/bu-chao-bu-yong-hua-qian.mp3",
        )}
      />
      {ready ? (
        <>
          <Sequence
            name="Prelude"
            from={1}
            durationInFrames={preludeDuration}
            premountFor={fps}
          >
            <AbsoluteFill
              style={{
                opacity: interpolate(
                  frame,
                  [firstLyricFrame, firstLyricFrame + OVERLAP_FRAMES],
                  [1, 0],
                  clamp,
                ),
              }}
            >
              <Prelude />
            </AbsoluteFill>
          </Sequence>
          {pages.map((page, index) => {
            const enter = interpolate(
              frame,
              [page.startFrame, page.startFrame + OVERLAP_FRAMES],
              [0, 1],
              clamp,
            );
            const next = pages[index + 1];
            const exit = next
              ? interpolate(
                  frame,
                  [next.startFrame, next.startFrame + OVERLAP_FRAMES],
                  [1, 0],
                  clamp,
                )
              : 1;
            return (
              <Sequence
                key={page.id}
                name={page.id}
                from={page.startFrame}
                durationInFrames={page.durationFrames}
                premountFor={fps}
              >
                <AbsoluteFill style={{ opacity: Math.min(enter, exit) }}>
                  <SceneBackground page={page} opacity={1} />
                  <LyricPageView page={page} />
                </AbsoluteFill>
              </Sequence>
            );
          })}
          <Sequence name="Cover" durationInFrames={1}>
            <CoverFrame />
          </Sequence>
        </>
      ) : null}
    </AbsoluteFill>
  );
};
