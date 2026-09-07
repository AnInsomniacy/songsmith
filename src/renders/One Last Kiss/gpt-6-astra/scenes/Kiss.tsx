import { C } from "../config";
import { wave } from "../motion";
import { type SceneProps } from "../storyboard";
import { Book, Materials } from "./craft";
import { World } from "./shared";
export default function Kiss(p: SceneProps) {
  const { id, t } = p;
  const light = 0.45 + wave(t, 9) * 0.06;
  return (
    <World p={p}>
      <Materials id={id} />
      <path
        d="M270 590V164Q270 47 450 47H1510Q1670 47 1670 164V590Z"
        fill="#243D51"
        stroke="#6A858B"
        strokeWidth="3"
      />
      <path
        d="M298 588V166Q298 75 453 75H1510Q1642 75 1642 166V588"
        fill="none"
        stroke={C.sun}
        opacity=".2"
      />
      <path d="M965 75V590M298 312H1642" stroke="#6B838A" strokeWidth="8" />
      <path d="M305 172L950 95V297L305 230Z" fill={C.coral} opacity={light} />
      <path d="M975 315L1640 190V418L975 530Z" fill={C.glass} opacity=".24" />
      <path d="M160 589H1770L1870 673H245Z" fill={`url(#${id}-wood)`} />
      <g transform="translate(727 421)">
        <ellipse cx="0" cy="163" rx="131" ry="23" fill="#DCE2D1" />
        <path
          d="M-77 18q5 135 77 140q76-5 81-140Z"
          fill={`url(#${id}-ceramic)`}
        />
        <ellipse cy="18" rx="79" ry="23" fill="#53737B" />
        <ellipse cy="20" rx="64" ry="15" fill="#5B5156" />
        <path
          d="M75 49q78-6 57 57q-13 36-59 29"
          fill="none"
          stroke="#C8D6CC"
          strokeWidth="16"
        />
      </g>
      <g transform="translate(1116 455) scale(.8)">
        <ellipse cx="0" cy="163" rx="131" ry="23" fill="#DCE2D1" />
        <path
          d="M-77 18q5 135 77 140q76-5 81-140Z"
          fill={`url(#${id}-ceramic)`}
        />
        <ellipse cy="18" rx="79" ry="23" fill="#53737B" />
        <path
          d="M-74 49q-78-6-57 57q13 36 59 29"
          fill="none"
          stroke="#C8D6CC"
          strokeWidth="16"
        />
      </g>
      <path
        d={`M724 379q${-25 + wave(t, 7) * 13}-38 11-70m381 94q${24 + wave(t, 8) * 8}-39-10-79`}
        fill="none"
        stroke={C.white}
        opacity=".35"
        strokeWidth="3"
      />
      <Book x={370} y={579} w={153} color="#586E7D" angle={-6} />
      <path
        d="M1310 578q48-90 149-135"
        stroke="#9DB9B1"
        strokeWidth="2"
        fill="none"
      />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${1380 + i * 30} ${485 - i * 20}q-28-50 12-53q32 30-12 53`}
          fill={C.coral}
          opacity=".8"
        />
      ))}
    </World>
  );
}
