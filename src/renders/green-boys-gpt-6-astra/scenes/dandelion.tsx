import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#CBE2D7" id={id}>
      <circle cx="1580" cy="220" r="112" fill={P.sun} />
      <path d="M0 1080Q1460 790 1920 950V1080H0Z" fill={P.leaf} />
      <path
        d={`M1460 1030Q1380 710 ${1450 + 12 * w} 555`}
        stroke={P.pine}
        strokeWidth="12"
        fill="none"
      />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * Math.PI) / 8;
        const dx = Math.cos(a) * 100;
        const dy = Math.sin(a) * 100;
        return (
          <g
            key={i}
            transform={`translate(${1450 + dx + p * (100 + 12 * i) + 12 * w} ${555 + dy - p * (80 + i * 11)}) rotate(${i * 22.5})`}
          >
            <path
              d="M0 0v-35m0 0l-15-18m15 18l15-18m-15 18v-23"
              stroke={P.cloud}
              strokeWidth="3"
              fill="none"
            />
          </g>
        );
      })}
      <circle cx={1450 + 12 * w} cy="555" r="23" fill={P.sun} />
      <A.Sprig x={1770} y={1050} s={1.1} angle={w * 8} />
    </A.World>
  );
}
