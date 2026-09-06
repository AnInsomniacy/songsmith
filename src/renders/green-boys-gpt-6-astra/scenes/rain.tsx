import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#B6CFD6" id={id}>
      <path d="M1000 0Q1320 90 1920 0V1080H1000Z" fill="#8AAEB7" />
      <ellipse cx="1450" cy="876" rx="365" ry="130" fill={P.sky} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const a = t * 1.8 + i;
        return (
          <path
            key={i}
            d={`M${1140 + i * 100} ${260 + 200 * Math.sin(a)}v78`}
            stroke={P.cloud}
            strokeWidth="5"
            opacity={Math.max(0, Math.cos(a)) * 0.6}
          />
        );
      })}
      <A.Ripple x={1450} y={866} t={t} scale={1.7} />
      <path
        d={`M1240 905Q1430 ${850 - 60 * p} 1670 910`}
        fill="none"
        stroke={P.sun}
        strokeWidth={5 + 8 * p}
        opacity={p}
      />
      <path
        d="M1740 1070Q1690 940 1750 815"
        stroke={P.pine}
        strokeWidth="12"
        fill="none"
      />
      <A.Sprig x={1750} y={984} s={0.7} angle={10 * w} />
    </A.World>
  );
}
