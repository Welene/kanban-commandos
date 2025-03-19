function runIndexPage() {
	handleLoginClick();
	handleRegisterIndexClick();
	handleBackBtnClick();
	checkIfLoggedIn();
}

export { runIndexPage };

// TLDR:
// function sends you directly to menu.html if you are logged in to begin with
function checkIfLoggedIn() {
	let currentUser = localStorage.getItem('currentUser');
	let users = localStorage.getItem('users');

	// parsing currentUser & user // ? = shortened code
	currentUser = currentUser ? JSON.parse(currentUser) : null;
	users = users ? JSON.parse(users) : [];

	// checking if you are logged in or not
	let isLoggedIn =
		currentUser &&
		users.some((user) => user.username === currentUser.username);

	// if you are logged in, you navigate to menu.html directly before you see the index page
	if (isLoggedIn) {
		window.location.href = 'menu.html';
	}
}

// TLDR:
// long function that handles a click on the 'LOGGA IN' button on the landing page
// checks if you are logged in: if not - goes to login form - so you can log in

// FUNCTION CAN BE SPLIT IN TWO DIFFERENT ONES:
// 1) check if logged in 2) create elements --> call create elements function inside logged in, calls if logged in check is TRUE
// edit: maybe 3 parts now
function handleLoginClick() {
	document.querySelector('#loginBtn').addEventListener('click', () => {
		let currentUser = localStorage.getItem('currentUser');
		let users = localStorage.getItem('users');

		currentUser = currentUser ? JSON.parse(currentUser) : null;
		users = users ? JSON.parse(users) : [];

		// checks again if you're logged in
		let isLoggedIn =
			currentUser &&
			users.some((user) => user.username === currentUser.username);

		// if logged in, shows welcome msg and navigates to menu.html (showWelcomeMsg navigates to menu.html)
		if (isLoggedIn) {
			showWelcomeMsg(currentUser.username);
			return;
		}

		// User is NOT logged in → Show login form dynamically
		// creates all elements here:
		let main = document.querySelector('.content-wrapper__intro-content');
		main.innerHTML = '';

		let backgroundContainer = document.createElement('section');
		backgroundContainer.classList.add(
			'content-wrapper__background-container'
		);
		backgroundContainer.setAttribute(
			'aria-label',
			'Background image with wonton, drinks & dips'
		);
		backgroundContainer.setAttribute('role', 'img');

		let loginContainer = document.createElement('section');
		loginContainer.classList.add('content-wrapper__login-container');

		let headingLogin = document.createElement('h1');
		headingLogin.classList.add('content-wrapper__heading-login');
		headingLogin.textContent = 'LOGGA IN';

		let quote = document.createElement('p');
		quote.classList.add('content-wrapper__quote');
		quote.textContent = 'UPPLEV ÄKTA MATGLÄDJE';

		let errorMsg = document.createElement('p');
		errorMsg.classList.add('content-wrapper__error-msg');

		let inputSection = document.createElement('section');
		inputSection.classList.add('content-wrapper__input-section');

		let nameField = document.createElement('input');
		nameField.classList.add('content-wrapper__name-field');
		nameField.type = 'text';
		nameField.setAttribute('aria-label', 'Input field for nickname');

		let nameText = document.createElement('p');
		nameText.classList.add('content-wrapper__name-heading');
		nameText.textContent = 'NAMN';

		let passwordField = document.createElement('input');
		passwordField.classList.add('content-wrapper__password-field');
		passwordField.type = 'password';
		passwordField.setAttribute('aria-label', 'Input field for password');

		let passwordText = document.createElement('p');
		passwordText.classList.add('content-wrapper__password-heading');
		passwordText.textContent = 'LÖSENORD';

		let btnRed = document.createElement('button');
		btnRed.classList.add(
			'content-wrapper__btn',
			'content-wrapper__btn--red'
		);
		btnRed.textContent = 'LOGGA IN';

		let backBtn = document.createElement('button');
		backBtn.classList.add('content-wrapper__back-btn');
		backBtn.id = 'backBtn';

		let backSymbol = document.createElement('img');
		backSymbol.src = '../assets/icons/back-symbol.svg';
		backSymbol.alt = 'Navigate back symbol, an arrow pointing to the left';
		backSymbol.classList.add('content-wrapper__back-btn-icon');

		// fetching all the elements created so it shows up on the page
		main.appendChild(backgroundContainer);
		inputSection.appendChild(nameText);
		inputSection.appendChild(nameField);
		inputSection.appendChild(passwordText);
		inputSection.appendChild(passwordField);
		loginContainer.appendChild(headingLogin);
		loginContainer.appendChild(quote);
		loginContainer.appendChild(errorMsg);
		loginContainer.appendChild(inputSection);
		main.appendChild(loginContainer);
		main.appendChild(btnRed);
		main.appendChild(backBtn);
		backBtn.appendChild(backSymbol);

		// then clicking on the red login button will:
		btnRed.addEventListener('click', function () {
			let nameInput = nameField.value;
			let passwordInput = passwordField.value;
			// store input field values in variables

			let users = localStorage.getItem('users');
			users = users ? JSON.parse(users) : [];

			// check if 'user' exists or is found, by checking if nameInput (the value written in) and passwordInput (value) is the same as user.username & password in localStorage
			let foundUser = users.find(
				(user) =>
					user.username === nameInput &&
					user.password === passwordInput
			);

			if (foundUser) {
				// updates localStorage to be the user found in the 'user' array AKA the one that is logged in
				localStorage.setItem('currentUser', JSON.stringify(foundUser));

				// display none hides errorMsg by default
				errorMsg.style.display = 'none';
				showWelcomeMsg(foundUser.username);
			} else {
				// errorMsg pops up with this text
				errorMsg.textContent = 'Oops, vi hittade inget konto';
				errorMsg.style.display = 'block'; // blocks display none - shows up on page
			}
		});
		// button that navigates back to the original index section (with Logga In & Registrera Dig btn + logo)
		handleBackBtnClick();
	});
}

// TLDR:
// function to display welcome (username) msg -- before navigating to menu.html
function showWelcomeMsg(username) {
	// username will be displayed in CAPS only, name is now/here capsCurrentUser
	let capsCurrentUser = username.toUpperCase();
	let main = document.querySelector('.content-wrapper__intro-content');
	// empties main content to be able to display new welcome content when logging in
	main.innerHTML = '';

	let welcomeMsgWrapper = document.createElement('section');
	welcomeMsgWrapper.classList.add('content-wrapper__welcome-msg-wrapper');

	let welcomeMsg = document.createElement('h1');
	welcomeMsg.textContent = `VÄLKOMMEN ${capsCurrentUser}!`;
	welcomeMsg.classList.add('content-wrapper__welcome-msg');

	// fetching the elements so they can be displayed on the page
	welcomeMsgWrapper.appendChild(welcomeMsg);
	main.appendChild(welcomeMsgWrapper);

	// showing welcomeMsg for 2.5 sec before navigating to menu-page
	setTimeout(() => {
		window.location.href = 'menu.html';
	}, 2500000);
}

// TLDR:
// clicking on 'Registrera Dig' btn navigates to register.html
function handleRegisterIndexClick() {
	document
		.getElementById('registerBtn')
		.addEventListener('click', function () {
			window.location.href = 'register.html';
		});
}

// TLDR:
// clicking on the back button inside the login form section -- navigates back to original index-page with 'Logga In' & 'Registrera Dig' btn
function handleBackBtnClick() {
	let backBtn = document.getElementById('backBtn');
	if (backBtn) {
		backBtn.addEventListener('click', function () {
			window.location.href = 'index.html';
		});
	}
}
