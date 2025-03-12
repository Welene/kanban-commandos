import { getDataFromLocalStorage } from '../data/localStorage.js';
import { runOrdersPage } from '../pages/ordersPage.js';
import { emptyBasket, emptyBasketOrdersPage } from '../utils/utils.js';

// Här ska funktionen för att öppna en dropdown-vy för när man trycker på kundvagnen skrivas.
function openDropDownBasket() {
    const basketRef = document.querySelector('#basket');
    // En lyssnare på basket-knappen
    basketRef.addEventListener('click', () => {
        // En kontroll för att se ifall det inte finns ett element med #overlayBasket så kommer den skapa basket
        if (!document.querySelector('#overlayBasket')) {
            // Funktion som skapar en basket genom DOM
            createOverlayDropDownBasket();
        }
        // Om det finns en id #overlayBasket så ska hela tas bort ifall man klickar igen på basket-knappen
        else {
            const overlayBackgroundRef =
                document.querySelector('#overlayBackground');
            // Här tas hela elementet bort vid klick av öppen basket
            overlayBackgroundRef.remove();
        }
    });
}

// Funktion för att skapa hela varukorgen
function createOverlayDropDownBasket() {
    const overlayBasketHTML = `
    <section id="overlayBackground" class="overlay-background">
            <article id="overlayBasket" class="overlay-basket">
                <h2 id="overlayBasketTitle" class="overlay-basket__title">
                    Översikt varukorg
                </h2>
                <ul id="basketList" class="basket__list"></ul>
                <section id="basketTotal" class="basket-total-box">
                    <p id="basketTotalTitle" class="basket-total__title">TOTALT
                    </p>
                    <p id="basketTotalAmount" class="basket-total__amount"></p>
                </section>
                <button id="basketPreviewOrderNav" class="basket-preview-order-nav"
                >FÖRHANDSGRANSKA ORDER</button
                >
            </article>
        </section>
    `;
    // Lägg till menyn i sidans <body> i början av dokumentet
    document.body.insertAdjacentHTML('afterbegin', overlayBasketHTML);
    // Anropar funktion för att skapa produkter som lagt till basket
    createBasketItem();
    // Anropar funktion för att kunna stänga basket
    closeOverlayBasketListener();
    // Kontroll om varukorgen är tom och då skrivs 'Tom varukorg'-meddelande
    isBasketEmpty();
    // Skapar en papperskorg för att tömma basket om det finns items i basket
    createEmptyBasketElem();
}

// Funktion som skapar varje enskilda produkt som lagt in i basket
function createBasketItem() {
    // Hämtar hem sparade arrayen från localStorage
    const basketItems = getDataFromLocalStorage('basket');
    const basketListRef = document.querySelector('#basketList');
    const basketTotalAmountRef = document.querySelector('#basketTotalAmount');

    // Här sparas totalsumman
    let totalAmount = 0;

    // Kontroll så att det finns tillagda produkter i basket
    if (
        basketItems &&
        typeof basketItems === 'object' &&
        Array.isArray(basketItems.items) &&
        basketItems.items.length > 0
    ) {
        // Loopning för att skapa varje basketItem som har lagt till i basket
        for (let i = 0; i < basketItems.items.length; i++) {
            // Beräkning av totala priset för produkten
            const itemPrice =
                basketItems.items[i].amount * basketItems.items[i].price;

            // Lägger till kostnad för denna produkt med antalet amount in till totalAmount
            totalAmount += itemPrice;

            let basketItemsHTML = `
                <li data-basketItemId="basketItem" class="basket__list-item">
                    <section class="basket__title-box">
                        <p data-itemTitleId="basketItemTitle" class="basket__item">
                            ${basketItems.items[i].name}
                        </p>
                        <p data-basketItemCountId="basketItemCount" class="basket__item">x${basketItems.items[i].amount}</p>
                    </section>
                    <span class="separator"></span>
                    <p data-basketItemPriceId="basketItemPrice" class="basket__item">${itemPrice} kr</p>
                </li>
                `;
            // Lägger in produkten i basket
            basketListRef.insertAdjacentHTML('beforeend', basketItemsHTML);
        }
        // Efter loopning av alla produkter i basket ändras totalsumman
        basketTotalAmountRef.textContent = `${totalAmount} kr`;
    }
    // Om det inte finns något i basket.items
    else {
        // Meddelande om att varukorgen är tom läggs in
        const emptyHTML = `<p class="basket__empty">Din varukorg är tom</p>`;
        basketListRef.insertAdjacentHTML('beforeend', emptyHTML);

        basketTotalAmountRef.textContent = `${totalAmount} kr`;
    }
}

