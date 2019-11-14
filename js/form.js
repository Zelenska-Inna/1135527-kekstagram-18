'use strict';

(function () {
	//константы
	var VARIABLE = 25;//величина шага
	var MAX_POINT = 75;
	var INTEREST_RATE = 100;
	var FILTER_BLUR = 3;
	var FILTER_BRIGHTNESS = {
		MIN: 1,
		MAX: 3,
	};
	var FILTERS = {
		'none':'effects__preview--none',
		'chrome': 'effects__preview--chrome',
		'sepia': 'effects__preview--sepia',
		'marvin': 'effects__preview--marvin',
		'phobos': 'effects__preview--phobos',
		'heat': 'effects__preview--heat'
	}; 
	var scaleButton = document.querySelector('.img-upload__scale');
	var changePercent = document.querySelector('.scale__control--value');//окно показа Value
	var allFilters = document.querySelectorAll('.effects__preview');//все фильтры
	var previewImg = document.querySelector('.img-upload__preview').querySelector('img');//Предварительный просмотр фотографии
	var slider = document.querySelector('.img-upload__effect-level');// слайдер 
	var pin = slider.querySelector('.effect-level__pin');// Кнопка изменения глубины эффекта фотографии
	var changeLine = document.querySelector('.effect-level__line');// линия по которой бегает pin
	var сolorSlider = document.querySelector('.effect-level__depth');
	var setupOpen = document.querySelector('.img-upload__label');//label - окно вызова загрузки фото #upload-file
	var setupClose = document.querySelector('#upload-cancel');//Кнопка для закрытия формы редактирования изображения
	var form = document.querySelector('.img-upload__form');


	// Масштаб
	changePercent.setAttribute('value', 100 + '%');//!! по умолчанию картинка в полном размере

	function scalingFoto(evt) {
		var target = evt.target.className.split('--');
		var splitUp = changePercent.getAttribute('value').split('%');
		var number = Number(splitUp[0]);
		var change;

		if (number > VARIABLE && target[1] == 'smaller') {
			change = number - VARIABLE;
			previewImg.style.transform = 'scale(' + change / INTEREST_RATE + ')';
			changePercent.setAttribute('value',change + '%');
		} else if (number <= MAX_POINT && target[1] == 'bigger') {
			change = number + VARIABLE;
			previewImg.style.transform = 'scale(' + change / INTEREST_RATE + ')';
			changePercent.setAttribute('value', change + '%');//изменение самого класа
			return;
		}
	}

	scaleButton.addEventListener('click', scalingFoto);

	//Наложение эффекта на изображение

	function сhangeDepthFilter(point) {
		var filter = previewImg.classList.value;// передается клас на который нажимаем

		if (filter === FILTERS['none']) {
			previewImg.style.filter = 'none';
		} else if (filter === FILTERS['chrome']) {
			previewImg.style.filter = 'grayscale'+ '(' + point / 100 + ')';
		} else if (filter === FILTERS['sepia']) {
			previewImg.style.filter = 'sepia' + '(' + point / 100 + ')';
		} else if (filter === FILTERS['marvin']) {
			previewImg.style.filter = 'invert' + '(' + point + '%)';
		} else if (filter === FILTERS['phobos']) {
			previewImg.style.filter = 'blur' + '(' + FILTER_BLUR * point / 100 + 'px)';
		} else if (filter === FILTERS['heat']) {
			previewImg.style.filter = 'brightness' + '(' + point / 100 * (FILTER_BRIGHTNESS.MAX - FILTER_BRIGHTNESS.MIN) + FILTER_BRIGHTNESS.MIN + ')';
		}

	}

	//снимает фильт 
	function removeFilter() {
		previewImg.classList = '';
		previewImg.style = '';
		changePercent.setAttribute('value', 100 + '%');// значение масштаба(в процентах)
	}

	//cнимает комети и хештеги
	function removeText() {
		window.validation.textarea.value = '';
		window.validation.inputTags.value = '';
	}
	//добавляет фильтри
	function addFilter(evt) {
		previewImg.classList = '';
		previewImg.style.filter = '';
		previewImg.classList.add(evt);
		// по умолчанию
		pin.style.left = 100 + '%';//по умолчанию максимальное значение
		сolorSlider.style.width = pin.style.left; //по умолчанию цвет линии
	}
	//слушает все фыльтры
	function changeFilter(evt) {
		var classRandom = evt.target.className.split(' ');// розделили на масив
		var classFilter = classRandom[2]; // взяли тертью часть класа
		if (classFilter == 'effects__preview--none'){
			window.util.closePopup(slider);
			removeFilter();
			return;
		}
		window.util.openPopup(slider);
		addFilter(classFilter);
	}

	function sortOutFilters() {
		for(var i = 0; i < allFilters.length; i++){
			allFilters[i].addEventListener('click', changeFilter);
		}
	}
	sortOutFilters();

	//при нажатие на кнопку открывается окно загрузки фото
	setupOpen.addEventListener('click', function() {
		window.util.closePopup(slider);
		window.util.openPopup(window.util.setup);
	});

	//при нажатие на кнопку-хрестик закрыватся окно
	setupClose.addEventListener('click', function() {
		removeText();
		removeFilter();
		window.util.closePopup(window.util.setup);		
	});
	// Ползунок
	pin.addEventListener('mousedown', function(evt) {
		var startCoords = evt.clientX;//точка нажатия 

		function onMouseMove(moveEvt) {
			var shift = startCoords - moveEvt.clientX;//точка клика - то на сколько елементов подвинули
			startCoords = moveEvt.clientX;//новая точка координат 
			var newLeft = pin.offsetLeft - shift;

			if (newLeft < 0) {
				newLeft = changeLine.offsetLeft + 'px';
			} else if (newLeft > changeLine.getBoundingClientRect().width) {
				newLeft = changeLine.getBoundingClientRect().width + 'px';
			}
			pin.style.left = newLeft + 'px';
			var point = Math.floor(newLeft * 100 / changeLine.offsetWidth);
			сolorSlider.style.width = point + '%';
				
			сhangeDepthFilter(point);
		}

		function onMouseUp(upEvt) {
			upEvt.preventDefault();
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});

	//СООБЩЕНИЕ
	function renderMessage(id, message) {
		var style = id.replace('#', '.');


		var template = document.querySelector(id).content.querySelector(style);
		var node = template.cloneNode(true);
		var main = document.querySelector('main');
		var button = node.querySelector(style + '__button');

		function messageEscPressHandler(evt) {
			window.util.pressEscButton(evt, removeMessage);
		}

		function removeMessage() {
			main.removeChild(node);
			document.removeEventListener('keydown', messageEscPressHandler);
		}

		button.addEventListener('click', removeMessage);
		document.addEventListener('keydown', messageEscPressHandler);

		node.addEventListener('click', function (evt) {
			if (evt.target === node) {
				removeMessage();
			}
		});

		if (message) {
			var nodeInner = node.querySelector(style + '__inner');
			var p = document.createElement('p');
			p.textContent = message;
			nodeInner.appendChild(p);
		}
		main.appendChild(node);
	}

	function onSuccess() {
		window.util.closePopup(window.util.setup);
		renderMessage('#success');
	}

	function onError(message) {
		window.util.closePopup(window.util.setup);// closeEditForm
		renderMessage('#error', message);
	}

	form.addEventListener('submit', function (evt) {
		evt.preventDefault();

		window.backend.upload('https://js.dump.academy/kekstagram', new FormData(form), onSuccess, onError);
	});
})();
