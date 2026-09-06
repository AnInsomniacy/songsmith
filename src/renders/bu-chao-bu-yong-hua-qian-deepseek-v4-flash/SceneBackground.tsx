import { noise2D } from "@remotion/noise";
import React from "react";
import { lyricLines } from "./lyrics";
import {
  Ball,
  Bearbrick,
  Cabinet,
  ChipBag,
  Coin,
  CoinSlot,
  Figurine,
  NeonTube,
  Sneaker,
  Sofa,
  Speaker,
} from "./ScenePrimitives";
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
const flicker = (t: number, speed: number) => {
  const raw = Math.abs(wave(t, speed * 0.37, 1.7) + wave(t, speed * 0.23, 4.1));
  return 0.55 + 0.45 * Math.min(1, raw);
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

const GlowFilter: React.FC<{ id: string; strength?: number }> = ({
  id,
  strength = 9,
}) => (
  <filter id={id} x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation={strength} />
  </filter>
);

type Camera = {
  x: number;
  y: number;
  scale: number;
  pivotX: number;
  pivotY: number;
};

export const SCENE_CAMERAS: Record<SceneKind, Camera> = {
  "power-screen": { x: -52, y: 18, scale: 1.06, pivotX: 1560, pivotY: 500 },
  "window-promise": { x: 40, y: -26, scale: 1.07, pivotX: 1560, pivotY: 520 },
  "pinball-left": { x: -62, y: 22, scale: 1.08, pivotX: 1600, pivotY: 520 },
  "note-heartbeat": { x: 28, y: -34, scale: 1.05, pivotX: 1580, pivotY: 500 },
  "shoot-apple": { x: -44, y: 30, scale: 1.09, pivotX: 1620, pivotY: 420 },
  "countdown-seat": { x: 46, y: -18, scale: 1.06, pivotX: 1560, pivotY: 540 },
  "coin-slot": { x: -38, y: 24, scale: 1.1, pivotX: 1580, pivotY: 520 },
  "reel-spend": { x: 34, y: -30, scale: 1.08, pivotX: 1600, pivotY: 480 },
  "prize-unbuyable": { x: -58, y: 20, scale: 1.07, pivotX: 1560, pivotY: 500 },
  "speaker-rumor": { x: 44, y: 26, scale: 1.09, pivotX: 1600, pivotY: 480 },
  "clone-rows": { x: -32, y: -24, scale: 1.05, pivotX: 1560, pivotY: 520 },
  "shoot-apple-reprise": { x: 30, y: 36, scale: 1.1, pivotX: 1600, pivotY: 400 },
  "countdown-seat-reprise": { x: -48, y: 16, scale: 1.07, pivotX: 1560, pivotY: 540 },
  "coin-slot-close": { x: 36, y: 20, scale: 1.08, pivotX: 1580, pivotY: 520 },
  "reel-jackpot": { x: -42, y: -20, scale: 1.09, pivotX: 1600, pivotY: 480 },
  "prize-reject": { x: 40, y: 18, scale: 1.06, pivotX: 1560, pivotY: 500 },
  "sofa-treasures": { x: -36, y: -28, scale: 1.07, pivotX: 1580, pivotY: 560 },
  "sofa-closeup": { x: 52, y: 24, scale: 1.11, pivotX: 1600, pivotY: 540 },
  "sign-flicker": { x: -54, y: 14, scale: 1.06, pivotX: 1560, pivotY: 460 },
  "window-late-night": { x: 34, y: 22, scale: 1.07, pivotX: 1560, pivotY: 520 },
  "coin-slot-final": { x: -40, y: 26, scale: 1.09, pivotX: 1580, pivotY: 520 },
  "reel-break": { x: 38, y: -22, scale: 1.08, pivotX: 1600, pivotY: 480 },
  "prize-empty": { x: -50, y: 24, scale: 1.08, pivotX: 1560, pivotY: 520 },
  shutdown: { x: 24, y: -16, scale: 1.05, pivotX: 1560, pivotY: 520 },
  "last-sign": { x: -46, y: 10, scale: 1.06, pivotX: 1560, pivotY: 460 },
  "final-coin": { x: 28, y: 20, scale: 1.07, pivotX: 1580, pivotY: 520 },
};

const BaseField: React.FC<SceneProps> = ({ t, p, id, index }) => {
  const gradientId = `${id}-base-gradient`;
  return (
    <>
      <defs>
        <linearGradient
          id={gradientId}
          x1={index % 2 === 0 ? "0" : "1"}
          y1="0"
          x2={index % 2 === 0 ? "1" : "0"}
          y2="1"
        >
          <stop offset="0" stopColor={p.background} />
          <stop offset="1" stopColor={p.backgroundAlt} />
        </linearGradient>
        <radialGradient id={`${id}-pink-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={p.accent} stopOpacity="0.2" />
          <stop offset="1" stopColor={p.accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-blue-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={p.secondary} stopOpacity="0.16" />
          <stop offset="1" stopColor={p.secondary} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${gradientId})`} />
      <circle
        cx={1280 + orbit(t, 23, 60)}
        cy={280 + wave(t, 19, 1.4) * 40}
        r="560"
        fill={`url(#${id}-pink-glow)`}
      />
      <circle
        cx={1780 + orbit(t, 27, 45, 2)}
        cy={720 + wave(t, 21, 3) * 34}
        r="500"
        fill={`url(#${id}-blue-glow)`}
      />
    </>
  );
};

const Dust: React.FC<SceneProps> = ({ t, p, id, entry }) => (
  <g opacity={entry * 0.5}>
    {Array.from({ length: 10 }, (_, index) => (
      <circle
        key={index}
        cx={(index * 263 + noise2D(id, index, t * 0.04) * 90) % 1920}
        cy={(index * 149 + noise2D(id, index + 40, t * 0.03) * 70) % 1080}
        r={1.5 + (index % 3)}
        fill={p.light}
        opacity={0.25 + (index % 4) * 0.1}
      />
    ))}
  </g>
);

const PowerScreen: React.FC<SceneProps> = ({ t, cue, cue2, entry, p, id }) => {
  const noiseOpacity = (1 - smooth(entry)) * 0.5 + (1 - cue) * 0.14;
  const glowId = `${id}-power-glow`;
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={14} />
      </defs>
      <g transform={`translate(${1180 + orbit(t, 15, 10)} ${140 + wave(t, 11) * 8})`}>
        <rect
          width="620"
          height="460"
          rx="30"
          fill="#10101E"
          stroke={p.detail}
          strokeWidth="6"
        />
        <rect
          x="22"
          y="22"
          width="576"
          height="330"
          rx="16"
          fill="#0A0E1E"
        />
        {noiseOpacity > 0.02 ? (
          <g opacity={noiseOpacity}>
            {Array.from({ length: 24 }, (_, index) => (
              <line
                key={index}
                x1={30 + ((index * 97 + Math.floor(t * 40)) % 560)}
                y1={30 + index * 14}
                x2={30 + ((index * 97 + 37 + Math.floor(t * 51)) % 560)}
                y2={30 + index * 14}
                stroke={p.light}
                strokeWidth="2"
                opacity={0.5}
              />
            ))}
          </g>
        ) : null}
        <circle
          cx="310"
          cy="187"
          r={96 + cue2 * 30}
          fill="none"
          stroke={p.accent}
          strokeWidth="12"
          opacity={0.5 + cue * 0.5}
          filter={`url(#${glowId})`}
        />
        <circle
          cx="310"
          cy="187"
          r="34"
          fill={p.accent}
          opacity={0.7 + cue * 0.3}
        />
        <rect y="404" width="620" height="14" fill={p.detail} opacity="0.5" />
        <circle cx="60" cy="428" r="7" fill={p.accent} />
        <circle cx="90" cy="428" r="7" fill={p.secondary} />
      </g>
    </>
  );
};

