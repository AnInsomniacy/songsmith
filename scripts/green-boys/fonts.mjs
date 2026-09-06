import { readFile, writeFile, mkdir } from "node:fs/promises";
import { URLSearchParams } from "node:url";

const base = new URL("../../public/songs/green-boys/", import.meta.url);
const data = JSON.parse(
  await readFile(new URL("data/lyrics.json", base), "utf8"),
);
const translation = JSON.parse(
  await readFile(new URL("data/translations.json", base), "utf8"),
);
const chinese = [
  ...new Set(
    Array.from(
      translation.lines.join("") +
        "向前一点世界就打开一点未完成也继续前进日文原词中文释义",
    ),
  ),
].join("");
const text = [
  ...new Set(
    Array.from(
      data.lines
        .filter((l) => l.kind === "lyric")
        .map((l) => l.text)
        .join("") +
        "Green boys GReeeeN JIN MUSIC WORDS ARRANGEMENT · 0123456789 未完成 向前",
    ),
  ),
].join("");
const headers = {
  "User-Agent": "Mozilla/5.0 AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36",
};
await mkdir(new URL("fonts/", base), { recursive: true });
for (const [family, file, repo] of [
  ["M PLUS Rounded 1c:wght@700", "Rounded.woff2", "mplusrounded1c"],
  ["Dela Gothic One", "Dela.woff2", "delagothicone"],
  ["Klee One:wght@600", "Klee.woff2", "kleeone"],
  ["LXGW WenKai TC", "WenKai.woff2", "lxgwwenkaitc"],
]) {
  const url =
    "https://fonts.googleapis.com/css2?" +
    new URLSearchParams({
      family,
      text: repo === "lxgwwenkaitc" ? chinese : text,
    });
  const css = await (await fetch(url, { headers })).text();
  const source = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!source) throw new Error("Font CSS failed: " + family);
  const response = await fetch(source);
  if (!response.ok) throw new Error("Font binary failed: " + family);
  await writeFile(
    new URL("fonts/" + file, base),
    Buffer.from(await response.arrayBuffer()),
  );
  const license = await fetch(
    `https://api.github.com/repos/google/fonts/contents/ofl/${repo === "mplusrounded1c" ? "kleeone" : repo}/OFL.txt`,
  );
  if (!license.ok) throw new Error("Font license unavailable: " + family);
  const licenseData = await license.json();
  let licenseText = Buffer.from(licenseData.content, "base64").toString("utf8");
  if (repo === "mplusrounded1c") {
    // The downloaded font declares SIL OFL in nameID 14 and this copyright in nameID 0.
    const start = licenseText.indexOf("SIL OPEN FONT LICENSE Version");
    if (start < 0) throw new Error("OFL standard text not found");
    licenseText =
      "Copyright 2016 The Rounded M+ Project Authors.\nLicense declared by the font metadata: http://scripts.sil.org/OFL\n\n" +
      licenseText.slice(start);
  }
  await writeFile(new URL("fonts/" + repo + "-OFL.txt", base), licenseText);
  console.log("Downloaded " + file);
}
