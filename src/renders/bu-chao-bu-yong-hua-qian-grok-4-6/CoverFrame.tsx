import React from "react";
import { Interactive } from "remotion";
import { PALETTES } from "./design";
import { FONT_BODY, FONT_IMPACT } from "./fonts";
import { Apple, PlaidFill, Shirt, Sofa, Vinyl } from "./ScenePrimitives";

const TITLE = ["不", "潮", "不", "用", "花", "钱"] as const;
const p = PALETTES.room;

export const CoverFrame: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      background: p.background,
    }}
  >
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute" }}>
      <defs>
        <PlaidFill id="cover-plaid" a={p.background} b={p.accent} c={p.light} />
      </defs>
      <rect width="1920" height="1080" fill="url(#cover-plaid)" />
      <rect x="0" y="760" width="1920" height="320" fill="#1A2030" />
      <Shirt x={1680} y={180} sway={-6} p={p} />
      <Sofa x={1180} y={620} p={p} />
      <Apple x={430} y={860} scale={1.2} />
      <Vinyl x={250} y={900} spin={-18} />
    </svg>
    <div style={{ position: "absolute", left: 48, top: 150 }}>
      {TITLE.map((char, index) => (
        <div
          key={`${char}-${index}`}
          style={{
            width: 78,
            height: 92,
            marginBottom: 8,
            background: p.surface,
            color: p.accent,
            fontFamily: FONT_IMPACT,
            fontSize: 58,
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
      name="Cover title"
      style={{
        position: "absolute",
        left: 180,
        top: 210,
        width: 980,
        padding: "48px 56px 56px 48px",
        background: p.surface,
        color: p.accent,
        fontFamily: FONT_IMPACT,
        fontSize: 168,
        lineHeight: 0.92,
        letterSpacing: 8,
      }}
    >
      不潮
      <br />
      不用花钱
    </Interactive.Div>
    <Interactive.Div
      name="Cover artist"
      style={{
        position: "absolute",
        left: 228,
        top: 620,
        color: p.foreground,
        fontFamily: FONT_BODY,
        fontSize: 52,
        fontWeight: 700,
        background: p.surface,
        padding: "16px 28px",
      }}
    >
      林俊杰
    </Interactive.Div>
    <Interactive.Div
      name="Cover album"
      style={{
        position: "absolute",
        left: 228,
        top: 710,
        color: p.surface,
        fontFamily: FONT_BODY,
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: 6,
      }}
    >
      《JJ陆》 · 2008
    </Interactive.Div>
  </div>
);

export default CoverFrame;
