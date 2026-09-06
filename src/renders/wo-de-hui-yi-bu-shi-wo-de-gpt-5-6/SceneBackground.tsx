import { noise2D } from "@remotion/noise";
import React from "react";
import { lyricLines } from "./lyrics";
import { EVOLUTION_CAMERAS, SceneEvolution } from "./SceneEvolution";
import type { LyricPage, PagePalette, SceneKind } from "./types";

const W = 1920;
const H = 1080;
const wave = (t: number, period: number, phase = 0) =>
  Math.sin(((t + phase) / period) * Math.PI * 2);
const orbit = (t: number, period: number, radius: number, phase = 0) =>
  Math.cos(((t + phase) / period) * Math.PI * 2) * radius;
const pingPong = (t: number, period: number, phase = 0) =>
  (1 - Math.cos(((t + phase) / period) * Math.PI * 2)) / 2;
const smooth = (value: number) => {
  const x = Math.max(0, Math.min(1, value));
  return x * x * (3 - 2 * x);
};

type SceneProps = {
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

type AtmosphereKind =
  | "sprocket"
  | "halation"
  | "silver"
  | "wash"
  | "scan"
  | "frame"
  | "shards";

type AtmosphereSpec = {
  kind: AtmosphereKind;
  angle: number;
  density: number;
  speed: number;
  phase: number;
};

const ATMOSPHERES: Record<SceneKind, AtmosphereSpec> = {
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

const BaseField: React.FC<SceneProps> = ({ t, p, id, index }) => {
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

const Atmosphere: React.FC<SceneProps> = ({
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

const FilmMount: React.FC<{
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

const FilmStrip: React.FC<{
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

const RippleRings: React.FC<{
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

const Seed: React.FC<{
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

const Dandelion: React.FC<{
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

const TemperamentShutter: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const turn = wave(t, 8.4) * 9 + cue * 5 + cue2 * 12;
  const aperture = 96 + pingPong(t, 6.8) * 34 + cue2 * 28;
  return (
    <>
      <g transform={`translate(${orbit(t, 13, 18)} ${wave(t, 10) * 9})`}>
        <circle cx="1500" cy="520" r="370" fill={p.surface} opacity="0.18" />
        <circle
          cx="1500"
          cy="520"
          r="285"
          fill={p.backgroundAlt}
          opacity="0.72"
        />
        {Array.from({ length: 8 }, (_, index) => (
          <path
            key={index}
            d="M1500 520 L1500 220 Q1670 250 1760 390Z"
            fill={index % 2 ? p.detail : p.secondary}
            opacity="0.62"
            transform={`rotate(${index * 45 + turn} 1500 520)`}
          />
        ))}
        <circle cx="1500" cy="520" r={aperture} fill={p.accent} />
        <circle
          cx="1500"
          cy="520"
          r={aperture * 0.52}
          fill={p.light}
          opacity="0.8"
        />
      </g>
      <g opacity="0.34" transform={`translate(${cue * 100} 0)`}>
        <rect x="90" y="120" width="520" height="74" fill={p.light} />
        <rect x="90" y="900" width="720" height="44" fill={p.accent} />
      </g>
    </>
  );
};

const FragmentsVault: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const gather = 1 - Math.min(1, cue * 0.78 + cue2 * 0.22);
  const blink = pingPong(t, 7.4) * 22 + cue2 * 12;
  const fragments = [
    [-280, -210, -14],
    [260, -190, 12],
    [-320, 190, 8],
    [290, 210, -10],
  ];
  return (
    <>
      <rect
        x="1120"
        y="110"
        width="690"
        height="850"
        rx="52"
        fill={p.surface}
        opacity="0.2"
      />
      <rect
        x="1190"
        y="180"
        width="550"
        height="710"
        rx="28"
        fill={p.backgroundAlt}
        stroke={p.light}
        strokeWidth="10"
        opacity="0.68"
      />
      <ellipse
        cx="1465"
        cy="535"
        rx="185"
        ry={104 - blink * 0.22}
        fill="none"
        stroke={p.light}
        strokeWidth="22"
        opacity="0.78"
      />
      <circle cx="1465" cy="535" r="62" fill={p.accent} />
      {fragments.map(([dx, dy, rotate], index) => (
        <g
          key={index}
          transform={`translate(${1465 + dx * gather + wave(t, 6 + index) * 12} ${535 + dy * gather}) rotate(${rotate * gather})`}
        >
          <rect
            x="-92"
            y="-70"
            width="184"
            height="140"
            fill={index % 2 ? p.secondary : p.detail}
            opacity="0.78"
          />
          <path
            d="M-72 42 L-18 -22 L18 8 L64 -46 L82 42Z"
            fill={p.surface}
            opacity="0.55"
          />
        </g>
      ))}
    </>
  );
};

const PatienceThread: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const rotation = t * 16 + cue2 * 15;
  const tension = 90 + cue * 150 + cue2 * 70 + wave(t, 5.2) * 12;
  return (
    <>
      <circle cx="1220" cy="360" r="190" fill={p.surface} opacity="0.34" />
      <circle cx="1220" cy="360" r="72" fill={p.background} />
      <circle cx="1630" cy="720" r="230" fill={p.surface} opacity="0.42" />
      <circle cx="1630" cy="720" r="82" fill={p.background} />
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <line
          key={`a-${index}`}
          x1="1220"
          y1="360"
          x2="1220"
          y2="200"
          stroke={p.accent}
          strokeWidth="12"
          transform={`rotate(${index * 60 + rotation} 1220 360)`}
          opacity="0.65"
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <line
          key={`b-${index}`}
          x1="1630"
          y1="720"
          x2="1630"
          y2="520"
          stroke={p.secondary}
          strokeWidth="14"
          transform={`rotate(${index * 60 - rotation * 0.82} 1630 720)`}
          opacity="0.65"
        />
      ))}
      <path
        d={`M1220 170 C1360 ${250 + tension} 1430 ${520 - tension * 0.3} 1630 480`}
        fill="none"
        stroke={p.light}
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M1000 930 H1860"
        stroke={p.detail}
        strokeWidth="24"
        opacity="0.5"
      />
    </>
  );
};

const DarkLightExposure: React.FC<SceneProps> = ({ t, cue, cue2, p, id }) => {
  const fogId = `${id}-fog`;
  const open = 260 + cue * 300 + cue2 * 180 + pingPong(t, 10) * 50;
  return (
    <>
      <defs>
        <radialGradient id={fogId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={p.light} stopOpacity="0.52" />
          <stop offset="1" stopColor={p.light} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect
        x="980"
        y="0"
        width={open}
        height="1080"
        fill="#07111D"
        opacity="0.78"
      />
      <path
        d={`M${980 + open} 0 L1920 250 V930 L${980 + open} 1080Z`}
        fill={p.light}
        opacity="0.26"
      />
      <circle
        cx={1430 + wave(t, 8) * 42}
        cy={530 + wave(t, 10, 2) * 26}
        r="390"
        fill={`url(#${fogId})`}
      />
      {[0, 1, 2].map((index) => (
        <ellipse
          key={index}
          cx={1320 + index * 190 + orbit(t, 8 + index, 25)}
          cy={420 + index * 95 + wave(t, 7 + index) * 18}
          rx={180 + index * 50}
          ry={85 + index * 24}
          fill={p.light}
          opacity={0.1 + index * 0.055}
        />
      ))}
      <rect
        x="1740"
        y="120"
        width="36"
        height="840"
        fill={p.accent}
        opacity={0.74}
      />
    </>
  );
};

const SharedContactSheet: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const pull = cue * 240 + cue2 * 120 + wave(t, 7.6) * 10;
  return (
    <>
      <g transform={`translate(${1020 + orbit(t, 17, 12)} 115)`}>
        <rect width="760" height="850" fill={p.surface} opacity="0.28" />
        {Array.from({ length: 9 }, (_, index) => {
          const col = index % 3;
          const row = Math.floor(index / 3);
          const selected = index === 4;
          return (
            <g
              key={index}
              transform={`translate(${60 + col * 230 + (selected ? pull : 0)} ${70 + row * 250})`}
            >
              <rect
                width="190"
                height="190"
                fill={selected ? p.accent : p.backgroundAlt}
                opacity={selected ? 0.84 : 0.55}
              />
              <circle
                cx={95 + wave(t, 6 + index) * 8}
                cy="88"
                r={42 + (index % 3) * 8}
                fill={selected ? p.light : p.secondary}
                opacity="0.58"
              />
              <rect
                y="200"
                width="140"
                height="10"
                fill={p.light}
                opacity="0.45"
              />
            </g>
          );
        })}
      </g>
      <path
        d="M940 90 V990"
        stroke={p.accent}
        strokeWidth="14"
        opacity="0.64"
      />
    </>
  );
};

const RomanceEmulsion: React.FC<SceneProps> = ({ t, cue, cue2, p, id }) => {
  const blend = 80 + cue * 170 + cue2 * 100;
  const gradientA = `${id}-emulsion-a`;
  const gradientB = `${id}-emulsion-b`;
  return (
    <>
      <defs>
        <linearGradient id={gradientA} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.accent} stopOpacity="0.9" />
          <stop offset="1" stopColor={p.secondary} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={gradientB} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.light} stopOpacity="0.7" />
          <stop offset="1" stopColor={p.accent} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d={`M1020 90 C1280 ${210 + wave(t, 9) * 30} 1510 180 1880 40 V760 C1560 900 1300 ${760 - blend} 980 940Z`}
        fill={`url(#${gradientA})`}
        opacity="0.72"
      />
      <path
        d={`M1880 170 C1580 ${60 + wave(t, 11, 2) * 24} 1370 430 1080 300 V1010 C1380 ${820 - blend} 1590 1010 1900 820Z`}
        fill={`url(#${gradientB})`}
        opacity="0.62"
      />
      <rect
        x="990"
        y="92"
        width="820"
        height="880"
        fill="none"
        stroke={p.surface}
        strokeWidth="18"
        opacity="0.28"
      />
      <circle
        cx={1460 + orbit(t, 8, 26)}
        cy={540 + wave(t, 7) * 18}
        r={120 + cue * 32}
        fill={p.light}
        opacity="0.24"
      />
    </>
  );
};

const FarewellListen: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const separation = 35 + cue * 230 + cue2 * 120 + pingPong(t, 12) * 18;
  return (
    <>
      <FilmMount
        x={1030 - separation}
        y={210 + wave(t, 9) * 12}
        width={410}
        height={590}
        p={p}
        image={p.accent}
        rotate={-4}
        opacity={0.74}
      />
      <FilmMount
        x={1370 + separation}
        y={270 - wave(t, 10) * 14}
        width={410}
        height={590}
        p={p}
        image={p.secondary}
        rotate={5}
        opacity={0.72}
      />
      {Array.from({ length: 5 }, (_, index) => (
        <path
          key={index}
          d={`M1190 ${430 + index * 58} C1390 ${390 + index * 62 + wave(t, 6 + index) * 12} 1560 ${470 + index * 40} 1770 ${430 + index * 58}`}
          fill="none"
          stroke={index === 2 ? p.accent : p.light}
          strokeWidth={index === 2 ? 15 : 7}
          opacity={0.56 - index * 0.05}
        />
      ))}
    </>
  );
};

const ColorProof: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const wash = cue * 250 + cue2 * 140 + pingPong(t, 9.6) * 45;
  return (
    <>
      {[p.accent, p.secondary, p.light].map((color, index) => (
        <g
          key={color}
          transform={`translate(${1080 + index * 220} ${150 + index * 95 + wave(t, 7 + index) * 12})`}
        >
          <rect
            width="440"
            height="620"
            fill={color}
            opacity={0.34 + index * 0.12}
          />
          <path
            d={`M0 ${260 + wash * (index + 1) * 0.24} C110 ${210 - wash * 0.12} 310 ${330 + wash * 0.1} 440 ${240 + wash * 0.08} V620 H0Z`}
            fill={p.backgroundAlt}
            opacity={0.52}
          />
        </g>
      ))}
      <rect
        x="990"
        y="90"
        width="850"
        height="900"
        fill="none"
        stroke={p.surface}
        strokeWidth="20"
        opacity="0.35"
      />
      <circle
        cx={1670 + wave(t, 8) * 18}
        cy="820"
        r={80 + cue * 40}
        fill={p.accent}
        opacity="0.72"
      />
    </>
  );
};

