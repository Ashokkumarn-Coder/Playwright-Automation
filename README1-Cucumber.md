# Cucumber.js Setup And Configuration

This guide sets up Cucumber (Gherkin) support in this project without changing the existing Playwright flow.

Reference: https://github.com/cucumber/cucumber-js

## 1) Install Cucumber

Run:

```bash
npm install @cucumber/cucumber
```

Already installed in this workspace: `@cucumber/cucumber`.

## 2) Create Project-Level Gherkin Features

Keep feature files under the top-level `features` folder.

Example file used in this project:

- `features/Ecommerce.features`

Note: the common extension is `.feature`, but this project currently uses `.features` as requested.

## 3) Install VS Code Plugins

Install this extension in VS Code:

- Cucumber (Gherkin) Full Support

Optional but useful:

- Cucumber for VS Code (autocomplete/snippets)

After installing extensions, restart VS Code.

## 4) Add Preferences (VS Code Settings)

Use workspace settings to map `*.features` files to Gherkin and wire step-definition lookup.

File: `.vscode/settings.json`

```json
{
	"files.associations": {
		"*.features": "cucumber"
	},
	"cucumberautocomplete.steps": [
		"features/step_definitions/**/*.js",
		"tests/step_definitions/**/*.js"
	],
	"cucumberautocomplete.syncfeatures": "features/**/*.features"
}
```

## 5) Recommended Extensions File

File: `.vscode/extensions.json`

```json
{
	"recommendations": [
		"alexkrechik.cucumberautocomplete",
		"cucumberopen.cucumber-official"
	]
}
```

## 6) Next Steps (When You Are Ready)

1. Add step definitions under `features/step_definitions`.
2. Add a Cucumber config file (`cucumber.js`) to define `paths`, `require`, and output format.
3. Add npm scripts for running Cucumber separately from Playwright tests.

This keeps your current setup intact and lets you expand BDD coverage later.

## 7) World Constructor

In Cucumber.js, the World constructor is the place where you define shared state for each scenario. It gives every scenario its own fresh context, so step definitions can store and read data without leaking values between tests.

In this project, the World constructor is useful for things like:

1. Keeping browser-related data for a single scenario.
2. Storing reusable values such as URLs, test data, or login state.
3. Making step definitions cleaner by putting shared helpers in one place.

Example:

```js
const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
	constructor() {
		this.baseUrl = 'https://example.com';
		this.userName = '';
		this.page = null;
	}

	async openHomePage() {
		await this.page.goto(this.baseUrl);
	}
}

setWorldConstructor(CustomWorld);
```

You can then use it in a step definition like this:

```js
const { Given } = require('@cucumber/cucumber');

Given('I open the home page', async function () {
	await this.openHomePage();
});
```

## 8) What We Did Today

Today we reviewed the Cucumber setup in this project, checked the feature-file structure, and documented the next steps for adding step definitions and configuration. We also noted how the World constructor helps manage scenario-level state in a clean way.

## 9) Hooks (Before, After, BeforeStep, AfterStep)

Hooks help you run setup and cleanup code around scenarios and steps.

Execution order for one scenario is:

1. Before
2. BeforeStep (before each step)
3. Step
4. AfterStep (after each step)
5. After

### Hook Types

1. Before
Runs once before each scenario. Use it for browser launch, context/page creation, test data setup.

2. After
Runs once after each scenario. Use it for closing browser, cleanup, logs, screenshots on failure.

3. BeforeStep
Runs before every step in the scenario. Use it for step-level logging, timers, and tracing.

4. AfterStep
Runs after every step in the scenario. Use it for step result logging or step screenshots.

### Example (Annotated)

