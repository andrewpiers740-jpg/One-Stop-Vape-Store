// lib/cryptoVerify.js — automatic payment detection. Reads PUBLIC blockchain data for the shop wallet
// (no keys, no custody) and matches an incoming transfer to an order by USD value + time window.
//
// A transaction can pay ONE order (claimTx). Anything not matched stays "pending" and the customer can still
// upload a screenshot, which the owner checks by hand.
import { getNetwork, getToken } from "@/src/config/wallets";
import { getRates } from "@/lib/cryptoRate";
import { claimTx } from "@/lib/orderStore";

const T = 9000;
const j = async (url, init = {}) => {
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(T), headers: { accept: "application/json", ...(init.headers || {}) }, ...init });
  if (!res.ok) throw new Error(`${new URL(url).host} ${res.status}`);
  return res.json();
};
const rpc = (method, params) =>
  j(process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  }).then((r) => {
    if (r.error) throw new Error(r.error.message);
    return r.result;
  });

// Every reader returns incoming transfers: [{ hash, amount (coins, float), time (ms), confirmed }]
const readers = {
  async btc(net) {
    // Same Esplora API on several public hosts — first one that answers wins.
    let txs = null;
    let lastErr;
    for (const host of ["https://blockstream.info/api", "https://mempool.space/api", "https://mempool.emzy.de/api"]) {
      try {
        txs = await j(`${host}/address/${net.address}/txs`);
        break;
      } catch (e) {
        lastErr = e;
      }
    }
    if (!txs) throw lastErr;
    return txs.flatMap((tx) => {
      const sats = tx.vout.filter((o) => o.scriptpubkey_address === net.address).reduce((s, o) => s + o.value, 0);
      return sats > 0 ? [{ hash: tx.txid, amount: sats / 1e8, time: (tx.status?.block_time || Date.now() / 1000) * 1000, confirmed: Boolean(tx.status?.confirmed) }] : [];
    });
  },

  async "evm-eth"(net) {
    const base = `https://eth.blockscout.com/api/v2/addresses/${net.address}`;
    if (!net.contract) {
      const d = await j(`${base}/transactions?filter=to`);
      return (d.items || [])
        .filter((t) => t.to?.hash?.toLowerCase() === net.address.toLowerCase() && Number(t.value) > 0 && t.status !== "error")
        .map((t) => ({ hash: t.hash, amount: Number(t.value) / 10 ** net.chainDecimals, time: Date.parse(t.timestamp), confirmed: (t.confirmations ?? 1) >= 1 }));
    }
    const d = await j(`${base}/token-transfers?type=ERC-20&filter=to`);
    return (d.items || [])
      .filter((t) => (t.token?.address_hash || t.token?.address || "").toLowerCase() === net.contract.toLowerCase())
      .map((t) => ({
        hash: t.transaction_hash || t.tx_hash,
        amount: Number(t.total?.value) / 10 ** Number(t.total?.decimals ?? net.chainDecimals),
        time: Date.parse(t.timestamp),
        confirmed: true,
      }));
  },

  async "evm-bsc"(net) {
    // No keyless public source exists for BNB Smart Chain account history. With ETHERSCAN_API_KEY set (Etherscan V2,
    // chainid 56) it is auto-verified; without it this throws, the order stays "pending" and the owner confirms the
    // customer's screenshot by hand.
    const key = process.env.ETHERSCAN_API_KEY;
    if (!key) throw new Error("bsc auto-verify needs ETHERSCAN_API_KEY");
    const d = await j(`https://api.etherscan.io/v2/api?chainid=56&module=account&action=txlist&address=${net.address}&sort=desc&page=1&offset=40&apikey=${key}`);
    if (d.status !== "1" && !/no transactions/i.test(d.message || "")) throw new Error(`etherscan: ${d.message} ${typeof d.result === "string" ? d.result : ""}`);
    const list = Array.isArray(d.result) ? d.result : [];
    return list
      .filter((t) => t.to?.toLowerCase() === net.address.toLowerCase() && t.isError !== "1" && Number(t.value) > 0)
      .map((t) => ({ hash: t.hash, amount: Number(t.value) / 1e18, time: Number(t.timeStamp) * 1000, confirmed: Number(t.confirmations ?? 1) >= 1 }));
  },

  async tron(net) {
    const d = await j(`https://api.trongrid.io/v1/accounts/${net.address}/transactions/trc20?only_to=true&limit=50&contract_address=${net.contract}`);
    return (d.data || []).map((t) => ({ hash: t.transaction_id, amount: Number(t.value) / 10 ** Number(t.token_info?.decimals ?? net.chainDecimals), time: t.block_timestamp, confirmed: true }));
  },

  async sol(net) {
    const out = [];
    let accounts = [net.address];
    if (net.contract) {
      const ta = await rpc("getTokenAccountsByOwner", [net.address, { mint: net.contract }, { encoding: "jsonParsed" }]);
      accounts = (ta.value || []).map((a) => a.pubkey);
    }
    for (const acct of accounts.slice(0, 3)) {
      const sigs = await rpc("getSignaturesForAddress", [acct, { limit: 12 }]);
      for (const s of sigs.filter((x) => !x.err).slice(0, 12)) {
        const tx = await rpc("getTransaction", [s.signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0, commitment: "confirmed" }]).catch(() => null);
        if (!tx?.meta) continue;
        let amount = 0;
        if (net.contract) {
          const sum = (arr) => (arr || []).filter((b) => b.owner === net.address && b.mint === net.contract).reduce((a, b) => a + Number(b.uiTokenAmount?.uiAmountString || 0), 0);
          amount = sum(tx.meta.postTokenBalances) - sum(tx.meta.preTokenBalances);
        } else {
          const idx = tx.transaction.message.accountKeys.findIndex((k) => (k.pubkey || k) === net.address);
          if (idx >= 0) amount = (tx.meta.postBalances[idx] - tx.meta.preBalances[idx]) / 1e9;
        }
        if (amount > 0) out.push({ hash: s.signature, amount, time: (tx.blockTime || Date.now() / 1000) * 1000, confirmed: true });
      }
    }
    return out;
  },
};

