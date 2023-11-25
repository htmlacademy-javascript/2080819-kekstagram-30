export const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
export const COMMENTS = [
  'Выглядит классно!',
  'Где-то это уже было...',
  'Что это такое?',
  'Мне нравится сочетание цветов.',
  'Не хватает котика.',
];
export const PHOTOS_COUNT = 25;
export const DESCRIPTIONS = [
  'Вы не представляете, как много дублей мне пришлось сделать!',
  'Буду скучать по этому месту...',
  'Это одна из моих любимых фотографий',
  'Мне нравится сочетание цветов.',
  'Не помню, откуда взялся этот снимок.',
];
export const MIN_LIKES = 15;
export const MAX_LIKES = 200;
export const MAX_COMMENT_ID = 1111;
export const MAX_COUNT_AVATARS = 6;

export const MIN_COMMENTS = 0;
export const MAX_COMMENTS = 30;

export const FILE_FORMATS = ['jpeg', 'jpg', 'png'];

export const MAX_TAGS_COUNT = 5;
export const VALID_CHARACTERS = /^#[a-zа-яё0-9]{1,19}$/i;
export const errorText = {
  TO_MACH_TAGS: 'Превышено количество хэш-тегов',
  NOT_UNIQUE: 'Хэш-теги повторяются',
  WRONG_TAG: 'Введён невалидный хэш-тег',
};
export const DESCRIPTION_MAX_LENGTH = 140;
export const errorDescription = `Длина комментария больше ${DESCRIPTION_MAX_LENGTH} символов`;
