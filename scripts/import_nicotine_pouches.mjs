import fs from 'fs';

const PRODUCTS_FILE = 'src/data/products.json';
const POUCHES_CSV_FILE = 'public/assets/aistudio/vaping-com-2026-11-03-2__3__9e685561.csv';

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push(cur.trim());
      cur = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      row.push(cur.trim());
      if (row.some(field => field.length > 0)) {
        rows.push(row);
      }
      row = [];
      cur = '';
    } else {
      cur += c;
    }
  }
  if (cur.length > 0 || row.length > 0) {
    row.push(cur.trim());
    if (row.some(field => field.length > 0)) {
      rows.push(row);
    }
  }
  return rows;
}

function getBrand(title, colBrand, desc) {
  const t = title.toLowerCase();
  const d = desc.toLowerCase();
  if (t.includes('juice head') || d.includes('juice head')) return 'Juice Head';
  if (t.includes('zyn') || d.includes('zyn')) return 'ZYN';
  if (t.includes('american ice') || d.includes('american ice')) return 'American Ice';
  if (t.includes('noat') || d.includes('noat')) return 'NOAT';
  if (t.includes('alp') || t.includes('drifter') || d.includes('alp') || d.includes('drifter')) return 'Alp Drifter';
  if (t.includes('lucy') || d.includes('lucy')) return 'LUCY';
  if (t.includes('ammo') || d.includes('ammo')) return 'AMMO';
  if (t.includes('zimo') || d.includes('zimo')) return 'ZIMO';
  if (t.includes('sesh') || d.includes('sesh')) return 'Sesh';
  if (t.includes('zone') || d.includes('zone')) return 'Zone';
  if (t.includes('fre') || d.includes('fre')) return 'Fre';
  if (t.includes('rogue') || d.includes('rogue')) return 'Rogue';
  if (t.includes('on!') || d.includes('on!')) return 'on!';
  if (t.includes('velo') || d.includes('velo')) return 'Velo';
  if (t.includes('bridge') || d.includes('bridge')) return 'Bridge';
  if (colBrand && colBrand !== 'new product' && colBrand !== 'new' && colBrand.length > 1) return colBrand;
  return title.split(' ').slice(0, 2).join(' ');
}

function getFlavor(title, desc) {
  const lower = (title + ' ' + desc).toLowerCase();
  if (lower.includes('mint') || lower.includes('peppermint') || lower.includes('spearmint') || lower.includes('wintergreen') || lower.includes('chill')) return 'Mint & Menthol';
  if (lower.includes('citrus') || lower.includes('lime') || lower.includes('lemon') || lower.includes('orange')) return 'Citrus Fruit';
  if (lower.includes('berry') || lower.includes('blueberry') || lower.includes('raspberry') || lower.includes('cherry')) return 'Berry';
  if (lower.includes('peach') || lower.includes('mango') || lower.includes('watermelon') || lower.includes('apple')) return 'Sweet Fruit';
  if (lower.includes('coffee') || lower.includes('espresso') || lower.includes('cinnamon')) return 'Warm & Spiced';
  if (lower.includes('smooth') || lower.includes('original') || lower.includes('chill mist')) return 'Smooth / Unflavored';
  return 'Classic Blend';
}

function importPouches() {
  console.log('--- Starting Nicotine Pouches Import ---');

  if (!fs.existsSync(POUCHES_CSV_FILE)) {
    console.error('CSV file not found:', POUCHES_CSV_FILE);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(POUCHES_CSV_FILE, 'utf-8');
  const rows = parseCSV(csvContent);
  console.log(`Parsed ${rows.length} total rows from CSV.`);

  let products = [];
  if (fs.existsSync(PRODUCTS_FILE)) {
    products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
    console.log(`Loaded ${products.length} existing products.`);
  }

  // Filter out any existing nic-pouches so this import is completely clean and idempotent
  products = products.filter(p => p.category !== 'nic-pouches');
  const initialCount = products.length;
  const existingSlugs = new Set(products.map(p => p.slug));

  let importedCount = 0;
  const startIdx = rows[0][0].includes('web_scraper_order') ? 1 : 0;

  for (let i = startIdx; i < rows.length; i++) {
    const r = rows[i];
    const title = r[2]?.trim();
    if (!title) continue;

    // Strengths
    const strengthCandidates = [r[3], r[5], r[6]].map(s => s?.trim()).filter(Boolean);
    const uniqueStrengths = [...new Set(strengthCandidates)];
    let nicotineStr = uniqueStrengths.join(', ');
    if (!nicotineStr) {
      // Check title or desc
      const match = (title + ' ' + (r[11] || '')).match(/\b(\d+mg)\b/i);
      nicotineStr = match ? match[1] : '6mg';
    }

    // Pack sizes
    const packCandidates = [r[8], r[9]].map(p => p?.trim()).filter(Boolean);
    const uniquePacks = [...new Set(packCandidates)];
    const packSizeStr = uniquePacks.length > 0 ? uniquePacks.join(', ') : 'Single Can, 5 Pack';

    // Price
    const priceStr = r[4]?.trim() || r[10]?.trim() || '$5.99 - $29.95';
    const firstPricePart = priceStr.split('-')[0].trim();
    const numPrice = parseFloat(firstPricePart.replace(/[^0-9.]/g, '') || '5.99');

    // Description
    let rawDesc = r[11]?.trim() || '';
    let description = rawDesc.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
    if (!description || description.length < 20) {
      description = `${title}. Premium tobacco-free nicotine pouches crafted for discreet, smoke-free enjoyment with smooth, long-lasting flavor and consistent nicotine delivery.`;
    }


    // Brand
    const brand = getBrand(title, r[7], description);

    // Image
    let image = r.find(col => col.startsWith('http') && (col.includes('.png') || col.includes('.jpg') || col.includes('.webp') || col.includes('images/stencil')));
    if (!image) {
      image = 'https://cdn11.bigcommerce.com/s-nkq7gqfv7z/images/stencil/2560w/products/4580/8420/Zyn_Wintergreen-Blast-11mg_600x600__77018.1785939540.png?c=1';
    }

    // Slug
    let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    let slug = baseSlug;
    let counter = 1;
    while (existingSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    existingSlugs.add(slug);

    // Badges
    const badges = ['Best Seller', 'Top Rated', 'Popular', 'Tobacco-Free', 'Trending'];
    const badge = badges[importedCount % badges.length];

    const flavor = getFlavor(title, description);

    const productObj = {
      id: `nic-pouch-${Date.now()}-${importedCount}`,
      slug,
      title,
      brand,
      category: 'nic-pouches',
      subcategory: 'nic-pouches',
      price: numPrice,
      priceDisplay: priceStr,
      rawPrice: priceStr,
      image,
      description,
      badge,
      inStock: true,
      nicotine: nicotineStr,
      packSize: packSizeStr,
      flavor,
      puffs: '15-20 Pouches/Can'
    };

    products.push(productObj);
    importedCount++;
  }

  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  console.log(`Successfully imported ${importedCount} Nicotine Pouches!`);
  console.log(`Catalog grew from ${initialCount} to ${products.length} products.`);

  // Verify brands
  const pouchProducts = products.filter(p => p.category === 'nic-pouches');
  const distinctBrands = [...new Set(pouchProducts.map(p => p.brand))];
  console.log(`Distinct pouch brands (${distinctBrands.length}):`, distinctBrands);
}

importPouches();
