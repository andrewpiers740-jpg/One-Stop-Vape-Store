// Long-form (1,500+ words) rewrites of the Gift Card Payments guides, batch 4. Applied by scripts/apply-long.mjs.
const AFTER = (card) => `## What happens after you upload
Once you submit your ${card} details, we check the card and its balance and match it to your order. When we have verified it, we mark your order as paid and email you a confirmation. Verification is a manual check by our team, so it takes longer than crypto, which is matched automatically on most networks, and it is quickest during business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time. After your payment is confirmed, the order enters processing, which takes 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse. It then ships with tracking by a regional carrier, and an adult aged 21 or older must sign on delivery and may be asked to show photo ID. You can follow each stage from the private link in your order email, and the meaning of each status is explained in [order status meanings](/blog/order-status-meanings/).`;

const WORKED = (card, cart, discount, product, ship, total, note) => `## A worked example
Suppose your cart is $${cart}. Paying with a gift card applies the 10% discount of $${discount}, so the product total is $${product}. ${ship} The amount due is $${total}. ${note} You buy a ${card} card for the amount due, upload the code and receipt through your private link and wait for our confirmation. The discount is calculated on the product subtotal and shown in your order summary before you place the order, so you always know the exact figure. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/) for more examples, including how free shipping is measured after the discount.`;

