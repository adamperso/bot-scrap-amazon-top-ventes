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

async function scrapeCategories(url, selector) {
  const { browser, page } = await setupScraper();
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  const categories = await page.evaluate((selector) => {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => {
      const link = element.querySelector('a');
      return {
        text: link.innerText.trim(),
        link: link.href
      };
    });
  }, selector);
  
  await browser.close();
  return categories;
}

async function scrapeProducts(url, selectors) {
  const { browser, page } = await setupScraper();
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  const data = await page.evaluate((selectors) => {
    const results = {};
    for (const [key, selector] of Object.entries(selectors)) {
      if (key !== 'categories') {
        const elements = document.querySelectorAll(selector);
        results[key] = Array.from(elements).map(element => element.textContent.trim());
      }
    }
    return results;
  }, selectors);
  
  await browser.close();
  return data;
}

module.exports = {
  scrapeCategories,
  scrapeProducts
};
