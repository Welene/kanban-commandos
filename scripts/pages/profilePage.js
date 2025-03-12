import { doesBasketItemCountsExist } from "../utils/utils.js";
    
function runProfilePage() {
    // Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
    doesBasketItemCountsExist()
}

export { runProfilePage }