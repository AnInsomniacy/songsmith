import type { ReactNode } from "react";
import { C, wave, type SceneProps } from "../design";
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
export function Floor({ id, y = 790 }: { id: string; y?: number }) {
  return (
    <>
      <path d={`M0 ${y}H1920V1080H0Z`} fill={`url(#${id}-floor)`} />
      <path d={`M0 ${y}H1920`} stroke={C.glass} opacity=".25" />
    </>
  );
}
export function Frame({
  x,
  y,
  w,
  h,
  id,
  tilt = 0,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
  tilt?: number;
}) {
  return (
    <g transform={`rotate(${tilt} ${x + w / 2} ${y + h / 2})`}>
      <rect
        x={x + 16}
        y={y + 18}
        width={w}
        height={h}
        fill={C.night}
        opacity=".14"
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={C.night}
        stroke={C.sun}
        strokeWidth="3"
      />
      <rect
        x={x + 16}
        y={y + 16}
        width={w - 32}
        height={h - 32}
        fill={`url(#${id}-glass)`}
      />
      <path
        d={`M${x + 24} ${y + h - 25}L${x + w - 24} ${y + 25}`}
        stroke={C.white}
        opacity=".15"
      />
    </g>
  );
}
export function Reeds({
  x,
  y,
  t,
  color = C.glass,
  scale = 1,
}: {
  x: number;
  y: number;
  t: number;
  color?: string;
  scale?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill="none"
      stroke={color}
      strokeWidth="2"
    >
      {Array.from({ length: 9 }, (_, i) => {
        const dx = wave(t, 6 + i * 0.3, i) * 12;
        return (
          <g key={i}>
            <path
              d={`M${i * 22} 0Q${i * 22 + dx - 25} -100 ${i * 22 + dx - 12} ${-180 - (i % 3) * 28}`}
            />
            <path
              d={`M${i * 22 + dx - 16} -120q-65 -48 -38 -70q35 12 38 70`}
              fill={color}
              opacity=".6"
            />
          </g>
        );
      })}
    </g>
  );
}
export function Sea({ id, t, y = 450 }: { id: string; t: number; y?: number }) {
  return (
    <g>
      <path d={`M0 ${y}H1920V1080H0Z`} fill={`url(#${id}-floor)`} />
      {Array.from({ length: 15 }, (_, i) => (
        <path
          key={i}
          d={`M-100 ${y + 20 + i * i * 2}Q380 ${y + i * i * 2 + wave(t, 8, i) * 12} 860 ${y + 20 + i * i * 2}T2020 ${y + 20 + i * i * 2}`}
          stroke={i % 3 === 0 ? C.sun : C.glass}
          strokeWidth={1 + i * 0.12}
          fill="none"
          opacity={0.15 + i * 0.014}
        />
      ))}
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
