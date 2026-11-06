export default {
"what-is-a-crypto-network": `## A worked example: two ways to pay with USDT
Imagine you hold 135 USDT and want to pay an order. At checkout you choose Cryptocurrency, then USDT, and then you see two network choices. If your balance sits on an exchange that offers both, you compare the withdrawal fees: Tron might charge 1 USDT and Ethereum 10 USDT. You choose Tron (TRC20), the payment window shows an address that starts with T and the label Tron (TRC20), and you withdraw 136 USDT so that 135 arrives after the fee. If instead your wallet already holds USDT on Ethereum, you choose Ethereum (ERC20), the window shows an address that starts with 0x and you pay the gas fee in ETH. Both routes lead to the same result, a confirmed order, but the cost and the steps differ. The only wrong move is to take an address from one route and use it with the network of the other.

## Why networks exist at all
Different blockchains were built for different goals. Bitcoin focuses on simple, secure value transfer. Ethereum adds programmable contracts, which is how tokens such as USDT and USDC exist there. Tron and Solana were designed for speed and low cost. BNB Smart Chain is run by a large exchange ecosystem and offers low fees. Because each chain is independent, companies that issue stablecoins deploy them on several chains to reach more users, and that is why you see the same token name on several networks. Understanding that each network is a separate system is the key to never mixing them up.`,

"crypto-network-fees-explained": `## A worked example: the same $150 order on three networks
Suppose your order is $150 before the discount, so the 10% crypto discount is $15.00 and the product total is $135.00, plus $15 shipping because it is under $200, making $150.00 due. Paying in USDC on Solana costs a fraction of a cent in fees, so you keep almost all of the $15 saving. Paying in USDT on Tron through an exchange with a flat 1 USDT fee costs $1, so you keep $14. Paying in USDT on Ethereum in a busy period with a $10 gas fee costs $10, so you keep $5. The discount is identical, but the net saving is very different, which is why choosing the network with sensible fees is worth a minute of thought.

## When a higher fee is worth it
Sometimes paying a higher fee makes sense. If you need a payment to confirm quickly and the network is busy, a higher fee can be the difference between minutes and hours. If your funds are already on a particular network and moving them would cost more than the fee, it can be cheaper to pay the fee than to bridge. And if the order is large, a fee that looks big in absolute terms is small relative to the 10% saving. The goal is not always the lowest fee, but the best overall outcome for your order.`,

"send-crypto-from-an-exchange-to-a-wallet": `## Security habits for exchange withdrawals
Exchange withdrawals are a common target for fraud, so a few habits help. Enable two-factor authentication on your exchange account, preferably with an authenticator app rather than text messages. Use a strong, unique password. Be wary of emails or messages that claim your withdrawal is blocked and ask you to click a link or share a code, because genuine exchanges do not ask for your codes. Type the exchange's address into your browser yourself instead of following links. And never share your recovery details with anyone. These habits protect your funds whether or not you are paying us.

## How long should you allow?
If your account is verified and the address is not new, a withdrawal can arrive in minutes. If you are adding a new address, expect a possible security hold of several hours or a day on some exchanges. If you are a new user waiting for verification, allow days. Plan around these delays, especially if you want your order to enter processing quickly. If timing is tight, a gift card or an app payment may be quicker; see [payment methods compared](/blog/payment-methods-compared/).`,

"scan-wallet-qr-code-and-copy-address": `## Building a reliable habit for every payment
The best protection against address errors is a routine you follow every time. Open the payment window, scan or copy the address, paste it, read the first four and last four characters aloud or in your head, check the network label, enter or confirm the amount, and only then press send. The routine takes under thirty seconds and removes nearly every address mistake. If you ever skip a step because you are in a hurry, that is exactly the moment errors happen, so slow down on larger payments.

## Using more than one device
Some people keep the payment window on a computer and send from a phone. That works well, because the phone scans the code directly from the screen. Just make sure that the window you are looking at is the current one, that it has not expired and that you are not mixing it up with a window from an earlier order. Each order has its own reference, address details and amount, so always match the order reference on screen with the order you are paying.`,

"sent-crypto-on-the-wrong-network": `## A short checklist for when you are stressed
Mistakes feel urgent, and urgency leads to more mistakes. Use this calm sequence. First, breathe and stop sending. Second, write down the hash, the coin, the network, the amount, the time and the address. Third, take screenshots. Fourth, check your wallet or exchange to see whether the transfer is complete or failed. Fifth, contact us with your order reference and those details. Sixth, contact your exchange or wallet support. Seventh, wait for our reply before you try any other payment. Following the steps in order keeps you from making a second error while the first is being sorted out.

## How we handle these cases
When you contact us, we look at the blockchain data for the transaction, confirm which network and address it went to and check whether we control that address on that chain. We then tell you plainly what we found. If the transfer is recoverable, we explain the steps and any costs, and we proceed only with your agreement. If it is not, we say so, and we help you complete your order another way. In every case we keep your order open for a reasonable time so that you do not lose your place while we sort it out.`,

"why-your-crypto-payment-shows-underpaid": `## Reading the status page
The status page shows your order total, the amount received and the remaining balance in a simple layout. If the received amount is zero, no matching transfer has been found yet, which is a different state from underpaid. If the received amount is positive but below the total, the page shows underpaid and the difference. If the received amount equals or exceeds the total within tolerance, the page shows detected or confirmed. Reading these three figures tells you immediately what to do next, and it is worth checking them before you contact us, because the answer is often visible right there.

## Why we allow a tolerance at all
Crypto prices can move in the seconds between when the window shows a quote and when your transfer is confirmed. A strict match to the cent would reject honest payments that were correct when sent. The tolerance is deliberately small, so it does not let meaningful shortfalls through, but it prevents trivial movement from causing trouble. That balance keeps matching fair for you and accurate for us.`,

"how-to-upload-a-payment-screenshot": `## A quick guide to good screenshots on each device
On an iPhone, press the side button and the volume up button together to take a screenshot, then find it in Photos. On most Android phones, press the power and volume down buttons together. On a Windows computer, use the Snipping Tool or press the Windows key, Shift and S. On a Mac, press Command, Shift and 4. Take the screenshot while the confirmation is on screen, check it is readable and then upload it. If you are photographing a physical card or receipt, place it flat on a plain surface in good light, hold the phone directly above it and tap to focus before you take the picture.

## What not to upload
Do not upload images that show unrelated private information, such as other people's messages, your full bank statement or your passwords. Crop to the payment. Do not upload edited images, because filters and markups can make a genuine screenshot look altered. And do not upload your wallet recovery phrase or private keys under any circumstances; we never need them, and no genuine process does.`,

"crypto-payment-faq": `## A short glossary
- **Wallet:** an app or device that holds your keys and lets you send and receive crypto.
- **Exchange:** a platform where you can buy, sell and hold crypto, and often withdraw it to a wallet.
- **Address:** where a payment is sent, like an account number for one network.
- **Network:** the blockchain that carries a transfer, such as Bitcoin, Ethereum, Tron, Solana or BNB Smart Chain.
- **Transaction hash:** a unique code for a transfer, also called a transaction ID or TXID.
- **Gas or network fee:** the cost of processing a transaction, paid to the network.
- **Stablecoin:** a coin designed to track the US dollar, such as USDT or USDC.
- **Confirmation:** a block added to the chain that includes your transaction.

If any of these terms is new, read [what is a crypto network](/blog/what-is-a-crypto-network/) and [crypto network fees explained](/blog/crypto-network-fees-explained/) before you pay. Taking a few minutes to learn the vocabulary makes the payment window much easier to follow.`,
};