const WindowPromise: React.FC<SceneProps> = ({ t, cue, p, id }) => {
  const glowId = `${id}-window-glow`;
  const shelf = (order: number) => smooth(cue - order * 0.22);
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={10} />
      </defs>
      <g transform={`translate(${1180 + orbit(t, 18, 8)} ${120 + wave(t, 13) * 6})`}>
        <rect
          width="640"
          height="560"
          rx="24"
          fill="#141026"
          stroke={p.detail}
          strokeWidth="6"
        />
        <rect
          x="26"
          y="86"
          width="588"
          height="380"
          rx="14"
          fill="#0C1024"
          stroke={p.accent}
          strokeWidth="3"
          opacity="0.7"
        />
        {[0, 1, 2].map((index) => (
          <rect
            key={index}
            x="34"
            y={96 + index * 124}
            width="572"
            height="4"
            fill={p.detail}
            opacity="0.4"
          />
        ))}
        <g opacity={0.25 + shelf(0) * 0.75} transform={`translate(${60 + orbit(t, 9, 4)} 132)`}>
          <Bearbrick cx={120} cy={236} size={190} color={p.accent} />
        </g>
        <g opacity={0.25 + shelf(1) * 0.75} transform={`translate(${110 + orbit(t, 12, 5)} 360)`}>
          <Sneaker x={60} y={250} size={170} color={p.secondary} />
        </g>
        <g opacity={0.25 + shelf(2) * 0.75} transform={`translate(${60 + orbit(t, 10, 4)} 480)`}>
          <ChipBag x={90} y={-30} size={150} color="#FFC72C" />
        </g>
        <g opacity={0.3 + shelf(0) * 0.7}>
          <NeonTube
            x={30}
            y={40}
            length={580}
            color={p.accent}
            glowId={glowId}
            radius={5}
          />
        </g>
        <rect y="496" width="640" height="64" fill="#10101C" />
        <CoinSlot
          x={560}
          y={512}
          width={52}
          height={36}
          accent="#FFC72C"
          detail={p.detail}
          surface="#10101C"
          lit={cue > 0.5}
        />
      </g>
    </>
  );
};

const PinballLeft: React.FC<SceneProps> = ({ t, cue, cue2, p, id }) => {
  const glowId = `${id}-pinball-glow`;
  const launch = pingPong(t, 3.4 + cue * 1.4);
  const x = 1310 - launch * 240 - cue2 * 40;
  const y = 620 - Math.sin(launch * Math.PI) * 300;
  const bounces = 1 + Math.floor(t * 2.2) % 3;
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={12} />
      </defs>
      <g transform={`translate(${1180 + orbit(t, 16, 10)} ${110 + wave(t, 12) * 6})`}>
        <path
          d="M60 0 L620 0 L620 470 L340 640 L60 470Z"
          fill="#141026"
          stroke={p.detail}
          strokeWidth="8"
        />
        <path
          d="M92 30 L588 30 L588 448 L344 600 L92 448Z"
          fill="none"
          stroke={p.secondary}
          strokeWidth="5"
          opacity="0.6"
        />
        {[0, 1, 2, 3, 4].map((index) => (
          <circle
            key={index}
            cx={150 + index * 92 + orbit(t, 8 + index, 12)}
            cy={120 + (index % 3) * 95}
            r={15 + (index % 2) * 8}
            fill={index % 2 ? p.accent : p.light}
            opacity="0.75"
          />
        ))}
        <circle cx="530" cy="420" r="26" fill={p.detail} opacity="0.6" />
        <circle cx="560" cy="360" r="26" fill={p.detail} opacity="0.45" />
        <g transform={`translate(${x} ${y}) rotate(${launch * 320})`}>
          <Ball cx={0} cy={0} r={34} color="#FF2E6E" />
        </g>
        <g opacity={0.2 + bounces * 0.2}>
          <circle cx="60" cy="470" r="10" fill={p.light} />
          <circle cx="180" cy="470" r="10" fill={p.light} />
          <circle cx="300" cy="470" r="10" fill={p.light} />
        </g>
        <text
          x="340"
          y="560"
          textAnchor="middle"
          fontFamily="Bungee"
          fontSize="30"
          fill={p.accent}
          opacity={0.6}
        >
          LEFT
        </text>
      </g>
    </>
  );
};

const NoteHeartbeat: React.FC<SceneProps> = ({ t, cue, p, id }) => {
  const glowId = `${id}-beat-glow`;
  const beat = pingPong(t, 0.9);
  const heartScale = 1 + beat * 0.14 + cue * 0.12;
  const lanes = [1330, 1460, 1590, 1720];
  const noteY = (index: number) =>
    ((t * (170 + cue * 260) + index * 140) % 500) - 60;
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={18} />
      </defs>
      <circle
        cx="1520"
        cy="460"
        r={300 + beat * 60}
        fill="none"
        stroke={p.accent}
        strokeWidth="2"
        opacity={0.35 + beat * 0.2}
        filter={`url(#${glowId})`}
      />
      <g transform={`scale(${heartScale}) translate(${1520 - 1520 * heartScale / 1} ${460 - 460 * heartScale / 1})`}>
        <path
          d="M1520 560 C1440 500 1390 460 1390 410 C1390 375 1418 348 1452 348 C1474 348 1494 362 1520 392 C1546 362 1566 348 1588 348 C1622 348 1650 375 1650 410 C1650 460 1600 500 1520 560Z"
          fill={p.accent}
          opacity="0.5"
          filter={`url(#${glowId})`}
        />
        <path
          d="M1520 560 C1440 500 1390 460 1390 410 C1390 375 1418 348 1452 348 C1474 348 1494 362 1520 392 C1546 362 1566 348 1588 348 C1622 348 1650 375 1650 410 C1650 460 1600 500 1520 560Z"
          fill={p.accent}
          opacity="0.85"
        />
      </g>
      <g>
        {lanes.map((cx, lane) => (
          <g key={cx}>
            <line
              x1={cx}
              y1={180}
              x2={cx}
              y2={560}
              stroke={p.detail}
              strokeWidth="6"
              opacity="0.4"
            />
            {[0, 1].map((item) => (
              <circle
                key={item}
                cx={cx}
                cy={noteY(item + lane * 3)}
                r={22 + (lane % 2) * 6}
                fill={lane % 2 ? p.secondary : p.light}
                opacity={0.5 + (lane % 2) * 0.3}
              />
            ))}
          </g>
        ))}
        <line x1="1290" y1="560" x2="1760" y2="560" stroke={p.accent} strokeWidth="10" />
      </g>
    </>
  );
};

