import { createPhotoThumbnail } from './thumbnails.js';
import { showBigPicture } from './full-picture.js';

const picturesList = document.querySelector('.pictures');

const renderGallery = (picturesArray) => {
  picturesList.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-photo-element-id]');

    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const thumbnailId = +thumbnail.dataset.photoElementId;
    const pictureData = picturesArray.find(({ id }) => id === thumbnailId);

    showBigPicture(pictureData);
  });

  createPhotoThumbnail(picturesArray, picturesList);
};

export { renderGallery };
