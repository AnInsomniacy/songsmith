import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./design";
import { FONT_BODY, FONT_DISPLAY, FONT_ENGLISH, FONT_UTILITY } from "./fonts";
import { lyricData } from "./lyrics";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const phaseOpacity = (
  second: number,
  start: number,
  end: number,
  fade = 0.5,
) => {
  const enter = interpolate(second, [start, start + fade], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const exit = interpolate(second, [end - fade, end], [1, 0], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  return Math.min(enter, exit);
};

const CreditPair: React.FC<{
  first: { label: string; value: string };
  second: { label: string; value: string };
  x?: number;
  y?: number;
  color: string;
  accent: string;
}> = ({ first, second, x = 180, y = 300, color, accent }) => (
  <g transform={`translate(${x} ${y})`}>
    <text
      fontFamily={FONT_UTILITY}
      fontSize={34}
      letterSpacing={8}
      fill={accent}
    >
      {first.label.toUpperCase()}
    </text>
    <text
      y={118}
      fontFamily={FONT_DISPLAY}
      fontWeight={900}
      fontSize={118}
      fill={color}
    >
      {first.value}
    </text>
    <path d="M0 178 H1420" stroke={accent} strokeWidth={8} />
    <text
      y={270}
      fontFamily={FONT_UTILITY}
      fontSize={34}
      letterSpacing={8}
      fill={accent}
    >
      {second.label.toUpperCase()}
    </text>
    <text
      y={388}
      fontFamily={FONT_BODY}
      fontWeight={500}
      fontSize={106}
      fill={color}
    >
      {second.value}
    </text>
  </g>
);

const Vocalise: React.FC<{ globalMs: number }> = ({ globalMs }) => (
  <g>
    {lyricData.intro.vocalises.map((line, lineIndex) => (
      <g key={line.id} transform={`translate(210 ${380 + lineIndex * 260})`}>
        {line.characters.map((unit, unitIndex) => {
          const progress = interpolate(
            globalMs,
            [unit.startMs, unit.startMs + Math.min(220, unit.endMs - unit.startMs)],
            [0, 1],
            {
              ...clamp,
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          );
          const preceding = line.characters
            .slice(0, unitIndex)
            .reduce((sum, item) => sum + item.text.length, 0);
          return (
            <text
              key={`${line.id}-${unit.index}`}
              x={preceding * 104}
              fontFamily={FONT_ENGLISH}
              fontWeight={700}
              fontSize={170}
              fill={lineIndex === 0 ? COLORS.paper : COLORS.ink}
              opacity={progress}
              transform={`translate(0 ${(1 - progress) * 28})`}
            >
              {unit.text}
            </text>
          );
        })}
      </g>
    ))}
  </g>
);

export const Prelude: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const second = frame / fps;
  const globalMs = second * 1000;
  const credits = lyricData.intro.credits;
  const bridge = phaseOpacity(second, 0, 3.45, 0.62);
  const authors = phaseOpacity(second, 2.95, 6.55, 0.52);
  const production = phaseOpacity(second, 6.05, 9.6, 0.52);
  const studio = phaseOpacity(second, 9.1, 12.3, 0.5);
  const voice = phaseOpacity(second, 11.8, 16.1, 0.45);
  const bridgeText = interpolate(second, [0.52, 0.92], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const sway = Math.sin((second / 3.8) * Math.PI * 2);
  const breathe = (1 - Math.cos((second / 2.8) * Math.PI * 2)) / 2;
  const shuttle = (1 - Math.cos((second / 4.4) * Math.PI * 2)) / 2;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        background: COLORS.paper,
      }}
    >
      <svg viewBox="0 0 1920 1080" width="100%" height="100%">
        <g opacity={bridge}>
          <rect width="1920" height="1080" fill={COLORS.paper} />
          <path
            d={`M${-220 + shuttle * 220} 0 H${690 + shuttle * 120} L${1120 + shuttle * 80} 1080 H0 Z`}
            fill={COLORS.cyan}
          />
          <path
            d={`M${1320 - shuttle * 120} 0 H1920 V1080 H${1510 - shuttle * 190} Z`}
            fill={COLORS.orange}
          />
          <g
            opacity={bridgeText}
            transform="translate(160 210)"
          >
            <text
              fontFamily={FONT_UTILITY}
              fontWeight={700}
              fontSize={44}
              letterSpacing={12}
              fill={COLORS.ink}
            >
              JJ陆 · 2008
            </text>
            <text
              y={235}
              fontFamily={FONT_DISPLAY}
              fontWeight={900}
              fontSize={210}
              fill={COLORS.ink}
            >
              不潮不用花钱
            </text>
            <text
              y={390}
              fontFamily={FONT_ENGLISH}
              fontWeight={700}
              fontSize={70}
              letterSpacing={8}
              fill={COLORS.ink}
            >
              HIGH FASHION / ZERO PRICE
            </text>
          </g>
          <g
            opacity={bridgeText}
            transform="translate(1470 760)"
          >
            <path d="M0 0 H330 L390 95 L330 190 H0 Z" fill={COLORS.ink} />
            <circle cx={326} cy={95} r={20} fill={COLORS.orange} />
            <text
              x={38}
              y={128}
              fontFamily={FONT_UTILITY}
              fontSize={92}
              fill={COLORS.paper}
            >
              林俊杰
            </text>
          </g>
        </g>

        <g opacity={authors}>
          <rect width="1920" height="1080" fill={COLORS.ink} />
          <path
            d={`M0 ${170 + sway * 22} H1920 V${390 + sway * 22} H0 Z`}
            fill={COLORS.lime}
          />
          <path
            d={`M0 ${760 - sway * 18} H1920 V${930 - sway * 18} H0 Z`}
            fill={COLORS.pink}
          />
          {Array.from({ length: 9 }, (_, index) => (
            <path
              key={index}
              d={`M${1180 + index * 86} 0 L${980 + index * 86 + sway * 18} 1080`}
              stroke={index % 2 ? COLORS.cyan : COLORS.paper}
              strokeWidth={index % 3 === 0 ? 18 : 8}
              opacity={0.42}
            />
          ))}
          <CreditPair
            first={credits[0]}
            second={credits[1]}
            color={COLORS.paper}
            accent={COLORS.cyan}
          />
        </g>

        <g opacity={production}>
          <rect width="1920" height="1080" fill={COLORS.orange} />
          <g transform={`translate(${1020 + sway * 30} 0)`}>
            {Array.from({ length: 6 }, (_, index) => {
              const height = 260 + index * 90 + breathe * (index % 2 ? 90 : -70);
              return (
                <rect
                  key={index}
                  x={index * 145}
                  y={540 - height / 2}
                  width={88}
                  height={height}
                  fill={index % 2 ? COLORS.paper : COLORS.cyan}
                />
              );
            })}
          </g>
          <path d="M0 850 H1920" stroke={COLORS.ink} strokeWidth={24} />
          <CreditPair
            first={credits[2]}
            second={credits[3]}
            color={COLORS.ink}
            accent="#5B1430"
            x={140}
            y={245}
          />
        </g>

        <g opacity={studio}>
          <rect width="1920" height="1080" fill={COLORS.cyan} />
          <g transform="translate(1110 100)">
            {Array.from({ length: 5 }, (_, index) => {
              const y = 120 + index * 170;
              const knob = 80 +
                ((Math.sin(second * (0.8 + index * 0.07) + index) + 1) / 2) *
                  520;
              return (
                <g key={index} transform={`translate(0 ${y})`}>
                  <path d="M0 0 H690" stroke={COLORS.ink} strokeWidth={18} />
                  <rect
                    x={knob}
                    y={-40}
                    width={110}
                    height={80}
                    rx={16}
                    fill={index % 2 ? COLORS.lime : COLORS.pink}
                  />
                </g>
              );
            })}
          </g>
          <CreditPair
            first={credits[4]}
            second={credits[5]}
            color={COLORS.ink}
            accent="#443164"
            x={120}
            y={250}
          />
        </g>

        <g opacity={voice}>
          <rect width="1920" height="1080" fill={COLORS.pink} />
          {Array.from({ length: 16 }, (_, index) => {
            const height = 180 +
              ((Math.sin(second * 1.4 + index * 0.52) + 1) / 2) * 560;
            return (
              <rect
                key={index}
                x={80 + index * 116}
                y={540 - height / 2}
                width={64}
                height={height}
                rx={32}
                fill={index % 3 === 0 ? COLORS.lime : COLORS.ink}
                opacity={index % 3 === 0 ? 0.92 : 0.18}
              />
            );
          })}
          <path
            d={`M0 ${160 + breathe * 80} H1920 V${350 + breathe * 80} H0 Z`}
            fill={COLORS.ink}
          />
          <Vocalise globalMs={globalMs} />
        </g>

        <rect
          x="52"
          y="52"
          width="1816"
          height="976"
          rx="30"
          fill="none"
          stroke={COLORS.ink}
          strokeWidth="4"
          opacity="0.25"
        />
      </svg>
    </div>
  );
};
