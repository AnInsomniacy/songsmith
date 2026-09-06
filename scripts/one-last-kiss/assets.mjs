import { mkdir, writeFile, access } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const base = new URL("../../public/songs/one-last-kiss/", import.meta.url);
const work = new URL("../../.work/one-last-kiss/", import.meta.url);
await mkdir(new URL("font-originals/", work), { recursive: true });
const get = async (url, dest) => {
  try {
    await access(dest);
    return;
  } catch {
    /* Download missing assets only. */
  }
  await new Promise((resolve, reject) => {
    const child = spawn(
      "curl",
      [
        "--http1.1",
        "--fail",
        "--location",
        "--silent",
        "--show-error",
        "--retry",
        "3",
        "--connect-timeout",
        "15",
        "--max-time",
        "180",
        "--output",
        fileURLToPath(dest),
        url,
      ],
      { stdio: "inherit" },
    );
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`Asset request failed: ${url}`)),
    );
  });
};
const fontRows = [
  ["shipporimincho", "ShipporiMincho-Medium.ttf"],
  ["zenkakugothicnew", "ZenKakuGothicNew-Bold.ttf"],
  ["zenkakugothicnew", "ZenKakuGothicNew-Regular.ttf"],
  ["kleeone", "KleeOne-SemiBold.ttf"],
  ["notoserifsc", "NotoSerifSC[wght].ttf"],
];
for (const [family, file] of fontRows) {
  const root = `https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/`;
  await get(
    root + encodeURIComponent(file),
    new URL(`font-originals/${file}`, work),
  );
  await get(root + "OFL.txt", new URL(`fonts/${family}-OFL.txt`, base));
  console.log(`Font ready: ${file}`);
}
