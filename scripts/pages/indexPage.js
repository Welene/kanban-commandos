// import { clickLoginBtn } from '../utils/utils.js'
// import { getDataFromLocalStorage } from "../data/localStorage";

function runIndexPage() {
	handleLoginClick();
	handleRegisterIndexClick();
	handleBackBtnClick();
}
// import { clickLoginBtn, handleRegisterIndexClick } from '../utils/utils.js'
// function runIndexPage() {
//     clickLoginBtn();
//     handleRegisterIndexClick();
// }

export { runIndexPage };

// function that handles a click on the 'LOGGA IN' button on the index/landing page
function handleLoginClick() {
	document.querySelector('#loginBtn').addEventListener('click', () => {
		let currentUser = localStorage.getItem('currentUser');
		let users = localStorage.getItem('users');

		// ? = if else shorthand, checks if currentUser and user exists
		currentUser = currentUser ? JSON.parse(currentUser) : null;
		users = users ? JSON.parse(users) : [];

		let isLoggedIn =
			currentUser &&
			users.some((user) => user.username === currentUser.username);
		// checks "user" array, if ANY username is === currentUser username then some() returns back true, then you are indeed logged in

		// So if you are logged in --> then we do this
		if (isLoggedIn) {
			let username = currentUser.username;
			let capsCurrentUser = username.toUpperCase();
			let main = document.querySelector(
				'.content-wrapper__intro-content'
			);
			// if user is logged in after clicking the "Logga in" btn, then main AKA all the elements in main gets removed, swapped out with welcomeMsg h1 down here V V V
			main.innerHTML = '';

			let welcomeMsgWrapper = document.createElement('section');
			welcomeMsgWrapper.classList.add(
				'content-wrapper__welcome-msg-wrapper'
			);

			let welcomeMsg = document.createElement('h1');
			// Writes out capsCurrentUser which is username just with big letters only
			welcomeMsg.textContent = `VÄLKOMMEN ${capsCurrentUser}!`;
			welcomeMsg.classList.add('content-wrapper__welcome-msg');

			// shows the new main content on page if logged in
			welcomeMsgWrapper.appendChild(welcomeMsg);
			main.appendChild(welcomeMsgWrapper);

			// Timeout that shows välkommen + current username in a h1 before navigating to the menu
			setTimeout(() => {
				window.location.href = 'menu.html';
			}, 450000);
			return;
		}

		// TLDR:
		// stores every element fetched by class-name in variable with the same classname (except for the first part, content-wrapper)
		// first line let main -- empties html elements in main from html file, before continuing to create new elements
		// only happens if user is NOT logged in
		// if the user is logged in -- navigates to menu.html page

		// putting aria labels // alt to elements to make it more accessible

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

		// puts all of the elements in the html, in the written order
		main.appendChild(backgroundContainer);

		inputSection.appendChild(nameText);
		inputSection.appendChild(nameField);
		inputSection.appendChild(passwordText);
		inputSection.appendChild(passwordField);
		loginContainer.appendChild(headingLogin);
		loginContainer.appendChild(quote);
		loginContainer.appendChild(inputSection);
		main.appendChild(loginContainer);
		main.appendChild(btnRed);
		main.appendChild(backBtn);
		backBtn.appendChild(backSymbol);

		handleBackBtnClick();
	});
}

function handleRegisterIndexClick() {
	document
		.getElementById('registerBtn')
		.addEventListener('click', function () {
			window.location.href = 'register.html';
		});
}

function handleBackBtnClick() {
	let backBtn = document.getElementById('backBtn');
	if (backBtn) {
		backBtn.addEventListener('click', function () {
			window.location.href = 'index.html';
		});
	}
}
