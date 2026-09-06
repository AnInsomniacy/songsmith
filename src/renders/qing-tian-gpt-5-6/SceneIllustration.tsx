import { noise2D } from "@remotion/noise";
import { evolvePath } from "@remotion/paths";
import React from "react";
import { interpolate } from "remotion";
import { type SceneMood } from "./visual-design";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

type Palette = {
  bg: string;
  paper: string;
  line: string;
  accent: string;
  second: string;
};
type ArtProps = {
  t: number;
  enter: number;
  act2: number;
  palette: Palette;
  index: number;
};

const PALETTES: Palette[] = [
  {
    bg: "#AFC9D4",
    paper: "#E9E4D6",
    line: "#263A52",
    accent: "#D7A72E",
    second: "#5C806A",
  },
  {
    bg: "#9FC5C7",
    paper: "#ECE3D2",
    line: "#20364E",
    accent: "#CB7468",
    second: "#526F62",
  },
  {
    bg: "#283B56",
    paper: "#D9DDD2",
    line: "#4C6B8A",
    accent: "#F0C75A",
    second: "#B85B52",
  },
  {
    bg: "#B9D5DD",
    paper: "#E9E5DA",
    line: "#334A62",
    accent: "#E5A84C",
    second: "#8B6A83",
  },
  {
    bg: "#9CB5B7",
    paper: "#E6DFD0",
    line: "#284157",
    accent: "#C86A5A",
    second: "#D5A637",
  },
  {
    bg: "#42665D",
    paper: "#DAD9CD",
    line: "#183047",
    accent: "#D99B4D",
    second: "#7399A3",
  },
  {
    bg: "#4D6E8A",
    paper: "#D9E0DD",
    line: "#203B58",
    accent: "#69A7B6",
    second: "#D1A248",
  },
  {
    bg: "#A8BBAE",
    paper: "#ECE0CA",
    line: "#283A4D",
    accent: "#B9534E",
    second: "#B28A32",
  },
  {
    bg: "#B8C9C4",
    paper: "#E5DFD2",
    line: "#253B53",
    accent: "#8A5878",
    second: "#447A6A",
  },
  {
    bg: "#536F88",
    paper: "#D7DEDB",
    line: "#1E354E",
    accent: "#C85D55",
    second: "#D0A142",
  },
  {
    bg: "#C0D2CC",
    paper: "#ECE6D9",
    line: "#30485B",
    accent: "#E0A52C",
    second: "#5D8173",
  },
  {
    bg: "#667F96",
    paper: "#D8DCD5",
    line: "#233850",
    accent: "#8E5F82",
    second: "#E1B347",
  },
  {
    bg: "#405875",
    paper: "#DCD9D0",
    line: "#182D47",
    accent: "#B94E4C",
    second: "#C8943E",
  },
  {
    bg: "#9BB8C0",
    paper: "#E8E1D4",
    line: "#263C53",
    accent: "#D77458",
    second: "#547769",
  },
  {
    bg: "#BCB8A7",
    paper: "#ECE1CC",
    line: "#314255",
    accent: "#CB684E",
    second: "#6C8396",
  },
  {
    bg: "#577895",
    paper: "#D8E0DD",
    line: "#1D3753",
    accent: "#4A99A8",
    second: "#D0A449",
  },
  {
    bg: "#7E8D84",
    paper: "#E7DECE",
    line: "#293A4B",
    accent: "#B94F4C",
    second: "#E0B03C",
  },
  {
    bg: "#50677F",
    paper: "#D8DFDC",
    line: "#1C334D",
    accent: "#C85D55",
    second: "#87618B",
  },
  {
    bg: "#607C93",
    paper: "#D8DDDA",
    line: "#20364D",
    accent: "#B84D50",
    second: "#D6A33C",
  },
  {
    bg: "#BDD4CF",
    paper: "#ECE6D8",
    line: "#30495A",
    accent: "#E3AD32",
    second: "#4E806F",
  },
  {
    bg: "#75899A",
    paper: "#DDDCD4",
    line: "#23364B",
    accent: "#8D617F",
    second: "#D6A743",
  },
  {
    bg: "#465D76",
    paper: "#D9D9D1",
    line: "#172D46",
    accent: "#B64B4C",
    second: "#CB9A3A",
  },
  {
    bg: "#435E79",
    paper: "#D5DDDC",
    line: "#1B324B",
    accent: "#6AA7B2",
    second: "#C75B55",
  },
  {
    bg: "#C6D9D2",
    paper: "#EFE7D8",
    line: "#2E4857",
    accent: "#E4A72F",
    second: "#5B866F",
  },
  {
    bg: "#657A91",
    paper: "#DADDD8",
    line: "#20354D",
    accent: "#765D91",
    second: "#C85A54",
  },
  {
    bg: "#98B8BD",
    paper: "#E9E2D5",
    line: "#253B52",
    accent: "#C44E4B",
    second: "#E0AA36",
  },
];

const Cloud: React.FC<{
  x: number;
  y: number;
  scale?: number;
  color: string;
  opacity?: number;
}> = ({ x, y, scale = 1, color, opacity = 0.38 }) => (
  <path
    d="M0 64 C18 24 58 24 82 42 C100 -4 164 -8 187 38 C230 24 263 55 252 86 C190 98 64 98 0 84 Z"
    transform={`translate(${x} ${y}) scale(${scale})`}
    fill={color}
    opacity={opacity}
  />
);

