import { measureText } from "@remotion/layout-utils";
import React from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";
import { FONT_BODY, FONT_IMPACT, FONT_LATIN, FONT_SIGN } from "./fonts";
import { lyricLines } from "./lyrics";
import type {
  FontRole,
  HighlightRule,
  LayoutKind,
  LyricPage,
  TimedLine,
  TimedUnit,
} from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

type LineBox = { x: number; y: number; width: number; maxSize: number };

const boxFor = (
  layout: LayoutKind,
  lineIndex: number,
  count: number,
): LineBox => {
  if (layout === "split-machine") {
    const box = { x: 90, width: 960, maxSize: 150 };
    if (count === 1) return { ...box, y: 250, maxSize: 150 };
    return lineIndex === 0
      ? { x: 90, y: 140, width: 960, maxSize: 116 }
      : { x: 90, y: 560, width: 960, maxSize: 116 };
  }
  if (layout === "screen-duo") {
    if (count <= 2) {
      const box = { x: 110, width: 1160, maxSize: 122 };
      return lineIndex === 0
        ? { ...box, y: 150 }
        : { ...box, y: 570 };
    }
    const group = Math.floor(lineIndex / 2);
    const row = lineIndex % 2;
    const y = group === 0 ? 96 + row * 216 : 566 + row * 216;
    return { x: 110, y, width: 1160, maxSize: 68 };
  }
  const box = { x: 110, width: 1180 };
  if (count === 1) return { ...box, y: 260, maxSize: 160 };
  if (count === 2)
    return lineIndex === 0
      ? { ...box, y: 160, maxSize: 120 }
      : { ...box, y: 580, maxSize: 120 };
  return lineIndex < 2
    ? { x: 110, y: 120 + lineIndex * 200, width: 1180, maxSize: 92 }
    : { x: 110, y: 560 + (lineIndex - 2) * 200, width: 1180, maxSize: 92 };
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
  if (role === "sign") return FONT_SIGN;
  return FONT_BODY;
};

const weightFor = (role: FontRole) => {
  if (role === "body") return 500;
  if (role === "impact") return 900;
  if (role === "latin") return 700;
  return 400;
};

const spacingFor = (unit: TimedUnit, role: FontRole) => {
  if (/[A-Za-z]/u.test(unit.text)) return 0.018;
  if (role === "impact") return 0.028;
  return 0.012;
};

const roleFor = (
  rule: HighlightRule | undefined,
  unit: TimedUnit,
): FontRole => {
  if (rule?.font) return rule.font;
  return /[A-Za-z]/u.test(unit.text) ? "latin" : "body";
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
      validateFontIsLoaded: true,
    }).width;
    return (measured / 100) * scale + spacingFor(unit, role);
  });
  const totalRatio = ratios.reduce((sum, ratio) => sum + ratio, 0);
  const fontSize = Math.min(
    box.maxSize,
    box.width / Math.max(totalRatio, 0.01),
  );
  return { ratios, fontSize };
};

const SurfaceChrome: React.FC<{
  page: LyricPage;
  width: number;
  height: number;
}> = ({ page, width, height }) => {
  if (page.surface === "panel") {
    return (
      <>
        <div
          style={{
            position: "absolute",
            right: 26,
            top: 22,
            width: 11,
            height: 11,
            borderRadius: 6,
            background: page.palette.accent,
            opacity: 0.9,
            boxShadow: `0 0 12px ${page.palette.accent}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 56,
            display: "flex",
            gap: 34,
            alignItems: "center",
            paddingLeft: 46,
          }}
        >
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                background:
                  index === 0 ? "#FF2E6E" : index === 1 ? "#FFC72C" : "#3DDC84",
                opacity: 0.85,
                boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.35)",
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 14,
            fontFamily: FONT_SIGN,
            fontSize: 18,
            color: page.palette.detail,
            letterSpacing: 2,
          }}
        >
          ¥1
        </div>
      </>
    );
  }
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 14,
          borderRadius: 30,
          border: `3px solid ${page.palette.detail}55`,
          pointerEvents: "none",
        }}
      />
      {[
        [18, 18],
        [width - 30, 18],
        [18, height - 30],
        [width - 30, height - 30],
      ].map(([sx, sy], index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: sx,
            top: sy,
            width: 12,
            height: 12,
            borderRadius: 6,
            background: page.palette.detail,
            boxShadow: "inset 0 2px 3px rgba(0,0,0,0.5)",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 16,
          fontFamily: FONT_SIGN,
          fontSize: 18,
          color: page.palette.accent,
          letterSpacing: 2,
          opacity: 0.75,
        }}
      >
        CREDIT 01
      </div>
    </>
  );
};

const LineSurface: React.FC<{
  page: LyricPage;
  box: LineBox;
  width: number;
  height: number;
  globalFrame: number;
  startFrame: number;
  children: React.ReactNode;
}> = ({ page, box, width, height, globalFrame, startFrame, children }) => {
  const { fps } = useVideoConfig();
  const enter = interpolate(
    globalFrame,
    [startFrame, startFrame + Math.round(0.3 * fps)],
    [0, 1],
    { ...clamp, easing: EASE_OUT },
  );
  const radius = page.surface === "panel" ? 14 : 44;
  return (
    <div
      style={{
        position: "absolute",
        left: box.x - 26,
        top: box.y - 30,
        width,
        height,
        borderRadius: radius,
        background: `linear-gradient(160deg, ${page.palette.backgroundAlt} 0%, ${page.palette.background} 60%, #08080F 100%)`,
        boxShadow: `0 0 0 8px ${page.palette.detail}33, 0 0 46px ${page.palette.accent}26, 0 22px 44px rgba(0,0,0,0.5)`,
        opacity: enter,
        transform: `translateY(${(1 - enter) * -16}px) scale(${0.97 + enter * 0.03})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 12,
          borderRadius: radius - 10,
          background: page.palette.surface,
          overflow: "hidden",
        }}
      >
        {page.surface === "crt" ? (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(to bottom, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 5px)",
                opacity: 0.55,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 18%, transparent 42%)",
                pointerEvents: "none",
              }}
            />
          </>
        ) : null}
        {children}
      </div>
      <SurfaceChrome page={page} width={width} height={height} />
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
  const box = boxFor(page.layout, lineIndex, lineCount);
  const { fontSize, ratios } = fitLine(line, page, box);
  const unitFrames = framesFor(line, fps);
  const horizontalSafety = fontSize * 0.34;
  const verticalSafety = fontSize * 0.42;
  return (
    <>
      <LineSurface
        page={page}
        box={box}
        width={box.width + 52}
        height={fontSize * 1.62 + verticalSafety * 2 + 62}
        globalFrame={globalFrame}
        startFrame={unitFrames[0]}
      >
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 32,
            width: box.width - 80,
            height: fontSize * 1.75,
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
              { ...clamp, easing: EASE_OUT },
            );
            const motionStyle =
              page.motion === "coin"
                ? {
                    transform: `translateY(${(1 - enter) * -30}px) scale(${scale})`,
                    opacity: interpolate(enter, [0, 0.45], [0, 1], clamp),
                  }
                : {
                    clipPath: `inset(0 ${(1 - enter) * 100}% 0 0)`,
                    opacity: interpolate(enter, [0, 0.55], [0.3, 1], clamp),
                  };
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
                      transformOrigin: "left center",
                      whiteSpace: "pre",
                      fontSynthesis: "none",
                      ...motionStyle,
                    }}
                  >
                    {unit.text}
                  </span>
                </span>
              </span>
            );
          })}
        </div>
      </LineSurface>
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
