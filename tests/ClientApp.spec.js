const {test, expect}= require('@playwright/test');  
//test run in sequence, so the first test will run before the second test, and the second test will 
// run after the first test has completed
test.only('Browser context-validating Error Login', async ({page})=>
{
     //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'zara coat 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").type("Iamking@000");
   await page.locator("[value='Login']").click();
 //await page.waitForLoadState('networkidle');
  //waitForLoadState() method is used to wait for the page to load completely before proceeding with the next steps in the
  //  test, 
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

   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 

    





});
