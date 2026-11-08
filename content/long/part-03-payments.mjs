// Long-form (1,500+ words) rewrites of the Payments & Crypto guides, batch 3. Applied by scripts/apply-long.mjs.
export default {
"pay-with-ethereum-eth": {
body: `Ethereum (ETH) is one of the most widely held cryptocurrencies, and it is a popular way to pay at One Stop Vape Store because it qualifies for our 10% crypto discount. Paying with Ethereum is straightforward, but it has two features that catch newcomers out: the live exchange rate moves quickly, and every transfer pays a network fee called gas. This guide explains the whole process, how to estimate and reduce fees, how confirmation works, the mistakes to avoid and when another token might suit you better. It is for adults aged 21 and over, and it is not financial advice.

## The live quote
When you open the payment window we show the amount of ETH equal to your order total after the discount, based on a live rate. The rate refreshes about every 30 seconds, so the ETH figure can change slightly while you read it, while the dollar value of your order stays the same. ETH can move quickly, so send soon after you open the window, and if you leave it open for a long time, refresh it and send the current amount.

A useful way to think about it is that you owe a dollar amount, and the window tells you how much ETH equals that amount right now. If the price of ETH rises while you wait, you owe slightly less ETH; if it falls, slightly more. A small tolerance allows for movement between the quote and the confirmation, but a large gap shows as underpaid. See [why your crypto payment shows underpaid](/blog/why-your-crypto-payment-shows-underpaid/).

## Gas fees
Every Ethereum transfer pays a network fee called gas. The fee is charged by your wallet on top of the amount you send, it is paid to the network rather than to us, and it changes with network demand. When many people are using Ethereum, gas rises; when it is quiet, gas falls. A simple transfer of ETH from one address to another uses a standard amount of gas, so the cost depends mostly on the current price per unit of gas.

Check the estimate your wallet shows before you confirm. If the fee looks unusually high, you can wait for a quieter time, such as early morning in US time zones or weekends, or choose a different payment token with lower fees. For a deeper explanation, read [crypto network fees explained](/blog/crypto-network-fees-explained/).

### Keeping enough for gas
Make sure your wallet holds enough ETH for both the payment amount and the gas fee. If you send your entire balance as the payment amount, there will be nothing left for gas and the transfer will fail or the wallet will reduce the amount. Leave a small buffer, and remember that the fee is separate from the amount we ask for.

## Step by step
1. Fill your cart, choose options such as strength and pack size on the product page, and go to checkout. Enter your details and confirm you are 21 or older.
2. Choose Cryptocurrency, then Ethereum. The order summary shows the 10% discount and your total.
3. In the payment window, copy the address or scan the QR code. Use the copy buttons to avoid typing errors.
4. In your wallet, choose ETH on the Ethereum network, paste the address and enter the amount shown.
5. Review the gas fee, confirm the transaction and wait for your wallet to show it as sent.
6. Press "I have paid" so we can find the transaction. Your order is placed and you land on the status page.

## Confirmation
We look for your transfer on the Ethereum network and match it to your order automatically, checking the address, the amount in dollars, the time and that the transaction has not already paid another order. A confirmed transfer sends you an email and moves the order to payment confirmed. Ethereum transactions usually confirm within a minute or a few minutes, depending on gas and network activity. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/) for the full list of checks.

After payment is confirmed, the order enters processing. We process orders within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse and ship with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. See [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/).

## Native ETH only
Send ETH itself on the Ethereum network. Do not send tokens such as USDT or USDC to the ETH address unless the payment window asks for that token, because the window is built to match the token you chose and recovery of a wrong token is not guaranteed. In the same way, do not send ETH on a different network, such as a layer-2 network or another chain that also uses the ETH name, because it will not arrive at our Ethereum address. If you are unsure, read [what is a crypto network](/blog/what-is-a-crypto-network/).

## Sending from an exchange
Many customers pay straight from an exchange. Check that the exchange lets you withdraw ETH on the Ethereum network, check its minimum withdrawal and its fee, and add the exchange's fee to the amount if it deducts the fee from what you send. Some exchanges also hold new withdrawal addresses for a short security period, which is worth knowing before you start. Our guide to [sending crypto from an exchange to a wallet](/blog/send-crypto-from-an-exchange-to-a-wallet/) walks through the details.

## Typical timings
- **Detection:** a transfer usually appears within a minute of being broadcast.
- **Confirmation:** usually a few minutes.
- **Stuck transactions:** if gas was set too low, a transfer can sit pending. Many wallets let you speed it up or cancel and resend; do not send a second payment without checking.
- **Processing and shipping:** 24 to 72 business hours after confirmation.

## Common mistakes
- **Sending a token instead of ETH.** Check the asset in your wallet before you confirm.
- **Using the wrong network.** Match the Ethereum network exactly.
- **Typing the address.** Always copy or scan, and compare the first and last characters.
- **Sending your whole balance.** Leave enough for gas.
- **Sending an outdated amount.** Refresh the window if it has been open a while.
- **Resending when a transfer is pending.** Check your wallet and our status page first.

## Frequently asked questions in depth
### Is Ethereum a good choice for small orders?
For smaller orders, gas can be a noticeable share of the total. If you are paying a low-value order, compare the fee with cheaper options such as USDT on Tron or Solana before you decide.

### Can I pay from a hardware wallet?
Yes. Use it exactly like any other wallet: scan or paste the address, confirm the amount and approve on the device. Check the address on the device screen as well as the computer screen.

### Do I get the 10% discount with ETH?
Yes. Every supported cryptocurrency qualifies. The discount is calculated on the product subtotal and applied automatically. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/) for worked examples.

### What if I paid slightly too little?
A very small difference from price movement is tolerated. If the gap is larger, the order shows as underpaid and we will tell you what to do. Do not resend the full amount; contact us with your order reference.

## Lower-fee alternatives
If gas is high, stablecoins on cheaper networks are an alternative: see [USDT on ERC20 or TRC20](/blog/usdt-erc20-vs-trc20-which-network/) and [USDC on Solana](/blog/pay-with-usdc-on-solana/). You can compare every option in [payment methods compared](/blog/payment-methods-compared/). Browse [vape kits](/shop/vape-kits/) and [disposable vapes](/shop/disposables/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["How much ETH do I send?", "Send the ETH amount shown in the payment window. It is converted from your dollar total at the live rate, which refreshes about every 30 seconds."],
["Who pays the Ethereum gas fee?", "You do. It is charged by your wallet on top of the amount and goes to the network, not to us."],
["Can I send USDT or USDC to the ETH address?", "No. Send ETH itself on the Ethereum network. Tokens sent to the wrong payment address may not be recoverable."],
["How long does an ETH payment take?", "Usually a few minutes to confirm, depending on gas and network activity."],
["Do ETH payments get the crypto discount?", "Yes. Every supported cryptocurrency saves 10% on your order total."],
["What if my transaction is stuck?", "Check your wallet for a speed-up option and do not resend until you have checked our status page. Contact us with your order reference if it stays pending."],
]
},

"pay-with-bnb-smart-chain": {
body: `BNB is accepted on the BNB Smart Chain network, also called BSC or BEP20. It is a convenient option if your funds already sit on Binance or another BSC wallet, because transfers on this network are fast and cheap. At One Stop Vape Store, BNB payments qualify for our 10% crypto discount like every other supported coin. This guide explains how to pay with BNB, how to make sure you pick the right network, how confirmation works for BNB (which differs from some other coins), how to handle exchange fees and minimums and what to do if something looks wrong. It is for adults aged 21 and over and is not financial advice.

## Know the network
Choose BNB at checkout and the payment window shows the BNB Smart Chain address. BNB exists on several networks, and the names are confusing. The older Binance Chain used the BEP2 standard, while BNB Smart Chain uses BEP20 and an Ethereum-style address beginning with 0x. Our payment address is on BNB Smart Chain. When you withdraw from an exchange or send from a wallet, make sure the network says BNB Smart Chain, BSC or BEP20, not BEP2 and not another chain.

If you want a general explanation of why networks matter, read [what is a crypto network](/blog/what-is-a-crypto-network/). The short version is that an address is only valid on the network it belongs to, and sending on the wrong network can mean the funds are lost.

## Step by step
1. Fill your cart, choose your options on the product page and go to checkout. Enter your contact and shipping details and confirm you are 21 or older.
2. Choose Cryptocurrency and select BNB. The order summary shows the 10% discount.
3. In the payment window, copy the address and the amount. The amount of BNB is converted from your dollar total at the live rate, refreshed about every 30 seconds.
4. In your exchange or wallet, withdraw or send BNB, selecting BNB Smart Chain (BEP20) as the network.
5. Confirm the transfer and wait for it to show as sent.
6. Press "I have paid" in the payment window, then upload a screenshot on the status page.

## How confirmation works for BNB
Some networks, such as Bitcoin, Ethereum and Solana, are matched to orders automatically by reading public blockchain data. BNB Smart Chain payments are currently confirmed by our team after you upload a screenshot on the status page, so allow a little extra time during business hours compared with automatic networks. To help us confirm quickly, include a clear screenshot of the transaction and, if you can, paste the transaction hash into the status page. The hash is a long string of characters your wallet or exchange shows after you send.

Customer service hours are Monday to Saturday, 9AM to 7PM Pacific Standard Time. If you pay outside those hours, expect the check the next business morning. After confirmation, the order enters processing, which takes 24 to 72 business hours before it ships. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/) for how automatic and manual checks differ, and [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/) for what makes a good screenshot.

## Check the fee and minimum
Exchanges set their own withdrawal minimums and fees, and these are separate from the network fee. Before you send, check the minimum withdrawal for BNB on BNB Smart Chain and the fee the exchange charges. Make sure the net amount arriving equals the amount shown in our window. If the exchange deducts its fee from the amount you enter, add the fee on top so the full amount arrives. BNB Smart Chain fees are usually very small, which is one of the reasons people like the network.

## What the amount means
Your order is priced in US dollars. The BNB amount is the dollar total converted at the live rate. BNB's price moves, so the figure can differ slightly from minute to minute. A small tolerance allows for movement between the quote and the confirmation, but a large gap shows as underpaid. To avoid trouble, send the amount shown, copy it with the copy button and refresh the window if it has been open for a while. See [why your crypto payment shows underpaid](/blog/why-your-crypto-payment-shows-underpaid/).

## Common mistakes
- **Choosing the wrong network.** Select BNB Smart Chain (BEP20), not BEP2 or another chain.
- **Sending a different token.** Choose BNB itself, not a token on BNB Smart Chain, unless the window asks for it.
- **Forgetting the exchange fee.** If it is deducted from the amount, the order arrives short.
- **Skipping the screenshot.** Because BNB is confirmed by our team, the screenshot and hash speed things up considerably.
- **Resending.** If a payment is pending, check the status page and contact us before sending again.

## Frequently asked questions in depth
### Why is BNB confirmed manually when other coins are automatic?
Each network needs its own detection support. BNB Smart Chain payments are currently reviewed by a person after you upload a screenshot. That keeps matching accurate while we use automatic detection on the networks where it is available.

### Can I pay from Binance directly?
Yes. Withdraw BNB to the address in our window, choosing BNB Smart Chain (BEP20) as the network. Check the minimum and fee, and copy the address exactly. Some exchanges hold new addresses for a short security period.

### Do BNB payments get the discount?
Yes. All supported cryptocurrencies save 10% on your order total. The discount is calculated on the product subtotal, and shipping is added afterward. Free shipping applies to orders of $200 or more after discount. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/).

