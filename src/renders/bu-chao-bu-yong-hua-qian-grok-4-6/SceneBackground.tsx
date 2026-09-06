import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { lyricLines } from "./lyrics";
import {
  Apple,
  Brick,
  Cabinet,
  Chick,
  Coin,
  Door,
  Eyes,
  Figure,
  Lamp,
  LeftHand,
  Plaque,
  Print,
  Room,
  Shirt,
  Smudge,
  Sofa,
  Vinyl,
  Window,
  ping,
  wave,
} from "./ScenePrimitives";
import type { LyricPage, PagePalette, SceneKind } from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type SceneProps = {
  page: LyricPage;
  p: PagePalette;
  t: number;
  cue: number;
  progress: number;
};

const CurtainLift: React.FC<SceneProps> = ({ page, p, t, cue }) => {
  const open = 0.12 + cue * 0.78 + ping(t * 1000, 11000) * 0.03;
  const width = 980 * (1 - open);
  return (
    <Room
      id={page.id}
      p={p}
      camera={{ x: -30 - cue * 70, y: 8, scale: 1.06 + cue * 0.1, rotate: -1.1 }}
    >
      <Window x={80} y={80} p={p} />
      <Shirt x={1680} y={220} sway={wave(t * 1000, 5200) * 3} p={p} />
      <Sofa x={1120} y={610} p={p} />
      <Apple x={420} y={828 + wave(t * 1000, 4200) * 8} />
      <rect x="-80" y="-80" width={width} height="980" fill={p.accent} />
      <rect x={2000 - width} y="-80" width={width} height="980" fill={p.secondary} />
    </Room>
  );
};

const NameDrop: React.FC<SceneProps> = ({ page, p, t, cue }) => (
  <Room id={page.id} p={p} camera={{ x: 24, y: -28 + cue * 22, scale: 1.04, rotate: 0.7 }}>
    <Cabinet x={80} y={430} p={p} />
    <Sofa x={1040} y={600} p={p} />
    <Brick x={1260} y={180 + cue * 340} scale={0.92 + cue * 0.18} p={p} />
    <Chick x={1480} y={120 + cue * 380} />
    <Apple x={1680} y={80 + cue * 430 + wave(t * 1000, 2800) * 5} scale={0.82} />
    <Vinyl x={220} y={470} spin={cue * 18} />
  </Room>
);

const LeftStamp: React.FC<SceneProps> = ({ page, p, t, cue }) => {
  const x = 1760 - ping(t * 1000, 6400) * 780 - cue * 160;
  return (
    <Room id={page.id} p={p} camera={{ x: -120, y: 0, scale: 1.14, rotate: -2.2 }}>
      <Print x={180} y={280} rotate={-18} opacity={0.18 + cue * 0.35} p={p} />
      <Print x={320} y={520} rotate={12} opacity={0.12 + cue * 0.4} p={p} />
      <Print x={140} y={720} rotate={-8} opacity={0.1 + cue * 0.3} p={p} />
      <LeftHand x={x} y={470} rotate={-16} scale={1.7} p={p} />
      <Sofa x={80} y={700} scale={0.62} p={p} />
    </Room>
  );
};

const PulseOpen: React.FC<SceneProps> = ({ page, p, t, cue }) => (
  <Room id={page.id} p={p} camera={{ x: 16, y: -36, scale: 1.12 + cue * 0.08, rotate: 0 }}>
    <Lamp x={1500} y={150} glow={0.28 + ping(t * 1000, 1280) * 0.72} p={p} />
    <Eyes x={960} y={400} open={cue} p={p} />
    <Sofa x={200} y={710} scale={0.78} p={p} />
    <Shirt x={420} y={180} sway={wave(t * 1000, 4600) * 2} p={p} />
  </Room>
);

const AppleFall: React.FC<SceneProps> = ({ page, p, t, cue }) => (
  <Room id={page.id} p={p} camera={{ x: 46, y: cue * 48, scale: 1.08, rotate: 1.6 }}>
    <Lamp x={300} y={90} glow={0.34} p={p} />
    <Window x={70} y={70} p={p} />
    <Apple x={1520} y={-90 + cue * 790} scale={1.45} rotate={cue * 48 + wave(t * 1000, 900) * 4} />
    <Sofa x={940} y={640} p={p} />
  </Room>
);

const SitDown: React.FC<SceneProps> = ({ page, p, cue }) => (
  <Room id={page.id} p={p} camera={{ x: -18, y: 28 + cue * 26, scale: 1.16, rotate: 0 }}>
    <Sofa x={1000} y={540} squat={cue} p={p} />
    <rect x="1228" y={410 + cue * 48} width="92" height="136" rx="42" fill={p.accent} />
    <circle cx="1274" cy={372 + cue * 48} r="38" fill={p.light} />
    <Vinyl x={420} y={820} spin={cue * -12} />
  </Room>
);

