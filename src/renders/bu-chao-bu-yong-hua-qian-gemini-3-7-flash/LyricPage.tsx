import { fitText } from "@remotion/layout-utils";
import React from "react";
import { Easing, interpolate } from "remotion";
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from "./fonts";
import { lyricLines } from "./lyrics";
import {
  BarcodeStripe,
  ColorCalibrationBar,
  RegistrationCross,
} from "./ScenePrimitives";
import type { LyricPage, TimedLine, TimedUnit } from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const getHighlightStyle = (text: string, page: LyricPage) => {
  const hit = page.highlights.find(
    (h) => text.includes(h.term) || h.term.includes(text),
  );

  let color = page.palette.text;
  if (hit) {
    if (hit.color === "voltage") color = page.palette.voltage;
    else if (hit.color === "crimson") color = page.palette.crimson;
    else if (hit.color === "ultramarine") color = page.palette.ultramarine;
    else if (hit.color === "white") color = "#FFFFFF";
    else if (hit.color === "dark") color = "#0B0C10";
  }

  let fontFamily = FONT_BODY;
  if (hit?.font === "display") fontFamily = FONT_DISPLAY;
  else if (hit?.font === "mono") fontFamily = FONT_MONO;

  return {
    color,
    fontFamily,
    scale: hit?.scale ?? 1,
    isHighlight: Boolean(hit),
  };
};

const CharUnit: React.FC<{
  unit: TimedUnit;
  globalMs: number;
  page: LyricPage;
  baseFontSize: number;
}> = ({ unit, globalMs, page, baseFontSize }) => {
  const style = getHighlightStyle(unit.text, page);
  const duration = Math.max(100, Math.min(220, unit.endMs - unit.startMs));
  const p = interpolate(
    globalMs,
    [unit.startMs, unit.startMs + duration],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );

  // Discrete micro-variant for organic entrance
  const mod = unit.index % 3;
  const offsetY = (mod === 0 ? 12 : mod === 1 ? -8 : 4) * (1 - p);
  const charFontSize = baseFontSize * (style.isHighlight ? (style.scale ?? 1.1) : 1);

  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        fontSize: charFontSize,
        fontFamily: style.fontFamily,
        fontWeight: style.isHighlight ? 900 : 700,
        color: style.color,
        opacity: p,
        transform: `translateY(${offsetY}px)`,
        transformOrigin: "center bottom",
        lineHeight: 1.25,
        margin: "0 1.5px",
      }}
    >
      {unit.text}
    </span>
  );
};

const PageLine: React.FC<{
  line: TimedLine;
  page: LyricPage;
  globalMs: number;
  maxWidth: number;
}> = ({ line, page, globalMs, maxWidth }) => {
  const fullText = line.characters.map((c) => c.text).join("");
  const measured = fitText({
    text: fullText,
    withinWidth: maxWidth * 0.9,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
  });

  const fontSize = Math.min(94, Math.max(44, measured.fontSize));

  return (
    <div
      style={{
        minHeight: fontSize * 1.42,
        display: "flex",
        alignItems: "baseline",
        flexWrap: "nowrap",
        whiteSpace: "pre",
        minWidth: 0,
      }}
    >
      {line.characters.map((unit) => (
        <CharUnit
          key={`${line.id}-${unit.index}`}
          unit={unit}
          globalMs={globalMs}
          page={page}
          baseFontSize={fontSize}
        />
      ))}
    </div>
  );
};

export const LyricPageView: React.FC<{
  page: LyricPage;
  globalMs: number;
}> = ({ page, globalMs }) => {
  const lines = page.lineIndexes.map((i) => lyricLines[i]);
  const isVisible = lines.some((l) => globalMs >= l.startMs);
  if (!isVisible) return null;

  // Surface entry animation
  const surfaceEnter = interpolate(
    globalMs,
    [page.startMs, page.startMs + 220],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );

  // Compute Layout Position & Size based on layoutMode
  let width = 1520;
  let left = 200;
  let top = 220;

  if (page.layout === "offset-left") {
    width = 1440;
    left = 130;
    top = 220;
  } else if (page.layout === "offset-right") {
    width = 1440;
    left = 350;
    top = 240;
  } else if (page.layout === "center-card") {
    width = 1560;
    left = 180;
    top = 200;
  } else if (page.layout === "split-horizontal") {
    width = 1600;
    left = 160;
    top = 180;
  } else if (page.layout === "magazine-spread") {
    width = 1640;
    left = 140;
    top = 160;
  } else if (page.layout === "street-banner") {
    width = 1620;
    left = 150;
    top = 190;
  } else if (page.layout === "compact-stack") {
    width = 1380;
    left = 270;
    top = 250;
  }

  const maxWidth = width - 180;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        background: page.palette.surface,
        outline: `5px solid ${page.palette.surfaceBorder}`,
        boxShadow: `18px 22px 0 ${page.palette.backgroundAlt}EE`,
        padding: "44px 64px 48px 68px",
        opacity: surfaceEnter,
        transform: `translateY(${(1 - surfaceEnter) * 24}px)`,
        fontFamily: FONT_BODY,
        overflow: "hidden",
      }}
    >
      {/* Left Woven Tag Edge Strip */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 16,
          background: page.palette.surfaceBorder,
        }}
      />

      {/* Top Meta Barcode & Registration Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `2px solid ${page.palette.surfaceBorder}44`,
          paddingBottom: 12,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              background: page.palette.surfaceBorder,
              color: page.palette.surface,
              fontFamily: FONT_MONO,
              fontWeight: 900,
              fontSize: 16,
              padding: "2px 10px",
              letterSpacing: "2px",
            }}
          >
            SCENE // {page.verb}
          </span>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 14,
              color: page.palette.slate,
              letterSpacing: "2px",
            }}
          >
            {page.id.toUpperCase()} • 2008 SIXOLOGY
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <ColorCalibrationBar orientation="horizontal" size={12} />
          <RegistrationCross size={22} color={page.palette.surfaceBorder} />
        </div>
      </div>

      {/* Main Lyric Lines */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: lines.length >= 3 ? 18 : 30,
        }}
      >
        {lines.map((line) => (
          <PageLine
            key={line.id}
            line={line}
            page={page}
            globalMs={globalMs}
            maxWidth={maxWidth}
          />
        ))}
      </div>

      {/* Bottom Barcode Strip in Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 18,
          opacity: 0.85,
        }}
      >
        <BarcodeStripe
          width={220}
          height={32}
          color={page.palette.text}
          codeText={`LBL-${page.paletteIndex}-${page.verb}`}
        />
      </div>
    </div>
  );
};
