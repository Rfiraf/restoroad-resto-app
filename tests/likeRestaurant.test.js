import "../src/scripts/components/restaurant-detail";
import RestaurantDetailManager from "../src/scripts/utils/restaurant-detail-manager";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";

describe("Liking A Restaurant", () => {
    const restaurant = {
        id: "s1knt6za9kkfw1e867",
        name: "Kafe Kita",
        description: "Quisque rutrum. Aenean imperdiet",
        city: "Gorontalo",
        address: "Jln. Pustakawan no 9",
        pictureId: "25",
        categories: [{ name: "Modern" }],
        menus: {
          foods: [{ name: "Kari kacang dan telur" }],
          drinks: [{ name: "Jus tomat" }],
        },
        rating: 4,
        customerReviews: [
          {
            name: "Ahmad",
            review: "Tidak ada duanya!",
            date: "13 November 2019",
          },
        ],
      };

      const restaurantWithoutId = {
        name: "Kafe Kita",
        description: "Quisque rutrum. Aenean imperdiet",
        city: "Gorontalo",
        address: "Jln. Pustakawan no 9",
        pictureId: "25",
        categories: [{ name: "Modern" }],
        menus: {
          foods: [{ name: "Kari kacang dan telur" }],
          drinks: [{ name: "Jus tomat" }],
        },
        rating: 4,
        customerReviews: [
          {
            name: "Ahmad",
            review: "Tidak ada duanya!",
            date: "13 November 2019",
          },
        ],
      };

      beforeEach(async () => {
        document.body.innerHTML = "<restaurant-detail></restaurant-detail>";
        document.querySelector("restaurant-detail").setRestaurantData(restaurant);
      });

    it("should show the like widget  if the restaurant is not yet liked", async () => {
        document.querySelector("restaurant-detail").setAttribute("favorite", "false");

		    expect(document.querySelector("#like")).toBeTruthy;
    });

    it("should not show the dislike widget if the restaurant is not yet liked", async () => {
        document.querySelector("restaurant-detail").setAttribute("favorite", "false");

		    expect(document.querySelector("#dislike")).toBeFalsy;
    });

    it("should be able to like the restaurant", async () => {
        document.querySelector("restaurant-detail").setAttribute("favorite", "false");

        RestaurantDetailManager.toggleFavoriteButton(restaurant.id);
        document.querySelector("#like").dispatchEvent(new Event("click"));

		    expect(document.querySelector("#dislike")).toBeTruthy;
    });

    it("should hide the like widget after the restaurant is liked", () => {
      document.querySelector("restaurant-detail").setAttribute("favorite", "false");
      RestaurantDetailManager.toggleFavoriteButton(restaurant.id);
  
      document.querySelector("#like").dispatchEvent(new Event("click"));
      expect(document.querySelector("#like")).toBeFalsy();
    });

    it("should add restaurant to favorite after the like is clicked", async () => {
      document.querySelector("restaurant-detail").setAttribute("favorite", "false");
      RestaurantDetailManager.toggleFavoriteButton(restaurant);
  
      document.querySelector("#like").dispatchEvent(new Event("click"));
      expect(await FavoriteRestaurantIdb.getRestaurant(restaurant.id)).toEqual(restaurant);
    });

    it("should not throw error when add a restaurant again when its already in favorite", async () => {
      await FavoriteRestaurantIdb.putRestaurant(restaurant);
      document.querySelector("restaurant-detail").setAttribute("favorite", "false");
      RestaurantDetailManager.toggleFavoriteButton(restaurant.id);
  
      document.querySelector("#like").dispatchEvent(new Event("click"));
      expect(await FavoriteRestaurantIdb.getRestaurant(restaurant.id)).toEqual(restaurant);
    });

    it("should not add a restaurant when it has no id", async () => {
      document.querySelector("restaurant-detail").setRestaurantData(restaurantWithoutId);
      RestaurantDetailManager.toggleFavoriteButton(restaurantWithoutId);

      document.querySelector("#like").dispatchEvent(new Event("click"));
      expect(await FavoriteRestaurantIdb.getAllRestaurant()).not.toContain(restaurantWithoutId);
  });
});