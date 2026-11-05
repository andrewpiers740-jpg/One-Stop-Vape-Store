import fs from 'fs';

const PRODUCTS_FILE = 'src/data/products.json';
const VAPORIZERS_CSV_FILE = 'public/assets/aistudio/vaping-com-2026-11-03-2__2__1bfa038a.csv';

function parseCSVLine(line) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur.trim());
    return result;
}

function process() {
    console.log('Starting Vaporizers import...');
    
    let products = [];
    if (fs.existsSync(PRODUCTS_FILE)) {
        products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
    }

    if (fs.existsSync(VAPORIZERS_CSV_FILE)) {
        const csvContent = fs.readFileSync(VAPORIZERS_CSV_FILE, 'utf-8');
        const lines = csvContent.split(/\r?\n/);
        
        const startIdx = lines[0].includes('web_scraper_order') ? 1 : 0;

        lines.slice(startIdx).forEach((line, index) => {
            if (!line.trim()) return;
            
            const cols = parseCSVLine(line);
            
            const title = cols[3];
            if (!title) return;
            
            const priceStr = cols[4] || cols[12] || '0';
            const brand = cols[11] || (title.split(' ')[0]) || 'Unknown';
            
            // Image is usually the last column or contains http
            let image = cols.find(c => c.startsWith('http') && (c.includes('.png') || c.includes('.jpg') || c.includes('.webp')));
            
            if (!image) return;

            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            // Prevent duplicates
            if (products.some(p => p.slug === slug)) return;

            products.push({
                id: `vaporizer-import-${Date.now()}-${index}`,
                slug,
                title,
                brand,
                category: 'vaporizers',
                subcategory: 'vaporizers',
                price: parseFloat(priceStr.replace(/[^0-9.]/g, '') || 0),
                priceDisplay: priceStr,
                rawPrice: priceStr,
                image,
                description: cols[17] || title,
                badge: 'Premium',
                inStock: true,
                nicotine: '',
                puffs: ''
            });
        });
    }

    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    console.log(`Vaporizers imported: Total products now ${products.length}`);
}

process();
