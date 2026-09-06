import React from "react";
import { interpolate } from "remotion";
import { INK } from "../design";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { FloorBadge } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const COLS = 8;
const ROWS = 5;

export const LastLights: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const switchF = localFrame(lineAt(50).startMs, page.startMs, fps);
  const lastFlip = interpolate(f, [switchF, switchF + 12], [0, 1], {
    ...clamp,
  });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* the facade seen through the night glass */}
        <rect x={330} y={110} width={1260} height={860} fill="#08120F" stroke="#1E3A35" strokeWidth={5} />
        {Array.from({ length: COLS }, (_, c) =>
          Array.from({ length: ROWS }, (_, r) => {
            const isLast = c === 5 && r === 2;
            const off = 14 + c * 26 + r * 3;
            const lit = isLast
              ? 1
              : interpolate(f, [off, off + 9], [1, 0.05], { ...clamp });
            return (
              <rect
                key={`${c}-${r}`}
                x={392 + c * 142}
                y={170 + r * 152}
                width={104}
                height={116}
                fill="#F2C94C"
                opacity={lit * 0.85}
                stroke="#1E3A35"
                strokeWidth={3}
              />
            );
          }),
        )}

        {/* moon */}
        <circle cx={1720} cy={160} r={54} fill="#EDE6CF" opacity={0.85} />
        <circle cx={1744} cy={146} r={44} fill="#0C211E" />

        {/* switch panel flipping the last one off fails — the light stays */}
        <g transform="translate(120 760)">
          <rect width={180} height={240} rx={12} fill="#171310" stroke={INK} strokeWidth={4} />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={30} y={30 + r * 70} width={120} height={44} rx={8} fill="#3C5850" />
          ))}
          <g style={{ rotate: `${lastFlip * -18}deg`, transformOrigin: "90px 190px" }}>
            <rect x={60} y={168} width={60} height={44} rx={8} fill="#F2C94C" />
          </g>
        </g>
        <text x={210} y={1052} fontFamily={FONT_NUM} fontWeight={700} fontSize={24} fill="#3C5850" letterSpacing={5}>
          POWER SAVING MODE
        </text>
      </svg>
    </div>
  );
};
