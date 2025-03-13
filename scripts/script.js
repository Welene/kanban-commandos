import { fetchProducts, fetchUsers } from './api/api.js';
import {
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from './data/localStorage.js';
import { renderHamburgerMenu } from './components/navMenu.js';
import { runIndexPage } from './pages/indexPage.js';
import { runAboutPage } from './pages/aboutPage.js';
import { runEtaPage } from './pages/etaPage.js';
import { runHistoryPage } from './pages/historyPage.js';
import { runMapPage } from './pages/mapPage.js';
import { runMenuPage } from './pages/menuPage.js';
import { runOrderOverviewPage } from './pages/order-overviewPage.js';
import { runOrdersPage } from './pages/ordersPage.js';
import { runProfilePage } from './pages/profilePage.js';
import { runReceiptPage } from './pages/receiptPage.js';
import { runRegisterPage } from './pages/registerPage.js';
import { openDropDownBasket } from './components/dropDownBasket.js';

console.log('Script.js loaded');

const path = window.location.pathname;

if (path === '/pages/' || path === '/pages/index.html') {
    runIndexPage();
    console.log('index.html');
} else if (path === '/pages/about.html') {
    runAboutPage();
    renderHamburgerMenu();
    openDropDownBasket();
    console.log('about.html');
} else if (path === '/pages/eta.html') {
    runEtaPage();
    renderHamburgerMenu();
    openDropDownBasket();
    console.log('eta.html');
} else if (path === '/pages/history.html') {
    runHistoryPage();
    renderHamburgerMenu();
    openDropDownBasket();
    console.log('history.html');
} else if (path === '/pages/map.html') {
    runMapPage();
    renderHamburgerMenu();
    openDropDownBasket();
    console.log('map.html');
} else if (path === '/pages/menu.html') {
    runMenuPage();
    renderHamburgerMenu();
    openDropDownBasket();
    console.log('menu.html');
} else if (path === '/pages/order-overview.html') {
    runOrderOverviewPage();
    renderHamburgerMenu();
    openDropDownBasket();
    console.log('order-overview.html');
} else if (path === '/pages/orders.html') {
    runOrdersPage();
    renderHamburgerMenu();
    openDropDownBasket();
    console.log('orders.html');
} else if (path === '/pages/profile.html') {
    runProfilePage();
    renderHamburgerMenu();
    openDropDownBasket();
    console.log('profile.html');
} else if (path === '/pages/receipt.html') {
    runReceiptPage();
    renderHamburgerMenu();
    openDropDownBasket();
    console.log('receipt.html');
} else if (path === '/pages/register.html') {
    runRegisterPage();
    console.log('register.html');
}

// calls function that navigates you to menu.html when clicking on "Logga inn" in index page
