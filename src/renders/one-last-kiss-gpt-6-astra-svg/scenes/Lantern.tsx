import { C, type SceneProps, wave } from "../design";
import { World, Floor } from "./shared";
export default function Lantern(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Floor id={id} y={850} />
      <path d="M1180 150H1820V850H1180Z" fill={C.night} opacity=".4" />
      <circle
        cx="1500"
        cy="495"
        r="300"
        fill={`url(#${id}-glow)`}
        opacity={0.6 + q * 0.3}
      />
      <g transform={`rotate(${wave(t, 10) * 1.2} 1500 80)`}>
        <path d="M1500 80V220" stroke={C.sun} strokeWidth="3" />
        <path
          d="M1380 320Q1380 240 1500 230Q1620 240 1620 320V630Q1500 700 1380 630Z"
          fill={C.sun}
          opacity=".9"
        />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${1410 + i * 60} 270Q${1380 + i * 80} 450 ${1410 + i * 60} 646`}
            fill="none"
            stroke={C.violet}
            opacity=".25"
          />
        ))}
        <path
          d="M1370 320H1630M1370 620H1630"
          stroke={C.night}
          strokeWidth="10"
        />
      </g>
    </World>
  );
}
