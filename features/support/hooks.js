const { Before , After, BeforeStep , AfterStep} = require("@cucumber/cucumber");
const { POManager } = require('../../tests/pageobjects/POManager');
const { test, expect } = require('@playwright/test');
const playwright = require('playwright/test');


Before(async function () {
  // This hook will run before each scenario
  // You can perform any setup or initialization here   
    this.browser = await playwright.chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.poManager = new POManager(this.page);
});


After(async function () {
  // This hook will run after each scenario
  // You can perform any cleanup or teardown here
  console.log("I am last to exxecute");
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});

BeforeStep(async function (step) {
});

AfterStep(async function ({result}) {

    if(result.status === 'FAILED'){
        const screenshot = await this.poManager.page.screenshot({ path: 'screenshot.png' });
        this.attach(screenshot, 'image/png');
    }

});