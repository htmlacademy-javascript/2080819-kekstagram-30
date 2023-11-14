import { createPhotos } from './create-photos.js';
import { renderGallery } from './gallery.js';
import './form.js';
// import { init, reset } from './effect.js';

const photoArray = createPhotos(25);
renderGallery(photoArray);