const DandelionFirst: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const release = cue * 260 + cue2 * 180;
  return (
    <>
      <Dandelion x={1430} y={590} radius={215} p={p} sway={wave(t, 8) * 26} />
      {Array.from({ length: 10 }, (_, index) => {
        const spread = release * (0.34 + index * 0.06);
        return (
          <Seed
            key={index}
            x={1540 + index * 36 + spread + wave(t, 6 + index * 0.3) * 18}
            y={390 - index * 28 - spread * 0.38 + wave(t, 5 + index * 0.4) * 16}
            rotate={24 + index * 17 + wave(t, 7 + index) * 8}
            scale={0.62 + index * 0.035}
            color={index % 3 === 0 ? p.accent : p.light}
            opacity={0.62 + index * 0.025}
          />
        );
      })}
      <path
        d="M960 900 Q1420 780 1920 850"
        fill="none"
        stroke={p.secondary}
        strokeWidth="34"
        opacity="0.28"
      />
    </>
  );
};

const MemoryControl: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const release = 30 + cue * 310 + cue2 * 180 + pingPong(t, 13) * 25;
  return (
    <>
      <rect
        x="1100"
        y="130"
        width="650"
        height="820"
        fill={p.surface}
        opacity="0.24"
      />
      <rect
        x={1150 + release}
        y="190"
        width="550"
        height="670"
        fill={p.accent}
        opacity="0.55"
      />
      <rect
        x={1190 + release}
        y="230"
        width="470"
        height="520"
        fill={p.backgroundAlt}
        opacity="0.72"
      />
      <path
        d="M1080 120 H1770 V960 H1080Z"
        fill="none"
        stroke={p.light}
        strokeWidth="22"
        opacity="0.58"
      />
      {[0, 1].map((index) => (
        <g
          key={index}
          transform={`translate(${1070 + index * 690} ${380 + wave(t, 8 + index) * 12}) rotate(${index ? 12 - cue * 18 : -12 + cue * 18})`}
        >
          <rect
            x="-42"
            y="-92"
            width="84"
            height="184"
            rx="18"
            fill={p.secondary}
          />
          <circle cy="-55" r="18" fill={p.surface} />
        </g>
      ))}
      <path
        d={`M1120 885 C1320 ${830 + wave(t, 7) * 20} 1540 940 1800 830`}
        fill="none"
        stroke={p.detail}
        strokeWidth="14"
        opacity="0.58"
      />
    </>
  );
};

