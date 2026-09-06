import React from "react";
import { COLORS } from "./design";
import { FONT_BODY, FONT_IMPACT, FONT_SIGN } from "./fonts";

const glow = (color: string, strength = 24) =>
  `0 0 ${strength}px ${color}88, 0 0 ${strength * 2}px ${color}44`;

export const CoverFrame: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: COLORS.hall,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse 1000px 620px at 68% 32%, rgba(255,46,110,0.16) 0%, rgba(255,46,110,0) 70%), radial-gradient(ellipse 820px 540px at 24% 76%, rgba(46,107,255,0.13) 0%, rgba(46,107,255,0) 70%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 96,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: FONT_SIGN,
          fontSize: 40,
          letterSpacing: 16,
          color: COLORS.neonYellow,
          textShadow: glow(COLORS.neonYellow, 14),
        }}
      >
        NEON ARCADE
      </div>
      <div
        style={{
          marginTop: 18,
          width: 460,
          height: 4,
          marginLeft: "auto",
          marginRight: "auto",
          background: `linear-gradient(90deg, transparent, ${COLORS.neonPink}, ${COLORS.neonYellow}, transparent)`,
          opacity: 0.8,
        }}
      />
    </div>

    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 340,
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: FONT_IMPACT,
          fontWeight: 900,
          fontSize: 176,
          letterSpacing: 18,
          color: COLORS.neonPink,
          textShadow: glow(COLORS.neonPink),
        }}
      >
        不潮不用花钱
      </span>
    </div>

    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 596,
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: FONT_SIGN,
          fontSize: 52,
          color: COLORS.coldWhite,
          letterSpacing: 12,
        }}
      >
        林俊杰
      </span>
      <div
        style={{
          marginTop: 26,
          fontFamily: FONT_SIGN,
          fontSize: 30,
          letterSpacing: 8,
          color: COLORS.metal,
        }}
      >
        JJ LIN · JJ陆 · 2008
      </div>
    </div>

    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 130,
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 500,
          fontSize: 26,
          color: COLORS.metal,
          letterSpacing: 10,
        }}
      >
        STYLE WITHOUT A PRICE
      </span>
    </div>

    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
      {[150, 420, 690, 960, 1230, 1500, 1770].map((x, index) => (
        <div
          key={x}
          style={{
            position: "absolute",
            left: x,
            bottom: 0,
            width: 200,
            height: 300,
            borderRadius: "18px 18px 0 0",
            background: `linear-gradient(180deg, ${COLORS.panelDark} 0%, #0B0916 100%)`,
            border: `2px solid ${COLORS.metal}22`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 22,
              top: 24,
              right: 22,
              height: 104,
              borderRadius: 8,
              background: "#08080F",
              border: `2px solid ${COLORS.metal}33`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 66,
              bottom: 34,
              width: 68,
              height: 28,
              borderRadius: 5,
              background: "#08080F",
              border: `1px solid ${COLORS.metal}33`,
            }}
          />
          {index === 3 ? (
            <div
              style={{
                position: "absolute",
                left: 88,
                top: 60,
                width: 24,
                height: 24,
                borderRadius: 12,
                background: COLORS.neonPink,
                boxShadow: `0 0 22px ${COLORS.neonPink}`,
              }}
            />
          ) : null}
        </div>
      ))}
    </div>

    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 24,
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: FONT_SIGN,
          fontSize: 18,
          letterSpacing: 6,
          color: COLORS.metal,
          opacity: 0.55,
        }}
      >
        INSERT COIN
      </span>
    </div>
  </div>
);