const Particles: React.FC<{
  t: number;
  seed: number;
  color: string;
  count?: number;
  area?: "full" | "right";
}> = ({ t, seed, color, count = 9, area = "full" }) => (
  <g fill={color} opacity="0.42">
    {Array.from({ length: count }).map((_, i) => {
      const span = area === "right" ? 760 : 1780;
      const start = area === "right" ? 1080 : 70;
      const x = start + ((i * 197 + t * (22 + (i % 4) * 5) + seed * 41) % span);
      const y = 100 + ((i * 131 + t * (13 + (i % 3) * 4) + seed * 29) % 820);
      return (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={7 + (i % 3) * 3}
          ry={3 + (i % 2) * 2}
          transform={`rotate(${t * 58 + i * 43} ${x} ${y})`}
        />
      );
    })}
  </g>
);

const Rain: React.FC<{
  t: number;
  seed: number;
  color: string;
  count?: number;
}> = ({ t, seed, color, count = 30 }) => (
  <g stroke={color} strokeLinecap="round">
    {Array.from({ length: count }).map((_, i) => {
      const x =
        50 + i * (1820 / count) + noise2D(seed, i * 0.18, t * 0.16) * 28;
      const y = -170 + ((t * (250 + (i % 5) * 34) + i * 91) % 1320);
      return (
        <line
          key={i}
          x1={x}
          y1={y}
          x2={x - 24}
          y2={y + 118 + (i % 4) * 18}
          strokeWidth={i % 5 === 0 ? 3 : 1.7}
          opacity={0.2 + (i % 4) * 0.07}
        />
      );
    })}
  </g>
);

const Scene01: React.FC<ArtProps> = ({ t, enter, act2, palette }) => {
  const stem = evolvePath(enter, "M1515 900 C1500 760 1530 620 1510 490");
  return (
    <>
      <rect width="1920" height="1080" fill={palette.bg} />
      <Cloud x={1150 + ((t * 10) % 280)} y={100} color={palette.paper} />
      <path
        d="M1080 870 C1340 790 1580 830 1840 760"
        fill="none"
        stroke={palette.second}
        strokeWidth="14"
        opacity="0.55"
      />
      <path
        d="M1515 900 C1500 760 1530 620 1510 490"
        fill="none"
        stroke={palette.second}
        strokeWidth="12"
        strokeLinecap="round"
        {...stem}
      />
      <g
        transform={`translate(1510 480) scale(${0.35 + enter * 0.65 + act2 * 0.08})`}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse
            key={i}
            rx="54"
            ry="23"
            fill={palette.accent}
            transform={`rotate(${i * 51.4}) translate(67 0)`}
          />
        ))}
        <circle r="23" fill={palette.line} />
      </g>
      <Particles
        t={t}
        seed={1}
        color={palette.accent}
        count={12}
        area="right"
      />
    </>
  );
};

const Scene02: React.FC<ArtProps> = ({ t, enter, act2, palette }) => {
  const angle = Math.sin(t * 1.7) * (4 + act2 * 4);
  return (
    <>
      <rect width="1920" height="1080" fill={palette.bg} />
      <Cloud x={1240 + Math.sin(t * 0.3) * 60} y={90} color={palette.paper} />
      <path
        d="M70 860 C450 760 800 890 1100 810 C1370 740 1640 810 1870 750"
        fill="none"
        stroke={palette.second}
        strokeWidth="12"
      />
      <g
        transform={`translate(1280 135) scale(${enter})`}
        stroke={palette.line}
        strokeLinecap="round"
      >
        <path
          d="M0 0 H470 M70 0 L10 690 M395 0 L460 690"
          strokeWidth="17"
          fill="none"
        />
        <g transform={`rotate(${angle} 235 0)`}>
          <line x1="158" y1="5" x2="140" y2="500" strokeWidth="8" />
          <line x1="310" y1="5" x2="328" y2="500" strokeWidth="8" />
          <path
            d="M118 505 Q234 545 350 505"
            fill="none"
            stroke={palette.accent}
            strokeWidth="22"
          />
        </g>
      </g>
      <ellipse
        cx="1510"
        cy="900"
        rx={190 + Math.sin(t * 1.7) * 45}
        ry="24"
        fill={palette.line}
        opacity="0.18"
      />
      <Particles t={t} seed={2} color={palette.accent} count={7} area="right" />
    </>
  );
};

const Scene03: React.FC<ArtProps> = ({ t, enter, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.line} />
    <rect x="62" y="52" width="1796" height="976" fill={palette.paper} />
    {Array.from({ length: 5 }).map((_, i) => (
      <line
        key={i}
        x1="115"
        x2="1810"
        y1={310 + i * 82}
        y2={310 + i * 82}
        stroke={palette.second}
        strokeWidth="4"
        opacity="0.5"
      />
    ))}
    <path
      d="M90 765 C390 620 660 840 940 690 S1480 540 1840 700"
      fill="none"
      stroke={palette.accent}
      strokeWidth="9"
      strokeDasharray="180 45"
      strokeDashoffset={-t * 70}
      opacity={0.7}
    />
    {Array.from({ length: 8 }).map((_, i) => {
      const p = (t * 0.08 + i * 0.14) % 1;
      const x = 160 + p * 1600;
      const y = 650 + Math.sin(p * Math.PI * 4 + i) * 95;
      return (
        <g
          key={i}
          transform={`translate(${x} ${y}) scale(${0.5 + enter * 0.5})`}
          fill={i % 2 ? palette.second : palette.accent}
        >
          <circle r="15" />
          <rect x="12" y="-70" width="7" height="70" />
        </g>
      );
    })}
    <circle
      cx={1700 - act2 * 190}
      cy="205"
      r={45 + act2 * 28}
      fill={palette.accent}
      opacity="0.45"
    />
  </>
);

