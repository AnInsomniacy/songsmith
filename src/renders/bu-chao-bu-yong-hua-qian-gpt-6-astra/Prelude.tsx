import React from "react";
import {measureText} from "@remotion/layout-utils";
import {C} from "./design";
import {FONTS} from "./fonts";
import {Button, Plinth, Room, Shadow} from "./objects";
import {ease, ramp, wave} from "./motion";
import {data, FPS} from "./storyboard";

const Metadata: React.FC<{text: string; frame: number; from: number; x?: number; y?: number; size: number; color?: string}> =
  ({text, frame, from, x = 0, y = 0, size, color = C.ink}) => {
    let cursor = x;
    const slots = Array.from(text).map((char, i) => {
      const font = /[\u4e00-\u9fff]/.test(char) ? FONTS.body.family : FONTS.info.family;
      const position = cursor;
      cursor += measureText({text: char, fontFamily: font, fontSize: size, fontWeight: 400, additionalStyles: {whiteSpace: "pre"}}).width;
      const at = from + i * 2;
      if (frame < at) return null;
      const enter = ease((frame - at) / 7);
      return <text key={i} x={position} y={y + (1 - enter) * 7} fontFamily={font} fontSize={size} fill={color} xmlSpace="preserve">{char}</text>;
    });
    return <g>{slots}</g>;
  };

const Letters: React.FC<{text: string; frame: number; from: number; x: number; y: number; size: number; step?: number}> =
  ({text, frame, from, x, y, size, step = 7}) => <g fontFamily={FONTS.impact.family} fontSize={size} fill={C.ink}>
    {Array.from(text).map((char, i) => {
      const at = from + i * step;
      if (frame < at) return null;
      const p = ease((frame - at) / 11);
      return <text key={i} x={x + i * size * 1.015} y={y + (1 - p) * 15} style={{fontSynthesis: "none"}}>{char}</text>;
    })}
  </g>;

export const PreludeArt: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / FPS;
  const stand = ramp(t, .2, 3.5);
  return <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: "absolute", inset: 0}}>
    <Room id="astra-prelude" floor={C.lavender} horizon={782}/>
    <path d="M1767 0 V705 Q1767 782 1842 782 H1920" stroke={C.cobalt} strokeWidth="42" opacity=".23" fill="none"/>
    <Plinth x={1163} y={731} width={554} height={76} color={C.red}/>
    <Shadow x={1440} y={727} rx={220} ry={26}/>
    <Button id="astra-prelude-button" x={1450 + wave(t, 13) * 21} y={505 - stand * 63} radius={208} color={C.cobalt}
      angle={-42 + stand * 50 + wave(t, 11) * 13} tilt={.55 + stand * .45}/>
    <path d={"M1451 244 Q" + (1455 + wave(t, 9) * 70) + " 122 1587-10"} stroke={C.yellow} strokeWidth="22" fill="none"/>
  </svg>;
};

export const PreludeType: React.FC<{frame: number}> = ({frame}) => <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: "absolute", inset: 0, overflow: "visible"}}>
  {frame >= 8 && <rect x="135" y="148" width="974" height="261" rx="19" fill={C.porcelain}/>}
  <Letters text="不潮不用花钱" frame={frame} from={8} x={151} y={300} size={151}/>
  <Metadata text="林俊杰" frame={frame} from={82} x={158} y={389} size={49}/>
  {frame >= 139 && <rect x="135" y="443" width="909" height="329" rx="19" fill={C.porcelain}/>}
  {data.intro.credits.map((credit, i) => {
    const from = 139 + i * 24;
    if (frame < from) return null;
    const col = i % 2;
    const row = Math.floor(i / 2);
    return <g key={credit.label} transform={"translate(" + (158 + col * 460) + " " + (489 + row * 109) + ")"}>
      <Metadata text={credit.label} frame={frame} from={from} size={26} color={C.cobalt}/>
      <Metadata text={credit.value} frame={frame} from={from + 8} y={48} size={i === 5 ? 29 : 35}/>
    </g>;
  })}
</svg>;
