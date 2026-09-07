import { C } from "../config";
import { wave } from "../motion";
import { type SceneProps } from "../storyboard";
import { Landscape, Materials, Moulding } from "./craft";
import { World } from "./shared";
export default function Fracture(p: SceneProps) {
  const { id, t } = p;
  const d = (1 - Math.cos(Math.min(t, 7) * 0.18)) * 7;
  return (
    <World p={p}>
      <Materials id={id} />
      <path d="M0 530H1920V1080H0Z" fill={`url(#${id}-wood)`} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M0 ${550 + i * 90}H1920`}
          stroke={C.sun}
          opacity=".09"
        />
      ))}
      <g transform="translate(320 -35) rotate(-4 620 355)">
        <Moulding x={80} y={155} w={1070} h={440} id={id} />
        <Landscape x={110} y={185} w={1010} h={380} id={id} t={t} />
        <path
          d={`M690 185l-42 92l${36 + d} 71l-65 77l44 77l-22 62`}
          fill="none"
          stroke={C.white}
          strokeWidth="2"
          opacity=".85"
        />
        <path
          d="M650 277l-136-48m165 119l156-42m-180 196l-119 18"
          stroke={C.glass}
          opacity=".65"
          fill="none"
        />
        <path
          d={`M704 185l-41 89l43 70l-67 80l45 78l-21 63h457V185Z`}
          fill={C.night}
          opacity=".17"
        />
        <path d="M111 204l934 301v43L111 245Z" fill={C.white} opacity=".07" />
      </g>
      <path
        d="M1500 518l85-92l44 88l-96 46Z"
        fill={`url(#${id}-glass)`}
        stroke={C.glass}
      />
      <path
        d="M1550 580l75-30l35 70Z"
        fill={`url(#${id}-glass)`}
        stroke={C.sun}
        opacity=".6"
      />
      <path d={`M1545 526l${25 + wave(t, 11) * 2}-1`} stroke={C.white} />
    </World>
  );
}
