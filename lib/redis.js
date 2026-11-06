// lib/redis.js — storage client for orders / enquiries / rate limits.
// Production: Upstash Redis (Vercel Storage → Upstash). Any env prefix Vercel generates is detected
// (UPSTASH_REDIS_REST_*, KV_REST_API_*, STORAGE_KV_REST_API_*, ...).
// Development without credentials: an in-memory store so the whole flow can be tested locally.
// Production without credentials: isStoreConfigured() is false and callers degrade (emails still send).
import { Redis } from "@upstash/redis";

function findCreds() {
  const env = process.env;
  for (const key of Object.keys(env)) {
    const m = key.match(/^(.*?)(UPSTASH_REDIS_REST_URL|KV_REST_API_URL|REDIS_REST_URL)$/);
    if (!m) continue;
    const prefix = m[1];
    const tokenKey = Object.keys(env).find((k) => k === `${prefix}${m[2].replace("_URL", "_TOKEN")}`);
    if (env[key] && tokenKey && env[tokenKey]) return { url: env[key], token: env[tokenKey] };
  }
  return null;
}

const globalMem = globalThis.__osvMem || (globalThis.__osvMem = { kv: new Map(), hashes: new Map(), exp: new Map() });
const memAllowed = process.env.NODE_ENV !== "production";

let client = null;
function redis() {
  if (client) return client;
  const creds = findCreds();
  if (!creds) return null;
  client = new Redis(creds);
  return client;
}

export function isStoreConfigured() {
  return Boolean(findCreds()) || memAllowed;
}

export function isPersistent() {
  return Boolean(findCreds());
}

function memAlive(key) {
  const at = globalMem.exp.get(key);
  if (at && at < Date.now()) {
    globalMem.kv.delete(key);
    globalMem.hashes.delete(key);
    globalMem.exp.delete(key);
    return false;
  }
  return true;
}

export const kv = {
  async hgetall(key) {
    const r = redis();
    if (r) return (await r.hgetall(key)) || {};
    memAlive(key);
    return Object.fromEntries(globalMem.hashes.get(key) || []);
  },
  async hget(key, field) {
    const r = redis();
    if (r) return (await r.hget(key, field)) ?? null;
    memAlive(key);
    return globalMem.hashes.get(key)?.get(field) ?? null;
  },
  async hset(key, field, value) {
    const r = redis();
    if (r) return r.hset(key, { [field]: value });
    if (!globalMem.hashes.has(key)) globalMem.hashes.set(key, new Map());
    globalMem.hashes.get(key).set(field, JSON.parse(JSON.stringify(value)));
    return 1;
  },
  async hdel(key, field) {
    const r = redis();
    if (r) return r.hdel(key, field);
    return globalMem.hashes.get(key)?.delete(field) ? 1 : 0;
  },
  async get(key) {
    const r = redis();
    if (r) return (await r.get(key)) ?? null;
    return memAlive(key) ? globalMem.kv.get(key) ?? null : null;
  },
  async set(key, value, ttlSeconds) {
    const r = redis();
    if (r) return ttlSeconds ? r.set(key, value, { ex: ttlSeconds }) : r.set(key, value);
    globalMem.kv.set(key, JSON.parse(JSON.stringify(value)));
    if (ttlSeconds) globalMem.exp.set(key, Date.now() + ttlSeconds * 1000);
    return "OK";
  },
  async del(key) {
    const r = redis();
    if (r) return r.del(key);
    globalMem.kv.delete(key);
    return 1;
  },
  async incr(key, ttlSeconds) {
    const r = redis();
    if (r) {
      const n = await r.incr(key);
      if (n === 1 && ttlSeconds) await r.expire(key, ttlSeconds);
      return n;
    }
    const alive = memAlive(key);
    const n = (alive ? globalMem.kv.get(key) || 0 : 0) + 1;
    globalMem.kv.set(key, n);
    if (n === 1 && ttlSeconds) globalMem.exp.set(key, Date.now() + ttlSeconds * 1000);
    return n;
  },
};

// Best-effort rate limit: returns true when the caller is OVER the limit.
export async function rateLimited(bucket, max, windowSeconds) {
  try {
    const n = await kv.incr(`osv:rl:${bucket}`, windowSeconds);
    return n > max;
  } catch {
    return false; // never block a real customer because the limiter failed
  }
}
