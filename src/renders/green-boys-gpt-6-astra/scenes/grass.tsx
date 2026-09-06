import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#D3E7DC" id={id}>
      <circle cx="1535" cy="258" r="115" fill={P.sun} />
      <A.Cloud x={1210 + 30 * w} y={345} s={0.8} />
      <path d="M0 1010Q1280 790 1920 870V1080H0Z" fill={P.pine} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <A.Sprig
          key={i}
          x={1130 + i * 120}
          y={1020 - i * 18}
          s={0.85 + i * 0.11}
          angle={-17 + 13 * A.wave(t, 6, i * 0.22)}
          fill={i % 2 ? P.leaf : "#4F825A"}
        />
      ))}
      <g transform={`translate(1460 955) scale(${0.25 + 0.75 * p})`}>
        <A.Sprig x={0} y={0} s={1.3} angle={w * 5} fill={P.sun} />
      </g>
      <path
        d="M0 1050Q1060 985 1920 1060"
        fill="none"
        stroke={P.leaf}
        strokeWidth="28"
      />
    </A.World>
  );
}
