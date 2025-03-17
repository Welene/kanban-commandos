import { getDataFromLocalStorage } from '../data/localStorage.js';

export function displayReceipts() {
	const receiptsContainer = document.querySelector('#receiptsList');
	const currentUser = getDataFromLocalStorage('currentUser');

	if (
		!currentUser ||
		!currentUser.receipts ||
		currentUser.receipts.length === 0
	) {
		receiptsContainer.innerHTML =
			'<p class="noHistory">Du har inga kvitton.</p>';
		return;
	}

	receiptsContainer.innerHTML = '';

	currentUser.receipts.forEach((receipt) => {
		const receiptItem = document.createElement('section');
		receiptItem.classList.add('receipt', 'receipt-resize');

		// Header (krympt vy)
		const receiptHeader = document.createElement('section');
		receiptHeader.classList.add('receipt__header');
		const totalPrice = receipt.items.reduce(
			(total, item) => total + item.price * item.amount,
			0
		);

		receiptHeader.innerHTML = `
			<section class="receipt__header-top">
				<strong class="receipt__title">KVITTO</strong>
				<span class="receipt__total-price">${totalPrice} SEK</span>
			</section>
			<section class="receipt__truck-center">
				<span class="receipt__id">#${receipt.id}</span>
				<span class="receipt__truck-name">${
					receipt.foodTruck || 'No truck selected'
				}</span>
			</section>
		`;

		// Innehåll (logga + varor)
		const receiptDetails = document.createElement('section');
		receiptDetails.classList.add('receipt__items');
		receiptDetails.style.display = 'none';

		const receiptLogo = document.createElement('section');
		receiptLogo.classList.add('receipt__logo', 'receipt__logo--resize');
		receiptLogo.innerHTML = `<img src="../assets/icons/logo-red.svg" alt="Logo">`;
		receiptDetails.appendChild(receiptLogo);

		const receiptInfoExpanded = document.createElement('section');
		receiptInfoExpanded.classList.add('receipt__info-expanded');
		receiptInfoExpanded.innerHTML = `
			<strong class="receipt__title-expanded">KVITTO</strong>
			<span class="receipt__id">#${receipt.id}</span>
			<span class="receipt__truck-name">${
				receipt.foodTruck || 'No truck selected'
			}</span>
		`;
		receiptDetails.appendChild(receiptInfoExpanded);

		let totalCost = 0;
		receipt.items.forEach((item) => {
			const itemElement = document.createElement('section');
			itemElement.classList.add('receipt__item');
			itemElement.innerHTML = `
				<section class="receipt__item-info">
					<span class="receipt__item-name">${item.name}</span>
					<span class="receipt__item-count">${item.amount} stycken</span>
				</section>
				<span class="dotted-line dotted-line--receipt"></span>
				<span class="receipt__item-price">${item.price * item.amount} SEK</span>
			`;
			receiptDetails.appendChild(itemElement);
			totalCost += item.price * item.amount;
		});

		const receiptFooter = document.createElement('section');
		receiptFooter.classList.add('receipt__footer');
		receiptFooter.style.display = 'none';

		const totalSection = document.createElement('section');
		totalSection.classList.add('receipt__total-history');
		totalSection.innerHTML = `
			<span class="total-text">Totalt</span>
			<p class="total-cost-price">${totalCost} SEK</p>
			<p class="total-note">inkl 20% moms</p>
		`;
		receiptFooter.appendChild(totalSection);

		// Toggle – header försvinner, resten visas
		receiptItem.addEventListener('click', () => {
			const expanded = receiptItem.classList.toggle('expanded');
			receiptHeader.style.display = expanded ? 'none' : 'flex';
			receiptDetails.style.display = expanded ? 'block' : 'none';
			receiptFooter.style.display = expanded ? 'block' : 'none';
		});

		receiptItem.appendChild(receiptHeader);
		receiptItem.appendChild(receiptDetails);
		receiptItem.appendChild(receiptFooter);
		receiptsContainer.appendChild(receiptItem);
	});
}
