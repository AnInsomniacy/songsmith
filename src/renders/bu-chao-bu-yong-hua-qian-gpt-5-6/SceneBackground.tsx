import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PALETTES, type ScenePalette } from "./design";
import type { LyricPage } from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TAU = Math.PI * 2;

type ArtProps = {
  palette: ScenePalette;
  t: number;
  progress: number;
  scope: string;
};

const Barcode: React.FC<{
  x: number;
  y: number;
  height: number;
  color: string;
  phase?: number;
}> = ({ x, y, height, color, phase = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: 18 }, (_, i) => {
      const width = [5, 11, 7, 15][(i + phase) % 4];
      const offset = Array.from(
        { length: i },
        (__, j) =>
          [5, 11, 7, 15][(j + phase) % 4] + [8, 12, 9][(j + phase) % 3],
      ).reduce((a, b) => a + b, 0);
      return (
        <rect
          key={i}
          x={offset}
          y={0}
          width={width}
          height={height - (i % 5) * 7}
          fill={color}
        />
      );
    })}
  </g>
);

const Tag: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  hole: string;
  rotate?: number;
}> = ({ x, y, width, height, color, hole, rotate = 0 }) => (
  <g
    transform={`translate(${x} ${y}) rotate(${rotate} ${width / 2} ${height / 2})`}
  >
    <path
      d={`M0 0 H${width - 82} L${width} ${height / 2} L${width - 82} ${height} H0 Z`}
      fill={color}
    />
    <circle cx={width - 57} cy={height / 2} r={17} fill={hole} />
  </g>
);

