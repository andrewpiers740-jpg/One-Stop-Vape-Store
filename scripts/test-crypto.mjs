// Offline test of the payment-matching logic with canned explorer responses (no network, no real funds).
// Run: node --import ./scripts/register-alias.mjs scripts/test-crypto.mjs
import assert from "node:assert/strict";
import { WALLETS } from "../src/config/wallets.js";

const A = {
  btc: WALLETS.BTC.networks[0].address,
  trc: WALLETS.USDT.networks[1].address,
  eth: WALLETS.ETH.networks[0].address,
};
let canned = {};
const realFetch = globalThis.fetch;
globalThis.fetch = async (url) => {
  const u = String(url);
  if (u.includes("coingecko")) return Response.json({ bitcoin: { usd: 100000 }, tether: { usd: 1 }, "usd-coin": { usd: 1 }, ethereum: { usd: 2000 }, binancecoin: { usd: 600 }, solana: { usd: 100 } });
  for (const [needle, body] of Object.entries(canned)) if (u.includes(needle)) return Response.json(body);
  return new Response("nope", { status: 404 });
};

const { verifyCryptoPayment } = await import("../lib/cryptoVerify.js");
const now = Date.now();
const base = (over) => ({ orderNumber: "OSV-TESTAA", total: 150, createdAt: new Date(now).toISOString(), ...over });

// 1) BTC: confirmed tx worth ~$150 (0.0015 BTC @ 100k) → confirmed
canned = { [`/address/${A.btc}/txs`]: [{ txid: "tx-btc-1", vout: [{ scriptpubkey_address: A.btc, value: 150000 }], status: { confirmed: true, block_time: Math.floor(now / 1000) } }] };
let r = await verifyCryptoPayment(base({ cryptoToken: "BTC", cryptoNetworkId: "bitcoin" }));
assert.equal(r.state, "confirmed"); assert.equal(r.txHash, "tx-btc-1");

// 2) The same tx cannot pay a second order
r = await verifyCryptoPayment(base({ orderNumber: "OSV-TESTBB", cryptoToken: "BTC", cryptoNetworkId: "bitcoin" }));
assert.equal(r.state, "pending", "tx already claimed by another order");

// 3) Unconfirmed → detected (not paid yet)
canned = { [`/address/${A.btc}/txs`]: [{ txid: "tx-btc-2", vout: [{ scriptpubkey_address: A.btc, value: 150000 }], status: { confirmed: false } }] };
r = await verifyCryptoPayment(base({ orderNumber: "OSV-TESTCC", cryptoToken: "BTC", cryptoNetworkId: "bitcoin" }));
assert.equal(r.state, "detected");

// 4) Underpaid (half the amount)
canned = { [`/address/${A.btc}/txs`]: [{ txid: "tx-btc-3", vout: [{ scriptpubkey_address: A.btc, value: 75000 }], status: { confirmed: true, block_time: Math.floor(now / 1000) } }] };
r = await verifyCryptoPayment(base({ orderNumber: "OSV-TESTDD", cryptoToken: "BTC", cryptoNetworkId: "bitcoin" }));
assert.equal(r.state, "underpaid"); assert.ok(r.receivedUsd < 100);

// 5) Old transaction (before the order window) is ignored
canned = { [`/address/${A.btc}/txs`]: [{ txid: "tx-btc-4", vout: [{ scriptpubkey_address: A.btc, value: 150000 }], status: { confirmed: true, block_time: Math.floor(now / 1000) - 86400 } }] };
r = await verifyCryptoPayment(base({ orderNumber: "OSV-TESTEE", cryptoToken: "BTC", cryptoNetworkId: "bitcoin" }));
assert.equal(r.state, "pending");

// 6) TRC20 USDT: 150.000 USDT → confirmed
canned = { [`/accounts/${A.trc}/transactions/trc20`]: { data: [{ transaction_id: "tron-1", token_info: { decimals: 6 }, block_timestamp: now, value: "150000000" }] } };
r = await verifyCryptoPayment(base({ orderNumber: "OSV-TESTFF", cryptoToken: "USDT", cryptoNetworkId: "trc20" }));
assert.equal(r.state, "confirmed");

// 7) Native ETH: 0.075 ETH @ 2000 = $150 → confirmed
canned = { [`/addresses/${A.eth}/transactions`]: { items: [{ hash: "0xeth1", to: { hash: A.eth }, value: String(75n * 10n ** 15n), timestamp: new Date(now).toISOString(), status: "ok", confirmations: 4 }] } };
r = await verifyCryptoPayment(base({ orderNumber: "OSV-TESTGG", cryptoToken: "ETH", cryptoNetworkId: "ethereum" }));
assert.equal(r.state, "confirmed");

// 8) Explorer down → unavailable (never a false "paid")
canned = {};
r = await verifyCryptoPayment(base({ orderNumber: "OSV-TESTHH", cryptoToken: "ETH", cryptoNetworkId: "ethereum" }));
assert.equal(r.state, "unavailable");

globalThis.fetch = realFetch;
console.log("crypto matching: all 8 scenarios passed");
