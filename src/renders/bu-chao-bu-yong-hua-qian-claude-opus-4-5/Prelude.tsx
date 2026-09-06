import React from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "./design";
import { FONT_BODY, FONT_IMPACT, FONT_LATIN } from "./fonts";
import { INTRO_CREDITS, INTRO_VOCALISES, SONG_ARTIST, SONG_TITLE } from "./lyrics";
import {
  Barcode,
  CoffeeStain,
  DoodleArrow,
  DoodleHeart,
  GridLines,
  PriceTag,
  SpiralHoles,
  StickyNote,
  TapeStrip,
} from "./ScenePrimitives";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Prelude: React.FC<{
  globalFrame: number;
  globalMs: number;
  opacity?: number;
}> = ({ globalFrame, globalMs, opacity = 1 }) => {
  const { fps } = useVideoConfig();
  const p = {
    paper: COLORS.paper,
    ink: COLORS.ink,
    pencil: COLORS.pencil,
    marker: COLORS.marker,
    highlighter: COLORS.highlighter,
    ballpoint: COLORS.ballpoint,
  };

  const titleEnter = interpolate(
    globalFrame,
    [0.3 * fps, 1.2 * fps],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );

  const artistEnter = interpolate(
    globalFrame,
    [1.0 * fps, 1.8 * fps],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );

  const creditsEnter = interpolate(
    globalFrame,
    [2.0 * fps, 3.5 * fps],
    [0, 1],
    { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );

  const t = globalFrame / fps;
  const drift = Math.sin(t * 0.8) * 12;
  const float = Math.sin(t * 0.6) * 18;

  const currentVocalise = INTRO_VOCALISES.find(
    (v) => globalMs >= v.startMs && globalMs < v.endMs,
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: COLORS.paper,
        opacity,
      }}
    >
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <rect width="1920" height="1080" fill={COLORS.paper} />
        <GridLines color={p.pencil} opacity={0.04} />
        <SpiralHoles x={85} count={20} color={p.pencil} />

        <rect
          x="60"
          y="40"
          width="1800"
          height="1000"
          rx="8"
          fill="none"
          stroke={p.pencil}
          strokeWidth="2"
          opacity="0.15"
        />

        <g transform={`translate(${drift} ${float * 0.5})`}>
          <StickyNote
            x={1480}
            y={120}
            width={300}
            height={190}
            rotate={6}
            bg={COLORS.stickyYellow}
            border={COLORS.stickyBorderYellow}
          />
        </g>

        <g transform={`translate(${-drift * 0.5} ${-float * 0.3})`}>
          <StickyNote
            x={120}
            y={680}
            width={260}
            height={160}
            rotate={-8}
            bg={COLORS.stickyPink}
            border={COLORS.stickyBorderPink}
          />
        </g>

        <TapeStrip x={960} y={60} rotate={0} width={180} color={COLORS.highlighter} />
        <TapeStrip x={250} y={950} rotate={-4} width={130} />

        <PriceTag
          x={180 + drift}
          y={180}
          width={160}
          height={80}
          rotate={-12}
          bg={COLORS.highlighter}
          hole={COLORS.paper}
        />

        <DoodleArrow
          x={1650}
          y={500}
          rotate={-45 + Math.sin(t * 0.7) * 5}
          length={100}
          color={p.pencil}
        />

        <DoodleHeart x={1700} y={180} scale={0.6} color={p.marker} fill />
        <CoffeeStain x={1650} y={900} scale={0.9} opacity={0.1} />
        <Barcode x={600} y={950} width={180} color={p.ink} />
      </svg>

      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleEnter,
            transform: `translateY(${(1 - titleEnter) * 30}px)`,
          }}
        >
          <div
            style={{
              background: COLORS.stickyYellow,
              padding: "30px 60px",
              borderRadius: 6,
              boxShadow: "6px 6px 0 #00000018",
              display: "inline-block",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: 6,
                background: COLORS.stickyBorderYellow,
                borderRadius: "6px 6px 0 0",
              }}
            />
            <h1
              style={{
                fontFamily: FONT_IMPACT,
                fontSize: 100,
                fontWeight: 400,
                color: COLORS.ink,
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {SONG_TITLE}
            </h1>
          </div>
        </div>

        <div
          style={{
            marginTop: 30,
            opacity: artistEnter,
            transform: `translateY(${(1 - artistEnter) * 20}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 42,
              fontWeight: 500,
              color: COLORS.pencil,
            }}
          >
            {SONG_ARTIST}
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 32px",
          maxWidth: 1000,
          opacity: creditsEnter,
        }}
      >
        {INTRO_CREDITS.map((credit, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONT_LATIN,
              fontSize: 22,
              color: COLORS.pencil,
              opacity: 0.65,
            }}
          >
            <span style={{ color: COLORS.ballpoint }}>{credit.label}</span>
            <span style={{ margin: "0 6px" }}>:</span>
            <span>{credit.value}</span>
          </div>
        ))}
      </div>

      {currentVocalise && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: FONT_LATIN,
            fontSize: 36,
            color: COLORS.ballpoint,
            opacity: 0.7,
          }}
        >
          {currentVocalise.text}
        </div>
      )}
    </div>
  );
};
