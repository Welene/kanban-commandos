import { doesBasketItemCountsExist, randomNumber } from '../utils/utils.js';
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

    changeProfileImg();
}

function changeProfileImg() {
    const profileChangeImgBtnRef = document.querySelector('#profileChangeImgBtn');
    const profileImgRef = document.querySelector('#profileImg');

    profileChangeImgBtnRef.addEventListener('click', () => {
        let randomNr = randomNumber(0, 6)
        console.log(randomNr);
        const currentImage = profileImgRef.src;
        console.log(currentImage);
        
        // Kontroll så att det är samma bild som finns på profilen
        while (currentImage === `${userImages[randomNr]}`) {
            // Om det är samma så randominseras ett nytt nr
            console.log('samma bild');
            
            randomNr = randomNumber(0, 6)
            console.log('new' + randomNr);
            console.log(`${userImages[randomNr]}`);
            
        }
        // Om det är en ny bild så ersätts det med en ny.
        profileImgRef.src = `${userImages[randomNr]}`;
        console.log(userImages[randomNr]);
        
    })
}

// Array med olika profilbilder
const userImages = ['https://randomuser.me/api/portraits/men/1.jpg', 'https://randomuser.me/api/portraits/men/2.jpg', 'https://randomuser.me/api/portraits/men/3.jpg', 'https://randomuser.me/api/portraits/men/4.jpg', 'https://randomuser.me/api/portraits/men/5.jpg', 'https://randomuser.me/api/portraits/men/6.jpg', 'https://randomuser.me/api/portraits/men/7.jpg'];


export { runProfilePage }