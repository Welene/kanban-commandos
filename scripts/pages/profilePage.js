import { doesBasketItemCountsExist } from '../utils/utils.js';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../data/localStorage.js'
import { fetchUsers } from '../api/api.js';
    
function runProfilePage() {
    // Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
    doesBasketItemCountsExist()
    // Funktion för att hämta hem nuvarande user och även visa personen
    displayCurrentUser()
}

async function saveUsers() {
    const users = await fetchUsers();
    return users;
}

async function displayCurrentUser() {
    // const users = getDataFromLocalStorage('users');
    const users = await saveUsers();
    console.log(users);
    
    
    const profileUserNameRef = document.querySelector('#profileUserName');
    const profileImgRef = document.querySelector('#profileImg');

    if(users) {
        // Lägger in users bild till sidan
        profileImgRef.src = `${users.users[0].profile_image}`
        // Lägger in users användarnamn till sidan
        profileUserNameRef.textContent = `${users.users[0].username}`;
    }

    changeProfileImgListener();
}

// Funktion för att byta profilbild
function changeProfileImgListener() {
    const profileChangeImgBtnRef = document.querySelector('#profileChangeImgBtn');
    const profileImgRef = document.querySelector('#profileImg');

    profileChangeImgBtnRef.addEventListener('click', () => {
        // Hämtar en random img för profil
        let newImg = generateRandomProfileImage();

        const currentImage = profileImgRef.src;
        console.log(currentImage);
        
        // Kontroll så att ifall det är samma bild som finns på profilen
        while (currentImage === newImg) {
            // Om det är samma så randominseras en ny bild
            newImg = generateRandomProfileImage();            
        }
        // Om det är en ny bild så ersätts det med en ny.
        profileImgRef.src = newImg;        
    })
}

function generateRandomProfileImage() {
    const randomNumber = Math.floor(Math.random() * 6) + 1; // Slumpar mellan 1-6
    return `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`;
}

export { runProfilePage }