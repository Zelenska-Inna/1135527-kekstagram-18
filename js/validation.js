'use strict';

window.validation = (function () {
	var COUNT_WORDS = 5;
	var LENGTH_WORD = 20;
	var LENGTH_TEXT = 140;
	var inputTags = document.querySelector('.text__hashtags');
	var textarea = document.querySelector('.text__description');

	function changeBorder(element) {
		element.style.borderColor = 'red';
	}
		
	function returnBorder(element) {
		element.style.borderColor = '';
	}
	//хештеги
	function checkForHashSymbol(str) {
		if (str !== '#') {
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
		for (var i = 0; i < list.length; i++) {
			var inkr = i + 1;
			if (list.indexOf(list[i], inkr) !== -1) {
				return 'одинаковые хештеги не допускаются';
			}
		}	
	}

	function checkOutTagsHandler (evt) {
		var target = evt.target;
		var tagArray = target.value.split(' ');
		var allHashLength = 0;
		var errorText = null;
		
		for(var i = 0; i < tagArray.length; i++) {
			var oneTag = tagArray[i];
			//количество тегов до 5
			if (oneTag === '') {
				target.setCustomValidity('');
				returnBorder(inputTags);
				return ;
			}
			allHashLength ++;
			// первый елемент  в хештеге - это #
			errorText = checkForHashSymbol(oneTag[0]);

			if (errorText && errorText.length > 0) {
				target.setCustomValidity(errorText);
				changeBorder(inputTags);
				return;
			}
			// в одном хешьтега не больше одной решотки;
			errorText = checkForDuplicateHash(oneTag);

			if (errorText && errorText.length > 0) {
				target.setCustomValidity(errorText);
				changeBorder(inputTags);
				return;
			}
			//хеш-тег не может состоять только из одной решётки
			errorText = checkForHashMinLength(oneTag);

			if (errorText && errorText.length > 0) {
				target.setCustomValidity(errorText);
				changeBorder(inputTags);
				return;
			}
			//одинаковые хештеги не допускаются
			errorText = checkForDuplicateHashTags(tagArray);

			if (errorText && errorText.length > 0) {
				target.setCustomValidity(errorText);
				changeBorder(inputTags);
				return;
			}
		} 
		//нельзя указать больше 5-ти хэш-тегов
		if (allHashLength > COUNT_WORDS) {
			target.setCustomValidity('нельзя указать больше 5-ти хэш-тегов');
			changeBorder(inputTags);
			return;
		}
		//длина хештега не должна превышать 20 символов
		if (oneTag.length > LENGTH_WORD) {
			target.setCustomValidity('длина хештега превышает 20 символов');
			changeBorder(inputTags);
			return;
		}
		
		target.setCustomValidity('');
		returnBorder(inputTags);
	}

	inputTags.addEventListener('input', checkOutTagsHandler);

	// коментарии
	function checkOutTextsHandler(evt) {
		var target = evt.target;
		var text = target.value;

		if (text.length > LENGTH_TEXT) {
			textarea.setCustomValidity('длина коментария превышает 140 символов');
			changeBorder(textarea);
			return;
		}
		returnBorder(textarea);
		target.setCustomValidity('');
	}
	textarea.addEventListener('input', checkOutTextsHandler);
	return {
		inputTags: inputTags,
		textarea: textarea,
	};
})();
