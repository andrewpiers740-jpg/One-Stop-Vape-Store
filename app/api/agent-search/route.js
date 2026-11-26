import { search } from "@/lib/search";
import { ALL_POSTS } from "@/src/lib/blog";
import { productHref } from "@/lib/catUrls";
import { SITE } from "@/src/config/site";

// Agent search: GET /.well-known/search?q={query} (rewritten here in next.config.ts). Returns ranked results as Markdown so an agent
// can search the whole catalog and the guides without crawling. Read-only; nothing is created or charged.
const D = `https://${SITE.domain}`;
const money = (n) => `$${Number(n).toFixed(2)}`;
const oneLine = (s, n = 140) => String(s || "").replace(/\s+/g, " ").trim().slice(0, n);

function guides(q, limit) {
  const words = q.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2);
  if (!words.length) return [];
  return ALL_POSTS
    .map((p) => {
      const hay = `${p.title} ${p.summary} ${(p.keywords || []).join(" ")} ${(p.tags || []).join(" ")}`.toLowerCase();
      const score = words.reduce((s, w) => s + (hay.includes(w) ? (p.title.toLowerCase().includes(w) ? 3 : 1) : 0), 0);
      return { p, score };
    })
    .filter((x) => x.score >= Math.max(2, Math.ceil(words.length * 0.6)))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export async function GET(request) {
  const sp = new URL(request.url).searchParams;
  const q = oneLine(sp.get("q") || "", 120);
  const limit = Math.max(1, Math.min(25, parseInt(sp.get("limit") || "10", 10) || 10));
  let md;
  if (!q) {
    md = `# Search results for: (no query)\n\nSend a query to search ${SITE.name}: \`GET ${D}/.well-known/search?q={query}\`, for example \`${D}/.well-known/search?q=geek+bar+flavors\`.\n\nResults are Markdown links to product pages and guides. Optional parameter: \`limit\` (1 to 25, default 10).\n\nFull site summary: ${D}/llms.txt\n`;
  } else {
    const r = search({ q });
    const prods = r.products.slice(0, limit);
    const posts = guides(q, 5);
    const lines = [`# Search results for: ${q}`, ""];
    lines.push(`${r.total} matching product${r.total === 1 ? "" : "s"} and ${posts.length} guide${posts.length === 1 ? "" : "s"} on ${SITE.name}${r.partial ? " (closest matches; not every word matched)" : ""}. Showing up to ${limit} products. Prices in USD. Adults 21+ only.`, "");
    if (prods.length) {
      lines.push("## Products", "");
      prods.forEach((p, i) => {
        const bits = [p.brand, money(p.price), p.nicotine ? String(p.nicotine).replace(/\s*\(.*\)/, "") : "", p.packSize ? String(p.packSize) : ""].filter(Boolean);
        lines.push(`${i + 1}. [${oneLine(p.title, 110)}](${D}${productHref(p)}): ${bits.join(", ")}`);
      });
      lines.push("");
    }
    if (posts.length) {
      lines.push("## Guides", "");
      for (const p of posts) lines.push(`- [${oneLine(p.title, 110)}](${D}/blog/${p.slug}/): ${oneLine(p.summary, 150)}`);
      lines.push("");
    }
    if (!prods.length && !posts.length) lines.push("No matches. Try fewer or simpler words, a brand name, or a product type such as disposable, vape juice, nicotine pouches, pods or coils.", "");
    lines.push("---", `Browse all categories: ${D}/shop/ . Site summary for agents: ${D}/llms.txt . Orders are completed by a human at checkout.`);
    md = lines.join("\n") + "\n";
  }
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Accept-Query": "application/x-www-form-urlencoded",
      "x-markdown-tokens": String(Math.ceil(md.length / 4)),
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
