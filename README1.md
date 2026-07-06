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

## 10) BeforeAll and AfterAll

`BeforeAll` and `AfterAll` are global hooks.

1. `BeforeAll` runs one time before all scenarios start.
2. `AfterAll` runs one time after all scenarios finish.

Use these hooks for suite-level setup and cleanup, for example:

1. Start shared services.
2. Load global config data.
3. Final report merge or summary logging.

### Difference: Before vs BeforeAll

1. `Before`
Runs before every scenario.
Best for scenario-specific setup such as new browser context/page.

2. `BeforeAll`
Runs once for the full test run.
Best for one-time global setup.

### Difference: After vs AfterAll

1. `After`
Runs after every scenario.
Best for scenario cleanup such as closing page/context and collecting failure artifacts.

2. `AfterAll`
Runs once at the very end.
Best for global cleanup and final run-level actions.

### Example

```js
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');

BeforeAll(async function () {
	console.log('Run once before all scenarios');
});

Before(async function () {
	console.log('Run before each scenario');
});

After(async function () {
	console.log('Run after each scenario');
});

AfterAll(async function () {
	console.log('Run once after all scenarios');
});
```

Important:
Avoid storing scenario data in `BeforeAll` variables, because shared state can cause test coupling and flaky behavior.
