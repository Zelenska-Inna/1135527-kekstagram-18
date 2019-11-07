
'use strict';

(function () {
	//ВАЛИДАЦИЯ
	var COUNT_WORDS = 5;
	var LENGTH_WORD = 20;
	var LENGTH_TEXT = 140;
	var inputTags = document.querySelector('.text__hashtags');//достучались до поля хештегов input
	var textarea = document.querySelector('.text__description');//достучались до поля коментариев
	//хештеги
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
		var target = evt.target;
		var tagArray = target.value.split(' ');
		var allHashLength = 0;
		var errorText = null;
		
		for(var i = 0; i < tagArray.length; i++) {
			var oneTag = tagArray[i];
			//количество тегов до 5
			if (oneTag === '') {
				target.setCustomValidity('');
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
	function onInputTextListener (evt) {
		var target = evt.target;
		var text = target.value;
		
		if (text.length > LENGTH_TEXT){
			textarea.setCustomValidity('длина коментария превышает 140 символов');
			return;
		}
		target.setCustomValidity('');
	}
	textarea.addEventListener('input', onInputTextListener);
})();
