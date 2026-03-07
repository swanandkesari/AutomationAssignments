/**
 * User Account Page Object
 * Handles user account/profile page interactions
 */
const BasePage = require('./basePage');

class UserAccountPage extends BasePage {
    constructor(page, appConfig) {
        super(page, appConfig.baseURL);
        this.config = appConfig.userAccount || {};
    }

    /**
     * Navigate to user account page
     */
    async navigateToUserAccount() {
        if (this.config.url) {
            await this.navigate(this.config.url);
        }
    }

    /**
     * Update user profile
     * @param {Object} userData - User data to update
     */
    async updateUserProfile(userData) {
        if (userData.firstName) {
            await this.fillText('#firstName', userData.firstName);
        }
        if (userData.lastName) {
            await this.fillText('#lastName', userData.lastName);
        }
        if (userData.email) {
            await this.fillText('#email', userData.email);
        }
    }

    /**
     * Get current user information displayed on page
     * @returns {Promise<Object>} - User information
     */
    async getUserInfo() {
        return {
            firstName: await this.getText('.user-first-name'),
            lastName: await this.getText('.user-last-name'),
            email: await this.getText('.user-email')
        };
    }

    /**
     * Change password
     * @param {string} oldPassword - Current password
     * @param {string} newPassword - New password
     */
    async changePassword(oldPassword, newPassword) {
        await this.fillText('#oldPassword', oldPassword);
        await this.fillText('#newPassword', newPassword);
        await this.fillText('#confirmPassword', newPassword);
        await this.click('#changePasswordBtn');
    }

    /**
     * Logout user
     */
    async logout() {
        await this.click('.logout-btn');
    }
}

module.exports = UserAccountPage;
