import React from "react";
import { ArtProps, Cloud } from "./shared";
export const Scene14: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <polygon
      points="1040,760 1860,620 1860,1080 980,1080"
      fill={palette.paper}
      opacity="0.7"
    />
    <g stroke={palette.line} strokeWidth="8" opacity="0.55">
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={i}
          x1={1100 + i * 90}
          x2={1100 + i * 90}
          y1={340 + (i % 2) * 20}
          y2="790"
        />
      ))}
      <line x1="1070" x2="1860" y1="350" y2="350" />
    </g>
    <Cloud x={1060 + ((t * 24) % 650)} y={80} color={palette.paper} />
    <ellipse
      cx={1450 + Math.sin(t * 0.35) * 250}
      cy="820"
      rx={260 + act2 * 130}
      ry="48"
      fill={palette.line}
      opacity="0.16"
    />
    <g
      transform={`translate(${1120 + ((t * 140) % 720)} ${260 - Math.sin(t * 0.7) * 70}) rotate(-9)`}
      fill={palette.accent}
    >
      <path d="M0 0 L115 32 L18 60 L42 34Z" />
    </g>
  </>
);
