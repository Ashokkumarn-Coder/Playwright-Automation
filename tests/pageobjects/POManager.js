//Page Object Manager class is used to manage the page objects and provide a single point of access to them, which allows us to create and manage page objects in a centralized manner, making our tests more maintainable and easier to read.
const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {OrdersHistoryPage} = require('./OrderHistoryPage');

class POManager 
{
     constructor(page)
    {   
        this.page=page; //storing the page object in the class instance, which allows us to access the page object in other methods of the class
        this.loginPage = new LoginPage(page); //creating an instance of the LoginPage class and passing
        this.dashboardPage = new DashboardPage(page); //creating an instance of the DashboardPage class and passing
         this.cartPage = new CartPage(this.page);
         this.ordersReviewPage = new OrdersReviewPage(this.page);
            this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage; //returning the instance of the LoginPage class, which allows us to access the locators defined in the LoginPage class and interact with the elements on the page
    }

    getDashboardPage()
    {
        return this.dashboardPage; //returning the instance of the DashboardPage class, which allows us to access the locators defined in the DashboardPage class and interact with the elements on the page
    }
    getCartPage()
    {
        return this.cartPage;
    }
    getOrdersReviewPage()
    {
        return this.ordersReviewPage;
    }
     getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

}
module.exports = { POManager };