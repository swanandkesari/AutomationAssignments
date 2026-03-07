const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const appConfig = require('../../src/config/app_config');

// Set a default timeout for all steps to 60 seconds
setDefaultTimeout(60 * 1000);

// Before hook to create a new browser and page for each scenario
Before(async function () {
    try {
        this.browser = await chromium.launch({ headless: true });
        this.context = await this.browser.newContext({ baseURL: appConfig.baseURL });
        this.page = await this.context.newPage();

        // Initialize page objects with the new page
        this.initializePageObjects();
    } catch (error) {
        console.error('Error in Before hook:', error);
        throw error;
    }
});

// After hook to clean up by closing the page, context, and browser
After(async function () {
    try {
        if (this.page) {
            await this.page.close();
        }
        if (this.context) {
            await this.context.close();
        }
        if (this.browser) {
            await this.browser.close();
        }

        // Cleanup world
        await this.cleanup();
    } catch (error) {
        console.error('Error in After hook:', error);
    }
});
