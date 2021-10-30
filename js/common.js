const generateElement = (tag, text = null, className = null) => {
	const element = document.createElement(tag);
	if (text !== null) element.innerHTML = text;
	if (className !== null) element.className = className;
	return element;
};

export { generateElement };