const Scene04: React.FC<ArtProps> = ({ t, enter, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <Cloud
      x={1150 + ((t * 18) % 500)}
      y={120}
      scale={1.15}
      color={palette.paper}
    />
    <Cloud
      x={1510 - ((t * 10) % 370)}
      y={285}
      scale={0.7}
      color={palette.second}
      opacity={0.2}
    />
    <g
      transform={`translate(1300 585) rotate(-7) scale(${0.65 + enter * 0.35})`}
      stroke={palette.line}
      strokeWidth="9"
    >
      <rect width="430" height="270" rx="25" fill={palette.paper} />
      <circle cx="135" cy="100" r="47" fill="none" />
      <circle cx="295" cy="100" r="47" fill="none" />
      <path d="M135 100 H295 M88 215 H342" />
    </g>
    <path
      d={`M1428 684 C1210 ${680 - act2 * 190} 1040 ${760 - act2 * 100} 810 ${655 - act2 * 80}`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="10"
      strokeDasharray="22 16"
      strokeDashoffset={-t * 45}
    />
    <Particles t={t} seed={4} color={palette.accent} count={10} />
  </>
);

const Scene05: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <polygon points="1060,90 1830,20 1830,1030 1060,930" fill={palette.paper} />
    {Array.from({ length: 7 }).map((_, i) => (
      <path
        key={i}
        d={`M${1100 + i * 105} ${155 - i * 8} V${915 + i * 10}`}
        stroke={palette.line}
        strokeWidth="7"
        opacity="0.55"
      />
    ))}
    {Array.from({ length: 8 }).map((_, i) => (
      <polygon
        key={i}
        points={`${1000 + i * 80},${980 - i * 82} ${1830 - i * 35},${980 - i * 82} ${1830 - i * 35},${1045 - i * 82} ${960 + i * 75},${1045 - i * 82}`}
        fill={i % 2 ? palette.paper : palette.second}
        opacity="0.22"
      />
    ))}
    <g
      transform={`translate(${1450 + Math.sin(t) * 80} ${120 + ((t * 120) % 860)}) rotate(${t * 55})`}
    >
      <rect width="92" height="125" fill={palette.accent} opacity="0.72" />
      <line
        x1="15"
        x2="72"
        y1="35"
        y2="35"
        stroke={palette.paper}
        strokeWidth="5"
      />
      <line
        x1="15"
        x2="62"
        y1="56"
        y2="56"
        stroke={palette.paper}
        strokeWidth="5"
      />
    </g>
    <path
      d={`M1080 880 L${1510 + act2 * 230} 520`}
      stroke={palette.accent}
      strokeWidth="13"
      opacity="0.5"
    />
  </>
);

const Scene06: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect x="75" y="60" width="1770" height="960" fill={palette.paper} />
    <polygon
      points={`1090,180 1810,80 1810,930 1090,${900 - act2 * 80}`}
      fill={palette.accent}
      opacity={0.12 + act2 * 0.12}
    />
    <g stroke={palette.line} fill="none">
      {Array.from({ length: 5 }).map((_, i) => (
        <rect
          key={i}
          x={1120 + i * 135}
          y={210 - i * 18}
          width="100"
          height="520"
          strokeWidth="7"
          opacity={0.55 - act2 * i * 0.05}
        />
      ))}
    </g>
    <g
      transform="translate(1640 175)"
      stroke={palette.line}
      fill={palette.paper}
    >
      <circle r="62" strokeWidth="8" />
      <line y2="-38" strokeWidth="5" transform={`rotate(${t * 6})`} />
      <line y2="34" strokeWidth="8" transform={`rotate(${t * 0.5 - 45})`} />
    </g>
    {Array.from({ length: 18 }).map((_, i) => (
      <circle
        key={i}
        cx={1080 + ((i * 113 + t * (5 + (i % 3))) % 720)}
        cy={150 + ((i * 79 - t * (4 + (i % 4)) + 800) % 720)}
        r={2 + (i % 4)}
        fill={palette.accent}
        opacity="0.3"
      />
    ))}
    <rect
      x={1140 + act2 * 510}
      y="790"
      width="390"
      height="25"
      fill={palette.second}
      opacity="0.45"
    />
  </>
);

const Scene07: React.FC<ArtProps> = ({ t, act2, palette, index }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect
      x="1070"
      y="65"
      width="730"
      height="900"
      fill={palette.paper}
      opacity="0.48"
    />
    <g stroke={palette.line} strokeWidth="13" opacity="0.5">
      <rect x="1100" y="90" width="660" height="820" fill="none" />
      <line x1="1430" x2="1430" y1="90" y2="910" />
      <line x1="1100" x2="1760" y1="500" y2="500" />
    </g>
    <Rain t={t} seed={index} color="#EAF3F2" count={36} />
    <g
      transform={`translate(${1270 + Math.sin(t * 0.8) * 120} 770)`}
      fill={palette.line}
      opacity="0.35"
    >
      <path d="M-150 0 Q0 -210 150 0Z" />
      <rect x="-5" width="10" height="170" />
      <path
        d="M5 168 q8 70 52 35"
        fill="none"
        stroke={palette.line}
        strokeWidth="10"
      />
    </g>
    {Array.from({ length: 6 }).map((_, i) => {
      const p = (t * 0.25 + i * 0.18) % 1;
      return (
        <ellipse
          key={i}
          cx={1150 + i * 115}
          cy={875 - (i % 2) * 34}
          rx={p * 110}
          ry={p * 25}
          fill="none"
          stroke={palette.accent}
          strokeWidth="5"
          opacity={(1 - p) * (0.3 + act2 * 0.3)}
        />
      );
    })}
  </>
);

