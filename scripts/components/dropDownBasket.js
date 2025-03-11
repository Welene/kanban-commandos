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
            const overlayBasketRef = document.querySelector('#overlayBasket');
            // Här tas hela elementet bort vid klick av öppen basket
            overlayBasketRef.remove();
        }
    })
}

function closeOverlayBasket() {
    const overlayBasketRef = document.querySelector('#overlayBasket');
    
    overlayBasketRef.addEventListener('click', (event) => {
        if(overlayBasketRef && !overlayBasketRef.contains(event.target)) {
            console.log('click');
            overlayBasketRef.remove();
        }
    })
}

function overlayDropDownBasket() {
    const overlayBasketHTML = `
    <section id="overlayBasket" class="overlay-basket">
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
                <p id="basketTotalTitle" class="basket-total__title">TOTALT</p>
                <p id="basketTotalAmount" class="basket-total__amount">101kr</p>
            </section>
            <button id="basketPreviewOrderBtn" class="basket-preview-order-btn">
                FÖRHANSGRANSKA ORDER
            </button>
        </section>
    `
    // Lägg till menyn i sidans <body> i början av dokumentet
    document.body.insertAdjacentHTML('afterbegin', overlayBasketHTML);

    closeOverlayBasket();
}

export { openDropDownBasket }