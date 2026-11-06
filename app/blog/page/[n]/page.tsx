import React from "react";
import { notFound } from "next/navigation";
import { SITE } from "@/src/config/site";
import PageBanner from "@/src/components/PageBanner";
import BlogList from "@/src/components/blog/BlogList";
import { pageOf, pageCount } from "@/src/lib/blog";

export const dynamicParams = false;
export function generateStaticParams() {
  return Array.from({ length: Math.max(0, pageCount() - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  return {
    title: `Blog – Page ${n} | ${SITE.name}`,
    description: `Page ${n} of the ${SITE.name} blog: vape guides, reviews, payment and shipping how-tos.`,
    alternates: { canonical: `https://${SITE.domain}/blog/page/${n}/` },
  };
}

export default async function BlogPageN({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const page = Number(n);
  if (!Number.isInteger(page) || page < 2 || page > pageCount()) notFound();
  return (
    <>
      <PageBanner slug="blog" label={`Blog · Page ${page}`} />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-12 text-slate-900 md:py-20">
        <h1 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-5xl">Blog — page {page}</h1>
        <BlogList posts={pageOf(page)} page={page} pages={pageCount()} basePath="/blog/" />
      </div>
    </>
  );
}
