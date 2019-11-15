'use strict';

window.preview = (function () {


	var	bigPicture = document.querySelector('.big-picture');//вывод тега section
	var batch = document.querySelector('.comments-loader');//вывод тега button
	var callToTemplate = document.querySelector('#picture').content;//вызвали тег темплейт
	var contentsTemplate = callToTemplate.querySelector('.picture');// вызвали его содержание/тег а 
	var elementRender = document.querySelector('.pictures');//место куда отрисует склонированые дети темплейта
	var bigPictureImg = bigPicture.querySelector('.big-picture__img');//вывод тега div
	var bigImg = bigPictureImg.querySelector('img');//вывод тега img
	var bigPictureLikes = bigPicture.querySelector('.likes-count');//вывод тега span
	var bigPictureComments = bigPicture.querySelector('.comments-count');//вывод тега - всего коментариев
	var caption = bigPicture.querySelector('.social__caption');//вывод тега р
	var callToMyTemplate = document.querySelector('#my__comment').content;//обращение к темплейту
	var subjectTemplate = callToMyTemplate.querySelector('.social__comment');// вызвали его содержание/тег  li
	var elementMyRender = document.querySelector('.social__comments');//место куда отрисует склонированые дети темплейта
	var pictureCancelButton = document.querySelector('#picture-cancel');

	var commentsCount = document.querySelectorAll('.social__comment').length;// 
	var currentPhoto;

	function renderBigPhoto(data) {
		currentPhoto = data;
		bigImg.src = data.url;
		bigPictureLikes.textContent = data.likes;//вывод лайков
		bigPictureComments.innerHTML = data.comments.length;//вставили сколько всего будет коментов
		caption.innerHTML = data.description;//добавлено описание

		window.util.openPopup(bigPicture);
		renderComments(data, commentsCount, 5);
	}
	// Список комментариев под фотографией
	function renderComments(data, startCount, endCount) { //принимает масив 
		var container = document.createDocumentFragment();
		var commentsCountRendered = document.querySelector('.comments__count-start');// старт количества

		for (var i = startCount; i < endCount; i++) {
			if (i <= data.comments.length - 1) {// количество всего коментариев под этим фото - 1
				var comment = data.comments[i];//елемент массива который выводит обект 
				var element = subjectTemplate.cloneNode(true); //клонирование тег li и дети 
				var commentImg = element.querySelector('img');
				commentImg.src = comment.avatar;
				commentImg.alt = comment.name; 
				element.querySelector('.social__text').textContent = comment.message;//длина массива(рандомная)
				container.appendChild(element);// добавляет клонированый li  и детей в ОП 
			
				commentsCountRendered.textContent = i + 1;//написать количество отрисованных коментариев
				commentsCount += 1;
			
				if (i >= data.comments.length - 1) {//comments  - 1
					batch.classList.add('visually-hidden');
				}
			}
		}
		elementMyRender.appendChild(container);//должен вставить в ul
	}

	batch.addEventListener('click', function () {
		var endCount = commentsCount + 5;
		renderComments(currentPhoto, commentsCount, endCount);
	});

	function renderPhotos(data) {
		window.xhrPhotos = data;
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
	//закрытие BigPicture
	function bigPictureEscPressHandler(evt) {
		window.util.pressEsc(evt, closeBigPicture);
	}

	function closeBigPicture() {
		window.util.closePopup(bigPicture);
		elementMyRender.innerHTML = '';
		batch.classList.remove('visually-hidden');
		commentsCount = 0;
	}
	//при нажатие на кнопку-хрестик закрыватся окно
	pictureCancelButton.addEventListener('click', closeBigPicture);
	document.addEventListener('keydown', bigPictureEscPressHandler);

	function renderError(message) {
		var errorTemplate = document.querySelector('#error').content.querySelector('.error');
		var main = document.querySelector('main');
		var errorNode = errorTemplate.cloneNode(true);
		errorNode.querySelector('.error__title').innerHTML = 'Ошибка соединения с сервером <br>' + message;
		main.appendChild(errorNode);
	}

	return {
		renderBigPhoto: renderBigPhoto,
		bigPicture: bigPicture,
		renderPhotos: renderPhotos,
		renderError: renderError,
	};
})();


