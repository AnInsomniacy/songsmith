import React from "react";
import { interpolate } from "remotion";
import { INK } from "../design";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { Chick, FloorBadge, SofaShape, ToyBear } from "../Kit";
import type { Page } from "../types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type ToyPlan = {
  line: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  draw: React.ReactNode;
};

export const Sofa1: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const plans: ToyPlan[] = [
    {
      line: 28,
      from: { x: 240, y: 980 },
      to: { x: 1170, y: 690 },
      draw: <Chick h={96} />,
    },
    {
      line: 29,
      from: { x: 1960, y: 980 },
      to: { x: 1340, y: 690 },
      draw: <ToyBear h={120} fill="#C9A227" />,
    },
    {
      line: 30,
      from: { x: 1420, y: -140 },
      to: { x: 1500, y: 690 },
      draw: <ToyBear h={96} fill="#FF7A1A" />,
    },
  ];

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {/* rug */}
        <ellipse cx={1360} cy={940} rx={560} ry={44} fill="#E2D8C2" stroke={INK} strokeWidth={2.5} />

        {/* sofa */}
        <g transform={`translate(980 560)`}>
          <SofaShape w={760} h={330} fill="#0F5E5C" />
        </g>

        {/* display easel behind */}
        <g transform="translate(1080 300) rotate(-3)">
          <rect width={420} height={130} rx={8} fill="#F2B705" stroke={INK} strokeWidth={3.5} />
          <text x={210} y={62} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={30} fill={INK} letterSpacing={3}>
            TRY & SIT
          </text>
          <text x={210} y={104} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={22} fill="#8A6400" letterSpacing={2}>
            SAMPLE CORNER
          </text>
          <line x1={60} y1={130} x2={20} y2={330} stroke={INK} strokeWidth={7} />
          <line x1={360} y1={130} x2={400} y2={330} stroke={INK} strokeWidth={7} />
        </g>

        {/* toys hopping in on their own lines */}
        {plans.map((plan, i) => {
          const sf = localFrame(lineAt(plan.line).startMs, page.startMs, fps);
          const p = Math.min(1, Math.max(0, (f - sf) / 46));
          if (p <= 0) return null;
          const ease = 1 - Math.pow(1 - p, 3);
          const x = plan.from.x + (plan.to.x - plan.from.x) * ease;
          const y =
            plan.from.y +
            (plan.to.y - plan.from.y) * ease -
            Math.sin(p * Math.PI) * (i === 2 ? 60 : 170);
          const bob = p >= 1 ? Math.abs(Math.sin((f / 26 + i) * Math.PI)) * 5 : 0;
          const squashed = p > 0.86 && p < 1 ? 0.82 : 1;
          return (
            <g key={i} transform={`translate(${x} ${y + bob}) scale(1 ${squashed})`}>
              {plan.draw}
            </g>
          );
        })}

        {/* dents appear as toys land */}
        {[28, 29, 30].map((lineIdx, i) => {
          const sf = localFrame(lineAt(lineIdx).startMs, page.startMs, fps);
          const land = interpolate(f, [sf + 40, sf + 50], [1, 0], { ...clamp });
          if (land <= 0) return null;
          return (
            <ellipse
              key={i}
              cx={1170 + i * 165}
              cy={742}
              rx={70}
              ry={14}
              fill="rgba(0,0,0,0.22)"
              opacity={land * 0.8}
            />
          );
        })}
      </svg>
    </div>
  );
};
