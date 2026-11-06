// Method-specific closing sections for the batch-3 payment guides (timeline + security), plus one scenario walkthrough per post.
const timeline = (method, detail) => `## What happens after you pay with ${method}
${detail} Once your payment is confirmed, you receive an email and your order status changes to payment confirmed. The order then enters processing, which takes 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse. When it ships, you receive a tracking email, and the regional carrier delivers it. An adult aged 21 or older must sign on delivery and may be asked to show photo ID, so choose an address where that is possible. You can follow every stage from the private link in your order email, and the meaning of each status is explained in [order status meanings](/blog/order-status-meanings/). If you need to change something, read [how to change or cancel an order](/blog/how-to-change-or-cancel-an-order/) before your order ships.`;

const security = (method, extra) => `## Staying protected when you pay with ${method}
Only trust payment instructions that come through our official email, our WhatsApp number or your private order page. ${extra} We never ask for your passwords, PINs, card numbers, private keys or recovery phrases, and no genuine order needs them. Be wary of anyone who contacts you out of the blue claiming to represent the store, offers a different address or account to pay or pushes you to pay quickly outside the order. If a message does not match your order number and amount exactly, stop and contact us through the [contact page](/contact/) before you send anything. For more on keeping your account details secure, see [gift card code security tips](/blog/gift-card-code-security-tips/) and [why we need your email and phone](/blog/why-we-need-your-email-and-phone/).`;

