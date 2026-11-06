// lib/adminAuth.js — server-only passcode check for every /api/admin/* route.
// ADMIN_PASSCODE must be set in the environment (Vercel → Settings → Environment Variables).
// There is NO fallback passcode: when it is unset the admin API answers 503, never "open".
import { timingSafeEqual } from "node:crypto";

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

// Returns null when the caller is authorised, otherwise a Response to send back.
export function checkAdminPasscode(request) {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) {
    return Response.json({ error: "Admin portal is not configured. Set ADMIN_PASSCODE on the server." }, { status: 503 });
  }
  const given = request.headers.get("x-admin-passcode") || "";
  if (!given || !safeEqual(given, expected)) {
    return Response.json({ error: "Unauthorised" }, { status: 401 });
  }
  return null;
}
