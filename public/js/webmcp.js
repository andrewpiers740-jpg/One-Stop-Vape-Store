(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      { name: "search_products", description: "Search One Stop Vape products by keyword, category, or price", inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string" }, max_price: { type: "number" } } }, execute: async ({ query, category, max_price }) => { const params = new URLSearchParams(); if (query) params.set('q', query); if (category) params.set('category', category); if (max_price) params.set('max_price', max_price); const res = await fetch(`https://onestopvapestore.com/api/products?${params}`); return res.json(); } },
      { name: "browse_products", description: "Browse products by category", inputSchema: { type: "object", properties: { category: { type: "string" } } }, execute: async ({ category }) => { const url = category ? `https://onestopvapestore.com/shop/${category}/` : `https://onestopvapestore.com/shop/`; window.location.href = url; return { url }; } },
      { name: "order_via_whatsapp", description: "Initiate a WhatsApp order. Minimum order $100. Human completes.", inputSchema: { type: "object", properties: { message: { type: "string" } } }, execute: async ({ message }) => { const greeting = "Hi One Stop Vape Store, "; const url = `https://wa.me/17747341372?text=${encodeURIComponent(greeting + (message || ''))}`; window.open(url, '_blank'); return { url }; } }
    ]
  });
})();
