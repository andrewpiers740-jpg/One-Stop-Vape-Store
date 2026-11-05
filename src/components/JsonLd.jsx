import { SITE } from "@/src/config/site";

export default function JsonLd({ type = "Store", data = {} }) {
  const base = {
    "@context": "https://schema.org",
    "@type": ["Store", "Organization"],
    "name": SITE.name,
    "legalName": SITE.legalName,
    "description": SITE.description,
    "foundingDate": SITE.foundingDate,
    "foundingLocation": { "@type": "Place", "name": SITE.contact.location },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4908 E McDowell Road STE 103",
      "addressLocality": "Phoenix",
      "addressRegion": "AZ",
      "postalCode": "85008",
      "addressCountry": "US"
    },
    "url": `https://${SITE.domain}/`,
    "logo": `https://${SITE.domain}/logo.png`,
    "email": SITE.contact.email,
    "telephone": `+1-${SITE.contact.phone}`,
    "sameAs": [],
    "areaServed": ["United States"],
    "numberOfItems": 2515,
    "priceRange": "$$",
    "brand": { "@type": "Brand", "name": "One Stop Vape Store" },
    "makesOffer": {
      "@type": "AggregateOffer",
      "priceCurrency": SITE.contact.currency.code,
      "lowPrice": 4.99,
      "highPrice": 189.99
    }
  };

  const schema = type === "Store" ? base : { "@context": "https://schema.org", "@type": type, ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

