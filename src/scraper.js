
const puppeteer = require('puppeteer');

async function setupScraper() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    slowMo: 100
  });

  const page = await browser.newPage();
  return { browser, page };
}

async function scrapeWebPage(url, selectors) {
  try {
    const { browser, page } = await setupScraper();

    console.log('Navigation vers:', url);
    await page.goto(url, { waitUntil: 'networkidle0' });

    const data = await page.evaluate((selectors) => {
      const results = {};
      for (const [key, selector] of Object.entries(selectors)) {
        const elements = document.querySelectorAll(selector);
        results[key] = Array.from(elements).map(element => element.textContent.trim());
      }
      return results;
    }, selectors);

    console.log('Données extraites avec succès');
    await browser.close();
    return data;

  } catch (error) {
    console.error('Erreur lors du scraping:', error);
    throw error;
  }
}

module.exports = {
  scrapeWebPage
};