export default {
"how-gift-card-payment-works": {
body: `Gift cards are a payment option for people who prefer not to use cryptocurrency or payment apps, and they earn the same 10% discount as crypto. At One Stop Vape Store you can pay with an Apple, Razer Gold, Paysafe (paysafecard), Sephora or Macy's gift card. The process has five steps: choose gift cards at checkout, place your order, buy a card for the exact amount, upload the details through a private link and wait while we verify and ship. This guide explains every step in detail, how to handle denominations that do not match, how timing works, how to keep your card details protected and which card to choose. It is written for adults aged 21 and over.

## Why we accept gift cards
Not everyone holds crypto or wants to use a payment app, and gift cards are easy to buy online or in a store. They also give you the same 10% discount as cryptocurrency, which can make a noticeable difference on a larger order. The trade-off is that gift card payments need a manual check, so they are not instant. If speed matters most, compare options in [payment methods compared](/blog/payment-methods-compared/) and [gift card or crypto, which is better](/blog/gift-card-vs-crypto-which-is-better/).

## Step 1: choose Gift cards at checkout
Add products to your cart, choose options such as strength and pack size on the product page and go to checkout. Enter your contact and shipping details and confirm you are 21 or older. Select Gift cards, then pick which card you will use: Apple, Razer Gold, Paysafe, Sephora or Macy's. A short guide appears with a link to the official place to buy that card online. The order summary shows the 10% discount and your total, so you can see the exact amount before you continue.

## Step 2: place your order
Complete the order. We immediately email you, and can message you on WhatsApp if you prefer, with the exact amount due, a link to buy that card online and a private upload link. Your order is saved with the status awaiting payment and a unique order number. The minimum order is $100, and orders of $200 or more after the discount ship free; smaller orders pay a flat $15 shipping fee. See [minimum order and free shipping explained](/blog/minimum-order-and-free-shipping-explained/).

## Step 3: buy a card for the exact amount
Open the official store link and buy a gift card for the amount due, delivered to your own email address. Do not redeem the card to your own account, and do not use it for anything else. Gift cards come in fixed denominations, so sometimes the exact amount is not available. If the denominations do not match, buy the next amount up and tell us in the notes, and we will review it with you. If the amount due is larger than the maximum for a single card, buy two or more cards and upload them all.

## Step 4: upload the details
Use the private upload link to add the card code or PIN, clear photos or screenshots of the card email or the physical card, and your purchase receipt. The link contains a unique token, so only people who have it can open the page, and uploads are private. Check each digit of the code before you send, because a typo is the most common reason a card cannot be verified. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/) for tips on clear images.

## Step 5: verification and shipping
We verify the card and mark the order paid. You receive a confirmation email, and the order proceeds to processing as described in the [shipping policy](/shipping/). Processing takes 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse, followed by carrier delivery with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. See [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/) and [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/).

## Which card should you choose?
- **Apple:** easy to buy online and widely available. See [paying with an Apple gift card](/blog/pay-with-apple-gift-card/).
- **Razer Gold:** a prepaid gaming currency with PINs. See [paying with Razer Gold](/blog/pay-with-razer-gold/).
- **Paysafe:** a prepaid voucher you can buy with cash at many retailers. See [paying with paysafecard](/blog/pay-with-paysafecard/).
- **Sephora:** an e-gift card with a number and PIN. See [paying with a Sephora gift card](/blog/pay-with-sephora-gift-card/).
- **Macy's:** an e-gift card with a number and PIN. See [paying with a Macy's gift card](/blog/pay-with-macys-gift-card/).

If you already hold a card from one of these, use that. If you are buying one just for the order, choose the one that is easiest to buy in the exact amount.

## Timing
Gift card payments are slower than crypto because a person checks each card. Allow time on the day you order: buying the card takes minutes, uploading takes a minute or two and verification usually follows during business hours. If you order late in the evening or at a weekend, expect verification the next business morning. Paying promptly keeps your stock reserved, and unpaid orders may be released after 24 hours.

## Keeping your card details protected
Gift card codes work like cash. Anyone with the code can spend the balance, so only share it through the private link we send. Never post a code publicly, and ignore messages from anyone who asks you to pay by gift card outside our official order link. Buy cards only from the brand's own site or a reputable retailer, because discounted cards from marketplace sellers may be stolen or already used. Read [gift card code security tips](/blog/gift-card-code-security-tips/) before you buy.

## Common problems
### The amount does not match
Buy the next amount up and tell us in the notes. We will review the difference with you.

### The code is not accepted
Check each digit and the PIN, and confirm the card is for the right brand. If it still fails, contact us with your order number and a screenshot of the receipt.

### I uploaded the wrong card
Tell us right away with your order number so we can note it, and contact the card issuer if the code was not meant to be shared.

### I cannot find the upload link
Open the original email, or contact us through the [contact page](/contact/) with your order number and we will resend it.

## Refunds
If a refund is ever due, it goes back through the payment method the payment was received through, less the 15% restocking fee where it applies. For gift card orders we will explain how the refund is returned. Our returns policy allows returns within 30 days for unopened items in original packaging, and opened or used items cannot be returned. See [refund and return policy explained](/blog/refund-and-return-policy-explained/).

## Frequently asked questions in depth
### Can I use a card I received as a gift?
If it is one of the supported brands and you own it, yes, but make sure the balance matches the amount due and that you are the rightful owner. Do not use cards of unknown origin.

### Can I combine two different brands?
Please choose one brand per order where possible. If you need to use more than one, contact us before ordering so we can advise.

### Do gift cards earn the same discount as crypto?
Yes, 10% on the product subtotal. Free shipping applies to orders of $200 or more after the discount.

## Ready to order
Browse [disposable vapes](/shop/disposables/) and [vape juice](/shop/vape-juice/), and compare your options in [payment methods compared](/blog/payment-methods-compared/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Which gift cards do you accept?", "Apple, Razer Gold, Paysafe (paysafecard), Sephora and Macy's."],
["Do gift cards get a discount?", "Yes. Gift card payments save 10% on your product subtotal, the same as cryptocurrency."],
["What if the card amount does not match exactly?", "Buy the next amount up and tell us in the notes, and we will review the difference with you."],
["How long does verification take?", "A team member checks each card, so it is slower than automatic crypto matching. It is quickest in business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time."],
["Is it a problem to buy from a marketplace seller?", "Yes. Buy only from the brand's own site or a reputable retailer, because discounted cards may be stolen or already used."],
["Where do refunds go?", "Back through the payment method the payment was received through, less the 15% restocking fee where it applies."],
]
},

"pay-with-apple-gift-card": {
body: `Apple gift cards are one of the most common gift card payment options at One Stop Vape Store. They are easy to buy online, widely available at stores and they qualify for our 10% gift card discount. If you have never paid with a gift card before, the process is simple: buy an Apple gift card for the amount due, copy the code from the email, upload it with your receipt through the private link we send, and wait while we verify it. This guide walks through each step, explains what to look for on the card email, covers amounts that do not match, explains what to avoid and answers the questions we hear most. It is written for adults aged 21 and over.

## Buy the card
Open the official [Apple Gift Card page](https://www.apple.com/shop/gift-cards) and choose an e-gift card for the exact amount due. Have it delivered to your own email address and complete checkout. We send you the amount due in our order email, so you can match it exactly. Use the official page, or a retailer you trust, because cards from marketplace sellers may be stolen or already used.

If you prefer to buy in a store, choose a physical card for the amount due and keep the receipt. A physical card shows a code on the back, sometimes under a scratch-off strip. Follow the instructions on the card, and take clear photos of the card and the receipt.

## Find the code
Apple emails you the card with a code. Do not redeem it to your own account, because redeeming it uses the balance. Copy the code, or take a screenshot of the delivery email, and keep the email until we confirm your payment. The code is sixteen characters of letters and numbers. Check it carefully, because a single wrong character is the most common reason a card cannot be verified.

## Upload to us
Use the private link from our order email. Enter the code, add photos or screenshots of the card email and your Apple receipt, then send. The link contains a unique token, so only someone who has it can open the page. Uploads are private. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/) for how to make a clear image. If you bought more than one card to reach the amount, add each code and receipt.

## Matching the amount
Gift card denominations are fixed, so the exact amount due may not be available. If it is not, buy the next amount up and tell us in the notes so we can review it with you. If the amount due is larger than the maximum for one card, buy two cards and upload both. Please do not buy a much larger card than you need, because the balance cannot be returned to you through us.

## What happens after you upload
We check the card and its balance and match it to your order. This is a manual check by our team, so it is quickest during business hours. When it is verified, we mark the order as paid and email you a confirmation. The order then enters processing, which takes 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse, and ships with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. See [order status meanings](/blog/order-status-meanings/) and [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/).

## A worked example
Suppose your cart is $180. Paying with a gift card applies the 10% discount of $18.00, so the product total is $162.00. Because that is under $200, the flat $15 shipping fee applies, and the amount due is $177.00. Apple e-gift cards can be bought for a range of amounts, so you might buy a $177 card if it is offered, or the next amount up and tell us in the notes. You upload the code and receipt through the private link. For comparison, the same cart paid by Cash App has no discount and totals $195.00 because shipping is added to $180. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/) for how the free-shipping line works.

## Tips
- Buy only from Apple's official store or a retailer you trust.
- Match the amount due. If you must buy more, tell us.
- Keep the email and the receipt until we confirm.
- Check the code character by character before you send.
- Upload through the private link only.

## Why use Apple cards
They are easy to buy online and widely accepted. They arrive by email within minutes, and you can buy them at many stores for cash. They also qualify for our 10% gift card discount, which makes them a good option if you do not hold crypto.

## What to avoid
Do not share the code in public chats, do not post photos of it online and ignore messages that ask you to pay by gift card outside our official order link. We will never ask for a code by text message, social media or a phone call you did not expect. Read [gift card code security tips](/blog/gift-card-code-security-tips/) before you buy.

## Frequently asked questions in depth
### Can I use an Apple gift card I already own?
Yes, if it is unused and you are the rightful owner, and if its balance matches the amount due. Do not redeem it first.

### What if my card has less than the amount due?
Buy a second card for the difference and upload both. Tell us in the notes so we can match them to the order.

### What if I redeemed the card by mistake?
Tell us right away. A redeemed card has no balance to verify, so you will need a new card. Contact us through the [contact page](/contact/) with your order number.

### Is this slower than crypto?
Usually, because a person checks each card. Crypto on a supported network is matched automatically. See [gift card or crypto, which is better](/blog/gift-card-vs-crypto-which-is-better/).

## Related guides
Start with [how gift card payment works](/blog/how-gift-card-payment-works/) and compare other cards: [Razer Gold](/blog/pay-with-razer-gold/), [Sephora](/blog/pay-with-sephora-gift-card/), [Macy's](/blog/pay-with-macys-gift-card/) and [paysafecard](/blog/pay-with-paysafecard/). Browse the [disposable vapes](/shop/disposables/) range when you are ready. All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Where do I buy the Apple gift card?", "From the official Apple Gift Card page or a retailer you trust. Choose an e-gift card for the exact amount due, delivered to your own email."],
["Should I redeem the card first?", "No. Do not redeem it to your own account. Copy the code and upload it through our private link."],
["What if the exact amount is not available?", "Buy the next amount up and tell us in the notes, and we will review it with you."],
["Do Apple cards get the 10% discount?", "Yes. Gift card payments save 10% on your product subtotal."],
["What should I upload?", "The code, a screenshot or photo of the card email and your purchase receipt."],
["How long does verification take?", "A team member checks each card, so it is quickest during business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time."],
]
},

