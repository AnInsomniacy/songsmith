export const F = {
  ja: "OLK SVG Klee",
  en: "OLK SVG Manrope",
  zh: "OLK SVG WenKai",
  info: "OLK SVG Zen",
};
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
export const fontsReady = Promise.all([
  loadFont({
    family: F.ja,
    url: staticFile("songs/One Last Kiss/fonts/KleeOne-SemiBold.woff2"),
    weight: "600",
  }),
  loadFont({
    family: F.info,
    url: staticFile("songs/One Last Kiss/fonts/ZenKakuGothicNew-Regular.woff2"),
    weight: "400",
  }),
  loadFont({
    family: F.en,
    url: staticFile("songs/One Last Kiss/fonts/Manrope.woff2"),
    weight: "500",
  }),
  loadFont({
    family: F.zh,
    url: staticFile("songs/One Last Kiss/fonts/WenKai.woff2"),
    weight: "400",
  }),
]);
