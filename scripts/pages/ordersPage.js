import {
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from '../data/localStorage.js';
import {
    generateUniqueId,
    doesBasketItemCountsExist,
    emptyBasket,
    emptyBasketOrdersPage,
} from '../utils/utils.js';

/**
 * Funktion som hanterar ordersidan.
 * Laddar kundvagnen från localStorage, visar beställningen och hanterar utcheckning.
 */
function runOrdersPage() {
    const basket = getDataFromLocalStorage('basket'); // Hämta kundvagnen
    const container = document.querySelector('#orderSummary'); // Behållare för orderöversikt
    const totalCostElement = document.querySelector('#totalCost'); // Element för totalkostnad
    const foodTruckDropdown = document.querySelector('#foodtruckSelect'); // Dropdown för foodtruck
    const checkoutButton = document.querySelector('#checkoutBtn'); // Knapp för att slutföra order
    const currentUser = getDataFromLocalStorage('currentUser'); // Hämta aktuell användare

    // Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
    doesBasketItemCountsExist();

    // Om varukorgen är tom, visa meddelande och sätt totalpriset till 0
    if (!basket || !basket.items || basket.items.length === 0) {
        emptyBasketOrdersPage();
        return;
    }

    container.innerHTML = ''; // Rensa tidigare innehåll
    let totalCost = 0; // Initiera totalkostnaden

    // Loopa igenom alla produkter och skapa orderöversikten
    basket.items.forEach((item) => {
        const itemElement = document.createElement('p');
        itemElement.classList.add('food-menu-container__food-title');

        // Skapa en rad för varje produkt med namn, antal och pris
        itemElement.innerHTML = `
            <span>${item.name} x${item.amount}</span>
            <span class="dotted-line"></span>
            <span>${item.price * item.amount} SEK</span>
        `;

        container.appendChild(itemElement);
        totalCost += item.price * item.amount; // Lägg till produktens kostnad i totalen
    });

    totalCostElement.innerHTML = `<p class="total-cost__title">Total</p><p class="total-cost__price">${totalCost} SEK</p>`; // Uppdatera totalkostnaden

    // Om användaren inte är inloggad, ändra checkout-knappen till "Logga in"
    /* if (!currentUser || !currentUser.username) {
        checkoutButton.textContent = 'Log in to place order';
        checkoutButton.addEventListener('click', () => {
            window.location.href = '/pages/index.html';
        });
        return;
    } */

    // Om användaren är inloggad, tillåt beställning
    checkoutButton.textContent = 'PLACE ORDER';
    checkoutButton.addEventListener('click', () => {
        // Kontrollera att en foodtruck är vald
        if (!foodTruckDropdown.value) {
            alert('Please select a food truck before placing an order.');
            return;
        }
        basket.foodTruck = foodTruckDropdown.value; // Spara vald foodtruck
        basket.id = generateUniqueId(); // Generera unikt order-ID

        saveDataToLocalStorage('receipt', basket); // Spara aktivt kvitto

        // Lägg till beställningen i användarens kvittohistorik
        if (currentUser && currentUser.receipts) {
            if (!currentUser.receipts) {
                currentUser.receipts = [];
            }
            currentUser.receipts.push(basket);
            saveDataToLocalStorage('currentUser', currentUser); // Uppdatera currentUser i localStorage

            updateAllUsersReceipts(currentUser.username, basket); // Uppdatera allUsers med orderhistorik
        }
        // Anropar funktion som tömmer hela basket
        emptyBasket();

        window.location.href = '/pages/eta.html'; // Omdirigera till orderbekräftelsesidan
    });
}

/**
 * Uppdaterar allUsers med det nya kvittot för en specifik användare.
 * Hittar rätt användare i listan och lägger till det nya kvittot.
 */
function updateAllUsersReceipts(username, newReceipt) {
    const allUsers = getDataFromLocalStorage('users') || []; // Hämta alla användare

    // Hitta rätt användare i allUsers
    const userIndex = allUsers.findIndex((user) => user.username === username);
    if (userIndex !== -1) {
        if (!allUsers[userIndex].receipts) {
            allUsers[userIndex].receipts = []; // Skapa receipts-array om den saknas
        }
        allUsers[userIndex].receipts.push(newReceipt); // Lägg till det nya kvittot
    }
    saveDataToLocalStorage('users', allUsers); // Uppdatera users i localStorage
}

export { runOrdersPage };
