import FaqAccordion from "@/src/components/FaqAccordion";
import React from "react";
import ProductCard from "@/src/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Clock } from "lucide-react";
import { SITE } from "@/src/config/site";
import PageBanner from "@/src/components/PageBanner";
import PostBody from "@/src/components/blog/PostBody";
import BlogCard, { fmtDate } from "@/src/components/blog/BlogCard";
import { ALL_POSTS, getPost, relatedPosts, relatedProducts } from "@/src/lib/blog";

export const dynamicParams = false;
export const generateStaticParams = () => ALL_POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `https://${SITE.domain}/blog/${post.slug}/`;
  const img = post.images[0];
  return {
    title: `${post.title} | ${SITE.name}`,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: { title: post.title, description: post.summary, url, type: "article", publishedTime: post.date, images: img ? [{ url: `https://${SITE.domain}${img.src}`, width: img.w, height: img.h, alt: img.alt }] : [] },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const base = `https://${SITE.domain}`;
  const hero = post.images[0];
  const related = relatedPosts(post, 3);
  const prods = relatedProducts(post, 4);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image: post.images.map((i) => `${base}${i.src}`),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: `${SITE.name} Editorial`, url: `${base}/` },
    publisher: { "@type": "Organization", name: SITE.legalName, logo: { "@type": "ImageObject", url: `${base}/brand/icon-512.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${base}/blog/${post.slug}/` },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog/` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${base}/blog/${post.slug}/` },
    ],
  };

  return (
    <>
      <PageBanner slug="blog" label={post.category} />
      <article className="mx-auto max-w-4xl px-6 py-12 text-slate-900 md:py-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        <header className="mb-10 flex flex-col gap-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <Link href="/" className="hover:text-emerald-600">Home</Link><ChevronRight size={10} />
            <Link href="/blog/" className="hover:text-emerald-600">Blog</Link><ChevronRight size={10} />
            <Link href={`/blog/category/${post.categorySlug}/`} className="truncate text-slate-600 hover:text-emerald-600">{post.category}</Link>
          </nav>
          <h1 className="text-3xl font-black leading-[1.08] tracking-tighter text-slate-900 md:text-5xl">{post.title}</h1>
          <p className="border-l-4 border-emerald-500 py-1 pl-5 text-lg italic leading-relaxed text-slate-700">{post.summary}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-4 text-xs font-medium text-slate-600">
            <span className="font-bold text-emerald-600">{SITE.name} Editorial</span>
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
            <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readMinutes} min read</span>
          </div>
        </header>

        {hero && (
          <figure className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <Image src={hero.src} alt={hero.alt} width={hero.w} height={hero.h} priority sizes="(min-width:896px) 896px, 100vw" className="aspect-video w-full object-cover" />
            {hero.by && <figcaption className="px-4 py-2 text-[11px] text-slate-600">Photo by <a href={`${hero.byUrl}?utm_source=one_stop_vape_store&utm_medium=referral`} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">{hero.by}</a> on <a href="https://unsplash.com/?utm_source=one_stop_vape_store&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">Unsplash</a></figcaption>}
          </figure>
        )}

        <PostBody body={post.body} inlineImages={post.images.slice(1)} />

        {post.faq.length > 0 && (
          <section aria-labelledby="faq" className="mt-14">
            <h2 id="faq" className="mb-4 text-2xl font-black tracking-tight text-emerald-600 md:text-3xl">Frequently asked questions</h2>
            <FaqAccordion items={post.faq.map((f) => ({ q: f.q, a: f.a }))} />
          </section>
        )}

        <p className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs leading-relaxed text-slate-600">
          {SITE.compliance.disclaimer} This article is general information for adults, not medical or legal advice. Product laws differ by state and city — check the rules where you live before you buy.
        </p>

        {prods.length > 0 && (
          <section aria-labelledby="shop-related" className="mt-14">
            <h2 id="shop-related" className="mb-6 text-2xl font-black tracking-tight text-slate-900">Shop related products</h2>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {prods.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {post.shop.map((c) => (
                <Link key={c} href={`/shop/${c}/`} className="rounded-xl bg-slate-200 px-5 py-2.5 text-xs font-bold uppercase text-slate-900 hover:bg-zinc-700">Shop {c.replace(/-/g, " ")}</Link>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section aria-labelledby="more" className="mt-16">
            <h2 id="more" className="mb-6 text-2xl font-black tracking-tight text-slate-900">Keep reading</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">{related.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
          </section>
        )}
      </article>
    </>
  );
}
