// src/config/giftcards.js — gift card payment options.
// `buyUrl` is the official page where the customer buys that card online.
// After an order is placed with a gift card, the customer is sent that link plus the upload link
// for the card code, photos of the card, and the purchase receipt.
export const GIFT_CARDS = [
  {
    id: "apple",
    name: "Apple",
    buyUrl: "https://www.apple.com/shop/gift-cards",
    buyHost: "apple.com",
    steps: [
      "Open the Apple Gift Card page and choose an e-gift card for the exact amount due.",
      "Check out and have it delivered to your own email address.",
      "Open the email, redeem nothing, and copy the 16-character code.",
    ],
  },
  {
    id: "razer",
    name: "Razer Gold",
    buyUrl: "https://gold.razer.com/global/en/gold/purchase/razer-gold-pin",
    buyHost: "gold.razer.com",
    steps: [
      "Open Razer Gold and choose a Razer Gold PIN for the exact amount due.",
      "Complete the purchase while signed in to your Razer account.",
      "Copy the PIN and serial number shown after purchase.",
    ],
  },
  {
    id: "paysafe",
    name: "Paysafe (paysafecard)",
    buyUrl: "https://www.paysafecard.com/en-us/",
    buyHost: "paysafecard.com",
    steps: [
      "Open paysafecard and use “Buy paysafecard” / “Where to buy” to get a voucher for the exact amount due.",
      "Complete the purchase and copy the 16-digit PIN.",
      "Keep the purchase confirmation or receipt page open.",
    ],
  },
  {
    id: "sephora",
    name: "Sephora",
    buyUrl: "https://www.sephora.com/beauty/gift-cards",
    buyHost: "sephora.com",
    steps: [
      "Open the Sephora gift card page and choose an e-gift card for the exact amount due.",
      "Send it to your own email address and complete checkout.",
      "Copy the card number and PIN from the delivery email.",
    ],
  },
  {
    id: "macys",
    name: "Macy's",
    buyUrl: "https://www.macys.com/shop/gift-cards",
    buyHost: "macys.com",
    steps: [
      "Open the Macy's gift card page and choose an e-gift card for the exact amount due.",
      "Send it to your own email address and complete checkout.",
      "Copy the card number and PIN from the delivery email.",
    ],
  },
];

export function getGiftCard(id) {
  return GIFT_CARDS.find((g) => g.id === id) || null;
}

// Picks "a" or "an" for copy such as "Buy an Apple gift card" / "Buy a Razer Gold gift card"
export const withArticle = (name) => (/^[aeiou]/i.test(name) ? `an ${name}` : `a ${name}`);
