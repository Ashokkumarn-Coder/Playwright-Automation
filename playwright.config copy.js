//configuration file for Playwright tests- automatically loaded by Playwright when running tests
//it contains the configuration settings for the Playwright test runner, such as the test directory, test timeout, and browser settings
//it also allows us to define custom fixtures and hooks that can be used in our tests, such as beforeAll, afterAll, beforeEach, and afterEach
//we can also specify the browsers we want to test against, such as Chromium, Firefox, and WebKit, and configure their settings, such as headless mode and viewport size  



// @ts-check

import{ defineConfig, devices } from '@playwright/test'; 
import { trace } from 'console';
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
  retries: 1, //setting the number of retries for failed tests to 1, which means that if a test fails, it will be retried once before being marked as failed
  //use:use is used to specify the default settings for all tests, such as the browser to use, the viewport size, and the base URL for the tests
  //timeout is used to specify the maximum time that a test can run before it is considered to have failed, which helps to prevent tests from hanging indefinitely 
  // and allows us to identify and fix issues more quickly
  //deafult timeout for each test is 30 seconds, but we can also specify a custom timeout for individual tests using the test.setTimeout() method
  workers: 3, //setting the number of workers to 1, which means that tests will be run sequentially rather than in parallel, which can be useful for tests that have dependencies or require a specific order of execution
  timeout: 40* 1000, //setting the default timeout for all tests to 30 seconds
  //expect:expect is used to specify the default settings for the expect assertions, such as the timeout for waiting for an element to appear on the page
  //global timeout for expect assertions is 5 seconds, but we can also specify a custom timeout for individual assertions using the expect.setTimeout() method
  
  expect: {
    timeout: 5000, //setting the default timeout for expect assertions to 5 seconds
  },

  reporter: 'html', //specifying the reporter to use for test results, which is HTML in this case
  projects:[
    {
      name:'safari execution',
      use:{//browserName: 'chromium', //specifying the default browser to use for all tests, which is Chromium in this case
    browserName: 'webkit', //specifying the default browser to use for all tests, which is Chromium in this case
    // we can use firefox or webkit instead of chromium to test against those browsers as well
    headless: true, //setting headless mode to true, which means that the browser will run in headless mode
    //true means that the browser will run in headless mode, which is useful for running tests in a CI/CD pipeline or on a server without a graphical interface
    screenshot: 'off', //setting screenshot mode to "off", which means a screenshot is not captured for every test
    trace:'on', //setting the trace option to "on", which means that a trace will be recorded for each test, which is useful for debugging and identifying issues in the tests

      }
    },
    {
        name:'chrome execution',
        use:{
          //browserName: 'chromium', //specifying the default browser to use for all tests, which is Chromium in this case
    browserName: 'chromium', //specifying the default browser to use for all tests, which is Chromium in this case
    // we can use firefox or webkit instead of chromium to test against those browsers as well
    headless: false, //setting headless mode to true, which means that the browser will run in headless mode
    //true means that the browser will run in headless mode, which is useful for running tests in a CI/CD pipeline or on a server without a graphical interface
    screenshot: 'on', //setting screenshot mode to "on", which means a screenshot is captured for every test
    trace:'on',
    video:"retain-on-failure", //setting the video option to "retain-on-failure", which means that a video recording of the test will be saved only if the test fails, which is useful for debugging and identifying issues in the tests
    ignoreHTTPSErrors: true, //setting the ignoreHTTPSErrors option to true, which means that the browser will ignore any HTTPS errors that occur during the test, which is useful for testing applications that use self-signed certificates or have other SSL issues
    permissions: ['geolocation'], //setting the permissions option to "geolocation", which means that the browser will allow the test to access the user's geolocation information, which is useful for testing applications that use location-based services
     viewport: { width: 1280, height: 720 }, //setting the default viewport size for all tests to 1280x720 pixels, which is a common resolution for desktop screens
    //  ...devices['iPhone 11 Pro'], //setting the default device to emulate for all tests to iPhone 11 Pro, which allows us to test our web application on a mobile device without needing a physical device
        }
        //setting the trace option to "on", which means that a trace will be recorded for each test, which is useful for debugging and identifying issues in the tests
      }

    
  ]
  
});
module.exports = config //exporting the configuration object using module.exports, which is a common way to export modules in Node.js


