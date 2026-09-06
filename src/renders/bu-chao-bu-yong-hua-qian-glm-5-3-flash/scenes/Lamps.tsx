import React from "react";
import { Easing, interpolate } from "remotion";
import { INK } from "../design";
import { lineAt, localFrame } from "../lyrics";
import { Apple, Bulb, FloorBadge } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Lamps: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const line8 = lineAt(8);
  const sparkMs = line8.characters[2].startMs;
  const sparkFrame = localFrame(sparkMs, page.startMs, fps);
  const appleMs =
    lineAt(9).characters.find((u) => u.text.includes("苹"))?.startMs ??
    lineAt(9).startMs;
  const appleF0 = localFrame(appleMs, page.startMs, fps);

  const cols = 6;
  const rows = 3;
  const bulbOn = (col: number, row: number): number => {
    const f0 = sparkFrame + (col + row * 2) * 7;
    return interpolate(f, [f0, f0 + 8], [0, 1], { ...clamp });
  };

  const fall = interpolate(
    f,
    [appleF0, appleF0 + 26, appleF0 + 34, appleF0 + 46, appleF0 + 52],
    [260, 896, 896, 820, 896],
    { ...clamp, easing: Easing.linear },
  );
  const squash =
    f >= appleF0 + 26 && f < appleF0 + 34
      ? 0.72
      : f >= appleF0 + 40 && f < appleF0 + 48
        ? 0.86
        : 1;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* hanging bulb grid */}
        {Array.from({ length: cols }, (_, col) =>
          Array.from({ length: rows }, (_, row) => {
            const on = bulbOn(col, row);
            const bx = 900 + col * 168;
            const droop = 20 + ((col * 7 + row * 13) % 5) * 9;
            const by = 210 + row * 205 + droop;
            return (
              <g key={`${col}-${row}`}>
                <line x1={bx} y1={0} x2={bx} y2={by - 40} stroke={INK} strokeWidth={3} />
                <g transform={`translate(${bx} ${by + 40})`}>
                  <Bulb r={44} on={on} />
                </g>
              </g>
            );
          }),
        )}

        {/* feature bulb + apple cord */}
        <line x1={1560} y1={0} x2={1560} y2={180} stroke={INK} strokeWidth={4} />
        <g transform="translate(1560 240)">
          <Bulb r={82} on={1} />
        </g>
        <line x1={1560} y1={330} x2={1560} y2={fall - 60} stroke={INK} strokeWidth={3} opacity={fall < 400 ? 1 : 0} />
        <g transform={`translate(1560 ${fall}) scale(1 ${squash})`}>
          <Apple r={52} />
        </g>
        <ellipse cx={1560} cy={912} rx={92} ry={14} fill="rgba(27,23,18,0.16)" opacity={fall > 400 ? 1 : 0} />

        {/* shelf */}
        <rect x={880} y={948} width={980} height={20} fill={INK} />
        <g transform="translate(1000 918)">
          <Bulb r={34} on={1} />
        </g>
        <g transform="translate(1180 918)">
          <Bulb r={34} on={0} />
        </g>
        <g transform="translate(1360 918)">
          <Bulb r={34} on={bulbOn(2, 2)} />
        </g>
      </svg>
    </div>
  );
};
