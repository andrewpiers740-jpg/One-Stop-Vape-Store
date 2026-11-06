// Long-form (1,500+ words) rewrites of the Payments & Crypto guides, batch 2. Applied by scripts/apply-long.mjs.
export default {
"how-to-pay-with-bitcoin": {
body: `Bitcoin (BTC) is one of the cryptocurrency options at One Stop Vape Store checkout, and paying with it qualifies for our 10% crypto discount. If you have paid with Bitcoin before, the process will feel familiar. If you have not, this guide walks through every step in the order you will see it, explains the numbers on the payment window, covers fees and timing, and lists the mistakes that cause most delays. It is written for adults aged 21 and over, and nothing here is financial advice.

## Before you start
You need a wallet or an exchange account that holds Bitcoin and lets you send it to an outside address. Popular choices include mobile wallets, hardware wallets and the withdrawal feature of a regulated exchange. If you do not own any Bitcoin yet, read [how to buy crypto with a card](/blog/how-to-buy-crypto-with-a-card/) first, because buying can take from a few minutes to a day depending on the provider and your verification status.

Two practical points before you begin. First, check that your wallet or exchange has enough Bitcoin to cover both the order amount and the network fee, because the fee is paid on top. Second, if you are sending from an exchange, look for minimum withdrawal limits and any withdrawal fee the exchange charges, which is separate from the network fee. Both are easier to plan for before you open the payment window than after.

## Step 1: fill your cart and open checkout
Add products to your cart and go to checkout. Where a product offers options such as a strength or pack size, choose them on the product page before you add it, so the right option appears in your cart. Enter your contact and shipping details and confirm you are 21 or older. We require an email address because order updates and your private order link are sent there. The minimum order is $100, and orders of $200 or more after discounts ship free; smaller orders pay a flat $15 shipping fee. See [minimum order and free shipping explained](/blog/minimum-order-and-free-shipping-explained/).

## Step 2: choose Cryptocurrency and Bitcoin
Select Cryptocurrency as the payment method, then choose Bitcoin from the token list. The checkout page shows the discount in your order summary, so you can see the total you will owe in dollars before the payment window opens. The payment window opens straight away when you continue.

## Step 3: read the payment window
The window shows everything you need in one place:

- **Your order reference,** which identifies your order.
- **The dollar amount due** after the 10% crypto discount and including any shipping.
- **The amount of BTC to send,** converted from the dollar total at the live exchange rate.
- **A QR code and the wallet address** for the Bitcoin network.
- **Copy buttons** next to the address and amount so you do not have to type them.

The BTC amount is based on the live rate and refreshes about every 30 seconds, so send the amount shown at the time you pay. Because Bitcoin's price moves, the amount of BTC can differ slightly from one minute to the next, but the dollar value stays the same. Always use the copy button, because one wrong character in a Bitcoin address sends your money to a different wallet and it cannot be reversed.

## Step 4: send from your wallet
Open your wallet. You can either scan the QR code, which fills in the address, or paste the address and enter the amount manually. Check the first and last few characters of the address against the window before you confirm. Choose the network fee your wallet suggests, and confirm the transaction. Network fees are paid by you on top of the order amount, and they go to the network, not to us.

If your wallet lets you choose a fee level, a standard or medium fee is usually fine for a normal order. A very low fee can leave a transaction waiting for a long time when the network is busy, and a very high fee wastes money. Our guide to [crypto network fees explained](/blog/crypto-network-fees-explained/) covers how fees work.

## Step 5: press "I have paid"
Return to the payment window and press the button once your wallet shows the transaction as sent. Your order is placed and you land on the order status page. From there, our system reads public blockchain data for the shop wallet and looks for an incoming transfer that fits your order. You do not need to wait for anyone to read a screenshot. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/) for what is checked.

## How long does it take?
Bitcoin transactions are usually visible on the network within a minute or two, but they are not final until they have confirmations. A confirmation is a block added to the chain that includes your transaction. One confirmation often takes about ten minutes, though it can be faster or slower. Our status page shows when a payment is detected and when it is confirmed, and we email you when it is matched. After confirmation your order enters processing, which takes 24 to 72 business hours before it ships. See [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/).

## What the amounts mean
- **Dollar total:** the figure that matters for your order. Everything is priced in US dollars.
- **BTC amount:** the dollar total converted at the rate when the window was opened or refreshed.
- **Tolerance:** because prices move between quote and payment, we allow a small tolerance when matching. A tiny shortfall caused by market movement is not a problem, but a substantial shortfall will show as underpaid. Read [why your crypto payment shows underpaid](/blog/why-your-crypto-payment-shows-underpaid/).
- **Network fee:** separate and extra. If your wallet deducts the fee from the amount you send, the recipient receives less. Send enough that the full amount arrives.

## Sending from an exchange
Many people pay straight from an exchange. That works, but two details cause most problems. First, some exchanges let you choose the amount to withdraw and take their own fee out of it, which can leave the received amount short. Add the exchange's fee to the amount you enter. Second, some exchanges batch or delay withdrawals for security checks, which can make the transaction appear later than expected. If your withdrawal is pending, you can still press "I have paid" so the order is in the system, then wait for the transfer to arrive. Our guide to [sending crypto from an exchange to a wallet](/blog/send-crypto-from-an-exchange-to-a-wallet/) goes through it in detail.

## Common mistakes
- **Using the wrong network.** Bitcoin addresses on the Bitcoin network only receive BTC. If you hold another asset, choose that token in checkout instead.
- **Typing the address.** Always copy and paste or scan.
- **Sending an old amount.** If you leave the window open for a long time, refresh it and send the current amount.
- **Resending when nothing shows.** Do not send a second payment. A payment can be pending for a while. Check the status page first and contact us if it is stuck.
- **Sharing private keys.** We never ask for private keys or seed phrases. Never send them to anyone.

## If something looks wrong
If the status page shows waiting for longer than you expect, or shows underpaid, do not resend. Add your transaction hash and a screenshot on the status page, which helps us find the transfer quickly. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/). You can also contact us through the [contact page](/contact/) with your order reference.

## Privacy and security
We only use public blockchain data to match payments. Your wallet balance and other transactions are not visible to us. To keep your own funds secure, use a wallet you trust, keep your recovery phrase offline and never share it. If you want to understand how networks differ, read [what is a crypto network](/blog/what-is-a-crypto-network/).

## After payment
Once your payment is confirmed you receive an email, and your order status updates. We process orders within 24 to 72 business hours and ship from our Phoenix, Arizona Stock Warehouse with tracking by a regional carrier. Delivery requires an adult aged 21 or older to sign. See [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/) and [how to track your order](/blog/how-to-track-your-order/).

## Why choose Bitcoin?
Bitcoin is the most widely supported cryptocurrency, so almost every exchange and wallet can send it. The trade-offs are that confirmations can take longer than some other networks and fees can rise when the network is busy. If you want a cheaper, faster option, compare [USDT on TRC20](/blog/usdt-erc20-vs-trc20-which-network/), [USDC on Solana](/blog/pay-with-usdc-on-solana/) or [Solana](/blog/pay-with-solana-sol/). Our [payment methods comparison](/blog/payment-methods-compared/) lays out speed, fees and discounts side by side.

## A quick checklist before you press send
Confirm the token is Bitcoin and the network is Bitcoin. Confirm the address on your wallet screen matches the window. Confirm the amount covers the order and that the fee is paid on top. Then send once, press "I have paid", and watch the status page. All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Do I get a discount for paying with Bitcoin?", "Yes. Cryptocurrency payments save 10% on your order total, applied automatically at checkout when you choose Cryptocurrency."],
["How much Bitcoin do I send?", "Send the BTC amount shown in the payment window, which is converted from your dollar total at the live rate and refreshes about every 30 seconds. Network fees are paid on top."],
["How long until my Bitcoin payment is confirmed?", "The transaction is usually visible within minutes and confirmed after the first block, often around ten minutes. We email you once it matches your order."],
["What if I send the wrong amount?", "A small shortfall from price movement is tolerated, but a substantial shortfall shows as underpaid. Do not resend; contact us with your order reference and transaction hash."],
["Can I pay from an exchange?", "Yes. Add the exchange's withdrawal fee to the amount so the full BTC amount arrives, and copy the address exactly."],
["Do you ever ask for my private key?", "Never. We use public blockchain data only. Do not share private keys or recovery phrases with anyone."],
]
},

"usdt-erc20-vs-trc20-which-network": {
body: `USDT, also called Tether, is a stablecoin designed to track the US dollar. That makes it popular for payments, because the amount you owe does not swing the way Bitcoin or Ethereum can between the moment you see a price and the moment you pay. At One Stop Vape Store checkout you choose USDT and then choose a network for it, and that second choice matters more than most people expect. This guide explains why there are two networks, how they differ on fees and speed, how to choose, what to do if you pick wrong and how to send correctly. It is for adults aged 21 and over and is not financial advice.

## Why there are two networks
A token is not tied to a single blockchain. The same token can exist on several blockchains at once, each one a separate ledger with its own address format, its own fees and its own rules. We accept USDT on **Ethereum**, written ERC20, and on **Tron**, written TRC20. Each has its own wallet address in our payment window, and the network you select at checkout decides which address is shown. You must send on the network you selected.

Think of it like sending a parcel by two different carriers. The contents are the same, but each carrier has its own address system, and a parcel handed to the wrong carrier does not arrive. If you want the bigger picture, read [what is a crypto network](/blog/what-is-a-crypto-network/).

## TRC20: usually cheaper and quick
Tron transfers typically cost much less than Ethereum and settle within a minute or two. For a payment of a few hundred dollars, many people choose TRC20 to keep fees low. The main requirement is that your wallet or exchange must support Tron withdrawals, and some wallets need a small amount of Tron's native currency, TRX, to cover energy or bandwidth costs. Exchanges that support TRC20 withdrawals usually handle this for you and show the fee in USDT.

## ERC20: widely supported
Ethereum is the most widely supported smart-contract network, so almost every wallet and exchange can send USDT on it. The cost is that fees can be higher, especially when the network is busy, and they are paid in ETH. If you hold USDT on Ethereum already, or your exchange offers only ERC20, it is a perfectly sensible choice. Just make sure you have enough ETH in the wallet to pay the fee, because the transfer cannot be made without it.

## Side-by-side comparison
- **Typical cost:** TRC20 is usually a small fraction of an ERC20 fee. ERC20 fees rise with network traffic.
- **Speed:** both usually confirm within minutes; TRC20 often feels faster.
- **Compatibility:** ERC20 is supported almost everywhere; TRC20 is supported by most exchanges and many wallets but not all.
- **Gas or fee currency:** ERC20 needs ETH; TRC20 needs TRX or an exchange that covers it.
- **Address format:** ERC20 addresses start with 0x; TRC20 addresses start with T.

## How to choose
1. **If you want the lowest fee,** choose TRC20, provided your wallet supports it.
2. **If your balance is already on one network,** use that one. Do not bridge or swap just to pay, because bridging adds cost and risk.
3. **If you want maximum compatibility,** choose ERC20.
4. **If you are sending from an exchange,** check which networks the exchange lists for USDT withdrawals and what each costs, then pick the cheaper one we support.

## The most important rule
Send on exactly the network shown in the payment window. A USDT transfer on the wrong network will not arrive at the address and may not be recoverable. The address formats make an accidental mix-up less likely, because a Tron address will not be accepted by an Ethereum withdrawal form, but some wallets let you paste an address and pick any network, which is where mistakes happen. Always select the network in your wallet that matches the window, and compare the address you paste against the window before you confirm. If you have already sent on the wrong network, read [what to do after sending crypto on the wrong network](/blog/sent-crypto-on-the-wrong-network/) and contact us promptly with your order reference and transaction hash.

## Step-by-step payment
1. At checkout choose Cryptocurrency, then USDT, then the network.
2. The payment window shows your order reference, the amount in USDT, a QR code and the address for that network.
3. In your wallet, choose USDT, choose the matching network, scan the QR or paste the address and enter the amount. Use the copy buttons to avoid typing errors.
4. Confirm the transfer, paying the network fee on top.
5. Press "I have paid". Your order is placed and our system watches the blockchain for a matching transfer. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/).

Because USDT is pegged to the dollar, the amount to send is essentially your dollar total after the crypto discount, so there is no exchange-rate movement to worry about. That is one of the reasons stablecoins are convenient for orders.

## Fees in practice
The fee is paid by you and goes to the network. On Tron it is usually small and predictable. On Ethereum it varies with demand and can be noticeably larger for a small payment. If you are paying a smaller order, the fee can be a meaningful share of the total, which is another reason many customers prefer TRC20. Our guide to [crypto network fees explained](/blog/crypto-network-fees-explained/) goes into more detail, including how to estimate fees before you send.

## Amount and tolerance
Send the amount shown. If your exchange takes its withdrawal fee out of the amount you enter, the received amount will be lower than you intended, so add the exchange's fee to the amount you enter. A tiny difference is tolerated, but a larger shortfall shows as underpaid; see [why your crypto payment shows underpaid](/blog/why-your-crypto-payment-shows-underpaid/).

## What the discount means for USDT
Cryptocurrency payments save 10% on your order total, which applies equally whichever token or network you choose. The discount is calculated on your product subtotal before shipping is added. Orders of $200 or more after discounts ship free, and smaller orders pay a flat $15 shipping fee. Read [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/) for worked examples.

## Common mistakes
- **Choosing a network your wallet does not support.** Check before you start.
- **Forgetting the fee currency.** ERC20 needs ETH; TRC20 may need TRX.
- **Sending USDC or another token by mistake.** Choose USDT in both checkout and your wallet.
- **Resending when a payment is pending.** Wait for the status page and contact us if it is stuck.
- **Assuming all USDT is the same.** The network is part of the address, so match it.

## After your payment is confirmed
We email you once the transfer is matched and confirmed. Orders are processed within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse and ship with tracking. An adult aged 21 or older must sign on delivery, as described in [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/). If you would like to compare other tokens, see [paying with USDC on Solana](/blog/pay-with-usdc-on-solana/), [paying with Ethereum](/blog/pay-with-ethereum-eth/) and [payment methods compared](/blog/payment-methods-compared/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Which USDT network is cheaper, ERC20 or TRC20?", "TRC20 (Tron) is usually much cheaper than ERC20 (Ethereum), whose fees rise when the network is busy."],
["What happens if I send USDT on the wrong network?", "The funds will not arrive at the address and may not be recoverable. Contact us immediately with your order reference and transaction hash."],
["Do I need ETH or TRX to send USDT?", "ERC20 transfers need ETH for the fee. TRC20 transfers may need TRX, although many exchanges cover this for you."],
["Is the discount the same for both networks?", "Yes. Any cryptocurrency payment saves 10% on your order total, whichever token or network you choose."],
["Why is the USDT amount stable?", "USDT is pegged to the US dollar, so the amount to send is essentially your dollar total after the crypto discount."],
["How do I know which network my wallet supports?", "Open your wallet's USDT send screen and look for the list of networks. Match one of them with the network shown in our payment window."],
]
},

