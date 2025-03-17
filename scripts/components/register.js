import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';
import {
	validateUsernameAndEmail,
	isEmailExists,
	isUserExists,
} from './validate.js';
import { showMessage } from '../utils/utils.js';

// Funktion för att registrera användare
export async function registerUser(event, apiUsers) {
	event.preventDefault();

	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('psw').value;
	const passwordRepeat = document.getElementById('psw-repeat').value;

	// Validering av användarnamn och email
	const validation = validateUsernameAndEmail(username, email);
	if (!validation.valid) {
		showMessage(validation.message, 'error');
		return;
	}

	// Hämta användare från localStorage
	let users = getDataFromLocalStorage('users');
	if (!Array.isArray(users)) {
		users = []; // Om inget finns i localStorage, sätt till tom array
	}

	// Logga apiUsers för att se om vi får tillbaka data från API
	console.log('API Users from fetchUsers:', apiUsers);

	// Slå samman användare från localStorage och API för att kolla efter dubbletter
	const allUsers = [...users, ...apiUsers]; // Slår samman användarna
	console.log('All users (localStorage + API):', allUsers);

	// Kontrollera om användarnamnet eller e-posten redan finns i någon av listorna
	if (isEmailExists(allUsers, email)) {
		showMessage('Den här e-postadressen är redan registrerad.', 'error');
		return;
	}

	// Kolla om användarnamnet redan finns
	if (isUserExists(allUsers, username)) {
		showMessage('Användarnamnet är redan registrerat.', 'error');
		return;
	}

	// Kontrollera om lösenorden matchar
	if (password !== passwordRepeat) {
		showMessage('Lösenorden matchar inte.', 'error');
		return;
	}

	// Generera en slumpad profilbild
	const profileImage = generateRandomProfileImage();

	// Skapa den nya användaren
	const newUser = {
		username,
		email,
		password,
		profile_image: profileImage,
		role: 'user',
	};

	// Lägg till den nya användaren i localStorage
	users.push(newUser);

	// Spara användarna till localStorage
	saveDataToLocalStorage('users', users);

	// Sätt den nya användaren som inloggad användare (currentUser)
	saveDataToLocalStorage('currentUser', newUser);

	// Visa ett meddelande om att registreringen lyckades
	showMessage('Registrering lyckades! Välkommen, ' + username, 'success');

	// Navigera till meny.html efter några sekunder (så användaren hinner se meddelandet)
	setTimeout(() => {
		window.location.href = 'menu.html'; // Navigera till meny.html
	}, 2000); // Vänta 2 sekunder innan navigeringen
}

// Funktion för att generera en slumpad profilbild
function generateRandomProfileImage() {
	const randomNumber = Math.floor(Math.random() * 6) + 1; // Slumpar mellan 1-6
	return `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`; // Slumpad bild från randomuser.me
}