"pay-with-razer-gold": {
body: `Razer Gold is a prepaid gaming currency, and its PINs also work for the gift card option at One Stop Vape Store. If you already hold Razer Gold, or you find it easy to buy a PIN online, it is a straightforward way to pay without cryptocurrency, and it earns the 10% gift card discount. This guide explains how to buy a Razer Gold PIN for the exact amount, what to copy, how to upload it through the private link, how to handle amounts that do not match and how to keep your PIN protected. It is written for adults aged 21 and over.

## What Razer Gold is
Razer Gold is a virtual credit that works across Razer's own services and many partner games. It is sold as PINs, which are codes you redeem for a balance. Because a PIN works like cash, anyone who has it can use it, which is why we ask you to upload it only through the private link in your order email. Razer Gold PINs are delivered on screen and often by email after purchase.

## Buy a PIN
Visit the official [Razer Gold PIN page](https://gold.razer.com/global/en/gold/purchase/razer-gold-pin) and choose a PIN for the exact amount due. You will usually need a Razer account and a payment method to buy it. Choose the value that matches the amount in our order email. If you buy through a retailer instead, make sure it is a reputable one, and keep the receipt.

## Copy the PIN and serial
After purchase, the site shows the PIN and sometimes a serial number. Copy both, or take a screenshot of the page. Check each character before you move on, because a single wrong digit is the most common reason a PIN cannot be verified. Do not redeem the PIN to your own account, because redeeming it uses the balance. Keep the page or the email until we confirm your payment.

## Send us the details
Open the private upload link from our order email. Enter the PIN in the code box, add a screenshot of the purchase page and your receipt, then submit. The link contains a unique token, so only people who have it can open the page, and uploads are private. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/) for tips on clear images. If you bought more than one PIN to reach the amount, add each PIN and receipt.

## Matching the amount
Razer Gold is sold in set values. If you cannot match the exact amount, buy the next higher value and note the difference in the notes. We will review it with you. If the amount due is larger than the maximum for one PIN, buy two or more and upload them all. Please do not buy a much larger PIN than you need, because we cannot return unused balance to you.

${"" }## What happens after you upload
We check the PIN and its value and match it to your order. This is a manual check by our team, so it is quickest during business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time. When it is verified, we mark the order as paid and email you. The order then enters processing, which takes 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse, and ships with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. See [order status meanings](/blog/order-status-meanings/) and [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/).

## A worked example
Suppose your cart is $260. Paying with a gift card applies the 10% discount of $26.00, so the product total is $234.00. Because that is above $200, shipping is free, and the amount due is $234.00. Razer Gold PINs come in fixed values, so you might buy a $200 PIN and a $50 PIN and upload both, tell us the total is $250, and we review the $16 difference with you. For comparison, the same cart paid by Chime has no discount and totals $260.00. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/).

## Why it is a good option
It is a straightforward way to pay without crypto, and the PIN counts toward our 10% gift card discount. If you already have Razer Gold in your account, check whether it can be converted to a PIN, and if not, buy a new PIN rather than trying to transfer it. If you are a gamer who buys Razer Gold anyway, buying a little extra to cover an order is easy.

## Precautions
Buy only from the official Razer Gold site or a reputable retailer, and use PINs only through our official link. Never post a PIN or a screenshot of it publicly, and ignore messages that ask you to pay with Razer Gold outside our order. Read [gift card code security tips](/blog/gift-card-code-security-tips/) before you buy.

## Common problems
### The PIN is not accepted
Check each digit and any serial number. If it still fails, contact us with your order number and a screenshot of the purchase page.

### The PIN was already used
If it was redeemed by mistake, tell us right away. A redeemed PIN has no balance to verify, so you will need a new one.

### The amount is a little short
Buy a second PIN for the difference and upload both, and tell us in the notes.

### I cannot find the upload link
Open the original email, or contact us through the [contact page](/contact/) with your order number and we will resend it.

## Frequently asked questions in depth
### Do I need a Razer account?
You usually need one to buy a PIN on Razer's site. You do not need to redeem the PIN yourself, and we do not need access to your account.

### Can I use Razer Gold I already have in my account?
Only as a PIN you hold. Balances inside an account cannot be sent to us. If you have no PIN, buy a new one.

### Is it as fast as crypto?
Usually not, because a person checks each PIN. See [gift card or crypto, which is better](/blog/gift-card-vs-crypto-which-is-better/).

## Related guides
See [how gift card payment works](/blog/how-gift-card-payment-works/) and [uploading proof](/blog/how-to-upload-a-payment-screenshot/). Browse the [disposable vapes](/shop/disposables/) range when you are ready. All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Where do I buy a Razer Gold PIN?", "From the official Razer Gold PIN page or a reputable retailer. Choose a PIN for the exact amount due."],
["What do I upload?", "The PIN (and serial number if shown), a screenshot of the purchase page and your receipt, through the private link."],
["What if I cannot match the exact amount?", "Buy the next higher value and note the difference in the notes. We will review it with you."],
["Does Razer Gold earn the 10% discount?", "Yes. Gift card payments save 10% on your product subtotal."],
["Should I redeem the PIN myself?", "No. Redeeming it uses the balance. Upload it through the private link instead."],
["Is it slower than crypto?", "Usually, because a person checks each PIN. It is quickest in business hours."],
]
},

"pay-with-paysafecard": {
body: `paysafecard is a prepaid voucher system, and it is accepted as one of our gift card payment choices at One Stop Vape Store. It is popular with people who prefer to pay in cash at a retailer or who want to avoid using a card online. Paying with paysafecard earns our 10% gift card discount. This guide explains how to get a voucher, what you receive, how to upload the PIN through our private link, how to handle balances that fall short, how long verification takes and how to keep the PIN protected. It is written for adults aged 21 and over.

## What paysafecard is
paysafecard is a prepaid payment method sold as vouchers. Each voucher includes a 16-digit PIN, and the PIN represents the balance. You buy a voucher for a fixed amount, and anyone who has the PIN can spend it, which is why we ask you to upload it only through the private link in your order email. Vouchers are sold online and at many retail locations, and the amounts offered vary by retailer.

## Get a voucher
Visit [paysafecard](https://www.paysafecard.com/en-us/) and use the buy or where-to-buy options to purchase a voucher for the exact amount due. Availability varies by location and retailer. Many convenience stores and supermarkets sell vouchers in set amounts, and some retailers let you buy online. Check the amount in our order email, and choose a voucher that matches as closely as you can.

## What you receive
A voucher includes a 16-digit PIN. For online purchases it is shown on screen and emailed; for physical vouchers it is printed on a receipt. Keep the receipt, and do not use the PIN yourself. Treat it like cash: if you lose it or someone sees it, the balance can be spent by someone else.

## Upload the PIN
Use the private link in our order email. Enter the PIN, add a photo of the voucher or purchase receipt, and submit. We verify the PIN and mark your order paid. The link contains a unique token, so only someone who has it can open the page, and uploads are private. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/) for tips on getting a clear photo. If you bought more than one voucher to reach the amount, add each PIN and receipt.

## Matching the amount
Vouchers come in fixed amounts. If you cannot match the amount exactly, buy the next amount up and tell us in the notes so we can review it with you. If the amount due is larger than a single voucher, buy two or more and upload all the PINs. Please do not buy more than you need, because we cannot return unused balance to you.

## What happens after you upload
We check the PIN and its balance and match it to your order. This is a manual check by our team, so it is quickest during business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time. When it is verified, we mark the order as paid and email you a confirmation. The order then enters processing, which takes 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse, and ships with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. See [order status meanings](/blog/order-status-meanings/) and [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/).

## A worked example
Suppose your cart is $150. Paying with a gift card applies the 10% discount of $15.00, so the product total is $135.00. Because that is under $200, the flat $15 shipping fee applies, and the amount due is $150.00. At a store you might buy a $100 voucher and a $50 voucher, which together equal the amount due. You upload both PINs and your receipts through the private link, and we verify them. For comparison, the same cart paid by Cash App has no discount and totals $165.00. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/).