/**
 * verifyCryptoPayment(order) →
 *   { state: "confirmed" | "detected" | "underpaid" | "pending" | "unavailable", txHash?, receivedUsd?, expectedUsd }
 * Only "confirmed" should mark the order paid automatically.
 */
export async function verifyCryptoPayment(order) {
  const token = getToken(order.cryptoToken);
  const net = token ? getNetwork(order.cryptoToken, order.cryptoNetworkId) : null;
  const expectedUsd = order.total;
  if (!token || !net) return { state: "unavailable", expectedUsd };
  const reader = readers[net.chain];
  const rates = await getRates();
  if (!reader || !rates?.rates?.[order.cryptoToken]) return { state: "unavailable", expectedUsd };
  const rate = rates.rates[order.cryptoToken];

  let transfers;
  try {
    transfers = await reader(net);
  } catch (err) {
    console.error("[crypto-verify]", order.orderNumber, err.message);
    return { state: "unavailable", expectedUsd };
  }

  const since = Date.parse(order.createdAt) - 3 * 3600_000; // customer may pay while the popup is open, before "I have paid"
  const stable = ["USDT", "USDC"].includes(order.cryptoToken);
  const low = expectedUsd * (stable ? 0.99 : 0.97);
  const candidates = transfers
    .filter((t) => t.time >= since && t.hash)
    .map((t) => ({ ...t, usd: t.amount * rate }))
    .sort((a, b) => Math.abs(a.usd - expectedUsd) - Math.abs(b.usd - expectedUsd));

  for (const c of candidates) {
    if (c.usd < low) continue;
    const key = `${net.chain}:${c.hash}`;
    if (!(await claimTx(key, order.orderNumber))) continue; // already used by another order
    return { state: c.confirmed ? "confirmed" : "detected", txHash: c.hash, receivedUsd: Math.round(c.usd * 100) / 100, expectedUsd };
  }
  const near = candidates.find((c) => c.usd >= expectedUsd * 0.3 && c.usd < low);
  if (near) return { state: "underpaid", txHash: near.hash, receivedUsd: Math.round(near.usd * 100) / 100, expectedUsd };
  return { state: "pending", expectedUsd };
}

// Which tokens can be verified automatically right now (BNB needs ETHERSCAN_API_KEY).
export function autoVerifySupported(chain) {
  return chain === "evm-bsc" ? Boolean(process.env.ETHERSCAN_API_KEY) : Boolean(readers[chain]);
}
