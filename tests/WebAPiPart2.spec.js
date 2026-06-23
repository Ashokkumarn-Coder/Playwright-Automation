const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('./Utils/APiUtils');
const loginPayLoad = {userEmail:"anshika@gmail.com", userPassword:"Iamking@000"};
const orderPayLoad = {orders:[{country:"India", productOrderedId:"6960eac0c941646b7a8b3e68"}]};

let response;

test.beforeAll(async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});

    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
});

test('@BrowserStorage Place and verify the order', async ({browser}) => {
    const context = await browser.newContext({storageState: 'state.json'});
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
