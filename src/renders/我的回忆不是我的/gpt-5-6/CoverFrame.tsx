import React from "react";
import { COLORS } from "./design";
import { FONT_BODY, FONT_MEMORY, FONT_UTILITY } from "./typography";

export const CoverFrame: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      background: COLORS.midnight,
      color: COLORS.coldWhite,
    }}
  >
    <svg
      viewBox="0 0 1920 1080"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <linearGradient id="cover-emulsion" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.oxidizedCyan} />
          <stop offset="0.52" stopColor="#355D6C" />
          <stop offset="1" stopColor={COLORS.darkroomRed} />
        </linearGradient>
        <radialGradient id="cover-light" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={COLORS.sodiumGold} stopOpacity="0.9" />
          <stop offset="1" stopColor={COLORS.sodiumGold} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill={COLORS.midnight} />
      <circle
        cx="1640"
        cy="172"
        r="310"
        fill="url(#cover-light)"
        opacity="0.42"
      />
      <rect x="86" y="74" width="1270" height="930" fill={COLORS.silver} />
      <rect x="126" y="114" width="1190" height="850" fill="#1E3449" />
      <rect
        x="1110"
        y="180"
        width="630"
        height="720"
        fill={COLORS.silver}
        opacity="0.22"
      />
      <rect
        x="1168"
        y="232"
        width="630"
        height="720"
        fill="url(#cover-emulsion)"
        opacity="0.86"
      />
      <path
        d="M1198 672 C1360 490 1530 510 1768 310 V922 H1198Z"
        fill="#143345"
        opacity="0.62"
      />
      <ellipse
        cx="1475"
        cy="520"
        rx="208"
        ry="126"
        fill="none"
        stroke={COLORS.coldWhite}
        strokeWidth="28"
        opacity="0.72"
      />
      <circle cx="1475" cy="520" r="74" fill={COLORS.darkroomRed} />
      <circle cx="1501" cy="494" r="21" fill={COLORS.sodiumGold} />
      <path
        d="M1110 180 H1740 V900 H1110"
        fill="none"
        stroke={COLORS.coldWhite}
        strokeWidth="6"
        opacity="0.3"
      />
      <path d="M1356 74 V1004" stroke={COLORS.darkroomRed} strokeWidth="12" />
    </svg>
    <div style={{ position: "absolute", left: 174, top: 190, width: 900 }}>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 500,
          fontSize: 178,
          lineHeight: 0.95,
          letterSpacing: -8,
        }}
      >
        我的
      </div>
      <div
        style={{
          fontFamily: FONT_MEMORY,
          fontWeight: 500,
          fontSize: 218,
          lineHeight: 1.04,
          color: COLORS.sodiumGold,
          letterSpacing: -8,
        }}
      >
        回忆
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 500,
          fontSize: 164,
          lineHeight: 1.02,
          letterSpacing: -8,
        }}
      >
        不是我的
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 184,
        bottom: 138,
        fontFamily: FONT_UTILITY,
        fontWeight: 700,
        fontSize: 40,
        letterSpacing: 8,
      }}
    >
      海鸣威
    </div>
    <div
      style={{
        position: "absolute",
        right: 130,
        bottom: 82,
        fontFamily: FONT_UTILITY,
        fontWeight: 700,
        fontSize: 25,
        letterSpacing: 5,
        color: COLORS.silver,
      }}
    >
      失去所有权的底片
    </div>
  </div>
);