```js
const { Before, After, BeforeStep, AfterStep } = require('@cucumber/cucumber');
const playwright = require('playwright/test');
const { POManager } = require('../../tests/pageobjects/POManager');

// Runs before each scenario
Before(async function () {
	this.browser = await playwright.chromium.launch({ headless: false });
	this.context = await this.browser.newContext();
	this.page = await this.context.newPage();
	this.poManager = new POManager(this.page);
});

// Runs before each step
BeforeStep(async function ({ pickleStep }) {
	console.log(`Starting step: ${pickleStep.text}`);
});

// Runs after each step
AfterStep(async function ({ pickleStep, result }) {
	console.log(`Finished step: ${pickleStep.text} | Status: ${result.status}`);
});

// Runs after each scenario
After(async function ({ result }) {
	if (result?.status !== 'PASSED') {
		console.log('Scenario failed. Add screenshot/trace logic here.');
	}
	await this.page?.close();
	await this.context?.close();
	await this.browser?.close();
});
```

Tip:
If you want hooks only for specific scenarios, use tags.

```js
Before({ tags: '@smoke' }, async function () {
	console.log('Runs only for @smoke scenarios');
});
```

You can also use tag expressions inside hooks.

Run hook for either tag:

```js
Before({ tags: '@smoke or @Regression' }, async function () {
	console.log('Runs for smoke or regression scenarios');
});
```

Run hook only when both tags are present:

```js
After({ tags: '@web and @login' }, async function () {
	console.log('Runs only when both @web and @login are present');
});
```

## 10) BeforeAll and AfterAll

`BeforeAll` and `AfterAll` are global hooks.

1. `BeforeAll` runs one time before all scenarios start.
2. `AfterAll` runs one time after all scenarios finish.

## 11) Run A Specific Feature File

Use this command from the project root to run one feature file only:

```bash
npx cucumber-js features/ErrorValidation.feature
```

General format:

```bash
npx cucumber-js features/<feature-file>.feature
```

Example:

```bash
npx cucumber-js features/Ecommerce.feature
```

## 12) Run Scenarios By Tag

Add tags above `Feature` or `Scenario` in your `.feature` file.

Example:

```feature
@Regression
Scenario: Placing the Order
```

Run a single tag:

```bash
npx cucumber-js --tags "@Regression"
```

Run another single tag:

```bash
npx cucumber-js --tags "@smoke"
```

Run multiple tags with `or`:

```bash
npx cucumber-js --tags "@smoke or @Regression"
```

Run scenarios that match both tags:

```bash
npx cucumber-js --tags "@smoke and @web"
```

Exclude a tag:

```bash
npx cucumber-js --tags "not @skip"
```

Tag expression examples:

```bash
# Run if either tag is present
npx cucumber-js --tags "@smoke or @Regression"

# Run only if both tags are present on the same scenario
npx cucumber-js --tags "@web and @login"

# Run one tag and exclude another
npx cucumber-js --tags "@Regression and not @skip"
```

You can place tags above `Feature`, `Scenario`, or `Scenario Outline`.

Example:

```feature
@web
Feature: Ecommerce validations

	@Regression @login
	Scenario: Placing the Order
		Given a login to Ecommerce application on with "Test@ot.com" and "Iamking@000"
		Then Verify order in present in the OrderHistory
```

## 13) Parameterization With Scenario Outline

Use `Scenario Outline` when the same steps should run with multiple data sets.

Syntax:

```feature
Scenario Outline: Validate login with multiple users
	Given a login to Ecommerce2 application on with "<username>" and "<password>"
	Then Verify Error message is displayed

	Examples:
		| username    | password    |
		| wrong1@test.com | wrongpass1 |
		| wrong2@test.com | wrongpass2 |
```

How it works:

1. `Scenario Outline` defines reusable steps.
2. Values inside `< >` are placeholders.
3. Each row in `Examples` creates a new scenario run.

Step definition stays the same because Cucumber passes the values from the table into the step:

```js
Given('a login to Ecommerce2 application on with {string} and {string}', async function (username, password) {
	await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
	await this.page.locator('#username').fill(username);
	await this.page.locator("[type='password']").fill(password);
	await this.page.locator('#signInBtn').click();
});
```

## 14) Run A Specific Feature File With Tags

If you want to run one feature file and filter scenarios inside it by tag, use both together:

