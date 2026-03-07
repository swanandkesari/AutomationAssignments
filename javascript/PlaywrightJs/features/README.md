# Playwright JS Automation Framework

## Project Overview
This project automates the [DemoQA](https://demoqa.com/) application using **Playwright** and **CucumberJS**.

## Project Evolution & Structure
We are evolving the framework from a flat structure to a modular one:

- **`config/`**: Centralized configuration (URLs, Selectors).
- **`features/`**: Contains Gherkin `.feature` files.
- **`features/step_definitions/`**: Contains step definition logic (JavaScript).
- **`features/support/`**: Helper files like `logger.js` and hooks.
- **`reports/`**: Test execution reports.
- **`screenshots/`**: Failure or manual screenshots.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests
### Run All Tests
```bash
npx cucumber-js
```

### Run Specific Feature
```bash
npx cucumber-js features/home.feature
```

### Reports
Check the `reports/` folder for JSON/HTML reports after execution.