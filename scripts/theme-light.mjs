// scripts/theme-light.mjs — one-off converter: dark utility classes -> clean white theme (slate neutrals, brand blue accents).
// Skips the admin portal and components that sit on photographs (hero, page banner). Idempotent enough to re-run.
import fs from "node:fs";
import path from "node:path";

const SKIP_DIRS = ["app/admin", "src/components/admin"];
const SKIP_FILES = ["src/components/HeroShowcase.tsx", "src/components/PageBanner.tsx", "src/components/AgeGateModal.jsx"];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name).replace(/\\/g, "/");
    if (e.isDirectory()) { if (!SKIP_DIRS.includes(p)) walk(p, out); }
    else if (/\.(tsx|jsx)$/.test(p) && !SKIP_FILES.includes(p)) out.push(p);
  }
  return out;
}

const MAP = [
  [/^bg-black$/, "bg-white"], [/^bg-zinc-950$/, "bg-slate-50"], [/^bg-zinc-950\/(\d+)$/, "bg-slate-50/$1"],
  [/^bg-zinc-900$/, "bg-slate-100"], [/^bg-zinc-900\/(\d+)$/, "bg-slate-100/$1"], [/^bg-zinc-800$/, "bg-slate-200"], [/^bg-zinc-800\/(\d+)$/, "bg-slate-200/$1"],
  [/^hover:bg-zinc-800$/, "hover:bg-slate-200"], [/^hover:bg-zinc-900$/, "hover:bg-slate-100"], [/^hover:bg-zinc-700$/, "hover:bg-slate-300"],
  [/^text-zinc-(200|300)$/, "text-slate-700"], [/^text-zinc-400$/, "text-slate-600"], [/^text-zinc-500$/, "text-slate-500"], [/^text-zinc-(600|700)$/, "text-slate-400"],
  [/^hover:text-zinc-(\d+)$/, "hover:text-slate-900"], [/^group-hover:text-zinc-\d+$/, "group-hover:text-slate-900"],
  [/^border-zinc-(700)$/, "border-slate-300"], [/^border-zinc-(800|900)$/, "border-slate-200"], [/^border-zinc-(800|900)\/(\d+)$/, "border-slate-200/$2"],
  [/^divide-zinc-\d+$/, "divide-slate-200"], [/^placeholder-zinc-\d+$/, "placeholder-slate-400"], [/^placeholder:text-zinc-\d+$/, "placeholder:text-slate-400"],
  [/^hover:border-zinc-\d+$/, "hover:border-slate-400"], [/^ring-zinc-\d+$/, "ring-slate-200"],
  [/^text-emerald-(300|400)$/, "text-emerald-600"], [/^text-emerald-500$/, "text-emerald-600"],
  [/^hover:text-emerald-(300|400|500)$/, "hover:text-emerald-700"], [/^group-hover:text-emerald-(300|400|500)$/, "group-hover:text-emerald-700"],
  [/^via-black$/, "via-white"], [/^to-black$/, "to-white"],
  [/^prose-invert$/, ""],
];
const KEEP_WHITE = /bg-(emerald|red|amber|blue|green)-[3-9]00(?![\/\w])|bg-black\/|from-black|bg-gradient-to-[a-z]+ from-(emerald|brand)|bg-emerald-\d00\/?(?!\d)/;

function convertClassString(s) {
  const keepWhite = KEEP_WHITE.test(s) || /\bbg-(emerald|red)-[3-9]00\b(?!\/)/.test(s);
  return s.replace(/[^\s"'`${}]+/g, (tok) => {
    const m = tok.match(/^((?:[a-z-]+:)*)(.+)$/);
    const prefix = m[1] || "";
    const core = m[2];
    if (core === "text-white") return keepWhite ? tok : prefix + "text-slate-900";
    if (core === "hover:text-white") return tok;
    if (/^text-white$/.test(core)) return tok;
    for (const [re, rep] of MAP) if (re.test(core)) return prefix + core.replace(re, rep);
    if (prefix && core === "text-white") return keepWhite ? tok : prefix + "text-slate-900";
    return tok;
  });
}

let files = 0, changed = 0;
for (const f of walk("app").concat(walk("src/components"))) {
  const src = fs.readFileSync(f, "utf8");
  const out = src.replace(/(["'`])((?:\\.|(?!\1)[^\\\n])*)\1/g, (full, q, body) => {
    if (!/(^|\s)(bg|text|border|divide|placeholder|hover|group-hover|via|to|prose)[-:]/.test(body)) return full;
    return q + convertClassString(body) + q;
  });
  files++;
  if (out !== src) { fs.writeFileSync(f, out); changed++; }
}
console.log(`processed ${files} files, changed ${changed}`);
