/**
 * Search Page Object
 * Handles search functionality on the website
 */
const BasePage = require('./basePage');

class SearchPage extends BasePage {
    constructor(page, appConfig) {
        super(page, appConfig.baseURL);
        this.config = appConfig.search || {};
    }

    /**
     * Navigate to search page
     */
    async navigateToSearch() {
        if (this.config.url) {
            await this.navigate(this.config.url);
        }
    }

    /**
     * Perform search
     * @param {string} query - Search query
     */
    async search(query) {
        await this.fillText('.search-input', query);
        await this.click('.search-btn');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get search results count
     * @returns {Promise<number>} - Number of results
     */
    async getResultsCount() {
        return await this.getElementCount('.search-result-item');
    }

    /**
     * Get result titles
     * @returns {Promise<string[]>} - Array of result titles
     */
    async getResultTitles() {
        const titles = [];
        const selector = '.search-result-title';
        const count = await this.getElementCount(selector);

        for (let i = 0; i < count; i++) {
            const text = await this.page.locator(selector).nth(i).textContent();
            titles.push(text?.trim());
        }
        return titles;
    }

    /**
     * Click on search result by index
     * @param {number} index - Index of result to click
     */
    async clickResultByIndex(index) {
        const selector = '.search-result-item';
        await this.page.locator(selector).nth(index).click();
    }

    /**
     * Filter results
     * @param {string} filterType - Type of filter
     * @param {string} filterValue - Filter value
     */
    async applyFilter(filterType, filterValue) {
        const filterSelector = `[data-filter="${filterType}"]`;
        await this.click(`${filterSelector} [value="${filterValue}"]`);
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = SearchPage;
