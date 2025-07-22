const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'https://sensebank.ua';
const forbiddenKeywords = ['Еквайринг', 'USD', 'EUR'];

(async () => {
    //запуск без графики
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle2' });

    const content = await page.content();

    // Зберігаємо HTML
    fs.writeFileSync('snapshot.html', content);

    // Перевірка на заборонені слова
    const found = forbiddenKeywords.filter(keyword =>
        content.toLowerCase().includes(keyword.toLowerCase())
    );

    if (found.length > 0) {
        console.log(`Знайдено: ${found.join(', ')}`);
    } else {
        console.log(`Слова не знайдено`);
    }

    await browser.close();
})();
