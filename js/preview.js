'use strict';

window.preview = (function () {

	var MAX_NUMBER_COMMENTS = 5; 
	var	bigPicture = document.querySelector('.big-picture');
	var batch = document.querySelector('.comments-loader');
	var callToTemplate = document.querySelector('#picture').content;
	var contentsTemplate = callToTemplate.querySelector('.picture');
	var elementRender = document.querySelector('.pictures');
	var bigPictureImg = bigPicture.querySelector('.big-picture__img');
	var bigImg = bigPictureImg.querySelector('img');
	var pictureLikes = bigPicture.querySelector('.likes-count');
	var bigPictureComments = bigPicture.querySelector('.comments-count');
	var caption = bigPicture.querySelector('.social__caption');
	var callToMyTemplate = document.querySelector('#my__comment').content;
	var subjectTemplate = callToMyTemplate.querySelector('.social__comment');
	var elementMyRender = document.querySelector('.social__comments');
	var pictureCancelButton = document.querySelector('#picture-cancel');
	var commentsCount = document.querySelectorAll('.social__comment').length;
	var currentPhoto;

	function renderBigPhoto(data) {
		currentPhoto = data;
		bigImg.src = data.url;
		pictureLikes.textContent = data.likes;
		bigPictureComments.innerHTML = data.comments.length;
		caption.innerHTML = data.description;

		window.util.openPopup(bigPicture);
		renderComments(data, commentsCount, MAX_NUMBER_COMMENTS);
	}
	// Список комментариев под фотографией
	function renderComments(data, startCount, endCount) { //принимает масив 
		var container = document.createDocumentFragment();
		var commentsCountRendered = document.querySelector('.comments__count-start');

		for (var i = startCount; i < endCount; i++) {
			if (i <= data.comments.length - 1) {
				var comment = data.comments[i];
				var element = subjectTemplate.cloneNode(true);
				var commentImg = element.querySelector('img');
				commentImg.src = comment.avatar;
				commentImg.alt = comment.name; 
				element.querySelector('.social__text').textContent = comment.message;
				container.appendChild(element);// добавляет клонированый li  и детей в ОП 
			
				commentsCountRendered.textContent = i + 1;
				commentsCount += 1;
			
				if (i >= data.comments.length - 1) {
					batch.classList.add('visually-hidden');
				}
			}
		}
		elementMyRender.appendChild(container);
	}

	batch.addEventListener('click', function () {
		var endCount = commentsCount + MAX_NUMBER_COMMENTS;
		renderComments(currentPhoto, commentsCount, endCount);
	});

	function renderPhotos(data) {
		window.newArrPhoto = data;
		var container = document.createDocumentFragment();//прячет оболочку

		for (var i = 0; i < data.length; i++) {
			var actualPhoto = data[i];
			var element = contentsTemplate.cloneNode(true); 
			var img = element.querySelector('img');
			img.setAttribute('tabindex', 0);
			element.href = actualPhoto.url; 
			img.src = actualPhoto.url;
			img.alt = actualPhoto.description; 

			element.querySelector('.picture__comments').textContent = actualPhoto.comments.length;
			element.querySelector('.picture__likes').textContent = actualPhoto.likes;
			container.appendChild(element);//добавляет клонированый а и детей в ОП 

		}

		elementRender.appendChild(container);//добавление в DOM
	}

	function bigPictureEscPressHandler(evt) {
		window.util.pressEsc(evt, closeBigPictureHandler);
	}

	function closeBigPictureHandler() {
		window.util.closePopup(bigPicture);
		elementMyRender.innerHTML = '';
		batch.classList.remove('visually-hidden');
		commentsCount = 0;
	}
	//при нажатие на кнопку-хрестик закрыватся окно
	pictureCancelButton.addEventListener('click', closeBigPictureHandler);
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

