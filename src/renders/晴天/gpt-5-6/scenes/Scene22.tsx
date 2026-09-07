import React from "react";
import { ArtProps } from "./shared";
export const Scene22: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <polygon
      points="980,1080 1120,230 1810,110 1860,1080"
      fill={palette.paper}
      opacity="0.65"
    />
    <g transform="translate(1110 170)" stroke={palette.line} fill="none">
      <path d="M0 760 V0 H690 V760" strokeWidth="17" />
      <g transform={`translate(${act2 * 245} 0)`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={65 + i * 58}
            x2={65 + i * 58}
            y1="110"
            y2="760"
            strokeWidth="8"
          />
        ))}
      </g>
      <g transform={`translate(${-act2 * 245} 0)`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={400 + i * 58}
            x2={400 + i * 58}
            y1="110"
            y2="760"
            strokeWidth="8"
          />
        ))}
      </g>
    </g>
    <path
      d={`M1050 900 C1280 ${830 + act2 * 90} 1510 890 1810 ${760 + act2 * 110}`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="10"
      strokeDasharray="48 34"
      strokeDashoffset={t * 55}
    />
    <g
      transform={`translate(${1640 + t * 45} 760) scale(.52)`}
      stroke={palette.second}
      strokeWidth="10"
      fill="none"
    >
      <circle cx="0" cy="90" r="70" />
      <circle cx="240" cy="90" r="70" />
      <path d="M0 90 L90 0 L142 90 L48 90 M90 0 H184 L240 90" />
    </g>
  </>
);
