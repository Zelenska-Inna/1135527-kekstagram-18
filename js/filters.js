'use strict';

window.filters = (function () {
	var DEBOUNCE_INTERVAL = 500;
	var MAX_LENGTH = 10;
	var imgFilters = document.querySelector('.img-filters');
	var filterPopular = imgFilters.querySelector('#filter-popular'); 
	var filterRandom = imgFilters.querySelector('#filter-random');
	var filterDiscussed = imgFilters.querySelector('#filter-discussed');
	//показывает кнопки фильтров
	function showFilters() {
		imgFilters.classList.remove('img-filters--inactive');
	}

	// очистить контейнер
	function clearPicturesContainer() {
		var pictures = document.querySelectorAll('.picture');

		pictures.forEach(function (elem) {
			elem.remove();
		});
	}
	// снять активность кнопки
	function removeActiveClass() {
		var buttonActive = document.querySelector('.img-filters__button--active');
		buttonActive.classList.remove('img-filters__button--active');
	}

	function changeFilter(evt, data) {
		clearPicturesContainer();
		window.preview.renderPhotos(data); //перерисовать контейнер
		removeActiveClass();
		evt.target.classList.add('img-filters__button--active');
	}

	function activPopularFilters(evt) {
		changeFilter(evt, window.xhrPhotos);
	}

	function activRandomFilters(evt) {
		var photosSorted = [];
		var index;

		for (var i = 0; i < window.xhrPhotos.length; i++) {
			index =  Math.floor(Math.random() * window.xhrPhotos.length);

			if (photosSorted.indexOf(window.xhrPhotos.slice()[index]) === -1 && photosSorted.length !== MAX_LENGTH){
				photosSorted.push(window.xhrPhotos.slice()[index]);
			}
		}
		changeFilter(evt, photosSorted);
	}

	function activDiscussedFilters(evt) {
		var photosGrade = window.xhrPhotos.slice().sort(function (a, b) {
			return b.comments.length - a.comments.length;
		});

		changeFilter(evt, photosGrade);
	}

	imgFilters.addEventListener('click', function(evt) {
		if ( evt.target === filterPopular) {
			debounceActivPopularFilters(evt);
		}
		if (evt.target === filterRandom) {
			debounceActivRandomFilters(evt);
		} 
		if (evt.target === filterDiscussed) {
			debounceActivDiscussedFilters(evt);
		}
	});

	var debounceActivPopularFilters = debounce(activPopularFilters);
	var debounceActivRandomFilters = debounce(activRandomFilters);
	var debounceActivDiscussedFilters = debounce(activDiscussedFilters);

	function debounce (cb) {
		var lastTimeout = null;

		return function () {
			var parameters = arguments;
			if (lastTimeout) {
				window.clearTimeout(lastTimeout);
			}
			lastTimeout = window.setTimeout(function () {
				cb.apply(null, parameters);
			}, DEBOUNCE_INTERVAL);
		};
	}

	return {
		showFilters: showFilters,

	};
})();
