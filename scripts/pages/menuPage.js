import { fetchProducts } from '../api/api.js';
// import { addToBasket } from '../components/addToBasket.js'

async function runMenuPage() {
	const products = await fetchProducts();
	createCards(products, true, true);
}

function createCards(products, addSecondText, addButton) {
	console.log(products.items);

	// Unordered list som behållare för alla menyalternativen
	const unorderedListHTML = document.createElement('ul');

	//För varje menyvara körs koden under
	products.items.forEach((item) => {
		// Kontrollerar ifall menyvaran är wonton eller drink
		if (item.type === 'wonton' || item.type === 'drink') {
			//Varje menykort är en list item
			const listItemHTML = document.createElement('li');
			listItemHTML.classList.add('food-menu-container__inner-grid');

			// Används för att förvara texterna i
			const sectionHTML = document.createElement('section');

			// Namnet på matvaran plus priset
			const mainParagraphHTML = document.createElement('p');
			mainParagraphHTML.classList.add('food-menu-container__food-title');

			// Använder span för att dela upp matvaran och priset
			// Har en extra top span för den punktade linjen
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

			// Dippen fås en egen ruta i botten
		}
	});

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
	addDipButtonHTML.textContent = '+';

	addDipButtonHTML.addEventListener('click', () => {
		const selectedDips = document.querySelectorAll('.selected-dip');
		selectedDips.forEach((dip) => {
			addToBasket(dip.dataset.id, dip.dataset.name, dip.dataset.price);
		});
	});

	addDipButtonHTML.classList.add('food-menu-container__add-button');

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

function addToBasket(one, two, three) {
	console.log('I am added to basket! ' + one + two + three);
}
export { runMenuPage };