const KnockPinch: React.FC<SceneProps> = ({ page, p, t, cue }) => {
  const knock = Math.abs(wave(t * 1000, 380));
  return (
    <Room id={page.id} p={p} camera={{ x: -70, y: 4, scale: 1.1, rotate: -0.9 }}>
      <Door x={1410} y={200} open={0} p={p} />
      <circle cx={1524} cy={448} r={16 + knock * 28} fill={p.accent} opacity={0.4 + knock * 0.45} />
      <LeftHand x={500} y={610} rotate={10} scale={1.14} p={p} />
      <Coin x={650 - cue * 86} y={638} spin={1 - cue * 0.45} />
      <Sofa x={40} y={780} scale={0.5} p={p} />
    </Room>
  );
};

const NailSkill: React.FC<SceneProps> = ({ page, p, t, cue, progress }) => (
  <Room
    id={page.id}
    p={p}
    camera={{
      x: 8 + progress * 20,
      y: -8 + progress * 16,
      scale: 1.04 + progress * 0.16,
      rotate: 0,
    }}
  >
    <Sofa x={980} y={590} p={p} />
    <Coin x={1160} y={120 + cue * 620 + wave(t * 1000, 2200) * 6 * cue} spin={0.55 + ping(t * 1000, 1800) * 0.45} />
    <Coin x={1360} y={40 + cue * 700} spin={0.7} />
    <Coin x={1560} y={-20 + cue * 760} />
    <Coin x={1080} y={200 + cue * 540} />
    <Plaque x={1248} y={548} w={236} h={96} p={p} />
    <Shirt x={240} y={180} sway={wave(t * 1000, 8000) * 2} p={p} />
  </Room>
);

const RumorWalk: React.FC<SceneProps> = ({ page, p, t, cue }) => {
  const walk = ping(t * 1000, 9000);
  return (
    <Room id={page.id} p={p} camera={{ x: 90, y: 12, scale: 1.02, rotate: 2.1 }}>
      <path
        d={`M60 ${830 + cue * 36} Q960 620 1860 860`}
        fill="none"
        stroke={p.accent}
        strokeWidth="16"
        opacity="0.5"
      />
      <Figure x={160 + walk * 1480} y={780} lean={wave(t * 1000, 520) * 6} p={p} />
      <Figure x={40 + walk * 1480} y={808} lean={wave(t * 1000, 520, 80) * 6} p={p} />
      <Window x={1540} y={70} p={p} />
    </Room>
  );
};

const CloneStop: React.FC<SceneProps> = ({ page, p, t, cue }) => (
  <Room id={page.id} p={p} camera={{ x: -24, y: 18, scale: 1.1, rotate: 0 }}>
    {Array.from({ length: 7 }, (_, index) => (
      <Figure
        key={index}
        x={220 + index * 220 + (cue > 0.45 && index === 3 ? 0 : wave(t * 1000, 1400, index * 40) * 10)}
        y={760}
        stopped={cue > 0.45 && index === 3}
        lean={cue > 0.45 && index === 3 ? -8 : 0}
        p={p}
      />
    ))}
  </Room>
);

const AppleSide: React.FC<SceneProps> = ({ page, p, t, cue }) => (
  <Room id={page.id} p={p} camera={{ x: 140, y: -48, scale: 1.2, rotate: -3.2 }}>
    <rect x="1500" y="40" width="420" height="620" fill={p.light} opacity="0.16" />
    <Lamp x={1680} y={80} glow={0.4} p={p} />
    <Apple x={1688} y={80 + cue * 640} scale={1.22} rotate={wave(t * 1000, 1600) * 8} />
    <Sofa x={160} y={690} scale={0.72} p={p} />
  </Room>
);

const SeatSpot: React.FC<SceneProps> = ({ page, p, t, cue }) => (
  <Room id={page.id} p={p} camera={{ x: -8, y: 48, scale: 1.24, rotate: 0 }}>
    <ellipse
      cx="1310"
      cy="500"
      rx={180 + cue * 120}
      ry={120 + cue * 30}
      fill={p.light}
      opacity={0.18 + ping(t * 1000, 2400) * 0.16}
    />
    <Sofa x={1020} y={530} p={p} />
  </Room>
);

const DoorRefuse: React.FC<SceneProps> = ({ page, p, t, cue }) => (
  <Room id={page.id} p={p} camera={{ x: -110, y: 0, scale: 1.12, rotate: -1.1 }}>
    <Door x={1440} y={180} open={0} p={p} />
    <circle cx={1552} cy={420} r={10 + Math.abs(wave(t * 1000, 360)) * 24} fill={p.detail} opacity="0.48" />
    <LeftHand x={500} y={630} rotate={-10} scale={1.28} p={p} />
    <Plaque x={410} y={690} w={140} h={72} p={p} />
    <Figure x={1720 + cue * 80} y={830} p={p} />
    <Sofa x={20} y={800} scale={0.46} p={p} />
  </Room>
);

