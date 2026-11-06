// POST /api/mcp — minimal stateless MCP server (Streamable HTTP, JSON responses only).
// READ-ONLY: exactly the two tools advertised in /.well-known/mcp/server-card.json. No ordering, no payment capture.
import products from "@/src/data/products.json";
import { SITE } from "@/src/config/site";
import { searchProducts } from "@/lib/productSearch";

export const dynamic = "force-dynamic";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id" };
const TOOLS = [
  { name: "search_products", description: "Search products by keyword, category, max_price", inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string" }, max_price: { type: "number" } } } },
  { name: "get_product", description: "Get full product details by slug", inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" } } } },
];
const ok = (id, result) => Response.json({ jsonrpc: "2.0", id, result }, { headers: CORS });
const err = (id, code, message) => Response.json({ jsonrpc: "2.0", id, error: { code, message } }, { headers: CORS });
const text = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj) }] });

export const OPTIONS = () => new Response(null, { status: 204, headers: CORS });
export const GET = () => new Response("MCP endpoint: POST JSON-RPC 2.0", { status: 405, headers: { ...CORS, Allow: "POST, OPTIONS" } });

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return err(null, -32700, "Parse error"); }
  const { id = null, method, params = {} } = body || {};
  if (method === "initialize") {
    return ok(id, { protocolVersion: "2025-03-26", capabilities: { tools: {} }, serverInfo: { name: SITE.name, version: "1.0.0" } });
  }
  if (method === "notifications/initialized") return new Response(null, { status: 202, headers: CORS });
  if (method === "tools/list") return ok(id, { tools: TOOLS });
  if (method === "tools/call") {
    const { name, arguments: a = {} } = params;
    if (name === "search_products") return ok(id, text(searchProducts({ q: a.query, category: a.category, maxPrice: a.max_price })));
    if (name === "get_product") {
      if (typeof a.slug !== "string") return err(id, -32602, "slug is required");
      const p = products.find((x) => x.slug === a.slug);
      if (!p) return err(id, -32602, "Unknown product");
      return ok(id, text({ ...p, currency: SITE.contact.currency.code, url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`, image: `https://${SITE.domain}${p.image}` }));
    }
    return err(id, -32602, "Unknown tool");
  }
  return err(id, -32601, "Method not found");
}
