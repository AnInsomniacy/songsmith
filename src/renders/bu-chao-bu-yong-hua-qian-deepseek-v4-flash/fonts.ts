import { loadFont } from "@remotion/fonts";
import { loadFont as loadBungeeFont } from "@remotion/google-fonts/Bungee";
import { staticFile } from "remotion";

export const FONT_BODY = "DeepSeek Noto Medium";
export const FONT_IMPACT = "DeepSeek Noto Black";
export const FONT_LATIN = "DeepSeek DIN";
export const FONT_SIGN = "Bungee";

const bungee = loadBungeeFont("normal", {
  weights: ["400"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const fontsReady = Promise.all([
  loadFont({
    family: FONT_BODY,
    url: staticFile(
      "songs/bu-chao-bu-yong-hua-qian/fonts/NotoSansCJKsc-Medium-subset.woff2",
    ),
    weight: "500",
  }),
  loadFont({
    family: FONT_IMPACT,
    url: staticFile(
      "songs/bu-chao-bu-yong-hua-qian/fonts/NotoSansCJKsc-Black-subset.woff2",
    ),
    weight: "900",
  }),
  loadFont({
    family: FONT_LATIN,
    url: staticFile(
      "songs/bu-chao-bu-yong-hua-qian/fonts/DIN-Condensed-Bold-subset.woff2",
    ),
    weight: "700",
  }),
  bungee.waitUntilDone(),
]);
