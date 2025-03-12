import { fetchProducts, fetchUsers } from './api/api.js';
import {
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from './data/localStorage.js';
import { highlightActiveBurgerLink, clickLoginBtn } from './utils/utils.js';
import { renderHamburgerMenu, openNavMenu } from './components/navMenu.js';
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
    openNavMenu();
    renderHamburgerMenu();
    highlightActiveBurgerLink();
    openDropDownBasket();
    console.log('about.html');
} else if (path === '/pages/eta.html') {
    runEtaPage();
    openNavMenu();
    renderHamburgerMenu();
    highlightActiveBurgerLink();
    openDropDownBasket();
    console.log('eta.html');
} else if (path === '/pages/history.html') {
    runHistoryPage();
    openNavMenu();
    renderHamburgerMenu();
    highlightActiveBurgerLink();
    openDropDownBasket();
    console.log('history.html');
} else if (path === '/pages/map.html') {
    runMapPage();
    openNavMenu();
    renderHamburgerMenu();
    highlightActiveBurgerLink();
    openDropDownBasket();
    console.log('map.html');
} else if (path === '/pages/menu.html') {
    runMenuPage();
    openNavMenu();
    renderHamburgerMenu();
    highlightActiveBurgerLink();
    openDropDownBasket();
    console.log('menu.html');
} else if (path === '/pages/order-overview.html') {
    runOrderOverviewPage();
    openNavMenu();
    renderHamburgerMenu();
    highlightActiveBurgerLink();
    openDropDownBasket();
    console.log('order-overview.html');
} else if (path === '/pages/orders.html') {
    runOrdersPage();
    openNavMenu();
    renderHamburgerMenu();
    highlightActiveBurgerLink();
    openDropDownBasket();
    console.log('orders.html');
} else if (path === '/pages/profile.html') {
    runProfilePage();
    openNavMenu();
    renderHamburgerMenu();
    highlightActiveBurgerLink();
    openDropDownBasket();
    console.log('profile.html');
} else if (path === '/pages/receipt.html') {
    runReceiptPage();
    openNavMenu();
    renderHamburgerMenu();
    highlightActiveBurgerLink();
    openDropDownBasket();
    console.log('receipt.html');
} else if (path === '/pages/register.html') {
    runRegisterPage();
    openNavMenu();
    renderHamburgerMenu();
    highlightActiveBurgerLink();
    openDropDownBasket();
    console.log('register.html');
}

// calls function that navigates you to menu.html when clicking on "Logga inn" in index page
