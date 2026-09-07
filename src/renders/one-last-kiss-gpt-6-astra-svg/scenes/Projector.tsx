import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
import { Materials, Parquet, Reel, Screw } from "./craft";
export default function Projector(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <Parquet id={id} y={887} />
      <path d="M1700 215H1880V770H1700Z" fill="#93A7AD" opacity=".3" />
      <path
        d={`M1610 555L1880 ${270 - q * 40}V${735 + q * 40}Z`}
        fill={`url(#${id}-light)`}
        opacity={0.65 + 0.08 * wave(t, 4)}
      />
      <path
        d="M1370 371L1280 236M1490 381L1570 263"
        stroke={`url(#${id}-metal)`}
        strokeWidth="22"
      />
      <Reel x={1270} y={238} r={110} t={t} id={id} />
      <Reel x={1580} y={264} r={91} t={t} id={id} />
      <path
        d="M1361 183L1657 220M1268 346L1290 431M1520 331L1495 431"
        stroke="#CEB18E"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M1230 427Q1230 396 1265 396H1510Q1548 396 1548 432V726H1230Z"
        fill="#425C67"
        stroke="#9CAEAE"
        strokeWidth="3"
      />
      <rect x="1250" y="420" width="277" height="270" rx="12" fill="#2B4354" />
      <path d="M1548 517h57v79h-57Z" fill={`url(#${id}-metal)`} />
      <ellipse cx="1610" cy="557" rx="14" ry="50" fill={C.sun} />
      {Array.from({ length: 10 }, (_, i) => (
        <path
          key={i}
          d={`M1269 ${460 + i * 13}h156`}
          stroke="#8BA4A7"
          strokeWidth="4"
          opacity=".5"
        />
      ))}
      <circle cx="1463" cy="622" r="30" fill={`url(#${id}-metal)`} />
      <circle cx="1463" cy="622" r="20" fill="#243B4E" />
      <path d="M1463 607v15" stroke={C.sun} strokeWidth="3" />
      <circle cx="1272" cy="644" r="7" fill={C.coral} />
      <path d="M1200 730h382v29h-382Z" fill={`url(#${id}-wood)`} />
      <path d="M1230 759v157m320-157v157" stroke="#263D4D" strokeWidth="13" />
      <path
        d="M1320 714Q1160 884 1340 930"
        stroke="#182D43"
        strokeWidth="6"
        fill="none"
      />
      {[
        [1243, 411],
        [1536, 411],
        [1243, 711],
        [1536, 711],
      ].map(([x, y]) => (
        <Screw key={x + y} x={x} y={y} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${1715 + i * 30} ${402 + wave(t, 7, i) * 12}v90`}
          stroke={C.white}
          opacity=".08"
        />
      ))}
    </World>
  );
}