const CoinSlide: React.FC<SceneProps> = ({ page, p, cue }) => (
  <Room id={page.id} p={p} camera={{ x: 36, y: 28, scale: 1.14, rotate: 1.1 }}>
    <Sofa x={940} y={540} p={p} />
    <Coin x={1160 + cue * 460} y={500 + cue * 310} spin={1 - cue * 0.6} />
    <Coin x={1340 + cue * 400} y={470 + cue * 350} spin={0.7} />
    <Plaque x={1208} y={536} w={220} h={90} p={p} />
  </Room>
);

const ClimbToys: React.FC<SceneProps> = ({ page, p, cue }) => (
  <Room id={page.id} p={p} camera={{ x: 18, y: 8, scale: 1.12, rotate: -0.6 }}>
    <Sofa x={960} y={590} p={p} />
    <Chick x={1200} y={740 - cue * 250} />
    <Brick x={1440} y={780 - cue * 280} p={p} />
    <Cabinet x={80} y={420} p={p} />
  </Room>
);

const OccupySofa: React.FC<SceneProps> = ({ page, p, t, cue }) => (
  <Room id={page.id} p={p} camera={{ x: -48, y: 22, scale: 1.2, rotate: 1.3 }}>
    <Sofa x={900} y={550} squat={cue * 0.25} p={p} />
    <Smudge x={1260} y={548} scale={1 + cue * 0.35} p={p} />
    <rect
      x="1490"
      y={500 + wave(t * 1000, 1700) * 12}
      width="78"
      height="42"
      fill={p.foreground}
    />
  </Room>
);

const CrowdSofa: React.FC<SceneProps> = ({ page, p, cue }) => (
  <Room id={page.id} p={p} camera={{ x: 80, y: -24, scale: 1.26, rotate: -2.6 }}>
    <Sofa x={820} y={610} squat={0.18 + cue * 0.2} p={p} />
    <Chick x={1080} y={540} />
    <Brick x={1280} y={520} p={p} />
    <Smudge x={1480} y={590} p={p} />
    <Apple x={1660} y={630} scale={0.72} />
    <rect x="960" y={460 - cue * 24} width="86" height="52" fill={p.light} />
  </Room>
);

const EmptyCorner: React.FC<SceneProps> = ({ page, p, t }) => (
  <Room id={page.id} p={p} camera={{ x: -160, y: 48, scale: 1.32, rotate: 0.4 }}>
    <Sofa x={1080} y={560} p={p} />
    <Smudge x={1720} y={760 + wave(t * 1000, 5200) * 10} scale={0.62} p={p} />
    <Window x={40} y={80} p={p} />
  </Room>
);

const LookBack: React.FC<SceneProps> = ({ page, p, cue }) => (
  <Room id={page.id} p={p} camera={{ x: 8, y: 0, scale: 1.08, rotate: -10 + cue * 14 }}>
    <Lamp x={380} y={140} glow={0.48} p={p} />
    <Sofa x={1060} y={600} p={p} />
    <Figure x={1380} y={750} stopped lean={-12} p={p} />
  </Room>
);

const AlreadyThere: React.FC<SceneProps> = ({ page, p, t }) => (
  <Room id={page.id} p={p} camera={{ x: 28, y: 14, scale: 1.1, rotate: 0.5 }}>
    <Sofa x={980} y={570} p={p} />
    <Brick x={1240} y={508 + wave(t * 1000, 4600) * 5} p={p} />
    <Chick x={1460} y={488} />
    <Apple x={1640} y={608} />
    <Vinyl x={240} y={820} spin={wave(t * 1000, 8000) * 8} />
  </Room>
);

const RestampTitle: React.FC<SceneProps> = ({ page, p, cue }) => (
  <Room id={page.id} p={p} camera={{ x: -150, y: 0, scale: 1.18, rotate: -1.2 }}>
    <Print x={160} y={240} rotate={-20} opacity={0.2 + cue * 0.5} p={p} />
    <Print x={280} y={460} rotate={14} opacity={0.15 + cue * 0.45} p={p} />
    <Print x={120} y={700} rotate={-6} opacity={0.12 + cue * 0.4} p={p} />
    <LeftHand x={680} y={490} rotate={-24} scale={1.7 + cue * 0.22} p={p} />
    <Sofa x={1180} y={690} scale={0.66} p={p} />
  </Room>
);

const SkillCloseup: React.FC<SceneProps> = ({ page, p, cue }) => (
  <Room id={page.id} p={p} camera={{ x: 90, y: 70, scale: 1.52 + cue * 0.12, rotate: 0 }}>
    <Sofa x={680} y={400} p={p} />
    <Plaque x={960} y={360} w={300 + cue * 40} h={128} p={p} />
  </Room>
);

