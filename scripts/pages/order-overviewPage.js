import { checkUserStatus } from '../components/validateUser.js';

function runOrderOverviewPage() {
	checkUserStatus();
}

export { runOrderOverviewPage };
