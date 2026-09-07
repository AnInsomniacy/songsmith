import { fitText } from "@remotion/layout-utils";
import { Audio } from "@remotion/media";
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { IntroArtwork } from "./IntroArtwork";
import { SceneIllustration } from "./scenes";
import { SCENES } from "./storyboard";
import type { TimedLine, TimedUnit } from "./types";
import { useLyrics } from "./use-lyrics";
import {
  COLORS,
  getChapter,
  getPhraseColor,
  getPhraseFont,
  getSceneMood,
  getTypeMotion,
  isEmphasis,
  splitPhrases,
  type Chapter,
  type SceneMood,
  type TypeMotion,
} from "./visual-design";

export type QingTianVideoProps = { audioFile: string | null };
type LyricScene = {
  lines: TimedLine[];
  startMs: number;
  text: string;
  mood: SceneMood;
};

import { useFonts } from "../../../lib/use-fonts";
import {
  DISPLAY_FONT,
  HAND_FONT,
  NOTE_FONT,
  STORY_FONT,
  fontsReady,
} from "./typography";
const FIRST_LYRIC_MS = 29_264;
const OUTRO_MS = 266_250;
const TRANSITION_MS = 300;
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const buildRevealFrames = (timings: TimedUnit[], fps: number) =>
  timings.map((unit) => Math.round((unit.startMs * fps) / 1000));

const enterTransform = (_motion: TypeMotion, progress: number) =>
  `translateY(${(1 - Easing.bezier(0.16, 1, 0.3, 1)(progress)) * 20}px)`;

const Background: React.FC<{
  scene: LyricScene;
  sceneIndex: number;
  frame: number;
  timeMs: number;
  opacity?: number;
}> = ({ scene, sceneIndex, frame, timeMs, opacity = 1 }) => (
  <AbsoluteFill style={{ opacity }}>
    <SceneIllustration
      mood={scene.mood}
      frame={frame}
      sceneIndex={sceneIndex}
      timeMs={timeMs}
      sceneStartMs={scene.startMs}
      secondLineStartMs={scene.lines[1]?.startMs}
    />
    <div
      style={{
        position: "absolute",
        left: 82,
        bottom: 62,
        fontFamily: NOTE_FONT,
        fontSize: 16,
        fontWeight: 750,
        letterSpacing: 5,
        color: `${COLORS.ink}88`,
      }}
    >
      晴天 / {String(sceneIndex + 1).padStart(2, "0")}
    </div>
  </AbsoluteFill>
);

const getLineFontSize = (line: TimedLine, lineCount: number, width: number) => {
  const measured = fitText({
    text: line.text,
    withinWidth: width / 1.13,
    fontFamily: STORY_FONT,
    fontWeight: 800,
  }).fontSize;
  const cellFit = width / Math.max(1, Array.from(line.text).length * 1.08);
  return Math.max(
    lineCount === 1 ? 70 : 62,
    Math.min(lineCount === 1 ? 128 : 104, measured, cellFit),
  );
};

