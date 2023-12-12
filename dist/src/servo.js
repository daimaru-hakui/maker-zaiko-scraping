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
    const browser = yield test_1.chromium.launch({ headless: false, });
    try {
        const context = yield browser.newContext();
        const page = yield context.newPage();
        const url = "https://sara.servo-uni.com/webentry/index#no-back2";
        yield page.goto(url);
        console.log(yield page.title());
        yield page.locator("#login_id").fill("7535di008");
        yield page.locator("#login_pass").fill("dhpc0891");
        const pagePromise = context.waitForEvent("page");
        yield page.locator("#btnLogin").click();
        const newPage = yield pagePromise;
        yield newPage.waitForLoadState();
        yield newPage.getByText("在庫照会(CSV出力)").click();
        yield newPage.getByText("CSVダウンロード").click();
        const downloadPromise = newPage.waitForEvent("download", {
            timeout: 60000,
        });
        yield newPage.getByText("CSVダウンロード").click();
        const download = yield downloadPromise;
        yield download.saveAs("/maker-zaiko-file/" + download.suggestedFilename());
        console.log("終了");
        yield browser.close();
    }
    catch (err) {
        console.error(err);
        yield browser.close();
    }
}))();
