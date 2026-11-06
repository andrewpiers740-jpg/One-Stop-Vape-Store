# One Stop Vape Store — PROJECT.md (strategy & operations record; never deployed)

- **Business:** SV3 LLC, Phoenix AZ, established Dec 2022. Domain `onestopvapestore.com` (single source: `src/config/site.js`).
- **Stack:** Next.js 15 App Router, Tailwind v4, Vercel (GitHub deploy), Upstash Redis, SMTP (nodemailer). Target = Vercel, Reply Portal = Yes, client CMS backend = No.
- **Theme:** colours sampled from the logo (electric cyan-blue `#1fb4ff` → `#0b6dff` → deep `#0440b8`, black ink, white outline). Tailwind's `emerald-*` scale is re-pointed to the brand blue in `app/globals.css` so legacy classes stay on-theme; use `brand-*` in new code.

## Payments (all set in code, nothing to paste into a dashboard)
| Method | Discount | Flow |
|---|---|---|
| Crypto BTC · USDT (ERC20, TRC20) · USDC (Solana) · ETH · BNB (BSC) · SOL | 10% | Popup (address, QR, live quote, MoonPay/Coinbase/Transak/Changelly links) → "I have paid" → order saved → chain watcher auto-confirms (BNB needs `ETHERSCAN_API_KEY`, else manual) |
| Gift cards Apple · Razer Gold · Paysafe · Sephora · Macy's | 10% | Choose card → order placed → email (+WhatsApp link) with buy link + private upload link → customer uploads code/photos/receipt → admin verifies |
| Cash App · Apple Pay · Chime | none | Order placed → admin pastes details in `/admin/send-payment-email/` → email + WhatsApp + tap-to-copy page → customer pays & uploads receipt |

Wallet addresses live ONLY in `src/config/wallets.js` (public addresses only; never keys/seeds).
BNB network was not specified by the owner; **BNB Smart Chain (BEP20)** was assumed.

## Admin portal (`/admin/`)
Passcode = `ADMIN_PASSCODE` env var, verified server-side (header `X-Admin-Passcode`). Dashboard hub, orders (+detail, proofs, status, tracking), enquiries (+reply), payment composer. Orders live in Upstash Redis.

## Content
- `content/blog/*.mjs` → `node scripts/build-blog.mjs` → `src/data/blog-posts.json` (200 posts; validated for banned terms, links, lengths).
- Images: `scripts/images-curated.mjs` (hero/banners/tiles), `scripts/images-blog.mjs` (4 per post), `scripts/images-products.mjs` (all 2,515 products localised on pure white). Sources: Unsplash (credited at `/credits/`); product images originate from the retailer CDN recorded in `sourceImage`.
- Compliance: banned terms enforced by `build-blog.mjs`; no health/safety claims; age gate 21+.

## Known gaps / owner decisions
See the hand-over report in the session summary (policy mismatches, unverified marketing claims, review provenance).
