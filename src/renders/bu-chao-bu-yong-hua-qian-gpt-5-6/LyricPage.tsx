import { measureText } from "@remotion/layout-utils";
import React from "react";
import { Easing, interpolate } from "remotion";
import { LYRIC_LINE_STYLES } from "./design";
import { FONT_BODY, FONT_DISPLAY, FONT_ENGLISH, FONT_SERIF } from "./fonts";
import { lyricLines } from "./lyrics";
import type {
  HighlightRule,
  LyricLineStyle,
  LyricPage,
  TimedLine,
  TimedUnit,
} from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type LineBox = { x: number; y: number; width: number; maxSize: number };

const layoutFor = (
  layout: LyricPage["layout"],
  lineIndex: number,
  count: number,
): LineBox => {
  if (count === 1) return { x: 150, y: 405, width: 1580, maxSize: 186 };
  const layouts = {
    stack: [
      { x: 150, y: 220, width: 1510, maxSize: 150 },
      { x: 150, y: 630, width: 1510, maxSize: 150 },
    ],
    split: [
      { x: 150, y: 220, width: 1110, maxSize: 146 },
      { x: 300, y: 635, width: 1400, maxSize: 146 },
    ],
    stair: [
      { x: 150, y: 205, width: 1460, maxSize: 148 },
      { x: 380, y: 640, width: 1340, maxSize: 148 },
    ],
    banner: [
      { x: 150, y: 255, width: 1600, maxSize: 140 },
      { x: 150, y: 650, width: 1600, maxSize: 140 },
    ],
    editorial: [
      { x: 150, y: 215, width: 1500, maxSize: 148 },
      { x: 240, y: 645, width: 1460, maxSize: 148 },
    ],
  } as const;
  return layouts[layout][lineIndex] ?? layouts[layout][0];
};

const ruleForUnit = (
  line: TimedLine,
  unit: TimedUnit,
  rules: HighlightRule[],
) => {
  const prefix = line.characters
    .slice(0, unit.index)
    .map((item) => item.text)
    .join("");
  const start = prefix.length;
  const end = start + unit.text.length;
  return rules.find((rule) => {
    let position = line.text.indexOf(rule.term);
    while (position !== -1) {
      const overlaps = start < position + rule.term.length && end > position;
      if (overlaps) return true;
      position = line.text.indexOf(rule.term, position + 1);
    }
    return false;
  });
};

const unitFont = (rule: HighlightRule | undefined, english: boolean) => {
  if (rule?.font === "serif") return FONT_SERIF;
  if (rule?.font === "display") return english ? FONT_ENGLISH : FONT_DISPLAY;
  return english ? FONT_ENGLISH : FONT_BODY;
};

const unitWeight = (rule: HighlightRule | undefined, english: boolean) =>
  rule?.font === "display" ? 900 : english ? 700 : 500;

const transformFor = (
  motion: LyricPage["motion"],
  enter: number,
  index: number,
) => {
  const alternating = index % 2 === 0 ? -1 : 1;
  switch (motion) {
    case "stamp":
      return `translateY(${(1 - enter) * 12}px) scaleY(${0.84 + enter * 0.16})`;
    case "shutter":
      return `translateX(${(1 - enter) * -16}px) skewX(${(1 - enter) * -4}deg)`;
    case "tilt":
      return `translateY(${(1 - enter) * 18}px) rotate(${(1 - enter) * alternating * 3}deg)`;
    case "stretch":
      return `translateX(${(1 - enter) * -12}px) scaleX(${0.86 + enter * 0.14})`;
    case "rise":
      return `translateY(${(1 - enter) * 22}px)`;
    case "slide":
    default:
      return `translateX(${(1 - enter) * -20}px)`;
  }
};

const fitStyledLine = (
  line: TimedLine,
  page: LyricPage,
  box: LineBox,
  english: boolean,
) => {
  const ratios = line.characters.map((unit) => {
    const rule = ruleForUnit(line, unit, page.highlights);
    const scale = rule?.scale ?? 1;
    const family = unitFont(rule, english);
    const weight = unitWeight(rule, english);
    const measured = measureText({
      text: unit.text || " ",
      fontFamily: family,
      fontSize: 100,
      fontWeight: weight,
    }).width;
    return measured / 100 * scale + (english ? 0.095 : 0.075);
  });
  const totalRatio = ratios.reduce((sum, ratio) => sum + ratio, 0);
  const fontSize = Math.min(
    box.maxSize,
    box.width / Math.max(0.01, totalRatio),
  );
  return {
    fontSize,
    ratios,
    totalWidth: totalRatio * fontSize,
  };
};