const ShootApple: React.FC<SceneProps> = ({ t, cue, cue2, p, id }) => {
  const glowId = `${id}-basket-glow`;
  const progress = smooth(cue);
  const arcY = 300 - Math.sin(progress * Math.PI) * 260;
  const arcX = 1260 + progress * 260 + wave(t, 9) * 8;
  const flash = cue2 * (0.5 + pingPong(t, 1.1) * 0.5);
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={14} />
      </defs>
      <g transform={`translate(${1120 + orbit(t, 14, 10)} ${120 + wave(t, 12) * 6})`}>
        <rect x="200" y="0" width="460" height="620" rx="20" fill="#141026" stroke={p.detail} strokeWidth="8" />
        <rect x="232" y="32" width="396" height="70" rx="12" fill="#0C1024" />
        <text
          x="430"
          y="80"
          textAnchor="middle"
          fontFamily="Bungee"
          fontSize="36"
          fill={p.accent}
          opacity={0.5 + flash * 0.5}
        >
          APPLE
        </text>
        <rect x="240" y="150" width="380" height="300" fill="#0A0E1E" stroke={p.light} strokeWidth="6" opacity="0.7" />
        <path
          d="M430 160 L430 380 L520 330 L430 280 L340 330Z"
          fill="none"
          stroke={p.detail}
          strokeWidth="5"
          opacity="0.5"
        />
        <g transform={`translate(${arcX} ${arcY})`}>
          <Ball cx={0} cy={0} r={36} color="#FF4B3E" />
        </g>
        <g transform={`translate(430 150)`}>
          <path d="M-70 0 A70 45 0 0 0 70 0 A70 45 0 0 0 -70 0Z" fill="none" stroke={p.accent} strokeWidth="14" opacity={0.4 + flash * 0.6} filter={`url(#${glowId})`} />
          <circle cx={0} cy={0} r={40} fill={p.accent} opacity={0.3 + flash * 0.5} filter={`url(#${glowId})`} />
        </g>
        <rect x="240" y="560" width="380" height="30" rx="8" fill="#10101C" />
        <circle cx="280" cy="575" r="8" fill={p.accent} opacity={0.6 + flash * 0.4} />
        <circle cx="310" cy="575" r="8" fill={p.secondary} opacity={0.6} />
      </g>
    </>
  );
};

const CountdownSeat: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const total = Math.max(1, Math.ceil(5 - cue * 4.4));
  const digit = String(total);
  const blink = 0.6 + pingPong(t, 1.2) * 0.4;
  return (
    <>
      <g transform={`translate(${1180 + orbit(t, 13, 8)} ${130 + wave(t, 11) * 5})`}>
        <rect width="620" height="180" rx="18" fill="#141026" stroke={p.detail} strokeWidth="6" />
        <text
          x="310"
          y="70"
          textAnchor="middle"
          fontFamily="Bungee"
          fontSize="44"
          fill={p.light}
          opacity="0.85"
        >
          SEAT 04
        </text>
        <text
          x="310"
          y="140"
          textAnchor="middle"
          fontFamily="Bungee"
          fontSize="80"
          fill={p.accent}
          opacity={0.5 + blink * 0.5}
        >
          {digit}
        </text>
        <g transform={`translate(${120 + orbit(t, 8, 6)} 380)`}>
          <path d="M0 140 L0 60 Q0 0 80 0 L300 0 Q380 0 380 60 L380 140Z" fill={p.secondary} opacity="0.5" />
          <rect x="40" y="30" width="300" height="70" rx="12" fill={p.secondary} opacity="0.35" />
          <rect x="60" y="140" width="260" height="22" fill={p.detail} opacity="0.5" />
          <rect x="60" y="190" width="260" height="18" fill={p.detail} opacity="0.3" />
          <rect x="110" y="210" width="160" height="16" fill={p.detail} opacity="0.4" />
        </g>
        <g transform={`translate(${430 + orbit(t, 10, 8)} 500)`}>
          <rect width="120" height="120" rx="14" fill="#10101C" stroke={p.accent} strokeWidth="4" opacity={0.6 + cue * 0.4} />
          <text x="60" y="82" textAnchor="middle" fontFamily="Bungee" fontSize="54" fill={p.accent} opacity={0.5 + cue2 * 0.5}>
            {digit}
          </text>
        </g>
      </g>
    </>
  );
};

const CoinSlotScene: React.FC<SceneProps> = ({ t, cue, p, id }) => {
  const glowId = `${id}-slot-glow`;
  const coins = [0, 1, 2].map((index) => {
    const start = 0.18 + index * 0.3;
    const arc = smooth((cue - start) / 0.42);
    return {
      visible: cue > start,
      x: 1330 + (arc > 0 && arc < 1 ? arc * 260 : arc >= 1 ? 260 : 0),
      y: arc > 0 && arc < 1 ? 560 - Math.sin(arc * Math.PI) * 320 : arc >= 1 ? 560 : 80,
      opacity: arc >= 1 ? 0 : 1,
      phase: index,
    };
  });
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={12} />
      </defs>
      <g transform={`translate(${1120 + orbit(t, 15, 8)} ${120 + wave(t, 12) * 6})`}>
        <rect width="700" height="720" rx="36" fill="#141026" stroke={p.detail} strokeWidth="8" />
        <rect x="40" y="40" width="620" height="120" rx="16" fill="#0C1024" />
        <text x="350" y="122" textAnchor="middle" fontFamily="Bungee" fontSize="54" fill={p.accent} opacity={0.85}>
          INSERT COIN
        </text>
        <rect x="80" y="220" width="540" height="300" rx="20" fill="#0A0E1E" stroke={p.secondary} strokeWidth="4" opacity="0.7" />
        <CoinSlot
          x={250}
          y={580}
          width={200}
          height={90}
          accent="#FFC72C"
          detail={p.detail}
          surface="#10101C"
          lit={cue > 0}
        />
        {coins.map((coin) =>
          coin.visible ? (
            <g key={coin.phase} opacity={coin.opacity}>
              <Coin cx={coin.x} cy={coin.y} r={26} color="#FFC72C" glow={glowId} />
            </g>
          ) : null,
        )}
        <circle cx="90" cy="660" r="10" fill={p.accent} opacity={0.5 + pingPong(t, 2.4) * 0.5} />
        <circle cx="120" cy="660" r="10" fill={p.secondary} opacity={0.5} />
      </g>
    </>
  );
};

const ReelSpend: React.FC<SceneProps> = ({ t, cue, cue2, p, id }) => {
  const glowId = `${id}-reel-glow`;
  const symbols = ["¥", "★", "7", "¥", "★"];
  const speed = 320 + cue * 320 + cue2 * 160;
  const rainCount = 8 + Math.floor(cue * 8);
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={10} />
      </defs>
      <g transform={`translate(${1150 + orbit(t, 16, 8)} ${90 + wave(t, 13) * 5})`}>
        <rect width="660" height="820" rx="30" fill="#141026" stroke={p.detail} strokeWidth="8" />
        <rect x="30" y="80" width="600" height="30" rx="8" fill={p.accent} opacity={0.5 + pingPong(t, 3 + cue) * 0.5} />
        {[0, 1, 2].map((reel) => {
          const offset = (t * speed + reel * 200) % 220;
          return (
            <g key={reel}>
              <rect x={40 + reel * 205} y="140" width="180" height="420" rx="14" fill="#0C1024" stroke={p.detail} strokeWidth="4" />
              {[0, 1, 2, 3].map((slot) => (
                <text
                  key={slot}
                  x={130 + reel * 205}
                  y={260 + slot * 110 - offset}
                  textAnchor="middle"
                  fontFamily="Bungee"
                  fontSize="64"
                  fill={symbols[(slot + reel) % 5] === "¥" ? "#FFC72C" : p.light}
                  opacity="0.9"
                >
                  {symbols[(slot + reel) % 5]}
                </text>
              ))}
            </g>
          );
        })}
        <rect x="30" y="600" width="600" height="16" fill={p.detail} opacity="0.5" />
        <rect x="80" y="650" width="500" height="70" rx="12" fill="#0A0E1E" stroke={p.accent} strokeWidth="4" opacity="0.8" />
        <CoinSlot
          x={270}
          y={740}
          width={120}
          height={50}
          accent="#FFC72C"
          detail={p.detail}
          surface="#10101C"
          lit={cue > 0}
        />
        {Array.from({ length: rainCount }, (_, index) => {
          const y = ((t * (420 + cue * 260) + index * 160) % 600) - 60;
          return (
            <Coin
              key={index}
              cx={110 + ((index * 173) % 460)}
              cy={y}
              r={14 + (index % 3) * 4}
              color="#FFC72C"
              opacity={0.7}
            />
          );
        })}
      </g>
    </>
  );
};

