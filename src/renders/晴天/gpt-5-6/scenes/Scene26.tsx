import React from "react";
import { interpolate } from "remotion";
import { ArtProps, clamp, Particles } from "./shared";
export const Scene26: React.FC<ArtProps> = ({ t, act2, palette }) => {
  const fly = interpolate(act2, [0, 1], [0, 1], clamp);
  return (
    <>
      <rect width="1920" height="1080" fill={palette.bg} />
      <g
        transform="translate(1110 200)"
        stroke={palette.line}
        fill="none"
        opacity={1 - fly * 0.45}
      >
        <path d="M0 700 V0 H690 V700 M80 700 V120 H610 V700" strokeWidth="16" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1={120 + i * 75}
            x2={120 + i * 75}
            y1="150"
            y2="700"
            strokeWidth="7"
            opacity="0.5"
          />
        ))}
      </g>
      <g
        transform={`translate(${1180 + fly * 760} ${720 - fly * 560 + Math.sin(t * 2) * 12}) rotate(${-8 - fly * 18}) scale(${1 - fly * 0.45})`}
      >
        <path
          d="M0 0 H410 V270 H0Z"
          fill={palette.paper}
          stroke={palette.line}
          strokeWidth="8"
          opacity={1 - fly}
        />
        <path
          d="M0 0 L410 135 L45 210 L130 135Z"
          fill={palette.paper}
          stroke={palette.line}
          strokeWidth="8"
          opacity={fly}
        />
        <path
          d="M130 135 L45 210 L160 168"
          fill={palette.accent}
          opacity={fly * 0.45}
        />
      </g>
      <path
        d={`M1200 855 C1450 ${760 - fly * 190} 1660 ${620 - fly * 220} 1880 ${470 - fly * 230}`}
        fill="none"
        stroke={palette.accent}
        strokeWidth="9"
        strokeDasharray="34 22"
        strokeDashoffset={-t * 50}
        opacity={fly}
      />
      <Particles
        t={t}
        seed={26}
        color={palette.accent}
        count={8}
        area="right"
      />
    </>
  );
};
