var MAX_PHOTOS_COUNT = 25;
var comments = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]
var names = ['Dima', 'Max', 'Masha'];

function getRandomComments(index) {
	var count = getRandomNumber(1, 2);
	var randomComments = [];

	for (var i = 0; i < count; i++) {
		var randomIndex = getRandomNumber(0, comments.length - 1);
		randomComments.push({
			message: comments[randomIndex],
			names: names[getRandomNumber(0, names.length - 1)],
			avatar: 'img/avatar-' + index + '.svg',
		});
	}

	return randomComments;
}

function getPhotos(length) {
	var photos = [];
	for (var i = 0; i < length; i++) {
		var photo = getPhoto(i)
		photos.push(photo);
	}

	return photos;
}

function getPhoto(index) {
	return {
		url: 'photos/' + (index + 1) + '.jpg',
		description: 'fasdfs',
		likes: getRandomNumber(15, 200),
		comments: getRandomComments(index),
	}
}

function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

var photos = getPhotos(MAX_PHOTOS_COUNT);

var callToTemplate = document.querySelector('#picture').content;//вызвали темплейт
var contentsTemplate = callToTemplate.querySelector('.picture');// вызвали его содержание/тег а 
var elementRender = document.querySelector('.pictures');//место куда отрисует склонированые дети темплейта

function render(data) {

	var container = document.createDocumentFragment(); //прячет оболочку

	for (var i = 0; i < data.length; i++) {
		var actualPhoto = data[i];

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
render(photos) // в функию перейдут данные с getPhotos в место data


