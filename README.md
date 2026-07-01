# Playwright-Automation

This repository contains Playwright automation examples for UI, API, network interception, file upload/download, and a Page Object Model (POM) implementation for the client application flow.

## What Was Implemented

- Basic Playwright test patterns and locator strategies
- End-to-end order placement flow for Rahul Shetty client app
- POM design using dedicated page classes and a central PO manager
- Utilities for API login and order creation
- Data-driven testing by moving credentials/product data to JSON
- Network interception and response mocking examples
- Storage state session reuse pattern
- Excel download-edit-upload validation flow

## Project Structure

- `tests/` contains all test specs and support modules
- `tests/pageobjects/` contains POM classes
- `tests/Utils/` contains API utility and JSON test data
- `tests/JavaScript/` contains extra JavaScript and Excel practice files
- `playwright.config.js` contains Playwright test runner settings

## POM Architecture

The end-to-end PO test follows this object chain:

1. `POManager` creates all page objects once per test
2. `LoginPage` handles authentication
3. `DashboardPage` handles product selection and top navigation
4. `CartPage` validates cart and starts checkout
5. `OrdersReviewPage` handles country selection and order submit
6. `OrdersHistoryPage` searches and validates the created order

## Test Data Strategy (Array for Multiple Users)

The file `tests/Utils/placeorderTestData.json` is now used as an array of objects.

Example:

```json
[
  {
    "username": "user1@example.com",
    "password": "password1",
    "productName": "ZARA COAT 3"
  },
  {
    "username": "user2@example.com",
    "password": "password2",
    "productName": "ADIDAS ORIGINAL"
  }
]
```

`tests/ClientAppPO.spec.js` loops through each object and creates one test per dataset. This makes it easy to scale for multiple usernames without duplicating test code.

## Fixtures

This project also includes a custom fixture starter file:

- `tests/Utils/test-basefixture.js`
  - Extends Playwright base test and provides reusable test data (`testDataForOrder`).

Current fixture purpose:

- Keep common test data in one place
- Avoid rewriting the same username/password/product in multiple specs
- Prepare for reusable setup objects in future (for example: PO manager fixture, auth fixture, API fixture)

How fixture usage can look in tests (concept):

```js
const { test } = require('./Utils/test-basefixture');

test('sample', async ({ page, testDataForOrder }) => {
  // use testDataForOrder.username, productName, etc.
});
```

Recommended next fixture upgrade:

1. Export `test` and `expect` directly from the fixture module
2. Inject page objects through fixture scope so tests stay shorter
3. Combine fixture data with JSON array datasets for multi-user runs

## Changes We Made

Below is the main refactor history done in this project so future readers can quickly understand the framework evolution:

1. Introduced and stabilized POM flow
  - Added/updated `LoginPage`, `DashboardPage`, `CartPage`, `OrdersReviewPage`, `OrderHistoryPage`
  - Added/updated `POManager` to centralize page object creation

2. Fixed checkout click stability issue
  - In `OrdersReviewPage`, submit flow now waits for temporary toast/backdrop overlays to disappear before clicking Place Order

3. Added missing page-object navigation methods
  - Restored orders navigation from dashboard path (`navigateToOrders`) used by PO spec

4. Fixed PO manager wiring issue
  - Added missing `OrdersHistoryPage` import/instance in `POManager` so order-history methods are available at runtime

5. Converted PO test to data-driven execution
  - `tests/Utils/placeorderTestData.json` moved to array-driven structure
  - `tests/ClientAppPO.spec.js` loops each dataset (`for ... of`) and runs same E2E flow for each row

6. Fixed test data path issues
  - Corrected JSON import path in `ClientAppPO.spec.js` to local `tests/Utils` location

7. Added comprehensive root documentation
  - Created this root README with architecture, run commands, file-by-file explanations, and maintenance guidance

## Playwright Copy Prompt Option

Playwright provides a very useful option while recording/debugging in VS Code and Inspector to copy generated actions/locators as Playwright code.

Why this is useful:

- Fast way to generate initial locators and action steps
- Helps beginners learn correct Playwright syntax quickly
- Good starting point for hard-to-locate elements

