import React from "react";
import type { PagePalette, SceneKind } from "./types";

const wave = (t: number, period: number, phase = 0) =>
  Math.sin(((t + phase) / period) * Math.PI * 2);

export type EvolutionCamera = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  pivotX: number;
  pivotY: number;
  atmosphereX: number;
  atmosphereY: number;
  atmosphereScale: number;
};

export const EVOLUTION_CAMERAS: Record<SceneKind, EvolutionCamera> = {
  "temperament-shutter": {
    x: -54,
    y: 24,
    scale: 1.075,
    rotate: -1.2,
    pivotX: 1500,
    pivotY: 520,
    atmosphereX: -32,
    atmosphereY: 18,
    atmosphereScale: 1.035,
  },
  "fragments-vault": {
    x: 38,
    y: -18,
    scale: 1.09,
    rotate: 0.8,
    pivotX: 1465,
    pivotY: 535,
    atmosphereX: 46,
    atmosphereY: -24,
    atmosphereScale: 1.055,
  },
  "patience-thread": {
    x: -68,
    y: -12,
    scale: 1.045,
    rotate: -0.6,
    pivotX: 1420,
    pivotY: 540,
    atmosphereX: -28,
    atmosphereY: -20,
    atmosphereScale: 1.025,
  },
  "dark-light-exposure": {
    x: -86,
    y: 14,
    scale: 1.08,
    rotate: 0.4,
    pivotX: 1460,
    pivotY: 540,
    atmosphereX: -64,
    atmosphereY: 12,
    atmosphereScale: 1.06,
  },
  "shared-contact-sheet": {
    x: 62,
    y: -34,
    scale: 1.055,
    rotate: 1.1,
    pivotX: 1430,
    pivotY: 520,
    atmosphereX: 52,
    atmosphereY: -42,
    atmosphereScale: 1.04,
  },
  "romance-emulsion": {
    x: -34,
    y: 22,
    scale: 1.065,
    rotate: -0.8,
    pivotX: 1450,
    pivotY: 530,
    atmosphereX: -42,
    atmosphereY: 34,
    atmosphereScale: 1.05,
  },
  "farewell-listen": {
    x: 42,
    y: 30,
    scale: 1.04,
    rotate: 0.7,
    pivotX: 1420,
    pivotY: 535,
    atmosphereX: 36,
    atmosphereY: 28,
    atmosphereScale: 1.03,
  },
  "color-proof": {
    x: -52,
    y: -28,
    scale: 1.07,
    rotate: -1.1,
    pivotX: 1450,
    pivotY: 520,
    atmosphereX: -38,
    atmosphereY: -36,
    atmosphereScale: 1.045,
  },
  "dandelion-first": {
    x: -92,
    y: -46,
    scale: 1.06,
    rotate: 0.5,
    pivotX: 1430,
    pivotY: 590,
    atmosphereX: -72,
    atmosphereY: -56,
    atmosphereScale: 1.035,
  },
  "memory-control": {
    x: 78,
    y: 12,
    scale: 1.055,
    rotate: 1.3,
    pivotX: 1430,
    pivotY: 530,
    atmosphereX: 62,
    atmosphereY: 14,
    atmosphereScale: 1.05,
  },
  "water-listen": {
    x: -36,
    y: 54,
    scale: 1.05,
    rotate: -0.4,
    pivotX: 1450,
    pivotY: 600,
    atmosphereX: -24,
    atmosphereY: 66,
    atmosphereScale: 1.04,
  },
  "departure-platform": {
    x: 104,
    y: -16,
    scale: 1.035,
    rotate: 0.6,
    pivotX: 1440,
    pivotY: 540,
    atmosphereX: 86,
    atmosphereY: -18,
    atmosphereScale: 1.025,
  },
  "inertia-drawer": {
    x: 58,
    y: 38,
    scale: 1.065,
    rotate: -0.9,
    pivotX: 1430,
    pivotY: 560,
    atmosphereX: 44,
    atmosphereY: 46,
    atmosphereScale: 1.045,
  },
  "ideal-exposure": {
    x: -24,
    y: -52,
    scale: 1.085,
    rotate: 0.5,
    pivotX: 1440,
    pivotY: 620,
    atmosphereX: -32,
    atmosphereY: -62,
    atmosphereScale: 1.06,
  },
  "shared-index": {
    x: 88,
    y: 26,
    scale: 1.05,
    rotate: 1.2,
    pivotX: 1450,
    pivotY: 540,
    atmosphereX: 76,
    atmosphereY: 30,
    atmosphereScale: 1.035,
  },
  "romance-negative": {
    x: -48,
    y: 32,
    scale: 1.07,
    rotate: -1.4,
    pivotX: 1450,
    pivotY: 540,
    atmosphereX: -54,
    atmosphereY: 38,
    atmosphereScale: 1.05,
  },
  "promise-replay": {
    x: 34,
    y: -34,
    scale: 1.055,
    rotate: 0.9,
    pivotX: 1430,
    pivotY: 510,
    atmosphereX: 42,
    atmosphereY: -40,
    atmosphereScale: 1.04,
  },
  "spectrum-stain": {
    x: -70,
    y: 18,
    scale: 1.08,
    rotate: -0.7,
    pivotX: 1450,
    pivotY: 530,
    atmosphereX: -58,
    atmosphereY: 22,
    atmosphereScale: 1.055,
  },
  "dandelion-reverse": {
    x: 72,
    y: -48,
    scale: 1.045,
    rotate: 0.6,
    pivotX: 1500,
    pivotY: 520,
    atmosphereX: 64,
    atmosphereY: -58,
    atmosphereScale: 1.03,
  },
  "memory-transfer": {
    x: 96,
    y: 20,
    scale: 1.06,
    rotate: 1.1,
    pivotX: 1450,
    pivotY: 520,
    atmosphereX: 82,
    atmosphereY: 18,
    atmosphereScale: 1.045,
  },
  "water-ceiling": {
    x: -32,
    y: 72,
    scale: 1.055,
    rotate: -0.5,
    pivotX: 1460,
    pivotY: 500,
    atmosphereX: -28,
    atmosphereY: 82,
    atmosphereScale: 1.035,
  },
  "farewell-dock": {
    x: 84,
    y: -22,
    scale: 1.045,
    rotate: 0.8,
    pivotX: 1450,
    pivotY: 600,
    atmosphereX: 70,
    atmosphereY: -26,
    atmosphereScale: 1.03,
  },
  "dandelion-field": {
    x: -110,
    y: -38,
    scale: 1.055,
    rotate: -0.6,
    pivotX: 1450,
    pivotY: 680,
    atmosphereX: -92,
    atmosphereY: -46,
    atmosphereScale: 1.04,
  },
  "memory-peel": {
    x: 64,
    y: 42,
    scale: 1.075,
    rotate: 1.4,
    pivotX: 1450,
    pivotY: 540,
    atmosphereX: 52,
    atmosphereY: 48,
    atmosphereScale: 1.05,
  },
  "water-ground": {
    x: -44,
    y: 58,
    scale: 1.05,
    rotate: -0.3,
    pivotX: 1480,
    pivotY: 650,
    atmosphereX: -36,
    atmosphereY: 68,
    atmosphereScale: 1.035,
  },
  "last-empty-frame": {
    x: 116,
    y: -10,
    scale: 1.035,
    rotate: 0.4,
    pivotX: 1450,
    pivotY: 540,
    atmosphereX: 98,
    atmosphereY: -12,
    atmosphereScale: 1.025,
  },
};

