// scripts/crosscheck-extra.mjs — pre-ship checks for the commerce, content and image layers (run after crosscheck.mjs).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

let failures = 0;
const ok = (name, cond, msg = "") => {
  if (cond) console.log(`[PASS] ${name}`);
  else { console.error(`[FAIL] ${name}${msg ? ": " + msg : ""}`); failures++; }
};
const read = (f) => fs.readFileSync(f, "utf8");
function walk(dir, exts, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, exts, out);
    else if (exts.some((x) => p.endsWith(x))) out.push(p);
  }
  return out;
}
const code = ["app", "src", "lib"].flatMap((d) => walk(d, [".js", ".jsx", ".ts", ".tsx"]));

console.log("--- EXTRA CROSSCHECK (commerce / content / images) ---");

// Secrets & auth
ok("No hardcoded admin passcode", !code.some((f) => /admin123/.test(read(f))), "found 'admin123'");
ok("ADMIN_PASSCODE never exposed to the client", !code.some((f) => /NEXT_PUBLIC_ADMIN/.test(read(f))));
ok("No private keys / seed phrases in code", !code.some((f) => /(privateKey|private_key\s*[:=]|mnemonic\s*[:=]|seedPhrase|BEGIN (RSA |EC )?PRIVATE KEY)/i.test(read(f))));
const adminAuth = read("lib/adminAuth.js");
ok("Admin auth has no fallback passcode", !/\|\|\s*["'][^"']+["']/.test(adminAuth) && /ADMIN_PASSCODE/.test(adminAuth));
const adminRoutes = walk("app/api/admin", [".js"]);
ok("Every admin route checks the passcode", adminRoutes.length > 0 && adminRoutes.every((f) => /checkAdminPasscode/.test(read(f))), adminRoutes.filter((f) => !/checkAdminPasscode/.test(read(f))).join(", "));
ok("No Web3Forms anywhere", !code.some((f) => /web3forms/i.test(read(f))));

// Wallets
const { WALLETS } = await import(pathToFileURL(path.resolve("src/config/wallets.js")).href);
const nets = Object.values(WALLETS).flatMap((t) => t.networks);
ok("All wallet addresses set (no placeholders)", nets.every((n) => n.address && !/REPLACE/.test(n.address)));
const expected = {
  BTC: "bc1qmk9d29mm2ekf59gkssgd9092p3wjdc3x2de7ju", ETH: "0x97F62Cc4874Ea8D0D3cD742E6DED871b7e577812", BNB: "0x97F62Cc4874Ea8D0D3cD742E6DED871b7e577812",
  SOL: "BFHZNjNYgya3g69Ud5H6Rued21YdhE6AKsDy9Red6dFo", USDC: "BFHZNjNYgya3g69Ud5H6Rued21YdhE6AKsDy9Red6dFo",
};
ok("Wallet addresses match the owner's list", Object.entries(expected).every(([s, a]) => WALLETS[s].networks[0].address === a) && WALLETS.USDT.networks.find((n) => n.id === "erc20").address === "0x97F62Cc4874Ea8D0D3cD742E6DED871b7e577812" && WALLETS.USDT.networks.find((n) => n.id === "trc20").address === "TEEydoxPa4Gntq7jigSB2eYWLEqoQB74qw");

// Robots
const robots = read("public/robots.txt");
for (const p of ["/admin/", "/order/", "/api/admin/", "/api/order/", "/checkout/"]) ok(`robots.txt disallows ${p}`, robots.includes(`Disallow: ${p}`));
ok("trailingSlash enabled", /trailingSlash:\s*true/.test(read("next.config.ts")));

// Products
const products = JSON.parse(read("src/data/products.json"));
ok("All products use a local white-framed image", products.every((p) => p.image.startsWith("/images/products/")));
ok("Every product image file exists", products.every((p) => fs.existsSync("public" + p.image)));
const sharp = (await import("sharp")).default;
let nonWhite = 0;
for (const p of products.slice(0, 3000).filter((_, i) => i % 25 === 0)) {
  const { data, info } = await sharp("public" + p.image).raw().toBuffer({ resolveWithObject: true });
  const corner = (x, y) => { const i = (y * info.width + x) * info.channels; return data[i] > 245 && data[i + 1] > 245 && data[i + 2] > 245; };
  if (!(corner(0, 0) && corner(info.width - 1, 0) && corner(0, info.height - 1) && corner(info.width - 1, info.height - 1))) nonWhite++;
}
ok("Sampled product images have white corners (white background)", nonWhite === 0, `${nonWhite} non-white samples`);

