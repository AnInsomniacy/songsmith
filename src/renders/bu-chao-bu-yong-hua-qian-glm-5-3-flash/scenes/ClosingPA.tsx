import React from "react";
import { Easing, interpolate } from "remotion";
import { INK } from "../design";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { FloorBadge, SpeakerHorn } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const ClosingPA: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const paF = localFrame(lineAt(39).startMs, page.startMs, fps);
  const hornDrop = interpolate(f, [6, 44], [-320, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const lampOn = interpolate(f, [paF, paF + 10], [0, 1], { ...clamp });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* ceiling lights dimming out one by one */}
        {[0, 1, 2, 3, 4].map((i) => {
          const off = interpolate(f, [30 + i * 62, 48 + i * 62], [1, 0.12], { ...clamp });
          const x = 260 + i * 350;
          return (
            <g key={i}>
              <line x1={x} y1={0} x2={x} y2={92} stroke={INK} strokeWidth={4} />
              <ellipse cx={x} cy={104} rx={74} ry={18} fill="#F2C94C" opacity={off * 0.9} />
              <ellipse cx={x} cy={950} rx={150} ry={26} fill="#F2C94C" opacity={off * 0.1} />
            </g>
          );
        })}

        {/* PA horn descending */}
        <g transform={`translate(960 ${hornDrop})`}>
          <line x1={0} y1={-320} x2={0} y2={-96} stroke={INK} strokeWidth={5} />
          <g transform="translate(0 0) rotate(12)">
            <SpeakerHorn s={120} fill="#C9A227" />
          </g>
        </g>

        {/* red broadcast lamp */}
        <g transform="translate(1210 330)">
          <circle r={40} fill="#171310" stroke={INK} strokeWidth={3} />
          <circle r={26} fill="#E23A2E" opacity={0.18 + lampOn * 0.82} />
        </g>

        {/* darkened atrium floor */}
        <rect x={0} y={918} width={1920} height={162} fill="#10191D" stroke={INK} strokeWidth={3} />
        <text x={1700} y={986} textAnchor="end" fontFamily={FONT_NUM} fontWeight={700} fontSize={40} fill="#5C6E68" letterSpacing={8}>
          CLOSING 22:00
        </text>

        {/* bench silhouette */}
        <g transform="translate(420 940)" opacity={0.85}>
          <rect x={0} y={0} width={330} height={22} rx={6} fill={INK} />
          <rect x={14} y={-46} width={22} height={46} fill={INK} />
          <rect x={294} y={-46} width={22} height={46} fill={INK} />
          <rect x={0} y={-52} width={330} height={12} rx={4} fill={INK} />
        </g>
      </svg>
    </div>
  );
};
