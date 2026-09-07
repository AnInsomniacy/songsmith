import { measureText } from "@remotion/layout-utils";
import React, { useMemo } from "react";
import { C, lines, unitsOf, type Line } from "./config";
import { easeOut, frameAt, smooth } from "./motion";
import { emphasis, type Shot } from "./storyboard";
import { F } from "./typography";

type Slot = {
  text: string;
  x: number;
  size: number;
  cue: number;
  fill: string;
  family: string;
  weight: number;
};
type Prepared = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  cue: number;
  size: number;
  slots: Slot[];
  translation?: string;
  translationSize: number;
  panel: string;
  ink: string;
  accent: string;
};
const paintedSurfaces: Record<string, string> = {
  crossroads: "#DCE8B8",
  invention: "#F5E2B9",
  "corner-cafe": "#C8DDDC",
  luthier: "#E7E8CB",
  greenhouse: "#DDEACD",
  "print-desk": "#EDD4BC",
  "collector-shelf": "#DFE5DB",
  "sign-painter": "#D8E3CB",
  "open-stage": "#F0D7B5",
  "balcony-session": "#D9E5CF",
  "shoe-atelier": "#D2E4DF",
  mailroom: "#2A4E46",
  "toy-session": "#382E48",
  "night-records": "#173E43",
  "night-canopy": "#143944",
};
const textWidth = (
  text: string,
  size: number,
  family: string,
  weight: number,
) =>
  measureText({
    text,
    fontSize: size,
    fontFamily: family,
    fontWeight: weight,
    validateFontIsLoaded: true,
  }).width;
