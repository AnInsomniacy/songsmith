import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
export default function Fracture(p: SceneProps) {
  const { id, t } = p;
  const d = 12 + 18 * (1 - Math.cos(t * 0.28));
  return (
    <World p={p}>
      <circle cx="1190" cy="330" r="400" fill={`url(#${id}-glow)`} />
      <g transform={`translate(${-d} 0)`}>
        <path
          d="M410 90H1000L925 245L990 350L920 580H410Z"
          fill={`url(#${id}-glass)`}
          stroke={C.glass}
          strokeWidth="2"
        />
        <path d="M470 150L905 490" stroke={C.white} opacity=".2" />
      </g>
      <g transform={`translate(${d} ${wave(t, 11) * 5})`}>
        <path
          d="M1014 90H1510V580H934L1004 350L939 245Z"
          fill={`url(#${id}-glass)`}
          stroke={C.sun}
          strokeWidth="2"
        />
      </g>
      <path d="M405 610H1510L1710 684H590Z" fill={C.night} opacity=".3" />
    </World>
  );
}
