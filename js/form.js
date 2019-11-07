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

	// Масштаб
	changePercent.setAttribute('value', 100 + '%');//!! по умолчанию изменено value 

	function changeButton(evt) {
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

	scaleButton.addEventListener('click', changeButton);

	//Наложение эффекта на изображение
	slider.classList.add('hidden'); //!!по умолчанию слайдер скрыт

	function getChangeFilter(point) {
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
	function removeFiter() {
		previewImg.classList = '';
		previewImg.style.filter = ''; // тоесть не будет фильтра
	}
	//добавляет фильтри
	function addFiter(evt) {
		previewImg.classList = '';
		previewImg.style.filter = '';
		previewImg.classList.add(evt);
		// по умолчанию
		pin.style.left = 100 + '%';//по умолчанию максимальное значение
		сolorSlider.style.width = pin.style.left; //по умолчанию цвет линии
	}
	//слушает все фыльтры
	function changeFiter(evt) {
		var classRandom = evt.target.className.split(' ');// розделили на масив
		var classFilter = classRandom[2]; // взяли тертью часть класа
		if (classFilter == 'effects__preview--none'){
			window.util.closePopup(slider);
			removeFiter();
			return;
		}
		window.util.openPopup(slider);
		addFiter(classFilter);
	}

	function sortOutFilters() {
		for(var i = 0; i < allFilters.length; i++){
			allFilters[i].addEventListener('click', changeFiter);
		}
	}
	sortOutFilters();
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
				
			getChangeFilter(point);
		}

		function onMouseUp(upEvt) {
			upEvt.preventDefault();
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});

})();
