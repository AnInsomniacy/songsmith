import React from "react";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { RAW_COLORS } from "./design";
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from "./fonts";
import { INTRO_CREDITS, INTRO_VOCALISES, SONG_ARTIST, SONG_TITLE } from "./lyrics";
import {
  BarcodeStripe,
  ColorCalibrationBar,
  HalftoneMatrix,
  LightningBolt,
  RegistrationCross,
  VinylGrooveDisk,
} from "./ScenePrimitives";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Prelude: React.FC<{
  globalMs: number;
  opacity?: number;
}> = ({ globalMs, opacity = 1 }) => {
  // Turntable spin angle
  const spinAngle = (globalMs / 1000) * 120;

  // Header enter
  const headerEnter = interpolate(globalMs, [300, 1200], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Mixer EQ Bars progress
  const eqBands = [0.4, 0.8, 0.65, 0.9, 0.5, 0.85, 0.7, 0.95, 0.6, 0.75, 0.88, 0.55];

  return (
    <AbsoluteFill
      style={{
        background: RAW_COLORS.obsidian,
        opacity,
        fontFamily: FONT_BODY,
        overflow: "hidden",
      }}
    >
      {/* Background Matrix */}
      <HalftoneMatrix
        width={1920}
        height={1080}
        dotSize={2}
        spacing={32}
        color="#FFFFFF"
        opacity={0.06}
      />

      {/* Edge Crosshairs */}
      <RegistrationCross x={80} y={80} size={28} color={RAW_COLORS.voltageBright} rotationDeg={spinAngle * 0.2} />
      <RegistrationCross x={1840} y={80} size={28} color={RAW_COLORS.voltageBright} rotationDeg={-spinAngle * 0.2} />

      {/* Top Banner */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 60,
          right: 120,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: headerEnter,
          transform: `translateY(${(1 - headerEnter) * -20}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              background: RAW_COLORS.voltageBright,
              color: RAW_COLORS.obsidian,
              fontFamily: FONT_MONO,
              fontWeight: 900,
              fontSize: 18,
              padding: "4px 14px",
              letterSpacing: "3px",
            }}
          >
            STUDIO INTRO // SIXOLOGY
          </div>
          <span style={{ color: RAW_COLORS.rawCanvas, fontFamily: FONT_MONO, fontSize: 16 }}>
            {SONG_TITLE} — {SONG_ARTIST}
          </span>
        </div>
        <ColorCalibrationBar orientation="horizontal" size={14} />
      </div>

      {/* Left Vinyl Graphic & Mixer VU Bars */}
      <div style={{ position: "absolute", left: 160, top: 220 }}>
        <VinylGrooveDisk
          cx={260}
          cy={260}
          radius={260}
          rotationDeg={spinAngle}
          accentColor={RAW_COLORS.ultramarineDeep}
        />
        <LightningBolt x={220} y={180} width={80} height={150} color={RAW_COLORS.voltageBright} />

        {/* Graphic VU Meter */}
        <div
          style={{
            position: "absolute",
            left: 560,
            top: 120,
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
            height: 280,
          }}
        >
          {eqBands.map((baseHeight, idx) => {
            const dynamicVar = Math.sin((globalMs / 180) + idx * 0.8) * 0.25;
            const barHeight = Math.max(20, Math.min(260, (baseHeight + dynamicVar) * 260));
            const isHigh = barHeight > 200;
            return (
              <div
                key={`eq-${idx}`}
                style={{
                  width: 14,
                  height: barHeight,
                  background: isHigh
                    ? RAW_COLORS.crimsonNeon
                    : idx % 2 === 0
                    ? RAW_COLORS.voltageBright
                    : RAW_COLORS.ultramarineGlow,
                  borderRadius: "2px 2px 0 0",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Right Column: Dynamic Credits Cards (0s ~ 11.5s) */}
      {globalMs < 12000 ? (
        <div
          style={{
            position: "absolute",
            right: 160,
            top: 220,
            width: 640,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 20,
              color: RAW_COLORS.voltageBright,
              letterSpacing: "4px",
              borderBottom: `2px solid ${RAW_COLORS.voltageBright}`,
              paddingBottom: 8,
            }}
          >
            CREDITS & PRODUCTION
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px 20px",
              marginTop: 10,
            }}
          >
            {INTRO_CREDITS.map((item, idx) => {
              const itemDelay = 600 + idx * 220;
              const itemProgress = interpolate(globalMs, [itemDelay, itemDelay + 600], [0, 1], {
                ...clamp,
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              });
              return (
                <div
                  key={`credit-${idx}`}
                  style={{
                    background: RAW_COLORS.slateDark,
                    borderLeft: `4px solid ${idx % 2 === 0 ? RAW_COLORS.voltageBright : RAW_COLORS.crimsonNeon}`,
                    padding: "10px 16px",
                    opacity: itemProgress,
                    transform: `translateX(${(1 - itemProgress) * 30}px)`,
                  }}
                >
                  <div style={{ fontSize: 13, color: RAW_COLORS.slateLight, fontFamily: FONT_MONO }}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      color: RAW_COLORS.rawCanvas,
                      fontWeight: 700,
                      marginTop: 2,
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Vocalise Intro Reveal (12.0s ~ 15.7s) */}
      {globalMs >= 11500 ? (
        <div
          style={{
            position: "absolute",
            right: 140,
            top: 240,
            width: 720,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {INTRO_VOCALISES.map((vocLine) => {
            const isVisible = globalMs >= vocLine.startMs;
            if (!isVisible) return null;

            return (
              <div
                key={vocLine.id}
                style={{
                  background: RAW_COLORS.rawCanvas,
                  outline: `6px solid ${RAW_COLORS.voltageBright}`,
                  boxShadow: `12px 14px 0 ${RAW_COLORS.crimsonDeep}`,
                  padding: "32px 48px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    background: RAW_COLORS.crimsonDeep,
                    color: "#FFFFFF",
                    fontFamily: FONT_MONO,
                    fontWeight: 900,
                    fontSize: 20,
                    padding: "4px 12px",
                  }}
                >
                  VOCAL
                </div>

                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {vocLine.characters.map((char) => {
                    const charProgress = interpolate(
                      globalMs,
                      [char.startMs, char.startMs + 180],
                      [0, 1],
                      { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
                    );

                    return (
                      <span
                        key={`${vocLine.id}-${char.index}`}
                        style={{
                          fontFamily: FONT_DISPLAY,
                          fontSize: 64,
                          fontWeight: 900,
                          color: RAW_COLORS.obsidian,
                          opacity: charProgress,
                          transform: `scale(${0.8 + 0.2 * charProgress}) translateY(${(1 - charProgress) * 16}px)`,
                          display: "inline-block",
                        }}
                      >
                        {char.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Bottom Barcode */}
      <div style={{ position: "absolute", left: 160, bottom: 60 }}>
        <BarcodeStripe
          width={280}
          height={42}
          color={RAW_COLORS.rawCanvas}
          codeText="JJ-PRELUDE-SIXOLOGY"
        />
      </div>
    </AbsoluteFill>
  );
};
