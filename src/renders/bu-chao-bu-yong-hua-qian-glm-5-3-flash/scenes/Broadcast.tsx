import React from "react";
import { INK } from "../design";
import { lineAt, localFrame } from "../lyrics";
import { Figure, FloorBadge, SpeakerHorn } from "../Kit";
import type { Page } from "../types";

export const Broadcast: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const beats = lineAt(16)
    .characters.map((u, i) => ({ u, i }))
    .filter(({ u }) => u.text.includes("听"))
    .map(({ u }) => localFrame(u.startMs, page.startMs, fps));

  const turnFor = (x: number): number => {
    let dir = 1;
    let last = -999;
    beats.forEach((b, i) => {
      if (f >= b && b > last && (x / 300 + i) % 2 < 1) {
        dir = i % 2 === 0 ? -1 : 1;
        last = b;
      }
    });
    return dir;
  };

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* PA wall */}
        <rect x={120} y={170} width={640} height={330} fill="#171310" stroke={INK} strokeWidth={4} />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${230 + i * 190} ${280 + (i % 2) * 60})`}>
            <SpeakerHorn s={86} fill="#C9A227" />
          </g>
        ))}

        {/* expanding sound arcs on every 听说 */}
        {beats.map((b, i) => (
          <g key={i} transform={`translate(812 420)`}>
            {[0, 1, 2].map((k) => {
              const p = Math.min(1, Math.max(0, (f - b - k * 5) / 26));
              if (p <= 0 || p >= 1) return null;
              return (
                <path
                  key={k}
                  d={`M${60 + p * 340} ${-150 - p * 90} A ${220 + p * 420} ${220 + p * 420} 0 0 1 ${60 + p * 340} ${150 + p * 90}`}
                  stroke="#0F5E5C"
                  strokeWidth={5 * (1 - p) + 1}
                  fill="none"
                  opacity={0.75 * (1 - p)}
                />
              );
            })}
          </g>
        ))}

        {/* corridor */}
        <rect x={0} y={760} width={1920} height={320} fill="#DCD4BE" stroke={INK} strokeWidth={3} />
        <line x1={0} y1={912} x2={1920} y2={912} stroke="rgba(27,23,18,0.25)" strokeWidth={3} />
        {Array.from({ length: 6 }, (_, i) => {
          const dir = turnFor(i * 300);
          const base = f * (1.4 + (i % 3) * 0.3) * dir + i * 300;
          const x = (((base % 2100) + 2100) % 2100) - 90;
          const bob = Math.abs(Math.sin((f / 9 + i) * Math.PI)) * 7;
          return (
            <g key={i} transform={`translate(${x} ${864 - bob}) scale(${dir} 1)`}>
              <Figure h={96} fill="#171310" step={f / 9 + i} />
            </g>
          );
        })}

        {/* ON-air lamp */}
        <g transform="translate(1560 250)">
          <circle r={46} fill="#171310" stroke={INK} strokeWidth={3} />
          <circle r={30} fill="#E23A2E" opacity={beats.length > 0 ? 0.35 + 0.65 * Math.min(1, Math.max(0, (f - beats[0]) / 10)) : 0.35} />
        </g>
      </svg>
    </div>
  );
};
