import { notFound } from "next/navigation";
import CatalogListing from "@/src/components/catalog/CatalogListing";
import { CATEGORIES, SITE } from "@/src/config/site";
import { seoEntry, seoTitle, seoMeta, seoH1, listingCopy, factsFor } from "@/lib/seo";
import { keywordsString } from "@/lib/seoPages";
import { catUrl, catKeyOf } from "@/lib/urlmap";
import { getCollection, hrefOf, catHref, pageSlice, pageCount, describeSet, facetsFor, collectionsOf, brands, brandHref } from "@/lib/collections";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: catUrl(c.slug) }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: urlSlug } = await params;
  const slug = catKeyOf(urlSlug);
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  const all = getCollection(slug, "all");
  const d = describeSet(category.name, all?.products || [], "");
  const e = seoEntry(catHref(slug));
  const title = seoTitle(e, `${category.name} | ${SITE.name}`);
  const description = seoMeta(e, factsFor(all?.products || []), d.meta);
  return { title, description, keywords: e ? keywordsString(e) : undefined, alternates: { canonical: `https://${SITE.domain}${catHref(slug)}` }, openGraph: { title, description, url: `https://${SITE.domain}${catHref(slug)}` } };
}

// Category page: first page of the category with the faceted sidebar. Every facet is a link to an indexable page.
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: urlSlug } = await params;
  const slug = catKeyOf(urlSlug);
  const category = CATEGORIES.find((c) => c.slug === slug);
  const all = getCollection(slug, "all");
  if (!category || !all) notFound();
  const d = describeSet(category.name, all.products, "");
  const e = seoEntry(catHref(slug));
  const seo = listingCopy({ e, label: category.name, kind: "category", items: all.products });
  const quick = [...collectionsOf(slug, "type"), ...collectionsOf(slug, "strength"), ...collectionsOf(slug, "flavor").slice(0, 5), ...collectionsOf(slug, "price")];
  const topBrands = brands.filter((b) => b.cats[slug]).slice(0, 8).map((b) => ({ label: b.label, href: brandHref(b.slug) }));
  return (
    <CatalogListing
      bannerSlug={slug}
      bannerLabel={category.name}
      crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop/" }, { label: category.name }]}
      h1={seoH1(e, category.name)}
      seo={seo}
      intro={`${category.description} ${d.intro}`}
      total={all.products.length}
      products={pageSlice(all.products, 1)}
      base={hrefOf(all)}
      first={catHref(slug)}
      page={1}
      pages={pageCount(all.products.length)}
      groups={facetsFor(slug)}
      current={catHref(slug)}
      chips={[...quick.map((x) => ({ label: x.label, href: hrefOf(x) })), ...topBrands]}
      path={catHref(slug)}
    />
  );
}
