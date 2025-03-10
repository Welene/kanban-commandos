import { fetchProducts } from '../api/api.js';
async function runMenuPage() {
	const products = await fetchProducts();
	const cardContainerRef = document.querySelector('#cardContainer');

	cardContainerRef.appendChild(createCards(products, true));
}

function createCards(products, addSecondText, addButton) {
	console.log(products.items);

	const unorderedListHTML = document.createElement('ul');

	products.items.forEach((item) => {
		const listItemHTML = document.createElement('li');
		const sectionHTML = document.createElement('section');

		const mainParagraphHTML = document.createElement('p');
		mainParagraphHTML.innerHTML = `<span>${item.name}</span><span>${item.price} sek</span>`;
		sectionHTML.appendChild(mainParagraphHTML);

		if (addSecondText === true) {
			const contentParagraphHTML = document.createElement('p');
			contentParagraphHTML.textContent = item.description;
			sectionHTML.appendChild(contentParagraphHTML);
		}

		const buttonHTML = document.createElement('button');
		buttonHTML.textContent = '+';

		listItemHTML.appendChild(sectionHTML);
		listItemHTML.appendChild(buttonHTML);
		unorderedListHTML.appendChild(listItemHTML);
	});

	return unorderedListHTML;
}

export { runMenuPage };