const Scene08: React.FC<ArtProps> = ({ t, enter, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <g transform={`translate(1120 220) scale(${0.7 + enter * 0.3})`}>
      <path
        d="M0 120 Q330 0 660 120 V710 Q330 590 0 710Z"
        fill={palette.paper}
        stroke={palette.line}
        strokeWidth="9"
      />
      <line
        x1="330"
        y1="90"
        x2="330"
        y2="680"
        stroke={palette.line}
        strokeWidth="7"
      />
      <path
        d={`M330 100 Q${500 + act2 * 130} ${90 - act2 * 40} 660 120 V710 Q500 590 330 680Z`}
        fill={palette.accent}
        opacity={0.1 + act2 * 0.16}
      />
      <g
        transform={`translate(470 ${520 - act2 * 210}) rotate(${Math.sin(t) * 3})`}
      >
        <path
          d="M0 130 C-8 60 10 10 0 -80"
          stroke={palette.second}
          strokeWidth="9"
          fill="none"
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            rx="37"
            ry="15"
            fill={palette.accent}
            transform={`rotate(${i * 60}) translate(46 0)`}
          />
        ))}
      </g>
    </g>
    <Particles t={t} seed={8} color={palette.accent} count={6} area="right" />
  </>
);

const Scene09: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <polygon
      points="960,1040 1040,180 1800,70 1840,1040"
      fill={palette.paper}
    />
    <path
      d="M1000 1030 L1190 200 M1000 1030 L1660 110"
      stroke={palette.line}
      strokeWidth="12"
      opacity="0.45"
    />
    <g transform="translate(1220 230)" stroke={palette.line} strokeWidth="10">
      <path
        d={`M0 540 V0 H230 V540 L${115 - act2 * 90} ${500 - act2 * 80}Z`}
        fill={palette.second}
        opacity="0.55"
      />
      <path
        d={`M350 500 V-40 H620 V500 L${485 + act2 * 95} ${440 - act2 * 70}Z`}
        fill={palette.accent}
        opacity="0.42"
      />
    </g>
    <path
      d={`M1010 970 C${1080 - act2 * 180} 720 850 540 590 420`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="16"
    />
    <path
      d={`M1010 970 C${1190 + act2 * 180} 700 1450 520 1740 360`}
      fill="none"
      stroke={palette.second}
      strokeWidth="16"
    />
    <Particles t={t} seed={9} color={palette.paper} count={5} />
  </>
);

const Scene10: React.FC<ArtProps> = ({ t, act2, palette, index }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <Rain t={t} seed={index} color={palette.paper} count={28} />
    {Array.from({ length: 8 }).map((_, i) => (
      <path
        key={i}
        d={`M980 ${170 + i * 92} C1230 ${80 + i * 90 + Math.sin(t * 2 + i) * 25} 1500 ${250 + i * 65} 1860 ${130 + i * 90}`}
        fill="none"
        stroke={i % 2 ? palette.second : palette.paper}
        strokeWidth={5 + (i % 3) * 2}
        opacity="0.24"
      />
    ))}
    <path
      d={`M980 780 C1160 ${620 - act2 * 80} 1290 650 1430 760`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="36"
      strokeLinecap="round"
    />
    <path
      d={`M1780 670 C1610 ${540 + act2 * 80} 1520 650 1430 760`}
      fill="none"
      stroke={palette.second}
      strokeWidth="36"
      strokeLinecap="round"
    />
    <circle cx="1430" cy="760" r={26 + act2 * 10} fill={palette.paper} />
    <path
      d={`M1160 510 C1350 ${430 + Math.sin(t * 2) * 45} 1520 500 1740 350`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="14"
      strokeDasharray="60 24"
      strokeDashoffset={-t * 80}
    />
  </>
);

const Scene11: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <g transform="translate(1170 150)">
      <rect
        width="560"
        height="720"
        rx="18"
        fill={palette.paper}
        stroke={palette.line}
        strokeWidth="10"
      />
      <rect width="560" height="110" fill={palette.accent} opacity="0.65" />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={65 + i * 85} cy="160" r="12" fill={palette.line} />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <g
          key={i}
          transform={`translate(${50 + i * 125} 230) rotate(${Math.sin(t * 1.2 + i) * 3})`}
        >
          <rect
            width="96"
            height="145"
            fill={i % 2 ? palette.second : palette.bg}
            opacity="0.45"
          />
          <text
            x="48"
            y="95"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="58"
            fill={palette.line}
          >
            {i + 1}
          </text>
        </g>
      ))}
      <path
        d={`M0 ${480 - act2 * 260} Q280 ${400 - act2 * 150} 560 ${470 - act2 * 260} V720 H0Z`}
        fill={palette.accent}
        opacity={0.12 + act2 * 0.2}
      />
    </g>
    <polygon
      points={`${980 - act2 * 210},0 ${1350 - act2 * 100},0 ${1120 + act2 * 120},1080 ${750 + act2 * 60},1080`}
      fill={palette.accent}
      opacity="0.13"
    />
  </>
);

const Scene12: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect
      y="630"
      width="1920"
      height="450"
      fill={palette.second}
      opacity="0.28"
    />
    <path
      d="M760 1080 L1190 520 L1510 1080Z"
      fill={palette.paper}
      opacity="0.42"
    />
    <path
      d="M1135 1080 L1200 540"
      stroke={palette.accent}
      strokeWidth="8"
      strokeDasharray="48 62"
      strokeDashoffset={-t * 90}
    />
    {Array.from({ length: 8 }).map((_, i) => {
      const s = 1 - i * 0.095;
      return (
        <g
          key={i}
          transform={`translate(${1770 - i * 110} ${940 - i * 55}) scale(${s})`}
          stroke={palette.line}
          strokeWidth="8"
          opacity={0.7}
        >
          <line y2="-340" />
          <line x1="-75" x2="75" y1="-300" y2="-300" />
          <path d="M-75 -300 Q-240 -230 -430 -220" fill="none" />
        </g>
      );
    })}
    <g
      transform={`translate(${1750 - ((t * 110 + act2 * 330) % 1550)} ${260 + Math.sin(t * 0.9) * 90}) rotate(${-12 + Math.sin(t) * 6})`}
      fill={palette.accent}
    >
      <path d="M0 0 L120 35 L20 64 L42 36Z" />
    </g>
  </>
);

