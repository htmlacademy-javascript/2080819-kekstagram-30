import { REMOVE_MESSAGE_TIMEOUT } from './constants.js';

const errorMassageTemplate = document
  .querySelector('#data-error')
  .content.querySelector('.data-error');

const showErrorMassage = () => {
  const errorElement = errorMassageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { showErrorMassage, getRandomIndex, debounce };
