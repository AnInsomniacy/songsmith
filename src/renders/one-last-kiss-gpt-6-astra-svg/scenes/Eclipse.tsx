import { C, type SceneProps } from "../design";
import { World, Sea } from "./shared";
export default function Eclipse(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <circle cx="1465" cy="345" r="320" fill={`url(#${id}-glow)`} />
      <circle cx="1465" cy="345" r="173" fill={C.sun} />
      <circle cx={1360 + q * 85} cy="295" r="176" fill="#39475E" />
      <Sea id={id} t={t} y={740} />
      <path
        d="M1150 715L1270 560L1360 605L1470 470L1640 680L1840 605L1920 740H1150Z"
        fill={C.night}
      />
    </World>
  );
}
