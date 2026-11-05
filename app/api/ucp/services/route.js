import { NextResponse } from "next/server";
import { SITE } from "@/src/config/site";

export async function GET() {
  return NextResponse.json({
    ucp: "1.0",
    protocol_version: "1.0",
    site: `https://${SITE.domain}`,
    name: SITE.name,
    services: [
      { id: "product-catalog", type: "catalog", url: `https://${SITE.domain}/shop/` },
      { id: "mcp-server", type: "mcp", url: `https://${SITE.domain}/api/mcp` },
      { id: "wholesale", type: "b2b", url: `https://${SITE.domain}/wholesale/` }
    ]
  });
}
