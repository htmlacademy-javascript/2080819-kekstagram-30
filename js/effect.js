import { Effects, filterEffects, settingsEffects } from './constants.js';

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const effectsElement = modalElement.querySelector('.effects__list');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector(
  '.img-upload__effect-level'
);
const effectsLevelElement = modalElement.querySelector('.effect-level__value');

let chosenEffect = Effects.DEFAULT;

const isDefault = () => chosenEffect === Effects.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imageElement.style.filter = null;
    return;
  }

  const { value } = effectsLevelElement;
  const { style, unit } = filterEffects[chosenEffect];
  imageElement.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectsLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    },
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(settingsEffects[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const resetEffects = () => {
  setEffect(Effects.DEFAULT);
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(settingsEffects[chosenEffect]);
  effectsElement.addEventListener('change', onEffectChange);
};

init();

export { init, resetEffects };