### Is BNB fast enough for a same-day order?
Transfers are fast, but because confirmation is manual, same-day matching depends on when you pay and on our business hours. If timing matters, choose Solana, Bitcoin or another network with automatic detection.

## After your payment is confirmed
You receive an email and your order status updates. We process orders within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse and ship with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. See [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/) and [how to track your order](/blog/how-to-track-your-order/).

## Alternatives
Prefer automatic detection? Consider [Bitcoin](/blog/how-to-pay-with-bitcoin/), [Solana](/blog/pay-with-solana-sol/) or [USDT](/blog/usdt-erc20-vs-trc20-which-network/). All crypto payments use the [10% crypto discount](/blog/crypto-discount-how-it-works/). Browse [disposable vapes](/shop/disposables/) and [vape juice](/shop/vape-juice/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Which BNB network do you accept?", "BNB Smart Chain, also written BSC or BEP20. Do not use the older BEP2 network or another chain."],
["How are BNB payments confirmed?", "BNB payments are confirmed by our team after you upload a screenshot on the status page, so allow a little extra time in business hours."],
["Do I get the crypto discount with BNB?", "Yes. All supported cryptocurrencies save 10% on your order total."],
["How do I avoid sending too little?", "Add any exchange withdrawal fee on top of the amount so the full BNB amount arrives, and copy the amount from the window."],
["What should I upload for confirmation?", "A clear screenshot of the transaction, plus the transaction hash if available, on your order status page."],
["Can I use another coin if I want automatic confirmation?", "Yes. Bitcoin, Ethereum, Solana, USDT and USDC are matched automatically on their networks where supported."],
]
},