## Common issues
- **Not enough balance:** buy another voucher and upload both PINs.
- **Voucher not found online:** try a retail location; many convenience stores sell them.
- **Typo in the PIN:** check each digit before sending.
- **Voucher already used:** tell us right away, because a used voucher has no balance to verify.
- **Lost receipt:** keep a photo of the voucher or the receipt until we confirm.

## Tips
Keep the receipt until we confirm. Do not use the voucher yourself. Only send the PIN through our official link. Buy from the official site or a reputable retailer, never from a marketplace seller offering a discount.

## Why choose it
It is useful if you prefer to pay in cash at a retailer or want to avoid a card payment. It is also easy to buy in small amounts that add up to the total. It counts toward our 10% gift card discount, so you save as much as you would with crypto.

## Frequently asked questions in depth
### Do I need a paysafecard account?
You do not need an account to buy a voucher. You only need to upload the PIN through our private link.

### Can I combine vouchers?
Yes. If one voucher does not cover the amount, buy several and upload all the PINs and receipts.

### Is it slower than crypto?
Usually, because a person checks each PIN. See [gift card or crypto, which is better](/blog/gift-card-vs-crypto-which-is-better/).

### What happens to leftover balance?
We cannot return unused balance. Buy only what you need, or tell us in advance if you will have a surplus so we can note it against your order.

