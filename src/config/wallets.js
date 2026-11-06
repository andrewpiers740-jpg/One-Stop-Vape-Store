// src/config/wallets.js — the ONE place crypto wallet addresses are set.
//
// PUBLIC receiving addresses only. Never put a private key, seed phrase or exchange password in this project.
//
// Each token lists one or more networks. At checkout:
//   - a token with several networks (USDT) shows a network dropdown, and the payment popup opens
//     once the customer picks a network;
//   - a token with a single network opens the popup as soon as the token is chosen.
//
// Per network:
//   id       network key stored on the order
//   label    network name shown to the customer
//   address  public wallet address (set '' to switch that option off)
//   chain    how the automatic payment watcher reads the blockchain: btc | evm-eth | evm-bsc | tron | sol
//   contract token contract / mint for token transfers (omit for the chain's native coin)
//   decimals on-chain precision of the asset
//   memo     optional memo / destination tag
//
// QR codes are generated in the browser from the address, so the QR always matches it.
// Live pricing uses `coingeckoId`; `decimals` (token level) is how many decimals the quote shows.

export const WALLETS = {
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    coingeckoId: "bitcoin",
    decimals: 8,
    networks: [
      { id: "bitcoin", label: "Bitcoin (BTC)", address: "bc1qmk9d29mm2ekf59gkssgd9092p3wjdc3x2de7ju", chain: "btc", chainDecimals: 8, memo: "" },
    ],
  },
  USDT: {
    name: "Tether",
    symbol: "USDT",
    coingeckoId: "tether",
    decimals: 3,
    networks: [
      {
        id: "erc20", label: "Ethereum (ERC20)", address: "0x97F62Cc4874Ea8D0D3cD742E6DED871b7e577812",
        chain: "evm-eth", contract: "0xdAC17F958D2ee523a2206206994597C13D831ec7", chainDecimals: 6, memo: "",
      },
      {
        id: "trc20", label: "Tron (TRC20)", address: "TEEydoxPa4Gntq7jigSB2eYWLEqoQB74qw",
        chain: "tron", contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", chainDecimals: 6, memo: "",
      },
    ],
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    coingeckoId: "usd-coin",
    decimals: 3,
    networks: [
      {
        id: "solana", label: "Solana (SOL)", address: "BFHZNjNYgya3g69Ud5H6Rued21YdhE6AKsDy9Red6dFo",
        chain: "sol", contract: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", chainDecimals: 6, memo: "",
      },
    ],
  },
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    coingeckoId: "ethereum",
    decimals: 6,
    networks: [
      { id: "ethereum", label: "Ethereum (ETH)", address: "0x97F62Cc4874Ea8D0D3cD742E6DED871b7e577812", chain: "evm-eth", chainDecimals: 18, memo: "" },
    ],
  },
  BNB: {
    name: "BNB",
    symbol: "BNB",
    coingeckoId: "binancecoin",
    decimals: 5,
    networks: [
      // Network was not specified by the owner; BNB Smart Chain (BEP20) uses the same 0x address format.
      { id: "bsc", label: "BNB Smart Chain (BEP20)", address: "0x97F62Cc4874Ea8D0D3cD742E6DED871b7e577812", chain: "evm-bsc", chainDecimals: 18, memo: "" },
    ],
  },
  SOL: {
    name: "Solana",
    symbol: "SOL",
    coingeckoId: "solana",
    decimals: 4,
    networks: [
      { id: "solana", label: "Solana (SOL)", address: "BFHZNjNYgya3g69Ud5H6Rued21YdhE6AKsDy9Red6dFo", chain: "sol", chainDecimals: 9, memo: "" },
    ],
  },
};

export const CRYPTO_TOKENS = Object.keys(WALLETS);

export function getToken(symbol) {
  return WALLETS[symbol] || null;
}

// Networks that are switched on (have an address).
export function getNetworks(symbol) {
  const t = WALLETS[symbol];
  return t ? t.networks.filter((n) => n.address && !n.address.startsWith("REPLACE_")) : [];
}

export function getNetwork(symbol, networkId) {
  return getNetworks(symbol).find((n) => n.id === networkId) || null;
}

// Where a customer without crypto can buy it with a card / bank. MoonPay is the primary on-ramp; the others are
// shown as alternatives in the payment window. The customer buys the coin, picks the network shown in our window,
// then withdraws/sends it to the shop wallet address (copy button right there). Nothing about the customer is put
// in any URL.
export const BUY_CRYPTO_LINKS = [
  { id: "coinbase", label: "Coinbase", url: "https://www.coinbase.com/buy-crypto" },
  { id: "transak", label: "Transak", url: "https://global.transak.com/" },
  { id: "changelly", label: "Changelly", url: "https://changelly.com/buy" },
];

const MOONPAY_SLUG = { BTC: "btc", ETH: "eth", BNB: "bnb", SOL: "sol", USDC: "usdc", USDT: "usdt" };

export function moonpayUrl(symbol) {
  const slug = MOONPAY_SLUG[symbol];
  return slug ? `https://www.moonpay.com/buy/${slug}` : "https://www.moonpay.com/buy";
}
