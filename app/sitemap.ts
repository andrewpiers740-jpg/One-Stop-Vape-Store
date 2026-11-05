import type { MetadataRoute } from "next";
import products from "@/src/data/products.json";
import { SITE, CATEGORIES } from "@/src/config/site";

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
    "/checkout",
    "/cart",
    "/account",
  ].map((url) => ({
    url: `${baseUrl}${url}`,
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

  return [...pages, ...categoryPages, ...productPages];
}
