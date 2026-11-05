import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = 'src/data/products.json';
const CSV_FILE = 'public/assets/aistudio/vaping-com-2026-11-03_945fdbda.csv';

function process() {
    let products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
    const csvLines = fs.readFileSync(CSV_FILE, 'utf-8').split('\n').slice(1);

    // 1. Remap existing products
    products = products.map(p => {
        if (p.category === 'nic-salts' || p.category === 'e-liquids') {
            return { ...p, category: 'vape-juice' };
        }
        return p;
    });

    // 2. Process CSV
    csvLines.forEach((line, index) => {
        if (!line.trim()) return;
        
        // Simple CSV parser for this specific format
        const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (cols.length < 5) return;
        
        const title = cols[2].replace(/"/g, '');
        const price = cols[3].replace(/"/g, '');
        const brand = cols[4].replace(/"/g, '');
        const image = cols[6].replace(/"/g, '');

        if (!title) return;

        products.push({
            id: `new-prod-${index}`,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title,
            brand,
            category: 'coils-pods',
            subcategory: 'coils-pods',
            price: parseFloat(price.replace(/[^0-9.]/g, '') || 0),
            priceDisplay: price,
            rawPrice: price,
            image,
            description: title,
            badge: 'New',
            inStock: true,
            nicotine: '',
            puffs: ''
        });
    });

    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    console.log('Catalog updated successfully.');
}

process();
