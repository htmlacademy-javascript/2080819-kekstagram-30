import { renderGallery } from './gallery.js';
import { debounce } from './util.js';

const filterElement = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const defaultButton = filtersForm.querySelector('#filter-default');
const randomButton = filtersForm.querySelector('#filter-random');
const discussedButton = filtersForm.querySelector('#filter-discussed');

const MAX_RANDOM_COUNT = 10;

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,

  [FilterEnum.RANDOM]: (data) => {
    const randomIntegerList = [];
    const max = Math.min(MAX_RANDOM_COUNT, data.length);
    while (randomIntegerList.length < max) {
      const integer = getRandomIndex(0, data.length);
      if (!randomIntegerList.includes(integer)) {
        randomIntegerList.push(integer);
      }
    }
    return randomIntegerList.map((integer) => data[integer]);
  },

  [FilterEnum.DISCUSSED]: (data) =>
    [...data].sort(
      (item1, item2) => item2.comments.length - item1.comments.length
    ),
};

const repaint = (evt, filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderGallery(filteredData);
  const currentActiveElement = filtersForm.querySelector(
    '.img-filters__button--active'
  );
  currentActiveElement.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const debouncedRepaint = debounce(repaint);

const initFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterEnum.DEFAULT, data);
  });

  randomButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterEnum.RANDOM, data);
  });

  discussedButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
