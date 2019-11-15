'use strict';

(function () {
	var NUMBER_DIFFERENCE = 2;
	var elementRender = document.querySelector('.pictures');//место куда отрисует склонированые дети темплейта
	
	//при клике открытие фото 
	function renderPreview(elem) {
		var parent = elem.parentNode;
		var index = Array.prototype.indexOf.call(parent.children, elem) - NUMBER_DIFFERENCE;

		window.preview.renderBigPhoto(window.xhrPhotos[index]);//window.xhrPhotos[index]
	}

	function pictureClickHandler(evt) {
		var parent = evt.target.closest('.picture');

		if (parent) {
			evt.preventDefault();
			renderPreview(parent);
		}
	}
	elementRender.addEventListener('click', pictureClickHandler);
	
	window.backend.load('https://js.dump.academy/kekstagram/data', window.preview.renderPhotos, window.preview.renderError);

})();