"pay-with-solana-sol": {
body: `Solana (SOL) is one of the quickest and cheapest ways to pay at One Stop Vape Store. Transfers usually confirm within seconds and cost a fraction of a cent, and paying with SOL qualifies for our 10% crypto discount. If you already use a Solana wallet on your phone or browser, it is a pleasant experience. This guide explains each step, how the live quote works, what the status page shows, how to avoid common mistakes with Solana's token system, why some people prefer a stablecoin instead and what to do if something goes wrong. It is for adults aged 21 and over and is not financial advice.

## Choose SOL at checkout
Add products to your cart, choose options such as strength and pack size on the product page and go to checkout. Enter your contact and shipping details and confirm you are 21 or older. Select Cryptocurrency, then Solana (SOL). The order summary shows the 10% discount and your total. The payment window then shows the wallet address, a QR code and the SOL amount based on the live rate, which refreshes about every 30 seconds.

## Sending the payment
1. Open your Solana wallet, such as a mobile or browser wallet that supports SOL.
2. Scan the QR code or paste the address. Use the copy button to avoid typing errors, and compare the first and last characters.
3. Enter the SOL amount shown. Because SOL's price changes, send promptly after you open the window, and refresh it if it has been open for a while.
4. Confirm the transfer. The network fee is tiny, but keep a small balance for it so the transfer does not fail.
5. Press "I have paid" in the payment window. Your order is placed and you land on the status page.

## Native SOL, not tokens
Send SOL itself, the native coin. Solana also has many tokens, including stablecoins such as USDC, and a token transfer is a different kind of transaction from a SOL transfer. If you would rather use a stablecoin so the amount does not move with the market, choose [USDC on Solana](/blog/pay-with-usdc-on-solana/) at checkout instead of SOL. Mixing them up is the most common Solana mistake: our window is built to match the token you choose, so a token sent to a SOL payment, or SOL sent to a token payment, will not match.

## Detection and confirmation
We look for an incoming SOL transfer matching your order value within the last few hours, checking the address, the dollar value of the amount, the time and that the transaction has not already paid another order. Solana finalizes quickly, so detection is usually within seconds to a couple of minutes. Once it confirms, we email you and the order moves forward. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/) for the full list of checks.

After confirmation, the order enters processing. We process orders within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse and ship with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. See [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/).

## Why people choose Solana
- **Speed:** transfers usually confirm in seconds.
- **Cost:** the network fee is a fraction of a cent, so it barely affects the saving from the discount.
- **Simple wallets:** mobile Solana wallets are easy to use and scan QR codes smoothly.
- **Good for small orders:** because the fee is tiny, even a modest order keeps nearly all of the 10% saving.

The trade-off is price movement. SOL's price can change between the quote and the payment, so the amount of SOL you send is only correct for a short time. A small tolerance covers normal movement. If you are worried about it, stablecoins give an exact amount.

## Sending from an exchange
Many exchanges let you withdraw SOL. Check that the withdrawal is on the Solana network, check the minimum and the fee, and add the fee if it is deducted from what you send. Some exchanges hold new addresses for a security period. Our guide to [sending crypto from an exchange to a wallet](/blog/send-crypto-from-an-exchange-to-a-wallet/) goes through these details.

## Frequently asked questions in depth
### Do I need extra SOL for fees if I am paying in SOL?
Yes, a very small amount. Solana fees are tiny, but a transfer of your entire balance may fail if there is nothing left to cover the fee. Leave a small buffer.

### Why does the SOL amount change when I refresh?
Because it is converted from your dollar total at the live rate. The dollar value of your order does not change, only the SOL equivalent.

### Can I pay with a Solana token instead?
Yes, USDC on Solana is available as its own option. Choose it at checkout, and send USDC rather than SOL.

### Is Solana fast enough for same-day orders?
Detection is usually within minutes, but processing still takes 24 to 72 business hours after confirmation. Paying quickly helps your order enter processing sooner.

## Common mistakes
- **Sending the wrong asset.** Check that you are sending SOL if you chose SOL, or USDC if you chose USDC.
- **Typing the address.** Always copy or scan.
- **Sending an outdated amount.** Refresh the window if it has been open a while.
- **Leaving no balance for fees.** Keep a small buffer.
- **Resending a pending payment.** Check the status page and contact us first.

## If you made a mistake
Check [what to do if you sent crypto on the wrong network](/blog/sent-crypto-on-the-wrong-network/) and contact us from the [contact page](/contact/) with your order reference and transaction hash. See the full list of options in [payment methods compared](/blog/payment-methods-compared/) and the [10% crypto discount guide](/blog/crypto-discount-how-it-works/). Browse [vape juice](/shop/vape-juice/) and [disposable vapes](/shop/disposables/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["How fast is a Solana payment?", "Transfers usually confirm within seconds, and detection is typically within a couple of minutes."],
["What is the Solana network fee?", "A fraction of a cent. Keep a small SOL balance so the transfer does not fail."],
["Can I send USDC to the SOL address?", "No. Send SOL if you chose SOL. If you want to pay in USDC, choose USDC at checkout instead."],
["Do SOL payments get the discount?", "Yes. Every supported cryptocurrency saves 10% on your order total."],
["Why does the SOL amount change?", "It is converted from your dollar total at the live rate, refreshed about every 30 seconds, so the SOL figure moves with the price."],
["Can I pay from an exchange?", "Yes. Withdraw SOL on the Solana network to the address in the window and add any exchange fee on top."],
]
},

"pay-with-usdc-on-solana": {
body: `USDC is a stablecoin pegged to the US dollar, and on the Solana network it moves in seconds and costs a fraction of a cent. That makes it one of the most convenient ways to pay an order at One Stop Vape Store: the amount you send is essentially your dollar total, so there is no exchange-rate movement to worry about, and USDC payments qualify for our 10% crypto discount. This guide explains what you need, walks through each step, covers the mistakes that cause most problems, explains how detection works and compares USDC on Solana with other options. It is for adults aged 21 and over and is not financial advice.

## What you need
You need a wallet that supports Solana and holds USDC, such as a popular browser or mobile Solana wallet, or an exchange that allows USDC withdrawals on Solana. If you use a self-custody wallet, you also need a tiny amount of SOL in the same wallet to cover the network fee, because Solana fees are paid in SOL even when you send USDC. A few cents' worth is plenty. If you use an exchange, the exchange usually deducts the fee for you, often in USDC.

## Why USDC on Solana
- **Speed:** transfers usually finish in seconds.
- **Cost:** the fee is a fraction of a cent, so almost all of the 10% saving stays with you.
- **Stable amount:** because USDC tracks the dollar, you owe the same dollar value regardless of market moves.
- **Simple matching:** the amount is predictable, so detection is straightforward.

If you want a general explanation of why networks matter, read [what is a crypto network](/blog/what-is-a-crypto-network/).

## Step by step
1. Fill your cart, choose options such as strength and pack size on the product page and go to checkout. Enter your contact and shipping details and confirm you are 21 or older.
2. Choose Cryptocurrency at checkout, then USDC. Solana is the only network offered for USDC at our store.
3. In the payment window, copy the wallet address or scan the QR code. Use the copy button to avoid typing errors.
4. In your wallet, choose Send, select USDC and paste the address. Check the first and last characters.
5. Enter the amount shown and confirm.
6. Press "I have paid". Your order is placed and you land on the status page, where your payment is looked for on the Solana network and confirmed automatically.

## How detection works
Our system reads public Solana data for the shop wallet and looks for an incoming USDC transfer that fits your order: the right token, the right address, a dollar value close to your total, a recent time and a transaction that has not paid another order. When a transfer matches, we email you and the order moves into processing. Because USDC is a dollar stablecoin, the amount matches your total closely, which keeps tolerance concerns small. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/).

