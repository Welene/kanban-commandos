import { fetchProducts } from '../api/api.js';
import { addToBasket } from '../components/addToBasket.js';
import { doesBasketItemCountsExist } from '../utils/utils.js';

async function runMenuPage() {
	const products = await fetchProducts();
	createCards(products, true, true);
	// Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
	doesBasketItemCountsExist();
	setFilterMenu();
}

function createCards(products, addSecondText, addButton) {
	// Unordered list som behållare för alla menyalternativen
	const unorderedListHTML = document.createElement('ul');

	//För varje menyvara körs koden under
	products.items.forEach((item) => {
		// Kontrollerar ifall menyvaran är wonton eller drink
		if (item.type === 'wonton' || item.type === 'drink') {
			//Varje menykort är en list item
			const listItemHTML = document.createElement('li');
			listItemHTML.className = `food-menu-container__inner-grid ${item.type}`;

			// Används för att förvara texterna i
			const sectionHTML = document.createElement('section');

			// Namnet på matvaran plus priset
			const mainParagraphHTML = document.createElement('p');
			mainParagraphHTML.classList.add('food-menu-container__food-title');

			// Använder span för att dela upp matvaran och priset
			// Har en extra span för den punktade linjen
			mainParagraphHTML.innerHTML = `<span>${item.name}</span><span class="dotted-line"></span><span>${item.price} sek</span>`;

			sectionHTML.appendChild(mainParagraphHTML);

			// Om "innehållsförteckningen" ska finnas under matvarunamnet
			if (addSecondText === true) {
				const contentParagraphHTML = document.createElement('p');
				contentParagraphHTML.classList.add(
					'food-menu-container__food-content'
				);
				contentParagraphHTML.textContent = item.description;
				sectionHTML.appendChild(contentParagraphHTML);
			}
			listItemHTML.appendChild(sectionHTML);

			// Lägger till knappen om den behövs
			if (addButton === true) {
				const buttonHTML = document.createElement('button');
				buttonHTML.classList.add('food-menu-container__add-button');
				buttonHTML.textContent = '+';

				// Gör så knappen lägger in det menyval den befinner sig i
				buttonHTML.addEventListener('click', () => {
					addToBasket(item.id, item.name, item.price);
				});
				listItemHTML.appendChild(buttonHTML);
			}

			unorderedListHTML.appendChild(listItemHTML);
		}
	});

	const cardContainerRef = document.querySelector('#cardContainer');
	cardContainerRef.appendChild(unorderedListHTML);
	// Dippen läggs till i funktionen under.
	createDipCard(products);
}

// Skapar dipdelen av menyn
function createDipCard(products) {
	// Hämtar elementet från menysidan
	const dipContainerRef = document.querySelector('#dipContainer');

	// Dipsås plus priset,
	const paragraphHTML = document.createElement('p');
	paragraphHTML.classList.add('food-menu-container__food-title');

	// Använder span för att dela upp matvaran och priset
	// Har en extra span för den punktade linjen
	paragraphHTML.innerHTML = `<span>Dipsås</span><span class="dotted-line"></span><span>19 sek</span>`;

	// Lägger till knappen
	const addDipButtonHTML = document.createElement('button');
	addDipButtonHTML.classList.add('food-menu-container__add-button');
	addDipButtonHTML.textContent = '+';

	// Ser till att knappen först letar upp alla valda dippsorter före den lägger dem i basket
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

	// Behållare för texten och lägg till-knappen
	const sectionHTML = document.createElement('section');
	sectionHTML.className =
		'food-menu-container__inner-grid food-menu-container__inner-grid--border-top';

	// Lägger till texten och lägg till-knappen i behållaren
	sectionHTML.appendChild(paragraphHTML);
	sectionHTML.appendChild(addDipButtonHTML);
	dipContainerRef.appendChild(sectionHTML);

	// Ny behållare för dipvalen
	const sectionDipHTML = document.createElement('section');
	sectionDipHTML.classList.add('food-menu-container__dip-button-container');

	// Alla dipsorter får sin egna knapp
	products.items.forEach((item) => {
		if (item.type === 'dip') {
			const buttonHTML = document.createElement('button');
			buttonHTML.textContent = item.name;
			buttonHTML.classList.add('food-menu-container__dip-button');

			// Dataset för att spara informationen om varje dipsort
			buttonHTML.dataset.id = item.id;
			buttonHTML.dataset.name = item.name;
			buttonHTML.dataset.price = item.price;

			// Gör så markerade knappar blir mörkladgda samt får klassen "selected-dip"
			// Alla knappar som togglar "selected-dip" är de som lägg till-knappen kommer leta efter
			buttonHTML.addEventListener('click', () => {
				buttonHTML.classList.toggle('selected-dip');
			});

			// Lägger till varje dipsort i den nya dipbehållaren
			sectionDipHTML.appendChild(buttonHTML);
		}
	});

	// Dipbehållaren läggs in i huvudcontainern för dipen.
	dipContainerRef.appendChild(sectionDipHTML);
}

// Ser till så filterfunktionen fungerar
function setFilterMenu() {
	// Sätter en eventListener på drop down-menyn
	const filterMenuRef = document.querySelector('#filterMenu');
	filterMenuRef.addEventListener('change', (selection) => {
		// Letar upp alla menykort
		const menuItems = document.querySelectorAll(
			'.food-menu-container__inner-grid'
		);

		// Tar först bort 'd-none' från alla korten (om de finns)
		// Lägger därefter till 'd-none' till de menykort som matchar värdet på menyvalet
		// Värdet är speglat så menyval 'wonton' ger värdet 'drink' och vice versa
		menuItems.forEach((item) => {
			item.classList.remove('d-none');

			if (item.classList.contains(`${selection.target.value}`)) {
				item.classList.add('d-none');
			}
		});
	});
}

export { runMenuPage };
