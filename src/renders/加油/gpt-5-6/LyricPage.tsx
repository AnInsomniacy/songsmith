import { fitText } from "@remotion/layout-utils";
import React from "react";
import { Easing, interpolate } from "remotion";
import { lyricLines } from "./lyrics";
import type { LyricPage, TimedLine, TimedUnit } from "./types";
import { BODY_FONT, DISPLAY_FONT } from "./typography";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const styleFor = (text: string, page: LyricPage) => {
  const hit = page.highlights.find(
    (rule) => text.includes(rule.term) || rule.term.includes(text),
  );
  return {
    color: hit ? page.palette[hit.color] : page.palette.foreground,
    fontFamily: hit?.font === "display" ? DISPLAY_FONT : BODY_FONT,
    fontWeight: hit ? 700 : 500,
    scale: hit?.scale ?? 1,
  };
};
const Char: React.FC<{
  unit: TimedUnit;
  globalMs: number;
  page: LyricPage;
  fontSize: number;
}> = ({ unit, globalMs, page, fontSize }) => {
  const style = styleFor(unit.text, page);
  const duration = Math.max(110, Math.min(260, unit.endMs - unit.startMs));
  const p = interpolate(
    globalMs,
    [unit.startMs, unit.startMs + duration],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );
  const variant = unit.index % 4;
  const x =
    (variant === 0 ? -18 : variant === 1 ? 0 : variant === 2 ? 14 : -8) *
    (1 - p);
  const y = (variant === 1 ? 20 : variant === 3 ? -14 : 8) * (1 - p);
  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        fontSize,
        fontFamily: style.fontFamily,
        fontWeight: style.fontWeight,
        color: style.color,
        opacity: globalMs < unit.startMs ? 0 : 0.7 + 0.3 * p,
        transform: `translate(${x}px,${y}px) scale(${0.92 + 0.08 * p})`,
        transformOrigin: "50% 70%",
        lineHeight: 1.28,
      }}
    >
      {unit.text}
    </span>
  );
};
const Line: React.FC<{
  line: TimedLine;
  page: LyricPage;
  globalMs: number;
  maxWidth: number;
}> = ({ line, page, globalMs, maxWidth }) => {
  const clean = line.units.map((c) => c.text).join("");
  const size = Math.min(
    138,
    fitText({
      text: clean,
      withinWidth: maxWidth,
      fontFamily: BODY_FONT,
      fontWeight: 500,
    }).fontSize,
  );
  return (
    <div
      style={{
        height: size * 1.48,
        display: "flex",
        alignItems: "center",
        whiteSpace: "pre",
        minWidth: 0,
      }}
    >
      {line.units.map((unit) => (
        <Char
          key={`${line.id}-${unit.index}`}
          unit={unit}
          globalMs={globalMs}
          page={page}
          fontSize={size}
        />
      ))}
    </div>
  );
};

export const LyricPageView: React.FC<{ page: LyricPage; globalMs: number }> = ({
  page,
  globalMs,
}) => {
  const lines = page.lineIndexes.map((i) => lyricLines[i]);
  const visible = lines.some((l) => globalMs >= l.startMs);
  if (!visible) return null;
  const surfaceEnter = interpolate(
    globalMs,
    [page.startMs, page.startMs + 260],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );
  const width =
    page.layout === "compact" ? 1540 : page.layout === "split" ? 1390 : 1480;
  const left =
    page.layout === "offset" ? 110 : page.layout === "split" ? 130 : 190;
  const top =
    page.layout === "stack"
      ? 185
      : page.layout === "compact"
        ? 150
        : page.layout === "split"
          ? 210
          : 170;
  const decoration =
    page.surface === "ticket"
      ? `6px dashed ${page.palette.accent}`
      : `5px solid ${page.palette.detail}`;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        padding: "54px 66px 62px",
        background: page.palette.surface,
        outline: decoration,
        boxShadow: `18px 20px 0 ${page.palette.foreground}33`,
        opacity: surfaceEnter,
        transform: `translateY(${(1 - surfaceEnter) * 24}px)`,
        fontFamily: BODY_FONT,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 18,
          background: page.palette.accent,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: lines.length >= 3 ? 8 : 22,
        }}
      >
        {lines.map((line) => (
          <Line
            key={line.id}
            line={line}
            page={page}
            globalMs={globalMs}
            maxWidth={width - 132}
          />
        ))}
      </div>
    </div>
  );
};
