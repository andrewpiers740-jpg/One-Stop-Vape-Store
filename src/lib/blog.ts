// src/lib/blog.ts — loader + helpers for the 200-post blog (data built by scripts/build-blog.mjs).
import posts from "@/src/data/blog-posts.json";
import products from "@/src/data/products.json";

export type BlogImage = { src: string; alt: string; w: number; h: number; by?: string; byUrl?: string; page?: string };
export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  categorySlug: string;
  tags: string[];
  date: string; // ISO yyyy-mm-dd
  readMinutes: number;
  body: string;
  faq: { q: string; a: string }[];
  shop: string[]; // shop category slugs this post relates to
  keywords: string[]; // product-matching keywords
  images: BlogImage[]; // [thumbnail/hero, inline1, inline2, inline3]
};

export const ALL_POSTS: BlogPost[] = (posts as BlogPost[]).slice().sort((a, b) => (a.date < b.date ? 1 : -1));
export const PAGE_SIZE = 12;

export const getPost = (slug: string) => ALL_POSTS.find((p) => p.slug === slug) || null;

export const CATEGORIES = Array.from(
  ALL_POSTS.reduce((m, p) => m.set(p.categorySlug, { slug: p.categorySlug, name: p.category, count: (m.get(p.categorySlug)?.count || 0) + 1 }), new Map<string, { slug: string; name: string; count: number }>()).values()
).sort((a, b) => a.name.localeCompare(b.name));

export const pageCount = (n = ALL_POSTS.length) => Math.max(1, Math.ceil(n / PAGE_SIZE));
export const pageOf = (n: number) => ALL_POSTS.slice((n - 1) * PAGE_SIZE, n * PAGE_SIZE);

export function relatedPosts(post: BlogPost, n = 4): BlogPost[] {
  const score = (p: BlogPost) => p.tags.filter((t) => post.tags.includes(t)).length * 2 + (p.categorySlug === post.categorySlug ? 1 : 0);
  return ALL_POSTS.filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, s: score(p) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, n)
    .map((x) => x.p);
}

type Product = { slug: string; title: string; brand: string; category: string; price: number; priceDisplay: string; image: string };
const PRODUCTS = products as unknown as Product[];

// Products to feature at the end of a post: keyword hits in title/brand first, then top items of the related category.
export function relatedProducts(post: BlogPost, n = 4): Product[] {
  const picked: Product[] = [];
  const seen = new Set<string>();
  const add = (p: Product) => { if (!seen.has(p.slug) && picked.length < n) { seen.add(p.slug); picked.push(p); } };
  for (const kw of post.keywords) {
    const k = kw.toLowerCase();
    for (const p of PRODUCTS) if (p.title.toLowerCase().includes(k) || p.brand.toLowerCase() === k) add(p);
    if (picked.length >= n) break;
  }
  for (const cat of post.shop) for (const p of PRODUCTS) if (p.category === cat) add(p);
  return picked;
}
