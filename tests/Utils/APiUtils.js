class APiUtils 
{
    constructor(apiContext, loginPayLoad) 
    { //constructor to initialize the class with apiContext and loginPayLoad
        this.apiContext = apiContext; //instance of request.newContext() from playwright
        this.loginPayLoad = loginPayLoad;
    }
 
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // 200, 201
        const loginResponseJson = await loginResponse.json();
        if (!loginResponse.ok() || !loginResponseJson.token) {
            throw new Error(`Login failed (${loginResponse.status()}): ${JSON.stringify(loginResponseJson)}`);
        }
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }
 
    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        if (!orderResponse.ok() || !Array.isArray(orderResponseJson.orders) || orderResponseJson.orders.length === 0) {
            throw new Error(`Order creation failed (${orderResponse.status()}): ${JSON.stringify(orderResponseJson)}`);
        }
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
 
        return response;
    }
}
 
module.exports = { APiUtils };