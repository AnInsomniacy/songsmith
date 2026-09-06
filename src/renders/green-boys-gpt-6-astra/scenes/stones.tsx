import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#A6CBCF" id={id}>
      <path d="M950 1080Q1190 490 1920 420V1080Z" fill="#5D9CAA" />
      <path
        d="M960 1080Q1170 660 1500 495"
        stroke={P.leaf}
        strokeWidth="180"
        fill="none"
      />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} opacity={i === 3 ? p : 1}>
          <ellipse
            cx={1300 + i * 140}
            cy={930 - i * 135}
            rx={100 - i * 9}
            ry={42 - i * 5}
            fill={P.pine}
          />
          <ellipse
            cx={1300 + i * 140}
            cy={911 - i * 135}
            rx={95 - i * 9}
            ry={34 - i * 4}
            fill={P.cloud}
          />
        </g>
      ))}
      <A.Ripple x={1560} y={940} t={t} scale={1.3} />
      <A.Sprig x={1860} y={555} s={0.7} angle={w * 8} />
    </A.World>
  );
}
