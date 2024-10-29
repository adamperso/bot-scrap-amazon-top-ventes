const puppeteer = require('puppeteer');

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
];

const proxies = [
    'http://145.239.85.58:9300',
    'http://46.4.96.137:1080'
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const randomDelay = (min = 3000, max = 7000) => {
    return Math.floor(Math.random() * (max - min) + min);
};

async function setupScraper() {
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 100,
        args: [
            `--proxy-server=${randomProxy}`,
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    });

    const page = await browser.newPage();
    await page.setUserAgent(randomUserAgent);
    
    await page.setViewport({
        width: 1920 + Math.floor(Math.random() * 100),
        height: 1080 + Math.floor(Math.random() * 100),
        deviceScaleFactor: 1
    });

    await page.setExtraHTTPHeaders({
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Referer': 'https://www.google.com',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
    });

    return { browser, page };
}

async function scrapeCategories(url, selector) {
    const { browser, page } = await setupScraper();
    try {
        await sleep(randomDelay());
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
        
        return categories;
    } catch (error) {
        console.error('Error scraping categories:', error);
        if (error.message.includes('blocked')) {
            await sleep(randomDelay(10000, 20000));
        }
        throw error;
    } finally {
        await browser.close();
    }
}

async function scrapeProducts(url, selectors) {
    const { browser, page } = await setupScraper();
    try {
        await sleep(randomDelay());
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
        
        return data;
    } catch (error) {
        console.error('Error scraping products:', error);
        if (error.message.includes('blocked')) {
            await sleep(randomDelay(10000, 20000));
        }
        throw error;
    } finally {
        await browser.close();
    }
}

module.exports = {
    scrapeCategories,
    scrapeProducts
};
