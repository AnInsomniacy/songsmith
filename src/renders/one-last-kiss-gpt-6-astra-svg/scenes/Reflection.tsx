import { C, type SceneProps, wave } from "../design";
import { World, Sea } from "./shared";
export default function Reflection(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Sea id={id} t={t} y={690} />
      <path d="M155 90H622V650H155Z" fill={C.violet} opacity=".2" />
      <path
        d="M185 122H592V620H185Z"
        fill={`url(#${id}-glass)`}
        stroke={C.white}
        strokeWidth="5"
      />
      <circle cx="390" cy={335 - q * 30} r="100" fill={C.sun} />
      <path d="M185 595Q370 380 592 460V620H185Z" fill="#58878B" />
      {Array.from({ length: 10 }, (_, i) => (
        <path
          key={i}
          d={`M${240 + wave(t, 6, i) * 16} ${725 + i * 19}h${300 - i * 17}`}
          stroke={C.sun}
          strokeWidth={7 - i * 0.45}
          opacity={0.6 - i * 0.045}
        />
      ))}
    </World>
  );
}
