import { fetchProducts, fetchUsers } from './api/api.js';
import {
    getDataFromLocalStorage,
    saveDataToLocalStorage,
} from './data/localStorage.js';
import { highlightActiveBurgerLink, clickLoginBtn } from './utils/utils.js';
import { renderHamburgerMenu, openNavMenu } from './components/navMenu.js';
import { runIndexPage } from './pages/indexPage.js'
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
import { openDropDownBasket } from './components/dropDownBasket.js'

console.log('Script.js loaded');

const path = window.location.pathname;

if (path === '/pages/' || path === '/pages/index.html') {
    runIndexPage();
    console.log('index.html');
} else if (path === '/pages/about.html') {
    runAboutPage();
    console.log('about.html');
} else if (path === '/pages/eta.html') {
    runEtaPage();
    console.log('eta.html');
} else if (path === '/pages/history.html') {
    runHistoryPage();
    console.log('history.html');
} else if (path === '/pages/map.html') {
    runMapPage();
    console.log('map.html');
} else if (path === '/pages/menu.html') {
    runMenuPage();
    console.log('menu.html');
} else if (path === '/pages/order-overview.html') {
    runOrderOverviewPage();
    console.log('order-overview.html');
} else if (path === '/pages/orders.html') {
    runOrdersPage();
    console.log('orders.html');
} else if (path === '/pages/profile.html') {
    runProfilePage();
    console.log('profile.html');
} else if (path === '/pages/receipt.html') {
    runReceiptPage();
    console.log('receipt.html');
} else if (path === '/pages/register.html') {
    runRegisterPage();
    console.log('register.html');
}

openNavMenu();
renderHamburgerMenu();
highlightActiveBurgerLink();
openDropDownBasket()


