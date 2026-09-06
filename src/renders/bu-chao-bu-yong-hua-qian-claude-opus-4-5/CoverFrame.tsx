import React from "react";
import { COLORS } from "./design";
import { FONT_BODY, FONT_IMPACT, FONT_LATIN } from "./fonts";
import { INTRO_CREDITS, SONG_ARTIST, SONG_TITLE } from "./lyrics";
import {
  Barcode,
  CoffeeStain,
  DoodleHeart,
  PriceTag,
  SpiralHoles,
  StickyNote,
  TapeStrip,
} from "./ScenePrimitives";

export const CoverFrame: React.FC = () => {
  const p = {
    paper: COLORS.paper,
    ink: COLORS.ink,
    pencil: COLORS.pencil,
    marker: COLORS.marker,
    highlighter: COLORS.highlighter,
    ballpoint: COLORS.ballpoint,
    stickyBg: COLORS.stickyYellow,
    stickyBorder: COLORS.stickyBorderYellow,
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: COLORS.paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <rect width="1920" height="1080" fill={COLORS.paper} />
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
          opacity="0.2"
        />

        <TapeStrip x={960} y={80} rotate={0} width={200} color={COLORS.highlighter} />
        <TapeStrip x={200} y={900} rotate={-5} width={150} />
        <TapeStrip x={1700} y={850} rotate={8} width={140} color={COLORS.stickyPink} />

        <StickyNote
          x={1450}
          y={150}
          width={320}
          height={200}
          rotate={8}
          bg={COLORS.stickyYellow}
          border={COLORS.stickyBorderYellow}
        />
        <StickyNote
          x={150}
          y={700}
          width={280}
          height={180}
          rotate={-6}
          bg={COLORS.stickyPink}
          border={COLORS.stickyBorderPink}
        />
        <StickyNote
          x={1500}
          y={700}
          width={260}
          height={170}
          rotate={5}
          bg={COLORS.stickyBlue}
          border={COLORS.stickyBorderBlue}
        />

        <PriceTag
          x={200}
          y={200}
          width={180}
          height={90}
          rotate={-15}
          bg={COLORS.highlighter}
          hole={COLORS.paper}
        />
        <PriceTag
          x={1600}
          y={500}
          width={160}
          height={80}
          rotate={12}
          bg={COLORS.stickyPink}
          hole={COLORS.paper}
        />

        <DoodleHeart x={1650} y={200} scale={0.7} color={p.marker} fill />
        <DoodleHeart x={280} y={850} scale={0.5} color={p.pencil} />

        <CoffeeStain x={1700} y={950} scale={0.8} opacity={0.12} />

        <Barcode x={700} y={920} width={200} color={p.ink} />
      </svg>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: COLORS.stickyYellow,
            padding: "40px 80px",
            borderRadius: 8,
            boxShadow: "8px 8px 0 #00000020",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: 8,
              background: COLORS.stickyBorderYellow,
              borderRadius: "8px 8px 0 0",
            }}
          />
          <h1
            style={{
              fontFamily: FONT_IMPACT,
              fontSize: 120,
              fontWeight: 400,
              color: COLORS.ink,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {SONG_TITLE}
          </h1>
          <div
            style={{
              marginTop: 20,
              fontFamily: FONT_BODY,
              fontSize: 48,
              fontWeight: 500,
              color: COLORS.pencil,
            }}
          >
            {SONG_ARTIST}
          </div>
        </div>

        <div
          style={{
            marginTop: 60,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px 24px",
            maxWidth: 900,
          }}
        >
          {INTRO_CREDITS.slice(0, 4).map((credit, i) => (
            <div
              key={i}
              style={{
                fontFamily: FONT_LATIN,
                fontSize: 24,
                color: COLORS.pencil,
                opacity: 0.7,
              }}
            >
              <span style={{ color: COLORS.ballpoint }}>{credit.label}</span>
              <span style={{ margin: "0 8px" }}>:</span>
              <span>{credit.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 80,
          fontFamily: FONT_LATIN,
          fontSize: 18,
          color: COLORS.pencil,
          opacity: 0.4,
        }}
      >
        Claude Opus 4.5 Edition
      </div>
    </div>
  );
};
