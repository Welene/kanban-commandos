import { toggleAriaLabel } from "../utils/utils.js";
import {
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from "../data/localStorage.js";

// **Renderar hamburger menyn**
function renderHamburgerMenu() {
    const currentUser = getDataFromLocalStorage("currentUser");

    const burgerHTML = `
        <div class="menu">
            <input
                type="checkbox"
                class="menu__checkbox"
                id="menu-toggle"
                aria-hidden="true" 
                aria-label="closed"
            />
            <label
                id="burgerLabel"
                tabindex="0"
                class="menu__button"
                for="menu-toggle"
                aria-label="Toggle navigation menu"
            >
                <span
                    role="button"
                    class="menu__button-line"
                    aria-label="Open burger menu (mobile only)"
                ></span>
            </label>

            <!-- Navigation Burger Menu -->
            <nav
                class="menu__navigation"
                aria-label="Main Navigation on Mobile"
                aria-expanded="false"
            >
                <ul class="menu__list">
                    <li class="menu__item">
                        <a id="homeLink" class="menu__link" href="./index.html" aria-label="Navigate to home page">
                            Hem
                        </a>
                    </li>
                    <li class="menu__item">
                        <a id="menuLink" class="menu__link" href="./menu.html" aria-label="Navigate to menu page">
                            Meny
                        </a>
                    </li>
                    <li class="menu__item">
                        <a id="ordersLink" class="menu__link" href="./orders.html" aria-label="Navigate to orders page">
                            Min beställning
                        </a>
                    </li>
                    <li class="menu__item">
                        <a id="historyLink" class="menu__link" href="./history.html" aria-label="Navigate to purchase history page">
                            Historik köp
                        </a>
                    </li>
                    <li class="menu__item">
                        <a id="profileLink" class="menu__link" href="./profile.html" aria-label="Navigate to profile page">
                            Profil
                        </a>
                    </li>
                    <li class="menu__item">
                        <a id="mapLink" class="menu__link" href="./map.html" aria-label="Navigate to map page">
                            Truck karta
                        </a>
                    </li>
                    <li class="menu__item">
                        <a id="aboutLink" class="menu__link" href="./about.html" aria-label="Navigate to about us page">
                            Om oss
                        </a>
                    </li>
                  

                    <!-- Admin-only link, visas endast om användaren är admin -->
                    ${
                        currentUser && currentUser.role === "admin"
                            ? `
                            <li class="menu__item" id="adminLink">
                                <a id="adminLink" class="menu__link" href="./order-overview.html" aria-label="Navigate to admin order overview page">
                                    Överblick ordrar (Admin)
                                </a>
                            </li>
                            `
                            : ""
                    }

                    <!-- Logga ut-länk visas endast om det finns en inloggad användare -->
                    ${
                        currentUser
                            ? `
                            <li class="menu__item">
                                <a id="logoutLink" class="menu__link menu__link--logout" href="./index.html" aria-label="Log out from the system">
                                    Logga ut
                                </a>
                            </li>
                            `
                            : ""
                    }
                </ul>
            </nav>
        </div>
    `;

    // Lägg till menyn i sidans <body> i början av dokumentet
    document.body.insertAdjacentHTML("afterbegin", burgerHTML);

    // Anropa funktionen som sätter upp event-listeners för menyn
    setupLogoutButton();
    setupBurgerMenu();
}

// Funktionen för att initiera hamburger-menyn

// Funktion som konfigurerar hamburger-menyn efter att dokumentet har laddats
function setupBurgerMenu() {
    // Hämtar elementet för menu-toggle (checkbox som styr visningen av menyn)
    const menuToggle = document.querySelector("#menu-toggle");
    // Hämtar själva menyn som ska visas eller döljas
    const menu = document.querySelector(".menu__navigation");
    // Hämtar burger-label (labeln för menykontrollen)
    const burgerLabel = document.querySelector("#burgerLabel");

    // Om någon av dessa element inte finns, avbryt funktionen
    if (!menuToggle || !menu || !burgerLabel) return;

    // Lägg till en event-lyssnare för när menyn togglas (klickas på)
    menuToggle.addEventListener("click", toggleAriaLabel);
    // Lägg till en event-lyssnare för att stänga menyn om användaren klickar utanför den
    document.addEventListener("click", (event) =>
        closeMenuOnClickOutside(event, menuToggle, menu, burgerLabel)
    );
    // Lägg till en event-lyssnare för att hantera tangentbordsinmatning på burgerlabel
    burgerLabel.addEventListener("keydown", handleKeyboardToggle);
}

// Funktion för att stänga menyn om användaren klickar utanför menyn
function closeMenuOnClickOutside(event, menuToggle, menu, burgerLabel) {
    // Kontrollera om användaren har klickat utanför menyn, labeln eller toggle-knappen
    // och om menyn är öppen (det vill säga ariaLabel är "open")
    if (
        !burgerLabel.contains(event.target) &&
        !menu.contains(event.target) &&
        !menuToggle.contains(event.target) &&
        menuToggle.ariaLabel === "open"
    ) {
        // Om villkoren stämmer, stäng menyn genom att avmarkera checkboxen och sätt ariaLabel till "closed"
        menuToggle.checked = false;
        menuToggle.ariaLabel = "closed";
    }
}

// Funktion som hanterar tangentbordsinteraktion för att toggla menyn
function handleKeyboardToggle(event) {
    // Om användaren trycker på "Enter" eller mellanslag (space), toggla menyn
    if (event.key === "Enter" || event.key === " ") {
        // Förhindra att sidan laddas om vid tryck på Enter
        event.preventDefault();
        // Hämta menuToggle (checkboxen)
        const menuToggle = document.getElementById("menu-toggle");
        if (menuToggle) {
            // Växla värdet på checkboxen (om den är markerad eller inte)
            menuToggle.checked = !menuToggle.checked;
        }
    }
}

function handleLogout() {
    saveDataToLocalStorage("currentUser", null);

    window.location.href = "./index.html";
}

function setupLogoutButton() {
    const logoutLink = document.querySelector("#logoutLink");
    if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
            event.preventDefault();
            handleLogout();
        });
    }
}

// Exportera renderHamburgerMenu så den kan användas i andra delar av applikationen
export { renderHamburgerMenu };
