import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
import { Materials, Parquet, Book, Screw } from "./craft";
export default function Camera(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <Parquet id={id} y={885} />
      <path d="M1100 686H1770L1880 836H1210Z" fill={`url(#${id}-wood)`} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${1110 + i * 21} ${700 + i * 27}H${1780 + i * 20}`}
          stroke={C.sun}
          opacity=".14"
        />
      ))}
      <path d="M1220 836v160m595-160v160" stroke="#3D4E56" strokeWidth="20" />
      <Book x={1460} y={755} w={186} color="#728C8C" angle={-7} />
      <g transform="translate(1155 349)">
        <path
          d="M31 40H156L181 0H304L329 40H551Q568 40 568 58V306Q568 330 548 330H28Q6 330 6 308V60Q6 40 31 40"
          fill="#243C4B"
        />
        <path d="M10 59H563V122H10Z" fill={`url(#${id}-metal)`} />
        <path d="M17 137H558V310H17Z" fill={`url(#${id}-leather)`} />
        <rect
          x="423"
          y="76"
          width="91"
          height="41"
          rx="6"
          fill="#143145"
          stroke="#A0B0AB"
          strokeWidth="3"
        />
        <rect
          x="434"
          y="84"
          width="70"
          height="22"
          fill={C.glass}
          opacity=".5"
        />
        <path d="M65 40V22H137V40" fill={`url(#${id}-metal)`} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={i} d={`M${74 + i * 9} 24v14`} stroke="#405564" />
        ))}
        <circle
          cx="284"
          cy="222"
          r="134"
          fill="#183344"
          stroke="#B6C5BC"
          strokeWidth="5"
        />
        {[126, 118, 108, 98].map((r, i) => (
          <circle
            key={r}
            cx="284"
            cy="222"
            r={r}
            fill={i === 3 ? `url(#${id}-lens)` : "none"}
            stroke={i % 2 ? "#15273C" : "#7D9294"}
            strokeWidth={i === 1 ? 8 : 2}
          />
        ))}
        {Array.from({ length: 40 }, (_, i) => (
          <path
            key={i}
            transform={`rotate(${i * 9} 284 222)`}
            d="M284 100v9"
            stroke={C.sun}
            opacity=".5"
          />
        ))}
        <circle cx="284" cy="222" r={44 - q * 15} fill="#14273C" />
        <ellipse
          cx={260 + wave(t, 11) * 9}
          cy="180"
          rx="27"
          ry="15"
          fill={C.glass}
          opacity=".3"
        />
        <path
          d="M313 244q26 4 30 29"
          stroke={C.coral}
          strokeWidth="9"
          opacity=".3"
        />
        {[
          [32, 77],
          [541, 77],
          [34, 296],
          [541, 296],
        ].map(([x, y]) => (
          <Screw key={x + y} x={x} y={y} />
        ))}
        <circle cx="53" cy="153" r="8" fill={C.coral} />
      </g>
      <path
        d="M1164 459Q1040 537 1157 720Q1260 815 1500 785"
        fill="none"
        stroke="#45545C"
        strokeWidth="19"
      />
      <path
        d="M1164 459Q1040 537 1157 720Q1260 815 1500 785"
        fill="none"
        stroke={C.sun}
        strokeWidth="1.5"
        strokeDasharray="4 6"
        opacity=".45"
      />
      <path
        d="M1750 130L1430 480"
        stroke={C.white}
        opacity={0.25 - q * 0.18}
        strokeWidth="5"
      />
    </World>
  );
}
