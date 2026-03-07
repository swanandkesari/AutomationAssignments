/**
 * Test Data Configuration
 * Centralized test data constants for the application
 */

module.exports = {
    // Valid credentials
    validCredentials: {
        email: 'testuser@demoqa.com',
        password: 'Test@123456',
        firstName: 'John',
        lastName: 'Doe'
    },

    // Invalid credentials
    invalidCredentials: {
        email: 'invalid@example.com',
        password: 'WrongPassword123'
    },

    // Test user data
    testUser: {
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        phone: '5551234567',
        address: '123 Test Street',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345',
        country: 'USA'
    },

    // Form data samples
    formData: {
        textBox: {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            currentAddress: '123 Main Street, Apt 4B',
            permanentAddress: '456 Oak Avenue'
        },
        profile: {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '5559876543'
        }
    },

    // URLs and navigation
    navigationData: {
        homeUrl: '/',
        loginUrl: '/login',
        profileUrl: '/profile',
        searchUrl: '/search',
        checkoutUrl: '/checkout'
    },

    // Test timeouts (in milliseconds)
    timeouts: {
        short: 3000,
        medium: 5000,
        long: 10000,
        veryLong: 30000
    },

    // Assertion messages
    messages: {
        loginSuccess: 'Login successful',
        loginFailed: 'Invalid credentials',
        formSubmitSuccess: 'Form submitted successfully',
        formSubmitFailed: 'Form submission failed'
    },

    // Test environment
    environment: {
        dev: {
            baseURL: 'http://localhost:3000',
            apiURL: 'http://localhost:3001'
        },
        staging: {
            baseURL: 'https://staging.example.com',
            apiURL: 'https://api-staging.example.com'
        },
        prod: {
            baseURL: 'https://www.example.com',
            apiURL: 'https://api.example.com'
        }
    }
};
