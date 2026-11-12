import React from "react";
import PageBanner from "@/src/components/PageBanner";
import FaqAccordion from "@/src/components/FaqAccordion";
import OpenDetailsOnHash from "@/src/components/OpenDetailsOnHash";

// Shared shell for policy / information pages: banner, exactly one <h1>, then <h2> sections with optional <h3> sub-sections.
export type Section = { id: string; h2: string; body: React.ReactNode };

export default function LegalPage({ slug, label, h1, updated, intro, sections, toc = true, accordion = false }: { slug: string; label: string; h1: string; updated?: string; intro: React.ReactNode; sections: Section[]; toc?: boolean; accordion?: boolean }) {
  return (
    <>
      <PageBanner slug={slug} label={label} />
      <article className="mx-auto max-w-4xl px-6 py-16 text-slate-800 md:py-24">
        <h1 className="mb-3 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">{h1}</h1>
        {updated && <p className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-600">Last updated {updated}</p>}
        <div className="mb-10 space-y-4 text-base leading-relaxed">{intro}</div>
        {toc && sections.length > 4 && (
          <nav aria-label="On this page" className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-600">On this page</p>
            <ol className="grid gap-1.5 text-sm sm:grid-cols-2">
              {sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-brand-700 underline-offset-2 hover:underline">{s.h2}</a></li>)}
            </ol>
          </nav>
        )}
        {accordion ? (
          <>
            <OpenDetailsOnHash />
            <FaqAccordion items={sections.map((s) => ({ id: s.id, q: s.h2, a: <div className="space-y-4">{s.body}</div> }))} />
          </>
        ) : sections.map((s) => (
          <section key={s.id} id={s.id} className="mb-10 scroll-mt-28">
            <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-black tracking-tight text-slate-900">{s.h2}</h2>
            <div className="space-y-4 leading-relaxed [&_a]:text-brand-700 [&_a]:underline [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-black [&_h3]:text-slate-900 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-1.5">{s.body}</div>
          </section>
        ))}
      </article>
    </>
  );
}
