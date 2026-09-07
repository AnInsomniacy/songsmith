import { C } from "../config";
import { wave } from "../motion";
import { type SceneProps } from "../storyboard";
import { Book, Materials } from "./craft";
import { World } from "./shared";
export default function Porcelain(p: SceneProps) {
  const { id, q, t } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <path d="M0 679H740V1080H0Z" fill={`url(#${id}-wood)`} />
      <path d="M0 717H740M0 879H740" stroke={C.sun} opacity=".15" />
      <ellipse cx="372" cy="727" rx="264" ry="62" fill="#9DB4B1" />
      <ellipse cx="372" cy="718" rx="243" ry="43" fill="#DEE0CC" />
      <path
        d="M180 345Q184 670 372 691Q566 670 575 345Z"
        fill={`url(#${id}-ceramic)`}
      />
      <path
        d="M564 399Q730 382 677 556Q658 627 558 606"
        stroke="#A6C3BD"
        strokeWidth="38"
        fill="none"
      />
      <path
        d="M564 400Q709 400 662 552Q641 603 562 591"
        stroke="#E6EAD9"
        strokeWidth="10"
        fill="none"
      />
      <ellipse cx="377" cy="345" rx="198" ry="55" fill="#B4C9C1" />
      <ellipse cx="377" cy="344" rx="177" ry="39" fill="#476C71" />
      <ellipse cx="377" cy="350" rx="161" ry="27" fill="#755C55" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${249 + i * 42} 409q-4 112 42 205`}
          stroke={C.white}
          opacity=".18"
          strokeWidth="6"
          fill="none"
        />
      ))}
      <path
        d="M399 395l-35 61l43 47l-20 65l26 49l-8 58"
        fill="none"
        stroke="#AC8C63"
        strokeWidth="6"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - q}
      />
      <path
        d="M370 448l-59-21m92 75l61 14m-75 52l-48 22"
        stroke={C.sun}
        strokeWidth="3"
        opacity={q}
        fill="none"
      />
      <path
        d={`M312 273q${-30 + wave(t, 9) * 11}-63 6-111M420 272q${34 + wave(t, 10) * 12}-45 2-91`}
        fill="none"
        stroke={C.white}
        opacity=".5"
        strokeWidth="3"
      />
      <Book x={92} y={811} w={171} color="#978A86" angle={-7} />
      <path d="M550 834l114-135" stroke="#647C7D" strokeWidth="5" />
      <ellipse
        cx="674"
        cy="688"
        rx="16"
        ry="28"
        transform="rotate(36 674 688)"
        fill={`url(#${id}-metal)`}
      />
    </World>
  );
}
