import { chromium } from "@playwright/test";

(async () => {
  const browsers = await chromium.launch({ headless: false });
  try {
    const page = await browsers.newPage();
    const url = "http://www.arbe-unet.ocn.ne.jp/chitose/i2_main/i2_main.php";
    await page.goto(url);
    await page.locator("input[name='c_LOGONID']").fill("3000213001");
    await page.locator("input[name='c_PASSWD']").fill("3000213001");
    await page.locator("#logon_link").click();
    await page.getByText("品番検索").click();

    const downloadPromise = page.waitForEvent("download", { timeout: 600000 });
    await page.getByText("ダウンロード").click({ timeout: 600000 });
    const download = await downloadPromise;
    await download.saveAs("/maker-zaiko-file/" + download.suggestedFilename());

    console.log("終了");
    await browsers.close();
  } catch (err) {
    console.error(err);
    await browsers.close();
  }
})();