const AnimatedPhrase: React.FC<{
  phrase: string;
  timings: TimedUnit[];
  revealFrames: number[];
  frame: number;
  fps: number;
  fontSize: number;
  chapter: Chapter;
  sceneIndex: number;
}> = ({
  phrase,
  timings,
  revealFrames,
  frame,
  fps,
  fontSize,
  chapter,
  sceneIndex,
}) => {
  const units = Array.from(phrase);
  const emphasis = isEmphasis(phrase);
  const motion = getTypeMotion(phrase);
  const fontFamily = getPhraseFont(phrase, motion);
  const actualSize = fontSize * (emphasis ? 1.08 : 1);
  const cellWidth = fontSize * 1.01;
  const visible = units
    .map((character, index) => ({ character, index }))
    .filter(
      ({ index }) => frame >= (revealFrames[index] ?? Number.POSITIVE_INFINITY),
    );
  const color = emphasis
    ? getPhraseColor(phrase, chapter, sceneIndex)
    : COLORS.ink;
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width: cellWidth * units.length,
        height: actualSize * 1.48,
        marginRight: fontSize * 0.2,
        isolation: "isolate",
      }}
    >
      {visible.map(({ character, index }) => {
        const revealFrame = revealFrames[index];
        const progress = interpolate(
          frame,
          [revealFrame, revealFrame + Math.round(0.18 * fps)],
          [0, 1],
          clamp,
        );
        return (
          <span
            key={`${timings[index]?.index ?? index}-${character}`}
            style={{
              position: "absolute",
              left: index * cellWidth,
              top: "50%",
              width: cellWidth,
              height: actualSize * 1.28,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              transform: `translateY(-50%) ${enterTransform(motion, progress)}`,
              transformOrigin:
                motion === "wind" ? "left center" : "center center",
              zIndex: 2,
              fontFamily,
              fontSize: actualSize,
              fontWeight: emphasis
                ? motion === "choice" || motion === "farewell"
                  ? 700
                  : 900
                : 750,
              lineHeight: 1.12,
              letterSpacing: "-0.08em",
              color,
              whiteSpace: "nowrap",
            }}
          >
            {character}
          </span>
        );
      })}
    </span>
  );
};

const NoteLine: React.FC<{
  line: TimedLine;
  frame: number;
  fps: number;
  lineIndex: number;
}> = ({ line, frame, fps, lineIndex }) => {
  const notes = line.units.map((unit) => ({
    text: unit.text,
    revealFrame: Math.round((unit.startMs / 1000) * fps),
  }));
  return (
    <div
      style={{
        position: "absolute",
        left: 150,
        right: 140,
        top: lineIndex === 0 ? 268 : 568,
        display: "flex",
        flexWrap: "wrap",
        gap: "18px 22px",
        alignItems: "center",
      }}
    >
      {notes
        .filter((note) => frame >= note.revealFrame)
        .map((note, index) => {
          const enter = interpolate(
            frame,
            [note.revealFrame, note.revealFrame + 11],
            [0, 1],
            { ...clamp, easing: Easing.bezier(0.34, 1.4, 0.64, 1) },
          );
          return (
            <div
              key={`${note.revealFrame}-${index}`}
              style={{
                width: 96,
                height: 96,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  index % 4 === 0
                    ? COLORS.sun
                    : index % 3 === 0
                      ? COLORS.school
                      : COLORS.rain,
                color: index % 3 === 0 ? COLORS.paper : COLORS.ink,
                fontFamily: NOTE_FONT,
                fontSize: 42,
                fontWeight: 900,
                transform: `translateY(${(1 - enter) * 34}px) scale(${0.68 + enter * 0.32})`,
                transformOrigin: "center",
              }}
            >
              {note.text}
            </div>
          );
        })}
    </div>
  );
};

const LyricLine: React.FC<{
  line: TimedLine;
  lineIndex: number;
  lineCount: number;
  frame: number;
  fps: number;
  sceneIndex: number;
}> = ({ line, lineIndex, lineCount, frame, fps, sceneIndex }) => {
  if (line.kind === "vocalise")
    return (
      <NoteLine line={line} frame={frame} fps={fps} lineIndex={lineIndex} />
    );
  const left =
    lineIndex === 0
      ? [140, 178, 122, 205][sceneIndex % 4]
      : [210, 138, 190, 112][sceneIndex % 4];
  const width = 1920 - left - 145;
  const fontSize = getLineFontSize(line, lineCount, width);
  const revealFrames = buildRevealFrames(line.units, fps);
  const top = lineCount === 1 ? 378 : lineIndex === 0 ? 186 : 574;
  const chapter = getChapter((frame / fps) * 1000);
  const phrases = splitPhrases(line.text);
  let offset = 0;
  return (
    <div
      style={{
        position: "absolute",
        left,
        width,
        top,
        minHeight: 250,
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        overflow: "visible",
      }}
    >
      {phrases.map((phrase, phraseIndex) => {
        const count = Array.from(phrase).length;
        const timings = line.units.slice(offset, offset + count);
        const phraseFrames = revealFrames.slice(offset, offset + count);
        offset += count;
        return (
          <AnimatedPhrase
            key={`${phrase}-${phraseIndex}`}
            phrase={phrase}
            timings={timings}
            revealFrames={phraseFrames}
            frame={frame}
            fps={fps}
            fontSize={fontSize}
            chapter={chapter}
            sceneIndex={sceneIndex}
          />
        );
      })}
    </div>
  );
};

