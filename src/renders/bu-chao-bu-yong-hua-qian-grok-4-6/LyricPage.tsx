import { measureText } from "@remotion/layout-utils";
import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_BODY, FONT_IMPACT, FONT_LATIN } from "./fonts";
import { lyricLines } from "./lyrics";
import type {
  FontRole,
  HighlightRule,
  LyricPage,
  TextMotion,
  TimedLine,
  TimedUnit,
} from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TITLE = ["不", "潮", "不", "用", "花", "钱"] as const;

type LineBox = { x: number; y: number; width: number; maxSize: number };

const layoutFor = (
  layout: LyricPage["layout"],
  lineIndex: number,
  count: number,
): LineBox => {
  if (count === 1) return { x: 210, y: 400, width: 1480, maxSize: 168 };
  const layouts = {
    stack: [
      { x: 210, y: 188, width: 1420, maxSize: 132 },
      { x: 210, y: 620, width: 1420, maxSize: 132 },
    ],
    offset: [
      { x: 210, y: 176, width: 1380, maxSize: 128 },
      { x: 320, y: 628, width: 1320, maxSize: 128 },
    ],
    split: [
      { x: 210, y: 196, width: 1180, maxSize: 126 },
      { x: 420, y: 640, width: 1260, maxSize: 126 },
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
      if (start < position + rule.term.length && end > position) return true;
      position = line.text.indexOf(rule.term, position + 1);
    }
    return false;
  });
};

const roleFor = (rule: HighlightRule | undefined, unit: TimedUnit): FontRole => {
  if (rule) return rule.font;
  return /[A-Za-z]/u.test(unit.text) ? "latin" : "body";
};

const fontFor = (role: FontRole) => {
  if (role === "impact") return FONT_IMPACT;
  if (role === "latin") return FONT_LATIN;
  return FONT_BODY;
};

const weightFor = (role: FontRole) => (role === "body" ? 700 : 400);

