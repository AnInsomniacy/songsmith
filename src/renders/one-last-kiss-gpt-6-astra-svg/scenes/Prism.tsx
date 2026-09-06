import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
export default function Prism(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <path d="M-40 145L958 332L961 368L-40 290Z" fill={C.sun} opacity=".6" />
      <path
        d="M961 330L1920 50V250L969 378Z"
        fill={C.coral}
        opacity={0.4 + q * 0.25}
      />
      <path d="M961 360L1920 310V550L950 412Z" fill={C.glass} opacity=".45" />
      <path d="M961 385L1920 575V705L958 407Z" fill={C.violet} opacity=".6" />
      <g transform={`rotate(${wave(t, 14) * 2} 960 355)`}>
        <path
          d="M960 140L1160 525H748Z"
          fill={`url(#${id}-glass)`}
          stroke={C.white}
          strokeWidth="3"
        />
        <path
          d="M960 140V400L1160 525M960 400L748 525"
          fill="none"
          stroke={C.sun}
          opacity=".6"
        />
      </g>
    </World>
  );
}
