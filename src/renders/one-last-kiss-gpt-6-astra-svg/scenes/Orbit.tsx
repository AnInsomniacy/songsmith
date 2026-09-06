import { C, type SceneProps } from "../design";
import { World } from "./shared";
export default function Orbit(p: SceneProps) {
  const { id, t, q } = p;
  const a = t * 0.22;
  return (
    <World p={p}>
      <ellipse
        cx="960"
        cy="340"
        rx="500"
        ry="130"
        fill="none"
        stroke={C.glass}
        opacity=".6"
        transform="rotate(-14 960 340)"
      />
      <ellipse
        cx="960"
        cy="340"
        rx="350"
        ry="205"
        fill="none"
        stroke={C.violet}
        opacity=".6"
        transform="rotate(23 960 340)"
      />
      <circle cx="960" cy="340" r="105" fill={C.sun} />
      <circle
        cx={960 + 470 * Math.cos(a)}
        cy={340 + 130 * Math.sin(a)}
        r="34"
        fill={C.coral}
      />
      <circle
        cx={960 + 325 * Math.cos(-a + 0.9)}
        cy={340 + 205 * Math.sin(-a + 0.9)}
        r={16 + q * 8}
        fill={C.glass}
      />
      <circle
        cx="960"
        cy="340"
        r="240"
        fill={`url(#${id}-glow)`}
        opacity=".35"
      />
    </World>
  );
}
