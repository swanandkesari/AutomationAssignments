const { Given, When, Then } = require('@cucumber/cucumber');
const { CheckBoxPage } = require('../../pages/checkBox.page');

Given('I am on the Check Box page', async function () {
    this.checkBoxPage = new CheckBoxPage(this.page);
    await this.checkBoxPage.navigate();
});

When('I expand the checkbox tree', async function () {
    await this.checkBoxPage.expandAll();
});

When('I select the following checkboxes:', async function (dataTable) {
    const labels = dataTable.hashes().map(row => row.name);
    this.selectedBoxes = labels; // Store for verification step
    for (const label of labels) {
        await this.checkBoxPage.selectCheckbox(label);
    }
});

Then('I should see the selected results displayed correctly', async function () {
    await this.checkBoxPage.verifySelection(this.selectedBoxes);
});
