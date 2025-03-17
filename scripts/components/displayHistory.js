import { getDataFromLocalStorage } from '../data/localStorage.js';

export function displayReceipts() {
	const receiptsContainer = document.querySelector('#receiptsList');
	const currentUser = getDataFromLocalStorage('currentUser');

	if (
		!currentUser ||
		!currentUser.receipts ||
		currentUser.receipts.length === 0
	) {
		receiptsContainer.innerHTML = '<p>You have no receipts yet.</p>';
		return;
	}

	receiptsContainer.innerHTML = ''; // Rensa gamla kvitton

	currentUser.receipts.forEach((receipt) => {
		const receiptItem = document.createElement('section');
		receiptItem.classList.add('receipt', 'receipt-resize');

		// Skapa header för kvittot (sammanfällt läge)
		const receiptHeader = document.createElement('section');
		receiptHeader.classList.add('receipt__header');
		receiptHeader.innerHTML = `
            <strong class="receipt__title">Kvitto</strong>
            <span class="receipt__id">#${receipt.id}</span>
            <span>${receipt.foodTruck || 'No truck selected'}</span>
            <span class="receipt__total-price">${receipt.items.reduce(
				(total, item) => total + item.price * item.amount,
				0
			)} SEK</span>
        `;

		// Skapa en div för detaljerna (expanderbart innehåll)
		const receiptDetails = document.createElement('section');
		receiptDetails.classList.add('receipt__items');
		receiptDetails.style.display = 'none';

		// Lägg till logotyp i expanderad vy
		const receiptLogo = document.createElement('section');
		receiptLogo.classList.add('receipt__logo', 'receipt__logo--resize');
		receiptLogo.innerHTML = `<img src="../assets/icons/logo-red.svg" alt="Logo">`;

		receiptDetails.appendChild(receiptLogo);

		// Lägg till varje vara i kvittot
		let totalCost = 0;
		receipt.items.forEach((item) => {
			const itemElement = document.createElement('section');
			itemElement.classList.add('receipt__item');
			itemElement.innerHTML = `
                <section class="receipt__item-info">
                    <span class="receipt__item-name">${item.name}</span>
                    <span class="receipt__item-count">${item.amount} st</span>
                </section>
                <span class="dotted-line dotted-line--receipt"></span>
                <span class="receipt__item-price">${
					item.price * item.amount
				} SEK</span>
            `;
			receiptDetails.appendChild(itemElement);
			totalCost += item.price * item.amount;
		});

		// Totalpris-sektionen
		const totalSection = document.createElement('section');
		totalSection.classList.add('receipt__total');
		totalSection.innerHTML = `<p class="total-cost__title">Total</p><p class="total-cost__price">${totalCost} SEK</p>`;
		receiptDetails.appendChild(totalSection);

		// Lägg till klickfunktion för att expandera/dölja
		receiptHeader.addEventListener('click', () => {
			const isExpanded = receiptDetails.style.display === 'block';
			receiptDetails.style.display = isExpanded ? 'none' : 'block';
			receiptItem.classList.toggle('expanded');
		});

		// Lägg till allt till kvittoelementet
		receiptItem.appendChild(receiptHeader);
		receiptItem.appendChild(receiptDetails);
		receiptsContainer.appendChild(receiptItem);
	});
}