## Staying protected
Never post a PIN online, ignore messages that ask you to pay with a voucher outside our order link and buy only from the official site or a reputable retailer. Read [gift card code security tips](/blog/gift-card-code-security-tips/) before you buy.

## Related guides
Read [how gift card payment works](/blog/how-gift-card-payment-works/) and compare other cards: [Apple](/blog/pay-with-apple-gift-card/), [Razer Gold](/blog/pay-with-razer-gold/), [Sephora](/blog/pay-with-sephora-gift-card/) and [Macy's](/blog/pay-with-macys-gift-card/). Browse the [disposable vapes](/shop/disposables/) range when you are ready. All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["What is a paysafecard voucher?", "A prepaid voucher with a 16-digit PIN that represents its balance. It is sold online and at many retailers."],
["Where do I buy one?", "From the official paysafecard site or its where-to-buy options at retailers such as convenience stores."],
["What do I upload?", "The PIN and a photo of the voucher or your purchase receipt, through the private link in your order email."],
["What if the voucher does not cover the full amount?", "Buy another voucher and upload both PINs, and tell us in the notes."],
["Does it earn the 10% discount?", "Yes. Gift card payments save 10% on your product subtotal."],
["Should I use the voucher myself first?", "No. Do not spend it, or it will have no balance to verify."],
]
},