## Common mistakes
- **Sending USDC on a different network, such as Ethereum.** It will not arrive at our Solana address and may not be recoverable. Select Solana in your wallet or exchange.
- **Sending SOL instead of USDC.** They are different assets. If you chose USDC at checkout, send USDC.
- **Forgetting a little SOL for fees in a self-custody wallet.** Without it, the transfer cannot be made.
- **Sending a different stablecoin.** USDT is a different token with its own options. Choose it at checkout if you prefer USDT. See [USDT on ERC20 or TRC20](/blog/usdt-erc20-vs-trc20-which-network/).
- **Resending a pending payment.** Check the status page and contact us first.

## Exchange withdrawals
If you pay from an exchange, choose USDC as the asset and Solana as the network on the withdrawal screen. Check the minimum and the fee, and if the exchange deducts its fee from the amount you enter, add the fee on top so the full amount arrives. Some exchanges hold new withdrawal addresses for a short security period. Our guide to [sending crypto from an exchange to a wallet](/blog/send-crypto-from-an-exchange-to-a-wallet/) covers the details.

## Frequently asked questions in depth
### Is USDC the same as USDT?
No. Both are dollar stablecoins issued by different companies, and each exists on several networks. At our store, USDC is offered on Solana, and USDT is offered on Ethereum (ERC20) and Tron (TRC20). Choose the one your wallet holds.

### Do I get the 10% discount with USDC?
Yes. The discount is calculated on your product subtotal and applied automatically when you choose Cryptocurrency. Shipping is added afterward, and free shipping applies to orders of $200 or more after discount. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/).

### What if my wallet shows a different network name?
Look for Solana, SOL or SPL in the network list. If your wallet or exchange does not offer Solana for USDC, choose a different token or network that it does support.

### Can I buy USDC if I do not have any?
Yes. Read [how to buy crypto with a card](/blog/how-to-buy-crypto-with-a-card/). Buy USDC, choose Solana as the network when you withdraw, and then send it to our address.

## After your payment is confirmed
You receive an email, and your order status updates. We process orders within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse and ship with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. See [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/) and [how to track your order](/blog/how-to-track-your-order/).

## If your payment looks short
If the status page shows underpaid, do not resend the full amount. A small shortfall is usually caused by an exchange fee being deducted from the amount. Contact us with your order reference and transaction hash, and we will tell you what is needed. See [underpaid messages](/blog/why-your-crypto-payment-shows-underpaid/). Browse the [disposable vapes](/shop/disposables/) range, and compare every option in [payment methods compared](/blog/payment-methods-compared/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Which network do you accept for USDC?", "Solana is the only network offered for USDC at our store."],
["Do I need SOL to send USDC?", "In a self-custody wallet, yes, a tiny amount to cover the fee. Exchanges usually handle the fee for you."],
["Do USDC payments get the crypto discount?", "Yes. All supported cryptocurrencies save 10% on your order total."],
["What if I send USDC on Ethereum by mistake?", "It will not arrive at our Solana address and may not be recoverable. Contact us immediately with your order reference and transaction hash."],
["Is the amount stable?", "Yes. USDC tracks the US dollar, so you owe essentially your dollar total after the discount."],
["How do I buy USDC if I do not have any?", "Use a provider such as an exchange or card-purchase service, choose Solana as the network when you withdraw, and send it to the address in our window."],
]
},

