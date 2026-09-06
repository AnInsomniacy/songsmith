import {loadFont} from "@remotion/fonts";
import {staticFile} from "remotion";
import type {Role} from "./types";

const root = "songs/bu-chao-bu-yong-hua-qian/fonts/";
export const FONTS: Record<Role, {family: string; weight: number}> = {
  body: {family: "Astra Round", weight: 400},
  impact: {family: "Astra Smiley", weight: 400},
  thought: {family: "Astra WenKai", weight: 500},
  latin: {family: "Astra Barlow", weight: 600},
  info: {family: "Astra Barlow Info", weight: 400},
};
export const fontsReady = Promise.all([
  loadFont({family: FONTS.body.family, url: staticFile(root + "ChillRoundF-theatre.woff2"), weight: "400"}),
  loadFont({family: FONTS.impact.family, url: staticFile(root + "SmileySans-Oblique.woff2"), weight: "400"}),
  loadFont({family: FONTS.thought.family, url: staticFile(root + "LXGWWenKai-Medium.woff2"), weight: "500"}),
  loadFont({family: FONTS.latin.family, url: staticFile(root + "BarlowSemiCondensed-SemiBold.ttf"), weight: "600"}),
  loadFont({family: FONTS.info.family, url: staticFile(root + "BarlowSemiCondensed-Regular.ttf"), weight: "400"}),
]);
