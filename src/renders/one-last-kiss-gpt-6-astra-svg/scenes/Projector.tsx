import { C, type SceneProps } from "../design";
import { World, Floor, Gear } from "./shared";
export default function Projector(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Floor id={id} y={850} />
      <path
        d={`M1490 520L1920 ${145 - q * 80}V${850 + q * 70}Z`}
        fill={`url(#${id}-light)`}
      />
      <Gear x={1305} y={310} r={87} angle={t * 15} />
      <Gear x={1515} y={330} r={72} angle={t * 15} color={C.sun} />
      <path
        d="M1270 370H1510V677H1210V450Z"
        fill={C.night}
        stroke={C.glass}
        strokeWidth="3"
      />
      <path d="M1510 480H1580V570H1510Z" fill={C.violet} />
      <path d="M1580 465H1610V585H1580Z" fill={C.glass} />
      <path
        d="M1320 677L1290 850M1435 677L1490 850"
        stroke={C.night}
        strokeWidth="18"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M1240 ${525 + i * 18}h140`}
          stroke={C.violet}
          strokeWidth="5"
        />
      ))}
      <circle cx="1460" cy="619" r="14" fill={C.coral} />
    </World>
  );
}
