const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const config = require('../config/app_config');
const logger = require('../support/logger');

Given('I navigate to the {string} page', async function (pageName) {
    const pageConfig = config[pageName];
    if (!pageConfig) throw new Error(`Config not found for page: ${pageName}`);
    if (!this.page) throw new Error(`Page is not initialized. The Before hook did not run.`);
    logger.log(`Navigating to ${pageName} page: ${pageConfig.url}`);
    await this.page.goto(pageConfig.url);
});

Then('I should see {int} options in the menu', async function (expectedCount) {
    // Use the selector from the config (assuming home page context for this step)
    const menuSelector = config.home.selectors.menu;

    const menuItems = this.page.locator(menuSelector);
    const actualCount = await menuItems.count();
    logger.log(`Menu Validation: Found ${actualCount} options. Expected: ${expectedCount}`);

    await expect(menuItems).toHaveCount(expectedCount);
});

Then('I take a screenshot', async function () {
    // Save to disk AND attach to report
    const screenshot = await this.page.screenshot({ path: `screenshots/manual_screenshot_${Date.now()}.png` });
    this.attach(screenshot, 'image/png');
});
