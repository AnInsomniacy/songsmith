import React from "react";
import { SceneProps, smooth, wave } from "./shared";
export const LastEmptyFrame: React.FC<SceneProps> = ({
  t,
  progress,
  cue2,
  p,
}) => {
  const leave = smooth(progress) * 820 + cue2 * 90;
  return (
    <>
      <rect
        x="1040"
        y="110"
        width="760"
        height="860"
        fill={p.surface}
        opacity="0.22"
      />
      <rect
        x="1110"
        y="180"
        width="620"
        height="670"
        fill={p.backgroundAlt}
        opacity="0.5"
      />
      <g transform={`translate(${leave} ${wave(t, 14) * 12})`}>
        <rect
          x="1140"
          y="210"
          width="560"
          height="610"
          fill={p.accent}
          opacity="0.58"
        />
        <path
          d="M1170 700 C1300 480 1460 570 1660 330 V790 H1170Z"
          fill={p.light}
          opacity="0.34"
        />
        <circle cx="1420" cy="460" r="112" fill={p.secondary} opacity="0.7" />
      </g>
      <rect
        x="1038"
        y="108"
        width="764"
        height="864"
        fill="none"
        stroke={p.light}
        strokeWidth="22"
        opacity="0.62"
      />
      <rect
        x="1080"
        y="150"
        width="680"
        height="780"
        fill="none"
        stroke={p.detail}
        strokeWidth="8"
        opacity="0.6"
      />
      <path
        d="M960 1010 H1900"
        stroke={p.accent}
        strokeWidth="16"
        opacity={0.62 - progress * 0.34}
      />
      {Array.from({ length: 12 }, (_, index) => (
        <circle
          key={index}
          cx={1060 + index * 76 + progress * 360}
          cy={220 + (index % 5) * 140 + wave(t, 9 + index) * 8}
          r={5 + (index % 3) * 2}
          fill={p.light}
          opacity={0.4 - progress * 0.24}
        />
      ))}
    </>
  );
};
