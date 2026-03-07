# Refactored Playwright + Cucumber Framework

## Overview
This is a professional, scalable test automation framework built with **Playwright** and **Cucumber** (BDD) following the **Page Object Model (POM)** architecture. The framework is designed to handle testing of complex web applications with clean separation of concerns.

## Framework Architecture

### Directory Structure
```
javascript/PlaywrightJs/
├── src/
│   ├── pages/                    # Page Objects
│   │   ├── basePage.js          # Base class with common methods
│   │   ├── homePage.js          # Home page interactions
│   │   ├── textBoxPage.js       # Form page interactions
│   │   ├── menuPage.js          # Menu navigation
│   │   ├── userAccountPage.js   # User account management
│   │   └── searchPage.js        # Search functionality
│   ├── utils/                    # Utility modules
│   │   ├── browserUtils.js      # Browser-related utilities (9 functions)
│   │   ├── commonUtils.js       # Common utility functions (10 functions)
│   │   ├── apiUtils.js          # API interaction utilities (7 functions)
│   │   └── dataUtils.js         # Test data generation utilities (8 functions)
│   └── config/
│       ├── app_config.js        # Application configuration & selectors
│       └── testData.js          # Centralized test data & constants
├── features/
│   ├── home.feature             # Home page tests
│   ├── text_box.feature         # Form submission tests
│   ├── menu_validation.feature  # Menu navigation tests
│   ├── check_box.feature        # Checkbox selection tests
│   ├── authentication.feature   # Login/Registration tests
│   ├── user_account.feature     # User account management tests
│   ├── search.feature           # Search functionality tests
│   ├── step-definitions/        # Step implementations
│   │   ├── common_utils_steps.js    # Shared/utility steps
│   │   ├── home_steps.js            # Home page steps
│   │   ├── textBox_steps.js         # Form steps
│   │   ├── menu_steps.js            # Menu steps
│   │   ├── check_box_steps.js       # Checkbox steps
│   │   ├── authentication_steps.js  # Auth steps
│   │   ├── user_account_steps.js    # User account steps
│   │   ├── search_steps.js          # Search steps
│   │   └── cucumber.js              # Cucumber configuration
│   └── support/
│       ├── world.js             # Test context & page object instances
│       └── hooks.js             # Before/After lifecycle hooks
├── config/
│   └── app_config.js            # Page selectors and URLs
├── logs/                        # Test execution logs
├── reports/                     # Test reports
│   ├── cucumber_report.html
│   └── cucumber_report.json
├── screenshots/                 # Test screenshots
├── package.json                 # Dependencies
└── playwright.config.js        # Playwright configuration
```

## Key Components

### 1. Page Objects (src/pages/)
Each page has a dedicated class that encapsulates page-specific interactions:

**BasePage** (Parent Class)
- `navigate(url)` - Navigate to a URL
- `click(selector)` - Click an element
- `fillText(selector, text)` - Fill text in input
- `getText(selector)` - Get element text
- `isVisible(selector)` - Check visibility
- `waitForSelector(selector)` - Wait for element
- `getElementCount(selector)` - Count elements
- `hover(selector)` - Hover over element
- `takeScreenshot(name)` - Take screenshot
- `getURL()` - Get current URL
- `tryMultipleSelectors(selectors)` - Try multiple selectors

**HomePage**
- `navigateToHome()` - Navigate to home
- `getCategoryCardCount()` - Get category count
- `verifyCategoryCount(count)` - Verify count matches
- `clickOnCategory(name)` - Click category
- `getAllCategoryTitles()` - Get all titles

**TextBoxPage**
- `fillFullName(name)` - Fill name field
- `fillEmail(email)` - Fill email field
- `fillCurrentAddress(address)` - Fill current address
- `fillPermanentAddress(address)` - Fill permanent address
- `submitForm()` - Submit form
- `fillFormWithData(data)` - Fill form with object
- `getOutputText()` - Get form output
- `verifyOutputContains(text)` - Verify output text
- `clearForm()` - Clear all fields

**MenuPage**
- `clickMenuItem(name)` - Click menu item
- `hoverOverMenuItem(name)` - Hover menu item
- `isMenuItemVisible(name)` - Check visibility
- `navigateToSubSubList(path)` - Navigate submenu
- `navigateToSubSubItem2(path)` - Navigate deeper
- `verifySubMenuVisible(name)` - Check submenu visible

