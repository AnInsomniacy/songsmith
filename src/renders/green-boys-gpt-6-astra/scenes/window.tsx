import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#D6E4DA" id={id}>
      <path d="M980 0H1920V1080H980Z" fill={P.pine} />
      <path d="M1110 130H1790V860H1110Z" fill={P.sky} />
      <A.Cloud x={1300 + 25 * w} y={210} s={1.5} />
      <path d="M1110 670Q1500 550 1790 640V860H1110Z" fill={P.leaf} />
      <path d="M1440 650L1350 860H1550Z" fill={P.cloud} />
      <g
        transform={`translate(1120 140) skewY(${-12 * p}) scale(${1 - 0.78 * p} 1)`}
      >
        <path
          d="M0 0H325V700H0Z"
          fill="#A7C3BE"
          stroke={P.cloud}
          strokeWidth="18"
        />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${50 + i * 67} ${80 + 80 * A.wave(t, 7, i)}v140`}
            stroke={P.cloud}
            opacity=".45"
            strokeWidth="4"
          />
        ))}
      </g>
      <path d="M1445 130V860M1090 880H1820" stroke={P.cloud} strokeWidth="20" />
      <path
        d={`M1120 890L${760 - 140 * p} 1080H1810L1760 890Z`}
        fill={P.sun}
        opacity={0.22 + 0.28 * p}
      />
      <A.Sprig x={1810} y={985} s={1.3} angle={6 * w} />
    </A.World>
  );
}
