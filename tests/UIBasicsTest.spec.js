const {test, expect}= require('@playwright/test');  
 //importing the expect function from the Playwright library, which is used for making assertions in our tests
//importing the test function from the Playwright library



//javascrip is asynchronous in nature, so we need to use async/await to handle the asynchronous operations
//async function is used to define an asynchronous function that can contain await expressions
//await is used to wait for a promise to resolve before proceeding with the next line of code

test('First Playwright Test', async ({browser})=> 
    //outers structure of the test //async function is used to define an asynchronous function that can contain await expressions
    //ananymous function is used to define a function without a name, which is useful for writing short, one-off functions that do not need to be reused elsewhere in the code
    //fixture is used to set up the test environment and provide any necessary data or resources for the test to run
    //browser is a fixture provided by Playwright that allows us to launch a browser instance and interact with it in our tests
    //{} is used to destructure the browser fixture from the test context, which allows us to use it directly in our test function 
    // without having to reference the entire test context object

{
    const UserName =page.locator('#username');
    const Password= page.locator("[type='password']");
    const signIN=page.locator("#signInBtn");
    //playwright code goes here
    //javscript is asynchronous in nature, so we need to use async/await to handle the asynchronous operations
    //async function is used to define an asynchronous function that can contain await expressions
    //await is used to wait for a promise to resolve before proceeding with the next line of code
    //in this case, we are waiting for the page to load before performing any actions on it
    //the test will fail if the page does not load within the default timeout period (30 seconds)
    //we can also specify a custom timeout period using the test.setTimeout() method
    //for example, test.setTimeout(60000) will set the timeout period to 60 seconds

    //javascript need explicit waits to handle asynchronous operations, so we need to use async/await to ensure that the test runs smoothly without any issues related to timing or synchronization
    //without async/await, the test may fail due to timing issues, such as trying to interact with an element that has not yet loaded on the page
    //by using async/await, we can ensure that the test waits for the necessary 
    // elements to load before attempting to interact with them, thus improving the reliability and stability of our tests 

    //in new version of javscrip if function without name is called as arrow function, it is also known as anonymous function
    //arrow functions are a more concise syntax for writing functions in JavaScript
    //they are often used for writing short, simple functions that do not require their own this context
    //in this case, we are using an arrow function to define the test function, which allows us to write the test in a more concise and readable way


    const context= await browser.newContext(); //creating a new browser context, which is an isolated environment for running tests
    //a browser context is like a new browser profile, which allows us to run tests in isolation without affecting other tests or the main browser instance
    //each browser context has its own cookies, local storage, and session storage, which allows us to test different scenarios without interference from other tests
    
    const page= await context.newPage(); //creating a new page within the browser context, which is where we will perform our test actions

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/") //navigating to the specified URL, which is the login page of the application we want to test
    //the goto() method is used to navigate to a specific URL, and it returns a promise that resolves when the page has finished loading
    //we use await to wait for the promise to resolve before proceeding with the next line of code, which ensures that the page is fully loaded before we interact with it
    console .log(await page.title()); //getting the title of the page using the title() method, which returns a promise that resolves to the title of the page, and printing it to the console

    //css , xpath write selectors to locate elements on the page and perform actions on them, such as clicking a button, entering text into a form field, or selecting an option from a dropdown menu
    //use css more than xpath because it is faster and more efficient, and it is also more widely supported across different browsers and platforms
    //rules fod writing css selectors:
    //1. use id selector (#) for unique elements, such as #username or #password
    //2. use class selector (.) for elements that share the same class, such as .form-control or .btn-primary
    //3. use attribute selector ([]) for elements that have specific attributes, such as input[type="text"] or button[aria-label="Submit"]
    //4. use pseudo-class selector (:) for elements that are in a specific state, such as :hover or :nth-child(2)
    //5. use combinators (>, +, ~) to select elements based on their relationship to other elements, such as div > p or input + label
    await UserName.fill("Ashok kumar N"); //locating the username input field using the id selector and filling it with the specified text
    //fill() method is used to enter text into an input field, and it returns a promise that resolves when the text has been entered
    await Password.fill("Learning@830$3mK2"); 
    await signIN.click(); //locating the sign-in button using the id selector and clicking it using the click() method, which simulates a user clicking the button
    //in selenium we use wait until to wait for an element to be visible or clickable before performing an action on it, but in Playwright, 
    // we can use the built-in waiting mechanisms that are automatically applied to all actions
    console.log(await page.locator("[style*='block']").textContent()); //locating the error message element using a 
    // CSS selector that matches the style attribute and printing its text content to the console

    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); //asserting that the error message contains the text
    //  "Incorrect" using the toContainText() method, which is a specific assertion method provided by Playwright for checking the text 
    // content of an element

    //type  and fill are two different methods for entering text into an input field in Playwright.
    //type() method simulates typing by sending individual keystrokes to the input field, which can be useful for testing scenarios where the timing of keystrokes is important, such as testing autocomplete functionality or simulating user input in a realistic way
    //fill() method, on the other hand, sets the value of the input field directly without simulating keystrokes, which can be faster and more efficient for entering large amounts of text or when the timing of keystrokes is not important   
    await UserName.fill(""); //clearing the username input field using the fill() method by setting its value to an empty string
    await UserName.fill("rahulshettyacademy"); //entering text into the username input field using the type() method, which simulates typing by sending individual keystrokes to the input field
    await signIN.click(); //clicking the sign-in button again to submit the form with the new username value

    console .log(await page.locator(".card-body a").textContent());
});

