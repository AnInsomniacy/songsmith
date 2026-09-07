import React from "react";
import { ArtProps } from "./shared";
export const Scene06: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect x="75" y="60" width="1770" height="960" fill={palette.paper} />
    <polygon
      points={`1090,180 1810,80 1810,930 1090,${900 - act2 * 80}`}
      fill={palette.accent}
      opacity={0.12 + act2 * 0.12}
    />
    <g stroke={palette.line} fill="none">
      {Array.from({ length: 5 }).map((_, i) => (
        <rect
          key={i}
          x={1120 + i * 135}
          y={210 - i * 18}
          width="100"
          height="520"
          strokeWidth="7"
          opacity={0.55 - act2 * i * 0.05}
        />
      ))}
    </g>
    <g
      transform="translate(1640 175)"
      stroke={palette.line}
      fill={palette.paper}
    >
      <circle r="62" strokeWidth="8" />
      <line y2="-38" strokeWidth="5" transform={`rotate(${t * 6})`} />
      <line y2="34" strokeWidth="8" transform={`rotate(${t * 0.5 - 45})`} />
    </g>
    {Array.from({ length: 18 }).map((_, i) => (
      <circle
        key={i}
        cx={1080 + ((i * 113 + t * (5 + (i % 3))) % 720)}
        cy={150 + ((i * 79 - t * (4 + (i % 4)) + 800) % 720)}
        r={2 + (i % 4)}
        fill={palette.accent}
        opacity="0.3"
      />
    ))}
    <rect
      x={1140 + act2 * 510}
      y="790"
      width="390"
      height="25"
      fill={palette.second}
      opacity="0.45"
    />
  </>
);
