import { C } from "../config";
import { wave } from "../motion";
import { type SceneProps } from "../storyboard";
import { Materials, Parquet, Tree } from "./craft";
import { World } from "./shared";
export default function Lantern(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <Parquet id={id} y={856} />
      <path d="M1138 115H1834V851H1138Z" fill="#284D5D" />
      <path d="M1166 143H1806V822H1166Z" fill="#4C6D76" />
      <path d="M1166 661Q1500 433 1806 576V822H1166Z" fill="#365963" />
      <Tree x={1733} y={813} s={1.2} t={t} color="#244653" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${1166 + i * 128} 143v679`}
          stroke="#99AAA1"
          strokeWidth="6"
          opacity=".5"
        />
      ))}
      <path d="M1148 418H1824M1148 685H1824" stroke="#829A97" strokeWidth="9" />
      <path d="M1098 57H1890V91H1098Z" fill={`url(#${id}-wood)`} />
      <path
        d="M1122 91v762m730-762v762"
        stroke={`url(#${id}-wood)`}
        strokeWidth="30"
      />
      <circle
        cx="1490"
        cy="449"
        r="295"
        fill={`url(#${id}-glow)`}
        opacity={0.45 + q * 0.2}
      />
      <g transform={`rotate(${wave(t, 10) * 1.4} 1490 90)`}>
        <path d="M1490 90v153" stroke={C.sun} strokeWidth="3" />
        <path
          d="M1417 252Q1290 448 1417 618H1563Q1690 448 1563 252Z"
          fill={`url(#${id}-ceramic)`}
        />
        <path
          d="M1417 252Q1490 222 1563 252M1417 618Q1490 641 1563 618"
          fill="#A38B6D"
        />
        {Array.from({ length: 16 }, (_, i) => {
          const y = 275 + i * 21;
          const w = 80 + Math.sin(((y - 250) / 390) * Math.PI) * 65;
          return (
            <path
              key={i}
              d={`M${1490 - w} ${y}q${w} 11 ${w * 2} 0`}
              stroke="#BAA883"
              opacity=".6"
              fill="none"
            />
          );
        })}
        <path
          d="M1466 250q-69 184 0 370m48-370q69 184 0 370"
          stroke="#9DAE9C"
          opacity=".3"
          fill="none"
        />
        <path d="M1490 638v64m-11-6h22" stroke={C.sun} strokeWidth="4" />
        <path
          d="M1479 699l-4 70m15-70v79m11-79l5 70"
          stroke={C.coral}
          strokeWidth="3"
        />
      </g>
      <path d="M1240 851h530l48 40h-530Z" fill="#263E4E" />
      <path d="M1288 891v58m481-58v58" stroke="#1B3246" strokeWidth="12" />
    </World>
  );
}
