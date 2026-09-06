import { useEffect, useMemo, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  cancelRender,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Audio } from "@remotion/media";
import { fontsReady } from "./fonts";
import { LINES, SHOTS, startFrame, FPS, P } from "./design";
import { SCENES } from "./scenes";
import { ease } from "./scenes/primitives";
import { Lyric, layoutLine } from "./Lyric";
import { Cover, IntroText, IntroWorld } from "./Intro";

function SceneBackground({
  index,
  frame,
  opacity = 1,
}: {
  index: number;
  frame: number;
  opacity?: number;
}) {
  if (index < 0)
    return (
      <div style={{ position: "absolute", inset: 0, opacity }}>
        <IntroWorld
          t={frame / FPS}
          phase={ease((frame - 320) / 65)}
          id="green-intro"
        />
      </div>
    );
  const shot = SHOTS[index];
  const t = (frame - startFrame(shot)) / FPS;
  const trigger =
    shot.lines.length > 1
      ? (LINES[shot.lines[1]].startMs - LINES[shot.lines[0]].startMs) / 1000
      : 1.8;
  const Scene = SCENES[shot.key];
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <Scene t={t} phase={ease((t - trigger) / 1.5)} id={`green-${shot.key}`} />
    </div>
  );
}

export default function GreenBoys() {
  const frame = useCurrentFrame();
  const [handle] = useState(() =>
    delayRender("Green boys local bilingual fonts"),
  );
  const [ready, setReady] = useState(false);
  useEffect(() => {
    fontsReady
      .then(() => {
        setReady(true);
        continueRender(handle);
      })
      .catch(cancelRender);
  }, [handle]);
  const layouts = useMemo(
    () =>
      ready
        ? SHOTS.map((shot) =>
            shot.lines.map((line, row) => layoutLine(shot, line, row)),
          )
        : [],
    [ready],
  );
  let active = -1;
  for (let i = 0; i < SHOTS.length; i++) {
    if (frame >= startFrame(SHOTS[i])) active = i;
  }
  const since = active < 0 ? 0 : frame - startFrame(SHOTS[active]);
  return (
    <AbsoluteFill style={{ backgroundColor: P.sky }}>
      <Audio src={staticFile("songs/green-boys/audio/Green boys.mp3")} />
      {ready &&
        (frame === 0 ? (
          <Cover />
        ) : (
          <>
            {active >= 0 && since < 24 ? (
              <SceneBackground index={active - 1} frame={frame} />
            ) : null}
            <SceneBackground
              index={active}
              frame={frame}
              opacity={active >= 0 && since < 24 ? ease(since / 24) : 1}
            />
            {active < 0 ? (
              <IntroText frame={frame} />
            ) : (
              <svg
                width="1920"
                height="1080"
                viewBox="0 0 1920 1080"
                style={{ position: "absolute", inset: 0, overflow: "visible" }}
              >
                {layouts[active].map((layout, i) => (
                  <Lyric key={`${active}-${i}`} layout={layout} frame={frame} />
                ))}
              </svg>
            )}
          </>
        ))}
    </AbsoluteFill>
  );
}
