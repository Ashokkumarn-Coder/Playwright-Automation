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
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").type("Iamking@000");
   await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
  //waitForLoadState() method is used to wait for the page to load completely before proceeding with the next steps in the test, 
  //which helps to ensure that the test runs smoothly and does not encounter any issues due to incomplete page loading
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
test('End to End application', async ({page})=>
{
  const productName= 'ZARA COAT 3';
  const products =page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").type("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle'); //wait for page to finish all network requests before proceeding with the next steps in the test, which helps to ensure that the test runs smoothly and does not encounter any issues due to incomplete page loading 
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles); 
  
  const count = await products.count(); //count() method is used to get the number of elements that match the locator, which is useful when we want to perform actions on multiple elements or verify the number of elements on the page
  for(let i=0; i<count; i++)
  {
    if(await products.nth(i).locator("b").textContent()===productName)
    {
      //nth() method is used to select the element at the specified index, which is useful when there are multiple elements that match the locator and we want to interact with a specific one
      //.locator("b") is used to locate the child element with the tag name "b" within the current product element, which is useful when we want to interact with a specific element within a parent element
      
      //add to cart
      await products.nth(i).locator("text=Add to Cart").click();
      break;
    }
  }
  //Validation in Cart
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  //different ways to select the country from the dropdown 
  //pressSequentially() method is used to simulate a sequence of key presses, which is useful when we want to interact with a dropdown or autocomplete input field that requires multiple key presses to select an option
  await page.locator("input[placeholder='Select Country']").pressSequentially('I', 'n', 'd'); 
  //This step may occasionally fail if the application server is slow due to heavy traffic. In such cases, you can introduce a delay and rewrite the step as:
//await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
//Here, a delay of 150 milliseconds is introduced between each key press.
// That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count(); //3 option will be displayed in the dropdown, so we are counting the number of options in the dropdown to verify that the correct options are displayed
  for(let i=0; i<optionsCount; i++)
  {
    const text = await dropdown.locator("button").nth(i).textContent();
    if(text.trim() === "India") //trim to remove the extra spaces from the text, which is useful when we want to compare the text with a specific value and want to ensure that the comparison is accurate  
    { 
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  //validation in the final page
  expect(page.locator(".user__name label")).toHaveText("anshika@gmail.com");
  await page.locator(".action__submit").click(); //click on the submit button to place the order

  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); //validation to verify that the order has been placed successfully
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

    //finding order in order history
    await page.locator("button[routerlink*='myorders']").click();
     await page.locator("tbody").waitFor(); //wait for the table body to load before proceeding with the next steps in the test, which helps to ensure that the test runs smoothly and does not encounter any issues due to elements not being available on the page
    const orderRows = page.locator("tbody tr"); //tr is used to locate the table rows in the order history page, which is useful when we want to interact with specific rows in the table or verify the contents of the table
     
    for(let i=0; i<await orderRows.count(); i++)
    {
      const rowOrderId = await orderRows.nth(i).locator("th").textContent(); 
      //th is used to locate the table header cell in the order history page, which is useful when we want to interact with specific cells in the table or verify the contents of the table
      if(orderId.includes(rowOrderId))
      {
        await orderRows.nth(i).locator("button").first().click();
        break;
      }
    }
    const orderIDdetails= await page.locator(".col-text").textContent(); //validation to verify that the correct order details are displayed in the order history page
    expect(orderId).toContain(orderIDdetails.trim()); //trim to remove the extra spaces from the orderId, which is useful when we want to compare the orderId with a specific value and want to ensure that the comparison is accurate
    
  });
