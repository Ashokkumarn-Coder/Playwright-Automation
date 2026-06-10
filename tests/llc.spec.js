import {test , expect} from '@playwright/test';

test('Playwright special locators', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
        //getByLabel() method is used to locate an element based on its associated label text, which is useful when we want to interact with form elements such as checkboxes, radio buttons, and input fields that have associated labels
    await page.getByLabel("Employed").check();
        //check() method is used to check a checkbox or select a radio button, which is useful when we want to interact with form elements that have associated labels
    // await page.getByLabel("Employed").uncheck();
        //uncheck() method is used to uncheck a checkbox or deselect a radio button, which is useful when we want to interact with form elements that have associated labels
    
    //selection and click getbylabel method is useful 
    await page.getByLabel("Gender").selectOption("Female");
        //selectOption() method is used to select an option from a dropdown menu, which is useful when we want to interact with form elements that have associated labels
        //selectOption() method works only on select elements
    await page.getByPlaceholder("Password").fill("Iamking@000");
        //getByPlaceholder() method is used to locate an element based on its placeholder text, which is useful when we want to interact with input fields that have placeholder text
    await page.getByRole("button", {name:"Submit"}).click();
        //getByRole() method is used to locate an element based on its role and name, which is useful when we want to interact with elements that have specific roles such as buttons, links, and headings
        //In this case, we are locating the button element with the role of "button" and the name of "Submit" and clicking on it, which is useful when we want to interact with a specific button on the page
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
        //getByText() method is used to locate an element based on its text content, which is useful when we want to interact with elements that have specific text such as error messages, success messages, and labels
        //In this case, we are locating the element that contains the text "Success! The Form has been submitted successfully!" and waiting for it to appear on the page before proceeding with the next steps in the test, which helps to ensure that the test runs smoothly and does not encounter any issues due to elements not being available on the page
    await page.getByRole("link",{name : "shop"}).click(); 
      
    await page.locator("app-card").filter({hasText : "Nokia Edge"}).getByRole("button").click();
        //filter() method is used to filter the elements that match the locator based on their text content, which is useful when we want to interact with a specific element among multiple elements that match the locator
        //In this case, we are locating all the elements with the tag name "app-card" and filtering them based on their text content to find the one that contains the text "Nokia Edge" and then clicking on the button element within that card, which is useful when we want to interact with a specific product card on the page    
    //waitFor() method is used to wait for the element to appear on the page before proceeding with the next steps in the test, which helps to ensure that the test runs smoothly and does not encounter any issues due to elements not being available on the page
    //FIRST() method is used to select the first element that matches the locator, which is useful when there are multiple elements that match the locator and we want to interact with only the first one
    //In this case, we are waiting for the first product title to appear on the page before proceeding with the next steps in the test, which helps to ensure that the test runs smoothly and does not encounter any issues due to elements not being available on the page
    
});