const WaterListen: React.FC<SceneProps> = ({ t, cue, cue2, p }) => (
  <>
    <RippleRings
      cx={1450}
      cy={455 + wave(t, 8) * 10}
      p={p}
      pulse={wave(t, 6.4) * 7 + cue * 8 + cue2 * 8}
    />
    <path
      d={`M900 870 C1120 ${760 + wave(t, 10) * 20} 1260 910 1460 820 C1650 735 1770 810 1920 760 V1080 H900Z`}
      fill={p.detail}
      opacity="0.52"
    />
    <path
      d="M900 870 C1120 760 1260 910 1460 820 C1650 735 1770 810 1920 760"
      fill="none"
      stroke={p.light}
      strokeWidth="16"
      opacity="0.5"
    />
    {[0, 1, 2, 3].map((index) => (
      <circle
        key={index}
        cx={1230 + index * 170 + orbit(t, 7 + index, 16)}
        cy={300 + index * 70 + wave(t, 6 + index) * 12}
        r={12 + index * 6}
        fill={index === 2 ? p.accent : p.surface}
        opacity="0.72"
      />
    ))}
  </>
);

const DeparturePlatform: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const leave = cue * 380 + cue2 * 210 + pingPong(t, 14) * 30;
  return (
    <>
      <rect
        x="970"
        y="120"
        width="900"
        height="790"
        fill={p.surface}
        opacity="0.18"
      />
      <g transform={`translate(${leave} 0)`}>
        <rect
          x="1090"
          y="210"
          width="620"
          height="570"
          fill={p.backgroundAlt}
          stroke={p.light}
          strokeWidth="18"
          opacity="0.72"
        />
        {[0, 1, 2, 3].map((index) => (
          <line
            key={index}
            x1={1190 + index * 140}
            y1="230"
            x2={1190 + index * 140}
            y2="760"
            stroke={p.detail}
            strokeWidth="14"
            opacity="0.58"
          />
        ))}
      </g>
      <path
        d="M880 840 H1920"
        stroke={p.light}
        strokeWidth="32"
        opacity="0.42"
      />
      <path
        d={`M1040 900 H${1680 - cue * 220}`}
        stroke={p.accent}
        strokeWidth="16"
        opacity="0.72"
      />
      <circle cx={1790 + wave(t, 8) * 10} cy="150" r="52" fill={p.secondary} />
    </>
  );
};

