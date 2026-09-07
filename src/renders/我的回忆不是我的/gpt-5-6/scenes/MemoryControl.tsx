import React from "react";
import { pingPong, SceneProps, wave } from "./shared";
export const MemoryControl: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const release = 30 + cue * 310 + cue2 * 180 + pingPong(t, 13) * 25;
  return (
    <>
      <rect
        x="1100"
        y="130"
        width="650"
        height="820"
        fill={p.surface}
        opacity="0.24"
      />
      <rect
        x={1150 + release}
        y="190"
        width="550"
        height="670"
        fill={p.accent}
        opacity="0.55"
      />
      <rect
        x={1190 + release}
        y="230"
        width="470"
        height="520"
        fill={p.backgroundAlt}
        opacity="0.72"
      />
      <path
        d="M1080 120 H1770 V960 H1080Z"
        fill="none"
        stroke={p.light}
        strokeWidth="22"
        opacity="0.58"
      />
      {[0, 1].map((index) => (
        <g
          key={index}
          transform={`translate(${1070 + index * 690} ${380 + wave(t, 8 + index) * 12}) rotate(${index ? 12 - cue * 18 : -12 + cue * 18})`}
        >
          <rect
            x="-42"
            y="-92"
            width="84"
            height="184"
            rx="18"
            fill={p.secondary}
          />
          <circle cy="-55" r="18" fill={p.surface} />
        </g>
      ))}
      <path
        d={`M1120 885 C1320 ${830 + wave(t, 7) * 20} 1540 940 1800 830`}
        fill="none"
        stroke={p.detail}
        strokeWidth="14"
        opacity="0.58"
      />
    </>
  );
};
