import API_ENDPOINT from "../globals/api-endpoint";

class RestaurantSource {
  static async restaurantList() {
    try {
      const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      throw new Error(`An error occurred while fetching restaurant list: ${error}`);
    }
  }

  static async getRestaurantDetail(id) {
    try {
      const response = await fetch(`${API_ENDPOINT.RESTAURANT_DETAIL}/${id}`);
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      throw new Error(`An error occurred while fetching restaurant detail: ${error}`);
    }
  }

  static async postReview(reviewFormData) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewFormData),
      };
      const response = await fetch(API_ENDPOINT.POST_REVIEW, options);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      throw new Error(`An error occurred while posting your review. ${error}`);
    }
  }
}

export default RestaurantSource;
