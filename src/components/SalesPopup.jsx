"use client";
import React, { useState, useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import products from "@/src/data/products.json";

const CUSTOMERS = [
  "Sarah M.", "David K.", "Jessica R.", "Michael B.", "Elena V.", 
  "Marcus T.", "Sophia L.", "James P.", "Olivia H.", "Robert N.",
  "Chloe S.", "Kevin W.", "Mia D.", "Lucas F.", "Ava G.",
  "Ethan C.", "Isabella J.", "Benjamin H.", "Amelia B.", "Jacob K."
];
const LOCATIONS = [
  "Austin, TX", "Miami, FL", "Seattle, WA", "Denver, CO", "Chicago, IL", 
  "Atlanta, GA", "Phoenix, AZ", "Boston, MA", "Portland, OR", "Dallas, TX"
];

export default function SalesPopup() {
  const [currentSale, setCurrentSale] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    let shownSignatures = JSON.parse(sessionStorage.getItem("shown-sales-signatures") || "[]");
    let usedCustomerIndices = JSON.parse(sessionStorage.getItem("shown-customer-indices") || "[]");

    const showNextSale = () => {
      let sale;
      let signature;
      let attempts = 0;
      
      do {
        // 1. Unique Customer
        let availableCustomers = CUSTOMERS.map((_, i) => i).filter(i => !usedCustomerIndices.includes(i));
        if (availableCustomers.length === 0) {
          usedCustomerIndices = [];
          availableCustomers = CUSTOMERS.map((_, i) => i);
        }
        const custIdx = availableCustomers[Math.floor(Math.random() * availableCustomers.length)];
        
        // 2. Weighted Tiered Cost
        const rand = Math.random();
        let min, max;
        if (rand < 0.75) { min = 100; max = 1000; }
        else if (rand < 0.95) { min = 1001; max = 2500; }
        else { min = 2501; max = 12000; }
        
        const targetTotal = Math.random() * (max - min) + min;
        
        // 3. Select Item
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.max(1, Math.round(targetTotal / product.price));
        const totalCost = (product.price * quantity);
        
        signature = `${custIdx}-${product.id}-${quantity}-${totalCost.toFixed(2)}`;
        
        sale = {
          name: CUSTOMERS[custIdx],
          location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
          product: product.title,
          quantity,
          totalCost: totalCost.toFixed(2),
        };
        attempts++;
      } while (shownSignatures.includes(signature) && attempts < 100);
      
      setCurrentSale(sale);
      setVisible(true);
      
      shownSignatures.push(signature);
      sessionStorage.setItem("shown-sales-signatures", JSON.stringify(shownSignatures));
      
      // Track customer usage
      const custIdx = CUSTOMERS.indexOf(sale.name);
      if(!usedCustomerIndices.includes(custIdx)) usedCustomerIndices.push(custIdx);
      sessionStorage.setItem("shown-customer-indices", JSON.stringify(usedCustomerIndices));

      setTimeout(() => setVisible(false), 8000);
    };

    showNextSale();
    const interval = setInterval(showNextSale, 15000);
    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed || !currentSale) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 z-40 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl transition-all duration-500 flex items-center gap-4 max-w-[340px] w-full
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <button 
        onClick={() => setDismissed(true)}
        className="absolute -top-2 -right-2 p-1 bg-zinc-800 rounded-full text-zinc-500 hover:text-white transition-colors"
      >
        <X size={12} />
      </button>
      
      <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center shrink-0 border border-zinc-800">
        <ShoppingBag className="text-emerald-500" size={20} />
      </div>

      <div className="flex flex-col gap-0.5 overflow-hidden">
        <p className="text-[11px] text-zinc-400 leading-tight">
          <span className="font-bold text-white">{currentSale.name}</span> from {currentSale.location} bought 
          <span className="font-bold text-white"> {currentSale.quantity}x {currentSale.product}</span> 
          <br/>
          for <span className="font-bold text-emerald-500">${currentSale.totalCost}</span>
        </p>
      </div>
    </div>
  );
}
