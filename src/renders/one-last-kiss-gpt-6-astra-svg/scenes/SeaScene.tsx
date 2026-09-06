import { C, type SceneProps, wave } from "../design";
import { World, Sea } from "./shared";
export default function SeaScene(p: SceneProps) {
  const { id, t } = p;
  return (
    <World p={p}>
      <circle cx="1190" cy="300" r="125" fill={C.sun} />
      <ellipse cx="1190" cy="300" rx="450" ry="330" fill={`url(#${id}-glow)`} />
      <Sea id={id} t={t} y={420} />
      <path
        d={`M150 360Q640 ${250 + wave(t, 16) * 12} 980 368T1930 360`}
        fill="none"
        stroke={C.white}
        opacity=".18"
      />
      <path d="M0 650L250 590L450 615L660 800H0Z" fill={C.night} />
      <path d="M1530 485l55 -17l-16 30Z" fill={C.white} />
    </World>
  );
}
