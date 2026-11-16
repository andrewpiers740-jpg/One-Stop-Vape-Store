import CatalogListing from "@/src/components/catalog/CatalogListing";
import { SITE, CATEGORIES } from "@/src/config/site";
import { getCollection, hrefOf, catHref, pageSlice, pageCount, facetsFor, collectionsOf, brands, brandHref, describeSet } from "@/lib/collections";

const all = getCollection("all", "all")!;
const d = describeSet("the full catalog", all.products, "");

export const metadata = {
  title: `Shop All Vapes: ${all.products.length.toLocaleString()} products | ${SITE.name}`,
  description: `Browse the complete ${SITE.name} catalog by category, brand, price, flavor and strength. ${d.meta}`.slice(0, 200),
  alternates: { canonical: `https://${SITE.domain}/shop/` },
};

export default function ShopPage() {
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
      h1="Shop all vapes"
      intro={`Everything we stock in one place: ${all.products.length.toLocaleString()} products across ${CATEGORIES.length} categories and ${brands.length} brands. Use the filters to narrow by category, brand, price, flavor, strength or formulation.`}
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
