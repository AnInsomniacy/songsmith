import { fileURLToPath } from "node:url";
import path from "node:path";

export const root = fileURLToPath(new URL("../../", import.meta.url));
export const songPath = (title, ...parts) =>
  path.join(root, "public", "songs", title, ...parts);
