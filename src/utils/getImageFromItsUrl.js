const puppeteer = require('puppeteer');

export const getImageFromWebsite = async (url, itemName) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const imageSrc = await page.$eval(
    `.f-15:contains("${itemName}")`, 
    (item) => {
      const imgElement = item.closest('div').querySelector('img');
      return imgElement ? imgElement.src : null;
    }
  );

  await browser.close();

  return imageSrc || '/assets/images/img-placeholder.svg'; 
};
