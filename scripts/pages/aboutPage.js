import { doesBasketItemCountsExist } from '../utils/utils.js';
import { checkUserStatus } from '../components/validateUser.js';

function runAboutPage() {
	// Funktion för att skapa röda cirkeln runt basket om det finns tillagda items'
	checkUserStatus();
	doesBasketItemCountsExist();
}

export { runAboutPage };
