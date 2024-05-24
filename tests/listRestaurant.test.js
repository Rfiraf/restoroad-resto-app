import "../src/scripts/components/restaurant-list";
import "../src/scripts/components/restaurant-item";

describe("Displaying favorite restaurants", () => {
  const restaurantData = [
    {
        id: "s1knt6za9kkfw1e867",
        name: "Kafe Kita",
        description: "Quisque rutrum. Aenean imperdiet",
        city: "Gorontalo",
        address: "Jln. Pustakawan no 9",
        pictureId: "25",
        categories: [{ name: "Modern" }],
        menus: {
          foods: [{ name: "Kari kacang dan telur" }],
          drinks: [{ name: "Jus tomat" }],
        },
        rating: 4,
        customerReviews: [
          {
            name: "Ahmad",
            review: "Tidak ada duanya!",
            date: "13 November 2019",
          },
        ],
    },
    {
        id: "rqdv5juczeskfw1e867",
        name: "Melting Pot",
        description: "Lorem ipsum Dolor",
        city: "Medan",
        address: "Jln. Pandeglang no 19",
        pictureId: "14",
        categories: [{ name: "Italia" }],
        menus: {
          foods: [{ name: "Paket rosemary" }],
          drinks: [{ name: "Es krim" }],
        },
        rating: 4.2,
        customerReviews: [
          {
            name: "Ahmad",
            review: "Tidak rekomendasi untuk pelajar!",
            date: "13 November 2019",
          },
        ],
    },
    {
        id: "w9pga3s2tubkfw1e867",
        name: "Bring Your Phone Cafe",
        description: "Quisque rutrum. Aenean imperdiet",
        city: "Surabaya",
        address: "Jln. Belimbing Timur no 27",
        pictureId: "10",
        categories: [{ name: "Lokal" }],
        menus: {
          foods: [{ name: "Salad lengkeng" }],
          drinks: [{ name: "Kopi espresso" }],
        },
        rating: 4.2,
        customerReviews: [
          {
            name: "Widdy",
            review: "Tidak ada duanya!",
            date: "13 November 2019",
          },
        ],
    },
  ];

  beforeEach(() => {
    document.body.innerHTML = "<restaurant-list></restaurant-list>";
  });

  describe("When restaurant list is empty", () => {
    it("Should show empty data information", () => {
      const restaurantListElement = document.querySelector("restaurant-list");
      restaurantListElement.setRestaurantList([]);

      expect(document.querySelector(".empty")).toBeTruthy();
    });
  });

  describe("When restaurant list is not empty", () => {
    it("Should show all restaurant items", () => {
      const restaurantListElement = document.querySelector("restaurant-list");
      restaurantListElement.setRestaurantList(restaurantData);

      const restaurantItemsElement = document.querySelectorAll("restaurant-item");
      const restaurantItemData = Array.from(restaurantItemsElement).map((item) => item.getRestaurantItem());

      expect(restaurantItemData).toEqual(restaurantData);
    });
  });
});