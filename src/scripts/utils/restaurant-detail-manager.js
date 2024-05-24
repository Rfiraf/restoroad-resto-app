import RestaurantSource from "../data/restaurant-source";
import FavoriteRestaurantIdb from "../data/favorite-restaurant-idb";

const RestaurantDetailManager = {
  async updateRestaurantDetail(id) {
    const restaurantDetail = document.querySelector("restaurant-detail");
    try {
      const restaurant = await RestaurantSource.getRestaurantDetail(id);
      await restaurantDetail.setRestaurantData(restaurant);
      await this.setDetailFavoriteStatus(id);
      await this.toggleFavoriteButton(id);
      await this.postReview(id);
    } catch (error) {
      restaurantDetail._errorContent();
      console.error(`An error occurred while fetching detail (${error})`);
    }
  },

  async setDetailFavoriteStatus(id) {
    const restaurantDetail = document.querySelector("restaurant-detail");
    const isFavorite = await FavoriteRestaurantIdb.getRestaurant(id);
    restaurantDetail.setAttribute("favorite", isFavorite ? "true" : "false");
  },

  async toggleFavoriteButton(id) {
    const restaurantDetail = document.querySelector("restaurant-detail");
    const favorite = restaurantDetail.getAttribute("favorite");

    if (favorite === "false") {
      const likeButton = document.getElementById("like");

      likeButton.addEventListener("click", () => {
        FavoriteRestaurantIdb.putRestaurant(restaurantDetail.getRestaurantData());
        restaurantDetail.setAttribute("favorite", "true");
        this.toggleFavoriteButton(id);
      });
    }

    if (favorite === "true") {
      const dislikeButton = document.getElementById("dislike");

      dislikeButton.addEventListener("click", () => {
        FavoriteRestaurantIdb.deleteRestaurant(id);
        restaurantDetail.setAttribute("favorite", "false");
        this.toggleFavoriteButton(id);
      });
    }
  },

    // if (favorite === "true") {
		//   const removeFavorite = async () => {
    //     await FavoriteRestaurantIdb.deleteRestaurant(id);
    //     restaurantDetail.setAttribute("favorite", "false");
    //     this.toggleFavoriteButton(id);
		//   };

		//   const likeButton = document.getElementById("like");
		//   likeButton.addEventListener("click", removeFavorite);
    // }

    // if (favorite === "false") {
		//   const addFavorite = async () => {
    //     await FavoriteRestaurantIdb.putRestaurant(
		// 	  restaurantDetail.getRestaurantData(),
    //     );
    //     restaurantDetail.setAttribute("favorite", "true");
    //     this.toggleFavoriteButton(id);
		//   };

		//   const dislikeButton = document.getElementById("dislike");
		//   dislikeButton.addEventListener("click", addFavorite);
    // }
	  // },

  async postReview(id) {
    const reviewForm = document.getElementById("review-form");
    const reviewUsername = document.getElementById("username");
    const reviewDescription = document.getElementById("description");
	
    reviewForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        const reviewFormData = {
          id,
          name: reviewUsername.value,
          review: reviewDescription.value,
        };

        await RestaurantSource.postReview(reviewFormData);
        reviewUsername.value = "";
        reviewDescription.value = "";

        this.updateRestaurantDetail(id);
        location.reload();
      } catch (error) {
        const restaurantDetail = document.querySelector("restaurant-detail");
        restaurantDetail._errorContent();
        console.error(`Submit review failed : ${error}`);
      }
    });
  },
};
export default RestaurantDetailManager;
