import { createPhotos } from './create-photos.js';
import { createPhotoThumbnail } from './thumbnails.js';

const photoArray = createPhotos(25);

createPhotoThumbnail(photoArray);
