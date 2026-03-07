/**
 * Step Definitions for Text Box feature
 * Handles form filling and submission
 */
const { When, Then } = require('@cucumber/cucumber');

When('I fill the text box form with:', async function (dataTable) {
    const rows = dataTable.rows();
    const formData = {};

    for (let i = 1; i < rows.length; i++) {
        const [label, value] = rows[i];
        if (label === 'Full Name') {
            formData.fullName = value;
        } else if (label === 'Email') {
            formData.email = value;
        } else if (label === 'Current Address') {
            formData.currentAddress = value;
        } else if (label === 'Permanent Address') {
            formData.permanentAddress = value;
        }
    }

    await this.textBoxPage.fillFormWithData(formData);
});

When('I click the submit button', async function () {
    await this.textBoxPage.submitForm();
});

Then('I should see the submitted data in the output', async function () {
    const output = await this.textBoxPage.getOutputText();
    if (!output || output.trim() === '') {
        throw new Error('Output section is empty');
    }
});
