import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const url = "https://sara.servo-uni.com/webentry/index#no-back2";
    await page.goto(url);
    console.log(await page.title());
    await page.locator("#login_id").fill("7535di008");
    await page.locator("#login_pass").fill("dhpc0891");

    const pagePromise = context.waitForEvent("page", { timeout: 60000 });
    await page.locator("#btnLogin").click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    await newPage.getByText("在庫照会(CSV出力)").click();

    const downloadPromise = newPage.waitForEvent("download", {
      timeout: 60000,
    });
    await newPage.getByText("CSVダウンロード").click();

    const download = await downloadPromise;
    await download.saveAs("/maker-zaiko-file/" + download.suggestedFilename());

    console.log("終了");
    await browser.close();
  } catch (err) {
    console.error(err);
    await browser.close();
  }
})();
