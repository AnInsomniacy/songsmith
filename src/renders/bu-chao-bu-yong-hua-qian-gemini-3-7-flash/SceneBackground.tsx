import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT_MONO } from "./fonts";
import {
  BarcodeStripe,
  ColorCalibrationBar,
  HalftoneMatrix,
  LightningBolt,
  RegistrationCross,
  VinylGrooveDisk,
} from "./ScenePrimitives";
import type { LyricPage } from "./types";

export const SceneBackground: React.FC<{
  page: LyricPage;
  globalMs: number;
  opacity?: number;
}> = ({ page, globalMs, opacity = 1 }) => {
  const t = (globalMs - page.startMs) / 1000;
  const p = page.palette;

  const renderSceneSpecific = () => {
    switch (page.scene) {
      case "silk-stamp": {
        const sweepY = (Math.sin(t * 1.5) * 0.5 + 0.5) * 1080;
        return (
          <>
            {/* Caution Hazard Stripe */}
            <div
              style={{
                position: "absolute",
                left: -100,
                top: 880,
                width: 2200,
                height: 48,
                background: `repeating-linear-gradient(45deg, ${p.voltage}, ${p.voltage} 30px, ${p.background} 30px, ${p.background} 60px)`,
                transform: "rotate(-3deg)",
                opacity: 0.35,
              }}
            />
            {/* Screenprint Squeegee Stroke */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: sweepY - 6,
                width: 1920,
                height: 12,
                background: p.voltage,
                boxShadow: `0 0 24px ${p.voltage}`,
                opacity: 0.25,
              }}
            />
            <RegistrationCross x={1700} y={300} size={180} color={p.voltage} rotationDeg={t * 20} />
          </>
        );
      }

      case "barcode-scanner": {
        const scanX = (Math.sin(t * 2) * 0.5 + 0.5) * 1920;
        return (
          <>
            <BarcodeStripe x={1400} y={150} width={400} height={120} color={p.surfaceBorder} codeText="SCAN-TARGET-02" />
            <div
              style={{
                position: "absolute",
                left: scanX,
                top: 0,
                width: 4,
                height: 1080,
                background: p.crimson,
                boxShadow: `0 0 20px ${p.crimson}`,
              }}
            />
          </>
        );
      }

      case "left-drift": {
        const drift1 = (t * 80) % 300;
        const drift2 = (t * 140) % 300;
        return (
          <>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={`arrow-${i}`}
                style={{
                  position: "absolute",
                  left: 1920 - i * 320 + drift1,
                  top: 180 + (i % 3) * 260,
                  fontSize: 120,
                  fontFamily: FONT_MONO,
                  color: p.voltage,
                  opacity: 0.18,
                  fontWeight: 900,
                }}
              >
                ◀◀◀ LEFT
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                left: 1920 - drift2 * 4,
                top: 900,
                width: 1200,
                height: 8,
                background: p.crimson,
                opacity: 0.4,
              }}
            />
          </>
        );
      }

      case "retina-pulse": {
        const pulse = Math.sin(t * 4) * 0.5 + 0.5;
        return (
          <svg style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}>
            {[180, 320, 460, 600, 740].map((r, i) => (
              <circle
                key={`pulse-${i}`}
                cx={960}
                cy={540}
                r={r + pulse * 40}
                fill="none"
                stroke={i % 2 === 0 ? p.voltage : p.crimson}
                strokeWidth={2 + pulse * 2}
                opacity={0.12 + (1 - i / 5) * 0.15}
              />
            ))}
          </svg>
        );
      }

      case "gravity-drop": {
        const appleY = ((t * 400) % 900) + 100;
        return (
          <>
            {/* Vertical Scale Tick Line */}
            <div
              style={{
                position: "absolute",
                left: 1680,
                top: 100,
                width: 2,
                height: 880,
                background: p.surfaceBorder,
                opacity: 0.4,
              }}
            />
            {/* Falling Apple Vector */}
            <svg
              style={{
                position: "absolute",
                left: 1640,
                top: appleY,
                width: 80,
                height: 80,
                opacity: 0.6,
              }}
              viewBox="0 0 100 100"
            >
              <circle cx={50} cy={55} r={35} fill={p.crimson} />
              <path d="M50 20 Q55 35 50 40" stroke={p.voltage} strokeWidth="6" fill="none" />
            </svg>
          </>
        );
      }

      case "ticket-gate": {
        const rot = t * 45;
        return (
          <>
            <RegistrationCross x={220} y={800} size={240} color={p.voltage} rotationDeg={rot} />
            <RegistrationCross x={1700} y={280} size={200} color={p.crimson} rotationDeg={-rot} />
          </>
        );
      }

      case "cmyk-overprint": {
        const shiftX = Math.sin(t * 2) * 16;
        const shiftY = Math.cos(t * 2) * 16;
        return (
          <>
            <div
              style={{
                position: "absolute",
                left: 1100 + shiftX,
                top: 120 + shiftY,
                width: 650,
                height: 750,
                border: `6px solid ${p.voltage}`,
                opacity: 0.25,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 1120 - shiftX,
                top: 140 - shiftY,
                width: 650,
                height: 750,
                border: `6px solid ${p.crimson}`,
                opacity: 0.25,
              }}
            />
          </>
        );
      }

      case "register-eject": {
        const rollY = (t * 60) % 200;
        return (
          <>
            <div
              style={{
                position: "absolute",
                right: 80,
                top: 100 + rollY,
                width: 140,
                height: 600,
                borderLeft: `3px dashed ${p.surfaceBorder}`,
                borderRight: `3px dashed ${p.surfaceBorder}`,
                opacity: 0.3,
              }}
            />
          </>
        );
      }

      case "rumor-shred": {
        return (
          <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, display: "flex" }}>
            {[...Array(16)].map((_, i) => (
              <div
                key={`strip-${i}`}
                style={{
                  flex: 1,
                  height: "100%",
                  borderRight: `1px solid ${p.slate}33`,
                  transform: `translateY(${Math.sin(t * 3 + i * 0.8) * 20}px)`,
                }}
              />
            ))}
          </div>
        );
      }

      case "spectrum-filter": {
        return (
          <svg style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}>
            <path
              d={`M 100 800 Q 600 ${400 + Math.sin(t * 3) * 100} 1200 ${600 + Math.cos(t * 3) * 80} T 1820 400`}
              fill="none"
              stroke={p.voltage}
              strokeWidth="5"
              opacity="0.35"
            />
          </svg>
        );
      }

      case "prism-split": {
        return (
          <svg style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}>
            <polygon points="960,180 800,500 1120,500" fill="none" stroke={p.voltage} strokeWidth="4" opacity="0.3" />
            <line x1={0} y1={340} x2={880} y2={340} stroke="#FFFFFF" strokeWidth="4" opacity="0.4" />
            <line x1={1040} y1={340} x2={1920} y2={200} stroke={p.crimson} strokeWidth="6" opacity="0.3" />
            <line x1={1040} y1={340} x2={1920} y2={340} stroke={p.voltage} strokeWidth="6" opacity="0.3" />
            <line x1={1040} y1={340} x2={1920} y2={480} stroke={p.ultramarine} strokeWidth="6" opacity="0.3" />
          </svg>
        );
      }

      case "shutter-aperture": {
        const scale = 0.8 + Math.sin(t * 2) * 0.2;
        return (
          <div style={{ position: "absolute", left: 960 - 250, top: 540 - 250, transform: `scale(${scale})` }}>
            <VinylGrooveDisk cx={250} cy={250} radius={250} rotationDeg={t * 60} accentColor={p.surfaceBorder} />
          </div>
        );
      }

      case "street-cross": {
        const offset = (t * 120) % 240;
        return (
          <div
            style={{
              position: "absolute",
              left: -300,
              top: 700,
              width: 2500,
              height: 200,
              background: `repeating-linear-gradient(90deg, transparent, transparent 60px, ${p.surfaceBorder}22 60px, ${p.surfaceBorder}22 120px)`,
              transform: `translateX(${offset}px) skewX(-20deg)`,
            }}
          />
        );
      }

      case "vault-open": {
        return (
          <div style={{ position: "absolute", left: 1300, top: 200 }}>
            <VinylGrooveDisk cx={280} cy={280} radius={280} rotationDeg={t * -40} accentColor={p.crimson} />
          </div>
        );
      }

      case "sofa-pop-a": {
        return (
          <>
            <LightningBolt x={180} y={160} width={90} height={160} color={p.voltage} />
            <LightningBolt x={1600} y={650} width={110} height={190} color={p.crimson} />
          </>
        );
      }

      case "smudge-lightning": {
        return (
          <>
            <LightningBolt x={1450} y={150} width={160} height={300} color={p.voltage} />
            <div
              style={{
                position: "absolute",
                left: 120,
                top: 860,
                fontFamily: FONT_MONO,
                fontSize: 48,
                color: p.voltage,
                fontWeight: 900,
                opacity: 0.3,
              }}
            >
              SMUDGE // STILL MOVING UNDER GUNFIRE
            </div>
          </>
        );
      }

      case "duotone-screen": {
        return (
          <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 960, height: 1080, background: `${p.ultramarine}18` }} />
            <div style={{ position: "absolute", left: 960, top: 0, width: 960, height: 1080, background: `${p.crimson}18` }} />
          </div>
        );
      }

      case "zine-fold": {
        return (
          <div
            style={{
              position: "absolute",
              left: 958,
              top: 0,
              width: 4,
              height: 1080,
              background: p.surfaceBorder,
              boxShadow: `0 0 20px ${p.surfaceBorder}`,
              opacity: 0.4,
            }}
          />
        );
      }

      case "neon-strobe": {
        return (
          <div style={{ position: "absolute", left: 100, right: 100, top: 80, display: "flex", justifyContent: "space-between" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const active = Math.sin(t * 8 + i) > 0;
              return (
                <div
                  key={`strobe-${i}`}
                  style={{
                    width: 6,
                    height: 920,
                    background: active ? p.voltage : p.slate,
                    boxShadow: active ? `0 0 16px ${p.voltage}` : "none",
                    opacity: active ? 0.4 : 0.1,
                  }}
                />
              );
            })}
          </div>
        );
      }

      case "stencil-spray": {
        return (
          <RegistrationCross x={960} y={540} size={400} color={p.voltage} rotationDeg={t * 15} />
        );
      }

      case "climax-burst": {
        return (
          <div style={{ position: "absolute", left: 960, top: 540, transform: `rotate(${t * 30}deg)` }}>
            {[...Array(12)].map((_, i) => (
              <div
                key={`ray-${i}`}
                style={{
                  position: "absolute",
                  left: -4,
                  top: -800,
                  width: 8,
                  height: 1600,
                  background: i % 2 === 0 ? p.voltage : p.crimson,
                  opacity: 0.15,
                  transform: `rotate(${i * 15}deg)`,
                }}
              />
            ))}
          </div>
        );
      }

      case "gold-standard": {
        return (
          <div style={{ position: "absolute", right: 140, top: 200 }}>
            <VinylGrooveDisk cx={260} cy={260} radius={260} rotationDeg={t * 50} accentColor={p.voltage} />
          </div>
        );
      }

      case "cmyk-strip-a":
      case "cmyk-strip-b":
      case "cmyk-strip-c":
      case "cmyk-strip-d": {
        const cascadeOffset = (t * 100) % 400;
        return (
          <>
            <ColorCalibrationBar x={1400} y={120} orientation="horizontal" size={24} />
            <RegistrationCross x={180} y={850} size={160} color={p.voltage} rotationDeg={cascadeOffset} />
          </>
        );
      }

      case "vinyl-fadeout": {
        return (
          <div style={{ position: "absolute", left: 960 - 300, top: 540 - 300 }}>
            <VinylGrooveDisk
              cx={300}
              cy={300}
              radius={300}
              rotationDeg={t * 15}
              accentColor={p.crimson}
            />
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <AbsoluteFill
      style={{
        background: p.background,
        opacity,
        overflow: "hidden",
      }}
    >
      {/* Base Halftone Layer */}
      <HalftoneMatrix
        width={1920}
        height={1080}
        dotSize={2}
        spacing={30}
        color={p.text}
        opacity={0.05}
      />

      {/* Outer Scene Registration Crosses */}
      <RegistrationCross x={60} y={60} size={28} color={p.surfaceBorder} />
      <RegistrationCross x={1860} y={60} size={28} color={p.surfaceBorder} />
      <RegistrationCross x={60} y={1020} size={28} color={p.surfaceBorder} />
      <RegistrationCross x={1860} y={1020} size={28} color={p.surfaceBorder} />

      {/* Render Scene Specific Elements */}
      {renderSceneSpecific()}
    </AbsoluteFill>
  );
};
