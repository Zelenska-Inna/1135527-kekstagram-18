'use strict';

window.preview = (function () {

	var MAX_NUMBER_COMMENTS = 5; 
	var	bigPicture = document.querySelector('.big-picture');
	var showMoreCommentsButton = document.querySelector('.comments-loader');
	var photoTemplate = document.querySelector('#picture').content;
	var wrapperPhotoTemplate = photoTemplate.querySelector('.picture');
	var containerForRenderPhoto = document.querySelector('.pictures');
	var bigPictureImg = bigPicture.querySelector('.big-picture__img');
	var bigImg = bigPictureImg.querySelector('img');
	var pictureLikes = bigPicture.querySelector('.likes-count');
	var bigPictureComments = bigPicture.querySelector('.comments-count');
	var userText = bigPicture.querySelector('.social__caption');
	var commentTemplate = document.querySelector('#my__comment').content;
	var wrapperCommentTemplate = commentTemplate.querySelector('.social__comment');
	var containerForRenderComment = document.querySelector('.social__comments'); 
	var closePicturelButton = document.querySelector('#picture-cancel'); 

	var commentsCount = document.querySelectorAll('.social__comment').length;
	var currentPhoto;

	function renderBigPhoto(data) {
		currentPhoto = data;
		bigImg.src = data.url;
		pictureLikes.textContent = data.likes;
		bigPictureComments.textContent = data.comments.length;
		userText.textContent = data.description;

		window.util.openPopup(bigPicture);
		renderComments(data, commentsCount, MAX_NUMBER_COMMENTS);
	}

	//Список комментариев под фотографией
	function renderComments(data, startCount, endCount) {
		var wrapper = document.createDocumentFragment();
		var commentsCountRendered = document.querySelector('.comments__count-start');

		for (var i = startCount; i < endCount && i < data.comments.length; i++) {
				var comment = data.comments[i];
				var placeForCloning = wrapperCommentTemplate.cloneNode(true); 
				var commentImg = placeForCloning.querySelector('img');
				commentImg.src = comment.avatar;
				commentImg.alt = comment.name; 
				placeForCloning.querySelector('.social__text').textContent = comment.message;
				wrapper.appendChild(placeForCloning);// добавляет клонированый li  и детей в ОП 
				
				commentsCountRendered.textContent = i + 1;
				commentsCount += 1;
			
				if (i >= data.comments.length-1 ) {
					showMoreCommentsButton.classList.add('visually-hidden');
				}
		}
		containerForRenderComment.appendChild(wrapper);
	}

	showMoreCommentsButton.addEventListener('click', function () {
		var endCount = commentsCount + MAX_NUMBER_COMMENTS;
		renderComments(currentPhoto, commentsCount, endCount);
	});

	function renderPhotos(data) {
		window.newArrPhoto = data;
		var wrapper = document.createDocumentFragment();

		for (var i = 0; i < data.length; i++) {
			var actualPhoto = data[i];
			var placeForCloning = wrapperPhotoTemplate.cloneNode(true); 
			var dataOfImg = placeForCloning.querySelector('img');
			dataOfImg.setAttribute('tabindex', 0);
			placeForCloning.href = actualPhoto.url; 
			dataOfImg.src = actualPhoto.url;
			dataOfImg.alt = actualPhoto.description; 

			placeForCloning.querySelector('.picture__comments').textContent = actualPhoto.comments.length;
			placeForCloning.querySelector('.picture__likes').textContent = actualPhoto.likes;
			wrapper.appendChild(placeForCloning);//добавляет клонированый а и детей в ОП 

		}

		containerForRenderPhoto.appendChild(wrapper);//добавление в DOM
	}

	function bigPictureEscPressHandler(evt) {
		window.util.pressEsc(evt, closeBigPictureHandler);
	}

	function closeBigPictureHandler() {
		window.util.closePopup(bigPicture);
		containerForRenderComment.innerHTML = '';
		showMoreCommentsButton.classList.remove('visually-hidden');
		commentsCount = 0;
	}
	//при нажатие на кнопку-хрестик закрыватся окно
	closePicturelButton.addEventListener('click', closeBigPictureHandler);

	function renderError(message) {
		var errorTemplate = document.querySelector('#error').content.querySelector('.error');
		var mainPart = document.querySelector('main');
		var errorNode = errorTemplate.cloneNode(true);
		errorNode.querySelector('.error__title').textContent = 'Ошибка соединения с сервером <br>' + message;
		mainPart.appendChild(errorNode);
	}

	return {
		bigPictureEscPressHandler: bigPictureEscPressHandler,
		renderBigPhoto: renderBigPhoto,
		bigPicture: bigPicture,
		renderPhotos: renderPhotos,
		renderError: renderError,
	};
})();

