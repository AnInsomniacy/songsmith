import { C, type SceneProps } from "../design";
import { World, Floor } from "./shared";
export default function Sundial(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Floor id={id} y={600} />
      <ellipse cx="412" cy="665" rx="290" ry="110" fill={C.white} />
      <ellipse
        cx="412"
        cy="665"
        rx="270"
        ry="95"
        fill="none"
        stroke="#5A8086"
        strokeWidth="2"
      />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <path
            key={i}
            d={`M${412 + 230 * Math.cos(a)} ${665 + 75 * Math.sin(a)}l${20 * Math.cos(a)} ${7 * Math.sin(a)}`}
            stroke={C.night}
            opacity=".5"
          />
        );
      })}
      <path
        d={`M410 660L${620 + q * 65 + Math.sin(t * 0.15) * 12} 710L485 670Z`}
        fill={C.violet}
        opacity=".45"
      />
      <path d="M410 660V335L485 670Z" fill="#648F91" />
      <path d="M380 775V930M480 775V930" stroke="#87A0A3" strokeWidth="12" />
      <path d="M0 70H705V115H0Z" fill={C.sun} opacity=".5" />
    </World>
  );
}
