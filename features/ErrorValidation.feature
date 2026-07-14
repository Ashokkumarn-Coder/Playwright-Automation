Feature: Ecommerce validations

    @Validation
    Scenario Outline:  Placing the Order
        Given a login to Ecommerce2 application on with "<username>" and "<password>"
        Then Verify Error message is displayed
   
    Examples:
        | username | password |
        | Test@ot.com | Iamking@000 |
        | hello@123.com | Iamking@000 |