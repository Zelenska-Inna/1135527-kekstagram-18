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
	bigPicture.classList.remove('hidden');//удаление

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
var actualBigPhoto = photos[getRandomNumber(0,photos.length-1)];//выдает по 1 рандомному фото
// renderBigPhoto(actualBigPhoto);этот код не удалять так нада при след заданиях


var enumerator = document.querySelector('.social__comment-count');
enumerator.classList.add('visually-hidden');//прячет комментарии к изображению
var batch = document.querySelector('.comments-loader');//вывод тега button
batch.classList.add('visually-hidden');// прячет кнопку для загрузки новой порции комментариев

//задание 4. Обработка событий 
var setupOpen = document.querySelector('#upload-file');//label - окно вызова загрузки фото
var setup = document.querySelector('.img-upload__overlay');// Форма редактирования изображения
var setupClose = document.querySelector('#upload-cancel');//Кнопка для закрытия формы редактирования изображения
var ESC_KEYCODE = 27;

var openPopup = function() {
	setup.classList.remove('hidden');
};

//при нажатие на кнопку открывается окно загрузки фото
setupOpen.addEventListener('click', function(){
	openPopup();
});

var closePopup = function() {
	setup.classList.add('hidden');
};
//при нажатие на кнопку-хрестик закрыватся окно
setupClose.addEventListener('click', function(){
	closePopup();
});
//при нажатие на кнопку ESC закрыватся окно
document.addEventListener('keydown', function(evt){
	if (evt.keyCode === ESC_KEYCODE){
		closePopup();
	}
});
//2.1. Масштаб
var lessValue = document.querySelector('.scale__control--smaller');//при нажатии на кнопку меньше
var moreValue = document.querySelector('.scale__control--bigger');//при нажатии на кнопку больше
var changePercent = document.querySelector('.scale__control--value');//окно показа Value
var changeValue = changePercent.setAttribute('value', 100+'%');//value изменили по умолчанию 
var previewImg = document.querySelector('.img-upload__preview').querySelector('img');//Предварительный просмотр фотографии
var changeClass = previewImg.classList.add('effects__preview--none');//Превью фото без эффекта - Оригинал
var pin = document.querySelector('.effect-level__pin');//макс значення Кнопка изменения глубины эффекта фотографии
var changeSlider = document.querySelector('.effect-level__value');//лінія
var VARIABLE = 25;//величина шага
var INTEREST_RATE =100; //100%
//уменьшение
var onLessClick = function() {
	var splitUp = changePercent.getAttribute('value').split('%');//разделяем
	var number = splitUp[0];//достаем цыфровое значение
	if (number > 25){
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
	if (number <= 75){
		var change = number + VARIABLE;
		var fraction = change / INTEREST_RATE;
		previewImg.style.transform = 'scale(' + fraction + ')';
		var changeIndex = change +'%';
		changePercent.setAttribute('value',changeIndex);//изменение самого класа
	}
};
moreValue.addEventListener('click', onMoreClick);
//ползунок
var changeLine = document.querySelector('.effect-level__line');
var сolorSlider = document.querySelector('.effect-level__depth');
pin.style.left =  100 + '%';//по умолчанию максимальное значение
сolorSlider.style.width = pin.style.left;//цвет линии

//КОД Drag'n'Drop
// pin.onmousedown = function(event) {
// 	var shiftX  = event.clientX - pin.getBoundingClientRect().left;

// 	var onMouseMove = function (event) {
//         var newLeft = event.clientX - shiftX - changeLine.getBoundingClientRect().left;
//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);
// console.log(newLeft)
//         // если курсор вышел из слайдера
//         if (newLeft < 0) {
//           newLeft = 0;
//         }
//         var rightEdge = changeLine.offsetWidth - pin.offsetWidth;
//         if (newLeft > rightEdge) {
//           newLeft = rightEdge;
//         }

//         pin.style.left =  newLeft + '%';//логику которою я доперла сама//ФИНАЛОЧКА
//       }
//       function onMouseUp() {
//         document.removeEventListener('mouseup', onMouseUp);
//         document.removeEventListener('mousemove', onMouseMove);
//       }
// };
//    pin.ondragstart = function() {
//       return false;
//     };
//
changeLine.addEventListener('click', function(evt){
	var newLeft = event.clientX - changeLine.getBoundingClientRect().left;
	var rightEdge = changeLine.offsetWidth - pin.offsetWidth;//длина линии в px
	var point = (newLeft * 100) / rightEdge;
	pin.style.left =  point + '%';
	сolorSlider.style.width = pin.style.left;
});

//Наложение эффекта на изображение
var sliderNone = document.querySelector('.img-upload__effect-level').classList.add('hidden');
var allSpan = document.querySelectorAll('.effects__preview');

function onClickLictener(evt){ 
	pin.style.left =  100 + '%';
	сolorSlider.style.width = pin.style.left;
	var classRandom = evt.target.className.split('--');
	var filter = classRandom[1];
	if( filter =='none'){
		var filter = 'none';
		previewImg.style.filter = filter;
		var sliderNone = document.querySelector('.img-upload__effect-level').classList.add('hidden');
	}else if( filter =='chrome'){
		var sliderNone = document.querySelector('.img-upload__effect-level').classList.remove('hidden');
		var filter = 'grayscale';
		previewImg.style.filter = filter + '(' + 1 + ')';
	}else if( filter =='sepia'){
		var sliderNone = document.querySelector('.img-upload__effect-level').classList.remove('hidden');
		var filter = 'sepia';
		previewImg.style.filter = filter + '(' + 1 + ')';
	}else if( filter =='marvin'){
		var sliderNone = document.querySelector('.img-upload__effect-level').classList.remove('hidden');
		var filter = 'invert';
		previewImg.style.filter = filter + '(' + 100 + '%)';
	}else if( filter =='phobos'){
		var sliderNone = document.querySelector('.img-upload__effect-level').classList.remove('hidden');
		var filter = 'blur';
		previewImg.style.filter = filter + '(' + 3 + 'px)';
	}else if( filter =='heat'){
		var sliderNone = document.querySelector('.img-upload__effect-level').classList.remove('hidden');
		var filter = 'brightness';
		previewImg.style.filter = filter + '(' + 3 + ')';
	}

}

for(var i = 0; i<allSpan.length; i++){
	allSpan[i].addEventListener('click',onClickLictener,true);
}

//  ВАЛИДАЦИЯ
var  fieldsetText = document.querySelector('.img-upload__text');// вывели fieldset
var inputTags = document.querySelector('.text__hashtags');//достучались до поля хештегов input
// var maxlengthHashtags = inputTags.setAttribute('maxlength', '20');//ограничили максимальную длину
// var minlengthHashtags = inputTags.setAttribute('minlength', '1');//ограничили мин длину

function onInputLictener (evt){
	var target = evt.target;
	var tagArray = target.value.split(' ');
	
	console.log(tagArray)//выводит масива
	console.log(tagArray.length)// длина масива это количество хештегов
	//берет всю длину масиива масива 
	if (tagArray.length > 5) {
		target.setCustomValidity('нельзя указать больше 5-ти хэш-тегов');
	};
	// первый елемент  в хештеге - это #
	for(var i = 0; i<tagArray.length; i++){
		if (tagArray[i].charAt(0) != '#') {
			target.setCustomValidity('нельзя без #')
		}
		// хэш-теги разделяются пробелами;
		var hashCount = 0;
		var oneHesh = tagArray[i]
		console.log(oneHesh.length)
		for (var i = 0; i < oneHesh.length; i++) {//(+)ми берем к-сть раз в залежності від кіль-сті симвалів в слові
			if (oneHesh[i] === '#') {
				hashCount = hashCount + 1
			}
		}
		if (hashCount > 1) {
			target.setCustomValidity('не больше двух #')
		}
		//хеш-тег не может состоять только из одной решётки
		for (var i = 0; i < oneHesh.length; i++) {
			if(i < 2){
				target.setCustomValidity('хеш-тег не может состоять только из одной решётки')
			}
		}
	}
};
inputTags.addEventListener('input', onInputLictener)
