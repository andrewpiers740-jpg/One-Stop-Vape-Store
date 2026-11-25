// lib/social.js — Open Graph + Twitter card metadata that always carries a page-specific title/description and an image.
// Next replaces (does not merge) a page's `openGraph`, so every page that sets its own must repeat siteName, locale, type and images.
import { SITE } from "@/src/config/site";

export const OG_IMAGE = { url: `https://${SITE.domain}/brand/og-default.jpg`, width: 1200, height: 630, alt: SITE.name };

/** @param {{ title?: string, description?: string, url?: string, image?: { url: string, width?: number, height?: number, alt?: string }, type?: "website" | "article" }} o */
export function social({ title, description, url, image, type = "website" }) {
  const img = image || OG_IMAGE;
  return {
    openGraph: { title, description, url, siteName: SITE.name, locale: "en_US", type, images: [img] },
    twitter: { card: "summary_large_image", title, description, images: [img.url] },
  };
}

// Wraps a static page's `metadata` object: keeps it as is and adds matching og:* / twitter:* tags (title, description, canonical url, default image).
/** @param {any} meta */
export function withSocial(meta) {
  const title = typeof meta.title === "string" ? meta.title : meta.title?.absolute || meta.title?.default || SITE.name;
  const url = meta.alternates?.canonical;
  return { ...meta, ...social({ title, description: meta.description, url }) };
}
