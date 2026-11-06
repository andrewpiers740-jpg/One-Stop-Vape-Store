import type { MetadataRoute } from "next";
import products from "@/src/data/products.json";
import { SITE, CATEGORIES } from "@/src/config/site";
import { ALL_POSTS, CATEGORIES as BLOG_CATEGORIES, pageCount } from "@/src/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${SITE.domain}`;

  const pages: MetadataRoute.Sitemap = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/wholesale",
    "/faq",
    "/search",
    "/terms",
    "/privacy",
    "/california-privacy",
    "/pact-act",
    "/shipping",
    "/fda-disclaimer",
    "/refunds",
    "/help",
    "/blog",
  ].map((url) => ({
    url: `${baseUrl}${url}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: url === "" ? 1 : 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat: any) => ({
    url: `${baseUrl}/shop/${cat.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((prod: any) => ({
    url: `${baseUrl}/shop/${prod.category}/${prod.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const blogPosts: MetadataRoute.Sitemap = ALL_POSTS.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}/`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    images: p.images.map((i) => `${baseUrl}${i.src}`),
  }));
  const blogIndexes: MetadataRoute.Sitemap = [
    ...Array.from({ length: pageCount() - 1 }, (_, i) => `${baseUrl}/blog/page/${i + 2}/`),
    ...BLOG_CATEGORIES.map((c) => `${baseUrl}/blog/category/${c.slug}/`),
  ].map((url) => ({ url, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4 }));

  return [...pages, ...categoryPages, ...productPages, ...blogPosts, ...blogIndexes];
}
