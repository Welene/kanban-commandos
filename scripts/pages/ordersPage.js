import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';
import {
	generateUniqueId,
	doesBasketItemCountsExist,
	emptyBasket,
	emptyBasketOrdersPage,
	showMessage,
} from '../utils/utils.js';

/**
 * Funktion som hanterar ordersidan.
 * Laddar kundvagnen från localStorage, visar beställningen och hanterar utcheckning.
 */
function runOrdersPage() {
	const basket = getDataFromLocalStorage('basket'); // Hämta kundvagnen
	const container = document.querySelector('#orderSummary'); // Behållare för orderöversikt
	const totalCostElement = document.querySelector('#totalCost'); // Element för totalkostnad
	const foodTruckDropdown = document.querySelector('#foodtruckSelect'); // Dropdown för foodtruck
	const checkoutButton = document.querySelector('#checkoutBtn'); // Knapp för att slutföra order
	const currentUser = getDataFromLocalStorage('currentUser'); // Hämta aktuell användare

	// Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
	doesBasketItemCountsExist();
	// Funktion för att visa vilken foodtruck varje alternativ är när man väljer i optionsmenyn.
	displaySelectedTruckListener();

	// Om varukorgen är tom, visa meddelande och sätt totalpriset till 0
	if (!basket || !basket.items || basket.items.length === 0) {
		emptyBasketOrdersPage();
		return;
	}

	container.innerHTML = ''; // Rensa tidigare innehåll
	let totalCost = 0; // Initiera totalkostnaden

	// Loopa igenom alla produkter och skapa orderöversikten
	basket.items.forEach((item) => {
		const itemElement = document.createElement('p');
		itemElement.classList.add('food-menu-container__food-title');

		// Skapa en rad för varje produkt med namn, antal och pris
		itemElement.innerHTML = `
            <span>${item.name} x${item.amount}</span>
            <span class="dotted-line"></span>
            <span>${item.price * item.amount} SEK</span>
        `;

		container.appendChild(itemElement);
		totalCost += item.price * item.amount; // Lägg till produktens kostnad i totalen
	});

	totalCostElement.innerHTML = `<h2 class="total-cost__title">Total</h2><h3 class="total-cost__price">${totalCost} SEK</h3>`; // Uppdatera totalkostnaden

	// Om användaren är inloggad, tillåt beställning
	checkoutButton.textContent = 'LÄGG BESTÄLLNING';
	checkoutButton.addEventListener('click', () => {
		// Kontrollera att en foodtruck är vald
		if (!foodTruckDropdown.value) {
			showMessage('Välj en FoodTruck innan du lägger din order', 'error');
			return;
		}
		basket.foodTruck = foodTruckDropdown.value; // Spara vald foodtruck
		if (basket.foodTruck === 'truck1') {
			basket.seller = 'Bengts Wontons';
			basket.location = 'Bergvik, Karlstad';
		} else if (basket.foodTruck === 'truck2') {
			basket.seller = 'Foodtruckexperten';
			basket.location = 'Stora Torget, Karlstad';
		} else if (basket.foodTruck === 'truck3') {
			basket.seller = 'Super Wonton Meals';
			basket.location = 'Sundsta-Älvkullegymnasiet, Karlstad';
		}
		basket.id = generateUniqueId(); // Generera unikt order-ID

		saveDataToLocalStorage('receipt', basket); // Spara aktivt kvitto

		// Lägg till beställningen i användarens kvittohistorik
		if (currentUser) {
			if (!currentUser.receipts) {
				currentUser.receipts = [];
			}
			currentUser.receipts.push(basket);
			saveDataToLocalStorage('currentUser', currentUser); // Uppdatera currentUser i localStorage

			updateAllUsersReceipts(currentUser.username, basket); // Uppdatera allUsers med orderhistorik
		}
		// Anropar funktion som tömmer hela basket
		emptyBasket();

		window.location.href = '/pages/eta.html'; // Omdirigera till orderbekräftelsesidan
	});
}

/**
 * Uppdaterar allUsers med det nya kvittot för en specifik användare.
 * Hittar rätt användare i listan och lägger till det nya kvittot.
 */
function updateAllUsersReceipts(username, newReceipt) {
	const allUsers = getDataFromLocalStorage('users') || []; // Hämta alla användare

	// Hitta rätt användare i allUsers
	const userIndex = allUsers.findIndex((user) => user.username === username);
	if (userIndex !== -1) {
		if (!allUsers[userIndex].receipts) {
			allUsers[userIndex].receipts = []; // Skapa receipts-array om den saknas
		}
		allUsers[userIndex].receipts.push(newReceipt); // Lägg till det nya kvittot
	}
	saveDataToLocalStorage('users', allUsers); // Uppdatera users i localStorage
}

// En lyssnare för att visa vilken foodtruck som tillhör de options som finns att välja
function displaySelectedTruckListener() {
	const foodtruckSelectRef = document.querySelector('#foodtruckSelect');
	foodtruckSelectRef.addEventListener('change', () => {
		const doesFoodTruckExist = document.querySelector(
			'.main-content__foodtruck-name'
		);

		if (doesFoodTruckExist) {
			doesFoodTruckExist.remove();
		}
		const mainTopContentRef = document.querySelector('#mainTopContent');
		let foodtruck = document.createElement('p');
		foodtruck.classList.add('main-content__foodtruck-name');

		// Villkor för vilken foodtrucknamn som visas beroende på val
		if (foodtruckSelectRef.value === 'truck1') {
			foodtruck.textContent = 'Foodtruck: Bengts Wontons';
		} else if (foodtruckSelectRef.value === 'truck2') {
			foodtruck.textContent = 'Foodtruck: Foodtruckexperten';
		} else if (foodtruckSelectRef.value === 'truck3') {
			foodtruck.textContent = 'Foodtruck: Super Wonton Meals';
		}

		mainTopContentRef.appendChild(foodtruck);
	});
}

export { runOrdersPage };