const Scene: React.FC<{
  scene: LyricScene;
  sceneIndex: number;
  frame: number;
  fps: number;
  timeMs: number;
  backgroundOpacity: number;
}> = ({ scene, sceneIndex, frame, fps, timeMs, backgroundOpacity }) => (
  <AbsoluteFill>
    <Background
      scene={scene}
      sceneIndex={sceneIndex}
      frame={frame}
      timeMs={timeMs}
      opacity={backgroundOpacity}
    />
    {scene.lines.map((line, lineIndex) => (
      <LyricLine
        key={`${line.startMs}-${line.text}`}
        line={line}
        lineIndex={lineIndex}
        lineCount={scene.lines.length}
        frame={frame}
        fps={fps}
        sceneIndex={sceneIndex}
      />
    ))}
  </AbsoluteFill>
);

const Intro: React.FC<{ timeMs: number; frame: number }> = ({
  timeMs,
  frame,
}) => {
  const cards = [
    {
      at: 0,
      label: "周杰伦 · 2003",
      title: "晴天",
      color: COLORS.sun,
      font: STORY_FONT,
    },
    {
      at: 5_800,
      label: "词 · 曲",
      title: "周杰伦",
      color: COLORS.sky,
      font: HAND_FONT,
    },
    {
      at: 11_600,
      label: "编曲 · 制作人",
      title: "周杰伦",
      color: COLORS.red,
      font: DISPLAY_FONT,
    },
    {
      at: 17_400,
      label: "吉他",
      title: "蔡科俊 Again",
      color: COLORS.school,
      font: DISPLAY_FONT,
    },
    {
      at: 23_200,
      label: "收录于《叶惠美》",
      title: "2003",
      color: COLORS.sun,
      font: NOTE_FONT,
    },
  ];
  let index = 0;
  for (let cursor = 0; cursor < cards.length; cursor++)
    if (timeMs >= cards[cursor].at) index = cursor;
  const card = cards[index];
  const enter = interpolate(timeMs - card.at, [0, 420], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <AbsoluteFill>
      {index > 0 ? (
        <IntroArtwork index={index - 1} frame={frame} opacity={1 - enter} />
      ) : null}
      <IntroArtwork
        index={index}
        frame={frame}
        opacity={index === 0 ? 1 : enter}
      />
      <div
        style={{
          position: "absolute",
          left: 155,
          top: 278,
          fontFamily: NOTE_FONT,
          fontSize: 25,
          fontWeight: 750,
          letterSpacing: 8,
          color: COLORS.red,
          opacity: enter,
        }}
      >
        {card.label}
      </div>
      <div
        style={{
          position: "absolute",
          left: 145,
          top: 405,
          fontFamily: card.font,
          fontSize: card.title.length > 7 ? 112 : 210,
          fontWeight: card.font === DISPLAY_FONT ? 700 : 900,
          lineHeight: 1,
          letterSpacing: card.font === HAND_FONT ? "-0.04em" : "-0.08em",
          color: COLORS.ink,
          opacity: enter,
          transform: `translateY(${(1 - enter) * 54}px) scale(${0.84 + enter * 0.16})`,
          transformOrigin: "left center",
        }}
      >
        {card.title}
      </div>
      <div
        style={{
          position: "absolute",
          left: 145,
          top: 680,
          width: 430 * enter,
          height: 14,
          background: card.color,
        }}
      />
    </AbsoluteFill>
  );
};

