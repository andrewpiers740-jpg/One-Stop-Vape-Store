const check = (items, tail) => `## A final checklist before you send
${items.map((x) => `- ${x}`).join("\n")}

${tail}`;

export default {
"pay-with-ethereum-eth": check(["Choose ETH on the Ethereum network, not a token and not another network.", "Compare the first and last characters of the address with the window.", "Make sure your balance covers the amount plus gas.", "Refresh the window if it has been open for a while."], "Taking a minute to run through the list prevents almost every problem we see. If something still looks wrong, contact us before you resend."),
"pay-with-bnb-smart-chain": check(["Select BNB Smart Chain (BEP20) as the network.", "Add any exchange withdrawal fee on top of the amount.", "Copy the address and amount with the copy buttons.", "Upload a clear screenshot and the transaction hash after you press the button."], "Because BNB is confirmed by our team, a complete screenshot and hash are the quickest way to get your order moving. If it is outside business hours, expect the check the next business morning."),
"pay-with-solana-sol": check(["Confirm you are sending SOL, or USDC if you chose that option.", "Keep a small SOL balance for the network fee.", "Scan the QR code or copy the address; never type it.", "Refresh the window if it has been open for a while."], "Solana is quick, so there is little waiting. If the status page still shows waiting after several minutes, add your transaction hash on the status page and contact us."),
"pay-with-usdc-on-solana": check(["Choose USDC and the Solana network in your wallet or exchange.", "Keep a few cents of SOL in a self-custody wallet for the fee.", "Add the exchange fee on top if it is deducted from the amount.", "Compare the address with the window before you confirm."], "USDC on Solana is one of the simplest crypto routes because the amount is stable and fees are tiny. If anything looks wrong, contact us before you resend."),
"how-to-buy-crypto-with-a-card": check(["Decide the coin and network first, using our payment window.", "Buy a little more than the order total to cover fees.", "Start identity verification early if you are new to the provider.", "Paste the address and check the first and last characters before you send."], "Buying crypto adds steps, but for a larger order the saving can be worth it. If you would rather avoid it, a gift card also earns the 10% discount, and app payments are available at the standard price."),
"apple-pay-payments-guide": check(["Place the order and wait for the details email.", "Pay the exact amount and put your order ID in the note.", "Upload a screenshot straight away.", "Keep the confirmation until the order is confirmed."], "Apple Pay orders move quickly in business hours once the screenshot is uploaded. If anything is unclear, ask before you pay."),
"chime-payments-guide": check(["Place the order and wait for the details email.", "Pay the exact amount and put your order ID in the memo.", "Upload a screenshot straight away.", "Keep the confirmation until the order is confirmed."], "Chime orders move quickly in business hours once the screenshot is uploaded. If anything is unclear, ask before you pay."),
"payment-methods-compared": `## Frequently asked questions about choosing a method
### Does the method change what I receive?
No. Every order ships the same way and carries the same returns rights, whichever method you use. Only the price, speed and steps differ.

### Can I use a different method for a second order?
Yes. Each order is independent, so you can use crypto one time and an app the next.

### Which method is best for wholesale orders?
Wholesale orders are arranged through the [wholesale page](/wholesale/) and the [wholesale ordering guide](/blog/wholesale-ordering-guide/), where payment options are explained for larger volumes.

### Where can I get help choosing?
Message us on WhatsApp, call or use the [contact page](/contact/), and tell us what you have available. We will point you to the quickest route.`,
};
