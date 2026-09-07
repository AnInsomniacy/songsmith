import { noise2D } from "@remotion/noise";
import React from "react";
import { SceneProps, wave } from "./shared";
export const SpectrumStain: React.FC<SceneProps> = ({
  t,
  cue,
  cue2,
  p,
  id,
}) => {
  const stainId = `${id}-stain`;
  return (
    <>
      <defs>
        <radialGradient id={stainId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={p.accent} stopOpacity="0.78" />
          <stop offset="0.54" stopColor={p.secondary} stopOpacity="0.42" />
          <stop offset="1" stopColor={p.light} stopOpacity="0" />
        </radialGradient>
      </defs>
      {Array.from({ length: 7 }, (_, index) => {
        const phase = index * 0.8;
        return (
          <ellipse
            key={index}
            cx={1200 + index * 105 + noise2D(id, index, t * 0.1) * 60}
            cy={340 + (index % 3) * 180 + wave(t, 7 + index, phase) * 42}
            rx={170 + index * 24 + cue * 18 + cue2 * 36}
            ry={130 + (index % 2) * 70}
            fill={`url(#${stainId})`}
            opacity={0.44 + (index % 3) * 0.1}
          />
        );
      })}
      <rect
        x="980"
        y="100"
        width="860"
        height="880"
        fill="none"
        stroke={p.surface}
        strokeWidth="18"
        opacity="0.34"
      />
      <path
        d="M1010 860 C1260 720 1490 960 1840 710"
        fill="none"
        stroke={p.light}
        strokeWidth="18"
        opacity="0.42"
      />
    </>
  );
};
