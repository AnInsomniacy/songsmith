import { C, type SceneProps } from "../design";
import { World, Floor } from "./shared";
export default function Porcelain(p: SceneProps) {
  const { id, q, t } = p;
  return (
    <World p={p}>
      <Floor id={id} y={750} />
      <ellipse
        cx="425"
        cy="802"
        rx="280"
        ry="35"
        fill={C.night}
        opacity=".13"
      />
      <path d="M206 376Q225 699 425 716Q626 699 646 376Z" fill={C.white} />
      <ellipse cx="426" cy="376" rx="220" ry="55" fill={C.glass} />
      <ellipse cx="426" cy="376" rx="193" ry="36" fill="#779AA3" />
      <path
        d="M624 417Q800 390 725 572Q700 625 620 600"
        fill="none"
        stroke={C.white}
        strokeWidth="32"
      />
      <path
        d="M451 391L423 454L476 510L450 584L484 693"
        pathLength="1"
        fill="none"
        stroke={C.sun}
        strokeWidth="7"
        strokeDasharray="1"
        strokeDashoffset={1 - q}
      />
      <path
        d={`M351 295Q${410 + Math.sin(t) * 12} 250 365 177M463 283Q510 222 472 150`}
        fill="none"
        stroke={C.white}
        strokeWidth="3"
        opacity=".6"
      />
    </World>
  );
}
