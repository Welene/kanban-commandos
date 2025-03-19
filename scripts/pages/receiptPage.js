import { generateReceipt } from '../components/createReceipt.js';
import {
	doesBasketItemCountsExist,
	buttonAddLinkToMenu,
} from '../utils/utils.js';

function runReceiptPage() {
	generateReceipt();
	doesBasketItemCountsExist();
	buttonAddLinkToMenu(document.querySelector('#newOrderBtn'));
}

export { runReceiptPage };