"how-to-buy-crypto-with-a-card": {
body: `You do not need to own cryptocurrency to use our crypto checkout. You can buy it first with a card or bank transfer from a service such as MoonPay, Coinbase, Transak or Changelly, and then send it to the address shown at checkout. For many orders the 10% crypto discount is larger than the extra cost of buying, which makes it worth considering. This guide walks through each step, explains what the fees are, shows how to choose a coin and network, covers identity verification and timing, lists the mistakes that cost people money and explains when buying crypto is not worth it. It is for adults aged 21 and over and is not financial advice.

## Why bother
Crypto and gift card payments get a 10% discount at checkout. On a $200 order, that is $20. If the provider's fee and the network fee together cost less than $20, you come out ahead. On a larger order the saving grows, because the discount scales with the order while some fees do not. On a very small order the fees may cancel the saving, so run the numbers first. Our guide to [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/) shows worked examples, including how the discount interacts with free shipping.

## Choosing a coin and network
The best coin for a purchase is usually the one with the lowest total cost and the least price movement.

- **Stablecoins (USDT, USDC):** priced at one dollar, so there is no price movement between buying and paying. USDC on Solana and USDT on Tron are typically cheap to send. See [USDC on Solana](/blog/pay-with-usdc-on-solana/) and [USDT ERC20 vs TRC20](/blog/usdt-erc20-vs-trc20-which-network/).
- **Bitcoin:** the most widely available coin, but confirmations can be slower and fees higher when busy. See [how to pay with Bitcoin](/blog/how-to-pay-with-bitcoin/).
- **Solana:** fast and cheap, but its price moves. See [paying with Solana](/blog/pay-with-solana-sol/).
- **Ethereum and BNB:** workable, but check fees. See [paying with Ethereum](/blog/pay-with-ethereum-eth/) and [paying with BNB](/blog/pay-with-bnb-smart-chain/).

For most first-time buyers, a stablecoin on a low-fee network is the simplest choice, because the amount is predictable.

## Step 1: open the payment window
At checkout, choose Cryptocurrency and the coin you want to pay with. The window includes a "Don't have this coin?" section with a MoonPay button and alternatives. Keep the window open, or note the coin, the network, the address and the amount, because you will need them in a moment. If you prefer, you can place the order later; the window will give you a fresh quote.

## Step 2: buy the coin
On the provider's site, pick the same coin and, where asked, the same network as in our window. Enter the amount you want to buy. Allow a little extra for the provider's fee and for the network fee. If you need to pay $180 after discount, buy a little more than $180, because fees and small price moves can leave you slightly short. Complete the card or bank payment and any identity checks the provider requires.

## Step 3: send it to us
When the provider asks where to send the coins, paste the address from our payment window. This step is the most important. Double-check that the first and last characters match, and choose the exact network. Some providers let you buy and send in one step, and others deliver the coins to a wallet you must then send from. Follow the provider's prompts carefully and do not rush.

## Step 4: press "I have paid"
Return to our window and press the button. We look for your transfer and confirm the order automatically on networks that support automatic detection. For other networks, such as BNB, a team member confirms after you upload a screenshot on the status page. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/) and [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/).

## Costs and timing
Provider fees vary. Card purchases usually cost more than bank transfers, but they are faster. First-time purchases may need identity verification, which can take minutes to days depending on the provider and your documents. Start before you need the order, and do not wait until the last moment. Typical costs to consider:

- **Provider fee:** often a percentage of the purchase, higher for card payments.
- **Spread:** the provider may buy at a slightly worse rate than the market.
- **Network fee:** paid when you send the coins to us. See [crypto network fees explained](/blog/crypto-network-fees-explained/).
- **Withdrawal fee:** some exchanges charge a flat fee for sending coins out.

Add them up and compare with the 10% discount before you decide. If the total is more than the discount, a standard-price method such as Cash App, Apple Pay or Chime may be cheaper overall.

## Identity checks and privacy
Regulated providers must verify identity before selling crypto, which usually means a photo ID and sometimes a selfie. That is between you and the provider. We never ask for your ID, your wallet recovery phrase or your private keys, and you should never share those with anyone. We use only public blockchain data to match your payment.

## Common mistakes
- **Buying on the wrong network.** Make sure the network you choose matches the network in our window.
- **Buying the wrong coin.** Confirm the coin before you pay the provider.
- **Forgetting fees.** If you buy exactly your order total, fees can leave you short.
- **Typing the address.** Always paste it.
- **Waiting too long.** Identity checks and card limits can take time, so start early.
- **Resending when pending.** Check the status page first.

## Frequently asked questions in depth
### Is it worth buying crypto for one order?
It can be, if the discount exceeds your total costs. For a larger order it usually is. For a small order, compare it with other options. Remember free shipping applies to orders of $200 or more after discount.

### What if the provider only sells coins I cannot use?
Then buy a coin we accept, such as USDT, USDC, Bitcoin, Ethereum, BNB or Solana, or choose another payment method.

### Can I use a gift card instead?
Yes. Gift cards also earn the 10% discount and avoid crypto altogether. See [how gift card payment works](/blog/how-gift-card-payment-works/).

### How long does the whole process take?
If you already have a verified account, a card purchase can be done in minutes. A first-time verification can take longer. Our confirmation after you send is usually quick on automatic networks, and then orders are processed within 24 to 72 business hours.

## After you pay
Once your payment is confirmed you receive an email. We ship from our Phoenix, Arizona Stock Warehouse with tracking by a regional carrier, and an adult aged 21 or older must sign on delivery. Compare all options in [payment methods compared](/blog/payment-methods-compared/). Browse [disposable vapes](/shop/disposables/) and [vape juice](/shop/vape-juice/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Do I need to own crypto to pay with it?", "No. You can buy it with a card or bank transfer from a provider such as MoonPay, Coinbase, Transak or Changelly and send it to the address in our payment window."],
["Which coin is easiest for beginners?", "A stablecoin such as USDC on Solana or USDT on Tron, because the amount is predictable and fees are low."],
["Is buying crypto worth it for the discount?", "It can be. Compare the 10% discount with the provider's fee, the spread and the network fee. On small orders the fees may cancel the saving."],
["How long does buying take?", "Minutes if your account is verified; first-time identity checks can take longer, so start early."],
["Can I send the coins straight from the provider?", "Yes. Paste the address from our payment window and select the same network. Check the first and last characters."],
["Is there a non-crypto way to get a 10% discount?", "Yes. Supported gift cards also save 10%."],
]
},

"apple-pay-payments-guide": {
body: `Apple Pay is supported at One Stop Vape Store through a simple flow: you place the order, we send you the payment details, and you pay and send proof. It does not carry the 10% discount that cryptocurrency and gift cards do, but it is convenient if you already use Apple Pay and your phone for payments every day. This guide explains each step, what the email and the private payment page contain, how to make sure your payment is matched quickly, what to do about the most common problems and how Apple Pay compares with other methods. It is for adults aged 21 and over.

## Why Apple Pay details arrive after you order
We do not show payment details at checkout for Apple Pay. Instead, we send them after the order is saved. This keeps the details tied to your order, lets us confirm the amount before you pay and makes sure you always use current instructions. The same pattern applies to Cash App and Chime. Read [how payment details reach you](/blog/how-payment-details-reach-you/) for how the email, WhatsApp message and private page fit together.

## Place the order
Add products to your cart, choose options such as strength and pack size on the product page, and go to checkout. Enter your contact and shipping details, confirm you are 21 or older, choose Apple Pay and place the order. The minimum order is $100, and orders of $200 or more after discounts ship free; smaller orders pay a flat $15 shipping fee. We email you, and optionally WhatsApp you, after the order is saved, and your order number appears on the confirmation page.

## Receive the payment details
Our message contains the details to send payment to, and a link to a tap-to-copy page. The page is private to your order, and it shows the amount due and your order ID. The link contains a unique token, so only someone who has the link can open it. Do not share it. If the message has not arrived within a few minutes, check spam and the email address you entered, and see [order confirmation emails not arriving](/blog/order-confirmation-email-not-arriving/).

## Pay from your phone
Open the Apple Pay or Wallet flow you normally use for person-to-person payments and enter the details we sent. Pay the exact amount shown, and add your order ID in the notes so we can match it quickly. Check the recipient name on the confirmation screen against the details on your private payment page before you confirm. If your card or balance is declined, fix the issue in your Wallet and try again.

## Upload the receipt
Take a screenshot of the confirmation and upload it using the link in our email. The screenshot should show the amount, the recipient and the time. You can attach more than one image if needed, for example if the payment shows on two screens. Uploads are private and compressed so they load quickly. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/) for what makes a good one.

