import React from "react";
import { BODY_FONT, DISPLAY_FONT } from "./typography";

export const CoverFrame: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "#17304B",
      color: "#FFF4D8",
      overflow: "hidden",
      fontFamily: BODY_FONT,
    }}
  >
    <svg
      viewBox="0 0 1920 1080"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0 }}
    >
      <rect width="1920" height="1080" fill="#17304B" />
      <circle cx="1480" cy="410" r="310" fill="#F2BC43" />
      <path
        d="M0 940 C480 730 770 1060 1160 810 C1450 625 1680 830 1920 700 L1920 1080 L0 1080Z"
        fill="#287A75"
      />
      <path
        d="M1100 270 L1680 850 M1160 220 L1740 800"
        stroke="#EF6A45"
        strokeWidth="18"
        opacity=".8"
      />
    </svg>
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 130,
        fontFamily: DISPLAY_FONT,
        fontSize: 250,
        fontWeight: 700,
        letterSpacing: 14,
      }}
    >
      加油
    </div>
    <div
      style={{
        position: "absolute",
        left: 140,
        top: 415,
        fontSize: 34,
        letterSpacing: 12,
        color: "#78D3C4",
      }}
    >
      GO! / 100天
    </div>
    <div
      style={{
        position: "absolute",
        left: 140,
        bottom: 150,
        fontSize: 45,
        letterSpacing: 4,
      }}
    >
      林俊杰 × MC HotDog 热狗
    </div>
    <div
      style={{
        position: "absolute",
        right: 110,
        bottom: 110,
        padding: "22px 30px",
        background: "#FFF4D8",
        color: "#17304B",
        fontSize: 24,
        letterSpacing: 5,
      }}
    >
      LYRIC MOTION FILM
    </div>
  </div>
);
