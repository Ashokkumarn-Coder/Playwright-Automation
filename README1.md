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
