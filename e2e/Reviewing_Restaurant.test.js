Feature("Reviewing Restaurant");

Scenario("reviewing a restaurant", async ({ I }) => {
    I.amOnPage("/");

    I.seeElement("restaurant-item .restaurant-name");
    const firstRestaurant = locate("restaurant-item .restaurant-name").first();
    I.click(firstRestaurant);
    
    const fillReviewName = "Dadang Sumedang";
    const fillReviewDescription = "Makanannya enak";

    I.fillField("#username", fillReviewName);
    I.fillField("#description", fillReviewDescription);

    I.click(locate("#submit"));

    I.waitForText(fillReviewName, ".name");
    I.waitForText(fillReviewDescription, ".review");
});