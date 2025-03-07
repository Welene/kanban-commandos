// Funktionsverktyg: Exempelvis funktioner för att randominisera nummer, formatera text eller manipulera strängar.

// Hjälpfunktioner för DOM-manipulering: Funktioner som förenklar att välja element, ändra klasser eller attribut på element, eller hantera händelselyssnare.

function toggleAriaLabel(event) {
    const menuToggle = event.target;
    menuToggle.ariaLabel =
        menuToggle.ariaLabel === "closed" ? "open" : "closed";
}
export { toggleAriaLabel };
