const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const appConfig = require('../../config/app_config');

let browser, page;

// Background/Before Hook
Before(async function () {
    // Setup is already handled by hooks.js
});

// Navigation steps
Given('I navigate to the {string} page', async (pageName) => {
    if (!browser) {
        browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        page = await context.newPage();
    }
    const baseURL = appConfig.baseURL;
    const pageConfig = appConfig[pageName];
    if (!pageConfig) {
        throw new Error(`Page config for "${pageName}" not found`);
    }
    await page.goto(`${baseURL}${pageConfig.url}`);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
});

Given('I am on the Home page', async () => {
    if (!browser) {
        browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        page = await context.newPage();
    }
    const baseURL = appConfig.baseURL;
    const pageConfig = appConfig.home;
    await page.goto(`${baseURL}${pageConfig.url}`);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
});

// Check Box Steps
When('I expand all checkboxes', async () => {
    try {
        const selectors = [
            'button[title="Expand all"]',
            '.rct-option-expand-all',
            'button:has-text("Expand All")',
            'svg.rct-icon[class*="expand"]'
        ];

        let found = false;
        for (const selector of selectors) {
            const element = await page.$(selector);
            if (element) {
                await page.click(selector);
                found = true;
                break;
            }
        }

        if (!found) {
            console.log('Expand all button not found, continuing anyway');
        }

        await page.waitForTimeout(1000);
    } catch (error) {
        console.log('Error expanding checkboxes:', error.message);
    }
});

When('I select the {string} checkbox', async (checkboxName) => {
    // Try various selectors to find the checkbox
    const selectors = [
        `label:has-text("${checkboxName}")`,
        `span:has-text("${checkboxName}") >> ../input`,
        `text="${checkboxName}" >> ../input`,
        `.rct-title:has-text("${checkboxName}") >> ../input`
    ];

    let found = false;
    for (const selector of selectors) {
        try {
            const elements = await page.$$(selector);
            if (elements.length > 0) {
                const checkbox = elements[0];
                await checkbox.click();
                found = true;
                break;
            }
        } catch (e) {
            // Try next selector
        }
    }

    if (!found) {
        throw new Error(`Could not find checkbox for "${checkboxName}"`);
    }

    await page.waitForTimeout(300);
});

Then('I should see {string} in the selected results', async (result) => {
    const resultSelector = appConfig.checkBox.selectors.result;
    const resultText = await page.textContent(resultSelector);
    if (!resultText || !resultText.toLowerCase().includes(result.toLowerCase())) {
        throw new Error(`Expected to find "${result}" in results, but got: "${resultText}"`);
    }
});

// Text Box Steps
When('I fill the text box form with:', async (dataTable) => {
    const rows = dataTable.rows();
    const config = appConfig.textBox.selectors;

    for (let i = 1; i < rows.length; i++) {
        const [label, value] = rows[i];
        if (label === 'Full Name') {
            await page.fill(config.fullName, value);
        } else if (label === 'Email') {
            await page.fill(config.email, value);
        } else if (label === 'Current Address') {
            await page.fill(config.currentAddress, value);
        } else if (label === 'Permanent Address') {
            await page.fill(config.permanentAddress, value);
        }
    }
});

When('I click the submit button', async () => {
    const config = appConfig.textBox.selectors;
    await page.click(config.submit);
    await page.waitForTimeout(500);
});

Then('I should see the submitted data in the output', async () => {
    const config = appConfig.textBox.selectors;
    const output = await page.textContent(config.output);
    if (!output || output.trim() === '') {
        throw new Error('Output section is empty');
    }
});

// Menu Steps
When('I hover over the {string} menu item', async (menuItem) => {
    const selector = `a:has-text("${menuItem}")`;
    await page.hover(selector);
    await page.waitForTimeout(300);
});

When('I click on {string}', async (item) => {
    const selector = `a:has-text("${item}")`;
    await page.click(selector);
    await page.waitForTimeout(300);
});

Then('I should see {string} menu option', async (option) => {
    const selector = `a:has-text("${option}")`;
    const isVisible = await page.isVisible(selector);
    if (!isVisible) {
        throw new Error(`Menu option "${option}" is not visible`);
    }
});

// Home Steps
Then('I should see {int} options in the menu', async (expectedCount) => {
    const config = appConfig.home.selectors;
    await page.waitForSelector(config.categoryTitle, { timeout: 10000 });
    const items = await page.locator(config.categoryTitle).count();
    if (items !== expectedCount) {
        throw new Error(`Expected ${expectedCount} menu options but found ${items}`);
    }
});

Then('I take a screenshot', async function () {
    const timestamp = Date.now();
    const path = `screenshots/screenshot_${timestamp}.png`;
    const screenshot = await page.screenshot({ path });
    if (this.attach) {
        this.attach(screenshot, 'image/png');
    }
});

// Cleanup
After(async () => {
    if (browser) {
        await browser.close();
        browser = null;
        page = null;
    }
});
