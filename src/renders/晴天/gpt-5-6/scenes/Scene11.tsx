import React from "react";
import { ArtProps } from "./shared";
export const Scene11: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <g transform="translate(1170 150)">
      <rect
        width="560"
        height="720"
        rx="18"
        fill={palette.paper}
        stroke={palette.line}
        strokeWidth="10"
      />
      <rect width="560" height="110" fill={palette.accent} opacity="0.65" />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={65 + i * 85} cy="160" r="12" fill={palette.line} />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <g
          key={i}
          transform={`translate(${50 + i * 125} 230) rotate(${Math.sin(t * 1.2 + i) * 3})`}
        >
          <rect
            width="96"
            height="145"
            fill={i % 2 ? palette.second : palette.bg}
            opacity="0.45"
          />
          <text
            x="48"
            y="95"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="58"
            fill={palette.line}
          >
            {i + 1}
          </text>
        </g>
      ))}
      <path
        d={`M0 ${480 - act2 * 260} Q280 ${400 - act2 * 150} 560 ${470 - act2 * 260} V720 H0Z`}
        fill={palette.accent}
        opacity={0.12 + act2 * 0.2}
      />
    </g>
    <polygon
      points={`${980 - act2 * 210},0 ${1350 - act2 * 100},0 ${1120 + act2 * 120},1080 ${750 + act2 * 60},1080`}
      fill={palette.accent}
      opacity="0.13"
    />
  </>
);
