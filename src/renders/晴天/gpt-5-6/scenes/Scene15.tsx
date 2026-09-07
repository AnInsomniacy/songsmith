import React from "react";
import { ArtProps } from "./shared";
export const Scene15: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <polygon
      points="1030,120 1840,40 1840,1030 1030,920"
      fill={palette.paper}
    />
    <path
      d="M1040 170 L1810 90 M1040 900 L1810 1010"
      stroke={palette.line}
      strokeWidth="11"
    />
    <g>
      {Array.from({ length: 7 }).map((_, i) => {
        const on = i / 7 > act2 * 0.78;
        return (
          <polygon
            key={i}
            points={`${1110 + i * 105},${195 - i * 10} ${1185 + i * 105},${185 - i * 10} ${1185 + i * 105},${760 + i * 20} ${1110 + i * 105},${750 + i * 20}`}
            fill={on ? palette.accent : palette.second}
            opacity={on ? 0.32 : 0.12}
          />
        );
      })}
    </g>
    {Array.from({ length: 12 }).map((_, i) => (
      <circle
        key={i}
        cx={1080 + ((i * 137 + t * 9) % 720)}
        cy={140 + ((i * 89 - t * 8 + 900) % 760)}
        r={2 + (i % 4)}
        fill={palette.accent}
        opacity="0.32"
      />
    ))}
    <path
      d={`M1050 840 L${1700 - act2 * 430} 250`}
      stroke={palette.accent}
      strokeWidth="12"
      opacity="0.36"
    />
  </>
);
