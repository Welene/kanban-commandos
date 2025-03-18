import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';

import {
	createParagraphElement,
	createSectionElement,
} from '../utils/utilsHtml.js';

function runOrderOverviewPage() {
	// Då localStorage för food trucks inte finns så är detta en "fullösning" som både skapar och uppdaterar 'activeFoodTrucks' för order-overviewPage.
	initializeFoodTrucksLocalStorage();

	const activeFoodTrucks = getDataFromLocalStorage('activeFoodTrucks');

	createFoodTruckCards(activeFoodTrucks);

	expandFoodTruckCard(activeFoodTrucks);
}

function expandFoodTruckCard(activeFoodTrucks) {
	activeFoodTrucks.forEach((truck) => {
		const foodTruckRef = document.querySelector(`#${truck.id}`);

		foodTruckRef.addEventListener('click', () => {
			console.log('I am expanded! ' + truck.id);

			foodTruckRef.classList.toggle(
				'order-overview__truck-container--flex-dir-column'
			);
			foodTruckRef.innerHTML = `
				<img 
					class="order-overview__logo"
					src="../assets/icons/logo-red.svg"
					alt="Image logo" />
				<section class="order-overview__text-container">
				<p class="order-overview__truck-name">${truck.seller}</p>
				<p class="order-overview__truck-location">${truck.location}</p>
			</section>`;

			let totalIncome = 0;

			truck.receipts.forEach((receipt) => {
				foodTruckRef.innerHTML += `
				<p class="order-overview__receipt-summary">
			  <span>${receipt.id}</span>
			  <span class="dotted-line--order-overview"></span>
			  <span>${receipt.price} SEK</span></p>`;

				totalIncome += receipt.price;
			});

			const totalContainerHTML = createSectionElement(
				'order-overview__total-container'
			);
			foodTruckRef.innerHTML += `
			<section class="order-overview__total-container">
				<section>
					<p class="order-overview__truck-name">Totalt</p>
					<p class="order-overview__truck-location">
						inkl 20% moms
					</p>
				</section>
				<p class="order-overview__orders">${totalIncome} SEK</p>
			</section>
		`;
		});
	});
}

function createFoodTruckCards(activeFoodTrucks) {
	const orderOverviewRef = document.querySelector('#orderOverview');
	activeFoodTrucks.forEach((truck) => {
		const outerContainerHTML = createSectionElement();
		const innerContainerHTML = createSectionElement(
			'order-overview__truck-container',
			truck.id
		);

		innerContainerHTML.innerHTML = addCardContent(truck);
		outerContainerHTML.appendChild(innerContainerHTML);
		orderOverviewRef.appendChild(outerContainerHTML);
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