const Scene13: React.FC<ArtProps> = ({ t, enter, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect
      x="80"
      y="55"
      width="1760"
      height="970"
      fill={palette.paper}
      opacity="0.7"
    />
    <circle
      cx="1510"
      cy="360"
      r={245 + Math.sin(t * 0.45) * 12}
      fill={palette.accent}
      opacity={0.1 + enter * 0.08}
    />
    <g
      transform={`translate(1130 ${205 + (1 - enter) * 42})`}
      opacity={enter}
    >
      <rect
        x="24"
        y="32"
        width="610"
        height="650"
        rx="18"
        fill={palette.line}
        opacity="0.2"
      />
      <rect
        width="610"
        height="650"
        rx="18"
        fill={palette.paper}
        stroke={palette.line}
        strokeWidth="10"
      />
      <rect
        width="610"
        height="126"
        rx="14"
        fill={palette.second}
        opacity="0.78"
      />
      <path
        d="M0 126 H610"
        stroke={palette.line}
        strokeWidth="7"
        opacity="0.45"
      />
      {[105, 305, 505].map((x) => (
        <g key={x} transform={`translate(${x} 43)`}>
          <rect
            x="-14"
            y="-34"
            width="28"
            height="70"
            rx="14"
            fill={palette.line}
          />
          <circle cy="42" r="18" fill={palette.paper} />
        </g>
      ))}
      <rect
        x="54"
        y="176"
        width="502"
        height="420"
        rx="10"
        fill={palette.accent}
        opacity="0.16"
      />
      <path
        d="M112 352 H498 M112 424 H390"
        stroke={palette.second}
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.22"
      />
    </g>
    <g
      transform={`translate(${1184 + act2 * 510} ${381 - act2 * 350}) rotate(${act2 * 14} 251 210)`}
      opacity={enter * (1 - act2 * 0.18)}
    >
      <path
        d="M0 0 H502 V420 H0Z"
        fill={palette.paper}
        stroke={palette.accent}
        strokeWidth="8"
      />
      <path
        d="M0 34 H502"
        stroke={palette.accent}
        strokeWidth="6"
        strokeDasharray="18 14"
        opacity="0.65"
      />
      <text
        x="251"
        y="326"
        textAnchor="middle"
        fill={palette.line}
        fontFamily="Arial, sans-serif"
        fontSize="250"
        fontWeight="700"
        opacity="0.38"
      >
        1
      </text>
      <path
        d="M405 330 Q448 287 487 331"
        fill="none"
        stroke={palette.accent}
        strokeWidth="10"
        strokeLinecap="round"
      />
    </g>
    <path
      d={`M80 930 C640 ${912 - act2 * 10} 1230 ${952 + act2 * 8} 1840 930`}
      stroke={palette.second}
      strokeWidth="8"
      opacity="0.28"
    />
    <Particles t={t} seed={13} color={palette.accent} count={5} />
  </>
);

const Scene14: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <polygon
      points="1040,760 1860,620 1860,1080 980,1080"
      fill={palette.paper}
      opacity="0.7"
    />
    <g stroke={palette.line} strokeWidth="8" opacity="0.55">
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={i}
          x1={1100 + i * 90}
          x2={1100 + i * 90}
          y1={340 + (i % 2) * 20}
          y2="790"
        />
      ))}
      <line x1="1070" x2="1860" y1="350" y2="350" />
    </g>
    <Cloud x={1060 + ((t * 24) % 650)} y={80} color={palette.paper} />
    <ellipse
      cx={1450 + Math.sin(t * 0.35) * 250}
      cy="820"
      rx={260 + act2 * 130}
      ry="48"
      fill={palette.line}
      opacity="0.16"
    />
    <g
      transform={`translate(${1120 + ((t * 140) % 720)} ${260 - Math.sin(t * 0.7) * 70}) rotate(-9)`}
      fill={palette.accent}
    >
      <path d="M0 0 L115 32 L18 60 L42 34Z" />
    </g>
  </>
);

const Scene15: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <polygon
      points="1030,120 1840,40 1840,1030 1030,920"
      fill={palette.paper}
    />
    <path
      d="M1040 170 L1810 90 M1040 900 L1810 1010"
      stroke={palette.line}
      strokeWidth="11"
    />
    <g>
      {Array.from({ length: 7 }).map((_, i) => {
        const on = i / 7 > act2 * 0.78;
        return (
          <polygon
            key={i}
            points={`${1110 + i * 105},${195 - i * 10} ${1185 + i * 105},${185 - i * 10} ${1185 + i * 105},${760 + i * 20} ${1110 + i * 105},${750 + i * 20}`}
            fill={on ? palette.accent : palette.second}
            opacity={on ? 0.32 : 0.12}
          />
        );
      })}
    </g>
    {Array.from({ length: 12 }).map((_, i) => (
      <circle
        key={i}
        cx={1080 + ((i * 137 + t * 9) % 720)}
        cy={140 + ((i * 89 - t * 8 + 900) % 760)}
        r={2 + (i % 4)}
        fill={palette.accent}
        opacity="0.32"
      />
    ))}
    <path
      d={`M1050 840 L${1700 - act2 * 430} 250`}
      stroke={palette.accent}
      strokeWidth="12"
      opacity="0.36"
    />
  </>
);