const InertiaDrawer: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const open = 45 + cue * 240 + cue2 * 150 + pingPong(t, 12.2) * 18;
  return (
    <>
      <g transform="translate(1080 95)">
        <rect width="700" height="900" fill={p.surface} opacity="0.3" />
        {[0, 1, 2, 3].map((index) => (
          <g
            key={index}
            transform={`translate(${70 + (index === 2 ? open : 0)} ${70 + index * 205})`}
          >
            <rect
              width="560"
              height="160"
              rx="12"
              fill={index === 2 ? p.accent : p.backgroundAlt}
              opacity={index === 2 ? 0.74 : 0.52}
            />
            <rect
              x="210"
              y="55"
              width="140"
              height="42"
              rx="20"
              fill={p.surface}
              opacity="0.72"
            />
            {index === 2 ? (
              <rect
                x="510"
                y="20"
                width="220"
                height="120"
                fill={p.light}
                opacity="0.42"
              />
            ) : null}
          </g>
        ))}
      </g>
      <path
        d={`M990 200 C900 ${380 + wave(t, 8) * 20} 1020 650 930 860`}
        fill="none"
        stroke={p.secondary}
        strokeWidth="18"
        opacity="0.58"
      />
    </>
  );
};

const IdealExposure: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const converge = 260 - cue * 150 - cue2 * 80 + wave(t, 9) * 16;
  return (
    <>
      <circle cx="1110" cy="270" r="100" fill={p.accent} opacity="0.74" />
      <circle cx="1780" cy="270" r="100" fill={p.secondary} opacity="0.74" />
      <path
        d={`M1110 270 L${1435 - converge} 930 H1435Z`}
        fill={p.accent}
        opacity="0.32"
      />
      <path
        d={`M1780 270 L${1435 + converge} 930 H1435Z`}
        fill={p.secondary}
        opacity="0.32"
      />
      <rect
        x="1190"
        y="690"
        width="500"
        height="250"
        fill={p.surface}
        opacity="0.42"
      />
      <circle
        cx="1440"
        cy={810 + wave(t, 7) * 12}
        r={75 + cue * 36}
        fill={p.light}
        opacity="0.65"
      />
      <path
        d="M950 960 H1910"
        stroke={p.light}
        strokeWidth="12"
        opacity="0.34"
      />
    </>
  );
};

const SharedIndex: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const transfer = cue * 330 + cue2 * 190 + pingPong(t, 13.5) * 24;
  return (
    <>
      <g transform="translate(1030 160)">
        {[0, 1, 2].map((index) => (
          <g
            key={index}
            transform={`translate(${index * 46} ${index * 38}) rotate(${-5 + index * 3})`}
          >
            <rect
              width="430"
              height="620"
              fill={p.surface}
              opacity={0.28 + index * 0.12}
            />
            <rect
              x="55"
              y="70"
              width="320"
              height="250"
              fill={p.backgroundAlt}
              opacity="0.72"
            />
          </g>
        ))}
      </g>
      <g
        transform={`translate(${1190 + transfer} ${310 + wave(t, 8) * 12}) rotate(${3 + cue * 4})`}
      >
        <rect width="420" height="570" fill={p.surface} opacity="0.78" />
        <rect
          x="48"
          y="55"
          width="324"
          height="330"
          fill={p.accent}
          opacity="0.58"
        />
        <circle cx="210" cy="220" r="92" fill={p.secondary} opacity="0.66" />
      </g>
      <path
        d={`M980 900 C1260 ${820 + wave(t, 10) * 18} 1570 980 1900 820`}
        fill="none"
        stroke={p.light}
        strokeWidth="18"
        opacity="0.46"
      />
    </>
  );
};

