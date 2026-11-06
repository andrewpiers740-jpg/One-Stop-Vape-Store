# One Stop Vape Store — project instructions
React/Next.js ecommerce vape store, Vercel, deployed via GitHub.

## Core Rules
- **Site config**: `src/config/site.js` is the single source of truth.
- **Styling**: Tailwind CSS only. Global overflow guards in `app/globals.css`.
- **Images**: Use `SmartImage` component for HD optimization and zero-broken-image fallbacks.
- **Agent-Ready**: All static files in `public/` are generated via `scripts/gen-agent-files.mjs`.
- **Compliance**: Age gate (21+) and legal disclaimers are mandatory and managed in `site.js`.

## Build & Deploy
- `npm run dev`: Start development server.
- `npm run build`: Production build.
- `node scripts/gen-agent-files.mjs`: Regenerate agent files.
- `node scripts/crosscheck.mjs`: Pre-ship verification.

## Deployment Checklist
1. Verify `SITE.domain` is correct.
2. Run `node scripts/gen-agent-files.mjs`.
3. Run `node scripts/crosscheck.mjs`.
4. Ensure `ADMIN_PASSCODE` is set in Vercel env vars.

## Orders, payments, content (added)
- Never put keys or seed phrases in the repo; wallets in `src/config/wallets.js` are PUBLIC addresses.
- Price authority is server-side (`lib/catalog.js`); free shipping = $200+ AFTER discount (matches /shipping/).
- Admin auth: `lib/adminAuth.js` has no fallback passcode. Do not add one.
- Blog is data: edit `content/blog/*.mjs`, then `npm run blog`. Banned wording (safe, healthy, cure, risk-free, ...) fails the build.
- Do not invent reviews, ratings, sales popups or statistics. Only real, attributable social proof.
- Images are local WebP in `public/images`; the Next image optimizer is off (`images.unoptimized`).
