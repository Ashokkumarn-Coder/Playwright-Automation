const {test, expect}= require('@playwright/test');  
//test run in sequence, so the first test will run before the second test, and the second test will 
// run after the first test has completed
test('Browser context-validating Error Login', async ({page})=>
{
    
     //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'zara coat 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("Passsword").type("Iamking@000");
   await page.getByRole("button", {name:"Login"}).click();  //class name or tag nam ewith btn we can use role locator
    await page.waitForLoadState('networkidle');
  //waitForLoadState() method is used to wait for the page to load completely before proceeding with the next steps in the test, 
   //   which helps to ensure that the test runs smoothly and does not encounter any issues due to incomplete page loading
   //networkidle state means that there are no network connections for at least 500 ms, which indicates that the page has 
   // finished loading and is ready for interaction
    await page.locator(".card-body b").first().waitFor();
   
     //waitFor() method is used to wait for the element to appear on the page before proceeding with the next steps in the test,
     // which helps to ensure that the test runs smoothly and does not encounter any issues due to elements not being available on the page
    //FIRST() method is used to select the first element that matches the locator, which is useful when there are multiple elements that match the locator and
    //  we want to interact with only the first one
    //In this case, we are waiting for the first product title to appear on the page before proceeding with the next steps in the test, 
    // which helps to ensure that the test runs smoothly and does not encounter any issues due to elements not being available on the page

   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();

   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();

    //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();

   await page.getByRole("button",{name :"Checkout"}).click();

   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    

});
