const { expect } = require('@playwright/test');

class TextBoxPage {
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
        this.fullNameInput = page.locator('#userName');
        this.emailInput = page.locator('#userEmail');
        this.currentAddressInput = page.locator('#currentAddress');
        this.permanentAddressInput = page.locator('#permanentAddress');
        this.submitButton = page.locator('#submit');
        this.output = page.locator('#output');
    }

    async navigate() {
        await this.page.goto('/text-box');
    }

    async fillForm(fullName, email, currentAddress, permanentAddress) {
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.currentAddressInput.fill(currentAddress);
        await this.permanentAddressInput.fill(permanentAddress);
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async verifyOutput(expectedData) {
        await expect(this.output.locator('#name')).toHaveText(`Name:${expectedData.fullName}`);
        await expect(this.output.locator('#email')).toHaveText(`Email:${expectedData.email}`);
        await expect(this.output.locator('#currentAddress')).toContainText(`Current Address :${expectedData.currentAddress}`);
        // Note: The website has a typo "Permananet" in the output label.
        await expect(this.output.locator('#permanentAddress')).toContainText(`Permananet Address :${expectedData.permanentAddress}`);
    }
}

module.exports = { TextBoxPage };