How we should use it in this framework:

1. Capture step using Playwright recorder or Inspector
2. Use copy option to get Playwright snippet
3. Do not paste directly into large spec flow as final code
4. Move locator/action into the correct page object class
5. Replace brittle selectors with role/text/semantic locators when possible
6. Keep assertions in spec layer unless assertion is page-specific behavior

Example workflow in this repository:

1. Copy generated click/type snippet from Playwright tool
2. Add corresponding locator + method in page object (`LoginPage`, `DashboardPage`, etc.)
3. Call that method from `tests/ClientAppPO.spec.js`
4. If test data is needed, read values from `tests/Utils/placeorderTestData.json`

Best practices after using Copy Prompt:

- Remove hardcoded waits and replace with Playwright auto-wait or explicit state checks
- Avoid absolute or fragile CSS selectors
- Keep names meaningful (`searchCountryAndSelect`, `SubmitAndGetOrderId`, etc.)
- Re-run target spec after integrating copied code

Note:

The copy option is meant to accelerate authoring, but maintainability comes from converting generated lines into reusable POM methods and data-driven patterns.

## How to Run

## Automatic Screenshots (on/off/only-on-failure)

You can control automatic screenshot capture in Playwright from the use block in [playwright.config.js](playwright.config.js).

Available screenshot options:

1. on
2. off
3. only-on-failure

Meaning of each option:

1. on
   - Takes screenshot for every test run.
   - Useful while debugging locally.

2. off
   - Disables automatic screenshots.
   - Useful when you want faster runs and minimal artifacts.

3. only-on-failure
   - Takes screenshot only for failed tests.
   - Recommended for CI to reduce storage and keep useful failure evidence.

Example config snippets:

```js
use: {
  screenshot: 'on'
}
```

```js
use: {
  screenshot: 'off'
}
```

```js
use: {
  screenshot: 'only-on-failure'
}
```

Current setting in this repo is on, so Playwright captures screenshots for every test.

## Recording Modes (off/on/retain-on-failure/on-first-retry)

Playwright supports these modes for recording artifacts such as trace and video.

Supported values:

1. off
2. on
3. retain-on-failure
4. on-first-retry

Meaning of each mode:

1. off
   - No artifact recorded.

2. on
   - Record for every test.

3. retain-on-failure
   - Record during run, keep only for failed tests.

4. on-first-retry
   - Record only when the test is retried for the first time.

Trace examples:

```js
use: {
  trace: 'off'
}
```

```js
use: {
  trace: 'on'
}
```

```js
use: {
  trace: 'retain-on-failure'
}
```

```js
use: {
  trace: 'on-first-retry'
}
```

Video examples:

```js
use: {
  video: 'off'
}
```

```js
use: {
  video: 'on'
}
```

```js
use: {
  video: 'retain-on-failure'
}
```

```js
use: {
  video: 'on-first-retry'
}
```

Recommended setup for CI:

1. trace: 'retain-on-failure'
2. video: 'retain-on-failure'

This keeps useful debugging artifacts without storing files for every passing test.

### Record Test Trace (Practical Steps)

If you want to record and inspect test execution in detail, use Playwright trace.

Config example:

```js
use: {
  trace: 'on'
}
```

Run test:

```bash
npx playwright test tests/ClientAppPO.spec.js
```

After execution, Playwright stores trace files under test-results for failed (or configured) runs.

Open a trace file:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

Example from this project logs:

```bash
npx playwright show-trace test-results/ClientAppPO-End-to-End-application/trace.zip
```

When trace is most useful:

1. Click intercepted by overlay/backdrop
2. Timing and wait issues
3. Locator mismatch debugging
4. Cross-browser behavior differences

## Viewport Configuration

Viewport controls the browser page size used during test execution.

Where to set viewport:

1. In global use block inside [playwright.config.js](playwright.config.js)
2. In each project block when using multi-project config

Common viewport sizes:

1. Desktop: 1920 x 1080
2. Laptop: 1366 x 768
3. Tablet: 768 x 1024
4. Mobile: 390 x 844

