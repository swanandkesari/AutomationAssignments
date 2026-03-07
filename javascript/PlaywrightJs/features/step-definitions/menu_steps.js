/**
 * Step Definitions for Menu Navigation feature
 * Handles menu interaction and verification
 */
const { When, Then } = require('@cucumber/cucumber');

When('I hover over the {string} menu item', async function (menuItem) {
    const selector = `a:has-text("${menuItem}")`;
    await this.page.hover(selector);
    await this.page.waitForTimeout(300);
});

When('I click on {string}', async function (item) {
    const selector = `a:has-text("${item}")`;
    await this.page.click(selector);
    await this.page.waitForTimeout(300);
});

Then('I should see {string} menu option', async function (option) {
    const selector = `a:has-text("${option}")`;
    const isVisible = await this.page.isVisible(selector);
    if (!isVisible) {
        throw new Error(`Menu option "${option}" is not visible`);
    }
});
