import React from "react";
import { SITE } from "@/src/config/site";
import credits from "@/src/data/image-credits.json";

export const metadata = {
  title: `Photo Credits | ${SITE.name}`,
  description: `Photographers whose work appears on ${SITE.name} via Unsplash.`,
  alternates: { canonical: `https://${SITE.domain}/credits/` },
};

type Credit = { by?: string; byUrl?: string };

export default function CreditsPage() {
  const byPhotographer = new Map<string, { url?: string; n: number }>();
  for (const c of Object.values(credits as Record<string, Credit>)) {
    if (!c.by) continue;
    const cur = byPhotographer.get(c.by) || { url: c.byUrl, n: 0 };
    cur.n++;
    byPhotographer.set(c.by, cur);
  }
  const list = [...byPhotographer.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-slate-900">
      <h1 className="mb-4 text-4xl font-black uppercase tracking-tighter">Photo credits</h1>
      <p className="mb-10 text-slate-600">
        Blog, banner and category photography on {SITE.name} is provided by photographers on{" "}
        <a href="https://unsplash.com/?utm_source=one_stop_vape_store&utm_medium=referral" className="text-emerald-600 underline" target="_blank" rel="noopener noreferrer">Unsplash</a> and used under the Unsplash License. Thank you to everyone listed below.
      </p>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
        {list.map(([name, v]) => (
          <li key={name} className="flex justify-between gap-4 border-b border-slate-200 py-2">
            <a href={`${v.url}?utm_source=one_stop_vape_store&utm_medium=referral`} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-emerald-600">{name}</a>
            <span className="text-slate-400">{v.n} photo{v.n === 1 ? "" : "s"}</span>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-xs text-slate-400">Product images and brand names are the property of their respective owners.</p>
    </div>
  );
}
