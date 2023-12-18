"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browsers = yield test_1.chromium.launch({ headless: false, slowMo: 100 });
    try {
        const page = yield browsers.newPage();
        const url = "http://www.arbe-unet.ocn.ne.jp/chitose/i2_main/i2_main.php";
        yield page.goto(url);
        console.log("チトセ　ログイン");
        yield page.locator("input[name='c_LOGONID']").fill("3000213001");
        yield page.locator("input[name='c_PASSWD']").fill("3000213001");
        yield page.locator("#logon_link").click();
        yield page.getByText("品番検索").click();
        const downloadPromise = page.waitForEvent("download", { timeout: 600000 });
        yield page.getByText("ダウンロード").click({ timeout: 600000 });
        const download = yield downloadPromise;
        yield download.saveAs("/maker-zaiko-file/" + download.suggestedFilename());
        console.log("終了");
        yield browsers.close();
    }
    catch (err) {
        console.error(err);
        yield browsers.close();
    }
}))();
