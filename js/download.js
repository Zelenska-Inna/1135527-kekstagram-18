(function () {
	var FILE_FORMATS = ['jpeg', 'gif', 'jpg', 'png'];

	var previewImg = document.querySelector('.img-upload__preview').querySelector('img');
	var сhooserImg = document.querySelector('.img-upload__input');

	function uploadNewPictureHandler() {
		var сhooserfile = сhooserImg.files[0];
		var fileName = сhooserfile.name.toLowerCase();

		var matchesFile = FILE_FORMATS.some(function (format) {
			return fileName.endsWith(format);
		});

		if (matchesFile) {
			var readerFile = new FileReader();

			readerFile.addEventListener('load', function () {
				previewImg.src = readerFile.result;
			});

			readerFile.readAsDataURL(сhooserfile);
		}
	}

	сhooserImg.addEventListener('change', uploadNewPictureHandler);
})();