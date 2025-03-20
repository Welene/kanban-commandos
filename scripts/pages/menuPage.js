import { fetchProducts } from '../api/api.js';
import { getDataFromLocalStorage } from '../data/localStorage.js';
import { addToBasket } from '../components/addToBasket.js';
import { doesBasketItemCountsExist } from '../utils/utils.js';

// Huvudfunktionen för att köra meny-sidan
async function runMenuPage() {
	let localProducts = getDataFromLocalStorage('menuProducts'); // Hämtar produkter från localStorage
	let products;

	// Om produkter finns i localStorage, använd dem annars hämta från API
	if (
		localProducts &&
		Array.isArray(localProducts) &&
		localProducts.length > 0
	) {
		const activeItems = localProducts.filter((item) => item.active); // Filtrera bort inaktiva produkter
		products = { items: activeItems }; // Sätt aktiva produkter
	} else {
		const apiData = await fetchProducts(); // Hämta data från API
		products = { items: apiData.items }; // Sätt produkter från API
	}

	// Skapa kort för produkterna
	createCards(products, true, true);
	// Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
	doesBasketItemCountsExist();
	displayDipError();
	// Sätt filtermeny för produkterna
	setFilterMenu();
}

// Funktion för att skapa kort för varje produkt
function createCards(products, addSecondText, addButton) {
	const unorderedListHTML = document.createElement('ul'); // Skapar en oordnad lista för alla produkter

	// Skapa sektioner för Wonton och Drink så att nyskapade lägger sig korrekt
	const wontonSection = document.createElement('section');
	wontonSection.classList.add('food-menu-section');
	const drinkSection = document.createElement('section');
	drinkSection.classList.add('food-menu-section');

	// Gå igenom alla produkter och skapa kort för varje produkt
	products.items.forEach((item) => {
		const listItemHTML = document.createElement('li'); // Skapar ett listitem för varje produkt
		listItemHTML.className = `food-menu-container__inner-grid ${item.type}`; // Sätter rätt klass för typ

		// Sektion för produktnamn, pris och beskrivning
		const sectionHTML = document.createElement('section');
		const mainParagraphHTML = document.createElement('p');
		mainParagraphHTML.classList.add('food-menu-container__food-title');
		mainParagraphHTML.innerHTML = `<span>${item.name}</span><span class="dotted-line"></span><span>${item.price} sek</span>`;
		sectionHTML.appendChild(mainParagraphHTML);

		// Om vi ska lägga till beskrivning
		if (addSecondText === true) {
			const contentParagraphHTML = document.createElement('p');
			contentParagraphHTML.classList.add(
				'food-menu-container__food-content'
			);
			contentParagraphHTML.textContent = item.description;
			sectionHTML.appendChild(contentParagraphHTML);
		}
		listItemHTML.appendChild(sectionHTML);

		// Om en knapp ska visas för att lägga till produkten i korgen
		if (addButton === true) {
			const buttonHTML = document.createElement('button');
			buttonHTML.classList.add('food-menu-container__add-button');
			buttonHTML.textContent = '+';
			buttonHTML.addEventListener('click', () => {
				addToBasket(item.id, item.name, item.price); // Lägger till produkten i korgen
			});
			listItemHTML.appendChild(buttonHTML);
		}

		// Lägg till produkten i rätt sektion beroende på produkttyp
		if (item.type === 'wonton') {
			wontonSection.appendChild(listItemHTML);
		} else if (item.type === 'drink') {
			drinkSection.appendChild(listItemHTML);
		}
	});

	// Lägg till de skapade sektionerna till huvudlistan
	unorderedListHTML.appendChild(wontonSection);
	unorderedListHTML.appendChild(drinkSection);

	const cardContainerRef = document.querySelector('#cardContainer');
	cardContainerRef.appendChild(unorderedListHTML);

	// Skapa dip-sektionen
	createDipCard(products);
}

