import { doesBasketItemCountsExist } from "../utils/utils.js";

function runAboutPage () {
    // Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
    doesBasketItemCountsExist()
}

export { runAboutPage }