const motionFor = (
  motion: TextMotion,
  frame: number,
  localAppear: number,
  duration: number,
) => {
  const enter = interpolate(frame, [localAppear, localAppear + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const rest = 1 - enter;
  if (motion === "stamp") {
    return {
      opacity: enter,
      translate: `0px ${rest * 16}px`,
      scale: interpolate(frame, [localAppear, localAppear + duration], [0.86, 1], {
        ...clamp,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        output: "perceptual-scale",
      }),
    };
  }
  if (motion === "lift") {
    return {
      opacity: enter,
      translate: `0px ${rest * -18}px`,
      scale: interpolate(frame, [localAppear, localAppear + duration], [0.94, 1], {
        ...clamp,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        output: "perceptual-scale",
      }),
    };
  }
  if (motion === "knock") {
    return { opacity: enter, translate: `${rest * -16}px 0px`, scale: 1 };
  }
  if (motion === "pinch") {
    return {
      opacity: enter,
      translate: `0px ${rest * 10}px`,
      scale: interpolate(frame, [localAppear, localAppear + duration], [0.9, 1], {
        ...clamp,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        output: "perceptual-scale",
      }),
    };
  }
  return {
    opacity: enter,
    translate: `0px ${rest * 22}px`,
    scale: interpolate(frame, [localAppear, localAppear + duration], [0.88, 1], {
      ...clamp,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      output: "perceptual-scale",
    }),
  };
};

const framesFor = (line: TimedLine, fps: number) => {
  let previous = -1;
  return line.characters.map((unit) => {
    const source = Math.round((unit.startMs / 1000) * fps);
    const frame = Math.max(source, previous + 1);
    previous = frame;
    return frame;
  });
};

const fitLine = (line: TimedLine, page: LyricPage, box: LineBox) => {
  const ratios = line.characters.map((unit) => {
    const rule = ruleForUnit(line, unit, page.highlights);
    const role = roleFor(rule, unit);
    const measured = measureText({
      text: unit.text || " ",
      fontFamily: fontFor(role),
      fontSize: 100,
      fontWeight: weightFor(role),
      validateFontIsLoaded: true,
    }).width;
    const spacing = role === "latin" ? 0.04 : role === "impact" ? 0.02 : 0.016;
    return (measured / 100) * (rule?.scale ?? 1) + spacing;
  });
  const total = ratios.reduce((sum, ratio) => sum + ratio, 0);
  const fontSize = Math.min(box.maxSize, box.width / Math.max(total, 0.01));
  return { ratios, fontSize, totalWidth: total * fontSize };
};

const AcrosticRail: React.FC<{ page: LyricPage; frame: number; fps: number }> = ({
  page,
  frame,
  fps,
}) => {
  if (page.acrostic === 0 && page.acrosticMode === "none") return null;
  const punch =
    page.acrosticMode === "restamp"
      ? interpolate(frame, [0, Math.round(0.22 * fps)], [0.82, 1], {
          ...clamp,
          easing: Easing.spring({ damping: 200 }),
          output: "perceptual-scale",
        })
      : 1;
  const nailFrom = page.acrosticMode === "nail" && page.acrostic === 6 ? 3 : 0;
  const locked = page.acrosticMode === "hold" || page.acrosticMode === "restamp";
  return (
    <div style={{ position: "absolute", left: 54, top: 168, width: 92 }}>
      {TITLE.map((char, index) => {
        const filled = index < page.acrostic;
        const enter = !filled
          ? 0
          : locked || index < nailFrom
            ? 1
            : interpolate(
                frame,
                [index * 4, index * 4 + Math.round(0.2 * fps)],
                [0, 1],
                { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
              );
        return (
          <div
            key={`${char}-${index}`}
            style={{
              height: 108,
              marginBottom: 10,
              background: filled ? page.palette.surface : `${page.palette.surface}22`,
              color: page.palette.accent,
              fontFamily: FONT_IMPACT,
              fontSize: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: filled ? 0.35 + enter * 0.65 : 0.12,
              scale: filled ? punch : 1,
            }}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
};

const TimedLineView: React.FC<{
  line: TimedLine;
  page: LyricPage;
  lineIndex: number;
  lineCount: number;
}> = ({ line, page, lineIndex, lineCount }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const box = layoutFor(page.layout, lineIndex, lineCount);
  const { fontSize, ratios, totalWidth } = fitLine(line, page, box);
  const unitFrames = framesFor(line, fps);
  const startLocal = Math.max(0, unitFrames[0] - page.startFrame);
  const surfaceEnter = interpolate(
    frame,
    [startLocal, startLocal + Math.round(0.26 * fps)],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );
  const paddingX = Math.max(36, fontSize * 0.28);
  const paddingY = Math.max(22, fontSize * 0.18);
  const width = Math.min(1760 - (box.x - paddingX), totalWidth + paddingX * 2);
  const height = fontSize * 1.42 + paddingY * 0.5;

  return (
    <>
      <Interactive.Div
        name={`${page.id}-patch-${lineIndex}`}
        style={{
          position: "absolute",
          left: box.x - paddingX,
          top: box.y - paddingY,
          width,
          height,
          background: page.palette.surface,
          opacity: surfaceEnter,
          translate: `${(1 - surfaceEnter) * -16}px 0px`,
          outline: `3px solid ${page.palette.detail}`,
          boxShadow: `10px 12px 0 ${page.palette.foreground}22`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 16,
            height: "100%",
            background: page.palette.accent,
          }}
        />
        {Array.from({ length: 7 }, (_, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: 28 + index * ((width - 70) / 7),
              top: 8,
              width: 14,
              height: 8,
              background: page.palette.detail,
              opacity: 0.55,
            }}
          />
        ))}
      </Interactive.Div>
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
          const family = fontFor(role);
          const weight = weightFor(role);
          const scale = rule?.scale ?? 1;
          const color = rule ? page.palette[rule.color] : page.palette.foreground;
          const slotWidth = ratios[unitIndex] * fontSize;
          const localAppear = unitFrames[unitIndex] - page.startFrame;
          if (frame < localAppear) {
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
          const duration = Math.max(
            6,
            Math.min(14, Math.round(((unit.endMs - unit.startMs) / 1000) * fps * 0.5)),
          );
          const moved = motionFor(page.motion, frame, localAppear, duration);
          return (
            <span
              key={`${line.id}-${unit.index}`}
              style={{
                position: "relative",
                display: "inline-block",
                flex: `0 0 ${slotWidth}px`,
                width: slotWidth,
                height: fontSize * 1.6,
                overflow: "visible",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontFamily: family,
                  fontWeight: weight,
                  fontSize,
                  lineHeight: 1.24,
                  color,
                  opacity: moved.opacity,
                  translate: moved.translate,
                  scale: moved.scale * scale,
                  transformOrigin: "left bottom",
                  whiteSpace: "pre",
                  fontSynthesis: "none",
                }}
              >
                {unit.text}
              </span>
            </span>
          );
        })}
      </div>
    </>
  );
};

export const LyricPageView: React.FC<{ page: LyricPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = page.lineIndexes.map((index) => lyricLines[index]);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <AcrosticRail page={page} frame={frame} fps={fps} />
      {lines.map((line, index) => (
        <TimedLineView
          key={line.id}
          line={line}
          page={page}
          lineIndex={index}
          lineCount={lines.length}
        />
      ))}
    </div>
  );
};