**UserAccountPage** (NEW)
- `navigateToUserAccount()` - Navigate to account
- `updateUserProfile(data)` - Update profile
- `getUserInfo()` - Get user information
- `changePassword(newPassword)` - Change password
- `logout()` - Logout user

**SearchPage** (NEW)
- `navigateToSearch()` - Navigate to search
- `search(query)` - Perform search
- `getResultsCount()` - Get result count
- `getResultTitles()` - Get all result titles
- `clickResultByIndex(index)` - Click result
- `applyFilter(filter)` - Apply filter

### 2. Utilities (src/utils/)

**browserUtils.js** (9 functions)
- `getPageTitle()` - Get page title
- `waitForNavigation()` - Wait for navigation
- `elementExists(selector)` - Check element exists
- `getAllPageText()` - Get all page text
- `executeScript(script)` - Execute JavaScript
- `getAllCookies()` - Get all cookies
- `setCookie(name, value)` - Set cookie
- `clearAllCookies()` - Clear cookies
- `setViewport(width, height)` - Set viewport

**commonUtils.js** (10 functions)
- `generateRandomString(length)` - Generate random string
- `generateRandomEmail()` - Generate random email
- `getCurrentTimestamp()` - Get current timestamp
- `formatDate(date, format)` - Format date
- `delay(ms)` - Wait/delay
- `retry(fn, maxAttempts)` - Retry function
- `objectsEqual(obj1, obj2)` - Compare objects
- `parseQueryParams(url)` - Parse URL params
- `capitalize(str)` - Capitalize string
- `removeSpecialChars(str)` - Remove special chars

**apiUtils.js** (7 functions) - NEW
- `apiGet(url)` - GET request
- `apiPost(url, body)` - POST request
- `apiPut(url, body)` - PUT request
- `apiDelete(url)` - DELETE request
- `mockApiResponse(pattern, response)` - Mock API
- `waitForApiResponse(pattern, timeout)` - Wait for API
- `getRequestHeaders()` - Get headers

**dataUtils.js** (8 functions) - NEW
- `generateTestUser()` - Generate test user
- `generateTestProduct()` - Generate test product
- `generateTestOrder()` - Generate test order
- `generateTestAddress()` - Generate test address
- `generateTestCreditCard()` - Generate test card
- `generateBatchTestData(count)` - Generate batch
- `mergeTestData(obj1, obj2)` - Merge data
- `filterTestData(data, criteria)` - Filter data
- `cloneTestData(data)` - Clone data

### 3. Configuration (src/config/)

**app_config.js**
- Base URL configuration
- Page-specific selectors and URLs
- Example structure:
```javascript
module.exports = {
    baseURL: 'https://demoqa.com',
    home: { url: '/action/windows', selectors: {...} },
    textBox: { url: '/elements/text-box', selectors: {...} },
    checkBox: { url: '/elements/checkbox', selectors: {...} },
    menu: { url: '/interaction/mouse-actions', selectors: {...} }
}
```

**testData.js** - NEW
- Valid/Invalid credentials
- Test user data
- Form data templates
- Navigation data
- Timeouts and messages
- Supports multiple environments

### 4. Step Definitions (features/step-definitions/)

**Organization Strategy: Hybrid Approach**
- **common_utils_steps.js** - Shared/generic steps used across features
- **Feature-specific files** - Steps specific to each feature:
  - `home_steps.js` - Home page navigation
  - `textBox_steps.js` - Form submission
  - `menu_steps.js` - Menu interactions
  - `check_box_steps.js` - Checkbox selection
  - `authentication_steps.js` - Login/Registration
  - `user_account_steps.js` - Account management
  - `search_steps.js` - Search functionality

This hybrid approach provides:
- **Scalability** - Each feature has focused steps
- **Reusability** - Common steps in shared file
- **Maintainability** - Easy to find and update steps
- **Clarity** - Clear separation of concerns