// Skapar en papperskorg för tömma varukorgen om varor är tillagda
function createEmptyBasketElem() {
    const basketItemRef = document.querySelector(
        '[data-basketitemid = "basketItem"]'
    );
    const basketListRef = document.querySelector('#basketList');

    // Elementet som skapas med en kontroll om det finns någon vara i varukorgen
    if (basketItemRef) {
        const emptyBasketHTML = `
        <section id="emptyBasket" class="empty-basket-box">
            <img
                id="emptyBasketImg"
                class="empty-basket-box__trash-can"
                src="../assets/icons/trash-can.svg"
                alt="Bin icon"
            />
            <p
                id="emptyBasketParagraph"
                class="empty-basket-box__paragraph">
                    TÖM VARUKORG
            </p>
        </section>
        `;

        // Den läggs in efter elementen med alla tillagda items i basket
        basketListRef.insertAdjacentHTML('afterend', emptyBasketHTML);
    }
    // Lyssnare på töm-varukorgselementet
    emptyBasketListener();
}

// Lyssnare för att tömma varukorgen
function emptyBasketListener() {
    const emptyBasketRef = document.querySelector('#emptyBasket');
    const basketItemAllRef = document.querySelectorAll(
        '[data-basketitemid = "basketItem"]'
    );
    const basketTotalAmountRef = document.querySelector('#basketTotalAmount');

    // Kontroll om själva elementet med papperskorgen finns på dropdown basket
    if (emptyBasketRef) {
        emptyBasketRef.addEventListener('click', () => {
            // Kör funktionen för att tömma varukorgen och localStorage
            emptyBasket();
            // Loopar genom att items som finns i varukorgen och tar bort samtliga element
            basketItemAllRef.forEach((item) => item.remove());
            // Kontroll för att få fram meddelande om att varukorgen är tom
            isBasketEmpty();
            // Nedanstående två rader tar bort röda cirkeln runt varukorgen
            const basketItemCountRef =
                document.querySelector('#basketItemCount');
            basketItemCountRef.remove();
            // Tar bort papperskorgen och 'TÖM VARUKORG'
            emptyBasketRef.remove();
            // Ändrar så att Totalsumman blir 0
            basketTotalAmountRef.textContent = '0 kr';

            //emptyBasketOrdersPage(); är detta rätt ställe Lam? Jag lade till import koden så du vet
        });
    }
}

// Funktion för att stänga basket när man clickar utanför basket
function closeOverlayBasketListener() {
    const overlayBackgroundRef = document.querySelector('#overlayBackground');

    // Lyssnare på bakgrunden som är osynlig och täcker hela sidan bakom basketelementet
    overlayBackgroundRef.addEventListener('click', (event) => {
        // Vid klick på den osynliga bakgrundsbilden så raderas hela basketelementet
        if (event.target === overlayBackgroundRef) {
            overlayBackgroundRef.remove();
        }
    });
}

// Kontroll om varukorgen är tom och då skrivs 'Tom varukorg'-meddelande ut
function isBasketEmpty() {
    const basketPreviewOrderNavRef = document.querySelector(
        '#basketPreviewOrderNav'
    );
    const basketTotalAmountRef = document.querySelector('#basketTotalAmount');
    const basketListRef = document.querySelector('#basketList');

    // Lyssnare på 'Förhandsgranska order'
    basketPreviewOrderNavRef.addEventListener('click', () => {
        if (basketTotalAmountRef.textContent === '0 kr') {
            const emptyOrderMsgRef = document.querySelector('#emptyOrderMsg');
            // Om det inte finns ett meddelande om att varukorgen är tom
            if (!emptyOrderMsgRef) {
                const emptyHTML = `<p id="emptyOrderMsg" class="basket__empty basket__empty--red" >Du måste lägga en produkt för att kunna gå vidare till order.</p>`;
                basketListRef.insertAdjacentHTML('beforeend', emptyHTML);
            }
        }
        // Om det finns saker i basket så länkas man vidare till orders.html
        else {
            window.location.href = '/pages/orders.html';
            runOrdersPage();
        }
    });
}

export { openDropDownBasket };
