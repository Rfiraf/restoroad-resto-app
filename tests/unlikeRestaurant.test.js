import "../src/scripts/components/restaurant-detail";
import RestaurantDetailManager from "../src/scripts/utils/restaurant-detail-manager";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";

describe("Unliking A Restaurant", () => {
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

      beforeEach(async () => {
        document.body.innerHTML = "<restaurant-detail></restaurant-detail>";
        document.querySelector("restaurant-detail").setRestaurantData(restaurant);
      });

    it("should show dislike widget when the restaurant is already liked", async () => {
        document.querySelector("restaurant-detail").setAttribute("favorite", "true");
  
        expect(document.querySelector("#dislike")).toBeTruthy;
    });

    it("should not display like widget when the restaurant is already liked", async () => {
        document.querySelector("restaurant-detail").setAttribute("favorite", "true");

        expect(document.querySelector("#like")).toBeFalsy;
    });

    it("should be able to remove liked restaurant from favorite list", async () => {
        document.querySelector("restaurant-detail").setAttribute("favorite", "true");

        RestaurantDetailManager.toggleFavoriteButton(restaurant.id);
        document.querySelector("#dislike").dispatchEvent(new Event("click"));

		    expect(document.querySelector("#like")).toBeTruthy;
    });

    it("should not throw error when user click dislike widget if the disliked restaurant is not in the list", async () => {
        document.querySelector("restaurant-detail").setAttribute("favorite", "true");

        RestaurantDetailManager.toggleFavoriteButton(restaurant.id);  
        await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
        document.querySelector("#dislike").dispatchEvent(new Event("click"));
        
        expect(await FavoriteRestaurantIdb.getRestaurant(restaurant.id)).toBeUndefined();
    });
});