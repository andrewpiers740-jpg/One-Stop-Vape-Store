// Node ESM resolve hook: maps the "@/..." alias (tsconfig paths) so server libs can be tested without Next.
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = process.cwd();
const exts = ["", ".js", ".mjs", ".json", ".ts", "/index.js"];

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const base = path.join(root, specifier.slice(2));
    const hit = exts.map((e) => base + e).find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
    if (hit) return next(pathToFileURL(hit).href, context);
  }
  return next(specifier, context);
}

// Allow `import data from "x.json"` (Next's bundler does this natively; plain Node needs an import attribute).
export async function load(url, context, next) {
  if (url.endsWith(".json")) {
    const text = fs.readFileSync(new URL(url), "utf8");
    return { format: "module", shortCircuit: true, source: `export default ${text};` };
  }
  return next(url, context);
}
