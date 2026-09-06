import React from "react";
import { Easing, interpolate } from "remotion";
import { INK, MILK } from "../design";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { FloorBadge, Ripple } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const ShopWindow: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const knocks = lineAt(12)
    .characters.map((u, i) => ({ u, i }))
    .filter(({ u }) => u.text.includes("叩"))
    .map(({ u }) => localFrame(u.startMs, page.startMs, fps));

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* glass wall */}
        <rect x={140} y={130} width={1640} height={740} fill="#4C8A7E" stroke={INK} strokeWidth={5} />
        <rect x={140} y={130} width={1640} height={740} fill="#FFFFFF" opacity={0.05} />
        {[
          { x: 420, w: 130, o: 0.13 },
          { x: 900, w: 70, o: 0.09 },
          { x: 1310, w: 170, o: 0.1 },
        ].map((s, i) => (
          <rect
            key={i}
            x={s.x + Math.sin((f / 240) * Math.PI * 2 + i) * 18}
            y={90}
            width={s.w}
            height={860}
            fill="#FFFFFF"
            opacity={s.o}
            style={{ rotate: "14deg", transformOrigin: `${s.x}px 500px` }}
          />
        ))}

        {/* mannequin */}
        <g transform={`translate(1180 620)`}>
          <ellipse cy={300} rx={150} ry={18} fill="rgba(0,0,0,0.25)" />
          <circle cy={-210} r={40} fill={MILK} opacity={0.92} />
          <path d="M-48 -160 H48 L38 40 H-38 Z" fill={MILK} opacity={0.92} />
          <rect x={-8} y={40} width={16} height={250} fill={INK} opacity={0.85} />
          <path d="M-60 290 H60 L46 312 H-46 Z" fill={INK} opacity={0.85} />
        </g>

        {/* pedestal with handbag */}
        <g transform="translate(560 700)">
          <rect x={-130} y={120} width={260} height={150} fill="#D8D2C0" stroke={INK} strokeWidth={3} />
          <path d="M-60 120 V40 Q-60 -10 0 -10 Q60 -10 60 40 V120" stroke={INK} strokeWidth={6} fill="none" />
          <rect x={-70} y={10} width={140} height={110} rx={12} fill="#B3271E" stroke={INK} strokeWidth={3} />
        </g>

        {/* SALE tag on glass */}
        <g transform="translate(760 250) rotate(9)">
          <rect width={170} height={80} rx={8} fill="#F2B705" stroke={INK} strokeWidth={4} />
          <text x={85} y={56} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={44} fill={INK} letterSpacing={2}>
            SALE
          </text>
        </g>

        {/* knock ripples at the exact syllables */}
        {knocks.map((kf, i) => (
          <g key={i} transform={`translate(${430 + i * 70} 560)`}>
            <Ripple p={(f - kf) / 22} maxR={130} color={MILK} />
          </g>
        ))}

        {/* reflection sweep (once at start, dusk falling) */}
        <rect
          x={140}
          y={130}
          width={1640}
          height={740}
          fill="#0B2B28"
          opacity={interpolate(f, [0, 26], [0.12, 0.34], { ...clamp, easing: Easing.bezier(0.4, 0, 0.2, 1) })}
        />
      </svg>
    </div>
  );
};
