import { evolvePath } from "@remotion/paths";
import React from "react";
import { ArtProps, Rain } from "./shared";
export const Scene25: React.FC<ArtProps> = ({
  t,
  enter,
  act2,
  palette,
  index,
}) => {
  const route = evolvePath(
    enter,
    "M1050 820 C1180 620 1250 700 1370 500 S1600 420 1800 220",
  );
  return (
    <>
      <rect width="1920" height="1080" fill={palette.bg} />
      <Rain t={t} seed={index} color={palette.paper} count={18} />
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={i}
          d={`M${1040 + i * 120} 120 C${980 + i * 130} 380 ${1110 + i * 100} 650 ${1050 + i * 125} 940`}
          stroke={palette.paper}
          strokeWidth={5 + (i % 3) * 3}
          fill="none"
          opacity="0.18"
          strokeDasharray="160 50"
          strokeDashoffset={-t * (25 + i * 4)}
        />
      ))}
      <path
        d="M1050 820 C1180 620 1250 700 1370 500 S1600 420 1800 220"
        stroke={palette.accent}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        {...route}
      />
      {[
        [1050, 820],
        [1370, 500],
        [1800, 220],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={24 + act2 * i * 9}
            fill={palette.paper}
            stroke={palette.line}
            strokeWidth="8"
          />
          <circle
            cx={x}
            cy={y}
            r="9"
            fill={i === 2 ? palette.second : palette.accent}
          />
        </g>
      ))}
      <path
        d={`M980 ${600 + Math.sin(t) * 40} H1880`}
        stroke={palette.second}
        strokeWidth="40"
        opacity={0.08 + act2 * 0.12}
      />
    </>
  );
};