## Confirmation
We check our account, mark the order paid and email you. Orders then move into processing, which takes 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse, followed by carrier delivery with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. See [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/) and [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/). You can follow each stage in [order status meanings](/blog/order-status-meanings/).

## Tips for a smooth order
- **Pay within 24 hours.** Unpaid orders may be released so stock is not held indefinitely.
- **Use the exact amount.** It speeds matching.
- **Add the order ID.** Put it in the note every time.
- **Keep the screenshot.** Upload it as soon as you pay.
- **Use only our official details.** Never pay a recipient sent by someone who contacted you unexpectedly.
- **Check the recipient.** If the name does not look right, stop and contact us.

## Common problems
### No email received
Check your spam folder and the address you entered. Then contact us through the [contact page](/contact/) with your order number or the name and email you used.

### Wrong amount
If you underpaid, pay the difference and mention it in the notes. If you overpaid, tell us your order number and we will explain how it is resolved.

### Paid to the wrong details
Contact us immediately with a screenshot. We cannot reverse payments sent elsewhere, but we can help work out the next step.

### The payment is pending
Upload your screenshot anyway and tell us it is pending. We will wait for it to complete before confirming the order.

## Refunds
If a refund is ever due, it goes back through the payment method the payment was received through, which here means the same Apple Pay route. Our returns policy allows returns within 30 days for unopened items in original packaging, less a 15% restocking fee, and opened or used items cannot be returned. See [refund and return policy explained](/blog/refund-and-return-policy-explained/).

## Frequently asked questions in depth
### Is Apple Pay cheaper or more expensive than other methods?
The price is the standard price with no discount. Cryptocurrency and gift cards save 10%, which can matter on larger orders. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/).

### Can I pay for two orders in one payment?
Please send one payment per order with the right order ID in each note, because each order has its own amount and reference.

### Can I change my payment method after ordering?
Yes, before you pay. Contact us with your order number and we will switch it and send the right details.

### How fast is confirmation?
Usually quick during business hours once you have uploaded your screenshot. Customer service hours are Monday to Saturday, 9AM to 7PM Pacific Standard Time.

## More options
Read the [Cash App](/blog/cash-app-payments-guide/) and [Chime](/blog/chime-payments-guide/) guides, or compare everything in [payment methods compared](/blog/payment-methods-compared/). Browse [vape juice](/shop/vape-juice/) and [disposable vapes](/shop/disposables/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["How do I pay with Apple Pay?", "Place your order and choose Apple Pay. We send the payment details and a private tap-to-copy page. Pay the exact amount, add your order ID in the notes and upload a screenshot."],
["Is there a discount for Apple Pay?", "No. The 10% discount applies to cryptocurrency and gift card payments."],
["What if I did not receive the details?", "Check spam and the email you entered, wait a few minutes, then contact us with your order number."],
["Why upload a screenshot?", "It tells us your payment is on its way and speeds up matching. It should show the amount, recipient and time."],
["How long do I have to pay?", "Within 24 hours, or the order may be released so stock is not held indefinitely."],
["Where do refunds go?", "Back through the payment method the payment was received through, less the 15% restocking fee where it applies."],
]
},

