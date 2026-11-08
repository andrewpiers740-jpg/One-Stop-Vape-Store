// Long-form (1,500+ words) rewrites of the remaining Payments & Crypto guides, batch 5. Applied by scripts/apply-long.mjs.
const AFTER = `## After your payment is confirmed
Once your payment is confirmed you receive an email, and your order status changes to payment confirmed. The order then enters processing, which takes 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse. When it ships, you receive a tracking email, and a regional carrier delivers it. An adult aged 21 or older must sign on delivery and may be asked to show photo ID, so choose an address where that is possible. You can follow every stage from the private link in your order email, and the meaning of each status is explained in [order status meanings](/blog/order-status-meanings/). Read [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/) and [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/) to prepare. All products are for adults aged 21 and over, and nicotine is addictive.`;

export default {
"what-is-a-crypto-network": {
body: `When you pay with cryptocurrency at One Stop Vape Store you choose two things: a coin and a network. The coin is what you are sending, such as Bitcoin, USDT, USDC, Ethereum, BNB or Solana. The network is the blockchain that carries the transfer. Getting the network right is the single most important step in a crypto payment, because an address that works on one network is not valid on another, and a transfer sent on the wrong one may never arrive. This guide explains what a network is in plain language, how it differs from the coin, why the same token can exist on several networks, how to recognize each network by its address format, how fees differ and how to match networks between our payment window and your wallet or exchange. It is written for adults aged 21 and over and is not financial advice.

## Coin versus network
A coin or token is the unit of value. A network is the system that records who owns what. Bitcoin only lives on the Bitcoin network, so there is nothing to choose: Bitcoin is both the coin and the network. Ethereum's coin, ETH, lives on the Ethereum network. But a stablecoin like USDT is a token that is issued separately on several blockchains, including Ethereum and Tron. The tokens are the same in name and value, but each one lives on a different ledger with its own address format, its own fees and its own rules. USDC, similarly, exists on several networks, and at our store it is offered on Solana.

A useful comparison is money in different banks. A dollar in one bank cannot simply be moved to an account at another bank by quoting the account number, because each bank has its own system. In the same way, USDT on Ethereum and USDT on Tron are separate balances on separate systems, even though both are called USDT.

## Why a wrong network is a problem
An address on one network is not valid on another, even if it looks similar. Ethereum and BNB Smart Chain, for example, use the same style of address, beginning with 0x, which means a wallet may let you paste an Ethereum address into a BNB Smart Chain transfer without complaint. The transfer will go through on the chain you chose, but our wallet for that chain is a different thing, and the funds will not reach the one we are watching. In some cases the funds can be recovered if the receiver controls the same address on the other chain, and in others they cannot be recovered at all. Read [what to do after sending crypto on the wrong network](/blog/sent-crypto-on-the-wrong-network/) if it has happened to you.

The key rule is simple: send the coin you chose on the network we show. Everything else is detail.

## How to spot the network
The payment window states the network next to the address, for example "Tron (TRC20)", "Solana (SOL)", "Bitcoin" or "Ethereum". Exchanges and wallets show similar labels when you withdraw or send, sometimes with different names:

- **Ethereum** may be called ERC20, ETH or Ethereum mainnet.
- **Tron** may be called TRC20 or TRX.
- **BNB Smart Chain** may be called BSC, BEP20 or BNB Smart Chain. It is not the same as BEP2, the older Binance Chain.
- **Solana** may be called SOL or SPL for its tokens.
- **Bitcoin** may be called BTC or Bitcoin mainnet.

Match the label in our window with the label in your wallet exactly, and if you cannot find a match, do not guess. Choose a different coin or ask us.

## Address formats
Addresses look different on different networks, which gives you a quick sanity check:

- Bitcoin addresses start with bc1, 1 or 3.
- Ethereum and BNB Smart Chain addresses start with 0x and are 42 characters long.
- Tron addresses start with T and are 34 characters long.
- Solana addresses are long base58 strings, usually 32 to 44 characters, with no 0x or T prefix.

If you paste an address and the first characters do not match what you expect for the network you chose, stop and check. Remember that Ethereum and BNB Smart Chain addresses look alike, so the prefix will not tell them apart: only the network label will.

## Fees vary by network
Some networks cost cents, others dollars. Bitcoin fees depend on how busy the network is. Ethereum fees, called gas, rise with demand. Tron and Solana are usually cheap. BNB Smart Chain is usually cheap. The fee is paid by you to the network, not to us. See [crypto network fees explained](/blog/crypto-network-fees-explained/) for details, and compare the fee for each option before you choose, especially on smaller orders where a large fee can erase the saving from the 10% crypto discount.

## Speed varies by network
Solana and Tron usually confirm within seconds to a couple of minutes. Ethereum and BNB Smart Chain usually take a few minutes. Bitcoin is usually visible within a minute or two but is final only after it is included in a block, which often takes around ten minutes. Our system matches payments automatically on most networks, as explained in [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/), and BNB payments are confirmed by our team after you upload a screenshot.

## Which networks we accept
- **Bitcoin** on the Bitcoin network.
- **USDT** on Ethereum (ERC20) and Tron (TRC20).
- **USDC** on Solana.
- **Ethereum** on the Ethereum network.
- **BNB** on BNB Smart Chain (BEP20).
- **Solana** on the Solana network.

Each has its own guide: [Bitcoin](/blog/how-to-pay-with-bitcoin/), [USDT](/blog/usdt-erc20-vs-trc20-which-network/), [USDC on Solana](/blog/pay-with-usdc-on-solana/), [Ethereum](/blog/pay-with-ethereum-eth/), [BNB](/blog/pay-with-bnb-smart-chain/) and [Solana](/blog/pay-with-solana-sol/).

## How to match the network step by step
1. At checkout choose Cryptocurrency, then the coin, then the network if you are asked.
2. Note the network label in the payment window, next to the address.
3. In your wallet or exchange, choose the same coin and look for a network selector on the send or withdraw screen.
4. Choose the network that matches the label exactly.
5. Paste the address with the copy button and compare the first and last characters.
6. Confirm and press "I have paid" in our window.

## Common mistakes
- **Letting the exchange default.** Exchanges often preselect a network, and it is not always the one you need.
- **Assuming similar addresses are the same.** Ethereum and BNB addresses look alike but live on different chains.
- **Mixing up coin and network.** USDT on Ethereum is not USDT on Tron.
- **Using an old address.** Always copy the address from the current payment window.
- **Ignoring the label because the address "looks right".** The label is what counts.

## Frequently asked questions in depth
### Can I move funds between networks?
Yes, through a bridge or an exchange, but it adds fees and risk. It is usually better to pay on the network where your funds already are, if we accept it.

### Why do you offer two networks for USDT but only one for USDC?
Each option exists because customers commonly hold the token on that network and because we can match the payments reliably. We keep the list short to reduce mistakes.

### What happens if my wallet does not list the network I need?
Choose a different coin or network that your wallet supports, or use an exchange that supports the one we need. Our [payment methods comparison](/blog/payment-methods-compared/) can help you choose.

### Is one network more secure than another?
They all use cryptography, and the practical risk for a payment is human error, not the network. Matching the network and copying the address are the most important protections.

${AFTER}`,
faq: [
["What is the difference between a coin and a network?", "The coin is the unit you send, such as USDT. The network is the blockchain that carries it, such as Ethereum or Tron."],
["Why does the network matter?", "An address on one network is not valid on another. Sending on the wrong network can mean the funds never arrive and may not be recoverable."],
["How do I know which network to use?", "The payment window states it next to the address, for example Tron (TRC20) or Solana (SOL). Match it exactly in your wallet or exchange."],
["Do Ethereum and BNB addresses look the same?", "Yes, both start with 0x, so only the network label tells them apart."],
["Which networks do you accept?", "Bitcoin, Ethereum (ETH and USDT ERC20), Tron (USDT TRC20), BNB Smart Chain (BEP20) and Solana (SOL and USDC)."],
["Do fees differ by network?", "Yes. Tron and Solana are usually cheap, Ethereum varies with demand and Bitcoin depends on how busy the network is."],
]
},

"crypto-network-fees-explained": {
body: `When you send cryptocurrency you pay a network fee to the people or validators who process transactions. We do not receive or control that fee, and it is separate from the amount of your order. Fees vary widely depending on the blockchain you use and how busy it is, which is why they matter when you choose a coin and network for a payment at One Stop Vape Store. A large fee on a small order can cancel much of the 10% crypto discount, while a tiny fee leaves almost all of it. This guide explains how fees work on each network we accept, why they change, how to estimate them, how to keep them low, how exchange fees differ from network fees and how to make sure the right amount arrives. It is written for adults aged 21 and over and is not financial advice.

## What a network fee is
Blockchains are maintained by many computers that agree on which transactions are valid. The people running them are paid, through fees, to include your transaction in the next block. When many people want to transact at once, space in blocks is scarce and fees rise. When the network is quiet, fees fall. Your wallet usually estimates the fee for you, and often lets you pick a speed: a higher fee for faster inclusion, a lower fee for slower.

There are two different kinds of fee to keep apart. The network fee is paid to the blockchain. An exchange or provider fee is charged by the platform you use, for example when you withdraw coins from an exchange. You may pay both, and neither goes to us.

## Bitcoin
Bitcoin fees depend on the size of the transaction in bytes and on network demand, usually expressed in satoshis per byte. A simple payment is a small transaction, so the fee is modest in quiet periods and higher when many people transact. Most wallets let you pick economy, standard or priority speeds. A standard setting is usually fine. A very low fee can leave a transaction waiting for hours when the network is busy. See [how to pay with Bitcoin](/blog/how-to-pay-with-bitcoin/).

## Ethereum
Fees on Ethereum are called gas. They depend on demand, and token transfers such as USDT cost more than plain ETH because they run more computation. Busy times can make a small payment expensive, while quiet times, such as early mornings and weekends in US time zones, can be much cheaper. Gas is paid in ETH, so you need some ETH in the wallet even if you are sending a token. See [paying with Ethereum](/blog/pay-with-ethereum-eth/).

## Tron
Tron uses resources called bandwidth and energy. If you do not hold them, the network burns a small amount of TRX to cover the transaction. Many exchanges simply charge a flat withdrawal fee in USDT, which is usually small and predictable. USDT on Tron is popular for payments because the cost is low and the speed is good. See [USDT on ERC20 or TRC20](/blog/usdt-erc20-vs-trc20-which-network/).

## Solana
Fees are tiny, usually a fraction of a cent. Keep a small amount of SOL for fees even if you send USDC, because the fee is paid in SOL. This makes Solana ideal for smaller orders, because nearly all of the discount is kept. See [paying with Solana](/blog/pay-with-solana-sol/) and [USDC on Solana](/blog/pay-with-usdc-on-solana/).

## BNB Smart Chain
Fees are low and paid in BNB. A transfer usually costs a few cents or less. See [paying with BNB](/blog/pay-with-bnb-smart-chain/).

## A fee comparison for planning
The numbers change all the time, so think in ranges:

- **Solana:** a fraction of a cent.
- **Tron (USDT):** typically well under a dollar, often a flat exchange fee.
- **BNB Smart Chain:** typically a few cents or less.
- **Bitcoin:** typically cents to a few dollars, depending on demand and the speed you choose.
- **Ethereum:** typically cents to many dollars, depending on demand and whether you send ETH or a token.

For a $150 order, the 10% discount is $15. A $0.01 fee leaves almost all of it. A $10 fee leaves a third. That is why the network matters.

## Ways to keep fees down
- **Choose a network with cheap fees,** such as TRC20 or Solana.
- **Avoid peak times on Ethereum,** and check an estimate before you send.
- **Compare withdrawal fees on exchanges,** because they differ by network and coin.
- **Choose a sensible speed setting,** not the fastest one by default.
- **Send one transaction,** not several small ones, because each pays a fee.
- **Pay on the network where your funds already sit,** instead of bridging, which adds fees.

## Fees and the amount we receive
Make sure the amount arriving equals the amount in our window. Some exchanges deduct their withdrawal fee from the amount you enter, so less arrives than you intended, and the payment shows as underpaid. The fix is to add the fee on top. Other wallets add the network fee on top, so the amount arriving matches what you entered. Check which your wallet does, and see [sending crypto from an exchange to a wallet](/blog/send-crypto-from-an-exchange-to-a-wallet/) and [why your crypto payment shows underpaid](/blog/why-your-crypto-payment-shows-underpaid/).

## Fees and the 10% discount
The discount is calculated on your product subtotal and is not reduced by network fees. But your overall saving is the discount minus the fees you pay to get and send the crypto. If you have to buy crypto first, include provider fees too. Compare the total with a standard-price method before you decide. See [the 10% crypto and gift card discount](/blog/crypto-discount-how-it-works/) and [how to buy crypto with a card](/blog/how-to-buy-crypto-with-a-card/).

## Common mistakes
- **Forgetting the fee currency.** Ethereum needs ETH, Solana needs SOL and Tron may need TRX.
- **Sending your whole balance.** Leave enough for the fee.
- **Choosing the lowest fee on a busy network.** The transaction can get stuck.
- **Sending twice because it looks slow.** Check the transaction status first.
- **Ignoring the exchange fee.** It is separate from the network fee.

## Frequently asked questions in depth
### Do you charge a fee for crypto payments?
No. The only fees are the network fee and any fee charged by your exchange or wallet provider. We charge nothing extra for crypto, and we give a 10% discount.

### Can I get a refund of the network fee?
No. Network fees go to the network and are not refundable. If a refund of an order is ever due, it goes back through the same payment method, less the 15% restocking fee where it applies.

### Why did my fee change between two payments?
Demand changed. Fees move with how many people are transacting at that moment, and some networks change every few seconds.

### What if my transaction is stuck because the fee was too low?
Many wallets let you speed it up or cancel and resend. Check before you send a second payment, and contact us through the [contact page](/contact/) if you are unsure.

${AFTER}`,
faq: [
["Who receives the network fee?", "The people or validators who process transactions on the blockchain. We do not receive or control it."],
["Which network has the lowest fees?", "Solana is usually a fraction of a cent. Tron and BNB Smart Chain are also cheap. Ethereum varies with demand."],
["Do fees reduce the 10% discount?", "The discount itself is not reduced, but your overall saving is the discount minus the fees you pay to send or buy the crypto."],
["What is the difference between a network fee and an exchange fee?", "The network fee is paid to the blockchain. An exchange fee is charged by the platform when you withdraw. You may pay both."],
["Why does my payment show short after a withdrawal?", "Some exchanges deduct their fee from the amount, so less arrives. Add the fee on top next time."],
["Can I reduce the fee?", "Choose a cheap network, avoid peak times, pick a sensible speed and send a single transaction."],
]
},

"send-crypto-from-an-exchange-to-a-wallet": {
body: `Many people hold crypto on an exchange rather than in a private wallet. You can pay from there, as long as the exchange allows withdrawals to external addresses. The process is simple, but it has more places to go wrong than sending from a personal wallet, because exchanges add their own fees, minimums, security checks and default settings. This guide walks through a withdrawal from an exchange to the address in our payment window, step by step, explains how to choose the right network, how to enter the right amount once fees are included, what security checks to expect, what delays can happen and how to find the transaction ID. It is written for adults aged 21 and over and is not financial advice.

## Before you start
Check three things before you open the withdraw screen. First, that your account is verified to the level required for withdrawals, because some exchanges limit new accounts. Second, that the coin you want to send is available for external withdrawal, because some coins are only tradable. Third, that the exchange supports the network we accept for that coin: for example USDT on Tron (TRC20) or Ethereum (ERC20), USDC on Solana, Bitcoin on the Bitcoin network and BNB on BNB Smart Chain (BEP20). If your exchange does not support one of these, choose a different coin or buy crypto elsewhere; see [how to buy crypto with a card](/blog/how-to-buy-crypto-with-a-card/).

## Open the withdraw screen
In your exchange, find Withdraw or Send, then pick the coin. Do not use an internal transfer or "pay a friend" feature, because those only work between users of the same platform and the funds would not reach our address. Choose the option to send to an external address or wallet.

## Paste the address
Copy the address from our payment window with the copy button and paste it into the exchange. Compare the first and last four characters with the address on screen, because some malware swaps copied addresses for a different one. Some exchanges ask you to add the address to a whitelist first, and may hold new addresses for a short time for security. Plan for that if you are in a hurry.

## Choose the network
This is where most mistakes happen. Pick the network shown in our window, such as Tron (TRC20), Bitcoin, Solana or BNB Smart Chain (BEP20). Exchanges often default to a different network, so do not accept the preselected option without checking. If you are unsure what the names mean, read [what is a crypto network](/blog/what-is-a-crypto-network/). A wrong choice can mean the funds do not arrive and may not be recoverable.

## Enter the amount
Our window shows the amount to send. Exchanges deduct a withdrawal fee, either from the amount you enter or on top of it, and the withdrawal screen usually shows which. Make sure the amount that arrives equals the figure shown. If the exchange deducts the fee from your amount, add the fee to your withdrawal amount. For example, if the window shows 100 USDT and the exchange fee is 1 USDT deducted from what you enter, withdraw 101 USDT so that 100 arrives. A small shortfall is tolerated, but a larger one shows as underpaid. See [why your crypto payment shows underpaid](/blog/why-your-crypto-payment-shows-underpaid/).

## Confirm and complete security checks
Exchanges often send an email or a two-factor code for withdrawals. Approve it, then wait for the transaction ID. Some exchanges add a delay for new devices or large amounts, and some require a captcha or a hold after a password change. These are normal protections. Do not share your two-factor codes or recovery details with anyone, including anyone claiming to be from us, because we never ask for them.

## Find and use the transaction ID
After the withdrawal is processed, the exchange shows a transaction ID, also called a hash or TXID. Copy it. You can add that ID on our status page, together with a screenshot if we ask for one, so we can find the transfer immediately. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/). The ID also lets you look up the transaction on a public block explorer to see its status.

## Press "I have paid"
Once the exchange shows the withdrawal as sent, press "I have paid" in our payment window. Your order is placed and you land on the status page. If the withdrawal is still pending at the exchange, you can still press the button so the order exists, then wait for the transfer to arrive. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/).

## Minimums and delays
Some exchanges apply minimum withdrawals, so a small payment may not be allowed, or hold new addresses for a period. Plan ahead and check before you place the order. Some withdrawals are processed in batches rather than instantly, which can add minutes or hours. Learn about costs in [crypto network fees explained](/blog/crypto-network-fees-explained/).

## Common mistakes
- **Using an internal transfer.** It does not leave the exchange.
- **Accepting the default network.** Always check it against our window.
- **Forgetting the exchange fee.** The amount that arrives can be short.
- **Typing the address.** Always paste it.
- **Waiting too long to start.** Verification and holds can add days for a new account.
- **Resending when it is slow.** Check the status and contact us first.

## Frequently asked questions in depth
### Can I pay straight from an exchange to the payment window?
Yes. Withdraw to the address in the window on the matching network. The window does not know which exchange you use, and we match the payment by the transfer on the blockchain.

### What if my exchange charges a high fee?
Compare the fee between networks, or choose a different coin or network that the exchange supports at a lower cost. For smaller orders, a different payment method may be cheaper overall. See [payment methods compared](/blog/payment-methods-compared/).

### What if the exchange will not let me withdraw?
Contact the exchange's support, or choose a different way to pay. If time matters, a gift card or an app payment may be faster.

### Is it better to use a private wallet?
Either works. A private wallet gives you more control over the fee and avoids exchange holds, but needs setup. Use whichever you already have.

## A worked example
Suppose your order total after the 10% discount is $135.00 and you choose USDT on Tron. The payment window shows 135 USDT. Your exchange charges a flat withdrawal fee of 1 USDT, deducted from the amount. You open Withdraw, choose USDT, paste the address, choose Tron (TRC20), enter 136 USDT and confirm with your two-factor code. The exchange shows a transaction ID and the transfer arrives within a minute or two. You press "I have paid", the status page detects the transfer and your order is confirmed.

${AFTER}`,
faq: [
["Can I pay directly from an exchange?", "Yes, as long as the exchange allows withdrawals to external addresses. Withdraw to the address in our payment window on the matching network."],
["Why did less arrive than I sent?", "Some exchanges deduct their withdrawal fee from the amount you enter. Add the fee on top next time."],
["Which network should I pick on the exchange?", "The one shown in our payment window. Exchanges often default to a different one, so check it carefully."],
["What is a transaction ID?", "A unique code for your transfer, also called a hash or TXID. Add it on our status page so we can find the payment quickly."],
["Why is my withdrawal delayed?", "Exchanges may hold new addresses or large amounts for security checks, or process withdrawals in batches."],
["Can I use an internal transfer or pay-a-friend feature?", "No. Those only work between users of the same platform and do not reach our address."],
]
},

"scan-wallet-qr-code-and-copy-address": {
body: `Crypto addresses are long strings of letters and numbers, and one wrong character sends your funds to a different address, with no way to undo it. That is why you should never type an address by hand. The payment window at One Stop Vape Store gives you two reliable options: scan the QR code or use the copy button. This guide explains how each option works, how to scan from a phone and from a desktop, how to double-check the address after you paste or scan, why malware can swap copied addresses, how to check the network and the amount, whether a test transfer is worth it and what to do if something does not look right. It is written for adults aged 21 and over and is not financial advice.

## What the address and QR code are
An address is where the payment goes. The QR code is simply the same address, and sometimes the amount, encoded as a picture your camera can read. Because the code and the text address come from the same source, they always match. Scanning is faster and avoids typing mistakes, and copying and pasting does the same job. Either way, your wallet gets the exact address without you typing a single character.

## Option 1: scan the QR code
Open your wallet app, choose Send, then tap the scan icon and point your camera at the QR code in the payment window. The wallet fills in the address for you, and sometimes the network and amount as well. Hold the phone steady and make sure the whole code is in view. If your screen is dim or glossy, increase the brightness or tilt the screen slightly to avoid glare. If the code does not scan, try again from a bit further back, and fall back to the copy button.

## Option 2: use the copy button
Tap the copy icon next to the address and paste it into your wallet. This avoids mistakes that come from retyping, and it works on a desktop where scanning is awkward. After you paste, look at the address in the wallet to confirm that it has pasted completely and nothing else was added to it.

## Always double-check
After pasting or scanning, compare the first four and last four characters with the address on screen. Some malware swaps copied addresses for a different one, so a quick visual check is a good habit, especially for larger payments. The check takes seconds. If the first or last characters differ, do not send. Clear your clipboard, copy the address again and, if it still differs, scan the QR code with a different device and contact us through the [contact page](/contact/).

## Check the network too
Your wallet may show a network selector, especially for tokens such as USDT, which exist on several networks. It must match the one in our window; see [what is a crypto network](/blog/what-is-a-crypto-network/). The address prefix gives a quick clue: Bitcoin addresses start with bc1, 1 or 3, Ethereum and BNB Smart Chain addresses start with 0x, Tron addresses start with T and Solana addresses are long strings with no prefix. Remember that Ethereum and BNB addresses look alike, so check the network label as well.

## Enter the amount
Use the amount shown, copied with its own button where available. Typing a number is fine, but read it twice. The amount is based on the live rate and refreshes about every 30 seconds, so if you leave the window open for a while, refresh it and use the new figure. A small tolerance covers normal movement, but a large gap shows as underpaid. See [why your crypto payment shows underpaid](/blog/why-your-crypto-payment-shows-underpaid/) and the walkthrough in [how to pay with Bitcoin](/blog/how-to-pay-with-bitcoin/).

## Should you make a tiny test first?
For large amounts, some people send a small test transfer first. That adds a second network fee but can give peace of mind that the address and network are right. Whether it is worth it depends on the fee. On Solana or Tron the cost is tiny, so a test is cheap. On Ethereum it may cost more than it is worth. If you do send a test, tell us, because our system matches one transaction to one order, and we need to know both transaction IDs so we can match your payment correctly.

## If you are on a desktop
You can scan the QR code from your phone's wallet app while the payment window is open on your computer, or copy the address on the desktop and paste it into a browser-based wallet. Whichever you choose, do the compare-the-ends check on the final screen before you confirm. If you use a hardware wallet, check the address on the device's own screen as well, because that screen cannot be altered by malware on your computer.

## What a scam looks like
Genuine payment details come only from the payment window on our site or from our official email, WhatsApp number and private order page. We never ask you to send crypto to an address in a chat message from someone you do not know, and we never ask for private keys or recovery phrases. If anyone sends you a different address and says it is ours, do not use it, and contact us. See [how payment details reach you](/blog/how-payment-details-reach-you/).

## Common mistakes
- **Typing the address.** Always scan or copy.
- **Skipping the final check.** Compare the first and last characters.
- **Scanning the wrong code.** Scan only the QR code in the current window.
- **Ignoring the network.** Match it to the label.
- **Sending an old amount.** Refresh the window if it has been open a while.
- **Resending if it looks slow.** Check the status page first.

## Frequently asked questions in depth
### Does the QR code include the amount?
It may, depending on your wallet. Always check the amount on the final send screen and compare it with the window.

### Why does my wallet say the address is invalid?
It may be the wrong network for the address or an incomplete paste. Check the network, paste again and compare the ends.

### Can I save the address for later?
Do not. Each payment window gives the current details, and you should copy them fresh each time.

### What if my camera cannot read the code?
Use the copy button, or open the window on a larger screen and try again.

${AFTER}`,
faq: [
["Why shouldn't I type the address by hand?", "One wrong character sends the funds to a different address and cannot be undone. Scan the QR code or use the copy button."],
["How do I check the address after pasting?", "Compare the first four and last four characters with the address in the payment window."],
["Can malware change a copied address?", "Yes, some malware swaps copied addresses. A quick visual check of the ends, and checking the address on a hardware wallet screen if you use one, protects you."],
["What if the QR code does not scan?", "Increase screen brightness, move back slightly or use the copy button."],
["Does the QR code include the amount?", "It may, depending on your wallet. Always check the amount on the final send screen against the window."],
["Should I send a test transfer first?", "It is optional and adds a second fee. If you do, tell us both transaction IDs so we can match your payment."],
]
},

"sent-crypto-on-the-wrong-network": {
body: `Sending crypto on the wrong network is one of the most common mistakes in crypto payments, and it can happen to careful people. A wallet or exchange defaults to a network you did not intend, or an address looks right because two chains use the same address style, and the transfer goes through on the wrong chain. If this has happened to you at One Stop Vape Store, do not panic, and do not send more funds. This guide explains what to do in the first minutes, what the different cases mean, what we can and cannot do, how to contact us and your provider, why you should wait before resending and how to avoid the mistake next time. It is written for adults aged 21 and over, it is general information and it is not financial or legal advice.

## Stop and gather details
Before you do anything else, stop. Do not send another transfer, and do not try to "fix" it by sending the same funds again. Then collect the details of what happened:

- **The transaction hash,** also called the transaction ID or TXID.
- **The coin** you sent and the **network** you used.
- **The amount** and the **time** of the transfer.
- **The address** you sent to.
- **Your order reference** from our payment window or email.
- Screenshots of the exchange or wallet confirmation.

Having these ready makes everything that follows faster, for you and for us.

## Understand what happened
There are a few cases, and which one you are in decides what can be done.

### Right coin, wrong network, address compatible
On some networks that use the same address style, such as Ethereum and BNB Smart Chain, the same address string is valid on several chains. The funds may be sitting at that address on the other chain. Whether we can recover them depends on whether we control the address on that chain and on whether our wallet software supports it. In some cases it can be done, and in others it cannot.

### Address format incompatible
If the address format does not match the network, the transaction usually fails or is blocked by the exchange or wallet before it leaves. In that case your funds typically remain where they were, and you can try again on the correct network. Check your balance and your transaction history to confirm.

### Sent to an address we do not control
If the transfer landed on an address that nobody we know controls, the funds are unrecoverable by anyone. That is the harshest case, and it is why checking the network and the address before you confirm matters so much.

### Right network, wrong token
A related mistake is sending a different token on the right network, for example sending USDC when the window asked for USDT. Recovery depends on the same question: whether we control the address and can handle that token.

## Contact us right away
Use the [contact page](/contact/) or WhatsApp with your order reference and the details above. We will check what arrived and tell you honestly whether anything can be done. We cannot promise recovery, as it depends on whether we control the receiving address on that chain and whether it is technically possible. If a recovery is possible, there may be costs, which we will explain before we do anything, and we will not proceed without your agreement. We will also tell you how your order is affected: it stays unpaid until a valid payment arrives, so do not assume that a transfer on the wrong network has paid it.

## Contact the sender's provider too
If you used an exchange, open a support ticket. Some can help with wrong-network deposits in limited cases, especially when the problem is on their side, such as a deposit to an address they control. Give them the transaction hash, the network and the details above. If you used a private wallet, check the wallet's support pages, because some have recovery tools for specific mistakes.

## Do not resend yet
Wait until we confirm what we can see. Resending without checking can double the problem: if the first transfer is recoverable and you pay again on the right network, you may end up having paid twice. If you need the order urgently, tell us, and we can discuss options, including switching to a different payment method for the order such as a gift card or an app payment, which we can set up while the first transfer is investigated.

## What happens to your order
Your order exists but remains unpaid until a valid payment arrives. Orders do not begin processing until payment is confirmed. If the original payment cannot be recovered, you will need to pay again, on the correct network or with another method. Unpaid orders may be released after a period so stock is not held indefinitely, so keep in touch with us so we can note your order while the situation is sorted out.

## Avoiding it next time
Most wrong-network mistakes come from a handful of habits that are easy to change:

- **Match the network label** in the payment window with the one in your wallet, every time.
- **Do not accept the default** network on an exchange without checking it.
- **Use the copy button** or scan the QR code, and compare the first and last characters.
- **Read [what is a crypto network](/blog/what-is-a-crypto-network/)** so that the names are familiar.
- **For stablecoins,** read [USDT on ERC20 or TRC20](/blog/usdt-erc20-vs-trc20-which-network/) and [USDC on Solana](/blog/pay-with-usdc-on-solana/), since the same token exists on several networks.
- **For larger amounts,** consider a small test transfer, and tell us if you do.

## Frequently asked questions in depth
### Can you guarantee I will get my funds back?
No. Recovery depends on the specific situation and is sometimes impossible. We will tell you honestly what we can see and what, if anything, can be done.

### How long does a recovery take?
It varies. If recovery is possible, it usually takes longer than a normal payment because it needs manual steps. We will keep you informed.

### Will my order still ship?
Orders ship once a valid payment is confirmed. If the original transfer cannot be used, you will need to pay again or choose another method.

### Is there a fee for trying to recover?
If recovery involves costs, we will tell you before we start. We will not charge you without your agreement.

### What if the mistake involved a large amount?
Contact us immediately and the exchange or wallet provider too. The sooner everyone knows, the better the chance of a good outcome.

## Related reading
See [why your crypto payment shows underpaid](/blog/why-your-crypto-payment-shows-underpaid/) if only the amount was wrong, [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/) for how matching works and [payment methods compared](/blog/payment-methods-compared/) if you would like a different route.

${AFTER}`,
faq: [
["What should I do first if I sent on the wrong network?", "Stop, do not send more funds, and gather the transaction hash, coin, network, amount, time, address and your order reference."],
["Can you recover my funds?", "Maybe, but we cannot promise it. It depends on whether we control the receiving address on that chain and whether recovery is technically possible."],
["Should I send the payment again?", "Wait until we confirm what we can see. Resending without checking can double the problem."],
["Is my order affected?", "It stays unpaid until a valid payment arrives, so it does not begin processing until then."],
["Who else should I contact?", "Your exchange's or wallet's support, with the transaction hash and network details."],
["How do I avoid this next time?", "Match the network label in our window, do not accept defaults on exchanges, use the copy button or QR code and compare the first and last characters."],
]
},

"why-your-crypto-payment-shows-underpaid": {
body: `An underpaid status means we found a transfer to our wallet that is smaller than your order total. It is a common message and it is usually easy to fix, but it can be worrying if you are not sure what it means. At One Stop Vape Store, the system compares the dollar value of the transfer it finds with the total of your order, allowing a small tolerance for normal price movement. If the transfer is clearly short, the order is marked underpaid and the status page shows the amount we received. This guide explains the common causes, how we decide, exactly how to fix it step by step, how to avoid it next time, what to do if you overpaid and how it differs from other problems. It is written for adults aged 21 and over and is not financial advice.

## What underpaid means
Underpaid means a matching transfer exists but its value is below your total by more than the tolerance. It does not mean your payment was lost, and it does not mean you did anything wrong in a serious way. It means the amount that arrived is not enough yet. Your order is not cancelled, and the transfer is held against it while you complete the balance. The status page shows the received amount so you can see exactly how much is missing.

## Common causes
- **Exchange fee deducted:** some exchanges subtract their withdrawal fee from the amount, so less arrives than you entered. This is the most common cause.
- **Price movement:** a volatile coin can drop between the quote and your transfer, so the dollar value of what you sent is lower than your total.
- **Rounding or a typo:** a missing digit in the amount, or rounding down to a neat number.
- **Partial payment:** you meant to pay in two parts, or sent only one of two planned transfers.
- **Stale quote:** you left the payment window open for a long time and used an old amount instead of refreshing.
- **Wrong amount copied:** you copied the wrong figure, for example the dollar total instead of the coin amount.

## How we decide
We compare the dollar value of the received transfer to your order total, allowing a small tolerance for normal movement between the quote and the confirmation. The value is calculated at a market rate for the coin at the time. Anything clearly short is marked underpaid, and the status page shows the amount we received. We also check the other conditions: the right network and address, the right token, a recent time and a transaction that has not paid another order. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/).

## How to fix it, step by step
1. **Check the received amount** on your status page. It shows how much we found.
2. **Work out the missing balance** in dollars, and convert it to the coin you are using, using the current quote in a fresh payment window if needed.
3. **Send the missing balance** to the same address and network you used for the first payment.
4. **Add the new transaction hash** on the status page and press "I have paid", or upload a screenshot of the second transfer.
5. **If you are unsure,** contact us from the [contact page](/contact/) with your order reference and both transaction hashes. We will tell you the exact balance and confirm when both transfers are matched.

Please do not resend the whole amount. Sending the full amount again would overpay the order, and while we can review an overpayment, it is simpler and cheaper to send only the difference.

## Why it happens so often with exchanges
Exchanges commonly deduct their withdrawal fee from the amount you enter. For example, if you enter 100 USDT and the fee is 1 USDT, only 99 arrives. The payment is 1% short, and since that is more than a tiny tolerance, it shows as underpaid. The fix next time is to add the fee on top: enter 101 so that 100 arrives. Read [sending crypto from an exchange to a wallet](/blog/send-crypto-from-an-exchange-to-a-wallet/) for a walkthrough, and [crypto network fees explained](/blog/crypto-network-fees-explained/) for how fees work.

## Avoiding it
- **Use stablecoins** such as [USDT](/blog/usdt-erc20-vs-trc20-which-network/) or [USDC](/blog/pay-with-usdc-on-solana/) for exact amounts, because the price does not move.
- **Add the exchange withdrawal fee on top** if it is deducted from the amount.
- **Send soon after the quote loads,** and refresh the window if it has been open a while.
- **Copy the amount** with the copy button instead of typing it.
- **Check the amount** on the final send screen before you confirm.
- **Send one transaction** for the full amount, not several.

## Overpaid?
If you sent more than needed, tell us. We will review it and let you know how it can be handled. We do not automatically refund an overpayment, because it depends on the size of the difference and the coin, and we will explain the options clearly. The simplest approach is to avoid overpaying by sending the amount shown.

## How underpaid differs from other problems
- **Waiting:** no matching transfer yet. Check your wallet and the network.
- **Detected:** a transfer is visible but not fully confirmed. Wait a few minutes.
- **Underpaid:** a transfer exists but it is short.
- **Wrong network or token:** the funds may not have arrived at our address at all. See [sent crypto on the wrong network](/blog/sent-crypto-on-the-wrong-network/).

Knowing which state you are in saves time, because the fixes are different.

## A worked example
Suppose your order total after the 10% discount is $162.00 and you pay in USDT. The window shows 162 USDT. Your exchange deducts a 1.5 USDT fee from what you enter, and you enter 162. Only 160.5 arrives. The status page shows underpaid with a received amount of 160.5, so the balance is 1.5 USDT. You send 1.5 USDT, plus the exchange fee if it applies, to the same address and network, add the new transaction hash and press "I have paid". We match both transfers to your order and confirm it.

## Frequently asked questions in depth
### Is a very small shortfall a problem?
A tiny difference caused by normal market movement is tolerated. A larger shortfall is marked underpaid.

### Do I need to wait for you before sending the balance?
You can send the balance straight away if you know the amount, and tell us. If you are unsure, contact us first so we confirm the exact figure.

### Will my order be cancelled?
No, not simply because it is underpaid. Unpaid or underpaid orders may eventually be released if no further payment arrives, so complete the balance promptly or contact us.

### Can I switch to a different payment method for the balance?
Please contact us. We can advise on the simplest way to complete the order.

${AFTER}`,
faq: [
["What does underpaid mean?", "We found a transfer that is smaller than your order total by more than the tolerance. The order is not cancelled, and the status page shows what we received."],
["What is the most common cause?", "An exchange deducting its withdrawal fee from the amount, so less arrives than you entered."],
["How do I fix it?", "Send the missing balance to the same address and network, add the new transaction hash on the status page and press I have paid, or contact us with your order reference."],
["Should I resend the whole amount?", "No. Send only the difference. Resending the full amount would overpay the order."],
["What if I overpaid?", "Tell us. We will review it and explain how it can be handled."],
["How do I avoid it?", "Use stablecoins for exact amounts, add exchange fees on top, copy the amount with the copy button and refresh the window if it has been open a while."],
]
},

"how-to-upload-a-payment-screenshot": {
body: `After you pay with Cash App, Apple Pay, Chime, a gift card or cryptocurrency, you can upload proof so we can confirm your payment quickly. A clear screenshot or receipt lets the person checking your order match it in seconds, while a blurry or incomplete one can lead to a back-and-forth that delays your order. This guide explains where to upload, what to capture for each payment method, how to make an image readable, how uploading works on a phone, which optional fields help, what happens after you upload and how to keep your uploads private. It is written for adults aged 21 and over.

## Where to upload
Use the link in your payment email or the order status page. It opens a private page with an upload box for your order. The link contains a unique token, so only the person with your order link can open the page. You do not need to sign in or create an account. If you cannot find the link, open the original email, or contact us through the [contact page](/contact/) with your order number and we will resend it.

## What to capture
Different methods need different proof. Here is what helps most for each.

### App payments: Cash App, Apple Pay and Chime
Capture the confirmation screen with the amount, the recipient and the date and time. If the app shows a transaction ID or a payment note with your order ID, make sure it is visible. If the confirmation spans two screens, capture both. See the guides for [Cash App](/blog/cash-app-payments-guide/), [Apple Pay](/blog/apple-pay-payments-guide/) and [Chime](/blog/chime-payments-guide/).

### Cryptocurrency
Capture the transaction ID or hash and the wallet or exchange confirmation that shows the coin, amount, network and time. The hash is the most useful item, because it lets us find the exact transfer on the blockchain. Paste it into the transaction field as well as including it in the screenshot. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/).

### Gift cards
Capture the card code or PIN, photos of the card (front and back if it is physical) and your purchase receipt. For e-gift cards, a screenshot of the delivery email is enough. Check every digit of the code. See [how gift card payment works](/blog/how-gift-card-payment-works/) and the individual card guides.

## Make it readable
A clear image is the single biggest factor in how quickly your payment is confirmed. Follow these habits:

- **Capture the whole screen,** not a tiny crop. We need the amount, date and reference visible.
- **Crop out private details unrelated to the payment,** such as other contacts or balances, but keep the amount, date and reference.
- **Avoid blurry photos.** Hold the phone steady and tap to focus if you are photographing a card or receipt.
- **Use good light.** Glare and shadows make numbers unreadable.
- **Do not edit the image.** Annotations or filters can make it look altered. A plain screenshot is best.
- **Make sure the text is large enough.** If you zoom in, the numbers should still be sharp.

## Uploading from a phone
Tap the upload box, choose images from your gallery or take a photo. You can add up to four images. They are compressed on your device before sending, so large photos upload quickly, even on a slow connection. If an image does not upload, check your connection and try again, or choose a smaller or cropped version. Wait until you see the confirmation that the upload succeeded before you close the page.

## Uploading from a computer
You can upload from a desktop as well. Transfer the screenshot to your computer, or take a screenshot on the computer, then choose the files in the upload box. The same limits and compression apply.

## Optional fields
Add the transaction hash for crypto, the gift card code, and a short note if something is unusual. Notes that help include paying the difference for an underpaid order, buying a gift card in the next amount up, paying in two parts or paying from a different name. Short, clear notes save questions later.

## After you upload
Your order status changes to proof submitted and our team reviews it. We match your proof to the payment, and when payment is confirmed you receive an email. Review is a manual step for gift cards and some other cases, and it is quickest during business hours, Monday to Saturday, 9AM to 7PM Pacific Standard Time. See [how ordering works](/blog/how-ordering-works/) for timing and [order status meanings](/blog/order-status-meanings/) for what each status means. Once payment is confirmed, the order enters processing, which takes 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse.

## Keep it private
Only the person with your order link can open the page, so do not share the link. Do not share your gift card code or PIN publicly or with anyone who contacts you unexpectedly. Your uploaded images are stored with your order and are used only to check your payment. Our [privacy policy](/privacy/) explains what we collect and how we use it. For gift card specifics, read [gift card code security tips](/blog/gift-card-code-security-tips/).

## Common problems
### The upload fails
Check your connection and try a smaller image. If it still fails, email us the image from the address on your order, with your order number.

### I uploaded the wrong image
Tell us right away with your order number and upload the right image. We will use the latest one.

### I forgot to include the amount
Upload a new screenshot that shows it, or add the amount in the note field.

### I cannot find the link
Check spam, then contact us with your order number and we will resend it.

## Frequently asked questions in depth
### Do I have to upload a screenshot for crypto?
Usually not, because we match payments automatically on most networks. A transaction hash helps when a manual check is needed.

### How many images can I upload?
Up to four. If you need more, tell us in the notes and email the rest.

### Can I upload later?
Yes, but sooner is better, because we cannot confirm some payments until we have the proof. Unpaid orders may be released after 24 hours.

### Can someone else upload for me?
It is better if you do, because the private link is meant for the customer on the order. If someone else pays or uploads for you, tell us so we can match it.

${AFTER}`,
faq: [
["Where do I upload my payment proof?", "Use the link in your payment email or the order status page. It opens a private upload page for your order."],
["What should the screenshot show?", "The amount, the recipient, the date and time and, where relevant, your order ID or transaction hash. For gift cards, the code or PIN and your receipt."],
["How many images can I upload?", "Up to four. They are compressed on your device before sending, so large photos upload quickly."],
["Do I need to upload proof for crypto?", "Usually not, because crypto is matched automatically on most networks, but a transaction hash helps when a manual check is needed."],
["What happens after I upload?", "Your order status changes to proof submitted and our team reviews it. You receive an email when payment is confirmed."],
["Is my upload private?", "Yes. Only the person with your order link can open the page, and uploads are used only to check your payment."],
]
},

"crypto-payment-faq": {
body: `This page collects the questions we hear most about paying with cryptocurrency at One Stop Vape Store, with short answers and links to the full guides. Whether you already hold crypto or are thinking about using it for the first time, you will find the coins we accept, how the 10% discount works, how to choose a network, how payments are detected, what fees to expect, what to do if something goes wrong and how it compares with other methods. It is written for adults aged 21 and over and is not financial advice.

## Which coins do you accept?
We accept Bitcoin (BTC), USDT on Ethereum (ERC20) and Tron (TRC20), USDC on Solana, Ethereum (ETH), BNB on BNB Smart Chain (BEP20) and Solana (SOL). Each has its own guide: [Bitcoin](/blog/how-to-pay-with-bitcoin/), [USDT](/blog/usdt-erc20-vs-trc20-which-network/), [USDC on Solana](/blog/pay-with-usdc-on-solana/), [Ethereum](/blog/pay-with-ethereum-eth/), [BNB](/blog/pay-with-bnb-smart-chain/) and [Solana](/blog/pay-with-solana-sol/).

## Is there a discount?
Yes, 10% off the product subtotal when you pay with cryptocurrency or a supported gift card. It is applied automatically at checkout. Shipping is added after the discount, and free shipping applies to orders of $200 or more after the discount. See [how the discount works](/blog/crypto-discount-how-it-works/) for worked examples, including how the discount can bring a cart below the free-shipping line.

## Where do I find the address?
In the payment window after you choose Cryptocurrency at checkout. It shows your order reference, the amount in your chosen coin, a QR code, the address and copy buttons. See [scanning the QR code and copying the address](/blog/scan-wallet-qr-code-and-copy-address/). Never type the address by hand.

## How is the amount calculated?
Your order is priced in US dollars. The window converts your dollar total, after the discount, into the coin you chose at the live rate. The rate refreshes about every 30 seconds, so the coin amount can change slightly while the dollar value stays the same. For stablecoins like USDT and USDC the amount is essentially the dollar total. If the window has been open a while, refresh it and use the new amount.

## Which network should I choose?
The one shown in the window. The network is the blockchain that carries the transfer, and an address on one network is not valid on another. Read [what is a crypto network](/blog/what-is-a-crypto-network/) for a plain-language explanation, and [USDT on ERC20 or TRC20](/blog/usdt-erc20-vs-trc20-which-network/) if you are choosing between two networks for USDT.

## How is my payment detected?
Automatically on most networks. After you press "I have paid", our system reads public blockchain data for the shop wallet and looks for a transfer that fits your order: the right network and address, the right token, a dollar value close to your total, a recent time and a transaction that has not paid another order. BNB payments are confirmed by our team after you upload a screenshot. See [how we detect your crypto payment](/blog/how-we-detect-your-crypto-payment/).

## How long does it take?
Solana and Tron usually confirm within seconds to a couple of minutes. Ethereum and BNB Smart Chain usually take a few minutes. Bitcoin is usually visible within a minute or two and final after a block, often around ten minutes. After payment is confirmed, the order enters processing, which takes 24 to 72 business hours before it ships.

## I do not own crypto. What now?
You can buy it with a card or bank transfer from a provider such as MoonPay, Coinbase, Transak or Changelly, and send it to the address in our window. See [how to buy crypto with a card](/blog/how-to-buy-crypto-with-a-card/). Compare the provider's fees with the 10% saving first. A supported gift card also earns the discount without any crypto; see [how gift card payment works](/blog/how-gift-card-payment-works/).

## Can I pay from an exchange?
Yes, as long as the exchange allows withdrawals to external addresses. Choose the right network, paste the address, add the withdrawal fee on top if it is deducted from the amount and keep the transaction ID. See [sending crypto from an exchange to a wallet](/blog/send-crypto-from-an-exchange-to-a-wallet/).

## Do I pay network fees?
Yes, to the network, not to us. We charge nothing extra for crypto. Fees vary by network: Solana is a fraction of a cent, Tron and BNB Smart Chain are cheap, Bitcoin and Ethereum vary with demand. See [crypto network fees explained](/blog/crypto-network-fees-explained/).

## What if I used the wrong network?
Stop, do not send more funds and contact us right away with your order reference and the transaction hash. We will tell you honestly whether anything can be done. See [what to do after sending crypto on the wrong network](/blog/sent-crypto-on-the-wrong-network/).

## What if the payment looks short?
An underpaid status means we found a transfer smaller than your total. Send the missing balance to the same address and network, and add the transaction hash. See [why your crypto payment shows underpaid](/blog/why-your-crypto-payment-shows-underpaid/).

## Do I need to upload a screenshot?
Usually not for crypto, but a transaction hash and screenshot help when a manual check is needed. See [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/).

## Do you ever ask for my private key or recovery phrase?
Never. We use only public blockchain data to match payments. Do not share private keys, seed phrases or two-factor codes with anyone, including anyone claiming to be from us.

## Can I get a refund?
If a refund is ever due, it goes back through the payment method the payment was received through, less the 15% restocking fee where it applies. Returns are accepted within 30 days for unopened items in original packaging, and opened or used items cannot be returned. See [refund and return policy explained](/blog/refund-and-return-policy-explained/). Because crypto transfers are final, refunds are returned in the coin used, and we will explain the details.

## Can I pay in two parts?
Please send a single transaction for the full amount if you can. If you need to split a payment, contact us before you send so we can note it against your order and match both transfers.

## Which coin is best for a small order?
Solana, Tron and BNB Smart Chain usually have the lowest fees, which leaves most of the discount intact. A stablecoin avoids price movement. For a larger order, any supported coin is fine. See [payment methods compared](/blog/payment-methods-compared/).

## Which coin is best if I want an exact amount?
A stablecoin such as USDT or USDC, because the amount equals your dollar total. Volatile coins such as Bitcoin, Ethereum, BNB and Solana can move between the quote and the payment, which is why a small tolerance exists.

## What do I do after my payment is confirmed?
Nothing. You receive an email, and your order status changes to payment confirmed. We process orders within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse and ship with tracking by a regional carrier. An adult aged 21 or older must sign on delivery. See [shipping times from Phoenix, Arizona](/blog/shipping-times-from-phoenix-arizona/) and [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/).

## Who can I ask for help?
Use the [contact page](/contact/), message us on WhatsApp, call or email. Customer service hours are Monday to Saturday, 9AM to 7PM Pacific Standard Time. Include your order reference and, if relevant, the transaction hash.

## Where can I read more?
Browse the full set of payment guides in [payment methods compared](/blog/payment-methods-compared/), and start shopping with our [disposable vapes](/shop/disposables/) and [vape juice](/shop/vape-juice/). All products are for adults aged 21 and over, and nicotine is addictive.`,
faq: [
["Which cryptocurrencies do you accept?", "Bitcoin, USDT (Ethereum ERC20 and Tron TRC20), USDC (Solana), Ethereum, BNB (BNB Smart Chain) and Solana."],
["How much is the crypto discount?", "10% off the product subtotal, applied automatically at checkout. Free shipping applies to orders of $200 or more after the discount."],
["How is my payment matched to my order?", "Automatically on most networks, by reading public blockchain data. BNB payments are confirmed by our team after you upload a screenshot."],
["Do I pay a fee for crypto?", "Not to us. You pay the network fee to the network, and any exchange fee to your platform."],
["What if I send on the wrong network?", "Stop, do not resend, and contact us with your order reference and transaction hash. We cannot promise recovery."],
["Do you ever ask for my private keys?", "Never. We use only public blockchain data. Do not share private keys, seed phrases or two-factor codes with anyone."],
]
},
};
