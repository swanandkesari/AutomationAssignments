/**
 * API Utilities
 * Utility functions for API interactions and requests
 */

/**
 * Make API GET request
 * @param {Page} page - Playwright page object
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Object>} - Response data
 */
async function apiGet(page, endpoint) {
    const response = await page.request.get(endpoint);
    return await response.json();
}

/**
 * Make API POST request
 * @param {Page} page - Playwright page object
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @returns {Promise<Object>} - Response data
 */
async function apiPost(page, endpoint, data) {
    const response = await page.request.post(endpoint, {
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
}

/**
 * Make API PUT request
 * @param {Page} page - Playwright page object
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @returns {Promise<Object>} - Response data
 */
async function apiPut(page, endpoint, data) {
    const response = await page.request.put(endpoint, {
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
}

/**
 * Make API DELETE request
 * @param {Page} page - Playwright page object
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Object>} - Response data
 */
async function apiDelete(page, endpoint) {
    const response = await page.request.delete(endpoint);
    return await response.json();
}

/**
 * Intercept and mock API responses
 * @param {Page} page - Playwright page object
 * @param {string} urlPattern - URL pattern to match
 * @param {Object} mockData - Data to return
 */
async function mockApiResponse(page, urlPattern, mockData) {
    await page.route(urlPattern, route => {
        route.abort('blockedbyClient');
    });

    await page.route(urlPattern, route => {
        route.continue();
    });
}

/**
 * Wait for API response
 * @param {Page} page - Playwright page object
 * @param {string} urlPattern - URL pattern to match
 */
async function waitForApiResponse(page, urlPattern) {
    return await page.waitForResponse(response =>
        response.url().includes(urlPattern)
    );
}

/**
 * Get request headers
 * @param {Page} page - Playwright page object
 * @returns {Promise<Object>} - Headers object
 */
async function getRequestHeaders(page) {
    let headers = {};
    await page.on('request', request => {
        headers = request.headers();
    });
    return headers;
}

module.exports = {
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
    mockApiResponse,
    waitForApiResponse,
    getRequestHeaders
};
