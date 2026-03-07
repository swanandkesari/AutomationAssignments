/**
 * Step Definitions for Checkbox feature
 * Handles checkbox expansion and selection
 */
const { When, Then } = require('@cucumber/cucumber');

When('I expand all checkboxes', async function () {
    await this.checkBoxPage.expandAll();
});

When('I select the {string} checkbox', async function (checkboxName) {
    await this.checkBoxPage.selectCheckbox(checkboxName);
});

Then('I should see {string} in the selected results', async function (result) {
    await this.checkBoxPage.verifyResultContains(result);
});

