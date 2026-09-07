import { font, LATIN, latinReady, UTILITY } from "../../../lib/fonts";
export const FONT_BODY = "Memory WenKai";
export const FONT_MEMORY = FONT_BODY;
export const FONT_IMPACT = "Memory Sans";
export const FONT_LATIN = LATIN;
export const FONT_UTILITY = UTILITY;
export const fontsReady = Promise.all([
  font(FONT_BODY, "LXGWWenKai-Medium.woff2", "500"),
  font(FONT_IMPACT, "NotoSansCJKsc-Medium.woff2", "500"),
  latinReady(),
]);
