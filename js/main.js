import { renderGallery } from './gallery.js';
import './form.js';
import { showErrorMassage } from './util.js';
import { loadPictures } from './api.js';
import { initFilter } from './filters.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initFilter(pictures);
  } catch (error) {
    showErrorMassage();
  }
};

bootstrap();

