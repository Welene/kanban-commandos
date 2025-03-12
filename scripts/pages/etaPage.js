import { doesBasketItemCountsExist } from '../utils/utils.js';

// does not call calculateEtc function because that function is used/called within displayEtaText function
function runEtaPage() {
    clickEtaBtns();
    displayEtaText();
    displayReceiptNumber();
    // handleLoginClick: new login button function that removes main elements and creates new ones with a login form
    handleLoginClick() 
    doesBasketItemCountsExist();
}

export { runEtaPage };

function clickEtaBtns() {
    let newOrderBtn = document.getElementById('newOrderBtn');
    let receiptBtn = document.getElementById('receiptBtn');

    // Event listener on both buttons to navigate to the correct page
    newOrderBtn.addEventListener('click', () => {
        window.location.href = '../pages/menu.html';
        console.log('Navigated to menu.html after clicking New Order button');
    });

    receiptBtn.addEventListener('click', () => {
        window.location.href = '../pages/receipt.html';
        console.log(
            'Navigated to receipt.html after clicking Show Receipt button'
        );
    });
}

// TLDR:
// getting basket from localStorage -- setting 0 as start time -- if basket has more than 0 items = use reduce (reduces all items/item times to one combined Eta time)
// if the basket has no items then totalEta is automatically 0 minutes.
// -- adds one item AKA 1 min to totalEta at a time, tells it to start at 0 -- returns totalEta that gets put into `${totalEta}` later.
// -- catches error if there are no food items = returns 0 (minutes)
function calculateEta() {
    try {
        let basket = JSON.parse(localStorage.getItem('receipt')) || {
            items: [],
        };
        let totalEta = 0;
        if (basket.items.length > 0) {
            totalEta += basket.items.reduce(
                (sum, item) => sum + item.amount,
                0
            );
        }
        return totalEta;
    } catch (error) {
        console.log('No orders found, 0 minutes', error);
        return 0;
    }
}

// TLDR:
// function that displays totalEta text using/running the calculateEta function, also adding ETA + MIN to the textContent as well as total minutes in between those words
function displayEtaText() {
    let totalEta = calculateEta();
    document.getElementById('etaText').textContent = `ETA ${totalEta} MIN`;
}

// TLDR:
// function that displays receiptNumber for spesific order -- gets basket from localStorage -- shows empty objekt if there is nothing in the basket
// gets the id from basket (the receipt number for the spesific order) and saves it in variable receiptNumber
// if receiptNumber (basket.id) does not exist/or cannot find it then you will see an error message in the console
// gets receiptNumber id from html to change textContent to # + the number that will be made later in a function and stored in localStorage
function displayReceiptNumber() {
    let basket = JSON.parse(localStorage.getItem('receipt')) || {};
    let receiptNumber = basket.id;

    if (!receiptNumber) {
        console.log('Cannot find any basket id');
    } else {
        // add # later before $ if that is not in the objekt
        document.getElementById(
            'receiptNumber'
        ).textContent = `${receiptNumber}`;
    }
}

// WROTE THIS DIRECTLY INTO CONSOLE TO TEST MY FUNCTIONS

// localStorage.setItem('basket', JSON.stringify({
//     id: '#4kjwsdf234k',
//     foodTruck: '#1241',
//     items: [
//         { id: 1, namn: 'Paris', amount: 2, price: 19 },
//         { id: 2, namn: 'Namn', amount: 2, price: 19 },
//         { id: 3, namn: 'Name', amount: 2, price: 19 }
//     ]
// })); ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

// function that handles a click on the 'LOGGA IN' button on the index/landing page
function handleLoginClick() {
    // when you click on the 'LOGGA IN' button on the landingPage (#loginBtn) it will do the following:
    document.querySelector('#loginBtn').addEventListener('click', () => {
        let isLoggedIn = localStorage.getItem('users');

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

        let loginContainer = document.createElement('section');
        loginContainer.classList.add('login-container');

        let headingLogin = document.createElement('h1');
        headingLogin.classList.add('heading-login');
        headingLogin.textContent = 'LOGGA IN';

        let quote = document.createElement('p');
        quote.classList.add('quote');
        quote.textContent = 'UPPLEV ÄKTA MATGLÄDJE';

        let inputSection = document.createElement('section');
        inputSection.classList.add('input-section');

        let nameField = document.createElement('input');
        nameField.classList.add('name-field');
        nameField.type = 'text';
        nameField.setAttribute('aria-label', 'Input field for nickname');

        let passwordField = document.createElement('input');
        passwordField.classList.add('password-field');
        passwordField.type = 'password';
        passwordField.setAttribute('aria-label', 'Input field for password');

        let btnRed = document.createElement('button');
        btnRed.classList.add('btn', 'btn--red');
        btnRed.textContent = 'LOGGA IN';

        let backBtn = document.createElement('button');
        backBtn.classList.add('back-btn');

        let backSymbol = document.createElement('img');
        backSymbol.src = '../assets/icons/back-symbol.svg';
        backSymbol.alt = 'Navigate back symbol, an arrow pointing to the left';

        // puts all of the elements in the html, in the written order
        backBtn.appendChild(backSymbol);
        inputSection.appendChild(nameField);
        inputSection.appendChild(passwordField);
        loginContainer.appendChild(headingLogin);
        loginContainer.appendChild(quote);
        loginContainer.appendChild(inputSection);
        main.appendChild(loginContainer);
        main.appendChild(btnRed);
        main.appendChild(backBtn);
    });
}