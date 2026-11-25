import CatalogListing from "@/src/components/catalog/CatalogListing";
import { staticCopy, staticTitle, staticMeta, staticH1, keywordsString } from "@/lib/seoPages";
import { seoEntry } from "@/lib/seo";
import SeoContent from "@/src/components/catalog/SeoContent";
import { SITE, CATEGORIES } from "@/src/config/site";
import { getCollection, hrefOf, catHref, pageSlice, pageCount, facetsFor, collectionsOf, brands, brandHref, describeSet } from "@/lib/collections";

const all = getCollection("all", "all")!;
const d = describeSet("the full catalog", all.products, "");

export const metadata = {
  title: staticTitle("/shop/", `Shop All Vapes: ${all.products.length.toLocaleString()} products | ${SITE.name}`),
  description: staticMeta("/shop/", `Browse the complete ${SITE.name} catalog by category, brand, price, flavor and strength. ${d.meta}`.slice(0, 200)),
  keywords: seoEntry("/shop/") ? keywordsString(seoEntry("/shop/")!) : undefined,
  alternates: { canonical: `https://${SITE.domain}/shop/` },
};

export default function ShopPage() {
  const copy = staticCopy("/shop/");
  const chips = [
    ...CATEGORIES.map((c) => ({ label: c.name, href: catHref(c.slug) })),
    ...collectionsOf("all", "price").map((x) => ({ label: x.label.replace("Vape Products ", ""), href: hrefOf(x) })),
    { label: "All brands A–Z", href: "/brands/" },
    ...brands.slice(0, 6).map((b) => ({ label: b.label, href: brandHref(b.slug) })),
  ];
  return (
    <CatalogListing
      bannerSlug="shop"
      bannerLabel="Shop"
      crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      h1={staticH1("/shop/", "Shop all vapes")}
      seo={copy}
      intro={`${copy ? copy.lead + " " : ""}Everything we stock in one place: ${all.products.length.toLocaleString()} products across ${CATEGORIES.length} categories and ${brands.length} brands. Use the filters to narrow by category, brand, price, flavor, strength or formulation.`}
      total={all.products.length}
      products={pageSlice(all.products, 1)}
      base={hrefOf(all)}
      first="/shop/"
      page={1}
      pages={pageCount(all.products.length)}
      groups={facetsFor("all")}
      current="/shop/"
      chips={chips}
      path="/shop/"
    />
  );
}
