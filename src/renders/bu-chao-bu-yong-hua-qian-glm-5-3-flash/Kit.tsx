import React from "react";
import { Easing, interpolate } from "remotion";
import { INK, MILK, hardShadow, nightShadow } from "./design";
import { FONT_BODY, FONT_IMPACT, FONT_NUM } from "./fonts";
import type { Page } from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---- HUD: 楼层灯箱 ---------------------------------------------------------

export const FloorBadge: React.FC<{ page: Page; f: number }> = ({
  page,
  f,
}) => {
  const enter = interpolate(f, [0, 12], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const closing = page.floor === "闭店";
  return (
    <div
      style={{
        position: "absolute",
        left: 64,
        top: 52,
        zIndex: 10,
        opacity: enter,
        translate: `${(1 - enter) * -14}px 0`,
        display: "flex",
        alignItems: "stretch",
        background: page.night ? "#0B1413" : "#171310",
        border: `2px solid ${page.night ? "rgba(247,244,234,0.28)" : INK}`,
        boxShadow: page.night ? nightShadow(5, 0.55) : hardShadow(5),
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "10px 18px 12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span
          style={{
            fontFamily: /^[0-9A-Za-z]+$/.test(page.floor) ? FONT_NUM : FONT_IMPACT,
            fontWeight: 700,
            fontSize: 42,
            lineHeight: 1,
            color: closing ? "#FF7A5C" : "#F2B705",
            letterSpacing: 1,
          }}
        >
          {page.floor}
        </span>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 19,
            color: MILK,
            letterSpacing: 4,
            paddingBottom: 2,
          }}
        >
          {page.dept}
        </span>
      </div>
      {closing ? (
        <div style={{ width: 10, background: "#E23A2E" }} />
      ) : null}
    </div>
  );
};

// ---- shapes ----------------------------------------------------------------

export const TagPlate: React.FC<{
  w: number;
  h: number;
  fill: string;
  stroke?: string;
  rx?: number;
}> = ({ w, h, fill, stroke = INK, rx = 12 }) => (
  <>
    <path
      d={`M${rx} 0 H${w} V${h} H${rx} Q0 ${h} 0 ${h - rx} V${rx} Q0 0 ${rx} 0 Z`}
      fill={fill}
      stroke={stroke}
      strokeWidth={3}
    />
    <circle cx={22} cy={h / 2} r={7} fill="none" stroke={stroke} strokeWidth={3} />
  </>
);

export const Coin: React.FC<{ r: number; fill?: string; edge?: string }> = ({
  r,
  fill = "#F2B705",
  edge = "#8A6400",
}) => (
  <>
    <circle r={r} fill={fill} stroke={edge} strokeWidth={r * 0.16} />
    <rect
      x={-r * 0.28}
      y={-r * 0.28}
      width={r * 0.56}
      height={r * 0.56}
      fill={edge}
      opacity={0.85}
      rx={2}
    />
  </>
);

export const Bulb: React.FC<{ r: number; on: number; glass?: string }> = ({
  r,
  on,
  glass = "#E8E2D2",
}) => (
  <>
    {on > 0.05
      ? Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const r1 = r * 1.35;
          const r2 = r * (1.65 + on * 0.35);
          return (
            <line
              key={i}
              x1={Math.cos(a) * r1}
              y1={Math.sin(a) * r1}
              x2={Math.cos(a) * r2}
              y2={Math.sin(a) * r2}
              stroke="#F2B705"
              strokeWidth={r * 0.1}
              strokeLinecap="round"
              opacity={on}
            />
          );
        })
      : null}
    <path
      d={`M${-r * 0.55} ${r * 0.7} A${r} ${r} 0 1 1 ${r * 0.55} ${r * 0.7} Z`}
      fill={on > 0.05 ? "#F2B705" : glass}
      stroke={INK}
      strokeWidth={3}
      opacity={0.25 + on * 0.75}
    />
    <rect
      x={-r * 0.32}
      y={r * 0.66}
      width={r * 0.64}
      height={r * 0.42}
      fill="#9A927E"
      stroke={INK}
      strokeWidth={3}
    />
  </>
);