const Outro: React.FC<{ timeMs: number; frame: number }> = ({
  timeMs,
  frame,
}) => {
  const opacity = interpolate(
    timeMs,
    [OUTRO_MS, OUTRO_MS + 420, 268_300, 269_900],
    [0, 1, 1, 0],
    clamp,
  );
  const enter = interpolate(timeMs, [OUTRO_MS, OUTRO_MS + 620], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <SceneIllustration
        mood="farewell"
        frame={frame}
        sceneIndex={26}
        timeMs={timeMs}
        sceneStartMs={OUTRO_MS}
      />
      <div
        style={{
          position: "absolute",
          left: 155,
          top: 330,
          fontFamily: NOTE_FONT,
          fontSize: 23,
          fontWeight: 750,
          letterSpacing: 8,
          color: COLORS.red,
        }}
      >
        雨停以后
      </div>
      <div
        style={{
          position: "absolute",
          left: 145,
          top: 440,
          fontFamily: STORY_FONT,
          fontSize: 220,
          fontWeight: 900,
          color: COLORS.ink,
          letterSpacing: "-0.08em",
          transform: `translateY(${(1 - enter) * 56}px) scale(${0.8 + enter * 0.2})`,
          transformOrigin: "left center",
        }}
      >
        晴天
      </div>
    </AbsoluteFill>
  );
};

export const Video: React.FC<QingTianVideoProps> = ({ audioFile }) => {
  const fontsLoaded = useFonts(fontsReady);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeMs = (frame / fps) * 1000;
  const audioSrc = staticFile(audioFile ?? "songs/晴天/audio/晴天.mp3");
  const payload = useLyrics();
  const content = useMemo(
    () => payload?.lines.filter((line) => line.kind !== "credit") ?? [],
    [payload],
  );
  const scenes = useMemo<LyricScene[]>(
    () =>
      SCENES.map((spec) => {
        const lines = content.slice(spec.range[0], spec.range[1] + 1);
        const text = lines.map((line) => line.text).join("");
        return {
          lines,
          startMs: content[spec.range[0]]?.startMs ?? Number.POSITIVE_INFINITY,
          text,
          mood: getSceneMood(
            text,
            lines.every((line) => line.kind === "vocalise"),
          ),
        };
      }).filter((scene) => scene.lines.length > 0),
    [content],
  );
  if (!fontsLoaded) return null;
  let activeIndex = -1;
  for (let index = 0; index < scenes.length; index++) {
    if (timeMs >= scenes[index].startMs) activeIndex = index;
    else break;
  }
  const active = scenes[activeIndex];
  const previous = scenes[activeIndex - 1];
  const transitioning = Boolean(
    active && previous && timeMs < active.startMs + TRANSITION_MS,
  );
  const backgroundOpacity = active
    ? interpolate(
        timeMs,
        [active.startMs, active.startMs + TRANSITION_MS],
        [0, 1],
        clamp,
      )
    : 1;
  return (
    <AbsoluteFill style={{ background: COLORS.sky, overflow: "hidden" }}>
      {audioFile ? <Audio src={audioSrc} /> : null}
      {timeMs < FIRST_LYRIC_MS ? (
        <Intro timeMs={timeMs} frame={frame} />
      ) : active ? (
        <>
          {transitioning && previous ? (
            <Background
              scene={previous}
              sceneIndex={activeIndex - 1}
              frame={frame}
              timeMs={timeMs}
            />
          ) : null}
          <Scene
            scene={active}
            sceneIndex={activeIndex}
            frame={frame}
            fps={fps}
            timeMs={timeMs}
            backgroundOpacity={transitioning ? backgroundOpacity : 1}
          />
        </>
      ) : null}
      {timeMs >= OUTRO_MS ? <Outro timeMs={timeMs} frame={frame} /> : null}
    </AbsoluteFill>
  );
};
export default Video;
