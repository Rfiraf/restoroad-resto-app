class RestaurantList extends HTMLElement {
     _restaurantList = [];

     constructor() {
          super();
     }

     connectedCallback() {
          this._loadingContent();
     }

     _loadingContent() {
          this.innerHTML = "";
          
          for (let i = 1; i <= 6; i += 1) {
            const restaurantSkeleton = document.createElement("div");
            restaurantSkeleton.classList.add("restaurant-skeleton");
            restaurantSkeleton.innerHTML = `
              <div class="skeleton-image"></div>
              <div class="skeleton-title"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text"></div>
            `;
      
            this.append(restaurantSkeleton);
          }
        }
      
     _emptyContent() {
          this.innerHTML = `
               <h4 class="empty">Daftar Restoran Kosong</h4>
          `;
     }

     _errorContent() {
          this.innerHTML = `
               <h4 class="error">Gagal Mengambil Daftar Restoran, Silahkan Coba Lagi...</h4>
          `;
     }

     setRestaurantList(restaurantData) {
          try {
               this._restaurantList = restaurantData;
               this.render();
          } catch (error) {
               this._errorContent();
               console.error(`An error occurred while setting restaurant data : ${error}`);
          }
     }

     render() {
          this.innerHTML = "";
          if (this._restaurantList.length === 0) {
               this._emptyContent();
               return;
          }
          
          this._restaurantList.forEach((restaurantData) => {
               const restaurantItem = document.createElement("restaurant-item");
               restaurantItem.setRestaurantItem(restaurantData);
               restaurantItem.setAttribute("tabindex", "0");
               this.appendChild(restaurantItem);
          });
     }
}

customElements.define("restaurant-list", RestaurantList);