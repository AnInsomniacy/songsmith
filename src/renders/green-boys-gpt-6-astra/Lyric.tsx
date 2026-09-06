import { measureText } from "@remotion/layout-utils";
import { F } from "./fonts";
import { LINES, THEMES, Shot } from "./design";
import { ease } from "./scenes/primitives";
import { wordEntrance } from "./timing";

type Unit = (typeof LINES)[number]["characters"][number];
type Glyph = {
  unit: Unit;
  x: number;
  width: number;
  size: number;
  family: string;
  weight: number;
  color: string;
  motion: number;
};
export type LineLayout = {
  glyphs: Glyph[];
  x: number;
  y: number;
  width: number;
  height: number;
  baseline: number;
  translationSize: number;
  translation: string;
  theme: (typeof THEMES)[string];
  first: number;
};
const dimensions = (
  text: string,
  family: string,
  size: number,
  weight: number,
) =>
  measureText({
    text,
    fontFamily: family,
    fontSize: size,
    fontWeight: weight,
    validateFontIsLoaded: true,
  });

export function layoutLine(shot: Shot, index: number, row: number): LineLayout {
  const line = LINES[index];
  const theme = THEMES[shot.theme];
  const x = shot.x + (row === 1 ? 34 : 0);
  const maxWidth = 1920 - x - 112;
  const count = line.characters.filter((c) => c.vocal).length;
  const initial = count < 8 ? 122 : count < 12 ? 108 : 92;
  let offset = 0;
  const base = line.characters.map((unit) => {
    const start = offset;
    offset += unit.text.length;
    const accentIndex = shot.accent.findIndex((term) => {
      let position = line.text.indexOf(term);
      while (position >= 0) {
        if (start < position + term.length && offset > position) return true;
        position = line.text.indexOf(term, position + 1);
      }
      return false;
    });
    const impact = accentIndex >= 0 && !shot.inner;
    const family = impact ? F.impact : shot.inner ? F.inner : F.body;
    const weight = impact ? 400 : shot.inner ? 600 : 700;
    const size = initial * (impact ? 1.06 : 1);
    return {
      unit,
      family,
      weight,
      size,
      color:
        accentIndex < 0
          ? theme.ink
          : accentIndex % 2
            ? theme.secondary
            : theme.primary,
      motion: impact ? 1 + (accentIndex % 3) : 0,
    };
  });
  const total = base.reduce(
    (sum, g) =>
      sum + dimensions(g.unit.text, g.family, g.size, g.weight).width + 2,
    0,
  );
  const factor = Math.min(1, (maxWidth - 80) / total);
  let cursor = 0;
  const glyphs: Glyph[] = base.map((g) => {
    const size = g.size * factor;
    const width =
      dimensions(g.unit.text, g.family, size, g.weight).width + 2 * factor;
    const glyph = { ...g, size, x: cursor, width };
    cursor += width;
    return glyph;
  });
  let translationSize = 44;
  let translationWidth = dimensions(
    line.translation,
    F.chinese,
    translationSize,
    400,
  ).width;
  if (translationWidth > maxWidth - 80) {
    translationSize *= (maxWidth - 80) / translationWidth;
    translationWidth = maxWidth - 80;
  }
  const maximumSize = Math.max(...glyphs.map((g) => g.size));
  const baseline = maximumSize + 34;
  const height = Math.ceil(baseline + translationSize + 62);
  const width = Math.ceil(Math.max(cursor, translationWidth) + 80);
  const y = shot.y + (row === 1 ? 344 : 0);
  if (width > maxWidth + 1 || y + height > 992 || translationSize < 33)
    throw new Error(`Unsafe lyric layout: ${shot.key}/${index}`);
  return {
    glyphs,
    x,
    y,
    width,
    height,
    baseline,
    translationSize,
    translation: line.translation,
    theme,
    first: Math.min(
      ...line.characters.filter((c) => c.vocal).map((c) => c.frame),
    ),
  };
}

export function Lyric({
  layout,
  frame,
}: {
  layout: LineLayout;
  frame: number;
}) {
  if (frame < layout.first) return null;
  const { x, y, width, height, theme } = layout;
  const panel = ease((frame - layout.first) / 15.6);
  return (
    <g transform={`translate(${x} ${y})`}>
      <g opacity={panel}>
        <rect width={width} height={height} rx="9" fill={theme.surface} />
        <path
          d={`M0 10Q0 0 10 0H${width - 10}Q${width} 0 ${width} 10`}
          fill="none"
          stroke={theme.primary}
          strokeWidth="3"
        />
        <path
          d={`M0 25V${height - 25}`}
          stroke={theme.secondary}
          strokeWidth="7"
        />
        <text
          x="40"
          y={height - 27}
          fontFamily={F.chinese}
          fontWeight="400"
          fontSize={layout.translationSize}
          fill={theme.translation}
        >
          {layout.translation}
        </text>
      </g>
      {layout.glyphs
        .filter((g) => frame >= g.unit.frame && g.unit.text.trim())
        .map((g) => {
          const { motion: p, opacity } = wordEntrance(frame - g.unit.frame);
          const dy =
            g.motion === 0 ? 15 * (1 - p) : g.motion === 1 ? 24 * (1 - p) : 0;
          const sx = g.motion === 2 ? 0.88 + 0.12 * p : 1;
          const sy = g.motion === 1 ? 0.9 + 0.1 * p : 1;
          const skew = g.motion === 3 ? 7 * (1 - p) : 0;
          return (
            <g
              key={g.unit.index}
              transform={`translate(${40 + g.x} ${layout.baseline})`}
            >
              <text
                x="0"
                y="0"
                opacity={opacity}
                transform={`translate(0 ${dy}) scale(${sx} ${sy}) skewX(${skew})`}
                fontFamily={g.family}
                fontWeight={g.weight}
                fontSize={g.size}
                fill={g.color}
              >
                {g.unit.text}
              </text>
            </g>
          );
        })}
    </g>
  );
}
