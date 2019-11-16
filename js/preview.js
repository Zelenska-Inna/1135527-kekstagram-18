'use strict';

window.preview = (function () {

	var MAX_LENGTH = 10;
	var MAX_NUMBER_COMMENTS = 5; 
	var	bigPicture = document.querySelector('.big-picture');//вывод тега section
	var batch = document.querySelector('.comments-loader');//вывод тега button
	var callToTemplate = document.querySelector('#picture').content;//вызвали тег темплейт
	var contentsTemplate = callToTemplate.querySelector('.picture');// вызвали его содержание/тег а 
	var elementRender = document.querySelector('.pictures');//место куда отрисует склонированые дети темплейта
	var bigPictureImg = bigPicture.querySelector('.big-picture__img');//вывод тега div
	var bigImg = bigPictureImg.querySelector('img');//вывод тега img
	var pictureLikes = bigPicture.querySelector('.likes-count');//вывод тега span
	var bigPictureComments = bigPicture.querySelector('.comments-count');//вывод тега - всего коментариев
	var caption = bigPicture.querySelector('.social__caption');//вывод тега р
	var callToMyTemplate = document.querySelector('#my__comment').content;//обращение к темплейту
	var subjectTemplate = callToMyTemplate.querySelector('.social__comment');// вызвали его содержание/тег  li
	var elementMyRender = document.querySelector('.social__comments');//место куда отрисует склонированые дети темплейта
	var pictureCancelButton = document.querySelector('#picture-cancel');
	var commentsCount = document.querySelectorAll('.social__comment').length;
	var imgFilters = document.querySelector('.img-filters');
	var popular = imgFilters.querySelector('#filter-popular');
	var random = imgFilters.querySelector('#filter-random');
	var discussed = imgFilters.querySelector('#filter-discussed');
	var currentPhoto;

	function renderBigPhoto(data) {
		currentPhoto = data;
		bigImg.src = data.url;
		pictureLikes.textContent = data.likes;//вывод лайков
		bigPictureComments.innerHTML = data.comments.length;//вставили сколько всего будет коментов
		caption.innerHTML = data.description;//добавлено описание

		window.util.openPopup(bigPicture);
		renderComments(data, commentsCount, MAX_NUMBER_COMMENTS);
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
		var endCount = commentsCount + MAX_NUMBER_COMMENTS;
		renderComments(currentPhoto, commentsCount, endCount);
	});

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
			element.querySelector('.picture__likes').textContent = actualPhoto.likes;// вставить само число
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
	//показывает кнопки фильтров
	function showFilters() {
		imgFilters.classList.remove('img-filters--inactive');
	}

	//фильтрация фото
	function clearPicturesContainer() { // очистить контейнер
		var pictures = document.querySelectorAll('.picture');

		pictures.forEach(function (elem) {// elem - елемент массива
			elem.remove(); // удаление
		});
	}

	function removeActiveClass() {  // снять активность кнопки
		var buttonActive = document.querySelector('.img-filters__button--active');
		buttonActive.classList.remove('img-filters__button--active');
	}

	function changeFilter(evt, data) {
		window.newArrPhoto = data;
		clearPicturesContainer();// очистить контейнер
		renderPhotos(data); // перерисовать контейнер
		removeActiveClass(); // снять активность кнопки
		evt.target.classList.add('img-filters__button--active');
	}

	function activPopularFilters(evt) {
		changeFilter(evt, window.xhrPhotos);
	}

	function activRandomFilters(evt) {
		var arrNew = [];
		var index;

		for (var i = 0; i < window.xhrPhotos.length; i++) {
			index =  Math.floor(Math.random() * window.xhrPhotos.length);

			if (arrNew.indexOf(window.xhrPhotos.slice()[index]) == -1 && arrNew.length != MAX_LENGTH){
				arrNew.push(window.xhrPhotos.slice()[index]);
			}
		}
		changeFilter(evt, arrNew);
	}

	function activDiscussedFilters(evt) {
		var grade = window.xhrPhotos.slice().sort(function (a, b) {
			return b.comments.length - a.comments.length;
		});

		changeFilter(evt, grade);
	}

	imgFilters.addEventListener('click', function(evt) {

		if ( evt.target === popular) {
			activPopularFilters(evt);
		}
		if (evt.target === random) {
			activRandomFilters(evt);
		} 
		if (evt.target === discussed) {
			activDiscussedFilters(evt);
		}
	});

	return {
		renderBigPhoto: renderBigPhoto,
		bigPicture: bigPicture,
		renderPhotos: renderPhotos,
		renderError: renderError,
		showFilters: showFilters,
	};
})();


