// Här ska funktionen för att lägga till produkter i kundvagnen

import {
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from '../data/localStorage.js';

function getBasketItems() {
    let basketData = getDataFromLocalStorage('basket');
    return basketData;
}

export function addToBasket(id, itemName, price) {
    let itemId = elem.getAttribute('data-id');
    console.log(itemId);
    let itemToAdd = {};
}
