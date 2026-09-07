import { measureText } from "@remotion/layout-utils";
import { C, data } from "./config";
import { clamp, smooth } from "./motion";
import { shots, type Shot } from "./storyboard";
import { F } from "./typography";
export function prepare() {
  return shots.map((shot) => ({
    shot,
    lines: shot.lines.map((n, j) => {
      const line = data.lines[n];
      const japanese = /[ぁ-ヿ一-龯]/u.test(line.text);
      const family = japanese ? F.ja : F.en;
      const weight = japanese ? 600 : 500;
      const bottom = shot.layout === "bottom";
      const maxWidth = bottom ? 1640 : 950;
      const widths = line.units.map(
        (u) =>
          measureText({
            text: u.text,
            fontFamily: family,
            fontSize: 100,
            fontWeight: weight,
          }).width / 100,
      );
      const gap = japanese ? 0.017 : 0.006;
      const total =
        widths.reduce((a, b) => a + b, 0) + gap * (widths.length - 1);
      const size = Math.min(bottom ? 88 : 98, maxWidth / total);
      let x = 0;
      let offset = 0;
      const slots = line.units.map((unit, i) => {
        const before = offset;
        offset += unit.text.length;
        const emph = shot.terms.some((term) => {
          const at = line.text.indexOf(term);
          return at >= 0 && before < at + term.length && offset > at;
        });
        const slot = {
          ...unit,
          x,
          width: widths[i] * size,
          emph,
          start: Math.round(unit.startMs * 0.06),
        };
        x += widths[i] * size + gap * size;
        return slot;
      });
      const left = bottom ? 140 : shot.layout === "left" ? 140 : 830;
      const y = bottom
        ? shot.lines.length === 2
          ? 735 + j * 178
          : 830
        : shot.lines.length === 2
          ? 378 + j * 260
          : 495;
      const zhWidth = measureText({
        text: line.translation || " ",
        fontFamily: F.zh,
        fontSize: 42,
        fontWeight: 400,
      }).width;
      const zhSize = Math.min(42, (42 * maxWidth) / zhWidth);
      if (left + x > 1820 || y + 86 > 1010 || size < 40)
        throw Error("Unsafe lyric " + line.id);
      return {
        line,
        slots,
        size,
        family,
        weight,
        left,
        y,
        width: x,
        zhSize,
        start: Math.round(line.startMs * 0.06),
        bottom,
      };
    }),
  }));
}
export type Prepared = ReturnType<typeof prepare>[number];
export const ink = (shot: Shot) => (shot.light ? "#193649" : C.white);
export const panel = (shot: Shot) => (shot.light ? "#E5ECE5" : "#172D46");
export function Lyrics({
  prepared,
  frame,
}: {
  prepared: Prepared;
  frame: number;
}) {
  const { shot, lines } = prepared;
  return (
    <g>
      <g data-svg-panels="background">
        {lines.map((l) =>
          frame < l.start ? null : (
            <rect
              key={l.line.id}
              x={l.left - 28}
              y={l.y - l.size - 26}
              width={
                Math.max(l.width, l.zhSize * [...l.line.translation].length) +
                56
              }
              height={l.size + 126}
              rx={4}
              fill={panel(shot)}
              opacity={smooth((frame - l.start) / 15.6)}
            />
          ),
        )}
      </g>
      {lines.map((l) =>
        frame < l.start ? null : (
          <g key={l.line.id} data-svg-line={l.line.id}>
            {l.slots.map((s, i) =>
              frame < s.start || !s.text.trim() ? null : (
                <text
                  key={i}
                  data-svg-unit={`${l.line.id}-${i}`}
                  x={l.left + s.x}
                  y={l.y + 8 * (1 - smooth((frame - s.start) / 10))}
                  fill={s.emph ? shot.accent : ink(shot)}
                  fontFamily={l.family}
                  fontWeight={l.weight}
                  fontSize={l.size}
                  opacity={
                    0.35 + 0.65 * (1 - (1 - clamp((frame - s.start) / 3)) ** 3)
                  }
                  xmlSpace="preserve"
                  style={{ fontKerning: "none", fontSynthesis: "none" }}
                >
                  {s.text}
                </text>
              ),
            )}
            {l.line.translation && (
              <text
                data-svg-translation={l.line.id}
                x={l.left}
                y={l.y + 64}
                fontFamily={F.zh}
                fontSize={l.zhSize}
                fill={ink(shot)}
                opacity={smooth((frame - l.start) / 12)}
              >
                {l.line.translation}
              </text>
            )}
          </g>
        ),
      )}
    </g>
  );
}
