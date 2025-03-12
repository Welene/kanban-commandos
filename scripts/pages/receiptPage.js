import { generateReceipt } from '../components/createReceipt.js';
import { doesBasketItemCountsExist } from '../utils/utils.js';

function runReceiptPage() {
    generateReceipt();
    doesBasketItemCountsExist();
}

export { runReceiptPage };
