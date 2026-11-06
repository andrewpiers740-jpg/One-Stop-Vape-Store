const C = "Payments & Crypto";
export default [
{
  slug: "how-to-pay-with-bitcoin", category: C, tags: ["bitcoin", "crypto", "payments"], shop: ["disposables"], keywords: ["geek bar"],
  title: "How to Pay With Bitcoin at One Stop Vape Store, Step by Step",
  summary: "Pay for your order with Bitcoin in a few minutes. Follow this walkthrough from choosing BTC at checkout to sending the exact amount.",
  body: `Bitcoin (BTC) is one of the payment options at checkout, and it qualifies for our crypto discount. Here is the full process.

## Before you start
You need a wallet or exchange account that holds Bitcoin. If you have none, see [how to buy crypto with a card](/blog/how-to-buy-crypto-with-a-card/).

## Step 1: fill your cart and open checkout
Add products to your cart and go to checkout. Enter your contact and shipping details. We require an email address because order updates are sent there.

## Step 2: choose Cryptocurrency and Bitcoin
Select Cryptocurrency as the payment method, then choose Bitcoin from the token list. The payment window opens straight away.

## Step 3: read the payment window
It shows your order reference, the amount due after the crypto discount, the amount of BTC to send based on the live rate, a QR code and the wallet address. Use the copy buttons to avoid typing errors. The rate refreshes every 30 seconds, so send the amount shown when you pay.

## Step 4: send from your wallet
Open your wallet, scan the QR code or paste the address and enter the amount. Confirm the transaction. Network fees are paid by you on top of the amount.

## Step 5: press "I have paid"
Return to the payment window and press the button. Your order is placed and you land on the status page, where payment is checked on the blockchain automatically. Once a matching transaction confirms, we email you.

## If something looks wrong
Do not resend. Upload a screenshot on the status page or contact us. Read about [underpaid messages](/blog/why-your-crypto-payment-shows-underpaid/) for common causes. Adults 21+ only; [shipping](/shipping/) requires an adult signature.`,
  faq: [["How long does a Bitcoin payment take?", "Bitcoin usually needs at least one network confirmation, which can take from a few minutes to longer when the network is busy."], ["Do I pay the network fee?", "Yes. The fee is charged by your wallet or exchange when you send, in addition to the order amount."]],
},
{
  slug: "usdt-erc20-vs-trc20-which-network", category: C, tags: ["usdt", "tether", "erc20", "trc20", "crypto"], shop: ["disposables"], keywords: ["raz"],
  title: "USDT on ERC20 or TRC20? Choosing the Right Network to Pay",
  summary: "We accept Tether (USDT) on Ethereum (ERC20) and Tron (TRC20). Compare fees, speed and how to pick the network that suits your wallet.",
  body: `USDT is a stablecoin pegged to the US dollar, so the amount you owe does not swing like Bitcoin. At checkout you choose between two networks for it, and the choice matters.

## Why there are two networks
The same token exists on several blockchains. We accept USDT on **Ethereum (ERC20)** and **Tron (TRC20)**. Each has its own wallet address, and you must send on the network you selected.

## TRC20: usually cheaper
Tron transfers typically cost much less than Ethereum and settle quickly. For payments of a few hundred dollars, many people choose TRC20 to keep fees low. Your wallet or exchange must support Tron withdrawals.

## ERC20: widely supported
Ethereum is the most widely supported network. Fees can be higher, especially when the network is busy, but compatibility is excellent.

## How to choose
- **Lowest fee:** TRC20.
- **Maximum wallet compatibility:** ERC20.
- **Your balance is on one network:** use that one, and do not bridge just to pay.

## The most important rule
Send on exactly the network shown in the payment window. A transfer on the wrong network will not arrive and may not be recoverable. Read [what to do after a wrong-network send](/blog/sent-crypto-on-the-wrong-network/).

## Steps
Choose Cryptocurrency, then USDT, then the network. Copy the address, send the amount, then press "I have paid". See the general [crypto network explainer](/blog/what-is-a-crypto-network/) and [how we detect payments](/blog/how-we-detect-your-crypto-payment/). Adults 21+ only.`,
  faq: [["Which network has lower fees?", "Tron (TRC20) is typically cheaper than Ethereum (ERC20), although fees vary with network demand."], ["Is the USDT address the same on both networks?", "No. Each network has its own address format, and the payment window always shows the correct one."]],
},
{
  slug: "pay-with-usdc-on-solana", category: C, tags: ["usdc", "solana", "crypto", "stablecoin"], shop: ["disposables"], keywords: ["lost mary"],
  title: "Paying With USDC on Solana: Fast, Low-Fee Stablecoin Payments",
  summary: "USDC on the Solana network settles in seconds with tiny fees. Here is how to pay your order and avoid the common mistakes.",
  body: `USDC is a dollar-pegged stablecoin, and on Solana it moves quickly and costs very little. That makes it a convenient option for paying an order.

## What you need
A wallet that supports Solana and holds USDC, such as a popular browser or mobile Solana wallet, or an exchange that allows USDC withdrawals on Solana. You also need a tiny amount of SOL in a self-custody wallet to cover the network fee.

## Step by step
1. Choose Cryptocurrency at checkout, then USDC. Solana is the only network offered.
2. Copy the wallet address from the payment window or scan the QR code.
3. In your wallet, choose Send, select USDC and paste the address.
4. Enter the amount shown and confirm.
5. Press "I have paid". Your payment is looked for on the Solana network and confirmed automatically.

## Why choose USDC on Solana
Transfers finish in seconds and the fee is a fraction of a cent. The amount is stable, so you owe the same dollar value regardless of market moves.

## Common mistakes
- Sending USDC on a different network, such as Ethereum. It will not arrive.
- Sending SOL instead of USDC. They are different assets.
- Forgetting a little SOL for fees in a self-custody wallet.

## Related guides
New to this? Read [how to buy crypto with a card](/blog/how-to-buy-crypto-with-a-card/) and [what a crypto network is](/blog/what-is-a-crypto-network/). If your payment looks short, see [underpaid messages](/blog/why-your-crypto-payment-shows-underpaid/). Browse the [disposable vapes](/shop/disposables/) range. Adults 21+ only.`,
  faq: [["Do I need SOL to send USDC?", "In a self-custody wallet, yes, a very small amount of SOL covers the network fee. Exchanges usually deduct fees differently."], ["Is USDC the same as USDT?", "No. They are different stablecoins from different issuers, and each has its own address and contract."]],
},
{
  slug: "pay-with-ethereum-eth", category: C, tags: ["ethereum", "eth", "crypto", "payments"], shop: ["vape-kits"], keywords: ["pod salt"],
  title: "Paying With Ethereum (ETH): What to Know Before You Send",
  summary: "Ethereum is supported at checkout. Learn how the live rate, gas fees and confirmations work so your ETH payment goes through smoothly.",
  body: `Ethereum (ETH) is a popular payment option with a crypto discount. Here is what to expect.

## The live quote
When you open the payment window we show the amount of ETH equal to your order total after the discount, based on a live rate refreshed every 30 seconds. ETH can move quickly, so send soon after you open the window.

## Gas fees
Every Ethereum transfer pays a network fee called gas. It is charged by your wallet on top of the amount and changes with network demand. Check the estimate before you confirm, and avoid sending during very busy periods if you want a lower fee.

## Step by step
1. Choose Cryptocurrency, then Ethereum.
2. Copy the address or scan the QR.
3. Send the amount shown from your wallet.
4. Press "I have paid" so we can find the transaction.

## Confirmation
We look for your transfer on the Ethereum network and match it to your order automatically. A confirmed transfer sends you an email and moves the order to payment confirmed.

## Native ETH only
Send ETH itself on the Ethereum network. Do not send tokens such as USDT to the ETH address unless the payment window asks for that token, as recovery is not guaranteed.

## Need a lower-fee option?
Stablecoins on cheaper networks are an alternative: see [USDT on ERC20 or TRC20](/blog/usdt-erc20-vs-trc20-which-network/) and [USDC on Solana](/blog/pay-with-usdc-on-solana/). For fee basics, read [network fees explained](/blog/crypto-network-fees-explained/). Browse [vape kits](/shop/vape-kits/). Adults 21 and over only.`,
  faq: [["What if the ETH price moves after I open the window?", "Small moves are tolerated, and if the amount lands noticeably short we flag it for review rather than failing silently."], ["Can I pay from an exchange?", "Yes, if the exchange allows withdrawals to external addresses. Remember that the exchange may add its own withdrawal fee."]],
},
{
  slug: "pay-with-bnb-smart-chain", category: C, tags: ["bnb", "bsc", "crypto", "payments"], shop: ["disposables"], keywords: ["fifty bar"],
  title: "Paying With BNB (BNB Smart Chain): A Practical Guide",
  summary: "BNB is accepted on BNB Smart Chain (BEP20). See how to send it correctly and how BNB payments are confirmed.",
  body: `BNB is accepted on the **BNB Smart Chain (BEP20)** network. It is a good option if your funds already sit on Binance or another BSC wallet.

## Know the network
Choose BNB at checkout and the window shows the BNB Smart Chain address. BNB also exists on other chains, so make sure your wallet or exchange withdrawal says BNB Smart Chain or BEP20, not the older BEP2 network.

## Step by step
1. Choose Cryptocurrency and select BNB.
2. Copy the address and the amount.
3. In your exchange or wallet, withdraw BNB, selecting BNB Smart Chain (BEP20).
4. Press "I have paid" in the payment window.

## How confirmation works
BNB Smart Chain transfers are fast and cheap. Unlike some other networks, BNB payments are currently confirmed by our team after you upload a screenshot on the status page, so allow a little extra time during business hours.

## Check the fee and minimum
Exchanges set their own withdrawal minimums and fees. Make sure the net amount arriving equals the amount shown. If the exchange deducts a fee from the amount, add it on top.

## Alternatives
Prefer automatic detection? Consider [Bitcoin](/blog/how-to-pay-with-bitcoin/), [Solana](/blog/pay-with-solana-sol/) or [USDT](/blog/usdt-erc20-vs-trc20-which-network/). All crypto payments use the [10% crypto discount](/blog/crypto-discount-how-it-works/).

## Related
Browse [disposable vapes](/shop/disposables/) or see [how to upload a payment screenshot](/blog/how-to-upload-a-payment-screenshot/). Adults 21+ only.`,
  faq: [["Is BEP20 the same as BNB Smart Chain?", "Yes. BEP20 is the token standard used on BNB Smart Chain, which is the network you must choose."], ["Why is BNB confirmed manually?", "Automatic detection depends on available public data sources per network. Where it is not enabled, a screenshot lets us confirm quickly."]],
},
{
  slug: "pay-with-solana-sol", category: C, tags: ["solana", "sol", "crypto", "payments"], shop: ["vape-juice"], keywords: ["juice head"],
  title: "Paying With Solana (SOL): Quick Transfers, Tiny Fees",
  summary: "SOL transfers confirm in seconds. Learn how to pay your order with Solana and what to double-check before you press send.",
  body: `Solana (SOL) is one of the quickest payment options. Transfers usually confirm within seconds and cost a fraction of a cent.

## Choose SOL at checkout
Select Cryptocurrency, then Solana (SOL). The window shows the wallet address, a QR code and the SOL amount based on the live rate.

## Sending the payment
1. Open your Solana wallet.
2. Scan the QR or paste the address.
3. Enter the SOL amount shown. Because SOL's price changes, send promptly.
4. Confirm. The network fee is tiny, but keep a small balance for it.
5. Press "I have paid" in the payment window.

## Native SOL, not tokens
Send SOL itself. If you would rather use a stablecoin, choose [USDC on Solana](/blog/pay-with-usdc-on-solana/) instead.

## Detection
We look for an incoming SOL transfer matching your order value within the last few hours. Once it confirms, we email you and the order moves forward.

## Why people choose it
Speed and low cost, and the wallet experience is simple on mobile. The downside is price volatility, so stablecoins can be easier for exact amounts.

## If you made a mistake
Check [what to do if you sent the wrong network](/blog/sent-crypto-on-the-wrong-network/) and contact us from the [contact page](/contact/) with your order reference. See the full list of options in [payment methods compared](/blog/payment-methods-compared/). Browse [vape juice](/shop/vape-juice/). Adults 21+ only.`,
  faq: [["How long does a SOL payment take?", "Usually seconds, though your order status may take a short while to update after the transfer."], ["Is Solana a different thing from USDC?", "Yes. SOL is Solana's native coin, while USDC is a stablecoin that runs on the Solana network."]],
},
{
  slug: "how-to-buy-crypto-with-a-card", category: C, tags: ["moonpay", "buy crypto", "card", "beginners"], shop: ["disposables"], keywords: ["geek bar"],
  title: "No Crypto? How to Buy It With a Card (MoonPay and Alternatives)",
  summary: "Never bought crypto before? Follow this beginner guide to buy Bitcoin, USDT or other coins with a card and send them to pay your order.",
  body: `You do not need to own crypto to use our crypto checkout. You can buy it first with a card or bank transfer from a service such as MoonPay, Coinbase, Transak or Changelly, then send it to the address shown at checkout.

## Why bother
Crypto and gift card payments get a discount at checkout. For many orders the saving is larger than the extra fees of buying crypto.

## Step 1: open the payment window
At checkout, choose Cryptocurrency and the coin you want to pay with. The window includes a "Don't have this coin?" section with a MoonPay button and alternatives.

## Step 2: buy the coin
On the provider's site, pick the same coin and, where asked, the same network as in our window. Enter the amount. Allow a little extra for the provider's fee and the network fee. Complete card or bank payment and identity checks.

## Step 3: send it to us
When the provider asks where to send the coins, paste the address from our payment window. This step is the most important: double-check the first and last characters match, and choose the exact network.

## Step 4: press "I have paid"
Return to our window and press the button. We look for your transfer and confirm the order automatically on supported networks.

## Costs and timing
Provider fees vary and first-time purchases may need identity verification, which can take minutes to days. Start before you need the order. Stablecoins like [USDT](/blog/usdt-erc20-vs-trc20-which-network/) avoid price swings. For fee details see [network fees explained](/blog/crypto-network-fees-explained/). Browse [disposable vapes](/shop/disposables/). Adults 21+ only.`,
  faq: [["Should I worry about pasting a wallet address?", "Always verify the address against the one in our window and use the copy button. Never type it by hand."], ["Which provider is cheapest?", "Fees and limits vary and change often, so compare the final amount shown before you pay."]],
},
{
  slug: "what-is-a-crypto-network", category: C, tags: ["crypto", "network", "basics", "beginners"], shop: ["disposables"], keywords: ["foger"],
  title: "What Is a Crypto Network, and Why Does It Matter When You Pay?",
  summary: "The same coin can live on several blockchains. Learn what a network is and why choosing the right one decides whether your payment arrives.",
  body: `When you pay with crypto you choose a coin and a network. The network is the blockchain that carries the transfer, and getting it right is the single most important step.

## Coin versus network
Bitcoin only lives on the Bitcoin network. But a stablecoin like USDT exists on several, including Ethereum and Tron. They are the same token, issued on different blockchains, each with its own address format and rules.

## Why a wrong network is a problem
An address on one network is not valid on another, even if it looks similar. Sending on the wrong network can mean the funds never reach us, and sometimes they cannot be recovered at all. Read [what to do after a wrong-network send](/blog/sent-crypto-on-the-wrong-network/).

## How to spot the network
The payment window states the network next to the address, for example "Tron (TRC20)" or "Solana (SOL)". Exchanges show similar labels when you withdraw. Match them exactly.

## Address formats
- Bitcoin addresses start with bc1, 1 or 3.
- Ethereum and BNB Smart Chain addresses start with 0x.
- Tron addresses start with T.
- Solana addresses are long base58 strings.

## Fees vary by network
Some networks cost cents, others dollars. See [network fees explained](/blog/crypto-network-fees-explained/) for details.

## Takeaway
Pick the network in our window, match it in your wallet, copy the address with the copy button and send. For a worked example, read [USDT on ERC20 or TRC20](/blog/usdt-erc20-vs-trc20-which-network/). Browse [disposable vapes](/shop/disposables/). Adults 21+ only.`,
  faq: [["Can I tell the network from the address?", "Often, yes. The first characters and length differ, but always rely on the network label in the payment window."], ["Do exchanges list networks?", "Yes. When you withdraw, an exchange asks you to choose a network, and it must match ours."]],
},
{
  slug: "crypto-discount-how-it-works", category: C, tags: ["discount", "crypto", "gift cards", "savings"], shop: ["disposables", "vape-juice"], keywords: ["pod juice"],
  title: "The 10% Crypto and Gift Card Discount: How It Works",
  summary: "Pay with crypto or a gift card and save 10% on your product total. See how the discount interacts with shipping and the free-shipping threshold.",
  body: `We offer a 10% discount when you pay by cryptocurrency or gift card. It is applied automatically at checkout once you pick one of these methods.

## What the discount applies to
The discount is calculated on your product subtotal. Shipping is added after the discount. You can see each line in the order summary on the checkout page.

## Free shipping and the discount
Our free-shipping offer applies to orders of $200 or more after discount and before tax. That means a $215 cart paid by crypto becomes $193.50 after the discount, which is under the threshold, so shipping is added. Check the order summary before you pay. Details are in the [shipping policy](/shipping/).

## Example
A $150 cart paid by crypto: $15 discount, $135 product total, plus the standard flat shipping fee. The same cart paid with Cash App has no discount.

## Which methods qualify
- Cryptocurrency (BTC, USDT, USDC, ETH, BNB, SOL)
- Gift cards (Apple, Razer Gold, Paysafe, Sephora, Macy's)
Cash App, Apple Pay and Chime do not carry the discount.

## Is it worth the extra steps?
If you already hold crypto, definitely. If you must buy it first, factor in the provider's fees; see [buying crypto with a card](/blog/how-to-buy-crypto-with-a-card/). For gift cards, see [how gift card payment works](/blog/how-gift-card-payment-works/).

## Compare everything
Our [payment methods comparison](/blog/payment-methods-compared/) lays out speed, fees and discounts. Browse [disposable vapes](/shop/disposables/) and [vape juice](/shop/vape-juice/). Adults 21+ only.`,
  faq: [["Can I combine the discount with other offers?", "Promotions are not combined unless stated. The discount shown at checkout is the one that applies."], ["Is the discount taken off shipping too?", "No. It applies to the product subtotal only."]],
},
{
  slug: "how-we-detect-your-crypto-payment", category: C, tags: ["crypto", "verification", "payments", "blockchain"], shop: ["disposables"], keywords: ["raz"],
  title: "How We Detect Your Crypto Payment Automatically",
  summary: "After you press I have paid, we look for your transfer on the blockchain. Here is how matching works, what we check and when a human steps in.",
  body: `You should not have to wait for someone to read a screenshot. For most networks, we match payments to orders automatically.

## What happens when you press "I have paid"
Your order is created and you are taken to a status page. From there, our system reads public blockchain data for the shop wallet on the network you chose and looks for an incoming transfer that fits your order.

## What we check
- **Network and address:** the transfer must arrive at the right wallet on the right network.
- **Amount:** the USD value of the transfer must be close to your order total, with a small tolerance for market movement.
- **Time:** it must be recent, shortly before or after you placed the order.
- **Uniqueness:** a single transaction can pay only one order.

## States you may see
- **Waiting:** nothing matching yet.
- **Detected:** a transfer is visible but not fully confirmed.
- **Confirmed:** matched and confirmed; you get an email.
- **Underpaid:** we found a payment that is short of the total. See [why that happens](/blog/why-your-crypto-payment-shows-underpaid/).

## When a human steps in
On networks where automatic detection is not available, or when amounts do not match, a team member checks your screenshot and the transaction hash. You can add both on the status page; see [uploading a payment screenshot](/blog/how-to-upload-a-payment-screenshot/).

## Privacy
We only use public blockchain data and do not ask for private keys or seed phrases. Never share those with anyone.

## Ready to pay?
Start with [how to pay with Bitcoin](/blog/how-to-pay-with-bitcoin/) or compare [payment methods](/blog/payment-methods-compared/). Adults 21+ only.`,
  faq: [["Do I need to upload a screenshot?", "Not usually for automatic networks, but it is a useful backup if confirmation is slow."], ["What if my payment is not found?", "Check that you used the right network and address, then upload your transaction hash or screenshot and we will review it."]],
},
{
  slug: "send-crypto-from-an-exchange-to-a-wallet", category: C, tags: ["exchange", "withdraw", "crypto", "beginners"], shop: ["vape-kits"], keywords: ["pod salt"],
  title: "Sending Crypto From an Exchange: Withdrawal Steps and Pitfalls",
  summary: "Paying from an exchange account? Here is how to withdraw to our address correctly, including network selection, fees and minimums.",
  body: `Many people hold crypto on an exchange rather than a private wallet. You can pay from there, as long as the exchange allows withdrawals to external addresses.

## Open the withdraw screen
In your exchange, find Withdraw or Send, then pick the coin. Do not use an internal transfer or "pay a friend" feature, because those only work between users of the same platform.

## Paste the address
Copy the address from our payment window with the copy button and paste it. Compare the first and last four characters.

## Choose the network
This is where most mistakes happen. Pick the network shown in our window, such as Tron (TRC20), Bitcoin or Solana. Exchanges often default to a different one.

## Enter the amount
Our window shows the amount to send. Exchanges deduct a withdrawal fee, either from the amount or on top. Make sure the amount that arrives equals the figure shown. If necessary, add the fee to your withdrawal amount.

## Confirm and complete checks
Exchanges often send an email or two-factor code. Approve it, then wait for the transaction ID. You can add that ID on our status page; see [uploading a payment screenshot](/blog/how-to-upload-a-payment-screenshot/).

## Minimums and delays
Some exchanges apply minimum withdrawals or delay new addresses. Plan ahead. Learn about costs in [network fees explained](/blog/crypto-network-fees-explained/).

## Another route
If your exchange will not allow external withdrawals, try buying crypto elsewhere; see [buying with a card](/blog/how-to-buy-crypto-with-a-card/). Browse [vape kits](/shop/vape-kits/). Adults 21+ only.`,
  faq: [["Can I pay using an exchange's internal transfer?", "No. Internal transfers only work between accounts on the same platform. Use an on-chain withdrawal to our address."], ["Why did my exchange take so long?", "Security holds, new address checks or network congestion can delay a withdrawal. Contact the exchange if it exceeds the stated time."]],
},
];
