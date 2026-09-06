import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
export default function Kiss(p: SceneProps) {
  const { id, t } = p;
  const a = wave(t, 12) * 22;
  return (
    <World p={p}>
      <path
        d={`M-100 75L1060 ${310 + a}L920 ${460 + a}L-100 500Z`}
        fill={C.coral}
        opacity=".48"
      />
      <path
        d={`M2020 60L875 ${300 - a}L1000 ${485 - a}L2020 520Z`}
        fill={C.glass}
        opacity=".5"
      />
      <path
        d={`M875 ${300 - a}L1060 ${310 + a}L1000 ${485 - a}L920 ${460 + a}Z`}
        fill={C.sun}
        opacity=".85"
      />
      <ellipse cx="973" cy="392" rx="350" ry="265" fill={`url(#${id}-glow)`} />
      <path
        d="M300 570Q960 650 1620 570"
        fill="none"
        stroke={C.sun}
        opacity=".4"
      />
    </World>
  );
}