const PrizeUnbuyable: React.FC<SceneProps> = ({ t, cue, p, id }) => {
  const glowId = `${id}-prize-glow`;
  const ticketX = 1380 + wave(t, 8) * 20;
  const ticketY = 220 + pingPong(t, 4.2) * 90;
  const ticketRotate = wave(t, 5.4) * 14;
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={12} />
      </defs>
      <g transform={`translate(${1140 + orbit(t, 14, 8)} ${90 + wave(t, 11) * 5})`}>
        <rect width="680" height="820" rx="30" fill="#141026" stroke={p.detail} strokeWidth="8" />
        <rect x="40" y="50" width="600" height="160" rx="14" fill="#0C1024" />
        <text x="340" y="158" textAnchor="middle" fontFamily="Bungee" fontSize="64" fill={p.accent} opacity={0.5 + cue * 0.5}>
          ¥0.00
        </text>
        <rect x="40" y="240" width="600" height="470" fill="#0A0E1E" />
        {[0, 1, 2, 3].map((index) => (
          <text
            key={index}
            x="90"
            y={330 + index * 90}
            fontFamily="Bungee"
            fontSize="42"
            fill={index === 0 ? p.light : p.detail}
            opacity={index === 0 ? 0.9 : 0.5}
          >
            {index === 0 ? "01 GOLDEN" : `0${index + 1} ------`}
          </text>
        ))}
        <g transform={`translate(${ticketX} ${ticketY}) rotate(${ticketRotate})`}>
          <rect x="-110" y="-40" width="220" height="80" rx="8" fill={p.light} opacity="0.9" />
          {[0, 1, 2].map((index) => (
            <line key={index} x1={-90 + index * 80} y1="-30" x2={-70 + index * 80} y2="-20" stroke={p.detail} strokeWidth="4" />
          ))}
          <line x1="-90" y1="10" x2="90" y2="10" stroke={p.detail} strokeWidth="4" opacity="0.6" />
          <circle cx="90" cy="14" r="10" fill="none" stroke={p.accent} strokeWidth="3" />
        </g>
        <rect x="40" y="740" width="600" height="50" rx="10" fill="#0A0E1E" stroke={p.secondary} strokeWidth="4" />
        <circle cx="90" cy="765" r="8" fill={p.accent} opacity={0.6} />
      </g>
    </>
  );
};

const SpeakerRumor: React.FC<SceneProps> = ({ t, p }) => {
  const runner = (index: number) =>
    ((t * (60 + index * 40) + index * 300) % 700) - 120;
  return (
    <>
      <g transform={`translate(${1180 + orbit(t, 15, 8)} ${110 + wave(t, 12) * 6})`}>
        {[0, 1, 2, 3, 4].map((index) => {
          const phase = ((t * 0.55 + index * 0.2) % 1);
          return (
            <circle
              key={index}
              cx="330"
              cy="330"
              r={phase * 380 + index * 0}
              fill="none"
              stroke={index % 2 ? p.accent : p.secondary}
              strokeWidth="6"
              opacity={(1 - phase) * 0.5}
            />
          );
        })}
        <Speaker cx={330} cy={330} r={150} color={p.accent} detail="#0A0E1E" />
        <circle cx="330" cy="330" r="150" fill="none" stroke={p.light} strokeWidth="3" opacity="0.3" />
        <text x="330" y="640" textAnchor="middle" fontFamily="Bungee" fontSize="44" fill={p.secondary} opacity="0.8">
          LOUDSPEAKER
        </text>
        {[0, 1, 2].map((index) => (
          <g key={index}>
            <circle
              cx={140 + runner(index)}
              cy={760 + (index % 2) * 40}
              r="26"
              fill={p.light}
              opacity="0.55"
            />
            <circle
              cx={140 + runner(index) + 40}
              cy={760 + (index % 2) * 40 + 14}
              r="20"
              fill={p.light}
              opacity="0.4"
            />
          </g>
        ))}
        <line x1="0" y1="870" x2="660" y2="870" stroke={p.detail} strokeWidth="14" opacity="0.3" />
      </g>
    </>
  );
};

const CloneRows: React.FC<SceneProps> = ({ t, cue, p }) => {
  const count = 2 + Math.floor(cue * 4);
  return (
    <>
      <g transform={`translate(${1150 + orbit(t, 17, 8)} ${180 + wave(t, 13) * 4})`}>
        {Array.from({ length: count }, (_, index) => {
          const baseX = index * (290 - index * 34);
          return (
            <g key={index} transform={`translate(${baseX} ${index * 46}) scale(${1 - index * 0.11})`}>
              <Cabinet
                x={0}
                y={0}
                width={250}
                height={420}
                accent={p.accent}
                detail={p.detail}
                surface="#141026"
                screen="#0C1024"
                label={`${index + 1}`}
                on={true}
              />
            </g>
          );
        })}
        <g transform={`translate(${90} ${620})`}>
          <Cabinet
            x={0}
            y={0}
            width={300}
            height={500}
            accent={p.secondary}
            detail={p.detail}
            surface="#141026"
            screen="#0C1024"
            label="SAME"
            on={true}
          />
        </g>
      </g>
    </>
  );
};

const ShootAppleReprise: React.FC<SceneProps> = ({ t, cue, cue2, p, id }) => {
  const glowId = `${id}-reprise-glow`;
  const progress = smooth(cue);
  const ballY = 780 - progress * 520;
  const flash = cue2 * (0.4 + pingPong(t, 0.9) * 0.6);
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={16} />
      </defs>
      <g transform={`translate(${1120 + orbit(t, 14, 8)} ${120 + wave(t, 11) * 5})`}>
        <rect x="180" y="0" width="460" height="780" rx="24" fill="#141026" stroke={p.detail} strokeWidth="8" />
        <rect x="210" y="30" width="400" height="90" rx="14" fill="#0C1024" />
        <text x="410" y="90" textAnchor="middle" fontFamily="Bungee" fontSize="40" fill={p.accent} opacity={0.6 + flash * 0.4}>
          REPLAY
        </text>
        <g transform="translate(410 170)">
          <path d="M-90 0 A90 55 0 0 0 90 0 A90 55 0 0 0 -90 0Z" fill="none" stroke={p.accent} strokeWidth="16" opacity={0.4 + flash * 0.6} filter={`url(#${glowId})`} />
          <path d="M-90 0 L-110 -90 L110 -90 L90 0Z" fill="none" stroke={p.detail} strokeWidth="10" opacity="0.6" />
        </g>
        {[0, 1, 2].map((index) => (
          <circle
            key={index}
            cx={260 + index * 150 + wave(t, 8 + index) * 10}
            cy={300 + index * 90}
            r={46 + index * 8}
            fill="none"
            stroke={index % 2 ? p.secondary : p.light}
            strokeWidth="4"
            opacity={0.3 + flash * 0.4}
          />
        ))}
        <g transform={`translate(410 ${ballY})`}>
          <Ball cx={0} cy={0} r={40} color="#FF4B3E" />
        </g>
        <rect x="210" y="700" width="400" height="34" rx="10" fill="#10101C" />
        <circle cx="260" cy="717" r="9" fill={p.accent} opacity={0.5 + flash * 0.5} />
      </g>
    </>
  );
};

