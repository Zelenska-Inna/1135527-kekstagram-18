'use strict';

(function () {
	var NUMBER_DIFFERENCE = 2;
	var containerForRenderPhoto = document.querySelector('.pictures');

	//при клике открытие фото 
	function renderPreview(elem) {
		var parent = elem.parentNode;
		var index = Array.prototype.indexOf.call(parent.children, elem) - NUMBER_DIFFERENCE;

		window.preview.renderBigPhoto(window.newArrPhoto[index]);
	}

	function pictureClickHandler(evt) {
		var parent = evt.target.closest('.picture');
		
		if (parent) {
			evt.preventDefault();
			renderPreview(parent);
		}
		document.addEventListener('keydown', window.preview.bigPictureEscPressHandler);

	}
	containerForRenderPhoto.addEventListener('click', pictureClickHandler);

	function load(data) {
		window.xhrPhotos = data;
		window.preview.renderPhotos(data);
		window.filters.showFilters();
	}

	window.backend.load('https://js.dump.academy/kekstagram/data', load, window.preview.renderError);

})();