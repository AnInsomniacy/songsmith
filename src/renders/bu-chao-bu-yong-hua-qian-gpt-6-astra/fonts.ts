import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { F } from "./design";
const root = "songs/bu-chao-bu-yong-hua-qian/fonts/";
export const fontReady = Promise.all([
  loadFont({
    family: F.cn,
    url: staticFile(root + "NotoSansCJKsc-Medium.otf"),
    weight: "500",
  }),
  loadFont({
    family: F.en,
    url: staticFile(root + "BarlowSemiCondensed-SemiBold.ttf"),
    weight: "600",
  }),
  loadFont({
    family: F.info,
    url: staticFile(root + "BarlowSemiCondensed-Regular.ttf"),
    weight: "400",
  }),
  loadFont({
    family: F.translation,
    url: staticFile(root + "ChillRoundF.ttf"),
    weight: "400",
  }),
]);
