/**
 * Step Definitions for Home Page feature
 * Handles home page navigation and verification
 */
const { Given, Then } = require('@cucumber/cucumber');

Given('I am on the Home page', async function () {
    await this.homePage.navigateToHome();
});

Then('I should see {int} options in the menu', async function (expectedCount) {
    const titleSelector = this.appConfig.home.selectors.categoryTitle;
    await this.page.waitForSelector(titleSelector, { timeout: 10000 });
    const items = await this.page.locator(titleSelector).count();
    if (items !== expectedCount) {
        throw new Error(`Expected ${expectedCount} menu options but found ${items}`);
    }
});
