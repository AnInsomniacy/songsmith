import { noise2D } from "@remotion/noise";
import React from "react";
import type { PagePalette, SceneKind } from "../types";
export const W = 1920;

export const H = 1080;

export const wave = (t: number, period: number, phase = 0) =>
  Math.sin(((t + phase) / period) * Math.PI * 2);

export const orbit = (t: number, period: number, radius: number, phase = 0) =>
  Math.cos(((t + phase) / period) * Math.PI * 2) * radius;

export const pingPong = (t: number, period: number, phase = 0) =>
  (1 - Math.cos(((t + phase) / period) * Math.PI * 2)) / 2;

export const smooth = (value: number) => {
  const x = Math.max(0, Math.min(1, value));
  return x * x * (3 - 2 * x);
};

export type SceneProps = {
  t: number;
  localMs: number;
  cue: number;
  cue2: number;
  entry: number;
  progress: number;
  p: PagePalette;
  id: string;
  index: number;
  scene: SceneKind;
};

export type AtmosphereKind =
  | "sprocket"
  | "halation"
  | "silver"
  | "wash"
  | "scan"
  | "frame"
  | "shards";

export type AtmosphereSpec = {
  kind: AtmosphereKind;
  angle: number;
  density: number;
  speed: number;
  phase: number;
};

export const ATMOSPHERES: Record<SceneKind, AtmosphereSpec> = {
  "temperament-shutter": {
    kind: "scan",
    angle: -8,
    density: 7,
    speed: 13,
    phase: 0.4,
  },
  "fragments-vault": {
    kind: "shards",
    angle: 12,
    density: 8,
    speed: 15,
    phase: 1.2,
  },
  "patience-thread": {
    kind: "sprocket",
    angle: 4,
    density: 11,
    speed: 12,
    phase: 2.1,
  },
  "dark-light-exposure": {
    kind: "halation",
    angle: -14,
    density: 5,
    speed: 17,
    phase: 0.8,
  },
  "shared-contact-sheet": {
    kind: "frame",
    angle: 3,
    density: 5,
    speed: 19,
    phase: 1.6,
  },
  "romance-emulsion": {
    kind: "wash",
    angle: -6,
    density: 7,
    speed: 14,
    phase: 2.7,
  },
  "farewell-listen": {
    kind: "frame",
    angle: 9,
    density: 4,
    speed: 16,
    phase: 0.2,
  },
  "color-proof": { kind: "scan", angle: 16, density: 6, speed: 11, phase: 1.9 },
  "dandelion-first": {
    kind: "silver",
    angle: -10,
    density: 18,
    speed: 18,
    phase: 2.5,
  },
  "memory-control": {
    kind: "shards",
    angle: 5,
    density: 7,
    speed: 13,
    phase: 0.7,
  },
  "water-listen": { kind: "wash", angle: 2, density: 8, speed: 15, phase: 1.4 },
  "departure-platform": {
    kind: "scan",
    angle: -4,
    density: 9,
    speed: 20,
    phase: 2.2,
  },
  "inertia-drawer": {
    kind: "frame",
    angle: 11,
    density: 4,
    speed: 17,
    phase: 0.5,
  },
  "ideal-exposure": {
    kind: "halation",
    angle: -16,
    density: 6,
    speed: 14,
    phase: 1.7,
  },
  "shared-index": {
    kind: "shards",
    angle: 7,
    density: 9,
    speed: 18,
    phase: 2.8,
  },
  "romance-negative": {
    kind: "sprocket",
    angle: -5,
    density: 13,
    speed: 12,
    phase: 0.9,
  },
  "promise-replay": {
    kind: "scan",
    angle: 13,
    density: 7,
    speed: 16,
    phase: 1.3,
  },
  "spectrum-stain": {
    kind: "wash",
    angle: -11,
    density: 9,
    speed: 19,
    phase: 2.4,
  },
  "dandelion-reverse": {
    kind: "silver",
    angle: 6,
    density: 22,
    speed: 14,
    phase: 0.3,
  },
  "memory-transfer": {
    kind: "frame",
    angle: -3,
    density: 6,
    speed: 21,
    phase: 1.8,
  },
  "water-ceiling": {
    kind: "wash",
    angle: 15,
    density: 10,
    speed: 13,
    phase: 2.6,
  },
  "farewell-dock": {
    kind: "scan",
    angle: -9,
    density: 8,
    speed: 18,
    phase: 0.6,
  },
  "dandelion-field": {
    kind: "silver",
    angle: 3,
    density: 26,
    speed: 16,
    phase: 1.5,
  },
  "memory-peel": {
    kind: "shards",
    angle: -13,
    density: 10,
    speed: 20,
    phase: 2.3,
  },
  "water-ground": {
    kind: "wash",
    angle: 8,
    density: 11,
    speed: 15,
    phase: 0.1,
  },
  "last-empty-frame": {
    kind: "frame",
    angle: -2,
    density: 7,
    speed: 24,
    phase: 1.1,
  },
};

