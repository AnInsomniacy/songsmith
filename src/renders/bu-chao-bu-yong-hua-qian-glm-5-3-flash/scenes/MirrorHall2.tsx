import React from "react";
import { interpolate } from "remotion";
import { INK } from "../design";
import { lineAt, localFrame } from "../lyrics";
import { Figure, FloorBadge } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const MirrorHall2: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const stopF = localFrame(lineAt(37).startMs, page.startMs, fps);
  const walkX = 260 + Math.min(1, stopF / 240) * 560;
  const hat = interpolate(f, [stopF + 8, stopF + 26, stopF + 44], [0, -1, 0], {
    ...clamp,
  });
  const waveF = stopF + 42;
  const wave = interpolate(f, [waveF, waveF + 16, waveF + 48, waveF + 62], [0, 1, 1, 0], {
    ...clamp,
  });
  const breathe = Math.sin((f / 130) * Math.PI * 2) * 0.012;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* arches shifted left, bigger */}
        {[0, 1, 2, 3, 4].map((i) => {
          const t = i / 4;
          const w = 1750 - t * 1250;
          const h = 900 - t * 640;
          const x = 620 - w / 2 + t * 150;
          const y = 940 - h;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              rx={w / 2}
              fill={i % 2 === 0 ? "#EDE7D8" : "#DCE7E0"}
              stroke={INK}
              strokeWidth={4 - t * 2}
              opacity={1 - breathe * (i % 2 === 0 ? 1 : -1) * 30}
            />
          );
        })}

        {/* figure stops and tips the hat */}
        <g transform={`translate(${walkX} 880)`}>
          <ellipse cy={62} rx={90} ry={13} fill="rgba(27,23,18,0.16)" />
          <Figure h={210} fill="#171310" step={0} />
          <g style={{ rotate: `${hat * -36}deg`, transformOrigin: "0px -105px" }}>
            <rect x={-34} y={-124} width={68} height={16} rx={6} fill="#171310" />
          </g>
        </g>

        {/* the reflection waves back */}
        <g transform={`translate(${1520 - (walkX - 260)} 880) scale(-1 1)`}>
          <Figure h={210} fill="#8FA69B" step={0} />
          <g style={{ rotate: `${wave * 128}deg`, transformOrigin: "36px -80px" }}>
            <rect x={30} y={-80} width={16} height={110} rx={8} fill="#8FA69B" />
          </g>
        </g>

        <line x1={0} y1={942} x2={1920} y2={942} stroke={INK} strokeWidth={4} />
      </svg>
    </div>
  );
};
