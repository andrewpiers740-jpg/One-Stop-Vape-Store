import { notFound } from "next/navigation";
import CatalogListing from "@/src/components/catalog/CatalogListing";
import { CATEGORIES, SITE } from "@/src/config/site";
import { brands, brandBySlug, brandProducts, brandHref, hrefOf, pagePath, pageSlice, pageCount, parsePage, allPageParams, describeSet, facetsFor, getCollection } from "@/lib/collections";

// One indexable page per brand across every category: /brands/<brand>/ (+ /page/N/).
export const dynamicParams = false;

export function generateStaticParams() {
  return brands.flatMap((b) => allPageParams(b.count).map((page) => ({ brand: b.slug, page })));
}

type Params = { brand: string; page?: string[] };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { brand, page } = await params;
  const b = brandBySlug[brand];
  const n = parsePage(page);
  if (!b || !n) return {};
  const d = describeSet(`${b.label} vapes and products`, brandProducts(b.slug), "");
  const canonical = `https://${SITE.domain}${pagePath(brandHref(b.slug), n)}`;
  const t = `${b.label} Vapes & Products${n > 1 ? ` – Page ${n}` : ""} | ${SITE.name}`;
  return { title: t, description: d.meta, alternates: { canonical }, openGraph: { title: t, description: d.meta, url: canonical } };
}

export default async function BrandPage({ params }: { params: Promise<Params> }) {
  const { brand, page } = await params;
  const b = brandBySlug[brand];
  const n = parsePage(page);
  if (!b || !n) notFound();
  const list = brandProducts(b.slug);
  const pages = pageCount(list.length);
  if (n > pages) notFound();
  const base = brandHref(b.slug);
  const d = describeSet(`${b.label} vapes and products`, list, "");
  const catItems = CATEGORIES.filter((c) => b.cats[c.slug]).map((c) => {
    const col = getCollection(c.slug, b.slug);
    return { label: c.name, href: col ? hrefOf(col) : base, count: b.cats[c.slug] };
  });
  const groups = [
    { key: "cats", title: `${b.label} by category`, items: catItems },
    ...facetsFor("all").filter((g) => g.key === "brand").map((g) => ({ ...g, title: "Other brands" })),
  ];
  const main = CATEGORIES.find((c) => c.slug === (Object.entries(b.cats) as [string, number][]).sort((x, y) => y[1] - x[1])[0][0]);
  return (
    <CatalogListing
      bannerSlug={main?.slug || "shop"}
      bannerLabel={b.label}
      crumbs={[{ label: "Home", href: "/" }, { label: "Brands", href: "/brands/" }, { label: b.label }]}
      h1={`${b.label} Vapes & Products`}
      intro={d.intro}
      total={list.length}
      products={pageSlice(list, n)}
      base={base}
      page={n}
      pages={pages}
      groups={groups}
      current={base}
      clearHref="/brands/"
      chips={catItems.map((c) => ({ label: `${b.label} ${c.label}`, href: c.href }))}
      path={pagePath(base, n)}
    />
  );
}