export const BaseField: React.FC<SceneProps> = ({ t, p, id, index }) => {
  const gradientId = `${id}-base-gradient`;
  const glowId = `${id}-base-glow`;
  const reverse = index % 2 === 1;
  return (
    <>
      <defs>
        <linearGradient
          id={gradientId}
          x1={reverse ? "1" : "0"}
          y1={index % 3 === 0 ? "1" : "0"}
          x2={reverse ? "0" : "1"}
          y2={index % 3 === 0 ? "0" : "1"}
        >
          <stop offset="0" stopColor={p.background} />
          <stop offset="1" stopColor={p.backgroundAlt} />
        </linearGradient>
        <radialGradient
          id={glowId}
          cx={`${58 + (index % 4) * 8 + wave(t, 16 + (index % 5), index * 0.17) * 9}%`}
          cy={`${28 + (index % 3) * 9 + wave(t, 20 + (index % 7), index * 0.11) * 8}%`}
          r="64%"
        >
          <stop offset="0" stopColor={p.light} stopOpacity="0.16" />
          <stop offset="1" stopColor={p.backgroundAlt} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${gradientId})`} />
      <rect width={W} height={H} fill={`url(#${glowId})`} />
    </>
  );
};

export const Atmosphere: React.FC<SceneProps> = ({
  t,
  cue,
  cue2,
  entry,
  p,
  id,
  scene,
}) => {
  const spec = ATMOSPHERES[scene];
  const drift = wave(t, spec.speed, spec.phase);
  const cross = wave(t, spec.speed * 1.37, spec.phase + 1.4);
  const atmosphereOpacity = entry * (0.18 + cue2 * 0.08);

  if (spec.kind === "sprocket") {
    return (
      <g
        opacity={atmosphereOpacity}
        transform={`rotate(${spec.angle} 960 540)`}
      >
        {Array.from({ length: spec.density }, (_, index) => (
          <React.Fragment key={index}>
            <rect
              x={-40 + index * (2040 / spec.density) + drift * 28}
              y="54"
              width="72"
              height="34"
              rx="5"
              fill={p.light}
            />
            <rect
              x={20 + index * (2040 / spec.density) - drift * 22}
              y="992"
              width="72"
              height="34"
              rx="5"
              fill={p.accent}
            />
          </React.Fragment>
        ))}
      </g>
    );
  }

  if (spec.kind === "halation") {
    return (
      <g opacity={atmosphereOpacity}>
        {Array.from({ length: spec.density }, (_, index) => (
          <circle
            key={index}
            cx={1080 + index * 155 + drift * (20 + index * 3)}
            cy={180 + (index % 3) * 300 + cross * (26 + index * 2)}
            r={120 + index * 52 + cue * 24}
            fill="none"
            stroke={index % 2 ? p.accent : p.light}
            strokeWidth={7 + (index % 3) * 4}
          />
        ))}
      </g>
    );
  }

  if (spec.kind === "silver") {
    return (
      <g
        opacity={atmosphereOpacity}
        transform={`rotate(${spec.angle} 1480 520)`}
      >
        {Array.from({ length: spec.density }, (_, index) => {
          const x = 960 + ((index * 137 + spec.phase * 90) % 970);
          const y = 70 + ((index * 211 + spec.phase * 130) % 930);
          const noise = noise2D(id, index * 0.23, t * 0.06);
          return (
            <path
              key={index}
              d="M0 -12 L11 -2 L7 13 L-8 15 L-15 1Z"
              fill={index % 4 === 0 ? p.accent : p.light}
              transform={`translate(${x + noise * 35} ${y + drift * (8 + (index % 5) * 4)}) rotate(${index * 37 + cross * 12}) scale(${0.55 + (index % 5) * 0.12})`}
            />
          );
        })}
      </g>
    );
  }

  if (spec.kind === "wash") {
    return (
      <g
        opacity={atmosphereOpacity}
        transform={`rotate(${spec.angle} 1450 540)`}
      >
        {Array.from({ length: spec.density }, (_, index) => (
          <path
            key={index}
            d={`M850 ${80 + index * (940 / spec.density)} C1120 ${40 + index * (1020 / spec.density) + drift * 38} 1480 ${150 + index * (820 / spec.density) - cross * 45} 2040 ${60 + index * (980 / spec.density)}`}
            fill="none"
            stroke={index % 3 === 0 ? p.accent : p.light}
            strokeWidth={8 + (index % 4) * 7}
            strokeLinecap="round"
          />
        ))}
      </g>
    );
  }

  if (spec.kind === "scan") {
    return (
      <g
        opacity={atmosphereOpacity}
        transform={`rotate(${spec.angle} 960 540)`}
      >
        {Array.from({ length: spec.density }, (_, index) => (
          <rect
            key={index}
            x={830 + index * (1120 / spec.density) + drift * (12 + index * 2)}
            y={-120 + cross * 35 * (index % 2 ? 1 : -1)}
            width={36 + (index % 3) * 26}
            height="1320"
            fill={index % 3 === 1 ? p.accent : p.light}
          />
        ))}
      </g>
    );
  }

  if (spec.kind === "shards") {
    return (
      <g
        opacity={atmosphereOpacity}
        transform={`rotate(${spec.angle} 1440 520)`}
      >
        {Array.from({ length: spec.density }, (_, index) => (
          <path
            key={index}
            d="M0 0 L150 -40 L205 90 L42 150Z"
            fill={
              index % 3 === 0
                ? p.accent
                : index % 3 === 1
                  ? p.light
                  : p.secondary
            }
            transform={`translate(${900 + (index % 4) * 270 + drift * (18 + index * 2)} ${100 + Math.floor(index / 4) * 330 + cross * (12 + index)}) scale(${0.5 + (index % 4) * 0.13})`}
          />
        ))}
      </g>
    );
  }

  return (
    <g
      opacity={atmosphereOpacity}
      transform={`rotate(${spec.angle + drift * 0.6} 1450 520)`}
    >
      {Array.from({ length: spec.density }, (_, index) => (
        <rect
          key={index}
          x={960 + index * 48 + drift * index * 3}
          y={90 + index * 42 + cross * index * 2}
          width={820 - index * 96}
          height={850 - index * 84}
          fill="none"
          stroke={index % 2 ? p.accent : p.light}
          strokeWidth={6 + index * 2}
        />
      ))}
    </g>
  );
};

