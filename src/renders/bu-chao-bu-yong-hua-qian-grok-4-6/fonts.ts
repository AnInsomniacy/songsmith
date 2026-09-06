import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadNoto } from "@remotion/google-fonts/NotoSansSC";
import { loadFont as loadButter } from "@remotion/google-fonts/ZCOOLQingKeHuangYou";

const noto = loadNoto("normal", {
  weights: ["700"],
  subsets: ["latin", "chinese-simplified"],
  ignoreTooManyRequestsWarning: true,
});
const butter = loadButter("normal", {
  weights: ["400"],
  subsets: ["latin", "chinese-simplified"],
  ignoreTooManyRequestsWarning: true,
});
const anton = loadAnton("normal", {
  weights: ["400"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const FONT_BODY = noto.fontFamily;
export const FONT_IMPACT = butter.fontFamily;
export const FONT_LATIN = anton.fontFamily;

export const fontsReady = Promise.all([
  noto.waitUntilDone(),
  butter.waitUntilDone(),
  anton.waitUntilDone(),
]);
