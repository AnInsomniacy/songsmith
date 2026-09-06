import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
const download = (url) =>
  execFileSync(
    "curl",
    [
      "-fLsS",
      "--retry",
      "3",
      "--connect-timeout",
      "15",
      "--max-time",
      "90",
      "-A",
      "Mozilla/5.0 Chrome/131.0.0.0 Safari/537.36",
      url,
    ],
    { maxBuffer: 20 * 1024 * 1024 },
  );
import data from "../../public/songs/one-last-kiss/data/lyrics.json" with { type: "json" };
const dir = new URL(
  "../../public/songs/one-last-kiss/fonts/svg/",
  import.meta.url,
);
await mkdir(dir, { recursive: true });
const specs = [
  [
    "WenKai",
    "LXGW WenKai TC",
    400,
    data.lines.map((l) => l.translation).join(""),
  ],
  [
    "Manrope",
    "Manrope",
    500,
    data.lines
      .map((l) => l.text)
      .join("")
      .replace(/[^\x20-\x7E]/g, "") +
      "One Last Kiss HIKARU UTADA WORDS / MUSIC 0123456789",
  ],
];
for (const [file, family, weight, letters] of specs) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent([...new Set(letters)].join(""))}`;
  const css = download(url).toString("utf8");
  const fontUrl = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!fontUrl) throw Error(css);
  const font = download(fontUrl);
  await writeFile(new URL(`${file}.woff2`, dir), font);
  const license = JSON.parse(
    download(
      `https://api.github.com/repos/google/fonts/contents/ofl/${family.toLowerCase().replaceAll(" ", "")}/OFL.txt`,
    ).toString("utf8"),
  );
  await writeFile(
    new URL(`${file}-OFL.txt`, dir),
    Buffer.from(license.content, "base64"),
  );
  console.log(`${family}: saved licensed local subset`);
}
