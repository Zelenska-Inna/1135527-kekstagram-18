'use strict';

window.util = (function () {
	//открытие и закрытие кнопок
	var ESC_KEYCODE = 27;
	var setup = document.querySelector('.img-upload__overlay');

	//открыть 
	function openPopup(date) {
		date.classList.remove('hidden');
	}
	//закрыть
	function closePopup(date) {
		date.classList.add('hidden');
	}

	function pressEscSetupHandler(evt) {
			
		if (evt.keyCode !== ESC_KEYCODE) {
			return;
		}
		if (evt.target.tagName.toLowerCase() === 'textarea' || evt.target.tagName.toLowerCase() === 'input') {
			return;
		}
		
		closePopup(setup);
	}

	function pressEsc(evt, action) {

		if (evt.keyCode === ESC_KEYCODE) {
			action();
		}
	}

	document.addEventListener('keydown', pressEscSetupHandler);

	return {
		setup: setup,
		closePopup: closePopup,
		openPopup: openPopup,
		pressEsc: pressEsc,
		pressEscSetupHandler: pressEscSetupHandler,
	};
})();