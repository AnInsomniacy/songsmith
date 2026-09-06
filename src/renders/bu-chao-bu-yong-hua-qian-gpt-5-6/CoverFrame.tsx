import React from "react";
import { COLORS } from "./design";
import { FONT_DISPLAY, FONT_ENGLISH, FONT_UTILITY } from "./fonts";

export const CoverFrame: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: COLORS.paper }}>
    <svg viewBox="0 0 1920 1080" width="100%" height="100%">
      <rect width="1920" height="1080" fill={COLORS.paper} />
      <rect
        x={54}
        y={54}
        width={1812}
        height={972}
        rx={34}
        fill="none"
        stroke={COLORS.ink}
        strokeWidth={5}
      />
      <path d="M0 0 H730 L1040 1080 H0 Z" fill={COLORS.cyan} />
      <path d="M1430 0 H1920 V1080 H1690 L1380 0 Z" fill={COLORS.orange} />
      <path
        d="M1290 0 H1510 L1820 1080 H1600 Z"
        fill={COLORS.pink}
        opacity={0.88}
      />
      <g transform="translate(176 184)">
        <text
          x={0}
          y={0}
          fontFamily={FONT_UTILITY}
          fontSize={42}
          letterSpacing={7}
          fill={COLORS.ink}
        >
          JJ LIN · 2008
        </text>
        <text
          x={0}
          y={250}
          fontFamily={FONT_DISPLAY}
          fontWeight={900}
          fontSize={270}
          fill={COLORS.ink}
        >
          不潮
        </text>
        <text
          x={0}
          y={520}
          fontFamily={FONT_DISPLAY}
          fontWeight={900}
          fontSize={210}
          fill={COLORS.ink}
        >
          不用花钱
        </text>
        <text
          x={10}
          y={690}
          fontFamily={FONT_ENGLISH}
          fontSize={58}
          letterSpacing={12}
          fill={COLORS.ink}
        >
          STYLE WITHOUT A PRICE
        </text>
      </g>
      <g transform="translate(1180 270) rotate(-8 300 220)">
        <path d="M0 0 H500 L650 220 L500 440 H0 Z" fill={COLORS.lime} />
        <circle cx={520} cy={220} r={38} fill={COLORS.pink} />
        <text
          x={90}
          y={286}
          fontFamily={FONT_UTILITY}
          fontWeight={700}
          fontSize={260}
          fill={COLORS.ink}
        >
          ¥0
        </text>
      </g>
      <text
        x={1760}
        y={955}
        textAnchor="end"
        fontFamily={FONT_DISPLAY}
        fontWeight={900}
        fontSize={52}
        fill={COLORS.ink}
      >
        林俊杰
      </text>
    </svg>
  </div>
);