const EnglishWide: React.FC<SceneProps> = ({ page, p, t }) => (
  <Room id={page.id} p={p} camera={{ x: 0, y: -18, scale: 0.96, rotate: 0 }}>
    <Lamp x={220} y={110} glow={0.3 + ping(t * 1000, 2100) * 0.45} p={p} />
    <Lamp x={1700} y={130} glow={0.22 + ping(t * 1000, 2100, 400) * 0.35} p={p} />
    <Window x={820} y={60} p={p} />
    <Sofa x={620} y={640} p={p} />
    <Shirt x={160} y={220} sway={wave(t * 1000, 5400) * 3} p={p} />
  </Room>
);

const EnglishNear: React.FC<SceneProps> = ({ page, p, cue }) => (
  <Room id={page.id} p={p} camera={{ x: 48, y: 56, scale: 1.36, rotate: 1.6 }}>
    <Sofa x={880} y={460} p={p} />
    <Chick x={1160} y={410 - cue * 28} />
  </Room>
);

const PlaidFace: React.FC<SceneProps> = ({ page, p, t }) => (
  <Room
    id={page.id}
    p={p}
    camera={{ x: -220, y: -90, scale: 1.82, rotate: wave(t * 1000, 9000) * 1.4 }}
  >
    <Shirt x={980} y={240} sway={wave(t * 1000, 5000) * 2} p={p} />
    <Sofa x={1120} y={720} scale={0.5} p={p} />
  </Room>
);

const LightLeft: React.FC<SceneProps> = ({ page, p, cue }) => (
  <Room id={page.id} p={p} camera={{ x: -180, y: 8, scale: 1.22, rotate: 0 }} dim={0.12 + cue * 0.32}>
    <ellipse cx="210" cy="520" rx="280" ry="460" fill={p.light} opacity="0.24" />
    <Sofa x={1100} y={640} p={p} />
    <LeftHand x={260} y={560} rotate={-28} scale={1.1} p={p} />
  </Room>
);

const PunchOut: React.FC<SceneProps> = ({ page, p, t, progress }) => (
  <Room id={page.id} p={p} camera={{ x: 0, y: 18, scale: 1.04, rotate: 0 }} dim={progress * 0.62}>
    {Array.from({ length: 6 }, (_, index) => (
      <circle
        key={index}
        cx={360 + index * 200}
        cy={520 + wave(t * 1000, 1100, index * 50) * 14}
        r={16 + ping(t * 1000, 1500, index * 90) * 26}
        fill={p.background}
        stroke={p.accent}
        strokeWidth="7"
      />
    ))}
    <Plaque x={140} y={420} w={220} h={96} p={p} />
  </Room>
);

const SCENES: Record<SceneKind, React.FC<SceneProps>> = {
  "curtain-lift": CurtainLift,
  "name-drop": NameDrop,
  "left-stamp": LeftStamp,
  "pulse-open": PulseOpen,
  "apple-fall": AppleFall,
  "sit-down": SitDown,
  "knock-pinch": KnockPinch,
  "nail-skill": NailSkill,
  "rumor-walk": RumorWalk,
  "clone-stop": CloneStop,
  "apple-side": AppleSide,
  "seat-spot": SeatSpot,
  "door-refuse": DoorRefuse,
  "coin-slide": CoinSlide,
  "climb-toys": ClimbToys,
  "occupy-sofa": OccupySofa,
  "crowd-sofa": CrowdSofa,
  "empty-corner": EmptyCorner,
  "look-back": LookBack,
  "already-there": AlreadyThere,
  "restamp-title": RestampTitle,
  "skill-closeup": SkillCloseup,
  "english-wide": EnglishWide,
  "english-near": EnglishNear,
  "plaid-face": PlaidFace,
  "light-left": LightLeft,
  "punch-out": PunchOut,
};

export const SceneBackground: React.FC<{ page: LyricPage; opacity: number }> = ({
  page,
  opacity,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localMs = (frame / fps) * 1000;
  const globalMs = page.startMs + localMs;
  const second = page.lineIndexes[1] != null ? lyricLines[page.lineIndexes[1]] : null;
  const cue = second
    ? interpolate(globalMs, [second.startMs, second.startMs + 420], [0, 1], clamp)
    : interpolate(localMs, [0, 900], [0, 1], clamp);
  const progress = interpolate(
    localMs,
    [0, Math.max(1, page.endMs - page.startMs)],
    [0, 1],
    clamp,
  );
  const Scene = SCENES[page.scene];
  return (
    <div style={{ position: "absolute", inset: 0, opacity, background: page.palette.background }}>
      <Scene page={page} p={page.palette} t={localMs / 1000} cue={cue} progress={progress} />
    </div>
  );
};
