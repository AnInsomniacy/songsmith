import React from "react";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { FloorBadge } from "../Kit";
import type { Page } from "../types";

export const StuckDoor: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const flipF = localFrame(lineAt(45).startMs + 120, page.startMs, fps);
  const flip = Math.min(1, Math.max(0, (f - flipF) / 16));
  const sq = Math.abs(Math.cos(flip * Math.PI));
  const blink =
    f < 52
      ? (f > 8 && f < 15) || (f > 24 && f < 31)
        ? 1
        : 0.18
      : 0.85;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* door frame, panels stuck ajar */}
        <rect x={480} y={140} width={960} height={860} fill="#0B1F1B" stroke="#2C4A44" strokeWidth={5} />
        <rect x={492} y={152} width={936} height={836} fill="#F2C94C" opacity={0.05} />
        {[-1, 1].map((side) => (
          <g key={side}>
            <rect
              x={side === -1 ? 492 : 1180}
              y={152}
              width={390}
              height={836}
              fill="#143C36"
              stroke="#2C4A44"
              strokeWidth={4}
            />
            <rect
              x={side === -1 ? 492 + 218 : 1180}
              y={152}
              width={172}
              height={836}
              fill="#0B1F1B"
              stroke="#2C4A44"
              strokeWidth={4}
            />
          </g>
        ))}

        {/* sensor blinking twice then steady */}
        <rect x={938} y={166} width={44} height={14} rx={7} fill="#FF7A1A" opacity={blink} />

        {/* flipping OPEN/CLOSED plate (below the lyric bay) */}
        <g transform="translate(800 640)">
          <rect width={320} height={180} rx={10} fill="#171310" stroke="#2C4A44" strokeWidth={4} />
          <g style={{ scale: `${Math.max(0.02, sq).toFixed(4)} 1`, transformOrigin: "160px 90px" }}>
            {flip < 0.5 ? (
              <>
                <rect x={8} y={8} width={304} height={164} rx={8} fill="#0F5E5C" />
                <text x={160} y={116} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={64} fill="#F7F4EA" letterSpacing={6}>
                  OPEN
                </text>
              </>
            ) : (
              <>
                <rect x={8} y={8} width={304} height={164} rx={8} fill="#8A3A1E" />
                <text x={160} y={116} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={52} fill="#FFD9A0" letterSpacing={4}>
                  CLOSED
                </text>
              </>
            )}
          </g>
        </g>

        {/* wet street */}
        <rect x={0} y={1000} width={1920} height={80} fill="#0A1614" />
        <ellipse cx={960} cy={1002} rx={520} ry={14} fill="#F2C94C" opacity={0.08} />
      </svg>
    </div>
  );
};
