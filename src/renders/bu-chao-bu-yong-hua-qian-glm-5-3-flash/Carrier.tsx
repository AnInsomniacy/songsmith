import React from "react";
import { Easing, interpolate } from "remotion";
import { INK, carrierPalette, hardShadow } from "./design";
import type { CarrierKind, Page } from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const zigzag = (w: number, h: number, tooth = 16): string => {
  const points: string[] = ["0% 0%", "100% 0%", `100% ${h - 10}px`];
  const count = Math.max(2, Math.floor(w / tooth));
  for (let i = count; i >= 0; i -= 1) {
    const x = (i / count) * w;
    const y = i % 2 === 0 ? h : h - 10;
    points.push(`${x}px ${y}px`);
  }
  return `polygon(${points.join(", ")})`;
};

const Inner: React.FC<{
  kind: CarrierKind;
  w: number;
  h: number;
  page: Page;
}> = ({ kind, w, h, page }) => {
  const p = carrierPalette(kind, page.accent, page.support);
  switch (kind) {
    case "tag":
      return (
        <>
          <div
            style={{
              position: "absolute",
              left: 18,
              top: h / 2 - 8,
              width: 16,
              height: 16,
              borderRadius: 999,
              border: `3px solid ${INK}`,
              background: page.field,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 34,
              top: -34,
              width: 2,
              height: 40,
              background: INK,
              rotate: "18deg",
            }}
          />
        </>
      );
    case "receipt":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: zigzag(w, h),
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(27,23,18,0.06) 0 1px, transparent 1px 26px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 14,
              bottom: 16,
              width: 86,
              height: 22,
              backgroundImage:
                "repeating-linear-gradient(90deg, #1B1712 0 2px, transparent 2px 5px, #1B1712 5px 6px, transparent 6px 9px)",
              opacity: 0.75,
            }}
          />
        </>
      );
    case "led":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 6,
              backgroundImage:
                "radial-gradient(rgba(237,230,207,0.10) 1.3px, transparent 1.4px)",
              backgroundSize: "11px 11px",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              width: 8,
              height: 8,
              borderRadius: 999,
              background: p.hot,
            }}
          />
        </>
      );
    case "plaque":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 7,
              border: "1px solid rgba(247,244,234,0.55)",
              borderRadius: 4,
            }}
          />
          {[
            { left: 6, top: 6 },
            { right: 6, top: 6 },
            { left: 6, bottom: 6 },
            { right: 6, bottom: 6 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...pos,
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#0B1B18",
              }}
            />
          ))}
        </>
      );
    case "banner":
      return (
        <>
          {[-4, w - 22].map((x, i) => (
            <div key={i} style={{ position: "absolute", left: x, top: -18 }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  border: `3px solid ${INK}`,
                  background: "transparent",
                }}
              />
            </div>
          ))}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 5,
              background: "rgba(255,246,232,0.35)",
            }}
          />
        </>
      );
    case "pop":
    default:
      return (
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 8,
            bottom: 8,
            width: 8,
            background: "rgba(255,246,232,0.4)",
          }}
        />
      );
  }
};

export const CarrierPlate: React.FC<{
  kind: CarrierKind;
  page: Page;
  f: number;
  startFrame: number;
  w: number;
  h: number;
}> = ({ kind, page, f, startFrame, w, h }) => {
  const enter = interpolate(f, [startFrame, startFrame + 9], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  if (enter <= 0) return null;
  const p = carrierPalette(kind, page.accent, page.support);
  const radius =
    kind === "receipt" ? 0 : kind === "banner" ? 4 : kind === "plaque" ? 8 : 12;
  return (
    <div
      style={{
        position: "absolute",
        width: w,
        height: h,
        opacity: enter,
        scale: `1 ${0.72 + enter * 0.28}`,
        transformOrigin: "left center",
        background: kind === "receipt" ? "transparent" : p.bg,
        border: kind === "receipt" ? "none" : `3px solid ${p.border}`,
        borderRadius: radius,
        boxShadow: kind === "receipt" ? "none" : hardShadow(6, page.night ? 0.4 : 0.16),
      }}
    >
      <Inner kind={kind} w={w} h={h} page={page} />
    </div>
  );
};