const RomanceNegative: React.FC<SceneProps> = ({ t, cue, cue2, p }) => (
  <>
    <circle cx="1170" cy="310" r="190" fill={p.surface} opacity="0.3" />
    <circle cx="1170" cy="310" r="64" fill={p.background} />
    <circle cx="1680" cy="760" r="240" fill={p.surface} opacity="0.34" />
    <circle cx="1680" cy="760" r="76" fill={p.background} />
    <FilmStrip
      x={1020 + orbit(t, 10, 18)}
      y={365 + wave(t, 8) * 14}
      width={820}
      height={260}
      p={p}
      offset={cue * 22 + cue2 * 38}
      rotate={9}
    />
    <path
      d="M1170 120 C1410 180 1480 610 1680 520"
      fill="none"
      stroke={p.accent}
      strokeWidth="24"
      opacity="0.68"
    />
    <circle
      cx={1440 + wave(t, 7) * 18}
      cy="500"
      r={80 + cue * 28 + cue2 * 24}
      fill={p.light}
      opacity="0.24"
    />
  </>
);

const PromiseReplay: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const angle = t * 24;
  return (
    <>
      {[1190, 1640].map((cx, reel) => (
        <g key={cx} transform={`rotate(${reel ? -angle : angle} ${cx} 510)`}>
          <circle
            cx={cx}
            cy="510"
            r={reel ? 210 : 175}
            fill={p.surface}
            opacity="0.28"
          />
          {[0, 1, 2].map((index) => (
            <ellipse
              key={index}
              cx={cx}
              cy={reel ? 360 : 385}
              rx="48"
              ry="112"
              fill={reel ? p.secondary : p.accent}
              opacity="0.68"
              transform={`rotate(${index * 120} ${cx} 510)`}
            />
          ))}
          <circle cx={cx} cy="510" r="58" fill={p.backgroundAlt} />
        </g>
      ))}
      <path
        d={`M1190 335 C1360 ${230 + wave(t, 8) * 18 - cue2 * 26} 1510 250 1640 300 C1820 365 1830 ${750 + cue * 35 + cue2 * 52} 1640 720 C1470 700 1370 760 1190 685 C1010 610 1010 410 1190 335Z`}
        fill="none"
        stroke={p.light}
        strokeWidth="22"
        opacity="0.68"
      />
      <rect
        x="1360"
        y="430"
        width="120"
        height="160"
        rx="26"
        fill={p.accent}
        opacity="0.72"
      />
    </>
  );
};

const SpectrumStain: React.FC<SceneProps> = ({ t, cue, cue2, p, id }) => {
  const stainId = `${id}-stain`;
  return (
    <>
      <defs>
        <radialGradient id={stainId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={p.accent} stopOpacity="0.78" />
          <stop offset="0.54" stopColor={p.secondary} stopOpacity="0.42" />
          <stop offset="1" stopColor={p.light} stopOpacity="0" />
        </radialGradient>
      </defs>
      {Array.from({ length: 7 }, (_, index) => {
        const phase = index * 0.8;
        return (
          <ellipse
            key={index}
            cx={1200 + index * 105 + noise2D(id, index, t * 0.1) * 60}
            cy={340 + (index % 3) * 180 + wave(t, 7 + index, phase) * 42}
            rx={170 + index * 24 + cue * 18 + cue2 * 36}
            ry={130 + (index % 2) * 70}
            fill={`url(#${stainId})`}
            opacity={0.44 + (index % 3) * 0.1}
          />
        );
      })}
      <rect
        x="980"
        y="100"
        width="860"
        height="880"
        fill="none"
        stroke={p.surface}
        strokeWidth="18"
        opacity="0.34"
      />
      <path
        d="M1010 860 C1260 720 1490 960 1840 710"
        fill="none"
        stroke={p.light}
        strokeWidth="18"
        opacity="0.42"
      />
    </>
  );
};

const DandelionReverse: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const approach = 300 - cue * 180 - cue2 * 80 + pingPong(t, 11) * 22;
  return (
    <>
      <rect
        x="1550"
        y="70"
        width="28"
        height="940"
        fill={p.light}
        opacity="0.72"
      />
      <rect
        x="1578"
        y="70"
        width="270"
        height="940"
        fill={p.surface}
        opacity="0.16"
      />
      {Array.from({ length: 13 }, (_, index) => (
        <Seed
          key={index}
          x={1160 + index * 46 + approach * (0.55 + index * 0.02)}
          y={190 + (index % 5) * 145 + wave(t, 6 + index * 0.25) * 18}
          rotate={-38 + index * 15 + wave(t, 8 + index) * 7}
          scale={0.58 + (index % 4) * 0.08}
          color={index % 4 === 0 ? p.accent : p.light}
          opacity={0.58 + (index % 3) * 0.11}
        />
      ))}
      {[0, 1, 2, 3].map((index) => (
        <circle
          key={index}
          cx="1556"
          cy={240 + index * 190}
          r={15 + index * 3}
          fill={p.accent}
          opacity={0.54 + index * 0.1}
        />
      ))}
      <path
        d="M920 950 Q1320 810 1920 890"
        fill="none"
        stroke={p.secondary}
        strokeWidth="30"
        opacity="0.34"
      />
    </>
  );
};

