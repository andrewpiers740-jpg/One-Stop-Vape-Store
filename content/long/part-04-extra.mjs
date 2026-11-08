const denominations = (card) => `## Understanding fixed denominations
Gift cards are sold in set amounts, and that shapes how you plan a ${card} payment. Start from the amount due in our order email, then look at the amounts the seller offers. If the exact figure is there, buy it. If not, you have three sensible options. The first is to buy the next amount up and tell us in the notes, which keeps the purchase simple at the cost of a small surplus that we cannot return. The second is to combine two cards that add up to the amount, for example one larger card and one small one, and upload both. The third is to adjust your cart slightly, adding or removing an item so that the amount due lands on an available denomination, which you can do before you pay by contacting us. Whichever you choose, tell us in the notes so that the person verifying your payment knows what to expect. Mismatches that are explained up front are resolved quickly, while unexplained ones take longer.`;

const timing = (card) => `## Planning the timing of a ${card} order
A gift card order has two phases, and it helps to plan around both. The first phase is yours: buying the card, finding the details and uploading them, which usually takes ten to twenty minutes if you have a payment method ready. The second phase is ours: a person checks the card and matches it to your order, which is quickest during business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time. If you place the order in the evening, buy the card straight away and upload it, and expect the check the next business morning. If you place it on a Friday afternoon, expect the check on Monday. Orders begin processing only after the payment is confirmed, so the sooner you upload, the sooner the 24 to 72 business hours of processing start. Unpaid orders may be released after 24 hours, so do not leave the purchase until the last minute.`;

const checklist = (card, items) => `## A final checklist for ${card}
${items.map((x, i) => `${i + 1}. ${x}`).join("\n")}

If everything on the list is ticked, your payment should be verified without any questions. If something is unclear, contact us through the [contact page](/contact/) or WhatsApp before you upload, and we will help. Remember that all products are for adults aged 21 and over, and nicotine is addictive.`;

