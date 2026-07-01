class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
      this.cart=page.locator("[routerlink*='cart']")
      this.orders=page.locator("button[routerlink*='myorders']")
    }

async searchProduct(productName) 
{
    
  const titles = await this.productsText.allTextContents();
  console.log(titles); 
  
  const count = await this.products.count(); //count() method is used to get the number of elements that match the locator, which is useful when we want to perform actions on multiple elements or verify the number of elements on the page
  for(let i=0; i<count; i++)
  {
        //we can't have Pageobject seprately for chaining objects, so we are using the locator chaining to locate the elements on the page and perform actions on them
    if(await this.products.nth(i).locator("b").textContent() === productName)
    {
      //nth() method is used to select the element at the specified index, which is useful when there are multiple elements that match the locator and we want to interact with a specific one
      //.locator("b") is used to locate the child element with the tag name "b" within the current product element, which is useful when we want to interact with a specific element within a parent element
      
      //add to cart
      await this.products.nth(i).locator("text=Add to Cart").click();
      break;
    }
  }
}

async navigateToCart()
{
    await this.cart.click(); //click() method is used to simulate a mouse click on the element, which is useful when we want to interact with buttons, links, or other clickable elements on the page
}

 async navigateToOrders()
 {
  await this.orders.click();
 }
}
module.exports = { DashboardPage }; //exporting the DashboardPage class so that it can be used in other files, which allows us to reuse the code and avoid duplication, making our tests more maintainable and easier to read.
