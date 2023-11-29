import {
  MAX_TAGS_COUNT,
  VALID_CHARACTERS,
  errorTexts,
  DESCRIPTION_MAX_LENGTH,
  ERROR_DESCRIPTION,
} from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const textTagsInput = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getHashtagsArray = (value) =>
  value.trim().toLowerCase().split(' ').filter(Boolean);

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

const validateDescription = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

pristine.addValidator(
  textDescription,
  validateDescription,
  ERROR_DESCRIPTION,
  1,
  true
);

pristine.addValidator(
  textTagsInput,
  validateHashtagSyntax,
  errorTexts.WRONG_TAG,
  3,
  true
);

pristine.addValidator(
  textTagsInput,
  validateHashtagUniqueness,
  errorTexts.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  textTagsInput,
  validateHashtagsNumber,
  errorTexts.TO_MACH_TAGS,
  1,
  true
);

export { pristine };
