# Prebuild technical and SEO audit (branch `seo-prebuild`, 2026-11-25)

Scope: the whole prebuild, measured on a clean production build (`npm run build`, exit 0) served with `next start`. Every indexable page was fetched as built HTML and measured: 3,007 pages (5 pages, 10 utility, 7 categories, 67 brands, 203 collections, 200 blog posts, 2,515 products). The sitemap lists 3,357 URLs because it also carries paginated listing pages. Nothing is committed or deployed.

Companion report with every per-page number (new URL, primary and secondary keywords, intent, volume, KD, SEO title, meta description, where and how many times each keyword appears, social links per page): `docs/seo/PREBUILD-FULL-REPORT-V2.csv` and `.md`.

## 1. Scoreboard

| Check | Before this pass | Now |
|---|---|---|
| New keyword URLs returning 200 | 728 / 728 | 728 / 728 |
| Old URLs redirecting to the new URL | 726 / 728 (2 are unchanged paths: `/shop/vape-kits/`, `/fda-disclaimer/`) | 726 / 728 (same, correct) |
| Sitemap URLs returning 200 | 3,357 / 3,357 | 3,357 / 3,357 |
| Renamed images present on disk | 1,090 / 1,090 | 1,090 / 1,090 |
| Blog posts missing the primary in title, H1, meta, FAQ | 184 | 0 |
| Product pages missing the primary in meta, H1, FAQ | about 993 meta gaps | 2 (name-based, see 3.7) |
| Blog posts with primary missing from the FAQ | 73 (measurement bug, see 4) | 0 |
| Duplicate meta descriptions | 14 groups | 0 |
| Duplicate H1s | n/a | 0 |
| Product titles over 65 characters | 506 | 9 |
| Blog titles over 65 characters | 120 | 0 (longest 60, average 46) |
| Utility page titles over 65 characters | 3 | 0 |
| Pages with all 8 social profile links in the footer | 0 | 3,007 / 3,007 (each profile once per page) |
| Internal links hitting a redirect (sampled pages) | 4 on one blog post | 0 |

## 2. What passes

| Area | Result |
|---|---|
| Build | Passes with no compile errors; 974 static pages, product pages on demand |
| Crawlability | robots.txt references the sitemap; Googlebot, Bingbot, DuckDuckBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User allowed; GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended blocked (deliberate training-bot decision) |
| Indexation | cart, checkout, search, order and thank-you pages noindex; `/account/` and `/wishlist/` now noindex and disallowed; faceted URLs canonicalise to the clean listing |
| On-page | One H1 on every page; canonical, title, meta description and FAQ on every page; every page has the primary keyword in its H1 and first 10% of content, except the 2 name-based products in 3.7 |
| Schema | Organization (with `sameAs` for the 8 profiles), Product, Offer, MerchantReturnPolicy, OfferShippingDetails, FAQPage, BreadcrumbList, BlogPosting |
| Freshness | Visible "Last updated" plus `dateModified` on listings, pages, products and blog posts |
| International | `en-US` and `x-default` hreflang alternates site-wide |
| Content length | Averages: pages 1,875 words, categories 1,830, brands 1,312, collections 1,423, blogs 2,376, products 1,469; no page under its minimum |
| Social profiles | 8 profile links in the footer of every page (TikTok, Pinterest, Facebook, Reddit, Instagram, Threads, X, Telegram), `rel="me noopener noreferrer"`, also in Organization `sameAs` |

## 3. Errors found, with how to fix each

### 3.1 Fixed in this pass
| # | Error | Cause | Fix applied |
|---|---|---|---|
| 1 | 184 blog posts and about 258 products had no keyword title, H1, meta, FAQ or alt text | `seo-blog.json` and `seo-products.json` are keyed by the OLD path, but lookups used the NEW keyword slug, so renamed pages found no entry | `lib/seoPages.js` now translates the new slug back to the old key through `url-map.json` before looking up |
| 2 | Blog post linked to 4 products through the old category path, adding a redirect hop | `blogSeo()` hand-built `/shop/${category}/${slug}/` | `lib/seoPages.js` now uses `productHref()` from `lib/catUrls.js` |
| 3 | Titles too long (506 product, 120 blog, 3 legal pages) | Title builder allowed 70 characters and always kept the brand suffix | New `fitTitle()` in `lib/seo.js` prefers 60 characters, then 65, then 70; it drops the suffix and "Online" before cutting; blog titles shorten at a natural break, then to the primary plus the first clause of the headline; legal-page titles drop the brand suffix when needed |
| 4 | `/account/` and `/wishlist/` were indexable | No robots meta | `robots: { index: false, follow: true }` plus robots.txt Disallow |
| 5 | Heading levels skipped under the H1 on listings | Product card titles were `<h3>` | Changed to plain text with the same styling |
| 6 | No visible freshness signal | Missing | "Last updated" and `dateModified` added |
| 7 | No hreflang | Missing | `en-US` and `x-default` alternates added |
| 8 | Listing copy linked through `/shipping/` and `/refunds/` redirects | Old paths in `lib/seo.js` | Uses `staticUrl()` |
| 9 | No social profile links on the page | Missing | Footer nav plus `sameAs` schema, driven by `SITE.sameAs` in `src/config/site.js` |

