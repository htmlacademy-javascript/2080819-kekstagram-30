const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// const getUniqueRandomInteger = (a, b) => {
//   const arr = [];
//   return function () {
//     let flag = true;
//     let randomInteger;
//     if (arr.length >= b - a + 1) {
//       return null;
//     }
//     while (flag) {
//       randomInteger = getRandomInteger(a, b);
//       if (!arr.includes(randomInteger)) {
//         arr.push(randomInteger);
//         flag = false;
//         return randomInteger;
//       }
//     }
//   };
// };

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
