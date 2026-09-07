import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import { decodeKrc, parseKrc } from "./krc.mjs";
import { parseQrc } from "./qrc.mjs";
import { songPath } from "./paths.mjs";

const sameText = (a, b) =>
  a
    .replaceAll("sh*t", "shit")
    .replaceAll("****", "shit")
    .replaceAll("罗嗦", "啰嗦")
    .replace(/\s/g, "") === b.replace(/\s/g, "");

/** Rebuild source references without replacing approved text, translations, or grouping. */
export async function prepare({ title, url, format = "KRC" }) {
  const file = songPath(title, "data/lyrics.json");
  const data = JSON.parse(await readFile(file, "utf8"));
  const rawFile = format === "KRC" ? "raw/source.krc" : "raw/qrc-response.json";
  let raw;
  if (format === "QRC") {
    raw = JSON.parse(await readFile(songPath(title, "data", rawFile), "utf8"))
      .data.content;
  } else {
    try {
      raw = await readFile(songPath(title, "data", rawFile), "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      if (!url) throw Error(`Missing native source for ${title}`);
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw Error(`KRC request failed: ${response.status}`);
      raw = decodeKrc((await response.json()).content);
      await mkdir(songPath(title, "data/raw"), { recursive: true });
      await writeFile(songPath(title, "data", rawFile), raw);
    }
  }
  const rows = format === "KRC" ? parseKrc(raw) : parseQrc(raw);
  const native = rows.flatMap((r) => r.units);
  for (const line of [
    ...(data.credits ?? []),
    ...(data.intro?.vocalises ?? []),
    ...data.lines,
  ]) {
    if (!line.units?.length) continue;
    if (format === "QRC") {
      const row = rows.find((r) => r.startMs === line.startMs);
      if (!row) throw Error(`Missing QRC row: ${line.id}`);
      line.units = row.units
        .filter((u) => u.text.trim())
        .map((u, index) => ({
          ...u,
          nativeText: u.text,
          text: u.text.replace(/\s/g, ""),
          index,
          kind: "vocal",
        }));
    } else {
      line.units = line.units.map((unit, index) => {
        const source = native.find(
          (u) => u.startMs === unit.startMs && sameText(u.text, unit.text),
        );
        if (!source) {
          if (!unit.text.trim()) return { ...unit, index, kind: "layout" };
          throw Error(`Native unit not found: ${title}/${line.id}/${index}`);
        }
        return {
          ...source,
          nativeText: source.text,
          text: unit.text,
          index,
          kind: unit.text.trim() ? "vocal" : "layout",
        };
      });
    }
  }
  data.source.rawFile = rawFile;
  data.source.format = format;
  const temporary = file + ".tmp";
  await writeFile(temporary, JSON.stringify(data, null, 2) + "\n");
  await rename(temporary, file);
  console.log(
    `Prepared ${title}: source units preserved, approved grouping retained.`,
  );
}
