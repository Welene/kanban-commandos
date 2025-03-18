import { generateReceipt } from '../components/createReceipt.js';
import { checkUserStatus } from '../components/validateUser.js';
import {
	doesBasketItemCountsExist,
	buttonAddLinkToMenu,
} from '../utils/utils.js';

function runReceiptPage() {
	checkUserStatus();
	generateReceipt();
	doesBasketItemCountsExist();
	buttonAddLinkToMenu(document.querySelector('#newOrderBtn'));
}

export { runReceiptPage };