const CountdownSeatReprise: React.FC<SceneProps> = ({ t, cue, p }) => {
  const cycle = Math.floor(t * (0.8 + cue * 2.2)) % 5;
  const digit = String(5 - cycle);
  const flip = 0.5 + pingPong(t, 0.7) * 0.5;
  return (
    <>
      <g transform={`translate(${1180 + orbit(t, 13, 8)} ${140 + wave(t, 11) * 5})`}>
        <g transform="translate(120 380)">
          <path d="M0 120 L0 50 Q0 0 70 0 L340 0 Q410 0 410 50 L410 120Z" fill={p.secondary} opacity="0.4" />
          <rect x="36" y="24" width="338" height="58" rx="10" fill={p.secondary} opacity="0.28" />
          <rect x="60" y="120" width="290" height="20" fill={p.detail} opacity="0.4" />
          <rect x="60" y="164" width="290" height="16" fill={p.detail} opacity="0.25" />
        </g>
        <rect width="620" height="170" rx="18" fill="#141026" stroke={p.detail} strokeWidth="6" />
        <text x="310" y="62" textAnchor="middle" fontFamily="Bungee" fontSize="40" fill={p.light} opacity="0.8">
          TIME LEFT
        </text>
        <text
          x="310"
          y="140"
          textAnchor="middle"
          fontFamily="Bungee"
          fontSize="92"
          fill={p.accent}
          opacity={0.55 + flip * 0.45}
        >
          {digit}
        </text>
        <rect x="40" y="600" width="540" height="120" rx="14" fill="#0A0E1E" stroke={p.accent} strokeWidth="4" opacity={0.7} />
        {Array.from({ length: 5 }, (_, index) => (
          <circle
            key={index}
            cx={80 + index * 120}
            cy={660}
            r={index === 4 - cycle ? 26 : 12}
            fill={index === 4 - cycle ? p.accent : p.detail}
            opacity={index === 4 - cycle ? 0.9 : 0.4}
          />
        ))}
      </g>
    </>
  );
};

const CoinSlotClose: React.FC<SceneProps> = ({ t, cue, cue2, p, id }) => {
  const glowId = `${id}-inside-glow`;
  const drops = [0, 1, 2].map((index) => {
    const start = 0.2 + index * 0.3;
    const arc = smooth((cue - start) / 0.45);
    const landed = arc >= 1;
    return {
      y: arc > 0 && arc < 1 ? 260 - arc * 200 : landed ? 60 + index * 34 : -60,
      opacity: landed ? 0.85 : 1,
      phase: index,
      landed,
    };
  });
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={12} />
      </defs>
      <g transform={`translate(${1120 + orbit(t, 14, 8)} ${110 + wave(t, 12) * 5})`}>
        <rect width="700" height="760" rx="36" fill="#141026" stroke={p.detail} strokeWidth="8" />
        <rect x="60" y="50" width="580" height="90" rx="16" fill="#0C1024" />
        <text x="350" y="110" textAnchor="middle" fontFamily="Bungee" fontSize="44" fill={p.accent} opacity="0.8">
          COIN TRAY
        </text>
        <rect x="180" y="200" width="340" height="110" rx="10" fill="#0A0E1E" stroke={p.accent} strokeWidth="4" opacity="0.9" />
        <rect x="200" y="200" width="300" height="26" rx="6" fill={p.accent} opacity={0.5} filter={`url(#${glowId})`} />
        {drops.map((drop) =>
          drop.landed ? (
            <Coin
              key={drop.phase}
              cx={300 + (drop.phase - 1) * 60}
              cy={drop.y}
              r={26}
              color="#FFC72C"
              opacity={drop.opacity}
            />
          ) : (
            <Coin key={drop.phase} cx={300} cy={drop.y} r={26} color="#FFC72C" glow={glowId} opacity={drop.opacity} />
          ),
        )}
        <rect x="100" y="430" width="500" height="220" rx="16" fill="#0C1024" />
        <text x="350" y="500" textAnchor="middle" fontFamily="Bungee" fontSize="38" fill={p.light} opacity="0.6">
          CREDIT
        </text>
        <text x="350" y="600" textAnchor="middle" fontFamily="Bungee" fontSize="110" fill="#FFC72C" opacity={0.85}>
          {String(1 + cue2)}
        </text>
      </g>
    </>
  );
};

const ReelJackpot: React.FC<SceneProps> = ({ t, cue, cue2, p, id }) => {
  const settle = smooth(cue);
  const speed = (1 - settle) * 340 + 30;
  const symbols = ["¥", "★", "7"];
  const glowId = `${id}-jackpot-glow`;
  const lamps = [0, 1, 2, 3, 4, 5].map((index) => ({
    on: settle > 0.4 || pingPong(t, 1.6 + index * 0.3) > 0.55,
  }));
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={12} />
      </defs>
      <g transform={`translate(${1150 + orbit(t, 15, 8)} ${90 + wave(t, 12) * 5})`}>
        <rect width="660" height="840" rx="30" fill="#141026" stroke={p.detail} strokeWidth="8" />
        {lamps.map((lamp, index) => (
          <circle
            key={index}
            cx={90 + index * 96}
            cy="46"
            r="14"
            fill={lamp.on ? p.accent : p.detail}
            opacity={lamp.on ? 1 : 0.35}
          />
        ))}
        {[0, 1, 2].map((reel) => {
          const offset = settle > 0.85 ? 0 : (t * speed + reel * 260) % 220;
          return (
            <g key={reel}>
              <rect x={40 + reel * 205} y="90" width="180" height="480" rx="14" fill="#0C1024" stroke={p.detail} strokeWidth="4" />
              {[0, 1, 2, 3].map((slot) => (
                <text
                  key={slot}
                  x={130 + reel * 205}
                  y={210 + slot * 120 - offset}
                  textAnchor="middle"
                  fontFamily="Bungee"
                  fontSize="76"
                  fill="#FFC72C"
                  opacity={settle > 0.85 ? 0.95 : 0.85}
                >
                  {symbols[reel]}
                </text>
              ))}
            </g>
          );
        })}
        <text
          x="330"
          y="700"
          textAnchor="middle"
          fontFamily="Bungee"
          fontSize={settle > 0.5 ? 54 : 40}
          fill={p.accent}
          opacity={0.5 + settle * 0.5}
          filter={settle > 0.5 ? `url(#${glowId})` : undefined}
        >
          JACKPOT
        </text>
        <CoinSlot
          x={270}
          y={760}
          width={120}
          height={50}
          accent="#FFC72C"
          detail={p.detail}
          surface="#10101C"
          lit={cue2 > 0.4}
        />
      </g>
    </>
  );
};

