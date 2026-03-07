/**
 * Base Page class - Parent class for all page objects
 * Contains common methods for all pages
 */
class BasePage {
    constructor(page, baseURL) {
        this.page = page;
        this.baseURL = baseURL;
    }

    /**
     * Navigate to a specific URL
     * @param {string} relativePath - Relative path from baseURL
     */
    async navigate(relativePath = '') {
        const url = `${this.baseURL}${relativePath}`;
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000);
    }

    /**
     * Click on an element
     * @param {string} selector - CSS selector
     */
    async click(selector) {
        await this.page.click(selector);
        await this.page.waitForTimeout(300);
    }

    /**
     * Fill text in an input field
     * @param {string} selector - CSS selector
     * @param {string} text - Text to fill
     */
    async fillText(selector, text) {
        await this.page.fill(selector, text);
    }

    /**
     * Get text content of an element
     * @param {string} selector - CSS selector
     * @returns {Promise<string>} - Text content
     */
    async getText(selector) {
        return await this.page.textContent(selector);
    }

    /**
     * Check if element is visible
     * @param {string} selector - CSS selector
     * @returns {Promise<boolean>} - True if visible
     */
    async isVisible(selector) {
        return await this.page.isVisible(selector);
    }

    /**
     * Wait for selector to appear
     * @param {string} selector - CSS selector
     * @param {number} timeout - Timeout in ms
     */
    async waitForSelector(selector, timeout = 10000) {
        await this.page.waitForSelector(selector, { timeout });
    }

    /**
     * Get count of elements matching selector
     * @param {string} selector - CSS selector
     * @returns {Promise<number>} - Count of matching elements
     */
    async getElementCount(selector) {
        return await this.page.locator(selector).count();
    }

    /**
     * Hover over an element
     * @param {string} selector - CSS selector
     */
    async hover(selector) {
        await this.page.hover(selector);
        await this.page.waitForTimeout(300);
    }

    /**
     * Take a screenshot
     * @param {string} filename - File name for screenshot
     */
    async takeScreenshot(filename = 'screenshot.png') {
        const screenshot = await this.page.screenshot({ path: `screenshots/${filename}` });
        return screenshot;
    }

    /**
     * Get current URL
     * @returns {Promise<string>} - Current page URL
     */
    async getURL() {
        return this.page.url();
    }

    /**
     * Handle multiple selector alternatives
     * @param {string[]} selectors - Array of selectors to try
     * @returns {Promise<boolean>} - True if any selector found
     */
    async tryMultipleSelectors(selectors) {
        for (const selector of selectors) {
            try {
                const count = await this.page.locator(selector).count();
                if (count > 0) {
                    return true;
                }
            } catch (e) {
                // Continue to next selector
            }
        }
        return false;
    }
}

module.exports = BasePage;
