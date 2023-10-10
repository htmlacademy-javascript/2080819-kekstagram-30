// Функция для проверки длины строки:

const isEnoughLength = (line, count) => line.length <= count;
console.log(isEnoughLength("dfghj", 5));

// Функция для проверки, является ли строка палиндромом:

const isPalindrome = (line) => {
  let cleanLine = line.replaceAll(" ", "");
  cleanLine = cleanLine.toLowerCase();
  let reverse = "";
  for (let i = cleanLine.length - 1; i >= 0; i = i - 1) {
    reverse = reverse + cleanLine[i];
  }
  return reverse === cleanLine;
};

isPalindrome("Лёша на полке клопа нашёл");

// Функция принимает строку, извлекает содержащиеся в ней цифры:

const extractionNumbers = (value) => {
  value = value.replaceAll(" ", "");
  let result = "";
  for (let i = 0; i < value.length; i = i + 1) {
    if (value[i] == +value[i]) {
      result = result + value[i];
    }
  }
  console.log(parseInt(result));
};
extractionNumbers(" 1к ефиg67атона");
