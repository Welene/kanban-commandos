import {
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from '../data/localStorage.js';

/*
Som användare vill jag kunna gå till en kundvagnssida där jag kan se en sammanfattning av min beställning innan jag checkar ut
Value Points: 5
Story Points: 4.2


Default header
/pages/orders.html


Hämta nyckel "basket" från localStorage


Visa upp innehållet i en container


En drop-down för att välja foodtruck


Visa totala kostnaden för hela ordern


Knapp "Take my money!" som tar dig till #eta.html


Kontroll om det finns en currentUser annars kan man inte lägga en order


Om man inte är inloggad så uppmanas man till detta.


ordern läggs om man är inloggad currentUser


Inkludera vald food truck i kvittot(?)
*/

function runOrdersPage() {}

export { runOrdersPage };
