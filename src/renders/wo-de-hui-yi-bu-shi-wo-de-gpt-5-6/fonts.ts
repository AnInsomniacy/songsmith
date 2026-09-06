import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT_BODY = "Wodehuiyi WenKai";
export const FONT_MEMORY = "Wodehuiyi WenKai";
export const FONT_IMPACT = "Wodehuiyi Smiley";
export const FONT_LATIN = "Futura";
export const FONT_UTILITY = "Avenir Next Condensed";

export const fontsReady = Promise.all([
  loadFont({
    family: FONT_BODY,
    url: staticFile(
      "songs/wo-de-hui-yi-bu-shi-wo-de/fonts/LXGWWenKai-Medium-subset.woff2",
    ),
    weight: "500",
  }),
  loadFont({
    family: FONT_IMPACT,
    url: staticFile(
      "songs/wo-de-hui-yi-bu-shi-wo-de/fonts/SmileySans-Oblique-subset.woff2",
    ),
    weight: "400",
  }),
]);
