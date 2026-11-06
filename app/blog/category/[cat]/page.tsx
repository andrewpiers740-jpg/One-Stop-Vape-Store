import React from "react";
import { notFound } from "next/navigation";
import { SITE } from "@/src/config/site";
import PageBanner from "@/src/components/PageBanner";
import BlogList from "@/src/components/blog/BlogList";
import { ALL_POSTS, CATEGORIES } from "@/src/lib/blog";

export const dynamicParams = false;
export const generateStaticParams = () => CATEGORIES.map((c) => ({ cat: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const c = CATEGORIES.find((x) => x.slug === cat);
  if (!c) return {};
  return {
    title: `${c.name} Articles | ${SITE.name} Blog`,
    description: `${c.count} ${c.name.toLowerCase()} articles from ${SITE.name}: practical guides for adult vapers.`,
    alternates: { canonical: `https://${SITE.domain}/blog/category/${c.slug}/` },
  };
}

export default async function BlogCategory({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const c = CATEGORIES.find((x) => x.slug === cat);
  if (!c) notFound();
  const posts = ALL_POSTS.filter((p) => p.categorySlug === cat);
  return (
    <>
      <PageBanner slug="blog" label={`Blog · ${c.name}`} />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-12 text-slate-900 md:py-20">
        <header className="flex max-w-3xl flex-col gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Category</span>
          <h1 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">{c.name}</h1>
          <p className="text-slate-600">{c.count} articles</p>
        </header>
        <BlogList posts={posts} activeCategory={cat} page={1} pages={1} basePath={`/blog/category/${cat}/`} />
      </div>
    </>
  );
}