const MemoryTransfer: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const travel = 60 + cue * 450 + cue2 * 230 + pingPong(t, 16) * 26;
  return (
    <>
      <FilmMount
        x={980}
        y={190}
        width={480}
        height={700}
        p={p}
        image={p.backgroundAlt}
        opacity={0.62}
      />
      <FilmMount
        x={1450}
        y={120}
        width={390}
        height={590}
        p={p}
        image={p.secondary}
        opacity={0.42}
        rotate={4}
      />
      <g transform={`translate(${travel} ${wave(t, 9) * 12})`}>
        <rect
          x="1040"
          y="250"
          width="390"
          height="490"
          fill={p.accent}
          opacity={0.62}
        />
        <path
          d="M1080 650 C1180 470 1290 520 1390 330 V720 H1080Z"
          fill={p.light}
          opacity="0.34"
        />
        <circle cx="1240" cy="440" r="86" fill={p.secondary} opacity="0.76" />
      </g>
      <path
        d="M1010 940 C1280 820 1570 980 1880 830"
        fill="none"
        stroke={p.light}
        strokeWidth="15"
        opacity="0.38"
      />
    </>
  );
};

const WaterCeiling: React.FC<SceneProps> = ({ t, cue, cue2, p }) => (
  <>
    <g transform="translate(0 20) scale(1 -1) translate(0 -500)">
      <RippleRings
        cx={1480}
        cy={80}
        p={p}
        pulse={wave(t, 7) * 8 + cue * 8 + cue2 * 9}
        count={7}
      />
    </g>
    {Array.from({ length: 8 }, (_, index) => (
      <path
        key={index}
        d={`M${990 + index * 120} 0 C${1040 + index * 100} ${300 + wave(t, 8 + index) * 30} ${930 + index * 130} ${590 + wave(t, 9 + index, 2) * 26} ${1040 + index * 110} 1080`}
        fill="none"
        stroke={index % 3 === 0 ? p.accent : p.light}
        strokeWidth={index % 3 === 0 ? 18 : 8}
        opacity={0.2 + (index % 4) * 0.08}
      />
    ))}
    <rect
      x="960"
      y="900"
      width="960"
      height="180"
      fill={p.detail}
      opacity="0.34"
    />
    <circle
      cx={1700 + wave(t, 7) * 22}
      cy={790 - cue * 90 - cue2 * 70}
      r="42"
      fill={p.secondary}
    />
  </>
);

const FarewellDock: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const fold = cue * 22 + cue2 * 18 + wave(t, 11) * 2;
  return (
    <>
      <path
        d="M930 850 H1920"
        stroke={p.light}
        strokeWidth="52"
        opacity="0.38"
      />
      <path
        d="M980 800 H1800"
        stroke={p.secondary}
        strokeWidth="18"
        opacity="0.64"
      />
      <g transform={`rotate(${-fold} 1420 770)`}>
        <rect
          x="1160"
          y="610"
          width="620"
          height="120"
          fill={p.surface}
          opacity="0.58"
        />
        {[0, 1, 2, 3, 4].map((index) => (
          <line
            key={index}
            x1={1200 + index * 130}
            y1="610"
            x2={1200 + index * 130}
            y2="730"
            stroke={p.backgroundAlt}
            strokeWidth="10"
          />
        ))}
      </g>
      <path
        d={`M1040 650 C1230 ${480 + wave(t, 9) * 20} 1530 ${520 - cue * 100} 1810 350`}
        fill="none"
        stroke={p.accent}
        strokeWidth="22"
        strokeLinecap="round"
        opacity="0.78"
      />
      <circle cx="1040" cy="650" r="54" fill={p.surface} />
      <circle cx="1810" cy="350" r="34" fill={p.light} />
      <rect
        x="1710"
        y="90"
        width="90"
        height="320"
        fill={p.detail}
        opacity="0.5"
      />
    </>
  );
};

const DandelionField: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const wind = 24 + cue * 50 + cue2 * 36 + wave(t, 8) * 12;
  return (
    <>
      <path
        d="M880 860 C1170 730 1470 920 1920 760 V1080 H880Z"
        fill={p.detail}
        opacity="0.45"
      />
      {Array.from({ length: 8 }, (_, index) => {
        const x = 1030 + index * 125;
        const height = 210 + (index % 3) * 70;
        return (
          <g key={index}>
            <path
              d={`M${x} 900 Q${x - wind} ${900 - height / 2} ${x + wind * 0.32} ${900 - height}`}
              fill="none"
              stroke={p.secondary}
              strokeWidth="12"
              opacity="0.66"
            />
            <circle
              cx={x + wind * 0.32}
              cy={900 - height}
              r={32 + (index % 3) * 8}
              fill={index % 2 ? p.surface : p.accent}
              opacity="0.74"
            />
          </g>
        );
      })}
      {Array.from({ length: 9 }, (_, index) => (
        <Seed
          key={index}
          x={1180 + index * 90 + cue * 110 + wave(t, 7 + index) * 15}
          y={210 + (index % 4) * 95 - cue * 45}
          rotate={20 + index * 19}
          scale={0.45 + (index % 3) * 0.08}
          color={index % 3 === 0 ? p.accent : p.light}
          opacity={0.62}
        />
      ))}
    </>
  );
};

