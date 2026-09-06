import { measureText } from "@remotion/layout-utils";
import React from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "./design";
import { FONT_BODY, FONT_IMPACT, FONT_LATIN, FONT_MONO } from "./fonts";
import { lyricLines } from "./lyrics";
import type {
  FontRole,
  HighlightRule,
  LayoutKind,
  LyricPage,
  TextMotion,
  TimedLine,
  TimedUnit,
} from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type LineBox = { x: number; y: number; width: number; maxSize: number };

const layoutFor = (
  layout: LayoutKind,
  lineIndex: number,
  count: number,
): LineBox => {
  if (count === 1) return { x: 200, y: 480, width: 1520, maxSize: 140 };
  const layouts: Record<LayoutKind, LineBox[]> = {
    sticky: [
      { x: 200, y: 400, width: 1520, maxSize: 120 },
      { x: 200, y: 600, width: 1520, maxSize: 120 },
    ],
    stack: [
      { x: 200, y: 340, width: 1520, maxSize: 110 },
      { x: 200, y: 580, width: 1520, maxSize: 110 },
    ],
    scatter: [
      { x: 180, y: 280, width: 1400, maxSize: 100 },
      { x: 320, y: 620, width: 1300, maxSize: 100 },
    ],
    receipt: [
      { x: 250, y: 320, width: 1420, maxSize: 105 },
      { x: 250, y: 560, width: 1420, maxSize: 105 },
    ],
    list: [
      { x: 280, y: 350, width: 1360, maxSize: 100 },
      { x: 280, y: 580, width: 1360, maxSize: 100 },
    ],
  };
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
  const unitStart = prefix.length;
  const unitEnd = unitStart + unit.text.length;
  return rules.find((rule) => {
    let position = line.text.indexOf(rule.term);
    while (position !== -1) {
      if (unitStart < position + rule.term.length && unitEnd > position) {
        return true;
      }
      position = line.text.indexOf(rule.term, position + 1);
    }
    return false;
  });
};

const fontFor = (unit: TimedUnit, role: FontRole) => {
  if (role === "impact") return FONT_IMPACT;
  if (role === "latin" || /[A-Za-z]/u.test(unit.text)) return FONT_LATIN;
  if (role === "mono") return FONT_MONO;
  return FONT_BODY;
};

const weightFor = (role: FontRole) => {
  if (role === "body") return 500;
  if (role === "impact") return 400;
  if (role === "latin") return 400;
  return 400;
};

const colorFor = (
  color: HighlightRule["color"],
  palette: LyricPage["palette"],
): string => {
  switch (color) {
    case "marker":
      return palette.marker;
    case "ballpoint":
      return palette.ballpoint;
    case "highlighter":
      return palette.ink;
    case "ink":
    default:
      return palette.ink;
  }
};

const highlightBgFor = (
  color: HighlightRule["color"],
  palette: LyricPage["palette"],
): string | null => {
  if (color === "highlighter") return palette.highlighter;
  return null;
};

const transformFor = (motion: TextMotion, enter: number) => {
  switch (motion) {
    case "write":
      return `translateX(${(1 - enter) * -20}px) translateY(${(1 - enter) * 8}px)`;
    case "stamp":
      return `translateY(${(1 - enter) * -30}px) scale(${0.85 + enter * 0.15})`;
    case "type":
      return `translateX(${(1 - enter) * 15}px)`;
    case "underline":
      return `translateY(${(1 - enter) * 12}px)`;
    default:
      return `translateX(${(1 - enter) * -15}px)`;
  }
};

const framesFor = (line: TimedLine, fps: number) => {
  let previous = -1;
  return line.characters.map((unit) => {
    const sourceFrame = Math.round((unit.startMs / 1000) * fps);
    const frame = Math.max(sourceFrame, previous + 1);
    previous = frame;
    return frame;
  });
};

const roleFor = (
  rule: HighlightRule | undefined,
  unit: TimedUnit,
): FontRole => {
  if (rule) return rule.font;
  return /[A-Za-z]/u.test(unit.text) ? "latin" : "body";
};