const Scene16: React.FC<ArtProps> = ({ t, act2, palette, index }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <ellipse
      cx="1390"
      cy="650"
      rx="560"
      ry="300"
      fill={palette.paper}
      opacity="0.36"
    />
    <ellipse
      cx="1390"
      cy="650"
      rx="510"
      ry="250"
      fill={palette.line}
      opacity="0.18"
    />
    <Rain t={t} seed={index} color={palette.paper} count={22} />
    {Array.from({ length: 8 }).map((_, i) => {
      const p = (t * 0.32 + i * 0.14) % 1;
      return (
        <ellipse
          key={i}
          cx={1050 + i * 95}
          cy={570 + (i % 3) * 65}
          rx={p * 145}
          ry={p * 42}
          fill="none"
          stroke={i % 2 ? palette.accent : palette.second}
          strokeWidth="6"
          opacity={(1 - p) * 0.45}
        />
      );
    })}
    <g
      transform={`translate(${1780 - ((t * 70 + act2 * 260) % 900)} ${330 + ((t * 28) % 370)}) rotate(${t * 36})`}
      fill={palette.accent}
    >
      <path d="M0 0 Q55 -40 100 10 Q50 70 0 0Z" />
    </g>
    <path
      d={`M980 710 Q1390 ${520 + Math.sin(t) * 30} 1790 700`}
      stroke={palette.paper}
      strokeWidth="8"
      fill="none"
      opacity="0.32"
    />
  </>
);

const Scene17: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <path
      d="M980 1080 V260 Q1370 100 1840 300 V1080Z"
      fill={palette.paper}
      opacity="0.62"
    />
    <path
      d="M1060 410 Q1410 250 1760 420"
      fill="none"
      stroke={palette.line}
      strokeWidth="16"
    />
    <g
      transform={`translate(1290 ${720 - act2 * 300}) rotate(${-7 + Math.sin(t * 0.8) * 2})`}
    >
      <rect
        width="360"
        height="260"
        fill={palette.paper}
        stroke={palette.line}
        strokeWidth="10"
      />
      <rect
        x="35"
        y="40"
        width="290"
        height="155"
        fill={palette.second}
        opacity="0.4"
      />
      <circle cx="110" cy="118" r="38" fill={palette.accent} opacity="0.65" />
      <path d="M35 220 H325" stroke={palette.accent} strokeWidth="9" />
    </g>
    <path
      d={`M1080 860 C1220 ${760 - act2 * 120} 1500 ${850 + Math.sin(t) * 45} ${1800 - act2 * 180} 580`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="12"
      strokeDasharray="44 18"
      strokeDashoffset={-t * 35}
    />
    <Particles t={t} seed={17} color={palette.accent} count={5} area="right" />
  </>
);

const Scene18: React.FC<ArtProps> = ({ t, act2, palette }) => {
  const busX = 1180 + act2 * 780 + t * 22;
  return (
    <>
      <rect width="1920" height="1080" fill={palette.bg} />
      <rect
        y="760"
        width="1920"
        height="320"
        fill={palette.line}
        opacity="0.22"
      />
      <g transform="translate(1080 240)" stroke={palette.line}>
        <path
          d="M0 570 V0 H560 V570"
          fill={palette.paper}
          opacity="0.52"
          strokeWidth="12"
        />
        <line x1="70" x2="490" y1="100" y2="100" strokeWidth="8" />
        <line x1="80" x2="80" y1="110" y2="570" strokeWidth="8" />
      </g>
      <g transform={`translate(${busX} 560)`}>
        <rect
          width="520"
          height="230"
          rx="38"
          fill={palette.second}
          opacity="0.78"
        />
        <rect
          x="55"
          y="38"
          width="290"
          height="92"
          fill={palette.paper}
          opacity="0.55"
        />
        <circle cx="115" cy="235" r="54" fill={palette.line} />
        <circle cx="420" cy="235" r="54" fill={palette.line} />
        <circle cx="485" cy="170" r="22" fill={palette.accent} />
      </g>
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1={900 - i * 90}
          x2={1550 + i * 120 + act2 * 250}
          y1={650 + i * 50}
          y2={650 + i * 50}
          stroke={palette.accent}
          strokeWidth={5 + i * 2}
          opacity={0.2}
        />
      ))}
    </>
  );
};

const Scene19: React.FC<ArtProps> = ({ t, act2, palette, index }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <Rain t={t} seed={index} color={palette.paper} count={20} />
    <g stroke={palette.line} strokeWidth="12">
      <line x1="1110" y1="180" x2="1110" y2="940" />
      <line x1="1770" y1="120" x2="1770" y2="940" />
    </g>
    <path
      d={`M1110 390 C1270 ${300 + Math.sin(t * 2) * 55} 1490 ${510 + Math.sin(t * 1.6) * 75} 1770 340`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="16"
    />
    <path
      d={`M1300 460 C1450 ${360 + Math.sin(t * 2.4) * 65} 1560 530 1690 ${420 - act2 * 90} C1580 650 1450 620 1300 460Z`}
      fill={palette.accent}
      opacity="0.45"
    />
    <path
      d={`M1100 770 C1290 ${660 - act2 * 80} 1500 820 1810 620`}
      fill="none"
      stroke={palette.second}
      strokeWidth="11"
      strokeDasharray="80 28"
      strokeDashoffset={-t * 100}
    />
  </>
);

const Scene20: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect
      y="690"
      width="1920"
      height="390"
      fill={palette.paper}
      opacity="0.45"
    />
    <circle
      cx="1510"
      cy={700 - act2 * 420}
      r={90 + act2 * 55}
      fill={palette.accent}
      opacity={0.25 + act2 * 0.25}
    />
    {Array.from({ length: 4 }).map((_, i) => (
      <g
        key={i}
        transform={`translate(${1150 + i * 185} ${240 + (i % 2) * 180}) scale(${0.62 + i * 0.08})`}
        stroke={palette.line}
        fill={palette.paper}
        opacity={0.3 + i * 0.1}
      >
        <circle r="95" strokeWidth="9" />
        <line
          y2="-55"
          strokeWidth="6"
          transform={`rotate(${t * (8 + i * 2)})`}
        />
        <line
          y2="48"
          strokeWidth="9"
          transform={`rotate(${t * 0.7 + i * 30})`}
        />
      </g>
    ))}
    <path
      d={`M80 825 C500 ${780 - act2 * 25} 860 850 1190 790 S1570 ${770 - act2 * 90} 1860 ${650 - act2 * 80}`}
      fill="none"
      stroke={palette.second}
      strokeWidth="12"
    />
    <path
      d={`M1120 0 L${1340 + act2 * 360} 0 L${1050 + act2 * 350} 1080 H720Z`}
      fill={palette.accent}
      opacity={0.06 + act2 * 0.12}
    />
  </>
);

