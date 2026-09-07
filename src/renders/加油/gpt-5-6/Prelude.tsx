import React from "react";
import { Easing, interpolate } from "remotion";
import { BODY_FONT, DISPLAY_FONT } from "./typography";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const Prelude: React.FC<{ globalMs: number; opacity?: number }> = ({
  globalMs,
  opacity = 1,
}) => {
  const sun = interpolate(globalMs, [0, 15000], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.sin),
  });
  const title = interpolate(globalMs, [100, 1200], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const credits = interpolate(globalMs, [3300, 4700], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        background: "#17304B",
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
        <circle
          cx={220 + sun * 1050}
          cy={880 - sun * 570}
          r="205"
          fill="#F2BC43"
        />
        <path
          d="M0 865 C320 760 520 930 830 815 C1120 705 1370 850 1920 690 L1920 1080 L0 1080Z"
          fill="#287A75"
        />
        <path
          d="M0 930 C390 825 650 1020 1010 865 C1350 720 1550 895 1920 790"
          fill="none"
          stroke="#FFF0D2"
          strokeWidth="16"
          opacity=".7"
        />
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M${1180 + i * 74} 170 L${1310 + i * 74} 310`}
            stroke="#EF6A45"
            strokeWidth="14"
            opacity={0.35 + i * 0.04}
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 126,
          top: 110,
          width: 1020,
          opacity: title,
          transform: `translateY(${(1 - title) * 30}px)`,
        }}
      >
        <div
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: 210,
            fontWeight: 700,
            lineHeight: 0.92,
            color: "#FFF4D8",
            letterSpacing: 10,
          }}
        >
          加油
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 27,
            fontWeight: 500,
            letterSpacing: 11,
            color: "#78D3C4",
          }}
        >
          GO! · KEEP MOVING
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 120,
          bottom: 104,
          width: 760,
          padding: "42px 52px",
          background: "#FFF4D8",
          color: "#172840",
          outline: "8px solid #EF6A45",
          opacity: credits,
          transform: `translateX(${(1 - credits) * 40}px)`,
        }}
      >
        <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: 4 }}>
          林俊杰 × MC HotDog 热狗
        </div>
        <div
          style={{ height: 3, background: "#287A75", margin: "25px 0 20px" }}
        />
        <div
          style={{ display: "flex", gap: 54, fontSize: 25, letterSpacing: 3 }}
        >
          <span>词 / 林俊杰 · 姚中仁</span>
          <span>曲 / 林俊杰</span>
        </div>
      </div>
    </div>
  );
};
