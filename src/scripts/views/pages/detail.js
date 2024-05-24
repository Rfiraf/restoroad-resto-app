import UrlParser from "../../routes/url-parser";
import RestaurantDetailManager from "../../utils/restaurant-detail-manager";

const Detail = {
  async render() {
    return `
        <section class="detail-section">
            <h3 class="title">Detail Restoran</h3>
            <restaurant-detail></restaurant-detail>
        </section>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    await RestaurantDetailManager.updateRestaurantDetail(url.id);
  },
};

export default Detail;
