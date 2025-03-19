import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';
import { showMessage } from '../utils/utils.js';
import { validateProduct } from './validate.js';

//Hör till MenuEdit.html, men jag fick dela på den då den blev för lång!

function openAddProductForm() {
	const container = document.querySelector('#editMenuContainer');

	const form = document.createElement('section');
	form.classList.add('add-product-form');

	form.innerHTML = `
		<label class="edit-card__label" for="newName">Namn</label>
		<input class="edit-card__name-input" id="newName" placeholder="Produktnamn" />

		<label class="edit-card__label" for="newPrice">Pris</label>
		<input type="number" class="edit-card__price-input" id="newPrice" placeholder="Pris" />

		<label class="edit-card__label" for="newType">Typ</label>
		<select class="form-select" id="newType">
			<option value="wonton">Wonton</option>
			<option value="dip">Dip</option>
			<option value="drink">Drink</option>
		</select>

		<label class="edit-card__label" for="newDesc">Beskrivning</label>
		<textarea id="newDesc" class="edit-card__textarea" placeholder="Beskrivning" rows="2"></textarea>

		<label class="edit-card__label" for="newIngredients">Ingredienser</label>
		<input class="edit-card__ingredient-input" id="newIngredients" placeholder="kommaseparerade" />

		<section class="form-buttons">
			<button id="saveNewProduct">Spara ny produkt</button>
			<button id="cancelNewProduct">Avbryt</button>
		</section>
	`;

	container.prepend(form);

	const typeSelect = form.querySelector('#newType');
	const ingredientsInput = form.querySelector('#newIngredients');

	const toggleIngredientsVisibility = () => {
		ingredientsInput.style.display =
			typeSelect.value === 'wonton' ? 'block' : 'none';
	};
	toggleIngredientsVisibility();
	typeSelect.addEventListener('change', toggleIngredientsVisibility);

	// Hantera knappar
	document.querySelector('#saveNewProduct').addEventListener('click', () => {
		const name = document.querySelector('#newName').value.trim();
		const price = 19; // Sätt ett fast pris för dipsåser
		const type = document.querySelector('#newType').value;
		const description = document.querySelector('#newDesc').value.trim();
		const ingredientsRaw = document
			.querySelector('#newIngredients')
			.value.trim();

		const validation = validateProduct(
			name,
			price,
			description,
			ingredientsRaw,
			type
		);

		if (!validation.valid) {
			showMessage(validation.message, 'error');
			return; // Stoppa vidare process om valideringen misslyckas
		}

		let ingredients = [];
		if (type === 'wonton') {
			ingredients = ingredientsRaw
				.split(',')
				.map((ing) => ing.trim())
				.filter((ing) => ing.length > 0);
		}

		const products = getDataFromLocalStorage('menuProducts') || [];
		const newId =
			products.length > 0
				? Math.max(...products.map((p) => p.id)) + 1
				: 1;

		const newItem = {
			id: newId,
			name,
			price,
			type,
			description,
			ingredients,
			active: true,
		};

		products.push(newItem);
		saveDataToLocalStorage('menuProducts', products);
		showMessage('Ny produkt tillagd!', 'success');
		form.remove();
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	});

	document
		.querySelector('#cancelNewProduct')
		.addEventListener('click', () => {
			form.remove();
			showMessage('Produktskapande avbrutet.', 'success');
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		});
}

export { openAddProductForm };
