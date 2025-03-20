import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';
import {
	highlightActiveBurgerLink,
	setupLogoutButton,
} from '../utils/utils.js';

export function renderDesktopHeader() {
	const currentUser = getDataFromLocalStorage('currentUser');

	let desktopHeaderHTML = `<div class="desktop-menu">

    <!-- Navigation Desktop Menu -->
    <nav id="desktopNav"
        class="desktop-menu__navigation"
        aria-label="Main Navigation on Desktop"
      
    >
        <ul class="desktop-menu__list">
            <li class="desktop-menu__item">
                <a id="homeLink" class="desktop-menu__link" href="./index.html" aria-label="Navigate to home page">
                    Hem
                </a>
            </li>
            <li class="desktop-menu__item">
                <a id="menuLink" class="desktop-menu__link" href="./menu.html" aria-label="Navigate to menu page">
                    Meny
                </a>
            </li>
            <li class="desktop-menu__item">
                <a id="ordersLink" class="desktop-menu__link" href="./orders.html" aria-label="Navigate to orders page">
                    Min beställning
                </a>
            </li>
            <li class="desktop-menu__item">
                <a id="historyLink" class="desktop-menu__link" href="./history.html" aria-label="Navigate to purchase history page">
                    Historik köp
                </a>
            </li>
            <li class="desktop-menu__item">
                <a id="profileLink" class="desktop-menu__link" href="./profile.html" aria-label="Navigate to profile page">
                    Profil
                </a>
            </li>
            <li class="desktop-menu__item">
                <a id="mapLink" class="desktop-menu__link" href="./map.html" aria-label="Navigate to map page">
                    Truck karta
                </a>
            </li>
            <li class="desktop-menu__item">
                <a id="aboutLink" class="desktop-menu__link" href="./about.html" aria-label="Navigate to about us page">
                    Om oss
                </a>
            </li>

            <!-- Admin-only link, visas endast om användaren är admin -->
            ${
				currentUser && currentUser.role === 'admin'
					? `
                    <li class="desktop-menu__item" id="adminLink">
                        <a id="adminLink" class="desktop-menu__link" href="./order-overview.html" aria-label="Navigate to admin order overview page">
                            Överblick ordrar (Admin)
                        </a>
                    </li>
                    `
					: ''
			}

            ${
				currentUser && currentUser.role === 'admin'
					? `
                    <li class="desktop-menu__item" id="adminLink">
                        <a id="adminLink" class="desktop-menu__link" href="./editMenu.html" aria-label="Navigate to admin edit menu page">
                            Redigera meny (Admin)
                        </a>
                    </li>
                    `
					: ''
			}

            <!-- Logga ut-länk visas endast om det finns en inloggad användare med ett username -->
            ${
				currentUser && currentUser.username
					? `
                    <li class="desktop-menu__item">
                        <a id="logoutLink" class="desktop-menu__link desktop-menu__link--logout" href="./index.html" aria-label="Log out from the system">
                            Logga ut
                        </a>
                    </li>
                    `
					: ''
			}
        </ul>
    </nav>
</div>
`;

	// Lägg till menyn i sidans <body> i början av dokumentet
	document.body.insertAdjacentHTML('afterbegin', desktopHeaderHTML);
	initBasketDesktop();
	setupLogoutButton();
	highlightActiveDesktopLink();
}

function initBasketDesktop() {
	document.addEventListener('DOMContentLoaded', () => {
		const basketButton = document.createElement('button');
		basketButton.id = 'basket';
		basketButton.classList.add('header__basket-box');
		basketButton.classList.add('basket-2');
		basketButton.setAttribute('aria-label', 'Open cart button');

		const basketIcon = document.createElement('img');
		basketIcon.className = 'header__basket-icon';
		basketIcon.src = '../assets/icons/basket.svg';
		basketIcon.alt = 'Basket icon';

		basketButton.appendChild(basketIcon);

		function toggleBasketButton() {
			if (window.innerWidth >= 1000) {
				if (!document.querySelector('.basket-2')) {
					document
						.querySelector('.desktop-menu nav')
						.appendChild(basketButton);
				}
			} else {
				const existingButton = document.querySelector('.basket-2');
				if (existingButton) {
					existingButton.remove();
				}
			}
		}
		let basketItemCounts = getDataFromLocalStorage('basketCount');
		const basketRef = document.querySelectorAll('#basket');
		const basketItemCountRef = document.querySelector('#basketItemCount');
		if (!basketItemCountRef) {
			const basketItemCountHTML = `
        <span
        id="basketItemCount"
        class="header__basket-item-count"
        >${basketItemCounts}
        </span>`;

			// Stoppar in den sist i headern
			basketRef.forEach((basket) => {
				basket.insertAdjacentHTML('beforeend', basketItemCountHTML);
				console.log('hjas');
			});
		} else {
			basketItemCountRef.textContent = basketItemCounts;
		}

		toggleBasketButton(); // Kör direkt vid laddning
		window.addEventListener('resize', toggleBasketButton); // Lyssna på förändringar
	});
}

function highlightActiveDesktopLink() {
	document.addEventListener('DOMContentLoaded', () => {
		// Hämta aktuell URL-filnamn
		const currentPage = window.location.pathname.split('/').pop();

		// Hämta alla länkar i menyn
		const menuLinks = document.querySelectorAll('.desktop-menu__link');

		// Loopa igenom länkarna och sätt "active" på den som matchar currentPage
		menuLinks.forEach((link) => {
			if (link.getAttribute('href') === `./${currentPage}`) {
				link.classList.add('active');
			}
		});
	});
}
