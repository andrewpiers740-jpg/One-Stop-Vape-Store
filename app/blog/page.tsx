import React from "react";
import { Metadata } from "next";
import { SITE } from "@/src/config/site";
import PageBanner from "@/src/components/PageBanner";
import BlogList from "@/src/components/blog/BlogList";
import { ALL_POSTS, pageOf, pageCount } from "@/src/lib/blog";
import { staticCopy, staticTitle, staticMeta, staticH1, keywordsString } from "@/lib/seoPages";
import { seoEntry } from "@/lib/seo";
import SeoContent from "@/src/components/catalog/SeoContent";

export const metadata: Metadata = {
  title: staticTitle("/blog/", `Vape Guides, Reviews & How-Tos | ${SITE.name} Blog`),
  description: staticMeta("/blog/", `${ALL_POSTS.length} guides on disposables, pods, e-liquid, nicotine pouches, paying with crypto or gift cards, shipping and more from ${SITE.name}.`),
  keywords: seoEntry("/blog/") ? keywordsString(seoEntry("/blog/")!) : undefined,
  alternates: { canonical: `https://${SITE.domain}/blog/` },
};

export default function BlogPage() {
  const copy = staticCopy("/blog/");
  return (
    <>
      <PageBanner slug="blog" label="Blog" alt={copy?.alt} />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-12 text-slate-900 md:py-20">
        <header className="flex max-w-3xl flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">The Educational Hub</span>
          <h1 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">{staticH1("/blog/", "Guides, how-tos & buying advice")}</h1>
          {copy && <p className="text-base font-medium leading-relaxed text-slate-900 md:text-lg">{copy.lead}</p>}
          <p className="text-base leading-relaxed text-slate-600 md:text-lg">Practical, plain-English articles for adult vapers: choosing devices and flavors, paying with crypto or gift cards, shipping and order help. Adults 21+ only.</p>
        </header>
        <BlogList posts={pageOf(1)} page={1} pages={pageCount()} basePath="/blog/" />
      {copy && <SeoContent copy={copy} path="/blog/" />}
      </div>
    </>
  );
}
