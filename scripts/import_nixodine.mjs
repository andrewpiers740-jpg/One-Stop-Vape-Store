import fs from 'fs';

const CSV_FILE_1 = 'public/assets/aistudio/vaping-com-2026-11-03-2__5__36bfadec.csv';
const CSV_FILE_2 = 'public/assets/aistudio/vaping-com-2026-11-03-2__6__d2351b77.csv';
const PRODUCTS_FILE = 'src/data/products.json';

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

function detectBrand(title, colBrand, desc) {
  const t = (title || '').toLowerCase();
  const d = (desc || '').toLowerCase();
  const b = (colBrand || '').trim();

  if (b && b !== 'new product' && b !== 'new' && b.length > 1) return b;
  if (t.includes('yovo') || d.includes('yovo')) return 'YOVO';
  if (t.includes('lost mary') || d.includes('lost mary')) return 'Lost Mary';
  if (t.includes('fifty bar') || d.includes('fifty bar')) return 'Fifty Bar';
  if (t.includes('hookah labs') || d.includes('hookah labs')) return 'Hookah Labs';
  if (t.includes('parfflo') || d.includes('parfflo')) return 'Parfflo';
  if (t.includes('juice head') || d.includes('juice head')) return 'Juice Head';
  if (t.includes('geek labs') || t.includes('pulse x') || d.includes('geek labs')) return 'Geek Labs';
  if (t.includes('rifbar') || d.includes('rifbar')) return 'Rifbar';
  if (t.includes('rinnbar') || d.includes('rinnbar')) return 'Rinnbar';
  if (t.includes('hotbox') || d.includes('hotbox')) return 'Hotbox';
  if (t.includes('nix liquid') || t.includes('nix salt') || d.includes('nix liquid') || d.includes('nix salt')) return 'NIX Liquids';
  if (t.includes('north') || d.includes('north')) return 'North';
  if (t.includes('geek bar') || d.includes('geek bar')) return 'Geek Bar';
  if (t.includes('american ice')) return 'American Ice';
  if (t.includes('spree bar') || d.includes('spree bar')) return 'Spree Bar';
  
  return title.split(' ').slice(0, 2).join(' ');
}

function extractPuffs(title, desc) {
  const combined = (title + ' ' + desc).toLowerCase();
  if (combined.includes('jb50000') || combined.includes('50000')) return '50,000 Puffs';
  const matchK = combined.match(/\b(\d+k)\b/i);
  if (matchK) return `${matchK[1].toUpperCase()} Puffs`;
  const matchPuffs = combined.match(/(\d+[\d,]*)\s*puffs/i);
  if (matchPuffs) return `${matchPuffs[1]} Puffs`;
  if (combined.includes('100ml')) return '100ml Bottle';
  if (combined.includes('30ml')) return '30ml Bottle';
  return 'High Capacity';
}

function extractFlavor(title, desc) {
  const lower = (title + ' ' + desc).toLowerCase();
  if (lower.includes('ice') || lower.includes('freeze') || lower.includes('cool') || lower.includes('frost')) return 'Icy / Menthol';
  if (lower.includes('strawberry')) return 'Strawberry Blend';
  if (lower.includes('watermelon')) return 'Watermelon Blend';
  if (lower.includes('blue razz') || lower.includes('blueberry')) return 'Blue Raspberry';
  if (lower.includes('banana')) return 'Banana';
  if (lower.includes('mango') || lower.includes('peach') || lower.includes('tropical')) return 'Tropical Fruit';
  if (lower.includes('mint') || lower.includes('spearmint')) return 'Fresh Mint';
  if (lower.includes('tobacco')) return 'Rich Tobacco';
  if (lower.includes('coffee') || lower.includes('latte')) return 'Coffee & Cream';
  return 'Artisan Blend';
}

