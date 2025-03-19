import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';

/**
 * Hämtar kundvagnens innehåll från localStorage.
 * Om datan är ogiltig eller saknas, returneras en tom kundvagnsstruktur.
 * Felhantering är inkluderad för att undvika krasch vid korrupt eller saknad data
 */
export function getBasketItems() {
	try {
		// Försök att hämta basket-data från localStorage
		let basketData = getDataFromLocalStorage('basket');

		// Kontrollera att datan är giltig (måste vara ett objekt och innehålla en array för items)
		if (
			!basketData ||
			typeof basketData !== 'object' ||
			!Array.isArray(basketData.items)
		) {
			return { id: '', foodTruck: '', items: [] }; // Returnera en tom kundvagn vid ogiltig data
		}

		return basketData; // Returnera den befintliga kundvagnen om den är korrekt
	} catch (error) {
		// Logga felet i konsolen för att underlätta felsökning
		console.error('Error fetching basket data:', error);

		// Returnera en tom kundvagn om ett fel uppstår
		return { id: '', foodTruck: '', items: [] };
	}
}

/**
 * Lägger till en produkt i kundvagnen och sparar uppdaterad data i localStorage.
 *
 * Om produkten redan finns i kundvagnen ökas dess antal, annars läggs den till som en ny post.
 */
export function addToBasket(id, itemName, price) {
	//hämta nuvarande bakset
	let basketData = getBasketItems();
	// Kolla om varan redan finns i items
	let existingItem = basketData.items.find((item) => item.id === id);

	if (existingItem) {
		// Om varan finns, öka antal
		existingItem.amount += 1;
	} else {
		// Annars, lägg till ny vara
		let itemToAdd = {
			id: id,
			name: itemName,
			amount: 1,
			price: price,
		};
		basketData.items.push(itemToAdd);
	}
	// Spara tillbaka basket till localStorage
	saveDataToLocalStorage('basket', basketData);
	// Lägger till den röda cirkeln på basket med antal items i basket
	addToBasketCount('incrament');
}

// Funktion för att skapa röda cirkeln med siffra för hur många items som finns i varukorgen
export function addToBasketCount(action) {
	// Hämtar hem nuvarande basketCount från localStorage om det finns
	let basketItemCounts = getDataFromLocalStorage('basketCount');
	const basketRef = document.querySelector('#basket');
	const basketItemCountRef = document.querySelector('#basketItemCount');
	if (action === 'incrament') {
		// Adderar en till item till nuvarande siffra
		basketItemCounts++;
	} else if (action === 'decrament') {
		// Adderar en till item till nuvarande siffra
		basketItemCounts--;
	}

	// Kontroll om den röda cirkeln inte finns. Då körs nedanstående kod
	if (!basketItemCountRef) {
		const basketItemCountHTML = `
        <span
        id="basketItemCount"
        class="header__basket-item-count"
        >${basketItemCounts}
        </span>`;

		// Stoppar in den sist i headern
		basketRef.insertAdjacentHTML('beforeend', basketItemCountHTML);
	} else {
		basketItemCountRef.textContent = basketItemCounts;
	}

	// Uppdaterar localStorage med nya basketItemCount
	saveDataToLocalStorage('basketCount', basketItemCounts);
}