export const Apple: React.FC<{ r: number; fill?: string }> = ({
  r,
  fill = "#E23A2E",
}) => (
  <>
    <path
      d={`M0 ${-r * 0.7} C ${r * 0.9} ${-r * 1.5} ${r * 1.45} ${-r * 0.2} ${r * 0.72} ${r * 0.75} C ${r * 0.3} ${r * 1.25} ${-r * 0.3} ${r * 1.25} ${-r * 0.72} ${r * 0.75} C ${-r * 1.45} ${-r * 0.2} ${-r * 0.9} ${-r * 1.5} 0 ${-r * 0.7} Z`}
      fill={fill}
      stroke={INK}
      strokeWidth={3}
    />
    <path
      d={`M0 ${-r * 0.75} Q ${r * 0.1} ${-r * 1.25} ${r * 0.35} ${-r * 1.4}`}
      stroke="#5B4426"
      strokeWidth={r * 0.14}
      fill="none"
      strokeLinecap="round"
    />
    <path
      d={`M${r * 0.3} ${-r * 1.3} Q ${r * 0.9} ${-r * 1.55} ${r * 1.05} ${-r * 1.15} Q ${r * 0.6} ${-r * 0.95} ${r * 0.3} ${-r * 1.3} Z`}
      fill="#3E7C4F"
    />
  </>
);

export const GiftBox: React.FC<{
  w: number;
  h: number;
  fill: string;
  ribbon: string;
  open: number;
}> = ({ w, h, fill, ribbon, open }) => (
  <>
    <rect
      x={-w / 2}
      y={-h / 2}
      width={w}
      height={h}
      fill={fill}
      stroke={INK}
      strokeWidth={3}
    />
    <rect
      x={-w * 0.09}
      y={-h / 2}
      width={w * 0.18}
      height={h}
      fill={ribbon}
      stroke={INK}
      strokeWidth={2}
    />
    <g
      style={{
        rotate: `${open * -78}deg`,
        translate: `0 ${(1 - open) * 0}px`,
        transformOrigin: "left bottom",
      }}
    >
      <rect
        x={-w / 2 - 2}
        y={-h * 0.78}
        width={w + 4}
        height={h * 0.26}
        fill={fill}
        stroke={INK}
        strokeWidth={3}
      />
      <rect
        x={-w * 0.09 - 2}
        y={-h * 0.78}
        width={w * 0.18 + 4}
        height={h * 0.26}
        fill={ribbon}
        stroke={INK}
        strokeWidth={2}
      />
    </g>
  </>
);

export const TeeShirt: React.FC<{ w: number; fill: string }> = ({
  w,
  fill,
}) => {
  const h = w * 1.05;
  return (
    <path
      d={`M${-w * 0.32} ${-h * 0.5} L${-w * 0.5} ${-h * 0.28} L${-w * 0.34} ${h * 0.06} L${-w * 0.22} ${-h * 0.02} L${-w * 0.22} ${h * 0.5} L${w * 0.22} ${h * 0.5} L${w * 0.22} ${-h * 0.02} L${w * 0.34} ${h * 0.06} L${w * 0.5} ${-h * 0.28} L${w * 0.32} ${-h * 0.5} Q${w * 0.14} ${-h * 0.38} 0 ${-h * 0.38} Q${-w * 0.14} ${-h * 0.38} ${-w * 0.32} ${-h * 0.5} Z`}
      fill={fill}
      stroke={INK}
      strokeWidth={3}
    />
  );
};

export const HangerHook: React.FC<{ color?: string }> = ({
  color = INK,
}) => (
  <path
    d="M0 -26 Q0 -44 14 -44 Q26 -44 26 -32"
    stroke={color}
    strokeWidth={4}
    fill="none"
    strokeLinecap="round"
  />
);

export const SofaShape: React.FC<{
  w: number;
  h: number;
  fill: string;
  legColor?: string;
}> = ({ w, h, fill, legColor = INK }) => {
  const arm = w * 0.14;
  return (
    <>
      <rect
        x={0}
        y={h * 0.18}
        width={w}
        height={h * 0.52}
        rx={14}
        fill={fill}
        stroke={INK}
        strokeWidth={3}
      />
      <rect
        x={0}
        y={0}
        width={arm}
        height={h * 0.7}
        rx={12}
        fill={fill}
        stroke={INK}
        strokeWidth={3}
      />
      <rect
        x={w - arm}
        y={0}
        width={arm}
        height={h * 0.7}
        rx={12}
        fill={fill}
        stroke={INK}
        strokeWidth={3}
      />
      <rect
        x={arm}
        y={h * 0.18}
        width={w - arm * 2}
        height={h * 0.34}
        rx={10}
        fill="#FFFFFF22"
        stroke={INK}
        strokeWidth={2}
      />
      <rect x={arm * 0.3} y={h * 0.7} width={14} height={h * 0.22} fill={legColor} />
      <rect
        x={w - arm * 0.3 - 14}
        y={h * 0.7}
        width={14}
        height={h * 0.22}
        fill={legColor}
      />
    </>
  );
};