const art = (scene: string, props: ArtProps): React.ReactNode => {
  const { palette: p, t, progress, scope } = props;
  const drift = Math.sin(t * 0.9) * 18;
  const turn = Math.sin(t * 0.55) * 7;
  const scan = 1100 + Math.sin(t * 0.72) * 1100;

  switch (scene) {
    case "tag-invite":
      return (
        <>
          <g
            transform={`translate(${interpolate(progress, [0, 1], [120, -90])} ${drift}) rotate(-8 1500 450)`}
          >
            <Tag
              x={1170}
              y={170}
              width={690}
              height={360}
              color={p.accent}
              hole={p.background}
            />
            <circle
              cx={1430}
              cy={350}
              r={108}
              fill={p.background}
              opacity={0.82}
            />
            <path
              d="M1430 286 V414 M1366 350 H1494"
              stroke={p.foreground}
              strokeWidth={24}
            />
          </g>
          <path
            d={`M${scan - 300} 900 H${scan + 150}`}
            stroke={p.secondary}
            strokeWidth={26}
          />
          <Barcode x={120} y={780} height={190} color={p.quiet} />
        </>
      );
    case "mirror-stock": {
      const open = interpolate(progress, [0, 0.3], [0, 1], {
        ...clamp,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      });
      return (
        <>
          <rect
            x={1150}
            y={90}
            width={650 * open}
            height={900}
            fill={p.panel}
          />
          <g transform={`translate(${1380 + drift} 220) rotate(${turn})`}>
            {Array.from({ length: 4 }, (_, i) => (
              <rect
                key={i}
                x={i * 58}
                y={i * 58}
                width={310}
                height={510}
                rx={24}
                fill="none"
                stroke={i % 2 ? p.secondary : p.foreground}
                strokeWidth={12}
                opacity={0.78 - i * 0.12}
              />
            ))}
          </g>
          <path
            d={`M1100 ${160 + scan / 4} H1920`}
            stroke={p.accent}
            strokeWidth={18}
          />
        </>
      );
    }
    case "left-rail": {
      const x = 90 + ((1 - Math.cos(t * 0.82)) / 2) * 730;
      return (
        <>
          <path d="M80 940 H1840" stroke={p.quiet} strokeWidth={18} />
          {Array.from({ length: 8 }, (_, i) => (
            <rect
              key={i}
              x={112 + i * 184}
              y={840 - (i % 3) * 36}
              width={132}
              height={100 + (i % 3) * 36}
              fill={i < 4 ? p.accent : p.panel}
              opacity={0.64}
            />
          ))}
          <g transform={`translate(${x} 180)`}>
            <path d="M0 620 H240 L300 700 L240 780 H0 Z" fill={p.secondary} />
            <circle cx={242} cy={700} r={16} fill={p.background} />
          </g>
        </>
      );
    }
    case "pulse-fold": {
      const fold = (Math.sin(t * 1.4) + 1) / 2;
      return (
        <>
          <path
            d={`M1160 130 L1880 130 L${1640 + fold * 90} 950 L1080 950 Z`}
            fill={p.panel}
          />
          {Array.from({ length: 4 }, (_, i) => {
            const r = 80 + i * 92 + Math.sin(t * 1.6 - i * 0.5) * 22;
            return (
              <circle
                key={i}
                cx={1510}
                cy={530}
                r={r}
                fill="none"
                stroke={i % 2 ? p.secondary : p.accent}
                strokeWidth={20 - i * 3}
                opacity={0.78 - i * 0.12}
              />
            );
          })}
          <path
            d="M1180 860 L1510 620 L1840 860"
            fill="none"
            stroke={p.foreground}
            strokeWidth={18}
          />
        </>
      );
    }
    case "scanner-apple": {
      const appleY = 510 + Math.sin(t * 0.78) * 110;
      return (
        <>
          <defs>
            <clipPath id={`${scope}-apple`}>
              <circle cx="1510" cy={appleY} r="190" />
            </clipPath>
          </defs>
          <circle cx={1510} cy={appleY} r={190} fill={p.secondary} />
          <rect
            x={1300}
            y={appleY - 210}
            width={420}
            height={460}
            fill={p.accent}
            opacity={0.34}
            clipPath={`url(#${scope}-apple)`}
            transform={`rotate(${turn} 1510 ${appleY})`}
          />
          <path
            d={`M1510 ${appleY - 190} Q1500 ${appleY - 270} 1580 ${appleY - 294}`}
            fill="none"
            stroke={p.foreground}
            strokeWidth={25}
          />
          <path
            d={`M1080 ${545 + Math.sin(t * 0.94) * 330} H1920`}
            stroke={p.foreground}
            strokeWidth={12}
            opacity={0.58}
          />
          <rect x={1050} y={840} width={870} height={110} fill={p.panel} />
        </>
      );
    }
    case "thought-receipt":
      return (
        <>
          <g
            transform={`translate(${Math.sin(t * 0.65) * 24} ${Math.sin(t * 0.52) * 58})`}
          >
            <path
              d="M1260 40 H1820 V980 L1780 940 L1740 980 L1700 940 L1660 980 L1620 940 L1580 980 L1540 940 L1500 980 L1460 940 L1420 980 L1380 940 L1340 980 L1300 940 L1260 980 Z"
              fill={p.panel}
            />
            {Array.from({ length: 12 }, (_, i) => (
              <rect
                key={i}
                x={1330}
                y={150 + i * 62}
                width={i % 3 === 0 ? 380 : 300}
                height={12}
                fill={i === 4 ? p.accent : p.quiet}
              />
            ))}
          </g>
          <circle cx={1130} cy={760} r={74} fill={p.secondary} />
          <path d="M1078 760 H1182" stroke={p.background} strokeWidth={18} />
        </>
      );
    case "knock-register": {
      const drawerOpen = interpolate(progress, [0.2, 0.55], [0, 1], {
        ...clamp,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      });
      const drawer = drawerOpen * (205 + Math.sin(t * 0.82) * 18);
      return (
        <>
          <rect
            x={1120}
            y={260}
            width={660}
            height={510}
            rx={34}
            fill={p.panel}
          />
          <rect
            x={1210}
            y={330}
            width={480}
            height={140}
            rx={16}
            fill={p.background}
          />
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x={1210 + (i % 4) * 124}
              y={520 + Math.floor(i / 4) * 72}
              width={92}
              height={48}
              rx={8}
              fill={i % 5 === 0 ? p.accent : p.quiet}
            />
          ))}
          <g transform={`translate(0 ${drawer})`}>
            <rect
              x={1160}
              y={745}
              width={580}
              height={150}
              fill={p.foreground}
            />
            <circle cx={1450} cy={815} r={27} fill={p.secondary} />
          </g>
          <path
            d={`M1040 ${535 + Math.sin(t * 0.88) * 300} H1860`}
            stroke={p.secondary}
            strokeWidth={10}
            opacity={0.6}
          />
        </>
      );
    }
    case "coupon-tear": {
      const tear = interpolate(progress, [0.1, 0.7], [0, 160], {
        ...clamp,
        easing: Easing.bezier(0.45, 0, 0.55, 1),
      });
      return (
        <>
          <g
            transform={`translate(${tear} ${-tear * 0.3}) rotate(${turn} 1490 560)`}
          >
            <rect
              x={1100}
              y={230}
              width={760}
              height={610}
              rx={28}
              fill={p.panel}
            />
            <path
              d="M1460 230 V840"
              stroke={p.foreground}
              strokeWidth={10}
              strokeDasharray="24 20"
            />
            <Barcode
              x={1510}
              y={335}
              height={310}
              color={p.foreground}
              phase={2}
            />
            <circle cx={1290} cy={530} r={108} fill={p.secondary} />
            <path d="M1238 530 H1342" stroke={p.background} strokeWidth={22} />
          </g>
          <path
            d="M990 900 Q1420 760 1900 930"
            fill="none"
            stroke={p.accent}
            strokeWidth={30}
          />
        </>
      );
    }
    case "rumor-switchboard":
      return (
        <>
          <g transform={`translate(${drift} 0)`}>
            {Array.from({ length: 9 }, (_, i) => {
              const x = 1100 + (i % 3) * 240;
              const y = 200 + Math.floor(i / 3) * 250;
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r={54}
                    fill={i % 2 ? p.accent : p.panel}
                  />
                  <path
                    d={`M${x + 54} ${y} C${x + 120} ${y - 80}, ${x + 160} ${y + 80}, ${x + 240} ${y}`}
                    fill="none"
                    stroke={p.quiet}
                    strokeWidth={14}
                  />
                </g>
              );
            })}
          </g>
          <rect x={70} y={100} width={30} height={880} fill={p.secondary} />
          <rect x={115} y={100} width={12} height={880} fill={p.foreground} />
        </>
      );
    case "ordinary-conveyor": {
      const belt = -130 + Math.sin(t * 0.72) * 130;
      return (
        <>
          <rect x={0} y={720} width={1920} height={220} fill={p.panel} />
          <g transform={`translate(${belt} 0)`}>
            {Array.from({ length: 10 }, (_, i) => (
              <g key={i} transform={`translate(${i * 260} 0)`}>
                <rect
                  x={0}
                  y={610}
                  width={190}
                  height={160}
                  fill={i === 6 ? p.secondary : p.quiet}
                />
                <circle cx={45} cy={820} r={28} fill={p.foreground} />
                <circle cx={145} cy={820} r={28} fill={p.foreground} />
              </g>
            ))}
          </g>
          <path
            d="M1050 200 H1860 V560 H1050 Z"
            fill="none"
            stroke={p.accent}
            strokeWidth={30}
          />
          <path
            d="M1170 320 H1740"
            stroke={p.foreground}
            strokeWidth={18}
            strokeDasharray="42 24"
          />
        </>
      );
    }
    case "flash-prism": {
      const beam = interpolate(progress, [0, 1], [-400, 850]);
      return (
        <>
          <polygon points="1260,200 1840,430 1340,920" fill={p.panel} />
          <polygon
            points="1460,370 1910,210 1910,720"
            fill={p.accent}
            opacity={0.56}
          />
          <path
            d={`M${beam} 0 L${beam + 540} 1080`}
            stroke={p.secondary}
            strokeWidth={90}
            opacity={0.72}
          />
          <circle
            cx={1510}
            cy={570}
            r={108 + Math.sin(t) * 12}
            fill={p.foreground}
          />
          <circle cx={1510} cy={570} r={55} fill={p.background} />
        </>
      );
    }
    case "countdown-seat": {
      const hand = -90 + t * 42;
      return (
        <>
          <circle cx={1500} cy={520} r={350} fill={p.panel} />
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x={1494}
              y={205}
              width={12}
              height={46}
              fill={p.foreground}
              transform={`rotate(${i * 30} 1500 520)`}
            />
          ))}
          <path
            d="M1500 520 V310"
            stroke={p.foreground}
            strokeWidth={24}
            transform={`rotate(${hand} 1500 520)`}
          />
          <circle cx={1500} cy={520} r={28} fill={p.secondary} />
          <path
            d="M1190 900 H1810"
            stroke={p.accent}
            strokeWidth={55}
            strokeDasharray="90 28"
          />
        </>
      );
    }
    case "door-price": {
      const door = interpolate(progress, [0.08, 0.55], [0, 1], {
        ...clamp,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      });
      return (
        <>
          <rect x={1230} y={130} width={570} height={820} fill={p.panel} />
          <path
            d={`M1230 130 L${1230 + 500 * door} ${205 - 50 * door} L${1230 + 500 * door} ${880 + 50 * door} L1230 950 Z`}
            fill={p.accent}
          />
          <circle cx={1610 + door * 80} cy={550} r={24} fill={p.secondary} />
          <Tag
            x={960}
            y={760}
            width={430}
            height={160}
            color={p.secondary}
            hole={p.background}
            rotate={-8 + turn}
          />
        </>
      );
    }
    case "coin-shredder": {
      const coinY = 520 + Math.sin(t * 0.92) * 390;
      return (
        <>
          <rect
            x={1210}
            y={170}
            width={620}
            height={250}
            rx={36}
            fill={p.foreground}
          />
          <rect
            x={1300}
            y={290}
            width={440}
            height={34}
            rx={17}
            fill={p.background}
          />
          <circle cx={1520} cy={coinY} r={70} fill={p.accent} />
          <path
            d="M1480 245 V355 M1520 245 V355 M1560 245 V355"
            stroke={p.secondary}
            strokeWidth={18}
          />
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d={`M${1260 + i * 72} 420 L${1220 + i * 82 + drift} 970`}
              stroke={i % 2 ? p.secondary : p.quiet}
              strokeWidth={34}
            />
          ))}
        </>
      );
    }
    case "sofa-chick": {
      const hop = ((1 - Math.cos(t * 2.2)) / 2) * 60;
      return (
        <>
          <rect
            x={1080}
            y={520}
            width={760}
            height={300}
            rx={68}
            fill={p.panel}
          />
          <rect x={1150} y={760} width={80} height={180} fill={p.foreground} />
          <rect x={1680} y={760} width={80} height={180} fill={p.foreground} />
          <g transform={`translate(1420 ${350 - hop})`}>
            <circle cx={0} cy={0} r={92} fill={p.secondary} />
            <circle cx={-28} cy={-18} r={8} fill={p.foreground} />
            <circle cx={28} cy={-18} r={8} fill={p.foreground} />
            <polygon points="-18,18 18,18 0,38" fill={p.accent} />
          </g>
          {Array.from({ length: 7 }, (_, i) => (
            <rect
              key={i}
              x={1110 + i * 100}
              y={390 - Math.sin(t * 0.86 + i * 0.72) * 105}
              width={58}
              height={34}
              rx={10}
              fill={i % 2 ? p.accent : p.secondary}
            />
          ))}
        </>
      );
    }
    case "sofa-smudge":
      return (
        <>
          <path
            d="M1100 770 Q1120 500 1370 500 H1610 Q1840 500 1840 770 V900 H1100 Z"
            fill={p.panel}
          />
          {Array.from({ length: 5 }, (_, i) => (
            <circle
              key={i}
              cx={1230 + i * 125 + Math.sin(t + i) * 18}
              cy={430 - Math.cos(t * 0.8 + i) * 50}
              r={62 + i * 6}
              fill={i % 2 ? p.secondary : p.quiet}
            />
          ))}
          <path
            d={`M1050 ${500 + Math.sin(t * 0.72) * 270} Q1450 ${360 + Math.sin(t * 0.93 + 1) * 170} 1900 ${520 + Math.sin(t * 0.61 + 2) * 190}`}
            fill="none"
            stroke={p.accent}
            strokeWidth={26}
          />
        </>
      );
    case "sofa-repeat": {
      const slide = 70 + Math.sin(t * 0.62) * 190;
      return (
        <>
          <g transform={`translate(${slide} 0)`}>
            {Array.from({ length: 4 }, (_, i) => (
              <g
                key={i}
                transform={`translate(${1040 + i * 250} ${470 + (i % 2) * 160})`}
              >
                <rect
                  width={220}
                  height={250}
                  rx={36}
                  fill={i % 2 ? p.panel : p.accent}
                />
                <circle cx={110} cy={90} r={52} fill={p.secondary} />
                <path d="M45 190 H175" stroke={p.foreground} strokeWidth={18} />
              </g>
            ))}
          </g>
          <Barcode
            x={1080}
            y={880}
            height={120}
            color={p.foreground}
            phase={1}
          />
        </>
      );
    }
    case "sofa-exit": {
      const exit = interpolate(progress, [0.15, 0.9], [0, 720], {
        ...clamp,
        easing: Easing.bezier(0.45, 0, 0.55, 1),
      });
      return (
        <>
          <rect
            x={1080 + exit}
            y={500}
            width={720}
            height={320}
            rx={80}
            fill={p.panel}
          />
          <rect
            x={1160 + exit}
            y={780}
            width={70}
            height={160}
            fill={p.accent}
          />
          <rect
            x={1650 + exit}
            y={780}
            width={70}
            height={160}
            fill={p.accent}
          />
          <path d="M1040 940 H1920" stroke={p.quiet} strokeWidth={22} />
          {Array.from({ length: 6 }, (_, i) => (
            <circle
              key={i}
              cx={1200 + i * 115 + exit * 0.5}
              cy={400 - i * 36 + Math.sin(t + i) * 20}
              r={42}
              fill={i % 2 ? p.secondary : p.accent}
              opacity={0.72}
            />
          ))}
        </>
      );
    }
    case "greedy-window":
      return (
        <>
          <rect x={1120} y={150} width={720} height={780} fill={p.panel} />
          <rect x={1190} y={220} width={580} height={640} fill={p.background} />
          <g transform={`translate(${Math.sin(t * 0.7) * 70} 0)`}>
            {Array.from({ length: 6 }, (_, i) => (
              <Tag
                key={i}
                x={1040 + (i % 3) * 290}
                y={250 + Math.floor(i / 3) * 330}
                width={250}
                height={130}
                color={i % 2 ? p.accent : p.secondary}
                hole={p.background}
                rotate={-8 + i * 4}
              />
            ))}
          </g>
          <path
            d={`M${scan - 420} 930 H${scan}`}
            stroke={p.foreground}
            strokeWidth={24}
          />
        </>
      );
    case "inventory-split": {
      const split = interpolate(progress, [0, 0.7], [0, 260], {
        ...clamp,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      });
      return (
        <>
          <rect
            x={1200 - split}
            y={160}
            width={310}
            height={760}
            fill={p.accent}
          />
          <rect
            x={1520 + split}
            y={160}
            width={310}
            height={760}
            fill={p.secondary}
          />
          <circle cx={1515} cy={540} r={128} fill={p.panel} />
          <path
            d="M1450 540 H1580 M1515 475 V605"
            stroke={p.foreground}
            strokeWidth={20}
          />
          <Barcode
            x={1200}
            y={870}
            height={90}
            color={p.foreground}
            phase={3}
          />
        </>
      );
    }
    case "knock-vending":
      return (
        <>
          <rect
            x={1190}
            y={110}
            width={650}
            height={870}
            rx={45}
            fill={p.panel}
          />
          <rect
            x={1270}
            y={190}
            width={490}
            height={500}
            rx={24}
            fill={p.background}
          />
          {Array.from({ length: 8 }, (_, i) => (
            <g
              key={i}
              transform={`translate(${1320 + (i % 4) * 112} ${250 + Math.floor(i / 4) * 240})`}
            >
              <circle r={46} fill={i % 3 === 0 ? p.secondary : p.accent} />
              <path d="M-22 0 H22" stroke={p.foreground} strokeWidth={12} />
            </g>
          ))}
          <rect
            x={1280}
            y={760}
            width={470}
            height={110}
            rx={22}
            fill={p.foreground}
          />
          <rect
            x={1390 + Math.sin(t) * 55}
            y={800}
            width={250}
            height={26}
            rx={13}
            fill={p.secondary}
          />
        </>
      );
    case "checkout-zero": {
      const zero = interpolate(progress, [0.25, 0.72], [420, 0], {
        ...clamp,
        easing: Easing.bezier(0.45, 0, 0.55, 1),
      });
      return (
        <>
          <path d="M1070 300 H1840 L1760 820 H1180 Z" fill={p.panel} />
          <circle cx={1280} cy={900} r={72} fill={p.foreground} />
          <circle cx={1660} cy={900} r={72} fill={p.foreground} />
          <rect
            x={1240}
            y={380}
            width={430}
            height={200}
            rx={28}
            fill={p.background}
          />
          <text
            x={1455}
            y={535}
            textAnchor="middle"
            fontFamily="DIN Condensed"
            fontWeight={700}
            fontSize={170}
            fill={p.foreground}
          >
            {Math.round(zero)}
          </text>
          <path
            d="M1130 230 H1770"
            stroke={p.secondary}
            strokeWidth={24}
            strokeDasharray="70 24"
          />
        </>
      );
    }
    case "echo-tag-a":
      return (
        <>
          {Array.from({ length: 7 }, (_, i) => (
            <Tag
              key={i}
              x={1080 + i * 95 + Math.sin(t + i) * 22}
              y={160 + i * 110}
              width={470 - i * 18}
              height={170}
              color={i % 2 ? p.accent : p.quiet}
              hole={p.background}
              rotate={-12 + i * 3}
            />
          ))}
          <circle cx={1660} cy={270} r={118} fill={p.secondary} />
          <path d="M1600 270 H1720" stroke={p.background} strokeWidth={24} />
        </>
      );
    case "echo-tag-b": {
      const flip = (1 + Math.cos(t * 0.86)) / 2;
      const flipWidth = 90 + flip * 550;
      return (
        <>
          <rect x={1170} y={140} width={650} height={800} fill={p.panel} />
          <g transform={`translate(1495 540) skewX(${turn})`}>
            <rect
              x={-flipWidth / 2}
              y={-250}
              width={flipWidth}
              height={500}
              fill={p.secondary}
            />
            <rect
              x={-flipWidth / 2}
              y={-250}
              width={flipWidth}
              height={500}
              fill={p.accent}
              opacity={flip}
            />
            <circle cx={240} cy={0} r={26} fill={p.background} />
          </g>
          <path
            d="M1090 950 H1900"
            stroke={p.foreground}
            strokeWidth={16}
            strokeDasharray="32 22"
          />
        </>
      );
    }
    case "echo-tag-c": {
      const orbit = t * 0.55;
      return (
        <>
          <circle
            cx={1510}
            cy={540}
            r={330}
            fill="none"
            stroke={p.panel}
            strokeWidth={110}
          />
          <circle cx={1510} cy={540} r={190} fill={p.accent} />
          {Array.from({ length: 5 }, (_, i) => {
            const a = orbit + (i / 5) * TAU;
            return (
              <circle
                key={i}
                cx={1510 + Math.cos(a) * 330}
                cy={540 + Math.sin(a) * 330}
                r={42 + i * 5}
                fill={i % 2 ? p.secondary : p.foreground}
              />
            );
          })}
          <path
            d="M980 120 L1900 960"
            stroke={p.secondary}
            strokeWidth={18}
            opacity={0.65}
          />
        </>
      );
    }
    case "echo-tag-d": {
      const reveal = interpolate(progress, [0.05, 0.9], [0, 1], clamp);
      return (
        <>
          {Array.from({ length: 6 }, (_, i) => (
            <rect
              key={i}
              x={1080 + i * 135}
              y={210 + (i % 2) * 360}
              width={110}
              height={510 - (i % 2) * 120}
              fill={i < reveal * 6 ? p.secondary : p.panel}
            />
          ))}
          <path
            d={`M1040 ${900 - reveal * 580} H1900`}
            stroke={p.accent}
            strokeWidth={32}
          />
          <Barcode
            x={1120}
            y={890}
            height={100}
            color={p.foreground}
            phase={4}
          />
        </>
      );
    }
    case "outro-perforation": {
      const peel = interpolate(progress, [0, 0.75], [0, 1], {
        ...clamp,
        easing: Easing.bezier(0.45, 0, 0.55, 1),
      });
      return (
        <>
          <rect x={1060} y={120} width={800} height={840} fill={p.panel} />
          <path
            d="M1060 360 H1860 M1060 620 H1860"
            stroke={p.foreground}
            strokeWidth={10}
            strokeDasharray="28 24"
          />
          {Array.from({ length: 10 }, (_, i) => (
            <circle
              key={i}
              cx={1110 + i * 78}
              cy={620}
              r={18 + peel * 16}
              fill={i < peel * 10 ? p.secondary : p.background}
            />
          ))}
          <g
            transform={`translate(${peel * 280} ${-peel * 190}) rotate(${peel * 16} 1460 490)`}
          >
            <Tag
              x={1210}
              y={370}
              width={520}
              height={250}
              color={p.accent}
              hole={p.panel}
            />
          </g>
          <Barcode
            x={1180}
            y={760}
            height={130}
            color={p.foreground}
            phase={2}
          />
        </>
      );
    }
    default:
      return null;
  }
};

export const SceneBackground: React.FC<{
  page: LyricPage;
  globalMs: number;
  opacity?: number;
}> = ({ page, globalMs, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localSeconds = Math.max(0, (globalMs - page.startMs) / 1000);
  const duration = Math.max(1, page.endMs - page.startMs);
  const progress = Math.min(
    1,
    Math.max(0, (globalMs - page.startMs) / duration),
  );
  const palette = PALETTES[page.theme % PALETTES.length];
  const grainShift = (frame / fps) * 16;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        background: palette.background,
      }}
    >
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ display: "block" }}
      >
        <defs>
          <pattern
            id={`${page.id}-grid`}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${grainShift} 0)`}
          >
            <circle
              cx="2"
              cy="2"
              r="1.8"
              fill={palette.foreground}
              opacity="0.11"
            />
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill={palette.background} />
        <rect width="1920" height="1080" fill={`url(#${page.id}-grid)`} />
        {art(page.scene, {
          palette,
          t: localSeconds,
          progress,
          scope: page.id,
        })}
        <rect
          x="52"
          y="52"
          width="1816"
          height="976"
          rx="30"
          fill="none"
          stroke={palette.foreground}
          strokeWidth="4"
          opacity="0.24"
        />
      </svg>
    </div>
  );
};