const MemoryPeel: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const peel = 80 + cue * 310 + cue2 * 220 + pingPong(t, 15) * 26;
  return (
    <>
      <rect
        x="1050"
        y="120"
        width="720"
        height="840"
        fill={p.surface}
        opacity="0.3"
      />
      <rect
        x="1110"
        y="180"
        width="600"
        height="700"
        fill={p.backgroundAlt}
        opacity="0.68"
      />
      <path
        d={`M1110 180 H1710 V880 H${1370 + peel} Q${1280 + peel} ${740 - peel * 0.22} ${1110 + peel * 0.36} ${560 - peel * 0.34}Z`}
        fill={p.accent}
        opacity="0.6"
      />
      <path
        d={`M${1370 + peel} 880 Q${1280 + peel} ${740 - peel * 0.22} ${1110 + peel * 0.36} ${560 - peel * 0.34}`}
        fill="none"
        stroke={p.light}
        strokeWidth="20"
        opacity="0.64"
      />
      <circle
        cx={1450 + wave(t, 8) * 16}
        cy={420 - cue * 30}
        r="112"
        fill={p.secondary}
        opacity="0.5"
      />
      <path
        d="M990 980 H1850"
        stroke={p.detail}
        strokeWidth="22"
        opacity="0.42"
      />
    </>
  );
};

const WaterGround: React.FC<SceneProps> = ({ t, cue, cue2, p }) => (
  <>
    {Array.from({ length: 7 }, (_, index) => (
      <path
        key={index}
        d={`M920 ${180 + index * 110} C1120 ${110 + index * 120 + wave(t, 8 + index) * 20} 1370 ${250 + index * 82} 1570 ${170 + index * 105 - cue * 18} C1730 ${120 + index * 115} 1830 ${210 + index * 95} 1960 ${160 + index * 108}`}
        fill="none"
        stroke={index === 3 ? p.accent : p.light}
        strokeWidth={index === 3 ? 18 : 8}
        opacity={0.22 + index * 0.055}
      />
    ))}
    <path
      d={`M900 820 C1130 ${700 + wave(t, 10) * 22} 1330 930 1530 790 C1700 670 1810 760 1920 700 V1080 H900Z`}
      fill={p.detail}
      opacity="0.5"
    />
    <RippleRings
      cx={1530}
      cy={790}
      p={p}
      pulse={wave(t, 7) * 6 + cue * 9 + cue2 * 8}
      count={4}
    />
    <circle
      cx={1170 + orbit(t, 9, 22)}
      cy={520 + wave(t, 8) * 16}
      r="44"
      fill={p.secondary}
      opacity="0.74"
    />
  </>
);

const LastEmptyFrame: React.FC<SceneProps> = ({ t, progress, cue2, p }) => {
  const leave = smooth(progress) * 820 + cue2 * 90;
  return (
    <>
      <rect
        x="1040"
        y="110"
        width="760"
        height="860"
        fill={p.surface}
        opacity="0.22"
      />
      <rect
        x="1110"
        y="180"
        width="620"
        height="670"
        fill={p.backgroundAlt}
        opacity="0.5"
      />
      <g transform={`translate(${leave} ${wave(t, 14) * 12})`}>
        <rect
          x="1140"
          y="210"
          width="560"
          height="610"
          fill={p.accent}
          opacity="0.58"
        />
        <path
          d="M1170 700 C1300 480 1460 570 1660 330 V790 H1170Z"
          fill={p.light}
          opacity="0.34"
        />
        <circle cx="1420" cy="460" r="112" fill={p.secondary} opacity="0.7" />
      </g>
      <rect
        x="1038"
        y="108"
        width="764"
        height="864"
        fill="none"
        stroke={p.light}
        strokeWidth="22"
        opacity="0.62"
      />
      <rect
        x="1080"
        y="150"
        width="680"
        height="780"
        fill="none"
        stroke={p.detail}
        strokeWidth="8"
        opacity="0.6"
      />
      <path
        d="M960 1010 H1900"
        stroke={p.accent}
        strokeWidth="16"
        opacity={0.62 - progress * 0.34}
      />
      {Array.from({ length: 12 }, (_, index) => (
        <circle
          key={index}
          cx={1060 + index * 76 + progress * 360}
          cy={220 + (index % 5) * 140 + wave(t, 9 + index) * 8}
          r={5 + (index % 3) * 2}
          fill={p.light}
          opacity={0.4 - progress * 0.24}
        />
      ))}
    </>
  );
};

