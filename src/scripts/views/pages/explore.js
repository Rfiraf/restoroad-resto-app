import RestaurantSource from "../../data/restaurant-source";

const Explore = {
  async render() {
    return `
			  <section id="explore-section" class="explore-section">
				<h3 class="title">Explore Restaurant</h3>
				<restaurant-list>
					    <restaurant-item></restaurant-item>
				</restaurant-list>
        </section>
      `;
  },

  async afterRender() {
    const restaurantListData 	 = await RestaurantSource.restaurantList();
    const restaurantListElement = document.querySelector("restaurant-list");
    try {
      await restaurantListElement.setRestaurantList(restaurantListData);
    } catch (error) {
      restaurantListElement.isError();
      console.error("An error occurred while fetching the restaurant list.", error);
    }
  },
};

export default Explore;
