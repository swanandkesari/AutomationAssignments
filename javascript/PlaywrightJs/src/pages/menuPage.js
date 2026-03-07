/**
 * Menu Page Object
 * Handles all interactions with the menu page
 */
const BasePage = require('./basePage');

class MenuPage extends BasePage {
    constructor(page, appConfig) {
        super(page, appConfig.baseURL);
        this.config = appConfig.menu;
    }

    /**
     * Navigate to menu page
     */
    async navigateToMenu() {
        await this.navigate(this.config.url);
    }

    /**
     * Click on main menu item
     * @param {string} itemText - Text of menu item to click
     */
    async clickMenuItem(itemText) {
        const selector = `a:has-text("${itemText}")`;
        await this.click(selector);
    }

    /**
     * Hover over menu item
     * @param {string} itemText - Text of menu item to hover
     */
    async hoverOverMenuItem(itemText) {
        const selector = `a:has-text("${itemText}")`;
        await this.hover(selector);
    }

    /**
     * Verify menu item is visible
     * @param {string} itemText - Text of menu item
     * @returns {Promise<boolean>} - True if visible
     */
    async isMenuItemVisible(itemText) {
        const selector = `a:has-text("${itemText}")`;
        return await this.isVisible(selector);
    }

    /**
     * Click on main item 1
     */
    async clickMainItem1() {
        await this.clickMenuItem('Main Item 1');
    }

    /**
     * Click on main item 2
     */
    async clickMainItem2() {
        await this.clickMenuItem('Main Item 2');
    }

    /**
     * Click on main item 3
     */
    async clickMainItem3() {
        await this.clickMenuItem('Main Item 3');
    }

    /**
     * Navigate to sub sub list
     */
    async navigateToSubSubList() {
        // Hover over main item 1 to reveal submenu
        await this.hoverOverMenuItem('Main Item 1');
        await this.page.waitForTimeout(300);

        // Hover over sub item to reveal sub-sub items
        await this.hoverOverMenuItem('Sub Item 1');
        await this.page.waitForTimeout(300);

        // Click on Sub Sub List
        await this.clickMenuItem('Sub Sub List');
    }

    /**
     * Navigate to sub sub item 2
     */
    async navigateToSubSubItem2() {
        // Navigate to sub sub list first
        await this.navigateToSubSubList();
        await this.page.waitForTimeout(300);

        // Click on Sub Sub Item 2
        await this.clickMenuItem('Sub Sub Item 2');
    }

    /**
     * Verify sub menu items are visible after hover
     * @param {string} parentItem - Parent menu item text
     * @returns {Promise<boolean>} - True if any submenu items visible
     */
    async verifySubMenuVisible(parentItem) {
        await this.hoverOverMenuItem(parentItem);
        await this.page.waitForTimeout(300);

        // Check for common submenu items
        const selectors = [
            'a:has-text("Sub Item 1")',
            'a:has-text("Sub Item 2")',
            'a:has-text("Sub Sub List")'
        ];

        return await this.tryMultipleSelectors(selectors);
    }
}

module.exports = MenuPage;
