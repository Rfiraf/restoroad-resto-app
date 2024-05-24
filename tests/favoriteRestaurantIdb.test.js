import itActsAsFavoriteRestaurantModel from "./contracts/favoriteRestaurantContract";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";

describe("Testing Implementation of Favorite Restaurant IDB Contract", () => {
  afterEach(async () => {
    const allRestaurant = await FavoriteRestaurantIdb.getAllRestaurant();
    await Promise.all(
      allRestaurant.map((restaurant) => FavoriteRestaurantIdb.deleteRestaurant(restaurant.id)),
    );
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});