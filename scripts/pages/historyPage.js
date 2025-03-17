import { doesBasketItemCountsExist } from '../utils/utils.js';
import { displayReceipts } from '../components/displayHistory.js';

function runHistoryPage() {
    // Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
    doesBasketItemCountsExist();
    displayReceipts();
}

export { runHistoryPage };
