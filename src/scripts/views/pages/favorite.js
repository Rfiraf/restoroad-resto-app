import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";

const Favorite = {
  async render() {
    return `
               <section class="explore-section">
                    <h3 class="title">Favorite Restaurant</h3>
				            <restaurant-list></restaurant-list>
               </section>
      `;
  },

  async afterRender() {
    const favoriteListElement = document.querySelector("restaurant-list");
    const favoriteListData = await FavoriteRestaurantIdb.getAllRestaurant();
    try {
      favoriteListElement.setRestaurantList(favoriteListData);
    } catch (error) {
      favoriteListElement.isError();
      console.error("An error occurred while fetching favorite restaurant list.", error);
    }
  },
};

export default Favorite;
