/*
const SIMILAR_WIZARD_COUNT = 4;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createWizard = () => ({
  name: `${getRandomArrayElement(NAMES) } ${ getRandomArrayElement(SURNAMES)}`,
  coatColor: getRandomArrayElement(COAT_COLORS),
  eyesColor: getRandomArrayElement(EYES_COLORS),
});

const similarWizards = Array.from({length: SIMILAR_WIZARD_COUNT}, createWizard);

console.log(similarWizards);

Структура каждого объекта должна быть следующей:

id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.

url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

description, строка — описание фотографии. Описание придумайте самостоятельно.

likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.

Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!


Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.*/

const NAMES = [
  "Иван",
  "Хуан Себастьян",
  "Мария",
  "Кристоф",
  "Виктор",
  "Юлия",
  "Люпита",
  "Вашингтон",
];
const COMMENTS = [
  "Выглядит классно!",
  "Где-то это уже было...",
  "Что это такое?",
  "Мне нравится сочетание цветов.",
  "Не хватает котика.",
];
const PHOTOS_COUNT = 25;
const DESCRIPTIONS = [
  "Вы не представляете, как много дублей мне пришлось сделать!",
  "Буду скучать по этому месту...",
  "Это одна из моих любимых фотографий",
  "Мне нравится сочетание цветов.",
  "Не помню, откуда взялся этот снимок.",
];
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENT_ID = 1111; //случайное число
const MAX_COUNT_AVATARS = 6;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueRandomInteger = (a, b) => {
  const arr = [];
  return function () {
    let flag = true;
    let randomInteger;
    while (flag) {
      randomInteger = getRandomInteger(a, b);
      if (!arr.includes(randomInteger)) {
        arr.push(randomInteger);
        flag = false;
        return randomInteger;
      }
    }
  };
};

const createCommentId = getUniqueRandomInteger(0, MAX_COMMENT_ID);

const createComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomInteger(0, MAX_COUNT_AVATARS)}.svg`,
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const createComments = (n) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(createComment());
  }
  return arr;
};

const createPhotoId = getUniqueRandomInteger(1, PHOTOS_COUNT);
const createImageId = getUniqueRandomInteger(1, PHOTOS_COUNT);

const createPhoto = () => ({
  id: createPhotoId(),
  url: `photos/${createImageId()}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)),
});

const createPhotos = (n) => {
  const photos = [];
  for (let i = 0; i < n; i++) {
    photos.push(createPhoto());
  }
  return photos;
};

console.log(createPhotos(PHOTOS_COUNT));
