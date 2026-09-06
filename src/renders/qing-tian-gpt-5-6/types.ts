export type CharacterTiming = {
  text: string;
  index: number;
  startMs: number;
  endMs: number;
};

export type TimedLine = {
  text: string;
  startMs: number;
  endMs: number;
  durationMs: number;
  kind: "credit" | "vocalise" | "lyric";
  characters: CharacterTiming[];
};

export type LyricPayload = {
  source: {
    provider: string;
    songId: number;
    songMid: string;
    title: string;
    artist: string;
    album: string;
    retrievedAt: string;
  };
  durationMs: number;
  lines: TimedLine[];
};
