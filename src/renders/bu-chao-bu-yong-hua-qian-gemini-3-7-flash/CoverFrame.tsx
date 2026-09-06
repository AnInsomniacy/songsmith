import React from "react";
import { AbsoluteFill } from "remotion";
import { RAW_COLORS } from "./design";
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from "./fonts";
import {
  BarcodeStripe,
  ColorCalibrationBar,
  HalftoneMatrix,
  LightningBolt,
  RegistrationCross,
  VinylGrooveDisk,
} from "./ScenePrimitives";

export const CoverFrame: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: RAW_COLORS.obsidian,
        overflow: "hidden",
        fontFamily: FONT_BODY,
      }}
    >
      {/* Background Halftone Grid */}
      <HalftoneMatrix
        width={1920}
        height={1080}
        dotSize={2.5}
        spacing={28}
        color="#FFFFFF"
        opacity={0.08}
      />

      {/* Decorative Outer Frame & Crop Marks */}
      <RegistrationCross x={60} y={60} size={36} color={RAW_COLORS.voltageBright} />
      <RegistrationCross x={1860} y={60} size={36} color={RAW_COLORS.voltageBright} />
      <RegistrationCross x={60} y={1020} size={36} color={RAW_COLORS.voltageBright} />
      <RegistrationCross x={1860} y={1020} size={36} color={RAW_COLORS.voltageBright} />

      {/* Top Header Label */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 50,
          right: 120,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `2px solid ${RAW_COLORS.slateDark}`,
          paddingBottom: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: RAW_COLORS.voltageBright,
              color: RAW_COLORS.obsidian,
              fontFamily: FONT_MONO,
              fontWeight: 900,
              fontSize: 16,
              padding: "3px 10px",
              letterSpacing: "2px",
            }}
          >
            CAT. NO. SIXOLOGY-08
          </div>
          <span
            style={{
              color: RAW_COLORS.rawCanvas,
              fontSize: 15,
              letterSpacing: "3px",
              fontFamily: FONT_MONO,
            }}
          >
            JJ LIN // OFFICIAL HIGH-STREET FILM
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <ColorCalibrationBar x={0} y={0} orientation="horizontal" size={14} />
        </div>
      </div>

      {/* Center Vinyl Disk Graphic */}
      <div style={{ position: "absolute", left: 1040, top: 220 }}>
        <VinylGrooveDisk
          cx={320}
          cy={320}
          radius={320}
          rotationDeg={-12}
          accentColor={RAW_COLORS.crimsonDeep}
        />
        <LightningBolt x={280} y={240} width={80} height={150} color={RAW_COLORS.voltageBright} />
      </div>

      {/* Main Title Typography Poster */}
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 240,
          width: 880,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Streetwear Woven Patch */}
        <div
          style={{
            alignSelf: "flex-start",
            background: RAW_COLORS.crimsonDeep,
            color: "#FFFDF7",
            padding: "6px 18px",
            fontFamily: FONT_MONO,
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "4px",
            boxShadow: `4px 4px 0 ${RAW_COLORS.voltageBright}`,
          }}
        >
          ORIGINAL MASTER EDITION
        </div>

        {/* Big Chinese Title */}
        <h1
          style={{
            margin: 0,
            fontSize: 116,
            fontWeight: 900,
            fontFamily: FONT_DISPLAY,
            color: RAW_COLORS.rawCanvas,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            textShadow: `6px 6px 0 ${RAW_COLORS.ultramarineDeep}`,
          }}
        >
          不潮不用花钱
        </h1>

        {/* English Secondary Title */}
        <div
          style={{
            fontSize: 42,
            fontFamily: FONT_MONO,
            fontWeight: 700,
            color: RAW_COLORS.voltageBright,
            letterSpacing: "6px",
            marginTop: -8,
          }}
        >
          HIGH FASHION // NO CASH NEEDED
        </div>

        {/* Artist Credits */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            color: RAW_COLORS.rawCanvas,
            fontSize: 22,
          }}
        >
          <div>
            <strong style={{ color: RAW_COLORS.voltageBright, marginRight: 12 }}>演唱:</strong>
            林俊杰 JJ Lin (feat. By2)
          </div>
          <div>
            <strong style={{ color: RAW_COLORS.voltageBright, marginRight: 12 }}>词 / 曲 / 制作:</strong>
            林怡凤 / 林俊杰 / 林俊杰 & Kenn C
          </div>
          <div>
            <strong style={{ color: RAW_COLORS.voltageBright, marginRight: 12 }}>收录专辑:</strong>
            《JJ 陆》SIXOLOGY (2008)
          </div>
        </div>
      </div>

      {/* Bottom Barcode & Footer */}
      <div
        style={{
          position: "absolute",
          left: 140,
          bottom: 70,
          right: 140,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <BarcodeStripe
          width={300}
          height={50}
          color={RAW_COLORS.rawCanvas}
          codeText="JJ-LIN-SIXOLOGY-2008-POSTER"
        />

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 15,
            color: RAW_COLORS.slateLight,
            textAlign: "right",
            lineHeight: 1.6,
          }}
        >
          <div>REMOTION FRAMEWORK // GEMINI 3.7 FLASH VISUAL EDITION</div>
          <div>60 FPS • 1920×1080 • KINETIC SCREENPRINT ZINE DIRECTION</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
