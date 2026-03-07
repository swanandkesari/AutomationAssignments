const { Given, When, Then } = require('@cucumber/cucumber');
const { TextBoxPage } = require('../../pages/textBox.page');

Given('I am on the Text Box page', async function () {
    this.textBoxPage = new TextBoxPage(this.page);
    await this.textBoxPage.navigate();
});

When('I fill the form with the following details:', async function (dataTable) {
    const data = dataTable.hashes()[0];
    this.formData = {
        fullName: data['Full Name'],
        email: data['Email'],
        currentAddress: data['Current Address'],
        permanentAddress: data['Permanent Address']
    };
    await this.textBoxPage.fillForm(
        this.formData.fullName,
        this.formData.email,
        this.formData.currentAddress,
        this.formData.permanentAddress
    );
});

When('I submit the form', async function () {
    await this.textBoxPage.submitForm();
});

Then('I should see the submitted details displayed correctly', async function () {
    await this.textBoxPage.verifyOutput(this.formData);
});