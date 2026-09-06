import React from "react";
import { Easing, interpolate } from "remotion";
import { INK } from "../design";
import { FONT_IMPACT, FONT_NUM } from "../fonts";
import { FloorBadge, StreetLamp } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TITLE = ["不", "潮", "不", "用", "花", "钱"];

export const NightWindow: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
}) => {
  const charAlpha = (i: number): number => {
    if (i === 1) return 1; // 潮 stays lit
    const off = 26 + i * 15;
    return interpolate(f, [off, off + 10], [1, 0.14], { ...clamp });
  };
  const lampWarm = interpolate(f, [10, 40], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* street */}
        <rect x={0} y={900} width={1920} height={180} fill="#0B1513" stroke="#23413C" strokeWidth={3} />

        {/* two glowing shop windows */}
        {[{ x: 170, w: 560 }, { x: 1180, w: 560 }].map((wd, i) => (
          <g key={i}>
            <rect x={wd.x} y={260} width={wd.w} height={620} fill="#11221F" stroke="#2C4A44" strokeWidth={4} />
            <rect x={wd.x + 14} y={274} width={wd.w - 28} height={592} fill="#F2C94C" opacity={0.1 + lampWarm * 0.08} />
            <ellipse cx={wd.x + wd.w / 2} cy={900} rx={wd.w * 0.62} ry={40} fill="#F2C94C" opacity={0.08 + lampWarm * 0.07} />
            {i === 0 ? (
              <g transform={`translate(${wd.x + 90} 560)`}>
                <rect x={0} y={0} width={150} height={210} rx={8} fill="#8A6400" stroke={INK} strokeWidth={3} />
                <rect x={26} y={38} width={98} height={70} rx={4} fill="#F2C94C" opacity={0.85} />
              </g>
            ) : (
              <g transform={`translate(${wd.x + 120} 520)`}>
                <circle cy={60} r={62} fill="none" stroke="#F2C94C" strokeWidth={10} opacity={0.9} />
                <path d="M-62 60 A62 62 0 0 1 62 60" stroke="#171310" strokeWidth={12} fill="none" opacity={0.6} />
              </g>
            )}
          </g>
        ))}

        {/* marquee, letters going out one by one — 潮 remains */}
        <g transform="translate(810 150)">
          <rect x={-30} y={-70} width={430} height={140} rx={10} fill="#171310" stroke="#2C4A44" strokeWidth={4} />
          {TITLE.map((ch, i) => (
            <text
              key={i}
              x={44 + i * 66}
              y={44}
              textAnchor="middle"
              fontFamily={FONT_IMPACT}
              fontSize={72}
              fill={i === 1 ? "#F2C94C" : "#E23A2E"}
              opacity={charAlpha(i)}
            >
              {ch}
            </text>
          ))}
        </g>

        {/* street lamp with pool */}
        <g transform="translate(1010 900)">
          <ellipse cy={26} rx={330} ry={40} fill="#F2C94C" opacity={0.1 * lampWarm} />
          <StreetLamp h={560} fill="#23413C" />
          <ellipse cx={116} cy={10} rx={250} ry={34} fill="#F2C94C" opacity={0.16 * lampWarm} />
        </g>

        {/* asphalt reflection line */}
        <line x1={0} y1={980} x2={1920} y2={980} stroke="#23413C" strokeWidth={2} opacity={0.7} />
        <text x={1760} y={1050} textAnchor="end" fontFamily={FONT_NUM} fontWeight={700} fontSize={26} fill="#3C5850" letterSpacing={6}>
          22:07 PM
        </text>
      </svg>
    </div>
  );
};
