import { C, type SceneProps } from "../design";
import { World, Floor } from "./shared";
export default function Archive(p: SceneProps) {
  const { id, q, t } = p;
  return (
    <World p={p}>
      <Floor id={id} y={830} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${1190 + i * 32} ${150 + i * 83})`}>
          <path d="M0 0H410L440 27H30Z" fill={C.sun} />
          <rect
            y="27"
            x="30"
            width="410"
            height="51"
            fill={i % 2 ? C.violet : "#517B86"}
          />
          <path d="M70 52H187" stroke={C.white} opacity=".5" />
        </g>
      ))}
      <g
        transform={`translate(${1160 + q * 50} ${738 - q * 85 + Math.sin(t * 0.4) * 2})`}
      >
        <path d="M0 0L382 -75L438 -24L56 51Z" fill={C.white} />
        <path d="M50 5L364 -52L391 -30L77 30Z" fill={C.coral} />
      </g>
      <path d="M1140 835H1760L1870 944H1250Z" fill={C.violet} opacity=".2" />
    </World>
  );
}
