const { test, expect, request } = require('@playwright/test');
const {APiUtils} = require('./Utils/APiUtils');
const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
 
//beforeAll() method is used to run a function before all the tests in the file, which is useful when we want to set up some preconditions or perform some actions that are required for all the tests in the file
let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
 
 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
    //page.route mean->it routes the request to the specified URL and allows us to intercept and modify the request or response before it is sent or received by the browser
      async function (route) {
          //intercepting response --> API response --> render data on front end
          const response = await page.request.fetch(route.request());
          let body = JSON.stringify(fakePayLoadOrders);  //stringify() method is used to convert a JavaScript object into a JSON string, which is useful when we want to send data in JSON format over the network or store it in a file
          route.fulfill( //fulfill() method is used to send a response back to the browser for the intercepted request, which allows us to modify the response before it is sent to the browser
              {
                  response,
                  body,
              });
          //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
      });
 
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());
 
});