export const ToyBear: React.FC<{ h: number; fill: string }> = ({ h, fill }) => {
  const u = h / 10;
  return (
    <>
      <circle cx={-u * 1.4} cy={-u * 3.4} r={u * 0.9} fill={fill} stroke={INK} strokeWidth={2.4} />
      <circle cx={u * 1.4} cy={-u * 3.4} r={u * 0.9} fill={fill} stroke={INK} strokeWidth={2.4} />
      <rect x={-u * 1.7} y={-u * 3.0} width={u * 3.4} height={u * 2.6} rx={u * 0.9} fill={fill} stroke={INK} strokeWidth={2.4} />
      <circle cx={-u * 0.55} cy={-u * 2.0} r={u * 0.28} fill={INK} />
      <circle cx={u * 0.55} cy={-u * 2.0} r={u * 0.28} fill={INK} />
      <rect x={-u * 1.5} y={-u * 0.4} width={u * 3} height={u * 3.4} rx={u * 0.5} fill={fill} stroke={INK} strokeWidth={2.4} />
      <rect x={-u * 2.5} y={-u * 0.2} width={u * 1} height={u * 2.8} rx={u * 0.4} fill={fill} stroke={INK} strokeWidth={2.2} />
      <rect x={u * 1.5} y={-u * 0.2} width={u * 1} height={u * 2.8} rx={u * 0.4} fill={fill} stroke={INK} strokeWidth={2.2} />
      <rect x={-u * 1.4} y={u * 3.0} width={u * 1.1} height={u * 1.4} rx={u * 0.3} fill={fill} stroke={INK} strokeWidth={2.2} />
      <rect x={u * 0.3} y={u * 3.0} width={u * 1.1} height={u * 1.4} rx={u * 0.3} fill={fill} stroke={INK} strokeWidth={2.2} />
    </>
  );
};

export const Chick: React.FC<{ h: number }> = ({ h }) => {
  const r = h * 0.32;
  return (
    <>
      <circle cy={-r * 0.2} r={r} fill="#F2C94C" stroke={INK} strokeWidth={2.6} />
      <circle cx={r * 0.55} cy={-r * 1.05} r={r * 0.62} fill="#F2C94C" stroke={INK} strokeWidth={2.4} />
      <path
        d={`M${r * 1.1} ${-r * 1.05} L${r * 1.7} ${-r * 0.92} L${r * 1.1} ${-r * 0.78} Z`}
        fill="#FF7A1A"
        stroke={INK}
        strokeWidth={2}
      />
      <circle cx={r * 0.72} cy={-r * 1.18} r={r * 0.12} fill={INK} />
      <path d={`M${-r * 0.4} ${r * 0.72} L${-r * 0.4} ${r * 1.25}`} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
      <path d={`M${r * 0.3} ${r * 0.72} L${r * 0.3} ${r * 1.25}`} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
    </>
  );
};

export const Awning: React.FC<{ w: number; h: number; c1: string; c2: string }> = ({
  w,
  h,
  c1,
  c2,
}) => {
  const stripes = Math.max(4, Math.round(w / 64));
  const sw = w / stripes;
  return (
    <>
      {Array.from({ length: stripes }, (_, i) => (
        <path
          key={i}
          d={`M${i * sw} 0 H${(i + 1) * sw} V${h - 14} Q${(i + 0.5) * sw} ${h + 10} ${i * sw} ${h - 14} Z`}
          fill={i % 2 === 0 ? c1 : c2}
          stroke={INK}
          strokeWidth={2}
        />
      ))}
    </>
  );
};

