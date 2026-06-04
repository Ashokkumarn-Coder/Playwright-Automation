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
test('Browser context-validating Error Login', async ({browser})=>
{
    const context= await browser.newContext(); 
    const page= await context.newPage(); 
    const UserName =page.locator('#username');
    const Password= page.locator("[type='password']");
    const cardTitles= page.locator(".card-body a");
    const signIN=page.locator("#signInBtn");

     
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
