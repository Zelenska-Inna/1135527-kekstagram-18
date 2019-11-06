'use strict';

(function () {
	//работает с формой редактирования изображения/фильтры и ползунок
	// Масштаб
var VARIABLE = 25;//величина шага
var MAX_POINT = 75;
var INTEREST_RATE = 100; //100%
var lessValue = document.querySelector('.scale__control--smaller');//при нажатии на кнопку меньше
var moreValue = document.querySelector('.scale__control--bigger');//при нажатии на кнопку больше
var changePercent = document.querySelector('.scale__control--value');//окно показа Value

changePercent.setAttribute('value', 100 + '%');//value изменили по умолчанию 

//уменьшение
var onLessClick = function() {
	var splitUp = changePercent.getAttribute('value').split('%');//разделяем
	var number = splitUp[0];//достаем цыфровое значение
	if (number > VARIABLE){
		var change = number - VARIABLE;
		var fraction = change / INTEREST_RATE;
		previewImg.style.transform = 'scale(' + fraction + ')';
		var changeIndex = change +'%';
		changePercent.setAttribute('value',changeIndex);//изменение самого класа
	}
};
lessValue.addEventListener('click', onLessClick);
//увеличение
var onMoreClick = function() {
	var splitUp = changePercent.getAttribute('value').split('%');
	var number = Number(splitUp[0]);////достаем цыфровое значение
	if (number <= MAX_POINT){
		var change = number + VARIABLE;
		var fraction = change / INTEREST_RATE;
		previewImg.style.transform = 'scale(' + fraction + ')';
		var changeIndex = change +'%';
		changePercent.setAttribute('value',changeIndex);//изменение самого класа
	}
};
moreValue.addEventListener('click', onMoreClick);

//Наложение эффекта на изображение
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
	'heat': 'effects__preview--heat',
};
var allFilters = document.querySelectorAll('.effects__preview');//все фильтры
var previewImg = document.querySelector('.img-upload__preview').querySelector('img');//Предварительный просмотр фотографии
var slider = document.querySelector('.img-upload__effect-level');// слайдер 
slider.classList.add('hidden'); //!!по умолчанию слайдер скрыт
var pin = slider.querySelector('.effect-level__pin');// Кнопка изменения глубины эффекта фотографии
var changeLine = document.querySelector('.effect-level__line');// линия по которой бегает pin
var сolorSlider = document.querySelector('.effect-level__depth');

//изменени насыщености
function  getChangeFilter(point){

	var filter = previewImg.classList.value;// передается клас на который нажимаем
	

	if( filter === FILTERS['none']){
		previewImg.style.filter = 'none';
	}else if( filter === FILTERS['chrome']){
		previewImg.style.filter = 'grayscale'+ '(' + point / 100 + ')';
	}else if( filter === FILTERS['sepia']){
		previewImg.style.filter = 'sepia' + '(' + point / 100 + ')';
	}else if( filter === FILTERS['marvin']){
		previewImg.style.filter = 'invert' + '(' + point + '%)';
	}else if( filter === FILTERS['phobos']){
		previewImg.style.filter = 'blur' + '(' + FILTER_BLUR * point / 100 + 'px)';
	}else if( filter === FILTERS['heat']){
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
function changeFiter(evt){
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

for(var i = 0; i < allFilters.length; i++){
	allFilters[i].addEventListener('click', changeFiter);
}

	// Ползунок
pin.addEventListener('mousedown', function (evt) {
	var startCoords = evt.clientX;//точка нажатия 

	function onMouseMove(moveEvt){
		var shift = startCoords - moveEvt.clientX;//точка клика - то на сколько елементов подвинули
		startCoords = moveEvt.clientX;//новая точка координат 
		var newLeft = pin.offsetLeft - shift;

		if(newLeft < 0 ){
			newLeft = changeLine.offsetLeft + 'px';
		} else if(newLeft > changeLine.getBoundingClientRect().width ) {
			newLeft = changeLine.getBoundingClientRect().width + 'px';
		}else{
			pin.style.left = newLeft + 'px';
			var point = Math.floor(newLeft * 100 / changeLine.offsetWidth);
			сolorSlider.style.width = point + '%';
			
			getChangeFilter(point);
		}
	}

	function onMouseUp(upEvt) {
		upEvt.preventDefault();
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	}

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
});
//  ВАЛИДАЦИЯ
var inputTags = document.querySelector('.text__hashtags');//достучались до поля хештегов input
var textarea = document.querySelector('.text__description');//достучались до поля коментариев
//хештеги
function checkForHashSymbol(str) {
	if (str != '#') {
		return 'хештег должен начинатся с #';
	}
}

function checkForDuplicateHash(tag) {
	var hashCount = 1;

	for (var i = 1; i < tag.length; i++) {
		var tagSymbol = tag[i];
		if (tagSymbol === '#') {
			hashCount += 1;
		}
	}

	if (hashCount > 1) {
		return 'не больше двух #';
	}
}

function checkForHashMinLength(tag) {
	if(tag.length < 2) {
		return 'хеш-тег не может состоять только из одной решётки';
	}	
}

	function checkForDuplicateHashTags(list) {
	
	for(var i = 0; i < list.length; i++){
		for(var k = 0; k < list.length; k++){
			if(list[i] === list[k] && i != k){
				return 'одинаковые хештеги не допускаются';
			}
		}
	}
	
}

function onInputListener (evt) {
	var COUNT_WORDS = 5;
	var LENGTH_WORD = 20;
	var target = evt.target;
	var tagArray = target.value.split(' ');
	var allHashLength = 0;
	var errorText = null;
	
	for(var i = 0; i < tagArray.length; i++) {
		var oneTag = tagArray[i];

		//количество тегов до 5
		if (oneTag === '') {
			target.setCustomValidity('');
			return ;
		}

		allHashLength ++;
		// первый елемент  в хештеге - это #
		errorText = checkForHashSymbol(oneTag[0]);

		if (errorText && errorText.length > 0) {
			target.setCustomValidity(errorText);
			return;
		}
		// в одном хешьтега не больше одной решотки;
		errorText = checkForDuplicateHash(oneTag);

		if (errorText && errorText.length > 0) {
			target.setCustomValidity(errorText);
			return;
		}
		//хеш-тег не может состоять только из одной решётки
		errorText = checkForHashMinLength(oneTag);

		if (errorText && errorText.length > 0) {
			target.setCustomValidity(errorText);
			return;
		}
		//одинаковые хештеги не допускаются
		errorText = checkForDuplicateHashTags(tagArray);

		if (errorText && errorText.length > 0) {
			target.setCustomValidity(errorText);
			return;
		}

	} 
	//нельзя указать больше 5-ти хэш-тегов
	if (allHashLength > COUNT_WORDS) {
		target.setCustomValidity('нельзя указать больше 5-ти хэш-тегов');
		return;
	}
	//длина хештега не должна превышать 20 символов
	if(oneTag.length > LENGTH_WORD){
		target.setCustomValidity('длина хештега превышает 20 символов');
		return;
	}

	target.setCustomValidity('');
}

inputTags.addEventListener('input', onInputListener);

// коментарии
function onInputTextListener (evt) {
	var LENGTH_TEXT = 140;
	var target = evt.target;
	var text = target.value;
	if (text.length > LENGTH_TEXT){
		textarea.setCustomValidity('длина коментария превышает 140 символов');
		return;
	}
	target.setCustomValidity('');
}
textarea.addEventListener('input', onInputTextListener);
})();
