import React from "react";
import { Easing, interpolate } from "remotion";
import { INK, MILK } from "../design";
import { FONT_NUM } from "../fonts";
import { FloorBadge } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SLATS = 9;
const SLAT_H = 92;
const TOP = 168;

export const Shutter: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => {
  const fallFor = (i: number): number =>
    interpolate(f, [26 + i * 50, 40 + i * 50], [-SLAT_H, 0], {
      ...clamp,
      easing: Easing.bezier(0.6, 0, 0.9, 0.4),
    });
  const behind = interpolate(f, [26, 26 + SLATS * 50], [1, 0.12], { ...clamp });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* storefront glass behind, dimming as it gets covered */}
        <rect x={300} y={TOP} width={1320} height={SLATS * SLAT_H + 40} fill="#1E3A38" stroke={INK} strokeWidth={5} />
        <rect x={312} y={TOP + 12} width={1296} height={SLATS * SLAT_H + 16} fill="#F2C94C" opacity={0.14 * behind} />
        <g opacity={behind} transform="translate(700 520)">
          <rect width={520} height={200} rx={10} fill="#0F5E5C" stroke={INK} strokeWidth={4} />
          <text x={260} y={92} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={54} fill={MILK} letterSpacing={6}>
            OPEN
          </text>
          <text x={260} y={152} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={30} fill="#F2C94C" letterSpacing={4}>
            09:30 - 22:00
          </text>
        </g>

        {/* rolling slats */}
        <rect x={288} y={TOP - 44} width={1344} height={46} fill="#171310" stroke={INK} strokeWidth={4} />
        {Array.from({ length: SLATS }, (_, i) => {
          const dy = fallFor(i);
          if (dy >= SLAT_H * 1.2) return null;
          const y = TOP + i * SLAT_H + dy - SLAT_H;
          if (y + SLAT_H < TOP - 20) return null;
          const isLast = i === SLATS - 1;
          return (
            <g key={i} transform={`translate(300 ${Math.max(TOP - SLAT_H, y)})`}>
              <rect width={1320} height={SLAT_H} rx={6} fill="#C9C2B0" stroke={INK} strokeWidth={3} />
              <rect x={0} y={SLAT_H - 14} width={1320} height={6} fill="rgba(27,23,18,0.35)" />
              {isLast && dy > -8 ? (
                <text x={660} y={SLAT_H / 2 + 16} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={44} fill={INK} letterSpacing={14}>
                  CLOSING
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
