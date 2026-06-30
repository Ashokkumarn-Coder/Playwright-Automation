# JavaScript Setup Notes

This is the terminal flow I used to start this JavaScript setup.

## 1. Open terminal and create a folder

```bash
mkdir JavaScript
cd JavaScript
```

## 2. Initialize Node project

```bash
npm init
```

Press Enter through the prompts (or fill values as needed).
After this, a `package.json` file is created.

## 3. Install exceljs

```bash
npm install exceljs
```

Purpose:
- Installs `exceljs` as a normal dependency.
- It is added under `dependencies` in `package.json`.
- Use this when your app needs `exceljs` at runtime.

## 4. Install exceljs as dev dependency

```bash
npm install exceljs --save-dev
```

Purpose:
- Installs `exceljs` as a development-only dependency.
- It is added under `devDependencies` in `package.json`.
- Use this when `exceljs` is only needed for local scripts, tests, or build tasks.

## Important note

Usually, you choose one of the two install types:
- `npm install exceljs` (runtime dependency), or
- `npm install exceljs --save-dev` (development dependency).

Using both for the same package is generally not required.
