import fs from "fs";
import path from "path";
import { SITE, CATEGORIES } from "../src/config/site.js";
import { urlMap } from "./lib/urlmap.mjs";

const root = process.cwd();

// --- 1. robots.txt ---
const robots = `User-agent: *
Disallow: /thank-you-contact/
Disallow: /thank-you-order/
Disallow: /thank-you-wholesale/
Disallow: /admin/
Disallow: /order/
Disallow: /api/admin/
Disallow: /api/order/
Disallow: /api/contact/
Disallow: /api/crypto/
Disallow: /api/crypto-rate/
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Disallow: /wishlist/
Disallow: /search/
Sitemap: https://${SITE.domain}/sitemap.xml

Content-Signal: search=yes, ai-input=yes, ai-train=no

# robots.txt is advisory: it relies on each crawler honoring it. Training crawlers are disallowed; search, citation and live-retrieval bots are allowed.
# AI model-training crawlers: not allowed to train on this content
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

# AI search and answer crawlers: allowed to index and cite product and content pages
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Claude-User
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: cohere-ai
Allow: /
`;
fs.writeFileSync(path.join(root, "public/robots.txt"), robots);

// --- 2. llms.txt ---
const llms = `# ${SITE.name}
> ${SITE.tagline}

${SITE.description}

## Shop Categories
${CATEGORIES.map(c => `- [${c.name}](https://${SITE.domain}/shop/${urlMap.categories[c.slug] || c.slug}/): ${c.description}`).join("\n")}

## Contact & Rules
- WhatsApp: [${SITE.contact.whatsapp}](https://wa.me/${SITE.contact.whatsapp})
- Email: [${SITE.contact.email}](mailto:${SITE.contact.email})
- Minimum Order: ${SITE.contact.currency.symbol}${SITE.order.minOrder}
- Free Shipping: Over ${SITE.contact.currency.symbol}${SITE.order.freeShippingThreshold}
- Location: ${SITE.contact.location}

## Agent Resources
- [API Catalog](https://${SITE.domain}/.well-known/api-catalog)
- [Agent Skills](https://${SITE.domain}/.well-known/agent-skills/index.json)
- [MCP Server](https://${SITE.domain}/.well-known/mcp/server-card.json)
- [Auth Policy](https://${SITE.domain}/auth.md)
- [Site Search (Markdown)](https://${SITE.domain}/.well-known/search?q={query}): ranked product and guide results for any query
- [AI Catalog](https://${SITE.domain}/.well-known/ai-catalog.json)
`;
fs.writeFileSync(path.join(root, "public/llms.txt"), llms);
// markdown twin of llms.txt: served at / when a client sends Accept: text/markdown (see middleware.js)
fs.writeFileSync(path.join(root, "public/llms.md"), llms);

// --- 3. auth.md ---
const auth = `# Auth.md

## Site: ${SITE.name} — Ecommerce Vape Store

## Agent Registration
No authentication required. All resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://${SITE.domain}/shop/ |
| Blog | https://${SITE.domain}/blog/ |
| FAQ | https://${SITE.domain}${urlMap.pages["/faq/"] || "/faq/"} |
| Wholesale | https://${SITE.domain}${urlMap.pages["/wholesale/"] || "/wholesale/"} |

## Authentication
\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
\`\`\`

## Ordering
Human-in-the-loop required. Agents may browse and prepare order drafts.
Orders are completed by a human via WhatsApp or the order form.
`;
fs.writeFileSync(path.join(root, "public/auth.md"), auth);

// --- 4. .well-known/api-catalog ---
const catalog = {
  linkset: [
    { anchor: `https://${SITE.domain}/`, "https://www.iana.org/assignments/link-relations/service-doc": [{ href: `https://${SITE.domain}/faq/` }], title: `${SITE.name} — ${SITE.tagline}` },
    { anchor: `https://${SITE.domain}/shop/`, type: "text/html", title: `${SITE.name} Product Catalog` },
    { anchor: `https://${SITE.domain}/api/products`, type: "application/json", title: `${SITE.name} Products API` },
    { anchor: `https://${SITE.domain}/api/mcp`, type: "application/json", "https://www.iana.org/assignments/link-relations/service-desc": [{ href: `https://${SITE.domain}/.well-known/mcp/server-card.json` }], title: `${SITE.name} MCP Server` }
    , { anchor: `https://${SITE.domain}/api/search`, type: "application/json", "https://www.iana.org/assignments/link-relations/service-desc": [{ href: `https://${SITE.domain}/openapi.json`, type: "application/json" }], title: `${SITE.name} OpenAPI description` }
    , { anchor: `https://${SITE.domain}/.well-known/search`, type: "text/markdown", title: `${SITE.name} site search (Markdown)` }
  ]
};

// --- openapi.json: the public read-only API. All operations are free; none take payment, so there is no x-payment-info. ---
const OD = `https://${SITE.domain}`;
const J = { "application/json": { schema: { type: "object" } } };
const qp = (name, description, schema = { type: "string" }) => ({ name, in: "query", required: false, description, schema });
fs.writeFileSync(path.join(root, "public/openapi.json"), JSON.stringify({
  openapi: "3.1.0",
  info: { title: SITE.name + " public catalog API", version: "1.0.0", description: "Free, read-only access to the product catalog and site search. Orders are completed by a human at checkout; no endpoint takes payment.", contact: { name: SITE.name, email: SITE.contact.email, url: OD + "/contact/" } },
  servers: [{ url: OD }],
  "x-agent-access": { cost: "free", mode: "read-only", ordering: "human-completed", documentation: OD + "/llms.txt" },
  paths: {
    "/api/products/": { get: { operationId: "listProducts", summary: "List or filter products", parameters: [qp("q", "Keywords"), qp("category", "Category slug"), qp("max_price", "Maximum price in USD", { type: "number" }), qp("limit", "Maximum results", { type: "integer" })], responses: { 200: { description: "Matching products", content: J } } } },
    "/api/products/{slug}/": { get: { operationId: "getProduct", summary: "One product by slug", parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "The product", content: J }, 404: { description: "No such product" } } } },
    "/api/categories/": { get: { operationId: "listCategories", summary: "Product categories with counts", responses: { 200: { description: "Categories", content: J } } } },
    "/api/search/": { get: { operationId: "searchProducts", summary: "Ranked product search with filters", parameters: [qp("q", "Keywords"), qp("category", "Category slug"), qp("brand", "Brand"), qp("strength", "nicotine-free or with-nicotine"), qp("max_price", "Maximum price in USD", { type: "number" }), qp("limit", "Maximum results (1-100)", { type: "integer" })], responses: { 200: { description: "Ranked results", content: J } } } },
    "/.well-known/search": { get: { operationId: "agentSearch", summary: "Search products and guides; results as Markdown", parameters: [qp("q", "Keywords"), qp("limit", "Maximum products (1-25)", { type: "integer" })], responses: { 200: { description: "Markdown starting with '# Search results for:'", content: { "text/markdown": { schema: { type: "string" } } } } } } },
    "/api/mcp/": { post: { operationId: "mcp", summary: "Model Context Protocol endpoint (JSON-RPC 2.0; tools: search, product details, categories, policies)", requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } }, responses: { 200: { description: "JSON-RPC response", content: J } } } },
  },
}, null, 2));
fs.mkdirSync(path.join(root, "public/.well-known"), { recursive: true });
fs.writeFileSync(path.join(root, "public/.well-known/api-catalog"), JSON.stringify(catalog, null, 2));

// --- 5. .well-known/agent-skills/index.json ---
const skills = {
  "$schema": "https://agentskills.io/schema/v0.2.0/index.json",
  name: SITE.name,
  url: `https://${SITE.domain}`,
  description: SITE.tagline,
  skills: [
    { name: "search-products", type: "commerce", description: "Search vapes by keyword, category, or price", url: `https://${SITE.domain}/api/mcp` },
    { name: "browse-catalog", type: "navigation", description: "Browse the full product catalog", url: `https://${SITE.domain}/shop/` }
  ]
};
fs.mkdirSync(path.join(root, "public/.well-known/agent-skills"), { recursive: true });
fs.writeFileSync(path.join(root, "public/.well-known/agent-skills/index.json"), JSON.stringify(skills, null, 2));

// --- 6. .well-known/mcp/server-card.json ---
const mcp = {
  "$schema": "https://modelcontextprotocol.io/schemas/server-card/v1.json",
  serverInfo: { name: SITE.name, version: "1.0.0", description: SITE.description, homepage: `https://${SITE.domain}`, contact: { email: SITE.contact.email, whatsapp: `+${SITE.contact.whatsapp}` } },
  transport: { type: "streamable-http", endpoint: `https://${SITE.domain}/api/mcp` },
  capabilities: {
    tools: [
      { name: "search_products", description: "Search products by keyword, category, max_price", inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string" }, max_price: { type: "number" } } } },
      { name: "get_product", description: "Get full product details by slug", inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" } } } }
    ],
    commerce: { ordering: "human-assisted-whatsapp-or-form", payment: ["crypto-BTC", "crypto-USDT", "crypto-USDC", "crypto-ETH", "crypto-BNB", "crypto-SOL", "giftcard-apple", "giftcard-razer", "giftcard-paysafe", "giftcard-sephora", "giftcard-macys", "cashapp", "apple-pay", "chime"], currency: SITE.contact.currency.code, minimumOrder: SITE.order.minOrder, freeShipping: SITE.order.freeShippingThreshold }
  }
};
fs.mkdirSync(path.join(root, "public/.well-known/mcp"), { recursive: true });
fs.writeFileSync(path.join(root, "public/.well-known/mcp/server-card.json"), JSON.stringify(mcp, null, 2));


// --- 6b. OAuth / OIDC / ACP / UCP discovery (public site: no auth, live read-only commerce endpoints) ---
const D = `https://${SITE.domain}`;
const wkw = (f, o) => fs.writeFileSync(path.join(root, "public/.well-known", f), JSON.stringify(o, null, 2));
wkw("oauth-protected-resource", { resource: D, resource_name: `${SITE.name} Public Catalog`, authorization_servers: [], scopes_supported: [], bearer_methods_supported: [], resource_documentation: `${D}/auth.md`, resource_policy_uri: `${D}/terms/`, note: "All catalog resources are public. No OAuth tokens are required." });
// ai-catalog (AI Catalog spec): lets registries and agents discover this site's machine-readable resources, with example queries for semantic indexing
const URN = "urn:air:" + SITE.domain.replace(/^www\./, "");
const AIC = {
  specVersion: "1.0",
  host: { name: SITE.name, url: D + "/", description: SITE.description, contact: SITE.contact.email, legalName: SITE.legalName },
  entries: [
    { identifier: URN + ":catalog:products", displayName: SITE.name + " product catalog (JSON)", type: "application/json", url: D + "/api/products/",
      representativeQueries: ["disposable vapes with free shipping", "Geek Bar Pulse flavors and prices", "nicotine pouches by strength", "nicotine free vape Nixodine", "nic salt e-liquid 50mg"] },
    { identifier: URN + ":search:site-search", displayName: SITE.name + " site search (Markdown)", type: "text/markdown", url: D + "/.well-known/search?q=",
      representativeQueries: ["best disposable vape brands", "lost mary flavors", "vape kits for beginners", "coils and pods for vapes", "vape juice 30ml"] },
    { identifier: URN + ":tools:mcp-server", displayName: SITE.name + " MCP server card", type: "application/mcp-server-card+json", url: D + "/.well-known/mcp/server-card.json",
      representativeQueries: ["search vape products by keyword", "get product details and price", "list product categories", "get shipping and return policy"] },
  ],
};
wkw("ai-catalog.json", AIC);
wkw("ard.json", AIC);
// poppy.json: public discovery declaration. Website-only (no sessions or auth), so no auth block is needed.
wkw("poppy.json", { protocol_version: "0.1", organization: { name: SITE.name, domain: SITE.domain.replace(/^www\./, "") }, web: {} });
wkw("oauth-authorization-server", { issuer: D, authorization_endpoint: null, token_endpoint: null, jwks_uri: null, grant_types_supported: [], response_types_supported: [], scopes_supported: [], note: `${SITE.name} has no protected APIs. All catalog resources are public.`, public_resources: [`${D}/shop/`, `${D}/blog/`, `${D}/llms.txt`, `${D}/.well-known/api-catalog`, `${D}/.well-known/agent-skills/index.json`, `${D}/.well-known/mcp/server-card.json`], agent_auth: { register_uri: null, identity_types_supported: ["none"], credential_types_supported: ["none"], notes: "No registration required. All content is publicly accessible to agents." } });
wkw("openid-configuration", { issuer: D, public_site: true, note: `${SITE.name} does not operate an OpenID Connect provider.`, authorization_endpoint: null, token_endpoint: null, userinfo_endpoint: null, jwks_uri: null, scopes_supported: [], response_types_supported: [], grant_types_supported: [], subject_types_supported: [], id_token_signing_alg_values_supported: [] });
wkw("acp.json", { protocol: { name: "acp", version: "0.1.0" }, name: SITE.name, description: SITE.description, api_base_url: D, homepage: D, transports: ["https"], capabilities: { services: ["product-catalog", "blog", "faq", "wholesale"], ordering: "human-assisted", catalog_endpoint: `${D}/api/acp/catalog`, currency: SITE.contact.currency.code, minimum_order: SITE.order.minOrder, free_shipping_threshold: SITE.order.freeShippingThreshold }, contact: { email: SITE.contact.email, whatsapp: `https://wa.me/${SITE.contact.whatsapp}` }, legal: { age_restriction: "21+", product_type: "nicotine products" } });
const UCPV = "2026-08-25";
// Only capabilities this site really provides are declared (vendor namespace, read-only catalog). Orders are completed by a human, so no dev.ucp.shopping checkout is advertised.
wkw("ucp", {
  ucp: {
    version: UCPV,
    services: {
      [URN.replace("urn:air:", "").split(".").reverse().join(".") + ".catalog"]: [
        { version: UCPV, spec: D + "/llms.txt", transport: "rest", endpoint: D + "/api/products/", schema: D + "/openapi.json" },
        { version: UCPV, spec: D + "/llms.txt", transport: "mcp", endpoint: D + "/api/mcp/", schema: D + "/.well-known/mcp/server-card.json" },
      ],
    },
    capabilities: {
      [URN.replace("urn:air:", "").split(".").reverse().join(".") + ".catalog.search"]: [{ version: UCPV, spec: D + "/llms.txt", schema: D + "/openapi.json" }],
      [URN.replace("urn:air:", "").split(".").reverse().join(".") + ".catalog.browse"]: [{ version: UCPV, spec: D + "/llms.txt", schema: D + "/openapi.json" }],
    },
  },
  spec: "https://ucp.dev/" + UCPV + "/specification/overview/",
  site: D,
  name: SITE.name,
  description: SITE.description,
  endpoints: { catalog: D + "/api/products/", categories: D + "/api/categories/", search: D + "/.well-known/search?q={query}", mcp: D + "/api/mcp/", openapi: D + "/openapi.json", api_catalog: D + "/.well-known/api-catalog", llms_txt: D + "/llms.txt" },
  currency: SITE.contact.currency.code,
  legal: { age_restriction: "21+", product_type: "nicotine products", ordering: "human-completed" },
});

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://embed.tawk.to https://*.tawk.to https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' https://*.tawk.to https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://*.tawk.to https://fonts.gstatic.com",
  "connect-src 'self' https://*.tawk.to wss://*.tawk.to",
  "frame-src 'self' https://*.tawk.to",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'"
].join("; ");
// --- 7. vercel.json ---
// renamed-image redirects live in middleware.js (src/data/image-map.json), not here: Vercel allows max 2,048 routes per deployment
const vercel = {
  "$schema": "https://openapi.vercel.sh/vercel.json",
  // apex -> www is configured in Vercel (Project > Domains); a www -> apex rule here would loop, so there is none.
  headers: [
    { source: "/((?!_next|favicon.ico).*)", headers: [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
      { key: "Content-Security-Policy-Report-Only", value: CSP },
      { key: "Link", value: "</.well-known/ard.json>; rel=\"ard\", </.well-known/openid-configuration>; rel=\"openid-configuration\", </.well-known/api-catalog>; rel=\"api-catalog\", </.well-known/agent-skills/index.json>; rel=\"describedby\", </llms.txt>; rel=\"describedby\", </.well-known/mcp/server-card.json>; rel=\"service-desc\", </auth.md>; rel=\"auth\"" }
    ]},
    { source: "/.well-known/api-catalog", headers: [{ key: "Content-Type", value: "application/linkset+json" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/.well-known/agent-skills/index.json", headers: [{ key: "Content-Type", value: "application/json" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/.well-known/mcp/server-card.json", headers: [{ key: "Content-Type", value: "application/json" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/auth.md", headers: [{ key: "Content-Type", value: "text/markdown; charset=utf-8" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/llms.txt", headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/.well-known/ard.json", headers: [{ key: "Content-Type", value: "application/json; charset=utf-8" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/.well-known/ai-catalog.json", headers: [{ key: "Content-Type", value: "application/json; charset=utf-8" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/.well-known/poppy.json", headers: [{ key: "Content-Type", value: "application/json; charset=utf-8" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/openapi.json", headers: [{ key: "Content-Type", value: "application/json; charset=utf-8" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/llms.md", headers: [{ key: "Content-Type", value: "text/markdown; charset=utf-8" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    // static images and logos: cache for 30 days (file names are keyword slugs and change only when renamed)
    { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
    { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
    { source: "/logos/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] }
  ]
};
fs.writeFileSync(path.join(root, "vercel.json"), JSON.stringify(vercel, null, 2));

console.log("Generated all static agent files and vercel.json successfully.");
