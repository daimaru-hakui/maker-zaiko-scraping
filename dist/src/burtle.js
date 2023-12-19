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
        const url = "http://web.burtle.jp/olumtas/sign_in";
        yield page.goto(url);
        console.log("バートル　ログイン");
        yield page.locator("#userid").fill("06145500");
        yield page.locator("#passwd").fill("au9qfrr9");
        yield page.locator("#btn_submit").click();
        yield page.getByText("在庫データ(CSV)").click();
        yield page.locator("#inqzcsv_data_type_0").check();
        const downloadPromise = page.waitForEvent("download", { timeout: 600000 });
        yield page.locator("#inqzcsv_submit").click();
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