const PrizeReject: React.FC<SceneProps> = ({ t, cue, p }) => {
  const score = Math.max(0, Math.round(9999 * (1 - cue) - t * 320));
  const scoreText = String(score).padStart(4, "0");
  return (
    <>
      <g transform={`translate(${1140 + orbit(t, 13, 8)} ${100 + wave(t, 11) * 5})`}>
        <rect width="680" height="860" rx="30" fill="#141026" stroke={p.detail} strokeWidth="8" />
        <rect x="40" y="40" width="600" height="120" rx="14" fill="#0C1024" />
        <text x="340" y="122" textAnchor="middle" fontFamily="Bungee" fontSize="52" fill={p.light} opacity="0.85">
          HIGH SCORE
        </text>
        <rect x="40" y="200" width="600" height="520" fill="#0A0E1E" />
        {["DEEP", "SEEK", "V4"].map((name, index) => (
          <text
            key={name}
            x="100"
            y={330 + index * 130}
            fontFamily="Bungee"
            fontSize="56"
            fill={index === 0 ? p.accent : p.detail}
            opacity={0.9 - index * 0.2}
          >
            {name}
          </text>
        ))}
        {["DEEP", "SEEK", "V4"].map((name, index) => (
          <text
            key={`score-${name}`}
            x="560"
            y={330 + index * 130}
            textAnchor="end"
            fontFamily="Bungee"
            fontSize="56"
            fill={index === 0 ? p.accent : p.detail}
            opacity={0.9 - index * 0.2}
          >
            {scoreText}
          </text>
        ))}
        <rect x="40" y="760" width="600" height="60" rx="10" fill="#0A0E1E" stroke={p.secondary} strokeWidth="4" />
        <text x="340" y="802" textAnchor="middle" fontFamily="Bungee" fontSize="36" fill={p.secondary} opacity="0.8">
          NO MORE CREDIT
        </text>
      </g>
    </>
  );
};

const SofaTreasures: React.FC<SceneProps> = ({ t, cue, p, id }) => {
  const glowId = `${id}-sofa-glow`;
  const lit = (order: number) => 0.35 + smooth(cue - order * 0.16) * 0.65;
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={10} />
      </defs>
      <g transform={`translate(${1130 + orbit(t, 16, 8)} ${130 + wave(t, 12) * 5})`}>
        <NeonTube
          x={60}
          y={40}
          length={560}
          color={p.accent}
          glowId={glowId}
          radius={5}
          opacity={0.6 + cue * 0.4}
        />
        <text x="340" y="70" textAnchor="middle" fontFamily="Bungee" fontSize="40" fill={p.accent} opacity={0.5 + cue * 0.5}>
          LOUNGE
        </text>
        <Sofa
          x={80}
          y={430}
          width={560}
          height={300}
          color={p.secondary}
          dark={p.backgroundAlt}
        />
        <g opacity={lit(0)} transform={`translate(${110} ${150})`}>
          <Bearbrick cx={110} cy={210} size={220} color="#FF2E6E" belly="#F2F4F6" />
        </g>
        <g opacity={lit(1)} transform={`translate(${260} ${160})`}>
          <ChipBag x={120} y={130} size={150} color="#FFC72C" />
          <Ball cx={90} cy={200} r={52} color="#3DDC84" />
        </g>
        <g opacity={lit(2)} transform={`translate(${330} ${300})`}>
          <Sneaker x={60} y={330} size={200} color="#4A86FF" sole="#F2F4F6" />
        </g>
        <g opacity={lit(3)} transform={`translate(${60} ${430})`}>
          <Figurine cx={200} cy={90} r={70} color="#FFC72C" />
          <Figurine cx={330} cy={120} r={58} color="#4A86FF" />
        </g>
        <circle cx="640" cy="760" r="10" fill={p.accent} opacity={0.5 + pingPong(t, 2.8) * 0.5} />
      </g>
    </>
  );
};

const SofaCloseup: React.FC<SceneProps> = ({ t, cue, p }) => {
  const zoom = 1 + cue * 0.22;
  const lit = (order: number) => 0.35 + smooth(cue - order * 0.26) * 0.65;
  return (
    <>
      <g
        transform={`translate(${1130 + orbit(t, 13, 6)} ${140 + wave(t, 11) * 4}) scale(${zoom})`}
      >
        <Sofa x={100} y={480} width={520} height={280} color={p.secondary} dark={p.backgroundAlt} />
        <g opacity={lit(0)} transform={`translate(${150} ${250})`}>
          <Figurine cx={150} cy={150} r={95} color="#FFC72C" />
        </g>
        <g opacity={lit(1)} transform={`translate(${330} ${160})`}>
          <Bearbrick cx={120} cy={220} size={240} color="#FF2E6E" belly="#F2F4F6" />
        </g>
        <g opacity={lit(2)} transform={`translate(${420} ${360})`}>
          <ChipBag x={40} y={200} size={170} color="#FFC72C" />
        </g>
        <circle cx="620" cy="760" r="9" fill={p.accent} opacity={0.4 + pingPong(t, 2.4) * 0.6} />
      </g>
    </>
  );
};

const SignFlicker: React.FC<SceneProps> = ({ t, cue, p, id }) => {
  const glowId = `${id}-sign-glow`;
  const chars = ["不", "潮", "不", "用", "花", "钱"];
  const per = (index: number) => smooth(cue - index * 0.12);
  const globalFlicker = flicker(t, 2.2 + cue * 3);
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={11} />
      </defs>
      <g transform={`translate(${1180 + orbit(t, 17, 6)} ${140 + wave(t, 13) * 5})`}>
        <rect x="-40" y="-60" width="740" height="380" rx="20" fill="#141026" stroke={p.detail} strokeWidth="6" />
        {chars.map((char, index) => (
          <text
            key={index}
            x={index * 108 + 40}
            y="180"
            fontFamily="Bungee"
            fontSize="130"
            fill={p.accent}
            opacity={per(index) * globalFlicker}
            filter={per(index) > 0 ? `url(#${glowId})` : undefined}
          >
            {char}
          </text>
        ))}
        <NeonTube
          x={-20}
          y={240}
          length={680}
          color={p.secondary}
          glowId={glowId}
          radius={4}
          opacity={0.4 + cue * 0.5}
        />
      </g>
    </>
  );
};

