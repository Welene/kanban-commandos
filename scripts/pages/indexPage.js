// import { clickLoginBtn } from '../utils/utils.js'

function runIndexPage() {
    // calls function that navigates you to menu.html when clicking on "Logga inn" in index page
    // clickLoginBtn();
    handleLoginClick(); 
    handleRegisterIndexClick();
}

export { runIndexPage };

// function that handles a click on the 'LOGGA IN' button on the index/landing page
function handleLoginClick() {
    // when you click on the 'LOGGA IN' button on the landingPage (#loginBtn) it will do the following:
    document.querySelector('#loginBtn').addEventListener('click', () => {
        let isLoggedIn = localStorage.getItem('user');
        if (isLoggedIn) {
            window.location.href = 'menu.html';
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
        backgroundContainer.classList.add('content-wrapper__background-container');
        backgroundContainer.setAttribute('aria-label', 'Background image with wonton, drinks & dips');
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
        btnRed.classList.add('content-wrapper__btn', 'content-wrapper__btn--red');
        btnRed.textContent = 'LOGGA IN';

        let backBtn = document.createElement('button');
        backBtn.classList.add('content-wrapper__back-btn');

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
    });
}


function handleRegisterIndexClick() {
    document.getElementById("registerBtn").addEventListener("click", function() {
        window.location.href = "register.html";
    });
}