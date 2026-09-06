import React from "react";
import { INK } from "../design";
import { FONT_NUM } from "../fonts";
import { lineAt, localFrame } from "../lyrics";
import { Awning, FloorBadge } from "../Kit";
import type { Page } from "../types";

const STALLS = [
  { x: 190, c1: "#E23A2E", c2: "#F7F4EA", name: "面档" },
  { x: 760, c1: "#0F5E5C", c2: "#F7F4EA", name: "饭档" },
  { x: 1330, c1: "#F2B705", c2: "#F7F4EA", name: "茶档" },
];

export const FoodCourt: React.FC<{ page: Page; f: number; fps: number }> = ({
  page,
  f,
  fps,
}) => {
  const callMs = lineAt(23).characters[0].startMs;
  const callF = localFrame(callMs, page.startMs, fps);
  const num = Math.min(3, Math.floor(Math.max(0, f - callF) / 55));
  const numbers = ["117", "118", "119", "120"];

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <FloorBadge page={page} f={f} />
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <rect width={1920} height={1080} fill={page.field} />

        {STALLS.map((st, i) => (
          <g key={i} transform={`translate(${st.x} 260)`}>
            <rect x={0} y={190} width={420} height={440} fill="#EFE7D2" stroke={INK} strokeWidth={3.5} />
            <g transform="translate(10 130)">
              <Awning w={400} h={58} c1={st.c1} c2={st.c2} />
            </g>
            <rect x={40} y={230} width={340} height={92} rx={6} fill="#FDFBF4" stroke={INK} strokeWidth={3} />
            <text x={210} y={292} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={700} fontSize={48} fill={INK} letterSpacing={6}>
              NO.{i + 1}
            </text>
            <rect x={40} y={360} width={340} height={220} fill="#101B1A" stroke={INK} strokeWidth={3} />
            {Array.from({ length: 3 }, (_, r) => (
              <text key={r} x={70} y={410 + r * 62} fontFamily={FONT_NUM} fontWeight={700} fontSize={30} fill="#EDE6CF" letterSpacing={2}>
                {["A SET ¥28", "B SET ¥32", "C SET ¥18"][r]}
              </text>
            ))}
            {/* steam */}
            {[80, 200, 320].map((sx, k) => (
              <path
                key={k}
                d={`M${sx} ${640} q ${Math.sin((f / 40) * Math.PI * 2 + k + i) * 16} -60 0 -120 q ${Math.sin((f / 40) * Math.PI * 2 + k + i + 1) * 16} -60 0 -120`}
                stroke="rgba(27,23,18,0.22)"
                strokeWidth={7}
                fill="none"
                strokeLinecap="round"
              />
            ))}
          </g>
        ))}

        {/* number board */}
        <g transform="translate(700 60)">
          <rect width={520} height={140} rx={10} fill="#101B1A" stroke={INK} strokeWidth={4} />
          <text x={40} y={62} fontFamily={FONT_NUM} fontWeight={700} fontSize={30} fill="#8FD6C6" letterSpacing={4}>
            NOW SEATING
          </text>
          <text x={40} y={120} fontFamily={FONT_NUM} fontWeight={700} fontSize={58} fill="#F2C94C" letterSpacing={6}>
            {numbers[num]}
          </text>
          <circle cx={462} cy={100} r={9} fill="#E23A2E" opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 20))} />
        </g>
      </svg>
    </div>
  );
};
