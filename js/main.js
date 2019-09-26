var MAX_PHOTOS_COUNT = 25;
var comments = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]
var names = ['Dima', 'Max', 'Masha'];

function getRandomComments(index) {
	var count = getRandomNumber(1, 2);
	var randomComments = [];

	for (var i = 0; i < count; i++) {
		var randomIndex = getRandomNumber(0, comments.length - 1);
		randomComments.push({
			message: comments[randomIndex],
			names: names[getRandomNumber(0, names.length - 1)],
			avatar: 'img/avatar-' + index + '.svg',
		});
	}

	return randomComments;
}

function getPhotos(length) {
	var photos = [];
	for (var i = 0; i < length; i++) {
		var photo = getPhoto(i)
		photos.push(photo);
	}

	return photos;
}

function getPhoto(index) {
	return {
		url: 'photos/' + (index + 1) + '.jpg',
		description: 'fasdfs',
		likes: getRandomNumber(15, 200),
		comments: getRandomComments(index),
	}
}

function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}


var photos = getPhotos(MAX_PHOTOS_COUNT);

function render(data) {
	console.log(data)
}


render(photos)


//вариант 1

var makeElement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

var createCard = function (card) { //сюда надо вставить данные с getPhoto?
  var listItem = makeElement('a', 'picture');

  var picture = makeElement('img', 'src');
  picture.src = product.url;
  listItem.appendChild(picture);

  var comment = makeElement('span', 'picture__comments');
  picture.appendChild(comment);

  var comment = makeElement('span', 'picture__likes');
  picture.appendChild(like);

  return listItem;
};


for (var i = 0; i < getPhoto().length; i++) { // getPhoto().length не правильно но а как туда впихнуть обьект??
  var cardItem = createCard(getPhoto[i]);
  document.appendChild(cardItem);  //наверное вставила не туда
}


//задача 3  

var template = document.querySelector('#picture').content.querySelector('a');
var fragment = document.createDocumentFragment();

//это наверное лишнее
// for (var i = 0; i < 25; i++) {
//   var element = template.cloneNode(true);
//   element.children[0].textContent = i;
//   fragment.appendChild(element);  
// }
 document.appendChild(fragment);//наверное вставила не туда

