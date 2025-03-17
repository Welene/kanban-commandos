import { doesBasketItemCountsExist, maskEmail } from '../utils/utils.js';
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';
import { fetchUsers } from '../api/api.js';
import { generateRandomProfileImage } from '../components/register.js';
import {
	validateUsernameAndEmail,
	isEmailExists,
} from '../components/validate.js';
import { showMessage } from '../components/register.js';

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

		if (emailInput && passwordInput)
			// Om användaren gör en input för email
			emailInput(currentUser, profileEmailInputRef, profileImgRef.src);

		// Om användaren gör en input för password
		passwordInput(
			currentUser,
			profilePswRef,
			profilePswRepeat,
			profileImgRef
		);
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
	if (profilePswRef.value !== '') {
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

	if (profileImgRef.src !== currentUser.profile_image) {
		saveUserLocalStorage(currentUser, profileImgRef.src);
		showMessage('Din nya profilbild är ändrad!', 'success');
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
