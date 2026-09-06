import React from "react";
import { INK, MILK } from "./design";
import { FONT_BODY, FONT_IMPACT, FONT_NUM } from "./fonts";
import { SONG_ARTIST } from "./lyrics";
import { Awning, Coin } from "./Kit";

export const CoverFrame: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: MILK }}>
    <svg
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <rect width={1920} height={1080} fill={MILK} />
      <line x1={90} y1={92} x2={1830} y2={92} stroke={INK} strokeWidth={3} />
      <line x1={90} y1={104} x2={1830} y2={104} stroke={INK} strokeWidth={1.5} />
      <text
        x={960}
        y={72}
        textAnchor="middle"
        fontFamily={FONT_NUM}
        fontWeight={700}
        fontSize={30}
        letterSpacing={12}
        fill={INK}
      >
        BUCHAO DEPARTMENT STORE · EST. 2008
      </text>

      <g>
        <rect x={252} y={384} width={1440} height={396} fill="rgba(27,23,18,0.16)" />
        <rect
          x={240}
          y={368}
          width={1440}
          height={396}
          fill="#B3271E"
          stroke={INK}
          strokeWidth={5}
        />
        <text
          x={960}
          y={556}
          textAnchor="middle"
          fontFamily={FONT_IMPACT}
          fontSize={172}
          fill="#FFF6E8"
          letterSpacing={10}
        >
          不潮不用花钱
        </text>
        <text
          x={960}
          y={640}
          textAnchor="middle"
          fontFamily={FONT_NUM}
          fontWeight={700}
          fontSize={30}
          letterSpacing={9}
          fill="#FFE9C9"
        >
          WHAT YOU SEE IS WHAT YOU GET
        </text>
      </g>

      <text
        x={960}
        y={852}
        textAnchor="middle"
        fontFamily={FONT_BODY}
        fontSize={44}
        fill={INK}
        letterSpacing={6}
      >
        演 唱 · {SONG_ARTIST}
      </text>
      <circle cx={810} cy={838} r={5} fill="#E23A2E" />
      <circle cx={1112} cy={838} r={5} fill="#E23A2E" />

      <g transform="translate(0 940)">
        <Awning w={1920} h={72} c1="#E23A2E" c2="#F7F4EA" />
      </g>
      {[820, 900, 980, 1060].map((cx, i) => (
        <g key={cx} transform={`translate(${cx} ${905}) rotate(${i % 2 === 0 ? -12 : 10})`}>
          <Coin r={26} />
        </g>
      ))}

      <g transform="translate(1610 250) rotate(-7)">
        <rect width={220} height={92} fill="#F2B705" stroke={INK} strokeWidth={4} />
        <text
          x={110}
          y={58}
          textAnchor="middle"
          fontFamily={FONT_BODY}
          fontSize={38}
          fill={INK}
          letterSpacing={8}
        >
          今日营业
        </text>
      </g>
      <g transform="translate(150 820) rotate(6)">
        <rect width={190} height={70} fill={MILK} stroke={INK} strokeWidth={3} />
        <text
          x={95}
          y={47}
          textAnchor="middle"
          fontFamily={FONT_NUM}
          fontWeight={700}
          fontSize={30}
          fill={INK}
          letterSpacing={5}
        >
          OPEN 1F
        </text>
      </g>
    </svg>
  </div>
);
