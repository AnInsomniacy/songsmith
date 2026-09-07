import { evolvePath } from "@remotion/paths";
import React from "react";
import { ArtProps, Cloud, Particles } from "./shared";
export const Scene01: React.FC<ArtProps> = ({ t, enter, act2, palette }) => {
  const stem = evolvePath(enter, "M1515 900 C1500 760 1530 620 1510 490");
  return (
    <>
      <rect width="1920" height="1080" fill={palette.bg} />
      <Cloud x={1150 + ((t * 10) % 280)} y={100} color={palette.paper} />
      <path
        d="M1080 870 C1340 790 1580 830 1840 760"
        fill="none"
        stroke={palette.second}
        strokeWidth="14"
        opacity="0.55"
      />
      <path
        d="M1515 900 C1500 760 1530 620 1510 490"
        fill="none"
        stroke={palette.second}
        strokeWidth="12"
        strokeLinecap="round"
        {...stem}
      />
      <g
        transform={`translate(1510 480) scale(${0.35 + enter * 0.65 + act2 * 0.08})`}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse
            key={i}
            rx="54"
            ry="23"
            fill={palette.accent}
            transform={`rotate(${i * 51.4}) translate(67 0)`}
          />
        ))}
        <circle r="23" fill={palette.line} />
      </g>
      <Particles
        t={t}
        seed={1}
        color={palette.accent}
        count={12}
        area="right"
      />
    </>
  );
};