Example global viewport:

```js
use: {
  viewport: { width: 1366, height: 768 }
}
```

Example project-wise viewport:

```js
projects: [
  {
    name: 'desktop-chrome',
    use: {
      browserName: 'chromium',
      viewport: { width: 1920, height: 1080 }
    }
  },
  {
    name: 'mobile-webkit',
    use: {
      browserName: 'webkit',
      viewport: { width: 390, height: 844 }
    }
  }
]
```

Notes:

1. Keep viewport fixed for stable visual and locator behavior.
2. Use different projects when you need responsive testing.
3. If viewport is not explicitly set, Playwright uses its default context size.

## Running With Multiple Config Files

You can keep multiple Playwright config files in the same project and select one at runtime with the --config option.

Examples in this repository:

- playwright.config.js
- playwright.config copy.js

Run with default config:

npx playwright test

Run with a specific config file:

npx playwright test --config=playwright.config.js

npx playwright test --config="playwright.config copy.js"

Important notes:

1. If file name has spaces, wrap it in quotes.
2. Prefer clean names like playwright.config.local.js, playwright.config.ci.js, playwright.config.chrome.js for easier usage.
3. You can create as many config files as needed for local, CI, smoke, or regression runs.

## Retries (Global Level and Test/File Level)

Retries help stabilize pipelines when a test fails due to temporary issues (network delay, timing spikes, environment instability).

### Global level retries

Set retries once in config for all tests:

```js
const config = defineConfig({
  retries: 2
});
```

Meaning:

1. Playwright runs a failed test again up to 2 times.
2. If it passes on retry, Playwright marks it as flaky.
3. If it keeps failing after all retries, final status is failed.

### File or describe level retries

Override retries for specific suites/files:

```js
test.describe.configure({ retries: 1 });
```

Use this when only one module is unstable and you do not want retries globally for everything.

### Test-level control and retry info

You can check current retry attempt using testInfo:

```js
test('example', async ({ page }, testInfo) => {
  if (testInfo.retry > 0) {
    // logic for retry run only
  }
});
```

### Recommended usage

1. Local debugging: `retries: 0`
2. CI pipeline: `retries: 1` or `retries: 2`
3. Track flaky tests and fix root cause instead of increasing retries too much.

### Race condition: how to fix

Race condition happens when test actions/assertions run before the app is ready (or when parallel tests compete on shared state).

Fix patterns:

1. Prefer explicit waits for stable UI state (`toBeVisible`, `toBeHidden`, `waitForResponse`, `waitForLoadState`).
2. Avoid shared files/data in parallel tests (use unique data per test).
3. Use serial mode for dependent workflow chains.
4. Keep retries as safety net, not primary fix.

Example stabilization with retries in config:

```js
const config = defineConfig({
  retries: 2,
  use: {
    trace: 'on-first-retry'
  }
});
```

### test.skip usage

Use skip when a test should not run in current environment/project.

Always skip:

```js
test.skip('feature under maintenance', async ({ page }) => {
  // not executed
});
```

Conditional skip:

```js
test('runs only on chromium', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Runs only on chromium');
  // test steps
});
```

Describe-level skip:

```js
test.describe.skip('temporarily blocked suite', () => {
  test('case 1', async ({ page }) => {});
  test('case 2', async ({ page }) => {});
});
```

When to use skip vs retries:

1. `test.skip`: known blocker, env limitation, feature not available.
2. `retries`: temporary flaky behavior while root cause is being fixed.

## Serial and Parallel Mode

Playwright can run tests in sequence (serial) or at the same time (parallel).

### What runs in parallel by default

1. Test files run in parallel across worker processes.
2. Tests inside a single file run in sequence by default.

Parallel execution is triggered when:

1. More than one worker is available.
2. There are multiple test files (or parallel suites) ready to run.

### What is a worker

Worker is a separate Playwright test process that executes tests.

1. More workers = more parallel execution.
2. Fewer workers = more sequential behavior.

Default workers:

1. Playwright auto-selects workers based on machine CPU capacity.
2. You can override this in config.

Set workers in config:

```js
const config = defineConfig({
  workers: 4
});
```

