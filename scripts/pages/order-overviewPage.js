import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';

function runOrderOverviewPage() {
	setFoodtrucksToLocalStorage();

	// const bengtTruckRef = document.querySelector('#truck1');
	// const foodTruckRef = document.querySelector('#truck2');
	// const superTruckRef = document.querySelector('#truck3');
	const users = getDataFromLocalStorage('users');

	countOrders(users);
}

function countOrders(users) {
	let amountBengtTruck = 0;
	let amountExpertTruck = 0;
	let amountSuperTruck = 0;

	// För varje användare kontrolleras varje kvitto
	users.forEach((user) => {
		user.receipts.forEach((receipt) => {
			// Kollar igenom alla kvitton och räknar upp hur många ordrar varje foodtruck fått
			switch (receipt.foodTruck) {
				case 'truck1':
					amountBengtTruck++;
					break;

				case 'truck2':
					amountExpertTruck++;
					break;

				case 'truck3':
					amountSuperTruck++;
					break;
			}
		});
	});
}

// Kansk
function setFoodtrucksToLocalStorage() {
	const foodTrucks = [];
	foodTrucks.push({
		name: 'Bengts Wontons',
		address: 'Bergvik, Karlstad',
		id: 'truck1',
		orders: 0,
	});
	foodTrucks.push({
		name: 'Foodtruckexperten',
		address: 'Stora Torget, Karlstad',
		id: 'truck2',
		orders: 0,
	});
	foodTrucks.push({
		name: 'Super Wonton Meals',
		address: 'Sundsta-Älvkullegymnasiet, Karlstad',
		id: 'truck3',
		orders: 0,
	});
	saveDataToLocalStorage('foodtrucks', foodTrucks);
}

/* const newUsers = [
		{
			username: 'jesperdaking',
			password: 'fisnils123',
			role: 'admin',
			email: 'jesper123@airbean.com',
			profile_image: 'https://randomuser.me/api/portraits/men/1.jpg',
			receipts: [
				{
					id: '#rz07pq8',
					foodTruck: 'truck2',
					items: [{ id: 2, name: 'Bangkok', amount: 1, price: 9 }],
				},
			],
		},

		{
			username: 'bradpitt',
			password: 'fightclub9',
			role: 'user',
			email: 'bradpitt@coffeeclique.com',
			profile_image: 'https://randomuser.me/api/portraits/men/2.jpg',
			receipts: [
				{
					id: '#7z2gz58',
					foodTruck: 'truck1',
					items: [{ id: 1, name: 'Karlstad', amount: 1, price: 9 }],
				},
				{
					id: '#g42jbr',
					foodTruck: 'truck3',
					items: [
						{ id: 2, name: 'Bangkok', amount: 2, price: 9 },
						{ id: 1, name: 'Karlstad', amount: 1, price: 9 },
						{ id: 3, name: 'Ho Chi Minh', amount: 1, price: 9 },
					],
				},
			],
		},
		{
			username: 'fotbollskungen',
			password: 'legomast3r',
			role: 'user',
			email: 'fotbollskungen@brewbuddies.com',
			profile_image: 'https://randomuser.me/api/portraits/men/3.jpg',
			receipts: [
				{
					id: '#7z2gz58',
					foodTruck: 'truck1',
					items: [{ id: 1, name: 'Karlstad', amount: 1, price: 9 }],
				},
				{
					id: '#2iu9hjq',
					foodTruck: 'truck3',
					items: [
						{ id: 1, name: 'Karlstad', amount: 1, price: 9 },
						{ id: 2, name: 'Bangkok', amount: 1, price: 9 },
						{ id: 3, name: 'Ho Chi Minh', amount: 1, price: 9 },
					],
				},
				{
					id: '#9976l2r',
					foodTruck: 'truck3',
					items: [
						{ id: 2, name: 'Bangkok', amount: 2, price: 9 },
						{ id: 1, name: 'Karlstad', amount: 1, price: 9 },
						{ id: 3, name: 'Ho Chi Minh', amount: 1, price: 9 },
					],
				},
				{
					id: '#w0x3a6g',
					foodTruck: 'truck2',
					items: [
						{ id: 2, name: 'Bangkok', amount: 4, price: 9 },
						{ id: 1, name: 'Karlstad', amount: 5, price: 9 },
						{ id: 3, name: 'Ho Chi Minh', amount: 3, price: 9 },
						{ id: 5, name: 'Oaxaca', amount: 4, price: 9 },
						{ id: 4, name: 'Paris', amount: 2, price: 9 },
						{ id: 12, name: 'Sprite', amount: 1, price: 19 },
					],
				},
				{
					id: '#ke8qxvc',
					foodTruck: 'truck2',
					items: [{ id: 1, name: 'Karlstad', amount: 1, price: 9 }],
				},
				{
					id: '#isefu7q',
					foodTruck: 'truck3',
					items: [
						{ id: 1, name: 'Karlstad', amount: 1, price: 9 },
						{ id: 4, name: 'Paris', amount: 1, price: 9 },
						{ id: 8, name: 'Guacamole', amount: 1, price: 19 },
					],
				},
			],
		},
]; */

export { runOrderOverviewPage };
