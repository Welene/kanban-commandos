import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';

import {
	createParagraphElement,
	createSectionElement,
} from '../utils/utilsHtml.js';

function runOrderOverviewPage() {
	// Då localStorage för food trucks inte finns så är detta en "fullösning" enbart för order-overviewPage.
	initializeFoodTrucksLocalStorage();
	const activeFoodTrucks = getDataFromLocalStorage('activeFoodTrucks');

	createFoodTruckCards(activeFoodTrucks);

	expandFoodTruckCard(activeFoodTrucks);
}

function createFoodTruckCards(activeFoodTrucks) {
	const orderOverviewRef = document.querySelector('#orderOverview');
	activeFoodTrucks.forEach((truck) => {
		const foodTruckCardHTML = createSectionElement(
			'order-overview__truck-container',
			truck.id
		);
		foodTruckCardHTML.innerHTML = addCardContent(truck);
		orderOverviewRef.appendChild(foodTruckCardHTML);
	});
}

// Skapar de minimerade korten
function addCardContent(truck) {
	const htmlRef = `
			<section class="order-overview__text-container">
				<p class="order-overview__truck-name">${truck.seller}</p>
				<p class="order-overview__truck-location">
					${truck.location}
				</p>
			</section>
			<p class="order-overview__orders">${truck.orders} ordrar</p>
		`;
	return htmlRef;
}

function expandFoodTruckCard(activeFoodTrucks) {
	let number = 1;
	while (number <= activeFoodTrucks.length) {
		const foodTruckRef = document.querySelector(`#truck${number}`);
		foodTruckRef.addEventListener('click', () => {
			/* users.forEach(user => {
                user.receipts.forEach(receipt => {

                })
            }) */
			console.log('I am expanded!');
		});
		number++;
	}
}

function initializeFoodTrucksLocalStorage() {
	// En "fullösning" för att skapa en localStorage för samtliga foodtrucks då detta inte är gjort innan
	setFoodtrucksToLocalStorage();
	const activeFoodTrucks = getDataFromLocalStorage('activeFoodTrucks');

	// En till "fullösning" för att uppdatera localStorage med det antal ordrar och kvitton de ska ha.
	const users = getDataFromLocalStorage('users');
	checkUserReceipts(users, activeFoodTrucks);
}

function checkUserReceipts(users, activeFoodTrucks) {
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

export { runOrderOverviewPage };
