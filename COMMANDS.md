# Playwright Commands Reference

## Installation

```bash
# Install project dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install a specific browser only
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/ClientApp.spec.js
npx playwright test tests/UIBasicsTest.spec.js

# Run tests matching a keyword in the title
npx playwright test -g "login"

# Run tests in a specific folder
npx playwright test tests/
```

---

## Browser Options

```bash
# Run in headed mode (visible browser)
npx playwright test --headed

# Run in a specific browser
npx playwright test --browser=chromium
npx playwright test --browser=firefox
npx playwright test --browser=webkit

# Run in all browsers
npx playwright test --browser=all
```

---

## Debugging

```bash
# Run in debug mode (opens Playwright Inspector)
npx playwright test --debug

# Debug a specific file
npx playwright test tests/ClientApp.spec.js --debug

# Run in UI mode (interactive test runner)
npx playwright test --ui
```

---

## Reports

```bash
# Open the last HTML report
npx playwright show-report

# Run tests and open report automatically
npx playwright test --reporter=html ; npx playwright show-report
```

---

## Retries & Workers

```bash
# Retry failed tests (e.g., 2 retries)
npx playwright test --retries=2

# Run tests with a specific number of parallel workers
npx playwright test --workers=4

# Run tests serially (1 worker)
npx playwright test --workers=1
```

---

## Misc

```bash
# List all available tests without running them
npx playwright test --list

# Show Playwright version
npx playwright --version
```