### 3.2 Open: 2 blog posts whose title cut drops the primary keyword
Both have a long question or phrase as their primary, so the 60-character cut removes part of it: `/blog/what-is-a-crypto-network-and-why-does-it-matter-when-you-pay/` (title ends at "When You") and `/blog/buy-vapes-online-payment-methods-compared-crypto-gift-card-cash-app/` (title ends with a comma, "Payment Methods Compared: Crypto, Gift Cards, Cash App,").
How to fix: set a hand-written short title for each in `src/data/seo-blog.json` (field `h`), for example "Buy Vapes Online: Payment Methods Compared" and "What Is a Crypto Network and Why It Matters", then rebuild. Also strip trailing punctuation in the last `fitTitle` variant in `blogSeo()`.

### 3.3 Fixed: utility page titles
`/refund-and-return-policy/`, `/terms-of-service/` and `/california-privacy-notice/` now fit within 60 characters.

### 3.4 Open: brand pages with primary-keyword density over 3% (12 pages)
`/brands/fifty-bar/` (6.8%), `rinnbar` (6.5%), `vaporlax` (6.2%), `mr-fog` (6.0%), `air-factory` (5.4%), `nix-liquids` (5.2%), `oilio` (4.6%), `geek-labs` (4.5%), `7daze` (3.9%), `hookah-labs` (3.7%), `specialty` (3.5%), `parfflo` (3.4%); also one collection, `/collections/popular-disposable-vape-brands/raz-ltx-25000/` (3.1%).
Cause: the density counts every occurrence on the page, and the brand name is part of nearly every product card title, so the written copy itself is not stuffed. How to fix if you want it lower: shorten the product-card text on those pages, or add more unique descriptive copy so the denominator grows. Do not remove the brand from card titles.

### 3.5 Open: blog posts with primary density under 0.5% (196 of 200)
The rule asks for about 2%. Reaching it on a 2,400-word post means roughly 48 mentions, which is keyword stuffing and conflicts with rule 5 ("completely natural"). Average primary density today is 0.30%.
How to fix, if you want it higher: write the extra mentions by hand into subheadings, the first paragraph and the answer-first sections of the highest-value posts, 5 to 10 natural mentions per post. Do not generate them automatically.

### 3.6 Open: 9 blog posts with no primary keyword in image alt text
Payment-method guides, for example `/blog/buy-vapes-with-cash-app-how-to-pay-online/` and `/blog/best-vapes-with-display-screen-and-led-battery-indicator/`.
How to fix: set the hero image alt in each post in `content/blog/*.mjs` to start with the primary keyword, then run `npm run blog`.

### 3.7 Open: product pages
- 2 products show the primary missing from the title only because the primary is name-based and carries a bracketed suffix: `/shop/best-vape-juice/jewel-mint-emerald-pod-juice/` and `/shop/best-vape-juice/i-love-salts-sweet-tobacco/`. Measurement artifact, not a page error. Fix: remove the bracketed suffix from the primary in `src/data/seo-products.json`.
- 2 pairs of product pages share an identical title: the two `jewel-mint-emerald-pod-juice` pages and the two `i-love-salts-sweet-tobacco` pages. Fix: give the variant a distinguishing word in `product.title` or in the title variant list in `productSeo()`.
- 9 product titles are 66 to 71 characters (very long flavor names). Acceptable; shorten the product name if you want them under 65.

## 4. Tooling problems I found and fixed (so you can trust the numbers)
- The report script counted FAQ keyword hits from the first "Frequently asked" heading only, but blog posts have two FAQ sections. That made 73 posts look like they had no primary in the FAQ. The script now reads every FAQ section; those posts were fine.
- A stale `.next` folder made 36 blog pages return 404 from `next start` even though the build had produced them. A clean rebuild (`rm -rf .next`) fixed it. Before deploying, build from a clean tree.
- Background servers and long scripts were killed when a session ended. Run the server as its own detached process.

## 5. Needs your input (not guessed or invented)
- Real author name and credentials for blog posts (currently "One Stop Vape Store Editorial").
- Real customer reviews, AggregateRating, and GTIN/MPN data. Nothing will be invented.
- Real statistics, quotes and sources for rule 13.
- Utility-page keyword research (about, contact, FAQ, help, refunds, terms, privacy, California privacy, PACT Act, FDA) needs a fresh Semrush link.
- Pinterest (`pin.it`) and Facebook (`/share/`) links are short or share links. Replace them with the full profile URLs in `SITE.sameAs` if you have them; share links can expire.

## 6. Before deploy
1. Build from a clean tree, then run `node scripts/gen-agent-files.mjs` and `node scripts/crosscheck.mjs`.
2. Redirects: `src/data/redirects.json` has 993 entries against Vercel's limit of about 1,024, so leave room before adding more. Image redirects (1,090) live in `vercel.json` and only work on Vercel, so test them on a preview deployment.
3. Redirects are 308, not 301. Search engines treat them the same.
4. Review weak keyword slugs now that they are permanent, for example `/brands/pod-salt-reddit/`.
5. Run PageSpeed Insights on the Vercel preview for Core Web Vitals and TTFB (rule 20). Local timings are not meaningful.
6. After launch: submit the sitemap to Search Console and Bing Webmaster Tools, and watch indexation and the redirects.

## 7. Outside the codebase
Backlinks and brand mentions (rule 23); rankings, Search Console, Bing and AI-citation tests in ChatGPT, Perplexity, Gemini and AI Overviews (rule 24); authentic reviews.