```bash
npx cucumber-js features/ErrorValidation.feature --tags "@Regression"
```

This is useful when one feature file contains multiple scenarios and you only want a subset.

## 15) Parallel Execution

Cucumber.js supports parallel execution with the `--parallel` option.

Example:

```bash
npx cucumber-js --parallel 2
```

Run tagged scenarios in parallel:

```bash
npx cucumber-js --tags "@Regression" --parallel 3
```

Run one feature file with parallel workers:

```bash
npx cucumber-js features/Ecommerce.feature --parallel 2
```

Important behavior:

1. Parallel execution is scenario-based, not file-based.
2. Workers pick up scenarios from the matching feature files.
3. If one feature file has only one scenario, `--parallel` will not give much benefit.
4. If multiple scenarios exist, they can run on separate workers.

Practical note for this project:

1. You can run multiple scenarios in parallel.
2. Do not design the suite assuming one worker per file.
3. Each scenario must create and clean up its own browser/page state, which your hooks already support.

## 16) HTML Report

Cucumber.js can generate an HTML report directly with the built-in formatter.

Generate an HTML report:

```bash
npx cucumber-js -f html:cucumber-report.html
```

Generate progress output in terminal and HTML report at the same time:

```bash
npx cucumber-js -f progress -f html:cucumber-report.html
```

Generate an HTML report for one feature file:

```bash
npx cucumber-js features/ErrorValidation.feature -f html:cucumber-report.html
```

Generate an HTML report for tagged scenarios:

```bash
npx cucumber-js --tags "@Regression" -f html:cucumber-report.html
```

Open the generated report on Windows:

```bash
start cucumber-report.html
```

Current report file in this workspace:

```text
cucumber-report.html
```

## 17) Retry Failed Scenarios For Flaky Tests

If a scenario fails intermittently because of timing, network delay, or test-environment instability, you can retry it.

Retry once from the command line:

```bash
npx cucumber-js --retry 1
```

Retry twice:

```bash
npx cucumber-js --retry 2
```

Retry tagged scenarios:

```bash
npx cucumber-js --tags "@Regression" --retry 1
```

Retry only scenarios matching a retry tag filter:

```bash
npx cucumber-js --retry 1 --retry-tag-filter "@flaky"
```

This is useful when you want retries only for known flaky scenarios.

Example:

```feature
@flaky
Scenario: Temporary network issue validation
	Given a login to Ecommerce application on with "Test@ot.com" and "Iamking@000"
	Then Verify order in present in the OrderHistory
```

Then run:

```bash
npx cucumber-js --retry 1 --retry-tag-filter "@flaky"
```

## 18) Retry In Configuration File

Instead of passing retry options every time, you can keep them in a Cucumber configuration file.

Example `cucumber.js`:

```js
module.exports = {
	default: {
		require: ['features/step_definitions/*.js', 'features/support/*.js'],
		retry: 1,
		format: ['progress', 'html:cucumber-report.html']
	}
};
```

If you also want parallel workers in the config file:

```js
module.exports = {
	default: {
		require: ['features/step_definitions/*.js', 'features/support/*.js'],
		retry: 1,
		parallel: 2,
		format: ['progress', 'html:cucumber-report.html']
	}
};
```

Then run simply:

```bash
npx cucumber-js
```

## 19) Common Commands Summary

```bash
# Run one feature file
npx cucumber-js features/ErrorValidation.feature

# Run one tag
npx cucumber-js --tags "@Regression"

# Run multiple tags with OR
npx cucumber-js --tags "@smoke or @Regression"

# Run multiple tags with AND
npx cucumber-js --tags "@web and @login"

# Run in parallel
npx cucumber-js --parallel 2

# Run with retry
npx cucumber-js --retry 1

# Run tag with retry
npx cucumber-js --tags "@Regression" --retry 1

# Create HTML report
npx cucumber-js -f progress -f html:cucumber-report.html

# Open HTML report on Windows
start cucumber-report.html
```
