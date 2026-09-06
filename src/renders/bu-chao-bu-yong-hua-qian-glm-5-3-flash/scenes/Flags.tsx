import React from "react";
import { INK } from "../design";
import { FloorBadge, Pennant } from "../Kit";
import type { Page } from "../types";

const POLES = [
  { x: 190, h: 640 },
  { x: 430, h: 780 },
  { x: 680, h: 560 },
  { x: 930, h: 820 },
  { x: 1180, h: 600 },
  { x: 1430, h: 760 },
  { x: 1680, h: 540 },
];
const FLAG_COLORS = ["#E23A2E", "#F7F4EA", "#F2B705", "#E23A2E", "#F7F4EA", "#F2B705", "#E23A2E"];

export const Flags: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => (
  <div style={{ position: "absolute", inset: 0 }}>
    <FloorBadge page={page} f={f} />
    <svg
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <rect width={1920} height={1080} fill={page.field} />

      {POLES.map((pole, i) => {
        const sway = Math.sin((f / 46 + i * 0.9) * Math.PI * 2);
        return (
          <g key={i}>
            <line x1={pole.x} y1={1020} x2={pole.x} y2={1020 - pole.h} stroke={INK} strokeWidth={9} strokeLinecap="round" />
            <g transform={`translate(${pole.x + 4} ${1020 - pole.h + 10})`}>
              <g style={{ rotate: `${sway * 3}deg`, transformOrigin: "0px 0px" }}>
                <Pennant w={240} h={150} fill={FLAG_COLORS[i]} sway={sway} />
              </g>
            </g>
            {i % 2 === 0 ? (
              <g transform={`translate(${pole.x + 4} ${1020 - pole.h + 210})`}>
                <g style={{ rotate: `${-sway * 2.4}deg`, transformOrigin: "0px 0px" }}>
                  <Pennant w={190} h={118} fill={FLAG_COLORS[(i + 3) % FLAG_COLORS.length]} sway={-sway * 0.8} />
                </g>
              </g>
            ) : null}
          </g>
        );
      })}

      <rect x={0} y={1018} width={1920} height={62} fill="#E4D6C2" stroke={INK} strokeWidth={3} />
    </svg>
  </div>
);
