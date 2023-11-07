import { createPhotos } from './create-photos.js';
// import { createPhotoThumbnail } from './thumbnails.js';
import { renderGallery } from './gallery.js';

const photoArray = createPhotos(25);
renderGallery(photoArray);

// createPhotoThumbnail(photoArray);
