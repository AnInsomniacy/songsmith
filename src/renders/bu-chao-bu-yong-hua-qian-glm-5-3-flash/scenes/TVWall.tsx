import React from "react";
import { INK, scopeId } from "../design";
import { FONT_NUM } from "../fonts";
import { Apple, FloorBadge } from "../Kit";
import type { Page } from "../types";

export const TVWall: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => {
  const COLS = 5;
  const ROWS = 3;
  const cw = 236;
  const ch = 172;
  const dropLoop = (f % 150) / 150;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* wall of screens with a light wave */}
        {Array.from({ length: ROWS }, (_, r) =>
          Array.from({ length: COLS }, (_, c) => {
            const b = 0.42 + 0.58 * Math.max(0, Math.sin((f / 52) * Math.PI * 2 - c * 0.9 - r * 0.5));
            const x = 470 + c * (cw + 26);
            const y = 150 + r * (ch + 30);
            const isCenter = r === 1 && c === 2;
            return (
              <g key={`${r}-${c}`}>
                <rect x={x - 6} y={y - 6} width={cw + 12} height={ch + 12} rx={10} fill={INK} />
                <rect x={x} y={y} width={cw} height={ch} rx={4} fill="#101B1A" />
                {!isCenter ? (
                  <rect x={x} y={y} width={cw} height={ch} rx={4} fill="#F2C94C" opacity={b * 0.5} />
                ) : null}
                {isCenter ? (
                  <g clipPath={`url(#${scopeId(page.id, "tv")})`}>
                    <clipPath id={scopeId(page.id, "tv")}>
                      <rect x={x} y={y} width={cw} height={ch} rx={4} />
                    </clipPath>
                    <rect x={x} y={y} width={cw} height={ch} fill="#DCEBE3" />
                    {(() => {
                      const p = dropLoop;
                      const ay = y + 24 + p * (ch - 90);
                      const fade = p < 0.08 ? p / 0.08 : p > 0.9 ? (1 - p) / 0.1 : 1;
                      return (
                        <g opacity={fade} transform={`translate(${x + cw / 2} ${ay}) scale(${p > 0.86 ? 1.15 : 1} ${p > 0.86 ? 0.8 : 1})`}>
                          <Apple r={38} />
                        </g>
                      );
                    })()}
                    <text x={x + cw / 2} y={y + ch - 14} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={22} fill="#0B4B49" letterSpacing={4}>
                      CH 08
                    </text>
                  </g>
                ) : null}
              </g>
            );
          }),
        )}

        {/* remote on the floor */}
        <g transform="translate(300 900) rotate(-14)">
          <rect width={130} height={260} rx={16} fill="#171310" stroke={INK} strokeWidth={3} />
          <circle cx={65} cy={60} r={22} fill="#E23A2E" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={35} y={110 + i * 44} width={60} height={22} rx={6} fill="#EDE6CF" />
          ))}
        </g>
      </svg>
    </div>
  );
};
