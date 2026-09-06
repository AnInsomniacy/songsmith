import React, {useEffect, useState} from "react";
import {Audio} from "@remotion/media";
import {AbsoluteFill, cancelRender, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {Cover} from "./Cover";
import {C} from "./design";
import {fontsReady} from "./fonts";
import {preparePages, prepareVocalises} from "./layout";
import {Lyrics} from "./Lyrics";
import {ease} from "./motion";
import {PreludeArt, PreludeType} from "./Prelude";
import {scenes, type ShotId} from "./scenes";
import {pages, sourceLines, FPS} from "./storyboard";
import type {LineLayout, Page, PreparedPage, SceneClock} from "./types";

const clockFor = (page: Page, frame: number): SceneClock => ({
  t: (frame - page.start) / FPS,
  duration: (page.end - page.start) / FPS,
  cues: page.lines.map((line) => sourceLines[line.source].startMs / 1000 - page.start / FPS),
  units: page.lines.flatMap((line) => sourceLines[line.source].characters.map((u) => ({
    text: u.text, at: u.startMs / 1000 - page.start / FPS,
  }))),
  scope: "astra-" + page.id,
});

const Art: React.FC<{page: Page; frame: number; opacity?: number}> = ({page, frame, opacity = 1}) => {
  const Scene = scenes[page.id as ShotId];
  if (!Scene) throw new Error("Missing independent scene: " + page.id);
  return <svg data-astra-scene={page.id} width="1920" height="1080" viewBox="0 0 1920 1080"
    style={{position: "absolute", inset: 0, opacity}}><Scene {...clockFor(page, frame)}/></svg>;
};

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (fps !== FPS) throw new Error("This film is authored at 60 fps");
  const [handle] = useState(() => delayRender("Astra theatre fonts and fixed lyric layout"));
  const [prepared, setPrepared] = useState<{pages: PreparedPage[]; vocalises: LineLayout[]} | null>(null);
  useEffect(() => {
    let live = true;
    fontsReady.then(() => {
      const value = {pages: preparePages(), vocalises: prepareVocalises()};
      if (live) {
        setPrepared(value);
        (window as unknown as {astraInspection: unknown}).astraInspection = value;
      }
      continueRender(handle);
    }).catch(cancelRender);
    return () => {live = false;};
  }, [handle]);
  if (!prepared) return null;
  const index = pages.findIndex((page) => frame >= page.start && frame < page.end);
  const active = index < 0 ? null : prepared.pages[index];
  const blend = active ? ease((frame - active.page.start) / 18) : 1;
  return <AbsoluteFill style={{backgroundColor: C.porcelain, overflow: "hidden"}} data-astra-root="">
    <Audio src={staticFile("songs/bu-chao-bu-yong-hua-qian/audio/bu-chao-bu-yong-hua-qian.mp3")}/>
    {frame === 0 ? <Cover/> : <>
      {index <= 0 && (!active || blend < 1) && <PreludeArt frame={frame}/>}
      {index > 0 && blend < 1 && <Art page={pages[index - 1]} frame={frame}/>}
      {active && <Art page={active.page} frame={frame} opacity={blend}/>}
      {active ? <Lyrics frame={frame} lines={active.lines}/> : <>
        <PreludeType frame={frame}/><Lyrics frame={frame} lines={prepared.vocalises}/>
      </>}
    </>}
  </AbsoluteFill>;
};
