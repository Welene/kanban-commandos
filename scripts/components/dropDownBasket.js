import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';
import { runOrdersPage } from '../pages/ordersPage.js';
import { emptyBasket, emptyBasketOrdersPage } from '../utils/utils.js';
import { getBasketItems, addToBasketCount } from '../components/addToBasket.js';

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
                <section data-itemId="basketitemboxid${basketItems.items[i].id}" class="basket__item-box">
                    <li data-basketItemId="basketItem" class="basket__list-item">
                        <section class="basket__title-box">
                            <p
                                data-itemTitleId="basketItemTitle"
                                class="basket__item">
                                ${basketItems.items[i].name}
                            </p>
                            <p
                                data-basketItemCountId="basketItemCount${i}"
                                class="basket__item">
                                x${basketItems.items[i].amount}
                            </p>
                        </section>
                        <span class="separator"></span>
                        <p
                            data-basketItemPriceId="basketItemPrice${i}"
                            class="basket__item">
                            ${itemPrice} kr
                        </p>
                    </li>
                    <section class="basket__add-remove-box">
                        <button
                            data-basketQuantityId="basketDecrament${i}"
                            class="basket__quantity-btn">
                            -
                        </button>
                        <span class="basket__quantity-nr">1</span>
                        <button
                            data-basketQuantityId="basketIncrament${i}"
                            class="basket__quantity-btn">
                            +
                        </button>
                    </section>
			    </section>
                `;
			// Lägger in produkten i basket
			basketListRef.insertAdjacentHTML('beforeend', basketItemsHTML);
			quantityBtnListener(
				i,
				basketItems.items[i].name,
				basketItems.items[i].amount,
				basketItems.items[i].price,
				totalAmount,
				basketItems.items[i].id
			);
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

// Lyssnare för att öka/sänka antalet på produkten
function quantityBtnListener(i, name, amount, price, totalAmount, id) {
	const basketDecramentBtnRef = document.querySelector(
		`[data-basketQuantityId="basketDecrament${i}"]`
	);
	const basketIncramentBtnRef = document.querySelector(
		`[data-basketQuantityId="basketIncrament${i}"]`
	);

	basketDecramentBtnRef.addEventListener('click', () => {
		addToBasketCount('decrament');
		updateQuantity(i, name, amount, price, 'decrament', totalAmount, id);
	});

	basketIncramentBtnRef.addEventListener('click', () => {
		addToBasketCount('incrament');
		updateQuantity(i, name, amount, price, 'incrament', totalAmount, id);
	});
}

// Funktion för att öka/sänka antalet på produkten
function updateQuantity(i, name, amount, price, action, totalAmount, id) {
	let basketData = getBasketItems();
	// Ändring av amount
	const totalAmountRef = document.querySelector('#basketTotalAmount');
	let newAmount = '';
	let newPrice = '';
	// Sparar den nuvarande totalsumman genom att endast ta med siffror
	let currentTotal = totalAmountRef.textContent.replace(/\D/g, '');
	// Omvandlar det från sträng till number
	let newTotal = Number(currentTotal);

	// Letar efter objektet i localStorage
	let item = basketData.items.find((item) => item.id === id);
	// Vid minskning av 1
	if (action === 'decrament') {
		newAmount = item.amount -= 1;
		newPrice = newAmount * price;
		newTotal -= price;
	}
	// Vid ökning av 1
	else if (action === 'incrament') {
		newAmount = item.amount += 1;
		newPrice = newAmount * price;
		newTotal += price;
	}

	// Om produktens amount blir 0 ska den tas bort
	if (newAmount === 0) {
		const itemBoxRef = document.querySelector(
			`[data-itemId="basketitemboxid${id}"]`
		);
		itemBoxRef.remove();

		// Tar bort objektet från localStorage
		basketData.items = basketData.items.filter((item) => item.id !== id);

		saveDataToLocalStorage('basket', basketData);
	} else {
		const itemCountRef = document.querySelector(
			`[data-basketItemCountId="basketItemCount${i}"]`
		);
		itemCountRef.textContent = `x${newAmount}`;

		const newPriceRef = document.querySelector(
			`[data-basketItemPriceId="basketItemPrice${i}"]`
		);
		newPriceRef.textContent = `${newPrice} kr`;

		// Uppdatering av basket
		basketData.items[i].amount = newAmount;

		saveDataToLocalStorage('basket', basketData);
	}

	// Om hela totalsumman blir tom så töms all innehåll
	if (newTotal === 0) {
		const emptyBasketRef = document.querySelector('#emptyBasket');
		emptyBasketRef.remove();
		isBasketEmpty();
		// Tömmer även innehållet i orders.html
		emptyBasketOrdersPage();
		const basketItemCountRef = document.querySelector('#basketItemCount');
		basketItemCountRef.remove();
	}
	totalAmountRef.textContent = `${newTotal} kr`;
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
	const basketQuantityBtnRef = document.querySelectorAll(
		'.basket__add-remove-box'
	);
	const basketTotalAmountRef = document.querySelector('#basketTotalAmount');

	// Kontroll om själva elementet med papperskorgen finns på dropdown basket
	if (emptyBasketRef) {
		emptyBasketRef.addEventListener('click', () => {
			// Kör funktionen för att tömma varukorgen och localStorage
			emptyBasket();
			// Loopar genom att items som finns i varukorgen och tar bort samtliga element
			basketItemAllRef.forEach((item) => item.remove());
			// Tar bort samtliga quantityknappar
			basketQuantityBtnRef.forEach((item) => item.remove());
			// Kontroll för att få fram meddelande om att varukorgen är tom
			isBasketEmpty();
			// Nedanstående två rader tar bort röda cirkeln runt basket
			const basketItemCountRef =
				document.querySelector('#basketItemCount');
			basketItemCountRef.remove();
			// Tar bort papperskorgen och 'TÖM VARUKORG' i basket
			emptyBasketRef.remove();
			// Ändrar så att Totalsumman blir 0 i basket
			basketTotalAmountRef.textContent = '0 kr';
			// Tömmer även innehållet i orders.html
			emptyBasketOrdersPage();
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