const fitLine = (line: TimedLine, page: LyricPage, box: LineBox) => {
  const ratios = line.characters.map((unit) => {
    const rule = ruleForUnit(line, unit, page.highlights);
    const role = roleFor(rule, unit);
    const family = fontFor(unit, role);
    const weight = weightFor(role);
    const scale = rule?.scale ?? 1;
    const measured = measureText({
      text: unit.text || " ",
      fontFamily: family,
      fontSize: 100,
      fontWeight: weight,
    }).width;
    const spacing = /[A-Za-z]/u.test(unit.text)
      ? 0.02
      : role === "impact"
        ? 0.025
        : 0.015;
    return (measured / 100) * scale + spacing;
  });
  const totalRatio = ratios.reduce((sum, ratio) => sum + ratio, 0);
  const fontSize = Math.min(box.maxSize, box.width / Math.max(totalRatio, 0.01));
  return { ratios, fontSize, totalWidth: totalRatio * fontSize };
};

const StickyBackground: React.FC<{
  page: LyricPage;
  box: LineBox;
  fontSize: number;
  finalWidth: number;
  globalFrame: number;
  startFrame: number;
}> = ({ page, box, fontSize, finalWidth, globalFrame, startFrame }) => {
  const { fps } = useVideoConfig();
  const enter = interpolate(
    globalFrame,
    [startFrame, startFrame + Math.round(0.22 * fps)],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );
  const paddingX = Math.max(40, fontSize * 0.3);
  const paddingY = Math.max(25, fontSize * 0.2);
  const width = Math.min(1700, finalWidth + paddingX * 2);
  const height = fontSize * 1.5 + paddingY * 1.2;

  const bgColor =
    page.surface === "receipt"
      ? "#FEFEFE"
      : page.surface === "torn"
        ? COLORS.stickyYellow
        : page.palette.stickyBg;

  const borderColor =
    page.surface === "receipt" ? page.palette.pencil : page.palette.stickyBorder;

  if (page.surface === "plain") return null;

  const tornEdge =
    page.surface === "torn"
      ? `M0 ${height - 15} ${Array.from(
          { length: Math.floor(width / 20) },
          (_, i) => `L${i * 20 + 10} ${height - 15 + (i % 2 === 0 ? 10 : 0)} L${(i + 1) * 20} ${height - 15}`,
        ).join(" ")} V0 H0 Z`
      : null;

  return (
    <div
      style={{
        position: "absolute",
        left: box.x - paddingX,
        top: box.y - paddingY,
        width,
        height,
        opacity: enter,
        transform: `translateY(${(1 - enter) * -15}px)`,
        transformOrigin: "left top",
      }}
    >
      {page.surface === "torn" ? (
        <svg width={width} height={height} style={{ display: "block" }}>
          <path d={tornEdge!} fill={bgColor} />
        </svg>
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              left: 6,
              top: 6,
              width,
              height,
              background: "#00000015",
              borderRadius: page.surface === "receipt" ? 0 : 4,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: bgColor,
              borderRadius: page.surface === "receipt" ? 0 : 4,
            }}
          />
          {page.surface === "sticky" && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: 6,
                background: borderColor,
                borderRadius: "4px 4px 0 0",
              }}
            />
          )}
          {page.surface === "receipt" && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 15,
                  top: height - 30,
                  width: width - 30,
                  height: 1,
                  background: page.palette.pencil,
                  opacity: 0.3,
                }}
              />
              <svg
                style={{ position: "absolute", left: 20, bottom: 8 }}
                width={width - 40}
                height={18}
              >
                {Array.from({ length: Math.floor((width - 40) / 8) }, (_, i) => (
                  <rect
                    key={i}
                    x={i * 8}
                    y={0}
                    width={i % 3 === 0 ? 2 : 4}
                    height={18}
                    fill={page.palette.ink}
                  />
                ))}
              </svg>
            </>
          )}
        </>
      )}
    </div>
  );
};

