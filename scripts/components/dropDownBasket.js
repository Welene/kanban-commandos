import { getDataFromLocalStorage } from '../data/localStorage.js'

// Här ska funktionen för att öppna en dropdown-vy för när man trycker på kundvagnen skrivas
function openDropDownBasket() {
    const basketRef = document.querySelector('#basket');
    // En lyssnare på basket-knappen
    basketRef.addEventListener('click', () => {
        // En kontroll för att se ifall det inte finns ett element med #overlayBasket så kommer den skapa basket
        if(!document.querySelector('#overlayBasket')) {
            // Funktion som skapar en basket genom DOM
            overlayDropDownBasket();
        }
        // Om det finns en id #overlayBasket så ska hela tas bort ifall man klickar igen på basket-knappen
        else {
            const overlayBackgroundRef = document.querySelector('#overlayBackground');
            // Här tas hela elementet bort vid klick av öppen basket
            overlayBackgroundRef.remove();
        }
    })
}

// Funktion för att stänga basket när man clickar utanför basket
function closeOverlayBasket() {
    const overlayBackgroundRef = document.querySelector('#overlayBackground');
    
    // Lyssnare på bakgrunden som är osynlig och täcker hela sidan bakom basketelementet
    overlayBackgroundRef.addEventListener('click', (event) => {
        // Vid klick på den osynliga bakgrundsbilden så raderas hela basketelementet
        if(event.target === overlayBackgroundRef) {
            overlayBackgroundRef.remove();
        }
    })
}

function createBasketItem() {
    // Hämtar hem sparade arrayen.
    const basketItems = getDataFromLocalStorage('basket');

    // Kontroll så att det finns tillagda produkter i basket
    if(
        basketItems && 
        typeof basketItems === 'object' && 
        Array.isArray(basketItems.items) && 
        basketItems.items.length > 0
    ) {
        const basketListRef = document.querySelector('#basketList');

        // Beräkning av totala priset för produkten
        const basketItemPrice = basketItems[i].amount * basketItems[i].price;
        
        // Loopning för att skapa varje basketItem som har lagt till i basket
        for(let i = 0; i < basketItems.length; i++) {
            const basketItemsHTML = `
                <li data="basketItem" class="basket__list-item">
                    <section id="basketItem" class="basket__title-box">
                        <p id="basketItemTitle" class="basket__item">
                            ${basketItems[i].name}
                        </p>
                        <p id="basketItemCount" class="basket__item">x${basketItems[i].amount}</p>
                    </section>
                    <span class="separator"></span>
                    <p id="basketItemPrice" class="basket__item">${basketItemPrice}</p>
                </li>
                `
        }
    }
    else {
        <p></p>
    }
}

function overlayDropDownBasket() {
    const overlayBasketHTML = `
    <section id="overlayBackground" class="overlay-background">
            <article id="overlayBasket" class="overlay-basket">
                <h2 id="overlayBasketTitle" class="overlay-basket__title">
                    Översikt kundvagn
                </h2>
                <ul id="basketList" class="basket__list">
                    <li data="basketItem" class="basket__list-item">
                        <section id="basketItem" class="basket__title-box">
                            <p id="basketItemTitle" class="basket__item">
                                Karlstad
                            </p>
                            <p id="basketItemCount" class="basket__item">x2</p>
                        </section>
                        <span class="separator"></span>
                        <p id="basketItemPrice" class="basket__item">27kr</p>
                    </li>
                    <li data="basketItem" class="basket__list-item">
                        <section id="basketItem" class="basket__title-box">
                            <p id="basketItemTitle" class="basket__item">
                                Karlstad
                            </p>
                            <p id="basketItemCount" class="basket__item">x2</p>
                        </section>
                        <span class="separator"></span>
                        <p id="basketItemPrice" class="basket__item">27kr</p>
                    </li>
                    <li data="basketItem" class="basket__list-item">
                        <section id="basketItem" class="basket__title-box">
                            <p id="basketItemTitle" class="basket__item">
                                Karlstad
                            </p>
                            <p id="basketItemCount" class="basket__item">x2</p>
                        </section>
                        <span class="separator"></span>
                        <p id="basketItemPrice" class="basket__item">27kr</p>
                    </li>
                    <li data="basketItem" class="basket__list-item">
                        <section id="basketItem" class="basket__title-box">
                            <p id="basketItemTitle" class="basket__item">
                                Karlstad
                            </p>
                            <p id="basketItemCount" class="basket__item">x2</p>
                        </section>
                        <span class="separator"></span>
                        <p id="basketItemPrice" class="basket__item">27kr</p>
                    </li>
                    <li data="basketItem" class="basket__list-item">
                        <section id="basketItem" class="basket__title-box">
                            <p id="basketItemTitle" class="basket__item">
                                Karlstad
                            </p>
                            <p id="basketItemCount" class="basket__item">x2</p>
                        </section>
                        <span class="separator"></span>
                        <p id="basketItemPrice" class="basket__item">27kr</p>
                    </li>
                    <li data="basketItem" class="basket__list-item">
                        <section id="basketItem" class="basket__title-box">
                            <p id="basketItemTitle" class="basket__item">
                                Karlstad
                            </p>
                            <p id="basketItemCount" class="basket__item">x2</p>
                        </section>
                        <span class="separator"></span>
                        <p id="basketItemPrice" class="basket__item">27kr</p>
                    </li>
                </ul>
                <section id="basketTotal" class="basket-total-box">
                    <p id="basketTotalTitle" class="basket-total__title">
                        TOTALT
                    </p>
                    <p id="basketTotalAmount" class="basket-total__amount">
                        101kr
                    </p>
                </section>
                <a href="/pages/orders.html" class="basket-preview-order-nav"
                >FÖRHANSGRANSKA ORDER</a
                >
            </article>
        </section>
    `
    // Lägg till menyn i sidans <body> i början av dokumentet
    document.body.insertAdjacentHTML('afterbegin', overlayBasketHTML);

    closeOverlayBasket();
}

export { openDropDownBasket }