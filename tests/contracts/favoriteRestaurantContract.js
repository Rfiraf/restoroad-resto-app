const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
	it("should retrieve the restaurant that has been added", async () => {
		favoriteRestaurant.putRestaurant({ id: 1 });
		favoriteRestaurant.putRestaurant({ id: 2 });

		expect(await favoriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
		expect(await favoriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
		expect(await favoriteRestaurant.getRestaurant(3)).toEqual(undefined);
	});

	it("should reject a restaurant from being added if it does not have the correct property", async () => {
		favoriteRestaurant.putRestaurant({  aProperty: "property" });

		expect(await favoriteRestaurant.getAllRestaurant()).toEqual([]);
	});

	it("can retrieve all the added restaurants", async () => {
		favoriteRestaurant.putRestaurant({ id: 1 });
		favoriteRestaurant.putRestaurant({ id: 2 });

		expect(await favoriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }, { id: 2 }]);
	});

	it("should remove favorite restaurant", async () => {
		favoriteRestaurant.putRestaurant({ id: 1 });
		favoriteRestaurant.putRestaurant({ id: 2 });
		favoriteRestaurant.putRestaurant({ id: 3 });

		await favoriteRestaurant.deleteRestaurant(1);

		expect(await favoriteRestaurant.getAllRestaurant()).toEqual([{ id: 2 }, { id: 3 }]);
	});

	it("should manage request to remove a restaurant even if the restaurant hasn't been added", async () => {
		favoriteRestaurant.putRestaurant({ id: 1 });
		favoriteRestaurant.putRestaurant({ id: 2 });
		favoriteRestaurant.putRestaurant({ id: 3 });

		await favoriteRestaurant.deleteRestaurant(4);

		expect(await favoriteRestaurant.getRestaurant(4)).toBeUndefined();
		expect(await favoriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
	});
};

export default itActsAsFavoriteRestaurantModel;