export const F = {
  cn: "Street Sans",
  en: "Street Barlow",
  info: "Street Information",
  translation: "Street Round",
};
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
const root = "songs/不潮不用花钱/fonts/";
export const fontReady = Promise.all([
  loadFont({
    family: F.cn,
    url: staticFile("fonts/NotoSansCJKsc-Medium.woff2"),
    weight: "500",
  }),
  loadFont({
    family: F.en,
    url: staticFile("fonts/BarlowSemiCondensed-SemiBold.ttf"),
    weight: "600",
  }),
  loadFont({
    family: F.info,
    url: staticFile("fonts/BarlowSemiCondensed-Regular.ttf"),
    weight: "400",
  }),
  loadFont({
    family: F.translation,
    url: staticFile(root + "ChillRoundF.ttf"),
    weight: "400",
  }),
]);
