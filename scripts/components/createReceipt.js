import { getDataFromLocalStorage } from '../data/localStorage.js';

function generateReceipt() {
    const receiptContainer = document.querySelector('.receipt__items'); // Behållare för kvittoinnehållet
    const totalPriceElement = document.querySelector('.receipt__total-price'); // Element för totalpris
    const receiptIdElement = document.querySelector('.receipt__id'); // Element för kvitto-ID

    const receipt = getDataFromLocalStorage('receipt'); // Hämta kvittot från localStorage

    // Om inget kvitto finns, visa ett meddelande och avsluta
    if (!receipt || !receipt.items || receipt.items.length === 0) {
        receiptContainer.innerHTML =
            '<p class="emptyReciept">Ditt kvitto är tomt.</p>';
        totalPriceElement.textContent = '0 SEK';
        return;
    }

    receiptIdElement.textContent = `#${receipt.id}`; // Visa unikt kvitto-ID
    receiptContainer.innerHTML = ''; // Rensa gammalt innehåll

    let totalCost = 0; // Initiera totalpris

    // Loopa igenom varorna i kvittot och skapa HTML-element
    receipt.items.forEach((item) => {
        const itemElement = document.createElement('section');
        itemElement.classList.add('receipt__item');
        itemElement.innerHTML = `
            <section class="receipt__item-info">
                <span class="receipt__item-name">${item.name}</span>
                <span class="receipt__item-count">${item.amount} stycken</span>
            </section>
            <span class="dotted-line dotted-line--receipt"></span>
            <span class="receipt__item-price">${
                item.price * item.amount
            } SEK</span>
        `;

        receiptContainer.appendChild(itemElement);
        totalCost += item.price * item.amount; // Lägg till varans kostnad i totalen
    });

    totalPriceElement.textContent = `${totalCost} SEK`; // Uppdatera totalpris
}

// Exportera funktionen så att den kan importeras och anropas i andra filer
export { generateReceipt };
