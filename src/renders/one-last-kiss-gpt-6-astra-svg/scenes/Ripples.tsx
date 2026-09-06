import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
export default function Ripples(p: SceneProps) {
  const { t, q } = p;
  return (
    <World p={p}>
      <path d="M0 490Q640 350 1920 540V1080H0Z" fill={C.glass} opacity=".24" />
      {Array.from({ length: 7 }, (_, i) => (
        <ellipse
          key={i}
          cx={960 + wave(t, 15) * 25}
          cy="390"
          rx={95 + i * 95 + wave(t, 8, i * 0.4) * 12}
          ry={28 + i * 25}
          fill="none"
          stroke={i % 2 ? C.violet : "#4F858B"}
          strokeWidth={1.5}
          opacity={0.45 - i * 0.04}
        />
      ))}
      <path
        d={`M880 369Q960 ${240 - q * 55} 1040 369Q960 435 880 369Z`}
        fill={C.sun}
      />
      <path d="M960 370V270" stroke={C.white} strokeWidth="2" />
    </World>
  );
}