export default {
"pay-with-ethereum-eth": `${timeline("Ethereum", "Ethereum transfers are matched to your order automatically, so there is usually nothing more for you to do after pressing the button.")}

${security("Ethereum", "Always compare the address on your wallet screen with the address in the window before confirming, because a single wrong character sends funds somewhere else.")}`,

"pay-with-bnb-smart-chain": `${timeline("BNB", "Because BNB payments are confirmed by our team, the screenshot and transaction hash you upload are what we check against the blockchain, so make sure they are clear and complete.")}

${security("BNB", "Check that the network in your exchange or wallet says BNB Smart Chain (BEP20) and that the address begins with 0x, and do not use a withdrawal address from any message that did not come from us.")}

## A worked example
Suppose your cart is $240. Paying with BNB applies the 10% discount, so the product total is $216.00 and shipping is free because the amount after discount is above $200. In the payment window, that dollar total is converted to BNB at the live rate. Say the quote is 0.36 BNB. Your exchange charges a withdrawal fee of 0.0005 BNB and deducts it from what you enter, so you enter 0.3605 BNB to make sure 0.36 BNB arrives. You select BNB Smart Chain (BEP20), paste the address, confirm, and then press "I have paid" and upload a screenshot with the transaction hash. Because the amount that arrived matches the quote, the check is quick.`,

"pay-with-solana-sol": `${timeline("Solana", "Solana transfers are usually detected within seconds to a couple of minutes, and the status page updates on its own.")}

${security("Solana", "Check that you are sending the asset you chose, SOL or USDC, and that your wallet is on the Solana network before you confirm.")}

## A worked example
Suppose your cart is $180. Paying with SOL applies the 10% discount, so the product total is $162.00. Because that is under $200, the flat $15 shipping fee applies, and the amount due is $177.00. In the payment window, $177.00 is converted to SOL at the live rate. Say the quote is 1.15 SOL. You open your wallet, scan the QR code, enter 1.15 SOL and confirm. The fee is a fraction of a cent. You press "I have paid", and the status page moves from payment sent to detected to confirmed within a couple of minutes. If SOL's price rose slightly between the quote and your payment, the small tolerance covers it, and you do not need to do anything.

## When a stablecoin may suit you better
If you are paying a larger order and would rather not worry about the price of SOL moving, USDC on Solana gives the same speed and tiny fees with a stable amount. Choose it at checkout instead of SOL. See [paying with USDC on Solana](/blog/pay-with-usdc-on-solana/). For a side-by-side view of every option, read [payment methods compared](/blog/payment-methods-compared/).`,

"pay-with-usdc-on-solana": `${timeline("USDC on Solana", "USDC transfers on Solana are usually detected within seconds to a couple of minutes, and the status page updates on its own.")}

${security("USDC", "Check that your wallet or exchange is set to the Solana network and the USDC asset before you confirm, because USDC on another network will not reach our address.")}

## A worked example
Suppose your cart is $320. Paying with USDC applies the 10% discount, so the product total is $288.00, and shipping is free because the amount after discount is above $200. The payment window shows 288 USDC. In a self-custody wallet holding USDC and a few cents of SOL, you choose Send, select USDC, paste the address, enter 288 and confirm. The fee is a fraction of a cent, paid in SOL. If you use an exchange that deducts a 1 USDC withdrawal fee from the amount, enter 289 so that 288 arrives. You press "I have paid", the status page detects the transfer and your order is confirmed. Because USDC tracks the dollar, there is no rate movement to worry about.

## Comparing USDC on Solana with the alternatives
- **USDT on Tron (TRC20):** also cheap and fast, widely supported by exchanges. See [USDT ERC20 vs TRC20](/blog/usdt-erc20-vs-trc20-which-network/).
- **SOL:** the same network and speed, but the amount moves with the price. See [paying with Solana](/blog/pay-with-solana-sol/).
- **Bitcoin:** the most widely held, but slower to confirm. See [how to pay with Bitcoin](/blog/how-to-pay-with-bitcoin/).`,

"how-to-buy-crypto-with-a-card": `${timeline("crypto you bought with a card", "After you send the coins to our address and press the button, we look for your transfer and match it to your order, automatically on most networks and with a manual check on others.")}

${security("crypto", "Only buy from a regulated provider you trust, type the provider's address into your browser yourself and be wary of links in unexpected messages offering to sell you crypto for an order.")}`,

"apple-pay-payments-guide": `${timeline("Apple Pay", "After you upload your screenshot, we check our account for your payment and match it to your order.")}

${security("Apple Pay", "Check the recipient name on the Apple Pay confirmation screen against the details on your private payment page, and do not pay anyone who sends different details.")}

## A worked example
Suppose your cart is $130. Apple Pay carries no discount, so the product total is $130.00. Because that is under $200, the flat $15 shipping fee applies, and the amount due is $145.00. You choose Apple Pay at checkout and place the order. A few minutes later you receive an email with the details and your private payment page. You open your Wallet, send exactly $145.00 to the details shown and type your order ID in the note. You take a screenshot of the confirmation and upload it from the private page. During business hours we check our account, mark the order paid and email you. Compare that with paying by crypto: the same cart would be $117.00 plus $15 shipping, so $132.00. See [the 10% discount guide](/blog/crypto-discount-how-it-works/).`,

"chime-payments-guide": `${timeline("Chime", "After you upload your screenshot, we check our account for your payment and match it to your order.")}

${security("Chime", "Check the recipient on the Chime confirmation screen against the details on your private payment page, and do not pay anyone who sends different details.")}

## A worked example
Suppose your cart is $210. Chime carries no discount, so the product total is $210.00 and, because it is above $200, shipping is free. The amount due is $210.00. You choose Chime at checkout and place the order. A few minutes later you receive an email with the details and your private payment page. In the Chime app you send exactly $210.00 and put your order ID in the memo. You screenshot the confirmation and upload it. We confirm the payment and email you. If you had paid by crypto, the total would be $189.00 plus $15 shipping, so $204.00, which shows how the free-shipping threshold interacts with the discount. See [the 10% discount guide](/blog/crypto-discount-how-it-works/).`,

"payment-methods-compared": `## Choosing in practice: three example orders
### A $110 first order from someone with no crypto
The standard-price total with Cash App, Apple Pay or Chime is $110.00 plus $15 shipping, so $125.00. A gift card would save $11.00 on the product total, giving $99.00 plus $15 shipping, or $114.00. If the gift card is easy to buy, it is cheaper. If not, use the app you already trust.

### A $260 order from someone who holds USDC
With crypto the product total is $234.00 after the discount, and shipping is free because it is above $200. That is $26.00 less than the same order paid by an app. The network fee on Solana is a fraction of a cent, so almost the entire saving is kept.

### A $205 order from someone choosing between crypto and Cash App
With Cash App the total is $205.00 and shipping is free. With crypto the product total is $184.50, which is under $200, so shipping of $15 is added, giving $199.50. Crypto is still cheaper by $5.50, but the saving is smaller than the headline 10% because of the shipping fee. That is why it pays to check the order summary before you choose.

## Common mistakes when choosing a method
- **Choosing by habit without checking the total.** The order summary shows each method's total, so compare before you pay.
- **Ignoring fees on the way in.** Buying crypto or a gift card can cost more than the discount on a small order.
- **Forgetting about timing.** Identity checks on a new exchange account can take days, so start early or use a method you already have.
- **Using unofficial details.** Pay only to details from our official channels.
- **Paying the wrong amount.** Send the exact amount shown, with your order ID where the method allows a note.

## After you choose
Whatever you pick, the next steps are in the individual guides, and you can switch method before you pay by contacting us with your order number. For help choosing, message us on WhatsApp or through the [contact page](/contact/).`,
};
