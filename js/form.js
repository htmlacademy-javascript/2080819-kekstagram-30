import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';
import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { pristine } from './validation.js';
import { FILE_FORMATS } from './constants.js';

const bodyElement = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const overlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const imgUploadInput = uploadForm.querySelector('.img-upload__input');
const textTagsInput = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const photoPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const fileField = uploadForm.querySelector('#upload-file');

const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_FORMATS.some((it) => fileName.endsWith(it));
};

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  if (isDisabled) {
    submitButton.textContent = SubmitButtonCaption.SUBMITTING;
  } else {
    submitButton.textContent = SubmitButtonCaption.IDLE;
  }
};

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

const isErrorMassageExist = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFileFocus() && !isErrorMassageExist()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  const file = fileField.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
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

imgUploadInput.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
uploadForm.addEventListener('submit', onFormSubmit);
