const assert = require("assert");

Feature("Liking and Unliking Restaurant");

Before(({ I }) => {
    I.amOnPage("/#/favorite");
  });

Scenario("showing empty liked restaurants", ({ I }) => {
  I.see("Daftar Restoran Kosong", ".empty");
});

Scenario("liking one restaurant", async ({ I }) => {
    I.see("Daftar Restoran Kosong", ".empty");

    I.amOnPage("/");

    I.seeElement("restaurant-item .restaurant-name");
    const firstRestaurant = locate("restaurant-item .restaurant-name").first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement("#like");
    I.click("#like");

    I.amOnPage("/#/favorite");
    I.seeElement("restaurant-item");
    const likedRestaurantTitle = await I.grabTextFrom(".restaurant-name");

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
  });

Scenario("Unliking one restaurant", async ({ I }) => {
    I.see("Daftar Restoran Kosong", ".empty");

    I.amOnPage("/");

    I.seeElement("restaurant-item .restaurant-name");
    const firstRestaurant = locate("restaurant-item .restaurant-name").first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement("#like");
    I.click("#like");

    I.amOnPage("/#/favorite");
    I.seeElement("restaurant-item");
    const likedRestaurantTitle = await I.grabTextFrom(".restaurant-name");
    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

    I.click(firstRestaurant);

    I.seeElement("#dislike");
    I.click("#dislike");

    I.amOnPage("/#/favorite");
    I.see("Daftar Restoran Kosong", ".empty");
  });
