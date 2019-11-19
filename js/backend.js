'use strict';

window.backend = (function () {
	var XHR_SUCCESS_STATUS = 200;

	function showResultDownload(xhr, onSuccess, onError) {
		xhr.addEventListener('load', function () {
			if (xhr.status === XHR_SUCCESS_STATUS) {
				onSuccess(xhr.response);
			} else {
				onError('Статус ответа ' + xhr.status + xhr.statusText);
			}
		});
	}

	function load(url, onSuccess, onError) {
		
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open('GET', url);

		showResultDownload( xhr, onSuccess, onError);
		xhr.send();
	}

	function upload(url, data, onSuccess, onError) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.open('POST', url);

		showResultDownload(xhr, onSuccess, onError);
		xhr.send(data);
	}


	return {
		load: load,
		upload: upload,
	};
})();