import React from "react";
import { Easing, interpolate } from "remotion";
import { INK, MILK } from "./design";
import { FONT_BODY, FONT_IMPACT, FONT_NUM } from "./fonts";
import { INTRO_CREDITS, INTRO_VOCALISES, SONG_ARTIST } from "./lyrics";
import { Awning, FloorBadge } from "./Kit";
import type { Page } from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const stamp = (f: number, f0: number): number =>
  interpolate(f, [f0, f0 + 14], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const rows: Array<{ label: string; value: string }> = [
  { label: "演唱", value: SONG_ARTIST },
  ...INTRO_CREDITS.map((c) => ({ label: c.label, value: c.value })),
];

export const Prelude: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const signOn = stamp(f, 16);
  const windowOn = (i: number): number => stamp(f, 22 + i * 5);
  const vocalise = INTRO_VOCALISES[0];
  const paEnter = stamp(f, Math.round((12.0 * 1000 * fps) / 1000) - 8);
  const vocalUnits = vocalise
    ? vocalise.characters.filter(
        (u) => f >= Math.round((u.startMs / 1000) * fps),
      )
    : [];

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* facade */}
        <rect x={116} y={236} width={1000} height={650} fill="#F2EDE0" stroke={INK} strokeWidth={3} />
        <rect x={124} y={244} width={1000} height={650} fill="none" stroke="rgba(27,23,18,0.12)" strokeWidth={2} />

        {/* roof sign */}
        <g opacity={0.15 + signOn * 0.85}>
          <rect x={164} y={148} width={898} height={128} fill="#B3271E" stroke={INK} strokeWidth={4} />
          <text
            x={613}
            y={236}
            textAnchor="middle"
            fontFamily={FONT_IMPACT}
            fontSize={82}
            fill="#FFF6E8"
            letterSpacing={8}
          >
            不潮不用花钱
          </text>
        </g>

        {/* windows lighting up */}
        {Array.from({ length: 4 }, (_, col) =>
          Array.from({ length: 3 }, (_, row) => {
            const i = row * 4 + col;
            const on = windowOn(i);
            return (
              <g key={i}>
                <rect
                  x={176 + col * 236}
                  y={306 + row * 178}
                  width={200}
                  height={148}
                  fill="#DDD6C4"
                  stroke={INK}
                  strokeWidth={3}
                />
                <rect
                  x={176 + col * 236}
                  y={306 + row * 178}
                  width={200}
                  height={148}
                  fill="#F2B705"
                  opacity={on * 0.85}
                />
                <line
                  x1={276 + col * 236}
                  y1={306 + row * 178}
                  x2={276 + col * 236}
                  y2={454 + row * 178}
                  stroke={INK}
                  strokeWidth={2}
                />
              </g>
            );
          }),
        )}

        {/* entrance */}
        <g transform="translate(400 760)">
          <Awning w={430} h={54} c1="#E23A2E" c2={MILK} />
        </g>
        <g>
          <circle cx={625} cy={892} r={54} fill="none" stroke={INK} strokeWidth={4} />
          <g style={{ rotate: `${f * 0.55}deg`, transformOrigin: "625px 892px" }}>
            <line x1={571} y1={892} x2={679} y2={892} stroke={INK} strokeWidth={3} />
            <line x1={625} y1={838} x2={625} y2={946} stroke={INK} strokeWidth={3} />
          </g>
        </g>

        {/* directory board = credits */}
        <g>
          <rect x={1222} y={228} width={592} height={636} fill="rgba(27,23,18,0.18)" />
          <rect x={1210} y={216} width={592} height={636} fill="#171310" stroke={INK} strokeWidth={3} />
          <rect x={1232} y={238} width={548} height={86} fill="none" stroke="rgba(247,244,234,0.4)" strokeWidth={2} />
          <text x={1506} y={294} textAnchor="middle" fontFamily={FONT_BODY} fontSize={40} fill={MILK} letterSpacing={10}>
            不潮百货
          </text>
          <text x={1506} y={396} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={20} fill="#F2B705" letterSpacing={6}>
            FLOOR DIRECTORY
          </text>
          {rows.map((row, i) => {
            const enter = stamp(f, 120 + i * 22);
            if (enter <= 0) return null;
            return (
              <g key={row.label + i} opacity={enter} transform={`translate(0 ${(1 - enter) * 14})`}>
                <text x={1258} y={466 + i * 56} fontFamily={FONT_BODY} fontSize={24} fill="#F2B705" letterSpacing={3}>
                  {row.label}
                </text>
                <text x={1400} y={466 + i * 56} fontFamily={FONT_BODY} fontSize={24} fill={MILK} letterSpacing={1}>
                  {row.value}
                </text>
              </g>
            );
          })}
        </g>

        {/* PA strip for vocalise */}
        <g opacity={paEnter}>
          <rect x={640} y={968} width={640} height={76} fill="#101B1A" stroke="#2C3E37" strokeWidth={3} />
          <text x={672} y={1000} fontFamily={FONT_NUM} fontWeight={700} fontSize={17} fill="#8FD6C6" letterSpacing={4}>
            IN-STORE PA
          </text>
          <text x={672} y={1032} fontFamily={FONT_NUM} fontWeight={700} fontSize={26} fill="#EDE6CF" letterSpacing={4}>
            {vocalUnits.map((u) => u.text).join("")}
          </text>
          <circle cx={1246} cy={1006} r={6} fill="#F2C94C" />
        </g>
      </svg>
    </div>
  );
};
