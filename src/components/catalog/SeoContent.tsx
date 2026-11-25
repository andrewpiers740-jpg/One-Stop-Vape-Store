import React from "react";
import Link from "next/link";
import FaqAccordion from "@/src/components/FaqAccordion";
import { SITE } from "@/src/config/site";
import { SEO_UPDATED } from "@/lib/seo";

export type SeoCopy = {
  sections: { h2: string; p: string[]; links?: { label: string; href: string }[] }[];
  faqs: { q: string; a: string }[];
  tags?: string[];
  alt?: string;
};

// Answer-first sections and an FAQ under the product grid of a listing page. FAQ JSON-LD mirrors the visible FAQ.
export default function SeoContent({ copy, path }: { copy: SeoCopy; path: string }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `https://${SITE.domain}${path}`,
    dateModified: SEO_UPDATED,
    mainEntity: copy.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section aria-label="Buying guide" className="border-t border-slate-200 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="mx-auto max-w-4xl px-4 py-10 text-slate-900 sm:px-6 md:py-14">
        {copy.sections.map((s) => (
          <div key={s.h2} className="mb-8">
            <h2 className="mb-3 text-xl font-black tracking-tight md:text-2xl">{s.h2}</h2>
            {s.p.map((t, i) => <p key={i} className="mb-3 text-sm leading-relaxed text-slate-700 md:text-base">{t}</p>)}
            {s.links && (
              <p className="text-sm font-bold">
                {s.links.map((l, i) => <React.Fragment key={l.href}>{i > 0 && " · "}<Link href={l.href} className="text-emerald-700 underline">{l.label}</Link></React.Fragment>)}
              </p>
            )}
          </div>
        ))}
        <h2 className="mb-4 text-xl font-black tracking-tight md:text-2xl">Frequently asked questions</h2>
        <FaqAccordion items={copy.faqs.map((f) => ({ q: f.q, a: f.a }))} />
        {copy.tags && copy.tags.length > 0 && (
          <ul aria-label="Tags" className="mt-8 flex flex-wrap gap-2">
            {copy.tags.map((t) => <li key={t} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">{t}</li>)}
          </ul>
        )}
        <p className="mt-8 text-xs text-slate-500">Last updated: <time dateTime={SEO_UPDATED}>{SEO_UPDATED}</time></p>
      </div>
    </section>
  );
}
