const { scrapeCategories, scrapeProducts } = require('./src/scraper');
const { selectors, AMAZON_CATEGORIES_URL, AMAZON_PRODUCTS_URL } = require('./src/config');
const { saveToJson, displayResults } = require('./src/utils');
require('./src/server');

async function main() {
  try {
    console.log('Début du scraping des catégories...');
    const categories = await scrapeCategories(AMAZON_CATEGORIES_URL, selectors.categories);
    console.log('Catégories récupérées avec succès');

    console.log('Début du scraping des produits...');
    const products = await scrapeProducts(AMAZON_PRODUCTS_URL, selectors);
    console.log('Produits récupérés avec succès');
    
    const combinedData = {
      ...products,
      categories
    };
    
    displayResults(combinedData);
    saveToJson(combinedData);
    console.log('Toutes les données ont été sauvegardées avec succès');
    
  } catch (error) {
    console.error('Erreur principale:', error);
  }
}

main();
