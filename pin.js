const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  // 1. Login to Pinterest
  await page.goto('https://pinterest.com/login');
  await page.type('#email', process.env.PINTEREST_EMAIL);
  await page.type('#password', process.env.PINTEREST_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  console.log("✅ Logged in to Pinterest");

  // 2. Create Pin
  await page.goto('https://pinterest.com/pin-builder');
  await page.type('input[placeholder="Add your title"]', 'Trendy Product');
  
  // 3. Add Image (using URL instead of upload)
  await page.type('input[placeholder="Add image URL"]', 'https://example.com/product.jpg');
  
  // 4. Add Link
  await page.type('input[placeholder="Add a destination link"]', process.env.MAVELY_LINK);
  
  // 5. Submit
  await page.click('[data-test-id="board-dropdown-select-button"]');
  await page.click('[data-test-id="create-pin-submit-button"]');
  await page.waitForSelector('.PinSuccessModal', {timeout: 10000});
  console.log("✅ Pin created successfully!");

  await browser.close();
})();
