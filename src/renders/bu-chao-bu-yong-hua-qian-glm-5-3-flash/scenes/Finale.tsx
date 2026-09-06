import React from "react";
import { Easing, interpolate } from "remotion";
import { INK, MILK } from "../design";
import { FONT_IMPACT, FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { Coin, Figure, FloorBadge, Ripple, StreetLamp } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const TOP = { x: 1760, y: 96 };
const BOTTOM = { x: 900, y: 640 };
const DRAIN = { x: 836, y: 676 };

const lerp = (a: number, b: number, p: number): number => a + (b - a) * p;

export const Finale: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const coins = lineAt(51)
    .characters.map((u) => ({ text: u.text, f: localFrame(u.startMs, page.startMs, fps) }))
    .filter((u) => u.text.includes("扣"))
    .map((u, i) => ({ ...u, i }));

  const ohMs = lineAt(51).characters.filter((u) => u.text.includes("喔"));
  const ohFrames = ohMs.map((u) => localFrame(u.startMs, page.startMs, fps));

  const lampWarm = interpolate(f, [820, 862], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const dancerIn = interpolate(f, [846, 890], [0, 1], { ...clamp });
  const danceSway = Math.sin((f / 26) * Math.PI * 2) * 9;
  const danceBob = Math.abs(Math.sin((f / 13) * Math.PI)) * 10;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* far marquee — only 潮 left lit */}
        <g transform="translate(220 160)">
          <rect x={-24} y={-58} width={200} height={104} rx={8} fill="#101B1A" stroke="#1E3A35" strokeWidth={3} />
          <text x={26} y={26} textAnchor="middle" fontFamily={FONT_IMPACT} fontSize={62} fill="#171310">
            不
          </text>
          <text
            x={98}
            y={26}
            textAnchor="middle"
            fontFamily={FONT_IMPACT}
            fontSize={62}
            fill="#F2C94C"
            opacity={0.72 + 0.28 * Math.sin((f / 70) * Math.PI * 2)}
          >
            潮
          </text>
          <text x={26 + 144} y={26} textAnchor="middle" fontFamily={FONT_IMPACT} fontSize={62} fill="#171310">
            不
          </text>
        </g>

        {/* long staircase */}
        <line x1={TOP.x} y1={TOP.y - 10} x2={BOTTOM.x} y2={BOTTOM.y - 10} stroke="#2C4A44" strokeWidth={12} />
        {Array.from({ length: 12 }, (_, i) => {
          const p = i / 11;
          const x = lerp(TOP.x, BOTTOM.x, p);
          const y = lerp(TOP.y, BOTTOM.y, p);
          return (
            <g key={i}>
              <line x1={x - 10} y1={y} x2={x + 86} y2={y} stroke="#3C5850" strokeWidth={10} strokeLinecap="round" />
              <line x1={x + 74} y1={y} x2={x + 74} y2={y + 44} stroke="#23413C" strokeWidth={7} />
            </g>
          );
        })}

        {/* drain at the foot of the stairs */}
        <g transform={`translate(${DRAIN.x} ${DRAIN.y})`}>
          <circle r={40} fill="#050D0B" stroke="#3C5850" strokeWidth={5} />
          {Array.from({ length: 5 }, (_, i) => (
            <line key={i} x1={-32 + i * 16} y1={-26} x2={-32 + i * 16} y2={26} stroke="#3C5850" strokeWidth={4} />
          ))}
        </g>

        {/* coins born at each 扣, tumbling to the drain */}
        {coins.map((coin) => {
          const p1 = Math.min(1, Math.max(0, (f - coin.f) / 116));
          const p2 = Math.min(1, Math.max(0, (f - coin.f - 116) / 46));
          const p3 = Math.min(1, Math.max(0, (f - coin.f - 162) / 26));
          if (p1 <= 0 || p3 >= 1) return null;
          const hop = p1 < 1 ? Math.abs(Math.sin(p1 * Math.PI * 5)) * 26 * (1 - p1) : 0;
          const x = p2 <= 0 ? lerp(TOP.x, BOTTOM.x, p1) : lerp(BOTTOM.x, DRAIN.x, p2);
          const y = p2 <= 0 ? lerp(TOP.y, BOTTOM.y, p1) - hop : lerp(BOTTOM.y, DRAIN.y, p2);
          const s = p3 > 0 ? 1 - p3 : 1;
          if (s <= 0.02) return null;
          return (
            <g key={coin.i} transform={`translate(${x} ${y}) scale(${s})`}>
              <g style={{ rotate: `${f * 9 + coin.i * 60}deg` }}>
                <Coin r={30} />
              </g>
            </g>
          );
        })}

        {/* street */}
        <rect x={0} y={880} width={1920} height={200} fill="#08120F" />
        <line x1={0} y1={882} x2={1920} y2={882} stroke="#1E3A35" strokeWidth={3} />

        {/* the lamp and the 绝活 */}
        <g transform="translate(1400 1010)">
          <ellipse cy={0} rx={360} ry={44} fill="#F2C94C" opacity={0.15 * lampWarm} />
          <g opacity={lampWarm}>
            <StreetLamp h={520} fill="#23413C" />
          </g>
          <g opacity={dancerIn} transform={`translate(120 ${-danceBob}) rotate(${danceSway})`} style={{ transformOrigin: "120px 0px" }}>
            <ellipse cy={4} rx={80} ry={12} fill="rgba(0,0,0,0.5)" />
            <Figure h={190} fill={MILK} step={f / 13} />
          </g>
          <g opacity={dancerIn} transform="translate(-120 -14)">
            <rect x={-44} y={-70} width={88} height={58} rx={8} fill="#171310" stroke="#3C5850" strokeWidth={3} />
            <circle cx={-20} cy={-88} r={7} fill="#3C5850" />
            <circle cx={0} cy={-88} r={7} fill="#3C5850" />
            <circle cx={20} cy={-88} r={7} fill="#3C5850" />
          </g>
        </g>

        {/* 喔噢 rings around the marquee */}
        {ohFrames.map((of, i) => (
          <g key={i} transform="translate(320 176)">
            <Ripple p={(f - of) / 30} maxR={110} color="#F2C94C" />
          </g>
        ))}

        {/* small lamp plaque */}
        <g transform="translate(1560 700)" opacity={dancerIn}>
          <rect width={250} height={84} rx={8} fill="#173430" stroke={INK} strokeWidth={3} />
          <text x={125} y={38} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={22} fill="#F2C94C" letterSpacing={3}>
            NOT FOR SALE
          </text>
          <text x={125} y={70} textAnchor="middle" fontFamily={FONT_IMPACT} fontSize={24} fill={MILK} letterSpacing={8}>
            绝活
          </text>
        </g>
      </svg>
    </div>
  );
};
