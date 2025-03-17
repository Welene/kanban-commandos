import { clickLoginBtn, handleRegisterIndexClick } from '../utils/utils.js'

function runIndexPage() {
    // calls function that navigates you to menu.html when clicking on "Logga inn" in index page
    clickLoginBtn();
    handleRegisterIndexClick();
}

export { runIndexPage };