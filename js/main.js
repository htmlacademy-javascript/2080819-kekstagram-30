import { createPhotos } from './create-photos.js';
import { renderGallery } from './gallery.js';
import './form.js';

const photoArray = createPhotos(25);
renderGallery(photoArray);
