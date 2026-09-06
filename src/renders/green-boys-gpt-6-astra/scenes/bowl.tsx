import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#C1DADF" id={id}>
      <path d="M940 0H1920V1080H940Z" fill="#ADCBD1" />
      <ellipse
        cx="1450"
        cy="930"
        rx="350"
        ry="55"
        fill={P.pine}
        opacity=".18"
      />
      <path d="M1110 685Q1150 960 1450 965Q1750 960 1790 685Z" fill={P.clay} />
      <ellipse cx="1450" cy="685" rx="340" ry="90" fill={P.cloud} />
      <ellipse cx="1450" cy="690" rx="300" ry="65" fill={P.sky} />
      <A.Ripple x={1450} y={690} t={t} scale={1.6} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${1340 + i * 100} ${400 + 100 * A.wave(t, 4, i)}q15 28 0 40q-15-12 0-40Z`}
          fill={P.cloud}
          opacity={1 - p * 0.7}
        />
      ))}
      <g opacity={p}>
        <A.Sprig x={1460} y={705} s={0.65} angle={w * 4} fill={P.leaf} />
      </g>
      <path
        d="M1140 790Q1430 850 1770 790"
        stroke={P.sun}
        strokeWidth="8"
        fill="none"
      />
    </A.World>
  );
}
