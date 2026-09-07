import React from "react";
import { FilmMount, pingPong, SceneProps, wave } from "./shared";
export const MemoryTransfer: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const travel = 60 + cue * 450 + cue2 * 230 + pingPong(t, 16) * 26;
  return (
    <>
      <FilmMount
        x={980}
        y={190}
        width={480}
        height={700}
        p={p}
        image={p.backgroundAlt}
        opacity={0.62}
      />
      <FilmMount
        x={1450}
        y={120}
        width={390}
        height={590}
        p={p}
        image={p.secondary}
        opacity={0.42}
        rotate={4}
      />
      <g transform={`translate(${travel} ${wave(t, 9) * 12})`}>
        <rect
          x="1040"
          y="250"
          width="390"
          height="490"
          fill={p.accent}
          opacity={0.62}
        />
        <path
          d="M1080 650 C1180 470 1290 520 1390 330 V720 H1080Z"
          fill={p.light}
          opacity="0.34"
        />
        <circle cx="1240" cy="440" r="86" fill={p.secondary} opacity="0.76" />
      </g>
      <path
        d="M1010 940 C1280 820 1570 980 1880 830"
        fill="none"
        stroke={p.light}
        strokeWidth="15"
        opacity="0.38"
      />
    </>
  );
};
