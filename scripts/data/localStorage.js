// Funktionen har en parameter för namnet på nyckeln t ex 'users' för att söka efter i LocalStorage.
function getDataFromLocalStorage(keyname) {
    // Om 'users' inte finns med så kommer det istället tilldelas en tom strängarray.
    const getData = localStorage.getItem(keyname) || '[]';
    // Strängarrayen omvandlas till en array genom JSON.parse och returneras antingen tom eller med innehåll
    return JSON.parse(getData);
}

// Funktion för att spara i localStorage där det behöver skickas med en array samt keyname som måste innehålla '', t ex 'users'
function saveDataToLocalStorage(keyname, array) {
    // Här skrivs det över den befintliga t ex 'users' i localStorage.
    localStorage.setItem(keyname, JSON.stringify(array));
}

export { getDataFromLocalStorage, saveDataToLocalStorage };
