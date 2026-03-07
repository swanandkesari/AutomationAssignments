/**
 * Browser Utilities
 * Utility functions for browser operations
 */

/**
 * Get page title
 * @param {Page} page - Playwright page object
 * @returns {Promise<string>} - Page title
 */
async function getPageTitle(page) {
    return await page.title();
}

/**
 * Wait for navigation to complete
 * @param {Page} page - Playwright page object
 */
async function waitForNavigation(page) {
    await page.waitForLoadState('networkidle');
}

/**
 * Check if element exists in DOM
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @returns {Promise<boolean>} - True if element exists
 */
async function elementExists(page, selector) {
    const element = await page.$(selector);
    return element !== null;
}

/**
 * Get all text content from page
 * @param {Page} page - Playwright page object
 * @returns {Promise<string>} - All text content
 */
async function getAllPageText(page) {
    return await page.evaluate(() => document.body.innerText);
}

/**
 * Execute JavaScript on page
 * @param {Page} page - Playwright page object
 * @param {string} script - JavaScript code to execute
 * @returns {Promise<any>} - Result of script execution
 */
async function executeScript(page, script) {
    return await page.evaluate(script);
}

/**
 * Get all cookies
 * @param {Page} page - Playwright page object
 * @returns {Promise<Array>} - Array of cookies
 */
async function getAllCookies(page) {
    return await page.context().cookies();
}

/**
 * Set cookie
 * @param {Page} page - Playwright page object
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 */
async function setCookie(page, name, value) {
    await page.context().addCookies([{
        name,
        value,
        url: page.url()
    }]);
}

/**
 * Clear all cookies
 * @param {Page} page - Playwright page object
 */
async function clearAllCookies(page) {
    await page.context().clearCookies();
}

/**
 * Set browser viewport
 * @param {Page} page - Playwright page object
 * @param {number} width - Width in pixels
 * @param {number} height - Height in pixels
 */
async function setViewport(page, width, height) {
    await page.setViewportSize({ width, height });
}

/**
 * Take full page screenshot
 * @param {Page} page - Playwright page object
 * @param {string} filename - Filename for screenshot
 */
async function takeFullPageScreenshot(page, filename) {
    await page.screenshot({ path: `screenshots/${filename}`, fullPage: true });
}

module.exports = {
    getPageTitle,
    waitForNavigation,
    elementExists,
    getAllPageText,
    executeScript,
    getAllCookies,
    setCookie,
    clearAllCookies,
    setViewport,
    takeFullPageScreenshot
};
