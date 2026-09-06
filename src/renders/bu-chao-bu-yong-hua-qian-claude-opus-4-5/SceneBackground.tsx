import React from "react";
import { Easing, interpolate } from "remotion";
import { COLORS } from "./design";
import {
  Barcode,
  Checkbox,
  CoffeeStain,
  Coin,
  DoodleApple,
  DoodleArrow,
  DoodleChick,
  DoodleHeart,
  DoodleLightbulb,
  DoodleSofa,
  DoodleToy,
  GridLines,
  PiggyBank,
  PriceTag,
  Receipt,
  ShoppingCart,
  SpiralHoles,
  StickyNote,
  TapeStrip,
  Wallet,
} from "./ScenePrimitives";
import type { LyricPage, PagePalette, SceneKind } from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type ArtProps = {
  p: PagePalette;
  t: number;
  progress: number;
  scope: string;
};

const wave = (t: number, period: number) => Math.sin((t / period) * Math.PI * 2);
const ping = (t: number, period: number) => (1 + Math.sin((t / period) * Math.PI * 2)) / 2;

const art = (scene: SceneKind, props: ArtProps): React.ReactNode => {
  const { p, t, progress } = props;
  const drift = wave(t * 1000, 6000) * 15;
  const float = wave(t * 1000, 4500) * 20;
  const spin = t * 12;

  switch (scene) {
    case "notebook-open": {
      const openAmount = interpolate(progress, [0, 0.3], [0, 1], {
        ...clamp,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      });
      return (
        <>
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <GridLines color={p.pencil} opacity={0.08} />
          <TapeStrip x={1600} y={150} rotate={-12} />
          <TapeStrip x={300} y={900} rotate={8} />
          <g transform={`translate(${1400 + drift} ${200 + float})`}>
            <StickyNote
              x={0}
              y={0}
              width={280}
              height={180}
              rotate={-5}
              bg={COLORS.stickyYellow}
              border={COLORS.stickyBorderYellow}
            />
          </g>
          <DoodleArrow x={1200} y={500} rotate={-25 + spin * 0.1} length={120} color={p.pencil} />
          <CoffeeStain x={1700} y={850} scale={1.2} opacity={0.1} />
          <g
            style={{
              transform: `scaleX(${openAmount})`,
              transformOrigin: "left center",
            }}
          >
            <rect x={120} y={100} width={800} height={880} fill="#FEFEFE" opacity={0.5} />
          </g>
        </>
      );
    }

    case "doodle-arrows":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.06} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          {Array.from({ length: 6 }, (_, i) => (
            <DoodleArrow
              key={i}
              x={200 + i * 280}
              y={150 + wave(t * 1000 + i * 500, 3000) * 30}
              rotate={-45 + i * 15 + wave(t * 1000, 4000) * 5}
              length={80 + i * 10}
              color={i % 2 === 0 ? p.marker : p.pencil}
            />
          ))}
          <DoodleArrow x={1500} y={800} rotate={180} length={150} color={p.ballpoint} />
          <TapeStrip x={400} y={950} rotate={-3} />
          <CoffeeStain x={1650} y={200} scale={0.8} />
        </>
      );

    case "heartbeat-sketch":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.05} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          {Array.from({ length: 5 }, (_, i) => {
            const scale = 0.6 + i * 0.25 + ping(t * 1000, 800 + i * 200) * 0.3;
            return (
              <DoodleHeart
                key={i}
                x={1500 - i * 80}
                y={300 + i * 120}
                scale={scale}
                color={i === 0 ? p.marker : p.pencil}
                fill={i === 0}
              />
            );
          })}
          <path
            d={`M100 600 ${Array.from({ length: 20 }, (_, i) => {
              const x = 100 + i * 90;
              const y = 600 + (i % 4 === 2 ? -80 : i % 4 === 3 ? 80 : 0);
              return `L${x} ${y}`;
            }).join(" ")}`}
            fill="none"
            stroke={p.marker}
            strokeWidth={4}
            opacity={0.3}
          />
          <TapeStrip x={1700} y={100} rotate={15} color={COLORS.stickyPink} />
        </>
      );

    case "lightbulb-moment":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.06} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <DoodleLightbulb
            x={1500}
            y={350}
            scale={1.5 + ping(t * 1000, 2000) * 0.2}
            on={progress > 0.3}
            p={p}
          />
          {progress > 0.5 && (
            <>
              <DoodleArrow x={1350} y={280} rotate={45} length={60} color={p.highlighter} />
              <DoodleArrow x={1650} y={280} rotate={135} length={60} color={p.highlighter} />
              <DoodleArrow x={1350} y={420} rotate={-45} length={60} color={p.highlighter} />
              <DoodleArrow x={1650} y={420} rotate={-135} length={60} color={p.highlighter} />
            </>
          )}
          <StickyNote
            x={200 + drift}
            y={700}
            width={250}
            height={150}
            rotate={-8}
            bg={COLORS.stickyYellow}
            border={COLORS.stickyBorderYellow}
          />
          <CoffeeStain x={1200} y={900} scale={1} />
        </>
      );

    case "apple-fall": {
      const fallProgress = interpolate(progress, [0.2, 0.7], [0, 1], clamp);
      const appleY = -100 + fallProgress * 600;
      const appleRotate = fallProgress * 45;
      return (
        <>
          <GridLines color={p.pencil} opacity={0.05} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <DoodleApple
            x={1450}
            y={appleY + float * 0.5}
            scale={1.3}
            p={p}
          />
          <g transform={`rotate(${appleRotate} 1450 ${appleY})`}>
            <DoodleArrow x={1450} y={appleY + 80} rotate={90} length={100} color={p.pencil} />
          </g>
          <DoodleLightbulb x={1650} y={800} scale={0.8} on={fallProgress > 0.8} p={p} />
          <text
            x={200}
            y={900}
            fontFamily="Patrick Hand"
            fontSize={32}
            fill={p.pencil}
            opacity={0.4}
          >
            Newton was here...
          </text>
          <TapeStrip x={1750} y={200} rotate={-20} />
        </>
      );
    }

    case "receipt-rain":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.04} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          {Array.from({ length: 5 }, (_, i) => (
            <Receipt
              key={i}
              x={250 + i * 320}
              y={-50 + wave(t * 1000 + i * 400, 5000) * 40 + i * 30}
              width={200 + (i % 2) * 60}
              height={280 + i * 40}
              rotate={-8 + i * 4 + wave(t * 1000, 3000) * 3}
              p={p}
            />
          ))}
          <Barcode x={150} y={950} width={300} color={p.ink} />
        </>
      );

    case "coin-scatter":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.05} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          {Array.from({ length: 12 }, (_, i) => (
            <Coin
              key={i}
              x={200 + (i % 4) * 400 + wave(t * 1000 + i * 300, 4000) * 20}
              y={200 + Math.floor(i / 4) * 250 + float * (i % 3 === 0 ? 1 : 0.5)}
              scale={0.6 + (i % 3) * 0.3}
              rotate={spin + i * 30}
              p={p}
            />
          ))}
          <Wallet x={1600} y={800} scale={1.2} open={progress} p={p} />
        </>
      );

    case "tag-dance":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.05} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          {Array.from({ length: 6 }, (_, i) => (
            <PriceTag
              key={i}
              x={300 + (i % 3) * 450 + wave(t * 1000 + i * 500, 3500) * 30}
              y={200 + Math.floor(i / 3) * 350 + float * (i % 2 === 0 ? 1 : -1)}
              width={180 + i * 20}
              height={90 + i * 10}
              rotate={-15 + i * 8 + wave(t * 1000, 4000) * 5}
              bg={i % 3 === 0 ? p.highlighter : i % 3 === 1 ? COLORS.stickyPink : COLORS.stickyBlue}
              hole={p.paper}
            />
          ))}
          <ShoppingCart x={1650} y={850} scale={0.9} p={p} />
        </>
      );

    case "sofa-sketch":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.05} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <DoodleSofa x={1400} y={500 + float * 0.5} scale={1.5} p={p} />
          <DoodleChick x={1300 + drift} y={380} scale={0.8} />
          <DoodleChick x={1500 + drift * 0.5} y={360} scale={0.6} />
          {Array.from({ length: 4 }, (_, i) => (
            <rect
              key={i}
              x={1250 + i * 80 + wave(t * 1000 + i * 200, 2000) * 10}
              y={300 - i * 20}
              width={40}
              height={30}
              rx={4}
              fill={p.highlighter}
              opacity={0.7}
            />
          ))}
          <TapeStrip x={300} y={200} rotate={5} color={COLORS.stickyBlue} />
        </>
      );

    case "toy-parade":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.04} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          {Array.from({ length: 5 }, (_, i) => (
            <DoodleToy
              key={i}
              x={300 + i * 300 + wave(t * 1000 + i * 400, 3000) * 20}
              y={450 + wave(t * 1000 + i * 600, 2500) * 30}
              scale={0.9 + (i % 2) * 0.3}
              color={
                i % 4 === 0
                  ? p.marker
                  : i % 4 === 1
                    ? p.ballpoint
                    : i % 4 === 2
                      ? COLORS.stickyGreen
                      : p.highlighter
              }
            />
          ))}
          <DoodleSofa x={1550} y={800} scale={0.8} p={p} />
        </>
      );

    case "checklist-check":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.08} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          {Array.from({ length: 6 }, (_, i) => {
            const checked = progress > 0.15 * (i + 1);
            return (
              <g key={i} transform={`translate(200 ${220 + i * 120})`}>
                <Checkbox
                  x={0}
                  y={0}
                  checked={checked}
                  color={checked ? p.marker : p.pencil}
                />
                <rect
                  x={40}
                  y={-8}
                  width={200 + (i % 3) * 100}
                  height={16}
                  fill={p.pencil}
                  opacity={0.25}
                />
              </g>
            );
          })}
          <TapeStrip x={1600} y={300} rotate={-10} />
          <CoffeeStain x={1500} y={750} scale={1.1} />
        </>
      );

    case "sticky-wall":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.03} />
          {Array.from({ length: 8 }, (_, i) => (
            <StickyNote
              key={i}
              x={150 + (i % 4) * 420 + wave(t * 1000 + i * 300, 5000) * 15}
              y={100 + Math.floor(i / 4) * 450 + float * (i % 2 === 0 ? 0.5 : -0.5)}
              width={280 + (i % 3) * 40}
              height={180 + (i % 2) * 60}
              rotate={-12 + (i % 5) * 6}
              bg={
                i % 4 === 0
                  ? COLORS.stickyYellow
                  : i % 4 === 1
                    ? COLORS.stickyPink
                    : i % 4 === 2
                      ? COLORS.stickyBlue
                      : COLORS.stickyGreen
              }
              border={
                i % 4 === 0
                  ? COLORS.stickyBorderYellow
                  : i % 4 === 1
                    ? COLORS.stickyBorderPink
                    : i % 4 === 2
                      ? COLORS.stickyBorderBlue
                      : COLORS.stickyBorderGreen
              }
            />
          ))}
        </>
      );

    case "barcode-scan": {
      const scanX = 200 + ping(t * 1000, 3000) * 1400;
      return (
        <>
          <GridLines color={p.pencil} opacity={0.05} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <Barcode x={300} y={300} width={400} color={p.ink} />
          <Barcode x={1200} y={500} width={500} color={p.ink} />
          <Barcode x={500} y={750} width={350} color={p.ink} />
          <rect x={scanX} y={0} width={8} height={1080} fill={p.marker} opacity={0.6} />
          <TapeStrip x={1700} y={200} rotate={-15} />
        </>
      );
    }

    case "countdown-zero": {
      const countValue = Math.max(0, Math.floor((1 - progress) * 10));
      return (
        <>
          <GridLines color={p.pencil} opacity={0.05} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <circle cx={1450} cy={500} r={200} fill="none" stroke={p.pencil} strokeWidth={8} />
          <text
            x={1450}
            y={540}
            textAnchor="middle"
            fontFamily="JetBrains Mono"
            fontSize={200}
            fontWeight={700}
            fill={countValue <= 3 ? p.marker : p.ink}
          >
            {countValue}
          </text>
          <DoodleArrow x={1200} y={500} rotate={0} length={100} color={p.pencil} />
          <TapeStrip x={300} y={850} rotate={3} />
        </>
      );
    }

    case "piggy-bank":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.05} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <PiggyBank x={1450} y={450 + float * 0.3} scale={1.8} p={p} />
          {Array.from({ length: 4 }, (_, i) => (
            <Coin
              key={i}
              x={1300 + i * 80}
              y={200 - i * 30 + wave(t * 1000 + i * 200, 2000) * 15}
              scale={0.5}
              rotate={spin + i * 45}
              p={p}
            />
          ))}
          <TapeStrip x={300} y={200} rotate={-8} color={COLORS.stickyPink} />
        </>
      );

    case "wallet-empty": {
      const openProgress = interpolate(progress, [0.1, 0.5], [0, 1], clamp);
      return (
        <>
          <GridLines color={p.pencil} opacity={0.05} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <Wallet x={1400} y={450} scale={2} open={openProgress} p={p} />
          {openProgress > 0.7 && (
            <text
              x={1400}
              y={700}
              textAnchor="middle"
              fontFamily="Patrick Hand"
              fontSize={48}
              fill={p.marker}
            >
              ¥0.00
            </text>
          )}
          <Receipt x={200 + drift} y={150} width={220} height={350} rotate={-5} p={p} />
        </>
      );
    }

    case "echo-notes":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.04} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          {Array.from({ length: 5 }, (_, i) => (
            <StickyNote
              key={i}
              x={400 + i * 250}
              y={300 + i * 80 + wave(t * 1000 + i * 300, 3000) * 20}
              width={220}
              height={140}
              rotate={-10 + i * 5}
              bg={COLORS.stickyYellow}
              border={COLORS.stickyBorderYellow}
              shadow={i === 0}
            />
          ))}
        </>
      );

    case "finale-fold": {
      const foldProgress = interpolate(progress, [0.3, 0.9], [0, 1], clamp);
      return (
        <>
          <GridLines color={p.pencil} opacity={0.06} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <g
            style={{
              transform: `perspective(1000px) rotateY(${foldProgress * 30}deg)`,
              transformOrigin: "left center",
            }}
          >
            <rect x={200} y={150} width={1500} height={780} fill="#FEFEFE" />
            <rect
              x={200}
              y={150}
              width={1500}
              height={780}
              fill="none"
              stroke={p.pencil}
              strokeWidth={4}
            />
          </g>
          <TapeStrip x={960} y={120} rotate={0} width={200} />
          <TapeStrip x={960} y={960} rotate={0} width={200} />
          <DoodleHeart x={1600} y={200} scale={0.8} color={p.marker} fill />
        </>
      );
    }

    case "shopping-cart":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.05} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <ShoppingCart x={1400 + drift} y={500} scale={2} p={p} />
          {Array.from({ length: 3 }, (_, i) => (
            <PriceTag
              key={i}
              x={1300 + i * 100}
              y={250 + i * 50 + float}
              width={120}
              height={60}
              rotate={-20 + i * 15}
              bg={p.highlighter}
              hole={p.paper}
            />
          ))}
        </>
      );

    case "cash-register":
      return (
        <>
          <GridLines color={p.pencil} opacity={0.05} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <rect x={1200} y={300} width={500} height={400} rx={20} fill={p.pencil} />
          <rect x={1250} y={350} width={400} height={150} rx={10} fill="#FEFEFE" />
          <text
            x={1450}
            y={460}
            textAnchor="middle"
            fontFamily="JetBrains Mono"
            fontSize={80}
            fontWeight={700}
            fill={p.ink}
          >
            ¥0
          </text>
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x={1260 + (i % 4) * 100}
              y={530 + Math.floor(i / 4) * 50}
              width={80}
              height={35}
              rx={6}
              fill={i === 11 ? p.marker : "#FEFEFE"}
            />
          ))}
          <Receipt x={200} y={200} width={250} height={380} rotate={-8} p={p} />
        </>
      );

    default:
      return (
        <>
          <GridLines color={p.pencil} opacity={0.06} />
          <SpiralHoles x={85} count={20} color={p.pencil} />
          <CoffeeStain x={1500} y={700} scale={1.5} />
        </>
      );
  }
};

export const SceneBackground: React.FC<{
  page: LyricPage;
  globalMs: number;
  opacity?: number;
}> = ({ page, globalMs, opacity = 1 }) => {
  const localSeconds = Math.max(0, (globalMs - page.startMs) / 1000);
  const duration = Math.max(1, page.endMs - page.startMs);
  const progress = Math.min(1, Math.max(0, (globalMs - page.startMs) / duration));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        background: page.palette.paper,
      }}
    >
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ display: "block" }}
      >
        <rect width="1920" height="1080" fill={page.palette.paper} />
        {art(page.scene, {
          p: page.palette,
          t: localSeconds,
          progress,
          scope: page.id,
        })}
        <rect
          x="60"
          y="40"
          width="1800"
          height="1000"
          rx="8"
          fill="none"
          stroke={page.palette.pencil}
          strokeWidth="2"
          opacity="0.15"
        />
      </svg>
    </div>
  );
};
