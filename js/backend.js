
'use strict';

window.backend = (function () {
	var XHR_SUCCESS_STATUS = 200;

	function load(url, renderPhotos, onError) {//onSuccess
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.open('GET', url);

		xhr.addEventListener('load', function () {
			if (xhr.status === XHR_SUCCESS_STATUS) {
				window.preview.renderPhotos(xhr.response);//отримует по умолчанию
			} else {
				onError('Статус ответа ' + xhr.status + xhr.statusText);
			}
		});
		xhr.send();
	}

	function upload(url, data, onSuccess, onError) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.open('POST', url);

		xhr.addEventListener('load', function () {
			if (xhr.status === XHR_SUCCESS_STATUS) {
				onSuccess(xhr.response);
			} else {
				onError('Статус ответа ' + xhr.status + xhr.statusText);
			}
		});
		xhr.send(data);
	}

	return {
		load: load,
		upload: upload,
	};
})();