export function prepareLine(
  line: Line,
  lineIndex: number,
  shot: Shot,
  row: number,
): Prepared {
  const en = /^[A-Za-z]/.test(line.text);
  const count = shot.lineIds.length;
  const horizontal = shot.layout === "bottom" || shot.layout === "top";
  const maxWidth = horizontal
    ? 1656
    : shot.layout === "right" && count === 3
      ? 1082
      : 956;
  const x = horizontal
    ? 130
    : shot.layout === "left"
      ? 120
      : count === 3
        ? 696
        : 842;
  const y =
    shot.layout === "top"
      ? count === 1
        ? 258
        : 218 + row * 224
      : shot.layout === "bottom"
        ? count === 1
          ? 858
          : (en ? 710 : 746) + row * (en ? 210 : 186)
        : count === 3
          ? 272 + row * 270
          : count === 1
            ? 540
            : 376 + row * 318;
  const maxSize = en
    ? count === 3
      ? 76
      : horizontal
        ? 95
        : 89
    : horizontal
      ? 113
      : 104;
  const family = en ? F.en : F.cn,
    weight = en ? 600 : 500;
  const targets = emphasis[lineIndex] ?? [];
  const ranges = targets.flatMap((word) => {
    const found: { start: number; end: number; accent: number }[] = [];
    let at = line.text.toLowerCase().indexOf(word.toLowerCase());
    while (at >= 0) {
      found.push({
        start: at,
        end: at + word.length,
        accent: targets.indexOf(word),
      });
      at = line.text
        .toLowerCase()
        .indexOf(word.toLowerCase(), at + word.length);
    }
    return found;
  });
  const panel = paintedSurfaces[shot.id] ?? (shot.dark ? C.deep : C.paper);
  const ink = shot.dark ? C.paper : C.ink;
  const accents = shot.dark
    ? [shot.accent, C.mist, C.yellow]
    : [shot.accent === C.red ? "#A73538" : "#0B5955", "#0B5955", "#A73538"];
  let cursor = 0;
  const units = unitsOf(line).map((unit) => {
    const index = cursor;
    cursor += unit.text.length;
    const highlighted = ranges.find((r) => index < r.end && cursor > r.start);
    return {
      ...unit,
      factor: highlighted ? 1.085 : 1,
      fill: highlighted ? accents[highlighted.accent % accents.length] : ink,
    };
  });
  const gap = en ? 1.8 : 2.1;
  const totalAt = (size: number) =>
    units.reduce(
      (sum, u) =>
        sum + textWidth(u.text, size * u.factor, family, weight) + gap,
      0,
    ) - gap;
  const size = Math.min(
    maxSize,
    (maxSize * (maxWidth - 50)) / totalAt(maxSize),
  );
  const total = totalAt(size);
  let dx = 0;
  const slots = units.map((u) => {
    const item = {
      text: u.text,
      x: dx,
      size: size * u.factor,
      cue: frameAt(u.startMs),
      fill: u.fill,
      family,
      weight,
    };
    dx += textWidth(u.text, item.size, family, weight) + gap;
    return item;
  });
  const tr = lines[lineIndex].translation;
  const trSize = tr
    ? Math.min(
        37,
        (37 * (maxWidth - 42)) / textWidth(tr, 37, F.translation, 400),
      )
    : 0;
  const width =
    Math.max(total, tr ? textWidth(tr, trSize, F.translation, 400) : 0) + 54;
  const top = y - size * 1.18 - 23;
  const bottom = y + (tr ? size * 0.25 + trSize + 27 : size * 0.31 + 22);
  return {
    id: line.id,
    x,
    y,
    width,
    height: bottom - top,
    top,
    cue: frameAt(line.startMs),
    size,
    slots,
    translation: tr,
    translationSize: trSize,
    panel,
    ink,
    accent: shot.accent,
  };
}
const Plate: React.FC<{ line: Prepared; shot: Shot; frame: number }> = ({
  line: l,
  shot,
  frame,
}) => {
  if (frame < l.cue) return null;
  const reveal = smooth((frame - l.cue) / 15.6);
  return (
    <g data-street-panel={l.id} opacity={reveal}>
      <rect
        x={l.x - 26 + 5}
        y={l.top + 7}
        width={l.width}
        height={l.height}
        rx={shot.surface === "enamel" ? 19 : 6}
        fill={C.deep}
        opacity=".11"
      />
      <rect
        x={l.x - 26}
        y={l.top}
        width={l.width}
        height={l.height}
        rx={shot.surface === "enamel" ? 19 : 6}
        fill={l.panel}
      />
      {shot.surface === "enamel" && (
        <rect
          x={l.x - 18}
          y={l.top + 8}
          width={l.width - 16}
          height={l.height - 16}
          rx="13"
          fill="none"
          stroke={l.ink}
          strokeWidth="1.3"
          opacity=".18"
        />
      )}
      {shot.surface === "cloth" && (
        <path
          d={`M${l.x - 15} ${l.top + 10}H${l.x + l.width - 39}V${l.top + l.height - 10}H${l.x - 15}Z`}
          fill="none"
          stroke={l.ink}
          strokeWidth="1.7"
          strokeDasharray="3 7"
          opacity=".22"
        />
      )}
      {shot.surface === "paper" && (
        <path
          d={`M${l.x - 10} ${l.top + l.height - 9}H${l.x + l.width - 47}`}
          stroke={l.accent}
          strokeWidth="2"
          opacity=".35"
        />
      )}
    </g>
  );
};
const Words: React.FC<{ line: Prepared; frame: number }> = ({
  line: l,
  frame,
}) => (
  <g data-street-line={l.id}>
    {l.slots.map((s, i) => {
      if (!s.text.trim() || frame < s.cue) return null;
      const age = frame - s.cue;
      const lift = (1 - easeOut(age / 10)) * 7;
      return (
        <text
          key={i}
          data-street-unit={`${l.id}-${i}`}
          data-cue={s.cue}
          x={l.x + s.x}
          y={l.y + lift}
          fontFamily={s.family}
          fontWeight={s.weight}
          fontSize={s.size}
          fontStyle="normal"
          fill={s.fill}
          stroke={l.panel}
          strokeWidth={(1 - smooth(age / 6)) * 2.3}
          strokeLinejoin="round"
          paintOrder="stroke fill"
          opacity={0.7 + 0.3 * smooth(age / 3)}
          xmlSpace="preserve"
        >
          {s.text}
        </text>
      );
    })}
    {l.translation && frame >= l.cue && (
      <text
        data-street-translation={l.id}
        x={l.x}
        y={l.y + l.size * 0.25 + l.translationSize + 5}
        fontFamily={F.translation}
        fontSize={l.translationSize}
        fill={l.ink}
        opacity={smooth((frame - l.cue) / 10)}
      >
        {l.translation}
      </text>
    )}
  </g>
);
export const Lyrics: React.FC<{ shot: Shot; frame: number }> = ({
  shot,
  frame,
}) => {
  const prepared = useMemo(
    () => shot.lineIds.map((i, row) => prepareLine(lines[i], i, shot, row)),
    [shot],
  );
  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      {prepared.map((l) => (
        <Plate key={l.id} line={l} shot={shot} frame={frame} />
      ))}
      {prepared.map((l) => (
        <Words key={l.id} line={l} frame={frame} />
      ))}
    </svg>
  );
};