const WindowLateNight: React.FC<SceneProps> = ({ t, p, id }) => {
  const glowId = `${id}-night-glow`;
  const tremble = 0.9 + wave(t, 18) * 0.06;
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={10} />
      </defs>
      <rect x="1120" y="80" width="120" height="920" fill="#08080F" />
      <rect x="1300" y="80" width="120" height="920" fill="#08080F" />
      <rect x="1480" y="80" width="120" height="920" fill="#08080F" />
      <rect x="1660" y="80" width="120" height="920" fill="#08080F" />
      <g transform={`translate(${1180 + orbit(t, 16, 6)} ${110 + wave(t, 12) * 4})`}>
        <rect
          width="600"
          height="560"
          rx="24"
          fill="#141026"
          stroke={p.detail}
          strokeWidth="6"
          opacity={tremble}
        />
        <rect
          x="24"
          y="80"
          width="552"
          height="380"
          rx="14"
          fill="#0C1024"
          stroke={p.accent}
          strokeWidth="3"
          opacity={0.35 * tremble}
        />
        <g opacity={0.4 * tremble}>
          <Bearbrick cx={170} cy={290} size={230} color={p.accent} />
        </g>
        <g opacity={0.3 * tremble}>
          <Sneaker x={340} y={260} size={180} color={p.secondary} />
        </g>
        <rect
          x="24"
          y="24"
          width="552"
          height="22"
          rx="8"
          fill={p.accent}
          opacity={0.3 * tremble}
          filter={`url(#${glowId})`}
        />
        <text
          x="300"
          y="610"
          textAnchor="middle"
          fontFamily="Bungee"
          fontSize="34"
          fill={p.light}
          opacity={0.3 * tremble}
        >
          OPEN 24H
        </text>
      </g>
    </>
  );
};

const CoinSlotFinal: React.FC<SceneProps> = ({ t, cue, cue2, p, id }) => {
  const glowId = `${id}-final-glow`;
  const reject = smooth(cue);
  const coinY = reject > 0 ? 480 - Math.sin(reject * Math.PI) * 220 : 480;
  const coinOpacity = reject > 0.5 ? 1 - (reject - 0.5) * 2 : 1;
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={12} />
      </defs>
      <g transform={`translate(${1120 + orbit(t, 14, 8)} ${120 + wave(t, 12) * 5})`}>
        <rect width="700" height="720" rx="36" fill="#141026" stroke={p.detail} strokeWidth="8" />
        <rect x="40" y="40" width="620" height="120" rx="16" fill="#0C1024" />
        <text x="350" y="122" textAnchor="middle" fontFamily="Bungee" fontSize="50" fill={p.accent} opacity={0.4 + pingPong(t, 3.4) * 0.5}>
          SLOT FULL
        </text>
        <CoinSlot
          x={230}
          y={430}
          width={240}
          height={100}
          accent="#FFC72C"
          detail={p.detail}
          surface="#10101C"
          lit={false}
        />
        {[0, 1, 2].map((index) => (
          <Coin
            key={index}
            cx={350 + (index - 1) * 70}
            cy={390 - index * 44}
            r={26}
            color="#FFC72C"
            opacity={0.5}
          />
        ))}
        {reject > 0 ? (
          <Coin
            cx={350}
            cy={coinY}
            r={26}
            color="#FFC72C"
            glow={glowId}
            opacity={coinOpacity}
          />
        ) : null}
        <text
          x="350"
          y="700"
          textAnchor="middle"
          fontFamily="Bungee"
          fontSize="36"
          fill={p.secondary}
          opacity={0.5 + cue2 * 0.5}
        >
          REJECTED
        </text>
      </g>
    </>
  );
};

const ReelBreak: React.FC<SceneProps> = ({ t, cue, p }) => {
  const unstable = 1 + Math.abs(wave(t, 2.2 + cue * 2)) * 1.4;
  const speed = 300 * unstable;
  const lampFlicker = flicker(t, 1.6 + cue * 2);
  return (
    <>
      <g transform={`translate(${1150 + orbit(t, 15, 8)} ${90 + wave(t, 12) * 5})`}>
        <rect width="660" height="840" rx="30" fill="#141026" stroke={p.detail} strokeWidth="8" />
        <rect x="40" y="40" width="580" height="26" rx="8" fill={p.accent} opacity={0.3 * lampFlicker} />
        {[0, 1, 2].map((reel) => {
          const offset = (t * speed + reel * 300) % 220;
          return (
            <g key={reel}>
              <rect x={40 + reel * 205} y="90" width="180" height="480" rx="14" fill="#0C1024" stroke={p.detail} strokeWidth="4" />
              {[0, 1, 2, 3].map((slot) => (
                <text
                  key={slot}
                  x={130 + reel * 205}
                  y={210 + slot * 120 - offset}
                  textAnchor="middle"
                  fontFamily="Bungee"
                  fontSize="76"
                  fill={reel === 1 && pingPong(t, 1.1) > 0.6 ? "#FF4B3E" : "#FFC72C"}
                  opacity="0.85"
                >
                  {["¥", "★", "7"][(slot + reel) % 3]}
                </text>
              ))}
            </g>
          );
        })}
        <rect x="80" y="610" width="500" height="90" rx="12" fill="#0A0E1E" stroke={p.accent} strokeWidth="3" opacity={0.5 + cue * 0.4} />
        <g transform={`translate(${150 + pingPong(t, 5) * 340} ${760}) rotate(${wave(t, 3) * 8})`}>
          <rect x="-90" y="-28" width="180" height="56" rx="6" fill={p.light} opacity="0.85" />
          <line x1="-70" y1="-14" x2="70" y2="-14" stroke={p.detail} strokeWidth="3" />
          <line x1="-70" y1="6" x2="40" y2="6" stroke={p.detail} strokeWidth="3" />
        </g>
      </g>
    </>
  );
};

const PrizeEmpty: React.FC<SceneProps> = ({ t, cue, p, id }) => {
  const glowId = `${id}-empty-glow`;
  const fall = smooth(cue);
  const coinY = 320 - fall * 240 + pingPong(t, 7) * 6;
  const bounce = fall > 0 ? Math.max(0, 1 - fall * 1.6) : 0;
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={10} />
      </defs>
      <g transform={`translate(${1140 + orbit(t, 13, 8)} ${100 + wave(t, 11) * 5})`}>
        <rect width="680" height="820" rx="30" fill="#141026" stroke={p.detail} strokeWidth="8" />
        <rect x="40" y="40" width="600" height="120" rx="14" fill="#0C1024" />
        <text x="340" y="122" textAnchor="middle" fontFamily="Bungee" fontSize="52" fill={p.light} opacity="0.7">
          EMPTY
        </text>
        <rect x="40" y="200" width="600" height="430" fill="#0A0E1E" />
        <rect x="140" y="260" width="400" height="320" rx="14" fill="#08080F" stroke={p.detail} strokeWidth="4" opacity="0.8" />
        <path
          d={`M140 ${520} Q340 ${560 + wave(t, 8) * 14} 540 ${520}`}
          fill="none"
          stroke={p.detail}
          strokeWidth="6"
          opacity="0.5"
        />
        {fall > 0 ? (
          <Coin
            cx={340}
            cy={coinY}
            r={24}
            color="#FFC72C"
            glow={glowId}
            opacity={0.6 + bounce * 0.4}
          />
        ) : null}
        <rect x="40" y="690" width="600" height="90" rx="12" fill="#0A0E1E" stroke={p.secondary} strokeWidth="4" />
        <text x="340" y="750" textAnchor="middle" fontFamily="Bungee" fontSize="38" fill={p.secondary} opacity="0.6">
          TRY AGAIN
        </text>
      </g>
    </>
  );
};

