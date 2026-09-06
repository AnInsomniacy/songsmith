import React from "react";
import { Easing, interpolate } from "remotion";
import { INK } from "../design";
import { FONT_BODY, FONT_NUM } from "../fonts";
import { FloorBadge } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const FLOOR_SIGNS = ["2F", "3F", "4F", "5F"];

export const Atrium: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => {
  // stage 1: the statement lands; stage 2: the camera rides the escalator
  const rise = Math.max(0, f - 190) * 0.42;
  const shaftSway = Math.sin((f / 210) * Math.PI * 2) * 26;
  const stepOffset = (f * 2.2) % 96;
  const plaque = interpolate(f, [6, 24], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* skylight (slowest layer) */}
        <g transform={`translate(0 ${rise * 0.25})`}>
          <rect x={360} y={-160} width={1200} height={360} fill="#E8E0C8" stroke={INK} strokeWidth={3} opacity={0.9} />
          {Array.from({ length: 5 }, (_, i) => (
            <line key={i} x1={360 + i * 300} y1={-160} x2={360 + i * 300} y2={200} stroke={INK} strokeWidth={4} />
          ))}
          <line x1={360} y1={20} x2={1560} y2={20} stroke={INK} strokeWidth={4} />
        </g>
        <path
          d={`M${760 + shaftSway} 0 L${980 + shaftSway} 0 L${1420} 1080 L${640} 1080 Z`}
          fill="#F2C94C"
          opacity={0.12}
        />

        {/* side wall floor signs passing (fastest layer, wrapped) */}
        {FLOOR_SIGNS.map((label, i) => {
          const base = 140 + i * 330;
          const y = (((base + rise * 1.4) % 1320) + 1320) % 1320 - 160;
          return (
            <g key={label} transform={`translate(120 ${y})`}>
              <rect width={240} height={140} rx={12} fill="#FDFBF4" stroke={INK} strokeWidth={4} />
              <text x={120} y={102} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={86} fill={INK}>
                {label}
              </text>
            </g>
          );
        })}

        {/* escalator rising mid-ground */}
        <g transform={`translate(0 ${rise * 0.8})`}>
          <line x1={980} y1={1120} x2={1720} y2={320} stroke="#0F5E5C" strokeWidth={64} strokeLinecap="round" />
          {Array.from({ length: 14 }, (_, i) => {
            const t = (i * 96 + stepOffset) / 1400;
            const x = 980 + (1720 - 980) * t;
            const y = 1120 + (320 - 1120) * t;
            return (
              <line key={i} x1={x - 74} y1={y + 34} x2={x + 74} y2={y - 34} stroke="#C9BFA4" strokeWidth={22} strokeLinecap="round" />
            );
          })}
        </g>

        {/* marble floor */}
        <g transform={`translate(0 ${rise})`}>
          <rect x={0} y={880} width={1920} height={600} fill="#E4DCC6" stroke={INK} strokeWidth={3} />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={i * 260 - 100} y1={880} x2={i * 260 - 260} y2={1480} stroke="rgba(27,23,18,0.18)" strokeWidth={3} />
          ))}
        </g>

        {/* the statement: 非卖品 plaque */}
        <g opacity={plaque} transform={`translate(1450 ${430 - (1 - plaque) * 20})`}>
          <rect width={330} height={120} rx={10} fill="#173430" stroke={INK} strokeWidth={4} />
          <rect x={8} y={8} width={314} height={104} rx={6} fill="none" stroke="rgba(247,244,234,0.5)" strokeWidth={1.5} />
          <text x={165} y={62} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={26} fill="#F2C94C" letterSpacing={3}>
            NOT FOR SALE
          </text>
          <text x={165} y={102} textAnchor="middle" fontFamily={FONT_BODY} fontSize={24} fill="#F7F4EA" letterSpacing={6}>
            非卖品
          </text>
        </g>
      </svg>
    </div>
  );
};
