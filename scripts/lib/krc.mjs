import { inflateSync } from "node:zlib";

export function decodeKrc(content) {
  const buffer = Buffer.from(content, "base64");
  if (buffer.subarray(0, 4).toString() !== "krc1")
    throw Error("Invalid KRC signature");
  const bytes = buffer.subarray(4);
  const key = [
    64, 71, 97, 119, 94, 50, 116, 71, 81, 54, 49, 45, 206, 210, 110, 105,
  ];
  for (let i = 0; i < bytes.length; i++) bytes[i] ^= key[i % key.length];
  return inflateSync(bytes).toString("utf8");
}

export function parseKrc(raw) {
  const offset = Number(raw.match(/^\[offset:(-?\d+)\]/m)?.[1] ?? 0);
  return [...raw.matchAll(/^\[(\d+),(\d+)\](.*)$/gm)].map((row, sourceRow) => {
    const startMs = Number(row[1]) + offset;
    const units = [
      ...row[3].matchAll(/<(\d+),(\d+),\d+>(.*?)(?=<\d+,\d+,\d+>|$)/g),
    ].map((u, sourceUnit) => ({
      text: u[3],
      startMs: startMs + Number(u[1]),
      endMs: startMs + Number(u[1]) + Number(u[2]),
      sourceRow,
      sourceUnit,
    }));
    return {
      startMs,
      endMs: startMs + Number(row[2]),
      text: units.map((u) => u.text).join(""),
      units,
    };
  });
}
