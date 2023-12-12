import { chromium } from "@playwright/test";

(async () => {
  const browsers = await chromium.launch({ headless: false });
  try {
    const page = await browsers.newPage();
    const url = "https://order.karsee.com/aec/user/login";
    await page.goto(url);
    await page.locator("input[name='id']").fill("1153-1");
    await page.locator("input[name='pw']").fill("daimaru0891");
    await page.locator(".p-login-button").click();
    await page.locator(".p-login-button").click();
    await page.locator("text=在庫データ").click();

    const downloadPromise = page.waitForEvent("download");
    await page.getByText("ファイルをダウンロード").click();
    const download = await downloadPromise;
    await download.saveAs("/maker-zaiko-file/" + download.suggestedFilename());

    console.log("終了");
    await browsers.close();
  } catch (err) {
    console.error(err);
    await browsers.close();
  }
})();