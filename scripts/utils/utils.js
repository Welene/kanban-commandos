// Funktionsverktyg: Exempelvis funktioner för att randominisera nummer, formatera text eller manipulera strängar.

// Hjälpfunktioner för DOM-manipulering: Funktioner som förenklar att välja element, ändra klasser eller attribut på element, eller hantera händelselyssnare.

export function clickLoginBtn() {
    let loginButton = document.getElementById('loginBtn');

    loginButton.addEventListener('click', () => {
        window.location.href = '../pages/menu.html';
        console.log('navigated to main.html page after clicking on login button');
    });
}