const LineSurface: React.FC<{
  box: LineBox;
  fontSize: number;
  finalWidth: number;
  style: LyricLineStyle;
  globalMs: number;
  startMs: number;
}> = ({ box, fontSize, finalWidth, style, globalMs, startMs }) => {
  const paddingX = Math.max(34, fontSize * 0.25);
  const paddingTop = fontSize * 0.16;
  const width = finalWidth + paddingX * 2;
  const height = fontSize * 1.48;
  const enter = interpolate(globalMs, [startMs, startMs + 260], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const radius = style.variant === "solid" ? 18 : 8;
  const outline =
    style.variant === "outline" || style.variant === "ticket"
      ? `6px ${style.variant === "ticket" ? "dashed" : "solid"} ${style.detail}`
      : undefined;

  return (
    <div
      style={{
        position: "absolute",
        left: box.x - paddingX,
        top: box.y - paddingTop,
        width,
        height,
        background: style.surface,
        borderRadius: radius,
        outline,
        outlineOffset: style.variant === "double" ? 12 : -6,
        opacity: enter,
        boxShadow:
          style.variant === "double"
            ? `12px 12px 0 ${style.detail}`
            : "0 8px 0 rgba(20, 21, 26, 0.12)",
      }}
    >
      {style.variant === "rail" ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 18,
            borderRadius: `${radius}px 0 0 ${radius}px`,
            background: style.detail,
          }}
        />
      ) : null}
      {style.variant === "underline" ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 16,
            background: style.detail,
          }}
        />
      ) : null}
      {style.variant === "double" ? (
        <div
          style={{
            position: "absolute",
            inset: 10,
            border: `3px solid ${style.detail}`,
            borderRadius: 4,
            opacity: 0.72,
          }}
        />
      ) : null}
      {style.variant === "ticket" ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 0,
              bottom: 0,
              borderLeft: `3px dotted ${style.detail}`,
              opacity: 0.72,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 24,
              top: 0,
              bottom: 0,
              borderLeft: `3px dotted ${style.detail}`,
              opacity: 0.72,
            }}
          />
        </>
      ) : null}
    </div>
  );
};

const TimedLineView: React.FC<{
  line: TimedLine;
  page: LyricPage;
  globalMs: number;
  lineIndex: number;
  lineCount: number;
}> = ({ line, page, globalMs, lineIndex, lineCount }) => {
  const box = layoutFor(page.layout, lineIndex, lineCount);
  const english = /[A-Za-z]/.test(line.text);
  const { fontSize, ratios, totalWidth } = fitStyledLine(
    line,
    page,
    box,
    english,
  );
  const colors = LYRIC_LINE_STYLES[page.id]?.[lineIndex];
  if (!colors) {
    throw new Error(`Missing fixed lyric style for ${page.id}:${lineIndex}`);
  }
  const horizontalSafety = fontSize * 0.28;
  const verticalSafety = fontSize * 0.34;

  return (
    <>
      <LineSurface
        box={box}
        fontSize={fontSize}
        finalWidth={totalWidth}
        style={colors}
        globalMs={globalMs}
        startMs={line.startMs}
      />
      <div
        style={{
          position: "absolute",
          left: box.x,
          top: box.y,
          width: box.width,
          height: 210,
          display: "flex",
          alignItems: "baseline",
          overflow: "visible",
          whiteSpace: "pre",
        }}
      >
        {line.characters.map((unit, unitIndex) => {
          const rule = ruleForUnit(line, unit, page.highlights);
          const family = unitFont(rule, english);
          const weight = unitWeight(rule, english);
          const scale = rule?.scale ?? 1;
          const color = rule ? colors[rule.color] : colors.foreground;
          const duration = Math.max(90, Math.min(210, unit.endMs - unit.startMs));
          const enter = interpolate(
            globalMs,
            [unit.startMs, unit.startMs + duration],
            [0, 1],
            {
              ...clamp,
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          );
          const slotWidth = ratios[unitIndex] * fontSize;
          const naturalWidth = Math.max(
            1,
            measureText({
              text: unit.text || " ",
              fontFamily: family,
              fontSize,
              fontWeight: weight,
            }).width,
          );
          return (
            <span
              key={`${line.id}-${unit.index}`}
              style={{
                position: "relative",
                display: "inline-block",
                flex: `0 0 ${slotWidth}px`,
                width: slotWidth,
                height: fontSize * 1.55,
                overflow: "visible",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: -horizontalSafety,
                  top: -verticalSafety,
                  width: naturalWidth * scale + horizontalSafety * 2,
                  height: fontSize * 1.3 + verticalSafety * 2,
                  overflow: "hidden",
                  clipPath: `inset(0 ${(1 - enter) * 100}% 0 0)`,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: horizontalSafety,
                    top: verticalSafety,
                    display: "inline-block",
                    fontFamily: family,
                    fontWeight: weight,
                    fontSize,
                    lineHeight: 1.22,
                    color,
                    transform: `${transformFor(page.motion, enter, unit.index)} scale(${scale})`,
                    transformOrigin: "left bottom",
                    whiteSpace: "pre",
                  }}
                >
                  {unit.text}
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </>
  );
};

export const LyricPageView: React.FC<{ page: LyricPage; globalMs: number }> = ({
  page,
  globalMs,
}) => {
  const lines = page.lineIndexes.map((index) => lyricLines[index]);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      {lines.map((line, index) => (
        <TimedLineView
          key={line.id}
          line={line}
          page={page}
          globalMs={globalMs}
          lineIndex={index}
          lineCount={lines.length}
        />
      ))}
    </div>
  );
};
