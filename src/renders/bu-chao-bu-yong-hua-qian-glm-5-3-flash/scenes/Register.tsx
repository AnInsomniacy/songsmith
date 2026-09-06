import React from "react";
import { Easing, interpolate } from "remotion";
import { INK } from "../design";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { Coin, FloorBadge } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Register: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const kouMs = lineAt(14).characters.find((u) => u.text.includes("扣"))?.startMs
    ?? lineAt(14).startMs;
  const f0 = localFrame(kouMs, page.startMs, fps);
  const drawer = interpolate(f, [f0, f0 + 26], [0, 300], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const coins = [0, 1, 2, 3, 4].map((i) => {
    const cf = f0 + 20 + i * 6;
    const p = Math.min(1, Math.max(0, (f - cf) / 44));
    const x = 700 + i * 120 + p * 220;
    const y = 780 - Math.sin(p * Math.PI) * 170 + p * 110;
    return { x, y, p, r: 30 - (i % 2) * 6 };
  });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* register body */}
        <ellipse cx={560} cy={952} rx={420} ry={24} fill="rgba(27,23,18,0.14)" />
        <rect x={330} y={470} width={470} height={330} rx={14} fill="#0F5E5C" stroke={INK} strokeWidth={4} />
        <rect x={370} y={506} width={220} height={110} rx={8} fill="#101B1A" stroke={INK} strokeWidth={3} />
        <text x={480} y={578} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={52} fill="#F2C94C">
          ¥-99
        </text>
        {Array.from({ length: 2 }, (_, r) =>
          Array.from({ length: 4 }, (_, c) => (
            <rect
              key={`${r}-${c}`}
              x={620 + c * 44}
              y={510 + r * 52}
              width={36}
              height={40}
              rx={6}
              fill={r === 0 && c === 0 ? "#F2B705" : "#FDFBF4"}
              stroke={INK}
              strokeWidth={2.5}
            />
          )),
        )}
        <rect x={430} y={796} width={470} height={22} fill={INK} />

        {/* drawer */}
        <g transform={`translate(${drawer} 0)`}>
          <rect x={430} y={818} width={440} height={110} rx={8} fill="#C9A227" stroke={INK} strokeWidth={4} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={452 + i * 102} y={838} width={88} height={26} rx={4} fill="#F2B705" stroke={INK} strokeWidth={2.5} />
          ))}
        </g>

        {/* coins bouncing out */}
        {coins.map((c, i) =>
          c.p > 0 && c.p < 1 ? (
            <g key={i} transform={`translate(${c.x} ${c.y})`}>
              <g style={{ rotate: `${f * 8 + i * 40}deg` }}>
                <Coin r={c.r} />
              </g>
            </g>
          ) : c.p >= 1 ? (
            <g key={i} transform={`translate(${c.x} ${890})`}>
              <Coin r={c.r} />
            </g>
          ) : null,
        )}

        {/* counter */}
        <line x1={140} y1={950} x2={1780} y2={950} stroke={INK} strokeWidth={4} />
      </svg>
    </div>
  );
};
