import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
import { Materials, Landscape } from "./craft";
export default function Exposure(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <path d="M1130 141H1810V824H1130Z" fill="#5C5362" />
      <path d="M1160 163H1780V801H1160Z" fill="#2E394F" />
      <path d="M1232 87h461" stroke={C.sun} strokeWidth="2" />
      <g transform={`rotate(${wave(t, 10) * 0.6} 1450 149)`}>
        <rect x="1220" y="159" width="473" height="442" fill="#E4CEB2" />
        <Landscape x={1242} y={180} w={429} h={359} id={id} t={t} />
        <rect
          x="1242"
          y="180"
          width="429"
          height="359"
          fill={C.coral}
          opacity={0.43 * (1 - q)}
        />
        <path d="M1248 156v32m412-32v32" stroke="#AE9677" strokeWidth="12" />
        <path d="M1275 569h105" stroke="#8C7770" opacity=".5" />
      </g>
      <path d="M1124 722h655l71 113h-655Z" fill={`url(#${id}-wood)`} />
      <path
        d="M1225 718l335-8l91 76l-340 14Z"
        fill="#889D9E"
        stroke="#B3BCAC"
        strokeWidth="4"
      />
      <path d="M1257 731l290-8l62 51l-291 11Z" fill="#5C8088" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${1290 + wave(t, 7, i) * 5} ${743 + i * 9}h${211 - i * 18}`}
          stroke={C.sun}
          opacity=".19"
        />
      ))}
      <path
        d="M1720 693h43v99h-43Z"
        fill={`url(#${id}-glass)`}
        stroke={C.glass}
      />
      <path d="M1730 675h23v21h-23Z" fill="#334859" />
      <path d="M1180 835v169m612-169v169" stroke="#233C4D" strokeWidth="18" />
    </World>
  );
}
