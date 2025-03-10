import { fetchProducts, fetchUsers } from './api/api.js';
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from './data/localStorage.js';
import { highlightActiveBurgerLink, clickLoginBtn } from './utils/utils.js';
import { renderHamburgerMenu, openNavMenu } from './components/navMenu.js';
import { runMenuPage } from './scriptPages/menuPage.js';

console.log('Script.js loaded');

const path = window.location.pathname;

if (path === '/pages/' || path === '/pages/index.html') {
	console.log('index.html');
} else if (path === '/pages/about.html') {
	console.log('about.html');
} else if (path === '/pages/eta.html') {
	console.log('eta.html');
} else if (path === '/pages/history.html') {
	console.log('history.html');
} else if (path === '/pages/map.html') {
	console.log('map.html');
} else if (path === '/pages/menu.html') {
	console.log('menu.html');
	runMenuPage();
} else if (path === '/pages/order-overview.html') {
	console.log('order-overview.html');
} else if (path === '/pages/orders.html') {
	console.log('orders.html');
} else if (path === '/pages/profile.html') {
	console.log('profile.html');
} else if (path === '/pages/receipt.html') {
	console.log('receipt.html');
} else if (path === '/pages/register.html') {
	console.log('register.html');
}

openNavMenu();
renderHamburgerMenu();
highlightActiveBurgerLink();
// calls function that navigates you to menu.html when clicking on "Logga inn" in index page
