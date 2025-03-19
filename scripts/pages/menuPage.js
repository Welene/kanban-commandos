import { fetchProducts } from '../api/api.js';
import { getDataFromLocalStorage } from '../data/localStorage.js';
import { addToBasket } from '../components/addToBasket.js';
import { doesBasketItemCountsExist } from '../utils/utils.js';

async function runMenuPage() {
	let localProducts = getDataFromLocalStorage('menuProducts');
	let products;

	if (
		localProducts &&
		Array.isArray(localProducts) &&
		localProducts.length > 0
	) {
		const activeItems = localProducts.filter((item) => item.active);
		products = { items: activeItems };
	} else {
		const apiData = await fetchProducts();
		products = { items: apiData.items };
	}

	createCards(products, true, true);
	doesBasketItemCountsExist();
	setFilterMenu();
}

function createCards(products, addSecondText, addButton) {
	const unorderedListHTML = document.createElement('ul');

	// Skapa sektioner för Wonton och Drink utan rubriker
	const wontonSection = document.createElement('section');
	wontonSection.classList.add('food-menu-section');
	const drinkSection = document.createElement('section');
	drinkSection.classList.add('food-menu-section');

	products.items.forEach((item) => {
		const listItemHTML = document.createElement('li');
		listItemHTML.className = `food-menu-container__inner-grid ${item.type}`;

		const sectionHTML = document.createElement('section');

		const mainParagraphHTML = document.createElement('p');
		mainParagraphHTML.classList.add('food-menu-container__food-title');
		mainParagraphHTML.innerHTML = `<span>${item.name}</span><span class="dotted-line"></span><span>${item.price} sek</span>`;
		sectionHTML.appendChild(mainParagraphHTML);

		if (addSecondText === true) {
			const contentParagraphHTML = document.createElement('p');
			contentParagraphHTML.classList.add(
				'food-menu-container__food-content'
			);
			contentParagraphHTML.textContent = item.description;
			sectionHTML.appendChild(contentParagraphHTML);
		}

		listItemHTML.appendChild(sectionHTML);

		if (addButton === true) {
			const buttonHTML = document.createElement('button');
			buttonHTML.classList.add('food-menu-container__add-button');
			buttonHTML.textContent = '+';
			buttonHTML.addEventListener('click', () => {
				addToBasket(item.id, item.name, item.price);
			});
			listItemHTML.appendChild(buttonHTML);
		}

		// Lägg till rätt sektion beroende på produkttyp
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

	createDipCard(products);
}

function createDipCard(products) {
	const dipContainerRef = document.querySelector('#dipContainer');

	const paragraphHTML = document.createElement('p');
	paragraphHTML.classList.add('food-menu-container__food-title');
	paragraphHTML.innerHTML = `<span>Dipsås</span><span class="dotted-line"></span><span>19 sek</span>`;

	const addDipButtonHTML = document.createElement('button');
	addDipButtonHTML.classList.add('food-menu-container__add-button');
	addDipButtonHTML.textContent = '+';
	addDipButtonHTML.addEventListener('click', () => {
		const selectedDips = document.querySelectorAll('.selected-dip');
		selectedDips.forEach((dip) => {
			addToBasket(
				Number(dip.dataset.id),
				dip.dataset.name,
				Number(dip.dataset.price)
			);
		});
	});

	const sectionHTML = document.createElement('section');
	sectionHTML.className =
		'food-menu-container__inner-grid food-menu-container__inner-grid--border-top';
	sectionHTML.appendChild(paragraphHTML);
	sectionHTML.appendChild(addDipButtonHTML);
	dipContainerRef.appendChild(sectionHTML);

	const sectionDipHTML = document.createElement('section');
	sectionDipHTML.classList.add('food-menu-container__dip-button-container');

	products.items.forEach((item) => {
		if (item.type === 'dip') {
			const buttonHTML = document.createElement('button');
			buttonHTML.textContent = item.name;
			buttonHTML.classList.add('food-menu-container__dip-button');
			buttonHTML.dataset.id = item.id;
			buttonHTML.dataset.name = item.name;
			buttonHTML.dataset.price = item.price;

			buttonHTML.addEventListener('click', () => {
				buttonHTML.classList.toggle('selected-dip');
			});

			sectionDipHTML.appendChild(buttonHTML);
		}
	});

	dipContainerRef.appendChild(sectionDipHTML);
}

function setFilterMenu() {
	const filterMenuRef = document.querySelector('#filterMenu');
	filterMenuRef.addEventListener('change', (selection) => {
		const menuItems = document.querySelectorAll(
			'.food-menu-container__inner-grid'
		);
		menuItems.forEach((item) => {
			item.classList.remove('d-none');
			if (item.classList.contains(`${selection.target.value}`)) {
				item.classList.add('d-none');
			}
		});
		filterMenuRef.blur();
	});
}

export { runMenuPage };
