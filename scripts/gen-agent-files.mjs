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
    commerce: { ordering: "human-assisted-whatsapp-or-form", payment: ["crypto-BTC", "crypto-USDT", "apple-pay", "cashapp"], currency: SITE.contact.currency.code, minimumOrder: SITE.order.minOrder, freeShipping: SITE.order.freeShippingThreshold }
  }
};
fs.mkdirSync(path.join(root, "public/.well-known/mcp"), { recursive: true });
fs.writeFileSync(path.join(root, "public/.well-known/mcp/server-card.json"), JSON.stringify(mcp, null, 2));

// --- 7. vercel.json ---
const vercel = {
  "$schema": "https://openapi.vercel.sh/vercel.json",
  redirects: [
    { source: "/:path*", has: [{ type: "host", value: `www.${SITE.domain}` }], destination: `https://${SITE.domain}/:path*`, permanent: true }
  ],
  headers: [
    { source: "/((?!_next|favicon.ico).*)", headers: [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
      { key: "Link", value: "</.well-known/api-catalog>; rel=\"api-catalog\", </.well-known/agent-skills/index.json>; rel=\"describedby\", </llms.txt>; rel=\"describedby\", </.well-known/mcp/server-card.json>; rel=\"service-desc\", </auth.md>; rel=\"auth\"" }
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
