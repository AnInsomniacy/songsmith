import React from "react";
import {ease} from "./motion";
import type {LineLayout, Slot} from "./types";

export const entrance = (slot: Slot, frame: number) => {
  const p = ease((frame - slot.start) / (slot.settle - slot.start));
  const inverse = 1 - p;
  if (slot.motion === "reach") return {x: -17 * inverse, y: 0, rotation: 0, sx: .9 + p * .1, sy: 1};
  if (slot.motion === "tap") return {x: 0, y: 9 * inverse, rotation: 0, sx: 1, sy: .84 + p * .16};
  if (slot.motion === "unfold") return {x: -6 * inverse, y: 0, rotation: -3 * inverse, sx: .82 + p * .18, sy: 1};
  if (slot.motion === "turn") return {x: 0, y: 7 * inverse, rotation: (slot.index % 2 ? 5 : -5) * inverse, sx: 1, sy: 1};
  return {x: 0, y: 14 * inverse, rotation: 0, sx: 1, sy: 1};
};

export const Lyrics: React.FC<{lines: LineLayout[]; frame: number}> = ({lines, frame}) =>
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: "absolute", inset: 0, overflow: "visible"}} data-astra-lyrics="">
    {lines.filter((line) => frame >= line.start).map((line) => {
      const baseline = line.height * .82;
      return <g key={line.id} data-astra-line={line.id} transform={"translate(" + line.x + " " + line.y + ")"}>
        <rect x="-27" y="-14" width={line.width + 54} height={line.height + 30} rx="19" fill={line.panel}/>
        {line.slots.filter((slot) => slot.text.trim() && frame >= slot.start).map((slot) => {
          const e = entrance(slot, frame);
          return <g key={slot.index} data-astra-unit={line.id + "-" + slot.index}
            transform={"translate(" + (slot.x + e.x) + " " + (baseline + e.y) + ") rotate(" + e.rotation + ") scale(" + e.sx + " " + e.sy + ")"}>
            <text x="0" y="0" fill={slot.color} fontFamily={slot.font} fontWeight={slot.weight} fontSize={slot.size}
              letterSpacing={slot.size * .02} xmlSpace="preserve" style={{fontSynthesis: "none", whiteSpace: "pre"}}>{slot.text}</text>
          </g>;
        })}
      </g>;
    })}
  </svg>;
