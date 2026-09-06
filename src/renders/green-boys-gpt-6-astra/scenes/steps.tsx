import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#A2C8CA" id={id}>
      <A.Cloud x={1230 + 30 * w} y={105} />
      <path
        d="M1050 1080V930H1200V760H1360V590H1520V420H1690V250H1920V1080Z"
        fill={P.pine}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${1050 + i * 160} ${930 - i * 170}h160v21h-160Z`}
          fill={P.sun}
          opacity={0.35 + 0.65 * A.ease(p * 2 - i * 0.2)}
        />
      ))}
      <path
        d={`M1670 0L${840 + 20 * w} 1080H1370L1830 0Z`}
        fill={P.cloud}
        opacity=".19"
      />
      <A.Sprig x={1850} y={280} s={0.8} angle={5 * w} />
    </A.World>
  );
}
