/* eslint-disable linebreak-style */
import { openDB } from "idb";
import CONFIG from "../globals/config";

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const databasePromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    return (await databasePromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllRestaurant() {
    return (await databasePromise).getAll(OBJECT_STORE_NAME);
  },
  async putRestaurant(Restaurant) {
    if (!Restaurant.hasOwnProperty("id")) {
			return;
		}
    
    return (await databasePromise).put(OBJECT_STORE_NAME, Restaurant);
  },
  async deleteRestaurant(id) {
    return (await databasePromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRestaurantIdb;
