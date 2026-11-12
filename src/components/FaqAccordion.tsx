import React from "react";
import { ChevronDown } from "lucide-react";

// Collapsible FAQ list used on every page that has one. Native <details>/<summary>: answers stay in the HTML
// (good for search and AI crawlers), are hidden until the question is tapped, and work without JavaScript.
export type FaqItem = { q: string; a: React.ReactNode; id?: string };

export const faqSummaryCls =
  "flex w-full cursor-pointer list-none items-start justify-between gap-4 p-5 text-left marker:hidden [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 md:p-6";

export default function FaqAccordion({ items, numbered = false, className = "" }: { items: FaqItem[]; numbered?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, i) => (
        <details key={item.id || item.q} id={item.id} className="group scroll-mt-28 rounded-2xl border border-slate-200 bg-white transition-colors open:border-emerald-500/40 open:bg-slate-50 hover:border-emerald-500/30">
          <summary className={faqSummaryCls}>
            <h3 className="flex items-start gap-3 text-base font-bold leading-snug text-slate-900">
              {numbered && <span className="mt-0.5 shrink-0 font-mono text-xs text-emerald-600">{String(i + 1).padStart(2, "0")}.</span>}
              <span>{item.q}</span>
            </h3>
            <ChevronDown size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-600 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none" />
          </summary>
          <div className={`px-5 pb-5 text-sm leading-relaxed text-slate-700 md:px-6 md:pb-6 ${numbered ? "md:pl-[3.25rem]" : ""} [&_a]:text-emerald-700 [&_a]:underline [&_p+p]:mt-3 [&_ul]:ml-5 [&_ul]:list-disc`}>{typeof item.a === "string" ? <p>{item.a}</p> : item.a}</div>
        </details>
      ))}
    </div>
  );
}
