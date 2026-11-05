import fs from 'fs';

const PRODUCTS_FILE = 'src/data/products.json';
const NEW_CSV_FILE = 'public/assets/aistudio/vaping-com-2026-11-03_945fdbda.csv';

function process() {
    let products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
    
    // 1. Remap existing products
    products = products.map(p => {
        if (p.category === 'nic-salts' || p.category === 'e-liquids') {
            return { ...p, category: 'vape-juice' };
        }
        return p;
    });

    // 2. Process new CSV and add to 'coils-pods'
    const csvContent = fs.readFileSync(NEW_CSV_FILE, 'utf-8');
    const lines = csvContent.split('\n').slice(1);

    lines.forEach((line, index) => {
        if (!line.trim()) return;
        
        // CSV columns based on header: 
        // web_scraper_order,web_scraper_start_url,product,price,data2,data3,data4,data5,price2,name,brand,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,price3,data17,price4,price5,data18,data19,data20,data21,data22,image
        const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (cols.length < 31) return;
        
        const title = cols[2].replace(/"/g, ''); // index 2: product
        const price = cols[3].replace(/"/g, ''); // index 3: price
        const brand = cols[10].replace(/"/g, ''); // index 10: brand
        const image = cols[30].replace(/"/g, ''); // index 30: image

        if (!title) return;

        products.push({
            id: `new-prod-coils-${Date.now()}-${index}`,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title,
            brand: brand || 'Unknown',
            category: 'coils-pods',
            subcategory: 'coils-pods',
            price: parseFloat(price.replace(/[^0-9.]/g, '') || 0),
            priceDisplay: price,
            rawPrice: price,
            image: image,
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
