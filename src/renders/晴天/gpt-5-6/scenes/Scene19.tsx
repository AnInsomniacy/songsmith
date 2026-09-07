import React from "react";
import { ArtProps, Rain } from "./shared";
export const Scene19: React.FC<ArtProps> = ({ t, act2, palette, index }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <Rain t={t} seed={index} color={palette.paper} count={20} />
    <g stroke={palette.line} strokeWidth="12">
      <line x1="1110" y1="180" x2="1110" y2="940" />
      <line x1="1770" y1="120" x2="1770" y2="940" />
    </g>
    <path
      d={`M1110 390 C1270 ${300 + Math.sin(t * 2) * 55} 1490 ${510 + Math.sin(t * 1.6) * 75} 1770 340`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="16"
    />
    <path
      d={`M1300 460 C1450 ${360 + Math.sin(t * 2.4) * 65} 1560 530 1690 ${420 - act2 * 90} C1580 650 1450 620 1300 460Z`}
      fill={palette.accent}
      opacity="0.45"
    />
    <path
      d={`M1100 770 C1290 ${660 - act2 * 80} 1500 820 1810 620`}
      fill="none"
      stroke={palette.second}
      strokeWidth="11"
      strokeDasharray="80 28"
      strokeDashoffset={-t * 100}
    />
  </>
);
