import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT_BODY = "Glm53Chill";
export const FONT_IMPACT = "Glm53Smiley";
export const FONT_NUM = "Glm53DIN";

export const fontsReady = Promise.all([
  loadFont({
    family: FONT_BODY,
    url: staticFile("songs/bu-chao-bu-yong-hua-qian/fonts/ChillRoundF.ttf"),
    weight: "400",
  }),
  loadFont({
    family: FONT_IMPACT,
    url: staticFile(
      "songs/bu-chao-bu-yong-hua-qian/fonts/SmileySans-Oblique.woff2",
    ),
    weight: "400",
  }),
  loadFont({
    family: FONT_NUM,
    url: staticFile(
      "songs/bu-chao-bu-yong-hua-qian/fonts/DIN-Condensed-Bold-subset.woff2",
    ),
    weight: "700",
  }),
]);
