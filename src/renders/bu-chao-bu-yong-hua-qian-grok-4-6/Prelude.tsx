import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PALETTES } from "./design";
import { FONT_BODY, FONT_IMPACT, FONT_LATIN } from "./fonts";
import { vocalises } from "./lyrics";
import { Apple, Lamp, PlaidFill, Shirt, Sofa } from "./ScenePrimitives";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TITLE = ["不", "潮", "不", "用", "花", "钱"] as const;
const p = PALETTES.room;

export const Prelude: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const globalMs = ((frame + 1) / fps) * 1000;

  return (
    <div style={{ position: "absolute", inset: 0, background: p.background, overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute" }}>
        <defs>
          <PlaidFill id="prelude-plaid" a={p.background} b={p.accent} c={p.light} />
        </defs>
        <rect width="1920" height="1080" fill="url(#prelude-plaid)" />
        <rect x="0" y="760" width="1920" height="320" fill="#1A2030" />
        <Lamp
          x={1600}
          y={140}
          glow={interpolate(frame, [0, 2 * fps], [0.2, 0.7], clamp)}
          p={p}
        />
        <Shirt x={420} y={180} sway={Math.sin((frame / fps / 5.2) * Math.PI * 2) * 4} p={p} />
        <Sofa x={1080} y={620} p={p} />
        <Apple x={420} y={860} />
      </svg>
      <div style={{ position: "absolute", left: 48, top: 150, opacity: 0.42 }}>
        {TITLE.map((char, index) => (
          <div
            key={`${char}-${index}`}
            style={{
              width: 72,
              height: 86,
              marginBottom: 8,
              background: p.surface,
              color: p.accent,
              fontFamily: FONT_IMPACT,
              fontSize: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {char}
          </div>
        ))}
      </div>
      <Interactive.Div
        name="Prelude title"
        style={{
          position: "absolute",
          left: 180,
          top: 168,
          width: 820,
          color: p.surface,
          fontFamily: FONT_IMPACT,
          fontSize: 118,
          lineHeight: 0.95,
          opacity: interpolate(frame, [0.35 * fps, 1.1 * fps], [0, 1], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: `0px ${interpolate(frame, [0.35 * fps, 1.1 * fps], [24, 0], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}px`,
        }}
      >
        不潮不用花钱
      </Interactive.Div>
      <Interactive.Div
        name="Prelude authors"
        style={{
          position: "absolute",
          left: 180,
          top: 430,
          width: 760,
          padding: "28px 36px",
          background: p.surface,
          color: p.foreground,
          fontFamily: FONT_BODY,
          fontSize: 36,
          fontWeight: 700,
          opacity: interpolate(frame, [3.1 * fps, 4 * fps], [0, 1], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        词 林怡凤  曲 林俊杰
      </Interactive.Div>
      <Interactive.Div
        name="Prelude production"
        style={{
          position: "absolute",
          left: 180,
          top: 530,
          width: 820,
          color: p.surface,
          fontFamily: FONT_BODY,
          fontSize: 32,
          fontWeight: 700,
          opacity: interpolate(frame, [7.1 * fps, 8 * fps], [0, 1], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        编曲 林俊杰 / Kenn C  制作 林俊杰
      </Interactive.Div>
      <Interactive.Div
        name="Prelude rap"
        style={{
          position: "absolute",
          left: 180,
          top: 590,
          color: p.surface,
          fontFamily: FONT_BODY,
          fontSize: 32,
          fontWeight: 700,
          opacity: interpolate(frame, [10.2 * fps, 11.1 * fps], [0, 1], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Rap 林俊杰 / 王宇婕
      </Interactive.Div>
      <div style={{ position: "absolute", left: 180, top: 680, display: "flex", gap: 18 }}>
        {vocalises.flatMap((line) =>
          line.characters.map((unit) => (
            <span
              key={`${line.id}-${unit.index}`}
              style={{
                fontFamily: FONT_LATIN,
                fontSize: 54,
                color: p.surface,
                opacity: interpolate(globalMs, [unit.startMs, unit.startMs + 160], [0, 1], {
                  ...clamp,
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                }),
                translate: `0px ${interpolate(globalMs, [unit.startMs, unit.startMs + 160], [16, 0], {
                  ...clamp,
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                })}px`,
                whiteSpace: "pre",
              }}
            >
              {unit.text}
            </span>
          )),
        )}
      </div>
    </div>
  );
};
