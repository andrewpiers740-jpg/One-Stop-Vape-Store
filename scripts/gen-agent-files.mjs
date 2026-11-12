import fs from "fs";
import path from "path";
import { SITE, CATEGORIES } from "../src/config/site.js";

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
Sitemap: https://${SITE.domain}/sitemap.xml

Content-Signal: search=yes, ai-input=yes, ai-train=no

# AI crawlers — welcome to index product and content pages
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Meta-ExternalAgent
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
${CATEGORIES.map(c => `- [${c.name}](https://${SITE.domain}/shop/${c.slug}/): ${c.description}`).join("\n")}

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
`;
fs.writeFileSync(path.join(root, "public/llms.txt"), llms);

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
| FAQ | https://${SITE.domain}/faq/ |
| Wholesale | https://${SITE.domain}/wholesale/ |

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
  ]
};
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
wkw("openid-configuration", { issuer: D, public_site: true, note: `${SITE.name} does not operate an OpenID Connect provider.`, authorization_endpoint: null, token_endpoint: null, userinfo_endpoint: null, jwks_uri: null, scopes_supported: [], response_types_supported: [], grant_types_supported: [], subject_types_supported: [], id_token_signing_alg_values_supported: [] });
wkw("acp.json", { protocol: { name: "acp", version: "0.1.0" }, name: SITE.name, description: SITE.description, api_base_url: D, homepage: D, transports: ["https"], capabilities: { services: ["product-catalog", "blog", "faq", "wholesale"], ordering: "human-assisted", catalog_endpoint: `${D}/api/acp/catalog`, currency: SITE.contact.currency.code, minimum_order: SITE.order.minOrder, free_shipping_threshold: SITE.order.freeShippingThreshold }, contact: { email: SITE.contact.email, whatsapp: `https://wa.me/${SITE.contact.whatsapp}` }, legal: { age_restriction: "21+", product_type: "nicotine products" } });
wkw("ucp", { ucp: "1.0", protocol_version: "1.0", spec: "https://ucp.dev/specification/overview/", schema: "https://ucp.dev/schema/v1.json", site: D, name: SITE.name, description: SITE.description, services: [{ id: "product-catalog", type: "catalog", url: `${D}/shop/` }, { id: "ucp-services", type: "commerce", url: `${D}/api/ucp/services`, description: "Read-only; orders are completed by a human" }], capabilities: ["browse", "inquiry", "content"], endpoints: { catalog: `${D}/api/products`, mcp: `${D}/api/mcp`, api_catalog: `${D}/.well-known/api-catalog`, llms_txt: `${D}/llms.txt` }, currency: SITE.contact.currency.code, legal: { age_restriction: "21+", product_type: "nicotine products" } });

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
const vercel = {
  "$schema": "https://openapi.vercel.sh/vercel.json",
  // apex -> www is configured in Vercel (Project > Domains); a www -> apex rule here would loop, so there is none.
  redirects: [
  ],
  headers: [
    { source: "/((?!_next|favicon.ico).*)", headers: [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
      { key: "Content-Security-Policy-Report-Only", value: CSP },
      { key: "Link", value: "</.well-known/openid-configuration>; rel=\"openid-configuration\", </.well-known/api-catalog>; rel=\"api-catalog\", </.well-known/agent-skills/index.json>; rel=\"describedby\", </llms.txt>; rel=\"describedby\", </.well-known/mcp/server-card.json>; rel=\"service-desc\", </auth.md>; rel=\"auth\"" }
    ]},
    { source: "/.well-known/api-catalog", headers: [{ key: "Content-Type", value: "application/linkset+json" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/.well-known/agent-skills/index.json", headers: [{ key: "Content-Type", value: "application/json" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/.well-known/mcp/server-card.json", headers: [{ key: "Content-Type", value: "application/json" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/auth.md", headers: [{ key: "Content-Type", value: "text/markdown; charset=utf-8" }, { key: "Access-Control-Allow-Origin", value: "*" }] },
    { source: "/llms.txt", headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }, { key: "Access-Control-Allow-Origin", value: "*" }] }
  ]
};
fs.writeFileSync(path.join(root, "vercel.json"), JSON.stringify(vercel, null, 2));

console.log("Generated all static agent files and vercel.json successfully.");
