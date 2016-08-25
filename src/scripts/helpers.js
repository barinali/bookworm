'use strict';

window.$closest = function (element, className) {
	if (!element.parentNode) {
		return;
	}

	if (element.parentNode.classList.contains(className)) {
		return element.parentNode;
	}

	return window.$closest(element.parentNode, className);
};
