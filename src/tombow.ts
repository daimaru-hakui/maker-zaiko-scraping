import { chromium } from "@playwright/test";

(async () => {
  const browsers = await chromium.launch({ headless: false, slowMo: 500 });
  try {
    const page = await browsers.newPage();
    const url = "http://www.tombow-net.co.jp/tdss/";
    await page.goto(url);
    console.log(await page.title());
    await page.locator("input[name='trc_code']").fill("3314");
    await page.locator("input[name='usr_code']").fill("D529");
    await page.locator("input[name='pas_code']").fill("66320891");
    await page.locator("input[value='ログイン']").click();
    await page.locator(".menuList01 > ul > li:nth-child(8)").click();
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await page.click(".test_Button");

    const downloadPromise = page.waitForEvent("download", { timeout: 1200000 });
    await page.click(".test_Button");
    const download = await downloadPromise;
    await download.saveAs("/maker-zaiko-file/" + download.suggestedFilename());

    console.log("終了");
    await browsers.close();
  } catch (err) {
    console.error(err);
    await browsers.close();
  }
})();
