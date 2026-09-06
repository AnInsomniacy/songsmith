import React from "react";
import { Easing, interpolate } from "remotion";
import { INK, hardShadow } from "../design";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { FloorBadge, GiftBox, SpotCone } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Jewelry: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const beats = lineAt(6)
    .characters.slice(0, 4)
    .map((u) => localFrame(u.startMs, page.startMs, fps));
  const openAt = (i: number): number =>
    interpolate(f, [beats[i], beats[i] + 14], [0, 1], {
      ...clamp,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
  const glowAt = (i: number): number =>
    interpolate(f, [beats[i] + 6, beats[i] + 30, beats[i] + 70], [0, 1, 0.25], {
      ...clamp,
    });
  const sweep = Math.sin((f / 150) * Math.PI * 2);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* sweeping spotlights */}
        <g transform={`translate(${700 + sweep * 60} 0) rotate(${sweep * 8})`} style={{ transformOrigin: "700px 0px" }}>
          <SpotCone w={460} h={760} color="#F2C94C" opacity={0.14} />
        </g>
        <g transform={`translate(${1220 - sweep * 60} 0) rotate(${-sweep * 8})`} style={{ transformOrigin: "1220px 0px" }}>
          <SpotCone w={460} h={760} color="#F2C94C" opacity={0.14} />
        </g>

        {/* counter */}
        <rect x={430} y={718} width={1120} height={190} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        <rect x={430} y={718} width={1120} height={190} fill="#BFE0D8" opacity={0.28} />
        <rect x={404} y={906} width={1172} height={30} fill={INK} />
        {Array.from({ length: 3 }, (_, i) => (
          <g key={i} transform={`translate(${560 + i * 300} 810)`}>
            <circle r={44} fill="none" stroke="#C9A227" strokeWidth={12} />
            <path d="M0 -44 L14 -22 L-14 -22 Z" fill="#E23A2E" stroke={INK} strokeWidth={2} />
          </g>
        ))}
        <path d="M1450 810 Q 1520 740 1590 810" stroke="#C9A227" strokeWidth={9} fill="none" />
        <circle cx={1520} cy={742} r={13} fill="#E23A2E" stroke={INK} strokeWidth={2.5} />

        {/* gift boxes popping open on the beats */}
        {[0, 1, 2, 3].map((i) => {
          const open = openAt(i);
          const glow = glowAt(i);
          const bx = 640 + i * 240;
          return (
            <g key={i}>
              <ellipse cx={bx} cy={726} rx={110} ry={16} fill="#F2B705" opacity={glow * 0.5} />
              <g transform={`translate(${bx} 712)`}>
                <GiftBox w={130} h={110} fill={i % 2 === 0 ? "#E23A2E" : "#F2B705"} ribbon={MILK_CONST} open={open} />
              </g>
            </g>
          );
        })}

        {/* price plate */}
        <g transform="translate(430 960)">
          <rect width={360} height={70} rx={8} fill="#FDFBF4" stroke={INK} strokeWidth={3} style={{ boxShadow: hardShadow(5) }} />
          <text x={180} y={47} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={34} fill={INK} letterSpacing={4}>
            ¥ 9999+
          </text>
        </g>
      </svg>
    </div>
  );
};

const MILK_CONST = "#F7F4EA";
