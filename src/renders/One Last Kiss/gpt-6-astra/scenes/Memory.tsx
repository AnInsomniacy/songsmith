import { C } from "../config";
import { wave } from "../motion";
import { type SceneProps } from "../storyboard";
import { Book, Landscape, Materials, Parquet } from "./craft";
import { World } from "./shared";
export default function Memory(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <Parquet id={id} y={890} />
      <path
        d="M1160 120H1800V820H1160Z"
        fill="#283C4D"
        stroke="#7D8987"
        strokeWidth="16"
      />
      <path d="M1180 140H1780V800H1180Z" fill="#647A7D" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M1190 ${198 + i * 212}q260 18 580 0`}
          stroke={C.sun}
          fill="none"
          strokeWidth="2"
        />
      ))}
      {[0, 1, 2].map((i) => (
        <g
          key={i}
          transform={`rotate(${wave(t, 9, i) * 1.1 + i - 1} ${1300 + i * 96} ${203 + i * 204})`}
          opacity={i === 2 ? 0.35 + q * 0.65 : 1}
        >
          <rect
            x={1220 + i * 72}
            y={211 + i * 201}
            width="195"
            height="163"
            fill="#E6DFCE"
          />
          <Landscape
            x={1232 + i * 72}
            y={222 + i * 201}
            w={171}
            h={119}
            id={id}
            t={t}
            variant={i}
          />
          <path
            d={`M${1298 + i * 72} ${207 + i * 201}v23`}
            stroke="#B89877"
            strokeWidth="9"
          />
          <path
            d={`M${1245 + i * 72} ${359 + i * 201}h65`}
            stroke="#8F9E96"
            strokeWidth="1"
          />
        </g>
      ))}
      <path d="M1160 832h638l-20 53h-600Z" fill={`url(#${id}-wood)`} />
      <Book x={1220} y={799} w={140} color="#7B727E" />
      <path d="M1690 804l21-100h20l14 100Z" fill="#9DAFAB" />
      <path d="M1718 705v-124" stroke="#8CA89F" strokeWidth="3" />
      <path
        d="M1718 627q-72-37-61-61q49-9 61 61m0-22q42-58 62-34q-13 39-62 34"
        fill="#719487"
      />
    </World>
  );
}