"cash-app-payments-guide": {
body: `Cash App is one of the payment options at One Stop Vape Store. It works differently from cryptocurrency: instead of showing payment details in a window at checkout, we send them to you after you place the order, so they are always current and tied to your order. This guide explains each step from checkout to confirmation, what the emails and the payment page contain, how to avoid the mistakes that slow orders down, what to do if something goes wrong and how Cash App compares with other methods. It is for adults aged 21 and over.

## Why Cash App details arrive after you order
Cash App payments need a recipient handle, called a $Cashtag, and an exact amount. We send those after you order for three reasons. First, the details are matched to your specific order, so the amount is right. Second, we can confirm stock and pricing before you pay. Third, it protects you from out-of-date or copied details, because payment instructions only come from our official email, WhatsApp number or private order page.

## Step 1: place your order
Add products to your cart and go to checkout. Choose options such as strength and pack size on the product page first so they appear in your cart. At checkout, enter your contact and shipping details, confirm you are 21 or older, choose Cash App as the payment method and place the order. We need your email and phone number so we can reach you. The minimum order is $100, and orders of $200 or more after discounts ship free; smaller orders pay a flat $15 shipping fee. Your order is saved with the status "awaiting payment", and you receive an order number.

Cash App does not carry the 10% discount that cryptocurrency and gift cards do. If saving matters, compare options in [payment methods compared](/blog/payment-methods-compared/).

## Step 2: wait for our message
We email you the Cash App payment details, usually within minutes during business hours. If WhatsApp is easier for you, we can send them there as well; see [ordering via WhatsApp](/blog/ordering-via-whatsapp/). The thank-you page after checkout tells you to watch your inbox, and the email contains your order number, the amount due and a link to your private payment page.

If the message has not arrived after a short wait, check your spam or promotions folder and confirm the email address you entered. Our guide to [order confirmation emails not arriving](/blog/order-confirmation-email-not-arriving/) lists the common causes.

## Step 3: open the payment page
Our email links to a private page where every detail has its own tap-to-copy button. Email programs cannot run copy buttons, which is why the page exists. You will see the $Cashtag, the exact amount to pay and the note to include. The link contains a unique token, so only someone who has the link can open the page. Do not share it. Read [how payment details reach you](/blog/how-payment-details-reach-you/) for how the email, WhatsApp message and page fit together.

## Step 4: pay in the Cash App
Open the Cash App, choose Pay, enter the $Cashtag exactly as shown, enter the exact amount and add your order ID in the note field. Typing the order ID in the note is what lets us match the payment to the right order quickly. Review the recipient name and amount on the confirmation screen before you send, then confirm.

Pay the exact amount shown. If you round up or down, we may need to contact you, which delays the order. If your Cash App balance is low, add money from your linked bank first so the payment does not fail.

## Step 5: upload your receipt
After paying, use the link in the email to open your payment page and upload a screenshot of the Cash App confirmation. The screenshot should show the amount, the recipient and the time. This tells us a payment is on its way and speeds up the check. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/) for what makes a good screenshot. Keep the confirmation screen open until you have uploaded it.

## Step 6: we confirm and ship
When we confirm the payment, you receive another email and your order status changes to payment confirmed. Orders ship once payment is confirmed. We process orders within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse and ship with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. See [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/) and [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/). You can follow every stage in [order status meanings](/blog/order-status-meanings/).

## Tips for a smooth Cash App order
- **Pay within 24 hours.** Unpaid orders may be released so stock is not held indefinitely.
- **Use the exact amount.** It makes matching immediate.
- **Add the order ID.** Put it in the note every time.
- **Keep the screenshot.** Upload it as soon as you pay.
- **Use only our official details.** Never pay to a handle sent by someone who contacted you unexpectedly.
- **Check the recipient name.** If it does not look right, stop and contact us.

## If something goes wrong
### The payment failed
Cash App can decline a payment for a low balance, a bank issue or a security check. Fix the cause in the app and try again, and let us know through the [contact page](/contact/) if you are unsure whether it went through.

### I paid the wrong amount
Tell us your order number and the amount you sent. If you overpaid, we will let you know how it is resolved. If you underpaid, we will tell you the balance and how to send it.

### I sent it to the wrong handle
Contact Cash App support immediately, because we cannot reverse payments sent elsewhere. Then contact us with your order number so we can help with the next step.

### I cannot find the email
Check spam, check the address on your order and then contact us with your order number. See [how to contact support](/blog/how-to-contact-support/).

## Refunds and returns
If a refund is ever due, it goes back through the payment method the payment was received through, which here means Cash App. Our returns policy allows returns within 30 days for unopened items in original packaging, less a 15% restocking fee, and opened or used items cannot be returned. See [refund and return policy explained](/blog/refund-and-return-policy-explained/).

## Alternatives
If you prefer a different method, you can pay with [Apple Pay](/blog/apple-pay-payments-guide/) or [Chime](/blog/chime-payments-guide/), which follow the same send-details-after-ordering process. If you want the 10% discount, choose cryptocurrency or a gift card; see [how the crypto and gift card discount works](/blog/crypto-discount-how-it-works/). All products are for adults aged 21 and over, and nicotine is addictive.

## Staying protected
Only trust payment details that come through our official email, our WhatsApp number or your private order page. Never share your Cash App PIN or sign-in codes with anyone, and be wary of anyone who asks you to pay a different handle or pay outside the order. If anything looks unusual, stop and contact us before you pay.`,
faq: [
["How do I get the Cash App payment details?", "After you place your order we email them, usually within minutes in business hours, and can also send them on WhatsApp. They include a link to a private tap-to-copy page."],
["Do I get a discount for paying with Cash App?", "No. The 10% discount applies to cryptocurrency and gift card payments. Cash App, Apple Pay and Chime pay the standard price."],
["What do I put in the Cash App note?", "Add your order ID so we can match your payment to your order quickly."],
["Do I need to upload a screenshot?", "Yes, it speeds up confirmation. Use the link in your email to upload a screenshot showing the amount, recipient and time."],
["How long do I have to pay?", "Pay within 24 hours or the order may be released so stock is not held indefinitely."],
["Where do refunds go?", "Refunds return through the payment method the payment was received through, which is Cash App for Cash App orders, less the 15% restocking fee where it applies."],
]
},

