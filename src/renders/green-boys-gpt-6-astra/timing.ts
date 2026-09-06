import { Easing, interpolate } from "remotion";

export const WORD_MOTION_FRAMES = 11;
export const WORD_REVEAL_FRAMES = 3;

/**
 * A source timestamp is the cue to read the glyph, not the start of a long
 * invisible wait. Keep the original spatial choreography intact while letting
 * opacity become legible early. No source offset, pre-roll or speed correction.
 */
export function wordEntrance(elapsedFrames: number) {
  const options = {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  } as const;
  return {
    motion: interpolate(elapsedFrames, [0, WORD_MOTION_FRAMES], [0, 1], {
      ...options,
      easing: (p: number) => p * p * (3 - 2 * p),
    }),
    opacity: interpolate(elapsedFrames, [0, WORD_REVEAL_FRAMES], [0, 1], {
      ...options,
      easing: Easing.out(Easing.cubic),
    }),
  };
}
