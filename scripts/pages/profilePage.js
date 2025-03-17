import {
	doesBasketItemCountsExist,
	maskEmail,
	showMessage,
} from '../utils/utils.js';
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';
import { generateRandomProfileImage } from '../components/register.js';
import {
	validateUsernameAndEmail,
	isEmailExists,
} from '../components/validate.js';

function runProfilePage() {
	// Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
	doesBasketItemCountsExist();

	// Funktion för att hämta hem nuvarande user och även visa personen
	displayCurrentUser();

	// Lyssnare på sparaBtn
	saveNewProfileListener();
}

// För att visa information om inloggad profil med
function displayCurrentUser() {
	const currentUser = getDataFromLocalStorage('currentUser');
	const profileImgRef = document.querySelector('#profileImg');
	const profileUserNameRef = document.querySelector('#profileUserName');
	const profileRoleRef = document.querySelector('#profileRole');
	const profileEmailRef = document.querySelector('#profileEmail');

	const maskedEmail = maskEmail(currentUser.email);
	// Lägger in users bild till sidan
	profileImgRef.src = currentUser.profile_image;
	// Lägger in users användarnamn till sidan
	profileUserNameRef.textContent = currentUser.username;
	// Lägger in users mail till sidan
	profileEmailRef.textContent = maskedEmail;
	// Kontroll för att se vilken roll som den inloggade har
	if (currentUser.role === 'user') {
		profileRoleRef.textContent = 'Medlem';
	} else {
		profileRoleRef.textContent = 'Admin';
	}
	// En lyssnare för att kunna byta till en annan slumpmässig profilbild
	changeProfileImgListener();
}

// Funktion för att byta profilbild
function changeProfileImgListener() {
	const profileChangeImgBtnRef = document.querySelector(
		'#profileChangeImgBtn'
	);
	const profileImgRef = document.querySelector('#profileImg');

	profileChangeImgBtnRef.addEventListener('click', () => {
		// Hämtar en random img för profil
		let newImg = generateRandomProfileImage();

		const currentImage = profileImgRef.src;

		// Kontroll så att ifall det är samma bild som finns på profilen
		while (currentImage === newImg) {
			// Om det är samma så randominseras en ny bild
			newImg = generateRandomProfileImage();
		}
		// Om det är en ny bild så ersätts det med en ny.
		profileImgRef.src = newImg;
	});
}

// Lyssnare på när man trycker på 'Spara'
async function saveNewProfileListener() {
	const profileSaveBtnRef = document.querySelector('#profileSaveBtn');

	profileSaveBtnRef.addEventListener('click', () => {
		let currentUser = getDataFromLocalStorage('currentUser');
		const profileEmailInputRef =
			document.querySelector('#profileEmailInput');
		const profilePswRef = document.querySelector('#profilePsw');
		const profilePswRepeat = document.querySelector('#profilePswRepeat');
		const profileImgRef = document.querySelector('#profileImg');

		// Kontroll ifall användaren har skrivit input i samtliga fält
		if (
			profileEmailInputRef.value !== '' &&
			profilePswRef.value !== '' &&
			profilePswRepeat.value !== ''
		) {
			// Kontroll om validering av Email är sann
			if (
				isEmailInputValid(currentUser, profileEmailInputRef) === true &&
				isPasswordInputValid(
					profilePswRef.value,
					profilePswRepeat.value
				)
			) {
				// Då kommer emailen att sparas
				emailInput(
					currentUser,
					profileEmailInputRef,
					profileImgRef.src
				);

				// Då kommer passworden att sparas
				passwordInput(
					currentUser,
					profilePswRef,
					profilePswRepeat,
					profileImgRef
				);
			}
		}
		// Om användaren bara fyller i email
		else if (
			profileEmailInputRef.value !== '' &&
			profilePswRef.value === '' &&
			profilePswRepeat.value === ''
		) {
			// Kontroll och sparning av ny email
			emailInput(currentUser, profileEmailInputRef, profileImgRef.src);
		}
		// Om användaren bara fyller i lösenord
		else if (profilePswRef.value !== '' || profilePswRepeat.value !== '') {
			// Kontroll och sparning av ny password
			passwordInput(
				currentUser,
				profilePswRef,
				profilePswRepeat,
				profileImgRef
			);
		}
		// Om användaren bara byter profilbild så sparas den.
		else if (currentUser.profile_image !== profileImgRef.src) {
			saveUserLocalStorage(currentUser, profileImgRef.src);
			showMessage('Din nya profilbild är sparad!', 'success');
			// Rensning av eventuella borders
			profileEmailInputRef.style.border = '';
			profilePswRef.style.border = '';
			profilePswRepeat.style.border = '';
		}
	});
}

