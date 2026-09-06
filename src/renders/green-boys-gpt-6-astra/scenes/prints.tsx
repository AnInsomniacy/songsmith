import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#C7DEB8" id={id}>
      <path
        d="M760 1080Q1550 850 1730 280L1920 340Q1720 900 1140 1080Z"
        fill="#ACBCA0"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g
          key={i}
          transform={`translate(${1140 + i * 120 + (i % 2) * 70} ${990 - i * 110}) rotate(35)`}
          opacity={A.ease(t * 0.5 - i * 0.2)}
        >
          <ellipse cy="-22" rx="28" ry="49" fill={P.pine} />
          <ellipse cy="35" rx="23" ry="19" fill={P.pine} />
          {i < 3 ? (
            <g opacity={p}>
              <A.Sprig x={0} y={0} s={0.25} angle={w * 7} fill={P.sun} />
            </g>
          ) : null}
        </g>
      ))}
      <A.Cloud x={1220 + 22 * w} y={100} />
      <A.Sprig x={1840} y={920} s={1.5} angle={7 * w} />
    </A.World>
  );
}
