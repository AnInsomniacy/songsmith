import React from "react";
import { Easing, interpolate } from "remotion";
import { INK } from "../design";
import { FONT_BODY, FONT_NUM } from "../fonts";
import { FloorBadge, SpotCone } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Wallet: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => {
  const open = interpolate(f, [8, 40], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const flick = Math.sin((f / 130) * Math.PI * 2) * 0.02;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* spotlight */}
        <g style={{ translate: `${Math.sin((f / 170) * Math.PI * 2) * 10}px 0px`, transformOrigin: "760px 0px" }}>
          <SpotCone w={860} h={1020} color="#F2C94C" opacity={0.13 + flick} />
        </g>

        {/* pedestal */}
        <rect x={470} y={920} width={640} height={70} fill="#D8D2C0" stroke={INK} strokeWidth={4} />
        <rect x={520} y={860} width={540} height={64} fill="#C9C2B0" stroke={INK} strokeWidth={4} />

        {/* giant wallet, opening */}
        <g transform={`translate(790 640)`}>
          <ellipse cy={266} rx={360} ry={26} fill="rgba(27,23,18,0.16)" />
          {/* back half */}
          <g style={{ rotate: `${-open * 22}deg`, transformOrigin: "0px 60px" }}>
            <rect x={-320} y={-160} width={640} height={300} rx={26} fill="#8A6400" stroke={INK} strokeWidth={5} />
          </g>
          {/* empty interior */}
          <rect x={-300} y={-140} width={600} height={250} rx={18} fill="#4E3A12" opacity={open} />
          <rect x={-40} y={-90} width={220} height={90} rx={6} fill="#FEFEFB" stroke={INK} strokeWidth={3} opacity={open} style={{ rotate: `${-14 + open * 14}deg` }} />
          {/* front half */}
          <g style={{ rotate: `${open * 10}deg`, transformOrigin: "0px 60px" }}>
            <rect x={-320} y={-140} width={640} height={290} rx={26} fill="#8A6400" stroke={INK} strokeWidth={5} />
            <rect x={-320} y={-60} width={640} height={26} fill={INK} opacity={0.7} />
            <circle cx={250} cy={40} r={16} fill="#C9A227" stroke={INK} strokeWidth={3} />
          </g>
        </g>

        {/* museum label */}
        <g transform="translate(1120 880)">
          <rect width={420} height={110} rx={8} fill="#FDFBF4" stroke={INK} strokeWidth={3} />
          <text x={210} y={48} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={30} fill={INK} letterSpacing={3}>
            EXHIBIT 001
          </text>
          <text x={210} y={88} textAnchor="middle" fontFamily={FONT_BODY} fontSize={24} fill="#8A6400" letterSpacing={5}>
            PRICELESS · 非卖品
          </text>
        </g>
      </svg>
    </div>
  );
};
