import React from "react";
import { Easing, interpolate } from "remotion";
import { INK } from "../design";
import { FONT_BODY, FONT_NUM } from "../fonts";
import { FloorBadge } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const BannerDown: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => {
  const drop = interpolate(f, [8, 58], [-420, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const sway = Math.sin((f / 150) * Math.PI * 2) * 0.8;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* dark atrium */}
        <rect x={0} y={0} width={1920} height={140} fill="#0B1F1B" />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={140 + i * 320} y={0} width={180} height={120} fill="#11221F" stroke="#23413C" strokeWidth={3} opacity={0.8} />
        ))}

        {/* ladder + bucket silhouettes */}
        <g transform="translate(1480 420)" opacity={0.9}>
          <line x1={0} y1={0} x2={90} y2={620} stroke={INK} strokeWidth={12} />
          <line x1={120} y1={0} x2={210} y2={620} stroke={INK} strokeWidth={12} />
          {Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1={10 + i * 13} y1={80 + i * 74} x2={128 + i * 13} y2={80 + i * 74} stroke={INK} strokeWidth={9} />
          ))}
          <path d="M-90 560 h120 l-14 66 h-92 Z" fill="#C9A227" stroke={INK} strokeWidth={3} />
        </g>

        {/* the banner descending */}
        <g transform={`translate(360 ${330 + drop}) rotate(${sway})`}>
          <line x1={60} y1={-330} x2={60} y2={0} stroke={INK} strokeWidth={5} />
          <line x1={1140} y1={-330} x2={1140} y2={0} stroke={INK} strokeWidth={5} />
          <rect width={1200} height={190} rx={10} fill="#B3271E" stroke={INK} strokeWidth={5} />
          <text x={600} y={104} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={78} fill="#FFF6E8" letterSpacing={22}>
            THANK YOU
          </text>
          <text x={600} y={158} textAnchor="middle" fontFamily={FONT_BODY} fontSize={34} fill="#FFD9A0" letterSpacing={16}>
            感谢光临 · 明天见
          </text>
        </g>

        {/* floor */}
        <rect x={0} y={1002} width={1920} height={80} fill="#0A1614" />
      </svg>
    </div>
  );
};
