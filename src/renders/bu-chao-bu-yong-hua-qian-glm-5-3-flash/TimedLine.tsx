import { measureText } from "@remotion/layout-utils";
import React from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";
import { CarrierPlate } from "./Carrier";
import { carrierPalette } from "./design";
import { FONT_BODY, FONT_IMPACT, FONT_NUM } from "./fonts";
import { lineAt } from "./lyrics";
import type {
  LineBox,
  Mark,
  MarkRole,
  Page,
  TimedLine,
  TimedUnit,
} from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const roleOf = (mark: Mark | undefined, unit: TimedUnit): MarkRole => {
  if (mark) return mark.role;
  return /[A-Za-z0-9]/u.test(unit.text) ? "latin" : "body";
};

const fontOf = (role: MarkRole): string => {
  if (role === "impact") return FONT_IMPACT;
  if (role === "latin") return FONT_NUM;
  return FONT_BODY;
};

const weightOf = (role: MarkRole): number => (role === "latin" ? 700 : 400);

const spacingOf = (role: MarkRole): number => {
  if (role === "impact") return 0.03;
  if (role === "latin") return 0.012;
  return 0.02;
};

const markForUnit = (
  line: TimedLine,
  unit: TimedUnit,
  marks: Mark[],
): Mark | undefined => {
  if (marks.length === 0) return undefined;
  const prefix = line.characters
    .slice(0, unit.index)
    .map((item) => item.text)
    .join("");
  const unitStart = prefix.length;
  const unitEnd = unitStart + unit.text.length;
  return marks.find((mark) => {
    let at = line.text.indexOf(mark.term);
    while (at !== -1) {
      if (unitStart < at + mark.term.length && unitEnd > at) return true;
      at = line.text.indexOf(mark.term, at + 1);
    }
    return false;
  });
};

const marksOf = (page: Page, lineIndexGlobal: number): Mark[] => {
  const slot = page.lines.indexOf(lineIndexGlobal);
  return slot >= 0 ? page.marks[slot] ?? [] : [];
};

type Fit = { ratios: number[]; fontSize: number; totalWidth: number };

const fitLine = (line: TimedLine, page: Page, marks: Mark[], box: LineBox): Fit => {
  const ratios = line.characters.map((unit) => {
    const mark = markForUnit(line, unit, marks);
    const role = roleOf(mark, unit);
    const scale = mark?.scale ?? 1;
    const measured = measureText({
      text: unit.text || " ",
      fontFamily: fontOf(role),
      fontSize: 100,
      fontWeight: weightOf(role) as React.CSSProperties["fontWeight"],
    }).width;
    return (measured / 100) * scale + spacingOf(role);
  });
  const totalRatio = ratios.reduce((sum, r) => sum + r, 0);
  const fontSize = Math.min(box.max, box.width / Math.max(totalRatio, 0.01));
  return { ratios, fontSize, totalWidth: totalRatio * fontSize };
};

const unitFrames = (line: TimedLine, fps: number): number[] => {
  let previous = -1;
  return line.characters.map((unit) => {
    const source = Math.round((unit.startMs / 1000) * fps);
    const frame = Math.max(source, previous + 1);
    previous = frame;
    return frame;
  });
};

const enterMotion = (
  role: MarkRole,
  enter: number,
): { translate: string; scale: string; rotate: string } => {
  if (role === "impact") {
    return {
      translate: `0px ${(1 - enter) * -26}px`,
      scale: `${(0.8 + enter * 0.2).toFixed(4)}`,
      rotate: `${(1 - enter) * -4}deg`,
    };
  }
  if (role === "latin") {
    return {
      translate: `${(1 - enter) * -16}px 0px`,
      scale: "1",
      rotate: "0deg",
    };
  }
  return {
    translate: `${(1 - enter) * -12}px ${(1 - enter) * 8}px`,
    scale: "1",
    rotate: "0deg",
  };
};