// Banners / tiles / hero
const si = JSON.parse(read("src/data/site-images.json"));
ok("5 hero images", si.hero.length === 5 && si.hero.every((h) => fs.existsSync("public" + h.src)));
const cats = ["vape-juice", "coils-pods", "disposables", "vape-kits", "vaporizers", "nic-pouches", "nixodine"];
ok("Every category has a tile and a banner", cats.every((c) => si.tiles[c] && si.banners[c] && fs.existsSync("public" + si.tiles[c].src) && fs.existsSync("public" + si.banners[c].src)));
const pages = ["shop", "blog", "about", "contact", "faq", "help", "shipping", "refunds", "privacy", "terms", "pact-act", "fda-disclaimer", "california-privacy", "wholesale", "search", "wishlist", "account"];
ok("Every main page has a banner", pages.every((p) => si.banners[p] && fs.existsSync("public" + si.banners[p].src)));
const withBanner = (f) => /<PageBanner|<LegalPage/.test(read(f));
const pageFiles = ["shipping", "about", "faq", "refunds", "privacy", "blog", "search", "account", "help", "terms", "pact-act", "fda-disclaimer", "california-privacy", "contact", "wholesale", "shop", "wishlist"].map((p) => `app/${p}/page.tsx`);
ok("PageBanner rendered on every main page", pageFiles.every(withBanner), pageFiles.filter((f) => !withBanner(f)).join(", "));
ok("PageBanner on category pages", withBanner("app/shop/[category]/page.tsx"));

// Blog
const posts = JSON.parse(read("src/data/blog-posts.json"));
ok("200 blog posts", posts.length === 200, `found ${posts.length}`);
ok("Unique slugs", new Set(posts.map((p) => p.slug)).size === posts.length);
ok("Every post has 4 images that exist", posts.every((p) => p.images.length === 4 && p.images.every((i) => fs.existsSync("public" + i.src))), `${posts.filter((p) => p.images.length !== 4).length} posts without 4 images`);
ok("Every blog image has alt text and a credit (or is built from our own product photos)", posts.every((p) => p.images.every((i) => i.alt && (i.by || i.own))));
const allImgs = posts.flatMap((p) => p.images.map((i) => i.src));
ok("No blog image file reused", new Set(allImgs).size === allImgs.length);
const BANNED = [/\bsafe\b/i, /\bsafer\b/i, /\bhealthy\b/i, /non-toxic/i, /therapeutic/i, /quit smoking/i, /\bcure[sd]?\b/i, /risk-free/i];
ok("Blog text passes banned-term scan", posts.every((p) => !BANNED.some((re) => re.test(p.title + p.summary + p.body + JSON.stringify(p.faq)))));
ok("Summaries are 100-160 chars", posts.every((p) => p.summary.length >= 100 && p.summary.length <= 160), posts.filter((p) => p.summary.length < 100 || p.summary.length > 160).map((p) => p.slug).join(", "));

// Brand logos, payment logos, variants
const bl = JSON.parse(read("src/data/brand-logos.json"));
ok("Brand logo files exist for every manifest entry", Object.values(bl).every((l) => fs.existsSync("public" + l.src)));
ok("Brand carousel uses real logos (>= 15 brands)", Object.keys(bl).length >= 15, `only ${Object.keys(bl).length}`);
ok("Payment logo files exist", ["applepay", "cashapp", "bitcoin", "tether", "razer"].every((n) => fs.existsSync(`public/images/payments/${n}.svg`)));
ok("Footer and product page show payment logos", /PaymentLogos/.test(read("src/components/Footer.jsx")) && /PaymentLogos/.test(read("app/shop/[category]/[slug]/page.tsx")));
ok("Variant prices are resolved server-side", /resolveVariant/.test(read("lib/catalog.js")));
ok("No dark footer behind dark text", !/bg-[#09090b]/.test(read("src/components/Footer.jsx")));

// Fabricated social proof
const sp = read("src/components/SalesPopup.jsx");
ok("Sales popup uses real orders only (no invented names/places)", sp.includes("/api/recent-orders") && !/CUSTOMERS|LOCATIONS|Math\.random/.test(sp));
ok("No default 5.0 ratings", !code.some((f) => /\|\|\s*5\.0/.test(read(f))));

console.log(`--- EXTRA CROSSCHECK FINISHED: ${failures} FAILURES ---`);
if (failures) process.exit(1);
