// lib/htmlToMarkdown.js — small, dependency-free HTML to Markdown converter for Next-rendered pages.
// Keeps headings, paragraphs, links (made absolute), emphasis, lists, tables and image alt text; drops scripts, styles, forms and buttons.

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "-", mdash: "-", hellip: "...", rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', times: "x" };
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => (n.toLowerCase() in ENTITIES ? ENTITIES[n.toLowerCase()] : m));

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? decode(m[2] ?? m[3] ?? "") : "";
};
const plain = (s) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

export function htmlToMarkdown(html, base) {
  const abs = (u) => {
    if (!u || u.startsWith("#") || /^(mailto|tel|javascript):/i.test(u)) return u;
    try { return new URL(u, base).toString(); } catch { return u; }
  };
  let h = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|noscript|svg|template|iframe|form|button|select|textarea|dialog)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<input\b[^>]*>/gi, "");
  // links first: the link text is the visible text, or the alt text of an image inside it
  h = h.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_, a, inner) => {
    const href = abs(attr(`<a ${a}>`, "href"));
    const withAlt = inner.replace(/<img\b[^>]*>/gi, (t) => ` ${attr(t, "alt")} `);
    const text = plain(withAlt) || attr(`<a ${a}>`, "aria-label");
    if (!href || !text) return text ? ` ${text} ` : "";
    return ` [${text.replace(/[\[\]]/g, "")}](${href}) `;
  });
  h = h.replace(/<img\b[^>]*>/gi, (t) => {
    const alt = attr(t, "alt");
    const src = abs(attr(t, "src"));
    return alt && src && !src.startsWith("data:") ? ` ![${alt.replace(/[\[\]]/g, "")}](${src}) ` : alt ? ` ${alt} ` : "";
  });
  h = h.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => (plain(t) ? `**${plain(t)}**` : ""));
  h = h.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => (plain(t) ? `*${plain(t)}*` : ""));
  h = h.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => `\n\n${"#".repeat(+n)} ${plain(t)}\n\n`);
  h = h.replace(/<li\b[^>]*>/gi, "\n- ").replace(/<\/(ul|ol)>/gi, "\n").replace(/<(ul|ol)\b[^>]*>/gi, "\n");
  h = h.replace(/<tr\b[^>]*>/gi, "\n| ").replace(/<\/(td|th)>/gi, " | ").replace(/<\/tr>/gi, "\n");
  h = h.replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|div|section|article|header|footer|main|aside|details|summary|figure|figcaption|table|thead|tbody|blockquote)>/gi, "\n\n");
  h = decode(h.replace(/<[^>]+>/g, " "));
  return h
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\| \|/g, "|")
    .trim();
}

// the page's own content: <main> if present, else <body>
export function mainHtml(html) {
  const m = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/i);
  if (m) return m[1];
  const b = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i);
  return b ? b[1] : html;
}

export function pageMeta(html) {
  const title = plain((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "");
  const description = attr((html.match(/<meta\b[^>]*name="description"[^>]*>/i) || [""])[0], "content");
  const canonical = attr((html.match(/<link\b[^>]*rel="canonical"[^>]*>/i) || [""])[0], "href");
  return { title, description, canonical };
}
