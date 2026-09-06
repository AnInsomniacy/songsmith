import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { F } from "./design";
export const fontsReady = Promise.all([
  loadFont({
    family: F.ja,
    url: staticFile("songs/one-last-kiss/fonts/memory.woff2"),
    weight: "600",
  }),
  loadFont({
    family: F.info,
    url: staticFile("songs/one-last-kiss/fonts/info.woff2"),
    weight: "400",
  }),
  loadFont({
    family: F.en,
    url: staticFile("songs/one-last-kiss/fonts/svg/Manrope.woff2"),
    weight: "500",
  }),
  loadFont({
    family: F.zh,
    url: staticFile("songs/one-last-kiss/fonts/svg/WenKai.woff2"),
    weight: "400",
  }),
]);
