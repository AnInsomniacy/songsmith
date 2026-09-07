import { font, latinReady } from "../../../lib/fonts";
export const BODY_FONT = "Encouragement Sans";
export const DISPLAY_FONT = "Encouragement WenKai";
export const fontsReady = Promise.all([
  font(BODY_FONT, "NotoSansCJKsc-Medium.woff2", "500"),
  font(DISPLAY_FONT, "LXGWWenKai-Medium.woff2", "500"),
  latinReady(),
]);
