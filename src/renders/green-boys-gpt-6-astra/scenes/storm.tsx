import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  return (
    <A.World fill="#597F88" id={id}>
      <path d="M860 1080L1620 610L1920 715V1080Z" fill={P.pine} />
      <path d="M960 1080L1620 650L1830 770L1200 1080" fill="#819B8B" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path
            d={`M${1260 + i * 140} ${990 - i * 70}v-280h70`}
            stroke={P.pine}
            strokeWidth="12"
            fill="none"
          />
          <ellipse
            cx={1330 + i * 140}
            cy={710 - i * 70}
            rx={35 - i * 3}
            ry="12"
            fill={P.sun}
            opacity={0.15 + 0.85 * A.ease(p * 2 - i * 0.25)}
          />
        </g>
      ))}
      {Array.from({ length: 18 }, (_, i) => {
        const a = t * 2 + i;
        return (
          <path
            key={i}
            d={`M${970 + ((i * 113) % 970)} ${60 + ((i * 173) % 800) + 90 * Math.sin(a)}l-35 120`}
            stroke={P.cloud}
            strokeWidth="3"
            opacity={0.1 + 0.2 * Math.max(0, Math.cos(a))}
          />
        );
      })}
      <A.Flag x={1780} y={265} t={t * 1.5} fill={P.sun} scale={0.7} />
    </A.World>
  );
}
