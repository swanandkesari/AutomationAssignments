/**
 * Common Utilities
 * General utility functions for testing
 */

/**
 * Generate random string
 * @param {number} length - Length of string
 * @returns {string} - Random string
 */
function generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Generate random email
 * @returns {string} - Random email address
 */
function generateRandomEmail() {
    const randomString = generateRandomString(8);
    return `test_${randomString}@example.com`;
}

/**
 * Get current timestamp
 * @returns {string} - Current timestamp
 */
function getCurrentTimestamp() {
    return new Date().toISOString();
}

/**
 * Format date
 * @param {Date} date - Date object
 * @param {string} format - Format string (e.g., 'DD/MM/YYYY')
 * @returns {string} - Formatted date
 */
function formatDate(date, format = 'DD/MM/YYYY') {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year);
}

/**
 * Delay execution
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delayMs - Delay between retries
 * @returns {Promise<any>} - Result of function
 */
async function retry(fn, maxRetries = 3, delayMs = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) {
                throw error;
            }
            await delay(delayMs);
        }
    }
}

/**
 * Compare two objects
 * @param {Object} obj1 - First object
 * @param {Object} obj2 - Second object
 * @returns {boolean} - True if objects are equal
 */
function objectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Parse URL query parameters
 * @param {string} url - URL string
 * @returns {Object} - Object of query parameters
 */
function parseQueryParams(url) {
    const params = new URLSearchParams(new URL(url).search);
    const result = {};

    params.forEach((value, key) => {
        result[key] = value;
    });

    return result;
}

/**
 * Capitalize string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Remove special characters from string
 * @param {string} str - String to clean
 * @returns {string} - Cleaned string
 */
function removeSpecialChars(str) {
    return str.replace(/[^a-zA-Z0-9 ]/g, '');
}

module.exports = {
    generateRandomString,
    generateRandomEmail,
    getCurrentTimestamp,
    formatDate,
    delay,
    retry,
    objectsEqual,
    parseQueryParams,
    capitalize,
    removeSpecialChars
};
