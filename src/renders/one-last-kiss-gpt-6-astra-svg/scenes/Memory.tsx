import { C, type SceneProps, wave } from "../design";
import { World, Floor } from "./shared";
export default function Memory(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Floor id={id} y={845} />
      <path
        d="M1190 90H1800V780H1190Z"
        fill={C.night}
        stroke={C.violet}
        strokeWidth="14"
      />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M1220 ${170 + i * 180}H1770`} stroke={C.sun} opacity=".6" />
          <path
            d={`M1238 ${170 + i * 180}L1260 ${200 + i * 180}`}
            stroke={C.glass}
          />
          <g
            transform={`rotate(${wave(t, 9, i) * 1.5} ${1330 + i * 100} ${170 + i * 180})`}
          >
            <rect
              x={1280 + i * 80}
              y={178 + i * 180}
              width="140"
              height="120"
              fill={C.white}
              opacity={i === 2 ? 0.4 + q * 0.6 : 1}
            />
            <rect
              x={1290 + i * 80}
              y={188 + i * 180}
              width="120"
              height="83"
              fill={[C.glass, C.violet, C.coral][i]}
            />
          </g>
        </g>
      ))}
    </World>
  );
}
