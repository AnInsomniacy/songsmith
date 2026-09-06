import React from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "./design";
import { FONT_BODY, FONT_IMPACT, FONT_LATIN, FONT_SIGN } from "./fonts";
import { creditInfo, vocaliseLines } from "./lyrics";
import type { TimedLine } from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

const glow = (color: string, strength = 22) =>
  `0 0 ${strength}px ${color}66, 0 0 ${strength * 2.2}px ${color}33`;

const SignChar: React.FC<{
  char: string;
  onMs: number;
  globalMs: number;
  color: string;
  index: number;
}> = ({ char, onMs, globalMs, color, index }) => {
  const enter = interpolate(globalMs, [onMs, onMs + 260], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  const flicker = 0.55 + 0.45 * Math.abs(Math.sin(globalMs / 260 + index * 2));
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: FONT_IMPACT,
        fontWeight: 900,
        fontSize: 148,
        color,
        textShadow: glow(color),
        opacity: enter * (enter >= 1 ? 0.88 + 0.12 * flicker : 1),
        transform: `translateY(${(1 - enter) * -14}px) scale(${0.9 + enter * 0.1})`,
        transformOrigin: "center bottom",
      }}
    >
      {char}
    </span>
  );
};

const VocaliseView: React.FC<{
  line: TimedLine;
  globalMs: number;
  color: string;
}> = ({ line, globalMs, color }) => {
  const { fps } = useVideoConfig();
  let previous = -1;
  const frames = line.characters.map((unit) => {
    const sourceFrame = Math.round((unit.startMs / 1000) * fps);
    const frame = Math.max(sourceFrame, previous + 1);
    previous = frame;
    return frame;
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 250,
        textAlign: "center",
        fontFamily: FONT_LATIN,
        fontWeight: 700,
        fontSize: 96,
        letterSpacing: 10,
        color,
        textShadow: glow(color, 16),
      }}
    >
      {line.characters.map((unit, index) => {
        const startFrame = frames[index];
        const globalFrame = (globalMs / 1000) * fps;
        const durationFrames = Math.max(
          8,
          Math.min(18, Math.round(((unit.endMs - unit.startMs) / 1000) * fps)),
        );
        const enter = interpolate(
          globalFrame,
          [startFrame, startFrame + durationFrames],
          [0, 1],
          { ...clamp, easing: EASE_OUT },
        );
        return (
          <span
            key={`${line.id}-${unit.index}`}
            style={{
              display: "inline-block",
              opacity: enter,
              transform: `translateY(${(1 - enter) * -22}px)`,
            }}
          >
            {unit.text}
          </span>
        );
      })}
    </div>
  );
};

const CreditPlate: React.FC<{
  label: string;
  value: string;
  onMs: number;
  globalMs: number;
}> = ({ label, value, onMs, globalMs }) => {
  const enter = interpolate(globalMs, [onMs, onMs + 240], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 18,
        opacity: enter,
        transform: `translateX(${(1 - enter) * -22}px)`,
      }}
    >
      <span
        style={{
          fontFamily: FONT_LATIN,
          fontWeight: 700,
          fontSize: 24,
          color: COLORS.neonYellow,
          letterSpacing: 4,
          minWidth: 74,
          textAlign: "right",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 500,
          fontSize: 30,
          color: COLORS.coldWhite,
        }}
      >
        {value}
      </span>
    </div>
  );
};

