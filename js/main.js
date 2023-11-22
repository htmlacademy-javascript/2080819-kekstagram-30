// import { createPhotos } from './create-photos.js';
import { renderGallery } from './gallery.js';
import './form.js';
import { showErrorMassage } from './util.js';
import { loadPictures } from './api.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
  } catch (error) {
    showErrorMassage();
  }
};

bootstrap();

// const photoArray = createPhotos(25);
// renderGallery(photoArray);
