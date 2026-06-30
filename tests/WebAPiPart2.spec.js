//save session storage state in a json file and use it in other tests to avoid logging in again and again
const {test, expect} = require('@playwright/test');

test.beforeAll(async({browser}) => {
    
    const context=  await browser.newContext(); //browswe context level not page level
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'}); //store the state of the browser in a json file, which can be used later to restore the state of the browser 
    WebContext= await browser.newContext({storageState:'state.json'}); //create a new browser context with the stored state, which allows us to reuse the same login session across multiple tests without having to log in again
})

//advanced usage of storage state, we can use it to store the state of the browser in a json file and use it in other tests to avoid logging in again and again


