/**
 * CheckBox Page Object
 * Handles all checkbox-related interactions
 */
const BasePage = require('./basePage');

class CheckBoxPage extends BasePage {
    constructor(page, appConfig) {
        super(page, appConfig);
        this.config = appConfig.checkBox;
    }

    /**
     * Navigate to checkbox page
     */
    async navigateToCheckBox() {
        await this.navigate(this.config.url);
    }

    /**
     * Expand all checkboxes in the tree
     */
    async expandAll() {
        try {
            const expandButton = this.config.selectors.expandButton;
            await this.click(expandButton);
            await this.page.waitForTimeout(1000);
        } catch (error) {
            console.log('Expand all button not found, continuing anyway');
        }
    }

    /**
     * Select checkbox by name
     * @param {string} checkboxName - Name of checkbox to select
     */
    async selectCheckbox(checkboxName) {
        // Try multiple selector strategies
        const selectors = [
            // Try primary selector from config
            this.config.selectors.checkbox.replace('{name}', checkboxName),
            // Try alternative selectors
            `.rct-item-label:has-text("${checkboxName}") >> ../input`,
            `label:has-text("${checkboxName}")`,
            `.rct-title:has-text("${checkboxName}")`,
            `span:has-text("${checkboxName}")`
        ];

        let lastError;
        for (const selector of selectors) {
            try {
                await this.click(selector);
                await this.page.waitForTimeout(300);
                return;
            } catch (error) {
                lastError = error;
                // Try next selector
            }
        }

        throw new Error(`Could not find checkbox for "${checkboxName}": ${lastError?.message}`);
    }

    /**
     * Get selected results text
     */
    async getSelectedResults() {
        const resultSelector = this.config.selectors.result;
        return await this.getText(resultSelector);
    }

    /**
     * Verify result text contains expected value
     * @param {string} expectedText - Text to search for in results
     */
    async verifyResultContains(expectedText) {
        const resultText = await this.getSelectedResults();
        if (!resultText || !resultText.toLowerCase().includes(expectedText.toLowerCase())) {
            throw new Error(`Expected to find "${expectedText}" in results, but got: "${resultText}"`);
        }
    }

    /**
     * Verify checkbox is selected
     * @param {string} checkboxName - Name of checkbox
     */
    async isCheckboxSelected(checkboxName) {
        const checkboxSelector = this.config.selectors.checkbox
            .replace('{name}', checkboxName);

        return await this.isVisible(checkboxSelector);
    }

    /**
     * Collapse all checkboxes
     */
    async collapseAll() {
        try {
            const collapseButton = this.config.selectors.collapseButton;
            await this.click(collapseButton);
            await this.page.waitForTimeout(1000);
        } catch (error) {
            console.log('Collapse all button not found');
        }
    }
}

module.exports = CheckBoxPage;