export const Prelude: React.FC<{
  globalMs: number;
  opacity?: number;
}> = ({ globalMs, opacity = 1 }) => {
  const hallIn = interpolate(globalMs, [0, 900], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  const signOn = 620;
  const perChar = 430;
  const titleChars = ["不", "潮", "不", "用", "花", "钱"];
  const subIn = interpolate(globalMs, [signOn + 2400, signOn + 2800], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  const slotIn = interpolate(globalMs, [4200, 4700], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  const cabinetIn = interpolate(globalMs, [2800, 3600], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  const blink = 0.6 + 0.4 * Math.abs(Math.sin(globalMs / 380));
  const creditStart = 12_100;
  const creditPer = 430;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        overflow: "hidden",
        background: COLORS.hall,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 900px 560px at 68% 30%, rgba(255,46,110,0.14) 0%, rgba(255,46,110,0) 70%), radial-gradient(ellipse 760px 500px at 22% 74%, rgba(46,107,255,0.12) 0%, rgba(46,107,255,0) 70%)",
          opacity: hallIn,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 208,
          textAlign: "center",
          opacity: hallIn,
        }}
      >
        <div
          style={{
            fontFamily: FONT_SIGN,
            fontSize: 34,
            letterSpacing: 14,
            color: COLORS.neonYellow,
            textShadow: glow(COLORS.neonYellow, 12),
            marginBottom: 34,
            opacity: subIn,
          }}
        >
          NEON ARCADE
        </div>
        {titleChars.map((char, index) => (
          <SignChar
            key={index}
            char={char}
            onMs={signOn + index * perChar}
            globalMs={globalMs}
            color={COLORS.neonPink}
            index={index}
          />
        ))}
        <div
          style={{
            marginTop: 44,
            fontFamily: FONT_SIGN,
            fontSize: 34,
            letterSpacing: 10,
            color: COLORS.coldWhite,
            opacity: subIn * 0.9,
          }}
        >
          JJ LIN · 2008
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 76,
          top: 64,
          display: "flex",
          flexDirection: "column",
          gap: 30,
          opacity: 0.9,
        }}
      >
        {creditInfo.map((credit, index) => (
          <CreditPlate
            key={credit.label}
            label={credit.label}
            value={credit.value}
            onMs={creditStart + index * creditPer}
            globalMs={globalMs}
          />
        ))}
      </div>

      {vocaliseLines.map((line, index) => (
        <VocaliseView
          key={line.id}
          line={line}
          globalMs={globalMs}
          color={index === 0 ? COLORS.neonPink : COLORS.neonYellow}
        />
      ))}

      <div
        style={{
          position: "absolute",
          right: 90,
          top: 64,
          display: "flex",
          gap: 18,
          alignItems: "center",
          opacity: cabinetIn * 0.8,
        }}
      >
        {[COLORS.neonPink, COLORS.neonYellow, COLORS.scoreGreen].map(
          (color, index) => (
            <div
              key={index}
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: color,
                opacity: index === 0 ? blink : 0.8,
                boxShadow: `0 0 10px ${color}`,
              }}
            />
          ),
        )}
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 84 }}>
        {[150, 420, 690, 960, 1230, 1500, 1770].map((x, index) => (
          <div
            key={x}
            style={{
              position: "absolute",
              left: x,
              bottom: 0,
              width: 200,
              height: 260,
              borderRadius: "18px 18px 0 0",
              background: `linear-gradient(180deg, ${COLORS.panelDark} 0%, #0B0916 100%)`,
              border: `2px solid ${COLORS.metal}22`,
              opacity: cabinetIn * (0.5 + (index % 3) * 0.16),
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 22,
                top: 20,
                right: 22,
                height: 90,
                borderRadius: 8,
                background: "#08080F",
                border: `2px solid ${COLORS.metal}33`,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 66,
                bottom: 30,
                width: 68,
                height: 26,
                borderRadius: 5,
                background: "#08080F",
                border: `1px solid ${COLORS.metal}33`,
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          right: 130,
          bottom: 150,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: slotIn,
        }}
      >
        <div
          style={{
            width: 120,
            height: 56,
            borderRadius: 10,
            background: "#10101C",
            border: `3px solid ${COLORS.metal}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 22,
              borderRadius: 5,
              background: "#08080F",
              border: `2px solid ${COLORS.neonYellow}66`,
              boxShadow: blink > 0.8 ? `0 0 14px ${COLORS.neonYellow}` : "none",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: FONT_SIGN,
            fontSize: 22,
            color: COLORS.neonYellow,
            letterSpacing: 4,
            opacity: 0.8,
          }}
        >
          INSERT COIN
        </span>
      </div>
      <span
        style={{
          position: "absolute",
          left: 76,
          bottom: 44,
          fontFamily: FONT_LATIN,
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: 6,
          color: COLORS.metal,
          opacity: 0.6,
        }}
      >
        STYLE WITHOUT A PRICE
      </span>
    </div>
  );
};
