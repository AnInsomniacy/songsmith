import { measureText } from "@remotion/layout-utils";
import React from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "./design";
import { FONT_IMPACT, FONT_MEMORY, FONT_UTILITY } from "./fonts";
import { creditLines } from "./lyrics";
import type { TimedLine } from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const wave = (t: number, period: number, phase = 0) =>
  Math.sin(((t + phase) / period) * Math.PI * 2);
const pingPong = (t: number, period: number, phase = 0) =>
  (1 - Math.cos(((t + phase) / period) * Math.PI * 2)) / 2;

const CreditLine: React.FC<{
  line: TimedLine;
  globalFrame: number;
  x: number;
  y: number;
  size: number;
  width: number;
  role: "title" | "writer" | "composer";
}> = ({ line, globalFrame, x, y, size, width, role }) => {
  const { fps } = useVideoConfig();
  const startFrame = Math.round((line.startMs / 1000) * fps);
  const surfaceIn = interpolate(
    globalFrame,
    [startFrame, startFrame + Math.round(0.26 * fps)],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );
  const family = role === "title" ? FONT_MEMORY : FONT_IMPACT;
  const weight = role === "title" ? 500 : 400;
  const measured = line.characters.map(
    (unit) =>
      measureText({
        text: unit.text || " ",
        fontFamily: family,
        fontSize: size,
        fontWeight: weight,
        validateFontIsLoaded: true,
      }).width,
  );
  const total = measured.reduce((sum, value) => sum + value, 0);
  const scale = Math.min(1, width / Math.max(total, 1));
  let previousFrame = -1;
  const unitFrames = line.characters.map((unit) => {
    const sourceFrame = Math.round((unit.startMs / 1000) * fps);
    const frame = Math.max(sourceFrame, previousFrame + 1);
    previousFrame = frame;
    return frame;
  });
  const unitStarts = line.characters.map(
    (_, index) =>
      line.characters
        .slice(0, index)
        .map((unit) => unit.text)
        .join("").length,
  );
  const inTerm = (index: number, term: string) => {
    const start = line.text.indexOf(term);
    if (start === -1) return false;
    const unitStart = unitStarts[index];
    const unitEnd = unitStart + line.characters[index].text.length;
    return unitStart < start + term.length && unitEnd > start;
  };
  const colorFor = (index: number) => {
    if (role === "title" && inTerm(index, "回忆")) return COLORS.darkroomRed;
    if (role === "title" && inTerm(index, "海鸣威")) return COLORS.oxidizedCyan;
    if (role === "writer" && inTerm(index, "周耀辉")) return COLORS.darkroomRed;
    if (role === "composer" && inTerm(index, "朱其民"))
      return COLORS.oxidizedCyan;
    return COLORS.deepInk;
  };
  const transformFor = (enter: number, index: number) => {
    if (role === "title") {
      return `translateX(${(1 - enter) * -18}px) scaleX(${0.72 + enter * 0.28})`;
    }
    if (role === "writer") {
      const direction = index % 2 === 0 ? -1 : 1;
      return `translateY(${(1 - enter) * -15}px) rotate(${(1 - enter) * direction * 1.8}deg)`;
    }
    return `translate(${(1 - enter) * -12}px, ${(1 - enter) * 14}px) skewX(${(1 - enter) * -5}deg)`;
  };
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height: size * 1.7,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -34,
          top: -24,
          width: Math.min(width + 68, total * scale + 68),
          height: size * 1.42,
          background: COLORS.silver,
          opacity: surfaceIn,
          transform: `translateX(${(1 - surfaceIn) * -16}px)`,
          boxShadow: `10px 12px 0 ${COLORS.darkroomRed}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          transform: `scale(${scale})`,
          transformOrigin: "left top",
          overflow: "visible",
        }}
      >
        {line.characters.map((unit, index) => {
          const frame = unitFrames[index];
          const visible = globalFrame >= frame;
          const durationFrames = Math.max(
            8,
            Math.min(
              14,
              Math.round(((unit.endMs - unit.startMs) / 1000) * fps * 0.46),
            ),
          );
          const enter = interpolate(
            globalFrame,
            [frame, frame + durationFrames],
            [0, 1],
            {
              ...clamp,
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          );
          const safetyX = size * 0.28;
          const safetyY = size * 0.34;
          return (
            <span
              key={`${line.id}-${unit.index}`}
              style={{
                position: "relative",
                display: "inline-block",
                flex: `0 0 ${measured[index]}px`,
                width: measured[index],
                height: size * 1.5,
              }}
            >
              {visible ? (
                <span
                  style={{
                    position: "absolute",
                    left: -safetyX,
                    top: -safetyY,
                    width: measured[index] + safetyX * 2,
                    height: size * 1.42 + safetyY * 2,
                    clipPath: `inset(0 ${(1 - enter) * 100}% 0 0)`,
                    overflow: "visible",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      marginLeft: safetyX,
                      marginTop: safetyY,
                      fontFamily: family,
                      fontSize: size,
                      fontWeight: weight,
                      lineHeight: 1.2,
                      color: colorFor(index),
                      transform: transformFor(enter, index),
                      transformOrigin: "left center",
                      whiteSpace: "pre",
                      fontSynthesis: "none",
                    }}
                  >
                    {unit.text}
                  </span>
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const Prelude: React.FC<{
  globalFrame: number;
  globalMs: number;
  opacity?: number;
}> = ({ globalFrame, globalMs, opacity = 1 }) => {
  const t = globalMs / 1000;
  const sheet = pingPong(t, 12.4) * 310;
  const redGlow = 0.42 + wave(t, 7.8) * 0.08;
  const liquid = wave(t, 5.6) * 11;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        overflow: "hidden",
        background: COLORS.midnight,
      }}
    >
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="prelude-safe-light" cx="50%" cy="50%" r="50%">
            <stop
              offset="0"
              stopColor={COLORS.darkroomRed}
              stopOpacity="0.88"
            />
            <stop offset="1" stopColor={COLORS.darkroomRed} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="prelude-sheet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={COLORS.oxidizedCyan} />
            <stop offset="1" stopColor={COLORS.darkroomRed} />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill={COLORS.midnight} />
        <circle
          cx="1660"
          cy="180"
          r="420"
          fill="url(#prelude-safe-light)"
          opacity={redGlow}
        />
        <g opacity="0.18">
          {Array.from({ length: 13 }, (_, index) => (
            <line
              key={index}
              x1={80 + index * 150}
              y1="0"
              x2={80 + index * 150}
              y2="1080"
              stroke={COLORS.silver}
              strokeWidth="2"
            />
          ))}
        </g>
        {[0, 1, 2].map((index) => (
          <g
            key={index}
            transform={`translate(${1020 + index * 280} ${520 + (index % 2) * 48})`}
          >
            <rect
              width="245"
              height="390"
              rx="22"
              fill="#0D1C2A"
              stroke={COLORS.silver}
              strokeWidth="10"
              opacity="0.84"
            />
            <path
              d={`M20 ${165 + liquid * (index + 1) * 0.3} Q122 ${145 - liquid} 225 ${165 + liquid * 0.6} V365 H20Z`}
              fill={index === 1 ? COLORS.darkroomRed : COLORS.oxidizedCyan}
              opacity="0.46"
            />
          </g>
        ))}
        <g
          transform={`translate(${1050 + sheet} 390) rotate(${wave(t, 9.2) * 2.2} 160 240)`}
        >
          <rect width="320" height="470" fill={COLORS.silver} opacity="0.84" />
          <rect
            x="34"
            y="38"
            width="252"
            height="334"
            fill="url(#prelude-sheet)"
            opacity="0.76"
          />
          <ellipse
            cx="160"
            cy="205"
            rx="90"
            ry="55"
            fill="none"
            stroke={COLORS.coldWhite}
            strokeWidth="14"
            opacity="0.6"
          />
          <circle
            cx="160"
            cy="205"
            r="34"
            fill={COLORS.sodiumGold}
            opacity="0.84"
          />
        </g>
      </svg>
      <CreditLine
        line={creditLines[0]}
        globalFrame={globalFrame}
        x={150}
        y={180}
        size={74}
        width={790}
        role="title"
      />
      <CreditLine
        line={creditLines[1]}
        globalFrame={globalFrame}
        x={170}
        y={570}
        size={66}
        width={480}
        role="writer"
      />
      <CreditLine
        line={creditLines[2]}
        globalFrame={globalFrame}
        x={540}
        y={765}
        size={66}
        width={480}
        role="composer"
      />
      <div
        style={{
          position: "absolute",
          left: 154,
          bottom: 78,
          fontFamily: FONT_UTILITY,
          fontSize: 25,
          fontWeight: 700,
          letterSpacing: 5,
          color: COLORS.silver,
          opacity: 0.72,
        }}
      >
        DARKROOM / 2007
      </div>
    </div>
  );
};
