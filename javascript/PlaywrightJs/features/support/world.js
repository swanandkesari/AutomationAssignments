/**
 * World - Shared context for all scenarios
 * Contains page objects and shared state
 */
const { setWorldConstructor } = require('@cucumber/cucumber');
const appConfig = require('../../src/config/app_config');
const testData = require('../../src/config/testData');
const HomePage = require('../../src/pages/homePage');
const TextBoxPage = require('../../src/pages/textBoxPage');
const MenuPage = require('../../src/pages/menuPage');
const CheckBoxPage = require('../../src/pages/checkBoxPage');

class World {
    constructor() {
        this.appConfig = appConfig;
        this.testData = testData;
        this.browser = null;
        this.page = null;

        // Page objects (will be initialized after page is created)
        this.homePage = null;
        this.textBoxPage = null;
        this.menuPage = null;
        this.checkBoxPage = null;
    }

    /**
     * Initialize page objects
     * Call this after creating the page
     */
    initializePageObjects() {
        this.homePage = new HomePage(this.page, this.appConfig);
        this.textBoxPage = new TextBoxPage(this.page, this.appConfig);
        this.menuPage = new MenuPage(this.page, this.appConfig);
        this.checkBoxPage = new CheckBoxPage(this.page, this.appConfig);
    }

    /**
     * Close browser and cleanup
     */
    async cleanup() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.page = null;
            this.homePage = null;
            this.textBoxPage = null;
            this.menuPage = null;
            this.checkBoxPage = null;
        }
    }
}

setWorldConstructor(World);
module.exports = World;
