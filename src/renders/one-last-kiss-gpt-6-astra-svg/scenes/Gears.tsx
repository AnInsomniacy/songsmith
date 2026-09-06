import { C, type SceneProps } from "../design";
import { World, Floor, Gear } from "./shared";
export default function Gears(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Floor id={id} y={880} />
      <path
        d="M1190 140H1770V818H1190Z"
        fill={C.night}
        stroke={C.glass}
        strokeWidth="2"
      />
      <rect
        x="1210"
        y="160"
        width="540"
        height="637"
        fill={`url(#${id}-glass)`}
      />
      <Gear x={1390} y={388} r={137} angle={t * 8} color={C.sun} />
      <Gear x={1573} y={581} r={117} angle={-t * 9.37} />
      <path
        d={`M1388 387L${1420 + q * 180} 818M1574 581L${1700 + q * 90} 818`}
        stroke={C.night}
        strokeWidth="20"
        opacity=".3"
      />
      <circle cx="1390" cy="388" r="17" fill={C.white} />
      <circle cx="1573" cy="581" r="14" fill={C.white} />
      <path d="M1260 820H1710L1810 910H1320Z" fill={C.sun} opacity=".12" />
      <path d="M1280 176V778M1320 176V778" stroke={C.white} opacity=".1" />
    </World>
  );
}
