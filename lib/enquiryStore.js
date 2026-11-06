// lib/enquiryStore.js — contact + wholesale enquiries (one hash, sorted in memory).
import { kv } from "@/lib/redis";

const KEY = "osv:enquiries";

export async function saveEnquiry(e) {
  await kv.hset(KEY, e.id, e);
  return e;
}
export async function getEnquiry(id) {
  return (await kv.hget(KEY, id)) || null;
}
export async function listEnquiries() {
  const all = await kv.hgetall(KEY);
  return Object.values(all).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}
export async function deleteEnquiry(id) {
  await kv.hdel(KEY, id);
}
export async function markEnquiryReplied(id) {
  const e = await getEnquiry(id);
  if (!e) return null;
  const next = { ...e, status: "replied", repliedAt: new Date().toISOString() };
  await saveEnquiry(next);
  return next;
}
