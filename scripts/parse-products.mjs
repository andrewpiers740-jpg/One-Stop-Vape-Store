import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public/assets/aistudio");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".csv"));

function parseFullCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentVal = "";
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = "";
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && text[i + 1] === '\n') {
        i++;
      }
      currentRow.push(currentVal.trim());
      currentVal = "";
      if (currentRow.some(val => val.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentVal += c;
    }
  }
  if (currentVal.length > 0 || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.some(val => val.length > 0)) {
      rows.push(currentRow);
    }
  }
  return rows;
}

const productsMap = new Map();
const brandCounts = {};

for (const file of files) {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
  const rows = parseFullCSV(content);
  if (rows.length <= 1) continue;
  
  const header = rows[0];
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 3) continue;
    
    const obj = {};
    for (let h = 0; h < header.length; h++) {
      obj[header[h]] = row[h] || "";
    }
    
    let title = obj["product"] || "";
    if (!title && obj["data"] && obj["data"].length < 75 && !obj["data"].includes("http")) {
      title = obj["data"];
    }
    if (!title && obj["name"] && obj["name"].length < 75 && !obj["name"].includes("http")) {
      title = obj["name"];
    }
    
    // Validate title: clean up and filter out spurious fragment rows
    if (!title || title.length < 3 || title.length > 80 || title.includes("http") || title.includes("stencil")) {
      continue;
    }
    title = title.replace(/\s+/g, " ").trim();
    
    const url = obj["web_scraper_start_url"] || "";
    let brand = obj["brand"] || "";
    const lowerTitle = title.toLowerCase();
    const lowerUrl = url.toLowerCase();
    
    const badBrands = ["single", "10 pack", "5 pack", "options", "quick view", "view"];
    if (!brand || badBrands.includes(brand.toLowerCase())) {
      if (lowerTitle.includes("geek bar") || lowerUrl.includes("geek-bar")) brand = "Geek Bar";
      else if (lowerTitle.includes("lost mary") || lowerUrl.includes("lost-mary")) brand = "Lost Mary";
      else if (lowerTitle.includes("raz") || lowerUrl.includes("raz")) brand = "RAZ";
      else if (lowerTitle.includes("foger") || lowerUrl.includes("foger")) brand = "Foger";
      else if (lowerTitle.includes("fifty bar") || lowerUrl.includes("fifty-bar")) brand = "Fifty Bar";
      else if (lowerTitle.includes("pod juice") || lowerUrl.includes("pod-juice")) brand = "Pod Juice";
      else if (lowerTitle.includes("pod salt") || lowerUrl.includes("pod-salt")) brand = "Pod Salt";
      else if (lowerTitle.includes("horizontech") || lowerUrl.includes("horizontech")) brand = "HorizonTech";
      else if (lowerTitle.includes("rinnbar") || lowerUrl.includes("rinnbar")) brand = "Rinnbar";
      else if (lowerTitle.includes("rifbar") || lowerUrl.includes("rifbar")) brand = "Rifbar";
      else if (lowerTitle.includes("shot caller") || lowerUrl.includes("shot-caller")) brand = "Shot Caller";
      else if (lowerTitle.includes("x-posed") || lowerUrl.includes("x-posed")) brand = "X-Posed";
      else if (lowerTitle.includes("ut bar") || lowerTitle.includes("ut clear") || lowerUrl.includes("ut-bar")) brand = "UT Bar";
      else if (lowerTitle.includes("off stamp") || lowerUrl.includes("off-stamp")) brand = "Off Stamp";
      else if (lowerTitle.includes("breeze") || lowerUrl.includes("breeze")) brand = "Breeze";
      else if (lowerTitle.includes("mr fog") || lowerUrl.includes("mr-fog")) brand = "Mr Fog";
      else if (lowerTitle.includes("ebcreate") || lowerTitle.includes("bc5000") || lowerUrl.includes("ebcreate")) brand = "EB Create";
      else if (lowerTitle.includes("cloud nurdz")) brand = "Cloud Nurdz";
      else if (lowerTitle.includes("coastal clouds")) brand = "Coastal Clouds";
      else if (lowerTitle.includes("juice head") || lowerUrl.includes("juice-head")) brand = "Juice Head";
      else if (lowerTitle.includes("fruit monster") || lowerTitle.includes("custard monster") || lowerTitle.includes("jam monster")) brand = "Monster Labs";
      else if (lowerTitle.includes("oilio") || lowerUrl.includes("oilio")) brand = "Oilio";
      else if (lowerTitle.includes("suicide bunny")) brand = "Suicide Bunny";
      else if (lowerTitle.includes("naked") || lowerTitle.includes("nkd 100")) brand = "Naked 100";
      else if (lowerTitle.includes("fume") || lowerUrl.includes("fume")) brand = "Fume";
      else if (lowerTitle.includes("float") || lowerTitle.includes("flum") || lowerUrl.includes("float")) brand = "Flum Float";
      else if (lowerTitle.includes("air factory")) brand = "Air Factory";
      else if (lowerTitle.includes("7daze") || lowerTitle.includes("reds apple")) brand = "7 Daze";
      else brand = "Specialty";
    }
    
    brandCounts[brand] = (brandCounts[brand] || 0) + 1;
    
    let rawPrice = obj["price"] || obj["price2"] || "$15.99";
    let basePrice = 16.99;
    const priceMatch = rawPrice.match(/\$([0-9]+(\.[0-9]{2})?)/);
    if (priceMatch) {
      basePrice = parseFloat(priceMatch[1]);
    }
    
    let image = obj["image"] || "";
    if (image.includes("/stencil/80w/")) {
      image = image.replace("/stencil/80w/", "/stencil/500w/");
    }
    
    let category = "disposables";
    let subcategory = "smart-disposables";
    
    const isEJuice = lowerTitle.includes("ejuice") || lowerTitle.includes("e-juice") || lowerTitle.includes("eliquid") || lowerTitle.includes("e-liquid") || lowerTitle.includes("salts") || lowerTitle.includes("100ml") || lowerTitle.includes("60ml") || lowerTitle.includes("30ml") || lowerTitle.includes("vape juice") || lowerUrl.includes("vape-juice") || lowerTitle.includes("salt nic");
    
    if (isEJuice) {
      if (lowerTitle.includes("salt") || lowerTitle.includes("salts") || lowerTitle.includes("30ml") || lowerTitle.includes("35mg") || lowerTitle.includes("50mg") || lowerTitle.includes("55mg")) {
        category = "nic-salts";
        subcategory = "salt-nicotine-e-liquid";
      } else {
        category = "e-liquids";
        subcategory = "freebase-sub-ohm";
      }
    } else if (lowerTitle.includes("kit") || lowerTitle.includes("pod") || lowerTitle.includes("device") || lowerTitle.includes("system")) {
      category = "pod-systems";
      subcategory = "rechargeable-pod-kits";
    } else {
      category = "disposables";
      if (lowerTitle.includes("50k") || lowerTitle.includes("40k") || lowerTitle.includes("35k") || lowerTitle.includes("30k") || lowerTitle.includes("25k")) {
        subcategory = "ultra-high-puff";
      } else if (lowerTitle.includes("zero") || lowerTitle.includes("0mg")) {
        subcategory = "zero-nicotine";
      }
    }

    let desc = "";
    if (obj["name"] && obj["name"].length > 25 && obj["name"] !== title && !obj["name"].startsWith("Decrease") && !obj["name"].startsWith("Increase")) {
      desc = obj["name"].replace(/\s+/g, " ").trim();
    } else if (obj["data5"] && obj["data5"].length > 25 && !obj["data5"].startsWith("Decrease")) {
      desc = obj["data5"].replace(/\s+/g, " ").trim();
    }
    if (!desc || desc.length < 50) {
      desc = `Experience rich, long-lasting flavor with the authentic ${title} by ${brand}. Engineered with advanced dual mesh coils and smart indicator for smooth, consistent vapor every puff.`;
    }

    let badge = "Popular";
    if (lowerTitle.includes("zero") || lowerTitle.includes("0mg")) badge = "Zero Nicotine";
    else if (brand === "Geek Bar") badge = "Flagship";
    else if (lowerTitle.includes("50k") || lowerTitle.includes("40k") || lowerTitle.includes("slush")) badge = "Trending";
    else if (basePrice < 13) badge = "Best Value";
    else if (lowerTitle.includes("pro") || lowerTitle.includes("pulse x") || lowerTitle.includes("edition")) badge = "Premium";

    // Clean, bounded slug
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (slug.length > 55) {
      slug = slug.substring(0, 55).replace(/-$/, "");
    }

    if (!productsMap.has(slug)) {
      productsMap.set(slug, {
        id: "prod-" + (productsMap.size + 1),
        slug,
        title,
        brand,
        category,
        subcategory,
        price: basePrice,
        priceDisplay: `$${basePrice.toFixed(2)}`,
        rawPrice,
        image,
        description: desc,
        badge,
        inStock: true,
        nicotine: lowerTitle.includes("0mg") || lowerTitle.includes("zero") ? "0mg" : (lowerTitle.includes("20mg") ? "20mg" : (lowerTitle.includes("3mg") ? "3mg" : (lowerTitle.includes("6mg") ? "6mg" : "50mg (5%)"))),
        puffs: lowerTitle.includes("50k") ? "50,000 Puffs" : (lowerTitle.includes("40k") ? "40,000 Puffs" : (lowerTitle.includes("35k") ? "35,000 Puffs" : (lowerTitle.includes("30k") ? "30,000 Puffs" : (lowerTitle.includes("25k") ? "25,000 Puffs" : (lowerTitle.includes("15k") ? "15,000 Puffs" : (lowerTitle.includes("10k") ? "10,000 Puffs" : "High Capacity")))))),
      });
    }
  }
}

const allProducts = Array.from(productsMap.values());
console.log("Total unique products extracted:", allProducts.length);
console.log("Top Brands:", brandCounts);

const outputPath = path.join(process.cwd(), "src/data/products.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), "utf-8");
console.log("Saved products database to:", outputPath);
