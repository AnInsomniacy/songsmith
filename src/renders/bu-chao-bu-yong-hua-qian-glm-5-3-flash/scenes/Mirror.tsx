import React from "react";
import { Easing, interpolate } from "remotion";
import { INK, hardShadow } from "../design";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { FloorBadge } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Mirror: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const sway = Math.sin((f / 110) * Math.PI * 2) * 0.014;
  const seeFrame = localFrame(lineAt(1).characters[2].startMs, page.startMs, fps);
  const arm = interpolate(f, [seeFrame, seeFrame + 18], [0, 1], {
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

        {/* rug */}
        <ellipse cx={1430} cy={952} rx={420} ry={34} fill="#D8E4DC" stroke={INK} strokeWidth={2.5} />

        {/* curtain drape */}
        <path
          d="M980 140 Q 1060 320 1010 520 Q 1090 380 1120 200 Z"
          fill="#0F5E5C"
          opacity={0.9}
          stroke={INK}
          strokeWidth={3}
        />

        {/* mirror */}
        <g
          style={{
            translate: `${1430 + sway * 40}px 580px`,
            scale: `${(1 + sway).toFixed(4)} 1`,
            transformOrigin: "center",
          }}
        >
          <g transform={`translate(-240 -360)`}>
            <rect x={10} y={12} width={480} height={720} rx={230} fill="rgba(27,23,18,0.15)" />
            <rect x={0} y={0} width={480} height={720} rx={230} fill="#DCEBE3" stroke={INK} strokeWidth={8} />
            <clipPath id={`${page.id}-glass`}>
              <rect x={7} y={7} width={466} height={706} rx={226} />
            </clipPath>
            <g clipPath={`url(#${page.id}-glass)`}>
              {/* reflection figure */}
              <g transform={`translate(240 640)`}>
                <circle cy={-215} r={44} fill="#B9CFC4" />
                <path d={`M-52 -160 H52 L40 -20 H-40 Z`} fill="#B9CFC4" />
                <path d={`M-34 -16 L-46 60 H-14 Z`} fill="#B9CFC4" />
                <path d={`M34 -16 L46 60 H14 Z`} fill="#B9CFC4" />
                <g
                  style={{
                    rotate: `${arm * -95}deg`,
                    transformOrigin: "36px -150px",
                  }}
                >
                  <rect x={30} y={-150} width={18} height={120} rx={9} fill="#B9CFC4" />
                </g>
                <ellipse cy={64} rx={92} ry={12} fill="rgba(27,23,18,0.12)" />
              </g>
              <path d="M60 120 L200 640" stroke="#FFFFFF" strokeWidth={40} opacity={0.16} />
              <path d="M150 90 L260 480" stroke="#FFFFFF" strokeWidth={18} opacity={0.12} />
            </g>
          </g>
        </g>

        {/* stool */}
        <g transform={`translate(1120 880)`}>
          <rect x={-70} y={-16} width={140} height={22} rx={11} fill="#E23A2E" stroke={INK} strokeWidth={3} />
          <rect x={-52} y={6} width={12} height={70} fill={INK} />
          <rect x={40} y={6} width={12} height={70} fill={INK} />
        </g>

        {/* NEW tag on mirror frame */}
        <g transform={`translate(1662 300) rotate(10)`}>
          <rect width={110} height={54} rx={8} fill="#F2B705" stroke={INK} strokeWidth={3} style={{ boxShadow: hardShadow(4) }} />
          <text x={55} y={38} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={28} fill={INK} letterSpacing={3}>
            NEW
          </text>
        </g>
      </svg>
    </div>
  );
};
