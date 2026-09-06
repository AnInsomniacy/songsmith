import React from "react";
import { Easing, interpolate } from "remotion";
import { INK } from "../design";
import { FONT_NUM } from "../fonts";
import { Coin, FloorBadge } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Gacha: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => {
  const coinIn = interpolate(f, [10, 46, 58], [140, 1005, 1005], {
    ...clamp,
    easing: Easing.bezier(0.3, 0, 0.4, 1),
  });
  const coinY =
    f < 46
      ? 906 - Math.abs(Math.sin((f / 46) * Math.PI * 3)) * 26
      : interpolate(f, [46, 58], [880, 806], { ...clamp, easing: Easing.bezier(0.5, 0, 0.8, 0.4) });
  const shiver =
    f > 58 && f < 96 ? Math.sin(f * 1.7) * (1 - (f - 58) / 38) * 4 : 0;
  const crank = f > 58 ? Math.min(1, (f - 58) / 30) : 0;

  const capsules = [0, 1, 2, 3, 4].map((i) => ({
    a: (f / 90) * Math.PI * 2 + (i * Math.PI * 2) / 5,
    r: 86,
    color: ["#E23A2E", "#F2B705", "#0F5E5C", "#FF7A1A", "#F7F4EA"][i],
  }));

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* machine */}
        <g transform={`translate(${1490 + shiver} 0)`}>
          <ellipse cx={0} cy={942} rx={230} ry={22} fill="rgba(27,23,18,0.15)" />
          <rect x={-190} y={430} width={380} height={500} rx={16} fill="#E23A2E" stroke={INK} strokeWidth={4} />
          <path d="M-190 430 A190 190 0 0 1 190 430 Z" fill="#BFE0D8" stroke={INK} strokeWidth={4} opacity={0.9} />
          {capsules.map((c, i) => (
            <g key={i} transform={`translate(${Math.cos(c.a) * c.r * 0.62} ${510 + Math.sin(c.a) * c.r * 0.4})`}>
              <circle r={34} fill={c.color} stroke={INK} strokeWidth={3} />
            </g>
          ))}
          <rect x={-34} y={560} width={68} height={92} rx={8} fill="#171310" />
          <circle cy={606} r={20} fill="#F2B705" stroke={INK} strokeWidth={3} style={{ rotate: `${crank * 240}deg`, transformOrigin: "0px 606px" }} />
          <rect x={-130} y={700} width={260} height={60} rx={8} fill="#FDFBF4" stroke={INK} strokeWidth={3} />
          <text y={742} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={36} fill={INK} letterSpacing={2}>
            1 COIN
          </text>
          <rect x={-90} y={880} width={180} height={44} rx={6} fill="#171310" />
        </g>

        {/* rolling coin */}
        <g transform={`translate(${coinIn} ${coinY})`}>
          <g style={{ rotate: `${f * 7}deg` }}>
            <Coin r={34} />
          </g>
        </g>

        {/* ground line */}
        <line x1={120} y1={948} x2={1240} y2={948} stroke={INK} strokeWidth={4} />

        {/* capsule tray output */}
        <g transform={`translate(1150 900)`}>
          <circle r={30} fill="#F2B705" stroke={INK} strokeWidth={3} opacity={f > 120 ? 1 : 0} />
        </g>
      </svg>
    </div>
  );
};
