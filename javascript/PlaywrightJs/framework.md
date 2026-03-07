# Playwright JS Framework Structure

This document outlines the folder structure for the Playwright JS automation framework. The structure is designed to be modular and scalable, evolving from a flat structure to a more organized one.

## Root Directory (`javascript/PlaywrightJs/`)

### `config/`
- **Purpose**: To store all centralized configurations for the framework.
- **Contents**:
    - `app_config.js`: Contains application-specific configurations like base URLs, API endpoints, and global selectors.

### `data/`
- **Purpose**: To store test data that can be used across different tests, separating data from test logic.
- **Contents**:
    - JSON or YAML files (e.g., `users.json`) that can be easily read and used in your tests.

### `pages/`
- **Purpose**: To implement the Page Object Model (POM). Each file represents a page or a reusable component of the application.
- **Contents**:
    - Page classes that encapsulate element selectors and methods for interacting with the page (e.g., `home.page.js`).
    - Component classes for reusable UI elements like headers or modals (e.g., `header.component.js`).

### `features/`
- **Purpose**: This directory is the core of the Cucumber setup, containing feature files and their corresponding step definitions.
- **Contents**:
    - **`.feature` files**: Gherkin files that describe application features in a human-readable format (e.g., `home.feature`).
    - **`step_definitions/`**:
        - **Purpose**: Contains the JavaScript implementation for the steps defined in the `.feature` files.
        - **Contents**: `_steps.js` files that map Gherkin steps to executable code.
    - **`support/`**:
        - **Purpose**: Holds helper files, hooks (`Before`, `After`), and other supporting code for the test execution.
        - **Contents**: `logger.js`, `hooks.js`, world objects, etc.

### `reports/`
- **Purpose**: To store the output of test runs.
- **Contents**:
    - JSON, HTML, and other formats of test execution reports. These are generated after running the tests.

### `screenshots/`
- **Purpose**: To save screenshots taken during test execution.
- **Contents**:
    - Screenshots are typically captured on test failure to aid in debugging.

### `utils/`
- **Purpose**: To store reusable utility functions and helper classes that are not specific to a single page or test.
- **Contents**:
    - API clients, data generators, or other generic helper modules (e.g., `apiHelper.js`).

## Other Important Files
- **`package.json`**: Defines project dependencies and scripts for running tests.
- **`TEST_PLAN.md`**: The test plan for the DemoQA application automation.