"pay-with-sephora-gift-card": {
body: `A Sephora gift card can be used to pay for your order at One Stop Vape Store, and it qualifies for our 10% gift card discount. It is a good option if you already have a Sephora e-gift card, or if you prefer to buy a card from a familiar retailer instead of using cryptocurrency or a payment app. This guide explains how to buy the card, where to find the number and PIN, how to upload them through our private link, how to handle amounts that do not match, what happens after you upload and how to keep your card protected. It is written for adults aged 21 and over.

## Buy the card
Go to the official [Sephora gift card page](https://www.sephora.com/beauty/gift-cards) and choose an e-gift card for the exact amount due. Send it to your own email so you receive the card number and PIN. The amount due is in our order email, and the order summary shows it before you place the order. Use Sephora's own site, or a retailer you trust, because cards from marketplace sellers may be stolen or already used.

## Locate the details
Open the delivery email and copy the card number and the PIN. Take a screenshot of the email too, in case you need to resend it. A Sephora e-gift card has a longer card number and a shorter PIN, and both are needed for it to be verified. Check each digit before you move on. If you bought a physical card, follow the instructions on the back. Some physical cards hide the PIN under a scratch-off strip, so read the instructions before you reveal it, and take clear photos.

## Upload to us
Use the private order link from our email. Enter both the number and the PIN in the code box, separating them with a space, then add your screenshot and receipt. The link contains a unique token, so only someone who has it can open the page, and uploads are private. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/) for tips on clear images. If you bought more than one card to reach the amount, add each number, PIN and receipt.

## If the amounts do not match
Gift card denominations are fixed. If the amount due is not available, buy the nearest higher amount and tell us in the notes. We will review the difference with you. If the amount due is larger than the maximum for a single card, buy two or more and upload them all. Please do not buy a much larger card than you need, because we cannot return unused balance to you.

## What happens next
We verify the balance and mark your order as paid. This is a manual check by our team, so it is quickest during business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time. You receive a confirmation email and your order enters processing, which takes 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse. It then ships with tracking by a regional carrier, and an adult aged 21 or older must sign on delivery. See [order status meanings](/blog/order-status-meanings/) and [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/).

## A worked example
Suppose your cart is $120. Paying with a gift card applies the 10% discount of $12.00, so the product total is $108.00. Because that is under $200, the flat $15 shipping fee applies, and the amount due is $123.00. Sephora e-gift cards are offered in set amounts, so you might buy a $125 card and tell us in the notes. You upload the number, PIN and receipt through the private link. For comparison, the same cart paid by Apple Pay has no discount and totals $135.00. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/) for how the free-shipping line works.

## Avoid problems
- Buy only from Sephora's official site.
- Do not scratch or reveal a physical PIN before checking the instructions on the card.
- Never post the card number publicly.
- Do not use the card yourself once you have decided to pay with it.
- Keep the email and the receipt until we confirm.

## Common problems
### The card is not accepted
Check that you entered both the number and the PIN, separated by a space, and that each digit is correct. If it still fails, contact us with your order number and a screenshot of the receipt.

### The balance is lower than expected
If the card was used or partly used, tell us right away. We will let you know what is needed, which may be a second card.

### I did not receive the email from Sephora
Check spam, check the address you entered when buying and use the order confirmation from Sephora to resend it.

## Frequently asked questions in depth
### Can I use a Sephora card I already have?
Yes, if it is unused, you own it and the balance matches the amount due. Do not use any of the balance first.

### Is a Sephora card slower than crypto?
Usually, because a person checks each card. See [gift card or crypto, which is better](/blog/gift-card-vs-crypto-which-is-better/).

### What about a card I received as a gift?
You can use it if it is one of our supported brands and you are its rightful owner. Make sure the balance is intact.

## Other card options
Compare with [Apple](/blog/pay-with-apple-gift-card/), [Macy's](/blog/pay-with-macys-gift-card/), [paysafecard](/blog/pay-with-paysafecard/) and [Razer Gold](/blog/pay-with-razer-gold/).

## Related guides
See [how gift card payment works](/blog/how-gift-card-payment-works/) and [gift card code security tips](/blog/gift-card-code-security-tips/). Browse the [disposable vapes](/shop/disposables/) range when you are ready. All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Where do I buy a Sephora gift card?", "From Sephora's official gift card page. Choose an e-gift card for the exact amount due and send it to your own email."],
["What do I upload?", "The card number and PIN in the code box, separated by a space, plus a screenshot of the email and your receipt."],
["What if the amount is not offered?", "Buy the nearest higher amount and tell us in the notes."],
["Does it earn the 10% discount?", "Yes. Gift card payments save 10% on your product subtotal."],
["Should I use the card first?", "No. Do not spend any balance, or the card cannot be verified for the full amount."],
["How long does verification take?", "A team member checks each card, so it is quickest in business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time."],
]
},

"pay-with-macys-gift-card": {
body: `Macy's gift cards are supported as part of the gift card payment option at One Stop Vape Store, and they earn the 10% discount. If you shop at Macy's already, or you prefer to buy a card from a large, familiar retailer instead of using cryptocurrency or a payment app, this is a straightforward choice. This guide explains how to buy an e-gift card, which details to copy, how to upload them through our private link, how to match amounts, what happens after we verify the card and how to keep your card protected. It is written for adults aged 21 and over.

## Buy an e-gift card
Open the official [Macy's gift card page](https://www.macys.com/shop/gift-cards) and choose an e-gift card for the exact amount due. Send it to your own email address. The amount due is in our order email, and the order summary shows it before you place the order. Use Macy's own site, or a retailer you trust, because cards from marketplace sellers may be stolen or already used. If you prefer a physical card, buy it in a store and keep the receipt.

## What to copy
The delivery email includes a card number and a PIN. Copy both, and take a screenshot of the email in case you need to resend it. A Macy's card number is long, and the PIN is shorter, so check each digit carefully. If you bought a physical card, the number and PIN are on the back, sometimes under a scratch-off strip. Read the instructions on the card before you reveal the PIN, and take clear photos.

## Upload
Go to the private link in our order email. Add the card number and PIN to the code field, and attach your screenshot and receipt. Submit. The link contains a unique token, so only someone who has it can open the page, and uploads are private. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/) for tips on clear images. If you bought more than one card to reach the amount, add each number, PIN and receipt.

## Matching amounts
If the amount you want is not offered, buy the next amount up and tell us in the notes so we can review it. If the amount due is larger than the maximum for a single card, buy two or more and upload them all. Please do not buy a much larger card than you need, because we cannot return unused balance to you.

## Security notes
Do not use the card in-store or online yourself. Do not share it with anyone other than through our private link. Never post a number or PIN in a public chat or on social media, and ignore messages that ask you to pay with a gift card outside our order. Learn more in [gift card code security tips](/blog/gift-card-code-security-tips/).

## After we verify
We confirm the balance, mark the order paid and email you. This is a manual check by our team, so it is quickest during business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time. The order then enters processing, which takes 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse. It ships with tracking by a regional carrier according to the [shipping policy](/shipping/), and an adult aged 21 or older must sign on delivery. See [order status meanings](/blog/order-status-meanings/) and [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/).

## A worked example
Suppose your cart is $200. Paying with a gift card applies the 10% discount of $20.00, so the product total is $180.00. Because that is under $200, the flat $15 shipping fee applies, and the amount due is $195.00. Macy's e-gift cards are offered in set amounts, so you might buy a $200 card and tell us in the notes. You upload the number, PIN and receipt through the private link. For comparison, the same cart paid by Chime has no discount, but because $200 meets the free-shipping threshold, the total is $200.00. The comparison shows why it helps to check the order summary: the gift card is still $5.00 cheaper, even though shipping is added. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/).

## Common problems
### The card is not accepted
Check that you entered both the number and the PIN, and that each digit is correct. If it still fails, contact us with your order number and a screenshot of the receipt.

### The balance is lower than expected
If the card was used or partly used, tell us right away. We will let you know what is needed, which may be a second card.

### I cannot find the email from Macy's
Check spam, check the address you entered when buying and use the order confirmation from Macy's to resend it.

## Frequently asked questions in depth
### Can I use a Macy's card I already own?
Yes, if it is unused, you own it and the balance matches the amount due. Do not use any of the balance first.

### Is a Macy's card slower than crypto?
Usually, because a person checks each card. See [gift card or crypto, which is better](/blog/gift-card-vs-crypto-which-is-better/).

### What if the card is a physical card?
Photograph both sides, including the number and PIN, and your receipt, and upload them through the private link. Keep the card until we confirm.

## More cards
Not a Macy's shopper? Try [Apple](/blog/pay-with-apple-gift-card/), [Sephora](/blog/pay-with-sephora-gift-card/) or [paysafecard](/blog/pay-with-paysafecard/).

## Related guides
Start with [how gift card payment works](/blog/how-gift-card-payment-works/). Browse the [disposable vapes](/shop/disposables/) range when you are ready. All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Where do I buy a Macy's gift card?", "From Macy's official gift card page. Choose an e-gift card for the exact amount due and send it to your own email."],
["What do I upload?", "The card number and PIN in the code field, plus a screenshot of the email and your receipt."],
["What if the amount is not offered?", "Buy the next amount up and tell us in the notes so we can review it."],
["Does it earn the 10% discount?", "Yes. Gift card payments save 10% on your product subtotal."],
["Should I use the card first?", "No. Do not use any balance, in-store or online."],
["How long does verification take?", "A team member checks each card, so it is quickest in business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time."],
]
},

