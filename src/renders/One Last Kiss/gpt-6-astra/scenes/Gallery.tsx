import { C } from "../config";
import { wave } from "../motion";
import { type SceneProps } from "../storyboard";
import { Landscape, Materials, Moulding, Parquet, WallPanels } from "./craft";
import { World } from "./shared";
export default function Gallery(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <WallPanels />
      <Parquet id={id} />
      <path d="M1110 135L1920 10V930L1110 820Z" fill="#21364B" />
      <path
        d="M1110 135L1920 10M1110 153L1920 30M1110 802L1920 910"
        stroke={C.glass}
        opacity=".24"
      />
      <g opacity=".55">
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${1130 + i * 235} ${155 - i * 34}v${636 + i * 35}m12-${636 + i * 35}v${636 + i * 35}`}
            stroke={C.sun}
            fill="none"
          />
        ))}
      </g>
      <path
        d="M1260 0h320l210 820h-635Z"
        fill={`url(#${id}-light)`}
        opacity={0.35 + q * 0.2}
      />
      <Moulding x={1250} y={200} w={430} h={465} id={id} />
      <Landscape x={1280} y={230} w={370} h={405} id={id} t={t} />
      <rect
        x="1455"
        y="697"
        width="167"
        height="42"
        fill="#CFD3C4"
        opacity=".8"
      />
      <path d="M1473 710h105m-105 8h78" stroke={C.night} opacity=".5" />
      <g transform="translate(1220 817)">
        <path d="M0 0h415l80 38H80Z" fill={`url(#${id}-wood)`} />
        <path d="M80 38h415v15H80Z" fill="#374450" />
        <path d="M94 53v77m365-77v77" stroke="#192D3E" strokeWidth="14" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${16 + i * 20} ${7 + i * 7}h412`}
            stroke={C.sun}
            opacity=".24"
          />
        ))}
      </g>
      <path
        d={`M1275 665L${1500 + q * 125} 1050H1890L1650 665Z`}
        fill={C.sun}
        opacity=".09"
      />
      <path d="M1310 114h340" stroke={C.night} strokeWidth="12" />
      {[1340, 1470, 1600].map((x) => (
        <g key={x}>
          <path d={`M${x} 114v24`} stroke={C.sun} strokeWidth="3" />
          <path d={`M${x - 15} 136h30l6 25h-42Z`} fill="#536974" />
          <ellipse cx={x} cy="160" rx="18" ry="4" fill={C.sun} />
        </g>
      ))}
      <path
        d={`M1730 280l${wave(t, 10) * 5 + 60} -20v350l-60 25Z`}
        fill={C.white}
        opacity=".045"
      />
    </World>
  );
}
