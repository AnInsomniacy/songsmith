import React from "react";
import { ArtProps, Particles } from "./shared";
export const Scene13: React.FC<ArtProps> = ({ t, enter, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect
      x="80"
      y="55"
      width="1760"
      height="970"
      fill={palette.paper}
      opacity="0.7"
    />
    <circle
      cx="1510"
      cy="360"
      r={245 + Math.sin(t * 0.45) * 12}
      fill={palette.accent}
      opacity={0.1 + enter * 0.08}
    />
    <g transform={`translate(1130 ${205 + (1 - enter) * 42})`} opacity={enter}>
      <rect
        x="24"
        y="32"
        width="610"
        height="650"
        rx="18"
        fill={palette.line}
        opacity="0.2"
      />
      <rect
        width="610"
        height="650"
        rx="18"
        fill={palette.paper}
        stroke={palette.line}
        strokeWidth="10"
      />
      <rect
        width="610"
        height="126"
        rx="14"
        fill={palette.second}
        opacity="0.78"
      />
      <path
        d="M0 126 H610"
        stroke={palette.line}
        strokeWidth="7"
        opacity="0.45"
      />
      {[105, 305, 505].map((x) => (
        <g key={x} transform={`translate(${x} 43)`}>
          <rect
            x="-14"
            y="-34"
            width="28"
            height="70"
            rx="14"
            fill={palette.line}
          />
          <circle cy="42" r="18" fill={palette.paper} />
        </g>
      ))}
      <rect
        x="54"
        y="176"
        width="502"
        height="420"
        rx="10"
        fill={palette.accent}
        opacity="0.16"
      />
      <path
        d="M112 352 H498 M112 424 H390"
        stroke={palette.second}
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.22"
      />
    </g>
    <g
      transform={`translate(${1184 + act2 * 510} ${381 - act2 * 350}) rotate(${act2 * 14} 251 210)`}
      opacity={enter * (1 - act2 * 0.18)}
    >
      <path
        d="M0 0 H502 V420 H0Z"
        fill={palette.paper}
        stroke={palette.accent}
        strokeWidth="8"
      />
      <path
        d="M0 34 H502"
        stroke={palette.accent}
        strokeWidth="6"
        strokeDasharray="18 14"
        opacity="0.65"
      />
      <text
        x="251"
        y="326"
        textAnchor="middle"
        fill={palette.line}
        fontFamily="Songsmith Barlow"
        fontSize="250"
        fontWeight="700"
        opacity="0.38"
      >
        1
      </text>
      <path
        d="M405 330 Q448 287 487 331"
        fill="none"
        stroke={palette.accent}
        strokeWidth="10"
        strokeLinecap="round"
      />
    </g>
    <path
      d={`M80 930 C640 ${912 - act2 * 10} 1230 ${952 + act2 * 8} 1840 930`}
      stroke={palette.second}
      strokeWidth="8"
      opacity="0.28"
    />
    <Particles t={t} seed={13} color={palette.accent} count={5} />
  </>
);
