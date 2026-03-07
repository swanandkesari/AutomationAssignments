/**
 * Data Utilities
 * Utility functions for test data management and manipulation
 */

/**
 * Generate test user data
 * @returns {Object} - User object with random data
 */
function generateTestUser() {
    const randomId = Math.floor(Math.random() * 10000);
    return {
        firstName: `Test`,
        lastName: `User${randomId}`,
        email: `testuser${randomId}@example.com`,
        phone: `555${Math.floor(Math.random() * 9000) + 1000}`,
        password: 'Test@123456'
    };
}

/**
 * Generate test product data
 * @returns {Object} - Product object
 */
function generateTestProduct() {
    const productIds = [101, 102, 103, 104, 105];
    const randomProduct = productIds[Math.floor(Math.random() * productIds.length)];

    return {
        id: randomProduct,
        name: `Product ${randomProduct}`,
        price: Math.floor(Math.random() * 500) + 10,
        quantity: Math.floor(Math.random() * 5) + 1
    };
}

/**
 * Generate test order data
 * @returns {Object} - Order object
 */
function generateTestOrder() {
    return {
        orderId: `ORD${Date.now()}`,
        userId: Math.floor(Math.random() * 1000),
        items: [generateTestProduct(), generateTestProduct()],
        shippingAddress: generateTestAddress(),
        createdAt: new Date().toISOString()
    };
}

/**
 * Generate test address data
 * @returns {Object} - Address object
 */
function generateTestAddress() {
    const streets = ['Main St', 'Oak Ave', 'Elm St', 'Pine Rd', 'Maple Dr'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];

    return {
        street: `${Math.floor(Math.random() * 999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`,
        city: cities[Math.floor(Math.random() * cities.length)],
        state: states[Math.floor(Math.random() * states.length)],
        zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        country: 'USA'
    };
}

/**
 * Generate test credit card data
 * @returns {Object} - Credit card object
 */
function generateTestCreditCard() {
    return {
        cardNumber: '4111111111111111',
        expiryMonth: String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'),
        expiryYear: String(new Date().getFullYear() + 5),
        cvv: String(Math.floor(Math.random() * 900) + 100),
        name: 'Test User'
    };
}

/**
 * Create batch of test data
 * @param {number} count - Number of items to generate
 * @param {string} type - Type of data (user, product, order)
 * @returns {Array} - Array of test data
 */
function generateBatchTestData(count, type) {
    const data = [];
    const generators = {
        user: generateTestUser,
        product: generateTestProduct,
        order: generateTestOrder,
        address: generateTestAddress
    };

    const generator = generators[type];
    if (!generator) {
        throw new Error(`Unknown data type: ${type}`);
    }

    for (let i = 0; i < count; i++) {
        data.push(generator());
    }

    return data;
}

/**
 * Merge test data objects
 * @param {...Object} objects - Objects to merge
 * @returns {Object} - Merged object
 */
function mergeTestData(...objects) {
    return objects.reduce((merged, obj) => ({
        ...merged,
        ...obj
    }), {});
}

/**
 * Filter test data
 * @param {Array} data - Array of data objects
 * @param {Object} criteria - Filter criteria
 * @returns {Array} - Filtered array
 */
function filterTestData(data, criteria) {
    return data.filter(item => {
        return Object.keys(criteria).every(key =>
            item[key] === criteria[key]
        );
    });
}

/**
 * Clone test data
 * @param {Object} data - Data to clone
 * @returns {Object} - Deep clone of data
 */
function cloneTestData(data) {
    return JSON.parse(JSON.stringify(data));
}

module.exports = {
    generateTestUser,
    generateTestProduct,
    generateTestOrder,
    generateTestAddress,
    generateTestCreditCard,
    generateBatchTestData,
    mergeTestData,
    filterTestData,
    cloneTestData
};
