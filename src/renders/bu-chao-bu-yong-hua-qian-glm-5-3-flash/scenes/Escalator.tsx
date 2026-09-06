import React from "react";
import { INK } from "../design";
import { FONT_NUM } from "../fonts";
import { FloorBadge } from "../Kit";
import type { Page } from "../types";

const A = { x: 150, y: 1000 };
const B = { x: 1790, y: 270 };
const dx = B.x - A.x;
const dy = B.y - A.y;
const len = Math.hypot(dx, dy);
const ux = dx / len;
const uy = dy / len;
const px = -uy;
const py = ux;
const STEP = 118;
const RAIL = 150;

const at = (d: number, off: number): { x: number; y: number } => ({
  x: A.x + ux * d + px * off,
  y: A.y + uy * d + py * off,
});

export const Escalator: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => {
  const offset = (f * 2.7) % STEP;
  const steps: number[] = [];
  for (let d = offset - STEP; d < len + STEP; d += STEP) steps.push(d);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* window wall panning up (parallax) */}
        {Array.from({ length: 4 }, (_, col) =>
          Array.from({ length: 6 }, (_, row) => {
            const yy = (((row * 250 - f * 0.55) % 1500) + 1500) % 1500 - 210;
            return (
              <rect
                key={`${col}-${row}`}
                x={520 + col * 350}
                y={yy}
                width={250}
                height={190}
                fill="#E8DFC8"
                stroke="rgba(27,23,18,0.35)"
                strokeWidth={2.5}
                opacity={0.5}
              />
            );
          }),
        )}

        {/* balustrades */}
        {[-RAIL, RAIL].map((off) => {
          const a = at(-30, off);
          const b = at(len + 30, off);
          return (
            <line key={off} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#0F5E5C" strokeWidth={44} strokeLinecap="round" />
          );
        })}

        {/* steps */}
        {steps.map((d, i) => {
          const c = at(d, 0);
          const p1 = { x: c.x + px * (RAIL - 40), y: c.y + py * (RAIL - 40) };
          const p2 = { x: c.x - px * (RAIL - 40), y: c.y - py * (RAIL - 40) };
          return (
            <line
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#C9BFA4"
              strokeWidth={26}
              strokeLinecap="round"
            />
          );
        })}

        {/* handrail moving left (dashoffset) */}
        {(() => {
          const a = at(0, -RAIL - 22);
          const b = at(len, -RAIL - 22);
          return (
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={INK}
              strokeWidth={10}
              strokeDasharray="30 22"
              strokeDashoffset={-f * 3.4}
              strokeLinecap="round"
            />
          );
        })()}

        {/* left arrow sign (drawn arrows: DIN subset has no ← glyph) */}
        <g transform="translate(1500 170) rotate(-4)">
          <rect width={300} height={110} rx={10} fill="#F2B705" stroke={INK} strokeWidth={4} />
          {[0, 1].map((k) => (
            <g key={k} transform={`translate(${64 + k * 118} 55)`}>
              <line x1={-34} y1={0} x2={26} y2={0} stroke={INK} strokeWidth={13} strokeLinecap="round" />
              <path d="M24 -22 L56 0 L24 22 Z" fill={INK} />
            </g>
          ))}
        </g>
        <g transform="translate(170 150)">
          <rect width={280} height={92} rx={10} fill="#FDFBF4" stroke={INK} strokeWidth={3} />
          <text x={104} y={64} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={44} fill={INK} letterSpacing={4}>
            3F
          </text>
          <g transform="translate(198 48)">
            <line x1={0} y1={20} x2={0} y2={-12} stroke={INK} strokeWidth={9} strokeLinecap="round" />
            <path d="M-13 -8 L0 -28 L13 -8 Z" fill={INK} />
          </g>
        </g>
      </svg>
    </div>
  );
};