export const FilmMount: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  p: PagePalette;
  image?: string;
  opacity?: number;
  rotate?: number;
}> = ({ x, y, width, height, p, image, opacity = 1, rotate = 0 }) => (
  <g
    transform={`rotate(${rotate} ${x + width / 2} ${y + height / 2})`}
    opacity={opacity}
  >
    <rect x={x} y={y} width={width} height={height} fill={p.surface} />
    <rect
      x={x + width * 0.09}
      y={y + height * 0.1}
      width={width * 0.82}
      height={height * 0.68}
      fill={image ?? p.backgroundAlt}
    />
    <rect
      x={x + width * 0.09}
      y={y + height * 0.82}
      width={width * 0.42}
      height={height * 0.035}
      fill={p.detail}
      opacity="0.7"
    />
  </g>
);

export const FilmStrip: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  p: PagePalette;
  offset?: number;
  rotate?: number;
}> = ({ x, y, width, height, p, offset = 0, rotate = 0 }) => {
  const frameWidth = width / 4.4;
  return (
    <g transform={`rotate(${rotate} ${x + width / 2} ${y + height / 2})`}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="18"
        fill={p.surface}
        opacity="0.78"
      />
      {Array.from({ length: 8 }, (_, index) => (
        <React.Fragment key={index}>
          <rect
            x={x + 24 + index * ((width - 48) / 8)}
            y={y + 16}
            width="34"
            height="18"
            fill={p.background}
          />
          <rect
            x={x + 24 + index * ((width - 48) / 8)}
            y={y + height - 34}
            width="34"
            height="18"
            fill={p.background}
          />
        </React.Fragment>
      ))}
      {Array.from({ length: 4 }, (_, index) => (
        <rect
          key={index}
          x={x + 54 + index * frameWidth + offset}
          y={y + 56}
          width={frameWidth - 24}
          height={height - 112}
          fill={index % 2 ? p.accent : p.backgroundAlt}
          opacity={0.42 + index * 0.08}
        />
      ))}
    </g>
  );
};