Single worker (strict sequence across files):

```js
const config = defineConfig({
  workers: 1
});
```

### Serial mode for dependent tests

Use serial mode when test B depends on test A result.

```js
test.describe.configure({ mode: 'serial' });

test('step 1 login', async ({ page }) => {
  // ...
});

test('step 2 place order', async ({ page }) => {
  // ...
});

test('step 3 verify history', async ({ page }) => {
  // ...
});
```

This is a 3-test sequence example where all tests run in order.

Why add `test.describe.configure({ mode: 'serial' })` when file tests are already sequential by default:

1. It documents intent clearly: these tests are interdependent and must stay ordered.
2. It protects this suite if someone later changes execution settings toward parallel behavior.
3. In serial groups, if one test fails, remaining dependent tests in that group are skipped, reducing noisy failures.
4. It improves maintainability for workflow-style tests (login -> create -> verify) where each step relies on previous state.

Use serial mode for business-flow chains; use parallel mode for independent tests.

### Parallel mode inside same file/suite

```js
test.describe.configure({ mode: 'parallel' });
```

Use this only when tests are fully independent (no shared state/order dependency).

What this line does:

1. It tells Playwright to run tests inside the same describe/file in parallel.
2. Each test gets its own isolated browser context and page.

Where you used it:

1. `tests/MoreValidation.spec.js` has `test.describe.configure({mode:'parallel'})`.

When this is good:

1. Tests are independent and do not rely on previous test steps.
2. No shared mutable data between tests.
3. Faster execution is needed.

When to avoid:

1. Tests depend on strict order (step-1 then step-2 then step-3).
2. Tests write/read the same file name or shared external resource at the same time.

Safe pattern for parallel tests:

1. Keep unique test data per test.
2. Avoid globals that can be mutated.
3. Use serial mode for dependent workflows.

## Parameterized Config (Projects)

In your alternate config file, you have parameterized execution by defining multiple projects:

1. safari execution
2. chrome execution

Each project can have different values for:

1. browserName
2. headless
3. screenshot
4. trace

This is useful when you want one command to run different browser profiles with different runtime behavior.

How to run parameterized config file:

1. Run all projects in that config:

```bash
npx playwright test --config="playwright.config copy.js"
```

2. Run only Safari project:

```bash
npx playwright test --config="playwright.config copy.js" --project="safari execution"
```

3. Run only Chrome project:

```bash
npx playwright test --config="playwright.config copy.js" --project="chrome execution"
```

Tip:

If possible, rename the file to a clean name like playwright.config.projects.js to avoid quotes and improve readability.

## Devices (Playwright Emulation)

Playwright supports built-in device profiles to emulate mobile/tablet behavior (viewport, user agent, touch, etc.).

In your config, device emulation is already used with:

```js
...devices['iPhone 11 Pro']
```

How to use devices in config:

1. Import devices:

```js
import { defineConfig, devices } from '@playwright/test';
```

2. Apply device profile in a project use block:

```js
projects: [
  {
    name: 'mobile-iphone',
    use: {
      ...devices['iPhone 11 Pro']
    }
  }
]
```

How to run device project:

```bash
npx playwright test --config="playwright.config copy.js" --project="chrome execution"
```

Common built-in device profiles:

1. iPhone 11 Pro
2. Pixel 5
3. iPad Pro 11
4. Desktop Chrome
5. Desktop Safari

Important notes:

1. If you spread a device profile, it can override viewport and some browser context options.
2. Keep a separate desktop project and mobile project for clearer reporting.
3. Use device projects when validating responsive UI and touch interactions.

## Ignore HTTPS Errors (SSL Certificate Issues)

When testing lower environments (dev/qa/stage), you may see SSL certificate errors such as insecure/self-signed certificate failures.

Playwright can bypass these with ignoreHTTPSErrors.

Global config example:

```js
use: {
  ignoreHTTPSErrors: true
}
```

Project-specific example:

```js
projects: [
  {
    name: 'qa-env',
    use: {
      browserName: 'chromium',
      ignoreHTTPSErrors: true
    }
  }
]
```

