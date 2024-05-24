import itActsAsFavoriteRestaurantModel from "./contracts/favoriteRestaurantContract";

let favoriteRestaurant = [];

const FavoriteRestaurantArray = {
  getRestaurant(id) {
    return favoriteRestaurant.find((restaurant) => restaurant.id === id);
  },

  getAllRestaurant() {
    return favoriteRestaurant;
  },

  putRestaurant(restaurant) {
    if (!restaurant.id || this.getRestaurant(restaurant.id)) return;
    favoriteRestaurant.push(restaurant);
  },

  deleteRestaurant(id) {
    favoriteRestaurant = favoriteRestaurant.filter(
      (restaurant) => restaurant.id !== id,
    );
  },
};

describe("Testing Array Implementation of Favorite Restaurant Contract", () => {
  afterEach(() => {
    favoriteRestaurant = [];
  });
  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});