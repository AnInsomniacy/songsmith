import {loadFont} from "@remotion/fonts";
import {staticFile} from "remotion";

export const BODY_FONT = "JiaYouBody";
export const DISPLAY_FONT = "JiaYouDisplay";
export const fontsReady = Promise.all([
  loadFont({family: BODY_FONT, url: staticFile("songs/jia-you/fonts/NotoSansCJKsc-Medium.otf"), weight: "500"}),
  loadFont({family: DISPLAY_FONT, url: staticFile("songs/jia-you/fonts/SmileySans-Oblique.ttf.woff2"), weight: "700"}),
]);
