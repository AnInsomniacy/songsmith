import React from "react";
import { interpolate } from "remotion";
import { type SceneMood } from "../visual-design";
import { Scene01 } from "./Scene01";
import { Scene02 } from "./Scene02";
import { Scene03 } from "./Scene03";
import { Scene04 } from "./Scene04";
import { Scene05 } from "./Scene05";
import { Scene06 } from "./Scene06";
import { Scene07 } from "./Scene07";
import { Scene08 } from "./Scene08";
import { Scene09 } from "./Scene09";
import { Scene10 } from "./Scene10";
import { Scene11 } from "./Scene11";
import { Scene12 } from "./Scene12";
import { Scene13 } from "./Scene13";
import { Scene14 } from "./Scene14";
import { Scene15 } from "./Scene15";
import { Scene16 } from "./Scene16";
import { Scene17 } from "./Scene17";
import { Scene18 } from "./Scene18";
import { Scene19 } from "./Scene19";
import { Scene20 } from "./Scene20";
import { Scene21 } from "./Scene21";
import { Scene22 } from "./Scene22";
import { Scene23 } from "./Scene23";
import { Scene24 } from "./Scene24";
import { Scene25 } from "./Scene25";
import { Scene26 } from "./Scene26";
import { ArtProps, clamp, PALETTES } from "./shared";
const SCENE_ART: React.FC<ArtProps>[] = [
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
  Scene08,
  Scene09,
  Scene10,
  Scene11,
  Scene12,
  Scene13,
  Scene14,
  Scene15,
  Scene16,
  Scene17,
  Scene18,
  Scene19,
  Scene20,
  Scene21,
  Scene22,
  Scene23,
  Scene24,
  Scene25,
  Scene26,
];

export const SceneIllustration: React.FC<{
  mood: SceneMood;
  frame: number;
  sceneIndex: number;
  timeMs: number;
  sceneStartMs: number;
  secondLineStartMs?: number;
}> = ({ sceneIndex, timeMs, sceneStartMs, secondLineStartMs }) => {
  const index = Math.max(0, Math.min(25, sceneIndex));
  const palette = PALETTES[index];
  const t = Math.max(0, (timeMs - sceneStartMs) / 1000);
  const enter = interpolate(
    timeMs,
    [sceneStartMs, sceneStartMs + 900],
    [0, 1],
    clamp,
  );
  const secondStart = secondLineStartMs ?? sceneStartMs + 1800;
  const act2 = interpolate(
    timeMs,
    [secondStart, secondStart + 900],
    [0, 1],
    clamp,
  );
  const Art = SCENE_ART[index];
  const id = `scene-${index}`;
  return (
    <svg
      viewBox="0 0 1920 1080"
      width="1920"
      height="1080"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <linearGradient id={`${id}-wash`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={palette.paper} stopOpacity="0.94" />
          <stop offset="0.53" stopColor={palette.paper} stopOpacity="0.76" />
          <stop offset="1" stopColor={palette.paper} stopOpacity="0.12" />
        </linearGradient>
        <filter id={`${id}-grain`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.58"
            numOctaves="2"
            seed={index + 11}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <Art t={t} enter={enter} act2={act2} palette={palette} index={index} />
      <rect
        width="1920"
        height="1080"
        fill={`url(#${id}-wash)`}
        opacity="0.62"
      />
      <rect
        width="1920"
        height="1080"
        filter={`url(#${id}-grain)`}
        opacity="0.035"
      />
      <rect
        x="43"
        y="37"
        width="1834"
        height="1006"
        fill="none"
        stroke={palette.line}
        strokeWidth="3"
        opacity="0.15"
      />
    </svg>
  );
};