const Scene21: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <path
      d="M820 1080 L1240 540 L1570 1080Z"
      fill={palette.paper}
      opacity="0.32"
    />
    {Array.from({ length: 7 }).map((_, i) => {
      const x = 1770 - i * 118,
        y = 900 - i * 61;
      return (
        <g
          key={i}
          transform={`translate(${x} ${y}) scale(${1 - i * 0.1})`}
          stroke={palette.line}
          strokeWidth="9"
          opacity="0.68"
        >
          <line y2="-330" />
          <line x1="-75" x2="75" y1="-285" y2="-285" />
          <path d="M-75 -285 Q-260 -220 -480 -200" fill="none" />
        </g>
      );
    })}
    {Array.from({ length: 14 }).map((_, i) => {
      const x = 1040 + ((i * 137 + t * (11 + (i % 3))) % 780),
        y = 180 + ((i * 101 + Math.sin(t + i) * 60) % 700);
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={3 + (i % 3)}
          fill={i % 2 ? palette.accent : palette.second}
          opacity={0.22 + act2 * 0.28}
        />
      );
    })}
    <path
      d={`M1080 430 Q1390 ${310 + Math.sin(t * 0.5) * 35} 1810 370`}
      stroke={palette.accent}
      strokeWidth="8"
      fill="none"
      strokeDasharray="28 18"
      strokeDashoffset={-t * 45}
    />
  </>
);

const Scene22: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <polygon
      points="980,1080 1120,230 1810,110 1860,1080"
      fill={palette.paper}
      opacity="0.65"
    />
    <g transform="translate(1110 170)" stroke={palette.line} fill="none">
      <path d="M0 760 V0 H690 V760" strokeWidth="17" />
      <g transform={`translate(${act2 * 245} 0)`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={65 + i * 58}
            x2={65 + i * 58}
            y1="110"
            y2="760"
            strokeWidth="8"
          />
        ))}
      </g>
      <g transform={`translate(${-act2 * 245} 0)`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={400 + i * 58}
            x2={400 + i * 58}
            y1="110"
            y2="760"
            strokeWidth="8"
          />
        ))}
      </g>
    </g>
    <path
      d={`M1050 900 C1280 ${830 + act2 * 90} 1510 890 1810 ${760 + act2 * 110}`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="10"
      strokeDasharray="48 34"
      strokeDashoffset={t * 55}
    />
    <g
      transform={`translate(${1640 + t * 45} 760) scale(.52)`}
      stroke={palette.second}
      strokeWidth="10"
      fill="none"
    >
      <circle cx="0" cy="90" r="70" />
      <circle cx="240" cy="90" r="70" />
      <path d="M0 90 L90 0 L142 90 L48 90 M90 0 H184 L240 90" />
    </g>
  </>
);

const Scene23: React.FC<ArtProps> = ({ t, act2, palette, index }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <g opacity="0.34">
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={1040 + i * 72}
          y={270 + (i % 4) * 75}
          width={28 + (i % 3) * 18}
          height={260 - (i % 5) * 30}
          fill={i % 3 ? palette.paper : palette.accent}
          transform={`translate(${Math.sin(t + i) * 18} 0)`}
        />
      ))}
    </g>
    <Rain t={t} seed={index} color={palette.paper} count={38} />
    <path
      d={`M960 980 Q1380 ${220 - act2 * 80} 1820 950`}
      fill="none"
      stroke={palette.line}
      strokeWidth="38"
      opacity="0.48"
    />
    <path
      d={`M960 960 Q1380 ${220 - act2 * 80} 1820 930`}
      fill="none"
      stroke={palette.paper}
      strokeWidth="9"
      opacity="0.46"
      strokeDasharray="120 50"
      strokeDashoffset={-t * 100}
    />
    <g transform={`rotate(${-24 + Math.sin(t * 0.7) * 7} 1420 1040)`}>
      <rect
        x="1408"
        y="320"
        width="24"
        height="760"
        rx="12"
        fill={palette.accent}
      />
    </g>
  </>
);

const Scene24: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect
      x="1040"
      y="90"
      width="780"
      height="860"
      fill={palette.paper}
      opacity="0.5"
    />
    <g stroke={palette.line} strokeWidth="14">
      <rect x="1080" y="120" width="700" height="800" fill="none" />
      <line x1="1430" x2="1430" y1="120" y2="920" />
    </g>
    <polygon
      points={`1080,120 ${1430 + act2 * 330},120 ${1320 + act2 * 280},920 1080,920`}
      fill={palette.accent}
      opacity={0.08 + act2 * 0.18}
    />
    <g fill={palette.line} opacity="0.35">
      <circle cx="1240" cy="650" r="65" />
      <path d="M1160 900 Q1240 690 1320 900Z" />
      <circle cx="1630" cy="620" r="62" />
      <path d="M1555 900 Q1630 675 1705 900Z" />
    </g>
    <path
      d={`M1250 470 C1390 ${390 + Math.sin(t) * 30} 1500 520 1630 ${430 - act2 * 70}`}
      fill="none"
      stroke={palette.second}
      strokeWidth="9"
      strokeDasharray="30 20"
      strokeDashoffset={-t * 30}
    />
  </>
);

