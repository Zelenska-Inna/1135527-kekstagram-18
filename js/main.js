'use strict';
window.main = (function () {

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

	var enumerator = document.querySelector('.social__comment-count');
	var batch = document.querySelector('.comments-loader');//вывод тега button

	enumerator.classList.add('visually-hidden');//прячет комментарии к изображению
	batch.classList.add('visually-hidden');// прячет кнопку для загрузки новой порции комментариев

	var callToTemplate = document.querySelector('#picture').content;//вызвали тег темплейт
	var contentsTemplate = callToTemplate.querySelector('.picture');// вызвали его содержание/тег а 
	var elementRender = document.querySelector('.pictures');//место куда отрисует склонированые дети темплейта
	// var bigPicture = document.querySelector('.big-picture');//вывод тега section

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
			description: 'Автор',
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

		window.bigPicture = document.querySelector('.big-picture');//вывод тега section
		var bigPictureImg = window.bigPicture.querySelector('.big-picture__img');//вывод тега div
		var bigImg = bigPictureImg.querySelector('img');//вывод тега img
		bigImg.src = data.url;

		var bigPictureLikes = window.bigPicture.querySelector('.likes-count');//вывод тега span
		bigPictureLikes.textContent = data.likes;//вывод рандомных лайков

		var bigPictureComments = window.bigPicture.querySelector('.comments-count');//вывод тега
		bigPictureComments.innerHTML = data.comments.length;

		var caption = window.bigPicture.querySelector('.social__caption');//вывод тега р
		caption.innerHTML = data.description;//добавлено описание
		window.util.openPopup(window.bigPicture);
		renderComments(data.comments);
	}
	// Список комментариев под фотографией
	function renderComments(data){ //принимает или один или два обекта

		var callToMyTemplate = document.querySelector('#my__comment').content;//обращение к темплейту
		var subjectTemplate = callToMyTemplate.querySelector('.social__comment');// вызвали его содержание/тег  li
		var elementMyRender = document.querySelector('.social__comments');//место куда отрисует склонированые дети темплейта

		elementMyRender.innerHTML = '';
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
			img.setAttribute('tabindex', 0);

			element.href = actualPhoto.url; // где url это ключ обьекта 
			img.src = actualPhoto.url;
			img.alt = actualPhoto.description; 
			element.querySelector('.picture__comments').textContent = actualPhoto.comments.length;//длина массива(рандомная)
			element.querySelector('.picture__likes').textContent = actualPhoto.likes;
			container.appendChild(element);// добавляет клонированый а и детей в ОП 

		}
		elementRender.appendChild(container); // добавление в DOM
	}	 
	window.photos = getPhotos(MAX_PHOTOS_COUNT);// данные и счоздание дааних функция дейтвие

	renderPhotos(window.photos);

	return {
		renderBigPhoto: renderBigPhoto,
	};

})();