"how-payment-details-reach-you": {
body: `For some payment methods we do not show payment details at checkout. Instead, we send them after you place the order. That applies to Cash App, Apple Pay and Chime, and to the buy-and-upload instructions for gift cards. If you have ordered this way before you may already know the pattern, but many customers wonder why it works like this, where exactly the details will arrive, what each message contains, how to tell a genuine message from a fake one and what to do if nothing turns up. This guide explains all of it. It is written for adults aged 21 and over.

## Why we do it this way
Payment details are tied to your order and kept current. Sending them after the order lets us do several useful things. We can confirm the amount and the products before you pay, which reduces mistakes. We can send the details through the channel you prefer. And we can make sure each customer receives instructions that match their order, rather than a generic set that might be out of date. For cryptocurrency the situation is different, because the payment window shows a live quote and a QR code immediately; see [how to pay with Bitcoin](/blog/how-to-pay-with-bitcoin/) for that flow.

## The three places you will see payment details
1. **Email:** a clear message with the amount due, each payment field and the payment terms. It also contains your order number and the link to your private order page.
2. **WhatsApp:** the same fields in a chat message with a link, if you placed the order through WhatsApp or asked for the details there. See [ordering via WhatsApp](/blog/ordering-via-whatsapp/).
3. **The payment page:** a private link where each field has a tap-to-copy button and where you can upload your receipt. Email programs cannot run copy buttons, so the page exists to make copying a single tap.

These three always agree with each other. If you receive details that do not match across them, stop and contact us.

## What each message contains
Every payment message includes your order number, the exact amount due, the payment method, the field or fields you need (such as a $Cashtag for Cash App), the note to include so we can match your payment and a link to your private order page. For gift cards the message also includes a buy link and an upload link, as described in [how gift card payment works](/blog/how-gift-card-payment-works/). The tone is plain and practical: it tells you what to do and by when.

## Why a link rather than only details
The private page lets you copy each detail with one tap and upload your receipt from the same place, so you do not have to go back and forth between apps. The link contains a unique token, which means only people who have the link can open it. Treat it like a ticket: do not post it publicly or forward it to someone you do not trust. If you think someone else has seen it, contact us and we can help.

## What to do when the details arrive
1. Open the private page from the email or WhatsApp message.
2. Open your payment app, such as Cash App, Apple Pay or Chime.
3. Pay the exact amount, adding your order ID in the note where the method allows it.
4. Return to the page and upload a screenshot of your confirmation. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/).
5. Wait for our confirmation email. Orders ship once payment is confirmed.

Each method has its own quirks. The guides for [Cash App](/blog/cash-app-payments-guide/), [Apple Pay](/blog/apple-pay-payments-guide/) and [Chime](/blog/chime-payments-guide/) cover the details.

## How long should the message take?
During business hours we usually send details within minutes. Outside business hours, or when order volume is high, it may take longer, but you will receive them. Customer service hours are Monday to Friday, 8AM to 5PM Arizona time. If you place an order at night, expect the message in the morning. You can check the status of your order at any time from the private link in your order email; see [order status meanings](/blog/order-status-meanings/).

## If nothing arrives
Work through this short list:

- **Check spam and promotions folders.** Messages from a new sender sometimes land there.
- **Check the address.** A typo in the email address at checkout is the most common cause.
- **Check your phone number.** If you asked for WhatsApp, make sure the number was entered with the country code.
- **Wait a few minutes.** Email delivery is not always instant.
- **Contact us.** Use the [contact page](/contact/) or WhatsApp with your order number or the email and name you used.

Our article on [order confirmation emails not arriving](/blog/order-confirmation-email-not-arriving/) covers the common technical causes in detail, including mailbox filters and full inboxes.

## Spotting genuine messages
Genuine payment instructions come from three places only: our official email at the store's own domain, our official WhatsApp number and the private order page linked from those messages. We do not ask customers to pay through social media direct messages, random phone numbers or links that do not belong to us. We never ask for your card number, PIN, password or recovery phrase. If a message asks for any of those, or pushes you to pay urgently outside the order, treat it as suspicious and do not pay.

When in doubt, compare the amount and order number in the message with your order. They should match exactly. If they do not, or if the sender is not one of the official channels, stop and contact us through the website.

## What if I need the details again?
Open the original email and use the link to your private payment page, which always shows the current details. If you cannot find the email, contact us and we will resend it. Do not use details from an old order for a new order, because each order has its own amount and note.

## What if I need to change something?
If you notice a mistake in the amount or the order, tell us before you pay. We can correct the order and send updated details. If you have already paid, send us your order number and a screenshot so we can match and adjust. See [how to change or cancel an order](/blog/how-to-change-or-cancel-an-order/).

## After you pay
Once we confirm your payment you receive an email and your status updates. We then process the order within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse and ship with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. Read [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/) and [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/) to prepare.

## Which method should you choose?
If speed and automation matter most, cryptocurrency is checked on the blockchain automatically. If you already use a payment app daily, Cash App, Apple Pay or Chime may be more convenient even without the 10% discount. If you have a gift card, our gift card process lets you use it, and it earns the discount too. Our [payment methods comparison](/blog/payment-methods-compared/) puts them side by side. All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Why aren't payment details shown at checkout?", "For Cash App, Apple Pay, Chime and gift cards we send details after you order so they match your order and are always current."],
["Where will I receive the details?", "By email, and by WhatsApp if you used or asked for it. Both link to a private payment page with tap-to-copy buttons."],
["What is the private payment page?", "A link with a unique token where each detail has a copy button and where you upload your receipt. Only people with the link can open it."],
["What should I do if nothing arrives?", "Check spam and the email you entered, wait a few minutes, then contact us with your order number."],
["How do I know a message is genuine?", "It comes from our official email or WhatsApp number, matches your order amount and number, and never asks for PINs, passwords or recovery phrases."],
["Can I get the details again?", "Yes. Use the link in your original email or contact us and we will resend it."],
]
},

"crypto-discount-how-it-works": {
body: `We offer a 10% discount when you pay by cryptocurrency or with a supported gift card. It is applied automatically at checkout the moment you pick one of those methods, and it shows as its own line in the order summary so you can see exactly what you are saving. This guide explains what the discount applies to, how it interacts with the free-shipping threshold, worked examples with real numbers, which payment methods qualify, whether the extra steps are worth it and how to compare all the options. It is written for adults aged 21 and over and is not financial advice.

## What the discount applies to
The discount is calculated on your product subtotal, which is the total of the items in your cart at their listed prices, including whichever strength or pack size you chose. It is not applied to shipping. Shipping is added after the discount, either as a flat $15 or as free when your order qualifies. Each line is shown in the order summary on the checkout page: subtotal, discount, shipping and total. If you change your payment method at checkout, the summary updates immediately, so you can compare totals before you decide.

Because prices are set on our server from the catalog, the discount cannot be changed or forced from your browser. What you see at checkout is the same figure the server calculates when the order is placed.

## Free shipping and the discount
This is the part that surprises people. Our free-shipping offer applies to orders of $200 or more after discount and before tax. That means the discount can bring a cart down below the threshold. A $215 cart paid by crypto becomes $193.50 after the 10% discount, which is under $200, so the flat $15 shipping fee is added. The same $215 cart paid by Cash App has no discount, so it stays above $200 and ships free.

That is not a trick; it is how the offer is defined, and it is described in the [shipping policy](/shipping/) and in [minimum order and free shipping explained](/blog/minimum-order-and-free-shipping-explained/). The practical advice is simple: check the order summary before you pay, and if you are close to the threshold, consider whether adding one more item changes the result in your favor.

## Worked examples
- **$150 cart, crypto:** discount $15.00, product total $135.00, plus $15 shipping, so $150.00 due. Under $200 after discount, so shipping applies.
- **$150 cart, Cash App:** no discount, product total $150.00, plus $15 shipping, so $165.00 due.
- **$230 cart, crypto:** discount $23.00, product total $207.00, shipping free, so $207.00 due. This is the best case: the discount lands above the free-shipping line.
- **$230 cart, Cash App:** no discount, product total $230.00, shipping free, so $230.00 due.
- **$215 cart, crypto:** discount $21.50, product total $193.50, plus $15 shipping, so $208.50 due. Compare with Cash App at $215.00 and free shipping, where Cash App is only $6.50 more.
- **$100 minimum cart, crypto:** the minimum order of $100 applies to the subtotal. After the discount the product total is $90.00, plus $15 shipping, so $105.00.

The comparison between the last two is the interesting one: the discount is always worth more than the shipping fee unless you sit just above the threshold on the other method.

## Which methods qualify
- **Cryptocurrency:** Bitcoin, USDT on ERC20 or TRC20, USDC, Ethereum, BNB and Solana.
- **Gift cards:** Apple, Razer Gold, Paysafe, Sephora and Macy's.

Cash App, Apple Pay and Chime do not carry the discount, because they pay at the standard price. All methods are available to adults aged 21 and over. You can compare them in [payment methods compared](/blog/payment-methods-compared/).

## Is it worth the extra steps?
That depends on where you are starting.

### If you already hold crypto
Definitely. You save 10% for the cost of a network fee, which is usually small compared with the saving on a typical order. Choose a network with low fees, such as USDT on TRC20 or Solana, to keep the saving as large as possible. See [USDT ERC20 vs TRC20](/blog/usdt-erc20-vs-trc20-which-network/) and [paying with Solana](/blog/pay-with-solana-sol/).

### If you would need to buy crypto first
Factor in the provider's fees. Buying with a card often costs a few percent, which can eat much of the discount on a small order, while a bank transfer on an exchange may cost less but take longer. Read [how to buy crypto with a card](/blog/how-to-buy-crypto-with-a-card/) to compare, and compare the total cost with the standard-price options.

### If you have a gift card
Gift cards qualify too, and the process is straightforward. We send a buy link and an upload link after you order. See [how gift card payment works](/blog/how-gift-card-payment-works/) and the guides for [Apple](/blog/pay-with-apple-gift-card/), [Razer Gold](/blog/pay-with-razer-gold/), [Paysafecard](/blog/pay-with-paysafecard/), [Sephora](/blog/pay-with-sephora-gift-card/) and [Macy's](/blog/pay-with-macys-gift-card/).

## How the discount shows on your order
After you pay, your order page and confirmation email show the same breakdown as checkout: the subtotal, the discount, the shipping and the total. If a refund is ever due, it is calculated from what you actually paid and goes back through the payment method the payment was received through, less the 15% restocking fee where it applies. See [refund and return policy explained](/blog/refund-and-return-policy-explained/).

## Stacking and limits
The 10% discount does not stack with itself, and it applies to the order as a whole. There is a single payment method per order. If you want to use a gift card for part and another method for the rest, contact us before you order so we can advise; otherwise, choose one method. The minimum order is $100 before the discount.

## Common questions about timing
Crypto payments are matched automatically on the blockchain, usually within minutes, as explained in [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/). Gift card payments need a manual check once you upload the card details, so they take a little longer. After payment is confirmed, orders are processed within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse and ship with tracking. An adult aged 21 or older must sign on delivery.

## Mistakes to avoid
- **Assuming the discount keeps free shipping.** Check the summary, because the threshold is applied after the discount.
- **Choosing a high-fee network for a small order.** A large fee can cancel the saving.
- **Paying the wrong amount.** Send the exact amount shown. See [why your crypto payment shows underpaid](/blog/why-your-crypto-payment-shows-underpaid/).
- **Expecting the discount on app payments.** It applies to crypto and gift cards only.

## Bottom line
For most customers who can pay in crypto or with a gift card, the 10% discount is the biggest saving on the site, and it is worth taking whenever it makes the total lower than the alternatives. Check the order summary, compare the totals and choose the method that costs you least while suiting your habits. Browse the [disposable vapes](/shop/disposables/) and [vape juice](/shop/vape-juice/) ranges, and remember all products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["How much is the crypto discount?", "10% on your product subtotal when you pay with cryptocurrency or a supported gift card. It is applied automatically at checkout."],
["Does the discount apply to shipping?", "No. The discount is calculated on the product subtotal, and shipping is added after it."],
["Can the discount remove my free shipping?", "Yes. Free shipping applies to orders of $200 or more after discount, so a $215 cart paid by crypto becomes $193.50 and pays $15 shipping."],
["Which payment methods qualify?", "Cryptocurrency (BTC, USDT, USDC, ETH, BNB, SOL) and gift cards (Apple, Razer Gold, Paysafe, Sephora, Macy's). Cash App, Apple Pay and Chime do not."],
["Is paying with crypto worth it if I have to buy it first?", "It can be, but compare the buying fees with the saving. On a small order, card fees can cancel much of the discount."],
["Where do refunds go for discounted orders?", "Back through the payment method used, calculated from what you paid, less the 15% restocking fee where it applies."],
]
},

