import { C, type SceneProps } from "../design";
import { World, Floor, Frame } from "./shared";
export default function Gallery(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Floor id={id} />
      <path d="M1120 0V790L1920 1040V0Z" fill={C.night} opacity=".25" />
      <path
        d="M1250 0H1590L1920 790H1080Z"
        fill={`url(#${id}-light)`}
        opacity={0.45 + q * 0.35}
      />
      <Frame x={1300} y={165} w={365} h={475} id={id} />
      <path
        d={`M1340 595Q1430 ${420 + Math.sin(t * 0.35) * 12} 1625 295V601Z`}
        fill={C.glass}
        opacity=".45"
      />
      <circle cx="1540" cy="317" r="60" fill={C.sun} opacity=".85" />
      <path
        d={`M1316 640L${1580 + q * 270} 995H1920L1649 640Z`}
        fill={C.sun}
        opacity=".12"
      />
      <path d="M1770 0V790M1800 0V800" stroke={C.white} opacity=".14" />
      <path d="M1260 793H1700L1790 840H1340Z" fill={C.night} opacity=".6" />
      <path d="M1340 840V910M1700 840V910" stroke={C.night} strokeWidth="12" />
    </World>
  );
}
