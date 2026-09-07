import { C, type SceneProps, wave } from "../design";
import { World, Gear } from "./shared";
import { Materials, Parquet, Screw } from "./craft";
export default function Gears(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <Parquet id={id} y={900} />
      <path
        d="M1200 176Q1190 77 1480 74Q1770 77 1760 176V863H1200Z"
        fill={`url(#${id}-wood)`}
      />
      <path
        d="M1222 187Q1222 107 1480 108Q1738 107 1738 187V840H1222Z"
        fill="#142B40"
        stroke={C.sun}
        strokeWidth="3"
      />
      <path d="M1254 230h450v407h-450Z" fill="#344958" />
      <Gear x={1380} y={364} r={116} angle={t * 10} color="#D8B18A" />
      <Gear x={1579} y={468} r={109} angle={-t * 10.64 + 7.5} color="#94B8B5" />
      <Gear x={1350} y={562} r={72} angle={-t * 16.11} color="#A89988" />
      <path
        d="M1380 364v-147m199 251v163m-229-69v78"
        stroke={C.night}
        strokeWidth="13"
      />
      <path d="M1260 650h438" stroke={C.sun} strokeWidth="8" />
      <g transform={`rotate(${wave(t, 3.4) * 7} 1480 638)`}>
        <path d="M1480 638v114" stroke={`url(#${id}-brass)`} strokeWidth="8" />
        <circle cx="1480" cy="786" r="44" fill={`url(#${id}-brass)`} />
        <circle
          cx="1480"
          cy="786"
          r="32"
          fill="none"
          stroke="#735D51"
          strokeWidth="2"
        />
      </g>
      <path d="M1240 205h48v600h-48Z" fill={C.white} opacity=".06" />
      {[
        [1238, 196],
        [1724, 196],
        [1238, 825],
        [1724, 825],
      ].map(([x, y]) => (
        <Screw key={x + y} x={x} y={y} />
      ))}
      <path d="M1170 867h620v39h-620Z" fill={`url(#${id}-wood)`} />
      <path
        d={`M1540 640L${1690 + q * 55} 834H1630L1450 640Z`}
        fill={C.sun}
        opacity=".08"
      />
    </World>
  );
}
