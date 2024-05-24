import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

class RestaurantItem extends HTMLElement {
     _restaurantItem = {
       id: null,
       name: null,
       description: null,
       pictureId: null,
       city: null,
       rating: null,
     };
   
     constructor() {
       super();
     }

     getRestaurantItem() {
          return this._restaurantItem;
     }

     setRestaurantItem(restaurant) {
          this._restaurantItem = restaurant;
          this.render();
     }
   
     render() {
       const maxDescription = 264;
       const cuttedDescription = this._restaurantItem.description.length > maxDescription
                                    ? this._restaurantItem.description.substring(0, maxDescription)
                                    : this._restaurantItem.description;
   
       this.innerHTML = `
         <div class="top-info">
           <span class="city">${this._restaurantItem.city}</span>
           
           <picture class="picture">
           <source media="(min-width: 1600px)" data-srcset="https://restaurant-api.dicoding.dev/images/medium/${this._restaurantItem.pictureId}">
             <img class="lazyload" data-src="https://restaurant-api.dicoding.dev/images/small/${this._restaurantItem.pictureId}" alt="${this._restaurantItem.name} Restaurant Picture" crossorigin="anonymous"/>
           </picture>
           <span class="rating"><i class="fa-solid fa-star"></i> ${this._restaurantItem.rating}</span>
         </div>
         <div class="bottom-info">
           <h3 class="restaurant-name">${this._restaurantItem.name}</h3>
           <span class="line"></span>
           <p>${cuttedDescription}</p>
         </div>
       `;

       this.addEventListener("click", this.goToDetail);
       this.addEventListener("keydown", (event) => {
         if (event.key === "Enter") {
           this.goToDetail();
        }
      });
     }

     goToDetail() {
        window.location.href = `#/detail/${this._restaurantItem.id}`;
    }
   }
   
   customElements.define("restaurant-item", RestaurantItem);
