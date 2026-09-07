import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
import { Materials, Water } from "./craft";
export default function Eclipse(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <circle cx="1530" cy="217" r="132" fill={C.sun} />
      <circle cx={1465 + q * 42} cy="165" r="137" fill="#3F475E" />
      <path
        d="M1090 713V557h68v-75h95v61h74v-118h56v287h63v-202h118v202h53V466h123v247h81V587h99v140Z"
        fill="#425D70"
      />
      <Water id={id} t={t} y={742} />
      <path d="M1390 745V386h-30l116-132l115 132h-30v359Z" fill="#29475A" />
      <path d="M1380 385h190v27h-190m10 278h170v22h-170" fill="#607C81" />
      <path d="M1404 371l72-96l71 96Z" fill="#6B7279" />
      <path d="M1476 275V219m-12 14h24" stroke={C.sun} strokeWidth="3" />
      <circle
        cx="1476"
        cy="482"
        r="64"
        fill="#D8C7A9"
        stroke="#9A8F7D"
        strokeWidth="8"
      />
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={i}
          d="M1476 428v9"
          stroke="#3B5260"
          strokeWidth="3"
          transform={`rotate(${i * 30} 1476 482)`}
        />
      ))}
      <path
        d="M1476 482l-28-30m28 30l21-36"
        stroke="#344D5C"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M1476 482l-8 49"
        stroke="#A77870"
        strokeWidth="2"
        transform={`rotate(${t * 4} 1476 482)`}
      />
      <path d="M1435 634v-41q0-39 41-39q41 0 41 39v41Z" fill="#19364A" />
      <path d="M1476 556v78" stroke="#668488" strokeWidth="4" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${1200 + i * 102} 710v-40`}
          stroke={C.sun}
          strokeWidth="8"
          opacity={0.18 + (0.18 * (1 + wave(t, 11, i))) / 2}
        />
      ))}
      <path
        d="M1130 833q341-70 717-10"
        stroke={C.glass}
        opacity=".2"
        fill="none"
      />
    </World>
  );
}
