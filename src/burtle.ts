import { chromium } from "@playwright/test";

(async () => {
  const browsers = await chromium.launch({ headless: false, slowMo: 100 });
  try {
    const page = await browsers.newPage();
    const url = "http://web.burtle.jp/olumtas/sign_in";
    await page.goto(url);
    console.log("バートル　ログイン");
    await page.locator("#userid").fill("06145500");
    await page.locator("#passwd").fill("au9qfrr9");
    await page.locator("#btn_submit").click();
    await page.getByText("在庫データ(CSV)").click();
    await page.locator("#inqzcsv_data_type_0").check();

    const downloadPromise = page.waitForEvent("download", { timeout: 600000 });
    await page.locator("#inqzcsv_submit").click();
    const download = await downloadPromise;
    await download.saveAs("/maker-zaiko-file/" + download.suggestedFilename());

    console.log("終了");
    await browsers.close();
  } catch (err) {
    console.error(err);
    await browsers.close();
  }
})();
