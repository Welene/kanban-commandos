import { doesBasketItemCountsExist } from '../utils/utils.js';

function runMapPage() {
	// Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
	doesBasketItemCountsExist();
	changeMap();
}

function changeMap() {
	const selectionFoodtruckRef = document.querySelector('#selectionFoodtruck');
	selectionFoodtruckRef.addEventListener('change', (selection) => {
		// Gör så containern med namnet, kartan och markören blir synlig
		const imgContainer = document.querySelector('#imgContainer');
		imgContainer.classList.remove('d-none');

		// Bilden ändras beroende på vad man väljer i drop-down menyn.
		const mapImgRef = document.querySelector('#mapImg');
		mapImgRef.src = `../assets/maps/${selection.target.value}.jpg`;

		// Letar upp textinnehållet i det man väljer
		const selectionText =
			selection.target.options[selection.target.selectedIndex].text;

		// Ändrar alt-texten beroende på valet
		mapImgRef.alt = `Karta med footruck vid ${selectionText}`;

		const foodTruckName = document.querySelector('#foodTruckName');
		const mapMarkerRef = document.querySelector('#mapMarker');

		// Placeholderfunktionalitet för att visa vart på kartan som foodtrucken finns.
		// Även visa namnet på foodtrucken
		if (selection.target.selectedIndex === 1) {
			foodTruckName.textContent = 'Bengts Wontons';
			mapMarkerRef.textContent = 'B';
			mapMarkerRef.style.top = '36%';
			mapMarkerRef.style.left = '43%';
		} else if (selection.target.selectedIndex === 2) {
			foodTruckName.textContent = 'Foodtruckexperten';
			mapMarkerRef.textContent = 'F';
			mapMarkerRef.style.top = '49%';
			mapMarkerRef.style.left = '30%';
		} else if (selection.target.selectedIndex === 3) {
			foodTruckName.textContent = 'Super Wonton Meals';
			mapMarkerRef.textContent = 'S';
			mapMarkerRef.style.top = '53%';
			mapMarkerRef.style.left = '43%';
		}
		// Avmarkerar select-elementet så CSS kan byta tillbaka mellan pilikonerna.
		selectionFoodtruckRef.blur();
	});
}

export { runMapPage };
