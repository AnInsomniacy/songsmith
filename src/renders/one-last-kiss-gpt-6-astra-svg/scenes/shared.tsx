import type { ReactNode } from "react";
import { C, type SceneProps } from "../design";
export function World({ p, children }: { p: SceneProps; children: ReactNode }) {
  const { id, shot } = p;
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={shot.light ? "#D2DFDF" : C.night} />
          <stop offset=".55" stopColor={shot.light ? "#E9E9DC" : "#39475E"} />
          <stop offset="1" stopColor={shot.light ? "#BDCACC" : "#5B526B"} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" x2="1">
          <stop stopColor={C.glass} stopOpacity=".12" />
          <stop offset=".5" stopColor={C.white} stopOpacity=".3" />
          <stop offset="1" stopColor={C.glass} stopOpacity=".06" />
        </linearGradient>
        <linearGradient id={`${id}-light`} x1="0" x2="1">
          <stop stopColor={C.sun} stopOpacity=".02" />
          <stop offset="1" stopColor={C.sun} stopOpacity=".65" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor={C.sun} stopOpacity=".6" />
          <stop offset="1" stopColor={C.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={shot.light ? "#B3C7CA" : "#243D50"} />
          <stop offset="1" stopColor={shot.light ? "#E9DBC6" : "#172D46"} />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill={`url(#${id}-sky)`} />
      {children}
    </g>
  );
}
export function Gear({
  x,
  y,
  r,
  angle,
  color = C.glass,
}: {
  x: number;
  y: number;
  r: number;
  angle: number;
  color?: string;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${angle})`}
      fill="none"
      stroke={color}
    >
      <circle r={r - 12} strokeWidth="14" />
      {Array.from({ length: 24 }, (_, i) => (
        <path
          key={i}
          transform={`rotate(${i * 15})`}
          d={`M-5 ${-r + 4}v-16h10v16`}
          strokeWidth="6"
        />
      ))}
      <circle r={r * 0.22} strokeWidth="8" />
      {Array.from({ length: 6 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${r * 0.25}V${r - 22}`}
          transform={`rotate(${i * 60})`}
          strokeWidth="10"
        />
      ))}
    </g>
  );
}
