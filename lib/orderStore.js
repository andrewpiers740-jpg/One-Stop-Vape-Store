// lib/orderStore.js — orders live in one Redis hash; sorted in memory (volume is small).
import { randomBytes, timingSafeEqual } from "node:crypto";
import { kv, isStoreConfigured } from "@/lib/redis";

const ORDERS = "osv:orders";
const TXS = "osv:usedtx";
const PROOF = (id, n) => `osv:proof:${id}:${n}`;

export function newAccessToken() {
  return randomBytes(24).toString("base64url");
}

export function tokenMatches(order, token) {
  if (!order?.token || typeof token !== "string" || !token) return false;
  const a = Buffer.from(order.token);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export { isStoreConfigured };

export async function saveOrder(order) {
  await kv.hset(ORDERS, order.orderNumber, order);
  return order;
}

export async function getOrder(id) {
  if (!id) return null;
  return (await kv.hget(ORDERS, id)) || null;
}

export async function listOrders() {
  const all = await kv.hgetall(ORDERS);
  return Object.values(all).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

export async function deleteOrder(id) {
  await kv.hdel(ORDERS, id);
  for (let n = 0; n < 6; n++) await kv.del(PROOF(id, n));
}

export async function updateOrder(id, patch) {
  const o = await getOrder(id);
  if (!o) return null;
  const next = { ...o, ...patch, updatedAt: new Date().toISOString() };
  await saveOrder(next);
  return next;
}

// Strip secrets before sending an order to a browser.
export function publicOrder(o) {
  if (!o) return null;
  const { token: _t, ...rest } = o;
  return rest;
}

export async function markOrderSent(id, paymentDetails) {
  return updateOrder(id, { status: "payment-sent", paymentDetails, paymentSentAt: new Date().toISOString() });
}

export async function markPaymentSubmitted(id, patch = {}) {
  const o = await getOrder(id);
  if (!o || o.status === "payment-confirmed" || o.status === "shipped") return o;
  return updateOrder(id, { status: "payment-submitted", paymentSubmittedAt: new Date().toISOString(), ...patch });
}

export async function markPaymentConfirmed(id, patch = {}) {
  return updateOrder(id, { status: "payment-confirmed", paymentConfirmedAt: new Date().toISOString(), ...patch });
}

// A blockchain transaction can pay only ONE order.
export async function claimTx(txKey, orderId) {
  const existing = await kv.hget(TXS, txKey);
  if (existing && existing !== orderId) return false;
  if (!existing) await kv.hset(TXS, txKey, orderId);
  return true;
}

export async function saveProof(id, proof) {
  const o = await getOrder(id);
  const n = (o?.proofCount || 0);
  if (n >= 6) return null;
  await kv.set(PROOF(id, n), proof);
  await updateOrder(id, { proofCount: n + 1 });
  return n;
}

export async function getProofs(id) {
  const o = await getOrder(id);
  const out = [];
  for (let n = 0; n < (o?.proofCount || 0); n++) {
    const p = await kv.get(PROOF(id, n));
    if (p) out.push(p);
  }
  return out;
}