// Skapa sektion för dipperna i menyn
function createDipCard(products) {
	const dipContainerRef = document.querySelector('#dipContainer');

	// Skapa text för dipsåsen
	const paragraphHTML = document.createElement('p');
	paragraphHTML.classList.add('food-menu-container__food-title');
	paragraphHTML.innerHTML = `<span>Dipsås</span><span class="dotted-line"></span><span>19 sek</span>`;

	// Skapa lägg till-knappen för dipsåsen
	const addDipButtonHTML = document.createElement('button');
	addDipButtonHTML.classList.add('food-menu-container__add-button');
	addDipButtonHTML.textContent = '+';
	addDipButtonHTML.addEventListener('click', () => {
		// Lägg till valda dippsorter till korgen
		const selectedDips = document.querySelectorAll('.selected-dip');

		if (selectedDips.length === 0) {
			displayDipError(true);
		} else {
			displayDipError(false);

			selectedDips.forEach((dip) => {
				addToBasket(
					Number(dip.dataset.id),
					dip.dataset.name,
					Number(dip.dataset.price)
				);
			});
		}
	});

	// Lägg till sektionen för dipsås
	const sectionHTML = document.createElement('section');
	sectionHTML.className =
		'food-menu-container__inner-grid food-menu-container__inner-grid--border-top';
	sectionHTML.appendChild(paragraphHTML);
	sectionHTML.appendChild(addDipButtonHTML);
	dipContainerRef.appendChild(sectionHTML);

	// Skapa en sektion för dip-knappar
	const sectionDipHTML = document.createElement('section');
	sectionDipHTML.classList.add('food-menu-container__dip-button-container');

	// Gå igenom alla dipper och skapa knappar för varje
	products.items.forEach((item) => {
		if (item.type === 'dip') {
			const buttonHTML = document.createElement('button');
			buttonHTML.textContent = item.name;
			buttonHTML.classList.add('food-menu-container__dip-button');
			buttonHTML.dataset.id = item.id;
			buttonHTML.dataset.name = item.name;
			buttonHTML.dataset.price = item.price;

			// Lägg till eller ta bort klassen "selected-dip" när användaren klickar på en dipsort
			buttonHTML.addEventListener('click', () => {
				buttonHTML.classList.toggle('selected-dip');
			});

			// Lägg till knappen i dip-container
			sectionDipHTML.appendChild(buttonHTML);
		}
	});

	// Lägg till dip-val i dip-behållaren
	dipContainerRef.appendChild(sectionDipHTML);
}

// styling and timeout for error msg -- inside the errorContainer
function displayDipError(show) {
	let errorContainer = document.querySelector(
		'.food-menu-container__inner-grid--border-top'
	);

	let errorMessage = document.querySelector('.error-message');

	if (show) {
		if (!errorMessage) {
			errorMessage = document.createElement('p');
			errorMessage.classList.add('error-message');
			errorMessage.style.color = '#EB5757';
			errorMessage.style.fontWeight = 'bold';
			errorMessage.style.marginTop = '-1rem';
			errorMessage.textContent = 'Du måste välja en dip först';
			errorContainer.appendChild(errorMessage);

			setTimeout(() => {
				errorContainer.removeChild(errorMessage);
			}, 3000);
		}
	} else {
		if (errorMessage) {
			errorContainer.removeChild(errorMessage);
		}
	}
}

// Funktion för att sätta upp filtermenyn
function setFilterMenu() {
	const filterMenuRef = document.querySelector('#filterMenu');
	// När användaren väljer filter i dropdown-menyn
	filterMenuRef.addEventListener('change', (selection) => {
		const menuItems = document.querySelectorAll(
			'.food-menu-container__inner-grid'
		);
		// Döljer eller visar produkter baserat på filtreringen
		menuItems.forEach((item) => {
			item.classList.remove('d-none');
			if (item.classList.contains(`${selection.target.value}`)) {
				item.classList.add('d-none');
			}
		});
		filterMenuRef.blur(); // Ta bort fokus från dropdown
	});
}

export { runMenuPage };
