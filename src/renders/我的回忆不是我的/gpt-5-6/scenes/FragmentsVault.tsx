import React from "react";
import { pingPong, SceneProps, wave } from "./shared";
export const FragmentsVault: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const gather = 1 - Math.min(1, cue * 0.78 + cue2 * 0.22);
  const blink = pingPong(t, 7.4) * 22 + cue2 * 12;
  const fragments = [
    [-280, -210, -14],
    [260, -190, 12],
    [-320, 190, 8],
    [290, 210, -10],
  ];
  return (
    <>
      <rect
        x="1120"
        y="110"
        width="690"
        height="850"
        rx="52"
        fill={p.surface}
        opacity="0.2"
      />
      <rect
        x="1190"
        y="180"
        width="550"
        height="710"
        rx="28"
        fill={p.backgroundAlt}
        stroke={p.light}
        strokeWidth="10"
        opacity="0.68"
      />
      <ellipse
        cx="1465"
        cy="535"
        rx="185"
        ry={104 - blink * 0.22}
        fill="none"
        stroke={p.light}
        strokeWidth="22"
        opacity="0.78"
      />
      <circle cx="1465" cy="535" r="62" fill={p.accent} />
      {fragments.map(([dx, dy, rotate], index) => (
        <g
          key={index}
          transform={`translate(${1465 + dx * gather + wave(t, 6 + index) * 12} ${535 + dy * gather}) rotate(${rotate * gather})`}
        >
          <rect
            x="-92"
            y="-70"
            width="184"
            height="140"
            fill={index % 2 ? p.secondary : p.detail}
            opacity="0.78"
          />
          <path
            d="M-72 42 L-18 -22 L18 8 L64 -46 L82 42Z"
            fill={p.surface}
            opacity="0.55"
          />
        </g>
      ))}
    </>
  );
};