"how-we-detect-your-crypto-payment": {
body: `You should not have to wait for someone to read a screenshot before your crypto payment counts. For most networks, we match payments to orders automatically by reading public blockchain data. This guide explains exactly what happens when you press "I have paid", what the system checks, the states you may see on your order page, how long each stage usually takes, when a person steps in, what to do if something looks wrong and what we do and do not see about your funds. It is written for adults aged 21 and over.

## What happens when you press "I have paid"
In the payment window you see your order reference, the amount in your chosen token, a QR code and the wallet address for the network you picked. When you have sent the payment from your wallet, you press "I have paid". At that point your order is created in our system with the status payment sent, and you are taken to a private status page. From there, our system reads public blockchain data for the shop wallet on the network you chose and looks for an incoming transfer that fits your order. You do not need to do anything else while it looks.

The status page refreshes on its own, and you can leave it and come back later using the private link in your order email. Nothing about the automatic check requires you to stay on the page.

## What we check
A transfer has to pass several tests before we link it to an order:

- **Network and address:** the transfer must arrive at the correct wallet on the correct network. A transfer to a different address, or on a different network, will not match.
- **Token:** it must be the token you chose, such as BTC, USDT, USDC, ETH, BNB or SOL.
- **Amount:** the US dollar value of the transfer must be close to your order total, with a small tolerance for market movement between the quote and the payment. We convert the received amount at the market rate to compare it with your total.
- **Time:** the transfer must be recent, shortly before or after you placed the order. This stops an old unrelated transfer from being matched.
- **Uniqueness:** a single transaction can pay only one order. Once a transfer is matched, it is claimed, so it cannot be applied to a second order.

If a transfer passes all of these, it is matched to your order. If more than one order could fit, the best match by amount and time is used.

## The states you may see
- **Awaiting payment or payment sent:** your order exists and we are looking for a matching transfer.
- **Detected:** a matching transfer is visible on the network but has not yet reached the number of confirmations we require.
- **Confirmed:** the transfer is matched and confirmed. You receive an email and your order moves into processing.
- **Underpaid:** we found a payment that is short of the order total. See [why your crypto payment shows underpaid](/blog/why-your-crypto-payment-shows-underpaid/).
- **Submitted for review:** you added a screenshot or transaction hash, and a team member will check it.

You can see the current state on your private status page at any time, and the meaning of each status is explained in [order status meanings](/blog/order-status-meanings/).

## How long each stage usually takes
Speed depends on the network. Solana and Tron payments are usually detected within seconds to a couple of minutes. Ethereum and BNB Smart Chain usually take a few minutes. Bitcoin is usually visible within a minute or two but is not final until it has been included in a block, which often takes around ten minutes and sometimes longer when the network is busy. Detection is only the first stage: after a payment is confirmed, the order enters processing, which takes 24 to 72 business hours before it ships. See [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/).

## When a person steps in
Automatic detection covers the main networks, but a person reviews an order when:

- the network does not support automatic detection for that token,
- the amount does not match closely enough,
- there is more than one possible match,
- you submitted a transaction hash or screenshot that needs checking, or
- something looks unusual.

In those cases a team member checks your screenshot and the transaction hash against the blockchain. You can add both on the status page; see [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/). A transaction hash, sometimes called a transaction ID, is the long string of characters your wallet shows after you send. Pasting it in lets us find the exact transfer immediately.

## What we see and what we do not
We use only public blockchain data. Because blockchains are public, anyone can see that an address received a transfer, how much and when. We do not see your wallet balance, your other transactions or your identity from the chain. We never ask for private keys, seed phrases or recovery words, and you should never share them with anyone. A genuine payment never requires them. If anyone asks you for them in connection with an order, do not respond and contact us.

## Why the tolerance exists
Crypto prices move. Between the moment you see the quote and the moment your transaction is confirmed, the dollar value of the amount you sent can differ slightly from your order total. A small tolerance allows for that, so a payment that is off by a tiny amount because of market movement is accepted. Larger gaps are not covered, and they show as underpaid. To avoid trouble, send the amount shown in the window, copy it with the copy button and keep network fees separate from the amount. If your exchange deducts its withdrawal fee from what you send, add the fee to the amount.

## Common reasons a payment does not match
- **Wrong network or token:** funds sent on a different network, or a different token, do not arrive at the address. See [sent crypto on the wrong network](/blog/sent-crypto-on-the-wrong-network/).
- **Short amount:** fees deducted from the amount, or a significant price move, can leave it under the total.
- **Late transfer:** a payment sent long after the order may fall outside the time window and need a manual check.
- **Already claimed:** a transaction can pay only one order, so reusing the same transfer for two orders will not work.
- **Pending withdrawal:** exchanges sometimes hold withdrawals for security checks, so the transfer appears later than expected.

## What you should do if it is taking a while
First, check the status page and your wallet's transaction record for confirmations. Second, if the status still shows waiting after the time that is normal for the network, add your transaction hash and a screenshot on the status page. Third, if you are still stuck, contact us through the [contact page](/contact/) with your order reference. Do not resend the payment, because duplicates are hard to unwind.

## Why automation matters
Automatic matching means most crypto orders move forward without anyone needing to read a screenshot, which is faster for you and more accurate for us. It also means each transaction is tied to one order only, which protects against mix-ups. People still handle the exceptions, which keeps the system fair when real-world payments do not match the quote perfectly.

## After your payment is confirmed
You receive an email, your order status updates and the order enters processing. We process orders within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse and ship with tracking by a regional carrier. An adult aged 21 or older must sign on delivery, as explained in [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/). Ready to pay? Start with [how to pay with Bitcoin](/blog/how-to-pay-with-bitcoin/) or compare [payment methods](/blog/payment-methods-compared/). Cryptocurrency payments save 10%, as explained in [the crypto discount guide](/blog/crypto-discount-how-it-works/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Do I need to upload a screenshot for a crypto payment?", "Usually not. We match payments automatically from public blockchain data. A screenshot or transaction hash helps when the match needs a manual check."],
["What does the system check?", "The network and address, the token, the dollar value of the amount, the timing and that the transaction has not already paid another order."],
["How long does detection take?", "Solana and Tron are usually seconds to a couple of minutes, Ethereum and BNB a few minutes, and Bitcoin usually needs a block confirmation, often around ten minutes."],
["What does 'underpaid' mean?", "We found a payment that is short of your order total. Do not resend; contact us with your reference and transaction hash."],
["Can you see my wallet balance?", "No. We only use public blockchain data about transfers to our wallet. We never ask for private keys or recovery phrases."],
["Can one transaction pay two orders?", "No. Each transaction can be claimed by only one order."],
]
},
};
