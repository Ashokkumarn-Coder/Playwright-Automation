const{test,expect}=require('@playwright/test');
test('popup validation',async({page})=>
{
    await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack(); //back to previous page
    // await page.goForward(); //forward to next page

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click(); 
    await expect(page.locator('#displayed-text')).toBeHidden(); //toBeHidden() is used to check if the element is hidden or not
    
    page.on('dialog',dialog=> dialog.accept()); //to handle the alert popup and accept it #.dismiss() is used to dismiss the alert popup
    await page.locator('#confirmbtn').click(); //to click on the confirm button which will trigger the alert popup

    await page.locator('#mousehover').hover(); //to hover over the mouse on the element

    const framePage = page.frameLocator('#courses-iframe'); //to switch to the iframe
    await framePage.locator("li a[href*='lifetime-access']:visible").click(); //to click on the mentorship link inside the iframe
    // :visible is used to click on the element which is visible on the page and ignore the hidden elements with same locator
    const textcheck = await framePage.locator(".text h2").textContent();
    console.log(textcheck.split("")[1]);



});