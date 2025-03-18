function createSectionElement(classes, id) {
	const section = document.createElement('section');
	section.className = classes;
	if (id) {
		section.id = id;
	}
	return section;
}

function createParagraphElement(classes, id) {
	const paragraph = document.createElement('p');
	paragraph.className = classes;
	if (id) {
		paragraph.id = id;
	}
	return paragraph;
}

export { createParagraphElement, createSectionElement };
