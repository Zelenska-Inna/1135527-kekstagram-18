'use strict';

window.util = (function () {
	//открытие и закрытие кнопок
	var ESC_KEYCODE = 27;
	var setup = document.querySelector('.img-upload__overlay');// Форма редактирования изображения
	var pictureCancelButton = document.querySelector('#picture-cancel');

	//открыть 
	function openPopup(date) {
		date.classList.remove('hidden');
	}
	//закрыть
	function closePopup(date) {
		date.classList.add('hidden');
	}
	//при нажатие на кнопку ESC закрыватся окноx редактирования кода
	function pressEscSetup(evt) {
			
		if (evt.keyCode !== ESC_KEYCODE) {
			return;
		}
		if (evt.target.tagName.toLowerCase() === 'textarea' || evt.target.tagName.toLowerCase() === 'input') {
			return;
		}

		closePopup(setup);
	}
	//закритие отрисовки большого фото
	function pressEscBigPicture(evt) {

		if (evt.keyCode === ESC_KEYCODE) {
			closePopup(window.preview.bigPicture);
		}
	}

	function pressEscButton(evt, action) {

		if (evt.keyCode === ESC_KEYCODE) {
			action();
		}
	}
	
	//при нажатие на кнопку-хрестик закрыватся окно
	pictureCancelButton.addEventListener('click', function() {
		closePopup(window.preview.bigPicture);
	});
	
	document.addEventListener('keydown', pressEscSetup);
	document.addEventListener('keydown', pressEscBigPicture);

	return {
		setup: setup,
		closePopup: closePopup,
		openPopup: openPopup,
		pressEscBigPicture: pressEscBigPicture,
		pressEscSetup: pressEscSetup,
		pressEscButton: pressEscButton,
	};
})();