"chime-payments-guide": {
body: `Chime is accepted for orders at One Stop Vape Store, and the process mirrors our other send-the-details-after-ordering methods, Cash App and Apple Pay. You place the order, we send you the payment details by email and, if you prefer, WhatsApp, you pay exactly what the page says and upload proof, and we confirm and ship. Chime payments do not carry the 10% discount that cryptocurrency and gift cards do, but they are convenient if you already bank with Chime. This guide explains every step, what the messages contain, how to avoid delays, what to do if a payment is pending and how Chime compares with other methods. It is for adults aged 21 and over.

## Placing the order
Add products to your cart, choose options such as strength and pack size on the product page and go to checkout. Enter your contact and shipping details and confirm you are 21 or older. Select Chime at checkout and finish your details. Your order is saved with a unique ID, shown on the confirmation page and in your email. The minimum order is $100, and orders of $200 or more after discounts ship free; smaller orders pay a flat $15 shipping fee. See [minimum order and free shipping explained](/blog/minimum-order-and-free-shipping-explained/).

## Getting the details
After checkout we send the Chime payment details by email, and by WhatsApp if you prefer. The email includes your order number, the exact amount due and a link to a private page where each detail has its own copy button. Email programs cannot run copy buttons, so the page exists to make copying a single tap. The link contains a unique token, so only people who have the link can open it. Read [how payment details reach you](/blog/how-payment-details-reach-you/) for how the pieces fit together.

During business hours the message usually arrives within minutes. If it does not, check spam and the email address you entered, and see [order confirmation emails not arriving](/blog/order-confirmation-email-not-arriving/).

## Making the payment
In the Chime app, send the exact amount due to the details shown. Put your order ID in the memo so we can match your payment quickly. Do not round the amount; send exactly what the page says. Check the recipient name and handle on the confirmation screen against our page before you confirm. If the details do not match, stop and contact us.

Chime has its own limits and security checks, so a payment can occasionally be delayed or declined. If that happens, fix the cause in the app, such as a limit or a verification step, and try again. Tell us through the [contact page](/contact/) if you are unsure whether a payment went through.

## Sending proof
Screenshot the confirmation and upload it from the link in our email. The screenshot should show the amount, the recipient and the time. Uploads are private and only need to be done once, although you can add more images if needed, for example when the payment is shown across two screens. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/) for tips on getting a clear image.

## Verification and shipping
We confirm the payment and email you. The order is then processed as described on the [shipping page](/shipping/). Processing and carrier time are separate: we process orders within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse, and then the carrier delivers with tracking. An adult aged 21 or older must sign on delivery. See [how ordering works](/blog/how-ordering-works/), [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/) and [order status meanings](/blog/order-status-meanings/).

## Tips for a smooth Chime order
- **Pay within 24 hours.** Unpaid orders may be released.
- **Send the exact amount.** It makes matching immediate.
- **Use the memo.** Add your order ID every time.
- **Upload your screenshot straight away.** It speeds up the check.
- **Use only our official details.** Never pay a recipient sent by someone who contacted you unexpectedly.
- **Keep your confirmation until the order is confirmed.** You may need it if there is a question.

## Troubleshooting
### The payment is pending
If a payment is pending in Chime, upload the screenshot anyway and tell us in the notes. We will wait for it to complete before confirming the order.

### I used the wrong details
Contact us straight away from the [contact page](/contact/) with your order number and a screenshot. We cannot reverse payments sent elsewhere, but we will help you with the next step.

### I paid the wrong amount
If you underpaid, we will tell you the balance and how to send it. If you overpaid, tell us your order number and we will explain how it is resolved.

### I cannot find the email
Check spam, check the address on your order and contact us with your order number. See [how to contact support](/blog/how-to-contact-support/).

## Refunds
If a refund is ever due, it goes back through the payment method the payment was received through, which here means Chime. Our returns policy allows returns within 30 days for unopened items in original packaging, less a 15% restocking fee, and opened or used items cannot be returned. See [refund and return policy explained](/blog/refund-and-return-policy-explained/).

## Frequently asked questions in depth
### Can I pay for two orders in one Chime payment?
Please send one payment per order, with the right order ID in each memo, because each order has its own amount and reference.

### Can I change my payment method after ordering?
Yes, before you pay. Contact us with your order number and we will switch the method and send the right details. Cryptocurrency and gift cards carry the 10% discount, so the total will update if you switch to one of them.

### Do I need a Chime account in my own name?
Use whichever account is in your name, and make sure the name and order ID are clear so we can match the payment. If someone else pays for you, tell us so we can match it.

### How fast is confirmation?
Usually quick during business hours once you have uploaded your screenshot. Customer service hours are Monday to Saturday, 9AM to 7PM Pacific Standard Time.

## Other choices
Compare with [Cash App](/blog/cash-app-payments-guide/), [Apple Pay](/blog/apple-pay-payments-guide/) and the discounted crypto and gift card options in [the 10% discount guide](/blog/crypto-discount-how-it-works/). Browse [disposable vapes](/shop/disposables/) and [vape juice](/shop/vape-juice/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["How do I pay with Chime?", "Place your order and choose Chime. We send the details and a private tap-to-copy page. Pay the exact amount in the Chime app, add your order ID in the memo and upload a screenshot."],
["Is there a discount for Chime?", "No. The 10% discount applies to cryptocurrency and gift card payments."],
["What if my Chime payment is pending?", "Upload your screenshot anyway and tell us in the notes. We will wait for it to complete before confirming the order."],
["How long do I have to pay?", "Within 24 hours, or the order may be released."],
["Where do refunds go?", "Back through Chime, the method the payment was received through, less the 15% restocking fee where it applies."],
["What if I sent it to the wrong details?", "Contact us immediately with a screenshot. We cannot reverse payments sent elsewhere, but we will help with the next step."],
]
},

"payment-methods-compared": {
body: `We accept several payment methods at One Stop Vape Store, and each has trade-offs in price, speed, effort and risk. This guide compares them side by side so you can choose the one that suits your order. The five options are cryptocurrency, gift cards, Cash App, Apple Pay and Chime. Cryptocurrency and gift cards earn a 10% discount. The others pay the standard price but are convenient if you already use them. We explain how each works, what it costs, how fast it is, what could go wrong and which situations each is best for. It is written for adults aged 21 and over and is not financial advice.

## The quick comparison
- **Cryptocurrency:** 10% discount; payment window at checkout; automatic detection on most networks; best for people who already hold crypto.
- **Gift cards:** 10% discount; buy a card, then upload it; best for people without crypto who prefer a card purchase.
- **Cash App:** no discount; details sent after ordering; best if you already use Cash App.
- **Apple Pay:** no discount; details sent after ordering; best for iPhone users who want to pay from their phone.
- **Chime:** no discount; details sent after ordering; best for Chime account holders.

## Cryptocurrency
**Discount:** 10% on your product subtotal.
**Speed:** minutes after confirmation. Bitcoin, Ethereum, Solana, USDT and USDC are matched automatically on their networks, while BNB is confirmed by our team after you upload a screenshot.
**How it works:** at checkout choose Cryptocurrency and a coin, and a payment window shows the amount, a QR code and the address. You send from your wallet, press "I have paid" and your order is matched.
**Best for:** people already holding crypto, or stablecoin users.
**Watch for:** network choice and fees. See [what a crypto network is](/blog/what-is-a-crypto-network/), [network fees explained](/blog/crypto-network-fees-explained/) and [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/). Individual guides cover [Bitcoin](/blog/how-to-pay-with-bitcoin/), [USDT](/blog/usdt-erc20-vs-trc20-which-network/), [USDC on Solana](/blog/pay-with-usdc-on-solana/), [Ethereum](/blog/pay-with-ethereum-eth/), [BNB](/blog/pay-with-bnb-smart-chain/) and [Solana](/blog/pay-with-solana-sol/).
**If you do not have crypto:** read [how to buy crypto with a card](/blog/how-to-buy-crypto-with-a-card/).

## Gift cards
**Discount:** 10% on your product subtotal.
**Speed:** depends on how quickly you buy the card and upload it, plus a manual check by our team.
**How it works:** choose Gift cards at checkout and place the order. We send a buy link and an upload link. You buy the card, upload the details and we confirm.
**Cards:** Apple, Razer Gold, Paysafe, Sephora and Macy's. See [how gift card payment works](/blog/how-gift-card-payment-works/) and the individual guides.
**Best for:** people without crypto who prefer a card purchase.
**Watch for:** buy only from the official links we send, and never share codes with anyone who contacts you unexpectedly. See [gift card code security tips](/blog/gift-card-code-security-tips/).

## Cash App
**Discount:** none.
**Speed:** quick once you have our details.
**How it works:** place the order, receive the $Cashtag and amount, pay in the app with your order ID in the note and upload a screenshot.
**Best for:** simplicity if you already use Cash App. See the [Cash App guide](/blog/cash-app-payments-guide/).

## Apple Pay
**Discount:** none.
**How it works:** the same flow as Cash App, using Apple Pay or Wallet.
**Best for:** iPhone users who want to pay from their phone. See the [Apple Pay guide](/blog/apple-pay-payments-guide/).

## Chime
**Discount:** none.
**How it works:** the same flow, using the Chime app.
**Best for:** Chime account holders. See the [Chime guide](/blog/chime-payments-guide/).

## What all methods share
- **Minimum order:** $100.
- **Shipping:** free on orders of $200 or more after discount; otherwise a flat $15.
- **Processing:** 24 to 72 business hours after payment is confirmed, from our Phoenix, Arizona Stock Warehouse.
- **Delivery:** tracked a regional carrier, with adult signature (21+) required.
- **Refunds:** back through the payment method used, less a 15% restocking fee, for eligible returns within 30 days. See [refund and return policy explained](/blog/refund-and-return-policy-explained/).
- **Security:** payment details come only from our official email, our WhatsApp number or your private order page. We never ask for PINs, passwords or recovery phrases.

## How the discount changes the picture
The 10% discount is the biggest differentiator, and it grows with the order. On a $100 order it is $10. On a $300 order it is $30. But remember free shipping is calculated after discount: a $215 order paid by crypto becomes $193.50 and pays $15 shipping, while the same order by Cash App stays above $200 and ships free. Always check the order summary before you pay. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/) for worked examples.

