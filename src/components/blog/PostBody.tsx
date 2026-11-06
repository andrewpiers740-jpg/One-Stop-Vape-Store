import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogImage } from "@/src/lib/blog";

// Renders the markdown-lite body: "## " headings, "- " bullets, "1. " numbered lists, **bold**, *italic*, [text](/link/).
// Inline images (images[1..3]) are placed after the 1st, 2nd and 3rd section so they break up the article.
function inline(text: string, key: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={`${key}b${i}`} className="font-bold text-slate-900">{t.slice(2, -2)}</strong>);
    else if (t.startsWith("[")) {
      const mm = t.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
      const external = /^https?:/.test(mm[2]);
      out.push(external
        ? <a key={`${key}l${i}`} href={mm[2]} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 underline underline-offset-2 hover:text-emerald-600">{mm[1]}</a>
        : <Link key={`${key}l${i}`} href={mm[2]} className="font-semibold text-emerald-600 underline underline-offset-2 hover:text-emerald-600">{mm[1]}</Link>);
    } else out.push(<em key={`${key}i${i}`}>{t.slice(1, -1)}</em>);
    last = m.index + t.length;
    i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Figure({ img }: { img: BlogImage }) {
  return (
    <figure className="my-10 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <Image src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" sizes="(min-width:896px) 896px, 100vw" className="aspect-[3/2] w-full object-cover" />
      {img.by && (
        <figcaption className="px-4 py-2 text-[11px] text-slate-500">
          Photo by <a href={`${img.byUrl}?utm_source=one_stop_vape_store&utm_medium=referral`} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">{img.by}</a> on{" "}
          <a href="https://unsplash.com/?utm_source=one_stop_vape_store&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">Unsplash</a>
        </figcaption>
      )}
    </figure>
  );
}

type Block = { t: "h2" | "h3" | "ul" | "ol" | "p"; lines: string[] };

// Groups the markdown-lite text line by line, so a heading directly followed by a paragraph (no blank line) or a
// paragraph directly followed by a list both render as separate elements.
function parse(text: string): Block[] {
  const blocks: Block[] = [];
  let cur: Block | null = null;
  const flush = () => { if (cur) blocks.push(cur); cur = null; };
  for (const raw of text.split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) { flush(); continue; }
    if (line.startsWith("## ")) { flush(); blocks.push({ t: "h2", lines: [line.slice(3)] }); continue; }
    if (line.startsWith("### ")) { flush(); blocks.push({ t: "h3", lines: [line.slice(4)] }); continue; }
    const kind = /^- /.test(line) ? "ul" : /^\d+\. /.test(line) ? "ol" : "p";
    if (cur && cur.t === kind) cur.lines.push(line);
    else { flush(); cur = { t: kind, lines: [line] }; }
  }
  flush();
  return blocks;
}

export default function PostBody({ body, inlineImages }: { body: string; inlineImages: BlogImage[] }) {
  const nodes: React.ReactNode[] = [];
  let h2 = 0;
  parse(body).forEach((b, idx) => {
    const k = "b" + idx;
    if (b.t === "h2") {
      // place the previous section's image right before the next heading
      if (h2 >= 1 && inlineImages[h2 - 1]) nodes.push(<Figure key={"fig" + h2} img={inlineImages[h2 - 1]} />);
      h2++;
      nodes.push(<h2 key={k} className="mb-3 mt-12 text-2xl font-black tracking-tight text-emerald-600 md:text-3xl">{b.lines[0]}</h2>);
    } else if (b.t === "h3") {
      nodes.push(<h3 key={k} className="mb-2 mt-8 text-xl font-bold text-slate-900">{b.lines[0]}</h3>);
    } else if (b.t === "ul") {
      nodes.push(<ul key={k} className="my-4 list-disc space-y-2 pl-6">{b.lines.map((l, i) => <li key={i}>{inline(l.replace(/^- /, ""), k + i)}</li>)}</ul>);
    } else if (b.t === "ol") {
      nodes.push(<ol key={k} className="my-4 list-decimal space-y-2 pl-6">{b.lines.map((l, i) => <li key={i}>{inline(l.replace(/^\d+\. /, ""), k + i)}</li>)}</ol>);
    } else {
      nodes.push(<p key={k} className="leading-relaxed">{inline(b.lines.join(" "), k)}</p>);
    }
  });
  // any remaining inline images (posts with few sections) go at the end of the body
  for (let n = Math.max(0, h2 - 1); n < inlineImages.length; n++) nodes.push(<Figure key={"figend" + n} img={inlineImages[n]} />);
  return <div className="space-y-5 text-base text-slate-700 md:text-lg">{nodes}</div>;
}
