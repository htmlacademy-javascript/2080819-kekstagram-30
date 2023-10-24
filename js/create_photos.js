import { getRandomInteger, getUniqueRandomInteger } from './util.js';
import {
  NAMES,
  COMMENTS,
  PHOTOS_COUNT,
  DESCRIPTIONS,
  MIN_LIKES,
  MAX_LIKES,
  MAX_COMMENT_ID,
  MAX_COUNT_AVATARS,
  MIN_COMMENTS,
  MAX_COMMENTS,
} from './constants.js';

// let photoCount = 0;

const createCommentId = getUniqueRandomInteger(0, MAX_COMMENT_ID);

const createComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomInteger(0, MAX_COUNT_AVATARS)}.svg`,
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const createComments = (n) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(createComment());
  }
  return arr;
};

const createPhotoId = getUniqueRandomInteger(1, PHOTOS_COUNT);
const createImageId = getUniqueRandomInteger(1, PHOTOS_COUNT);

const createPhoto = () => ({
  id: createPhotoId(),
  url: `photos/${createImageId()}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)),
});

const createPhotos = (n) => {
  // photoCount = n;
  const photos = [];
  for (let i = 0; i < n; i++) {
    photos.push(createPhoto());
  }
  return photos;
};

export { createPhotos };
