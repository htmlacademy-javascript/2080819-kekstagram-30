const successMessageElement = document
  .querySelector('#success')
  .content.querySelector('.success');

const errorMessageElement = document
  .querySelector('#error')
  .content.querySelector('.error');

const hideMessage = () => {
  const existElement =
    document.querySelector('.success') || document.querySelector('.error');
  existElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);

  document.body.removeEventListener('click', onBodyClick);
};

const onCloseButtonClick = () => {
  hideMessage();
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick(evt) {
  if (
    evt.target.closes('.succes__inner') ||
    evt.target.closes('.error__inner')
  ) {
    return;
  }

  hideMessage();
}

const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  element
    .querySelector(buttonClass)
    .addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  showMessage(successMessageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageElement, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
