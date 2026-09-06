import React from "react";
import { INK, hashSeed, mulberry32 } from "../design";
import { FONT_NUM } from "../fonts";
import { FloorBadge } from "../Kit";
import type { Page } from "../types";

type Item = { kind: "bottle" | "box" | "ball"; color: string };

const ROW_COLORS = ["#E23A2E", "#F2B705", "#0F5E5C", "#D8D2C0", "#B3271E", "#8A6400"];

const buildRow = (row: number): Item[] => {
  const rand = mulberry32(hashSeed(`shelf-${row}`));
  return Array.from({ length: 8 }, (_, i) => ({
    kind: (["bottle", "box", "ball"] as const)[Math.floor(rand() * 3)],
    color: ROW_COLORS[(i + row * 2) % ROW_COLORS.length],
  }));
};

const ItemGlyph: React.FC<{ item: Item; x: number; y: number; s: number }> = ({
  item,
  x,
  y,
  s,
}) => (
  <g transform={`translate(${x} ${y})`}>
    {item.kind === "bottle" ? (
      <>
        <rect x={-s * 0.32} y={-s * 0.5} width={s * 0.64} height={s} rx={8} fill={item.color} stroke={INK} strokeWidth={3} />
        <rect x={-s * 0.12} y={-s * 0.78} width={s * 0.24} height={s * 0.3} fill={INK} />
      </>
    ) : item.kind === "box" ? (
      <rect x={-s * 0.42} y={-s * 0.6} width={s * 0.84} height={s * 0.6} rx={6} fill={item.color} stroke={INK} strokeWidth={3} />
    ) : (
      <circle cy={-s * 0.3} r={s * 0.3} fill={item.color} stroke={INK} strokeWidth={3} />
    )}
  </g>
);

export const Shelf: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => {
  const rows = [0, 1, 2].map((r) => ({
    y: 250 + r * 210,
    speed: 1.15 - r * 0.34,
    items: buildRow(r),
    s: 120 - r * 16,
  }));

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {rows.map((row, r) => {
          const offset = -((f * row.speed) % 1920);
          return (
            <g key={r}>
              {[offset, offset + 1920].map((dx, copy) =>
                row.items.map((item, i) => (
                  <ItemGlyph
                    key={`${copy}-${i}`}
                    item={item}
                    x={120 + i * 240 + dx}
                    y={row.y}
                    s={row.s}
                  />
                )),
              )}
              <rect x={100} y={row.y} width={1720} height={18} fill={INK} />
              <rect x={130} y={row.y + 30} width={1660} height={8} fill="rgba(27,23,18,0.1)" />
              {Array.from({ length: 6 }, (_, t) => (
                <g key={t} transform={`translate(${210 + t * 300} ${row.y + 62})`}>
                  <rect width={72} height={34} rx={4} fill="#FDFBF4" stroke={INK} strokeWidth={2} />
                  <text x={36} y={25} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={22} fill={INK}>
                    ¥{(r + 1) * 10 + t}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
