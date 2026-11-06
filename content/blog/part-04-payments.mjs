const C = "Payments & Crypto";
export default [
{
  slug: "scan-wallet-qr-code-and-copy-address", category: C, tags: ["qr code", "wallet", "crypto", "beginners"], shop: ["disposables"], keywords: ["lost mary"],
  title: "Scanning a Wallet QR Code and Copying the Address Correctly",
  summary: "A single wrong character sends crypto to the wrong place. Learn to use QR codes and copy buttons and to double-check an address before sending.",
  body: `Crypto addresses are long strings of letters and numbers. You should never type one by hand. The payment window gives you two reliable options.

## Option 1: scan the QR code
Open your wallet app, choose Send, then tap the scan icon and point your camera at the QR code in the payment window. The wallet fills in the address for you. The QR code is generated from the same address shown beneath it, so they always match.

## Option 2: use the copy button
Tap the copy icon next to the address and paste it into your wallet. This avoids mistakes that come from retyping.

## Always double-check
After pasting or scanning, compare the first four and last four characters with the address on screen. Some malware swaps copied addresses for a different one, so a quick visual check is a good habit, especially for larger payments.

## Check the network too
Your wallet may show a network selector. It must match the one in our window; see [what a crypto network is](/blog/what-is-a-crypto-network/).

## Make a tiny test first?
For large amounts, some people send a small test transfer first. That adds a second network fee but can give peace of mind. Whether it is worth it depends on the fee.

## Enter the amount
Use the amount shown, copied with its own button where available. See the walkthrough in [how to pay with Bitcoin](/blog/how-to-pay-with-bitcoin/).

## If you are on a desktop
You can scan the QR code from your phone's wallet app. Browse [disposable vapes](/shop/disposables/) when you are ready to order. Adults 21+ only.`,
  faq: [["Can a QR code be faked?", "Our window creates the QR code in your own browser from the address displayed, so they always match. Still, check the address in your wallet before sending."], ["Is it okay to type the address manually?", "We recommend against it. One wrong character sends funds elsewhere."]],
},
{
  slug: "crypto-network-fees-explained", category: C, tags: ["fees", "gas", "crypto", "basics"], shop: ["vape-juice"], keywords: ["nurdz"],
  title: "Crypto Network Fees Explained: Gas, Sats and Why They Vary",
  summary: "Every crypto transfer pays a fee to the network, not to us. See how fees work on each chain and how to keep yours low.",
  body: `When you send crypto, you pay a network fee to the people or validators who process transactions. We do not receive or control it. Fees vary a lot depending on the chain and how busy it is.

## Bitcoin
Fees depend on the size of the transaction and network demand, measured in satoshis per byte. They can be small in quiet periods and higher when many people transact. Most wallets let you pick a speed.

## Ethereum
Fees are called gas and depend on demand. Token transfers such as USDT cost more than plain ETH. Busy times can make small payments expensive.

## Tron
Tron uses resources called bandwidth and energy. If you do not hold them, the network burns a small amount of TRX. Many exchanges simply charge a flat withdrawal fee.

## Solana
Fees are tiny, usually a fraction of a cent. Keep a small amount of SOL for fees even if you send USDC.

## BNB Smart Chain
Fees are low and paid in BNB.

## Ways to keep fees down
- Choose a network with cheap fees, such as TRC20 or Solana.
- Avoid peak times on Ethereum.
- On exchanges, compare withdrawal fees between networks.

## Fees and the amount we receive
Make sure the amount arriving equals the amount in our window. Some exchanges deduct their fee from your withdrawal, so add it on top. See [sending from an exchange](/blog/send-crypto-from-an-exchange-to-a-wallet/).

## Next steps
Compare coins in [payment methods compared](/blog/payment-methods-compared/). Browse [vape juice](/shop/vape-juice/). Adults 21+ only.`,
  faq: [["Do you charge a fee for crypto payments?", "No. We offer a discount for crypto. Network and exchange fees go to the network and your provider."], ["Why are Ethereum fees higher?", "Demand for block space is high, and fees rise with demand."]],
},
{
  slug: "sent-crypto-on-the-wrong-network", category: C, tags: ["wrong network", "crypto", "help", "mistakes"], shop: ["disposables"], keywords: ["fifty bar"],
  title: "Sent Crypto on the Wrong Network? What to Do Next",
  summary: "Mistakes happen. If you used the wrong network or address, here are the steps to take immediately and what is realistically recoverable.",
  body: `Sending crypto on the wrong network is one of the most common mistakes. Do not panic, but do not send more funds either.

## Stop and gather details
Collect the transaction hash, the coin, the network you used, the amount and the time. Take screenshots of the exchange or wallet confirmation.

## Understand what happened
There are a few cases:
- **Right coin, wrong network, address compatible:** on some EVM networks the same address works on several chains. The funds may be sitting at that address on the other chain.
- **Address format incompatible:** the transaction usually fails or is blocked by the exchange before it leaves.
- **Sent to an address we do not control:** unrecoverable by anyone.

## Contact us right away
Use the [contact page](/contact/) or WhatsApp with your order reference and the details above. We will check what arrived and tell you honestly whether anything can be done. We cannot promise recovery, as it depends on whether we control the receiving address on that chain.

## Contact the sender's provider too
If you used an exchange, open a support ticket. Some can help with wrong-network deposits in limited cases.

## Do not resend yet
Wait until we confirm. Resending without checking can double the problem.

## Avoiding it next time
Match the network label in the payment window, use copy buttons and read [what a crypto network is](/blog/what-is-a-crypto-network/). To reduce the chance of an error with stablecoins, see [USDT on ERC20 or TRC20](/blog/usdt-erc20-vs-trc20-which-network/). Browse [disposable vapes](/shop/disposables/). Adults 21+ only.`,
  faq: [["Can you guarantee a refund of wrong-network funds?", "No. Recovery is only possible in limited situations and depends on the network and address."], ["What should I send you?", "Your order reference, the transaction hash, the network used and screenshots."]],
},
{
  slug: "why-your-crypto-payment-shows-underpaid", category: C, tags: ["underpaid", "crypto", "payments", "help"], shop: ["disposables"], keywords: ["geek bar"],
  title: "Why Your Crypto Payment Shows Underpaid (and How to Fix It)",
  summary: "Seen an underpaid message? Price movement, fees deducted by an exchange or a typo can leave a payment short. Here is how to resolve it.",
  body: `An underpaid status means we found a transfer that is smaller than your order total. It is usually easy to fix.

## Common causes
- **Exchange fee deducted:** some exchanges subtract their withdrawal fee from the amount, so less arrives than you entered.
- **Price movement:** a volatile coin can drop between the quote and your transfer.
- **Rounding or a typo:** a missing digit in the amount.
- **Partial payment:** you meant to pay in two parts.

## How we decide
We compare the dollar value of the received transfer to your order total, allowing a small tolerance for normal movement. Anything clearly short is marked underpaid, and the status page shows the amount we received.

## How to fix it
1. Check the received amount on your status page.
2. Send the missing balance to the same address and network.
3. Press "I have paid" or upload the second transaction hash.
4. If you are unsure, contact us from the [contact page](/contact/) with your order reference.

## Avoiding it
Use stablecoins such as [USDT](/blog/usdt-erc20-vs-trc20-which-network/) or [USDC](/blog/pay-with-usdc-on-solana/) for exact amounts, add the exchange withdrawal fee on top, and send soon after the quote loads. Read [network fees explained](/blog/crypto-network-fees-explained/).

## Overpaid?
If you sent more than needed, tell us. We will review it and let you know how it can be handled.

## Related
See [how we detect payments](/blog/how-we-detect-your-crypto-payment/). Browse [disposable vapes](/shop/disposables/). Adults 21+ only.`,
  faq: [["How much tolerance is allowed?", "A small percentage for volatile coins and tighter for stablecoins. Anything clearly short is flagged."], ["Do I need to resend everything?", "No. Only the missing balance is needed."]],
},
{
  slug: "cash-app-payments-guide", category: C, tags: ["cash app", "payments", "checkout"], shop: ["disposables"], keywords: ["foger"],
  title: "Paying With Cash App: How Our Payment Details Process Works",
  summary: "Choose Cash App at checkout and we send you the payment details. Learn each step, from placing the order to uploading your receipt.",
  body: `Cash App is available as a payment option. Unlike crypto, the payment details are sent to you after you place your order so they are always current.

## Step 1: place your order
At checkout, choose Cash App and place the order. We need your email and phone number so we can reach you. Your order is saved with the status "awaiting payment".

## Step 2: wait for our message
We email you the Cash App payment details, usually within minutes during business hours. If WhatsApp is easier, we can send them there too. The thank-you page asks you to watch your inbox for this message.

## Step 3: open the payment page
Our email links to a tap-to-copy page. Each detail, like the $Cashtag, has its own copy button. Pay the exact amount due and add your order ID in the note field.

## Step 4: upload your receipt
After paying, use the link in the email to upload a screenshot of your confirmation. This tells us to check for your payment.

## Step 5: we confirm and ship
When we confirm the payment, you receive another email. Orders ship once payment is confirmed, as described in the [shipping policy](/shipping/).

## Tips
- Pay within 24 hours or the order may be released.
- Use the exact amount shown.
- Keep the confirmation screen until you upload it.

## Alternatives
Compare options in [payment methods compared](/blog/payment-methods-compared/), or learn about [Apple Pay](/blog/apple-pay-payments-guide/) and [Chime](/blog/chime-payments-guide/). Browse [disposable vapes](/shop/disposables/). Adults 21+ only.`,
  faq: [["Why are payment details not shown at checkout?", "We send them after your order so they are current and tied to your order ID."], ["Does Cash App get the crypto discount?", "No. The 10% discount applies to crypto and gift card payments."]],
},
{
  slug: "apple-pay-payments-guide", category: C, tags: ["apple pay", "payments", "checkout"], shop: ["vape-juice"], keywords: ["pod juice"],
  title: "Paying With Apple Pay: Step-by-Step Order and Receipt Guide",
  summary: "Using Apple Pay for your order? We send the number or details to pay, you pay from your phone, then upload the receipt. Here is the flow.",
  body: `Apple Pay is supported through a simple three-part flow: you place the order, we send the details, and you pay and send proof.

## Place the order
Choose Apple Pay at checkout and complete your contact and shipping details. We email and optionally WhatsApp you after the order is saved.

## Receive the payment details
Our message contains the details to send payment to, and a link to a tap-to-copy page. The page is private to your order and shows the amount due and your order ID.

## Pay from your phone
Open the Apple Pay or Wallet flow you normally use for person-to-person payments and enter the details we sent. Add your order ID in the notes so we can match it quickly.

## Upload the receipt
Take a screenshot of the confirmation and upload it using the link in our email. You can attach more than one image if needed.

## Confirmation
We check our account, mark the order paid and email you. Orders then move to dispatch; see [shipping](/shipping/) for timelines.

## Common problems
- **No email received:** check your spam folder and the address you entered. See [order confirmation emails not arriving](/blog/order-confirmation-email-not-arriving/).
- **Wrong amount:** pay the difference and mention it in the notes.
- **Paid to the wrong details:** contact us immediately with a screenshot.

## More options
Read [Cash App](/blog/cash-app-payments-guide/) and [Chime](/blog/chime-payments-guide/) guides, or [payment methods compared](/blog/payment-methods-compared/). Browse [vape juice](/shop/vape-juice/). Adults 21+ only.`,
  faq: [["Do I pay inside the website?", "No. We send details after checkout and you pay from your own app, then upload the receipt."], ["How fast is confirmation?", "Usually within business hours once your receipt is uploaded."]],
},
{
  slug: "chime-payments-guide", category: C, tags: ["chime", "payments", "checkout"], shop: ["disposables"], keywords: ["breeze"],
  title: "Paying With Chime: What to Expect After You Place Your Order",
  summary: "Pay with Chime by waiting for our payment details, sending the exact amount with your order ID, then uploading your receipt.",
  body: `Chime is accepted for orders, and the process mirrors our other payment-detail methods.

## Placing the order
Select Chime at checkout and finish your details. Your order is saved with a unique ID, shown on the confirmation page and in your email.

## Getting the details
After checkout we send the Chime payment details by email and WhatsApp if you prefer. The email includes a link to a page where each detail has its own copy button.

## Making the payment
In the Chime app, send the exact amount due to the details shown. Put your order ID in the memo. Do not round the amount; send exactly what the page says.

## Sending proof
Screenshot the confirmation and upload it from the link. Uploads are private and only need to be done once, although you can add more images if needed.

## Verification and shipping
We confirm the payment and email you. The order is then processed as described on the [shipping page](/shipping/). Processing and carrier time are separate; see [how ordering works](/blog/how-ordering-works/).

## Troubleshooting
If a payment is pending in Chime, upload the screenshot anyway and tell us in the notes. If you used the wrong details, contact us straight away from the [contact page](/contact/).

## Other choices
Compare with [Cash App](/blog/cash-app-payments-guide/), [Apple Pay](/blog/apple-pay-payments-guide/) and the discounted crypto and gift card options in [the 10% discount guide](/blog/crypto-discount-how-it-works/). Browse [disposable vapes](/shop/disposables/). Adults 21+ only.`,
  faq: [["Can I pay before receiving the details?", "No. Details are sent after the order is placed. Paying elsewhere can delay confirmation."], ["What if I forgot the order ID in the memo?", "Upload your screenshot and tell us in the notes. We can usually match it."]],
},
{
  slug: "how-payment-details-reach-you", category: C, tags: ["payments", "email", "whatsapp", "orders"], shop: ["disposables"], keywords: ["geek bar"],
  title: "How Payment Details Reach You: Email, WhatsApp and the Copy Page",
  summary: "For Cash App, Apple Pay and Chime we send payment details after you order. See where they arrive and how the tap-to-copy page works.",
  body: `For some payment methods we do not display payment details at checkout. Instead, we send them after you place the order. Here is exactly how that works.

## Why we do it this way
Details are tied to your order and kept current. We can also check the amount before you pay, which reduces mistakes.

## The three places you will see them
1. **Email:** a clear message with the amount due, each payment field and the payment terms.
2. **WhatsApp:** the same fields in a chat message with a link, if you used WhatsApp or asked for it.
3. **The payment page:** a private link where each field has a tap-to-copy button. Email clients cannot run copy buttons, so the page exists for that.

## Why a link rather than details only
The private page lets you copy details with one tap and upload your receipt from the same place. The link contains a unique token, so only people with the link can open it.

## What to do next
Pay the exact amount, add your order ID in the note, then upload your receipt screenshot. See the guides for [Cash App](/blog/cash-app-payments-guide/), [Apple Pay](/blog/apple-pay-payments-guide/) and [Chime](/blog/chime-payments-guide/).

## If nothing arrives
Check spam and the email address you entered. Then contact us through the [contact page](/contact/) with your order ID. Our [email troubleshooting article](/blog/order-confirmation-email-not-arriving/) lists the most common causes.

## Staying protected
Only trust payment details sent through our official email, WhatsApp number or order page. Never send payment to someone who messages you unexpectedly. Browse [disposable vapes](/shop/disposables/). Adults 21+ only.`,
  faq: [["Are crypto payments handled the same way?", "No. Crypto details are shown right at checkout in the payment window."], ["Is the link private?", "Yes. It includes a unique token tied to your order."]],
},
{
  slug: "payment-methods-compared", category: C, tags: ["payments", "comparison", "crypto", "gift cards"], shop: ["disposables", "vape-kits"], keywords: ["foger"],
  title: "Payment Methods Compared: Crypto, Gift Cards, Cash App, Apple Pay, Chime",
  summary: "Five ways to pay, with different discounts and speeds. Compare them side by side and pick the one that fits your order.",
  body: `We accept several payment methods, and each has trade-offs. Here is a side-by-side overview.

## Cryptocurrency
- **Discount:** 10%.
- **Speed:** minutes after confirmation, with automatic detection on most networks.
- **Best for:** people already holding crypto, or stablecoin users.
- **Watch for:** network choice and fees. See [what a crypto network is](/blog/what-is-a-crypto-network/).

## Gift cards
- **Discount:** 10%.
- **Speed:** depends on how fast you buy the card and upload it.
- **Best for:** people without crypto who prefer a card purchase.
- **Cards:** Apple, Razer Gold, Paysafe, Sephora and Macy's. See [how gift card payment works](/blog/how-gift-card-payment-works/).

## Cash App
- **Discount:** none.
- **Speed:** quick once you have our details.
- **Best for:** simplicity if you already use Cash App.

## Apple Pay
- **Discount:** none.
- **Best for:** iPhone users who want to pay from their phone. See [Apple Pay guide](/blog/apple-pay-payments-guide/).

## Chime
- **Discount:** none.
- **Best for:** Chime account holders. See [Chime guide](/blog/chime-payments-guide/).

## Which should you choose?
If the discount matters, choose crypto or a gift card. For speed and familiarity, use whichever app you already have. Larger orders save the most with a discount, but remember free shipping is calculated [after discount](/blog/crypto-discount-how-it-works/).

## Ready to order
Add products from [disposable vapes](/shop/disposables/) or [vape kits](/shop/vape-kits/) and open checkout. Adults 21+ only.`,
  faq: [["Which is fastest?", "Crypto on fast networks and app-based methods are quickest. Gift cards depend on how fast you buy and upload."], ["Can I change method after ordering?", "Contact us as soon as possible. If we have not sent details yet it is usually possible."]],
},
{
  slug: "how-to-upload-a-payment-screenshot", category: C, tags: ["screenshot", "receipt", "payments", "help"], shop: ["disposables"], keywords: ["lost mary"],
  title: "How to Upload Your Payment Screenshot or Receipt Correctly",
  summary: "A clear screenshot speeds up confirmation. See what to capture, how to upload from your phone and what happens afterwards.",
  body: `After paying with Cash App, Apple Pay, Chime, a gift card or crypto, you can upload proof so we can confirm quickly.

## Where to upload
Use the link in your payment email or the order status page. It opens a private page with an upload box for your order.

## What to capture
- **App payments:** the confirmation screen with the amount, recipient and date.
- **Crypto:** the transaction ID or hash, and the wallet or exchange confirmation.
- **Gift cards:** the card code or PIN, photos of the card (front and back if physical) and your purchase receipt.

## Make it readable
Crop out private details unrelated to the payment, but keep the amount, date and reference visible. Avoid blurry photos.

## Uploading from a phone
Tap the upload box, choose images from your gallery or take a photo. You can add up to four images. They are compressed on your device before sending, so large photos upload quickly.

## Optional fields
Add the transaction hash for crypto, the gift card code, and a short note if something is unusual, such as paying the difference.

## After you upload
Your order status changes to proof submitted and our team reviews it. You will get an email when payment is confirmed. See [how ordering works](/blog/how-ordering-works/) for timing.

## Keep it private
Only the person with your order link can open the page. Do not share the link or your gift card code publicly. For gift card specifics read [gift card code security tips](/blog/gift-card-code-security-tips/). Browse [disposable vapes](/shop/disposables/). Adults 21+ only.`,
  faq: [["What file types are accepted?", "JPG, PNG, WebP and HEIC images. Large photos are compressed automatically."], ["Can I upload more than once?", "Yes. If you forgot something, open the link again and add more images."]],
},
];
