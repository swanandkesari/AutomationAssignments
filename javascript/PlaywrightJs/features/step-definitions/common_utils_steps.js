/**
 * Step Definitions for Common/Utility steps
 * Shared steps across all features
 */
const { Given, Then } = require('@cucumber/cucumber');

Given('I navigate to the {string} page', async function (pageName) {
    const pageConfig = this.appConfig[pageName];
    if (!pageConfig) {
        throw new Error(`Page config for "${pageName}" not found`);
    }
    await this.page.goto(`${this.appConfig.baseURL}${pageConfig.url}`);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
});

Then('I take a screenshot', async function () {
    const timestamp = Date.now();
    const path = `screenshots/screenshot_${timestamp}.png`;
    const screenshot = await this.page.screenshot({ path });
    if (this.attach) {
        this.attach(screenshot, 'image/png');
    }
});

Then('I should see the page title {string}', async function (expectedTitle) {
    const title = await this.page.title();
    if (title !== expectedTitle) {
        throw new Error(`Expected page title "${expectedTitle}" but got "${title}"`);
    }
});

Then('I should be on {string}', async function (pageUrl) {
    const currentUrl = this.page.url();
    if (!currentUrl.includes(pageUrl)) {
        throw new Error(`Expected URL to contain "${pageUrl}" but got "${currentUrl}"`);
    }
});
