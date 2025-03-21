// Här ska all valideringskod finnas, t ex i registrering av ny användare

// Funktion för att kolla om en e-postadress redan finns
export function isEmailExists(users, email) {
	console.log('Kontrollerar om e-postadress finns:', email);
	return users.some((user) => {
		const exists = user.email === email;
		console.log(`User email: ${user.email}, Exists: ${exists}`);
		return exists;
	});
}

// Funktion för att kolla om användarnamnet redan finns
export function isUserExists(users, username) {
	console.log('Kontrollerar om användarnamn finns:', username);
	return users.some((user) => {
		const exists = user.username === username;
		console.log(`User username: ${user.username}, Exists: ${exists}`);
		return exists;
	});
}

// Funktion för att validera användarnamn och e-post
export function validateUsernameAndEmail(username, email) {
	const usernameRegex = /^[a-zA-Z0-9]+$/; // Enkel regex för alfanumeriskt användarnamn
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Enkel regex för e-postvalidering

	if (!usernameRegex.test(username)) {
		return { valid: false, message: 'Ogiltigt användarnamn.' };
	}

	if (!emailRegex.test(email)) {
		return { valid: false, message: 'Ogiltig e-postadress.' };
	}

	return { valid: true, message: 'Validering lyckades!' };
}

// Funktion för att validera produktdata
export function validateProduct(name, price, description, ingredients, type) {
	// Kolla att alla obligatoriska fält är ifyllda
	if (
		!name ||
		!price ||
		!description ||
		(type === 'wonton' && !ingredients)
	) {
		return {
			valid: false,
			message:
				'Fyll i alla obligatoriska fält: namn, pris, beskrivning, och ingredienser (för wonton).',
		};
	}

	return { valid: true, message: 'Validering lyckades!' };
}
