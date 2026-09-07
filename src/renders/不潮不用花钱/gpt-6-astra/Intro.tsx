import { measureText } from "@remotion/layout-utils";
import React from "react";
import { C, intro } from "./config";
import { easeOut, frameAt, smooth } from "./motion";
import { F } from "./typography";
const Credit: React.FC<{
  label: string;
  value: string;
  x: number;
  y: number;
  age: number;
}> = ({ label, value, x, y, age }) => (
  <g opacity={smooth(age / 18)}>
    <text x={x} y={y} fontFamily={F.cn} fontSize="29" fill={C.yellow}>
      {label}
    </text>
    <text
      x={x}
      y={y + 53 + (1 - easeOut(age / 20)) * 6}
      fontFamily={F.translation}
      fontSize="42"
      fill={C.paper}
    >
      {value}
    </text>
  </g>
);
export const Intro: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame >= frameAt(15733)) return null;
  const cover = smooth((frame - 303) / 26);
  const creditOut = 1 - smooth((frame - 668) / 38);
  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0 }}
    >
      <g opacity={1 - cover}>
        <rect x="86" y="235" width="650" height="342" rx="12" fill={C.paper} />
        <text x="119" y="507" fill={C.ink} fontFamily={F.cn} fontSize="284">
          不潮
        </text>
        <text
          x="117"
          y="719"
          fill={C.red}
          fontFamily={F.cn}
          fontSize="146"
          fontWeight="500"
        >
          不用花钱
        </text>
        <path d="M131 788H659" stroke={C.green} strokeWidth="3" />
        <text
          x="132"
          y="858"
          fill={C.ink}
          fontFamily={F.translation}
          fontSize="48"
        >
          林俊杰
        </text>
        <text
          x="407"
          y="856"
          fill={C.green}
          fontFamily={F.en}
          fontWeight="600"
          fontSize="43"
          letterSpacing="5"
        >
          JJ LIN
        </text>
      </g>
      {frame >= 330 && frame < 710 && (
        <g opacity={creditOut}>
          <Credit
            label="词"
            value={intro.credits[0].value}
            x={129}
            y={230}
            age={frame - 330}
          />
          <Credit
            label="曲 · 制作"
            value="林俊杰"
            x={129}
            y={390}
            age={frame - 344}
          />
          <Credit
            label="编曲 · 吉他"
            value={intro.credits[2].value}
            x={129}
            y={553}
            age={frame - 418}
          />
          <Credit
            label="录音与混音"
            value="吴剑泓 / Joe Vannelli"
            x={129}
            y={724}
            age={frame - 490}
          />
        </g>
      )}
      {intro.vocalises.map((line, j) => {
        const cue = frameAt(line.startMs);
        if (frame < cue) return null;
        let x = 136;
        const widths = line.units.map(
          (u) =>
            measureText({
              text: u.text,
              fontSize: 115,
              fontFamily: F.en,
              fontWeight: 600,
              validateFontIsLoaded: true,
            }).width,
        );
        return (
          <g key={line.id}>
            <rect
              x="112"
              y={j ? 639 : 383}
              width={widths.reduce((a, b) => a + b, 0) + 52}
              height={j ? 228 : 174}
              rx="17"
              fill={C.deep}
              opacity={smooth((frame - cue) / 15.6)}
            />
            {line.units.map((u, i) => {
              const tx = x;
              x += widths[i];
              return frame >= frameAt(u.startMs) ? (
                <text
                  key={i}
                  x={tx}
                  y={j ? 762 : 506}
                  fontFamily={F.en}
                  fontWeight="600"
                  fontSize="115"
                  fill={j ? C.yellow : C.paper}
                  opacity={0.7 + 0.3 * smooth((frame - frameAt(u.startMs)) / 3)}
                >
                  {u.text}
                </text>
              ) : null;
            })}
            {j === 1 && (
              <text
                x="136"
                y="828"
                fontFamily={F.translation}
                fontSize="36"
                fill={C.paper}
                opacity={smooth((frame - cue) / 10)}
              >
                来吧
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};
