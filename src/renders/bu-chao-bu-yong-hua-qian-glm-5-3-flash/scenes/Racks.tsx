import React from "react";
import { Easing, interpolate } from "remotion";
import { INK } from "../design";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { FloorBadge, HangerHook, TeeShirt } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SPACING = 158;

export const Racks: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const refuse = localFrame(lineAt(19).startMs, page.startMs, fps);
  const swing = interpolate(f, [refuse, refuse + 20, refuse + 44], [0, -26, 0], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.4, 0.5, 1),
  });
  const sway = Math.sin((f / 100) * Math.PI * 2) * 3;
  const offset = -((f * 1.05) % (SPACING * 4));
  const shirts = Array.from({ length: 16 }, (_, i) => i);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* rail */}
        <rect x={80} y={252} width={1780} height={16} rx={8} fill={INK} />
        {[160, 960, 1760].map((x) => (
          <rect key={x} x={x - 12} y={268} width={24} height={240} fill={INK} opacity={0.85} />
        ))}

        {/* identical shirts sliding */}
        {shirts.map((i) => {
          const isRed = i === 9;
          if (isRed) return null;
          const x = 120 + i * SPACING + offset;
          const xx = (((x % 2528) + 2528) % 2528) - 300;
          return (
            <g key={i} transform={`translate(${xx} 400)`}>
              <HangerHook />
              <TeeShirt w={104} fill="#EFE9DA" />
            </g>
          );
        })}

        {/* the one that steps out */}
        <g transform={`translate(1150 400)`}>
          <g style={{ rotate: `${swing + sway}deg`, transformOrigin: "0px -40px" }}>
            <HangerHook />
            <TeeShirt w={112} fill="#E23A2E" />
          </g>
        </g>

        {/* base */}
        <rect x={120} y={880} width={1680} height={22} fill={INK} />
        <g transform="translate(1500 960)">
          <rect width={250} height={72} rx={8} fill="#FDFBF4" stroke={INK} strokeWidth={3} />
          <text x={125} y={48} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={34} fill={INK} letterSpacing={2}>
            SAME? NO.
          </text>
        </g>
      </svg>
    </div>
  );
};
