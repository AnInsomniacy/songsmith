import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./visual-design";

type ArtProps = { frame: number };

const TitlePoster: React.FC<ArtProps> = ({ frame }) => {
  const t = frame / 60;
  return (
    <>
      <rect width="1920" height="1080" fill="#AFC9D4" />
      <rect x="55" y="48" width="1810" height="984" fill="#E8E5DA" />
      <circle
        cx="1580"
        cy="205"
        r={105 + Math.sin(t * 0.8) * 9}
        fill="#F0C75A"
        opacity="0.56"
      />
      <g
        transform={`translate(${1260 + Math.sin(t * 0.7) * 18} 365) rotate(-5)`}
        stroke={COLORS.ink}
        strokeWidth="9"
      >
        <rect width="450" height="300" rx="30" fill="#B85B5277" />
        <rect x="60" y="58" width="330" height="108" rx="16" fill="#DCE4E2" />
        <circle cx="150" cy="112" r="43" fill="none" />
        <circle cx="300" cy="112" r="43" fill="none" />
        <path d="M150 112 H300 M108 230 H345 L308 280 H145Z" fill="#31584E55" />
      </g>
      <path
        d="M1390 478 C1200 410 1050 520 930 450"
        fill="none"
        stroke="#B85B52"
        strokeWidth="9"
        strokeDasharray="26 17"
        strokeDashoffset={-t * 48}
      />
      <path
        d="M70 860 C420 790 760 900 1080 825 C1370 760 1630 815 1840 755"
        fill="none"
        stroke="#F0C75A"
        strokeWidth="12"
        opacity=".55"
      />
    </>
  );
};

const SongwritingPoster: React.FC<ArtProps> = ({ frame }) => {
  const t = frame / 60;
  return (
    <>
      <rect width="1920" height="1080" fill="#9FC5C7" />
      <rect x="65" y="55" width="1790" height="970" fill="#ECE3D2" />
      <g transform="translate(1110 115) rotate(2)">
        <rect
          width="650"
          height="810"
          rx="22"
          fill="#F1EAD9"
          stroke={COLORS.ink}
          strokeWidth="9"
        />
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={i}
            x1="55"
            x2="600"
            y1={120 + i * 62}
            y2={120 + i * 62}
            stroke="#7399A3"
            strokeWidth="3"
            opacity=".45"
          />
        ))}
        <line
          x1="105"
          x2="105"
          y1="45"
          y2="760"
          stroke="#CB7468"
          strokeWidth="5"
          opacity=".55"
        />
        <path
          d="M150 235 C245 175 330 300 420 225 S550 200 590 255"
          fill="none"
          stroke="#31584E"
          strokeWidth="8"
          strokeDasharray="340 400"
          strokeDashoffset={-Math.min(340, t * 65)}
        />
        {Array.from({ length: 5 }).map((_, i) => {
          const x = 170 + ((t * 52 + i * 105) % 420),
            y = 400 + Math.sin(t + i) * 95;
          return (
            <g
              key={i}
              transform={`translate(${x} ${y})`}
              fill={i % 2 ? "#CB7468" : "#D7A72E"}
            >
              <circle r="12" />
              <rect x="10" y="-54" width="6" height="55" />
            </g>
          );
        })}
        <g
          transform={`translate(${470 + Math.sin(t) * 30} ${610 + Math.cos(t * 0.7) * 24}) rotate(-38)`}
        >
          <rect width="38" height="230" rx="16" fill="#D7A72E" />
          <polygon points="0,230 38,230 19,275" fill="#253B53" />
        </g>
      </g>
    </>
  );
};

const ProducerPoster: React.FC<ArtProps> = ({ frame }) => {
  const t = frame / 60;
  return (
    <>
      <rect width="1920" height="1080" fill="#2B405A" />
      <rect
        x="55"
        y="48"
        width="1810"
        height="984"
        fill="#D9DDD2"
        opacity=".92"
      />
      <g transform="translate(1070 180)">
        <rect
          width="720"
          height="680"
          rx="34"
          fill="#405875"
          stroke="#182D47"
          strokeWidth="12"
        />
        <g transform="translate(95 105)">
          {[0, 1].map((i) => (
            <g
              key={i}
              transform={`translate(${i * 260} 0) rotate(${t * (i ? 48 : -42)})`}
            >
              <circle
                r="105"
                fill="#D9DDD2"
                stroke="#182D47"
                strokeWidth="12"
              />
              <circle r="28" fill="#B85B52" />
              {Array.from({ length: 6 }).map((_, j) => (
                <line
                  key={j}
                  y2="-84"
                  stroke="#547B9C"
                  strokeWidth="9"
                  transform={`rotate(${j * 60})`}
                />
              ))}
            </g>
          ))}
        </g>
        {Array.from({ length: 7 }).map((_, i) => {
          const y = 410 + (i % 2) * 45 + Math.sin(t * 1.4 + i) * 70;
          return (
            <g key={i}>
              <line
                x1={85 + i * 88}
                x2={85 + i * 88}
                y1="340"
                y2="610"
                stroke="#D9DDD2"
                strokeWidth="7"
                opacity=".5"
              />
              <rect
                x={63 + i * 88}
                y={y}
                width="44"
                height="76"
                rx="10"
                fill={i % 3 === 0 ? "#F0C75A" : i % 2 ? "#B85B52" : "#6D9A91"}
              />
            </g>
          );
        })}
        <path
          d={`M65 640 ${Array.from({ length: 14 })
            .map(
              (_, i) =>
                `L${75 + i * 45} ${640 - Math.abs(Math.sin(t * 2 + i * 0.8)) * 70}`,
            )
            .join(" ")}`}
          fill="none"
          stroke="#F0C75A"
          strokeWidth="6"
        />
      </g>
    </>
  );
};

