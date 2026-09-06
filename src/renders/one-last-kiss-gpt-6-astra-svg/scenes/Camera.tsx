import { C, type SceneProps } from "../design";
import { World, Floor } from "./shared";
export default function Camera(p: SceneProps) {
  const { id, q, t } = p;
  return (
    <World p={p}>
      <Floor id={id} y={770} />
      <ellipse
        cx="1450"
        cy="797"
        rx="360"
        ry="35"
        fill={C.night}
        opacity=".13"
      />
      <g transform="translate(1150 300)">
        <path d="M0 80H92L124 20H286L315 80H565V435H0Z" fill={C.night} />
        <path d="M20 105H545V190H20Z" fill="#547984" />
        <rect x="411" y="120" width="81" height="45" rx="7" fill={C.glass} />
        <circle
          cx="272"
          cy="271"
          r="139"
          fill="#324C60"
          stroke={C.sun}
          strokeWidth="4"
        />
        <circle
          cx="272"
          cy="271"
          r="113"
          fill={C.night}
          stroke={C.glass}
          strokeWidth="2"
        />
        {Array.from({ length: 6 }, (_, i) => (
          <path
            key={i}
            transform={`rotate(${i * 60 + t * 2} 272 271)`}
            d={`M272 166L${342 - q * 30} 237L272 271Z`}
            fill={C.violet}
            opacity=".7"
          />
        ))}
        <circle cx="272" cy="271" r={34 - q * 14} fill={C.glass} />
      </g>
      <path
        d="M1190 430L1890 120"
        stroke={C.white}
        strokeWidth="3"
        opacity={0.5 - q * 0.4}
      />
    </World>
  );
}
