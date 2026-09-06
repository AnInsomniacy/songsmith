import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#BAD8D8" id={id}>
      <A.Cloud x={1100 + 25 * w} y={90} s={1.4} />
      <path
        d="M880 1080Q1390 820 1440 520Q1490 350 1880 280H1920V1080Z"
        fill="#65A0B6"
      />
      <path
        d="M0 970Q850 710 1230 410H1330Q1270 790 1000 1080H0Z"
        fill={P.leaf}
      />
      <path d="M1570 350Q1640 780 1920 900V0H1800Z" fill="#4A7757" />
      <g transform="rotate(-12 1500 630)">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path
            key={i}
            d={`M${1190 + i * 90} 660v${-150 * A.ease(p * 2 - i * 0.17)}h80v${150 * A.ease(p * 2 - i * 0.17)}Z`}
            fill={i % 2 ? P.cloud : "#D9BD79"}
          />
        ))}
        <path
          d="M1160 485L1830 485M1160 710L1830 710"
          stroke={P.pine}
          strokeWidth="13"
        />
      </g>
      <A.Ripple x={1440} y={920} t={t} scale={1.8} />
    </A.World>
  );
}
