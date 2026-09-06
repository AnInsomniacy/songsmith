import React from "react";
import { Easing, interpolate } from "remotion";
import { INK, MILK } from "../design";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { Figure, FloorBadge } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const AutoDoor: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const knockF = localFrame(lineAt(24).characters[6].startMs, page.startMs, fps);
  const shut = localFrame(lineAt(25).characters[9].startMs, page.startMs, fps);
  const open1 = interpolate(f, [knockF, knockF + 22], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const close = interpolate(f, [shut, shut + 26], [0, 1], { ...clamp, easing: Easing.bezier(0.5, 0, 0.7, 0.2) });
  const open = Math.max(0, open1 - close);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* facade around door */}
        <rect x={140} y={110} width={1640} height={860} fill="#2E6459" stroke={INK} strokeWidth={5} />
        <rect x={620} y={140} width={680} height={790} fill="#142E2A" stroke={INK} strokeWidth={5} />
        {/* interior glow */}
        <rect x={632} y={152} width={656} height={766} fill="#F2C94C" opacity={0.08 + open * 0.1} />

        {/* sliding panels */}
        {[-1, 1].map((side) => (
          <rect
            key={side}
            x={side === -1 ? 632 - open * 316 : 968 + open * 316}
            y={152}
            width={316}
            height={766}
            fill="#7FB5A8"
            opacity={0.92}
            stroke={INK}
            strokeWidth={4}
          />
        ))}
        {[-1, 1].map((side) => (
          <rect
            key={`s${side}`}
            x={side === -1 ? 632 : 968}
            y={152}
            width={316}
            height={766}
            fill="#5E9B8C"
            opacity={1 - open}
            stroke={INK}
            strokeWidth={4}
          />
        ))}

        {/* people passing when open */}
        {[0, 1, 2].map((i) => {
          const p = (((f * 1.6 + i * 500) % 1700) + 1700) % 1700;
          const x = 640 + p * 0.62;
          const visible = open > 0.4 && p > 60 && p < 1640;
          if (!visible) return null;
          return (
            <g key={i} transform={`translate(${x} 760)`} opacity={Math.min(1, open * 1.4)}>
              <Figure h={170} fill="#0B1F1B" step={f / 8 + i} />
            </g>
          );
        })}

        {/* sensor + label */}
        <rect x={938} y={168} width={44} height={14} rx={7} fill="#E23A2E" opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 14))} />
        <g transform="translate(700 952)">
          <rect width={520} height={64} rx={8} fill={MILK} stroke={INK} strokeWidth={3} />
          <text x={260} y={44} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={32} fill={INK} letterSpacing={8}>
            AUTO DOOR
          </text>
        </g>
      </svg>
    </div>
  );
};
