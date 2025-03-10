// Funktion för att öppna NavMenu och även skapa animering av strecken
function openNavMenu() {
    const navMenuRef = document.querySelector('#navMenu');
    const navMenuLinesRef = document.querySelector('#navMenuLines');

    navMenuRef.addEventListener('click', () => {
        // Denna klass gör att de tre stecken blir ett X
        navMenuLinesRef.classList.toggle('active');
    })
};

export { openNavMenu };