const Artwork: React.FC<SceneProps> = (props) => {
  switch (props.scene) {
    case "temperament-shutter":
      return <TemperamentShutter {...props} />;
    case "fragments-vault":
      return <FragmentsVault {...props} />;
    case "patience-thread":
      return <PatienceThread {...props} />;
    case "dark-light-exposure":
      return <DarkLightExposure {...props} />;
    case "shared-contact-sheet":
      return <SharedContactSheet {...props} />;
    case "romance-emulsion":
      return <RomanceEmulsion {...props} />;
    case "farewell-listen":
      return <FarewellListen {...props} />;
    case "color-proof":
      return <ColorProof {...props} />;
    case "dandelion-first":
      return <DandelionFirst {...props} />;
    case "memory-control":
      return <MemoryControl {...props} />;
    case "water-listen":
      return <WaterListen {...props} />;
    case "departure-platform":
      return <DeparturePlatform {...props} />;
    case "inertia-drawer":
      return <InertiaDrawer {...props} />;
    case "ideal-exposure":
      return <IdealExposure {...props} />;
    case "shared-index":
      return <SharedIndex {...props} />;
    case "romance-negative":
      return <RomanceNegative {...props} />;
    case "promise-replay":
      return <PromiseReplay {...props} />;
    case "spectrum-stain":
      return <SpectrumStain {...props} />;
    case "dandelion-reverse":
      return <DandelionReverse {...props} />;
    case "memory-transfer":
      return <MemoryTransfer {...props} />;
    case "water-ceiling":
      return <WaterCeiling {...props} />;
    case "farewell-dock":
      return <FarewellDock {...props} />;
    case "dandelion-field":
      return <DandelionField {...props} />;
    case "memory-peel":
      return <MemoryPeel {...props} />;
    case "water-ground":
      return <WaterGround {...props} />;
    case "last-empty-frame":
      return <LastEmptyFrame {...props} />;
  }
};

export const SceneBackground: React.FC<{
  page: LyricPage;
  globalMs: number;
  opacity: number;
}> = ({ page, globalMs, opacity }) => {
  const localMs = Math.max(0, globalMs - page.startMs);
  const pageDuration = Math.max(1, page.endMs - page.startMs);
  const progress = Math.max(0, Math.min(1, localMs / pageDuration));
  const secondLine =
    page.lineIndexes[1] === undefined ? null : lyricLines[page.lineIndexes[1]];
  const cueAt = secondLine
    ? secondLine.startMs - page.startMs
    : pageDuration * 0.44;
  const cue = smooth((localMs - cueAt) / 760);
  const cue2At = cueAt + Math.min(780, Math.max(420, pageDuration * 0.16));
  const cue2 = smooth((localMs - cue2At) / 1350);
  const entry = smooth(localMs / 720);
  const props: SceneProps = {
    t: localMs / 1000,
    localMs,
    cue,
    cue2,
    entry,
    progress,
    p: page.palette,
    id: `wodehuiyi-${page.id}`,
    index: page.index,
    scene: page.scene,
  };
  const entryDirection = (page.index % 3) - 1;
  const artDriftX =
    wave(props.t, 13 + (page.index % 7), page.index * 0.19) *
    (10 + (page.index % 4) * 3);
  const artDriftY =
    wave(props.t, 17 + (page.index % 5), page.index * 0.13) *
    (7 + (page.index % 3) * 3);
  const artEntryX = (1 - entry) * entryDirection * 64;
  const artEntryY = (1 - entry) * (page.index % 2 === 0 ? -28 : 28);
  const camera = EVOLUTION_CAMERAS[page.scene];
  const stageCamera = cue * 0.72 + cue2 * 0.28;
  const cameraScale = 1 + stageCamera * (camera.scale - 1);
  const atmosphereScale = 1 + stageCamera * (camera.atmosphereScale - 1);
  const atmosphereTransform = [
    `translate(${stageCamera * camera.atmosphereX} ${stageCamera * camera.atmosphereY})`,
    `translate(${camera.pivotX} ${camera.pivotY})`,
    `scale(${atmosphereScale})`,
    `translate(${-camera.pivotX} ${-camera.pivotY})`,
  ].join(" ");
  const artworkTransform = [
    `translate(${artEntryX + artDriftX + stageCamera * camera.x} ${artEntryY + artDriftY + stageCamera * camera.y})`,
    `rotate(${stageCamera * camera.rotate} ${camera.pivotX} ${camera.pivotY})`,
    `translate(${camera.pivotX} ${camera.pivotY})`,
    `scale(${cameraScale})`,
    `translate(${-camera.pivotX} ${-camera.pivotY})`,
  ].join(" ");
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        overflow: "hidden",
        background: page.palette.background,
      }}
    >
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <BaseField {...props} />
        <g transform={atmosphereTransform}>
          <Atmosphere {...props} />
        </g>
        <g opacity={entry} transform={artworkTransform}>
          <Artwork {...props} />
          <SceneEvolution
            scene={page.scene}
            p={page.palette}
            t={props.t}
            stage={cue}
            resolve={cue2}
          />
        </g>
      </svg>
    </div>
  );
};
