const {test, expect}= require('@playwright/test');
const {POManager} = require('./pageobjects/POManager');
const testData = JSON.parse(JSON.stringify(require("./Utils/placeorderTestData.json")));
//Json-->String-->Js object 
test.only('End to End application', async ({page})=>
{
   
   const poManager = new POManager(page);
   const username = testData.username;
   const password = testData.password;
   const productName = testData.productName;
   const products = page.locator(".card-body");
  // const loginPage = new LoginPage(page); //creating an instance of the LoginPage class and passing the page object to the constructor, which allows us to access the locators defined in the LoginPage class and interact with the elements on the page
   const loginPage = poManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(username, password);
  //Validation in Cart
  // const dashboardPage = new DashboardPage(page); //creating an instance of the DashboardPage class and passing the page object to the constructor, which allows us to access the locators defined in the DashboardPage class and interact with the elements on the page
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProduct(testData.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.validateProductInCart(testData.productName);
  await cartPage.Checkout();
  
  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind","India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();



});
