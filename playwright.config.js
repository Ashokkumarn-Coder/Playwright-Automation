//configuration file for Playwright tests- automatically loaded by Playwright when running tests
//it contains the configuration settings for the Playwright test runner, such as the test directory, test timeout, and browser settings
//it also allows us to define custom fixtures and hooks that can be used in our tests, such as beforeAll, afterAll, beforeEach, and afterEach
//we can also specify the browsers we want to test against, such as Chromium, Firefox, and WebKit, and configure their settings, such as headless mode and viewport size  



// @ts-check

import{ defineConfig } from '@playwright/test'; 
//importing the defineConfig function from the Playwright library, which is used to define the configuration settings for the test runner

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

//exporting the configuration object using the defineConfig() function, which is a helper function provided by Playwright 
// to define the configuration settings for the test runner

const config = defineConfig({
  testDir: './tests', //only test will be executed from this directory, which is where we will write our test files
  //use:use is used to specify the default settings for all tests, such as the browser to use, the viewport size, and the base URL for the tests
  //timeout is used to specify the maximum time that a test can run before it is considered to have failed, which helps to prevent tests from hanging indefinitely 
  // and allows us to identify and fix issues more quickly
  //deafult timeout for each test is 30 seconds, but we can also specify a custom timeout for individual tests using the test.setTimeout() method
  timeout: 40* 1000, //setting the default timeout for all tests to 30 seconds
  //expect:expect is used to specify the default settings for the expect assertions, such as the timeout for waiting for an element to appear on the page
  //global timeout for expect assertions is 5 seconds, but we can also specify a custom timeout for individual assertions using the expect.setTimeout() method
  
  expect: {
    timeout: 5000, //setting the default timeout for expect assertions to 5 seconds
  },

  reporter: 'html', //specifying the reporter to use for test results, which is HTML in this case
  use: {
    //browserName: 'chromium', //specifying the default browser to use for all tests, which is Chromium in this case
    browserName: 'chromium', //specifying the default browser to use for all tests, which is Chromium in this case
    // we can use firefox or webkit instead of chromium to test against those browsers as well
    headless: false, //setting headless mode to false, which means that the browser will be visible when running tests 
    //true means that the browser will run in headless mode, which is useful for running tests in a CI/CD pipeline or on a server without a graphical interface
  },
});
module.exports = config //exporting the configuration object using module.exports, which is a common way to export modules in Node.js


