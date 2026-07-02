Feature: Ecommerce validations

  Scenario: Placing the order
    Given a login to Ecommerce application on with "Test@ot.com" and "Iamking@000"
    When Add "ZARA COAT 3" to Cart 
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and place the order 
    Then  Verify order in present in the OrderHistory 