const Scene25: React.FC<ArtProps> = ({ t, enter, act2, palette, index }) => {
  const route = evolvePath(
    enter,
    "M1050 820 C1180 620 1250 700 1370 500 S1600 420 1800 220",
  );
  return (
    <>
      <rect width="1920" height="1080" fill={palette.bg} />
      <Rain t={t} seed={index} color={palette.paper} count={18} />
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={i}
          d={`M${1040 + i * 120} 120 C${980 + i * 130} 380 ${1110 + i * 100} 650 ${1050 + i * 125} 940`}
          stroke={palette.paper}
          strokeWidth={5 + (i % 3) * 3}
          fill="none"
          opacity="0.18"
          strokeDasharray="160 50"
          strokeDashoffset={-t * (25 + i * 4)}
        />
      ))}
      <path
        d="M1050 820 C1180 620 1250 700 1370 500 S1600 420 1800 220"
        stroke={palette.accent}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        {...route}
      />
      {[
        [1050, 820],
        [1370, 500],
        [1800, 220],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={24 + act2 * i * 9}
            fill={palette.paper}
            stroke={palette.line}
            strokeWidth="8"
          />
          <circle
            cx={x}
            cy={y}
            r="9"
            fill={i === 2 ? palette.second : palette.accent}
          />
        </g>
      ))}
      <path
        d={`M980 ${600 + Math.sin(t) * 40} H1880`}
        stroke={palette.second}
        strokeWidth="40"
        opacity={0.08 + act2 * 0.12}
      />
    </>
  );
};

const Scene26: React.FC<ArtProps> = ({ t, act2, palette }) => {
  const fly = interpolate(act2, [0, 1], [0, 1], clamp);
  return (
    <>
      <rect width="1920" height="1080" fill={palette.bg} />
      <g
        transform="translate(1110 200)"
        stroke={palette.line}
        fill="none"
        opacity={1 - fly * 0.45}
      >
        <path d="M0 700 V0 H690 V700 M80 700 V120 H610 V700" strokeWidth="16" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1={120 + i * 75}
            x2={120 + i * 75}
            y1="150"
            y2="700"
            strokeWidth="7"
            opacity="0.5"
          />
        ))}
      </g>
      <g
        transform={`translate(${1180 + fly * 760} ${720 - fly * 560 + Math.sin(t * 2) * 12}) rotate(${-8 - fly * 18}) scale(${1 - fly * 0.45})`}
      >
        <path
          d="M0 0 H410 V270 H0Z"
          fill={palette.paper}
          stroke={palette.line}
          strokeWidth="8"
          opacity={1 - fly}
        />
        <path
          d="M0 0 L410 135 L45 210 L130 135Z"
          fill={palette.paper}
          stroke={palette.line}
          strokeWidth="8"
          opacity={fly}
        />
        <path
          d="M130 135 L45 210 L160 168"
          fill={palette.accent}
          opacity={fly * 0.45}
        />
      </g>
      <path
        d={`M1200 855 C1450 ${760 - fly * 190} 1660 ${620 - fly * 220} 1880 ${470 - fly * 230}`}
        fill="none"
        stroke={palette.accent}
        strokeWidth="9"
        strokeDasharray="34 22"
        strokeDashoffset={-t * 50}
        opacity={fly}
      />
      <Particles
        t={t}
        seed={26}
        color={palette.accent}
        count={8}
        area="right"
      />
    </>
  );
};

const SCENE_ART: React.FC<ArtProps>[] = [
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
  Scene08,
  Scene09,
  Scene10,
  Scene11,
  Scene12,
  Scene13,
  Scene14,
  Scene15,
  Scene16,
  Scene17,
  Scene18,
  Scene19,
  Scene20,
  Scene21,
  Scene22,
  Scene23,
  Scene24,
  Scene25,
  Scene26,
];

export const SceneIllustration: React.FC<{
  mood: SceneMood;
  frame: number;
  sceneIndex: number;
  timeMs: number;
  sceneStartMs: number;
  secondLineStartMs?: number;
}> = ({ sceneIndex, timeMs, sceneStartMs, secondLineStartMs }) => {
  const index = Math.max(0, Math.min(25, sceneIndex));
  const palette = PALETTES[index];
  const t = Math.max(0, (timeMs - sceneStartMs) / 1000);
  const enter = interpolate(
    timeMs,
    [sceneStartMs, sceneStartMs + 900],
    [0, 1],
    clamp,
  );
  const secondStart = secondLineStartMs ?? sceneStartMs + 1800;
  const act2 = interpolate(
    timeMs,
    [secondStart, secondStart + 900],
    [0, 1],
    clamp,
  );
  const Art = SCENE_ART[index];
  const id = `scene-${index}`;
  return (
    <svg
      viewBox="0 0 1920 1080"
      width="1920"
      height="1080"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <linearGradient id={`${id}-wash`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={palette.paper} stopOpacity="0.94" />
          <stop offset="0.53" stopColor={palette.paper} stopOpacity="0.76" />
          <stop offset="1" stopColor={palette.paper} stopOpacity="0.12" />
        </linearGradient>
        <filter id={`${id}-grain`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.58"
            numOctaves="2"
            seed={index + 11}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <Art t={t} enter={enter} act2={act2} palette={palette} index={index} />
      <rect
        width="1920"
        height="1080"
        fill={`url(#${id}-wash)`}
        opacity="0.62"
      />
      <rect
        width="1920"
        height="1080"
        filter={`url(#${id}-grain)`}
        opacity="0.035"
      />
      <rect
        x="43"
        y="37"
        width="1834"
        height="1006"
        fill="none"
        stroke={palette.line}
        strokeWidth="3"
        opacity="0.15"
      />
    </svg>
  );
};