// Om input görs på passwordfältet
function passwordInput(
	currentUser,
	profilePswRef,
	profilePswRepeat,
	profileImgRef
) {
	// Validering så att lösenorden stämmer
	if (profilePswRef.value !== '' || profilePswRepeat !== '') {
		if (
			isPasswordInputValid(
				profilePswRef.value,
				profilePswRepeat.value
			) === true
		) {
			currentUser.password = profilePswRef.value;
			// Tömmer innehållet
			profilePswRef.value = '';
			profilePswRepeat.value = '';
			// Sparar nya lösenordet
			saveUserLocalStorage(currentUser, profileImgRef.src);
			showMessage('Dina nya uppgifter är sparade', 'success');
		}
	}
}

// Om input görs på emailfältet
function emailInput(currentUser, email, profileImgRef) {
	// Om användaren skriver något i email körs validering
	if (email.value !== '') {
		// Om valdideringen är true
		if (isEmailInputValid(currentUser, email) === true) {
			// Ändra till nya mailen
			currentUser.email = email.value;
			// Tömmer innehållet
			email.value = '';
			saveUserLocalStorage(currentUser, profileImgRef);
			// Ändra den maskerade mailen till den nya
			const maskedEmail = maskEmail(currentUser.email);
			const profileEmailRef = document.querySelector('#profileEmail');
			profileEmailRef.textContent = maskedEmail;
			showMessage('Dina nya uppgifter är sparade', 'success');
		}
	}
}

// Spara och uppdatera 'currentUser' och 'users' i localStorage. Här tas även nuvarande profilbild med
function saveUserLocalStorage(currentUser, profileImgRef) {
	const newUser = {
		username: currentUser.username,
		email: currentUser.email,
		password: currentUser.password,
		profile_image: profileImgRef,
		role: currentUser.role,
	};
	// Spara över currentUser
	saveDataToLocalStorage('currentUser', newUser);

	const users = getDataFromLocalStorage('users');

	const usersUpdate = users.map((user) =>
		user.username === newUser.username ? newUser : user
	);
	// Här sparas nya 'currentUsers' i 'users'
	saveDataToLocalStorage('users', usersUpdate);
}

function isPasswordInputValid(password, passwordRepeat) {
	// Kontrollera om lösenorden matchar
	const profilePswRepeatRef = document.querySelector('#profilePswRepeat');
	if (password !== passwordRepeat) {
		showMessage('Lösenorden matchar inte.', 'error');
		// Lägger till en röd ram vart felet är
		profilePswRepeatRef.focus();
		profilePswRepeatRef.style.border = '3px solid #eb5757';
		return false;
	}
	profilePswRepeatRef.style.border = '';
	return true;
}

// Funktion för att kontrollera rätt input av mail och ifall den existerar i 'users'
function isEmailInputValid(currentUser, email) {
	let validEmail = validateUsernameAndEmail(
		currentUser.username,
		email.value
	);

	// Kontroll ifall användaren anger fel emailinput
	if (validEmail.valid === false) {
		showMessage(validEmail.message, 'error');
		// Lägger till en röd ram vart felet är
		email.focus();
		email.style.border = '3px solid #eb5757';
		return false;
	}

	const users = getDataFromLocalStorage('users');

	// Kontroll om mailen redan finns i 'users'
	if (isEmailExists(users, email.value)) {
		showMessage('Den här e-postadressen är redan registrerad.', 'error');
		return false;
	}
	email.focus();
	email.style.border = '';
	return true;
}

export { runProfilePage };
