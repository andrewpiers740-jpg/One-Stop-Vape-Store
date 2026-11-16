import type { MetadataRoute } from "next";
import products from "@/src/data/products.json";
import { SITE, CATEGORIES } from "@/src/config/site";
import { allCollections, brands, hrefOf, brandHref, pagePath, pageCount as listingPages } from "@/lib/collections";
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

  // indexable collection, brand and pagination pages
  const listing = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority });
  const collectionPages: MetadataRoute.Sitemap = [
    listing("/brands/", 0.6),
    ...allCollections.filter((c) => c.kind !== "all" || listingPages(c.products.length) > 1).flatMap((c) =>
      Array.from({ length: listingPages(c.products.length) }, (_, i) => i + 1)
        .filter((n) => !(c.kind === "all" && n === 1))
        .map((n) => listing(pagePath(hrefOf(c), n), n === 1 ? 0.6 : 0.4)),
    ),
    ...brands.flatMap((b) => Array.from({ length: listingPages(b.count) }, (_, i) => i + 1).map((n) => listing(pagePath(brandHref(b.slug), n), n === 1 ? 0.6 : 0.4))),
  ];

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

  return [...pages, ...categoryPages, ...collectionPages, ...productPages, ...blogPosts, ...blogIndexes];
}
