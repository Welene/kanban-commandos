import { doesBasketItemCountsExist } from "../utils/utils.js";

function runHistoryPage() {
    // Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
    doesBasketItemCountsExist()
};

export { runHistoryPage }