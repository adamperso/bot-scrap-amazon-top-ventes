const { scrapeWebPage } = require('./src/scraper');
const { selectors, AMAZON_URL } = require('./src/config');
const { saveToJson, displayResults } = require('./src/utils');
require('./src/server');

async function main() {
    try {
        const data = await scrapeWebPage(AMAZON_URL, selectors);
        displayResults(data);
        saveToJson(data);
    } catch (error) {
        console.error('Erreur principale:', error);
    }
}

main();
