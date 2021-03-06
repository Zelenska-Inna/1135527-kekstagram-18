'use strict';

(function () {
	var VARIABLE = 25;
	var MAX_POINT = 75;
	var MAX_RATE = 100;
	var FILTER_BLUR = 3;
	var FilterBrightness = { 
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
	var changePercent = document.querySelector('.scale__control--value');
	var allFilters = document.querySelectorAll('.effects__preview');
	var previewImg = document.querySelector('.img-upload__preview').querySelector('img');
	var slider = document.querySelector('.img-upload__effect-level');
	var pinOfSlider = slider.querySelector('.effect-level__pin');
	var changeLine = document.querySelector('.effect-level__line');
	var colorSlider = document.querySelector('.effect-level__depth');
	var setupOpen = document.querySelector('.img-upload__label');
	var setupClose = document.querySelector('#upload-cancel');
	var formForImg = document.querySelector('.img-upload__form');

	// Масштаб
	function scalingFotoHandler(evt) {
		var target = evt.target.className.split('--');
		var splitUp = changePercent.getAttribute('value').split('%');
		var number = Number(splitUp[0]);
		var changeOfSize;

		if (number > VARIABLE && target[1] === 'smaller') {
			changeOfSize = number - VARIABLE;
			previewImg.style.transform = 'scale(' + changeOfSize / MAX_RATE + ')';
			changePercent.setAttribute('value',changeOfSize + '%');
		} else if (number <= MAX_POINT && target[1] === 'bigger') {
			changeOfSize = number + VARIABLE;
			previewImg.style.transform = 'scale(' + changeOfSize / MAX_RATE + ')';
			changePercent.setAttribute('value', changeOfSize + '%');//изменение самого класа
			return;
		}
	}

	//Наложение эффекта на изображение
	function сhangeDepthFilter(point) {
		var filter = previewImg.classList.value;// передается клас на который нажимаем

		if (filter === FILTERS['none']) {
			previewImg.style.filter = 'none';
		} else if (filter === FILTERS['chrome']) {
			previewImg.style.filter = 'grayscale'+ '(' + point / MAX_RATE + ')';
		} else if (filter === FILTERS['sepia']) {
			previewImg.style.filter = 'sepia' + '(' + point / MAX_RATE + ')';
		} else if (filter === FILTERS['marvin']) {
			previewImg.style.filter = 'invert' + '(' + point + '%)';
		} else if (filter === FILTERS['phobos']) {
			previewImg.style.filter = 'blur' + '(' + FILTER_BLUR * point / MAX_RATE + 'px)';
		} else if (filter === FILTERS['heat']) {
			previewImg.style.filter = 'brightness' + '(' + point / MAX_RATE * (FilterBrightness.MAX - FilterBrightness.MIN) + FilterBrightness.MIN + ')';
		}

	}
	// по умолчанию картинка в полном размере
	function  setDefaultSizePicture() { 
		changePercent.setAttribute('value', MAX_RATE + '%');
	}

	//снимает фильт 
	function removeFilter() {
		previewImg.classList = '';
		previewImg.style = '';
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
		pinOfSlider.style.left = MAX_RATE + '%';//по умолчанию максимальное значение
		colorSlider.style.width = pinOfSlider.style.left; //по умолчанию цвет линии
	}
	//слушает все фыльтры
	function changeFilterHandler(evt) {
		var classRandom = evt.target.className.split(' ');
		var classFilter = classRandom[2]; 
		if (classFilter === 'effects__preview--none'){
			window.util.closePopup(slider);
			removeFilter();
			return;
		}
		window.util.openPopup(slider);
		addFilter(classFilter);
	}

	function sortOutFilters() {
		for(var i = 0; i < allFilters.length; i++){
			allFilters[i].addEventListener('click', changeFilterHandler);
		}
	}

	sortOutFilters();

	//при нажатие на клопку меняется масштаб фото
	scaleButton.addEventListener('click', scalingFotoHandler);

	//при нажатие на кнопку открывается окно загрузки фото
	setupOpen.addEventListener('click', function() {
		previewImg.src = 'img/upload-default-image.jpg';
		removeText();
		removeFilter();
		window.util.closePopup(slider);
		window.util.openPopup(window.util.setup);
		setDefaultSizePicture();
		document.addEventListener('keydown', window.util.pressEscSetupHandler);
	});

	//при нажатие на кнопку-хрестик закрыватся окно
	setupClose.addEventListener('click', function() {
		window.util.closePopup(window.util.setup);		
	});


	// Ползунок
	pinOfSlider.addEventListener('mousedown', function(evt) {
		var startCoords = evt.clientX;//точка нажатия 

		function moveMouseHandler(moveEvt) {
			var shift = startCoords - moveEvt.clientX;//точка клика - то на сколько елементов подвинули
			startCoords = moveEvt.clientX;//новая точка координат 
			var newLeft = pinOfSlider.offsetLeft - shift;

			if (newLeft < 0) {
				newLeft = changeLine.offsetLeft + 'px';
			} else if (newLeft > changeLine.getBoundingClientRect().width) {
				newLeft = changeLine.getBoundingClientRect().width + 'px';
			}
			pinOfSlider.style.left = newLeft + 'px';
			var point = Math.floor(newLeft * MAX_RATE / changeLine.offsetWidth);
			colorSlider.style.width = point + '%';
				
			сhangeDepthFilter(point);
		}

		function upMouseHandler(upEvt) {
			upEvt.preventDefault();
			document.removeEventListener('mousemove', moveMouseHandler);
			document.removeEventListener('mouseup', upMouseHandler);
		}
		document.addEventListener('mousemove', moveMouseHandler);
		document.addEventListener('mouseup', upMouseHandler);
	});

	//СООБЩЕНИЕ
	function renderMessage(id, message) {
		var styleShift = id.replace('#', '.');
		var template = document.querySelector(id).content.querySelector(styleShift);
		var node = template.cloneNode(true);
		var mainPart  = document.querySelector('main');
		var closeMessageButton= node.querySelector(styleShift + '__button');

		function pressEscMessageHandler(evt) {
			window.util.pressEsc(evt, removeMessageHandler);
		}

		function removeMessageHandler() {
			mainPart.removeChild(node);
			document.removeEventListener('keydown', pressEscMessageHandler);
		}

		closeMessageButton.addEventListener('click', removeMessageHandler);
		document.addEventListener('keydown', pressEscMessageHandler);

		node.addEventListener('click', function (evt) {
			if (evt.target === node) {
				removeMessageHandler();
			}
		});

		if (message) {
			var nodeInner = node.querySelector(styleShift + '__inner');
			var paragraph = document.createElement('p');
			paragraph.textContent = message;
			nodeInner.appendChild(paragraph);
		}
		mainPart.appendChild(node);
	}

	function setSuccessfulResult() { 
		removeText();
		removeFilter();
		window.util.closePopup(window.util.setup);
		renderMessage('#success');
	}

	function setFalseResult(message) {
		removeText();
		removeFilter();
		window.util.closePopup(window.util.setup);
		renderMessage('#error', message);
	}

	formForImg.addEventListener('submit', function (evt) {
		evt.preventDefault();

		window.backend.upload('https://js.dump.academy/kekstagram', new FormData(formForImg), setSuccessfulResult, setFalseResult);
	});
})();