const colorOf = (mark: Mark | undefined, page: Page): string => {
  const palette = carrierPalette(page.carrier, page.accent, page.support);
  if (!mark) return palette.base;
  if (mark.color === "hot" || mark.color === "accent") return palette.hot;
  if (mark.color === "hot2" || mark.color === "support") return palette.hot2;
  return palette.base;
};

const TimedLineView: React.FC<{
  line: TimedLine;
  page: Page;
  marks: Mark[];
  box: LineBox;
  globalFrame: number;
}> = ({ line, page, marks, box, globalFrame }) => {
  const { fps } = useVideoConfig();
  const { ratios, fontSize, totalWidth } = fitLine(line, page, marks, box);
  const frames = unitFrames(line, fps);
  const firstFrame = frames[0];
  const padX = Math.min(58, Math.max(26, fontSize * 0.42));
  const padY = Math.max(16, fontSize * 0.3);
  const glyphHeight = fontSize * 1.42;
  const hSafety = fontSize * 0.22;
  const vSafety = fontSize * 0.3;
  const baseColor = colorOf(undefined, page);

  return (
    <>
      <div style={{ position: "absolute", left: box.x - padX, top: box.y - padY }}>
        <CarrierPlate
          kind={page.carrier}
          page={page}
          f={globalFrame}
          startFrame={firstFrame}
          w={totalWidth + padX * 2}
          h={glyphHeight + padY * 2}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: box.x,
          top: box.y,
          width: box.width,
          height: glyphHeight,
          display: "flex",
          alignItems: "flex-start",
          whiteSpace: "pre",
        }}
      >
        {line.characters.map((unit, i) => {
          const mark = markForUnit(line, unit, marks);
          const role = roleOf(mark, unit);
          const family = fontOf(role);
          const weight = weightOf(role) as React.CSSProperties["fontWeight"];
          const scale = mark?.scale ?? 1;
          const slotWidth = ratios[i] * fontSize;
          const naturalWidth = Math.max(
            1,
            measureText({ text: unit.text || " ", fontFamily: family, fontSize, fontWeight: weight })
              .width,
          );
          if (globalFrame < frames[i]) {
            return (
              <span
                key={unit.index}
                style={{
                  display: "inline-block",
                  flex: `0 0 ${slotWidth}px`,
                  width: slotWidth,
                  height: glyphHeight,
                }}
              />
            );
          }
          const duration = Math.max(
            5,
            Math.min(10, Math.round(((unit.endMs - unit.startMs) / 1000) * fps * 0.5)),
          );
          const enter = interpolate(
            globalFrame,
            [frames[i], frames[i] + duration],
            [0, 1],
            { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
          );
          const motion = enterMotion(role, enter);
          const color = mark ? colorOf(mark, page) : baseColor;
          return (
            <span
              key={unit.index}
              style={{
                position: "relative",
                display: "inline-block",
                flex: `0 0 ${slotWidth}px`,
                width: slotWidth,
                height: glyphHeight,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: -hSafety,
                  top: -vSafety,
                  width: naturalWidth * scale + hSafety * 2,
                  height: fontSize * 1.3 + vSafety * 2,
                  clipPath: `inset(0 ${(1 - enter) * 100}% 0 0)`,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: hSafety,
                    top: vSafety,
                    display: "inline-block",
                    fontFamily: family,
                    fontWeight: weight,
                    fontSize,
                    lineHeight: 1.2,
                    color,
                    whiteSpace: "pre",
                    fontSynthesis: "none",
                    translate: motion.translate,
                    scale: motion.scale,
                    rotate: motion.rotate,
                    transformOrigin: "left center",
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

export const LyricLayer: React.FC<{ page: Page; globalFrame: number }> = ({
  page,
  globalFrame,
}) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
    {page.lines.map((lineIndex, slot) => (
      <TimedLineView
        key={`${page.id}-${lineIndex}`}
        line={lineAt(lineIndex)}
        page={page}
        marks={marksOf(page, lineIndex)}
        box={page.layout[slot]}
        globalFrame={globalFrame}
      />
    ))}
  </div>
);