### 5. World Context (features/support/world.js)
Shared context for all scenarios:
- `appConfig` - Application configuration
- `testData` - Test data constants
- `browser` - Playwright browser instance
- `page` - Playwright page instance
- `homePage`, `textBoxPage`, `menuPage`, `userAccountPage`, `searchPage` - Page objects
- `initializePageObjects()` - Initialize all page objects
- `cleanup()` - Cleanup resources

### 6. Hooks (features/support/hooks.js)
Lifecycle management:
- **Before hook** - Launch browser, create page, initialize page objects
- **After hook** - Close page, context, browser, cleanup

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Specific Feature
```bash
npx cucumber-js features/home.feature
```

### Run Tests with Tags
```bash
npx cucumber-js --tags "@smoke"
```

### Generate Reports
```bash
npm run report
```

## Best Practices

### 1. Page Object Principles
- One page object per page/section
- Encapsulate element locators
- Private selectors, public methods
- No test logic in page objects

### 2. Step Definition Principles
- "Given" for setup (preconditions)
- "When" for actions
- "Then" for verification
- Use page objects, not direct browser calls
- Reusable and descriptive

### 3. Test Data Management
- Use `testData.js` for constants
- `dataUtils.js` for dynamic generation
- Keep test data separate from logic
- Support multiple environments

### 4. Assertion Strategy
- Clear error messages
- Use business language
- Fail fast with meaningful context
- Include actual vs expected values

### 5. Framework Maintenance
- Keep page objects focused
- Share common functionality in BasePage
- Don't repeat selectors in multiple places
- Document complex logic

## Adding New Features

### Step 1: Create Feature File
```gherkin
# features/new_feature.feature
Feature: New Feature Description
  Scenario: Clear description of test
    Given precondition
    When action
    Then verification
```

### Step 2: Create Page Object (if needed)
```javascript
// src/pages/newFeaturePage.js
const BasePage = require('./basePage');

class NewFeaturePage extends BasePage {
    // Page-specific methods
}

module.exports = NewFeaturePage;
```

### Step 3: Create Step Definitions
```javascript
// features/step-definitions/new_feature_steps.js
const { Given, When, Then } = require('@cucumber/cucumber');

Given('precondition', async function () {
    // Implementation
});
```

### Step 4: Update World.js
Add new page object initialization:
```javascript
this.newFeaturePage = new NewFeaturePage(this.page, this.appConfig);
```

### Step 5: Add to app_config.js
```javascript
newFeature: {
    url: '/path/to/feature',
    selectors: { /* ... */ }
}
```

## Technologies Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Playwright | 1.40.0 | Browser automation |
| @cucumber/cucumber | 9.5.1 | BDD test framework |
| Node.js | v25.2.1 | Runtime |
| Gherkin | - | Test specification language |

## Environment Variables

Configure in `vscode.env` or environment:
```
ENVIRONMENT=dev
HEADLESS=true
SCREENSHOT_ON_FAILURE=true
LOG_LEVEL=debug
```

## Troubleshooting

### Tests not finding elements
- Check selectors in `app_config.js`
- Verify page has loaded (`waitForLoadState`)
- Use browser dev tools to inspect elements
- Try alternative selectors with `tryMultipleSelectors()`

### Flaky tests
- Increase timeouts in `testData.js`
- Use `waitForSelector()` instead of direct operations
- Add strategic delays with `delay()`
- Ensure proper synchronization

### Browser issues
- Clear browser cache
- Update Playwright: `npm install -D @playwright/test@latest`
- Check Node.js compatibility
- Review Playwright documentation

## Future Enhancements

- [ ] API testing integration
- [ ] Visual regression testing
- [ ] Performance testing
- [ ] Accessibility testing
- [ ] Mobile testing
- [ ] CI/CD pipeline integration
- [ ] Test parallelization
- [ ] Advanced reporting with screenshots/videos

## Contributing

When contributing:
1. Follow naming conventions (camelCase for methods, PascalCase for classes)
2. Add descriptive comments for complex logic
3. Update documentation for new features
4. Test thoroughly before committing
5. Keep commits focused and well-documented
6. Follow the DRY (Don't Repeat Yourself) principle

## Contact & Support

For questions or issues, please refer to:
- Playwright Docs: https://playwright.dev
- Cucumber Docs: https://cucumber.io
- Project documentation in individual files
