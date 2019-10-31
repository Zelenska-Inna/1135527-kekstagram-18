'use strict';

var MAX_PHOTOS_COUNT = 25;
var COUNT = {
	MIN: 1,
	MAX: 2,
};
var COUNT_LIKES = {
	MIN: 15,
	MAX: 200,
};
var comments = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var names = ['Dima', 'Max', 'Masha'];

function getRandomNumber(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomComments() {
	var count = getRandomNumber(COUNT.MIN, COUNT.MAX);//массив равно или 1 обект или 2 обекта
	var randomComments = [];

	for (var i = 0; i < count; i++) {
		var randomIndex = getRandomNumber(0, comments.length - 1);
		var randomIndexAvatar = getRandomNumber(1, comments.length);
		randomComments.push({
			message: comments[randomIndex],
			names: names[getRandomNumber(0, names.length - 1)],
			avatar: 'img/avatar-' + randomIndexAvatar + '.svg', // генерит рандом автара
		});
	}

	return randomComments;
}

function getPhoto(index) {
	return {
		url: 'photos/' + (index + 1) + '.jpg',
		description: 'fasdfs',
		likes: getRandomNumber(COUNT_LIKES.MIN, COUNT_LIKES.MAX),
		comments: getRandomComments(index),
	}; 
}

function getPhotos(length) {//создает и возвращает 
	var photos = [];
	for (var i = 0; i < length; i++) {
		var photo = getPhoto(i);
		photos.push(photo);
	}

	return photos;
}


function renderBigPhoto(data) {

	var bigPicture = document.querySelector('.big-picture');//вывод тега section
	//bigPicture.classList.remove('hidden');//удаление
	showStyle(bigPicture);
	var bigPictureImg = bigPicture.querySelector('.big-picture__img');//вывод тега div
	var bigImg = bigPictureImg.querySelector('img');//вывод тега img
	bigImg.src = data.url;

	var bigPictureLikes = bigPicture.querySelector('.likes-count');//вывод тега span
	bigPictureLikes.textContent = data.likes;//вывод рандомных лайков

	var bigPictureComments = bigPicture.querySelector('.comments-count');//вывод тега
	bigPictureComments.innerHTML = data.comments.length;

	var caption = bigPicture.querySelector('.social__caption');//вывод тега р
	caption.innerHTML = data.description;//добавлено описание
	renderComments(data.comments);
}

function renderComments(data){ //принимает или один или два обекта
	// Список комментариев под фотографией
	var callToMyTemplate = document.querySelector('#my__comment').content;//обращение к темплейту
	var subjectTemplate = callToMyTemplate.querySelector('.social__comment');// вызвали его содержание/тег  li
	var elementMyRender = document.querySelector('.social__comments');//место куда отрисует склонированые дети темплейта

	var container = document.createDocumentFragment();
	for (var i = 0; i < data.length; i++) {
		var comment = data[i];//елемент массива который выводит обект 
		var element = subjectTemplate.cloneNode(true); //клонирование тег li и дети 
		var commentImg = element.querySelector('img');
		commentImg.src = comment.avatar;
		commentImg.alt = comment.names; 
		element.querySelector('.social__text').textContent = comment.message;//длина массива(рандомная)
		container.appendChild(element);// добавляет клонированый li  и детей в ОП 
	}
	elementMyRender.appendChild(container);//должен вставить в ul
}


function renderPhotos(data) {

	var container = document.createDocumentFragment(); //прячет оболочку

	for (var i = 0; i < data.length; i++) {
		var actualPhoto = data[i];//елемент массива который выводит обект с url/description/comments/likes

		var element = contentsTemplate.cloneNode(true); //клонирование тег а и дети 
		var img = element.querySelector('img');

		element.href = actualPhoto.url; // где url это ключ обьекта 
		img.src = actualPhoto.url;
		img.alt = actualPhoto.description; 
		element.querySelector('.picture__comments').textContent = actualPhoto.comments.length;//длина массива(рандомная)
		element.querySelector('.picture__likes').textContent = actualPhoto.likes;
		container.appendChild(element);// добавляет клонированый а и детей в ОП 

	}
	elementRender.appendChild(container); // добавление в DOM
}

var photos = getPhotos(MAX_PHOTOS_COUNT);// данные и счоздание дааних функция дейтвие

var callToTemplate = document.querySelector('#picture').content;//вызвали тег темплейт
var contentsTemplate = callToTemplate.querySelector('.picture');// вызвали его содержание/тег а 
var elementRender = document.querySelector('.pictures');//место куда отрисует склонированые дети темплейта

renderPhotos(photos); 

var enumerator = document.querySelector('.social__comment-count');
enumerator.classList.add('visually-hidden');//прячет комментарии к изображению
var batch = document.querySelector('.comments-loader');//вывод тега button
batch.classList.add('visually-hidden');// прячет кнопку для загрузки новой порции комментариев

//задание 4. Обработка событий 
var setupOpen = document.querySelector('#upload-file');//label - окно вызова загрузки фото
var setup = document.querySelector('.img-upload__overlay');// Форма редактирования изображения
var setupClose = document.querySelector('#upload-cancel');//Кнопка для закрытия формы редактирования изображения
var ESC_KEYCODE = 27;

function openPopup() {
	setup.classList.remove('hidden');
}

//при нажатие на кнопку открывается окно загрузки фото
setupOpen.addEventListener('click', function(){
	openPopup();
});
function closePopup() {
	setup.classList.add('hidden');
}
//при нажатие на кнопку-хрестик закрыватся окно
setupClose.addEventListener('click', function(){
	closePopup();
});
//при нажатие на кнопку ESC закрыватся окно
function pressEnter(evt){
	if (evt.target !== textarea && evt.keyCode === ESC_KEYCODE){
		closePopup();
	}
}
document.addEventListener('keydown', pressEnter);

//2.1. Масштаб
var lessValue = document.querySelector('.scale__control--smaller');//при нажатии на кнопку меньше
var moreValue = document.querySelector('.scale__control--bigger');//при нажатии на кнопку больше
var changePercent = document.querySelector('.scale__control--value');//окно показа Value
var changeValue = changePercent.setAttribute('value', 100 + '%');//value изменили по умолчанию 
var VARIABLE = 25;//величина шага
var MAX_POINT = 75;
var INTEREST_RATE = 100; //100%
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
var sliderNone = slider.classList.add('hidden'); //!!по умолчанию слайдер скрыт
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
//удаление ползунка
function hideStyle(element) {
	element.classList.add('hidden');
}
// добавление ползунка
function showStyle(element) {
	element.classList.remove('hidden');
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
		hideStyle(slider);
		removeFiter();
		return;
	}
	showStyle(slider);
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
var textarea = document.querySelector('.text__description');//достучались до поля коментариев

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



