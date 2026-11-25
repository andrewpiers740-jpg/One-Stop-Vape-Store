# Full-site keyword map: status (first full pass)

Files: `page-keyword-map.csv` (one row per page unit: primary + intent/volume/KD + secondaries), `mapping-gaps.csv` (pages that cannot yet meet the rules).

| Page type | Units | Meets rules now | Gap: no eligible primary | Gap: too few secondaries |
|---|---|---|---|---|
| Static pages with a keyword target | 5 | 3 | 1 | 1 |
| Utility/legal pages (no target proposed) | 10 | n/a | n/a | n/a |
| Categories | 7 | 6 | 1 | 0 |
| Brand pages | 67 | 13 | 31 | 23 |
| Collections (211 minus 8 "all") | 203 | 16 | 144 | 43 |
| Product model families (2,515 products) | 578 | 3 | 563 | 7 (+5 flagged: one primary shared by several flavors) |
| Blog posts | 200 | 109 | 51 | 40 |

## Cause
The Semrush pool (4,808 keywords) was researched for 45 seed buckets (mainly big disposable brands, a few juice/pod brands and categories). Everything else (smaller brands, collections, individual products, blog topics) has no refreshed KD 0-29 keywords yet, so the rules cannot be met without new Semrush seeds. No keywords were invented to fill gaps.

## Brands with no eligible primary
Monster Labs, UT / FLUM, Rinnbar, VaporLax, Puffco, X-Posed, Horizontech, NIX Liquids, Dr Dabber, Specialty, Geek Labs, Beard Vape Co, Oilio, Shot Caller, Loon, PAX, Suicide Bunny, Hotbox, Urban Tale, Hookah Labs, NOAT, YOVO, Parfflo, Alp Drifter, CCELL, American Ice, Cartisan, Sesh, Vinci, S6XTH SENSE, Suorin.

## Weak primaries to review (matched, but poor fit)
Pod Juice ("pod juice salt nic"), Pod Salt ("onyx vapes"), Cloud Nurdz (long flavor string), RAZ ("raz bar price", 170 volume), Lost Mary ("lostmary", 1,600 volume).

## Update after product research (Monster Vape Labs, Puffco, 7 Daze, Naked100, Dr Dabber, EBCREATE, Smok; all refreshed, KD 0-29)

| Page type | Units | Meets rules | Shared-primary family | Gap |
|---|---|---|---|---|
| Brand pages | 67 | 17 | 0 | 50 |
| Product model families | 578 | 15 | 5 | 558 |
| Everything else | unchanged | | | |

Product pages still lack flavor-level commercial keywords for most families. Many brand and flavor terms are informational only, which the intent rules do not allow as primary or secondary on product pages.

## Update after model-level research (Geek Bar Pulse X, Lost Mary MT15000, RAZ LTX 25000, Off Stamp X-Cube, Rifbar Mixpro, UT Bar 50K, Juice Head 30K; all refreshed, KD 0-29)

Keyword pool: 5,293 rows (was 4,808).

| Page type | Units | Meets rules | Shared-primary family | Gap |
|---|---|---|---|---|
| Brand pages | 67 | 18 | 0 | 49 |
| Product model families | 578 | 17 | 8 | 553 |
| Collections | 203 | 16 | 0 | 187 |
| Blog posts | 200 | 109 | 0 | 91 |

Most model, flavor and brand-head searches are informational (I) only, which the intent rules do not allow as primary or secondary on brand, category or product pages. They are kept as FAQ/LSI candidates.

## Brand-level primaries for product families (`product-family-brand-map.csv`, `brand-capacity.csv`)

Each family gets a unique primary from its own brand's refreshed T/C keywords (volume 20+, KD 0-29); model-name matches first, then brand-level keywords. 578 families: 231 get a primary (124 by model match), 203 also have 5+ secondaries. The rest have no unused T/C keyword left for their brand.

## Approved category primaries (`approved-category-primaries.csv`)
Vape Juice: best vape juice | Disposable Vapes: popular disposable vape brands | Vape Kits: vape kits | Coils & Pods: coil for vape | Nicotine Pouches: best nicotine pouches | Nixodine: best nicotine free vape | Vaporizers: none eligible yet (needs research).
Current status: categories 6 of 7, brand pages 19 of 67, collections 18 of 203, product families 238 of 578 (brand-level map), blog posts 109 of 200.

## Decision: category-level secondaries for small brands (accepted)
Brand pages with a valid primary but fewer than 5 brand-specific T/C secondaries are topped up with commercial keywords (volume 100+, KD 0-29) from the brand's main category pool. Each such page is flagged in page-keyword-map.csv ("secondaries topped up from the <category> category pool"). Result: brand pages meeting the rules 43 of 67.

## Rule change (2026-11-17): keyword difficulty is now 0-32%
All keywords at KD 0-32 are normal candidates (the separate "KD 30-32 top-up" step is retired). Keyword Magic Tool 2.0 links are pre-filtered to 0-32; no refresh is needed there.

## Decision: category-level secondaries for collections (accepted)
Collections that have a valid primary but fewer than 5 own T/C secondaries are topped up with commercial keywords (volume 100+, KD 0-32) from the parent category pool. Collections with no primary stay gaps. Each topped-up page is flagged in page-keyword-map.csv.
