import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT_BODY = "ClaudeOpus WenKai";
export const FONT_IMPACT = "ClaudeOpus Smiley";
export const FONT_LATIN = "ClaudeOpus DIN";
export const FONT_MONO = "ClaudeOpus DIN";

export const fontsReady = Promise.all([
  loadFont({
    family: FONT_BODY,
    url: staticFile("songs/bu-chao-bu-yong-hua-qian/fonts/LXGWWenKai-Medium.woff2"),
    weight: "500",
  }),
  loadFont({
    family: FONT_IMPACT,
    url: staticFile("songs/bu-chao-bu-yong-hua-qian/fonts/SmileySans-Oblique.woff2"),
    weight: "400",
  }),
  loadFont({
    family: FONT_LATIN,
    url: staticFile("songs/bu-chao-bu-yong-hua-qian/fonts/DIN-Condensed-Bold-subset.woff2"),
    weight: "700",
  }),
]);