test('Page Playwright Test', async ({page})=>
{
    //test.only is used to run only this test and skip all other tests in the test suite, 
    // which is useful for debugging and focusing on a specific test case

    //in this test, we are using the page fixture provided by Playwright, which allows us to interact with the page directly without having to create a new browser context or page
    //the page fixture is a pre-configured page that is automatically created for each test, which allows us to write tests more quickly and easily without having to set up the browser context and page manually  

    await page.goto("https://google.com") //navigating to the specified URL, which is the Google homepage;
    //get title of the page and print it to the console and assert that the title is correct
    const title= await page.title(); //getting the title of the page using the title() method, which returns a promise that resolves to the title of the page
    await console.log(title); //printing the title to the console
    //asserting that the title is correct using the expect() function provided by Playwright, which allows us to make assertions 
    // about the state of the page
    //expect() function is used to make assertions about the state of the page, such as checking if an element is visible, if a text is present, or if a value is correct
    //in this case, we are using expect() to check if the title of the page is "Google", which is the expected title for the Google homepage
    //if the title does not match the expected value, the test will fail and an error message will be displayed in the test results
    await expect(page).toHaveTitle("Google"); //asserting that the title of the page is "Google" using the toHaveTitle() method, which is a specific assertion method provided by Playwright for checking the title of the page



});

//test run in sequence, so the first test will run before the second test, and the second test will run after the first test has completed

//to demonstrate route and obort methods, we will create a new test that will intercept the network requests and block the css files from loading
test.only('Browser context-validating Error Login', async ({browser})=>
{
    const context= await browser.newContext(); 
    const page= await context.newPage();
   // page.route('**/*.css',route=>route.abort()); //blocking the css files from loading using the route() method, which allows us to intercept network requests and modify their behavior
    //route() method is used to intercept network requests and modify their behavior, such as blocking certain requests, modifying request headers, or redirecting requests to a different URL
    //in this case, we are using route() to block all CSS files from loading by matching any URL that ends with ".css" and calling the abort() method on the route object, which prevents the request from being sent to the server
    //abort() method is used to cancel a network request, which can be useful for testing scenarios where we want to simulate a slow or unreliable network connection, or when we want to test how the application behaves when certain resources are not available
    page.route('**/*.{jpg,png,jpeg}',route=>route.abort());
    const UserName =page.locator('#username');
    const Password= page.locator("[type='password']");
    const cardTitles= page.locator(".card-body a");
    const signIN=page.locator("#signInBtn");
    //it will give all network requests made by the page, which allows us to see what resources are being loaded and how long they take to load
    page.on('request',request=> console.log(request.url()));
     //page.on('request') event listener is used to listen for network requests made by the page, which allows us to log the URLs of the requests to the console for debugging purposes
    page.on('response',response=> console.log(response.url(),response.status()));
    //page.on('response') event listener is used to listen for network responses received by the page, which allows us to log the URLs and status codes of the responses to the console for debugging purposes
    
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await UserName.fill("Ashok kumar N");
    await Password.fill("Learning@830$3mK2");
    await signIN.click();
    console .log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await UserName.fill("");
    await UserName.fill("rahulshettyacademy");
    await signIN.click();
 // console .log(await cardTitles.first().textContent());
 // console .log(await cardTitles.nth(1).textContent());
 //on commenting above  test will fail because the first() and nth() methods are used to select specific elements from a list of elements
 //  that match the specified selector, and if we comment out these lines, we will not be able to access
 //  the text content of the card titles, which will cause the test to fail when we try to log the text content to the console'


    //nth() method is used to select the first element that matches the specified selector, which in this case is the first anchor tag within the card-body class
    //.first() method is used to select the first element that matches the specified selector, which in this case is the first anchor tag within the card-body class
    
   const allTitles = await cardTitles.allTextContents();
    //allTextContents() method is used to get the text content of all elements that match the specified selector, which in this case is all anchor tags within the card-body class
    console .log(allTitles);

    





});

