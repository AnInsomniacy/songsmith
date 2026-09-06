import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT_DISPLAY = "GeminiFlash Smiley";
export const FONT_BODY = "GeminiFlash WenKai";
export const FONT_MONO = "GeminiFlash DIN";

export const fontsReady = Promise.all([
  loadFont({
    family: FONT_DISPLAY,
    url: staticFile("songs/bu-chao-bu-yong-hua-qian/fonts/SmileySans-Oblique.woff2"),
    weight: "400",
  }),
  loadFont({
    family: FONT_BODY,
    url: staticFile("songs/bu-chao-bu-yong-hua-qian/fonts/LXGWWenKai-Medium.woff2"),
    weight: "500",
  }),
  loadFont({
    family: FONT_MONO,
    url: staticFile("songs/bu-chao-bu-yong-hua-qian/fonts/DIN-Condensed-Bold-subset.woff2"),
    weight: "700",
  }),
]);
