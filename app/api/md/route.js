import { htmlToMarkdown, mainHtml, pageMeta } from "@/lib/htmlToMarkdown";
import { SITE } from "@/src/config/site";

// Markdown for Agents. middleware.js sends a request here when a client's Accept header prefers text/markdown over text/html.
// This route fetches the normal HTML page from this same deployment and converts its <main> content to Markdown.
// Browsers and crawlers that ask for HTML never reach it.
const D = `https://${SITE.domain}`;
const BLOCKED = /^\/(api|admin|_next|order|cart|checkout|account|wishlist|search|thank-you)/i;
const MAX_CHARS = 150000;

const head = (md, extra = {}) => ({
  "Content-Type": "text/markdown; charset=utf-8",
  "x-markdown-tokens": String(Math.ceil(md.length / 4)),
  Vary: "Accept",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
  ...extra,
});

export async function GET(request) {
  const url = new URL(request.url);
  const path = request.headers.get("x-md-path") || url.searchParams.get("path") || "/";
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("..") || path.length > 300 || BLOCKED.test(path)) {
    const md = "# Not available as Markdown\n\nThis path has no Markdown version. Use the HTML page or search: " + D + "/.well-known/search?q={query}\n";
    return new Response(md, { status: 404, headers: head(md) });
  }
  const res = await fetch(url.origin + path, { headers: { Accept: "text/html", "User-Agent": "markdown-for-agents/1.0" }, redirect: "manual" }).catch(() => null);
  if (!res) {
    const md = "# Temporarily unavailable\n\nThe page could not be loaded. Try again shortly.\n";
    return new Response(md, { status: 502, headers: head(md, { "Cache-Control": "no-store" }) });
  }
  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get("location") || "/";
    return new Response(null, { status: res.status, headers: { Location: loc } });
  }
  if (res.status !== 200) {
    const md = `# Page not found\n\nNo page at ${path}. Search the site: ${D}/.well-known/search?q={query}\n`;
    return new Response(md, { status: res.status === 404 ? 404 : 502, headers: head(md, { "Cache-Control": "no-store" }) });
  }
  const html = await res.text();
  const meta = pageMeta(html);
  const canonical = meta.canonical || D + path;
  let body = htmlToMarkdown(mainHtml(html), D + path);
  if (body.length > MAX_CHARS) body = body.slice(0, MAX_CHARS).replace(/\n[^\n]*$/, "") + `\n\n(Truncated. Full page: ${canonical})`;
  const q = (s) => JSON.stringify(String(s || ""));
  const front = [
    "---",
    `title: ${q(meta.title)}`,
    `url: ${q(canonical)}`,
    `description: ${q(meta.description)}`,
    "agent:",
    `  endpoint: ${q(D + "/.well-known/search?q={query}")}`,
    `  instructions: ${q("Search " + SITE.name + " products and guides. Replace {query} with URL-encoded keywords. Returns ranked Markdown links. Read-only; orders are completed by a human at checkout.")}`,
    "  method: GET",
    `  documentation: ${q(D + "/llms.txt")}`,
    "---",
    "",
  ].join("\n");
  const md = front + body + "\n";
  return new Response(md, { headers: head(md, { "Content-Location": canonical }) });
}