"gift-card-code-security-tips": {
body: `Gift cards are convenient, which is also why scammers like them. A gift card code works like cash: anyone who has it can spend the balance, and a spent card cannot be reversed. If you pay with a gift card at One Stop Vape Store, a few simple habits keep your money and your codes protected. This guide explains how scams that target gift card buyers work, what to do before, during and after you buy, how to recognize genuine messages from us, what to do if a code is compromised and how to handle the details of each supported card. It is written for adults aged 21 and over.

## Why gift cards attract scammers
A gift card code is a string of characters that can be spent online without any further check. That makes it attractive to anyone who wants quick, hard-to-trace value. Typical scams include fake customer-service messages that say your account is in trouble, fake invoices, marketplace sellers selling "discounted" cards that turn out to be stolen or already used and pressure to pay immediately and keep the payment secret. Understanding how they work is the best defense, because the pressure is what makes them succeed.

## Only use official links
We send you a private link by email or WhatsApp when you choose gift cards. That link, and only that link, is where you should upload card details. Do not send a gift card code to anyone who contacts you out of the blue, even if they claim to work for us. Our messages come from our official email at the store's own domain and our official WhatsApp number, and they match your order number and amount exactly. We do not ask for codes by text message, social media or a phone call you did not expect. If you are unsure, contact us through the [contact page](/contact/) before you share anything.

## Buy from the source
Purchase cards from the brand's own site or a major retailer. Avoid marketplace sellers and auction sites selling discounted cards, because those cards may be stolen, counterfeit or already used, and you will not be able to recover your money. Official links for each supported card are in our guides: [Apple](/blog/pay-with-apple-gift-card/), [Razer Gold](/blog/pay-with-razer-gold/), [paysafecard](/blog/pay-with-paysafecard/), [Sephora](/blog/pay-with-sephora-gift-card/) and [Macy's](/blog/pay-with-macys-gift-card/).

## Never reveal a code publicly
Do not post pictures of codes online or in public chats, and do not send them to friends for safekeeping. Photograph only what we ask for: the code or PIN, the card email or the physical card and your receipt. Delete screenshots from shared albums and cloud folders after your order is complete, because anyone with access to those folders could spend the balance if the card still holds value.

## Keep the receipt
Your receipt proves the purchase. If something goes wrong, it helps the card issuer investigate and helps us check your order. Keep the email, the receipt and any screenshots until we confirm your payment, and for a few weeks afterward in case a question comes up.

## Check the amount
Buy for the amount due. Do not buy more than you need unless you plan to use the rest for another order, because we cannot return unused balance to you. If the exact denomination is not offered, buy the next amount up and tell us in the notes so we can review it. If the amount is larger than a single card allows, buy two or more.

## Beware of pressure
Real orders never require you to hurry or keep the transaction secret. If someone insists that you must pay immediately, must buy several cards or must read the codes to them over the phone, stop and contact us at the number on our [contact page](/contact/). Scammers use urgency because it works. A genuine order can wait while you check.

## Report problems early
If you think a card code was compromised, contact the card issuer immediately. Many issuers can freeze a card if the balance has not yet been spent. Then tell us, with your order number, so we can note it against your order. The sooner you act, the better the chance of recovering the balance.

## Before, during and after: a checklist
### Before you buy
- Confirm the amount due in our order email.
- Open the official link for the card you plan to use.
- Make sure you are on the real site by typing the address yourself.

### During the purchase
- Send the card to your own email address.
- Do not redeem or spend any of the balance.
- Take a screenshot of the delivery email.

### After you upload
- Wait for our confirmation email.
- Keep the receipt for a few weeks.
- Delete screenshots from shared places once the order is complete.

## Frequently asked questions in depth
### What if someone contacts me claiming to be from the store and asks for a code?
Do not send it. Contact us through the [contact page](/contact/) with details of the message. We will confirm whether it came from us.

### What if I sent a code to the wrong person?
Contact the card issuer immediately and ask if the card can be frozen. Then tell us so we can note it. Be honest about what happened, because the quicker we know, the better we can help.

### Can I buy a card from a friend?
Only if you know the card is unused and the friend owns it. Otherwise buy directly from the official site.

### Are physical cards or e-gift cards better?
Both work. E-gift cards are delivered instantly to your email and are easy to screenshot. Physical cards need clear photos of both sides. Either way, keep the receipt.

## Related guides
See [how gift card payment works](/blog/how-gift-card-payment-works/) and [uploading proof](/blog/how-to-upload-a-payment-screenshot/). For more on spotting fake products and messages, read [how to spot counterfeit vapes](/blog/how-to-spot-counterfeit-vapes/). Browse [disposable vapes](/shop/disposables/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Why are gift cards targeted by scammers?", "A code can be spent immediately and cannot be reversed, so it is attractive for quick, hard-to-trace value."],
["Where should I upload my gift card details?", "Only through the private link we send by email or WhatsApp after you place your order."],
["Where should I buy gift cards?", "From the brand's own site or a major retailer. Avoid marketplace sellers selling discounted cards."],
["What should I do if I think a code was compromised?", "Contact the card issuer immediately, then tell us with your order number."],
["Will you ever ask for a code by text or phone?", "No. We only use the private link in our order email or WhatsApp message."],
["Should I keep my receipt?", "Yes. It proves the purchase and helps if anything goes wrong."],
]
},

"gift-card-vs-crypto-which-is-better": {
body: `Both gift card and cryptocurrency payments earn a 10% discount at One Stop Vape Store, so for many shoppers the real question is not whether to take the discount but which route to take to get it. They suit different people. Crypto is faster and automatically matched on most networks, but it needs a wallet or an exchange. Gift cards are familiar and quick to buy, but they need a manual check and come in fixed amounts. This guide compares them on speed, effort, fees, exact amounts, reversibility, security and timing, with worked examples, and helps you decide which fits you. It is written for adults aged 21 and over and is not financial advice.

## The discount is the same
Both methods save 10% on your product subtotal, applied automatically at checkout. Shipping is added after the discount, and free shipping applies to orders of $200 or more after the discount. That means the saving does not depend on the method you choose, only on your order. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/) for worked examples. The differences are in how you pay.

