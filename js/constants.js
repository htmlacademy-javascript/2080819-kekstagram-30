export const MAX_RANDOM_COUNT = 10;
export const FILE_FORMATS = ['jpeg', 'jpg', 'png'];
export const MAX_TAGS_COUNT = 5;
export const VALID_CHARACTERS = /^#[a-zа-яё0-9]{1,19}$/i;
export const errorTexts = {
  TO_MACH_TAGS: 'Превышено количество хэш-тегов',
  NOT_UNIQUE: 'Хэш-теги повторяются',
  WRONG_TAG: 'Введён невалидный хэш-тег',
};
export const DESCRIPTION_MAX_LENGTH = 140;
export const ERROR_DESCRIPTION = `Длина комментария больше ${DESCRIPTION_MAX_LENGTH} символов`;
export const REMOVE_MESSAGE_TIMEOUT = 5000;
export const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';
export const COMMENTS_COUNT_TO_SHOW = 5;
export const SCALE_STEP = 25;
export const MIN_SCALE = 25;
export const MAX_SCALE = 100;
export const DAFAULT_SCALE = 100;

export const Effects = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

export const filterEffects = {
  [Effects.CHROME]: {
    style: 'grayscale',
    unit: '',
  },

  [Effects.SEPIA]: {
    style: 'sepia',
    unit: '',
  },

  [Effects.MARVIN]: {
    style: 'invert',
    unit: '%',
  },

  [Effects.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },

  [Effects.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

export const settingsEffects = {
  [Effects.DEFAULT]: {
    min: 0,
    max: 10,
    step: 1,
  },
  [Effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effects.HEAT]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
};
