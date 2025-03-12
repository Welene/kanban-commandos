import { doesBasketItemCountsExist } from "../utils/utils.js";

function runMapPage() {
    // Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
    doesBasketItemCountsExist()
}

export { runMapPage }