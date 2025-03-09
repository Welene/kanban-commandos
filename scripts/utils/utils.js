// Funktionsverktyg: Exempelvis funktioner för att randominisera nummer, formatera text eller manipulera strängar.

// Hjälpfunktioner för DOM-manipulering: Funktioner som förenklar att välja element, ändra klasser eller attribut på element, eller hantera händelselyssnare.

function toggleAriaLabel(event) {
    const menuToggle = event.target;
    menuToggle.ariaLabel =
        menuToggle.ariaLabel === "closed" ? "open" : "closed";
}

/**
 * Funktion för att markera den aktuella sidan i hamburgermenyn.
 * Den lägger till klassen "menu__link--active" på rätt länk beroende på vilken sida användaren befinner sig på.
 */

function highlightActiveBurgerLink() {
    console.log("highlightActiveBurgerLink()");

    const path = window.location.pathname;

    // Lista över sidor och deras motsvarande ID:n i menyn
    const menuLinks = [
        {
            path: [
                "index.html",
                "/",
                "/Exam-MovieDataBase/",
                "/Exam-MovieDataBase/index.html",
            ],
            id: "homeLink",
        },
        { path: ["/menu.html", "/pages/menu.html"], id: "menuLink" },
        { path: ["/orders.html", "/pages/orders.html"], id: "ordersLink" },
        { path: ["/history.html", "/pages/history.html"], id: "historyLink" },
        { path: ["/profile.html", "/pages/profile.html"], id: "profileLink" },
        { path: ["/map.html", "/pages/map.html"], id: "mapLink" },
        { path: ["/about.html", "/pages/about.html"], id: "aboutLink" },
        { path: ["/order-overview.html"], id: "adminLink" }, // Admin-sida
    ];

    menuLinks.forEach(({ path: paths, id }) => {
        if (paths.some((p) => path.endsWith(p))) {
            document
                .querySelectorAll(`#${id}`)
                .forEach((el) => el.classList.add("menu__link--active"));
        }
    });
}

export { toggleAriaLabel, highlightActiveBurgerLink };
