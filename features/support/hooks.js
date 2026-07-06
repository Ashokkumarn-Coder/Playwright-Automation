const { Before , After, BeforeStep , AfterStep} = require("@cucumber/cucumber");
const { POManager } = require('../../tests/pageobjects/POManager');
const { test, expect } = require('@playwright/test');
const playwright = require('playwright/test');


Before(async function () {
  // This hook will run before each scenario
  // You can perform any setup or initialization here   
    const browser = await playwright.chromium.launch({ headless: false });
	const context = await browser.newContext();
	const page = await context.newPage();
	this.poManager = new POManager(page);
});


After(async function () {
  // This hook will run after each scenario
  // You can perform any cleanup or teardown here
  console.log("I am last to exxecute");
});

BeforeStep(async function (step) {
});

AfterSteps(async function ({result}) {

    if(result.status === 'FAILED'){
        const screenshot = await this.poManager.page.screenshot({ path: 'screenshot.png' });
        this.attach(screenshot, 'image/png');
    }

});