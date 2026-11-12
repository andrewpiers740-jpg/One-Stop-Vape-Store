# Technical Audit — One Stop Vape Store
Date: 2026-11-12 · Site: https://www.onestopvapestore.com · Commit audited: 52f2bff (production, READY on Vercel)

Scope: local build, project crosscheck, tests, lint, live-site HTTP probes, headers, agent-ready files, Vercel deployment state.
Not covered: Lighthouse/Core Web Vitals, axe-core accessibility, Google Rich Results Test, full 2,766-URL crawl, mobile device testing (no browser run). These are listed under "Not verified".

## Summary

| Area | Result |
|---|---|
| Production deploys | 20 most recent all READY; latest = HEAD commit |
| `npm run crosscheck` (+extra) | 0 failures (all PASS) |
| `npm test` (pricing, variants, crypto) | All pass |
| Local `next build` | FAILED in this audit (see C1) — production builds on Vercel succeed |
| ESLint | 34 errors, 99 warnings |
| Live HTTPS, apex→www redirect, HSTS | Good |
| Security headers | Missing CSP |
| Agent-ready | Partial: 4 `.well-known` files 404, markdown negotiation bug |

## Critical / High

**C1. Local production build fails (unconfirmed root cause).**
`npm run build` fails on Windows because the script uses `NODE_ENV=production next build` (not valid in cmd/PowerShell). Running with the variable set manually compiled successfully, then failed in static generation: `Cannot find module for page: /blog/[slug]/page` for the blog posts. Vercel's builds of the same commit succeed, so this is likely a local `.next` state or Windows path issue, not a production defect. Fix: use `cross-env` (or drop the prefix, Next sets it), delete `.next`, rebuild, confirm.

**H1. Markdown content negotiation is wrong (`middleware.js`).**
Uses `accept.includes('text/markdown')`. A request with `Accept: text/html, text/markdown;q=0.9` (what real AI crawlers send) is served `llms.txt` as `text/plain` instead of the HTML page — verified live. It also only rewrites `/` and returns llms.txt rather than a markdown copy of the requested page. Fix: parse q-values and only serve markdown when it outranks `text/html`; or remove the rewrite.

**H2. No Content-Security-Policy.** Live headers have X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, HSTS, but no CSP. The site loads a third-party widget (tawk.to), takes crypto payments and has an admin area, so CSP is worthwhile. Roll out in Report-Only first.

## Medium

**M1. Four advertised agent files return 404:** `/.well-known/oauth-protected-resource`, `/.well-known/openid-configuration`, `/.well-known/acp.json`, and `/.well-known/ucp` (a 404 page of ~51 KB). `app/api/acp` and `app/api/ucp` exist, so the discovery files should point at them. Also `Link` header lacks the openid-configuration entry. Either generate these via `scripts/gen-agent-files.mjs` or stop advertising them (capability-lie rule).

**M2. Sitemap is a single 2,766-URL file (683 KB), not an index.** Valid and under limits, but `lastmod` is the same build timestamp for every URL (2026-11-09T01:03Z), so it carries no freshness signal. Use real per-item dates (blog post dates, product update dates).

**M3. Homepage HTML is ~1.0 MB uncompressed** (113 `<img>`, 279 `<script>` tags, 73 lazy). Large DOM and script count will hurt mobile LCP/INP. Needs a Lighthouse run to quantify; candidates: trim carousels/rendered product lists, defer below-fold sections, reduce inline RSC payload.

**M4. Meta description on homepage is 239 chars** (target ≤160). Truncated in results. Title is fine.

**M5. ESLint: 34 errors.** Mostly `react-hooks/set-state-in-effect` (e.g. `ThankYouOrderClient.tsx:12`, chat widget component). Lint is skipped in the build (`eslint.ignoreDuringBuilds`), so these never gate a deploy. Not user-visible, but they flag extra renders; fix or tune the rule.

**M6. `/admin/` page is publicly reachable (200)** — it is passcode-gated and `noindex`/robots-disallowed, and API routes enforce the passcode (crosscheck confirms every admin route checks it, constant-time compare, no fallback passcode). Acceptable; consider adding rate limiting on the passcode attempts if not already covered.

## Low / Housekeeping

- `package.json` name is `ai-studio-applet`; rename.
- `tsconfig.tsbuildinfo` is tracked and shows as modified; add to `.gitignore` and untrack.
- `robots.txt` still lists `Claude-Web` (retired) and lacks `Claude-User`, `Claude-SearchBot`, `OAI-SearchBot`, `Perplexity-User`, `Meta-WebIndexer`; `Content-Signal` says `ai-train=no` while per-bot rules say `Allow: /` — decide intent and align.
- `npm audit` could not run: no lockfile for npm (repo uses `bun.lock`). Run `bun audit` or add a lockfile.
- Public contact email `sales@onestopvapestore.com` appears in plaintext in the page HTML (spam-harvesting risk, minor).
- `public/` is 86 MB (mostly images). Fine for Vercel but keep an eye on repo/clone size.
- `Link` header is set via `vercel.json`; `.well-known/*` on Vercel bypasses custom headers (platform limitation), so content-type on extensionless files can't be fixed there.

## Passing (verified)

- HTTPS only; `onestopvapestore.com` → `https://www.onestopvapestore.com/` (308); HSTS 2 years.
- Homepage: exactly 1 `<h1>`, canonical correct, Store/Organization JSON-LD parses, all 113 images have alt text.
- Core pages 200: `/shop/`, `/blog/`, `/cart/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`; unknown path returns real 404.
- Sitemap: 2,766 URLs, 1,600 image entries, all on the www host.
- Admin and order paths disallowed in robots; `/api/admin/*` redirects/blocks unauthenticated.
- Secrets: no hardcoded passcode, no keys in code, `ADMIN_PASSCODE` not in client bundle (crosscheck).
- Contact API has honeypot, minimum-time check and Redis rate limiting.
- Server-side repricing, free-shipping-after-discount, crypto matching tests pass.
- Compliance: banned-term scans pass across config, homepage and 200 blog posts; age gate present; no Web3Forms; no invented reviews/ratings.
- Content: 200 blog posts, unique slugs, 4 images each, all present.
- Agent files present: robots.txt, llms.txt, auth.md, api-catalog, agent-skills index, MCP server card.

## Not verified (needs a browser / external tool)

Lighthouse scores and Core Web Vitals; axe-core accessibility and contrast; Rich Results Test per schema type; crawl of all 2,766 sitemap URLs; mobile layout at 380px; live checkout / email / WhatsApp flows; Vercel env var completeness (SMTP, Upstash, ADMIN_PASSCODE).

## Recommended order of work

1. Confirm/clear the local build failure (C1) so you can verify builds before pushing.
2. Fix markdown negotiation (H1).
3. Add CSP in Report-Only, then enforce (H2).
4. Generate or remove the four 404 `.well-known` files (M1).
5. Shorten homepage description; real `lastmod` dates (M2, M4).
6. Run Lighthouse on home, a category, a product and checkout; act on the results (M3).
7. Lint cleanup and housekeeping.
