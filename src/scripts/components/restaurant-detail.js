import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

class RestaurantDetail extends HTMLElement {
     static observedAttributes = ["favorite"];

     _restaurant = {};

     constructor() {
          super();
          this._favorite = this.getAttribute("favorite");
     }

     attributeChangedCallback(name, oldvalue, newValue) {
          this[`_${name}`] = newValue;
          this.render();
     }

     connectedCallback() {
          this._loadingContent();
     }

     _loadingContent() {
          this.innerHTML = `
          <div class="restaurant-detail-skeleton">
            <div class="detail-skeleton-image"></div>
            <div class="detail-skeleton-title"></div>
            <div class="detail-skeleton-sub"></div>
            <div class="detail-skeleton-sub"></div>
            <div class="detail-skeleton-text"></div>
            <div class="detail-skeleton-text"></div>
            <div class="detail-skeleton-text"></div>
            <div class="detail-skeleton-text"></div>
            <div class="detail-skeleton-text"></div>
          </div>
        `;
     }

     _errorContent() {
          this.innerHTML = `
               <h4 class="error">Gagal Mengambil Daftar Restoran, Silahkan Coba Lagi...</h4>
          `;
     }

     setRestaurantData(restaurant) {
          try {
               this._restaurant = restaurant;
               this.render();
          } catch (error) {
               this._errorContent();
               console.error(`An error occurred while setting restaurant data : ${error}`);
          }
     }

     getRestaurantData() {
          return this._restaurant;
     }

     render() {
          const restaurantCategories = this._restaurant.categories.map((category) => category.name).join(", ");
          
          let foodList = "";
               this._restaurant.menus.foods.forEach(({ name }) => {
               foodList += `<li>${name}</li>`;
          });

          let drinkList = "";
               this._restaurant.menus.drinks.forEach(({ name }) => {
               drinkList += `<li>${name}</li>`;
          });

          let reviewList = "";
          this._restaurant.customerReviews.forEach(({ name, review, date }, index) => {
              reviewList += `
                  <div class="review">
                         <div class="review-header">
                              <h4 class="name">${name}</h4>
                              <span>${date}</span>
                         </div>
                              <p class="review">${review}</p>
                  </div>
              `;
          });

          this.innerHTML = `
          <div class="restaurant-picture">
               <span class="city"> ${this._restaurant.city}</span>
               <picture>
                    <source media="(min-width: 1280px)" srcset="https://restaurant-api.dicoding.dev/images/large/${this._restaurant.pictureId}">
                    <source media="(min-width: 760px)" srcset="https://restaurant-api.dicoding.dev/images/medium/${this._restaurant.pictureId}">
                    <img class="lazyload" src="https://restaurant-api.dicoding.dev/images/small/${this._restaurant.pictureId}" alt="${this._restaurant.name} Restaurant Picture" crossorigin="anonymous"/>
               </picture>
               <span class="rating"><i class="fa-solid fa-star"></i> ${this._restaurant.rating}</span>
          </div>

          <div class="restaurant-information">
               <h3>${this._restaurant.name}</h3>
               <p>Categories : ${restaurantCategories}</p>
               <p>Address : ${this._restaurant.address}</p>
          </div>

          <div class="restaurant-description">
               <p>${this._restaurant.description}</p>
          </div>

          <span class="line"></span>
          <h3 class="sub-title">Menu</h3>
          <div class="restaurant-menu">
                    <div class="restaurant-foods">
                         <h4>Foods</h4>
                         <span class="small-line"></span>
                         <ul>${foodList}</ul>
                    </div>

                    <div class="restaurant-drinks">
                         <h4>Drinks</h4>
                         <span class="small-line"></span>
                         <ul>${drinkList}</ul>
                    </div>
          </div>

          <div class="restaurant-reviews">
               <span class="white-line"></span>
               <h3 class="sub-title">Reviews</h3>
               ${reviewList}
          </div>
          <span class="line"></span>
          <div class="restaurant-review-form">
               <form id="review-form">
                    <h3 class="sub-title">Add Your Review</h3>
                    <input type="text" id="username" placeholder="Enter your name" required>
                    <textarea type="text" id="description" placeholder="Leave your review here"  maxlength="400" required></textarea>
                    <button type="submit" id="submit">Submit</button>
               </form>
          <div>
          `;

          const restaurantPicture = this.querySelector(".restaurant-picture");
          const favoriteButton = document.createElement("button");
               favoriteButton.setAttribute("aria-label", "Favorite Button");
                    if (this._favorite === "true") {
                         favoriteButton.id = "dislike";
                         favoriteButton.innerHTML = "<i class='fa-solid fa-heart'></i>";
                         favoriteButton.setAttribute("aria-label", "Simpan ke Favorit");
                    } else {
                         favoriteButton.id = "like";
                         favoriteButton.innerHTML = "<i class='fa-regular fa-heart'></i>";
                         favoriteButton.setAttribute("aria-label", "Simpan ke Favorit");
                    }
          restaurantPicture.appendChild(favoriteButton);
     }
}

customElements.define("restaurant-detail", RestaurantDetail);