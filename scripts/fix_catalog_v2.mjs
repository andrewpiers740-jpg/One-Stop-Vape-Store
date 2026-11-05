import fs from 'fs';

const PRODUCTS_FILE = 'src/data/products.json';
const NEW_CSV_FILE = 'public/assets/aistudio/vaping-com-2026-11-03_945fdbda.csv';

function parseCSVLine(line) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(cur.trim().replace(/\r$/, ''));
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur.trim().replace(/\r$/, ''));
    return result;
}

function process() {
    console.log('Starting catalog fix and import...');
    
    let products = [];
    if (fs.existsSync(PRODUCTS_FILE)) {
        products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
    }
    
    // 1. Clean existing products and remap categories
    products = products.filter(p => {
        // Remove clearly corrupted entries
        if (!p.image || (typeof p.image === 'string' && !p.image.startsWith('http') && !p.image.startsWith('/'))) {
            return false;
        }
        return true;
    }).map(p => {
        // Clean all string fields
        const cleaned = {};
        for (const [key, value] of Object.entries(p)) {
            cleaned[key] = (typeof value === 'string') ? value.trim().replace(/\r$/, '') : value;
        }
        
        // Remap retired categories
        if (cleaned.category === 'nic-salts' || cleaned.category === 'e-liquids') {
            cleaned.category = 'vape-juice';
            cleaned.subcategory = 'vape-juice';
        }
        return cleaned;
    });

    // 2. Process the new CSV properly
    if (fs.existsSync(NEW_CSV_FILE)) {
        const csvContent = fs.readFileSync(NEW_CSV_FILE, 'utf-8');
        const lines = csvContent.split(/\r?\n/);
        
        // Skip header if it exists
        const startIdx = lines[0].includes('web_scraper_order') ? 1 : 0;

        lines.slice(startIdx).forEach((line, index) => {
            if (!line.trim()) return;
            
            const cols = parseCSVLine(line);
            
            const title = cols[2]?.trim();
            const priceStr = (cols[3] || cols[8] || '0').trim();
            const brand = (cols[10] || 'Unknown').trim();
            
            // Robust image lookup: find first column that looks like an absolute URL
            let image = cols.find(c => c.startsWith('http'))?.trim();
            
            if (!title || !image) return;

            // Prevent duplicates from same import (by slug)
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (products.some(p => p.slug === slug)) return;

            products.push({
                id: `import-${Date.now()}-${index}`,
                slug,
                title,
                brand,
                category: 'coils-pods',
                subcategory: 'coils-pods',
                price: parseFloat(priceStr.replace(/[^0-9.]/g, '') || 0),
                priceDisplay: priceStr,
                rawPrice: priceStr,
                image,
                description: title,
                badge: 'New',
                inStock: true,
                nicotine: '',
                puffs: ''
            });
        });
    }

    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    console.log(`Catalog updated: Total products ${products.length}`);
}

process();
