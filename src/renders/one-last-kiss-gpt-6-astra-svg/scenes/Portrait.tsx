import { C, type SceneProps } from "../design";
import { World, Floor, Frame, Reeds } from "./shared";
export default function Portrait(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Floor id={id} y={820} />
      <Frame x={175} y={135} w={450} h={615} id={id} />
      <path d="M198 720V510Q350 340 602 450V720Z" fill="#537E80" />
      <path d="M198 680Q410 380 602 550V730H198Z" fill={C.glass} />
      <circle cx={455 - q * 60} cy="302" r="87" fill={C.sun} />
      <path
        d={`M175 750L${520 + q * 170} 950H1060L625 750Z`}
        fill={C.violet}
        opacity=".13"
      />
      <Reeds x={65} y={910} t={t} color="#456D71" scale={0.8} />
      <path d="M680 70V812" stroke={C.white} strokeWidth="3" />
      <path
        d="M115 120H50V820H115"
        fill="none"
        stroke={C.night}
        opacity=".16"
      />
    </World>
  );
}
