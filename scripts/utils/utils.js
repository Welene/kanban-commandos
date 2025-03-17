import {
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from '../data/localStorage.js';

// Funktionsverktyg: Exempelvis funktioner för att randominisera nummer, formatera text eller manipulera strängar.

// Hjälpfunktioner för DOM-manipulering: Funktioner som förenklar att välja element, ändra klasser eller attribut på element, eller hantera händelselyssnare.

/**
 * Funktion för att markera den aktuella sidan i hamburgermenyn.
 * Den lägger till klassen "menu__link--active" på rätt länk beroende på vilken sida användaren befinner sig på.
 */

function highlightActiveBurgerLink() {
    const path = window.location.pathname;

    // Lista över sidor och deras motsvarande ID:n i menyn
    const menuLinks = [
        {
            path: [
                'index.html',
                '/',
                '/Exam-MovieDataBase/',
                '/Exam-MovieDataBase/index.html',
            ],
            id: 'homeLink',
        },
        { path: ['/menu.html', '/pages/menu.html'], id: 'menuLink' },
        { path: ['/orders.html', '/pages/orders.html'], id: 'ordersLink' },
        { path: ['/history.html', '/pages/history.html'], id: 'historyLink' },
        { path: ['/profile.html', '/pages/profile.html'], id: 'profileLink' },
        { path: ['/map.html', '/pages/map.html'], id: 'mapLink' },
        { path: ['/about.html', '/pages/about.html'], id: 'aboutLink' },
        { path: ['/order-overview.html'], id: 'adminLink' }, // Admin-sida
    ];

    menuLinks.forEach(({ path: paths, id }) => {
        if (paths.some((p) => path.endsWith(p))) {
            document
                .querySelectorAll(`#${id}`)
                .forEach((el) => el.classList.add('menu__link--active'));
        }
    });
}

export function clickLoginBtn() {
    let loginButton = document.getElementById('loginBtn');

    loginButton.addEventListener('click', () => {
        window.location.href = '../pages/menu.html';
        console.log(
            'navigated to main.html page after clicking on login button'
        );
    });
}

function doesBasketItemCountsExist() {
    let basketItemCounts = getDataFromLocalStorage('basketCount');
    const basketRef = document.querySelector('#basket');

    if (basketItemCounts > 0) {
        // Skapar själva röda cirkeln och stoppar in nuvarande basketItemCounts i den
        const basketItemCountHTML = `<span
        id="basketItemCount"
        class="header__basket-item-count"
         >${basketItemCounts}</span>`;

        // Stoppar in den sist i headern
        basketRef.insertAdjacentHTML('beforeend', basketItemCountHTML);
    }
}

export function generateUniqueId() {
    return '#' + Math.random().toString(36).substring(2, 9);
}

// Funktion för att tömma hela varukorgen
function emptyBasket() {
    // Töm varukorgen
    saveDataToLocalStorage('basket', {});

    // Töm basketCount (countern för hur många saker som finns i basket)
    saveDataToLocalStorage('basketCount', 0);
}

/**
 * Hanterar en tom kundkorg på ordersidan genom att:
 * - Visa ett meddelande att korgen är tom.
 * - Uppdatera totalkostnaden till 0 SEK.
 * - Ändra texten på checkout-knappen till "GO TO MENU" och länka till menyn.
 *
 * Funktionen inkluderar felhantering och kontrollerar att nödvändiga element finns
 * innan den försöker uppdatera dem.
 */
export function emptyBasketOrdersPage() {
    const container = document.querySelector('#orderSummary'); // Behållare för orderöversikt
    const totalCostElement = document.querySelector('#totalCost'); // Element för totalkostnad
    const checkoutButton = document.querySelector('#checkoutBtn'); // Knapp för att slutföra order

    // Kontrollera att orderöversikten finns innan vi uppdaterar den
    if (container) {
        container.innerHTML =
            '<p class="order-summary__empty-msg">Your basket is empty</p>';
    }

    // Kontrollera att totalpriset finns innan vi uppdaterar det
    if (totalCostElement) {
        totalCostElement.innerHTML = `<p class="total-cost__title">Total</p><p class="total-cost__price"> 0 SEK</p>`;
    }

    // Kontrollera att checkout-knappen finns innan vi ändrar text och lägger till eventlyssnare
    if (checkoutButton) {
        checkoutButton.textContent = 'GO TO MENU';
        checkoutButton.addEventListener('click', () => {
            window.location.href = '/pages/menu.html';
        });
    }
}

function handleRegisterIndexClick() {
    document.getElementById("registerBtn").addEventListener("click", function() {
        window.location.href = "register.html";
    });
}
function buttonAddLinkToMenu(htmlRef) {
    htmlRef.addEventListener('click', () => {
        window.location.href = '/pages/menu.html';
    });
}

// Funktion för att maskera emailadress
function maskEmail(email) {
    return email.replace(/^(.)(.*)(@.*)$/, (_, first, middle, domain) => {
        return first + '***' + domain;
    });
}

export { highlightActiveBurgerLink, doesBasketItemCountsExist, emptyBasket, buttonAddLinkToMenu, handleRegisterIndexClick, maskEmail };
