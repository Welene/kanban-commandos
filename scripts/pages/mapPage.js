import { doesBasketItemCountsExist } from '../utils/utils.js';

function runMapPage() {
	// Funktion för att skapa röda cirkeln runt basket om det finns tillagda items
	doesBasketItemCountsExist();
	changeMap();
}

function changeMap() {
	const selectionFoodtruckRef = document.querySelector('#selectionFoodtruck');
	selectionFoodtruckRef.addEventListener('change', (selection) => {
		// Bilden ändras beroende på vad man väljer i drop-down menyn.
		const mapImgRef = document.querySelector('#mapImg');
		mapImgRef.src = `../assets/maps/${selection.target.value}.jpg`;

		// Letar upp textinnehållet i det man väljer
		const selectionText =
			selection.target.options[selection.target.selectedIndex].text;

		// Ändrar alt-texten beroende på valet
		mapImgRef.alt = `Karta med footruck vid ${selectionText}`;
	});
}

export { runMapPage };
