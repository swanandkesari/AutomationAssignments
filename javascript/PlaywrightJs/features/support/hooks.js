const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

setDefaultTimeout(60 * 1000);

let browser;

BeforeAll(async function () {
    // Ensure reports directory exists
    const reportDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir);
    }

    // Launch browser once before all tests
    browser = await chromium.launch({ headless: false });
});

AfterAll(async function () {
    if (browser) await browser.close();
});

Before(async function (scenario) {
    logger.log(`Starting Scenario: ${scenario.pickle.name}`);
    if (!browser) {
        browser = await chromium.launch({ headless: false });
    }
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (scenario) {
    logger.log(`Finished Scenario: ${scenario.pickle.name} - Status: ${scenario.result.status}`);
    if (scenario.result.status === Status.FAILED) {
        if (this.page) {
            const screenshot = await this.page.screenshot({ path: `screenshots/${scenario.pickle.name.replace(/ /g, '_')}_failed.png`, fullPage: true });
            this.attach(screenshot, 'image/png');
        }
    }
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
});