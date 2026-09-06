import { C, type SceneProps, smooth } from "../design";
import { World, Sea } from "./shared";
const pts = [
  [330, 330],
  [580, 230],
  [830, 350],
  [1080, 190],
  [1370, 290],
  [1620, 160],
];
export default function Constellation(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 3 ? 10 : 6} fill={C.sun} />
          {i > 0 && (
            <path
              d={`M${pts[i - 1][0]} ${pts[i - 1][1]}L${x} ${y}`}
              stroke={C.glass}
              opacity={0.15 + 0.5 * q}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - smooth((t - i * 0.6) / 3)}
            />
          )}
        </g>
      ))}
      <path
        d="M0 500Q530 400 950 540T1920 465V1080H0Z"
        fill={C.violet}
        opacity=".2"
      />
      <Sea id={id} t={t} y={610} />
      <path d="M1660 540L1730 345L1800 540Z" fill={C.night} />
    </World>
  );
}