test('UI controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");    
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown=page.locator("select.form-control");
    await dropdown.selectOption("consult"); //selecting the option with the value "consult" from the dropdown
//await page.pause(); //pausing the test execution to allow us to inspect the page and see the selected option in the dropdown
  await page.locator(".radiotextsty").last().click(); //locating the last radio button with the class "radiotextsty" and clicking it using the click() method
   await page.locator("#okayBtn").click(); //locating the "Okay" button using the id selector and clicking it using the click() method //webbased popups are handled using the page.on('dialog') event listener, which allows us to listen for dialog events and interact with them accordingly
  await expect(page.locator(".radiotextsty").last()).toBeChecked();//expecting that the last radio button with the class "radiotextsty" is checked using the toBeChecked() method, which is a specific assertion method provided by Playwright for checking if a radio button or checkbox is selected
    //asserting that the radio button is selected using the isChecked() method, which returns a promise that resolves to a boolean value indicating whether the radio button is selected or not
//   await page.locator(".radiotextsty").last().isChecked().then((isChecked) => {
//         console.log("Is the radio button selected? " + isChecked); //logging the result to the console
//     });

    //checkbox
    const checkbox= page.locator("#terms"); //locating the checkbox element using the id selector and storing it in a variable
    await checkbox.click(); //checking the checkbox using the click() method, which simulates a user checking the checkbox
    await expect(checkbox).toBeChecked(); //expecting that the checkbox is checked using the toBeChecked() method, which is a specific assertion method provided by Playwright for checking if a radio button or checkbox is selected
    await checkbox.uncheck(); //unchecking the checkbox using the uncheck() method, which simulates a user unchecking the checkbox 
    //you can keep assertion after unchecking the checkbox to verify that it is indeed unchecked
    expect(await checkbox.isChecked()).toBeFalsy(); //asserting that the checkbox is unchecked using the isChecked() method, which returns a promise that resolves to a boolean value indicating whether the checkbox is selected or not, and then using toBeFalsy() to check if the value is false
    //when action is inside so await we have used to ensure that the test waits for the action to complete before proceeding to the next line of code, which is important for maintaining the correct flow of the test and ensuring that assertions are made at the right time

    //blinking links
  //await expect(page.locator(".blinkingText")).toHaveAttribute("href", "https://www.rahulshettyacademy.com/"); //expecting that the blinking link with the class "blinkingText" has the specified href attribute using the toHaveAttribute() method, which is a specific assertion method provided by Playwright for checking the attributes of an element
     const blinkingLink= page.locator("a:has-text('Free Access to InterviewQues/ResumeAssistance/Material')"); //locating the blinking link using a CSS selector that matches the anchor tag with the specified text
     await expect(blinkingLink).toBeVisible(); //expecting that the blinking link is visible using the toBeVisible() method, which is a specific assertion method provided by Playwright for checking if an element is visible on the page
  
   


    //await page.pause();

});

  //handling child windows and tabs 
test('Child windows and tabs', async ({browser})=>
  {
    const context= await browser.newContext();  
    const page= await context.newPage();    
    const UserName =page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");   
    const documentlInk= page.locator("[href*='documents-request']"); //locating the blinking link using a CSS selector that matches the element with the class "blinkingText"
    //context.waitForEvent('page'); //waiting for a new page to open as a result of clicking the link, which is necessary because the link opens in a new tab or window
    //why we write before clicking the link because we need to set up the event listener before the action that triggers the event, which in this case is clicking the link that opens a new page
    //listen for new page pending, rejected and fulfilled events, which allows us to handle the new page that opens as a result of clicking the link and perform actions on it, such as asserting its title or interacting with its elements
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //waiting for a new page to open as a result of clicking the link
        documentlInk.click(),] ) //clicking the blinking link using the click() method, which simulates a user clicking the link
    //promise is used to handle the asynchronous nature of the operations, allowing us to wait for both the page event and the click action to complete before proceeding with the test
    //it works like this: when the click() method is called, it triggers the opening of a new page, which in turn triggers the page event that we are waiting for with context.waitForEvent('page'). 
    // By using Promise.all(), we can ensure that both operations are completed before we proceed with the test, allowing us to interact with the new page that has opened as a result of clicking the link
   
    const text = await newPage.locator(".red").textContent(); //locating the element with the class "red" on the new page and getting its text content using the textContent() method, which returns a promise that resolves to the text content of the element

    //to take part of text from the text content
    const arrayText = text.split("@") //splitting the text content into an array using the split() method, which splits the string into an array of substrings based on the specified separator, in this case, the "@" character
    const domain= arrayText[1].split(" ")[0]; //taking the second element of the array (which contains the email address) and splitting it again to get the domain part of the email address, which is done by splitting the string based on a space character and taking the first element of the resulting array
    console.log(domain);

    await page.locator("#username").fill(domain); //filling the username input field on the original page with the extracted domain using the fill() method, which sets the value of the input field to the specified text
    await page.pause();
    console.log(await page.locator("#username").inputValue()); //getting the text content of the username input field and printing it to the console to verify that it has been filled correctly

    //textContent() Vs innerText() method
    //textContent() method returns the text content of an element, including all whitespace and hidden text, while innerText() method returns the visible text content of an element, excluding any hidden text or whitespace
    //in this case, we are using textContent() to get the text content of the username input field, which will include any whitespace or hidden text that may be present in the input field. 
    // If we were to use innerText() instead, it would only return the visible text content of the input field, which may not include any whitespace or hidden text that is present
    //textcontext() return only the text content attached to DOM element, while innerText() return the text content that is visible to the user on the page, which may be different from the actual text content of the element due to CSS styles or other factors that affect the visibility of the text on the page    
    //inputValue() method is used to get the current value of an input field, which is the text that is currently entered in the input field, while textContent() method is used to get the text content of an element, which may include other elements or text that is not part of the input field's value
});