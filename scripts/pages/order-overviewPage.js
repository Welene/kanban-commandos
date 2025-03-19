import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';

import { createSectionElement, createDivElement } from '../utils/utilsHtml.js';

import { checkUserStatus } from '../components/validateUser.js';

function runOrderOverviewPage() {
	checkUserStatus();
	// Då localStorage för food trucks inte finns så är detta en "fullösning" som både skapar och uppdaterar 'activeFoodTrucks' för order-overviewPage.
	initializeFoodTrucksLocalStorage();

	// Skapar korten för varje foodtruck. Korten har både de minimerade och maximerade innehållet men att dessa togglas mellan med "d-none"
	createFoodTruckCards();
}

// Skapar först kortbehållarna. Därefter lägger man till både de minimerade och maximerade korten i dem.
// De maximerade börjar med att ha "d-none"
function createFoodTruckCards() {
	// Refererar till <main>-elementet
	const orderOverviewRef = document.querySelector('#orderOverview');

	const activeFoodTrucks = getDataFromLocalStorage('activeFoodTrucks');

	// Varje truck får sitt egna kort
	activeFoodTrucks.forEach((truck) => {
		//Skapar kortet
		const cardContainerHTML = createSectionElement(
			'order-overview__wrapper',
			truck.id + 'Container'
		);

		// Skapar innehållet i både de minimerade och maximerade behållarna
		// Det som sparas är <section>-element.
		const minimizedContentHTML = createMinimizedContent(truck);
		const expandedContentHTML = createExpandedContent(truck);

		// EventListener på kortet själv som byter mellan vad som visas
		cardContainerHTML.addEventListener('click', () => {
			minimizedContentHTML.classList.toggle('d-none');
			expandedContentHTML.classList.toggle('d-none');
		});

		// Lägger in behållarna i kortet
		cardContainerHTML.appendChild(minimizedContentHTML);
		cardContainerHTML.appendChild(expandedContentHTML);

		// Lägger kortet i <main>-elementet
		orderOverviewRef.appendChild(cardContainerHTML);
	});
}

// Skapar det minimerade innehållet och returnerar ett <section>-element
function createMinimizedContent(truck) {
	const containerHTML = createSectionElement(
		'order-overview__truck-container',
		truck.id + 'Minimized'
	);

	// Lägger till namnet, platsen samt antalet ordrar i containern
	containerHTML.innerHTML = `
			<section class="order-overview__text-container">
				<p class="order-overview__truck-name">${truck.seller}</p>
				<p class="order-overview__truck-location">
					${truck.location}
				</p>
			</section>
			<p class="order-overview__orders">${truck.orders} ordrar</p>
		`;
	return containerHTML;
}

// Skapar det maximerade innehållet och returnerar ett <section>-element
function createExpandedContent(truck) {
	//Skapar den yttre behållaren
	const outerContainerHTML = createSectionElement(
		'order-overview__maximized-card d-none'
	);

	//skapar den inre behållaren
	const innerContainerHTML = createDivElement(
		'order-overview__maximized-content'
	);

	// Lägger till loggan, namnet på foodtrucken samt platsen inuti den inre behållaren
	innerContainerHTML.innerHTML = `
				<img 
					class="order-overview__logo"
					src="../assets/icons/logo-red.svg"
					alt="Image logo" />
				<section class="order-overview__text-container">
				<p class="order-overview__truck-name">${truck.seller}</p>
				<p class="order-overview__truck-location">${truck.location}</p>
			</section>`;

	// Lägger till varje kvitto. Sparar även den totala inkomsten för samtliga kvitton
	let totalIncome = 0;
	truck.receipts.forEach((receipt) => {
		innerContainerHTML.innerHTML += `
				<p class="order-overview__receipt-summary">
			  <span>${receipt.id}</span>
			  <span class="dotted-line--order-overview"></span>
			  <span>${receipt.price} SEK</span></p>`;

		// Sparar inkomsten från varje kvitto för att användas senare
		totalIncome += receipt.price;
	});

	// Lägger den inre behållaren inuti den yttre behållaren
	outerContainerHTML.appendChild(innerContainerHTML);

	// Lägger till den totala inkomsten
	// Detta läggs till efter den inre behållaren
	outerContainerHTML.innerHTML += `
			<section class="order-overview__maximized-total">
				<section>
					<p class="order-overview__total">Totalt</p>
					<p class="order-overview__total-tax">
						Inkl 20% moms
					</p>
				</section>
				<p class="order-overview__total-cost">${totalIncome} SEK</p>
			</section>
		`;

	// Returnerar <section>-elementet outerContainerHTML
	return outerContainerHTML;
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
	// Antalet ordrar i respektive foodtruck ökas
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
		total += item.price * item.amount;
	});

	// Ökar antalet ordrar samt pushar in kvitto-id med totalen
	activeFoodTruck.orders++;
	activeFoodTruck.receipts.push({
		id: customerReceipt.id,
		price: total,
	});
}

// "Fullösningen" för att se till så nyckeln 'activeFoodTrucks' finns på localStorage. Manuellt skapar innehållet i nyckeln så den finns.
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