export default {
"how-gift-card-payment-works": `${denominations("gift card")}

${timing("gift card")}

${checklist("a gift card payment", ["Confirm the amount due in the order email.", "Choose the card brand and open the official link.", "Buy for the exact amount, or the next amount up with a note.", "Do not redeem or spend any of the balance.", "Upload the code or PIN, the card email or photos and your receipt through the private link.", "Keep the receipt until your order is confirmed."])}`,

"pay-with-apple-gift-card": `${denominations("Apple gift card")}

${timing("Apple gift card")}

## Digital and physical Apple cards
Apple gift cards come as e-gift cards by email and as physical cards in stores. An e-gift card is quick: it arrives within minutes, the code is in the email and a screenshot is enough for our check. A physical card needs more care. Photograph the front and back, make sure the code is legible and keep the receipt from the store, because the receipt proves the purchase and the amount. Do not scratch the code until you are ready to photograph it, and do not leave the card lying around, because anyone who finds it could use the balance.

${checklist("an Apple gift card payment", ["Buy from Apple's official page or a trusted retailer.", "Send it to your own email and do not redeem it.", "Copy the code and screenshot the email.", "Upload the code and receipt through the private link.", "Wait for our confirmation email."])}`,

"pay-with-razer-gold": `${denominations("Razer Gold PIN")}

${timing("Razer Gold PIN")}

## Razer Gold PINs versus account balance
It is worth being clear about the difference between a PIN and an account balance. A PIN is a code you can pass to someone else, and that is what we need. A balance inside your Razer account is tied to the account and cannot be sent to us. If you already hold Razer Gold in your account, you cannot use it for our order, and you should buy a PIN instead. A PIN also carries a region setting in some cases, so choose the version offered for your location, and read the details on the purchase page before you confirm the payment.

${checklist("a Razer Gold payment", ["Buy a PIN, not an account top-up.", "Copy the PIN and any serial number and screenshot the page.", "Do not redeem the PIN yourself.", "Upload the PIN, the screenshot and your receipt through the private link.", "Wait for our confirmation email."])}`,

"pay-with-paysafecard": `${denominations("paysafecard voucher")}

${timing("paysafecard voucher")}

## Buying with cash at a retailer
One of the reasons people choose paysafecard is that vouchers can be bought with cash at many retail locations. If you do this, ask the cashier for a voucher for the amount you need, check the amount on the receipt and keep the receipt. The PIN is printed on the receipt or the voucher, and you should photograph it clearly in good light, with all 16 digits visible. Do not leave the receipt in a pocket that goes through the wash, and do not share a photo of it anywhere except through our private link. If the cashier cannot sell the exact amount, buy the next amount up or combine two vouchers.

${checklist("a paysafecard payment", ["Buy from the official site or a reputable retailer.", "Check the amount on the receipt.", "Photograph the voucher or receipt with all 16 digits visible.", "Upload the PIN and the receipt through the private link.", "Do not spend the voucher yourself."])}`,

"pay-with-sephora-gift-card": `${denominations("Sephora gift card")}

${timing("Sephora gift card")}

## Number and PIN: why both matter
A Sephora gift card has two parts that work together: a card number and a PIN. The number identifies the card and the PIN proves you have it. We need both to verify the balance, and a card cannot be checked with only one of them. When you enter them in the code field, put the number first and the PIN second, separated by a space, and double-check every digit. If the PIN is under a scratch-off strip on a physical card, reveal it gently and photograph it straight away. If the PIN is shown in an email, a screenshot is enough. If either part is unreadable in your image, we will ask you to resend it, which slows things down.

${checklist("a Sephora gift card payment", ["Buy from Sephora's official gift card page.", "Send it to your own email.", "Copy both the number and the PIN.", "Upload both, plus the screenshot and receipt, through the private link.", "Do not use any balance yourself."])}`,

"pay-with-macys-gift-card": `${denominations("Macy's gift card")}

${timing("Macy's gift card")}

## Number and PIN: why both matter
A Macy's gift card has a card number and a PIN, and we need both to verify the balance. Enter the number first and the PIN second in the code field, and double-check every digit. If you bought a physical card, the PIN may be under a scratch-off strip on the back. Reveal it gently and photograph both sides straight away. If you bought an e-gift card, a screenshot of the delivery email is enough. If either part is unreadable in your image, we will ask you to resend it, which slows verification down. Never use any of the balance in-store or online before we confirm your payment.

${checklist("a Macy's gift card payment", ["Buy from Macy's official gift card page.", "Send it to your own email.", "Copy both the number and the PIN.", "Upload both, plus the screenshot and receipt, through the private link.", "Do not use any balance yourself."])}`,

"gift-card-code-security-tips": `## Special situations
### Buying for someone else
If a friend or relative buys the card for you, make sure they send it to your email and that you are the person who uploads the code. Do not ask them to message us on your behalf, because we match payments to the contact details on your order.

### Using a physical card from a store
Buy it directly from the store and keep the receipt. Avoid cards from displays that look tampered with, such as damaged packaging or scratched-off codes, because those may have been compromised before you bought them.

### Using a card you have held for a while
Check the balance with the issuer before you use it, because it may have been spent or partly used. If it is a supported brand and the full balance is intact, it can be used for an order.

### Using more than one card
Upload every code in a single message through the private link, and tell us in the notes how many you are sending. That keeps everything attached to one order and makes verification faster.

${checklist("gift card security", ["Use only the private link from our official email or WhatsApp number.", "Buy only from the brand or a reputable retailer.", "Never share a code publicly or with anyone who contacts you unexpectedly.", "Keep the receipt and the email.", "Report a compromised code to the issuer immediately, then to us."])}`,

"gift-card-vs-crypto-which-is-better": `## What if I am not sure?
If you are on the fence, try the route that needs the fewest new steps. If you already have a gift card from one of our supported brands, use it. If you already have crypto in a wallet, use that. If you have neither, think about which one you could set up fastest. A gift card can usually be bought in a few minutes with a card or cash, while a first crypto purchase may involve identity checks. For a first order, many people prefer the gift card, then explore crypto later if they like the idea. There is no wrong choice here, because both earn the same discount and both lead to the same delivery.

## A note on privacy
Gift cards and crypto are both ways to pay without sharing your bank card details with us, and we never ask for card numbers, PINs of your bank cards, passwords or recovery phrases. Crypto uses public blockchain data to match your payment, while gift cards use the code and receipt you upload. Neither requires an account with us. Our [privacy policy](/privacy/) explains what we collect and how we use it.

${checklist("choosing a method", ["Check the order summary for both totals.", "Think about how soon you want the order to enter processing.", "Compare any fees on the way in with the 10% saving.", "Pick the method you are comfortable with.", "Follow the steps in the matching guide."])}`,
};