## Which should you choose?
### If the discount matters most
Choose crypto or a gift card. If you already hold crypto, it is the clear winner. If you do not, weigh the cost of buying it against the saving, or use a gift card.

### If speed matters most
Crypto on a fast network such as Solana is matched automatically within minutes. Apps are quick once you have the details and upload a screenshot during business hours.

### If simplicity matters most
Use the app you already use daily, such as Cash App, Apple Pay or Chime. There is nothing new to learn.

### If you worry about price movement
Choose a stablecoin such as USDC or USDT, or an app payment, so the amount is exact.

### If you want the lowest fees
Compare the fee on each route. App payments have no extra fee from us, crypto has a network fee, and buying crypto adds provider fees.

## Frequently asked questions in depth
### Can I split a payment between two methods?
Please choose one method per order. If you have a special situation, contact us before ordering so we can advise.

### Which method is best for a first order?
If you have crypto or a gift card, take the discount. Otherwise use the app you already trust. Either way, follow the steps in the relevant guide.

### Are all methods available to everyone?
All methods are available to adults aged 21 and over who can receive a delivery with an adult signature. Laws on vapor products differ by state, and it is your responsibility to follow them where you live.

## Ready to order
Add products from [disposable vapes](/shop/disposables/), [vape juice](/shop/vape-juice/) or [vape kits](/shop/vape-kits/) and open checkout. All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Which payment methods give a discount?", "Cryptocurrency and supported gift cards save 10%. Cash App, Apple Pay and Chime pay the standard price."],
["Which method is fastest?", "Crypto on a network with automatic detection, such as Solana or Bitcoin, is matched within minutes. Apps are quick once you upload a screenshot in business hours."],
["Which is best if I have no crypto?", "A gift card earns the same 10% discount, or use Cash App, Apple Pay or Chime at the standard price."],
["Do all methods ship the same way?", "Yes. Orders ship from Phoenix, Arizona within 24 to 72 business hours after payment is confirmed, with adult signature on delivery."],
["Where do refunds go?", "Back through the payment method used, less the 15% restocking fee where it applies."],
["Can I mix payment methods?", "Please choose one method per order. Contact us beforehand if you have a special situation."],
]
},
};
