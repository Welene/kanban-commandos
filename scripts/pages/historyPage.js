import { doesBasketItemCountsExist } from '../utils/utils.js';
import { displayReceipts } from '../components/displayHistory.js';
import { checkUserStatus } from '../components/validateUser.js';

function runHistoryPage() {
	// Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
	checkUserStatus();
	doesBasketItemCountsExist();
	displayReceipts();
}

export { runHistoryPage };
