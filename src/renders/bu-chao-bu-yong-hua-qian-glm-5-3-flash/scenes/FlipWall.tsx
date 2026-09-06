import React from "react";
import { INK, hashSeed, mulberry32 } from "../design";
import { FONT_NUM } from "../fonts";
import { FloorBadge } from "../Kit";
import type { Page } from "../types";

const COLS = 12;
const ROWS = 4;
const TILE_W = 122;
const TILE_H = 104;

const glyphs = "0123456789¥ABX-".split("");

export const FlipWall: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => {
  const rand = mulberry32(hashSeed("flipwall"));
  const board: string[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => glyphs[Math.floor(rand() * glyphs.length)]),
  );
  const hotTiles = new Set([5, 18, 31, 40]);

  const flipPhase = (index: number): number => {
    const f0 = 10 + index * 1.4;
    return Math.min(1, Math.max(0, (f - f0) / 12));
  };
  const idleIndex = Math.floor(f / 80) % (ROWS * COLS);
  const idlePhase = (f % 80) / 80;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        <rect x={170} y={150} width={1580} height={ROWS * TILE_H + 60} fill="#171310" stroke={INK} strokeWidth={4} />
        {Array.from({ length: ROWS }, (_, r) =>
          Array.from({ length: COLS }, (_, c) => {
            const index = r * COLS + c;
            const ph = index === idleIndex ? idlePhase : flipPhase(index);
            const sq = Math.abs(Math.cos(ph * Math.PI));
            const swapping = ph > 0.5;
            const ch = board[r][c];
            const nextCh = glyphs[(index * 7 + Math.floor(f / 80)) % glyphs.length];
            const hot = hotTiles.has(index);
            const x = 210 + c * TILE_W;
            const y = 180 + r * TILE_H;
            const cx = x + TILE_W / 2;
            const cy = y + TILE_H / 2;
            return (
              <g key={index}>
                <rect x={x} y={cy - (TILE_H / 2) * sq} width={TILE_W - 10} height={TILE_H * sq} rx={4}
                  fill={swapping ? (hot ? "#8A6400" : "#0B0F0E") : hot ? "#F2B705" : "#22221E"}
                  stroke="#0B0F0E" strokeWidth={2}
                />
                {sq > 0.55 ? (
                  <text x={cx} y={cy + 20 * sq} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700}
                    fontSize={58 * sq} fill={hot ? (swapping ? "#F2B705" : INK) : "#EDE6CF"}>
                    {swapping ? nextCh : ch}
                  </text>
                ) : null}
              </g>
            );
          }),
        )}

        {/* ceiling light sway (ambient) */}
        <g style={{ rotate: `${Math.sin((f / 160) * Math.PI * 2) * 2.4}deg`, transformOrigin: "960px 0px" }}>
          <line x1={960} y1={0} x2={960} y2={70} stroke={INK} strokeWidth={4} />
          <rect x={860} y={70} width={200} height={26} rx={8} fill="#F2B705" stroke={INK} strokeWidth={3} />
        </g>
      </svg>
    </div>
  );
};