export const SceneEvolution: React.FC<{
  scene: SceneKind;
  p: PagePalette;
  t: number;
  stage: number;
  resolve: number;
}> = ({ scene, p, t, stage, resolve }) => {
  const breathe = wave(t, 8.6) * 8;

  switch (scene) {
    case "temperament-shutter":
      return (
        <g opacity={stage * 0.58}>
          {[-1, 0, 1].map((offset) => (
            <path
              key={offset}
              d={`M1030 ${520 + offset * 92} H${1760 - stage * 90}`}
              stroke={offset === 0 ? p.accent : p.light}
              strokeWidth={offset === 0 ? 18 : 8}
              strokeLinecap="round"
              transform={`translate(${stage * 72} ${resolve * offset * 18})`}
            />
          ))}
          <circle
            cx="1500"
            cy="520"
            r={118 + resolve * 76 + breathe}
            fill="none"
            stroke={p.secondary}
            strokeWidth="12"
          />
        </g>
      );
    case "fragments-vault":
      return (
        <g opacity={stage * 0.72}>
          {[
            [1190, 535, 1320, 535],
            [1610, 535, 1740, 535],
            [1465, 180, 1465, 320],
            [1465, 750, 1465, 890],
          ].map(([x1, y1, x2, y2], index) => (
            <line
              key={index}
              x1={x1 + (1 - stage) * (x1 < 1400 ? -110 : x1 > 1500 ? 110 : 0)}
              y1={y1 + (1 - stage) * (y1 < 500 ? -90 : y1 > 600 ? 90 : 0)}
              x2={x2}
              y2={y2}
              stroke={index % 2 ? p.accent : p.light}
              strokeWidth="20"
              strokeLinecap="square"
            />
          ))}
          <rect
            x={1330 - resolve * 24}
            y={400 - resolve * 18}
            width={270 + resolve * 48}
            height={270 + resolve * 36}
            fill="none"
            stroke={p.secondary}
            strokeWidth="8"
          />
        </g>
      );
    case "patience-thread":
      return (
        <g opacity={stage * 0.7}>
          <path
            d="M1260 510 C1340 420 1450 620 1530 510 C1600 420 1710 590 1780 500"
            fill="none"
            stroke={p.accent}
            strokeWidth="22"
            strokeLinecap="round"
            strokeDasharray="980"
            strokeDashoffset={(1 - stage) * 980}
          />
          <circle
            cx={1510 + resolve * 35}
            cy={520 - resolve * 18}
            r={42 + resolve * 18}
            fill={p.surface}
            stroke={p.secondary}
            strokeWidth="12"
          />
        </g>
      );
    case "dark-light-exposure":
      return (
        <g opacity={stage * 0.48}>
          {Array.from({ length: 5 }, (_, index) => (
            <path
              key={index}
              d={`M${1210 + index * 42} ${520 + index * 44} C${1320 + index * 40} ${430 - resolve * 35} ${1550 + index * 28} ${440 + index * 20} ${1790 + resolve * 70} ${360 + index * 52}`}
              fill="none"
              stroke={index === 2 ? p.accent : p.light}
              strokeWidth={index === 2 ? 16 : 7}
              strokeLinecap="round"
            />
          ))}
        </g>
      );
    case "shared-contact-sheet":
      return (
        <g
          opacity={stage * 0.66}
          transform={`translate(${stage * 120} ${-stage * 54})`}
        >
          <rect
            x="1320"
            y="345"
            width="230"
            height="230"
            fill="none"
            stroke={p.accent}
            strokeWidth="16"
          />
          <path
            d="M1280 315 H1360 M1280 315 V395 M1590 605 H1510 M1590 605 V525"
            fill="none"
            stroke={p.light}
            strokeWidth="10"
          />
          <rect
            x={1530 + resolve * 80}
            y="560"
            width="180"
            height="28"
            fill={p.secondary}
          />
        </g>
      );
    case "romance-emulsion":
      return (
        <g opacity={stage * 0.54}>
          <path
            d={`M1010 ${220 + breathe} C1240 ${390 - resolve * 90} 1550 ${690 + resolve * 40} 1890 850`}
            fill="none"
            stroke={p.light}
            strokeWidth={18 + resolve * 12}
            strokeLinecap="round"
          />
          <ellipse
            cx="1460"
            cy="545"
            rx={190 - resolve * 42}
            ry={92 + resolve * 36}
            fill="none"
            stroke={p.accent}
            strokeWidth="12"
          />
        </g>
      );
    case "farewell-listen":
      return (
        <g opacity={stage * 0.64}>
          {Array.from({ length: 4 }, (_, index) => (
            <path
              key={index}
              d={`M1120 ${440 + index * 74} C1320 ${330 + index * 76 - resolve * 18} 1580 ${520 + index * 38} 1840 ${390 + index * 64}`}
              fill="none"
              stroke={index === 1 ? p.accent : p.light}
              strokeWidth={index === 1 ? 18 : 8}
              strokeDasharray="1100"
              strokeDashoffset={(1 - stage) * 1100}
            />
          ))}
          <circle
            cx={1150 + resolve * 620}
            cy={585 - resolve * 108}
            r="24"
            fill={p.secondary}
          />
        </g>
      );
    case "color-proof":
      return (
        <g opacity={stage * 0.62}>
          {[p.accent, p.secondary, p.light].map((color, index) => (
            <circle
              key={color}
              cx={1450 + (1 - stage) * (index - 1) * 210}
              cy={520 + (1 - stage) * (index % 2 ? 150 : -120)}
              r={126 + resolve * 28}
              fill="none"
              stroke={color}
              strokeWidth={18 - index * 3}
            />
          ))}
          <circle cx="1450" cy="520" r={34 + resolve * 24} fill={p.accent} />
        </g>
      );
    case "dandelion-first":
      return (
        <g opacity={stage * 0.52}>
          {Array.from({ length: 5 }, (_, index) => (
            <path
              key={index}
              d={`M1010 ${300 + index * 118} C1260 ${230 + index * 106 - breathe} 1580 ${340 + index * 82} ${1950 + resolve * 90} ${230 + index * 98}`}
              fill="none"
              stroke={index === 2 ? p.accent : p.light}
              strokeWidth={index === 2 ? 14 : 6}
              strokeLinecap="round"
            />
          ))}
        </g>
      );
    case "memory-control":
      return (
        <g opacity={stage * 0.68}>
          <path
            d={`M1090 250 H${1390 + resolve * 240} V820 H1090`}
            fill="none"
            stroke={p.accent}
            strokeWidth="18"
          />
          <path
            d={`M1770 250 H${1470 - resolve * 120} V820 H1770`}
            fill="none"
            stroke={p.secondary}
            strokeWidth="18"
          />
          <rect
            x={1370 + resolve * 210}
            y="414"
            width="110"
            height="230"
            rx="18"
            fill={p.surface}
          />
        </g>
      );
    case "water-listen":
      return (
        <g opacity={stage * 0.58}>
          <path
            d={`M1450 455 C1450 ${590 + resolve * 70} 1370 ${700 + resolve * 80} 1530 820`}
            fill="none"
            stroke={p.accent}
            strokeWidth="18"
            strokeDasharray="620"
            strokeDashoffset={(1 - stage) * 620}
          />
          {Array.from({ length: 4 }, (_, index) => (
            <path
              key={index}
              d={`M1050 ${820 + index * 28} C1240 ${740 + index * 34} 1500 ${900 - index * 22} 1900 ${760 + index * 24}`}
              fill="none"
              stroke={index === 2 ? p.secondary : p.light}
              strokeWidth={index === 2 ? 14 : 7}
            />
          ))}
        </g>
      );
    case "departure-platform":
      return (
        <g opacity={stage * 0.62}>
          {Array.from({ length: 6 }, (_, index) => (
            <rect
              key={index}
              x={1080 + index * 145 + resolve * index * 24}
              y="790"
              width={82 - index * 7}
              height="18"
              fill={index < 2 ? p.accent : p.light}
            />
          ))}
          <path
            d={`M1040 875 H${1510 + resolve * 400}`}
            stroke={p.secondary}
            strokeWidth="12"
            strokeDasharray="42 28"
          />
          <circle
            cx={1260 + stage * 510}
            cy="842"
            r={24 - resolve * 7}
            fill={p.accent}
          />
        </g>
      );
    case "inertia-drawer":
      return (
        <g
          opacity={stage * 0.66}
          transform={`translate(${stage * 210} ${-stage * 18})`}
        >
          <rect
            x="1220"
            y="535"
            width={410 + resolve * 80}
            height="154"
            fill={p.light}
          />
          <path
            d={`M1260 575 H${1510 + resolve * 90} M1260 620 H${1450 + resolve * 130}`}
            stroke={p.accent}
            strokeWidth="14"
          />
          <rect
            x={1540 + resolve * 90}
            y="555"
            width="62"
            height="114"
            fill={p.secondary}
          />
        </g>
      );
    case "ideal-exposure":
      return (
        <g opacity={stage * 0.62}>
          <line
            x1="1440"
            y1="120"
            x2="1440"
            y2="960"
            stroke={p.detail}
            strokeWidth={22 - resolve * 16}
            opacity={1 - resolve * 0.82}
          />
          <ellipse
            cx="1440"
            cy="640"
            rx={90 + resolve * 300}
            ry={60 + resolve * 118}
            fill="none"
            stroke={p.light}
            strokeWidth="20"
          />
          <circle cx="1440" cy="640" r={32 + resolve * 38} fill={p.accent} />
        </g>
      );
    case "shared-index":
      return (
        <g opacity={stage * 0.68} transform={`translate(${stage * 140} 0)`}>
          <path
            d="M1230 280 H1320 M1230 280 V370 M1720 800 H1630 M1720 800 V710"
            fill="none"
            stroke={p.light}
            strokeWidth="16"
          />
          <rect
            x={1320 + resolve * 150}
            y={330 - resolve * 30}
            width="300"
            height="360"
            fill="none"
            stroke={p.accent}
            strokeWidth="14"
          />
          <circle
            cx={1470 + resolve * 150}
            cy={510 - resolve * 30}
            r={60 + resolve * 26}
            fill={p.secondary}
          />
        </g>
      );
    case "romance-negative":
      return (
        <g opacity={stage * 0.6}>
          <path
            d={`M1010 ${470 - resolve * 42} L1880 ${650 + resolve * 36}`}
            stroke={p.accent}
            strokeWidth="18"
          />
          {Array.from({ length: 9 }, (_, index) => (
            <rect
              key={index}
              x={1100 + index * 82}
              y={500 + index * 17 + resolve * 12}
              width="42"
              height="26"
              fill={index % 2 ? p.light : p.secondary}
              transform={`rotate(12 ${1120 + index * 82} ${513 + index * 17})`}
            />
          ))}
          <rect
            x="1380"
            y="500"
            width={120 + resolve * 100}
            height="84"
            fill={p.surface}
            opacity="0.76"
          />
        </g>
      );
    case "promise-replay":
      return (
        <g opacity={stage * 0.66}>
          <path
            d={`M1070 780 C1190 ${690 - breathe} 1260 ${850 + breathe} 1370 760 C1490 660 1600 850 1810 ${690 - resolve * 80}`}
            fill="none"
            stroke={p.accent}
            strokeWidth="20"
            strokeDasharray="1180"
            strokeDashoffset={(1 - stage) * 1180}
          />
          {Array.from({ length: 5 }, (_, index) => (
            <circle
              key={index}
              cx={1190 + index * 135}
              cy={760 + wave(t, 5.4, index * 0.7) * (18 + resolve * 14)}
              r={14 + index * 3}
              fill={index === 2 ? p.secondary : p.light}
            />
          ))}
        </g>
      );
    case "spectrum-stain":
      return (
        <g opacity={stage * 0.58}>
          {[p.accent, p.secondary, p.light].map((color, index) => (
            <rect
              key={color}
              x={1110 + index * 210 - resolve * index * 96}
              y={190 + index * 130 - resolve * index * 52}
              width={480 - index * 60}
              height={650 - index * 40}
              fill="none"
              stroke={color}
              strokeWidth={18 - index * 3}
              transform={`rotate(${-8 + index * 7 - resolve * (-8 + index * 7)} ${1350 + index * 180} 520)`}
            />
          ))}
          <circle cx="1450" cy="520" r={42 + resolve * 52} fill={p.accent} />
        </g>
      );
    case "dandelion-reverse":
      return (
        <g opacity={stage * 0.56}>
          {Array.from({ length: 4 }, (_, index) => (
            <path
              key={index}
              d={`M1900 ${240 + index * 170} C1680 ${150 + index * 170} 1480 ${360 + index * 112} ${1190 - resolve * 80} ${250 + index * 138}`}
              fill="none"
              stroke={index === 1 ? p.accent : p.light}
              strokeWidth={index === 1 ? 15 : 7}
              strokeLinecap="round"
            />
          ))}
          <path
            d={`M1260 860 Q${1430 - resolve * 120} ${700 - resolve * 70} 1570 530`}
            fill="none"
            stroke={p.secondary}
            strokeWidth="18"
          />
        </g>
      );
    case "memory-transfer":
      return (
        <g opacity={stage * 0.66}>
          <rect
            x={1100 + stage * 460}
            y={210 - resolve * 54}
            width="170"
            height="230"
            fill={p.light}
            stroke={p.accent}
            strokeWidth="14"
          />
          <path
            d={`M1185 ${440 - resolve * 54} V${650 - resolve * 80} H${1550 + resolve * 120}`}
            fill="none"
            stroke={p.secondary}
            strokeWidth="18"
            strokeDasharray="620"
            strokeDashoffset={(1 - stage) * 620}
          />
          <rect
            x={1580 + resolve * 110}
            y="650"
            width="190"
            height="34"
            fill={p.accent}
          />
        </g>
      );
    case "water-ceiling":
      return (
        <g opacity={stage * 0.6}>
          <line
            x1="960"
            y1={260 + resolve * 470}
            x2="1920"
            y2={260 + resolve * 470}
            stroke={p.accent}
            strokeWidth="18"
          />
          {Array.from({ length: 5 }, (_, index) => (
            <ellipse
              key={index}
              cx="1480"
              cy={260 + resolve * 470}
              rx={90 + index * 90 + resolve * 42}
              ry={18 + index * 12}
              fill="none"
              stroke={index === 2 ? p.secondary : p.light}
              strokeWidth={index === 2 ? 12 : 6}
            />
          ))}
        </g>
      );
    case "farewell-dock":
      return (
        <g opacity={stage * 0.64}>
          <path
            d={`M1050 650 C1160 ${560 - resolve * 90} 1330 ${720 + breathe} ${1510 + resolve * 260} ${500 - resolve * 120}`}
            fill="none"
            stroke={p.accent}
            strokeWidth="24"
            strokeLinecap="round"
            strokeDasharray="980"
            strokeDashoffset={(1 - stage) * 980}
          />
          <circle
            cx={1510 + resolve * 260}
            cy={500 - resolve * 120}
            r={56 - resolve * 18}
            fill={p.surface}
            stroke={p.secondary}
            strokeWidth="12"
          />
        </g>
      );
    case "dandelion-field":
      return (
        <g opacity={stage * 0.5}>
          {Array.from({ length: 5 }, (_, index) => (
            <path
              key={index}
              d={`M920 ${310 + index * 122} C1210 ${200 + index * 120 - breathe} 1530 ${390 + index * 86} ${1990 + resolve * 100} ${240 + index * 108}`}
              fill="none"
              stroke={index === 3 ? p.accent : p.light}
              strokeWidth={index === 3 ? 16 : 7}
              strokeLinecap="round"
            />
          ))}
          <path
            d={`M960 860 Q1300 ${680 - resolve * 80} 1910 ${770 - resolve * 60}`}
            fill="none"
            stroke={p.secondary}
            strokeWidth="20"
          />
        </g>
      );
    case "memory-peel":
      return (
        <g opacity={stage * 0.62}>
          <path
            d={`M1210 270 H${1660 + resolve * 120} V${760 - resolve * 80} L${1460 + resolve * 160} 910 H1210Z`}
            fill={p.light}
            opacity="0.32"
          />
          <path
            d={`M1460 910 Q${1540 + resolve * 130} ${760 - resolve * 60} ${1780 + resolve * 70} ${680 - resolve * 90}`}
            fill="none"
            stroke={p.accent}
            strokeWidth="20"
          />
          <rect
            x={1600 + resolve * 150}
            y={330 - resolve * 40}
            width="120"
            height="260"
            fill={p.secondary}
            opacity="0.72"
          />
        </g>
      );
    case "water-ground":
      return (
        <g opacity={stage * 0.58}>
          {Array.from({ length: 5 }, (_, index) => (
            <path
              key={index}
              d={`M980 ${730 + index * 34} C1180 ${620 + index * 42} 1390 ${860 - index * 32} 1580 ${740 + index * 20} C1740 ${650 + index * 24} 1840 ${730 - index * 12} ${1980 + resolve * 70} ${650 + index * 22}`}
              fill="none"
              stroke={index === 2 ? p.accent : p.light}
              strokeWidth={index === 2 ? 16 : 7}
              strokeDasharray="1280"
              strokeDashoffset={(1 - stage) * 1280}
            />
          ))}
        </g>
      );
    case "last-empty-frame":
      return (
        <g opacity={stage * 0.66}>
          <rect
            x="1160"
            y="250"
            width="520"
            height="520"
            fill="none"
            stroke={p.light}
            strokeWidth={18 - resolve * 8}
          />
          <path
            d={`M1160 770 L${1370 + resolve * 270} ${520 - resolve * 150} L1680 770`}
            fill="none"
            stroke={p.accent}
            strokeWidth="16"
          />
          <rect
            x="1240"
            y={820 + resolve * 44}
            width={360 - resolve * 120}
            height="28"
            fill={p.secondary}
            opacity={0.8 - resolve * 0.3}
          />
        </g>
      );
  }
};
