'use strict';
//при клике открытие фото 
(function () {
	var elementRender = document.querySelector('.pictures');//место куда отрисует склонированые дети темплейта

	function renderPreview(elem) {
		var NUMBER_DIFFERENCE = 2;
		var parent = elem.parentNode;
		var index = Array.prototype.indexOf.call(parent.children, elem) - NUMBER_DIFFERENCE;

		window.main.renderBigPhoto(window.photos[index]);//(window.photos[index]);
	}

	function pictureClickHandler(evt) {
		var parent = evt.target.closest('.picture');

		if (parent) {
			evt.preventDefault();
			renderPreview(parent);
		}
	}
	elementRender.addEventListener('click', pictureClickHandler);
})();