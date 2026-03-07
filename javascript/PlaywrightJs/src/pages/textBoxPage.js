/**
 * Text Box Page Object
 * Handles all interactions with the text box form page
 */
const BasePage = require('./basePage');

class TextBoxPage extends BasePage {
    constructor(page, appConfig) {
        super(page, appConfig.baseURL);
        this.config = appConfig.textBox;
    }

    /**
     * Navigate to text box page
     */
    async navigateToTextBox() {
        await this.navigate(this.config.url);
    }

    /**
     * Fill full name field
     * @param {string} fullName - Full name value
     */
    async fillFullName(fullName) {
        await this.fillText(this.config.selectors.fullName, fullName);
    }

    /**
     * Fill email field
     * @param {string} email - Email value
     */
    async fillEmail(email) {
        await this.fillText(this.config.selectors.email, email);
    }

    /**
     * Fill current address field
     * @param {string} address - Current address value
     */
    async fillCurrentAddress(address) {
        await this.fillText(this.config.selectors.currentAddress, address);
    }

    /**
     * Fill permanent address field
     * @param {string} address - Permanent address value
     */
    async fillPermanentAddress(address) {
        await this.fillText(this.config.selectors.permanentAddress, address);
    }

    /**
     * Submit the form
     */
    async submitForm() {
        await this.click(this.config.selectors.submit);
        await this.page.waitForTimeout(500);
    }

    /**
     * Fill complete form with data
     * @param {Object} formData - Object containing form field values
     */
    async fillFormWithData(formData) {
        if (formData.fullName) {
            await this.fillFullName(formData.fullName);
        }
        if (formData.email) {
            await this.fillEmail(formData.email);
        }
        if (formData.currentAddress) {
            await this.fillCurrentAddress(formData.currentAddress);
        }
        if (formData.permanentAddress) {
            await this.fillPermanentAddress(formData.permanentAddress);
        }
    }

    /**
     * Get output text after form submission
     * @returns {Promise<string>} - Output text
     */
    async getOutputText() {
        await this.waitForSelector(this.config.selectors.output);
        return await this.getText(this.config.selectors.output);
    }

    /**
     * Verify if output contains expected text
     * @param {string} expectedText - Text to verify
     * @returns {Promise<boolean>} - True if text found in output
     */
    async verifyOutputContains(expectedText) {
        const output = await this.getOutputText();
        return output?.toLowerCase().includes(expectedText.toLowerCase());
    }

    /**
     * Clear all form fields
     */
    async clearForm() {
        const selectors = [
            this.config.selectors.fullName,
            this.config.selectors.email,
            this.config.selectors.currentAddress,
            this.config.selectors.permanentAddress
        ];

        for (const selector of selectors) {
            await this.page.fill(selector, '');
        }
    }
}

module.exports = TextBoxPage;