const Shutdown: React.FC<SceneProps> = ({ t, cue, p }) => {
  const off = (order: number) => smooth(cue - order * 0.2);
  return (
    <>
      <g transform={`translate(${1140 + orbit(t, 15, 6)} ${150 + wave(t, 12) * 4})`}>
        {[0, 1, 2, 3].map((index) => {
          const x = index * 165;
          const y = index * 55;
          return (
            <g key={index} transform={`translate(${x} ${y}) scale(${1 - index * 0.06})`}>
              <Cabinet
                x={0}
                y={0}
                width={240}
                height={430}
                accent={p.accent}
                detail={p.detail}
                surface="#141026"
                screen="#0C1024"
                label={`${index + 1}`}
                on={off(index) < 0.5}
              />
              <rect
                x="0"
                y="0"
                width="240"
                height="430"
                rx="14"
                fill="#08080F"
                opacity={off(index) * 0.85}
              />
            </g>
          );
        })}
        <text
          x="330"
          y="870"
          textAnchor="middle"
          fontFamily="Bungee"
          fontSize="40"
          fill={p.detail}
          opacity={0.4 + pingPong(t, 4) * 0.2}
        >
          CLOSING
        </text>
      </g>
    </>
  );
};

const LastSign: React.FC<SceneProps> = ({ t, cue, p, id }) => {
  const glowId = `${id}-last-glow`;
  const chars = ["不", "潮", "不", "用", "花", "钱"];
  const out = (order: number) => smooth(cue - order * 0.14);
  const finalPulse = 0.4 + pingPong(t, 2.6) * 0.6;
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={11} />
      </defs>
      <g transform={`translate(${1180 + orbit(t, 16, 5)} ${150 + wave(t, 12) * 4})`}>
        <rect x="-40" y="-60" width="740" height="380" rx="20" fill="#141026" stroke={p.detail} strokeWidth="6" opacity="0.8" />
        {chars.map((char, index) => {
          const isLast = index === 5;
          const on = 1 - out(index);
          return (
            <text
              key={index}
              x={index * 108 + 40}
              y="180"
              fontFamily="Bungee"
              fontSize="130"
              fill={p.accent}
              opacity={isLast ? on * finalPulse : on}
              filter={isLast ? `url(#${glowId})` : undefined}
            >
              {char}
            </text>
          );
        })}
      </g>
    </>
  );
};

const FinalCoin: React.FC<SceneProps> = ({ t, cue2, p, id }) => {
  const glowId = `${id}-gameover-glow`;
  const launch = pingPong(t, 3.6, 0.8);
  const coinX = 1380 + launch * 240;
  const coinY = 560 - Math.sin(launch * Math.PI) * 320;
  const fade = 1 - smooth(cue2);
  const gameOver = pingPong(t, 1.8) > 0.5;
  return (
    <>
      <defs>
        <GlowFilter id={glowId} strength={13} />
      </defs>
      <g opacity={fade}>
        <g transform={`translate(${1120 + orbit(t, 14, 8)} ${120})`}>
          <rect width="700" height="720" rx="36" fill="#141026" stroke={p.detail} strokeWidth="8" />
          <rect x="40" y="40" width="620" height="110" rx="16" fill="#0C1024" />
          <CoinSlot
            x={230}
            y={430}
            width={240}
            height={100}
            accent="#FFC72C"
            detail={p.detail}
            surface="#10101C"
            lit={false}
          />
          <text
            x="350"
            y="700"
            textAnchor="middle"
            fontFamily="Bungee"
            fontSize="42"
            fill={p.secondary}
            opacity={0.6 + cue2 * 0.4}
          >
            OUT OF ORDER
          </text>
        </g>
        {launch > 0.02 ? (
          <Coin cx={coinX} cy={coinY} r={26} color="#FFC72C" glow={glowId} opacity={1 - launch * 0.5} />
        ) : null}
        <text
          x="960"
          y="560"
          textAnchor="middle"
          fontFamily="Bungee"
          fontSize={gameOver ? 200 : 190}
          fill={p.accent}
          opacity={gameOver ? 0.85 : 0.5}
          filter={`url(#${glowId})`}
        >
          GAME OVER
        </text>
        <line x1="760" y1="700" x2="1160" y2="700" stroke={p.detail} strokeWidth="4" opacity="0.3" />
        <circle cx="960" cy="730" r="10" fill={p.accent} opacity={0.5} />
      </g>
    </>
  );
};

const Artwork: React.FC<SceneProps> = (props) => {
  switch (props.scene) {
    case "power-screen":
      return <PowerScreen {...props} />;
    case "window-promise":
      return <WindowPromise {...props} />;
    case "pinball-left":
      return <PinballLeft {...props} />;
    case "note-heartbeat":
      return <NoteHeartbeat {...props} />;
    case "shoot-apple":
      return <ShootApple {...props} />;
    case "countdown-seat":
      return <CountdownSeat {...props} />;
    case "coin-slot":
      return <CoinSlotScene {...props} />;
    case "reel-spend":
      return <ReelSpend {...props} />;
    case "prize-unbuyable":
      return <PrizeUnbuyable {...props} />;
    case "speaker-rumor":
      return <SpeakerRumor {...props} />;
    case "clone-rows":
      return <CloneRows {...props} />;
    case "shoot-apple-reprise":
      return <ShootAppleReprise {...props} />;
    case "countdown-seat-reprise":
      return <CountdownSeatReprise {...props} />;
    case "coin-slot-close":
      return <CoinSlotClose {...props} />;
    case "reel-jackpot":
      return <ReelJackpot {...props} />;
    case "prize-reject":
      return <PrizeReject {...props} />;
    case "sofa-treasures":
      return <SofaTreasures {...props} />;
    case "sofa-closeup":
      return <SofaCloseup {...props} />;
    case "sign-flicker":
      return <SignFlicker {...props} />;
    case "window-late-night":
      return <WindowLateNight {...props} />;
    case "coin-slot-final":
      return <CoinSlotFinal {...props} />;
    case "reel-break":
      return <ReelBreak {...props} />;
    case "prize-empty":
      return <PrizeEmpty {...props} />;
    case "shutdown":
      return <Shutdown {...props} />;
    case "last-sign":
      return <LastSign {...props} />;
    case "final-coin":
      return <FinalCoin {...props} />;
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
  const cue = smooth((localMs - cueAt) / 720);
  const cue2At = cueAt + Math.min(700, Math.max(380, pageDuration * 0.15));
  const cue2 = smooth((localMs - cue2At) / 1250);
  const entry = smooth(localMs / 660);
  const props: SceneProps = {
    t: localMs / 1000,
    localMs,
    cue,
    cue2,
    entry,
    progress,
    p: page.palette,
    id: `deepseek-${page.id}`,
    index: page.index,
    scene: page.scene,
  };
  const camera = SCENE_CAMERAS[page.scene];
  const stage = cue * 0.72 + cue2 * 0.28;
  const cameraScale = 1 + stage * (camera.scale - 1);
  const entryDirection = (page.index % 3) - 1;
  const artEntryX = (1 - entry) * entryDirection * 46;
  const artEntryY = (1 - entry) * (page.index % 2 === 0 ? -20 : 20);
  const artDriftX = wave(props.t, 15 + (page.index % 6), page.index * 0.21) * 8;
  const artDriftY = wave(props.t, 19 + (page.index % 4), page.index * 0.15) * 6;
  const artworkTransform = [
    `translate(${artEntryX + artDriftX + stage * camera.x} ${artEntryY + artDriftY + stage * camera.y})`,
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
        <Dust {...props} />
        <g opacity={entry} transform={artworkTransform}>
          <Artwork {...props} />
        </g>
      </svg>
    </div>
  );
};