const GuitarPoster: React.FC<ArtProps> = ({ frame }) => {
  const t = frame / 60;
  return (
    <>
      <rect width="1920" height="1080" fill="#D6A66A" />
      <rect x="55" y="48" width="1810" height="984" fill="#EEE1C9" />
      <g
        transform={`translate(1425 560) rotate(${-17 + Math.sin(t * 0.8) * 2})`}
      >
        <ellipse
          cx="0"
          cy="170"
          rx="190"
          ry="245"
          fill="#C56A4E"
          stroke="#243A51"
          strokeWidth="12"
        />
        <ellipse
          cx="0"
          cy="-70"
          rx="145"
          ry="190"
          fill="#C56A4E"
          stroke="#243A51"
          strokeWidth="12"
        />
        <circle cy="20" r="67" fill="#243A51" />
        <rect
          x="-36"
          y="-650"
          width="72"
          height="530"
          rx="20"
          fill="#547769"
          stroke="#243A51"
          strokeWidth="10"
        />
        <rect
          x="-62"
          y="-760"
          width="124"
          height="135"
          rx="35"
          fill="#547769"
          stroke="#243A51"
          strokeWidth="10"
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <path
            key={i}
            d={`M${-18 + i * 7} -710 Q${-18 + i * 7 + Math.sin(t * 8 + i) * 3} -250 ${-18 + i * 7} 360`}
            fill="none"
            stroke="#F3E8D2"
            strokeWidth="3"
          />
        ))}
        <path
          d={`M-260 35 Q${-330 - Math.sin(t * 3) * 45} 130 -255 225`}
          fill="none"
          stroke="#B85B52"
          strokeWidth="16"
          strokeLinecap="round"
        />
      </g>
      {Array.from({ length: 4 }).map((_, i) => (
        <path
          key={i}
          d={`M1060 ${340 + i * 95} Q1240 ${260 + i * 105 + Math.sin(t * 2 + i) * 22} 1360 ${330 + i * 90}`}
          fill="none"
          stroke={i % 2 ? "#547769" : "#B85B52"}
          strokeWidth="7"
          opacity=".45"
        />
      ))}
    </>
  );
};

const AlbumPoster: React.FC<ArtProps> = ({ frame }) => {
  const t = frame / 60;
  return (
    <>
      <rect width="1920" height="1080" fill="#31584E" />
      <rect
        x="55"
        y="48"
        width="1810"
        height="984"
        fill="#DCE2D8"
        opacity=".94"
      />
      <g transform="translate(1130 210)">
        <rect
          width="470"
          height="650"
          fill="#B85B52"
          stroke="#14233A"
          strokeWidth="12"
        />
        <circle cx="235" cy="225" r="135" fill="#F0C75A" opacity=".8" />
        <path
          d="M0 530 C140 440 285 610 470 470 V650 H0Z"
          fill="#4C6B8A"
          opacity=".66"
        />
        <rect
          x="55"
          y="55"
          width="180"
          height="28"
          fill="#DCE2D8"
          opacity=".8"
        />
      </g>
      <g transform={`translate(1600 530) rotate(${t * 52})`}>
        <circle r="245" fill="#172B40" />
        <circle r="205" fill="none" stroke="#6C7E8B" strokeWidth="3" />
        <circle r="155" fill="none" stroke="#6C7E8B" strokeWidth="3" />
        <circle r="82" fill="#F0C75A" />
        <circle r="16" fill="#172B40" />
        <path d="M0 -230 V-95" stroke="#DCE2D8" strokeWidth="5" />
      </g>
      <path
        d={`M1050 905 C1280 ${820 + Math.sin(t) * 28} 1530 890 1830 790`}
        fill="none"
        stroke="#F0C75A"
        strokeWidth="11"
        strokeDasharray="70 24"
        strokeDashoffset={-t * 55}
      />
    </>
  );
};

const POSTERS: React.FC<ArtProps>[] = [
  TitlePoster,
  SongwritingPoster,
  ProducerPoster,
  GuitarPoster,
  AlbumPoster,
];

export const IntroArtwork: React.FC<{
  index: number;
  frame: number;
  opacity: number;
}> = ({ index, frame, opacity }) => {
  const Poster = POSTERS[Math.max(0, Math.min(4, index))];
  const id = `intro-wash-${index}`;
  return (
    <AbsoluteFill style={{ opacity }}>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#E8E5DA" stopOpacity=".97" />
            <stop offset=".58" stopColor="#E8E5DA" stopOpacity=".78" />
            <stop offset="1" stopColor="#E8E5DA" stopOpacity=".08" />
          </linearGradient>
        </defs>
        <Poster frame={frame} />
        <rect width="1180" height="1080" fill={`url(#${id})`} />
        <rect
          x="43"
          y="37"
          width="1834"
          height="1006"
          fill="none"
          stroke={COLORS.ink}
          strokeWidth="3"
          opacity=".15"
        />
      </svg>
    </AbsoluteFill>
  );
};