export const RippleRings: React.FC<{
  cx: number;
  cy: number;
  p: PagePalette;
  pulse: number;
  count?: number;
}> = ({ cx, cy, p, pulse, count = 6 }) => (
  <g>
    {Array.from({ length: count }, (_, index) => (
      <ellipse
        key={index}
        cx={cx}
        cy={cy}
        rx={90 + index * 86 + pulse * (index % 2 ? 8 : -8)}
        ry={34 + index * 34 + pulse * (index % 2 ? 3 : -3)}
        fill="none"
        stroke={index === 1 ? p.accent : p.light}
        strokeWidth={index === 1 ? 14 : 7}
        opacity={0.62 - index * 0.065}
      />
    ))}
  </g>
);

export const Seed: React.FC<{
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  color: string;
  opacity?: number;
}> = ({ x, y, rotate, scale = 1, color, opacity = 1 }) => (
  <g
    transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
    opacity={opacity}
  >
    <path d="M0 0 C-9 -24 -22 -28 -28 -10 C-14 -10 -6 -5 0 0Z" fill={color} />
    <path d="M0 0 C9 -24 22 -28 28 -10 C14 -10 6 -5 0 0Z" fill={color} />
    <line x1="0" y1="0" x2="0" y2="58" stroke={color} strokeWidth="4" />
  </g>
);

export const Dandelion: React.FC<{
  x: number;
  y: number;
  radius: number;
  p: PagePalette;
  sway: number;
}> = ({ x, y, radius, p, sway }) => (
  <g>
    <path
      d={`M${x} ${y} Q${x - 40 + sway} ${y + 220} ${x + 35} ${y + 470}`}
      fill="none"
      stroke={p.secondary}
      strokeWidth="18"
      opacity="0.7"
    />
    {Array.from({ length: 18 }, (_, index) => {
      const angle = (index / 18) * Math.PI * 2;
      const sx = x + Math.cos(angle) * radius;
      const sy = y + Math.sin(angle) * radius;
      return (
        <g key={index} opacity={0.56 + (index % 3) * 0.12}>
          <line
            x1={x}
            y1={y}
            x2={sx}
            y2={sy}
            stroke={p.light}
            strokeWidth="5"
          />
          <circle
            cx={sx}
            cy={sy}
            r="11"
            fill={index % 4 === 0 ? p.accent : p.light}
          />
        </g>
      );
    })}
    <circle cx={x} cy={y} r="24" fill={p.accent} />
  </g>
);
