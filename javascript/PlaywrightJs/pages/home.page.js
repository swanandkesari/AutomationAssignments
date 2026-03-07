const { expect } = require('@playwright/test');

class HomePage {
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
        this.categoryCards = page.locator('.card');
    }

    async navigate() {
        await this.page.goto('/');
    }

    async verifyCategoryCardCount(expectedCount) {
        await expect(this.categoryCards).toHaveCount(expectedCount);
    }
}

module.exports = { HomePage };