When to use:

1. Non-production environments with self-signed certs
2. Internal URLs where SSL chain is not fully trusted

Do not use by default in production validation because it can hide real TLS/certificate issues.

Recommended approach:

1. Keep strict SSL in normal runs
2. Enable ignoreHTTPSErrors only for specific config/project where needed
3. Document why it is enabled for that environment

## Permissions and Geolocation

Playwright lets you control browser permissions (camera, microphone, clipboard, geolocation, notifications, etc.) and mock user location.

Common permissions used in tests:

1. geolocation
2. notifications
3. camera
4. microphone
5. clipboard-read
6. clipboard-write

Global config example:

```js
use: {
  permissions: ['geolocation'],
  geolocation: { latitude: 12.9716, longitude: 77.5946 }
}
```

Project-specific example:

```js
projects: [
  {
    name: 'location-india',
    use: {
      browserName: 'chromium',
      permissions: ['geolocation'],
      geolocation: { latitude: 28.6139, longitude: 77.2090 }
    }
  }
]
```

Test-level override example:

```js
test('location based scenario', async ({ context, page }) => {
  await context.grantPermissions(['geolocation']);
  await context.setGeolocation({ latitude: 19.0760, longitude: 72.8777 });
  await page.goto('https://example.com');
});
```

Best practices:

1. Set permissions only when a test needs them.
2. Keep geolocation values fixed for deterministic results.
3. Use separate projects for geo-based validations (for example: india, us, eu).
4. Clear context between tests to avoid permission leakage.

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Run PO data-driven test only:

```bash
npx playwright test tests/ClientAppPO.spec.js
```

Open HTML report:

```bash
npx playwright show-report
```

## JavaScript Files Explained

### Root Files

- `playwright.config.js`
  - Defines test directory, timeouts, reporter, browser, screenshot, and trace settings.
- `package.json`
  - Project metadata, scripts, and dependencies (`@playwright/test`, `exceljs`).

### Test Specs in `tests/`

- `ClientApp.spec.js`
  - UI end-to-end flow without POM (direct locator style).
- `ClientAppOtherWay.spec.js`
  - Same app flow using role/placeholder-focused locators.
- `ClientAppPO.spec.js`
  - Main POM-based end-to-end test using array-based test data.
- `WebAPiPart1.spec.js`
  - Creates order via API and validates it in UI using stored auth token.
- `WebAPiPart2.spec.js`
  - Intercepts order history API and mocks response payload.
- `Networktest.spec.js`
  - Request interception/security check by rewriting order-details URL.
- `Networktest1.spec.js`
  - Demonstrates storage state reuse approach (session persistence).
- `UIBasicsTest.spec.js`
  - Demonstrates Playwright special locators (`getByRole`, `getByLabel`, etc.).
- `MoreValidation.spec.js`
  - Popup handling, iframe handling, screenshots, and visual comparison.
- `Calender.spec.js`
  - Date picker selection and input assertions.
- `upload-download.spec.js`
  - Downloads Excel, edits value with `exceljs`, uploads and validates UI result.
- `llc.spec.js`
  - Core Playwright practice examples (contexts, controls, events, child tabs).

### POM Classes in `tests/pageobjects/`

- `LoginPage.js`
  - Handles opening app URL and login actions.
- `DashboardPage.js`
  - Handles product search/add-to-cart and navigation to cart/orders.
- `CartPage.js`
  - Handles cart product validation and checkout click.
- `OrdersReviewPage.js`
  - Handles country selection, submit click, and order ID retrieval.
  - Includes waits for transient overlay/toast before submit.
- `OrderHistoryPage.js`
  - Handles order table search and final order ID read.
- `POManager.js`
  - Central constructor/getter layer for all page objects.

### Utils in `tests/Utils/`

- `APiUtils.js`
  - Provides `getToken()` and `createOrder()` helper methods for API-driven setup.
- `placeorderTestData.json`
  - Data source for PO test; supports multiple usernames via array entries.

### Additional Practice in `tests/JavaScript/`

- `excelDemo.js`
  - Excel update helper and upload/download flow practice code.