export const Pennant: React.FC<{
  w: number;
  h: number;
  fill: string;
  sway: number;
}> = ({ w, h, fill, sway }) => (
  <path
    d={`M0 0 Q ${w * 0.5} ${h * 0.18 + sway * 10} ${w} ${sway * 16} L ${w * 0.98} ${sway * 16 + h * 0.35} Q ${w * 0.5} ${h * 0.62 + sway * 10} 0 ${h * 0.42} Z`}
    fill={fill}
    stroke={INK}
    strokeWidth={2.6}
  />
);

export const Figure: React.FC<{ h: number; fill: string; step: number }> = ({
  h,
  fill,
  step,
}) => {
  const u = h / 10;
  const legSwing = Math.sin(step) * u * 0.9;
  return (
    <>
      <circle cy={-h * 0.5} r={u * 1.15} fill={fill} />
      <path
        d={`M${-u * 0.9} ${-h * 0.28} H${u * 0.9} L${u * 0.7} ${h * 0.12} H${-u * 0.7} Z`}
        fill={fill}
      />
      <path
        d={`M${-u * 0.45} ${h * 0.1} L${-u * 0.45 - legSwing} ${h * 0.5} L${-u * 0.05 - legSwing} ${h * 0.5} L${-u * 0.1} ${h * 0.1} Z`}
        fill={fill}
      />
      <path
        d={`M${u * 0.45} ${h * 0.1} L${u * 0.45 + legSwing} ${h * 0.5} L${u * 0.05 + legSwing} ${h * 0.5} L${u * 0.1} ${h * 0.1} Z`}
        fill={fill}
      />
    </>
  );
};

export const SpeakerHorn: React.FC<{ s: number; fill: string }> = ({
  s,
  fill,
}) => (
  <>
    <rect x={-s * 0.12} y={-s} width={s * 0.24} height={s * 0.5} fill={INK} />
    <path
      d={`M${-s * 0.12} ${-s * 0.5} L${-s * 0.55} ${s * 0.25} L${s * 0.55} ${s * 0.25} L${s * 0.12} ${-s * 0.5} Z`}
      fill={fill}
      stroke={INK}
      strokeWidth={3}
    />
    <ellipse cy={s * 0.25} rx={s * 0.55} ry={s * 0.14} fill={INK} opacity={0.85} />
  </>
);

export const SpotCone: React.FC<{
  w: number;
  h: number;
  color: string;
  opacity: number;
}> = ({ w, h, color, opacity }) => (
  <path
    d={`M${-w * 0.12} 0 L${w * 0.12} 0 L${w / 2} ${h} L${-w / 2} ${h} Z`}
    fill={color}
    opacity={opacity}
  />
);

export const StreetLamp: React.FC<{ h: number; fill: string }> = ({
  h,
  fill,
}) => (
  <>
    <rect x={-h * 0.03} y={-h} width={h * 0.06} height={h} fill={fill} />
    <path
      d={`M${-h * 0.03} ${-h} Q ${h * 0.16} ${-h * 1.06} ${h * 0.3} ${-h * 0.98}`}
      stroke={fill}
      strokeWidth={h * 0.05}
      fill="none"
    />
    <path
      d={`M${h * 0.18} ${-h * 1.02} L${h * 0.42} ${-h * 1.02} L${h * 0.36} ${-h * 0.9} L${h * 0.24} ${-h * 0.9} Z`}
      fill="#F2C94C"
      stroke={INK}
      strokeWidth={2.5}
    />
  </>
);

export const Ripple: React.FC<{ p: number; maxR: number; color: string }> = ({
  p,
  maxR,
  color,
}) =>
  p <= 0 || p >= 1 ? null : (
    <>
      {[0, 0.35, 0.7].map((offset) => {
        const pp = Math.min(1, Math.max(0, p * 1.6 - offset));
        if (pp <= 0 || pp >= 1) return null;
        return (
          <circle
            key={offset}
            r={8 + pp * maxR}
            fill="none"
            stroke={color}
            strokeWidth={3 * (1 - pp)}
            opacity={0.65 * (1 - pp)}
          />
        );
      })}
    </>
  );

export const SignBoard: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  border?: string;
  children: React.ReactNode;
}> = ({ x, y, w, h, fill, border = INK, children }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect
      x={5}
      y={5}
      width={w}
      height={h}
      rx={8}
      fill="rgba(27,23,18,0.18)"
    />
    <rect
      x={0}
      y={0}
      width={w}
      height={h}
      rx={8}
      fill={fill}
      stroke={border}
      strokeWidth={3}
    />
    {children}
  </g>
);
