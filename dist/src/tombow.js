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
    const browsers = yield test_1.chromium.launch({ headless: false, slowMo: 500 });
    try {
        const page = yield browsers.newPage();
        const url = "http://www.tombow-net.co.jp/tdss/";
        yield page.goto(url);
        console.log(yield page.title());
        yield page.locator("input[name='trc_code']").fill("3314");
        yield page.locator("input[name='usr_code']").fill("D529");
        yield page.locator("input[name='pas_code']").fill("66320891");
        yield page.locator("input[value='ログイン']").click();
        yield page.locator(".menuList01 > ul > li:nth-child(8)").click();
        page.on("dialog", (dialog) => __awaiter(void 0, void 0, void 0, function* () {
            yield dialog.accept();
        }));
        yield page.click(".test_Button");
        const downloadPromise = page.waitForEvent("download", { timeout: 1200000 });
        yield page.click(".test_Button");
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
