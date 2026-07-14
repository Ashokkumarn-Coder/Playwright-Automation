const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../tests/pageobjects/POManager');
const { test, expect } = require('@playwright/test');
const playwright = require('playwright/test');

Given('a login to Ecommerce application on with {string} and {string}',{timeout: 100*1000}, async function (username, password) {
	// Write code here that turns the phrase above into concrete actions
	
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {
	// Write code here that turns the phrase above into concrete actions
	const dashboardPage =  this.poManager.getDashboardPage();
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();

});

Then('Verify {string} is displayed in the cart', async function (productName) {
	// Write code here that turns the phrase above into concrete actions
	const cartPage = this.poManager.getCartPage();
    await cartPage.validateProductInCart(productName);
    await cartPage.Checkout();
});

When('Enter valid details and place the order', async function () {
	// Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect('ind', 'India');
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order in present in the OrderHistory', async function () {
	// Write code here that turns the phrase above into concrete actions
	await this.poManager.getDashboardPage().navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
Given('a login to Ecommerce2 application on with {string} and {string}', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
    const UserName = this.page.locator('#username');
    const Password= this.page.locator("[type='password']");
    const signIN = this.page.locator('#signInBtn');
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await UserName.fill(username);
    await Password.fill(password);
    await signIN.click();
    
});
Then('Verify Error message is displayed', async function () {
  // Write code here that turns the phrase above into concrete actions
  console .log(await this.page.locator("[style*='block']").textContent());
await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");


});