const TimedLineView: React.FC<{
  line: TimedLine;
  page: LyricPage;
  globalFrame: number;
  lineIndex: number;
  lineCount: number;
}> = ({ line, page, globalFrame, lineIndex, lineCount }) => {
  const { fps } = useVideoConfig();
  const box = layoutFor(page.layout, lineIndex, lineCount);
  const { fontSize, ratios, totalWidth } = fitLine(line, page, box);
  const unitFrames = framesFor(line, fps);
  const horizontalSafety = fontSize * 0.3;
  const verticalSafety = fontSize * 0.35;

  return (
    <>
      <StickyBackground
        page={page}
        box={box}
        fontSize={fontSize}
        finalWidth={totalWidth}
        globalFrame={globalFrame}
        startFrame={unitFrames[0]}
      />
      <div
        style={{
          position: "absolute",
          left: box.x,
          top: box.y,
          width: box.width,
          height: fontSize * 1.7,
          display: "flex",
          alignItems: "flex-start",
          overflow: "visible",
          whiteSpace: "pre",
        }}
      >
        {line.characters.map((unit, unitIndex) => {
          const rule = ruleForUnit(line, unit, page.highlights);
          const role = roleFor(rule, unit);
          const family = fontFor(unit, role);
          const weight = weightFor(role);
          const scale = rule?.scale ?? 1;
          const color = rule
            ? colorFor(rule.color, page.palette)
            : page.palette.ink;
          const highlightBg = rule ? highlightBgFor(rule.color, page.palette) : null;
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
          if (globalFrame < unitFrames[unitIndex]) {
            return (
              <span
                key={`${line.id}-${unit.index}`}
                style={{
                  display: "inline-block",
                  flex: `0 0 ${slotWidth}px`,
                  width: slotWidth,
                }}
              />
            );
          }
          const durationFrames = Math.max(
            5,
            Math.min(12, Math.round(((unit.endMs - unit.startMs) / 1000) * fps * 0.5)),
          );
          const enter = interpolate(
            globalFrame,
            [unitFrames[unitIndex], unitFrames[unitIndex] + durationFrames],
            [0, 1],
            { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
          );
          return (
            <span
              key={`${line.id}-${unit.index}`}
              style={{
                position: "relative",
                display: "inline-block",
                flex: `0 0 ${slotWidth}px`,
                width: slotWidth,
                height: fontSize * 1.7,
                overflow: "visible",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: -horizontalSafety,
                  top: -verticalSafety,
                  width: naturalWidth * scale + horizontalSafety * 2,
                  height: fontSize * 1.4 + verticalSafety * 2,
                  clipPath: `inset(0 ${(1 - enter) * 100}% 0 0)`,
                  overflow: "visible",
                }}
              >
                {highlightBg && (
                  <span
                    style={{
                      position: "absolute",
                      left: horizontalSafety - 4,
                      top: verticalSafety,
                      width: naturalWidth * scale + 8,
                      height: fontSize * 1.15,
                      background: highlightBg,
                      opacity: 0.6,
                    }}
                  />
                )}
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: horizontalSafety,
                    marginTop: verticalSafety,
                    fontFamily: family,
                    fontWeight: weight,
                    fontSize,
                    lineHeight: 1.2,
                    color,
                    transform: `${transformFor(page.motion, enter)} scale(${scale})`,
                    transformOrigin: "left center",
                    whiteSpace: "pre",
                    fontSynthesis: "none",
                  }}
                >
                  {unit.text}
                </span>
              </span>
              {page.motion === "underline" && enter > 0.8 && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: fontSize * 0.15,
                    width: slotWidth * 0.9,
                    height: 3,
                    background: page.palette.marker,
                    opacity: enter,
                  }}
                />
              )}
            </span>
          );
        })}
      </div>
    </>
  );
};

export const LyricPageView: React.FC<{
  page: LyricPage;
  globalFrame: number;
}> = ({ page, globalFrame }) => {
  const lines = page.lineIndexes.map((index) => lyricLines[index]).filter(Boolean);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      {lines.map((line, index) => (
        <TimedLineView
          key={line.id}
          line={line}
          page={page}
          globalFrame={globalFrame}
          lineIndex={index}
          lineCount={lines.length}
        />
      ))}
    </div>
  );
};
