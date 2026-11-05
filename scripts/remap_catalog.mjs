import fs from 'fs';

const PRODUCTS_FILE = 'src/data/products.json';

function remap() {
  console.log('--- Remapping Catalog to Match the 7 Official Store Categories ---');
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
  console.log(`Loaded ${products.length} products.`);

  let remappedNixodine = 0;
  let remappedPodKits = 0;
  let remappedPodCoils = 0;

  for (const p of products) {
    const titleLower = p.title.toLowerCase();
    const descLower = (p.description || '').toLowerCase();

    // 1. Nixodine Category
    if (titleLower.includes('nixodine') || descLower.includes('nixodine')) {
      p.category = 'nixodine';
      p.subcategory = 'nixodine';
      remappedNixodine++;
      continue;
    }

    // 2. Pod Systems remapping
    if (p.category === 'pod-systems') {
      const isReplacement = titleLower.includes('replacement') || 
                            titleLower.includes('cartridge') || 
                            titleLower.includes('coil') ||
                            titleLower.includes('4pk') ||
                            titleLower.includes('3pk') ||
                            titleLower.includes('pods pack');
      if (isReplacement) {
        p.category = 'coils-pods';
        p.subcategory = 'replacement-pods';
        remappedPodCoils++;
      } else {
        p.category = 'vape-kits';
        p.subcategory = 'pod-kits';
        remappedPodKits++;
      }
    }
  }

  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));

  console.log(`Remapped ${remappedNixodine} products to 'nixodine'`);
  console.log(`Remapped ${remappedPodCoils} products from pod-systems to 'coils-pods'`);
  console.log(`Remapped ${remappedPodKits} products from pod-systems to 'vape-kits'`);

  const categoryCounts = {};
  for (const p of products) {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  }
  console.log('\nFinal product counts by category:');
  console.table(categoryCounts);
}

remap();
