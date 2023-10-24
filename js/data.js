// Модуль с данными для фотографий

import { getRandomArrayElement, getRandomInteger } from './util';
import {
  DESCRIPTIONS,
  MESSAGES,
  NAMES
} from './constanse.js';

let maxPhotoPost;

//Функция для получения Id фото
const generateId = () => {
  let id = 0;
  return function () {
    while (id < maxPhotoPost) {
      id += 1;
      return id;
    }
  };
};
const createId = generateId();

//Функция для создания обьекта с описанием фотографии
const createPhotoPost = () => {
  const commentsCount = getRandomInteger(0, 30);
  const commentsArray = Array.from({ length: commentsCount }, createComment);
  const photoID = createId();
  return ({
    id: photoID,
    url: `photos/${photoID}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: commentsArray
  });
};
//Функция дляь создания массива комментариев
const createComment = () => {
  const commentId = createCommentId();
  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  };
};

//Фунция для получения Id комментариев
const generateCommentId = () => {
  let id = 0;
  return function () {
    id += 1;
    return id;
  };
};

const createCommentId = generateCommentId();



const createPhotoPostArray = (n) => {
  maxPhotoPost = n;
  return Array.from({ length: maxPhotoPost }, createPhotoPost);
}

export { createPhotoPostArray };
