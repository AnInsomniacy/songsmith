import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
import { Materials, Tree } from "./craft";
export default function Ripples(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <path
        d="M0 390Q390 247 918 365Q1520 201 1920 378V1080H0Z"
        fill="#759E98"
      />
      <path
        d="M0 470Q500 341 1000 458Q1480 298 1920 453V1080H0Z"
        fill="#91B7B0"
      />
      <path d="M0 542Q547 401 1020 512T1920 477V1080H0Z" fill="#B9CCC0" />
      <path
        d="M0 192Q358 185 521 337"
        stroke="#496F71"
        strokeWidth="19"
        fill="none"
      />
      <Tree x={170} y={460} s={1.32} t={t} color="#5A8177" />
      <g transform="translate(1290 189)">
        <path d="M-376 233Q0-32 379 233v46Q0 25-376 279Z" fill="#ABB4A4" />
        <path
          d="M-376 229Q0-35 379 229"
          stroke="#DADEC9"
          strokeWidth="10"
          fill="none"
        />
        {Array.from({ length: 11 }, (_, i) => {
          const x = -338 + i * 67;
          const yy = 83 + x * x * 0.0011;
          return (
            <path
              key={i}
              d={`M${x} ${yy}v-84`}
              stroke="#758C83"
              strokeWidth="10"
            />
          );
        })}
        <path
          d="M-360 132Q0-117 360 132"
          stroke="#80958A"
          strokeWidth="11"
          fill="none"
        />
      </g>
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse
          key={i}
          cx={920 + wave(t, 12) * 10}
          cy="507"
          rx={40 + i * 38 + wave(t, 9, i * 0.3) * 5}
          ry={12 + i * 10}
          fill="none"
          stroke={i % 2 ? "#5F9591" : "#DCE3CD"}
          opacity=".36"
          strokeWidth="1.5"
        />
      ))}
      <g transform={`translate(${892 + wave(t, 11) * 6} 497)`}>
        <path
          d="M-78 9Q-92-44-19-51Q49-67 92-13Q61 30-8 26L0 0Z"
          fill="#517F75"
        />
        <path
          d="M-19-4q-38-55 1-76q40 23 23 74q43-57 64-25q-10 35-62 39q-57 23-70-5q-5-28 44-7"
          fill={C.coral}
        />
        <ellipse cy="-8" rx="14" ry="8" fill={C.sun} />
      </g>
      <path d={`M1510 557q${35 + q * 30}-39 95-9q-43 23-95 9`} fill="#547F73" />
      <path d="M1640 569q-25-56 36-60q38 26 6 63l-16-16Z" fill="#71978A" />
      <path
        d="M116 520l48-90m-13 85l43-141m-16 140l66-111"
        stroke="#355F63"
        strokeWidth="4"
      />
    </World>
  );
}
