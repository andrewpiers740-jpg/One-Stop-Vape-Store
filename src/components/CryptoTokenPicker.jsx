"use client";
import { CRYPTO_TOKENS, WALLETS, getNetworks } from "@/src/config/wallets";

// Token dropdown, then a network dropdown only for tokens with more than one network.
//   pay      : { token, network }
//   onChange : (nextPay) => void
//   onReady  : (token, networkId) => void — fires once the token (and its network, if several) is chosen; opens the pay popup
export default function CryptoTokenPicker({ pay, onChange, onReady }) {
  const tokens = CRYPTO_TOKENS.filter((t) => getNetworks(t).length > 0);
  const networks = pay.token ? getNetworks(pay.token) : [];
  const needsNetwork = networks.length > 1;
  const cls = "w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none";

  const setToken = (token) => {
    const nets = token ? getNetworks(token) : [];
    if (nets.length === 1) {
      onChange({ ...pay, token, network: nets[0].id });
      onReady?.(token, nets[0].id);
    } else {
      onChange({ ...pay, token, network: "" });
    }
  };
  const setNetwork = (network) => {
    onChange({ ...pay, network });
    if (network) onReady?.(pay.token, network);
  };

  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="pay-token" className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-600">Crypto token</label>
        <select id="pay-token" value={pay.token} onChange={(e) => setToken(e.target.value)} className={cls}>
          <option value="">Select a token…</option>
          {tokens.map((t) => (
            <option key={t} value={t}>{WALLETS[t].name} ({t})</option>
          ))}
        </select>
      </div>
      {pay.token && needsNetwork ? (
        <div>
          <label htmlFor="pay-network" className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-600">Network</label>
          <select id="pay-network" value={pay.network} onChange={(e) => setNetwork(e.target.value)} className={cls}>
            <option value="">Select a network…</option>
            {networks.map((n) => (
              <option key={n.id} value={n.id}>{n.label}</option>
            ))}
          </select>
        </div>
      ) : null}
      {pay.token && pay.network ? (
        <button type="button" onClick={() => onReady?.(pay.token, pay.network)} className="text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-600">
          Re-open payment window
        </button>
      ) : null}
    </div>
  );
}