## Speed
Crypto on a fast network can be confirmed within minutes, and detection is automatic on most networks, so a payment can be matched even outside business hours. Gift cards depend on you buying the card and uploading the details, then us verifying them, which is a manual check done during business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time. Typically crypto is quicker once you hold coins. Since orders begin processing only after payment is confirmed, a faster payment can mean an earlier dispatch. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/).

## Effort
If you have never used crypto, setting up a wallet or an exchange account takes time, including identity verification on a regulated exchange, which can take from minutes to days. Gift cards can be bought in minutes from a familiar site, and many people have bought one before. See [how gift card payment works](/blog/how-gift-card-payment-works/) and [how to buy crypto with a card](/blog/how-to-buy-crypto-with-a-card/). If you already hold crypto, the effort is small: choose a coin, send and press the button.

## Fees
Crypto has network fees and sometimes exchange or provider fees. Gift cards usually have no extra fee beyond the card price, though some retailers add small charges or processing fees. Compare the total cost against the 10% saving. On a small order, buying crypto with a card can cost more than the discount, while a gift card often leaves most of it intact. On a large order, both can be worthwhile. See [crypto network fees explained](/blog/crypto-network-fees-explained/).

## Exact amounts
Stablecoins such as [USDT](/blog/usdt-erc20-vs-trc20-which-network/) and [USDC](/blog/pay-with-usdc-on-solana/) let you send exact amounts, down to the cent. Gift cards come in set amounts, so you may need to round up and tell us in the notes, and any difference cannot be returned to you. If you need precision, crypto is better. If a small round-up does not bother you, a gift card is fine.

## Reversibility and security
Crypto transfers are final. Gift cards are also hard to recover once the code is sent. Be careful in both cases: check the address and network for crypto, and send gift card codes only through our private link. Read [gift card code security tips](/blog/gift-card-code-security-tips/) and [sent crypto on the wrong network](/blog/sent-crypto-on-the-wrong-network/) so you know what to avoid.

## Worked examples
### A $120 first order
With a gift card, the product total is $108.00 plus $15 shipping, so $123.00. With crypto it is the same $123.00, minus whatever fees you pay to get and send the crypto. If you have neither, the gift card route is usually simpler for a first order.

### A $260 order from someone who holds USDC
With crypto the product total is $234.00 and shipping is free, so $234.00, and the Solana fee is a fraction of a cent. A gift card would also total $234.00 but you would need to buy cards in set amounts and wait for a manual check. Crypto is faster and exact.

### A $205 order
With either method the product total is $184.50, which is under $200, so shipping of $15 is added, for $199.50. Choose whichever is easier for you, because the totals match.

## Who should use which
- **Already hold crypto:** use crypto.
- **Prefer a familiar checkout:** use a gift card.
- **Want exact amounts:** use stablecoins.
- **Order outside business hours and want it matched fast:** use crypto on a network with automatic detection.
- **Do not want to create a wallet or an exchange account:** use a gift card.

## Questions to ask yourself
1. Do I already hold crypto or a gift card from a supported brand?
2. How soon do I want the order to enter processing?
3. Would fees on the way in cancel the saving?
4. Do I need to pay an exact amount?
5. Am I comfortable with the steps of the method I am considering?

If you answer yes to the first question for either method, that is usually your answer.

## Frequently asked questions in depth
### Can I use both in one order?
Please choose one method per order. If you have a special situation, contact us before ordering.

### Which is easier for a beginner?
Usually gift cards, because the purchase is familiar. If you are curious about crypto, a stablecoin on a low-fee network is the gentlest start.

### Which is less likely to go wrong?
Both go smoothly when you follow the steps. Crypto mistakes usually involve the wrong network or address. Gift card mistakes usually involve a typo in the code or a mismatched amount. Check carefully in either case.

## See the full list
Read [payment methods compared](/blog/payment-methods-compared/) and the guides for [Bitcoin](/blog/how-to-pay-with-bitcoin/), [Apple gift cards](/blog/pay-with-apple-gift-card/) and [Razer Gold](/blog/pay-with-razer-gold/). Browse [disposable vapes](/shop/disposables/) and [vape juice](/shop/vape-juice/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Do gift cards and crypto get the same discount?", "Yes. Both save 10% on your product subtotal."],
["Which is faster?", "Crypto on a supported network is matched automatically within minutes. Gift cards need a manual check, quickest in business hours."],
["Which has lower fees?", "Gift cards usually have no extra fee beyond the card price. Crypto has network fees and sometimes provider fees."],
["Which lets me pay an exact amount?", "Stablecoins such as USDT and USDC. Gift cards come in set amounts."],
["Can I mix both?", "Please choose one method per order. Contact us beforehand if you have a special situation."],
["Which is best for a beginner?", "Usually a gift card, because the purchase is familiar."],
]
},
};
