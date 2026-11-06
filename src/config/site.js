/**
 * One Stop Vape Store — Single Source of Truth
 */
export const SITE = {
  name: "One Stop Vape Store",
  legalName: "SV3 LLC",
  foundingDate: "2022-12",
  tagline: "Premium Vaping Essentials & Advanced Hardware",
  domain: "www.onestopvapestore.com", // primary host: Vercel redirects the apex to www
  description: "One Stop Vape Store (SV3 LLC, established December 2022) is the premier destination for premium disposable vapes, nixodine innovations, nicotine salts, nicotine pouches, and advanced pod systems with fast US shipping from Phoenix, Arizona.",
  primaryColor: "#0b6dff", // Logo electric blue
  accentColor: "#1fb4ff", // Logo cyan highlight
  logo: "/brand/logo-transparent.webp",
  gscVerification: "I'll set this up",
  indexNowKey: "6d7c406455fb4b66bc9010d5246997b3", // Static fallback key
  locale: "en-US",
  
  contact: {
    email: "sales@onestopvapestore.com",
    phone: "774-734-1372",
    whatsapp: "17747341372",
    whatsappDisplay: "+1 774-734-1372",
    location: "4908 E McDowell Road STE 103, Phoenix, Arizona 85008",
    country: "US",
    currency: {
      code: "USD",
      symbol: "$",
      locale: "en-US"
    }
  },
  
  order: {
    minOrder: 100,
    freeShippingThreshold: 200,
    flatShippingFee: 15, // Standard US rate
    cryptoDiscount: 10,
    giftCardDiscount: 10,
    paymentMethods: [
      "Crypto (BTC, USDT, USDC, ETH, BNB, SOL)",
      "Apple Pay",
      "Cash App",
      "Chime",
      "Gift Cards (Apple, Razer Gold, Paysafe, Sephora, Macy's)"
    ]
  },

  reply: {
    channels: { whatsapp: true, email: true },
    ownerEmailEnv: "ORDER_EMAIL", // falls back to contact.email
    brand: {
      primary: "#0b6dff",
      headerDark: "#09090b"
    },
    orderPrefix: "OSV",
    headerTagline: "Order Payment Details",
    dispatchLogisticsLine: "Fast Tracked Shipping via regional carriers from Phoenix, Arizona.",
    paymentMethodsDetail: [
      { id: "crypto", label: "Cryptocurrency", opening: "Please send the equivalent of {amount} in {crypto_type} to the following address:", closing: "Kindly send a screenshot of the transaction hash once completed." },
      { id: "applepay", label: "Apple Pay", opening: "Please send {amount} by Apple Pay to the following number:", closing: "Include your order ID {order_id} in the notes, then upload your receipt." },
      { id: "cashapp", label: "Cash App", opening: "Please send {amount} on Cash App to our $Cashtag:", closing: "Include your order ID {order_id} in the note, then screenshot the confirmation screen." },
      { id: "chime", label: "Chime", opening: "Please send {amount} on Chime to the following ChimeSign / details:", closing: "Include your order ID {order_id} in the memo, then upload your receipt." }
    ]
  },
  
  compliance: {
    ageGate: true,
    ageThreshold: 21,
    disclaimer: "Vaping products contain nicotine. Nicotine is an addictive chemical. You must be 21+ to purchase. Not for use by pregnant women or people with health conditions.",
    bannedTerms: ["safe", "healthy", "non-toxic", "guaranteed success", "therapeutic"],
    authority: "FDA / California State Law"
  }
};

export const CATEGORIES = [
  { name: "Vape Juice", slug: "vape-juice", description: "Premium e-liquids and nicotine salts.", image: "https://cdn11.bigcommerce.com/s-nkq7gqfv7z/images/stencil/500w/products/3906/7393/Cloud-Nurdz_Aloe-Grape_100ml_600x600_c1c187ff-84af-4668-9535-bd9171dcf9ca__32262.1782940263.png" },
  { name: "Coils & Pods", slug: "coils-pods", description: "Replacement coils and high-performance tanks.", image: "https://cdn11.bigcommerce.com/s-nkq7gqfv7z/images/stencil/2560w/products/3872/7339/Smok_RPM-4-Pod_600x600_eff7bf55-e4d9-43c9-a9bb-bf8510f7f462__16594.1782940169.png?c=1" },
  { name: "Disposable Vapes", slug: "disposables", description: "Long-lasting, pre-filled, and hassle-free disposable devices.", image: "https://cdn11.bigcommerce.com/s-nkq7gqfv7z/images/stencil/2560w/products/3352/6588/Breeze-Pro_Tobacco_Render_600x600_1d95fda0-02b7-4727-95a2-6a693e42cbaa__97184.1782938592.png?c=1" },
  { name: "Vape Kits", slug: "vape-kits", description: "Complete starter kits for new and advanced users.", image: "https://cdn11.bigcommerce.com/s-nkq7gqfv7z/images/stencil/2560w/products/4021/7528/GE7EC3_1__13095.1782940556.png?c=1" },
  { name: "Vaporizers", slug: "vaporizers", description: "High-quality dry herb and concentrate vaporizers.", image: "https://cdn11.bigcommerce.com/s-nkq7gqfv7z/images/stencil/2560w/products/4467/8252/Dr-Dabber_Switch-Go_Glass-Attachment_600x600_cb33521b-ec52-4c3b-a58c-40e6bc13a74b__71422.1782941820.png?c=1" },
  { name: "Nicotine Pouches", slug: "nic-pouches", description: "Tobacco-free nicotine pouches for any occasion.", image: "https://cdn11.bigcommerce.com/s-nkq7gqfv7z/images/stencil/2560w/products/4580/8420/Zyn_Wintergreen-Blast-11mg_600x600__77018.1785939540.png?c=1" },
  { name: "Nixodine", slug: "nixodine", description: "Alternative non-tobacco active formulations for advanced adult vapor enjoyment.", image: "https://cdn11.bigcommerce.com/s-nkq7gqfv7z/images/stencil/2560w/products/4284/7959/Juice-Head_iFlex_Strawberry-Banana_Render_600x600_f54e6ac2-a6e3-4218-98fc-b113a384168d__02690.1782941356.png?c=1" }
];

export const BRANDS = [
  "Geek Bar", "Lost Mary", "RAZ", "Foger", "Fifty Bar", "Pod Juice", "Pod Salt", "HorizonTech", "Mr Fog", "EB Create", "Cloud Nurdz", "Coastal Clouds", "Juice Head", "Monster Labs", "ZYN", "American Ice", "LUCY", "NOAT", "Hookah Labs", "Parfflo", "Geek Labs", "YOVO", "Rifbar", "Rinnbar", "Hotbox", "NIX Liquids"
];

