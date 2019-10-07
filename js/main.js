var MAX_PHOTOS_COUNT = 25;
var comments = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var names = ['Dima', 'Max', 'Masha'];

function getRandomComments() {
	var count = getRandomNumber(1, 2);//массив равно или 1 обект или 2 обекта
	var randomComments = [];

	for (var i = 0; i < count; i++) {
		var randomIndex = getRandomNumber(0, comments.length - 1);
		var randomIndexAvatar = getRandomNumber(1, comments.length);
		randomComments.push({
			message: comments[randomIndex],
			names: names[getRandomNumber(0, names.length - 1)],
			avatar: 'img/avatar-' + randomIndexAvatar + '.svg', // генерит рандом автара////изменитьна randomIndex
		});
	}

	return randomComments;
}

function getPhotos(length) {
	var photos = [];
	for (var i = 0; i < length; i++) {
		var photo = getPhoto(i);
		photos.push(photo);
	}

	return photos;
}

var photos = getPhotos(MAX_PHOTOS_COUNT);

function getPhoto(index) {
	return {
		url: 'photos/' + (index + 1) + '.jpg',
		description: 'fasdfs',
		likes: getRandomNumber(15, 200),
		comments: getRandomComments(index),//
	}; 
}


function getRandomNumber(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min));
}


var callToTemplate = document.querySelector('#picture').content;//вызвали тег темплейт
var contentsTemplate = callToTemplate.querySelector('.picture');// вызвали его содержание/тег а 
var elementRender = document.querySelector('.pictures');//место куда отрисует склонированые дети темплейта


function render(data) {

	var container = document.createDocumentFragment(); //прячет оболочку

	for (var i = 0; i < data.length; i++) {
		var actualPhoto = data[i];//елемент массива который выводит обект с url/description/comments/likes

		var element = contentsTemplate.cloneNode(true); //клонирование тег а и дети 
		var img = element.querySelector('img');

		element.href = actualPhoto.url; // где url это ключ обьекта 
		img.src = actualPhoto.url;//тоже самое??? img.setAttribute('src', actualPhoto.url);
		img.alt = actualPhoto.description; 
		element.querySelector('.picture__comments').textContent = actualPhoto.comments.length;//длина массива(рандомная)
		element.querySelector('.picture__likes').textContent = actualPhoto.likes;
		container.appendChild(element);// добавляет клонированый а и детей в ОП 

	}
	elementRender.appendChild(container); // добавление в DOM
}

render(photos); //ренедер - отрисует в DOM 

var actualPhoto = photos[getRandomNumber(0,photos.length-1)];//выдает по 1 рандомному фото

var bigPicture = document.querySelector('.big-picture');//вывод тега section
bigPicture.classList.remove('hidden');//удаление

var bigPictureImg = bigPicture.querySelector('.big-picture__img');//вывод тега div
var bigImg = bigPictureImg.querySelector('img');//вывод тега img
bigImg.src = actualPhoto.url;//

var bigPictureLikes = bigPicture.querySelector('.likes-count');//вывод тега span
bigPictureLikes.textContent = actualPhoto.likes;//вывод рандомных лайков
//?
var replacement = getRandomComments();//

var bigPictureComments = bigPicture.querySelector('.comments-count');//вывод тега
bigPictureComments.innerHTML = replacement.length;


var caption = bigPicture.querySelector('.social__caption');// p
caption.innerHTML = actualPhoto.description;//добавлено описание

// Список комментариев под фотографией

var commentsList = bigPicture.querySelector('.social__comments');//место списка ul
console.log(commentsList);

var callToMyTemplate = document.querySelector('#my__comment').content;//обращение к темплейту
var subjectTemplate = callToMyTemplate.querySelector('.social__comment');// вызвали его содержание/тег  li
var elementMyRender = document.querySelector('.social__comments');//место куда отрисует склонированые дети темплейта

function renderTwo(data){
	var container = document.createDocumentFragment();
	for (var i = 0; i < data.length; i++) {
		var oneComment = data[i];//елемент массива который выводит обект 
		var element = subjectTemplate.cloneNode(true); //клонирование тег li и дети 
		var commentImg = element.querySelector('img');
		commentImg.src = oneComment.avatar;
		commentImg.alt = oneComment.names; 
		element.querySelector('.social__text').textContent = oneComment.message;//длина массива(рандомная)
		container.appendChild(element);// добавляет клонированый li  и детей в ОП 
	}
	elementMyRender.appendChild(container);//должен вставить в ul

}
renderTwo(replacement);

var enumerator = document.querySelector('.social__comment-count');//вывод тега 
enumerator.classList.add('visually-hidden');
var batch = document.querySelector('.comments-loader');//вывод тега 
batch.classList.add('visually-hidden');
