/**
 * Hämtar kundvagnen från localStorage.
 *
 * Om det inte finns någon sparad kundvagn eller om den är tom,
 * skapas en ny tom kundvagn med korrekt struktur.
 *
 * Säkerställer också att "items" alltid är en array för att undvika fel.
 *
 *
 */
import {
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from '../data/localStorage.js';

function getBasketItems() {
    let basketData = getDataFromLocalStorage('basket');

    // Om basketData saknas eller är en tom array, skapa en ny kundvagn
    if (!basketData || (Array.isArray(basketData) && basketData.length === 0)) {
        basketData = { id: '', foodTruck: '', items: [] };
    }

    // Säkerställ att items alltid är en array
    if (!Array.isArray(basketData.items)) {
        basketData.items = [];
    }
    return basketData;
}

/**
 * Lägger till en produkt i kundvagnen och sparar uppdaterad data i localStorage.
 *
 * Om produkten redan finns i kundvagnen ökas dess antal, annars läggs den till som en ny post.
 */
export function addToBasket(id, itemName, price) {
    //hämta nuvarande bakset
    let basketData = getBasketItems();
    console.log('Basket data get from localStorage: ' + basketData);
    // Kolla om varan redan finns i items
    let existingItem = basketData.items.find((item) => item.id === id);

    if (existingItem) {
        // Om varan finns, öka antal
        existingItem.amount += 1;
    } else {
        // Annars, lägg till ny vara
        let itemToAdd = {
            id: id,
            name: itemName,
            amount: 1,
            price: price,
        };
        basketData.items.push(itemToAdd);
    }
    console.log('Basket data that`s saved: ' + basketData);
    // Spara tillbaka basket till localStorage
    saveDataToLocalStorage('basket', basketData);
}
