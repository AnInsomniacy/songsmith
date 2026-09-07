import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { C, audio } from "./config";
import { Intro } from "./Intro";
import { Lyrics } from "./Lyrics";
import { sceneMap } from "./scenes";
import type { SceneProps } from "./scenes/craft";
import { shots } from "./storyboard";
import { fontReady } from "./typography";
const World: React.FC<SceneProps> = (props) => {
  const Scene = sceneMap[props.shot.id];
  if (!Scene) throw new Error(`Unfinished original scene: ${props.shot.id}`);
  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      data-street-scene={props.shot.id}
      style={{ position: "absolute", inset: 0 }}
    >
      <Scene {...props} />
    </svg>
  );
};
export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  const [handle] = useState(() => delayRender("Loading street typefaces"));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    fontReady
      .then(() => {
        setReady(true);
        continueRender(handle);
      })
      .catch(cancelRender);
  }, [handle]);
  if (!ready) return null;
  const shot = [...shots].reverse().find((s) => frame >= s.start) ?? shots[0];
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <Audio src={staticFile(audio)} />
      <TransitionSeries>
        {shots.map((s, i) => (
          <React.Fragment key={s.id}>
            <TransitionSeries.Sequence
              durationInFrames={
                s.end - s.start + (i < shots.length - 1 ? 26 : 0)
              }
            >
              <World frame={frame} shot={s} />
            </TransitionSeries.Sequence>
            {i < shots.length - 1 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 26 })}
              />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>
      <Lyrics shot={shot} frame={frame} />
      <Intro frame={frame} />
    </AbsoluteFill>
  );
};
export default Video;
