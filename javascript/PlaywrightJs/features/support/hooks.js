const { BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { baseURL } = require('../../config/app_config');

// Set a default timeout for all steps to 60 seconds
setDefaultTimeout(60 * 1000);

let browser;

// BeforeAll hook to launch the browser once before all tests
BeforeAll(async () => {
    browser = await chromium.launch({ headless: true });
});

// AfterAll hook to close the browser after all tests are done
AfterAll(async () => {
    await browser.close();
});

// Before hook to create a new page and context for each scenario
Before(async function () {
    this.context = await browser.newContext({ baseURL });
    this.page = await this.context.newPage();
});

// After hook to clean up by closing the page and context
After(async function () {
    await this.page.close();
    await this.context.close();
});