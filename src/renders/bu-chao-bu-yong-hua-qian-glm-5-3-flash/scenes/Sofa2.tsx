import React from "react";
import { Easing, interpolate } from "remotion";
import { INK } from "../design";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { Chick, FloorBadge, SofaShape, ToyBear } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Sofa2: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const chipsF = localFrame(lineAt(32).startMs, page.startMs, fps);
  const bagTip = interpolate(f, [chipsF, chipsF + 18], [0, -64], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const sway = Math.sin((f / 120) * Math.PI * 2) * 1.1;

  const chips = Array.from({ length: 12 }, (_, i) => {
    const p = Math.min(1, Math.max(0, (f - chipsF - 10 - i * 4) / 60));
    const x = 1520 + Math.sin(i * 2.4) * 150 + p * 40;
    const y = 430 + p * p * 430;
    return { x, y, p, rot: i * 47 + p * 220 };
  });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* low-angle big sofa */}
        <g transform={`translate(140 640) rotate(${sway})`} style={{ transformOrigin: "960px 800px" }}>
          <SofaShape w={1640} h={420} fill="#0B4B49" />
          {/* seated toys from the previous shot */}
          <g transform="translate(340 250)">
            <Chick h={120} />
          </g>
          <g transform="translate(760 230)">
            <ToyBear h={150} fill="#C9A227" />
          </g>
          <g transform="translate(1120 250)">
            <ToyBear h={112} fill="#FF7A1A" />
          </g>
          <g transform="translate(1390 240)">
            <Chick h={92} />
          </g>
        </g>

        {/* chips bag tipping on the armrest */}
        <g transform={`translate(1560 520) rotate(${bagTip})`}>
          <rect x={-70} y={-90} width={140} height={190} rx={12} fill="#E23A2E" stroke={INK} strokeWidth={4} />
          <rect x={-70} y={-90} width={140} height={44} rx={12} fill="#F2B705" stroke={INK} strokeWidth={3} />
          <text y={70} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={26} fill="#FFF6E8" letterSpacing={2}>
            CHIPS
          </text>
        </g>

        {/* chips raining */}
        {chips.map((c, i) =>
          c.p > 0 && c.p < 1 ? (
            <rect
              key={i}
              x={c.x}
              y={c.y}
              width={26}
              height={16}
              rx={4}
              fill="#F2C94C"
              stroke={INK}
              strokeWidth={2}
              style={{ rotate: `${c.rot}deg`, transformOrigin: `${c.x}px ${c.y}px` }}
            />
          ) : c.p >= 1 ? (
            <rect
              key={i}
              x={c.x}
              y={1000}
              width={26}
              height={12}
              rx={4}
              fill="#F2C94C"
              stroke={INK}
              strokeWidth={2}
              style={{ rotate: `${i * 53}deg`, transformOrigin: `${c.x}px 1006px` }}
            />
          ) : null,
        )}

        {/* floor */}
        <rect x={0} y={1002} width={1920} height={80} fill="#D8CDB4" stroke={INK} strokeWidth={3} />
      </svg>
    </div>
  );
};
