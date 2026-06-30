const {test, expect}= require('@playwright/test');
const {POManager} = require('./pageobjects/POManager');

test.only('End to End application', async ({page})=>
{
   
   const poManager = new POManager(page);
   const username = "Test@ot.com";
   const password = "Iamking@000";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
  // const loginPage = new LoginPage(page); //creating an instance of the LoginPage class and passing the page object to the constructor, which allows us to access the locators defined in the LoginPage class and interact with the elements on the page
   const loginPage = poManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(username, password);
  //Validation in Cart
  // const dashboardPage = new DashboardPage(page); //creating an instance of the DashboardPage class and passing the page object to the constructor, which allows us to access the locators defined in the DashboardPage class and interact with the elements on the page
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProduct(productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.validateProductInCart(productName);
  await cartPage.Checkout();
  
  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind","India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  

});
