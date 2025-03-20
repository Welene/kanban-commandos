import { openAddProductForm } from './addProductForm.js';
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';
import { fetchProducts } from '../api/api.js';
import { showMessage } from '../utils/utils.js';

//Hör till MenuEdit.html, men jag fick dela på den då den blev för lång!

let isAddingProduct = false; // Flagga för att kontrollera om produktformulär är öppet

function renderEditableMenu(items) {
	const container = document.querySelector('#editMenuContainer');
	container.innerHTML = '';

	// Topbar med knappar + filter
	const addBtn = document.createElement('button');
	addBtn.textContent = '+ Lägg till produkt';
	addBtn.classList.add('add-product-btn');
	addBtn.addEventListener('click', () => {
		// Kontrollera om ett formulär är öppet
		if (!isAddingProduct) {
			isAddingProduct = true;
			openAddProductForm();
			addBtn.disabled = true; // Inaktivera knappen när produktformuläret är öppet
		}
	});

	// Återställ meny med modal
	const resetBtn = document.createElement('button');
	resetBtn.textContent = '↺ Återställ meny';
	resetBtn.classList.add('reset-btn');
	resetBtn.addEventListener('click', () => {
		const modal = document.getElementById('confirmationModal');
		modal.style.display = 'flex'; // Gör modalen synlig
		modal.removeAttribute('inert'); // Gör modalen interaktiv
	});

	// Stäng modalen
	const closeModal = document.getElementById('closeModal');
	closeModal.addEventListener('click', () => {
		const modal = document.getElementById('confirmationModal');
		modal.style.display = 'none'; // Dölja modalen
		modal.setAttribute('inert', true); // Gör modalen ointeraktiv
	});

	// När användaren trycker på "Ja", återställ menyn
	const confirmResetBtn = document.getElementById('confirmResetBtn');
	confirmResetBtn.addEventListener('click', () => {
		fetchProducts()
			.then((apiData) => {
				const resetItems = apiData.items.map((item) => ({
					...item,
					active: true,
				}));
				saveDataToLocalStorage('menuProducts', resetItems);
				showMessage('Menyn återställd!', 'success');
				setTimeout(() => {
					window.location.reload(); // Ladda om sidan för att visa de nya datan
				}, 1000);
				renderEditableMenu(resetItems);

				// Dölja modalen efter återställning
				const modal = document.getElementById('confirmationModal');
				modal.style.display = 'none';
				modal.setAttribute('inert', true); // Gör modalen ointeraktiv
			})
			.catch(() => {
				showMessage('Misslyckades hämta från API.', 'error');

				// Dölja modalen om det inte lyckas
				const modal = document.getElementById('confirmationModal');
				modal.style.display = 'none';
				modal.setAttribute('inert', true); // Gör modalen ointeraktiv
			});
	});

	// När användaren trycker på "Nej", stänger vi bara modalen
	const cancelResetBtn = document.getElementById('cancelResetBtn');
	cancelResetBtn.addEventListener('click', () => {
		const modal = document.getElementById('confirmationModal');
		modal.style.display = 'none'; // Dölja modalen
		modal.setAttribute('inert', true); // Gör modalen ointeraktiv
	});

	// Filter
	const filterLabel = document.createElement('label');
	filterLabel.textContent = 'Filtrera typ: ';
	filterLabel.setAttribute('for', 'filterSelect');
	filterLabel.classList.add('edit-card__label', 'edit-card__label-type');

	const filterSelect = document.createElement('select');
	filterSelect.id = 'filterSelect';
	['alla', 'wonton', 'dip', 'drink'].forEach((type) => {
		const option = document.createElement('option');
		option.value = type;
		option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
		filterSelect.appendChild(option);
	});
	filterSelect.addEventListener('change', () => {
		const selectedType = filterSelect.value;
		document.querySelectorAll('.edit-card').forEach((card) => {
			if (selectedType === 'alla' || card.dataset.type === selectedType) {
				card.style.display = 'flex';
			} else {
				card.style.display = 'none';
			}
		});
	});

	// Lägg till knappar och filter till topbaren
	const topBar = document.createElement('section');
	topBar.classList.add('edit-top-bar');
	topBar.append(addBtn, resetBtn, filterLabel, filterSelect);
	container.appendChild(topBar);

	// Rendera kort
	items.forEach((item, index) => {
		const card = document.createElement('section');
		card.classList.add('edit-card');
		card.dataset.type = item.type;
		if (!item.active) card.classList.add('paused');

		// Namn
		const nameLabel = document.createElement('label');
		nameLabel.textContent = 'Namn';
		nameLabel.setAttribute('for', `nameInput-${item.id}`); // Koppla label till input
		nameLabel.classList.add('edit-card__label');

		const nameInput = document.createElement('input');
		nameInput.id = `nameInput-${item.id}`; // Unikt id för input
		nameInput.value = item.name;
		nameInput.classList.add('edit-card__name-input');

		// Pris
		const priceLabel = document.createElement('label');
		priceLabel.textContent = 'Pris';
		priceLabel.setAttribute('for', `priceInput-${item.id}`); // Koppla label till input
		priceLabel.classList.add('edit-card__label');

		const priceInput = document.createElement('input');
		priceInput.id = `priceInput-${item.id}`; // Unikt id för input
		priceInput.type = 'number';
		priceInput.value = item.price;
		priceInput.classList.add('edit-card__price-input');

		// Rad: Namn + Pris
		const rowSection = document.createElement('section');
		rowSection.classList.add('edit-card__row');
		rowSection.append(nameLabel, nameInput, priceLabel, priceInput);

		// Beskrivning (textarea)
		const descLabel = document.createElement('label');
		descLabel.textContent = 'Beskrivning';
		descLabel.setAttribute('for', `descInput-${item.id}`); // Koppla label till textarea
		descLabel.classList.add('edit-card__label');

		const descriptionInput = document.createElement('textarea');
		descriptionInput.id = `descInput-${item.id}`; // Unikt id för textarea
		descriptionInput.rows = 4;
		descriptionInput.placeholder = 'Beskrivning';
		descriptionInput.classList.add('edit-card__textarea');
		descriptionInput.value = item.description || '';

		// Ingredienser
		let ingredientsLabel = null;
		let ingredientsInput = null;
		if (item.type === 'wonton') {
			ingredientsLabel = document.createElement('label');
			ingredientsLabel.textContent = 'Ingredienser';
			ingredientsLabel.setAttribute('for', `ingredientsInput-${item.id}`); // Koppla label till input
			ingredientsLabel.classList.add('edit-card__label');

			ingredientsInput = document.createElement('input');
			ingredientsInput.id = `ingredientsInput-${item.id}`; // Unikt id för input
			ingredientsInput.classList.add('edit-card__ingredient-input');
			ingredientsInput.placeholder = 'kommaseparerade';
			ingredientsInput.value = Array.isArray(item.ingredients)
				? item.ingredients.join(', ')
				: '';
		}

		// Switch + status
		const toggleWrapper = document.createElement('label');
		toggleWrapper.classList.add('switch');
		const hiddenText = document.createElement('span');
		hiddenText.classList.add('sr-only');
		hiddenText.textContent = 'Toggle för att pausa eller återuppta produkt';
		const toggleInput = document.createElement('input');
		toggleInput.type = 'checkbox';
		toggleInput.checked = !item.active;
		const slider = document.createElement('span');
		slider.className = 'slider';
		const statusText = document.createElement('span');
		statusText.textContent = toggleInput.checked ? 'Pausad' : 'Aktiv';
		statusText.classList.add('status-text');

		toggleInput.addEventListener('change', () => {
			item.active = !toggleInput.checked;
			statusText.textContent = item.active ? 'Aktiv' : 'Pausad';
			card.classList.toggle('paused', !item.active);

			const updatedProducts = getDataFromLocalStorage('menuProducts');
			updatedProducts[index] = item;
			saveDataToLocalStorage('menuProducts', updatedProducts);
			showMessage(
				item.active ? 'Produkt är aktiverad' : 'Produkt är pausad',
				'success'
			);
		});

		// Knappar
		const saveBtn = document.createElement('button');
		saveBtn.textContent = 'Spara';
		saveBtn.classList.add('save-btn');
		saveBtn.addEventListener('click', () => {
			item.name = nameInput.value;
			item.price = Number(priceInput.value);
			item.description = descriptionInput.value.trim();

			let ingredients = [];
			if (item.type === 'wonton' && ingredientsInput) {
				ingredients = ingredientsInput.value
					.split(',')
					.map((ing) => ing.trim())
					.filter((ing) => ing.length > 0);
			}
			item.ingredients = ingredients;

			const updatedProducts = getDataFromLocalStorage('menuProducts');
			updatedProducts[index] = item;
			saveDataToLocalStorage('menuProducts', updatedProducts);
			showMessage('Produkt sparad!', 'success');
		});

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Ta bort';
		deleteBtn.classList.add('delete-btn');
		deleteBtn.addEventListener('click', () => {
			if (confirm(`Ta bort ${item.name}?`)) {
				const updatedProducts = getDataFromLocalStorage('menuProducts');
				updatedProducts.splice(index, 1);
				saveDataToLocalStorage('menuProducts', updatedProducts);
				showMessage('Produkt borttagen!', 'success');
				renderEditableMenu(updatedProducts);
			}
		});

		// Append
		toggleWrapper.append(toggleInput, slider, hiddenText);
		card.append(rowSection);
		card.append(descLabel, descriptionInput);
		if (ingredientsInput) {
			card.append(ingredientsLabel, ingredientsInput);
		}
		card.append(toggleWrapper, statusText, saveBtn, deleteBtn);
		container.appendChild(card);
	});
}

export { renderEditableMenu };
