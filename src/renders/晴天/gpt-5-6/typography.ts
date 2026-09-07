import { font, LATIN, latinReady } from "../../../lib/fonts";

export const STORY_FONT = "Clear Sky Serif";
export const DISPLAY_FONT = "Clear Sky Sans";
export const HAND_FONT = "Clear Sky WenKai";
export const NOTE_FONT = LATIN;
export const fontsReady = Promise.all([
  font(STORY_FONT, "NotoSerifCJKsc-Bold.woff2", "700"),
  font(DISPLAY_FONT, "NotoSansCJKsc-Medium.woff2", "500"),
  font(HAND_FONT, "LXGWWenKai-Medium.woff2", "500"),
  latinReady(),
]);
