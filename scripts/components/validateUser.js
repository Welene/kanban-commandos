import { getDataFromLocalStorage } from '../data/localStorage.js';

// Funktion som kontrollerar om användaren är inloggad och har rätt roll
export function checkUserStatus() {
	// Hämtar aktuell användare från exempelvis sessionStorage eller localStorage
	const currentUser = getDataFromLocalStorage('currentUser');

	// Om currentUser inte finns eller användaren inte är en tillåten användare
	if (!currentUser || !currentUser.username) {
		console.log('hej1');
		// Om användaren inte är giltig, omdirigeras till landningssidan
		window.location.href = './index.html';
		return;
	}

	// Kontrollerar användarens roll (kan vara 'user' eller 'admin')
	if (currentUser.role !== 'admin' && currentUser.role !== 'user') {
		// Om användaren inte har rätt roll, omdirigeras till landningssidan
		console.log('hej2');

		window.location.href = './index.html';
		return;
	}

	// Om användaren är giltig och har rätt roll, fortsätter scriptet att köras
	console.log(`VALID USER: ${currentUser.username}`);
}
