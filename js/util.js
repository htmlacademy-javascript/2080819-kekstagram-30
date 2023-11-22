const REMOVE_MESSAGE_TIMEOUT = 5000;

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

export { showErrorMassage };

//далее временные функции

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getUniqueRandomInteger(a, b) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(a, b);
    if (previousValues.length >= b - a + 1) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

export { getRandomInteger };
export { getUniqueRandomInteger };
