import protectedResource from "@/src/data/well-known/oauth-protected-resource.json";
import authServer from "@/src/data/well-known/oauth-authorization-server.json";
import oidc from "@/src/data/well-known/openid-configuration.json";
import ucp from "@/src/data/well-known/ucp.json";

// /.well-known/<name> (rewritten here in next.config.ts) for the extensionless discovery files, so they are served as application/json.
const FILES = { "oauth-protected-resource": protectedResource, "oauth-authorization-server": authServer, "openid-configuration": oidc, ucp };

export async function GET(_request, { params }) {
  const { name } = await params;
  const body = FILES[name];
  if (!body) return new Response("Not found", { status: 404 });
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
