import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';
import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const bodyElement = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const overlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const imgUploadInput = uploadForm.querySelector('.img-upload__input');
const textTagsInput = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const MAX_TAGS_COUNT = 5;
const VALID_CHARACTERS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorText = {
  TO_MACH_TAGS: `Максимум ${MAX_TAGS_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  WRONG_TAG: 'Неправильный хэштег',
};
const DESCRIPTION_MAX_LENGTH = 140;

const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  if (isDisabled) {
    submitButton.textContent = SubmitButtonCaption.SUBMITTING;
  } else {
    submitButton.textContent = SubmitButtonCaption.IDLE;
  }
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  resetEffects();
};

const hideModal = () => {
  uploadForm.reset();
  resetScale();
  pristine.reset();
  overlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFileFocus = () =>
  document.activeElement === textTagsInput ||
  document.activeElement === textDescription;

//

// const normalizeTags = (tagString) =>
//   tagString
//     .trim()
//     .split(' ')
//     .filter((tag) => Boolean(tag.lenght));

// const hasValidTag = (value) =>
//   normalizeTags(value).every((tag) => VALID_CHARACTERS.test(tag));

// const hasValidCount = (value) => normalizeTags(value).lenght <= MAX_TAGS_COUNT;

// const hasUniqueTags = (value) => {
//   const lowerCase = normalizeTags(value).map((tag) => tag.toLowerCase());
//   return lowerCase.length === new Set(lowerCase).size;
// };

const getHashtagsArray = (value) => value.trim().split(' ').filter(Boolean);

const validateHashtagSyntax = (value) =>
  getHashtagsArray(value).every((hashtag) => VALID_CHARACTERS.test(hashtag));

const validateHashtagUniqueness = (value) => {
  const uniqueHashtags = [];
  const hashtagsArray = getHashtagsArray(value);
  hashtagsArray.forEach((hashtag) => {
    if (!uniqueHashtags.includes(hashtag)) {
      uniqueHashtags.push(hashtag);
    }
  });
  return uniqueHashtags.length === hashtagsArray.length;
};

const validateHashtagsNumber = (value) =>
  getHashtagsArray(value).length <= MAX_TAGS_COUNT;

const validateComment = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

pristine.addValidator(textDescription, validateComment);

//

const irErrorMassageExist = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFileFocus() && !irErrorMassageExist) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

const sendForm = async (formElement) => {
  if (!pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPicture(new FormData(formElement));
    toggleSubmitButton(false);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

// const onInputChange = () => {
//   pristine.validate();
// };

pristine.addValidator(
  textTagsInput,
  validateHashtagSyntax,
  errorText.TO_MACH_TAGS,
  3,
  true
);

pristine.addValidator(
  textTagsInput,
  validateHashtagUniqueness,
  errorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  textTagsInput,
  validateHashtagsNumber,
  errorText.WRONG_TAG,
  1,
  true
);

// const isValid = () => pristine.validate();
// const resetValidation = () => pristine.reset();

imgUploadInput.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
uploadForm.addEventListener('submit', onFormSubmit);
// textTagsInput.addEventListener('change', onInputChange);
