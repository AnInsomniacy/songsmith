import { C, type SceneProps, wave } from "../design";
import { World, Sea } from "./shared";
export default function Tide(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Sea id={id} t={t} y={300} />
      <path d="M0 90H640L710 1080H0Z" fill="#E1D3BF" />
      <path
        d={`M590 0Q${710 + wave(t, 12) * 35} 450 ${620 + q * 30} 1080`}
        fill="none"
        stroke={C.white}
        strokeWidth="18"
        opacity=".8"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse
          key={i}
          cx={290 + i * 23}
          cy={250 + i * 112}
          rx="21"
          ry="39"
          transform={`rotate(18 ${290 + i * 23} ${250 + i * 112})`}
          fill="#9DA6A1"
          opacity={0.35 - (i > 3 ? q * 0.25 : 0)}
        />
      ))}
      <path d="M90 100V900" stroke={C.sun} opacity=".4" />
    </World>
  );
}
