class LoginPage
{
    //locator under constructor 
constructor(page)
{
    this.page=page;
    this.signInButton=page.locator("[value='Login']");
    this.userName=page.locator("#userEmail");
    this.password=page.locator("#userPassword");
}

//reusable utility function to perform login action
async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}
async validLogin(username, password)
{
    //here we use await because we want to wait for the action to complete before moving on to the next step. This is important because if we don't wait for the action to complete, we may run into issues where the next step is executed before the previous step has completed, leading to unexpected behavior in our tests.
    await this.userName.fill(username);
    await this.password.type(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');   
}
}
module.exports ={LoginPage}; //exporting the LoginPage class so that it can be used in other files, which allows us to reuse the code and avoid duplication, making our tests more maintainable and easier to read.