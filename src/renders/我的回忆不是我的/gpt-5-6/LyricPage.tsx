import { measureText } from "@remotion/layout-utils";
import React from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";
import { lyricLines } from "./lyrics";
import type {
  FontRole,
  HighlightRule,
  LyricPage,
  TextMotion,
  TimedLine,
  TimedUnit,
} from "./types";
import { FONT_BODY, FONT_IMPACT, FONT_LATIN, FONT_MEMORY } from "./typography";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type LineBox = { x: number; y: number; width: number; maxSize: number };

const layoutFor = (
  layout: LyricPage["layout"],
  lineIndex: number,
  count: number,
): LineBox => {
  if (count === 1) return { x: 155, y: 422, width: 1560, maxSize: 190 };
  const layouts = {
    stack: [
      { x: 150, y: 190, width: 1510, maxSize: 160 },
      { x: 150, y: 620, width: 1510, maxSize: 160 },
    ],
    offset: [
      { x: 145, y: 185, width: 1460, maxSize: 158 },
      { x: 390, y: 620, width: 1335, maxSize: 158 },
    ],
    split: [
      { x: 145, y: 205, width: 1260, maxSize: 158 },
      { x: 585, y: 640, width: 1135, maxSize: 158 },
    ],
    cinema: [
      { x: 150, y: 185, width: 1510, maxSize: 160 },
      { x: 1050, y: 700, width: 660, maxSize: 142 },
    ],
    wide: [
      { x: 155, y: 422, width: 1560, maxSize: 190 },
      { x: 155, y: 650, width: 1560, maxSize: 160 },
    ],
  } as const;
  return layouts[layout][lineIndex] ?? layouts[layout][0];
};

const ruleForUnit = (
  line: TimedLine,
  unit: TimedUnit,
  rules: HighlightRule[],
) => {
  const prefix = line.units
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
  if (role === "memory") return FONT_MEMORY;
  if (role === "impact") return FONT_IMPACT;
  if (role === "latin" || /[A-Za-z]/u.test(unit.text)) return FONT_LATIN;
  return FONT_BODY;
};

const weightFor = (role: FontRole) => {
  if (role === "body") return 500;
  if (role === "memory") return 500;
  if (role === "impact") return 400;
  return 700;
};

const transformFor = (motion: TextMotion, enter: number) => {
  switch (motion) {
    case "expose":
      return `translateX(${(1 - enter) * -18}px)`;
    case "settle":
      return `translateY(${(1 - enter) * -17}px)`;
    case "unlock":
      return `translateY(${(1 - enter) * 19}px)`;
    case "breathe":
      return `translateY(${(1 - enter) * 10}px) scale(${0.94 + enter * 0.06})`;
    case "register":
      return `translate(${(1 - enter) * -11}px, ${(1 - enter) * 7}px)`;
    case "slide":
    default:
      return `translateX(${(1 - enter) * -24}px)`;
  }
};

const framesFor = (line: TimedLine, fps: number) => {
  return line.units.map((unit) => Math.round((unit.startMs / 1000) * fps));
};

const roleFor = (
  rule: HighlightRule | undefined,
  unit: TimedUnit,
): FontRole => {
  if (rule) return rule.font;
  return /[A-Za-z]/u.test(unit.text) ? "latin" : "body";
};

const fitLine = (line: TimedLine, page: LyricPage, box: LineBox) => {
  const ratios = line.units.map((unit) => {
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
      validateFontIsLoaded: true,
    }).width;
    const spacing = /[A-Za-z]/u.test(unit.text)
      ? 0.025
      : role === "impact"
        ? 0.026
        : role === "memory"
          ? 0.014
          : 0.018;
    return (measured / 100) * scale + spacing;
  });
  const totalRatio = ratios.reduce((sum, ratio) => sum + ratio, 0);
  const fontSize = Math.min(
    box.maxSize,
    box.width / Math.max(totalRatio, 0.01),
  );
  return { ratios, fontSize, totalWidth: totalRatio * fontSize };
};

