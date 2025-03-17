import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';

function runOrderOverviewPage() {
	setFoodtrucksToLocalStorage();

	const users = getDataFromLocalStorage('users');

	checkUserReceipts(users);

	expandFoodTruckCard();
}

function expandFoodTruckCard() {
	for (let number = 1; number < 4; number++) {
		const foodTruckRef = document.querySelector(`#truck${number}`);
		foodTruckRef.addEventListener('click', () => {
			/* users.forEach(user => {
                user.receipts.forEach(receipt => {

                })
            }) */
			console.log('I am expanded!');
		});
	}
}

//Spara de tre foodtruckarna i localStorage
function setFoodtrucksToLocalStorage() {
	const activeFoodTrucks = [];
	activeFoodTrucks.push({
		seller: 'Bengts Wontons',
		location: 'Bergvik, Karlstad',
		id: 'truck1',
		orders: 0,
		receipts: [],
	});

	activeFoodTrucks.push({
		seller: 'Foodtruckexperten',
		location: 'Stora Torget, Karlstad',
		id: 'truck2',
		orders: 0,
		receipts: [],
	});

	activeFoodTrucks.push({
		seller: 'Super Wonton Meals',
		location: 'Sundsta-Älvkullegymnasiet, Karlstad',
		id: 'truck3',
		orders: 0,
		receipts: [],
	});
	saveDataToLocalStorage('activeFoodTrucks', activeFoodTrucks);
}

function checkUserReceipts(users) {
	const activeFoodTrucks = getDataFromLocalStorage('activeFoodTrucks');

	// För varje användare kontrolleras varje kvitto
	// Antalet ordrar i respektive food truck ökas
	users.forEach((user) => {
		user.receipts.forEach((receipt) => {
			switch (receipt.foodTruck) {
				case 'truck1':
					updateFoodTruckOrders(activeFoodTrucks[0], receipt);
					break;

				case 'truck2':
					updateFoodTruckOrders(activeFoodTrucks[1], receipt);
					break;

				case 'truck3':
					updateFoodTruckOrders(activeFoodTrucks[2], receipt);
					break;
			}
		});
	});
	saveDataToLocalStorage('activeFoodTrucks', activeFoodTrucks);
}

// Uppdaterar antalet ordrar samt inkluderar kvitto ID och kostnaden
function updateFoodTruckOrders(activeFoodTruck, customerReceipt) {
	// Räknar ut hur totalen för varje kvitto
	let total = 0;
	customerReceipt.items.forEach((item) => {
		total += item.price;
	});

	// Ökar antalet ordrar samt pushar in kvitto-id med totalen
	activeFoodTruck.orders++;
	activeFoodTruck.receipts.push({
		id: customerReceipt.id,
		price: total,
	});
}

export { runOrderOverviewPage };

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