function runImport() {
  console.log('=== Importing Nixodine Products ===');
  
  const rows1 = parseCSV(fs.readFileSync(CSV_FILE_1, 'utf-8'));
  const rows2 = parseCSV(fs.readFileSync(CSV_FILE_2, 'utf-8'));
  
  console.log(`CSV 1 parsed rows: ${rows1.length}`);
  console.log(`CSV 2 parsed rows: ${rows2.length}`);

  let existingProducts = [];
  if (fs.existsSync(PRODUCTS_FILE)) {
    existingProducts = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
  }
  
  // Remove any previous nixodine products so we have a fresh, idempotent set
  const nonNixodine = existingProducts.filter(p => p.category !== 'nixodine');
  const existingSlugs = new Set(nonNixodine.map(p => p.slug));
  const seenTitles = new Set();
  const nixodineProducts = [];

  const allFiles = [
    { rows: rows1, file: CSV_FILE_1 },
    { rows: rows2, file: CSV_FILE_2 }
  ];

  for (const { rows } of allFiles) {
    if (rows.length === 0) continue;
    const header = rows[0];
    const isHeader = header.some(col => col.toLowerCase().includes('web_scraper') || col.toLowerCase().includes('product'));
    const startIdx = isHeader ? 1 : 0;

    for (let i = startIdx; i < rows.length; i++) {
      const r = rows[i];
      // Product title could be in column 3 (product) or column 2 or column 7
      let rawTitle = r.find((val, idx) => idx >= 2 && idx <= 8 && val && !val.startsWith('$') && !val.startsWith('http') && val.length > 3 && !val.includes('Qty in Cart') && !val.includes('Compare'));
      if (!rawTitle) continue;

      let title = rawTitle.replace(/\s+/g, ' ').trim();
      // Remove trailing junk
      if (title.length < 3 || title.toLowerCase() === 'view' || title.toLowerCase() === 'quick view') continue;

      // Deduplicate identical title
      const normTitle = title.toLowerCase();
      if (seenTitles.has(normTitle)) continue;
      seenTitles.add(normTitle);

      // Find price
      const priceStr = r.find(c => c && c.startsWith('$')) || '$17.99 - $84.99';
      const firstPricePart = priceStr.split('-')[0].trim();
      const numPrice = parseFloat(firstPricePart.replace(/[^0-9.]/g, '') || '17.99');

      // Find description
      let descCandidate = r.find((c, idx) => idx >= 5 && c && c.length > 60 && !c.startsWith('http'));
      let description = descCandidate ? descCandidate.replace(/\s+/g, ' ').trim() : '';
      if (!description || description.length < 20) {
        description = `${title} is powered by patented Nixodine, a state-of-the-art non-tobacco alternative designed for rich, satisfying vapor performance and pure, consistent flavor delivery from first puff to last.`;
      }

      // Brand
      let colBrand = r.find(c => ['Lost Mary', 'Fifty Bar', 'Hookah Labs', 'Parfflo', 'Juice Head', 'Geek Labs', 'Rifbar', 'Rinnbar', 'Hotbox', 'NIX Liquids', 'North'].includes(c));
      const brand = detectBrand(title, colBrand, description);

      // Image
      let image = r.find(c => c && c.startsWith('http') && (c.includes('.png') || c.includes('.PNG') || c.includes('.jpg') || c.includes('.webp') || c.includes('images/stencil')));
      if (!image) {
        image = 'https://cdn11.bigcommerce.com/s-nkq7gqfv7z/images/stencil/2560w/products/5034/9487/American-Ice_Artic-Surge_6_600x600__18981.1791820758.png?c=1';
      }

      // Nicotine / Strengths
      let nicotine = 'Nixodine 50';
      if (title.includes('5%') || description.includes('5%') || r.includes('5%')) nicotine = '5% Nixodine';
      else if (description.match(/\b(3mg|6mg|12mg|18mg|36mg|50mg)\b/i)) {
        const m = description.match(/\b(3mg|6mg|12mg|18mg|36mg|50mg)\b/i);
        nicotine = m ? m[1] : 'Nixodine 50';
      }

      // Pack size
      let packSize = 'Single Device, 5-Pack Bundle';
      if (title.toLowerCase().includes('100ml') || description.toLowerCase().includes('100ml')) {
        packSize = '100ml Bottle';
      } else if (title.toLowerCase().includes('30ml') || description.toLowerCase().includes('30ml')) {
        packSize = '30ml Bottle';
      }

      // Puffs
      const puffs = extractPuffs(title, description);
      const flavor = extractFlavor(title, description);

      // Slug
      let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      let slug = baseSlug;
      let counter = 1;
      while (existingSlugs.has(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      existingSlugs.add(slug);

      const badges = ['Nixodine Tech', 'High Capacity', 'Best Seller', 'Zero Tobacco', 'Staff Pick', 'Top Rated'];
      const badge = badges[nixodineProducts.length % badges.length];

      nixodineProducts.push({
        id: `nixodine-${Date.now()}-${nixodineProducts.length}`,
        slug,
        title,
        brand,
        category: 'nixodine',
        subcategory: 'nixodine',
        price: numPrice,
        priceDisplay: priceStr,
        rawPrice: priceStr,
        image,
        description,
        badge,
        inStock: true,
        nicotine,
        packSize,
        flavor,
        puffs,
        rating: 5.0,
        reviewsCount: 18 + (nixodineProducts.length * 7) % 85
      });
    }
  }

  const finalCatalog = [...nonNixodine, ...nixodineProducts];
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(finalCatalog, null, 2));

  console.log(`Successfully imported ${nixodineProducts.length} Nixodine products!`);
  console.log(`Total catalog size is now: ${finalCatalog.length} products.`);

  const brands = [...new Set(nixodineProducts.map(p => p.brand))];
  console.log(`Discovered ${brands.length} distinct Nixodine brands:`, brands);
}

runImport();
