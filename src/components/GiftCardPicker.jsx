"use client";
import { GIFT_CARDS, getGiftCard, withArticle } from "@/src/config/giftcards";
import { ExternalLink } from "lucide-react";

// Shown under "Gift Cards" at checkout. Selecting a card reveals where to buy it; after the order is placed the
// customer is emailed the same link plus the upload link for the card details, photos and receipt.
export default function GiftCardPicker({ value, onChange }) {
  const card = getGiftCard(value);
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="pay-giftcard" className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-600">Gift card</label>
        <select
          id="pay-giftcard"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none"
        >
          <option value="">Select a gift card…</option>
          {GIFT_CARDS.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>
      {card ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-slate-700">
          <p className="font-bold text-slate-900">How {card.name} payment works</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs leading-relaxed text-slate-700">
            <li>Place your order — we email (and can WhatsApp) you the exact amount and link.</li>
            <li>Buy {withArticle(card.name)} gift card for that amount: <a href={card.buyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-emerald-600 underline">{card.buyHost}<ExternalLink size={11} /></a></li>
            <li>Upload the card code, photos of the card and your receipt using the secure link we send you.</li>
          </ol>
        </div>
      ) : null}
    </div>
  );
}
