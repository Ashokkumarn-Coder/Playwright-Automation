//how to intercept a request and modify the response in playwright
const { test, expect } = require("@playwright/test");

test("@QW Security test request intercept", async ({ page }) => {
  //login and reach orders page
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
      }),
  );
  //identify route and catch theroute and continue with the same route but change the url to a different url, which will return a different response and we can use that response to test the application behavior
  //route.continue() method is used to continue the request with the same route but change the url to a different url, which will return a different response and we can use that response to test the application behavior

  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order",
  );
});
