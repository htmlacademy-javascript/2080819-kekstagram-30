const bodyElement = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const overlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const imgUploadInput = uploadForm.querySelector('.img-upload__input');
const textTags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');

const MAX_TAGS_COUNT = 5;
const VALID_CHARACTERS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorText = {
  TO_MACH_TAGS: 'Вы не можете добавить более .. хэштегов',
  NOT_UNIQUE: 'Хэштеги не могут повторяться',
  WRONG_TAG: 'Что-то неправильно...',
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
};

const hideModal = () => {
  uploadForm.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFileFocus = () =>
  document.activeElement === textTags ||
  document.activeElement === textDescription;

const normalizeTags = (tagString) =>
  tagString
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.lenght));

const hasValidTag = (value) =>
  normalizeTags(value).every((tag) => VALID_CHARACTERS.test(tag));

const hasValidCount = (value) => normalizeTags(value).lenght <= MAX_TAGS_COUNT;

const hasUniqueTags = (value) => {
  const lowerCase = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCase.length === new Set(lowerCase).size;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFileFocus()) {
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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

pristine.addValidator(textTags, hasValidCount, errorText.TO_MACH_TAGS, 3, true);

pristine.addValidator(textTags, hasUniqueTags, errorText.NOT_UNIQUE, 2, true);

pristine.addValidator(textTags, hasValidTag, errorText.WRONG_TAG, 1, true);

imgUploadInput.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
uploadForm.addEventListener('sudmit', onFormSubmit);
