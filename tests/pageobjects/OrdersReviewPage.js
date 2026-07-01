const { expect } = require('@playwright/test');

class OrdersReviewPage {
    constructor(page) {
        this.page = page;
        this.dropdown=page.locator(".ta-results");
        this.country=page.locator("input[placeholder='Select Country']");
        this.emailId=page.locator(".user__name label");
        this.submit=page.locator(".action__submit");
        this.toast=page.locator(".ngx-toastr");
        this.backdrop=page.locator(".ta-backdrop");
        this.orderConfirmationText=page.locator(".hero-primary");
        this.orderId=page.locator(".em-spacer-1 .ng-star-inserted");
    }

     async searchCountryAndSelect(countryCode, countryName)
    {
        await this.country.type(countryCode,{delay:100});
        await this.dropdown.waitFor();
        const options = this.dropdown.locator("button");
        const optionsCount = await options.count();
        for(let i=0; i<optionsCount; i++)
        {
            const text = await options.nth(i).textContent();
            if((text || "").trim() === countryName)
            {
                await options.nth(i).click();
                break;
            }
        }
     }

    async VerifyEmailId(username)
    {
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOrderId()
    {
        await this.toast.last().waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
        await this.backdrop.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
        await this.submit.click(); //click on the submit button to place the order
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");   
        return await this.orderId.textContent(); //returning the orderId so that it can be used in the test to verify the order details in the order history page
    }
}
module.exports = {OrdersReviewPage};