const SurfaceDetails: React.FC<{
  page: LyricPage;
  width: number;
  height: number;
}> = ({ page, width, height }) => {
  if (page.surface === "mount") {
    return (
      <>
        <div
          style={{
            position: "absolute",
            inset: 14,
            outline: `3px solid ${page.palette.detail}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 18,
            height: "100%",
            background: page.palette.accent,
          }}
        />
      </>
    );
  }
  if (page.surface === "strip") {
    const count = Math.max(5, Math.floor(width / 120));
    return (
      <>
        {Array.from({ length: count }, (_, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                position: "absolute",
                left: 35 + index * ((width - 70) / count),
                top: 12,
                width: 34,
                height: 12,
                background: page.palette.detail,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 35 + index * ((width - 70) / count),
                bottom: 12,
                width: 34,
                height: 12,
                background: page.palette.detail,
              }}
            />
          </React.Fragment>
        ))}
      </>
    );
  }
  if (page.surface === "silver") {
    return (
      <>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 16,
            background: page.palette.secondary,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 9,
            background: page.palette.detail,
          }}
        />
      </>
    );
  }
  if (page.surface === "glass") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 12,
          outline: `2px solid ${page.palette.detail}`,
        }}
      />
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 20,
        height,
        background: page.palette.accent,
      }}
    />
  );
};

const LineSurface: React.FC<{
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
    [startFrame, startFrame + Math.round(0.26 * fps)],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );
  const paddingX = Math.max(44, fontSize * 0.27);
  const paddingY = Math.max(30, fontSize * 0.19);
  const width = Math.min(1880 - (box.x - paddingX), finalWidth + paddingX * 2);
  const height = fontSize * 1.42 + paddingY * 0.45;
  return (
    <div
      style={{
        position: "absolute",
        left: box.x - paddingX,
        top: box.y - paddingY,
        width,
        height,
        background: page.palette.surface,
        opacity: enter,
        transform: `translateX(${(1 - enter) * -18}px)`,
        transformOrigin: "left center",
        boxShadow: `11px 12px 0 ${page.palette.detail}`,
      }}
    >
      <SurfaceDetails page={page} width={width} height={height} />
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
  const horizontalSafety = fontSize * 0.34;
  const verticalSafety = fontSize * 0.42;
  return (
    <>
      <LineSurface
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
          height: fontSize * 1.75,
          display: "flex",
          alignItems: "flex-start",
          overflow: "visible",
          whiteSpace: "pre",
        }}
      >
        {line.units.map((unit, unitIndex) => {
          const rule = ruleForUnit(line, unit, page.highlights);
          const role = roleFor(rule, unit);
          const family = fontFor(unit, role);
          const weight = weightFor(role);
          const scale = rule?.scale ?? 1;
          const color = rule
            ? page.palette[rule.color]
            : page.palette.foreground;
          const slotWidth = ratios[unitIndex] * fontSize;
          const naturalWidth = Math.max(
            1,
            measureText({
              text: unit.text || " ",
              fontFamily: family,
              fontSize,
              fontWeight: weight,
              validateFontIsLoaded: true,
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
            6,
            Math.min(
              14,
              Math.round(((unit.endMs - unit.startMs) / 1000) * fps * 0.5),
            ),
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
                height: fontSize * 1.75,
                overflow: "visible",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: -horizontalSafety,
                  top: -verticalSafety,
                  width: naturalWidth * scale + horizontalSafety * 2,
                  height: fontSize * 1.45 + verticalSafety * 2,
                  clipPath: `inset(0 ${(1 - enter) * 100}% 0 0)`,
                  overflow: "visible",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: horizontalSafety,
                    marginTop: verticalSafety,
                    fontFamily: family,
                    fontWeight: weight,
                    fontSize,
                    lineHeight: 1.26,
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
  const lines = page.lineIndexes.map((index) => lyricLines[index]);
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
