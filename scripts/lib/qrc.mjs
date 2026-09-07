/** Keep complete source tokens, including solfege syllables and zero-duration spaces. */
export function parseQrc(raw) {
  return [...raw.matchAll(/\[(\d+),(\d+)\]([^[]*)/gu)].map((row, sourceRow) => {
    const units = [...row[3].matchAll(/([^()]*?)\((\d+),(\d+)\)/gu)].map(
      (u, sourceUnit) => ({
        text: u[1],
        startMs: Number(u[2]),
        endMs: Number(u[2]) + Number(u[3]),
        sourceRow,
        sourceUnit,
      }),
    );
    return {
      startMs: Number(row[1]),
      endMs: Number(row[1]) + Number(row[2]),
      text: row[3].replace(/\(\d+,\d+\)/g, "").trim(),
      units,
    };
  });
}
