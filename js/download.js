(function () {
	var FILE_FORMATS = ['jpeg', 'gif', 'jpg', 'png'];

	var previewImg = document.querySelector('.img-upload__preview').querySelector('img');
	var сhooserImg = document.querySelector('.img-upload__input');

	function uploadNewPictureHandler() {
		var file = сhooserImg.files[0];
		var fileName = file.name.toLowerCase();

		var matches = FILE_FORMATS.some(function (format) {
			return fileName.endsWith(format);
		});

		if (matches) {
			var reader = new FileReader();

			reader.addEventListener('load', function () {
				previewImg.src = reader.result;
			});

			reader.readAsDataURL(file);
		}
	}

	сhooserImg.addEventListener('change', uploadNewPictureHandler);
})();