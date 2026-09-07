import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
import { Materials, Screw } from "./craft";
export default function Prism(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <path d="M0 568H1920V1080H0Z" fill={`url(#${id}-wood)`} />
      <path d="M440 483L1810 573L1670 629L329 542Z" fill="#203E50" />
      <path
        d="M515 320L1025 315L1025 356L515 390Z"
        fill={C.sun}
        opacity=".53"
      />
      <g transform="translate(263 306)">
        <path
          d="M0 0H217V133H0Z"
          fill="#3D5966"
          stroke="#8DA3A3"
          strokeWidth="3"
        />
        <rect
          x="13"
          y="15"
          width="113"
          height="103"
          rx="6"
          fill={`url(#${id}-leather)`}
        />
        <path d="M217 21h49v91h-49Z" fill={`url(#${id}-metal)`} />
        <ellipse cx="269" cy="66" rx="11" ry="49" fill={C.sun} />
        <path d="M62 134v94m102-94v94" stroke="#516C74" strokeWidth="12" />
        <Screw x={19} y={22} />
        <Screw x={198} y={112} />
      </g>
      <g transform={`rotate(${wave(t, 13) * 1.2} 1030 320)`}>
        <path
          d="M1030 137L1170 501H879Z"
          fill={`url(#${id}-glass)`}
          stroke={C.white}
          strokeWidth="2"
        />
        <path
          d="M1030 137l91 14l140 366l-91-16Z"
          fill={C.glass}
          opacity=".17"
          stroke={C.glass}
        />
        <path d="M1170 501l91 16H974L879 501Z" fill={C.sun} opacity=".25" />
        <path
          d="M1030 165L902 480M1043 181L934 478"
          stroke={C.white}
          opacity=".35"
          fill="none"
        />
      </g>
      <path
        d="M1043 317L1760 113V277L1070 352Z"
        fill={C.coral}
        opacity={0.28 + q * 0.2}
      />
      <path d="M1070 352L1760 288V405L1090 382Z" fill={C.sun} opacity=".35" />
      <path d="M1090 382L1760 419V549L1100 406Z" fill={C.glass} opacity=".31" />
      <path d="M1702 73h81v505h-81Z" fill={C.white} opacity=".12" />
      <path d="M872 520h412v15H872Z" fill={`url(#${id}-metal)`} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${1310 + i * 69} ${570 + i * 4}v10`}
          stroke={C.sun}
          opacity=".5"
        />
      ))}
    </World>
  );
}
