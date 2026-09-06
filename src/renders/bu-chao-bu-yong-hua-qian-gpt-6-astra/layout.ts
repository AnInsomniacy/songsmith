import {measureText} from "@remotion/layout-utils";
import {INKS} from "./design";
import {FONTS} from "./fonts";
import {FPS, pages, sourceLines, data} from "./storyboard";
import type {Box, LineLayout, LinePlan, Mark, PreparedPage, Role, Slot, TimedLine} from "./types";

const markFor = (line: TimedLine, start: number, end: number, marks: Mark[]) => marks.find((mark) => {
  let found = line.text.indexOf(mark.text);
  while (found !== -1) {
    if (start < found + mark.text.length && end > found) return true;
    found = line.text.indexOf(mark.text, found + 1);
  }
  return false;
});

export const layoutLine = (
  source: TimedLine,
  plan: Pick<LinePlan, "box" | "marks">,
  tone: "day" | "night",
  ceiling = 1000,
): LineLayout => {
  const inks = INKS[tone];
  let prefix = 0;
  const styles = source.characters.map((unit) => {
    const mark = markFor(source, prefix, prefix + unit.text.length, plan.marks);
    prefix += unit.text.length;
    const isLatin = /[a-z]/i.test(unit.text);
    const role: Role = isLatin ? "latin" : mark?.role ?? "body";
    return {unit, mark, font: FONTS[role]};
  });
  const largestRatio = Math.max(...styles.map(({mark}) => mark?.size ?? 1));
  const heightLimit = Math.max(45, (ceiling - plan.box.y - 16) / 1.13);
  let size = Math.min(plan.box.size, heightLimit / largestRatio);
  const measurements = (base: number) => styles.map(({unit, mark, font}) => {
    const fontSize = base * (mark?.size ?? 1);
    return measureText({
      text: unit.text,
      fontFamily: font.family,
      fontSize,
      fontWeight: font.weight,
      letterSpacing: fontSize * .02 + "px",
      additionalStyles: {whiteSpace: "pre", fontSynthesis: "none"},
    }).width;
  });
  let widths = measurements(size);
  const fullWidth = widths.reduce((n, width) => n + width, 0);
  if (fullWidth > plan.box.width) {
    size *= plan.box.width / fullWidth;
    widths = measurements(size);
  }
  let x = 0;
  let lastFrame = -1;
  const slots: Slot[] = styles.map(({unit, mark, font}, index) => {
    const start = Math.max(Math.round(unit.startMs / 1000 * FPS), lastFrame + 1);
    lastFrame = start;
    const end = Math.max(start + 1, Math.round(unit.endMs / 1000 * FPS));
    const slot: Slot = {
      text: unit.text, index, x, width: widths[index], start, end,
      settle: start + Math.max(5, Math.min(10, Math.round((end - start) * .42))),
      size: size * (mark?.size ?? 1), font: font.family, weight: font.weight,
      color: mark ? inks[mark.color] : inks.body,
      motion: mark?.motion ?? "lift",
    };
    x += slot.width;
    return slot;
  });
  const largest = Math.max(...slots.map((s) => s.size));
  const layout = {
    id: source.id, start: slots[0].start,
    x: plan.box.x, y: plan.box.y, width: x, height: largest * 1.13,
    panel: inks.panel, slots,
  };
  if (layout.x - 27 < 80 || layout.x + layout.width + 27 > 1840 || layout.y + layout.height + 16 > ceiling + .1) {
    throw new Error("Lyric outside the safe area: " + source.text);
  }
  return layout;
};

export const preparePages = (): PreparedPage[] => pages.map((page) => ({
  page,
  lines: page.lines.map((line, index) => layoutLine(
    sourceLines[line.source], line, page.tone,
    page.lines[index + 1] ? page.lines[index + 1].box.y - 32 : 1000,
  )),
}));

export const prepareVocalises = () => data.intro.vocalises.map((line, i) => {
  const position: Box = {x: i ? 794 : 150, y: 830, width: i ? 770 : 570, size: 97};
  return layoutLine(line, {box: position, marks: []}, "day");
});
