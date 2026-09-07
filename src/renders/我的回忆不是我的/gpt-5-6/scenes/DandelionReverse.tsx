import React from "react";
import { pingPong, SceneProps, Seed, wave } from "./shared";
export const DandelionReverse: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const approach = 300 - cue * 180 - cue2 * 80 + pingPong(t, 11) * 22;
  return (
    <>
      <rect
        x="1550"
        y="70"
        width="28"
        height="940"
        fill={p.light}
        opacity="0.72"
      />
      <rect
        x="1578"
        y="70"
        width="270"
        height="940"
        fill={p.surface}
        opacity="0.16"
      />
      {Array.from({ length: 13 }, (_, index) => (
        <Seed
          key={index}
          x={1160 + index * 46 + approach * (0.55 + index * 0.02)}
          y={190 + (index % 5) * 145 + wave(t, 6 + index * 0.25) * 18}
          rotate={-38 + index * 15 + wave(t, 8 + index) * 7}
          scale={0.58 + (index % 4) * 0.08}
          color={index % 4 === 0 ? p.accent : p.light}
          opacity={0.58 + (index % 3) * 0.11}
        />
      ))}
      {[0, 1, 2, 3].map((index) => (
        <circle
          key={index}
          cx="1556"
          cy={240 + index * 190}
          r={15 + index * 3}
          fill={p.accent}
          opacity={0.54 + index * 0.1}
        />
      ))}
      <path
        d="M920 950 Q1320 810 1920 890"
        fill="none"
        stroke={p.secondary}
        strokeWidth="30"
        opacity="0.34"
      />
    </>
  );
};
