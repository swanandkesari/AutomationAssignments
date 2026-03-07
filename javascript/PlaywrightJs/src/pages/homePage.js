/**
 * Home Page Object
 * Handles all interactions with the home/landing page
 */
const BasePage = require('./basePage');

class HomePage extends BasePage {
    constructor(page, appConfig) {
        super(page, appConfig.baseURL);
        this.config = appConfig.home;
    }

    /**
     * Navigate to home page
     */
    async navigateToHome() {
        await this.navigate(this.config.url);
    }

    /**
     * Get count of category cards on home page
     * @returns {Promise<number>} - Number of category cards
     */
    async getCategoryCardCount() {
        await this.waitForSelector(this.config.selectors.categoryTitle);
        return await this.getElementCount(this.config.selectors.categoryTitle);
    }

    /**
     * Click on a specific category card
     * @param {string} categoryName - Name of the category to click
     */
    async clickOnCategory(categoryName) {
        const selector = `h5:has-text("${categoryName}")`;
        await this.click(selector);
    }

    /**
     * Verify specific number of category cards
     * @param {number} expectedCount - Expected number of cards
     * @returns {Promise<boolean>} - True if count matches
     */
    async verifyCategoryCount(expectedCount) {
        const count = await this.getCategoryCardCount();
        return count === expectedCount;
    }

    /**
     * Get all category card titles
     * @returns {Promise<string[]>} - Array of category titles
     */
    async getAllCategoryTitles() {
        const titles = [];
        const selector = this.config.selectors.categoryTitle;
        const count = await this.getElementCount(selector);

        for (let i = 0; i < count; i++) {
            const text = await this.page.locator(selector).nth(i).textContent();
            titles.push(text?.trim());
        }
        return titles;
    }
}

module.exports = HomePage;
