import React from "react";
import { INK } from "../design";
import { Figure, FloorBadge } from "../Kit";
import type { Page } from "../types";

export const MirrorHall: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => {
  const walkX = 260 + Math.min(1, f / 260) * 560;
  const bob = Math.abs(Math.sin((f / 11) * Math.PI)) * 8;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* receding arches */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const t = i / 5;
          const w = 1500 - t * 1150;
          const h = 840 - t * 600;
          const x = 1150 - w / 2 + t * 210;
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
            />
          );
        })}
        {/* vanishing glow */}
        <circle cx={1260} cy={520} r={26} fill="#F2C94C" opacity={0.5 + 0.5 * Math.sin((f / 60) * Math.PI * 2)} />

        {/* walking figure */}
        <g transform={`translate(${walkX} ${880 - bob})`}>
          <ellipse cy={62} rx={90} ry={13} fill="rgba(27,23,18,0.16)" />
          <Figure h={210} fill="#171310" step={f / 11} />
        </g>

        {/* floor line */}
        <line x1={0} y1={942} x2={1920} y2={942} stroke={INK} strokeWidth={4} />
      </svg>
    </div>
  );
};
