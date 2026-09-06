import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
export default function Windows(p: SceneProps) {
  const { t, q } = p;
  return (
    <World p={p}>
      <path
        d="M290 95H730V610H290ZM1190 95H1630V610H1190Z"
        fill={C.night}
        stroke={C.violet}
        strokeWidth="10"
      />
      {[310, 1210].map((x, i) => (
        <g key={i}>
          <rect
            x={x}
            y="115"
            width="400"
            height="475"
            fill={i ? C.sun : C.glass}
            opacity={i ? 0.15 + 0.45 * q : 0.3}
          />
          <path
            d={`M${x + 200} 115V590M${x} 355h400`}
            stroke={C.white}
            strokeWidth="7"
            opacity=".6"
          />
          <path
            d={`M${x} 115h90q${wave(t, 7, i) * 15} 220 30 475h-120Z`}
            fill={C.white}
            opacity=".2"
          />
        </g>
      ))}
      <path
        d="M730 590L950 620L1190 590"
        stroke={C.sun}
        strokeWidth="2"
        fill="none"
        opacity={q}
      />
    </World>
  );
}
