import { notFound, redirect } from "next/navigation";
import CatalogListing from "@/src/components/catalog/CatalogListing";
import { SITE } from "@/src/config/site";
import { seoEntry, seoTitle, seoMeta, seoH1, listingCopy, factsFor } from "@/lib/seo";
import { keywordsString } from "@/lib/seoPages";
import { catUrl, catKeyOf, collUrl, collKeyOf } from "@/lib/urlmap";
import { allCollections, getCollection, hrefOf, catHref, pagePath, pageSlice, pageCount, parsePage, allPageParams, describeSet, facetsFor, collectionsOf } from "@/lib/collections";
import { social } from "@/lib/social";

// Indexable collection pages: /collections/<category>/<collection>/ (+ /page/N/).
export const dynamicParams = false;

export function generateStaticParams() {
  return allCollections.flatMap((c) => allPageParams(c.products.length).map((page) => ({ category: catUrl(c.category), collection: collUrl(c.category, c.slug), page })));
}

type Params = { category: string; collection: string; page?: string[] };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { category: catParam, collection: collParam, page } = await params;
  const category = catKeyOf(catParam);
  const collection = collKeyOf(category, collParam);
  const c = getCollection(category, collection);
  const n = parsePage(page);
  if (!c || !n) return {};
  const d = describeSet(c.label, c.products, c.category === "all" ? "" : (c.label.startsWith("All ") ? "" : ""));
  const canonical = `https://${SITE.domain}${pagePath(hrefOf(c), n)}`;
  const e = n === 1 ? seoEntry(hrefOf(c)) : null;
  const t = e ? seoTitle(e, "") : `${c.label}${n > 1 ? ` – Page ${n}` : ""} | ${SITE.name}`;
  const desc = e ? seoMeta(e, factsFor(c.products), d.meta) : d.meta;
  return { title: t, description: desc, keywords: e ? keywordsString(e) : undefined, alternates: { canonical }, ...social({ title: t, description: desc, url: canonical }) };
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { category: catParam, collection: collParam, page } = await params;
  const category = catKeyOf(catParam);
  const collection = collKeyOf(category, collParam);
  const c = getCollection(category, collection);
  const n = parsePage(page);
  if (!c || !n) notFound();
  // the "all" collection's first page lives at the category page itself
  if (c.kind === "all" && n === 1) redirect(catHref(c.category));
  const pages = pageCount(c.products.length);
  if (n > pages) notFound();
  const catLabel = c.category === "all" ? "Shop" : c.category.replace(/-/g, " ");
  const d = describeSet(c.label, c.products, c.category === "all" ? "" : "");
  const base = hrefOf(c);
  const e = n === 1 ? seoEntry(base) : null;
  const seo = listingCopy({ e, label: c.label, kind: "collection", items: c.products });
  const siblings = c.category === "all"
    ? []
    : [...collectionsOf(c.category, "type"), ...collectionsOf(c.category, "strength"), ...collectionsOf(c.category, "flavor").slice(0, 6), ...collectionsOf(c.category, "price")].filter((x) => x.slug !== c.slug).slice(0, 10);
  return (
    <CatalogListing
      bannerSlug={c.category === "all" ? "shop" : c.category}
      bannerLabel={c.label}
      crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop/" }, ...(c.category !== "all" ? [{ label: catLabel.replace(/\b\w/g, (x: string) => x.toUpperCase()), href: catHref(c.category) }] : []), { label: c.label }]}
      h1={seoH1(e, c.label)}
      seo={seo}
      intro={d.intro}
      total={c.products.length}
      products={pageSlice(c.products, n)}
      base={base}
      first={c.kind === "all" ? catHref(c.category) : undefined}
      page={n}
      pages={pages}
      groups={facetsFor(c.category)}
      current={base}
      clearHref={catHref(c.category)}
      chips={siblings.map((x) => ({ label: x.label, href: hrefOf(x) }))}
      path={pagePath(base, n)}
    />
  );
}
