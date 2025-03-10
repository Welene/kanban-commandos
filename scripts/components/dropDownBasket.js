// Här ska funktionen för att öppna en dropdown-vy för när man trycker på kundvagnen skrivas
function openDropDownBasket() {
    const basketRef = document.querySelector('#basket');
    
    basketRef.addEventListener('click', () => {
        overlayDropDownBasket()
        
    })
}

function overlayDropDownBasket() {
    
}

export { openDropDownBasket }