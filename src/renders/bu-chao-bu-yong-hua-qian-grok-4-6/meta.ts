import type { CalculateMetadataFunction } from "remotion";
import { DURATION_IN_FRAMES } from "./lyrics";

export const calculateMetadata: CalculateMetadataFunction<
  Record<string, unknown>
> = () => ({
  durationInFrames: DURATION_IN_FRAMES,
  defaultOutName: "不潮不用花钱 grok-4.6",
});
