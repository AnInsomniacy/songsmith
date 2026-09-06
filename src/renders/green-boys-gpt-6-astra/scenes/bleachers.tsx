import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#C3E0E5" id={id}>
      <A.Cloud x={1350 + 35 * w} y={100} s={1.7} />
      <path d="M1050 1010V800H1230V620H1420V440H1920V1010Z" fill={P.pine} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path
            d={`M${1070 + i * 190} ${780 - i * 180}H1890v48H${1070 + i * 190}Z`}
            fill={i % 2 ? P.leaf : P.cloud}
          />
          {[0, 1, 2].map((j) => (
            <path
              key={j}
              d={`M${1430 + j * 160} ${750 - i * 170}v-65h110v65Z`}
              fill={P.sun}
              opacity={0.5 + 0.5 * p}
            />
          ))}
        </g>
      ))}
      <path
        d={`M1000 300Q1430 ${400 + 10 * w} 1920 270`}
        stroke={P.pine}
        strokeWidth="4"
        fill="none"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${1150 + i * 160} ${315 + 24 * Math.sin(i)}l70 ${10 * w}l-32 ${80 + 12 * A.wave(t, 5, i)}Z`}
          fill={i % 2 ? P.clay : P.leaf}
        />
      ))}
    </A.World>
  );
}
